/* ═══════════════════════════════════════════════════════════
   stevenreynolds.com — vanilla JS
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── Copyright year ───────────────────────────────────────── */
(function () {
  var el = document.getElementById('copy-year');
  if (el) el.textContent = new Date().getFullYear();
}());

/* ── Density CSS variables (locked: regular) ──────────────── */
(function () {
  var s = document.documentElement.style;
  s.setProperty('--gutter',    '48px');
  s.setProperty('--section-y', '120px');
  s.setProperty('--base',      '16px');
}());

/* ── Nav: is-scrolled on scroll ───────────────────────────── */
(function () {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  function update() { nav.classList.toggle('is-scrolled', window.scrollY > 40); }
  update();
  window.addEventListener('scroll', update, { passive: true });
}());

/* ── Hero photo + subject: parallax + fade on scroll ─────── */
(function () {
  var hero    = document.querySelector('.hero');
  var photo   = document.querySelector('.hero__photo-bg');
  var grain   = document.querySelector('.hero__grain');
  var subject = document.querySelector('.hero__subject');
  if (!hero || !photo) return;
  var raf = 0;
  var scrollTimer = 0;

  function setWillChange(on) {
    var v = on ? 'opacity, transform' : 'auto';
    photo.style.willChange = v;
    if (subject) subject.style.willChange = v;
  }

  function update() {
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      var h = hero.offsetHeight || window.innerHeight;
      var p = Math.max(0, Math.min(1, window.scrollY / h));
      var opacity   = String(1 - p * 1.1);
      var transform = 'scale(' + (1 + p * 0.06) + ') translateY(' + (p * -40) + 'px)';
      photo.style.opacity   = opacity;
      photo.style.transform = transform;
      if (grain) grain.style.opacity = String(0.08 * (1 - p * 1.1));
      if (subject) {
        var isMobileSubject = window.innerWidth <= 1024;
        subject.style.opacity   = opacity;
        subject.style.transform = isMobileSubject
          ? 'scale(' + (1 + p * 0.06) + ') translateY(' + (p * -40) + 'px)'
          : 'translateX(-50%) scale(' + (1 + p * 0.06) + ') translateY(' + (p * -40) + 'px)';
      }
    });
  }
  update();
  window.addEventListener('scroll', function () {
    setWillChange(true);
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () { setWillChange(false); }, 150);
    update();
  }, { passive: true });
}());

/* ── Reveal on scroll ─────────────────────────────────────── */
(function () {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
}());

/* ── Hero name: binary-search fit to container width ─────── */
function fitName() {
  var mark    = document.querySelector('.hero__mark');
  var overlay = document.querySelector('.hero__overlay');
  if (!mark || !overlay) return;

  var cs    = getComputedStyle(overlay);
  var pl    = parseFloat(cs.paddingLeft)  || 48;
  var pr    = parseFloat(cs.paddingRight) || 48;
  var avail = overlay.offsetWidth - pl - pr;
  if (avail <= 0) return;

  var mobile = window.innerWidth <= 768;

  /* Pull mark out of flow so flex/grid don't constrain measurement */
  mark.style.position  = 'absolute';
  mark.style.whiteSpace = 'nowrap';

  if (mobile) {
    /* Stacked: size the longest wordmark to fill available width */
    mark.style.flexDirection = 'column';
    var wordmarks = mark.querySelectorAll('.wordmark');
    var lo = 8, hi = 300, fs = 60;
    for (var i = 0; i < 30; i++) {
      fs = (lo + hi) / 2;
      mark.style.fontSize = fs + 'px';
      var maxW = 0;
      wordmarks.forEach(function (wm) {
        var w = wm.getBoundingClientRect().width;
        if (w > maxW) maxW = w;
      });
      if (maxW <= avail) { lo = fs; } else { hi = fs; }
    }
    mark.style.fontSize = Math.floor(lo) + 'px';
  } else {
    /* Single line: fit "Steven Reynolds" edge-to-edge */
    mark.style.flexDirection = 'row';
    var lo = 10, hi = 500, fs = 120;
    for (var i = 0; i < 30; i++) {
      fs = (lo + hi) / 2;
      mark.style.fontSize = fs + 'px';
      var w = mark.getBoundingClientRect().width;
      if (w <= avail) { lo = fs; } else { hi = fs; }
    }
    mark.style.fontSize = Math.floor(lo) + 'px';
  }

  /* Restore to flow */
  mark.style.position  = '';
  mark.style.whiteSpace = '';
  mark.style.flexDirection = '';
}
window.addEventListener('resize', fitName);

