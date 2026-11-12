// Cat air prosedural untuk undangan "Taman Cat Air".
// Teknik: poligon yang dideformasi berulang lalu ditumpuk puluhan lapis transparan
// (mengikuti metode simulasi cat air Tyler Hobbs). Hasilnya tepi pigmen yang menyebar,
// bagian tumpuk yang lebih pekat, dan butiran pigmen seperti di kertas sungguhan.

let benihAcak = 20271212;
export function benih(s) { benihAcak = s >>> 0; }
function acak() {
  // mulberry32: acak berbenih agar lukisan sama setiap kali dibuka
  benihAcak = (benihAcak + 0x6d2b79f5) | 0;
  let t = Math.imul(benihAcak ^ (benihAcak >>> 15), 1 | benihAcak);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
function gauss() {
  let u = 0, v = 0;
  while (!u) u = acak();
  while (!v) v = acak();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
const antara = (a, b) => a + acak() * (b - a);
const pilih = (arr) => arr[Math.floor(acak() * arr.length)];

function rgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgba(hex, a) { const [r, g, b] = rgb(hex); return `rgba(${r},${g},${b},${a})`; }
function geser(hex, k) {
  // variasi kecil warna agar tiap kelopak tidak seragam
  return "#" + rgb(hex).map((c) => Math.max(0, Math.min(255, Math.round(c * (1 + (acak() - 0.5) * k))))).map((c) => c.toString(16).padStart(2, "0")).join("");
}
function gelap(hex, f) { return "#" + rgb(hex).map((c) => Math.round(c * f).toString(16).padStart(2, "0")).join(""); }

export function kanvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  // Kanvas di memori CPU: butiran() membaca piksel, dan membaca dari kanvas GPU membuat GPU tertahan
  c.getContext("2d", { willReadFrequently: true });
  return c;
}

function poligon(cx, cy, rx, ry, n, rot = 0, goyah = [0.5, 1.3]) {
  const p = [];
  const c = Math.cos(rot), s = Math.sin(rot);
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const x = Math.cos(a) * rx * antara(0.9, 1.1), y = Math.sin(a) * ry * antara(0.9, 1.1);
    p.push({ x: cx + x * c - y * s, y: cy + x * s + y * c, v: antara(goyah[0], goyah[1]) });
  }
  return p;
}
function deformasi(titik, dalam, k = 0.3) {
  let pts = titik;
  for (let d = 0; d < dalam; d++) {
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      out.push(a);
      const len = Math.hypot(b.x - a.x, b.y - a.y);
      const v = ((a.v + b.v) / 2) * antara(0.85, 1.15);
      out.push({ x: (a.x + b.x) / 2 + gauss() * len * k * v, y: (a.y + b.y) / 2 + gauss() * len * k * v, v });
    }
    pts = out;
  }
  return pts;
}
function jalur(ctx, pts) {
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.closePath();
}

// Satu noda cat air: bentuk dasar dideformasi, lalu ditumpuk berlapis-lapis dengan alfa rendah.
export function noda(ctx, dasar, warna, { lapis = 30, alfa = 0.04, dalam = 3, tepi = true, k = 0.3 } = {}) {
  const bentuk = deformasi(dasar, 2, k);
  for (let l = 0; l < lapis; l++) {
    const p = deformasi(bentuk, dalam, k);
    jalur(ctx, p);
    ctx.fillStyle = rgba(warna, alfa);
    ctx.fill();
    // Pigmen menumpuk di tepi saat mengering: garis tepi tipis sesekali
    if (tepi && l % 4 === 0) {
      ctx.strokeStyle = rgba(gelap(warna, 0.85), alfa * 1.4);
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }
  }
}

function titik(ctx, x, y, r, warna, a) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = rgba(warna, a);
  ctx.fill();
}

// Butiran pigmen dan serat kertas: alfa dikalikan derau halus + gumpalan besar
export function butiran(c, kuat = 0.35) {
  const ctx = c.getContext("2d");
  const img = ctx.getImageData(0, 0, c.width, c.height);
  const d = img.data;
  const w = c.width;
  for (let i = 0; i < d.length; i += 4) {
    if (!d[i + 3]) continue;
    const p = i / 4, x = p % w, y = (p / w) | 0;
    const gumpal = Math.sin(x * 0.045 + Math.sin(y * 0.03) * 2) * Math.sin(y * 0.05 + Math.sin(x * 0.02) * 2);
    const n = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
    d[i + 3] = Math.max(0, Math.min(255, d[i + 3] * (1 - kuat + kuat * (0.55 + 0.3 * Math.abs(n) + 0.25 * gumpal))));
  }
  ctx.putImageData(img, 0, 0);
}

