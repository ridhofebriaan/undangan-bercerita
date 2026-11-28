// Mesin undangan FB Digital.
// Membaca window.UNDANGAN (data.js) lalu menyusun seluruh halaman.
// Tema hanya mengatur tampilan lewat CSS; struktur dan fitur sama untuk semua tema.
(function () {
  "use strict";
  // Folder engine, untuk memuat berkas pendamping (mis. vendor/qrcode.js) hanya saat dibutuhkan
  var BASE = ((document.currentScript && document.currentScript.src) || "").replace(/[^/]*$/, "");
  function muatSkrip(src, cb) {
    var ada = document.querySelector('script[data-src="' + src + '"]');
    if (ada) { if (ada.dataset.siap) cb(); else ada.addEventListener("load", cb); return; }
    var sc = document.createElement("script");
    sc.src = src;
    sc.dataset.src = src;
    sc.addEventListener("load", function () { sc.dataset.siap = "1"; cb(); });
    document.head.appendChild(sc);
  }

  var D = window.UNDANGAN;
  if (!D) return;
  // Zona waktu acara: D.zonaWaktu = "WIB" (bawaan), "WITA", atau "WIT"
  var ZONA = { WIB: "Asia/Jakarta", WITA: "Asia/Makassar", WIT: "Asia/Jayapura" };
  var ZW = ZONA[D.zonaWaktu] ? D.zonaWaktu : "WIB";
  var TZ = ZONA[ZW];
  var params = new URLSearchParams(location.search);
  var guest = (params.get("to") || "").trim().slice(0, 60);
  // Nomor undangan & jumlah kursi dari tautan tamu: ?to=Nama&no=48&kursi=2 (D.undangan = { total, kursiBawaan, catatan })
  var UND = D.undangan || {};
  var noTamu = parseInt(params.get("no"), 10) || 0;
  var kursi = Math.min(10, parseInt(params.get("kursi"), 10) || +UND.kursiBawaan || 0);
  function nomorUndangan() {
    return noTamu ? "No. " + String(noTamu).padStart(3, "0") + (UND.total ? " / " + UND.total : "") : "";
  }

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
  // Kerangka v2 (docs/kerangka-undangan.md): aktif bila D.kerangka = true
  var K2 = !!D.kerangka;
  if (K2) document.body.classList.add("k2");
  var GF = D.gayaFoto || {};
  if (K2 && GF.garis === "tipis") document.body.classList.add("garis-tipis");
  // Koleksi (mis. "modern-klasik", docs/koleksi-modern-klasik.md): gaya dan bagian khusus koleksi
  var MK = D.koleksi === "modern-klasik";
  if (D.koleksi) document.body.classList.add("koleksi-" + D.koleksi);
  // Kurangi gerak atau hemat data: video tidak dimuat, yang tampil poster saja
  var KURANGI = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var HEMAT = KURANGI || !!(navigator.connection && navigator.connection.saveData);
  // Klip video berposter: poster tajam tampil sejak awal, video menggantikan setelah benar-benar berputar.
  // v = { src, poster, alt, malas }. Video baru dimuat saat mendekati layar dan dijeda di luar layar (lihat bagian bawah).
  var klipVideo = [];
  function videoKlip(v, cls) {
    var f = el("figure", "klip " + (cls || ""));
    var pos = el("img", "klip-poster");
    pos.src = v.poster;
    pos.alt = v.alt || "";
    pos.decoding = "async";
    if (v.malas) pos.loading = "lazy";
    f.appendChild(pos);
    if (!HEMAT && v.src) {
      var vid = el("video", "klip-video");
      vid.muted = true;
      vid.defaultMuted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.preload = "none";
      vid.setAttribute("muted", "");
      vid.setAttribute("playsinline", "");
      vid.setAttribute("aria-hidden", "true");
      vid.poster = v.poster;
      vid.dataset.src = v.src;
      vid.addEventListener("playing", function () { f.classList.add("siap"); });
      f.appendChild(vid);
      klipVideo.push(vid);
    }
    return f;
  }
  function bingkaiFoto(src, bentuk, muncul, alt, malas) {
    var f = el("figure", "bingkai bingkai-" + (bentuk || "lengkung") + (muncul ? " muncul-" + muncul : ""));
    var img = el("img");
    img.src = src;
    img.alt = alt || "";
    if (malas) img.loading = "lazy";
    f.appendChild(img);
    return f;
  }
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
  function linkKalender(a, judulAcara) {
    var akhir = a.selesai || new Date(new Date(a.mulai).getTime() + 2 * 36e5).toISOString();
    return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(judulAcara || a.nama) +
      "&dates=" + gcal(a.mulai) + "/" + gcal(akhir) + "&location=" + encodeURIComponent(a.tempat + ", " + a.alamat);
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
    if (K2) {
      // Lapis belakang (ilustrasi) dan lapis depan (ornamen) diisi gambar oleh CSS tema
      s.appendChild(el("div", "lapis lapis-b"));
      s.appendChild(el("div", "lapis lapis-d"));
      if (s.classList.contains("gelap")) { s.appendChild(el("i", "tepi tepi-kiri")); s.appendChild(el("i", "tepi tepi-kanan")); }
    }
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

  // ---------- Koleksi: segel tekan-dan-tahan ----------
  // Lingkaran logam terisi selama segel ditahan (1 detik), lalu undangan terbuka. Klik keyboard atau terprogram langsung membuka.
  function segel() {
    var b = el("button", "btn-open segel");
    b.type = "button";
    b.setAttribute("aria-label", teks("tombolBuka", "Buka Undangan") + " (tekan dan tahan)");
    var K = 2 * Math.PI * 34;
    b.innerHTML = '<svg viewBox="0 0 80 80" aria-hidden="true"><circle class="segel-dasar" cx="40" cy="40" r="34"/>' +
      '<circle class="segel-isi" cx="40" cy="40" r="34" stroke-dasharray="' + K.toFixed(1) + '" stroke-dashoffset="' + K.toFixed(1) + '"/></svg>';
    b.appendChild(el("span", "segel-teks", D.monogram || namaPendek));
    var isi = b.querySelector(".segel-isi");
    var p = 0, arah = 0, t0 = 0, raf = 0, terbukaSegel = false, DUR = 1000;
    function gambar() {
      isi.style.strokeDashoffset = (K * (1 - p)).toFixed(1);
      if (!KURANGI) document.documentElement.style.setProperty("--kilau", (p * 100).toFixed(1) + "%");
    }
    function langkah(t) {
      var dt = t0 ? t - t0 : 0;
      t0 = t;
      p = Math.max(0, Math.min(1, p + (arah * dt) / (arah > 0 ? DUR : DUR / 2)));
      gambar();
      if (p >= 1 && !terbukaSegel) {
        terbukaSegel = true;
        if (navigator.vibrate) navigator.vibrate(18);
        setTimeout(buka, 180);
        raf = 0;
        return;
      }
      raf = (arah > 0 && p < 1) || (arah < 0 && p > 0) ? requestAnimationFrame(langkah) : 0;
    }
    function gerak(a) { arah = a; t0 = 0; if (!raf) raf = requestAnimationFrame(langkah); }
    b.addEventListener("pointerdown", function (e) {
      if (terbukaSegel) return;
      e.preventDefault();
      if (b.setPointerCapture) { try { b.setPointerCapture(e.pointerId); } catch (x) { /* abaikan */ } }
      gerak(1);
    });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (ev) {
      b.addEventListener(ev, function () {
        if (terbukaSegel || arah <= 0) return;
        if (p < 0.4) {
          var hint = document.querySelector(".segel-petunjuk");
          if (hint) { hint.classList.add("ingat"); setTimeout(function () { hint.classList.remove("ingat"); }, 1400); }
        }
        gerak(-1);
      });
    });
    b.addEventListener("click", function (e) { if (e.detail === 0 && !terbukaSegel) { terbukaSegel = true; buka(); } });
    b.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    return b;
  }

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
      MK ? add(el("div", "akses-atas"), el("span", "", teks("labelPribadi", "Undangan Pribadi")), nomorUndangan() ? el("span", "no-undangan", nomorUndangan()) : null) : null,
      el("p", "label", D.label || "Undangan Pernikahan"),
      namaPasangan(),
      el("p", "cover-date", tanggal(acaraUtama.mulai)),
      add(el("div", "guest"),
        el("p", "", teks("kepada", "Kepada Yth.")),
        el("p", "guest-name", guest || "Bapak/Ibu/Saudara/i"),
        MK && kursi ? el("p", "guest-kursi", teks("kursi", "Berlaku untuk") + " " + kursi + " orang") : null,
        el("p", "guest-note", teks("catatanTamu", "Mohon maaf bila ada kesalahan penulisan nama dan gelar"))),
      MK ? segel() : (function () {
        var b = el("button", "btn btn-primary btn-open", teks("tombolBuka", "Buka Undangan"));
        b.type = "button";
        b.addEventListener("click", buka);
        return b;
      })(),
      MK ? el("p", "segel-petunjuk", teks("petunjukSegel", "Tekan dan tahan segel untuk membuka")) : null,
      MK && UND.catatan ? el("p", "catatan-privasi", UND.catatan) : null));
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
      K2 && D.video && D.video.hero ? add(el("div", "bingkai-wadah"), videoKlip(D.video.hero, "bingkai bingkai-" + (GF.hero || "penuh")))
        : K2 && FOTO.utama ? add(el("div", "bingkai-wadah"), bingkaiFoto(FOTO.utama, GF.hero, GF.heroMuncul, namaPendek)) : null,
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
    // Sloka (mis. Sanskerta untuk Hindu): teks latin miring di atas arti
    var sl = D.ayat.sloka ? el("p", "sloka", D.ayat.sloka) : null;
    add(ay, ar, sl, el("p", "ayat-arti", "“" + D.ayat.arti + "”"), el("cite", "", D.ayat.sumber));
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
      var f = el("div", "person-photo" + (K2 ? " bingkai bingkai-" + (GF.profil || "lengkung") + (GF.profilMuncul ? " muncul-" + GF.profilMuncul : "") : ""));
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
  if (K2) {
    // Tombol pengingat: berkas kalender .ics dengan alarm sehari sebelumnya
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//FB Digital//Undangan//ID", "BEGIN:VEVENT",
      "UID:" + (D.id || "undangan") + "@fbdigital", "DTSTAMP:" + gcal(new Date().toISOString()),
      "DTSTART:" + gcal(utama.mulai), "DTEND:" + gcal(utama.selesai || new Date(new Date(utama.mulai).getTime() + 2 * 36e5).toISOString()),
      "SUMMARY:Pernikahan " + namaPendek, "LOCATION:" + utama.tempat + ", " + utama.alamat,
      "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", "DESCRIPTION:Besok pernikahan " + namaPendek, "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var ingat = el("a", "btn btn-ghost reveal", teks("ingatkan", "Ingatkan Saya"));
    ingat.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
    ingat.download = "pernikahan-" + (D.id || "undangan") + ".ics";
    add(cd, add(el("div", "tombol-baris"), cal, ingat));
  } else {
    cd.appendChild(cal);
  }
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
  var agendaHidup = [];
  var ac = section("acara", "Rangkaian Acara");
  if (D.teksAcara) ac.appendChild(el("p", "sec-desc reveal", D.teksAcara));
  D.acara.forEach(function (a) {
    var c = el("article", "card event reveal");
    var waktu = a.selesai ? jam(a.mulai) + " - " + jam(a.selesai) + " " + ZW : jam(a.mulai) + " " + ZW + " - selesai";
    var peta = el("a", "btn btn-primary btn-sm", "Lihat Lokasi");
    peta.href = linkPeta(a.peta || a.tempat + ", " + a.alamat);
    peta.target = "_blank";
    peta.rel = "noopener";
    add(c, el("h3", "event-name", a.nama), el("p", "event-date", tanggal(a.mulai)), el("p", "event-time", waktu),
      el("p", "event-place", a.tempat), el("p", "event-addr", a.alamat), peta);
    if (MK) {
      // Agenda hidup: penanda status di hari H, tombol rute dan kalender per acara
      peta.remove();
      var rute = el("a", "btn btn-primary btn-sm", teks("tombolRute", "Rute"));
      rute.href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(a.peta || a.tempat + ", " + a.alamat);
      rute.target = "_blank";
      rute.rel = "noopener";
      var kal = el("a", "btn btn-ghost btn-sm", teks("tombolKalender", "Kalender"));
      kal.href = linkKalender(a, a.nama + " " + namaPendek);
      kal.target = "_blank";
      kal.rel = "noopener";
      var status = el("p", "event-status");
      status.hidden = true;
      c.insertBefore(status, c.firstChild);
      add(c, add(el("div", "event-tombol"), rute, kal));
      agendaHidup.push({ el: c, status: status, a: a });
    }
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
  if (agendaHidup.length) {
    // Simulasi waktu untuk uji atau demo: ?sekarang=2027-12-04T16:30 (zona waktu acara)
    var OFFSET = { WIB: "+07:00", WITA: "+08:00", WIT: "+09:00" }[ZW];
    var simulasi = params.get("sekarang");
    var kini = function () {
      if (!simulasi) return Date.now();
      var t = Date.parse(simulasi.length <= 16 ? simulasi + ":00" + OFFSET : simulasi);
      return isNaN(t) ? Date.now() : t;
    };
    var perbaruiAgenda = function () {
      var n = kini(), berikut = null;
      agendaHidup.forEach(function (x) {
        var m = Date.parse(x.a.mulai), sl = x.a.selesai ? Date.parse(x.a.selesai) : m + 2 * 36e5;
        x.st = n >= sl ? "selesai" : n >= m ? "berlangsung" : "";
        if (!x.st && m - n < 864e5 && (!berikut || m < Date.parse(berikut.a.mulai))) berikut = x;
      });
      agendaHidup.forEach(function (x) {
        var st = x.st || (x === berikut ? "berikutnya" : "");
        x.el.classList.toggle("event-selesai", st === "selesai");
        x.el.classList.toggle("event-berlangsung", st === "berlangsung");
        x.status.hidden = !st;
        x.status.textContent = st === "berlangsung" ? teks("sedangBerlangsung", "Sedang berlangsung")
          : st === "berikutnya" ? teks("acaraBerikutnya", "Berikutnya") : st === "selesai" ? teks("acaraSelesai", "Selesai") : "";
      });
    };
    perbaruiAgenda();
    setInterval(perbaruiAgenda, 60000);
  }

  // ---------- Kisah (opsional) ----------
  if (D.kisah && D.kisah.length) {
    var ks = section("kisah", "Kisah Kami");
    var adaFoto = K2 && D.kisah.some(function (k) { return k.foto; });
    var tl = el("ol", "timeline" + (adaFoto ? " kisah-kartu" : ""));
    D.kisah.forEach(function (k) {
      add(tl, add(el("li", "reveal"), adaFoto && k.foto ? bingkaiFoto(k.foto, GF.kisah || "persegi", GF.kisahMuncul, k.judul, true) : null,
        el("p", "tl-date", k.waktu), el("h3", "tl-title", k.judul), el("p", "tl-text", k.teks)));
    });
    ks.appendChild(tl);
    app.appendChild(ks);
  }

  // ---------- Galeri (opsional) ----------
  if (D.galeri && D.galeri.length) {
    var gl = section("galeri", "Galeri");
    if (K2 && D.galeriKutipan) gl.appendChild(el("p", "galeri-kutipan reveal", D.galeriKutipan));
    var grid = el("div", "gallery" + (K2 ? " galeri-" + (GF.galeri || "kisi") : ""));
    D.galeri.forEach(function (src, i) {
      var b = el("button", "g-item reveal");
      b.type = "button";
      if (src && typeof src === "object") {
        b.classList.add("g-video");
        b.setAttribute("aria-label", "Video " + (i + 1));
        b.appendChild(videoKlip({ src: src.video, poster: src.poster, malas: true }, "g-klip"));
      } else {
        var img = el("img");
        img.src = src;
        img.alt = "Foto " + (i + 1);
        img.loading = "lazy";
        b.appendChild(img);
      }
      b.addEventListener("click", function () { if (MK) cerita(i, b); else lightbox(i, b); });
      grid.appendChild(b);
    });
    gl.appendChild(grid);
    if (K2 && (GF.galeri === "carousel" || GF.galeri === "film")) {
      // Titik penanda posisi carousel
      var titik = el("div", "carousel-titik");
      D.galeri.forEach(function (_, i) { var d = el("i"); if (!i) d.className = "aktif"; titik.appendChild(d); });
      gl.appendChild(titik);
      grid.addEventListener("scroll", function () {
        var w = grid.firstChild ? grid.firstChild.getBoundingClientRect().width + 12 : 1;
        var idx = Math.round(grid.scrollLeft / w);
        Array.prototype.forEach.call(titik.children, function (d, i) { d.className = i === idx ? "aktif" : ""; });
      }, { passive: true });
    }
    app.appendChild(gl);
  }
  // ---------- Koleksi: galeri gaya Story (layar penuh, ketuk kiri/kanan, tahan untuk jeda) ----------
  function cerita(start, opener) {
    var item = D.galeri, idx = 0, t0 = 0, dur = 5000, jedaMulai = 0, raf = 0, tahan = 0, tahanLama = false, y0 = null;
    var st = el("div", "cerita");
    st.setAttribute("role", "dialog");
    st.setAttribute("aria-modal", "true");
    st.setAttribute("aria-label", "Galeri");
    var garis = el("div", "cerita-garis");
    var batang = item.map(function () { var b = el("b"); garis.appendChild(add(el("i"), b)); return b; });
    var panggung = el("div", "cerita-panggung");
    var img = el("img");
    img.alt = "";
    var vid = el("video");
    vid.muted = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.setAttribute("playsinline", "");
    vid.hidden = true;
    vid.addEventListener("playing", function () { vid.hidden = false; });
    add(panggung, img, vid);
    var hitung = el("p", "cerita-hitung");
    function tbl(cls, label, isi) {
      var b = el("button", cls);
      b.type = "button";
      b.setAttribute("aria-label", label);
      if (isi) b.innerHTML = isi;
      return b;
    }
    var kiri = tbl("cerita-kiri", "Sebelumnya");
    var kanan = tbl("cerita-kanan", "Berikutnya");
    var tutup = tbl("cerita-tutup", "Tutup", '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>');
    add(st, panggung, garis, hitung, kiri, kanan, tutup);
    function putar() { var pv = vid.play(); if (pv && pv.catch) pv.catch(function () {}); }
    function tampil(n) {
      if (n >= item.length) { selesai(); return; }
      idx = Math.max(0, n);
      var it = item[idx];
      batang.forEach(function (b, i) { b.style.width = i < idx ? "100%" : "0%"; });
      vid.pause();
      vid.hidden = true;
      vid.removeAttribute("src");
      if (it && typeof it === "object") {
        img.src = it.poster;
        if (!HEMAT) { vid.src = it.video; putar(); }
        dur = 6000;
      } else {
        img.src = it;
        dur = 5000;
      }
      hitung.textContent = (idx + 1) + " / " + item.length;
      t0 = performance.now();
      jedaMulai = 0;
    }
    function frame(t) {
      if (!jedaMulai) {
        var p = Math.min(1, (t - t0) / dur);
        batang[idx].style.width = (p * 100).toFixed(1) + "%";
        if (p >= 1) tampil(idx + 1);
      }
      if (st.isConnected) raf = requestAnimationFrame(frame);
    }
    function jeda() { if (!jedaMulai) { jedaMulai = performance.now(); vid.pause(); } }
    function lanjut() {
      if (!jedaMulai) return;
      t0 += performance.now() - jedaMulai;
      jedaMulai = 0;
      if (vid.getAttribute("src")) putar();
    }
    [kiri, kanan].forEach(function (b, i) {
      b.addEventListener("pointerdown", function () { tahanLama = false; tahan = setTimeout(function () { tahanLama = true; jeda(); }, 260); });
      ["pointerup", "pointercancel", "pointerleave"].forEach(function (ev) { b.addEventListener(ev, function () { clearTimeout(tahan); lanjut(); }); });
      b.addEventListener("click", function () {
        if (tahanLama) { tahanLama = false; return; }
        tampil(idx + (i ? 1 : -1));
      });
    });
    function selesai() {
      cancelAnimationFrame(raf);
      vid.pause();
      document.removeEventListener("keydown", kunci);
      st.remove();
      document.body.classList.remove("ada-cerita");
      if (opener) opener.focus();
    }
    function kunci(e) {
      if (e.key === "Escape") selesai();
      else if (e.key === "ArrowRight") tampil(idx + 1);
      else if (e.key === "ArrowLeft") tampil(idx - 1);
    }
    st.addEventListener("touchstart", function (e) { y0 = e.touches[0].clientY; }, { passive: true });
    st.addEventListener("touchend", function (e) {
      if (y0 !== null && e.changedTouches[0].clientY - y0 > 90) selesai();
      y0 = null;
    });
    tutup.addEventListener("click", selesai);
    document.addEventListener("keydown", kunci);
    document.body.appendChild(st);
    document.body.classList.add("ada-cerita");
    tampil(start);
    raf = requestAnimationFrame(frame);
    tutup.focus();
  }

  function lightbox(start, opener) {
    var fotos = D.galeri, idx = start;
    var lb = el("div", "lightbox");
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Galeri foto");
    var img = el("img");
    img.alt = "";
    var lbVid = el("video", "lb-video");
    lbVid.muted = true;
    lbVid.loop = true;
    lbVid.playsInline = true;
    lbVid.setAttribute("playsinline", "");
    lbVid.hidden = true;
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
      var it = fotos[idx];
      if (it && typeof it === "object") {
        img.src = it.poster;
        if (!HEMAT) {
          lbVid.poster = it.poster;
          lbVid.src = it.video;
          lbVid.hidden = false;
          img.hidden = true;
          var pv = lbVid.play();
          if (pv && pv.catch) pv.catch(function () {});
        }
      } else {
        lbVid.pause();
        lbVid.removeAttribute("src");
        lbVid.hidden = true;
        img.hidden = false;
        img.src = it;
      }
      info.textContent = (idx + 1) + " / " + fotos.length;
    }
    function selesai() {
      lbVid.pause();
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
    add(lb, img, lbVid, info, prev, next, tutup);
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
    '<label>Jumlah tamu' + (kursi ? " (maks. " + kursi + ")" : "") + '<select name="jumlah">' +
    Array.from({ length: kursi || 4 }, function (_, i) { return "<option>" + (i + 1) + "</option>"; }).join("") + '</select></label>' +
    '<label>Ucapan & doa<textarea name="ucapan" rows="3" maxlength="280" placeholder="' + teks("contohUcapan", ISLAM ? "Barakallahu lakuma..." : "Selamat berbahagia...") + '"></textarea></label>' +
    '<button class="btn btn-primary" type="submit">Kirim</button><p class="form-note" role="status"></p>';
  var list = el("ul", "wishes");
  // Batas konfirmasi (opsional): D.batasKonfirmasi = "2027-11-20"
  function teksBatas() { return teks("batasKonfirmasi", "Mohon konfirmasi sebelum") + " " + tanggal(D.batasKonfirmasi + "T12:00:00+07:00"); }
  add(rv, D.batasKonfirmasi ? el("p", "batas-rsvp reveal", teksBatas()) : null, form, list);
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

  // ---------- Koleksi: konfirmasi bertahap + kartu masuk ber-QR ----------
  // Formulir asli tetap dipakai sebagai penyimpan data (diisi lalu dikirim lewat requestSubmit).
  if (MK) {
    form.hidden = true;
    var lk = el("div", "rsvp-langkah reveal");
    lk.setAttribute("aria-live", "polite");
    rv.insertBefore(lk, form);
    var KK = KEY + "-kartu";
    var maksKursi = kursi || 4;
    var jawab = { nama: guest, hadir: "", jumlah: 1, ucapan: "" };
    var muatKartu = function () { try { return JSON.parse(localStorage.getItem(KK)); } catch (e) { return null; } };
    var simpanKartu = function (x) { try { localStorage.setItem(KK, JSON.stringify(x)); } catch (e) { /* mode privat */ } };
    var urutan = function () {
      var u = [];
      if (!guest) u.push("nama");
      u.push("hadir");
      // Sebelum memilih, hitung jalur "hadir" agar jumlah langkah tidak berubah di tengah jalan
      if (jawab.hadir !== "Berhalangan" && maksKursi > 1) u.push("kursi");
      u.push("ucapan");
      return u;
    };
    var pilihan = function (label, nilai, fn) {
      var b = el("button", "pilihan", label);
      b.type = "button";
      b.addEventListener("click", function () { fn(nilai); });
      return b;
    };
    var langkah = function (nama, fokus) {
      var u = urutan(), i = u.indexOf(nama), isi = [];
      var lanjutKe = function () { langkah(urutan()[urutan().indexOf(nama) + 1], true); };
      lk.innerHTML = "";
      if (nama === "nama") {
        var inp = el("input");
        inp.id = "rsvp-langkah-nama";
        inp.maxLength = 60;
        inp.autocomplete = "name";
        inp.value = jawab.nama || "";
        inp.setAttribute("aria-label", "Nama Anda");
        var lanjutBtn = el("button", "btn btn-primary", teks("tombolLanjut", "Lanjut"));
        lanjutBtn.type = "button";
        lanjutBtn.addEventListener("click", function () { var v = inp.value.trim(); if (!v) { inp.focus(); return; } jawab.nama = v; lanjutKe(); });
        isi = [el("h3", "langkah-tanya", teks("tanyaNama", "Siapa nama Anda?")), add(el("div", "langkah-isian"), inp), lanjutBtn];
      } else if (nama === "hadir") {
        isi = [el("h3", "langkah-tanya", teks("tanyaHadir", "Apakah Anda akan hadir?")), add(el("div", "pilihan-baris"),
          pilihan(teks("hadir", "Akan hadir"), "Hadir", function (v) { jawab.hadir = v; lanjutKe(); }),
          pilihan(teks("berhalangan", "Berhalangan"), "Berhalangan", function (v) { jawab.hadir = v; jawab.jumlah = 1; langkah("ucapan", true); }))];
      } else if (nama === "kursi") {
        var baris = el("div", "pilihan-baris");
        for (var k = 1; k <= maksKursi; k++) baris.appendChild(pilihan(k + " orang", k, function (v) { jawab.jumlah = v; langkah("ucapan", true); }));
        isi = [el("h3", "langkah-tanya", teks("tanyaKursi", "Berapa orang yang akan hadir?")),
          kursi ? el("p", "langkah-catatan", "Undangan ini berlaku untuk " + kursi + " orang.") : null, baris];
      } else {
        var ta = el("textarea");
        ta.id = "rsvp-langkah-ucapan";
        ta.rows = 3;
        ta.maxLength = 280;
        ta.placeholder = teks("contohUcapan", "Tulis ucapan singkat");
        ta.value = jawab.ucapan;
        ta.setAttribute("aria-label", "Ucapan");
        var kirimBtn = el("button", "btn btn-primary", teks("tombolKirim", "Kirim Konfirmasi"));
        kirimBtn.type = "button";
        kirimBtn.addEventListener("click", function () { jawab.ucapan = ta.value.trim(); kirimJawab(); });
        isi = [el("h3", "langkah-tanya", teks("tanyaUcapan", "Ucapan untuk kedua mempelai")), el("p", "langkah-catatan", "Opsional."),
          add(el("div", "langkah-isian"), ta), kirimBtn];
      }
      add(lk, el("p", "langkah-ke", "Langkah " + (i + 1) + " dari " + u.length));
      isi.forEach(function (x) { add(lk, x); });
      if (i > 0) {
        var kembali = el("button", "langkah-kembali", teks("tombolKembali", "Kembali"));
        kembali.type = "button";
        kembali.addEventListener("click", function () { langkah(u[i - 1], true); });
        lk.appendChild(kembali);
      }
      if (fokus) { var f = lk.querySelector("input, textarea, .pilihan"); if (f) f.focus({ preventScroll: true }); }
    };
    var kirimJawab = function () {
      form.nama.value = jawab.nama;
      form.hadir.value = jawab.hadir;
      form.jumlah.value = String(jawab.jumlah);
      form.ucapan.value = jawab.ucapan;
      if (form.requestSubmit) form.requestSubmit(); else form.dispatchEvent(new Event("submit", { cancelable: true }));
      var hasil = { nama: jawab.nama, hadir: jawab.hadir, jumlah: jawab.jumlah, no: noTamu };
      simpanKartu(hasil);
      tampilHasil(hasil);
    };
    var tampilHasil = function (h) {
      lk.innerHTML = "";
      var ubah = el("button", "langkah-kembali", teks("ubahJawaban", "Ubah jawaban"));
      ubah.type = "button";
      ubah.addEventListener("click", function () { jawab = { nama: h.nama, hadir: "", jumlah: 1, ucapan: "" }; langkah(urutan()[0], true); });
      if (h.hadir !== "Hadir") {
        add(lk, el("h3", "langkah-tanya", teks("terimaKasihJudul", "Terima kasih")),
          el("p", "langkah-catatan", teks("terimaBerhalangan", "Doa dan ucapan Anda sangat berarti bagi kami.")), ubah);
        return;
      }
      var no = nomorUndangan();
      var km = el("div", "kartu-masuk");
      add(km,
        add(el("div", "km-atas"), el("span", "", teks("kartuMasuk", "Kartu Masuk")), no ? el("span", "no-undangan", no) : null),
        D.monogram ? el("p", "monogram", D.monogram) : null,
        el("p", "km-nama", h.nama),
        el("p", "km-kursi", h.jumlah + " " + teks("labelKursi", "kursi")),
        el("div", "km-qr"),
        el("p", "km-acara", tanggal(acaraUtama.mulai) + " · " + jam(acaraUtama.mulai) + " " + ZW),
        el("p", "km-tempat", acaraUtama.tempat));
      var simpanBtn = el("button", "btn btn-primary", teks("simpanKartu", "Simpan Kartu"));
      simpanBtn.type = "button";
      add(lk, el("p", "langkah-ke", teks("kartuSiap", "Kartu masuk Anda")), km,
        el("p", "langkah-catatan", teks("catatanKartu", "Tunjukkan kartu ini di meja registrasi.")), simpanBtn, ubah);
      var isiQr = [D.judul || namaPendek, no, h.nama, h.jumlah + " kursi"].filter(Boolean).join(" | ");
      muatSkrip(BASE + "vendor/qrcode.js", function () {
        if (!window.qrcode) return;
        if (qrcode.stringToBytesFuncs && qrcode.stringToBytesFuncs["UTF-8"]) qrcode.stringToBytes = qrcode.stringToBytesFuncs["UTF-8"];
        var qr = qrcode(0, "M");
        qr.addData(isiQr);
        qr.make();
        km.querySelector(".km-qr").innerHTML = qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
        km.qr = qr;
      });
      simpanBtn.addEventListener("click", function () { simpanGambarKartu(km, h, no); });
    };
    // Gambar kartu masuk ke kanvas, lalu bagikan (HP) atau unduh sebagai PNG
    var simpanGambarKartu = function (km, h, no) {
      var gs = getComputedStyle(km);
      var W = 1080, H = 1500, c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      var x = c.getContext("2d");
      var fd = getComputedStyle(document.body).getPropertyValue("--font-display").trim() || "serif";
      var fb = getComputedStyle(document.body).getPropertyValue("--font-body").trim() || "sans-serif";
      var logam = gs.getPropertyValue("--logam").trim() || "#a8825f";
      x.fillStyle = gs.backgroundColor;
      x.fillRect(0, 0, W, H);
      x.strokeStyle = logam;
      x.lineWidth = 2;
      x.strokeRect(48, 48, W - 96, H - 96);
      x.fillStyle = gs.color;
      x.textBaseline = "middle";
      x.font = "500 26px " + fb;
      x.textAlign = "left";
      x.fillText(teks("kartuMasuk", "Kartu Masuk").toUpperCase(), 100, 120);
      if (no) { x.textAlign = "right"; x.fillStyle = logam; x.fillText(no, W - 100, 120); }
      x.textAlign = "center";
      x.strokeStyle = logam;
      x.beginPath();
      x.arc(W / 2, 290, 70, 0, Math.PI * 2);
      x.stroke();
      x.fillStyle = logam;
      x.font = "40px " + fd;
      x.fillText(D.monogram || "", W / 2, 292);
      x.fillStyle = gs.color;
      x.font = "64px " + fd;
      x.fillText(h.nama, W / 2, 470, W - 200);
      x.fillStyle = logam;
      x.font = "500 26px " + fb;
      x.fillText((h.jumlah + " " + teks("labelKursi", "kursi")).toUpperCase(), W / 2, 545);
      if (km.qr) {
        var n = km.qr.getModuleCount(), ukuran = 460, sel = ukuran / (n + 4), x0 = (W - ukuran) / 2, y0 = 610;
        x.fillStyle = "#f4f1ed";
        x.fillRect(x0, y0, ukuran, ukuran);
        x.fillStyle = "#1d1714";
        for (var r = 0; r < n; r++) for (var q = 0; q < n; q++) if (km.qr.isDark(r, q)) x.fillRect(x0 + (q + 2) * sel, y0 + (r + 2) * sel, Math.ceil(sel), Math.ceil(sel));
      }
      x.fillStyle = gs.color;
      x.font = "30px " + fb;
      x.fillText(tanggal(acaraUtama.mulai) + " · " + jam(acaraUtama.mulai) + " " + ZW, W / 2, 1160);
      x.fillText(acaraUtama.tempat, W / 2, 1210, W - 200);
      x.font = "40px " + fd;
      x.fillText(namaPendek, W / 2, 1330);
      c.toBlob(function (blob) {
        if (!blob) return;
        var namaBerkas = "kartu-masuk-" + (D.id || "undangan") + ".png";
        var berkas = typeof File === "function" ? new File([blob], namaBerkas, { type: "image/png" }) : null;
        if (berkas && navigator.canShare && navigator.canShare({ files: [berkas] })) {
          navigator.share({ files: [berkas], title: teks("kartuMasuk", "Kartu Masuk") }).catch(function () {});
        } else {
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = namaBerkas;
          document.body.appendChild(a);
          a.click();
          setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
        }
      }, "image/png");
    };
    var lama = muatKartu();
    if (lama && (!guest || lama.nama === guest)) tampilHasil(lama);
    else langkah(urutan()[0]);
  }

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
    if (MK) {
      // Diskret: rekening dan alamat tersembunyi di balik tombol
      var det = el("details", "hadiah-detail reveal");
      det.appendChild(el("summary", "btn btn-ghost", teks("tombolHadiah", "Lihat Rekening & Alamat")));
      Array.prototype.slice.call(hd.querySelectorAll(".gift, .kado")).forEach(function (x) { x.classList.remove("reveal"); det.appendChild(x); });
      hd.appendChild(det);
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
      namaPasangan(),
      MK && D.monogram ? el("p", "monogram", D.monogram) : null,
      MK && nomorUndangan() ? el("p", "no-undangan", nomorUndangan()) : null));
  app.appendChild(pn);

  if (K2) {
    // Konfirmasi kehadiran: jumlah tamu yang sudah konfirmasi + daftar turut mengundang
    var kf = section("konfirmasi", "Konfirmasi Kehadiran", "RSVP");
    var jumlah = el("p", "konfirmasi-jumlah reveal");
    var keForm = el("a", "btn btn-primary reveal", teks("tombolRsvp", "Konfirmasi Kehadiran"));
    keForm.href = "#rsvp";
    add(kf, jumlah, D.batasKonfirmasi ? el("p", "batas-rsvp reveal", teksBatas()) : null, keForm);
    if (D.turutMengundang && D.turutMengundang.length) {
      var tu = el("div", "turut reveal");
      tu.appendChild(el("p", "turut-judul", teks("turutMengundang", "Turut Mengundang")));
      var ul = el("ul", "turut-daftar");
      D.turutMengundang.forEach(function (n) { ul.appendChild(el("li", "", n)); });
      tu.appendChild(ul);
      kf.appendChild(tu);
    }
    app.appendChild(kf);
    var perbaruiJumlah = function () {
      var n = (+D.jumlahKonfirmasi || 0) + muat().filter(function (u) { return u.hadir === "Hadir"; }).length;
      jumlah.innerHTML = "<b>" + n.toLocaleString("id-ID") + "</b> " + teks("teksJumlah", "tamu sudah mengonfirmasi kehadiran");
    };
    perbaruiJumlah();
    form.addEventListener("submit", function () { setTimeout(perbaruiJumlah, 0); });

    if (D.streaming && D.streaming.link) {
      var st = section("streaming", "Siaran Langsung", "Live streaming");
      var stb = el("a", "btn btn-primary reveal", D.streaming.label || "Tonton Siaran");
      stb.href = D.streaming.link;
      stb.target = "_blank";
      stb.rel = "noopener";
      add(st, el("p", "sec-desc reveal", D.streaming.teks || "Bagi yang berhalangan hadir, ikuti momen bahagia kami secara langsung melalui tautan berikut."), stb);
      app.appendChild(st);
    }

    // Selingan sinematik (opsional): D.video.selingan = [{ src, poster, kutipan }]
    if (D.video && D.video.selingan) {
      D.video.selingan.forEach(function (v, i) {
        var sl = section("selingan" + (i + 1));
        sl.classList.add("sec-selingan");
        add(sl, videoKlip({ src: v.src, poster: v.poster, malas: true }, "letterbox reveal"), v.kutipan ? el("p", "selingan-kutipan reveal", v.kutipan) : null);
        app.appendChild(sl);
      });
    }
    // Dress code (opsional): D.dressCode = { judul, teks, warna: [{ nama, hex }] }
    if (D.dressCode) {
      var dc = section("dresscode", "Dress Code", "Busana");
      add(dc, el("p", "dress-judul reveal", D.dressCode.judul), D.dressCode.teks ? el("p", "sec-desc reveal", D.dressCode.teks) : null);
      if (D.dressCode.warna && D.dressCode.warna.length) {
        var sw = el("ul", "dress-warna reveal");
        D.dressCode.warna.forEach(function (w) {
          var li = el("li"), bulat = el("i");
          bulat.style.background = w.hex;
          add(li, bulat, el("span", "", w.nama));
          sw.appendChild(li);
        });
        dc.appendChild(sw);
      }
      app.appendChild(dc);
    }
    // Info tamu (opsional): D.infoTamu = [{ judul, teks }]
    if (D.infoTamu && D.infoTamu.length) {
      var itm = section("infotamu", "Info Tamu", "Untuk kenyamanan Anda");
      var dl = el("dl", "info-tamu reveal");
      D.infoTamu.forEach(function (x) { add(dl, el("dt", "", x.judul), el("dd", "", x.teks)); });
      itm.appendChild(dl);
      app.appendChild(itm);
    }

    // Urutan baku kerangka (koleksi Modern Klasik punya urutan sendiri)
    (MK ? ["hero", "salam", "pembuka", "mempelai", "kisah", "selingan1", "countdown", "acara", "dresscode", "infotamu", "galeri", "selingan2", "konfirmasi", "rsvp", "hadiah", "streaming", "penutup"]
      : ["hero", "salam", "pembuka", "mempelai", "kisah", "galeri", "countdown", "acara", "konfirmasi", "streaming", "hadiah", "rsvp", "penutup"])
      .forEach(function (id) { var x = document.getElementById(id); if (x && x.parentNode === app) app.appendChild(x); });
  }

  var foot = el("footer", "credit");
  var a = el("a", "", "FB Digital");
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

  // ---------- Video berposter: muat saat mendekati layar, jeda di luar layar ----------
  if (klipVideo.length && "IntersectionObserver" in window) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          if (!v.getAttribute("src")) v.src = v.dataset.src;
          var pv = v.play();
          if (pv && pv.catch) pv.catch(function () {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { rootMargin: "200px 0px" });
    klipVideo.forEach(function (v) { vo.observe(v); });
  }

  // ---------- Koleksi: kilau foil di kartu akses + hero sinematik mengikuti gulir ----------
  if (MK && !KURANGI) {
    var akar = document.documentElement;
    var kilau = function (x) { akar.style.setProperty("--kilau", Math.max(0, Math.min(100, x)).toFixed(1) + "%"); };
    // Kilau mengikuti sentuhan atau kursor di cover, dan kemiringan HP (Android; iOS cukup sentuhan)
    cover.addEventListener("pointermove", function (e) { kilau((e.clientX / window.innerWidth) * 100); });
    window.addEventListener("deviceorientation", function (e) { if (e.gamma != null && !cover.hidden) kilau(50 + e.gamma * 1.5); });
    var wadahHero = hero.querySelector(".bingkai-wadah");
    if (wadahHero) {
      var antreHero = false;
      var gulirHero = function () {
        antreHero = false;
        var r = hero.getBoundingClientRect();
        wadahHero.style.setProperty("--hero-p", Math.max(0, Math.min(1, -r.top / (r.height * 0.7))).toFixed(3));
      };
      window.addEventListener("scroll", function () { if (!antreHero) { antreHero = true; requestAnimationFrame(gulirHero); } }, { passive: true });
    }
  }

  // ---------- Kerangka v2: menu melayang + parallax lapisan ----------
  if (K2) {
    var IKON = {
      mempelai: '<path d="M12 20s-7-4.4-7-9.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5C19 15.6 12 20 12 20z"/>',
      galeri: '<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m5 17 5-5 4 4 2-2 3 3"/>',
      countdown: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9h16M9 3v4M15 3v4"/>',
      acara: '<path d="M12 21s-6-5.6-6-10.5a6 6 0 1 1 12 0C18 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.2"/>',
      rsvp: '<path d="M4 6h16v10H8l-4 4z"/>',
    };
    var MENU = [["mempelai", "Mempelai"], [document.getElementById("galeri") ? "galeri" : "kisah", "Galeri"], ["countdown", "Tanggal"], ["acara", "Lokasi"], ["rsvp", "Ucapan"]]
      .filter(function (m) { return document.getElementById(m[0]); });
    if (D.menu !== false && MENU.length) {
      var nav = el("nav", "menu-bawah");
      nav.setAttribute("aria-label", "Navigasi undangan");
      var tombolMenu = {};
      MENU.forEach(function (m) {
        var b = el("button", "menu-item");
        b.type = "button";
        b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (IKON[m[0]] || IKON.galeri) + "</svg><span>" + m[1] + "</span>";
        b.addEventListener("click", function () { document.getElementById(m[0]).scrollIntoView({ behavior: "smooth", block: "start" }); });
        tombolMenu[m[0]] = b;
        nav.appendChild(b);
      });
      document.body.appendChild(nav);
      document.body.classList.add("ada-menu");
      if ("IntersectionObserver" in window) {
        var aktif = function (id) { Object.keys(tombolMenu).forEach(function (k) { tombolMenu[k].classList.toggle("aktif", k === id); }); };
        var mo2 = new IntersectionObserver(function (en) {
          en.forEach(function (e) { if (e.isIntersecting) aktif(e.target.id); });
        }, { rootMargin: "-45% 0px -50% 0px" });
        MENU.forEach(function (m) { mo2.observe(document.getElementById(m[0])); });
      }
    }

    // Parallax: setiap bagian mendapat --geser (-1..1) sesuai posisinya di layar; CSS menggeser lapis & foto
    if (!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      var bagian = Array.prototype.slice.call(document.querySelectorAll("#app > .sec"));
      var jadwal = false;
      var geser = function () {
        jadwal = false;
        var h = innerHeight;
        bagian.forEach(function (b) {
          var r = b.getBoundingClientRect();
          if (r.bottom < -100 || r.top > h + 100) return;
          b.style.setProperty("--geser", (((r.top + r.height / 2) - h / 2) / h).toFixed(3));
        });
      };
      addEventListener("scroll", function () { if (!jadwal) { jadwal = true; requestAnimationFrame(geser); } }, { passive: true });
      addEventListener("resize", geser);
      geser();
    }
  }
})();