/* ── Wave animation: called after boot screen lifts ──────── */
function startWave() {
  var wordmarks = document.querySelectorAll('.wordmark--wave');
  if (!wordmarks.length) return;
  var start = performance.now();
  var rafId = 0;
  var paused = false;

  function tick(now) {
    if (paused) return;
    var t = (now - start) / 1000;
    wordmarks.forEach(function (wm) {
      var letters = wm.querySelectorAll('[data-letter]');
      letters.forEach(function (el, i) {
        var y = Math.sin(t * 0.8 + i * 0.42) * 6;
        var r = Math.sin(t * 0.55 + i * 0.55) * 1.1;
        el.style.transform = 'translateY(' + y + 'px) rotate(' + r + 'deg)';
      });
    });
    rafId = requestAnimationFrame(tick);
  }

  /* Pause when tab is hidden, resume when visible */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      paused = true;
      cancelAnimationFrame(rafId);
    } else {
      paused = false;
      start = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  });

  rafId = requestAnimationFrame(tick);
}

/* ── SRLogo draw animation: called after boot screen lifts ── */
function drawNavLogo() {
  var logo = document.querySelector('.nav__logo .sr-logo');
  if (!logo) return;

  var order = ['.sPath', '.t1Path', '.t2Path', '.t3Path', '.e1Path', '.vPath', '.e2Path', '.nPath', '.linePath'];
  var baseDelay = 40;
  var dur = 700;

  /* Reset all strokes to invisible */
  order.forEach(function (sel) {
    var el = logo.querySelector('.srl-strokes ' + sel);
    if (!el) return;
    var len = el.getTotalLength();
    el.style.transition      = 'none';
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
  });

  /* Force reflow so the reset sticks */
  void logo.getBoundingClientRect();

  /* Animate each stroke in sequence */
  order.forEach(function (sel, i) {
    var el = logo.querySelector('.srl-strokes ' + sel);
    if (!el) return;
    setTimeout(function () {
      el.style.transition       = 'stroke-dashoffset ' + dur + 'ms cubic-bezier(.65,0,.35,1)';
      el.style.strokeDashoffset = '0';
    }, i * baseDelay);
  });
}

/* ── Boot screen: fade when BOTH animation AND hero image are ready ── */
(function () {
  var boot = document.getElementById('boot');
  if (!boot) return;

  var animDone   = false;
  var imageDone  = false;
  var fadeCalled = false;

  function doFade() {
    if (fadeCalled) return;
    fadeCalled = true;
    setTimeout(function () {
      boot.classList.add('is-gone');
      document.documentElement.classList.add('app-ready');
      startWave();
      drawNavLogo();
      fitName();
      setTimeout(fitName, 200);
      setTimeout(function () { boot.remove(); }, 500);
    }, 150);
  }

  /* Only fade once both the logo animation AND the hero image are ready */
  function tryFade() {
    if (animDone && imageDone) doFade();
  }

  /* 1. Wait for the last boot logo stroke to finish drawing */
  var lastPath = boot.querySelector('.linePath');
  if (lastPath) {
    lastPath.addEventListener('animationend', function () {
      animDone = true;
      tryFade();
    }, { once: true });
  } else {
    animDone = true;
  }

  /* 2. Wait for the hero portrait to load */
  var heroImg = document.querySelector('.hero__photo-bg img');
  if (heroImg) {
    if (heroImg.complete && heroImg.naturalWidth > 0) {
      imageDone = true;
    } else {
      function onImgSettled() { imageDone = true; tryFade(); }
      heroImg.addEventListener('load',  onImgSettled, { once: true });
      heroImg.addEventListener('error', onImgSettled, { once: true }); /* fail open */
    }
  } else {
    imageDone = true;
  }

  /* Safety ceiling — never hold the page longer than 6s regardless */
  setTimeout(function () { animDone = true; imageDone = true; tryFade(); }, 6000);
}());
