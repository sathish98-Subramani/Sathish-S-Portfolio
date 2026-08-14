(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("mobile-open");
      toggle.setAttribute(
        "aria-expanded",
        links.classList.contains("mobile-open") ? "true" : "false"
      );
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("mobile-open");
      });
    });
  }

  /* ---------- Active nav link ---------- */
  var current = (location.pathname.split("/").pop() || "home.html").toLowerCase();
  if (current === "") current = "home.html";
  document.querySelectorAll(".nav-links a[href]").forEach(function (a) {
    var href = a.getAttribute("href").toLowerCase();
    if (href === current) a.classList.add("active");
  });

  /* ---------- Nav background on scroll ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 12) nav.style.borderBottomColor = "rgba(255,255,255,0.16)";
      else nav.style.borderBottomColor = "rgba(255,255,255,0.09)";
    };
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Scroll reveal (GPU: opacity/transform only) ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = el.getAttribute("data-reveal-delay") || 0;
            setTimeout(function () {
              el.classList.add("in-view");
            }, Number(delay));
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* ---------- Skill bar fill on reveal ---------- */
  var skillFills = document.querySelectorAll(".skill-fill[data-value]");
  if ("IntersectionObserver" in window && skillFills.length) {
    var ioSkill = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute("data-value") + "%";
            ioSkill.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    skillFills.forEach(function (el) { ioSkill.observe(el); });
  } else {
    skillFills.forEach(function (el) { el.style.width = el.getAttribute("data-value") + "%"; });
  }

  /* ---------- Cursor glow ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    var glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    var raf = null;
    document.addEventListener("pointermove", function (e) {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        glow.style.transform = "translate3d(" + e.clientX + "px," + e.clientY + "px,0)";
        glow.style.opacity = "1";
      });
    });
    document.addEventListener("pointerleave", function () { glow.style.opacity = "0"; });
  }

  /* ---------- Card tilt (subtle, desktop only) ---------- */
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (px * 8).toFixed(2) + "deg");
        card.style.setProperty("--rx", (py * -8).toFixed(2) + "deg");
      });
      card.addEventListener("mouseleave", function () {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* ---------- Smooth page-to-page fade transition ---------- */
  document.body.classList.add("page-ready");
  document.querySelectorAll('a[href$=".html"]').forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || a.target === "_blank" || href.startsWith("http")) return;
    a.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      document.body.style.opacity = "0";
      document.body.style.transform = "translateY(-8px)";
      document.body.style.transition = "opacity 260ms ease, transform 260ms ease";
      setTimeout(function () { window.location.href = href; }, 240);
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
