// Ubah lukisan/plat lama (domain publik) menjadi ilustrasi "toile" satu warna dengan latar transparan.
// Tinta = seberapa gelap piksel dibanding kertas (berdasarkan persentil kecerahan), lalu diwarnai satu warna.
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const jobs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
(async () => {
  const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", args: ["--allow-file-access-from-files"] });
  const p = await b.newPage();
  await p.goto("about:blank");
  for (const j of jobs) {
    const src = "data:image/jpeg;base64," + fs.readFileSync(j.src).toString("base64");
    const png = await p.evaluate(async (j, src) => {
      const img = new Image(); img.src = src; await img.decode();
      const [cx, cy, cw, ch] = j.crop || [0, 0, 1, 1];
      const sx = cx * img.width, sy = cy * img.height, sw = cw * img.width, sh = ch * img.height;
      const skala = Math.min(1, (j.lebar || 1600) / sw);
      const w = Math.round(sw * skala), h = Math.round(sh * skala);
      const c = document.createElement("canvas"); c.width = w; c.height = h;
      const x = c.getContext("2d", { willReadFrequently: true });
      x.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      const d = x.getImageData(0, 0, w, h), a = d.data;
      const lum = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) lum[i] = 0.299 * a[i * 4] + 0.587 * a[i * 4 + 1] + 0.114 * a[i * 4 + 2];
      const urut = Float32Array.from(lum).sort();
      const tinta = urut[Math.floor(urut.length * (j.pTinta ?? 0.03))], kertas = urut[Math.floor(urut.length * (j.pKertas ?? 0.92))];
      const [r, g, bb] = [1, 3, 5].map((k) => parseInt(j.warna.slice(k, k + 2), 16));
      const gam = j.gamma ?? 1.1, maks = j.alfa ?? 1;
      for (let i = 0; i < w * h; i++) {
        let t = (kertas - lum[i]) / Math.max(1, kertas - tinta);
        t = Math.max(0, Math.min(1, t));
        const amb = j.ambang ?? 0.06;
        t = Math.max(0, (t - amb) / (1 - amb));
        t = Math.pow(t, gam);
        // Tepi lembut ke dalam gambar bila diminta (agar menyatu dengan latar)
        let pudar = 1;
        if (j.pudarTepi) {
          const px = i % w, py = (i / w) | 0, e = j.pudarTepi;
          const dx = Math.min(px, w - 1 - px) / (w * e), dy = Math.min(py, h - 1 - py) / (h * e);
          pudar = Math.min(1, dx, dy);
          pudar = pudar * pudar * (3 - 2 * pudar);
        }
        a[i * 4] = r; a[i * 4 + 1] = g; a[i * 4 + 2] = bb;
        a[i * 4 + 3] = Math.round(255 * t * maks * pudar);
      }
      x.putImageData(d, 0, 0);
      return c.toDataURL("image/webp", j.mutu ?? 0.82).split(",")[1];
    }, j, src);
    fs.writeFileSync(j.out, Buffer.from(png, "base64"));
    console.log(j.out, Math.round(fs.statSync(j.out).size / 1024) + "KB");
  }
  await b.close();
})();
