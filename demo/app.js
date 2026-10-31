(function () {
  "use strict";

  var S = window.STORY;
  var hasGsap = typeof window.gsap !== "undefined";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  // ---------- Ilustrasi SVG per bab ----------
  var ART = {
    stars:
      '<path class="g soft" d="M75 140 Q150 30 225 140" stroke-dasharray="3 7"/>' +
      '<use class="gf pop" href="#star8" x="47" y="112" width="56" height="56"/>' +
      '<use class="gf pop" href="#star8" x="197" y="112" width="56" height="56"/>' +
      '<use class="gf tw" href="#star8" x="140" y="40" width="14" height="14"/>' +
      '<use class="gf tw" href="#star8" x="30" y="50" width="10" height="10"/>' +
      '<use class="gf tw" href="#star8" x="255" y="60" width="10" height="10"/>' +
      '<use class="gf tw" href="#star8" x="110" y="200" width="8" height="8"/>' +
      '<use class="gf tw" href="#star8" x="190" y="210" width="8" height="8"/>' +
      '<text class="cf pop" x="75" y="196" text-anchor="middle" font-size="12" letter-spacing="2">BANDUNG</text>' +
      '<text class="cf pop" x="225" y="196" text-anchor="middle" font-size="12" letter-spacing="2">YOGYAKARTA</text>',
    paths:
      '<path class="g draw" d="M30 235 C 70 205, 40 170, 100 158 S 140 140 150 128"/>' +
      '<path class="g draw" d="M270 235 C 230 205, 260 170, 200 158 S 160 140 150 128"/>' +
      '<circle class="gf pop" cx="30" cy="235" r="5"/><circle class="gf pop" cx="270" cy="235" r="5"/>' +
      '<path class="g draw" d="M112 122 L150 70 L188 122 Z"/>' +
      '<path class="g draw" d="M139 122 L150 98 L161 122"/>' +
      '<path class="g soft" d="M96 122 H204"/>' +
      '<use class="gf tw" href="#star8" x="143" y="40" width="14" height="14"/>' +
      '<use class="gf tw" href="#star8" x="60" y="80" width="9" height="9"/>' +
      '<use class="gf tw" href="#star8" x="235" y="75" width="9" height="9"/>',
    night:
      '<path class="gf pop" d="M222 26 A30 30 0 1 0 252 72 A24 24 0 1 1 222 26 Z"/>' +
      '<path class="g draw" d="M95 205 V170 Q95 122 150 106 Q205 122 205 170 V205"/>' +
      '<path class="g draw" d="M150 106 V90"/><circle class="gf pop" cx="150" cy="86" r="4"/>' +
      '<path class="g draw" d="M60 205 V128 L68 108 L76 128 V205"/>' +
      '<path class="g draw" d="M224 205 V128 L232 108 L240 128 V205"/>' +
      '<path class="g draw" d="M130 205 V176 Q130 160 150 152 Q170 160 170 176 V205"/>' +
      '<path class="g" d="M40 205 H260"/>' +
      '<use class="gf tw" href="#star8" x="40" y="40" width="10" height="10"/>' +
      '<use class="gf tw" href="#star8" x="120" y="30" width="8" height="8"/>' +
      '<use class="gf tw" href="#star8" x="175" y="55" width="7" height="7"/>',
    homes:
      '<path class="g draw" d="M40 205 V150 L80 115 L120 150 V205"/>' +
      '<path class="g draw" d="M70 205 V178 H90 V205"/>' +
      '<path class="g draw" d="M180 205 V150 L220 115 L260 150 V205"/>' +
      '<path class="g draw" d="M210 205 V178 H230 V205"/>' +
      '<path class="g soft" d="M80 108 Q150 30 220 108" stroke-dasharray="3 7"/>' +
      '<circle class="g pop" cx="150" cy="76" r="13"/>' +
      '<path class="gf pop" d="M150 52 L157 60 L150 66 L143 60 Z"/>' +
      '<path class="g" d="M20 205 H280"/>' +
      '<use class="gf tw" href="#star8" x="40" y="60" width="9" height="9"/>' +
      '<use class="gf tw" href="#star8" x="250" y="55" width="9" height="9"/>',
    arch:
      '<path class="g draw" d="M80 235 V120 Q80 55 150 25 Q220 55 220 120 V235"/>' +
      '<path class="g soft" d="M94 235 V124 Q94 70 150 42 Q206 70 206 124 V235"/>' +
      '<path class="g draw" d="M150 42 V88"/>' +
      '<path class="g draw" d="M140 88 H160 L167 98 H133 Z"/>' +
      '<rect class="g draw" x="136" y="98" width="28" height="36" rx="4"/>' +
      '<path class="g draw" d="M133 134 H167 L158 144 H142 Z"/>' +
      '<circle class="gf tw" cx="150" cy="116" r="7"/>' +
      '<path class="g" d="M50 235 H250"/>' +
      '<use class="gf tw" href="#star8" x="30" y="70" width="10" height="10"/>' +
      '<use class="gf tw" href="#star8" x="258" y="90" width="10" height="10"/>',
  };

  // ---------- Bangun slide ----------
  function splitWords(p, text) {
    text.split(/\s+/).forEach(function (w, i, arr) {
      p.appendChild(el("span", "word", w));
      if (i < arr.length - 1) p.appendChild(document.createTextNode(" "));
    });
  }

  function verseBlock(v, cls) {
    var box = el("div", cls || "");
    var ar = el("p", "arabic", v.arabic);
    ar.lang = "ar";
    box.appendChild(ar);
    box.appendChild(el("p", "verse-tr", "“" + v.translation + "”"));
    box.appendChild(el("p", "verse-src", v.source));
    return box;
  }

  var slides = [];
  var slidesBox = $("slides");
  var barsBox = $("bars");

  S.chapters.forEach(function (c) {
    var s = el("article", "slide");
    var art = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    art.setAttribute("class", "art");
    art.setAttribute("viewBox", "0 0 300 250");
    art.setAttribute("aria-hidden", "true");
    art.innerHTML = ART[c.art] || ART.stars;
    s.appendChild(art);
    s.appendChild(el("p", "chapter-label", c.label));
    s.appendChild(el("h2", "chapter-title", c.title));
    var p = el("p", "chapter-text");
    splitWords(p, c.text);
    s.appendChild(p);
    if (c.verse) {
      s.classList.add("has-verse");
      s.appendChild(verseBlock(c.verse, "mini-verse reveal"));
    }
    var words = c.text.split(/\s+/).length + (c.verse ? 14 : 0);
    s.dataset.duration = Math.max(7, Math.min(20, words * 0.34 + 2.5));
    slides.push(s);
  });

  (function closingSlide() {
    var s = el("article", "slide closing");
    s.innerHTML = '<svg class="closing-ornament reveal" viewBox="-10 -10 20 20" aria-hidden="true"><use href="#star8" x="-10" y="-10" width="20" height="20"/></svg>';
    var v = verseBlock(S.closing, "reveal");
    s.appendChild(v);
    var b = el("button", "btn btn-gold reveal", "Lihat info acara");
    b.type = "button";
    b.addEventListener("click", showInfo);
    s.appendChild(b);
    s.dataset.duration = 12;
    s.dataset.last = "1";
    slides.push(s);
  })();

  slides.forEach(function (s, i) {
    s.setAttribute("aria-label", (i + 1) + " dari " + slides.length);
    slidesBox.appendChild(s);
    var bar = el("div", "bar");
    bar.appendChild(el("i"));
    barsBox.appendChild(bar);
  });
  var barFills = barsBox.querySelectorAll(".bar i");

  // ---------- Pindah layar ----------
  var screens = { cover: $("cover"), story: $("story"), info: $("info") };
  function show(name) {
    Object.keys(screens).forEach(function (k) {
      screens[k].classList.toggle("active", k === name);
    });
    if (hasGsap && !reduceMotion) gsap.fromTo(screens[name], { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" });
  }

  // ---------- Story player ----------
  var idx = -1, elapsed = 0, lastT = 0, paused = false, running = false, rafId = 0;
  var hint = $("tapHint");

  function setBars() {
    for (var i = 0; i < barFills.length; i++) {
      barFills[i].style.transform = "scaleX(" + (i < idx ? 1 : 0) + ")";
    }
  }

  // Hentikan animasi bab yang ditinggalkan (hemat baterai di HP).
  function stopAnim(s) {
    if (s._tl) { s._tl.kill(); s._tl = null; }
    if (s._tw) { s._tw.kill(); s._tw = null; }
  }

  function animateIn(s) {
    if (!hasGsap || reduceMotion) return;
    stopAnim(s);
    var tl = gsap.timeline();
    s._tl = tl;
    tl.fromTo(s, { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" });

    var draws = s.querySelectorAll(".draw");
    draws.forEach(function (d) {
      var len = d.getTotalLength ? d.getTotalLength() : 300;
      d.style.strokeDasharray = len;
    });
    if (draws.length) {
      tl.fromTo(draws,
        { strokeDashoffset: function (i, d) { return d.getTotalLength ? d.getTotalLength() : 300; } },
        { strokeDashoffset: 0, duration: 1.4, ease: "power1.inOut", stagger: 0.12 }, 0.1);
    }
    var pops = s.querySelectorAll(".pop");
    if (pops.length) tl.fromTo(pops, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(2)", stagger: 0.12 }, 0.2);
    var tw = s.querySelectorAll(".tw");
    if (tw.length) s._tw = gsap.fromTo(tw, { opacity: 0.25 }, { opacity: 1, duration: 1.2, repeat: -1, yoyo: true, stagger: { each: 0.3, from: "random" }, ease: "sine.inOut" });

    var t = s.querySelector(".chapter-title");
    if (t) tl.fromTo([s.querySelector(".chapter-label"), t], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.3);
    var words = s.querySelectorAll(".word");
    if (words.length) tl.fromTo(words, { opacity: 0, y: 8, filter: "blur(4px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.07, ease: "power1.out" }, 0.6);
    var rev = s.querySelectorAll(".reveal");
    if (rev.length) tl.fromTo(rev, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.5, ease: "power2.out" }, ">-0.1");
  }

  function go(n) {
    if (n < 0) n = 0;
    if (n >= slides.length) { showInfo(); return; }
    if (idx >= 0 && slides[idx]) {
      slides[idx].classList.remove("is-active");
      if (idx !== n) stopAnim(slides[idx]);
    }
    idx = n;
    elapsed = 0;
    slides[idx].classList.add("is-active");
    setBars();
    animateIn(slides[idx]);
    // Di slide penutup sudah ada tombol "Lihat info acara", jadi tombol lewati disembunyikan.
    hint.hidden = $("skipBtn").hidden = !!slides[idx].dataset.last;
  }

  function tick(t) {
    if (!running) return;
    var dt = lastT ? (t - lastT) / 1000 : 0;
    lastT = t;
    if (!paused && !document.hidden) {
      var dur = parseFloat(slides[idx].dataset.duration);
      elapsed += dt;
      var p = Math.min(1, elapsed / dur);
      barFills[idx].style.transform = "scaleX(" + p + ")";
      if (p >= 1 && !slides[idx].dataset.last) go(idx + 1);
    }
    rafId = requestAnimationFrame(tick);
  }

  function startStory() {
    show("story");
    running = true;
    lastT = 0;
    go(0);
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  function showInfo() {
    running = false;
    cancelAnimationFrame(rafId);
    if (idx >= 0) stopAnim(slides[idx]);
    show("info");
    window.scrollTo(0, 0);
    loadMap();
  }

  // Ketuk kiri = mundur, kanan = lanjut, tahan = jeda, geser = pindah bab.
  var down = null;
  screens.story.addEventListener("pointerdown", function (e) {
    if (e.target.closest("button")) return;
    down = { x: e.clientX, y: e.clientY, t: Date.now() };
    paused = true;
  });
  function release(e) {
    if (!down) return;
    var dx = e.clientX - down.x, dy = e.clientY - down.y, dt = Date.now() - down.t;
    var rect = screens.story.getBoundingClientRect();
    paused = false;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? idx + 1 : idx - 1);
    } else if (dt < 300 && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      go(e.clientX - rect.left < rect.width * 0.3 ? idx - 1 : idx + 1);
    }
    down = null;
  }
  screens.story.addEventListener("pointerup", release);
  screens.story.addEventListener("pointercancel", function () { down = null; paused = false; });
  document.addEventListener("keydown", function (e) {
    if (!running) return;
    if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(idx + 1); }
    if (e.key === "ArrowLeft") go(idx - 1);
  });

  $("skipBtn").addEventListener("click", showInfo);
  $("replayBtn").addEventListener("click", startStory);

  // ---------- Audio ----------
  var audio = null, muted = false, muteBtn = $("muteBtn");
  if (S.audio && S.audio.src) {
    audio = new Audio();
    audio.loop = true;
    audio.preload = "none";
    audio.addEventListener("playing", function () { muteBtn.hidden = false; });
    audio.addEventListener("error", function () { audio = null; muteBtn.hidden = true; });
    audio.src = S.audio.src;
  }
  function setMuted(m) {
    muted = m;
    muteBtn.classList.toggle("muted", m);
    muteBtn.setAttribute("aria-label", m ? "Nyalakan musik" : "Matikan musik");
    if (!audio) return;
    if (m) audio.pause(); else audio.play().catch(function () {});
  }
  muteBtn.addEventListener("click", function () { setMuted(!muted); });
  document.addEventListener("visibilitychange", function () {
    if (!audio || muted) return;
    if (document.hidden) audio.pause(); else audio.play().catch(function () {});
  });

  // ---------- Cover ----------
  var params = new URLSearchParams(location.search);
  var guest = (params.get("to") || "").trim().slice(0, 60);
  $("guestName").textContent = guest || S.defaultGuest;

  $("openBtn").addEventListener("click", function () {
    if (audio) {
      // Mulai pelan lalu naik selama ~2,5 detik
      var a = audio;
      a.volume = 0.05;
      a.play().catch(function () {});
      var fade = setInterval(function () {
        a.volume = Math.min(0.7, a.volume + 0.05);
        if (a.volume >= 0.7) clearInterval(fade);
      }, 180);
    }
    startStory();
  });

  // ---------- Info acara ----------
  $("brideName").textContent = S.couple.bride.name;
  $("brideParents").textContent = S.couple.bride.parents;
  $("groomName").textContent = S.couple.groom.name;
  $("groomParents").textContent = S.couple.groom.parents;

  function gcalDate(d) {
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }

  S.events.forEach(function (ev) {
    var c = el("article", "card event");
    c.appendChild(el("p", "tag", "Insya Allah"));
    c.appendChild(el("h4", "", ev.name));
    c.appendChild(el("p", "", ev.dateText));
    c.appendChild(el("p", "", ev.timeText));
    c.appendChild(el("p", "place", ev.place));
    c.appendChild(el("p", "addr", ev.address));
    var start = new Date(ev.date);
    var end = new Date(start.getTime() + 2 * 3600 * 1000);
    var a = el("a", "btn", "Simpan ke kalender");
    a.target = "_blank";
    a.rel = "noopener";
    a.href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(ev.name + " " + S.couple.short) +
      "&dates=" + gcalDate(start) + "/" + gcalDate(end) +
      "&location=" + encodeURIComponent(ev.place + ", " + ev.address);
    c.appendChild(a);
    $("events").appendChild(c);
  });

  var mapLoaded = false;
  function loadMap() {
    if (mapLoaded) return;
    mapLoaded = true;
    $("mapFrame").src = "https://maps.google.com/maps?q=" + encodeURIComponent(S.map.query) + "&z=16&output=embed";
  }
  $("mapLink").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.map.query);

  // Hitung mundur ke acara pertama
  var target = new Date(S.events[0].date).getTime();
  var cd = $("countdown");
  function renderCountdown() {
    var diff = Math.max(0, target - Date.now());
    var parts = [
      [Math.floor(diff / 864e5), "Hari"],
      [Math.floor(diff / 36e5) % 24, "Jam"],
      [Math.floor(diff / 6e4) % 60, "Menit"],
      [Math.floor(diff / 1e3) % 60, "Detik"],
    ];
    cd.innerHTML = "";
    parts.forEach(function (p) {
      var d = el("div");
      d.appendChild(el("b", "", String(p[0]).padStart(2, "0")));
      d.appendChild(el("span", "", p[1]));
      cd.appendChild(d);
    });
  }
  renderCountdown();
  setInterval(renderCountdown, 1000);

  // ---------- Efek & notifikasi ----------
  function celebrate() {
    if (typeof window.confetti !== "function" || reduceMotion) return;
    window.confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors: ["#c9a24a", "#e3c983", "#f6f0e1", "#2a6149"] });
  }
  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  // ---------- RSVP & doa (demo: tersimpan di browser) ----------
  var KEY = "undangan-demo-rsvp";
  function loadWishes() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function saveWishes(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* mode privat */ }
  }
  var mine = loadWishes();

  function renderWishes() {
    var ul = $("wishes");
    ul.innerHTML = "";
    mine.concat(S.sampleWishes).forEach(function (w) {
      var li = el("li");
      li.appendChild(el("b", "", w.name));
      if (w.attend) li.appendChild(el("span", "badge", w.attend === "hadir" ? "Hadir" : "Berhalangan"));
      if (w.text) li.appendChild(el("p", "", w.text));
      ul.appendChild(li);
    });
  }
  renderWishes();
  if (guest) $("rsvpName").value = guest;

  $("rsvpForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    var name = f.name.value.trim();
    var note = $("formNote");
    if (!name) {
      note.textContent = "Mohon isi nama Anda.";
      f.name.focus();
      return;
    }
    mine.unshift({ name: name, attend: f.attend.value, text: f.wish.value.trim() });
    saveWishes(mine);
    renderWishes();
    f.wish.value = "";
    note.textContent = "Jazakallahu khairan, doa Anda sudah kami terima.";
    celebrate();
  });

  // ---------- Amplop digital ----------
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = el("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (err) { reject(err); }
      document.body.removeChild(ta);
    });
  }

  S.gifts.forEach(function (g) {
    var box = el("div", "gift");
    var info = el("div");
    info.appendChild(el("small", "", g.bank));
    info.appendChild(el("div", "num", g.number));
    info.appendChild(el("div", "holder", "a.n. " + g.holder));
    var b = el("button", "btn btn-gold", "Salin");
    b.type = "button";
    b.addEventListener("click", function () {
      copyText(g.number).then(function () {
        toast("Nomor rekening disalin");
        celebrate();
      }, function () { toast("Gagal menyalin, silakan salin manual"); });
    });
    box.appendChild(info);
    box.appendChild(b);
    $("gifts").appendChild(box);
  });

  // Animasi masuk cover
  if (hasGsap && !reduceMotion) {
    gsap.from(".cover-inner > *", { opacity: 0, y: 16, duration: 0.8, stagger: 0.12, ease: "power2.out", delay: 0.15 });
  }
})();