export function percikan(ctx, cx, cy, sebar, warna, jumlah = 18) {
  for (let i = 0; i < jumlah; i++) {
    const a = acak() * Math.PI * 2, d = Math.abs(gauss()) * sebar;
    titik(ctx, cx + Math.cos(a) * d, cy + Math.sin(a) * d, antara(0.6, 3.2), warna, antara(0.15, 0.45));
  }
}

// Serpih daun emas: poligon tak beraturan bergradasi emas
export function emas(ctx, cx, cy, r) {
  const p = deformasi(poligon(cx, cy, r, r * antara(0.5, 0.9), 6, acak() * 3), 2, 0.25);
  jalur(ctx, p);
  const g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  g.addColorStop(0, "#a8792a");
  g.addColorStop(0.45, "#f6d98f");
  g.addColorStop(0.6, "#fff3cf");
  g.addColorStop(1, "#b88a35");
  ctx.fillStyle = g;
  ctx.globalAlpha = antara(0.75, 0.95);
  ctx.fill();
  ctx.globalAlpha = 1;
}

// ---------- Bunga & daun ----------
export const PALET = {
  mawar: { luar: "#f1b7b9", tengah: "#e48e98", dalam: "#b9566a", pusat: "#c9953f" },
  peach: { luar: "#f7cdb0", tengah: "#eea787", dalam: "#cf6f5a", pusat: "#b98a3a" },
  lavender: { luar: "#d6c6ea", tengah: "#b7a0d8", dalam: "#7d64a9", pusat: "#c9a44a" },
  putih: { luar: "#f4ece4", tengah: "#e9d9cf", dalam: "#c9a99c", pusat: "#c9a44a" },
  daun: ["#8ea98a", "#6f8f72", "#a9bea0", "#5f7d66", "#9fb5a6"],
};

export function bunga(ctx, cx, cy, R, w) {
  const n = Math.round(antara(5, 7)), rot0 = acak() * Math.PI * 2;
  for (let i = 0; i < n; i++) {
    const a = rot0 + (i / n) * Math.PI * 2 + antara(-0.2, 0.2), d = R * 0.42;
    noda(ctx, poligon(cx + Math.cos(a) * d, cy + Math.sin(a) * d, R * 0.4, R * 0.31, 9, a), geser(w.luar, 0.08), { lapis: 24, alfa: 0.05 });
  }
  for (let i = 0; i < 5; i++) {
    const a = rot0 + 0.6 + (i / 5) * Math.PI * 2, d = R * 0.22;
    noda(ctx, poligon(cx + Math.cos(a) * d, cy + Math.sin(a) * d, R * 0.25, R * 0.2, 8, a), geser(w.tengah, 0.08), { lapis: 22, alfa: 0.055 });
  }
  noda(ctx, poligon(cx, cy, R * 0.13, R * 0.13, 8), w.dalam, { lapis: 20, alfa: 0.07 });
  for (let i = 0; i < 16; i++) {
    const a = acak() * Math.PI * 2, d = antara(0.03, 0.16) * R;
    titik(ctx, cx + Math.cos(a) * d, cy + Math.sin(a) * d, antara(0.8, 2.2) * (R / 70), w.pusat, antara(0.5, 0.9));
  }
}

export function kuncup(ctx, cx, cy, R, w, ang) {
  noda(ctx, poligon(cx, cy, R * 0.55, R * 0.35, 8, ang), w.tengah, { lapis: 18, alfa: 0.06 });
  noda(ctx, poligon(cx - Math.cos(ang) * R * 0.15, cy - Math.sin(ang) * R * 0.15, R * 0.3, R * 0.22, 7, ang), w.dalam, { lapis: 12, alfa: 0.06 });
}

export function daun(ctx, x, y, len, ang, warna) {
  const lebar = len * antara(0.22, 0.32), N = 12, pts = [];
  for (let i = 0; i <= N; i++) { const t = i / N; pts.push([t * len, -Math.pow(Math.sin(Math.PI * t), 0.85) * lebar / 2 * (1 - t * 0.25)]); }
  for (let i = N - 1; i > 0; i--) { const t = i / N; pts.push([t * len, Math.pow(Math.sin(Math.PI * t), 0.85) * lebar / 2 * (1 - t * 0.25)]); }
  const c = Math.cos(ang), s = Math.sin(ang);
  const dasar = pts.map(([px, py]) => ({ x: x + px * c - py * s, y: y + px * s + py * c, v: antara(0.25, 0.7) }));
  noda(ctx, dasar, geser(warna, 0.1), { lapis: 20, alfa: 0.055, dalam: 2, k: 0.22 });
  ctx.strokeStyle = rgba(gelap(warna, 0.6), 0.22);
  ctx.lineWidth = Math.max(1, len / 80);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + c * len * 0.5 - s * len * 0.04, y + s * len * 0.5 + c * len * 0.04, x + c * len * 0.9, y + s * len * 0.9);
  ctx.stroke();
}

