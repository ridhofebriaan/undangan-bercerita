# Alat bantu tema RB Digital

Pasang sekali: `cd tools && npm install` (puppeteer-core memakai Google Chrome yang sudah terpasang, ffmpeg dari paket `ffmpeg-static`).
Server lokal untuk uji: `cd site && python3 -m http.server 8765`.

| Alat | Fungsi | Pakai |
|---|---|---|
| `tinta.js` | Ubah ilustrasi domain publik menjadi toile satu warna berlatar transparan (WebP) | `node tinta.js jobs.json` — job: `src, out, warna, crop[x,y,w,h], pKertas, pTinta, gamma, ambang, lebar, pudarTepi, mutu` |
| `potong.js` | Potong foto (koordinat 0–1) dan simpan JPEG | `node potong.js jobs.json` — job: `src, out, crop, lebar` |
| `video.js` | Potong dan kompres klip video, buang suara, buat poster tajam dari frame pertama | `node video.js jobs.json` — job: `src, out, poster, mulai, durasi, rasio, lebar, fokusX, fokusY, targetMB, saturasi, hitamPutih` |
| `uji.js` | Uji tema di layar HP 360 px: error, lebar, tombol < 44 px, lembar tangkapan semua bagian | `node uji.js <folderKeluaran> <kodeTema...>` |
| `hd.js` | Tangkapan resolusi penuh (390×844 @2x) cover, hero, dan bagian tertentu | `node hd.js <awalanBerkas> <kodeTema> <idBagian...>` |
| `lembar.js` | Lembar kontak semua gambar dalam folder, untuk memilih foto | `node lembar.js <keluaran.png> <folder> [kolom] [lebar]` |
| `buat-musik.js` | Pembuat musik lama (tidak dipakai lagi) | |

Hasil sementara simpan di luar repo (folder `tools/out/` diabaikan git).
