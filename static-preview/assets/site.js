/* ===========================================================================
   BH OVERSEAS — interaction layer (static build)
   Plain ES5-compatible script so the build runs from file:// with no toolchain.
   The Next.js app implements the same behaviour as React components.
   =========================================================================== */
(function () {
  "use strict";

  var METALS = window.METALS || [];
  var COMPANY = window.COMPANY || {};
  var MF = window.MaterialField;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ==================================================== reveal on scroll == */
  var revealObserver = null;
  function initReveal() {
    var targets = document.querySelectorAll("[data-reveal], .reveal-lines, .mask-reveal, .principle");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      for (var i = 0; i < targets.length; i++) targets[i].classList.add("is-revealed");
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-revealed");
          revealObserver.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });

    for (var j = 0; j < targets.length; j++) revealObserver.observe(targets[j]);
  }
  /** Re-scan after we inject markup. */
  function observeNew(root) {
    if (!revealObserver) {
      var t = root.querySelectorAll("[data-reveal], .reveal-lines, .principle");
      for (var i = 0; i < t.length; i++) t[i].classList.add("is-revealed");
      return;
    }
    var targets = root.querySelectorAll("[data-reveal], .reveal-lines, .principle");
    for (var k = 0; k < targets.length; k++) revealObserver.observe(targets[k]);
  }

  /* ============================================================== nav ==== */
  function initNav() {
    var nav = $("#nav");
    var toggle = $("#navToggle");
    var drawer = $("#navDrawer");
    var lastY = window.pageYOffset;
    var ticking = false;

    function onScroll() {
      var y = window.pageYOffset;
      nav.classList.toggle("is-solid", y > 24);
      // Hide on downward scroll once clear of the hero; always show on the way up.
      if (y > 560 && y > lastY + 4 && !drawer.classList.contains("is-open")) {
        nav.classList.add("is-hidden");
      } else if (y < lastY - 4 || y < 200) {
        nav.classList.remove("is-hidden");
      }
      lastY = y;
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    /* ---- mobile drawer --------------------------------------------------- */
    function setDrawer(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("is-locked", open);
      if (open) {
        drawer.hidden = false;
        // next frame so the transition runs
        window.requestAnimationFrame(function () { drawer.classList.add("is-open"); });
        nav.classList.remove("is-hidden");
      } else {
        drawer.classList.remove("is-open");
        window.setTimeout(function () {
          if (!drawer.classList.contains("is-open")) drawer.hidden = true;
        }, reduceMotion ? 0 : 340);
      }
    }
    toggle.addEventListener("click", function () {
      setDrawer(toggle.getAttribute("aria-expanded") !== "true");
    });
    drawer.addEventListener("click", function (e) {
      if (e.target.closest("a")) setDrawer(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setDrawer(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900 && toggle.getAttribute("aria-expanded") === "true") setDrawer(false);
    });

    /* ---- active section -------------------------------------------------- */
    var links = document.querySelectorAll(".nav__link");
    var map = {};
    for (var i = 0; i < links.length; i++) {
      var id = links[i].getAttribute("href").slice(1);
      if (id) map[id] = links[i];
    }
    if ("IntersectionObserver" in window) {
      var secObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var link = map[e.target.id];
          if (!link) return;
          if (e.isIntersecting) {
            for (var n = 0; n < links.length; n++) links[n].classList.remove("is-active");
            link.classList.add("is-active");
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      Object.keys(map).forEach(function (id) {
        var s = document.getElementById(id);
        if (s) secObs.observe(s);
      });
    }
  }

  /* ====================================================== hero parallax == */
  function initHeroParallax() {
    var img = $("#heroImg");
    if (!img || reduceMotion) return;
    var ticking = false;
    function update() {
      var y = window.pageYOffset;
      if (y < window.innerHeight * 1.2) {
        // Small, slow, and always scaled up so no edge is ever exposed.
        img.style.transform = "scale(1.08) translate3d(0," + (y * 0.055).toFixed(2) + "px,0)";
      }
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ======================================================== index bar ==== */
  function buildIndexBar() {
    var host = $("#indexBar");
    if (!host) return;
    METALS.forEach(function (m) {
      var li = el("li", "index-bar__cell");
      var a = el("a", "index-bar__item");
      a.href = "#metals";
      a.setAttribute("data-metal", m.id);
      a.innerHTML =
        '<span class="index-bar__num">' + m.number + "</span>" +
        '<span class="index-bar__sym">' + esc(m.symbol) + "</span>" +
        '<span class="index-bar__name">' + esc(m.name) + "</span>";
      a.addEventListener("click", function () { selectMetal(m.id, true); });
      li.appendChild(a);
      host.appendChild(li);
    });
  }

  /* =================================================== metal explorer ==== */
  var currentMetal = null;
  var panelCanvas = null;

  function metalById(id) {
    for (var i = 0; i < METALS.length; i++) if (METALS[i].id === id) return METALS[i];
    return METALS[0];
  }

  function buildTabs() {
    var host = $("#metalTabs");
    if (!host) return;
    METALS.forEach(function (m, i) {
      var b = el("button", "metal-tab");
      b.type = "button";
      b.id = "tab-" + m.id;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === 0 ? "true" : "false");
      b.setAttribute("aria-controls", "metal-panel");
      b.setAttribute("tabindex", i === 0 ? "0" : "-1");
      b.setAttribute("data-metal", m.id);
      b.innerHTML =
        '<canvas class="metal-tab__field" aria-hidden="true"></canvas>' +
        '<span class="metal-tab__top">' +
          '<span class="metal-tab__num">' + m.number + "</span>" +
          '<span class="metal-tab__mass">' + esc(m.mass) + "</span>" +
        "</span>" +
        '<span class="metal-tab__sym">' + esc(m.symbol) + "</span>" +
        '<span class="metal-tab__name">' + esc(m.name) + "</span>";
      b.addEventListener("click", function () { selectMetal(m.id); });
      b.addEventListener("keydown", onTabKey);
      host.appendChild(b);
    });
  }

  function onTabKey(e) {
    var keys = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 };
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".metal-tab"));
    var idx = tabs.indexOf(e.currentTarget);
    var next = null;
    if (keys[e.key]) next = (idx + keys[e.key] + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    tabs[next].focus();
    selectMetal(tabs[next].getAttribute("data-metal"));
  }

  function renderTabFields() {
    if (!MF) return;
    var tabs = document.querySelectorAll(".metal-tab");
    for (var i = 0; i < tabs.length; i++) {
      var c = tabs[i].querySelector("canvas");
      var m = metalById(tabs[i].getAttribute("data-metal"));
      if (c && c.clientWidth) MF.renderMaterialField(c, m.palette, { seed: m.id, quality: 0.5 });
    }
  }

  function renderPanelField() {
    if (!MF || !panelCanvas || !currentMetal) return;
    if (!panelCanvas.clientWidth) return;
    MF.renderMaterialField(panelCanvas, currentMetal.palette, { seed: currentMetal.id, quality: 1 });
  }

  function buildPanel(m) {
    var wrap = el("div", "metal-panel metal-panel__swap");
    wrap.id = "metal-panel";
    wrap.setAttribute("role", "tabpanel");
    wrap.setAttribute("aria-labelledby", "tab-" + m.id);
    wrap.setAttribute("tabindex", "0");

    var formsList = m.forms.map(function (f) {
      return '<span class="spec__chip">' + esc(f) + "</span>";
    }).join("");

    wrap.innerHTML =
      '<div class="metal-panel__visual">' +
        '<canvas class="metal-panel__canvas" aria-hidden="true"></canvas>' +
        '<div class="metal-panel__glyph">' +
          '<span class="metal-panel__glyph-sym">' + esc(m.symbol) + "</span>" +
          '<span class="metal-panel__glyph-num">' + m.number + " &middot; " + esc(m.mass) + "</span>" +
        "</div>" +
      "</div>" +
      '<div class="metal-panel__body">' +
        '<div class="metal-panel__heading">' +
          '<h3 class="metal-panel__name">' + esc(m.name) + "</h3>" +
          '<p class="metal-panel__tagline">' +
            m.tagline.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") +
          "</p>" +
        "</div>" +
        '<p class="metal-panel__desc">' + esc(m.description) + "</p>" +
        '<div class="spec">' +
          '<p class="spec__label">Available forms</p>' +
          '<div class="spec__list">' + formsList + "</div>" +
          (m.formsNote ? '<p class="spec__inline">' + esc(m.formsNote.charAt(0).toUpperCase() + m.formsNote.slice(1)) + ".</p>" : "") +
        "</div>" +
        '<div class="spec">' +
          '<p class="spec__label">Applications</p>' +
          '<p class="spec__inline">' +
            m.applications.map(function (a) { return "<b>" + esc(a) + "</b>"; }).join(" &nbsp;·&nbsp; ") +
          "</p>" +
        "</div>" +
        '<div class="metal-panel__foot">' +
          '<a class="btn" href="#enquiry" data-enquire="' + esc(m.name) + '">' +
            "Enquire about " + esc(m.name) +
            '<span class="btn__arrow" aria-hidden="true">&#8594;</span></a>' +
          '<span class="mono">Availability subject to specification</span>' +
        "</div>" +
      "</div>";

    return wrap;
  }

  function selectMetal(id, scrollTo) {
    var m = metalById(id);
    if (currentMetal && currentMetal.id === m.id && !scrollTo) return;
    currentMetal = m;

    var tabs = document.querySelectorAll(".metal-tab");
    for (var i = 0; i < tabs.length; i++) {
      var on = tabs[i].getAttribute("data-metal") === m.id;
      tabs[i].setAttribute("aria-selected", on ? "true" : "false");
      tabs[i].setAttribute("tabindex", on ? "0" : "-1");
    }

    var host = $("#metalPanel");
    host.innerHTML = "";
    var panel = buildPanel(m);
    host.appendChild(panel);
    panelCanvas = panel.querySelector(".metal-panel__canvas");
    renderPanelField();

    var btn = panel.querySelector("[data-enquire]");
    if (btn) {
      btn.addEventListener("click", function () {
        var sel = $("#f-metal");
        if (sel) {
          sel.value = m.name;
          sel.closest(".field").classList.remove("has-error");
        }
      });
    }

    if (scrollTo) {
      var target = document.getElementById("metals");
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  function initExplorer() {
    buildTabs();
    selectMetal(METALS[0].id);

    // Material fields are expensive; only draw them once the section is close.
    if ("IntersectionObserver" in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { renderTabFields(); renderPanelField(); obs.disconnect(); }
        });
      }, { rootMargin: "300px" });
      obs.observe($("#metals"));
    } else {
      renderTabFields();
    }

    var t;
    window.addEventListener("resize", function () {
      window.clearTimeout(t);
      t = window.setTimeout(function () { renderTabFields(); renderPanelField(); }, 220);
    });
  }

  /* ========================================================= specimens === */
  function buildSpecimens() {
    var host = $("#specimens");
    if (!host || !COMPANY.specimens) return;
    COMPANY.specimens.forEach(function (s, i) {
      var fig = el("figure", "specimen");
      fig.setAttribute("data-reveal", "");
      fig.style.setProperty("--reveal-delay", (i * 110) + "ms");
      fig.innerHTML =
        '<div class="specimen__frame mask-reveal">' +
          '<span class="specimen__tag">' + esc(s.tag) + "</span>" +
          '<img src="' + esc(s.src) + '" alt="' + esc(s.alt) + '" loading="lazy" decoding="async">' +
        "</div>" +
        '<figcaption class="specimen__caption">' +
          '<span class="specimen__title">' + esc(s.title) + "</span>" +
          '<span class="specimen__note">' + esc(s.note) + "</span>" +
        "</figcaption>";
      host.appendChild(fig);
    });
    observeNew(host);
  }

  /* ====================================================== capabilities === */
  function buildCaps() {
    var host = $("#caps");
    if (!host || !COMPANY.capabilities) return;
    COMPANY.capabilities.forEach(function (c, i) {
      var row = el("article", "cap");
      row.setAttribute("data-reveal", "");
      row.style.setProperty("--reveal-delay", (i * 90) + "ms");
      row.innerHTML =
        '<span class="cap__idx">0' + (i + 1) + "</span>" +
        '<h3 class="cap__name">' + esc(c.name) + "</h3>" +
        '<p class="cap__copy">' + esc(c.copy) + "</p>";
      host.appendChild(row);
    });
    observeNew(host);
  }

  /* ================================================ secondary materials == */
  function buildSecondary() {
    var list = $("#materialList");
    if (list && COMPANY.secondary) {
      COMPANY.secondary.materials.forEach(function (m) {
        list.appendChild(el("li", null, m));
      });
    }
    var flow = $("#flow");
    if (flow && COMPANY.secondary) {
      COMPANY.secondary.flow.forEach(function (s, i) {
        var step = el("div", "flow__step" + (s.terminal ? " flow__step--terminal" : ""));
        step.innerHTML =
          '<span class="flow__idx">' + ("0" + (i + 1)) + "</span>" +
          '<span class="flow__name">' + esc(s.name) + "</span>" +
          '<span class="flow__note">' + esc(s.note) + "</span>";
        flow.appendChild(step);
      });
    }
  }

  /* ========================================================= principles == */
  function buildPrinciples() {
    var host = $("#principles");
    if (!host || !COMPANY.principles) return;
    COMPANY.principles.forEach(function (p, i) {
      var row = el("article", "principle");
      row.style.setProperty("--reveal-delay", (i * 120) + "ms");
      row.innerHTML =
        '<span class="principle__line" aria-hidden="true"></span>' +
        '<span class="principle__idx">' + ("0" + (i + 1)) + "</span>" +
        '<h3 class="principle__name">' + esc(p.name) + "</h3>" +
        '<p class="principle__copy">' + esc(p.copy) + "</p>";
      host.appendChild(row);
    });
    observeNew(host);
  }

  /* =============================================================== form == */
  function initForm() {
    var form = $("#enquiryForm");
    if (!form) return;

    var metalSel = $("#f-metal");
    METALS.forEach(function (m) {
      metalSel.appendChild(new Option(m.name, m.name));
    });
    metalSel.appendChild(new Option("Other", "Other"));

    var formSel = $("#f-form");
    (COMPANY.enquiry ? COMPANY.enquiry.forms : []).forEach(function (f) {
      formSel.appendChild(new Option(f, f));
    });

    var status = $("#formStatus");
    var btn = $("#submitBtn");

    function setError(input, on) {
      var cell = input.closest(".field");
      if (cell) cell.classList.toggle("has-error", on);
      input.setAttribute("aria-invalid", on ? "true" : "false");
    }

    function validate() {
      var invalid = [];
      var required = form.querySelectorAll("[required]");
      for (var i = 0; i < required.length; i++) {
        var f = required[i];
        var ok = f.value.trim() !== "";
        if (ok && f.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value.trim());
        setError(f, !ok);
        if (!ok) invalid.push(f);
      }
      return invalid;
    }

    // Clear the error as soon as the field is corrected.
    form.addEventListener("input", function (e) {
      var f = e.target;
      if (f.hasAttribute("required") && f.closest(".field").classList.contains("has-error")) {
        if (f.value.trim() !== "") setError(f, false);
      }
    });
    form.addEventListener("change", function (e) {
      var f = e.target;
      if (f.hasAttribute("required") && f.value.trim() !== "") setError(f, false);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.hidden = true;
      status.className = "form-status";

      var invalid = validate();
      if (invalid.length) {
        status.hidden = false;
        status.className = "form-status form-status--error";
        status.innerHTML = "<b>" + invalid.length + (invalid.length === 1 ? " field needs" : " fields need") +
          " attention.</b> Please complete the highlighted fields and submit again.";
        invalid[0].focus();
        return;
      }

      btn.classList.add("is-busy");

      var d = {};
      ["metal", "purity", "form", "quantity", "application", "company", "name", "email", "phone", "notes"]
        .forEach(function (k) {
          var f = form.elements[k];
          d[k] = f ? f.value.trim() : "";
        });

      var lines = [
        "Metal: " + d.metal,
        "Purity: " + d.purity,
        "Form: " + d.form,
        "Quantity: " + d.quantity,
        d.application ? "Application: " + d.application : "",
        "",
        "Company: " + d.company,
        "Name: " + d.name,
        "Email: " + d.email,
        d.phone ? "Phone: " + d.phone : "",
        d.notes ? "\nFurther detail:\n" + d.notes : ""
      ].filter(Boolean).join("\n");

      var subject = "Enquiry — " + d.metal + " · " + d.purity + " · " + d.form + " · " + d.quantity;
      var href = "mailto:sales@bhoverseas.com?subject=" + encodeURIComponent(subject) +
                 "&body=" + encodeURIComponent(lines);

      // The static build has no server, so the enquiry is handed to the
      // visitor's mail client fully composed. The Next.js app posts to
      // /api/enquiry instead.
      window.setTimeout(function () {
        btn.classList.remove("is-busy");
        window.location.href = href;
        status.hidden = false;
        status.className = "form-status";
        status.innerHTML =
          "<b>Your specification is ready to send.</b> Your email application has opened with " +
          "the details composed. If nothing opened, email <a class=\"link\" href=\"mailto:sales@bhoverseas.com\">" +
          "sales@bhoverseas.com</a> with the metal, purity, form and quantity you require.";
        status.focus && status.focus();
      }, 420);
    });
  }

  /* =============================================================== init == */
  function init() {
    buildIndexBar();
    buildSpecimens();
    buildCaps();
    buildSecondary();
    buildPrinciples();
    if (METALS.length) initExplorer();
    initForm();
    initNav();
    initHeroParallax();
    initReveal();
    // Anything already on screen at load should be revealed immediately.
    window.requestAnimationFrame(function () {
      var above = document.querySelectorAll(".hero [data-reveal], .hero .reveal-lines");
      for (var i = 0; i < above.length; i++) above[i].classList.add("is-revealed");
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
