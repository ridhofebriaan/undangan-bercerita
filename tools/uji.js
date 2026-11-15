// Uji template: tangkap beberapa frame per template lalu gabung jadi satu lembar.
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const [out, ...kodes] = process.argv.slice(2);
(async () => {
  const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: "new" });
  for (const kode of kodes) {
    const p = await b.newPage();
    const errs = [];
    p.on("pageerror", (e) => errs.push("pageerror " + e.message));
    p.on("console", (m) => m.type() === "error" && errs.push("console " + m.text().slice(0, 120)));
    p.on("response", (r) => r.status() >= 400 && errs.push(r.status() + " " + r.url().slice(0, 100)));
    await p.emulate({ viewport: { width: 360, height: 740, deviceScaleFactor: 1, isMobile: true, hasTouch: true }, userAgent: "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36" });
    await p.goto(`http://localhost:8765/tema/${kode}/?to=Bapak%20Ahmad`, { waitUntil: "networkidle0" });
    await p.evaluate(() => document.fonts.ready);
    await wait(2600);
    const shots = [];
    const snap = async (label) => { shots.push({ label, data: (await p.screenshot({ encoding: "base64" })) }); };
    await snap("cover");
    const ms = await p.evaluate(() => parseInt(getComputedStyle(document.getElementById("cover")).getPropertyValue("--buka-ms"), 10) || 900);
    await p.tap(".btn-open");
    await wait(Math.round(ms * 0.55));
    await snap("membuka");
    await wait(ms + 1800);
    await snap("hero");
    for (const id of (process.env.BAGIAN || "salam,mempelai,countdown,acara,rsvp,hadiah,penutup").split(",")) {
      const ok = await p.evaluate((id) => { const e = document.getElementById(id); if (!e) return false; e.scrollIntoView(); return true; }, id);
      if (!ok) continue;
      await wait(1500);
      await snap(id);
    }
    const info = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, h: document.body.scrollHeight, small: [...document.querySelectorAll("button, a.btn")].filter((e) => e.offsetParent && e.getBoundingClientRect().height < 44).length }));
    const html = `<body style="margin:0;background:#888;display:flex;gap:6px;font:bold 14px sans-serif">` + shots.map((s) => `<figure style="margin:0"><figcaption style="background:#000;color:#ff0;padding:2px 4px">${s.label}</figcaption><img src="data:image/png;base64,${s.data}" width="360"></figure>`).join("") + `</body>`;
    const q = await b.newPage();
    await q.setViewport({ width: shots.length * 366, height: 770 });
    await q.setContent(html);
    await q.screenshot({ path: `${out}/${kode}.png` });
    await q.close();
    console.log(kode, "| sw", info.sw, "| tinggi", info.h, "| tombol<44:", info.small, "|", errs.length ? errs.join(" ; ") : "tanpa error");
    await p.close();
  }
  await b.close();
})();
