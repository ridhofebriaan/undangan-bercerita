// Generator template undangan per adat.
// Pakai: node tools/buat-tema.js jawa   (atau tanpa argumen untuk semua adat di tools/tema/)
// Menulis site/tema/<kode>/{index.html,data.js,tema.css} dan site/data/katalog-<adat>.js,
// lalu memeriksa: warna dasar unik (beda jelas secara visual) dan kontras teks (WCAG AA).

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = path.join(ROOT, "site");
const BASE_URL = "https://ridhofebriaan.github.io/rb-digital";

// ---------- Font ----------
const FONT = {
  "Cinzel": ["wght@400;500;600", "serif"],
  "EB Garamond": ["ital,wght@0,400;0,500;1,400", "serif"],
  "Marcellus": ["", "serif"],
  "Pinyon Script": ["", "cursive"],
  "Lora": ["ital,wght@0,400;0,500;1,400", "serif"],
  "Bodoni Moda": ["ital,wght@0,400;0,500;1,400;1,500", "serif"],
  "Outfit": ["wght@300;400;500", "sans-serif"],
  "Italiana": ["", "serif"],
  "Great Vibes": ["", "cursive"],
  "Jost": ["wght@400;500", "sans-serif"],
  "Cormorant Garamond": ["ital,wght@0,400;0,500;0,600;1,400;1,500", "serif"],
  "Parisienne": ["", "cursive"],
  "Nunito Sans": ["wght@400;600", "sans-serif"],
  "Playfair Display": ["ital,wght@0,400;0,600;1,400;1,500", "serif"],
  "Karla": ["wght@400;500", "sans-serif"],
  "Forum": ["", "serif"],
  "Allura": ["", "cursive"],
  "Figtree": ["wght@400;500;600", "sans-serif"],
  "Gilda Display": ["", "serif"],
  "Manrope": ["wght@400;500;600", "sans-serif"],
  "Monsieur La Doulaise": ["", "cursive"],
  "Raleway": ["wght@400;500", "sans-serif"],
  "DM Serif Display": ["ital@0;1", "serif"],
  "Work Sans": ["wght@400;500", "sans-serif"],
  "Yeseva One": ["", "serif"],
  "Prata": ["", "serif"],
  "DM Sans": ["wght@400;500;700", "sans-serif"],
  "Imperial Script": ["", "cursive"],
  "Tenor Sans": ["", "sans-serif"],
  "Rouge Script": ["", "cursive"],
  "Libre Caslon Display": ["", "serif"],
};
function fontLink(families) {
  const q = [...new Set(families)].map((f) => {
    const spec = FONT[f] ? FONT[f][0] : "";
    return "family=" + f.replace(/ /g, "+") + (spec ? ":" + spec : "");
  });
  return "https://fonts.googleapis.com/css2?" + q.join("&") + "&display=swap";
}
function fontStack(f) {
  if (!FONT[f]) throw new Error("Font belum terdaftar: " + f);
  return `"${f}", ${FONT[f][1]}`;
}

