(function () {
  const BOOK = "https://calendar.app.google/zw5FN51UGRgyidLv7";

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

  document.querySelectorAll('a[href="' + BOOK + '"]').forEach(function (link) {
    link.addEventListener("click", function () {
      track("book_call_click");
    });
  });

  if (location.pathname.indexOf("/snapshot/sample") === 0) {
    track("sample_report_view");
  }

  const toggle = document.querySelector("[data-nav-toggle]");
  const panel = document.querySelector("[data-nav-panel]");
  if (toggle && panel) {
    function setOpen(open) {
      panel.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Menu");
    }

    toggle.addEventListener("click", function () {
      const open = !panel.classList.contains("is-open");
      setOpen(open);
      if (open) {
        const first = panel.querySelector("a");
        if (first) first.focus();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && panel.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  const logoRows = document.querySelectorAll("[data-logo-row]");
  if (logoRows.length && Array.isArray(window.BLOOM_CLIENT_LOGOS) && window.BLOOM_CLIENT_LOGOS.length) {
    logoRows.forEach(function (row) {
      row.innerHTML = "";
      function appendSet(ariaHidden) {
        window.BLOOM_CLIENT_LOGOS.forEach(function (logo) {
          const img = document.createElement("img");
          img.src = logo.src;
          img.alt = ariaHidden ? "" : (logo.alt || "");
          if (ariaHidden) img.setAttribute("aria-hidden", "true");
          img.loading = "lazy";
          img.decoding = "async";
          img.width = 140;
          img.height = 48;
          row.appendChild(img);
        });
      }
      appendSet(false);
      // Duplicate set for a seamless marquee loop
      appendSet(true);
    });
  } else {
    document.querySelectorAll("[data-logo-row]").forEach(function (row) {
      row.innerHTML = '<p class="todo-note">TODO_LOGO: add client marks to /logos/clients/</p>';
    });
  }

  document.querySelectorAll("[data-faq] details").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      item.parentElement.querySelectorAll("details").forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const reveals = document.querySelectorAll("[data-reveal]");
    if (reveals.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach(function (el) {
        io.observe(el);
      });
    } else {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  } else {
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
