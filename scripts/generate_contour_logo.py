#!/usr/bin/env python3
"""Generate Bloom contour mark from a multi-peak topographic height field.

True isolines (not wobbled ellipses): summed Gaussian peaks + multi-octave
value noise → marching-squares contours → SVG (#12C4B4) + PNG aliases.
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
SEED = 20260911


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
    z = np.zeros((n, n), dtype=np.float64)

    # Distinct peaks / lobes — deliberately asymmetric, not one center
    peaks = [
        (0.34, 0.40, 0.13, 0.11, 1.05),
        (0.58, 0.32, 0.11, 0.10, 0.98),
        (0.66, 0.52, 0.10, 0.12, 0.90),
        (0.44, 0.62, 0.14, 0.11, 0.95),
        (0.26, 0.58, 0.09, 0.09, 0.70),
        (0.52, 0.46, 0.08, 0.07, 0.55),  # central saddle bump
        (0.72, 0.38, 0.07, 0.08, 0.58),
    ]
    for cx, cy, sx, sy, amp in peaks:
        z += gaussian_peak(yn, xn, cx, cy, sx, sy, amp)

    # Ridges joining peaks into multi-lobed massifs
    z += gaussian_peak(yn, xn, 0.46, 0.36, 0.20, 0.07, 0.42)
    z += gaussian_peak(yn, xn, 0.54, 0.55, 0.07, 0.18, 0.36)
    z += gaussian_peak(yn, xn, 0.38, 0.52, 0.16, 0.08, 0.30)

    # Large + mid + fine noise for amoeba silhouette + crinkle
    z += 0.48 * fbm((n, n), rng, base=n / 2.8, octaves=4)
    z += 0.28 * fbm((n, n), np.random.default_rng(seed + 7), base=n / 8.0, octaves=5)
    z += 0.10 * fbm((n, n), np.random.default_rng(seed + 19), base=n / 24.0, octaves=4)

    # Irregular island mask (noise-warped, not circular)
    mask_noise = fbm((n, n), np.random.default_rng(seed + 31), base=n / 4.5, octaves=4)
    # Angular lobes: modulate radius by angular harmonics
    ang = np.arctan2(yn - 0.48, xn - 0.50)
    lobe = (
        0.55
        + 0.18 * np.cos(2 * ang + 0.4)
        + 0.12 * np.sin(3 * ang - 0.7)
        + 0.08 * np.cos(5 * ang + 1.1)
        + 0.10 * mask_noise
    )
    rr = np.hypot(xn - 0.50, yn - 0.48) / np.clip(lobe, 0.25, 1.0)
    falloff = np.clip(1.05 - rr, 0.0, 1.0) ** 1.35
    z *= falloff

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
    # Bias levels so peaks resolve as separate summits and flats open up
    levels = 0.20 + 0.76 * (t**0.78)

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
