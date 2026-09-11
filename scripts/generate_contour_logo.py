#!/usr/bin/env python3
"""Generate Bloom contour mark from a multi-peak topographic height field.

Continuous lowland island + sharp summits → marching-squares isolines.
Tuned to avoid peanut/hourglass midsection pinch while keeping irregular
multi-peak topo (variable spacing, index contours). SVG (#12C4B4) + PNG aliases.
"""

from __future__ import annotations

import math
import os
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
ROOT = Path(__file__).resolve().parents[1]
os.environ.setdefault("MPLCONFIGDIR", str(ROOT / ".mplconfig"))

import matplotlib.pyplot as plt
import numpy as np
from PIL import Image, ImageDraw

STROKE = "#12C4B4"
STROKE_RGBA = (18, 196, 180, 255)
SEED = 20260920


def fade(t: np.ndarray) -> np.ndarray:
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0)


def value_noise_2d(shape: tuple[int, int], period: float, rng: np.random.Generator) -> np.ndarray:
    h, w = shape
    gh = max(2, int(math.ceil(h / period)) + 2)
    gw = max(2, int(math.ceil(w / period)) + 2)
    grid = rng.uniform(-1.0, 1.0, size=(gh, gw))

    ys = np.linspace(0, gh - 2, h)
    xs = np.linspace(0, gw - 2, w)
    y0 = np.floor(ys).astype(int)
    x0 = np.floor(xs).astype(int)
    fy = fade(ys - y0)[:, None]
    fx = fade(xs - x0)[None, :]
    y0 = y0[:, None]
    x0 = x0[None, :]

    n00 = grid[y0, x0]
    n10 = grid[y0 + 1, x0]
    n01 = grid[y0, x0 + 1]
    n11 = grid[y0 + 1, x0 + 1]
    return (n00 * (1 - fx) + n01 * fx) * (1 - fy) + (n10 * (1 - fx) + n11 * fx) * fy


def fbm(shape: tuple[int, int], rng: np.random.Generator, base: float, octaves: int = 5) -> np.ndarray:
    total = np.zeros(shape, dtype=np.float64)
    amp = 1.0
    freq = 1.0
    norm = 0.0
    for _ in range(octaves):
        total += amp * value_noise_2d(shape, period=max(2.0, base / freq), rng=rng)
        norm += amp
        amp *= 0.55
        freq *= 2.1
    return total / norm


def gaussian_peak(yy, xx, cx, cy, sx, sy, amp):
    return amp * np.exp(-(((xx - cx) / sx) ** 2 + ((yy - cy) / sy) ** 2) / 2.0)


