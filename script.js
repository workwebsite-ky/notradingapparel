/* =====================================================================
   NoTrading Apparel — site interactions
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- preloader ---------- */
  window.addEventListener("load", function () {
    var pl = document.querySelector(".preloader");
    if (pl) setTimeout(function () { pl.classList.add("done"); }, 450);
  });

  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- sticky nav state ---------- */
    var nav = document.querySelector(".nav");
    var onScroll = function () {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
      var top = document.querySelector(".fab-top");
      if (top) top.classList.toggle("show", window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- mobile menu ---------- */
    var burger = document.querySelector(".burger");
    var links = document.querySelector(".nav-links");
    var overlay = document.querySelector(".nav-overlay");
    function closeMenu() {
      if (burger) burger.classList.remove("open");
      if (links) links.classList.remove("open");
      if (overlay) overlay.classList.remove("show");
      document.body.style.overflow = "";
    }
    if (burger) {
      burger.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        burger.classList.toggle("open", open);
        if (overlay) overlay.classList.toggle("show", open);
        document.body.style.overflow = open ? "hidden" : "";
      });
    }
    if (overlay) overlay.addEventListener("click", closeMenu);
    if (links) links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    /* ---------- back to top ---------- */
    var topBtn = document.querySelector(".fab-top");
    if (topBtn) topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ---------- scroll reveal ---------- */
    var revealEls = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---------- animated counters ---------- */
    var counters = document.querySelectorAll("[data-count]");
    if (counters.length && "IntersectionObserver" in window) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target, target = parseFloat(el.dataset.count),
              suffix = el.dataset.suffix || "", dur = 1400, t0 = null;
          function step(ts) {
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            var val = target * eased;
            el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          co.unobserve(el);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { co.observe(c); });
    }

    /* ---------- FAQ accordion ---------- */
    document.querySelectorAll(".faq-q").forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".faq-item");
        var ans = item.querySelector(".faq-a");
        var isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(function (o) {
          o.classList.remove("open");
          o.querySelector(".faq-a").style.maxHeight = null;
          o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          ans.style.maxHeight = ans.scrollHeight + "px";
          q.setAttribute("aria-expanded", "true");
        }
      });
    });

    /* ---------- shop filters ---------- */
    var chips = document.querySelectorAll(".chip");
    var cards = document.querySelectorAll(".drops [data-cat]");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var f = chip.dataset.filter;
        cards.forEach(function (card) {
          var show = f === "all" || card.dataset.cat === f;
          card.style.display = show ? "" : "none";
        });
      });
    });

    /* ---------- contact form (mailto fallback) ---------- */
    var form = document.querySelector("#contactForm");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = form.name.value.trim();
        var email = form.email.value.trim();
        var topic = form.topic ? form.topic.value : "General";
        var message = form.message.value.trim();
        var msg = form.querySelector(".form-msg");
        if (!name || !email || !message) {
          msg.textContent = "Add your name, email and a message so we can reply.";
          msg.style.color = "var(--red)";
          msg.classList.add("show");
          return;
        }
        var subject = encodeURIComponent("[" + topic + "] NoTrading inquiry — " + name);
        var body = encodeURIComponent(
          "Name: " + name + "\nEmail: " + email + "\nTopic: " + topic + "\n\n" + message
        );
        window.location.href = "mailto:notradingapparel@gmail.com?subject=" + subject + "&body=" + body;
        msg.textContent = "Opening your mail app — send it and we'll get back within 24 hours.";
        msg.style.color = "var(--g4)";
        msg.classList.add("show");
        form.reset();
      });
    }

    /* ---------- year ---------- */
    var y = document.querySelector("#year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
