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
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        appendSet(true);
      }
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

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("[data-logo-marquee]").forEach(function (marquee) {
      marquee.removeAttribute("tabindex");
    });
  }

  initReveals();
})();

function initReveals() {
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  function disarm() {
    document.documentElement.classList.remove("js-motion");
    document.documentElement.setAttribute("data-motion-ready", "");
  }

  if (typeof motionQuery.addEventListener === "function") {
    motionQuery.addEventListener("change", function () {
      if (motionQuery.matches) disarm();
    });
  }

  if (motionQuery.matches || !("IntersectionObserver" in window)) {
    disarm();
    return;
  }

  var roots = document.querySelectorAll("[data-reveal]");
  if (!roots.length) {
    disarm();
    return;
  }

  var io;
  try {
    io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (!entries[i].isIntersecting) continue;
          var el = entries[i].target;
          var items = el.querySelectorAll("[data-reveal-item]");
          for (var j = 0; j < items.length; j++) {
            items[j].style.transitionDelay = Math.min(j, 7) * 40 + "ms";
          }
          el.classList.add("is-visible");
          io.unobserve(el);
          (function (group) {
            window.setTimeout(function () {
              for (var n = 0; n < group.length; n++) group[n].style.transitionDelay = "";
            }, 780);
          })(items);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -32px 0px" }
    );
  } catch (error) {
    disarm();
    return;
  }

  document.documentElement.classList.add("js-motion");
  document.documentElement.setAttribute("data-motion-ready", "");
  for (var k = 0; k < roots.length; k++) io.observe(roots[k]);
}
