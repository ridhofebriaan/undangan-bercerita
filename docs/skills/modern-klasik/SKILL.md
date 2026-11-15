---
name: modern-klasik
description: Merancang, membangun, atau menilai undangan koleksi Modern Klasik RB Digital — untuk pasangan profesional berpikiran modern, kesan elegan, mewah, profesional, dan terbatas, dengan konten campuran foto dan video. Gunakan saat user meminta undangan modern/profesional/elegan/limited, undangan dengan video prewedding, atau memperbaiki tema koleksi ini.
---

# Koleksi Modern Klasik

**Aturan lengkap ada di `docs/koleksi-modern-klasik.md` (proyek `/Users/ridho/work/aplikasi-undangan`). Baca utuh sebelum mulai.** Skill ini adalah ringkasan dan cara kerjanya. Bila berbeda, dokumen yang berlaku. Struktur dasar mengikuti `docs/kerangka-undangan.md`, dan warna mengikuti skill `warna-mewah`.

## Inti aturan

1. **Target:** profesional, modern, terbuka. Kesan elegan, mewah, profesional, terbatas. Bukan tema adat.
2. **Ornamen hampir nol:** garis 1 px, monogram, dan angka saja. Tanpa bunga, kelopak, partikel, glitter, atau motif adat.
3. **Minimal 3 penanda terbatas:** nomor undangan per tamu (`No. 048 / 150`), kartu akses dengan jumlah kursi, batas konfirmasi, monogram, catatan privasi, dan kartu masuk QR (opsional).
4. **Warna:** lolos `periksa.py` ≥ 85, tanpa krem, monokrom ditambah satu logam (≤ 5% layar). Pilih satu mode, terang atau gelap.
5. **Huruf:** serif klasik untuk nama (kapital berjarak atau miring) dan sans modern untuk teks. Dilarang huruf sambung, Inter, Space Grotesk, dan Poppins.
6. **Bentuk:** garis lurus antarbagian (tanpa lengkung). Bingkai persegi tegas, satu arch, penuh layar, atau letterbox 2,39:1.
7. **Foto:** busana modern formal, gaya editorial, hitam-putih atau warna redup.
8. **Video:**
   - hero berulang 6–10 detik, 1–2 selingan letterbox, dan paling banyak 3 video di galeri;
   - MP4 H.264 720p tanpa suara, 1–2 MB (maksimal 2,5 MB);
   - dimuat saat mendekati layar dan dijeda di luar layar;
   - hanya poster yang tampil saat tamu memilih kurangi gerak atau hemat data.
9. **Poster wajib tajam dan tampil sejak awal.** Poster sama dengan frame pertama video, ≤ 150 KB. Video baru menggantikan poster setelah `canplay`, dengan pudar 400 ms. **Dilarang** gambar blur, layar hitam, dan ikon loading.
10. **Bobot dan gerak:** muatan awal < 3 MB, total ≤ 12 MB. Gerak 600–1.200 ms, halus, tanpa pantulan atau zoom besar.
11. **Interaksi koleksi** (dokumen bagian 15):
    - segel tekan-dan-tahan;
    - kilau foil yang hanya bergerak karena tamu;
    - hero mengikuti gulir;
    - galeri Story;
    - konfirmasi bertahap dengan kartu masuk ber-QR;
    - agenda hidup di hari H.

    Semuanya aktif otomatis lewat `koleksi`, dan masing-masing wajib punya jalan alternatif (keyboard, kurangi gerak, hemat data).
12. **Nada:** ringkas, tanpa emoji dan tanda seru. Format tanggal `Sabtu, 18 September 2027 · 16.00 WIB`.

## Cara kerja

1. **Usulan singkat:** nama tema, mode, dan konsep satu paragraf. Tunggu persetujuan user.
2. **Palet:** buat halaman pilihan (Artifact) berisi minimal 3 opsi, salah satunya berlatar gelap. Semua dicek `python3 docs/skills/warna-mewah/periksa.py`. Simpan pilihan user ke memori.
3. **Aset** (alat di `tools/`, pasang sekali dengan `cd tools && npm install`):
   - **Foto:** cari di Pexels lewat agen web-fetch. Unduh `images.pexels.com/photos/ID/pexels-photo-ID.jpeg?auto=compress&w=1800`, periksa dengan `node tools/lembar.js`, lalu potong dengan `node tools/potong.js jobs.json`.
   - **Video:** cari di Pexels Video. Unduh berkas MP4 ukuran HD, pilih detik terbaik, lalu jalankan `node tools/video.js jobs.json` untuk memotong, mengompres, membuang suara, dan membuat poster. Periksa posternya dengan `lembar.js`.
   - Catat sumber dan nomor foto atau video di `KREDIT.md`.
   - User-Agent saat mengunduh tidak boleh memuat email user.
4. **Membangun:** salin `site/tema/modern-atelier/` (templat koleksi) ke `site/tema/<kode>/`, isi `data.js` (daftar isian di dokumen bagian 14), lalu ganti token palet dan huruf di `tema.css`. Untuk mode gelap, balik token warna bagian selingan di `.koleksi-modern-klasik .sec.gelap`.
5. **Uji:** jalankan server `cd site && python3 -m http.server 8765`, lalu:
   - `node tools/uji.js <keluaran> <kode>` untuk error, lebar, dan tombol;
   - `node tools/hd.js <awalan> <kode> <bagian...>` untuk cek visual;
   - `node tools/uji-interaksi.js <kode>` untuk menguji segel, hero, Story, konfirmasi dan kartu masuk, serta agenda hari H;
   - `node tools/uji-video.js <kode>` untuk memeriksa video berputar, bobot (awal < 3 MB, total ≤ 12 MB), kurangi gerak, hemat data, dan poster hero di 3G;
   - parameter tautan tamu bisa ditambah lewat `Q="&no=48&kursi=2"` di depan perintah `uji.js` atau `hd.js`.
6. **Tayang:** entri `site/katalog.js` dan thumbnail cover 360×740 @1,5× (JPG dan WebP) di `site/assets/katalog/`. Lalu commit, push, dan tunggu sampai halaman tayang.

## Kesalahan yang pernah terjadi (jangan diulang)

- Latar krem bawaan, sampai user menegurnya sebagai "warna default Claude".
- Foto busana yang tidak sesuai tema.
- Border tebal atau bingkai ganda (dianggap kuno).
- Jam acara selalu tertulis WIB untuk kota di luar WIB (pakai `zonaWaktu`).
- Email user ikut terkirim di User-Agent.
- Berkas mentah (mp3 atau video asli) ikut di-commit. Yang di-commit hanya hasil olahan.
- Mengerjakan perintah setengah jalan. Jalankan perintah user sampai tuntas.

## Kesalahan teknis yang sudah ditemukan

- `kerangka.css` memasang `--on-gelap` dan `--emas-terang` di `body.k2`, sehingga nilai di `:root` tema tertimpa. `modern-klasik.css` sudah mengarahkannya ke token selingan. Jangan andalkan nilai `:root` untuk kedua token ini.
- Kontras logam di latar terang mudah jatuh di bawah 4,5:1. Cek dengan hitungan kontras, lalu gelapkan logam khusus untuk bagian terang.
- Klip stok yang menampilkan wajah orang lain membuat pasangan di video berbeda dengan di foto. Pakai klip detail tanpa wajah (tangan, dasi, korsase), atau video klien sendiri.

## Palet terpilih

Undangan pertama: **M6 Espresso & Perunggu**, mode gelap. Gelap `#231b18`, terang `#e9e5e1`, aksen `#6b5a50`, perunggu `#a8825f`.
