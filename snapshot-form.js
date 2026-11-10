(function () {
  const modal = document.getElementById("snapshot-done");

  function track(eventName, detail) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: eventName }, detail || {}));
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, detail || {});
      }
    } catch (error) {
      console.warn("Analytics event failed", error);
    }
  }

  function setLinkedInUserData(email) {
    if (!email || typeof window.lintrk !== "function") return;
    try {
      window.lintrk("setUserData", { email: email });
    } catch (error) {
      console.warn("LinkedIn enhanced matching unavailable", error);
    }
  }

  function showDone() {
    if (!modal) return;
    modal.hidden = false;
    const card = modal.querySelector(".snapshot-modal-card");
    if (card) card.focus();
  }

  function onHomePage() {
    const path = location.pathname.replace(/index\.html$/, "");
    return path === "/" || path === "";
  }

  if (modal) {
    modal.querySelectorAll('a[href="/"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (!onHomePage()) return;
        event.preventDefault();
        modal.hidden = true;
        window.scrollTo(0, 0);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !modal.hidden) modal.hidden = true;
    });

    modal.addEventListener("click", function (event) {
      if (event.target === modal) modal.hidden = true;
    });
  }

  async function send(payload) {
    const response = await fetch("/api/snapshot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(function () {
      return {};
    });
    if (!response.ok || !data.ok) {
      throw new Error(data.error || "Could not send the request. Try again.");
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
        competitors: ((form.querySelector('[name="competitors"]') || {}).value || "").trim(),
        company: ((form.querySelector('[name="company"]') || {}).value || "").trim(),
      };

      if (submit) {
        submit.disabled = true;
        submit.dataset.label = submit.dataset.label || submit.textContent;
        submit.textContent = "Sending…";
      }

      try {
        await send(payload);
        setLinkedInUserData(payload.email);
        track("snapshot_submit_success");
        form.reset();
        showDone();
      } catch (error) {
        track("snapshot_submit_error");
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
