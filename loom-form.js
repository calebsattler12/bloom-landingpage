(function () {
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

  document.querySelectorAll("[data-loom-form]").forEach(function (form) {
    const errorEl = form.querySelector("[data-loom-error]");
    const successEl = form.parentElement.querySelector("[data-loom-success]");
    const submit = form.querySelector('button[type="submit"]');

    if (window.BloomAttribution) {
      window.BloomAttribution.applyHiddenFields(form);
      window.BloomAttribution.bindHeardAbout(form);
    }

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      if (errorEl) {
        errorEl.hidden = true;
        errorEl.textContent = "";
      }

      const attr =
        window.BloomAttribution && typeof window.BloomAttribution.attributionPayload === "function"
          ? window.BloomAttribution.attributionPayload(form)
          : {};

      const payload = Object.assign(
        {
          name: ((form.querySelector('[name="name"]') || {}).value || "").trim(),
          email: ((form.querySelector('[name="email"]') || {}).value || "").trim(),
          url: ((form.querySelector('[name="url"]') || {}).value || "").trim(),
          company: ((form.querySelector('[name="company"]') || {}).value || "").trim(),
        },
        attr
      );

      if (submit) {
        submit.disabled = true;
        submit.setAttribute("aria-busy", "true");
        submit.dataset.label = submit.dataset.label || submit.textContent;
        submit.textContent = "Sending…";
      }

      try {
        const response = await fetch("/api/loom-teardown", {
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
        track("loom_request", {
          landing_page: payload.landing_page || "",
          utm_source: payload.utm_source || "",
          heard_about: payload.heard_about || "",
        });
        form.reset();
        if (window.BloomAttribution) {
          window.BloomAttribution.applyHiddenFields(form);
          window.BloomAttribution.bindHeardAbout(form);
        }
        if (successEl) {
          successEl.hidden = false;
          successEl.focus();
        }
        form.hidden = true;
      } catch (error) {
        if (errorEl) {
          errorEl.hidden = false;
          errorEl.textContent = error.message || "Could not send the request. Try again.";
          errorEl.focus();
        }
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.removeAttribute("aria-busy");
          submit.textContent = submit.dataset.label;
        }
      }
    });
  });
})();
