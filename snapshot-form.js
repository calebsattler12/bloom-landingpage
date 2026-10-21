(function () {
  const modal = document.getElementById("snapshot-done");
  if (!modal) return;

  const NOTIFY_EMAIL = "caleb@runbloom.ai";

  function showDone() {
    modal.hidden = false;
    const card = modal.querySelector(".snapshot-modal-card");
    if (card) card.focus();
  }

  function onHomePage() {
    const path = location.pathname.replace(/index\.html$/, "");
    return path === "/" || path === "";
  }

  modal.querySelectorAll('a[href="/"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (!onHomePage()) return;
      event.preventDefault();
      modal.hidden = true;
      window.scrollTo(0, 0);
    });
  });

  async function send(payload) {
    try {
      const response = await fetch("/api/snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(function () {
        return {};
      });
      if (response.ok && data.ok) return true;
    } catch (error) {
      console.warn("Snapshot API unavailable, trying email fallback", error);
    }

    const response = await fetch("https://formsubmit.co/ajax/" + NOTIFY_EMAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "New AI visibility snapshot request",
        _template: "box",
        _captcha: "false",
        email: payload.email,
        website: payload.url,
        source: "runbloom.ai snapshot builder",
        message: "New snapshot request\nWebsite: " + payload.url + "\nEmail: " + payload.email,
      }),
    });
    if (!response.ok) {
      const data = await response.json().catch(function () {
        return {};
      });
      throw new Error(data.message || "Could not send the request. Try again.");
    }
    return true;
  }

  document.querySelectorAll("[data-snapshot-form]").forEach(function (form) {
    const errorEl = form.querySelector("[data-snapshot-error]");
    const submit = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (errorEl) {
        errorEl.hidden = true;
        errorEl.textContent = "";
      }

      const payload = {
        url: ((form.querySelector('[name="url"]') || {}).value || "").trim(),
        email: ((form.querySelector('[name="email"]') || {}).value || "").trim(),
        company: ((form.querySelector('[name="company"]') || {}).value || "").trim(),
      };

      if (submit) {
        submit.disabled = true;
        submit.dataset.label = submit.dataset.label || submit.textContent;
        submit.textContent = "Sending…";
      }

      try {
        await send(payload);
        form.reset();
        showDone();
      } catch (error) {
        if (errorEl) {
          errorEl.hidden = false;
          errorEl.textContent = error.message || "Could not send the request. Try again.";
        }
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.textContent = submit.dataset.label;
        }
      }
    });
  });
})();
