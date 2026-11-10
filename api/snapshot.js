function parseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeUrl(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  if (/^(javascript|data|vbscript):/i.test(trimmed)) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const notifyEmail = String(process.env.NOTIFY_EMAIL || "").trim();
  if (!notifyEmail || !isEmail(notifyEmail)) {
    console.error("NOTIFY_EMAIL is not configured");
    return res.status(500).json({ ok: false, error: "Could not send the request. Try again." });
  }

  const body = parseBody(req);
  if (body.company) {
    return res.status(200).json({ ok: true });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const website = normalizeUrl(body.url || body.website);
  const competitors = String(body.competitors || "").trim().slice(0, 300);
  if (!isEmail(email) || !website) {
    return res.status(400).json({ ok: false, error: "Enter a website URL and email." });
  }

  try {
    const payload = {
      _subject: "New free snapshot request",
      _template: "box",
      _captcha: "false",
      email,
      website,
      competitors: competitors || "(not provided)",
      source: "runbloom.ai free snapshot",
      message: `New free snapshot request\nWebsite: ${website}\nEmail: ${email}\nCompetitors: ${competitors || "(not provided)"}`,
    };

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(notifyEmail)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Notify failed", response.status, text);
      return res.status(502).json({ ok: false, error: "Could not send the request. Try again." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Snapshot request failed", error);
    return res.status(502).json({ ok: false, error: "Could not send the request. Try again." });
  }
}
