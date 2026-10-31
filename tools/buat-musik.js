// Membuat musik latar undangan dari nol (tanpa sampel, tanpa library).
// Hasil sepenuhnya milik sendiri, jadi bebas lisensi.
//
// Pakai:
//   node tools/buat-musik.js            -> tools/out/musik.wav
//   afconvert -f m4af -d aac -b 96000 tools/out/musik.wav demo/assets/audio/musik.m4a
//
// Isi: petikan ala qanun/kecapi (Karplus-Strong), pad hangat, drone rendah, reverb.
// Tangga nada D harmonic minor (rasa maqam Nahawand/Hijaz). 72 BPM, 20 bar, loop mulus.

const fs = require("fs");
const path = require("path");

const SR = 44100;
const BPM = 72;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const BARS = 20;
const LOOP = BAR * BARS; // ~66,7 detik
const N = Math.round(LOOP * SR);
// Render dua putaran lalu ambil putaran kedua: ekor nada & reverb putaran pertama
// ikut masuk ke awal, sehingga sambungan loop tidak terdengar.
const TOTAL = N * 2;
const L = new Float32Array(TOTAL);
const R = new Float32Array(TOTAL);

const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

// Generator acak dengan seed tetap agar hasil selalu sama.
let seed = 12345;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;

function mix(i, v, pan) {
  if (i < 0 || i >= TOTAL) return;
  L[i] += v * Math.cos((pan + 1) * Math.PI / 4);
  R[i] += v * Math.sin((pan + 1) * Math.PI / 4);
}

// ---------- Petikan (Karplus-Strong) ----------
function pluck(t, note, gain, pan, len = 3.2, bright = 0.5) {
  const f = hz(note);
  const d = Math.max(2, Math.round(SR / f));
  const buf = new Float32Array(d);
  let prev = 0;
  for (let k = 0; k < d; k++) {
    // Noise yang dihaluskan = petikan lembut, bukan tajam
    prev = prev + bright * (rand() - prev);
    buf[k] = prev;
  }
  const start = Math.round(t * SR);
  const n = Math.round(len * SR);
  const decay = 0.996 + Math.min(0.0035, f / 400000);
  let idx = 0;
  for (let k = 0; k < n; k++) {
    const a = buf[idx];
    const b = buf[(idx + 1) % d];
    buf[idx] = decay * 0.5 * (a + b);
    idx = (idx + 1) % d;
    const fadeOut = k > n - 2000 ? (n - k) / 2000 : 1;
    mix(start + k, a * gain * fadeOut, pan);
  }
}

// ---------- Pad hangat (aditif, detune pelan) ----------
function pad(t, dur, note, gain, pan) {
  const f = hz(note);
  const att = 1.6, rel = 2.2;
  const start = Math.round(t * SR);
  const n = Math.round((dur + rel) * SR);
  const harm = [1, 0.45, 0.22, 0.12, 0.06];
  const det = [-0.0025, 0.0025];
  for (let k = 0; k < n; k++) {
    const s = k / SR;
    let env = s < att ? s / att : 1;
    if (s > dur) env *= Math.max(0, 1 - (s - dur) / rel);
    env = env * env * (3 - 2 * env); // kurva halus
    let v = 0;
    for (let h = 0; h < harm.length; h++) {
      for (let j = 0; j < det.length; j++) {
        v += harm[h] * Math.sin(2 * Math.PI * f * (h + 1) * (1 + det[j]) * s + h + j);
      }
    }
    // Tremolo sangat pelan supaya pad "bernapas"
    const breathe = 0.85 + 0.15 * Math.sin(2 * Math.PI * 0.18 * s + note);
    mix(start + k, v * env * breathe * gain, pan);
  }
}

// ---------- Komposisi ----------
// Akord per 2 bar. Intro 4 bar, lalu dua frase melodi masing-masing 8 bar.
const CH = {
  Dm: [50, 53, 57, 62],
  Bb: [46, 53, 58, 62],
  Gm: [43, 50, 55, 58],
  A: [45, 52, 57, 61],
};
const progression = ["Dm", "Bb", "Dm", "Bb", "Gm", "A", "Dm", "Bb", "Gm", "A"];