def build_heightfield(n: int = 560, seed: int = SEED) -> np.ndarray:
    rng = np.random.default_rng(seed)
    yy, xx = np.mgrid[0:n, 0:n]
    xn = xx / (n - 1)
    yn = yy / (n - 1)

    # --- Continuous lowland island (keeps outer rings from hourglass-pinching) ---
    mask_noise = fbm((n, n), np.random.default_rng(seed + 31), base=n / 4.5, octaves=4)
    ang = np.arctan2(yn - 0.48, xn - 0.50)
    # Odd harmonics + noise only — avoid strong cos(2θ) peanut waist
    lobe = (
        0.82
        + 0.02 * np.cos(2 * ang + 0.55)
        + 0.09 * np.sin(3 * ang - 0.85)
        + 0.07 * np.cos(5 * ang + 1.2)
        + 0.05 * np.sin(7 * ang - 0.3)
        + 0.12 * mask_noise
    )
    rr = np.hypot(xn - 0.50, yn - 0.48) / np.clip(lobe, 0.40, 1.25)
    island = np.clip(1.18 - rr, 0.0, 1.0) ** 1.05
    island *= 0.55 + 0.45 * (0.5 + 0.5 * fbm((n, n), rng, base=n / 3.2, octaves=4))

    # Soft midsection fill so shoreline stays continuous (no peanut waist)
    island += 0.28 * gaussian_peak(yn, xn, 0.50, 0.48, 0.32, 0.26, 1.0)
    island += 0.18 * gaussian_peak(yn, xn, 0.50, 0.38, 0.34, 0.14, 1.0)
    island += 0.22 * gaussian_peak(yn, xn, 0.50, 0.58, 0.34, 0.16, 1.0)
    island += 0.16 * gaussian_peak(yn, xn, 0.38, 0.48, 0.14, 0.28, 1.0)
    island += 0.16 * gaussian_peak(yn, xn, 0.62, 0.48, 0.14, 0.28, 1.0)
    island = np.clip(island, 0.0, None)

    # --- Sharp multi-peak summits on top of the lowland ---
    peaks = np.zeros((n, n), dtype=np.float64)
    # Peaks closer together so mid rings don't cinch into an hourglass
    summit_specs = [
        (0.38, 0.40, 0.085, 0.075, 1.18),
        (0.54, 0.34, 0.08, 0.07, 1.12),
        (0.62, 0.48, 0.08, 0.085, 1.05),
        (0.44, 0.56, 0.09, 0.08, 1.10),
        (0.32, 0.52, 0.07, 0.07, 0.80),
        (0.56, 0.54, 0.07, 0.06, 0.76),
        (0.48, 0.44, 0.06, 0.055, 0.72),  # saddle summit keeps mid rings open
    ]
    for cx, cy, sx, sy, amp in summit_specs:
        peaks += gaussian_peak(yn, xn, cx, cy, sx, sy, amp)

    # Ridges between summits — strong enough to kill the waist on mid isolines
    peaks += gaussian_peak(yn, xn, 0.46, 0.38, 0.16, 0.08, 0.48)
    peaks += gaussian_peak(yn, xn, 0.50, 0.48, 0.10, 0.16, 0.52)
    peaks += gaussian_peak(yn, xn, 0.40, 0.50, 0.14, 0.08, 0.40)
    peaks += gaussian_peak(yn, xn, 0.52, 0.42, 0.12, 0.10, 0.44)

    peaks += 0.20 * fbm((n, n), np.random.default_rng(seed + 7), base=n / 9.0, octaves=5)
    peaks += 0.08 * fbm((n, n), np.random.default_rng(seed + 19), base=n / 26.0, octaves=4)

    # Lowland owns the shoreline; peaks own the interior isolines
    z = 0.48 * island + 0.85 * peaks * (0.40 + 0.60 * island)

    z -= z.min()
    z /= z.max() + 1e-12
    # Soft floor lift across the massif reduces residual saddle on mid rings
    # without flattening distinct summits into one plateau
    core = np.clip(1.0 - np.hypot(xn - 0.50, yn - 0.48) / 0.42, 0.0, 1.0) ** 1.45
    z = np.maximum(z, 0.16 * core)
    z -= z.min()
    z /= z.max() + 1e-12
    return z


def extract_closed_contours(z: np.ndarray, levels: np.ndarray) -> list[tuple[int, list[np.ndarray]]]:
    fig, ax = plt.subplots(figsize=(1, 1))
    cs = ax.contour(z, levels=levels)
    out: list[tuple[int, list[np.ndarray]]] = []
    for i, segs in enumerate(cs.allsegs):
        closed = []
        for seg in segs:
            if len(seg) < 16:
                continue
            if np.linalg.norm(seg[0] - seg[-1]) < 3.0:
                p = seg.copy()
                p[-1] = p[0]
                # Drop tiny island noise
                if np.ptp(p[:, 0]) + np.ptp(p[:, 1]) < 18:
                    continue
                closed.append(p)
        if closed:
            out.append((i, closed))
    plt.close(fig)
    return out


def decimate(path: np.ndarray, min_step: float = 1.4) -> np.ndarray:
    kept = [path[0]]
    for p in path[1:]:
        if np.linalg.norm(p - kept[-1]) >= min_step:
            kept.append(p)
    if np.linalg.norm(kept[0] - kept[-1]) > 1e-6:
        kept.append(kept[0])
    return np.asarray(kept)


def to_svg_space(paths_by_level, minx, miny, bw, bh, scale, pad):
    """Map field (col,row) → SVG (x,y) with y flipped."""
    mapped = []
    for level_i, paths in paths_by_level:
        mpl = []
        for path in paths:
            xs = (path[:, 0] - minx) * scale + pad
            ys = (bh - (path[:, 1] - miny)) * scale + pad
            mpl.append(np.column_stack([xs, ys]))
        mapped.append((level_i, mpl))
    return mapped


def path_d(pts: np.ndarray) -> str:
    pts = decimate(pts, min_step=0.9)
    if len(pts) < 8:
        return ""
    parts = [f"M {pts[0,0]:.2f} {pts[0,1]:.2f}"]
    # Light quadratic smoothing keeps micro-wobble without ballooning file size
    for i in range(1, len(pts) - 1):
        x0, y0 = pts[i]
        x1, y1 = pts[i + 1]
        mx, my = (x0 + x1) * 0.5, (y0 + y1) * 0.5
        parts.append(f"Q {x0:.2f} {y0:.2f} {mx:.2f} {my:.2f}")
    parts.append("Z")
    return " ".join(parts)


