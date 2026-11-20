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

  let lastFocus = null;

  function backgroundRoots() {
    return Array.prototype.filter.call(document.body.children, function (el) {
      return el !== modal;
    });
  }

  function focusableInModal() {
    if (!modal) return [];
    return Array.prototype.filter.call(
      modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])'),
      function (el) {
        return !el.hidden && el.getAttribute("aria-hidden") !== "true";
      }
    );
  }

  function showDone() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    backgroundRoots().forEach(function (el) {
      el.setAttribute("inert", "");
    });
    const card = modal.querySelector(".snapshot-modal-card");
    if (card) card.focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    backgroundRoots().forEach(function (el) {
      el.removeAttribute("inert");
    });
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function onHomePage() {
    const path = location.pathname.replace(/index\.html$/, "");
    return path === "/" || path === "";
  }

  if (modal) {
    modal.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        closeModal();
      });
    });

    modal.querySelectorAll('a[href="/"]').forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (!onHomePage()) return;
        event.preventDefault();
        closeModal();
        window.scrollTo(0, 0);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (modal.hidden) return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusableInModal();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const card = modal.querySelector(".snapshot-modal-card");
      if (event.shiftKey && (document.activeElement === first || document.activeElement === card)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
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
        submit.setAttribute("aria-busy", "true");
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
