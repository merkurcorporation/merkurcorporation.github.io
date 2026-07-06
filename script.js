/* ═══════════════════════════════════════════════════════════════════
   Merkur Corporation — Script
   ════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const root = document.documentElement;
  const navbar = document.querySelector(".navbar");
  const logoImg = document.getElementById("navbar-logo");

  /* ── Theme cycling: system → dark → light → system ─────── */
  const themeBtn = document.getElementById("theme-btn");
  const themes = ["system", "dark", "light"];
  const icons = { system: "◐", dark: "☾", light: "☀" };

  let current = localStorage.getItem("merkur-theme") || "system";
  root.setAttribute("data-theme", current);
  themeBtn.textContent = icons[current];
  updateLogo(current);

  themeBtn.addEventListener("click", function () {
    const i = (themes.indexOf(current) + 1) % themes.length;
    current = themes[i];
    root.setAttribute("data-theme", current);
    localStorage.setItem("merkur-theme", current);
    themeBtn.textContent = icons[current];
    updateLogo(current);
  });

  function updateLogo(theme) {
    const resolved = theme === "system" 
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : theme;
    logoImg.src = resolved === "dark" 
      ? "images/logo_transparent.png" 
      : "images/logo_transparent_black.png";
  }

  // Listen for system theme changes when in "system" mode
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (current === "system") {
      updateLogo("system");
    }
  });

  /* ── Navbar scroll effect ────────────────────────────────── */
  function handleNavbarScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });

  /* ── Mobile menu toggle ──────────────────────────────────── */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("is-open");
  });

  // Close menu on link click
  navLinks.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      navLinks.classList.remove("is-open");
    });
  });

  /* ── Scroll fade-in ──────────────────────────────────────── */
  const fadeEls = document.querySelectorAll(".fade-in");

  function checkFade() {
    const trigger = window.innerHeight * 0.88;
    fadeEls.forEach(function (el) {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add("is-visible");
      }
    });
  }

  window.addEventListener("scroll", checkFade, { passive: true });
  window.addEventListener("resize", checkFade, { passive: true });
  checkFade();

  /* ── Smooth scroll for all anchor links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

})();