// Daun bulat eucalyptus
export function eukaliptus(ctx, x, y, r, warna) {
  noda(ctx, poligon(x, y, r, r * 0.9, 9), geser(warna, 0.1), { lapis: 16, alfa: 0.06, dalam: 2, k: 0.22 });
}

function tangkai(ctx, titikTitik, warna, tebal) {
  for (let l = 0; l < 6; l++) {
    ctx.beginPath();
    titikTitik.forEach(([x, y], i) => {
      const jx = x + gauss() * 1.2, jy = y + gauss() * 1.2;
      i ? ctx.lineTo(jx, jy) : ctx.moveTo(jx, jy);
    });
    ctx.strokeStyle = rgba(warna, 0.16);
    ctx.lineWidth = tebal * antara(0.7, 1.2);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }
}

// Rangkaian bunga di atas kanvas persegi: tangkai melengkung, daun, 1-3 bunga, kuncup, emas, percikan
export function rangkaian(ukuran, { palet = "mawar", bunga: nBunga = 2, s = 1, emasN = 6 } = {}) {
  const c = kanvas(ukuran, ukuran), ctx = c.getContext("2d"), u = ukuran;
  const w = PALET[palet];
  // tangkai utama dari kiri bawah ke kanan atas (kurva)
  const P = [];
  for (let i = 0; i <= 24; i++) { const t = i / 24; P.push([u * (0.1 + 0.75 * t), u * (0.88 - 0.7 * t + Math.sin(t * Math.PI) * -0.08)]); }
  tangkai(ctx, P, "#6b7f5e", u / 160);
  // cabang kedua yang lebih pendek
  const Q = [];
  for (let i = 0; i <= 14; i++) { const t = i / 14; Q.push([u * (0.3 + 0.55 * t), u * (0.66 - 0.18 * t + Math.sin(t * Math.PI) * 0.1)]); }
  tangkai(ctx, Q, "#6b7f5e", u / 220);
  // daun rimbun di sepanjang kedua tangkai
  for (let i = 1; i < 23; i++) {
    const [x, y] = P[i], sisi = i % 2 ? 1 : -1;
    const arah = Math.atan2(P[i + 1][1] - y, P[i + 1][0] - x) + sisi * antara(0.5, 1.1);
    daun(ctx, x, y, u * antara(0.1, 0.17) * s, arah, pilih(PALET.daun));
  }
  for (let i = 1; i < 13; i += 2) {
    const [x, y] = Q[i], sisi = i % 4 === 1 ? 1 : -1;
    daun(ctx, x, y, u * antara(0.08, 0.13) * s, Math.atan2(Q[i + 1][1] - y, Q[i + 1][0] - x) + sisi * antara(0.6, 1), pilih(PALET.daun));
  }
  for (let i = 0; i < 9; i++) {
    const [x, y] = P[Math.floor(antara(3, 21))];
    eukaliptus(ctx, x + antara(-u * 0.09, u * 0.09), y + antara(-u * 0.09, u * 0.09), u * antara(0.025, 0.042), pilih(PALET.daun));
  }
  // bunga
  const posisi = [[0.6, 0.37], [0.38, 0.56], [0.8, 0.5], [0.78, 0.2]];
  for (let i = 0; i < nBunga; i++) {
    const [px, py] = posisi[i];
    bunga(ctx, u * px, u * py, u * (i ? 0.15 : 0.21) * s, i === 1 && palet !== "putih" ? PALET.putih : w);
  }
  kuncup(ctx, u * 0.86, u * 0.12, u * 0.06, w, -0.7);
  kuncup(ctx, u * 0.25, u * 0.7, u * 0.05, w, 2.4);
  for (let i = 0; i < emasN; i++) emas(ctx, u * antara(0.2, 0.85), u * antara(0.15, 0.8), u * antara(0.008, 0.02));
  percikan(ctx, u * 0.55, u * 0.45, u * 0.25, w.tengah, 14);
  butiran(c, 0.3);
  return c;
}

