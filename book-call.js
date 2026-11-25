(function () {
  var BOOK = "https://calendar.app.google/zw5FN51UGRgyidLv7";
  var modal = null;
  var lastFocus = null;

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

  function heardAboutOptionsHtml() {
    return [
      '<option value="">Select one</option>',
      '<option value="Google search">Google search</option>',
      '<option value="ChatGPT / AI assistant">ChatGPT / AI assistant</option>',
      '<option value="LinkedIn">LinkedIn</option>',
      '<option value="X">X</option>',
      '<option value="Referral">Referral</option>',
      '<option value="Podcast or event">Podcast or event</option>',
      '<option value="Other">Other</option>',
    ].join("");
  }

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "snapshot-modal book-call-modal";
    modal.id = "book-call-modal";
    modal.hidden = true;
    modal.innerHTML =
      '<div class="snapshot-modal-card book-call-card" tabindex="-1" role="dialog" aria-labelledby="book-call-title" aria-modal="true">' +
      '<button type="button" class="book-call-close" data-book-call-close aria-label="Close">×</button>' +
      '<h2 id="book-call-title">Book a call</h2>' +
      '<p class="book-call-lede">A few details help us prepare. Then we open the calendar.</p>' +
      '<form class="book-call-form" data-book-call-form action="/api/book-call" method="post" novalidate>' +
      '<label class="field-wide">' +
      '<span class="field-label">Company website</span>' +
      '<input type="url" name="url" required placeholder="https://yourcompany.com" autocomplete="url" inputmode="url" spellcheck="false" aria-describedby="book-call-error">' +
      "</label>" +
      '<label class="field-wide">' +
      '<span class="field-label">Your role</span>' +
      '<input type="text" name="role" required placeholder="Founder, marketing lead, …" autocomplete="organization-title" aria-describedby="book-call-error">' +
      "</label>" +
      '<label class="field-wide">' +
      '<span class="field-label">What do you want help with?</span>' +
      '<textarea name="help_with" required rows="3" placeholder="Content library, AI search visibility, technical health, …" aria-describedby="book-call-error"></textarea>' +
      "</label>" +
      '<label class="field-wide">' +
      '<span class="field-label">How did you hear about us? <span class="field-optional">(optional)</span></span>' +
      '<select name="heard_about" data-heard-about aria-describedby="book-call-error">' +
      heardAboutOptionsHtml() +
      "</select>" +
      "</label>" +
      '<label class="field-wide" data-heard-other-wrap hidden>' +
      '<span class="field-label">Please tell us more</span>' +
      '<input type="text" name="heard_about_other" autocomplete="off" aria-describedby="book-call-error">' +
      "</label>" +
      '<label class="hp" aria-hidden="true"><span>Company</span><input type="text" name="company" tabindex="-1" autocomplete="off"></label>' +
      '<input type="hidden" name="utm_source" value="">' +
      '<input type="hidden" name="utm_medium" value="">' +
      '<input type="hidden" name="utm_campaign" value="">' +
      '<input type="hidden" name="utm_term" value="">' +
      '<input type="hidden" name="utm_content" value="">' +
      '<input type="hidden" name="gclid" value="">' +
      '<input type="hidden" name="referrer" value="">' +
      '<input type="hidden" name="landing_page" value="">' +
      '<div class="field-submit">' +
      '<button class="btn btn-primary" type="submit">Continue to calendar</button>' +
      '<div class="form-live" aria-live="polite">' +
      '<p class="form-error" id="book-call-error" data-book-call-error tabindex="-1" hidden></p>' +
      "</div>" +
      "</div>" +
      "</form>" +
      "</div>";
    document.body.appendChild(modal);

    var form = modal.querySelector("[data-book-call-form]");
    if (window.BloomAttribution) {
      window.BloomAttribution.applyHiddenFields(form);
      window.BloomAttribution.bindHeardAbout(form);
    }

    modal.querySelectorAll("[data-book-call-close]").forEach(function (btn) {
      btn.addEventListener("click", closeModal);
    });

    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });

    form.addEventListener("submit", onSubmit);
    return modal;
  }

  function backgroundRoots() {
    return Array.prototype.filter.call(document.body.children, function (el) {
      return el !== modal;
    });
  }

  function focusableInModal() {
    if (!modal) return [];
    return Array.prototype.filter.call(
      modal.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ),
      function (el) {
        return !el.hidden && el.getAttribute("aria-hidden") !== "true" && el.offsetParent !== null;
      }
    );
  }

  function openModal(trigger) {
    ensureModal();
    lastFocus = trigger || document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    backgroundRoots().forEach(function (el) {
      el.setAttribute("inert", "");
    });
    if (window.BloomAttribution) {
      window.BloomAttribution.applyHiddenFields(modal.querySelector("[data-book-call-form]"));
    }
    var first = modal.querySelector('input[name="url"]');
    if (first) first.focus();
    else {
      var card = modal.querySelector(".book-call-card");
      if (card) card.focus();
    }
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

  async function onSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var errorEl = form.querySelector("[data-book-call-error]");
    var submit = form.querySelector('button[type="submit"]');
    if (errorEl) {
      errorEl.hidden = true;
      errorEl.textContent = "";
    }

    var attr =
      window.BloomAttribution && typeof window.BloomAttribution.attributionPayload === "function"
        ? window.BloomAttribution.attributionPayload(form)
        : {};

    var payload = Object.assign(
      {
        url: ((form.querySelector('[name="url"]') || {}).value || "").trim(),
        role: ((form.querySelector('[name="role"]') || {}).value || "").trim(),
        help_with: ((form.querySelector('[name="help_with"]') || {}).value || "").trim(),
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
      var response = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      var data = await response.json().catch(function () {
        return {};
      });
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not send the request. Try again.");
      }

      track("book_call_click", {
        landing_page: payload.landing_page || "",
        utm_source: payload.utm_source || "",
        heard_about: payload.heard_about || "",
      });

      form.reset();
      if (window.BloomAttribution) {
        window.BloomAttribution.applyHiddenFields(form);
        window.BloomAttribution.bindHeardAbout(form);
      }
      closeModal();
      window.open(BOOK, "_blank", "noopener");
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
  }

  function isBookLink(anchor) {
    if (!anchor || !anchor.getAttribute) return false;
    var href = anchor.getAttribute("href") || "";
    return href.indexOf("calendar.app.google/") !== -1;
  }

  document.addEventListener("click", function (event) {
    var anchor = event.target.closest ? event.target.closest("a") : null;
    if (!isBookLink(anchor)) return;
    event.preventDefault();
    openModal(anchor);
  });

  document.addEventListener("keydown", function (event) {
    if (!modal || modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;
    var items = focusableInModal();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    var card = modal.querySelector(".book-call-card");
    if (event.shiftKey && (document.activeElement === first || document.activeElement === card)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
