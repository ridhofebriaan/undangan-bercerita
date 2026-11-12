// Taman Cat Air: undangan 3D interaktif.
// 1) Amplop kertas 3D dengan segel lilin emas (bisa dimiringkan jari / kemiringan HP), dibuka dengan animasi 3D.
// 2) Taman bunga cat air berlapis kedalaman; kamera menembus taman saat di-scroll, bunga "mekar" seperti cat menyebar.
// 3) Kelopak dan serpih emas metalik melayang; ketuk area kosong untuk meneteskan cat air.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import * as C from "./catair.js";

const D = window.UNDANGAN;
const body = document.body;
const kurangGerak = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ringan = (navigator.hardwareConcurrency || 4) <= 4;
const tamu = (new URLSearchParams(location.search).get("to") || "").trim().slice(0, 40) || "Bapak/Ibu/Saudara/i";
const DEBUG = new URLSearchParams(location.search).has("debug");
const catat = (m) => DEBUG && console.info("[3d] " + Math.round(performance.now()) + "ms " + m);
catat("modul dimuat");

// ---------- Tween sederhana ----------
const ease = {
  io: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  out: (t) => 1 - Math.pow(1 - t, 3),
  lin: (t) => t,
};
const tweens = [];
function tween(dur, delay, fn, e = ease.io) {
  return new Promise((res) => tweens.push({ t0: performance.now() + delay, dur, fn, e, res }));
}
function jalankanTween(now) {
  for (let i = tweens.length - 1; i >= 0; i--) {
    const tw = tweens[i];
    const p = (now - tw.t0) / tw.dur;
    if (p < 0) continue;
    const q = Math.min(1, p);
    tw.fn(tw.e(q));
    if (q >= 1) { tweens.splice(i, 1); tw.res(); }
  }
}
const lerp = (a, b, t) => a + (b - a) * t;
const jeda = (ms) => new Promise((r) => setTimeout(r, ms));
function keURL(c) { return new Promise((r) => c.toBlob((b) => r(URL.createObjectURL(b)), "image/png")); }
function muatGambar(src) { return new Promise((ok, gagal) => { const i = new Image(); i.onload = () => ok(i); i.onerror = gagal; i.src = src; }); }

// ---------- Kartu HTML: sapuan cat air, tepi kertas sobek, karangan inisial ----------
const WARNA_KARTU = [
  ["#f3c6c0", "#d9e3cf"], ["#e6dcf0", "#f6dcc8"], ["#d5e4d6", "#f3d1cf"], ["#f7dcc4", "#e3d6ee"],
  ["#cfe0e6", "#f1cfd3"], ["#efd9c6", "#d6e3cf"], ["#f3c6c0", "#efe0c4"], ["#dcd2ec", "#cfe3d7"],
];
async function lukisKartu() {
  C.benih(7);
  const tepi = await keURL(C.tepiKertas(420, 600));
  const tepi2 = await keURL(C.tepiKertas(420, 600));
  const sec = [...document.querySelectorAll("#app > .sec:not(.sec-hero)")];
  for (let i = 0; i < sec.length; i++) {
    const url = await keURL(C.sapuan(420, 600, WARNA_KARTU[i % WARNA_KARTU.length]));
    sec[i].style.setProperty("--sapuan", `url(${url})`);
    sec[i].style.setProperty("--tepi", `url(${i % 2 ? tepi2 : tepi})`);
    await C.tunggu();
  }
  const kr = [await keURL(C.karangan(360, "mawar")), await keURL(C.karangan(360, "peach"))];
  document.querySelectorAll(".person").forEach((p, i) => {
    p.style.setProperty("--karangan", `url(${kr[i % 2]})`);
    p.dataset.inisial = (p.querySelector(".person-name").textContent.trim()[0] || "").toUpperCase();
  });
  const penutup = document.querySelector(".orn-penutup");
  if (penutup) penutup.style.setProperty("--karangan", `url(${kr[0]})`);
  const titik = await keURL(C.tetes(160, "#f1b7b9"));
  document.querySelectorAll(".cd-item").forEach((x) => x.style.setProperty("--tetes", `url(${titik})`));
  // Kotak hitung mundur dibuat ulang tiap detik: simpan variabel di induknya
  const cd = document.querySelector(".countdown");
  if (cd) cd.style.setProperty("--tetes", `url(${titik})`);
  body.classList.add("kartu-siap");
  catat("kartu cat air siap");
}

