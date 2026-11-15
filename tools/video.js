// Olah klip video untuk undangan (koleksi Modern Klasik, docs/koleksi-modern-klasik.md bagian 7).
// Memotong durasi, memotong bingkai ke rasio tertentu, membuang suara, mengompres H.264 ke target ukuran,
// lalu membuat poster tajam dari frame pertama hasil akhir (≤ 150 KB).
// Pakai: node video.js jobs.json
// Job: { src, out, poster, mulai: 0, durasi: 8, rasio: "4:5" | "9:16" | "2.39:1" | "16:9",
//        lebar: 720, fokusX: 0.5, fokusY: 0.5, fps: 24, targetMB: 1.8, saturasi: 1, hitamPutih: false, nada: "hangat" }
const { execFileSync } = require("child_process");
const fs = require("fs");
const ffmpeg = require("ffmpeg-static");

const jobs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const genap = (n) => Math.round(n / 2) * 2;

for (const j of jobs) {
  const [a, b] = (j.rasio || "4:5").split(":").map(Number);
  const R = a / b;
  const W = genap(j.lebar || 720), H = genap(W / R);
  const fx = j.fokusX ?? 0.5, fy = j.fokusY ?? 0.5;
  const durasi = j.durasi || 8, fps = j.fps || 24;
  // Nada warna: "hangat" = monokrom hangat (selaras palet gelap-hangat), hitamPutih, atau saturasi biasa
  const warna = j.nada === "hangat"
    ? "hue=s=0,colorbalance=rs=0.05:gs=0.01:bs=-0.05:rm=0.07:gm=0.02:bm=-0.07:rh=0.03:bh=-0.03,eq=contrast=1.05"
    : j.hitamPutih ? "hue=s=0" : `eq=saturation=${j.saturasi ?? 1}`;
  const vf = [
    `crop='min(iw,ih*${R})':'min(ih,iw/${R})':'(iw-ow)*${fx}':'(ih-oh)*${fy}'`,
    `scale=${W}:${H}:flags=lanczos`, `fps=${fps}`, warna, "format=yuv420p",
  ].join(",");
  // Bitrate dari target ukuran (95% untuk sisa wadah MP4)
  const kbps = Math.floor(((j.targetMB || 1.8) * 8 * 1024 * 0.95) / durasi);
  const args = ["-y", "-ss", String(j.mulai || 0), "-t", String(durasi), "-i", j.src, "-an", "-vf", vf,
    "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-b:v", kbps + "k", "-maxrate", Math.floor(kbps * 1.5) + "k",
    "-bufsize", kbps * 2 + "k", "-movflags", "+faststart", j.out];
  execFileSync(ffmpeg, args, { stdio: "ignore" });
  const mb = fs.statSync(j.out).size / 1048576;
  // Poster: frame pertama hasil akhir, turunkan mutu sampai ≤ 150 KB
  if (j.poster) {
    for (const q of [2, 3, 4, 5, 6, 8]) {
      execFileSync(ffmpeg, ["-y", "-i", j.out, "-frames:v", "1", "-q:v", String(q), j.poster], { stdio: "ignore" });
      if (fs.statSync(j.poster).size <= 150 * 1024) break;
    }
  }
  const kb = j.poster ? Math.round(fs.statSync(j.poster).size / 1024) + " KB" : "-";
  console.log(`${j.out.split("/").slice(-2).join("/")}  ${W}x${H}  ${durasi}s  ${mb.toFixed(2)} MB  poster ${kb}${mb > 2.5 ? "  (MELEBIHI 2,5 MB)" : ""}`);
}
