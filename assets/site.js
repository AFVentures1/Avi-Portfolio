/* Avi Dharani · portfolio interactions (no dependencies) */
(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------------
     Gallery content. To add photos: put the file in assets/img/ and add
     a line here. `cat` is one of the filter keys in GALLERY_FILTERS.
     ------------------------------------------------------------------ */
  var GALLERY_FILTERS = [
    ['all', 'Everything'],
    ['ventures', 'Ventures'],
    ['community', 'Community'],
    ['projects', 'Projects'],
    ['life', 'Life']
  ];
  var GALLERY = [
    { src: 'assets/img/g-aerobin.webp', w: 1600, h: 918, cat: 'community', caption: 'EarthPulse: students and staff beside the Aerobin composter we installed at school' },
    { src: 'assets/img/af-team.webp', w: 768, h: 1024, cat: 'ventures', caption: 'A&F Ventures: working through a client build with the team' },
    { src: 'assets/img/g-classroom.webp', w: 812, h: 600, cat: 'community', caption: 'EarthPulse: leading a session with students in a classroom' },
    { src: 'assets/img/g-fingerprint-tree.webp', w: 1600, h: 1200, cat: 'community', caption: 'EarthPulse: students around our fingerprint tree poster on campus' },
    { src: 'assets/img/g-twister.webp', video: 'assets/img/g-twister.mp4', w: 960, h: 540, cat: 'community', caption: 'EarthPulse: a game of Twister during an awareness activity (video)' },
    { src: 'assets/img/qaffee.webp', w: 1200, h: 750, cat: 'projects', caption: 'Qaffee Point: the ordering website we built through A&F Ventures' },
    { src: 'assets/img/portrait.webp', w: 1000, h: 1000, cat: 'life', caption: 'Avi Dharani' }
  ];

  /* ---------------- loader ---------------- */
  var loader = $('#loader');
  var started = false;
  function start() {
    if (started) return;
    started = true;
    document.body.classList.remove('is-loading');
    if (loader) {
      loader.classList.add('done');
      setTimeout(function () { loader.remove(); }, 1000);
    }
    document.dispatchEvent(new Event('site:ready'));
  }
  var minWait = reduce ? 0 : 1150;
  var t0 = performance.now();
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () {
    setTimeout(start, Math.max(0, minWait - (performance.now() - t0)));
  });
  setTimeout(start, 2600); // never block on slow fonts

  /* ---------------- split headings into characters ---------------- */
  function splitNode(node, out) {
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span');
          w.className = 'w';
          Array.from(part).forEach(function (ch) {
            var c = document.createElement('span');
            c.className = 'c';
            c.textContent = ch;
            w.appendChild(c);
            out.push(c);
          });
          frag.appendChild(w);
        });
        n.parentNode.replaceChild(frag, n);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') {
        splitNode(n, out);
      }
    });
  }
  var fxEls = $$('.fx');
  fxEls.forEach(function (el) {
    var label = el.textContent.replace(/\s+/g, ' ').trim();
    var chars = [];
    splitNode(el, chars);
    el.setAttribute('aria-label', label);
    $$('.w', el).forEach(function (w) { w.setAttribute('aria-hidden', 'true'); });
    chars.forEach(function (c, i) { c.style.setProperty('--i', i); });
    el._chars = chars;
  });

  /* ---------------- reveal on scroll ---------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  function observeAll() {
    $$('.rv, .fx').forEach(function (el) {
      if (el.closest('.hero')) return;
      io.observe(el);
    });
  }
  document.addEventListener('site:ready', function () {
    // hero animates in as the loader lifts
    $$('.hero .rv, .hero .fx').forEach(function (el) { el.classList.add('in'); });
    observeAll();
    countUp();
  });

  /* ---------------- headline hover: variable-weight proximity ---------------- */
  if (fine && !reduce) {
    fxEls.forEach(function (el) {
      var chars = el._chars, rects = [], raf = 0, px = 0, py = 0;
      var R = parseFloat(el.getAttribute('data-radius')) || 150;
      var base = parseFloat(getComputedStyle(el).fontWeight) || 600;
      function measure() {
        rects = chars.map(function (c) {
          var r = c.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2, serif: !!c.closest('em') };
        });
      }
      function paint() {
        raf = 0;
        chars.forEach(function (c, i) {
          var r = rects[i];
          var d = Math.hypot(px - r.x, py - r.y);
          var f = Math.max(0, 1 - d / R);
          f = f * f * (3 - 2 * f);
          if (r.serif) {
            c.style.transform = f ? 'translateY(' + (-f * 7).toFixed(2) + 'px) rotate(' + (-f * 6).toFixed(2) + 'deg)' : '';
          } else {
            c.style.fontVariationSettings = f ? "'wght' " + Math.round(base + (800 - base) * f) + ", 'wdth' " + (100 - f * 12).toFixed(1) : '';
            c.style.transform = f ? 'translateY(' + (-f * 6).toFixed(2) + 'px)' : '';
          }
          c.classList.toggle('hot', f > 0.55);
        });
      }
      el.addEventListener('pointerenter', function () {
        if (!el.classList.contains('in')) return;
        el.classList.add('hovering');
        measure();
      });
      el.addEventListener('pointermove', function (e) {
        if (!el.classList.contains('hovering')) return;
        px = e.clientX; py = e.clientY;
        if (!raf) raf = requestAnimationFrame(paint);
      });
      el.addEventListener('pointerleave', function () {
        cancelAnimationFrame(raf); raf = 0;
        chars.forEach(function (c) { c.style.fontVariationSettings = ''; c.style.transform = ''; c.classList.remove('hot'); });
        setTimeout(function () { el.classList.remove('hovering'); }, 400);
      });
    });
  }

  /* ---------------- nav: solid state, active link, mobile menu ---------------- */
  var nav = $('#nav'), hero = $('.hero');
  function onScroll() {
    var h = hero ? hero.offsetHeight - 90 : 40;
    nav.classList.toggle('solid', scrollY > h);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var links = $$('.nav-links a[href^="#"]:not(.nav-cta)');
  var secIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) secIO.observe(s); });

  var menuBtn = $('#menuBtn'), menu = $('#mobileMenu');
  function setMenu(open) {
    document.documentElement.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', !open);
  }
  menuBtn.addEventListener('click', function () { setMenu(!document.documentElement.classList.contains('menu-open')); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------------- role rotator ---------------- */
  var rot = $('#rot');
  if (rot && !reduce) {
    var items = $$(':scope > span', rot), ri = 0;
    setInterval(function () {
      var cur = items[ri];
      cur.classList.remove('on'); cur.classList.add('out');
      setTimeout(function () { cur.classList.remove('out'); }, 700);
      ri = (ri + 1) % items.length;
      items[ri].classList.add('on');
    }, 2800);
  }

  /* ---------------- count-up in hero facts ---------------- */
  function countUp() {
    $$('[data-count]').forEach(function (el) {
      var to = +el.getAttribute('data-count'), s = null;
      if (reduce) return;
      function step(t) {
        if (!s) s = t;
        var p = Math.min((t - s) / 1600, 1), e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(to * e).toLocaleString('en-US');
        if (p < 1) requestAnimationFrame(step);
      }
      el.textContent = '0';
      setTimeout(function () { requestAnimationFrame(step); }, 900);
    });
  }

  /* ---------------- bio: words light up as you scroll ---------------- */
  var bio = $('#bio');
  if (bio) {
    var words = [];
    (function wrap(node, hl) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span');
            s.className = 'wd' + (hl ? ' hl' : '');
            s.textContent = part;
            frag.appendChild(s); words.push(s);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1) {
          wrap(n, hl || n.classList.contains('hl'));
        }
      });
    })(bio, false);
    var lit = -1;
    var paintBio = function () {
      var r = bio.getBoundingClientRect(), vh = innerHeight;
      var p = reduce ? 1 : (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      var n = Math.round(Math.max(0, Math.min(1, p)) * words.length);
      if (n === lit) return;
      lit = n;
      words.forEach(function (w, i) { w.classList.toggle('lit', i < n); });
    };
    addEventListener('scroll', paintBio, { passive: true });
    addEventListener('resize', paintBio);
    paintBio();
  }

  /* ---------------- journey: line fill + current year ---------------- */
  var jl = $('#journeyList'), jfill = $('#jfill'), jrows = $$('.jrow');
  if (jl) {
    var paintJ = function () {
      var r = jl.getBoundingClientRect(), mid = innerHeight * 0.55;
      var p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
      jfill.style.height = (p * 100) + '%';
      var cur = null;
      jrows.forEach(function (row) {
        var rr = row.getBoundingClientRect();
        var on = rr.top < mid;
        row.classList.toggle('in', on);
        if (on) cur = row;
      });
      jrows.forEach(function (row) { row.classList.toggle('cur', row === cur); });
    };
    addEventListener('scroll', paintJ, { passive: true });
    paintJ();
  }

  /* ---------------- 3D tilt + spotlight ---------------- */
  if (fine && !reduce) {
    $$('.tilt').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty('--mx', (x * 100) + '%');
        c.style.setProperty('--my', (y * 100) + '%');
        c.style.transition = 'transform .15s ease-out, box-shadow .5s, border-color .3s';
        c.style.transform = 'perspective(900px) rotateX(' + ((0.5 - y) * 7).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * 7).toFixed(2) + 'deg) translateY(-4px)';
      });
      c.addEventListener('pointerleave', function () {
        c.style.transition = '';
        c.style.transform = '';
      });
    });

    // browser frames lean toward the cursor
    $$('.browser').forEach(function (b) {
      var st = b.closest('.stage');
      st.addEventListener('pointermove', function (e) {
        var r = st.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        b.style.transition = 'transform .25s ease-out, box-shadow .6s';
        b.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
        b.style.setProperty('--ry', (x * 12).toFixed(2) + 'deg');
      });
      st.addEventListener('pointerleave', function () {
        b.style.transition = '';
        b.style.removeProperty('--rx');
        b.style.removeProperty('--ry');
      });
    });
  }

  /* ---------------- impact filter ---------------- */
  var fbtns = $$('.imp-filter button'), themes = $$('.theme');
  fbtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-f');
      fbtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      themes.forEach(function (t) {
        var show = f === 'all' || t.getAttribute('data-theme') === f;
        t.hidden = !show;
        if (show) $$('.rv', t).forEach(function (el) { el.classList.add('in'); });
      });
    });
  });

  /* ---------------- gallery ---------------- */
  var gal = $('#galGrid'), gf = $('#galFilter');
  var shown = [];
  if (gal) {
    var used = {};
    GALLERY.forEach(function (g) { used[g.cat] = 1; });
    GALLERY_FILTERS.forEach(function (f, i) {
      if (f[0] !== 'all' && !used[f[0]]) return;
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = f[1];
      b.setAttribute('data-f', f[0]);
      b.setAttribute('aria-pressed', i === 0);
      gf.appendChild(b);
    });
    GALLERY.forEach(function (g, i) {
      var fig = document.createElement('figure');
      fig.className = 'gi rv';
      fig.style.setProperty('--d', ((i % 3) * 0.06) + 's');
      fig.tabIndex = 0;
      fig.setAttribute('role', 'button');
      fig.setAttribute('aria-label', 'Open: ' + g.caption);
      fig.setAttribute('data-cat', g.cat);
      fig.innerHTML = '<img src="' + g.src + '" alt="' + g.caption.replace(/"/g, '&quot;') + '" loading="lazy" width="' + g.w + '" height="' + g.h + '">' +
        (g.video ? '<span class="play" aria-hidden="true"><svg viewBox="0 0 10 12"><path d="M0 0l10 6-10 6z" fill="currentColor"/></svg></span>' : '') +
        '<figcaption>' + g.caption + '</figcaption>';
      fig._g = g;
      gal.appendChild(fig);
    });
    function applyFilter(f) {
      $$('.gi', gal).forEach(function (el) {
        el.hidden = !(f === 'all' || el.getAttribute('data-cat') === f);
        el.classList.add('in');
      });
    }
    gf.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      $$('button', gf).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      applyFilter(b.getAttribute('data-f'));
    });

    var lb = $('#lightbox'), lbm = $('#lbMedia'), lbc = $('#lbCap'), li = 0, lastFocus = null;
    function openLB(i) {
      shown = $$('.gi', gal).filter(function (el) { return !el.hidden; });
      li = i;
      var g = shown[li]._g;
      lbm.innerHTML = g.video
        ? '<video src="' + g.video + '" poster="' + g.src + '" controls autoplay playsinline></video>'
        : '<img src="' + g.src + '" alt="' + g.caption.replace(/"/g, '&quot;') + '">';
      lbc.textContent = g.caption;
      if (!lb.classList.contains('open')) {
        lastFocus = document.activeElement;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
        $('.lb-close', lb).focus();
      }
    }
    function closeLB() {
      lb.classList.remove('open');
      lbm.innerHTML = '';
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    function step(d) { openLB((li + d + shown.length) % shown.length); }
    gal.addEventListener('click', function (e) {
      var f = e.target.closest('.gi');
      if (!f) return;
      var vis = $$('.gi', gal).filter(function (el) { return !el.hidden; });
      openLB(vis.indexOf(f));
    });
    gal.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('gi')) {
        e.preventDefault();
        var vis = $$('.gi', gal).filter(function (el) { return !el.hidden; });
        openLB(vis.indexOf(e.target));
      }
    });
    $('.lb-close', lb).addEventListener('click', closeLB);
    $('.lb-prev', lb).addEventListener('click', function () { step(-1); });
    $('.lb-next', lb).addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLB(); });
    addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
