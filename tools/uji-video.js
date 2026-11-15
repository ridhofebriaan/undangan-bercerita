// Uji video berposter (docs/koleksi-modern-klasik.md bagian 7 dan 12).
// Pakai: node uji-video.js <kodeTema> [folderKeluaran]   (server lokal: cd site && python3 -m http.server 8765)
// Skenario: normal (video berputar, bobot), kurangi gerak + hemat data (hanya poster), jaringan lambat 3G (poster tajam sejak awal).
const puppeteer = require("puppeteer-core");
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const [kode, out = "."] = process.argv.slice(2);
const URL = `http://localhost:8765/tema/${kode}/?to=Bapak%20Ahmad&no=48&kursi=2`;
const HP = { viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, userAgent: "Mozilla/5.0 (Linux; Android 11) Mobile" };

async function halaman(b, opsi = {}) {
  const p = await b.newPage();
  const err = [];
  let byteAwal = 0, byteTotal = 0, terbuka = false;
  p.on("pageerror", (e) => err.push(e.message));
  p.on("response", async (r) => {
    if (r.status() >= 400) err.push(r.status() + " " + r.url());
    const n = +(r.headers()["content-length"] || 0);
    byteTotal += n;
    if (!terbuka) byteAwal += n;
  });
  await p.emulate(HP);
  if (opsi.kurangiGerak) await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  if (opsi.hematData) await p.evaluateOnNewDocument(() => Object.defineProperty(navigator, "connection", { value: { saveData: true } }));
  if (opsi.lambat) {
    const c = await p.createCDPSession();
    await c.send("Network.emulateNetworkConditions", { offline: false, latency: 300, downloadThroughput: (750 * 1024) / 8, uploadThroughput: (250 * 1024) / 8 });
  }
  return { p, err, bobot: () => ({ awal: byteAwal, total: byteTotal }), tandaiBuka: () => { terbuka = true; } };
}

(async () => {
  const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new", args: ["--autoplay-policy=no-user-gesture-required"] });

  // 1. Normal
  {
    const h = await halaman(b);
    await h.p.goto(URL, { waitUntil: "networkidle0" });
    const awal = h.bobot().awal;
    h.tandaiBuka();
    await h.p.tap(".btn-open");
    await wait(3500);
    const hero = await h.p.evaluate(() => { const k = document.querySelector(".sec-hero .klip"); return k ? { siap: k.classList.contains("siap"), adaVideo: !!k.querySelector("video") } : null; });
    // Gulir ke bawah perlahan agar semua video sempat dimuat
    const tinggi = await h.p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < tinggi; y += 600) { await h.p.evaluate((y) => window.scrollTo(0, y), y); await wait(350); }
    await wait(1500);
    const v = await h.p.evaluate(() => [...document.querySelectorAll(".klip")].map((k) => ({ siap: k.classList.contains("siap"), poster: k.querySelector(".klip-poster").complete })));
    const t = h.bobot().total;
    console.log(`NORMAL   hero ${hero && hero.siap ? "berputar" : "BELUM berputar"} | klip ${v.filter((x) => x.siap).length}/${v.length} berputar | poster termuat ${v.filter((x) => x.poster).length}/${v.length}`);
    console.log(`         bobot awal (sebelum dibuka) ${(awal / 1048576).toFixed(2)} MB | total setelah digulir ${(t / 1048576).toFixed(2)} MB | ${h.err.length ? h.err.join("; ") : "tanpa error"}`);
    await h.p.close();
  }

  // 2. Kurangi gerak + hemat data: tidak boleh ada video
  for (const [nama, opsi] of [["KURANGI GERAK", { kurangiGerak: true }], ["HEMAT DATA", { hematData: true }]]) {
    const h = await halaman(b, opsi);
    await h.p.goto(URL, { waitUntil: "networkidle0" });
    await h.p.tap(".btn-open");
    await wait(2500);
    const r = await h.p.evaluate(() => ({ video: document.querySelectorAll(".klip video").length, poster: [...document.querySelectorAll(".klip-poster")].filter((i) => i.complete || i.loading === "lazy").length, klip: document.querySelectorAll(".klip").length }));
    console.log(`${nama.padEnd(13)} video dimuat ${r.video} (harus 0) | poster ${r.poster}/${r.klip} | ${h.err.length ? h.err.join("; ") : "tanpa error"}`);
    await h.p.close();
  }

  // 3. Jaringan lambat: yang terlihat di hero harus poster tajam, bukan kosong/hitam/blur
  {
    const h = await halaman(b, { lambat: true });
    await h.p.goto(URL, { waitUntil: "domcontentloaded" });
    await wait(1500);
    await h.p.tap(".btn-open");
    await wait(1500);
    const r = await h.p.evaluate(() => { const i = document.querySelector(".sec-hero .klip-poster"); return i ? { muat: i.complete && i.naturalWidth > 0, lebar: i.naturalWidth, filter: getComputedStyle(i).filter } : null; });
    await h.p.screenshot({ path: `${out}/${kode}-3g-hero.png` });
    console.log(`3G       poster hero ${r && r.muat ? "tampil tajam (" + r.lebar + " px)" : "BELUM tampil"} | filter: ${r ? r.filter : "-"} | tangkapan: ${out}/${kode}-3g-hero.png`);
    await h.p.close();
  }
  await b.close();
})();
