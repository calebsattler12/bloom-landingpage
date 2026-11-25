(function (global) {
  var STORE_KEY = "bloom_attribution_v1";
  var ATTR_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "referrer",
    "landing_page",
  ];

  function safeParse(raw) {
    if (!raw) return null;
    try {
      var data = JSON.parse(raw);
      return data && typeof data === "object" ? data : null;
    } catch (error) {
      return null;
    }
  }

  function readStore() {
    try {
      return safeParse(sessionStorage.getItem(STORE_KEY));
    } catch (error) {
      return null;
    }
  }

  function writeStore(data) {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch (error) {
      /* ignore quota / private mode */
    }
    try {
      document.cookie =
        STORE_KEY +
        "=" +
        encodeURIComponent(JSON.stringify(data)) +
        "; path=/; SameSite=Lax; max-age=2592000";
    } catch (error) {
      /* ignore cookie failures */
    }
  }

  function readCookie() {
    try {
      var parts = String(document.cookie || "").split("; ");
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].indexOf(STORE_KEY + "=") === 0) {
          return safeParse(decodeURIComponent(parts[i].slice(STORE_KEY.length + 1)));
        }
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  function trimValue(value) {
    return String(value || "").trim().slice(0, 500);
  }

  function capture() {
    var existing = readStore() || readCookie() || {};
    var params;
    try {
      params = new URLSearchParams(location.search);
    } catch (error) {
      params = { get: function () { return null; } };
    }

    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
    ].forEach(function (key) {
      var fromUrl = trimValue(params.get(key));
      if (fromUrl && !existing[key]) existing[key] = fromUrl;
    });

    if (!existing.landing_page) {
      existing.landing_page = location.pathname + location.search;
    }

    if (!existing.referrer && document.referrer) {
      existing.referrer = trimValue(document.referrer);
    }

    ATTR_KEYS.forEach(function (key) {
      if (existing[key]) existing[key] = trimValue(existing[key]);
      else existing[key] = "";
    });

    writeStore(existing);
    return existing;
  }

  function get() {
    return capture();
  }

  function ensureHidden(form, name, value) {
    var input = form.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      form.appendChild(input);
    }
    input.value = value || "";
    return input;
  }

  function applyHiddenFields(form) {
    if (!form) return get();
    var data = get();
    ATTR_KEYS.forEach(function (key) {
      ensureHidden(form, key, data[key] || "");
    });
    return data;
  }

  function heardAboutFromForm(form) {
    var select = form.querySelector('[name="heard_about"]');
    var other = form.querySelector('[name="heard_about_other"]');
    var heard = trimValue(select && select.value);
    var otherText = trimValue(other && other.value);
    if (heard === "Other" && otherText) return "Other: " + otherText.slice(0, 200);
    return heard;
  }

  function attributionPayload(form) {
    var data = form ? applyHiddenFields(form) : get();
    return {
      utm_source: data.utm_source || "",
      utm_medium: data.utm_medium || "",
      utm_campaign: data.utm_campaign || "",
      utm_term: data.utm_term || "",
      utm_content: data.utm_content || "",
      gclid: data.gclid || "",
      referrer: data.referrer || "",
      landing_page: data.landing_page || "",
      heard_about: form ? heardAboutFromForm(form) : "",
    };
  }

  function bindHeardAbout(root) {
    if (!root) return;
    var select = root.querySelector("[data-heard-about]");
    var wrap = root.querySelector("[data-heard-other-wrap]");
    if (!select || !wrap) return;

    function sync() {
      var show = select.value === "Other";
      wrap.hidden = !show;
      var input = wrap.querySelector("input, textarea");
      if (!input) return;
      if (!show) input.value = "";
    }

    if (!select.dataset.heardBound) {
      select.dataset.heardBound = "1";
      select.addEventListener("change", sync);
    }
    sync();
  }

  function initForms() {
    document.querySelectorAll("[data-snapshot-form], [data-loom-form], [data-book-call-form]").forEach(function (form) {
      applyHiddenFields(form);
      bindHeardAbout(form);
    });
  }

  capture();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initForms);
  } else {
    initForms();
  }

  global.BloomAttribution = {
    get: get,
    capture: capture,
    applyHiddenFields: applyHiddenFields,
    attributionPayload: attributionPayload,
    heardAboutFromForm: heardAboutFromForm,
    bindHeardAbout: bindHeardAbout,
    keys: ATTR_KEYS.slice(),
  };
})(window);
