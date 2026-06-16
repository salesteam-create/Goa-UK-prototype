/* Goan Association (UK) — prototype interactions
   Small, dependency-free enhancements: mobile nav + text-size toggle. */

(function () {
  "use strict";

  /* ---- Mobile navigation drawer ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close the drawer after choosing a link (mobile)
    links.addEventListener("click", function (e) {
      if (e.target.closest("a") && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  /* ---- Accessible text-size toggle (A / A+ / A++) ---- */
  var html = document.documentElement;
  var sizeButtons = document.querySelectorAll(".textsize button");
  var STORAGE_KEY = "goauk-textsize";

  function applySize(size) {
    html.setAttribute("data-textsize", size);
    sizeButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.size === size));
    });
    try { localStorage.setItem(STORAGE_KEY, size); } catch (e) {}
  }

  sizeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { applySize(btn.dataset.size); });
  });

  // Restore saved preference
  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) applySize(saved);
  } catch (e) {}
})();