// ---------- Kemiringan: jari, mouse, atau giroskop ----------
let tx = 0, ty = 0, ttx = 0, tty = 0;
addEventListener("pointermove", (e) => {
  if (e.pointerType === "mouse" || !terbuka) {
    ttx = (e.clientX / innerWidth) * 2 - 1;
    tty = (e.clientY / innerHeight) * 2 - 1;
  }
}, { passive: true });
let pakaiGiro = false;
function mintaGiro() {
  const pasang = () => addEventListener("deviceorientation", (e) => {
    if (e.gamma == null) return;
    pakaiGiro = true;
    ttx = Math.max(-1, Math.min(1, e.gamma / 28));
    tty = Math.max(-1, Math.min(1, (e.beta - 45) / 28));
  });
  if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
    DeviceOrientationEvent.requestPermission().then((s) => s === "granted" && pasang()).catch(() => {});
  } else pasang();
}
function terapkanMiring() {
  // Kartu-kartu kecil ikut miring (rotasi sumbu-sudut agar tidak bentrok dengan animasi muncul)
  const sudut = Math.hypot(tx, ty) * 7;
  const r = document.documentElement.style;
  r.setProperty("--sx", (ty * -1).toFixed(3));
  r.setProperty("--sy", tx.toFixed(3));
  r.setProperty("--sudut", sudut.toFixed(2) + "deg");
}

// ---------- Mulai ----------
let terbuka = false;
// Amplop digambar lebih dulu; kartu cat air dilukis setelahnya (baru terlihat setelah undangan dibuka)
if (kurangGerak) {
  body.classList.add("tanpa-3d");
  lukisKartu();
} else {
  mulai3D().catch((e) => { console.warn("3D tidak tersedia:", e); body.classList.add("tanpa-3d"); lukisKartu(); });
}

