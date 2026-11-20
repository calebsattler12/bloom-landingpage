window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

(function () {
  var reduce = false;
  try {
    reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (error) {
    reduce = true;
  }
  if (!reduce) document.documentElement.classList.add("js-motion");
  document.addEventListener("DOMContentLoaded", function () {
    if (!document.documentElement.hasAttribute("data-motion-ready")) {
      document.documentElement.classList.remove("js-motion");
    }
  });
})();