// [ketukan, nada MIDI, lama ketukan]
const phraseA = [
  [0, 69, 1], [1, 74, 1], [2, 76, 1], [3, 77, 3], [6, 76, 1], [7, 74, 1],
  [8, 77, 2], [10, 74, 1], [11, 70, 3], [14, 74, 2],
  [16, 79, 2], [18, 77, 1], [19, 76, 1], [20, 74, 3], [23, 70, 1],
  [24, 69, 2], [26, 73, 2], [28, 76, 2], [30, 73, 2],
];
const phraseB = [
  [0, 74, 1], [1, 77, 1], [2, 81, 3], [5, 79, 1], [6, 77, 2],
  [8, 77, 1], [9, 79, 1], [10, 77, 1], [11, 74, 3], [14, 77, 2],
  [16, 82, 2], [18, 81, 1], [19, 79, 1], [20, 77, 2], [22, 76, 1], [23, 74, 1],
  [24, 73, 2], [26, 76, 2], [28, 69, 4],
];

function placeLoop(offset) {
  progression.forEach((name, i) => {
    const t = offset + i * 2 * BAR;
    const notes = CH[name];
    notes.forEach((m, j) => pad(t, 2 * BAR, m, 0.010, -0.5 + j / 3));
    // Drone rendah di nada dasar D
    pad(t, 2 * BAR, 38, 0.012, 0);
    // Petikan bas di awal akord + arpeggio tipis di ketukan ke-3
    pluck(t, notes[0] - 12, 0.55, -0.15, 4, 0.35);
    pluck(t + 2 * BEAT, notes[2], 0.18, 0.4, 2.5, 0.3);
    pluck(t + BAR + 2 * BEAT, notes[1] + 12, 0.14, -0.4, 2.5, 0.3);
  });
  const mel = (phrase, startBar) =>
    phrase.forEach(([b, m, d], k) => {
      const t = offset + startBar * BAR + b * BEAT;
      const human = (rand() * 0.012); // sedikit tidak presisi agar terasa dimainkan
      pluck(t + human, m, 0.42, 0.15 * Math.sin(k), Math.max(2.2, d * BEAT + 1.6), 0.55);
    });
  mel(phraseA, 4);
  mel(phraseB, 12);
}
placeLoop(0);
placeLoop(LOOP);

// ---------- Reverb (Freeverb sederhana) ----------
function reverb(input, spread) {
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((x) => x + spread);
  const aps = [556, 441, 341, 225].map((x) => x + spread);
  const room = 0.86, damp = 0.35;
  const cb = combs.map((d) => ({ b: new Float32Array(d), i: 0, s: 0 }));
  const ab = aps.map((d) => ({ b: new Float32Array(d), i: 0 }));
  const out = new Float32Array(input.length);
  for (let n = 0; n < input.length; n++) {
    const x = input[n] * 0.015;
    let y = 0;
    for (const c of cb) {
      const o = c.b[c.i];
      c.s = o * (1 - damp) + c.s * damp;
      c.b[c.i] = x + c.s * room;
      c.i = (c.i + 1) % c.b.length;
      y += o;
    }
    for (const a of ab) {
      const o = a.b[a.i];
      a.b[a.i] = y + o * 0.5;
      a.i = (a.i + 1) % a.b.length;
      y = o - y;
    }
    out[n] = y;
  }
  return out;
}
const wetL = reverb(L, 0);
const wetR = reverb(R, 23);

// ---------- Master: ambil putaran kedua, normalisasi, limiter lembut ----------
const outL = new Float32Array(N);
const outR = new Float32Array(N);
let peak = 0;
for (let k = 0; k < N; k++) {
  const i = N + k;
  outL[k] = L[i] * 0.75 + wetL[i] * 0.9;
  outR[k] = R[i] * 0.75 + wetR[i] * 0.9;
  peak = Math.max(peak, Math.abs(outL[k]), Math.abs(outR[k]));
}
const norm = 0.85 / peak;
const wav = Buffer.alloc(44 + N * 4);
wav.write("RIFF", 0);
wav.writeUInt32LE(36 + N * 4, 4);
wav.write("WAVE", 8);
wav.write("fmt ", 12);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(SR, 24);
wav.writeUInt32LE(SR * 4, 28);
wav.writeUInt16LE(4, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(N * 4, 40);
const soft = (v) => Math.tanh(v * 1.1) / Math.tanh(1.1);
for (let k = 0; k < N; k++) {
  wav.writeInt16LE(Math.round(soft(outL[k] * norm) * 32000), 44 + k * 4);
  wav.writeInt16LE(Math.round(soft(outR[k] * norm) * 32000), 46 + k * 4);
}

const outDir = path.join(__dirname, "out");
fs.mkdirSync(outDir, { recursive: true });
const file = path.join(outDir, "musik.wav");
fs.writeFileSync(file, wav);
console.log("Selesai:", file, "| durasi", LOOP.toFixed(1), "detik | peak awal", peak.toFixed(3));
