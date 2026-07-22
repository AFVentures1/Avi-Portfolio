(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";
  var hasST = typeof window.ScrollTrigger !== "undefined";

  /* ---------- year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- image fallback (show placeholder until real image loads) ---------- */
  document.querySelectorAll("img.asset").forEach(function (img) {
    var frame = img.closest(".photo-frame, .wmedia, .about-media");
    if (!frame) return;
    frame.classList.add("no-img");
    if (img.complete && img.naturalWidth > 0) frame.classList.remove("no-img");
    img.addEventListener("load", function () {
      if (img.naturalWidth > 0) frame.classList.remove("no-img");
    });
    img.addEventListener("error", function () {
      frame.classList.add("no-img");
    });
  });

  /* ---------- brand logo (falls back to AD monogram) ---------- */
  var brand = document.getElementById("brand");
  var brandLogo = document.getElementById("brandLogo");
  if (brand && brandLogo) {
    var showLogo = function () { if (brandLogo.naturalWidth > 0) brand.classList.add("has-logo"); };
    if (brandLogo.complete) showLogo();
    brandLogo.addEventListener("load", showLogo);
    brandLogo.addEventListener("error", function () { brand.classList.remove("has-logo"); });
  }

  /* ---------- nav: scrolled state + progress bar ---------- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  function onScroll(y) {
    if (nav) nav.classList.toggle("scrolled", y > 20);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }

  /* ---------- smooth scroll (Lenis) ---------- */
  var lenis = null;
  if (typeof window.Lenis !== "undefined" && !reduced) {
    lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", function (e) {
      onScroll(e.scroll || window.scrollY);
      if (hasST) window.ScrollTrigger.update();
    });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  } else {
    window.addEventListener("scroll", function () { onScroll(window.scrollY); }, { passive: true });
  }
  onScroll(window.scrollY);

  /* anchor links -> lenis scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -70 });
      else target.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    });
  });

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  function closeMenu() { if (navLinks) navLinks.classList.remove("open"); }
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () { navLinks.classList.toggle("open"); });
  }

  /* ---------- rotating hero word ---------- */
  var rotator = document.getElementById("rotator");
  if (rotator && !reduced) {
    var words = ["founder", "builder", "investor-in-training", "operator", "problem-solver"];
    var i = 0;
    setInterval(function () {
      rotator.classList.add("swap");
      setTimeout(function () {
        i = (i + 1) % words.length;
        rotator.textContent = words[i];
        rotator.classList.remove("swap");
      }, 300);
    }, 2200);
  }

  /* ---------- reveal animations ---------- */
  if (hasGSAP && hasST && !reduced) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    /* hero intro timeline */
    window.gsap.set(".hero-title .line span", { yPercent: 110 });
    var tl = window.gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".hero .eyebrow", { opacity: 1, y: 0, duration: 0.6 })
      .to(".hero-title .line span", { yPercent: 0, duration: 0.9, stagger: 0.12 }, "-=0.3")
      .to(".hero-role", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
      .to(".hero-tagline", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to(".hero-actions", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to(".hero-social", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .from(".photo-frame", { opacity: 0, scale: 0.92, y: 20, duration: 0.9 }, "-=0.8");

    /* scroll reveals for everything else */
    window.gsap.utils.toArray(".reveal").forEach(function (el) {
      if (el.closest(".hero")) return;
      window.gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = 1; el.style.transform = "none";
    });
  }

  /* ---------- hero parallax ---------- */
  if (hasGSAP && hasST && !reduced) {
    window.gsap.to(".photo-frame", { yPercent: -8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    window.gsap.to(".blob-a", { yPercent: 28, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    window.gsap.to(".blob-b", { yPercent: -22, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }

  /* ---------- magnetic primary buttons ---------- */
  if (!reduced && window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".btn-primary").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + (x * 0.25).toFixed(1) + "px," + (y * 0.4 - 2).toFixed(1) + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });
  }

  /* ---------- card spotlight (cursor-follow glow) ---------- */
  if (!reduced && window.matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll(".vcard").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- active nav link on scroll ---------- */
  var navMap = {};
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (a) {
    navMap[a.getAttribute("href").slice(1)] = a;
  });
  var navSections = Object.keys(navMap)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && navSections.length) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          Object.keys(navMap).forEach(function (k) { navMap[k].classList.remove("active"); });
          if (navMap[en.target.id]) navMap[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navSections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---------- animated counters ---------- */
  var counters = document.querySelectorAll(".stat-num");
  var seen = false;
  function runCounters() {
    if (seen) return; seen = true;
    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count")) || 0;
      var pre = el.getAttribute("data-prefix") || "";
      var suf = el.getAttribute("data-suffix") || "";
      if (reduced) { el.textContent = pre + target + suf; return; }
      var start = null, dur = 1200;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var val = Math.round(target * (0.5 - Math.cos(p * Math.PI) / 2));
        el.textContent = pre + val + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var about = document.getElementById("about");
  if (about && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { runCounters(); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(about);
  } else { runCounters(); }

  /* ---------- work video lightbox ---------- */
  var vmodal = document.getElementById("vmodal");
  var vvideo = document.getElementById("vmodalVideo");
  var vclose = document.getElementById("vmodalClose");

  document.querySelectorAll(".workrow[data-video]").forEach(function (row) {
    var url = row.getAttribute("data-video");
    try {
      fetch(url, { method: "HEAD" })
        .then(function (r) { if (r.ok) row.classList.add("has-video"); })
        .catch(function () {});
    } catch (e) {}
    var btn = row.querySelector(".play");
    if (btn) btn.addEventListener("click", function () {
      if (!vmodal || !vvideo) return;
      vvideo.src = url;
      vmodal.classList.add("open");
      var p = vvideo.play(); if (p && p.catch) p.catch(function () {});
    });
  });
  function closeModal() {
    if (!vmodal) return;
    vmodal.classList.remove("open");
    if (vvideo) { vvideo.pause(); vvideo.removeAttribute("src"); vvideo.load(); }
  }
  if (vclose) vclose.addEventListener("click", closeModal);
  if (vmodal) vmodal.addEventListener("click", function (e) { if (e.target === vmodal) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });

  /* ---------- contact form ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  var submit = document.getElementById("submitBtn");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.className = "form-note";
      note.textContent = "";
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      if (!name || !email || !message) {
        note.className = "form-note err";
        note.textContent = "Please fill in all fields.";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.className = "form-note err";
        note.textContent = "Please enter a valid email address.";
        return;
      }
      submit.disabled = true;
      var original = submit.textContent;
      submit.textContent = "Sending…";
      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, message: message })
      })
        .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (res.ok) {
            note.className = "form-note ok";
            note.textContent = "Thanks — your message has been sent. I'll be in touch soon.";
            form.reset();
          } else {
            throw new Error((res.d && res.d.error) || "Failed");
          }
        })
        .catch(function () {
          note.className = "form-note err";
          note.innerHTML = 'Couldn\'t send from here. Email me directly at <a href="mailto:avidharani110@gmail.com">avidharani110@gmail.com</a>.';
        })
        .finally(function () {
          submit.disabled = false;
          submit.textContent = original;
        });
    });
  }
})();