// ---------- Warna: kontras WCAG dan jarak warna (CIE Lab) ----------
function rgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}
function lum(hex) {
  return rgb(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)).reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
}
function kontras(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
function lab(hex) {
  const [r, g, b] = rgb(hex).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const X = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const Y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const Z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
}
function jarak(a, b) {
  const [p, q] = [lab(a), lab(b)];
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
}

// ---------- Penulis file ----------
function cssTema(t, adat) {
  const w = t.warna;
  const v = {
    "--bg": w.bg, "--bg-outer": w.bgOuter || w.gelap, "--surface": w.surface, "--primary": w.primary, "--primary-ink": w.primaryInk,
    "--accent": w.accent, "--accent-text": w.accentText, "--ink": w.ink, "--muted": w.muted, "--line": w.line,
    "--gelap": w.gelap, "--on-gelap": w.onGelap, "--accent-gelap": w.accentGelap,
    "--cover-bg": w.coverBg, "--cover-ink": w.coverInk, "--cover-nama": w.coverNama, "--cover-aksen": w.coverAksen,
    "--cover-muted": w.coverMuted, "--cover-tombol": w.coverTombol, "--cover-tombol-ink": w.coverTombolInk, "--cover-orn": w.coverOrn,
    "--pt1": w.pt1, "--pt2": w.pt2, "--pt3": w.pt3,
    "--font-display": fontStack(t.font.display), "--font-name": fontStack(t.font.nama), "--font-body": fontStack(t.font.body),
  };
  const isi = Object.entries(v).filter(([, x]) => x).map(([k, x]) => `  ${k}: ${x};`).join("\n");
  return `/* Tema ${t.nama} (adat ${adat.namaAdat}). Dibuat otomatis oleh tools/buat-tema.js; ubah di tools/tema/${adat.adat}.js. */\n:root {\n${isi}\n}\n${t.css ? t.css.split("} ").join("}\n") + "\n" : ""}`;
}

function dataUndangan(t, adat) {
  const B = adat.bawaan;
  const P = t.pasangan;
  const orang = (x, foto) => {
    const o = { panggilan: x[0], nama: x[1], ortu: x[2] };
    if (foto) o.foto = foto;
    return o;
  };
  const fs_ = t.fotoSet || {};
  const D = {
    id: "demo-" + t.kode,
    agama: B.agama,
    label: t.label || B.label,
    judul: `Undangan Pernikahan ${P.wanita[0]} & ${P.pria[0]}`,
    hashtag: t.hashtag,
    tampilan: { adat: adat.adat, ...t.tampilan },
  };
  if (fs_.foto) D.foto = fs_.foto;
  if (t.partikel) D.partikel = t.partikel;
  if (t.aksara) D.aksara = adat.AKSARA_SUGENG_RAWUH;
  D.pasangan = { urutan: P.urutan || "wanita-dulu", wanita: orang(P.wanita, fs_.fotoWanita), pria: orang(P.pria, fs_.fotoPria) };
  D.salam = { ...B.salam };
  if (t.salamTeks) D.salam.teks = t.salamTeks;
  D.ayat = adat.AYAT[t.ayat];
  if (t.pembuka) D.pembuka = adat.PEMBUKA_KRAMA;
  D.judulBagian = B.judulBagian;
  D.teks = B.teks;
  D.teksAcara = B.teksAcara;
  D.acara = adat.acara(t.tanggal, t.kota, t.acara);
  if (t.kisah) D.kisah = adat.KISAH;
  if (fs_.galeri) D.galeri = fs_.galeri;
  D.hadiah = [
    { bank: "Bank BCA", nomor: "8720" + String(t.kode.length * 7919).padStart(6, "0").slice(0, 6), nama: P.wanita[1].replace(/,.*$/, "") },
    { bank: "Bank Mandiri", nomor: "13700" + String(t.nama.length * 104729).padStart(8, "0").slice(0, 8), nama: P.pria[1].replace(/,.*$/, "") },
  ];
  D.alamatKado = `${D.acara[D.acara.length - 1].alamat} (a.n. ${P.wanita[0]})`;
  D.musik = B.musik;
  D.penutup = B.penutup;
  D.contohUcapan = B.contohUcapan;
  return D;
}

function htmlTema(t, adat, D) {
  const w = t.warna;
  const fam = [t.font.display, t.font.nama, t.font.body, "Amiri"];
  let link = fontLink(fam);
  if (t.aksara) link = link.replace("&display=swap", "&family=Noto+Sans+Javanese&display=swap");
  const tgl = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(new Date(D.acara.find((a) => a.utama).mulai));
  const icon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Crect width='20' height='20' rx='5' fill='${encodeURIComponent(w.coverBg)}'/%3E%3Ccircle cx='10' cy='10' r='5' fill='none' stroke='${encodeURIComponent(w.coverOrn || w.accent)}' stroke-width='1.6'/%3E%3C/svg%3E`;
  const pre = D.foto && D.foto.sampul ? `\n  <link rel="preload" as="image" href="${D.foto.sampul}">` : "";
  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="${w.coverBg}">
  <title>${D.judul}</title>
  <meta name="description" content="Pernikahan ${D.pasangan.wanita.panggilan} & ${D.pasangan.pria.panggilan}, ${tgl} di ${t.kota}. Tema ${t.nama} oleh RB Digital.">
  <!-- Preview link WhatsApp: og:image wajib alamat lengkap -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${D.judul}">
  <meta property="og:description" content="${tgl} · ${t.kota}">
  <meta property="og:image" content="${BASE_URL}/assets/katalog/${t.kode}.jpg">
  <link rel="icon" href="${icon}">${pre}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${link}" rel="stylesheet">
  <link rel="stylesheet" href="../../engine/undangan.css">
  <link rel="stylesheet" href="../../paket/dasar.css">
  <link rel="stylesheet" href="../../paket/buka.css">
  <link rel="stylesheet" href="../../paket/gerak.css">
  <link rel="stylesheet" href="../../paket/letak.css">
  <link rel="stylesheet" href="../../adat/${adat.adat}/adat.css">
  <link rel="stylesheet" href="tema.css">
</head>
<body>
  <main id="app"></main>
  <script src="data.js"></script>
  <script src="../../engine/undangan.js"></script>
</body>
</html>
`;
}

// ---------- Pemeriksaan ----------
function periksaKontras(t) {
  const w = t.warna;
  const pasangan = [
    ["ink/bg", w.ink, w.bg, 4.5], ["muted/bg", w.muted, w.bg, 4.5], ["accentText/bg", w.accentText, w.bg, 4.5],
    ["ink/surface", w.ink, w.surface, 4.5], ["muted/surface", w.muted, w.surface, 4.5], ["accentText/surface", w.accentText, w.surface, 4.5],
    ["primaryInk/primary", w.primaryInk, w.primary, 4.5], ["primary/bg (judul)", w.primary, w.bg, 3],
    ["onGelap/gelap", w.onGelap, w.gelap, 4.5], ["accentGelap/gelap", w.accentGelap, w.gelap, 4.5],
    ["coverInk/coverBg", w.coverInk || w.ink, w.coverBg, 4.5], ["coverMuted/coverBg", w.coverMuted || w.muted, w.coverBg, 4.5],
    ["coverAksen/coverBg", w.coverAksen || w.accentText, w.coverBg, 4.5], ["coverNama/coverBg", w.coverNama || w.primary, w.coverBg, 3],
    ["tombolInk/tombol", w.coverTombolInk || w.primaryInk, w.coverTombol || w.primary, 4.5],
  ];
  return pasangan.filter(([, a, b, min]) => kontras(a, b) < min).map(([n, a, b, min]) => `${n} ${kontras(a, b).toFixed(2)} < ${min}`);
}

function warnaDasarLama() {
  // Tema buatan tangan yang sudah ada, ikut dicek agar warna dasar tidak kembar
  const out = [];
  for (const k of ["syari", "elegant", "melayu"]) {
    const f = path.join(SITE, "tema", k, "tema.css");
    if (!fs.existsSync(f)) continue;
    const m = fs.readFileSync(f, "utf8").match(/--bg:\s*(#[0-9a-f]{6})/i);
    if (m) out.push({ kode: k, bg: m[1], lama: true });
  }
  out.push({ kode: "bercerita", bg: "#14532d", lama: true });
  return out;
}

// ---------- Utama ----------
const minta = process.argv.slice(2);
const daftarAdat = fs.readdirSync(path.join(__dirname, "tema")).filter((f) => f.endsWith(".js")).map((f) => f.replace(/\.js$/, ""));
const semua = daftarAdat.map((a) => require(path.join(__dirname, "tema", a + ".js")));
let gagal = 0;

// Warna dasar unik di semua adat
const bgs = [...warnaDasarLama(), ...semua.flatMap((A) => A.tema.map((t) => ({ kode: t.kode, bg: t.warna.bg })))];
for (let i = 0; i < bgs.length; i++) {
  for (let j = i + 1; j < bgs.length; j++) {
    if (bgs[i].lama && bgs[j].lama) continue;
    const d = jarak(bgs[i].bg, bgs[j].bg);
    if (d < 7) { console.log(`WARNA DASAR TERLALU MIRIP: ${bgs[i].kode} ${bgs[i].bg} vs ${bgs[j].kode} ${bgs[j].bg} (jarak ${d.toFixed(1)})`); gagal++; }
  }
}

for (const A of semua) {
  if (minta.length && !minta.includes(A.adat)) continue;
  const katalog = [];
  const kodeSet = new Set();
  for (const t of A.tema) {
    if (kodeSet.has(t.kode)) throw new Error("Kode ganda: " + t.kode);
    kodeSet.add(t.kode);
    const masalah = periksaKontras(t);
    if (masalah.length) { console.log(`KONTRAS ${t.kode}: ${masalah.join("; ")}`); gagal++; }
    const D = dataUndangan(t, A);
    const dir = path.join(SITE, "tema", t.kode);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), htmlTema(t, A, D));
    fs.writeFileSync(path.join(dir, "tema.css"), cssTema(t, A));
    fs.writeFileSync(path.join(dir, "data.js"),
      `// Data undangan tema ${t.nama} (adat ${A.namaAdat}). Dibuat otomatis oleh tools/buat-tema.js.\n` +
      `// Untuk klien: salin folder ini ke site/u/<nama-pasangan>/ lalu ubah isi file ini (tanggal ISO WIB +07:00).\n` +
      `window.UNDANGAN = ${JSON.stringify(D, null, 2)};\n`);
    katalog.push({ kode: t.kode, nama: t.nama, harga: t.harga, tag: t.tag, adat: A.namaAdat, deskripsi: t.deskripsi, demo: `tema/${t.kode}/?to=Bapak%20Ahmad`, gambar: `assets/katalog/${t.kode}.webp`, siap: true });
  }
  fs.mkdirSync(path.join(SITE, "data"), { recursive: true });
  fs.writeFileSync(path.join(SITE, "data", `katalog-${A.adat}.js`),
    `// Daftar tema adat ${A.namaAdat} untuk katalog. Dibuat otomatis oleh tools/buat-tema.js.\nwindow.KATALOG.tema = window.KATALOG.tema.concat(${JSON.stringify(katalog, null, 2)});\n`);
  console.log(`${A.namaAdat}: ${A.tema.length} tema ditulis.`);
}
if (gagal) { console.log(`\n${gagal} masalah ditemukan.`); process.exit(1); }
console.log("Semua pemeriksaan lolos.");