// Sapuan cat air lebar untuk latar kartu, 2-3 warna saling meresap
export function sapuan(w, h, warna) {
  const c = kanvas(w, h), ctx = c.getContext("2d");
  warna.forEach((col, i) => {
    const cx = w * antara(0.32, 0.68), cy = h * (0.22 + 0.56 * (i / Math.max(1, warna.length - 1))) + antara(-h * 0.06, h * 0.06);
    noda(ctx, poligon(cx, cy, w * antara(0.26, 0.34), h * antara(0.16, 0.22), 10), col, { lapis: 34, alfa: 0.03, dalam: 3, k: 0.34 });
  });
  percikan(ctx, w * 0.8, h * 0.2, w * 0.15, warna[0], 12);
  for (let i = 0; i < 4; i++) emas(ctx, w * antara(0.1, 0.9), h * antara(0.05, 0.95), w * antara(0.006, 0.014));
  butiran(c, 0.35);
  return c;
}

// Topeng tepi kertas sobek (putih dengan tepi tidak rata) untuk kartu
export function tepiKertas(w, h) {
  const c = kanvas(w, h), ctx = c.getContext("2d"), m = Math.min(w, h) * 0.025;
  const pts = [];
  const tambah = (x, y) => pts.push({ x, y, v: antara(0.2, 0.6) });
  const N = 18;
  for (let i = 0; i < N; i++) tambah(m + ((w - 2 * m) * i) / N, m);
  for (let i = 0; i < N; i++) tambah(w - m, m + ((h - 2 * m) * i) / N);
  for (let i = 0; i < N; i++) tambah(w - m - ((w - 2 * m) * i) / N, h - m);
  for (let i = 0; i < N; i++) tambah(m, h - m - ((h - 2 * m) * i) / N);
  for (let l = 0; l < 7; l++) {
    jalur(ctx, deformasi(pts, 3, 0.12));
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fill();
  }
  ctx.fillStyle = "#fff";
  ctx.fillRect(m * 2.2, m * 2.2, w - m * 4.4, h - m * 4.4);
  return c;
}

// Karangan (lingkaran daun) untuk inisial mempelai
export function karangan(u, palet = "mawar") {
  const c = kanvas(u, u), ctx = c.getContext("2d"), r = u * 0.36, w = PALET[palet];
  for (let i = 0; i < 34; i++) {
    const a = (i / 34) * Math.PI * 2 + antara(-0.05, 0.05);
    const x = u / 2 + Math.cos(a) * r, y = u / 2 + Math.sin(a) * r;
    daun(ctx, x, y, u * antara(0.09, 0.13), a + Math.PI / 2 + antara(-0.5, 0.5), pilih(PALET.daun));
  }
  for (let i = 0; i < 12; i++) {
    const a = acak() * Math.PI * 2;
    eukaliptus(ctx, u / 2 + Math.cos(a) * r * antara(0.92, 1.1), u / 2 + Math.sin(a) * r * antara(0.92, 1.1), u * 0.022, pilih(PALET.daun));
  }
  bunga(ctx, u * 0.24, u * 0.76, u * 0.12, w);
  bunga(ctx, u * 0.34, u * 0.84, u * 0.08, PALET.putih);
  bunga(ctx, u * 0.78, u * 0.22, u * 0.09, PALET.putih);
  kuncup(ctx, u * 0.33, u * 0.86, u * 0.04, w, 2.6);
  for (let i = 0; i < 5; i++) emas(ctx, u * antara(0.15, 0.85), u * antara(0.15, 0.85), u * 0.012);
  butiran(c, 0.25);
  return c;
}

// Kelopak tunggal untuk partikel 3D
export function kelopak(u, warna) {
  const c = kanvas(u, u), ctx = c.getContext("2d");
  noda(ctx, poligon(u / 2, u / 2, u * 0.32, u * 0.2, 9, 0.3), warna, { lapis: 22, alfa: 0.08, dalam: 2, k: 0.2 });
  return c;
}

// Tetes cat untuk interaksi ketuk layar
export function tetes(u, warna) {
  const c = kanvas(u, u), ctx = c.getContext("2d");
  noda(ctx, poligon(u / 2, u / 2, u * 0.3, u * 0.3, 10), warna, { lapis: 30, alfa: 0.05, k: 0.34 });
  percikan(ctx, u / 2, u / 2, u * 0.3, warna, 10);
  butiran(c, 0.35);
  return c;
}

// Bentuk serpih (putih) untuk alpha map emas metalik
export function serpih(u) {
  const c = kanvas(u, u), ctx = c.getContext("2d");
  jalur(ctx, deformasi(poligon(u / 2, u / 2, u * 0.4, u * 0.28, 6, acak()), 2, 0.25));
  ctx.fillStyle = "#fff";
  ctx.fill();
  return c;
}

export function tunggu() { return new Promise((r) => setTimeout(r, 0)); }
