(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let observer = null;

  function setActive(tips, sections, index) {
    tips.forEach((tip, i) => {
      const on = i === index;
      tip.classList.toggle("is-active", on);
      tip.setAttribute("aria-current", on ? "true" : "false");
    });
    sections.forEach((sec, i) => {
      sec.classList.toggle("is-highlighted", i === index);
    });
    const live = document.getElementById("annotate-live");
    if (live && sections[index]) {
      live.textContent = sections[index].getAttribute("data-caption") || "";
    }
  }

  window.initDisplayAnnotate = function initDisplayAnnotate() {
    const rail = document.getElementById("annotate-rail");
    const sections = [...document.querySelectorAll("[data-caption]")];
    if (!rail || !sections.length) return;

    rail.innerHTML = "";
    const tips = sections.map((sec, i) => {
      const tip = document.createElement("button");
      tip.type = "button";
      tip.className = "annotate-tip";
      tip.innerHTML =
        '<span class="annotate-arrow" aria-hidden="true"></span>' +
        '<span class="annotate-copy">' +
        '<span class="annotate-kicker">In this report</span>' +
        '<span class="annotate-text"></span>' +
        "</span>";
      tip.querySelector(".annotate-text").textContent = sec.getAttribute("data-caption") || "";
      tip.addEventListener("click", () => {
        sec.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      });
      rail.appendChild(tip);
      return tip;
    });

    setActive(tips, sections, 0);

    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (reduce) {
      tips.forEach((tip) => tip.classList.add("is-active"));
      sections.forEach((sec) => sec.classList.add("is-highlighted"));
      return;
    }

    const ratios = new Map();
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
        });
        let best = 0;
        let bestRatio = -1;
        sections.forEach((sec, i) => {
          const r = ratios.get(sec) || 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = i;
          }
        });
        if (bestRatio > 0) setActive(tips, sections, best);
      },
      { rootMargin: "-18% 0px -42% 0px", threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
    );

    sections.forEach((sec) => observer.observe(sec));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.querySelector("[data-caption]") && document.getElementById("annotate-rail")) {
        window.initDisplayAnnotate();
      }
    });
  } else if (document.querySelector("[data-caption]") && document.getElementById("annotate-rail")) {
    window.initDisplayAnnotate();
  }
})();
