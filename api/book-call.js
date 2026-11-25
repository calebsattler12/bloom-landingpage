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

function clean(value, max) {
  return String(value || "").trim().slice(0, max || 300);
}

function attributionLines(body) {
  return [
    `utm_source: ${clean(body.utm_source, 120) || "(none)"}`,
    `utm_medium: ${clean(body.utm_medium, 120) || "(none)"}`,
    `utm_campaign: ${clean(body.utm_campaign, 120) || "(none)"}`,
    `utm_term: ${clean(body.utm_term, 120) || "(none)"}`,
    `utm_content: ${clean(body.utm_content, 120) || "(none)"}`,
    `gclid: ${clean(body.gclid, 200) || "(none)"}`,
    `referrer: ${clean(body.referrer, 500) || "(none)"}`,
    `landing_page: ${clean(body.landing_page, 300) || "(none)"}`,
    `heard_about: ${clean(body.heard_about, 300) || "(none)"}`,
  ].join("\n");
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

  const website = normalizeUrl(body.url || body.website);
  const role = clean(body.role, 120);
  const helpWith = clean(body.help_with || body.helpWith, 500);
  const heardAbout = clean(body.heard_about, 300);

  if (!website || !role || !helpWith) {
    return res.status(400).json({
      ok: false,
      error: "Enter your company website, role, and what you want help with.",
    });
  }

  try {
    const message = [
      "New book-a-call qualifier",
      `Website: ${website}`,
      `Role: ${role}`,
      `Help with: ${helpWith}`,
      `Heard about: ${heardAbout || "(not provided)"}`,
      "",
      "Attribution",
      attributionLines(body),
    ].join("\n");

    const payload = {
      _subject: "New book-a-call qualifier",
      _template: "box",
      _captcha: "false",
      website,
      role,
      help_with: helpWith,
      heard_about: heardAbout || "(not provided)",
      utm_source: clean(body.utm_source, 120) || "(none)",
      utm_medium: clean(body.utm_medium, 120) || "(none)",
      utm_campaign: clean(body.utm_campaign, 120) || "(none)",
      utm_term: clean(body.utm_term, 120) || "(none)",
      utm_content: clean(body.utm_content, 120) || "(none)",
      gclid: clean(body.gclid, 200) || "(none)",
      referrer: clean(body.referrer, 500) || "(none)",
      landing_page: clean(body.landing_page, 300) || "(none)",
      source: "runbloom.ai book a call",
      message,
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
    console.error("Book-call request failed", error);
    return res.status(502).json({ ok: false, error: "Could not send the request. Try again." });
  }
}