async function mulai3D() {
  const canvas = document.getElementById("taman");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, ringan ? 1.5 : 1.75));
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  catat("renderer siap");
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8);
  scene.add(new THREE.HemisphereLight(0xfff6ea, 0xe2cbb9, 1.15));
  const matahari = new THREE.DirectionalLight(0xffeed6, 1.45);
  matahari.position.set(-3, 4, 6);
  scene.add(matahari);

  const tekstur = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
  const tanTengah = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const setengahLebar = (z) => tanTengah * (camera.position.z - z) * camera.aspect;
  const setengahTinggi = (z) => tanTengah * (camera.position.z - z);

  // ---------- Aset dasar ----------
  const [kertas] = await Promise.all([
    muatGambar("kertas.jpg"),
    document.fonts.load('80px "Pinyon Script"'),
    document.fonts.load('500 40px "Cormorant Garamond"'),
    document.fonts.load('italic 40px "Cormorant Garamond"'),
    document.fonts.load('400 30px "Jost"'),
  ]);
  catat("kertas & font siap");
  C.benih(11);
  const rkUtama = C.rangkaian(640, { palet: "mawar", bunga: 3 });
  await C.tunggu();

  function alasKertas(w, h, warna) {
    const c = C.kanvas(w, h), x = c.getContext("2d");
    x.fillStyle = warna;
    x.fillRect(0, 0, w, h);
    x.globalCompositeOperation = "multiply";
    x.drawImage(kertas, 0, 0, w, (w * kertas.height) / kertas.width);
    if (h > (w * kertas.height) / kertas.width) x.drawImage(kertas, 0, (w * kertas.height) / kertas.width, w, (w * kertas.height) / kertas.width);
    x.globalCompositeOperation = "source-over";
    return c;
  }
  function emasGradasi(x, x0, x1) {
    const g = x.createLinearGradient(x0, 0, x1, 0);
    g.addColorStop(0, "#7a5318"); g.addColorStop(0.3, "#c9973c"); g.addColorStop(0.48, "#f6dc97"); g.addColorStop(0.62, "#b8862f"); g.addColorStop(1, "#6f4a14");
    return g;
  }

  // ---------- Amplop ----------
  const W = 3, H = 2, UJUNG = 0.62 * H;
  const P = D.pasangan;
  const [p1, p2] = P.urutan === "pria-dulu" ? [P.pria, P.wanita] : [P.wanita, P.pria];

  // Muka depan (kantong) dengan nama tamu tulisan tangan
  const cDepan = alasKertas(1200, 800, "#efe0d0");
  {
    const x = cDepan.getContext("2d");
    x.save(); x.translate(-40, 860); x.rotate(-0.42); x.globalAlpha = 0.95; x.drawImage(rkUtama, 0, -520, 520, 520); x.restore();
    x.save(); x.translate(1250, 760); x.rotate(Math.PI + 0.5); x.scale(1, -1); x.globalAlpha = 0.9; x.drawImage(rkUtama, 0, -360, 360, 360); x.restore();
    x.textAlign = "center";
    x.fillStyle = "#6d5e57";
    x.font = '500 28px "Jost"';
    x.fillText("K E P A D A   Y T H .", 600, 664);
    let ukuran = 86;
    x.font = ukuran + 'px "Pinyon Script"';
    while (x.measureText(tamu).width > 720 && ukuran > 46) { ukuran -= 4; x.font = ukuran + 'px "Pinyon Script"'; }
    x.fillStyle = "#5a3e1a";
    x.fillText(tamu, 600, 741);
    x.fillStyle = emasGradasi(x, 260, 940);
    x.fillText(tamu, 600, 738);
    x.fillStyle = "#6d5e57";
    x.font = 'italic 22px "Cormorant Garamond"';
    x.fillText("Mohon maaf bila ada kesalahan penulisan nama dan gelar", 600, 770);
    x.strokeStyle = emasGradasi(x, 0, 1200);
    x.lineWidth = 3;
    x.strokeRect(22, 22, 1156, 756);
  }
  // Tutup luar
  const cTutup = alasKertas(1200, 496, "#ecdccb");
  {
    const x = cTutup.getContext("2d");
    x.strokeStyle = emasGradasi(x, 0, 1200);
    x.lineWidth = 5;
    x.beginPath(); x.moveTo(30, 6); x.lineTo(600, 470); x.lineTo(1170, 6); x.stroke();
  }
  // Lapisan dalam bermotif bunga cat air
  const cLapis = alasKertas(1200, 800, "#f6e3dc");
  {
    const x = cLapis.getContext("2d");
    C.benih(23);
    for (let i = 0; i < 24; i++) {
      const bx = (i % 6) * 220 + (Math.floor(i / 6) % 2) * 110 + 40, by = Math.floor(i / 6) * 190 + 60;
      if (i % 3 === 0) C.bunga(x, bx, by, 46, i % 2 ? C.PALET.mawar : C.PALET.putih);
      else C.daun(x, bx, by, 70, i * 1.3, C.PALET.daun[i % 5]);
    }
    for (let i = 0; i < 30; i++) C.emas(x, Math.random() * 1200, Math.random() * 800, 6);
  }
  // Kartu undangan di dalam
  const cKartu = alasKertas(1380, 860, "#fffaf3");
  {
    const x = cKartu.getContext("2d");
    x.save(); x.translate(-30, 300); x.rotate(-0.9); x.drawImage(rkUtama, 0, 0, 380, 380); x.restore();
    x.save(); x.translate(1410, 560); x.rotate(Math.PI - 0.9); x.drawImage(rkUtama, 0, 0, 380, 380); x.restore();
    x.textAlign = "center";
    x.fillStyle = "#7a6b62";
    x.font = '400 26px "Jost"';
    x.fillText("T H E   W E D D I N G   O F", 690, 250);
    x.fillStyle = emasGradasi(x, 300, 1080);
    x.font = '128px "Pinyon Script"';
    x.fillText(p1.panggilan + " & " + p2.panggilan, 690, 440);
    x.fillStyle = "#5b4c45";
    x.font = 'italic 40px "Cormorant Garamond"';
    const utama = D.acara.find((a) => a.utama) || D.acara[0];
    x.fillText(new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }).format(new Date(utama.mulai)).replace(/^Minggu/, "Ahad"), 690, 540);
    x.strokeStyle = emasGradasi(x, 0, 1380);
    x.lineWidth = 3;
    x.strokeRect(26, 26, 1328, 808);
  }
  // Segel: monogram timbul
  const cSegel = C.kanvas(512, 512);
  {
    const x = cSegel.getContext("2d");
    x.fillStyle = "#cfcfcf"; x.fillRect(0, 0, 512, 512);
    x.strokeStyle = "#7a7a7a"; x.lineWidth = 10;
    x.beginPath(); x.arc(256, 256, 200, 0, Math.PI * 2); x.stroke();
    x.lineWidth = 3; x.beginPath(); x.arc(256, 256, 176, 0, Math.PI * 2); x.stroke();
    for (let i = 0; i < 36; i++) { const a = (i / 36) * Math.PI * 2; x.beginPath(); x.arc(256 + Math.cos(a) * 188, 256 + Math.sin(a) * 188, 4, 0, Math.PI * 2); x.fillStyle = "#7a7a7a"; x.fill(); }
    x.fillStyle = "#5e5e5e"; x.textAlign = "center"; x.textBaseline = "middle";
    x.font = '600 150px "Cormorant Garamond"';
    x.fillText((p1.panggilan[0] || "") + (p2.panggilan[0] || ""), 256, 262);
  }
  // Bayangan lembut di bawah amplop
  const cBayang = C.kanvas(256, 256);
  {
    const x = cBayang.getContext("2d"), g = x.createRadialGradient(128, 128, 10, 128, 128, 128);
    g.addColorStop(0, "rgba(70,45,30,0.55)"); g.addColorStop(1, "rgba(70,45,30,0)");
    x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  }

  function petaUV(geo, x0, y0, w, h) {
    const pos = geo.attributes.position, uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) - x0) / w, (pos.getY(i) - y0) / h);
    uv.needsUpdate = true;
  }
  const kertasBahan = (map, extra = {}) => new THREE.MeshStandardMaterial({ map, roughness: 0.92, metalness: 0, envMapIntensity: 0.35, ...extra });

  const amplop = new THREE.Group();
  scene.add(amplop);
  const bayang = new THREE.Mesh(new THREE.PlaneGeometry(W * 1.25, H * 1.35), new THREE.MeshBasicMaterial({ map: tekstur(cBayang), transparent: true, depthWrite: false, opacity: 0.5 }));
  bayang.position.set(0.18, -0.28, -0.35);
  amplop.add(bayang);
  const texLapis = tekstur(cLapis);
  const belakang = new THREE.Mesh(new THREE.PlaneGeometry(W, H), kertasBahan(texLapis));
  amplop.add(belakang);
  const kartu = new THREE.Mesh(new THREE.PlaneGeometry(W * 0.92, H * 0.86), kertasBahan(tekstur(cKartu), { transparent: true }));
  kartu.position.z = 0.012;
  amplop.add(kartu);
  const bSaku = new THREE.Shape();
  bSaku.moveTo(-W / 2, -H / 2); bSaku.lineTo(W / 2, -H / 2); bSaku.lineTo(W / 2, H / 2); bSaku.lineTo(0, -0.04 * H); bSaku.lineTo(-W / 2, H / 2); bSaku.closePath();
  const gSaku = new THREE.ShapeGeometry(bSaku);
  petaUV(gSaku, -W / 2, -H / 2, W, H);
  const saku = new THREE.Mesh(gSaku, kertasBahan(tekstur(cDepan)));
  saku.position.z = 0.024;
  amplop.add(saku);
  const bTutup = new THREE.Shape();
  bTutup.moveTo(-W / 2, 0); bTutup.lineTo(W / 2, 0); bTutup.lineTo(0, -UJUNG); bTutup.closePath();
  const gTutup = new THREE.ShapeGeometry(bTutup);
  petaUV(gTutup, -W / 2, -UJUNG, W, UJUNG);
  const engsel = new THREE.Group();
  engsel.position.set(0, H / 2, 0.036);
  amplop.add(engsel);
  engsel.add(new THREE.Mesh(gTutup, kertasBahan(tekstur(cTutup), { side: THREE.FrontSide })));
  engsel.add(new THREE.Mesh(gTutup, kertasBahan(texLapis, { side: THREE.BackSide })));
  // Segel lilin emas: lingkaran bergelombang diekstrusi, monogram sebagai relief
  const bSegel = new THREE.Shape();
  for (let i = 0; i <= 64; i++) {
    const a = (i / 64) * Math.PI * 2, r = 0.3 * (1 + 0.05 * Math.sin(a * 5 + 1) + 0.025 * Math.sin(a * 13));
    i ? bSegel.lineTo(Math.cos(a) * r, Math.sin(a) * r) : bSegel.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  const gSegel = new THREE.ExtrudeGeometry(bSegel, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.03, bevelSegments: 5, curveSegments: 16 });
  petaUV(gSegel, -0.33, -0.33, 0.66, 0.66);
  const texSegel = tekstur(cSegel);
  texSegel.colorSpace = THREE.NoColorSpace;
  const segel = new THREE.Mesh(gSegel, new THREE.MeshStandardMaterial({ color: 0xd9b25e, metalness: 0.9, roughness: 0.3, map: texSegel, bumpMap: texSegel, bumpScale: 4, transparent: true }));
  segel.position.set(0, H / 2 - UJUNG + 0.02, 0.04);
  amplop.add(segel);

  function aturAmplop() {
    const s = Math.min(1.05, (setengahLebar(0) * 2 * 0.86) / W);
    amplop.scale.setScalar(s);
    amplop.userData.y0 = setengahTinggi(0) * 0.16;
  }
  aturAmplop();
  body.classList.add("tiga-d");
  catat("amplop tampil");
  setTimeout(lukisKartu, 50);

  // Ketuk amplop juga membuka undangan
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  canvas.addEventListener("pointerdown", () => {});
  document.querySelector(".cover").addEventListener("click", (e) => {
    if (terbuka || e.target.closest("button")) return;
    ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    if (ray.intersectObjects([saku, belakang, segel], false).length) document.querySelector(".btn-open").click();
  });

  // ---------- Taman cat air ----------
  const taman = new THREE.Group();
  taman.visible = false;
  scene.add(taman);
  const vs = "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";
  const fsCat = `
    uniform sampler2D map; uniform float uReveal; uniform float uOpacity; uniform float uSeed;
    varying vec2 vUv;
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y); }
    float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
    void main(){
      vec4 c = texture2D(map, vUv);
      float d = distance(vUv, vec2(0.5)) * 1.35;
      float n = fbm(vUv * 4.0 + uSeed);
      float depan = uReveal * 1.7 - (d + n * 0.5);
      float a = smoothstep(0.0, 0.14, depan);
      float tepi = smoothstep(0.0, 0.05, depan) * (1.0 - smoothstep(0.05, 0.22, depan));
      c.rgb *= 1.0 - tepi * 0.22;
      gl_FragColor = vec4(c.rgb, c.a * a * uOpacity);
      #include <colorspace_fragment>
    }`;
  const bahanCat = (tex, seed, opacity = 1) => new THREE.ShaderMaterial({
    uniforms: { map: { value: tex }, uReveal: { value: 0 }, uOpacity: { value: opacity }, uSeed: { value: seed } },
    vertexShader: vs, fragmentShader: fsCat, transparent: true, depthWrite: false,
  });
  const bidang = new THREE.PlaneGeometry(1, 1);

  let siapTaman;
  const tamanSiap = new Promise((r) => (siapTaman = r));
  const sprite = [];
  const tetesTex = [];
  let kelopakMesh, emasMesh;
  const kelopakData = [], emasData = [];
  const PANJANG = 34;

  (async () => {
    const texRk = [tekstur(rkUtama)];
    const resep = [{ palet: "peach", bunga: 2 }, { palet: "lavender", bunga: 2 }, { palet: "mawar", bunga: 4 }, { palet: "putih", bunga: 3 }, { palet: "peach", bunga: 4 }];
    for (const r of resep) { texRk.push(tekstur(C.rangkaian(640, r))); await C.tunggu(); }
    const halo = [tekstur(C.sapuan(512, 512, ["#f5cfc6", "#e5dcef"])), tekstur(C.sapuan(512, 512, ["#d8e6d6", "#f7dcc6"]))];
    await C.tunggu();
    ["#f1b7b9", "#f7cdb0", "#d6c6ea", "#a9bea0", "#f4d48a"].forEach((w) => tetesTex.push(tekstur(C.tetes(256, w))));
    await C.tunggu();

    const tambah = (tex, cfg) => {
      const m = new THREE.Mesh(bidang, bahanCat(tex, Math.random() * 10, cfg.op || 1));
      m.userData = cfg;
      m.rotation.z = cfg.r || 0;
      m.renderOrder = cfg.z < -4 ? 0 : 1;
      taman.add(m);
      sprite.push(m);
      return m;
    };
    // Halo cat air di belakang nama
    tambah(halo[0], { sisi: 0, y: 0.35, z: -7, u: 9, op: 0.75, hero: true });
    tambah(halo[1], { sisi: 0.5, y: -1.4, z: -9, u: 10, op: 0.55, hero: true });
    // Bingkai bunga di sekitar nama
    tambah(texRk[0], { sisi: -1, y: 1.75, z: -1.2, u: 2.7, r: -0.25, hero: true });
    tambah(texRk[3], { sisi: 1, y: 1.85, z: -1.8, u: 2.6, r: 0.3, flip: true, hero: true });
    tambah(texRk[1], { sisi: -1, y: -1.9, z: -1.5, u: 2.5, r: 2.7, flip: true, hero: true });
    tambah(texRk[4], { sisi: 1, y: -1.75, z: -1.0, u: 2.6, r: -2.6, hero: true });
    // Jalur taman sepanjang scroll
    for (let i = 0; i < 13; i++) {
      tambah(texRk[(i + 2) % texRk.length], { sisi: i % 2 ? 1 : -1, y: -4.4 - i * 2.4, z: -1.4 - (i % 3) * 1.3, u: 2.3 + (i % 3) * 0.4, r: (i % 2 ? 1 : -1) * (0.4 + (i % 4) * 0.5), flip: i % 3 === 0 });
      if (i % 3 === 1) tambah(halo[i % 2], { sisi: (i % 2 ? -0.6 : 0.6), y: -5 - i * 2.4, z: -8, u: 8, op: 0.45 });
    }
    // Rangkaian tambahan di tepi layar lebar (desktop): hanya tampil bila layar jauh lebih lebar dari kolom konten
    for (let i = 0; i < 10; i++) {
      tambah(texRk[(i + 1) % texRk.length], { luar: true, sisi: i % 2 ? 1 : -1, y: 1.2 - i * 3.4, z: -3 - (i % 3), u: 3.2 + (i % 2) * 0.6, r: (i % 2 ? 1 : -1) * (0.3 + (i % 3) * 0.6), flip: i % 4 < 2, hero: i < 2 });
    }
    // Kelopak berinstans
    const nK = ringan ? 22 : 36;
    C.benih(31);
    kelopakMesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.16, 0.16), new THREE.MeshBasicMaterial({ map: tekstur(C.kelopak(128, "#f7e9e3")), transparent: true, depthWrite: false, side: THREE.DoubleSide, opacity: 0 }), nK);
    const warnaK = ["#f2a7ad", "#f6c39f", "#fff4ee", "#d2bde8", "#f5b6b0"].map((c) => new THREE.Color(c));
    for (let i = 0; i < nK; i++) {
      kelopakData.push({ x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 9, z: -0.5 - Math.random() * 4, v: 0.18 + Math.random() * 0.3, f: Math.random() * 6, rx: Math.random() * 3, ry: Math.random() * 3, s: 0.7 + Math.random() * 0.7 });
      kelopakMesh.setColorAt(i, warnaK[i % warnaK.length]);
    }
    taman.add(kelopakMesh);
    // Serpih emas metalik berinstans
    const nE = ringan ? 16 : 26;
    emasMesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.07, 0.07), new THREE.MeshStandardMaterial({ color: 0xe6bf62, metalness: 1, roughness: 0.25, alphaMap: tekstur(C.serpih(64)), transparent: true, side: THREE.DoubleSide, envMapIntensity: 2.2, opacity: 0 }), nE);
    for (let i = 0; i < nE; i++) emasData.push({ x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 9, z: -0.3 - Math.random() * 3, v: 0.08 + Math.random() * 0.12, f: Math.random() * 6, rx: Math.random() * 3, ry: Math.random() * 3, s: 0.6 + Math.random() * 0.9 });
    taman.add(emasMesh);
    aturTaman();
    siapTaman();
    catat("taman siap");
  })();

  function aturTaman() {
    const kolom = Math.min(1, 480 / innerWidth);
    const lebar = innerWidth > 900;
    for (const m of sprite) {
      const c = m.userData;
      if (c.luar) {
        m.visible = lebar;
        m.position.set(c.sisi * setengahLebar(c.z) * 0.72, c.y, c.z);
        m.scale.set((c.flip ? -1 : 1) * c.u, c.u, 1);
        continue;
      }
      const hw = setengahLebar(c.z) * kolom;
      m.position.set(c.sisi * hw * 0.92, c.y, c.z);
      m.scale.set((c.flip ? -1 : 1) * c.u, c.u, 1);
    }
  }

  // ---------- Membuka amplop ----------
  let mulaiBuka = false;
  document.querySelector(".btn-open").addEventListener("click", () => { mintaGiro(); bukaAmplop(); }, { capture: true });

  async function bukaAmplop() {
    if (mulaiBuka) return;
    mulaiBuka = true;
    const s0 = segel.scale.x;
    tween(500, 0, (t) => {
      const k = t < 0.3 ? 1 + (t / 0.3) * 0.25 : 1.25 * (1 - (t - 0.3) / 0.7);
      segel.scale.setScalar(s0 * Math.max(0.001, k));
      segel.rotation.z = t * Math.PI * 1.4;
      segel.position.z = 0.04 + t * 0.6;
      segel.material.opacity = 1 - Math.max(0, (t - 0.6) / 0.4);
    }, ease.out);
    tween(1000, 260, (t) => {
      engsel.rotation.x = -Math.PI * t;
      engsel.position.z = t < 0.5 ? 0.036 : lerp(0.036, -0.006, (t - 0.5) * 2);
    });
    await tween(850, 1080, (t) => { kartu.position.y = H * 0.62 * t; kartu.position.z = 0.012 + t * 0.03; }, ease.out);
    // Kartu terbang ke arah kamera; amplop turun dan menjauh
    scene.attach(kartu);
    const p0 = kartu.position.clone(), q0 = kartu.quaternion.clone();
    const lebarKartu = W * 0.92 * kartu.scale.x;
    const jarak = lebarKartu / (2 * tanTengah * camera.aspect * 0.94);
    const tujuan = new THREE.Vector3(0, 0, camera.position.z - jarak);
    const qNol = new THREE.Quaternion();
    const y0 = amplop.position.y, rx0 = amplop.rotation.x;
    tween(900, 0, (t) => { kartu.position.lerpVectors(p0, tujuan, t); kartu.quaternion.slerpQuaternions(q0, qNol, t); });
    tween(900, 0, (t) => { amplop.position.y = lerp(y0, y0 - 4.5, t); amplop.rotation.x = lerp(rx0, rx0 + 0.7, t); }, ease.io);
    setTimeout(mulaiTaman, 650);
    await tween(650, 750, (t) => { kartu.material.opacity = 1 - t; });
    scene.remove(amplop);
    scene.remove(kartu);
  }

  async function mulaiTaman() {
    await tamanSiap;
    terbuka = true;
    taman.visible = true;
    camera.position.set(0, 0, 8);
    sprite.filter((m) => m.userData.hero).forEach((m, i) => {
      m.userData.mekar = true;
      tween(2600, 120 * i, (t) => (m.material.uniforms.uReveal.value = t), ease.out);
    });
    tween(1500, 400, (t) => { kelopakMesh.material.opacity = t * 0.95; emasMesh.material.opacity = t; });
  }

  // ---------- Ketuk untuk meneteskan cat ----------
  const tetesAktif = [];
  addEventListener("pointerdown", (e) => {
    if (!terbuka || !tetesTex.length) return;
    if (!(e.target === document.body || e.target.id === "app" || e.target.closest(".sec-hero")) || e.target.closest("a,button")) return;
    ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const z = -1.2, t = (z - ray.ray.origin.z) / ray.ray.direction.z;
    const p = ray.ray.origin.clone().addScaledVector(ray.ray.direction, t);
    const m = new THREE.Mesh(bidang, bahanCat(tetesTex[Math.floor(Math.random() * tetesTex.length)], Math.random() * 10));
    const u = 1 + Math.random() * 0.7;
    m.position.copy(p);
    m.scale.set(u, u, 1);
    m.rotation.z = Math.random() * 6;
    m.renderOrder = 2;
    taman.add(m);
    tetesAktif.push(m);
    if (tetesAktif.length > 7) { const lama = tetesAktif.shift(); taman.remove(lama); lama.material.dispose(); }
    tween(1500, 0, (k) => (m.material.uniforms.uReveal.value = k), ease.out);
    tween(2600, 2200, (k) => (m.material.uniforms.uOpacity.value = 1 - k), ease.lin).then(() => {
      const i = tetesAktif.indexOf(m);
      if (i >= 0) { tetesAktif.splice(i, 1); taman.remove(m); m.material.dispose(); }
    });
  });

  // ---------- Ukuran layar ----------
  addEventListener("resize", () => {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    if (!terbuka) aturAmplop();
    if (sprite.length) aturTaman();
  });

  // ---------- Putaran render ----------
  const dummy = new THREE.Object3D();
  let lalu = performance.now();
  function putar(now) {
    requestAnimationFrame(putar);
    if (document.hidden) return;
    const dt = Math.min(0.05, (now - lalu) / 1000);
    lalu = now;
    jalankanTween(now);
    tx += (ttx - tx) * 0.06;
    ty += (tty - ty) * 0.06;
    terapkanMiring();
    const waktu = now / 1000;
    if (!terbuka) {
      if (!mulaiBuka) {
        amplop.position.y = amplop.userData.y0 + Math.sin(waktu * 1.2) * 0.05;
        amplop.rotation.x = -0.1 + ty * 0.22;
        amplop.rotation.y = tx * 0.32;
      }
    } else {
      const maks = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const target = -(scrollY / maks) * PANJANG;
      camera.position.y += (target - camera.position.y) * 0.09;
      camera.position.x = tx * 0.35;
      camera.lookAt(tx * 0.08, camera.position.y + ty * -0.12, -10);
      // Bunga yang masuk pandangan "mekar" seperti cat menyebar
      const jangkau = setengahTinggi(-2) * 1.25;
      for (const m of sprite) {
        if (m.userData.mekar) continue;
        if (Math.abs(m.position.y - camera.position.y) < jangkau) {
          m.userData.mekar = true;
          tween(2600, Math.random() * 300, (t) => (m.material.uniforms.uReveal.value = t), ease.out);
        }
      }
      if (kelopakMesh) {
        kelopakData.forEach((k, i) => {
          k.y -= k.v * dt;
          k.x += Math.sin(waktu * 0.8 + k.f) * 0.15 * dt;
          if (k.y < camera.position.y - 4.8) { k.y = camera.position.y + 4.8; k.x = (Math.random() - 0.5) * 6; }
          if (k.y > camera.position.y + 5) k.y = camera.position.y - 4.5;
          dummy.position.set(k.x, k.y, k.z);
          dummy.rotation.set(waktu * 0.9 + k.rx, waktu * 0.7 + k.ry, waktu * 0.4 + k.f);
          dummy.scale.setScalar(k.s);
          dummy.updateMatrix();
          kelopakMesh.setMatrixAt(i, dummy.matrix);
        });
        kelopakMesh.instanceMatrix.needsUpdate = true;
        emasData.forEach((k, i) => {
          k.y -= k.v * dt;
          if (k.y < camera.position.y - 4.8) { k.y = camera.position.y + 4.8; k.x = (Math.random() - 0.5) * 5; }
          if (k.y > camera.position.y + 5) k.y = camera.position.y - 4.5;
          dummy.position.set(k.x + Math.sin(waktu + k.f) * 0.1, k.y, k.z);
          dummy.rotation.set(waktu * 2.1 + k.rx, waktu * 1.7 + k.ry, k.f);
          dummy.scale.setScalar(k.s);
          dummy.updateMatrix();
          emasMesh.setMatrixAt(i, dummy.matrix);
        });
        emasMesh.instanceMatrix.needsUpdate = true;
      }
    }
    renderer.render(scene, camera);
  }
  requestAnimationFrame(putar);
}
