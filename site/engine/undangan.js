// Mesin undangan RB Digital.
// Membaca window.UNDANGAN (data.js) lalu menyusun seluruh halaman.
// Tema hanya mengatur tampilan lewat CSS; struktur dan fitur sama untuk semua tema.
(function () {
  "use strict";

  var D = window.UNDANGAN;
  if (!D) return;
  var TZ = "Asia/Jakarta";
  var params = new URLSearchParams(location.search);
  var guest = (params.get("to") || "").trim().slice(0, 60);

  // ---------- Helper ----------
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function add(parent) {
    for (var i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]);
    return parent;
  }
  function orn(name) {
    var d = el("div", "orn orn-" + name);
    // Slot kosong untuk ornamen tambahan dari paket adat (cover, hero, penutup)
    if (name === "cover" || name === "hero" || name === "penutup") {
      for (var i = 1; i <= 4; i++) d.appendChild(el("i", "o o" + i));
    }
    return d;
  }

  // Teks yang bisa diganti per tema/agama: D.teks = { kepada, catatanTamu, tombolBuka, salamPenutup, terimaKasih, contohUcapan, berhalangan }
  var T = D.teks || {};
  function teks(k, def) { return T[k] != null ? T[k] : def; }
  // Judul bagian: D.judulBagian = { mempelai: ["Mempelai", "Dengan izin Allah"], ... }
  var JB = D.judulBagian || {};
  function judul(id, def, sub) { var j = JB[id]; return j ? [j[0], j[1]] : [def, sub]; }

  // Tampilan modular: D.tampilan = { adat, buka, gerak, letak, pola, hias, huruf, kelas }
  var V = D.tampilan || {};
  if (D.tampilan) document.body.classList.add("mod");
  ["adat", "buka", "gerak", "letak", "pola", "hias"].forEach(function (k) {
    if (V[k]) document.body.classList.add(k + "-" + V[k]);
  });
  if (V.kelas) V.kelas.split(/\s+/).forEach(function (c) { if (c) document.body.classList.add(c); });
  var ISLAM = D.agama !== "kristen" && D.agama !== "hindu";
  var acaraUtama = D.acara.filter(function (a) { return a.utama; })[0] || D.acara[0];

  // Foto latar penuh (opsional, untuk tema berfoto). D.foto = { cover, hero, penutup }
  var FOTO = D.foto || {};
  function fotoLatar(nama, wadah) {
    if (!FOTO[nama]) return null;
    wadah.classList.add("has-photo");
    var w = el("div", "photo-bg");
    var img = el("img");
    img.src = FOTO[nama];
    img.alt = "";
    if (nama !== "cover") img.loading = "lazy";
    w.appendChild(img);
    return w;
  }

  function tanggal(iso) {
    var s = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: TZ }).format(new Date(iso));
    return D.pakaiAhad === false ? s : s.replace(/^Minggu/, "Ahad");
  }
  function jam(iso) {
    return new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: TZ }).format(new Date(iso)).replace(":", ".");
  }
  function linkPeta(q) {
    return /^https?:/.test(q) ? q : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }
  function gcal(iso) {
    return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }

  var toastTimer;
  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  function salin(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, fail) {
      var ta = el("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? ok() : fail(); } catch (e) { fail(e); }
      document.body.removeChild(ta);
    });
  }

  var P = D.pasangan;
  var pertama = P.urutan === "pria-dulu" ? P.pria : P.wanita;
  var kedua = P.urutan === "pria-dulu" ? P.wanita : P.pria;
  var namaPendek = pertama.panggilan + " & " + kedua.panggilan;

  // V.huruf = "per-huruf": setiap huruf nama dibungkus agar bisa dianimasikan satu per satu (jangan untuk huruf sambung)
  function nama(t) {
    var sp = el("span", "nm");
    if (V.huruf !== "per-huruf") { sp.textContent = t; return sp; }
    sp.setAttribute("aria-label", t);
    Array.from(t).forEach(function (ch, i) {
      var c = el("span", "ch", ch === " " ? "\u00a0" : ch);
      c.setAttribute("aria-hidden", "true");
      c.style.setProperty("--c", i);
      sp.appendChild(c);
    });
    return sp;
  }
  function namaPasangan(cls) {
    var h = el("h1", "couple " + (cls || ""));
    add(h, nama(pertama.panggilan), el("em", "amp", "&"), nama(kedua.panggilan));
    return h;
  }

  function section(id, jd, sub) {
    var s = el("section", "sec sec-" + id);
    s.id = id;
    if (V.gelap && V.gelap.indexOf(id) >= 0) s.classList.add("gelap");
    if (jd) {
      var jj = judul(id, jd, sub);
      jd = jj[0];
      sub = jj[1];
    }
    if (jd) {
      var head = el("header", "sec-head reveal");
      if (sub) head.appendChild(el("p", "sec-sub", sub));
      head.appendChild(el("h2", "sec-title", jd));
      head.appendChild(orn("divider"));
      s.appendChild(head);
    }
    return s;
  }

  var app = document.getElementById("app");
  document.title = D.judul || ("Undangan " + namaPendek);

  // ---------- Cover ----------
  var cover = el("div", "cover");
  cover.id = "cover";
  var panels = el("div", "cv-panels");
  panels.setAttribute("aria-hidden", "true");
  for (var pi = 0; pi < 6; pi++) panels.appendChild(el("i", "cv-p cv-p" + (pi + 1)));
  add(cover,
    panels,
    fotoLatar("cover", cover),
    orn("cover"),
    add(el("div", "cover-inner"),
      (function () {
        // Foto berbingkai di cover (opsional): D.foto.sampul
        if (!FOTO.sampul) return null;
        var f = el("div", "cover-frame");
        var img = el("img");
        img.src = FOTO.sampul;
        img.alt = "";
        f.appendChild(img);
        return f;
      })(),
      el("p", "label", D.label || "Undangan Pernikahan"),
      namaPasangan(),
      el("p", "cover-date", tanggal(acaraUtama.mulai)),
      add(el("div", "guest"),
        el("p", "", teks("kepada", "Kepada Yth.")),
        el("p", "guest-name", guest || "Bapak/Ibu/Saudara/i"),
        el("p", "guest-note", teks("catatanTamu", "Mohon maaf bila ada kesalahan penulisan nama dan gelar"))),
      (function () {
        var b = el("button", "btn btn-primary btn-open", teks("tombolBuka", "Buka Undangan"));
        b.type = "button";
        b.addEventListener("click", buka);
        return b;
      })()));
  document.body.insertBefore(cover, app);
  document.body.classList.add("locked");

  // ---------- Hero ----------
  var hero = section("hero");
  add(hero, fotoLatar("hero", hero), orn("hero"),
    add(el("div", "hero-inner reveal"),
      (function () {
        // Tulisan aksara daerah (opsional): D.aksara = { teks, lang, arti }
        if (!D.aksara) return null;
        var a = el("p", "aksara", D.aksara.teks);
        a.lang = D.aksara.lang || "jv";
        if (D.aksara.arti) a.title = D.aksara.arti;
        return a;
      })(),
      el("p", "label", D.label || "Undangan Pernikahan"),
      namaPasangan("big"),
      el("p", "hero-date", tanggal(acaraUtama.mulai)),
      D.hashtag ? el("p", "hashtag", D.hashtag) : null));
  app.appendChild(hero);

  // ---------- Salam & ayat ----------
  var salam = section("salam");
  var sw = add(el("div", "salam-inner reveal"));
  if (D.bismillah !== false && D.agama !== "kristen" && D.agama !== "hindu") {
    var bis = el("p", "arabic bismillah", "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ");
    bis.lang = "ar";
    sw.appendChild(bis);
  }
  add(sw, el("p", "salam-open", D.salam.pembuka), el("p", "salam-text", D.salam.teks));
  if (D.ayat) {
    var ay = el("blockquote", "ayat reveal");
    var ar = null;
    if (D.ayat.arab) {
      ar = el("p", "arabic", D.ayat.arab);
      ar.lang = "ar";
    }
    add(ay, ar, el("p", "ayat-arti", "“" + D.ayat.arti + "”"), el("cite", "", D.ayat.sumber));
    add(salam, sw, ay);
  } else {
    salam.appendChild(sw);
  }
  app.appendChild(salam);

  // ---------- Pembuka (opsional): D.pembuka = { judul, teks } ----------
  if (D.pembuka) {
    var pb = section("pembuka");
    add(pb, add(el("div", "pembuka-inner reveal"),
      orn("bunga"),
      el("h2", "pembuka-title", D.pembuka.judul),
      D.pembuka.teks ? el("p", "pembuka-text", D.pembuka.teks) : null));
    app.appendChild(pb);
  }

  // ---------- Mempelai ----------
  var mp = section("mempelai", D.judulMempelai || "Mempelai", D.subMempelai || (ISLAM ? "Dengan izin Allah" : "Dengan penuh syukur"));
  function orang(o) {
    var c = el("div", "person reveal");
    if (o.foto) {
      var f = el("div", "person-photo");
      var img = el("img");
      img.src = o.foto;
      img.alt = o.nama;
      img.loading = "lazy";
      f.appendChild(img);
      c.appendChild(f);
    }
    // Peran adat opsional, mis. "Anak Daro" / "Marapulai"
    add(c, o.peran ? el("p", "person-role", o.peran) : null, el("h3", "person-name", o.nama), el("p", "person-parents", o.ortu));
    if (o.instagram) {
      var ig = el("a", "btn btn-ghost btn-sm", "@" + o.instagram.replace(/^@/, ""));
      ig.href = "https://instagram.com/" + o.instagram.replace(/^@/, "");
      ig.target = "_blank";
      ig.rel = "noopener";
      c.appendChild(ig);
    }
    return c;
  }
  add(mp, orang(pertama), el("p", "amp big-amp reveal", "&"), orang(kedua));
  app.appendChild(mp);

  // ---------- Hitung mundur ----------
  var cd = section("countdown", "Menuju Hari Bahagia", D.agama === "kristen" || D.agama === "hindu" ? "Hari yang dinanti" : "Insya Allah");
  var cdBox = el("div", "countdown reveal");
  cd.appendChild(cdBox);
  var utama = acaraUtama;
  var cal = el("a", "btn btn-ghost reveal", "Simpan ke Kalender");
  cal.target = "_blank";
  cal.rel = "noopener";
  cal.href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent("Pernikahan " + namaPendek) +
    "&dates=" + gcal(utama.mulai) + "/" + gcal(utama.selesai || new Date(new Date(utama.mulai).getTime() + 2 * 36e5).toISOString()) +
    "&location=" + encodeURIComponent(utama.tempat + ", " + utama.alamat);
  cd.appendChild(cal);
  app.appendChild(cd);
  var target = new Date(utama.mulai).getTime();
  function renderCd() {
    var d = Math.max(0, target - Date.now());
    cdBox.innerHTML = "";
    [[Math.floor(d / 864e5), "Hari"], [Math.floor(d / 36e5) % 24, "Jam"], [Math.floor(d / 6e4) % 60, "Menit"], [Math.floor(d / 1e3) % 60, "Detik"]]
      .forEach(function (p) {
        add(cdBox, add(el("div", "cd-item"), el("b", "", String(p[0]).padStart(2, "0")), el("span", "", p[1])));
      });
  }
  renderCd();
  setInterval(renderCd, 1000);

  // ---------- Acara ----------
  var ac = section("acara", "Rangkaian Acara");
  if (D.teksAcara) ac.appendChild(el("p", "sec-desc reveal", D.teksAcara));
  D.acara.forEach(function (a) {
    var c = el("article", "card event reveal");
    var waktu = a.selesai ? jam(a.mulai) + " - " + jam(a.selesai) + " WIB" : jam(a.mulai) + " WIB - selesai";
    var peta = el("a", "btn btn-primary btn-sm", "Lihat Lokasi");
    peta.href = linkPeta(a.peta || a.tempat + ", " + a.alamat);
    peta.target = "_blank";
    peta.rel = "noopener";
    add(c, el("h3", "event-name", a.nama), el("p", "event-date", tanggal(a.mulai)), el("p", "event-time", waktu),
      el("p", "event-place", a.tempat), el("p", "event-addr", a.alamat), peta);
    ac.appendChild(c);
  });
  var mapWrap = el("div", "map reveal");
  var iframe = el("iframe");
  iframe.title = "Peta lokasi acara";
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  iframe.dataset.src = "https://maps.google.com/maps?q=" + encodeURIComponent(utama.peta || utama.tempat + ", " + utama.alamat) + "&z=16&output=embed";
  mapWrap.appendChild(iframe);
  ac.appendChild(mapWrap);
  app.appendChild(ac);

  // ---------- Kisah (opsional) ----------
  if (D.kisah && D.kisah.length) {
    var ks = section("kisah", "Kisah Kami");
    var tl = el("ol", "timeline");
    D.kisah.forEach(function (k) {
      add(tl, add(el("li", "reveal"), el("p", "tl-date", k.waktu), el("h3", "tl-title", k.judul), el("p", "tl-text", k.teks)));
    });
    ks.appendChild(tl);
    app.appendChild(ks);
  }

  // ---------- Galeri (opsional) ----------
  if (D.galeri && D.galeri.length) {
    var gl = section("galeri", "Galeri");
    var grid = el("div", "gallery");
    D.galeri.forEach(function (src, i) {
      var b = el("button", "g-item reveal");
      b.type = "button";
      var img = el("img");
      img.src = src;
      img.alt = "Foto " + (i + 1);
      img.loading = "lazy";
      b.appendChild(img);
      b.addEventListener("click", function () { lightbox(i, b); });
      grid.appendChild(b);
    });
    gl.appendChild(grid);
    app.appendChild(gl);
  }
  function lightbox(start, opener) {
    var fotos = D.galeri, idx = start;
    var lb = el("div", "lightbox");
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Galeri foto");
    var img = el("img");
    img.alt = "";
    var info = el("p", "lb-count");
    function tombol(cls, label, isi) {
      var b = el("button", "lb-btn " + cls);
      b.type = "button";
      b.setAttribute("aria-label", label);
      b.innerHTML = isi;
      return b;
    }
    var tutup = tombol("lb-close", "Tutup", '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>');
    var prev = tombol("lb-prev", "Foto sebelumnya", '<svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg>');
    var next = tombol("lb-next", "Foto berikutnya", '<svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>');
    function tampil(n) {
      idx = (n + fotos.length) % fotos.length;
      img.src = fotos[idx];
      info.textContent = (idx + 1) + " / " + fotos.length;
    }
    function selesai() {
      document.removeEventListener("keydown", kunci);
      lb.remove();
      if (opener) opener.focus();
    }
    function kunci(e) {
      if (e.key === "Escape") selesai();
      else if (e.key === "ArrowLeft") tampil(idx - 1);
      else if (e.key === "ArrowRight") tampil(idx + 1);
    }
    tutup.addEventListener("click", selesai);
    prev.addEventListener("click", function () { tampil(idx - 1); });
    next.addEventListener("click", function () { tampil(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) selesai(); });
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) tampil(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
    document.addEventListener("keydown", kunci);
    if (fotos.length < 2) { prev.hidden = true; next.hidden = true; }
    add(lb, img, info, prev, next, tutup);
    tampil(start);
    document.body.appendChild(lb);
    tutup.focus();
  }

  // ---------- RSVP & ucapan ----------
  var rv = section("rsvp", "Ucapan & Doa", "Konfirmasi kehadiran");
  var form = el("form", "card rsvp-form reveal");
  form.noValidate = true;
  form.innerHTML =
    '<label>Nama<input name="nama" maxlength="60" autocomplete="name"></label>' +
    '<fieldset class="choice"><legend>Kehadiran</legend>' +
    '<label><input type="radio" name="hadir" value="Hadir" checked> ' + teks("hadir", ISLAM ? "Insya Allah hadir" : "Akan hadir") + '</label>' +
    '<label><input type="radio" name="hadir" value="Berhalangan"> Berhalangan</label></fieldset>' +
    '<label>Jumlah tamu<select name="jumlah"><option>1</option><option>2</option><option>3</option><option>4</option></select></label>' +
    '<label>Ucapan & doa<textarea name="ucapan" rows="3" maxlength="280" placeholder="' + teks("contohUcapan", ISLAM ? "Barakallahu lakuma..." : "Selamat berbahagia...") + '"></textarea></label>' +
    '<button class="btn btn-primary" type="submit">Kirim</button><p class="form-note" role="status"></p>';
  var list = el("ul", "wishes");
  add(rv, form, list);
  app.appendChild(rv);
  if (guest) form.nama.value = guest;

  var KEY = "rsvp-" + (D.id || location.pathname);
  function muat() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function simpan(x) { try { localStorage.setItem(KEY, JSON.stringify(x)); } catch (e) { /* mode privat */ } }
  var ucapan = muat();
  function renderUcapan() {
    list.innerHTML = "";
    ucapan.concat(D.contohUcapan || []).forEach(function (u) {
      var li = el("li", "wish");
      add(li, add(el("p", "wish-head"), el("b", "", u.nama), u.hadir ? el("span", "badge", u.hadir) : null), u.ucapan ? el("p", "", u.ucapan) : null);
      list.appendChild(li);
    });
  }
  renderUcapan();
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var note = form.querySelector(".form-note");
    var nama = form.nama.value.trim();
    if (!nama) { note.textContent = "Mohon isi nama Anda."; form.nama.focus(); return; }
    ucapan.unshift({ nama: nama, hadir: form.hadir.value, jumlah: form.jumlah.value, ucapan: form.ucapan.value.trim() });
    simpan(ucapan);
    renderUcapan();
    form.ucapan.value = "";
    note.textContent = teks("terimaKasih", ISLAM ? "Jazakumullahu khairan, ucapan Anda sudah terkirim." : "Terima kasih, ucapan Anda sudah terkirim.");
  });

  // ---------- Amplop digital ----------
  if (D.hadiah && D.hadiah.length) {
    var hd = section("hadiah", "Amplop Digital", "Tanda kasih");
    hd.appendChild(el("p", "sec-desc reveal", D.teksHadiah || "Doa restu Anda adalah karunia yang sangat berarti bagi kami. Bila ingin memberi tanda kasih, dapat melalui:"));
    D.hadiah.forEach(function (g) {
      var c = el("div", "gift reveal");
      var b = el("button", "btn btn-primary btn-sm", "Salin");
      b.type = "button";
      b.addEventListener("click", function () {
        salin(g.nomor).then(function () { toast("Nomor berhasil disalin"); }, function () { toast("Gagal menyalin, silakan salin manual"); });
      });
      add(c, add(el("div"), el("p", "gift-bank", g.bank), el("p", "gift-num", g.nomor), el("p", "gift-name", "a.n. " + g.nama)), b);
      hd.appendChild(c);
    });
    if (D.alamatKado) {
      var bk = el("button", "btn btn-ghost btn-sm", "Salin Alamat");
      bk.type = "button";
      bk.addEventListener("click", function () {
        salin(D.alamatKado).then(function () { toast("Alamat berhasil disalin"); }, function () { toast("Gagal menyalin, silakan salin manual"); });
      });
      add(hd, add(el("div", "card kado reveal"), el("p", "gift-bank", "Kirim Kado"), el("p", "kado-addr", D.alamatKado), bk));
    }
    app.appendChild(hd);
  }

  // ---------- Penutup ----------
  var pn = section("penutup");
  add(pn, fotoLatar("penutup", pn), orn("penutup"),
    add(el("div", "penutup-inner reveal"),
      el("p", "penutup-text", D.penutup || "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."),
      el("p", "salam-open", teks("salamPenutup", D.salam && D.salam.penutup ? D.salam.penutup : "Wassalamu'alaikum Warahmatullahi Wabarakatuh")),
      el("p", "penutup-from", teks("dariKami", "Kami yang berbahagia")),
      namaPasangan()));
  app.appendChild(pn);

  var foot = el("footer", "credit");
  var a = el("a", "", "RB Digital");
  a.href = D.katalogUrl || "../../";
  foot.appendChild(document.createTextNode("Undangan digital oleh "));
  foot.appendChild(a);
  app.appendChild(foot);

  var t = el("div", "toast");
  t.id = "toast";
  t.setAttribute("role", "status");
  document.body.appendChild(t);

  // ---------- Musik ----------
  var audio = null;
  var musicBtn = el("button", "music-btn");
  musicBtn.type = "button";
  musicBtn.hidden = true;
  musicBtn.setAttribute("aria-label", "Matikan musik");
  musicBtn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v10.6A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>';
  document.body.appendChild(musicBtn);
  if (D.musik) {
    audio = new Audio();
    audio.loop = true;
    audio.preload = "none";
    audio.addEventListener("playing", function () { musicBtn.hidden = false; musicBtn.classList.add("playing"); });
    audio.addEventListener("pause", function () { musicBtn.classList.remove("playing"); });
    audio.addEventListener("error", function () { musicBtn.hidden = true; audio = null; });
    audio.src = D.musik;
  }
  var userPaused = false;
  musicBtn.addEventListener("click", function () {
    if (!audio) return;
    if (audio.paused) { userPaused = false; audio.play().catch(function () {}); musicBtn.setAttribute("aria-label", "Matikan musik"); }
    else { userPaused = true; audio.pause(); musicBtn.setAttribute("aria-label", "Nyalakan musik"); }
  });
  document.addEventListener("visibilitychange", function () {
    if (!audio || userPaused) return;
    if (document.hidden) audio.pause(); else audio.play().catch(function () {});
  });

  // ---------- Partikel (opsional) ----------
  // D.partikel = { jenis: "kelopak" | "melati" | "daun" | "kunang" | "kilau" | "salju", jumlah }. D.kelopak = n tetap didukung.
  var PT = D.partikel || (D.kelopak ? { jenis: "kelopak", jumlah: D.kelopak } : null);
  function kelopak() {
    var n = PT ? Math.min(+PT.jumlah || 0, 28) : 0;
    if (!n || document.querySelector(".petals")) return;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var jenis = PT.jenis || "kelopak";
    var diam = jenis === "kilau";
    var naik = jenis === "kunang";
    var layer = el("div", "petals pt-" + jenis);
    layer.setAttribute("aria-hidden", "true");
    for (var i = 0; i < n; i++) {
      var p = el("i", "petal p" + (i % 3));
      var s = (diam ? 6 : naik ? 4 : 8) + Math.random() * (diam ? 10 : naik ? 5 : 10);
      var css = "left:" + (Math.random() * 100) + "%;width:" + s + "px;height:" + s + "px;";
      if (diam) {
        css += "top:" + (Math.random() * 100) + "%;animation-duration:" + (2 + Math.random() * 3) + "s;animation-delay:" + (-Math.random() * 5) + "s;";
      } else {
        css += "animation-duration:" + ((naik ? 10 : 9) + Math.random() * 9) + "s," + (2.5 + Math.random() * 2.5) + "s;" +
          "animation-delay:" + (-Math.random() * 16) + "s,0s;opacity:" + (0.5 + Math.random() * 0.4);
      }
      p.style.cssText = css;
      layer.appendChild(p);
    }
    document.body.appendChild(layer);
  }

  // Bingkai layar tetap (dipakai letak "bingkai")
  if (V.letak === "bingkai" || V.bingkai) {
    var bl = el("div", "bingkai-layar");
    bl.setAttribute("aria-hidden", "true");
    for (var bi = 0; bi < 4; bi++) bl.appendChild(el("i", "bl bl" + (bi + 1)));
    document.body.appendChild(bl);
  }

  // ---------- Buka undangan ----------
  function buka() {
    if (audio) {
      var au = audio;
      au.volume = 0.05;
      au.play().catch(function () {});
      var fade = setInterval(function () {
        au.volume = Math.min(0.7, au.volume + 0.05);
        if (au.volume >= 0.7) clearInterval(fade);
      }, 180);
    }
    cover.classList.add("opened");
    document.body.classList.remove("locked");
    document.body.classList.add("terbuka");
    kelopak();
    window.scrollTo(0, 0);
    // Lama animasi pembuka diatur paket "buka" lewat variabel CSS --buka-ms
    var ms = parseInt(getComputedStyle(cover).getPropertyValue("--buka-ms"), 10) || 900;
    setTimeout(function () { cover.hidden = true; }, ms);
  }

  // ---------- Animasi muncul saat di-scroll + peta lazy ----------
  var reveals = document.querySelectorAll(".reveal");
  // Urutan elemen di dalam induknya, untuk animasi berurutan (--i) dan arah selang-seling (.ganjil)
  reveals.forEach(function (r) {
    var idx = Array.prototype.indexOf.call(r.parentNode.children, r);
    r.style.setProperty("--i", idx % 6);
    if (idx % 2) r.classList.add("ganjil");
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (r) { io.observe(r); });
    var mo = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { iframe.src = iframe.dataset.src; mo.disconnect(); }
    }, { rootMargin: "300px" });
    mo.observe(mapWrap);
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
    iframe.src = iframe.dataset.src;
  }
})();
