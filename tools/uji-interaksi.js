// Uji interaksi koleksi Modern Klasik (docs/koleksi-modern-klasik.md bagian 15).
// Pakai: node uji-interaksi.js <kodeTema> [folderKeluaran]   (server lokal: cd site && python3 -m http.server 8765)
const puppeteer = require("puppeteer-core");
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const [kode, out = "."] = process.argv.slice(2);
const DASAR = `http://localhost:8765/tema/${kode}/?to=Bapak%20Ahmad&no=48&kursi=2`;
const HP = { viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: false }, userAgent: "Mozilla/5.0 (Linux; Android 11) Mobile" };
const hasil = [];
const cek = (nama, lulus, info = "") => hasil.push(`${lulus ? "LULUS" : "GAGAL"}  ${nama}${info ? "  (" + info + ")" : ""}`);

(async () => {
  const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--autoplay-policy=no-user-gesture-required"] });
  const p = await b.newPage();
  const err = [];
  p.on("pageerror", (e) => err.push(e.message));
  await p.emulate(HP);
  await p.goto(DASAR, { waitUntil: "networkidle0" });
  await p.evaluate(() => { localStorage.clear(); document.fonts.ready; });
  await p.reload({ waitUntil: "networkidle0" });
  await wait(1200);

  // 2. Kilau foil: tampilkan sorotan di tengah lalu potret cover
  await p.evaluate(() => document.documentElement.style.setProperty("--kilau", "50%"));
  await wait(200);
  await p.screenshot({ path: `${out}/${kode}-i-cover.png` });
  await p.evaluate(() => document.documentElement.style.removeProperty("--kilau"));

  // 1. Segel: ketuk singkat tidak membuka (muncul pengingat), tahan 1,3 detik membuka
  const s = await p.$(".segel");
  const k = await s.boundingBox();
  const cx = k.x + k.width / 2, cy = k.y + k.height / 2;
  await p.mouse.move(cx, cy);
  await p.mouse.down(); await wait(120); await p.mouse.up();
  await wait(150);
  const ketuk = await p.evaluate(() => ({ terbuka: document.body.classList.contains("terbuka"), ingat: document.querySelector(".segel-petunjuk").classList.contains("ingat") }));
  cek("Segel: ketuk singkat tidak membuka dan memberi pengingat", !ketuk.terbuka && ketuk.ingat);
  await wait(800);
  await p.mouse.down(); await wait(1300); await p.mouse.up();
  await wait(400);
  cek("Segel: tahan 1,3 detik membuka undangan", await p.evaluate(() => document.body.classList.contains("terbuka")));
  await wait(2600);
  await p.screenshot({ path: `${out}/${kode}-i-hero.png` });

  // 3. Hero mengikuti gulir
  await p.evaluate(() => window.scrollTo(0, 320));
  await wait(400);
  const hp = await p.evaluate(() => getComputedStyle(document.querySelector(".sec-hero .bingkai-wadah")).getPropertyValue("--hero-p"));
  cek("Hero: video membesar/meredup mengikuti gulir", parseFloat(hp) > 0, "--hero-p " + hp);

  // 4. Galeri Story
  await p.evaluate(() => document.getElementById("galeri").scrollIntoView());
  await wait(800);
  await p.evaluate(() => document.querySelector(".g-item").click());
  await wait(500);
  const c1 = await p.evaluate(() => document.querySelector(".cerita-hitung") && document.querySelector(".cerita-hitung").textContent);
  await p.evaluate(() => document.querySelector(".cerita-kanan").click());
  await wait(300);
  const c2 = await p.evaluate(() => document.querySelector(".cerita-hitung").textContent);
  await p.screenshot({ path: `${out}/${kode}-i-cerita.png` });
  await wait(5400);
  const c3 = await p.evaluate(() => document.querySelector(".cerita-hitung").textContent);
  cek("Story: terbuka, ketuk kanan maju, maju otomatis", c1 && c1.startsWith("1 /") && c2.startsWith("2 /") && c3.startsWith("3 /"), [c1, c2, c3].join(" → "));
  await p.keyboard.press("Escape");
  await wait(300);
  cek("Story: Escape menutup", await p.evaluate(() => !document.querySelector(".cerita")));

  // 5. Konfirmasi bertahap sampai kartu masuk
  await p.evaluate(() => document.getElementById("rsvp").scrollIntoView());
  await wait(900);
  const l1 = await p.evaluate(() => document.querySelector(".langkah-ke").textContent);
  const klikTeks = (t) => p.evaluate((t) => [...document.querySelectorAll(".rsvp-langkah button")].find((x) => x.textContent.trim().toLowerCase() === t.toLowerCase()).click(), t);
  await klikTeks("Akan hadir"); await wait(200);
  const l2 = await p.evaluate(() => [...document.querySelectorAll(".pilihan")].map((x) => x.textContent).join(", "));
  await klikTeks("2 orang"); await wait(200);
  await p.type("#rsvp-langkah-ucapan", "Selamat berbahagia, Alya dan Raka.");
  await p.evaluate(() => [...document.querySelectorAll(".rsvp-langkah .btn")].pop().click());
  await wait(1500);
  const km = await p.evaluate(() => ({ kartu: !!document.querySelector(".kartu-masuk"), qr: !!document.querySelector(".km-qr svg"), nama: (document.querySelector(".km-nama") || {}).textContent, ucapan: [...document.querySelectorAll(".wish b")].map((x) => x.textContent).includes("Bapak Ahmad") }));
  cek("Konfirmasi: alur bertahap (hadir → kursi → ucapan)", l1.includes("dari 3") && l2 === "1 orang, 2 orang", l1 + " | " + l2);
  cek("Konfirmasi: kartu masuk ber-QR muncul dan ucapan tercatat", km.kartu && km.qr && km.nama === "Bapak Ahmad" && km.ucapan);
  await p.evaluate(() => document.querySelector(".kartu-masuk").scrollIntoView({ block: "center" }));
  await wait(300);
  await p.screenshot({ path: `${out}/${kode}-i-kartu.png` });
  await p.evaluate(() => [...document.querySelectorAll(".rsvp-langkah .btn")].find((x) => x.textContent.includes("Simpan")).click());
  await wait(800);
  await p.reload({ waitUntil: "networkidle0" });
  await wait(600);
  cek("Konfirmasi: kartu masuk tetap ada setelah dibuka ulang", await p.evaluate(() => !!document.querySelector(".kartu-masuk")));

  // 6. Agenda hidup (simulasi hari H pukul 16.30)
  await p.goto(DASAR + "&sekarang=2027-12-04T16:30", { waitUntil: "networkidle0" });
  const ag = await p.evaluate(() => [...document.querySelectorAll(".event")].map((e) => (e.querySelector(".event-name").textContent + ": " + (e.querySelector(".event-status").hidden ? "-" : e.querySelector(".event-status").textContent))));
  cek("Agenda: status hari H", ag[0].endsWith("Sedang berlangsung") && ag[1].endsWith("Berikutnya"), ag.join(" | "));
  await p.evaluate(() => { document.querySelector(".btn-open").click(); });
  await wait(1200);
  await p.evaluate(() => { document.querySelectorAll(".reveal").forEach((r) => r.classList.add("in")); document.getElementById("acara").scrollIntoView(); });
  await wait(700);
  await p.screenshot({ path: `${out}/${kode}-i-agenda.png` });

  cek("Tanpa error JavaScript", err.length === 0, err.join("; "));
  console.log(hasil.join("\n"));
  await b.close();
})();
