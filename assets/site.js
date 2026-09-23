/* Avi Dharani · portfolio interactions (no dependencies) */
(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var DATA = window.SITE_DATA || { ACTIVITIES: [], CERTS: [], GALLERY_EXTRA: [] };
  var ACTS = DATA.ACTIVITIES;
  var esc = function (t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); };

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

  /* ---------------- ticker: two rows, opposite directions, speed up with scroll ---------------- */
  var trows = $$('.trow');
  if (trows.length && !reduce) {
    var tstate = trows.map(function (r, i) { return { el: $('.ttrack', r), x: 0, dir: i % 2 ? 1 : -1, w: 0 }; });
    var lastY = scrollY, boost = 0, tvis = false;
    new IntersectionObserver(function (e) { tvis = e[0].isIntersecting; }).observe($('.ticker'));
    var measureT = function () { tstate.forEach(function (t) { t.w = t.el.scrollWidth / 2; if (t.dir > 0) t.x = -t.w; }); };
    measureT(); addEventListener('resize', measureT); document.addEventListener('site:ready', measureT);
    (function loop() {
      requestAnimationFrame(loop);
      var dy = scrollY - lastY; lastY = scrollY;
      boost += (Math.min(Math.abs(dy), 60) * 0.12 - boost) * 0.08;
      if (!tvis) return;
      tstate.forEach(function (t) {
        t.x += t.dir * (0.6 + boost);
        if (t.x <= -t.w) t.x += t.w;
        if (t.x > 0) t.x -= t.w;
        t.el.style.transform = 'translate3d(' + t.x.toFixed(1) + 'px,0,0)';
      });
    })();
  }

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

  /* ---------------- lightbox (shared) ---------------- */
  var lb = $('#lightbox'), lbm = $('#lbMedia'), lbc = $('#lbCap'), lbItems = [], li = 0, lastFocus = null;
  function lbShow() {
    var g = lbItems[li];
    lbm.innerHTML = g.video
      ? '<video src="' + g.video + '" poster="' + g.src + '" controls autoplay playsinline></video>'
      : '<img src="' + g.src + '" alt="' + esc(g.caption || '') + '">';
    lbc.textContent = (g.caption || '') + (lbItems.length > 1 ? '  ·  ' + (li + 1) + ' / ' + lbItems.length : '');
    $('.lb-prev', lb).hidden = $('.lb-next', lb).hidden = lbItems.length < 2;
  }
  function openLightbox(items, i) {
    lbItems = items; li = i || 0;
    lbShow();
    if (!lb.classList.contains('open')) {
      lastFocus = document.activeElement;
      lb.classList.add('open');
      document.documentElement.classList.add('lb-open');
      $('.lb-close', lb).focus();
    }
  }
  function closeLB() {
    lb.classList.remove('open');
    lbm.innerHTML = '';
    document.documentElement.classList.remove('lb-open');
    if (lastFocus) lastFocus.focus();
  }
  function lbStep(d) { li = (li + d + lbItems.length) % lbItems.length; lbShow(); }
  $('.lb-close', lb).addEventListener('click', closeLB);
  $('.lb-prev', lb).addEventListener('click', function () { lbStep(-1); });
  $('.lb-next', lb).addEventListener('click', function () { lbStep(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLB(); });

  function tileHTML(g, i) {
    return '<figure class="gi" tabindex="0" role="button" data-i="' + i + '" aria-label="Open: ' + esc(g.caption) + '">' +
      '<img src="' + g.src + '" alt="' + esc(g.caption) + '" loading="lazy" width="' + g.w + '" height="' + g.h + '">' +
      (g.video ? '<span class="play" aria-hidden="true"><svg viewBox="0 0 10 12"><path d="M0 0l10 6-10 6z" fill="currentColor"/></svg></span>' : '') +
      '<figcaption>' + esc(g.caption) + '</figcaption></figure>';
  }
  function bindTiles(root, getItems) {
    root.addEventListener('click', function (e) {
      var f = e.target.closest('.gi');
      if (f) openLightbox(getItems(), +f.getAttribute('data-i'));
    });
    root.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('gi')) {
        e.preventDefault();
        openLightbox(getItems(), +e.target.getAttribute('data-i'));
      }
    });
  }

  /* ---------------- gallery (built from every activity's photos) ---------------- */
  var GROUPS = { ventures: 'Ventures', community: 'Community', internships: 'Internships', life: 'Life' };
  var galItems = [];
  ACTS.forEach(function (a) {
    a.media.forEach(function (m) {
      if (m.shot) return;
      galItems.push({ src: m.src, video: m.video, w: m.w, h: m.h, group: a.group, caption: a.title + ': ' + m.caption });
    });
  });
  (DATA.GALLERY_EXTRA || []).forEach(function (m) { galItems.push(m); });
  var gal = $('#galGrid'), gf = $('#galFilter'), galShown = galItems.slice(), gModal = $('#galModal');
  function renderGal(f) {
    galShown = galItems.filter(function (g) { return f === 'all' || g.group === f; });
    gal.innerHTML = galShown.map(tileHTML).join('');
    $('#gmCount').textContent = galShown.length + ' photos & videos';
  }
  function openGallery(f) {
    f = f || 'all';
    $$('button', gf).forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-f') === f); });
    renderGal(f);
    gModal.hidden = false;
    document.documentElement.classList.add('gm-open');
    $('.gm-scroll', gModal).scrollTop = 0;
    $('#galClose').focus();
  }
  function closeGallery() {
    gModal.hidden = true;
    document.documentElement.classList.remove('gm-open');
    $('#galOpen').focus();
  }
  if (gal) {
    var counts = {};
    galItems.forEach(function (g) { counts[g.group] = (counts[g.group] || 0) + 1; });
    var fl = [['all', 'Everything', galItems.length]];
    Object.keys(GROUPS).forEach(function (k) { if (counts[k]) fl.push([k, GROUPS[k], counts[k]]); });
    gf.innerHTML = fl.map(function (f, i) { return '<button type="button" data-f="' + f[0] + '" aria-pressed="' + (i === 0) + '">' + f[1] + ' <span class="mono" style="opacity:.6">' + f[2] + '</span></button>'; }).join('');
    gf.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      $$('button', gf).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      renderGal(b.getAttribute('data-f'));
    });
    bindTiles(gal, function () { return galShown; });

    // on-page preview: a handful of favourites, last tile opens everything
    var PICK = ['chess-group', 'ep-team', 'af-qaffee-team', 'zb-waffles', 'yec-intro'];
    var prev = PICK.map(function (k) { return galItems.filter(function (g) { return g.src.indexOf('/' + k + '.') > -1; })[0]; }).filter(Boolean);
    var pv = $('#galPreview');
    pv.innerHTML = prev.map(function (g, i) {
      var last = i === prev.length - 1;
      return '<button type="button" class="gp' + (last ? ' more' : '') + '" data-i="' + i + '"' + (last ? ' data-more="+' + (galItems.length - prev.length + 1) + '"' : '') + ' aria-label="' + (last ? 'View all photos' : 'Open: ' + esc(g.caption)) + '"><img src="' + g.src + '" alt="' + esc(g.caption) + '" loading="lazy"></button>';
    }).join('');
    pv.addEventListener('click', function (e) {
      var b = e.target.closest('.gp');
      if (!b) return;
      if (b.classList.contains('more')) openGallery('all');
      else openLightbox(prev.slice(0, -1), +b.getAttribute('data-i'));
    });
    $('#galCount').textContent = '(' + galItems.length + ')';
    $('#galCats').textContent = fl.slice(1).map(function (f) { return f[1] + ' ' + f[2]; }).join(' · ');
    $('#galOpen').addEventListener('click', function () { openGallery('all'); });
    $('#galClose').addEventListener('click', closeGallery);
  }

  /* ---------------- certificates ---------------- */
  var certs = $('#certs'), CERT_SHOW = 8;
  if (certs) {
    certs.innerHTML = DATA.CERTS.map(function (c, i) {
      var imgs = c.imgs || [];
      var cover = imgs.length
        ? '<div class="cv"><img src="' + imgs[0] + '" alt="' + esc(c.title) + ' certificate" loading="lazy">' + (imgs.length > 1 ? '<span class="n">' + imgs.length + ' certificates</span>' : '') + '</div>'
        : '<div class="cv plaque"><div class="frame"><svg><use href="#g-' + c.icon + '"/></svg><small>' + esc(c.year) + '</small></div></div>';
      var inner = cover + '<div class="ct"><span>' + esc(c.year) + (c.star ? ' · Highlight' : '') + '</span><h4>' + esc(c.title) + '</h4><p>' + esc(c.issuer) + '</p></div>';
      var attrs = ' class="cert rv' + (c.star ? ' star' : '') + '" style="--d:' + (i % 4) * 0.06 + 's"' + (i >= CERT_SHOW ? ' hidden' : '');
      if (imgs.length) return '<button type="button"' + attrs + ' data-cert="' + i + '">' + inner + '</button>';
      if (c.file) return '<a' + attrs + ' href="' + c.file + '" target="_blank" rel="noopener">' + inner + '</a>';
      return '<div' + attrs + '>' + inner + '</div>';
    }).join('');
    certs.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cert]');
      if (!b) return;
      var c = DATA.CERTS[+b.getAttribute('data-cert')];
      openLightbox(c.imgs.map(function (src) { return { src: src, caption: c.title + ' · ' + c.issuer + (c.note ? '. ' + c.note : '') }; }), 0);
    });
    var more = $('#certsMore');
    if (DATA.CERTS.length > CERT_SHOW) {
      more.hidden = false;
      more.firstChild.textContent = 'Show all ' + DATA.CERTS.length + ' certificates ';
      more.addEventListener('click', function () {
        $$('.cert[hidden]', certs).forEach(function (c) { c.hidden = false; c.classList.add('in'); });
        more.hidden = true;
      });
    }
  }
  var awardItems = [
    { src: 'assets/media/ep-team.webp', caption: 'The EarthPulse team behind the award' },
    { src: 'assets/media/ep-festival-of-hope.webp', caption: 'EarthPulse on IB’s Festival of Hope, Youth in Action' }
  ];
  $$('[data-lb="award"]').forEach(function (b) {
    b.addEventListener('click', function () { openLightbox(awardItems, +b.getAttribute('data-i')); });
  });

  /* ---------------- activities reel ---------------- */
  function glyph(a) {
    return a.glyph === 'mark'
      ? '<svg class="act-glyph" viewBox="0 0 66 64" aria-hidden="true"><use href="#mark"/></svg>'
      : '<svg class="act-glyph" viewBox="0 0 24 24" aria-hidden="true"><use href="#g-' + a.glyph + '"/></svg>';
  }
  var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };
  var track = $('#reelTrack'), reelSec = $('#ventures'), reelIndex = $('#reelIndex');
  var cards = [];
  if (track) {
    track.innerHTML = ACTS.map(function (a, i) {
      var photos = a.media.filter(function (m) { return !m.shot; }).length;
      return '<button type="button" class="act' + (a.cover ? ' has-img' : '') + '" data-tone="' + a.tone + '" data-act="' + i + '" aria-label="Open ' + esc(a.title) + '">' +
        '<span class="act-cover">' + (a.cover ? '<img src="' + a.cover + '" alt="" loading="lazy">' : glyph(a)) + '</span>' +
        '<span class="act-no">' + pad2(i + 1) + '</span><span class="act-kind">' + esc(a.kind) + '</span>' +
        '<span class="act-body"><span class="act-t">' + esc(a.title) + '</span><span class="act-role">' + esc(a.role) + ' · ' + esc(a.when) + '</span>' +
        '<span class="act-open">Open' + (photos ? '<span class="act-media-n">' + photos + ' photo' + (photos > 1 ? 's' : '') + '</span>' : '') + ' →</span></span></button>';
    }).join('');
    cards = $$('.act', track);
    $('#reelAll').textContent = pad2(ACTS.length);
    reelIndex.innerHTML = ACTS.map(function (a, i) { return '<button type="button" role="listitem" data-go="' + i + '">' + esc(a.title) + '</button>'; }).join('');
    var idxBtns = $$('button', reelIndex);

    var pinned = function () { return innerWidth > 760; };
    var maxX = 0, cardW = 0, gap = 28, lefts = [];
    function layout() {
      if (!pinned()) { reelSec.style.height = ''; track.style.paddingLeft = track.style.paddingRight = ''; return; }
      cardW = cards[0].offsetWidth;
      var side = (innerWidth - cardW) / 2;
      track.style.paddingLeft = track.style.paddingRight = side + 'px';
      lefts = cards.map(function (c) { return c.offsetLeft; });
      maxX = track.scrollWidth - innerWidth;
      reelSec.style.height = (maxX + innerHeight * 1.15) + 'px';
      paintReel();
    }
    var curIdx = -1;
    function setCur(i) {
      if (i === curIdx) return;
      curIdx = i;
      $('#reelNow').textContent = pad2(i + 1);
      idxBtns.forEach(function (b, k) { b.classList.toggle('on', k === i); });
      var ib = idxBtns[i];
      if (ib) reelIndex.scrollTo({ left: ib.offsetLeft - reelIndex.clientWidth / 2 + ib.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
    }
    function paintReel() {
      if (!pinned()) return;
      var top = reelSec.offsetTop, span = reelSec.offsetHeight - innerHeight;
      var p = Math.max(0, Math.min(1, (scrollY - top) / span));
      var x = p * maxX;
      track.style.transform = 'translate3d(' + (-x).toFixed(1) + 'px,0,0)';
      $('#reelBar').style.width = (p * 100) + '%';
      var mid = innerWidth / 2, best = 0, bestD = 1e9;
      cards.forEach(function (c, i) {
        var cx = lefts[i] - x + cardW / 2;
        var d = (cx - mid) / (innerWidth / 2);
        var ad = Math.min(Math.abs(d), 1.4);
        if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i; }
        if (reduce) return;
        var ry = Math.max(-1, Math.min(1, d)) * -24;
        c.style.transform = 'translateZ(' + (-ad * 160).toFixed(1) + 'px) rotateY(' + ry.toFixed(2) + 'deg)';
        c.style.filter = 'brightness(' + (1 - ad * 0.35).toFixed(3) + ')';
        c.style.zIndex = String(100 - Math.round(ad * 50));
      });
      setCur(best);
    }
    function scrollToCard(i) {
      if (!pinned()) { cards[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' }); return; }
      var target = reelSec.offsetTop + (lefts[i] - lefts[0]) / maxX * (reelSec.offsetHeight - innerHeight);
      scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
    }
    reelIndex.addEventListener('click', function (e) {
      var b = e.target.closest('[data-go]');
      if (b) scrollToCard(+b.getAttribute('data-go'));
    });
    cards.forEach(function (c, i) {
      c.addEventListener('focus', function () { if (pinned() && Math.abs(i - curIdx) > 0) scrollToCard(i); });
      c.addEventListener('click', function () { openActivity(i, c); });
    });
    // mobile: highlight the card nearest the centre of the swipe row
    $('.reel-viewport').addEventListener('scroll', function () {
      if (pinned()) return;
      var vp = this, mid = vp.scrollLeft + vp.clientWidth / 2, best = 0, bd = 1e9;
      cards.forEach(function (c, i) { var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } });
      setCur(best);
      $('#reelBar').style.width = (vp.scrollLeft / (vp.scrollWidth - vp.clientWidth) * 100) + '%';
    }, { passive: true });
    addEventListener('scroll', paintReel, { passive: true });
    addEventListener('resize', layout);
    addEventListener('load', layout);
    document.addEventListener('site:ready', layout);
    layout();
  }

  /* ---------------- activity pages ---------------- */
  var modal = $('#actModal'), amScroll = $('#amScroll'), amIdx = 0, amOrigin = null;
  function list(title, items, cls) {
    if (!items || !items.length) return '';
    return '<section class="' + (cls || '') + '"><h4>' + title + '</h4><ul>' + items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></section>';
  }
  function renderActivity(i) {
    var a = ACTS[i], prev = ACTS[(i - 1 + ACTS.length) % ACTS.length], next = ACTS[(i + 1) % ACTS.length];
    var media = a.media;
    var photos = media.filter(function (m) { return !m.shot; }).length;
    amScroll.innerHTML =
      '<header class="am-hero' + (a.cover ? ' has-img' : '') + '" style="--tone-bg:' + toneBg(a.tone) + ';--tone-fg:' + toneFg(a.tone) + '">' +
        (a.cover ? '<img class="am-cover" src="' + a.cover + '" alt="">' : glyph(a)) +
        '<div class="am-hero-copy"><div class="wrap"><span class="label">' + esc(a.kind) + ' · ' + esc(a.when) + '</span><h2 id="amTitle">' + esc(a.title) + '</h2><p>' + esc(a.lead) + '</p></div></div>' +
      '</header>' +
      '<div class="wrap am-main">' +
        '<aside class="am-side"><dl>' +
          '<div><dt>Role</dt><dd>' + esc(a.role) + '</dd></div>' +
          '<div><dt>When</dt><dd>' + esc(a.when) + '</dd></div>' +
          '<div><dt>Where</dt><dd>' + esc(a.where) + '</dd></div>' +
          '<div><dt>Status</dt><dd><span class="st ' + a.status[0] + '">' + esc(a.status[1]) + '</span></dd></div>' +
        '</dl>' +
        (a.links.length ? '<div class="am-links">' + a.links.map(function (l) { return '<a href="' + l[1] + '" target="_blank" rel="noopener">' + esc(l[0]) + '<span>↗</span></a>'; }).join('') + '</div>' : '') +
        '</aside>' +
        '<div class="am-content">' + a.body.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') +
          '<div class="am-cols">' + list('What I did', a.did) + list('Completed', a.done, 'c-done') + list('Intended, not yet delivered', a.intended, 'c-int') + '</div>' +
          '<div class="am-media-head"><h3>Photos &amp; videos</h3><span class="label">' + (media.length ? media.length + ' item' + (media.length > 1 ? 's' : '') : '') + '</span></div>' +
          (media.length ? '<div class="am-media">' + media.map(tileHTML).join('') + '</div>'
            : '<div class="am-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="M21 16l-5-5-9 8"/></svg>Photos from ' + esc(a.title) + ' are on their way.</div>') +
          '<nav class="am-next" aria-label="More activities"><button type="button" data-step="-1"><span>← Previous</span><b>' + esc(prev.title) + '</b></button><button type="button" data-step="1"><span>Next →</span><b>' + esc(next.title) + '</b></button></nav>' +
        '</div>' +
      '</div>';
    $('#amCount').textContent = pad2(i + 1) + ' / ' + pad2(ACTS.length);
    amScroll.scrollTop = 0;
    var mediaEl = $('.am-media', amScroll);
    if (mediaEl) bindTiles(mediaEl, function () { return media; });
  }
  function toneBg(t) { return { paper: '#f3f0e8', ember: '#ff5a1f', moss: '#24533e', ink: '#22262a' }[t] || '#22262a'; }
  function toneFg(t) { return (t === 'paper' || t === 'ember') ? '#0f1110' : '#f3f0e8'; }

  var vt = !!document.startViewTransition && !reduce;
  function openActivity(i, originCard) {
    amIdx = i;
    amOrigin = originCard || null;
    var show = function () {
      renderActivity(i);
      modal.hidden = false;
      document.documentElement.classList.add('am-open');
      if (history.replaceState) history.replaceState(null, '', '#activity/' + ACTS[i].id);
    };
    var coverEl = originCard && $('.act-cover', originCard);
    if (vt && coverEl && modal.hidden) {
      coverEl.style.viewTransitionName = 'act-cover';
      var t = document.startViewTransition(function () {
        coverEl.style.viewTransitionName = '';
        show();
        var hero = $('.am-hero', amScroll);
        if (hero) hero.style.viewTransitionName = 'act-cover';
      });
      t.finished.then(function () { var hero = $('.am-hero', amScroll); if (hero) hero.style.viewTransitionName = ''; $('#amClose').focus(); });
    } else {
      var wasHidden = modal.hidden;
      show();
      if (wasHidden && !reduce) { modal.classList.remove('anim-out'); modal.classList.add('anim-in'); }
      $('#amClose').focus();
    }
  }
  function closeActivity() {
    if (modal.hidden) return;
    var done = function () {
      modal.hidden = true;
      modal.classList.remove('anim-in', 'anim-out');
      document.documentElement.classList.remove('am-open');
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    };
    var card = cards[amIdx], coverEl = card && $('.act-cover', card), hero = $('.am-hero', amScroll);
    if (vt && coverEl && hero && innerWidth > 760) {
      hero.style.viewTransitionName = 'act-cover';
      var t = document.startViewTransition(function () {
        hero.style.viewTransitionName = '';
        done();
        coverEl.style.viewTransitionName = 'act-cover';
      });
      t.finished.then(function () { coverEl.style.viewTransitionName = ''; card.focus({ preventScroll: true }); });
    } else if (!reduce) {
      modal.classList.remove('anim-in'); modal.classList.add('anim-out');
      setTimeout(done, 380);
      if (card) card.focus({ preventScroll: true });
    } else { done(); }
  }
  function stepActivity(d) { openActivity((amIdx + d + ACTS.length) % ACTS.length); }
  if (modal) {
    $('#amClose').addEventListener('click', closeActivity);
    $('#amPrev').addEventListener('click', function () { stepActivity(-1); });
    $('#amNext').addEventListener('click', function () { stepActivity(1); });
    amScroll.addEventListener('scroll', function () {
      var h = $('.am-hero', amScroll);
      $('.am-bar', modal).classList.toggle('solid', !!h && amScroll.scrollTop > h.offsetHeight - 70);
    }, { passive: true });
    amScroll.addEventListener('click', function (e) {
      var b = e.target.closest('[data-step]');
      if (b) stepActivity(+b.getAttribute('data-step'));
    });
  }
  $$('[data-open-activity]').forEach(function (b) {
    b.addEventListener('click', function () {
      var i = ACTS.findIndex(function (a) { return a.id === b.getAttribute('data-open-activity'); });
      if (i > -1) openActivity(i, null);
    });
  });
  // deep link: #activity/earthpulse
  var m = location.hash.match(/^#activity\/(.+)$/);
  if (m) {
    var di = ACTS.findIndex(function (a) { return a.id === m[1]; });
    if (di > -1) document.addEventListener('site:ready', function () { openActivity(di, null); });
  }

  addEventListener('keydown', function (e) {
    if (lb.classList.contains('open')) {
      if (e.key === 'Escape') closeLB();
      if (e.key === 'ArrowLeft') lbStep(-1);
      if (e.key === 'ArrowRight') lbStep(1);
      return;
    }
    if (gModal && !gModal.hidden) { if (e.key === 'Escape') closeGallery(); return; }
    if (modal && !modal.hidden) {
      if (e.key === 'Escape') closeActivity();
      if (e.key === 'ArrowLeft') stepActivity(-1);
      if (e.key === 'ArrowRight') stepActivity(1);
    }
  });

  /* ---------------- footer: clock + copy email ---------------- */
  var clock = $('#clock');
  if (clock) {
    var tick = function () {
      try { clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Nairobi' }).format(new Date()); } catch (e) { }
    };
    tick(); setInterval(tick, 20000);
  }
  var cm = $('#copyMail');
  if (cm) cm.addEventListener('click', function () {
    var i = $('i', cm);
    (navigator.clipboard ? navigator.clipboard.writeText(cm.getAttribute('data-mail')) : Promise.reject()).then(function () {
      i.textContent = 'Copied';
    }, function () { location.href = 'mailto:' + cm.getAttribute('data-mail'); }).then(function () { setTimeout(function () { i.textContent = 'Copy'; }, 1800); });
  });

  var yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
