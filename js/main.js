/* ============================================================
   Collin Lucken — Site JavaScript
   Dark mode, mobile nav, abstract toggles, scroll effects
   ============================================================ */

(function () {
  'use strict';

  // --- Dark Mode Toggle ---
  const THEME_KEY = 'cl-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.innerHTML = theme === 'dark' ? '&#9788;' : '&#9790;';
    }
  }

  function initTheme() {
    applyTheme(getPreferredTheme());
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  }

  // --- Mobile Navigation ---
  function initMobileNav() {
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Sticky Header Shadow ---
  function initScrollEffects() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          header.classList.toggle('scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Abstract Toggle ---
  function initAbstractToggles() {
    document.querySelectorAll('.pub-abstract-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const abstract = btn.closest('.publication').querySelector('.pub-abstract');
        if (!abstract) return;

        const isOpen = abstract.classList.contains('open');
        abstract.classList.toggle('open');
        btn.textContent = isOpen ? '[ Abstract ]' : '[ Hide Abstract ]';
        btn.setAttribute('aria-expanded', !isOpen);
      });
    });
  }

  // --- Active Nav Link ---
  function initActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // --- Initialize ---
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initMobileNav();
    initScrollEffects();
    initAbstractToggles();
    initActiveNav();
  });
})();