def write_svg(mapped, vb_w, vb_h, n_levels, out_path: Path) -> None:
    elems = []
    for level_i, paths in mapped:
        is_index = (level_i % 4) == 0
        taper = 1.0 - 0.22 * (level_i / max(1, n_levels - 1))
        sw = round((1.65 if is_index else 1.05) * taper, 2)
        for pts in paths:
            d = path_d(pts)
            if not d:
                continue
            elems.append(
                f'  <path d="{d}" stroke="{STROKE}" stroke-width="{sw}" '
                f'stroke-linejoin="round" stroke-linecap="round"/>'
            )
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w:.1f} {vb_h:.1f}" '
        f'fill="none" role="img" aria-hidden="true">\n'
        f"  <title>Bloom contour mark</title>\n"
        + "\n".join(elems)
        + "\n</svg>\n"
    )
    out_path.write_text(svg)


def render_png(mapped, vb_w, vb_h, height_px: int, out_path: Path) -> None:
    scale = height_px / vb_h
    width_px = max(1, int(round(vb_w * scale)))
    ss = 4
    W, H = width_px * ss, height_px * ss
    s = scale * ss
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    n_levels = max(1, max(i for i, _ in mapped) + 1)

    for level_i, paths in mapped:
        is_index = (level_i % 4) == 0
        taper = 1.0 - 0.22 * (level_i / max(1, n_levels - 1))
        sw = (1.65 if is_index else 1.05) * taper
        stroke_w = max(2, int(round(sw * s)))
        for pts in paths:
            pix = [(float(x) * s, float(y) * s) for x, y in pts]
            if len(pix) < 3:
                continue
            draw.line(pix, fill=STROKE_RGBA, width=stroke_w, joint="curve")

    img = img.resize((width_px, height_px), Image.Resampling.LANCZOS)
    img.save(out_path, optimize=True)


def main() -> None:
    print("Building multi-peak height field…")
    z = build_heightfield(n=560, seed=SEED)

    n_levels = 15
    t = np.linspace(0.0, 1.0, n_levels + 2)[1:-1]
    # Lower floor keeps continuous shoreline; power bias opens separate summits
    levels = 0.16 + 0.80 * (t**0.72)

    print("Extracting isolines…")
    contours = extract_closed_contours(z, levels)
    if not contours:
        raise SystemExit("No contours")

    all_pts = np.concatenate([p for _, paths in contours for p in paths], axis=0)
    margin = 10.0
    minx, miny = all_pts.min(axis=0) - margin
    maxx, maxy = all_pts.max(axis=0) + margin
    bw, bh = maxx - minx, maxy - miny
    target_w = 280.0
    scale = target_w / bw
    target_h = bh * scale
    pad = 8.0
    vb_w, vb_h = target_w + 2 * pad, target_h + 2 * pad

    mapped = to_svg_space(contours, minx, miny, bw, bh, scale, pad)

    svg_path = ROOT / "logo-contour.svg"
    write_svg(mapped, vb_w, vb_h, n_levels, svg_path)
    print(f"Wrote {svg_path} ({svg_path.stat().st_size} bytes, viewBox {vb_w:.0f}×{vb_h:.0f})")

    sizes = {
        "logo-contour.png": 160,
        "logo-contour@2x.png": 320,
        "logo.png": 160,
        "logo-transparent.png": 160,
        "logo-nav.png": 64,
        "logo-nav@2x.png": 128,
        "logo-nav-on-ink.png": 64,
        "logo-nav-on-ink@2x.png": 128,
        "favicon.png": 32,
    }
    for name, h in sizes.items():
        out = ROOT / name
        render_png(mapped, vb_w, vb_h, h, out)
        a = np.array(Image.open(out))
        opaque = int((a[..., 3] > 10).sum())
        print(f"  {name}: {out.stat().st_size}b opaque={opaque}")

    preview = ROOT / "scripts" / "contour-preview.png"
    render_png(mapped, vb_w, vb_h, 480, preview)
    # Cream-bg preview for visual QA
    cream = Image.new("RGBA", (520, 520), (244, 239, 227, 255))
    mark = Image.open(preview)
    cream.paste(mark, ((520 - mark.width) // 2, (520 - mark.height) // 2), mark)
    cream.convert("RGB").save(ROOT / "scripts" / "contour-preview-cream.jpg", quality=92)
    print(f"Preview → {preview}")


if __name__ == "__main__":
    main()
