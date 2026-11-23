---
name: format-pintu
description: Membuat undangan FB Digital dengan Format Pintu, yaitu pola tema Melayu (cover dua daun pintu bermotif yang terbuka, foto sampul lengkung, hero foto penuh, selang-seling bagian gelap bermotif, nama huruf sambung, sudut ornamen tergambar, kelopak berjatuhan, galeri mozaik 12 foto). Gunakan saat user meminta undangan "seperti tema Melayu", "format pintu", atau beberapa undangan dengan format yang sama dengan tema Melayu.
---

# Format Pintu

**Aturan lengkap ada di `docs/format-pintu.md` (proyek `/Users/ridho/work/aplikasi-undangan`). Baca utuh sebelum mulai.** Acuan dan templatnya adalah `site/tema/melayu/` ([demo](https://ridhofebriaan.github.io/undangan-bercerita/tema/melayu/?to=Bapak%20Ahmad)). Skill ini adalah ringkasan dan cara kerjanya. Bila berbeda, dokumen yang berlaku.

## Inti aturan

1. **Delapan ciri wajib:**
   - cover pintu;
   - foto sampul lengkung;
   - sudut ornamen tergambar;
   - hero foto penuh layar;
   - selang-seling bagian gelap bermotif ubin;
   - nama dan judul acara berhuruf sambung;
   - kelopak berjatuhan;
   - galeri mozaik 12 foto.
2. **Engine dasar saja:** `engine/undangan.css` ditambah `tema.css`. Tanpa `kerangka: true` dan tanpa `koleksi`.
3. **Tiap undangan berbeda di minimal 5 elemen:** palet, motif ubin, pita tepi, sudut, medali, huruf, arah pintu, bentuk bingkai, warna kelopak, atau bagian gelap. Ornamen SVG digambar sendiri.
4. **Aturan bersama tetap berlaku:**
   - palet lolos `periksa.py` ≥ 85 (skill warna-mewah);
   - latar bawaannya netral berona palet, dan bingkai bawaannya modern (bayangan atau garis 1 px);
   - **krem dan cincin ganda boleh sesekali**: jangan dipakai di dua undangan berturut-turut, dan paling banyak sepertiga;
   - foto sesuai tema atau adat;
   - aset legal dan dicatat di `KREDIT.md`;
   - `zonaWaktu` diisi benar.
5. **Krem `#f7f1e3` dan cincin ganda (`box-shadow` berlapis) dari Melayu** hanya dipertahankan bila aturan "sesekali" terpenuhi. Selain itu, ganti dengan netral berona palet dan bingkai modern.

## Cara kerja

1. **Usulan singkat:** nama, suasana, adat atau umum. Tunggu persetujuan user.
2. **Palet:** halaman pilihan (Artifact) berisi minimal 3 opsi, salah satunya berlatar gelap. Simpan pilihan user ke memori.
3. **Salin templat:** `cp -R site/tema/melayu site/tema/<kode>`, lalu hapus foto lama.
   - `index.html` harus memuat `tema.css` dengan jalur relatif;
   - ganti judul, deskripsi, huruf, dan `og:image` beralamat lengkap `https://ridhofebriaan.github.io/undangan-bercerita/assets/katalog/<kode>.jpg`.
4. **Ornamen:** gambar `ubin.svg` (48×48), `tepi.svg` (32×28), `sudut.svg` (120×120, animasi `draw` dengan `stroke-dasharray`, hormati kurangi gerak), dan `medali.svg` (64×64). Pratinjau di latar gelap dan terang.
5. **`tema.css`:** ganti token dan nama SVG, terapkan bingkai modern, pilih variasi (dokumen bagian 6). Blok `prefers-reduced-motion` wajib tetap ada.
6. **Foto:**
   - `sampul` 3:4;
   - `hero` tegak 1200 px;
   - `wanita` dan `pria` 3:4;
   - `g01`–`g12` dengan urutan mozaik: ke-1 hampir persegi, ke-7 lebar 3:2, ke-11 lebar 2:1.

   Total sekitar 2,5 MB. Alat: `tools/lembar.js` dan `tools/potong.js`.
7. **Musik:** konversi dengan `afconvert -f m4af -d aac -b 112000 masuk.mp3 keluar.m4a`. Berkas mp3 mentah tidak di-commit.
8. **Uji:** server `cd site && python3 -m http.server 8765`, lalu `node tools/uji.js <keluaran> <kode>` dan `node tools/hd.js <awalan> <kode> salam mempelai acara galeri penutup`. Periksa juga mode kurangi gerak.
9. **Tayang:** entri `site/katalog.js`, thumbnail cover 360×740 @1,5× (JPG dan WebP), commit, push, lalu cek sampai tayang.

## Kesalahan yang pernah terjadi (jangan diulang)

- Templat memuat `../../tema/melayu/tema.css`. Salinan jadi diam-diam memakai CSS Melayu.
- `og:image` mengarah ke alamat lama `/rb-digital/`, sehingga pratinjau WhatsApp kosong.
- Latar krem dan bingkai cincin ganda dipakai terus-menerus. User tidak keberatan bila sesekali, tapi menegurnya bila berulang.
- Foto busana adat yang tidak sesuai tema.
- Mengerjakan perintah setengah jalan. Jalankan perintah user sampai tuntas.
