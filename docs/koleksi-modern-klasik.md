# Koleksi Modern Klasik: aturan baku

Dokumen ini adalah standar untuk semua undangan koleksi **Modern Klasik**. Koleksi ini terpisah dari tema adat. Struktur dasarnya tetap mengikuti [kerangka undangan](kerangka-undangan.md), dan warnanya mengikuti skill [warna-mewah](skills/warna-mewah/SKILL.md). Bila ada aturan yang berbeda, dokumen ini yang berlaku untuk koleksi ini.

## 1. Untuk siapa

- Pasangan yang bekerja sebagai profesional. Sebagian besar tamunya kolega kantor, klien, dan relasi.
- Pasangan yang berpikiran modern dan terbuka. Mereka lebih menghargai desain yang tertata daripada hiasan yang ramai.
- Kesan yang dituju: **elegan, mewah, profesional, dan terbatas (limited)**. Tamu harus merasa menerima undangan pribadi, bukan brosur massal.
- Bukan tema adat: tidak ada ornamen, motif, atau istilah adat, kecuali klien meminta sentuhan kecil.

## 2. Lima prinsip

1. **Ruang kosong adalah kemewahan.** Margin lega dan satu fokus per layar.
2. **Tipografi memimpin.** Nama dan tanggal menjadi elemen visual utama, bukan ornamen.
3. **Ornamen hampir nol.** Yang boleh hanya garis 1 px, monogram, dan angka.
4. **Gambar bergerak terasa sinematik.** Video pelan, warna redup atau hitam-putih, dan kamera tenang.
5. **Ringkas dan jelas.** Kalimat pendek, dan informasi praktis disusun seperti agenda rapat yang rapi.

## 3. Penanda "terbatas" (minimal 3 harus ada)

| Penanda | Contoh tampilan |
|---|---|
| Nomor undangan per tamu | `No. 048 / 150` di cover dan penutup |
| Kartu akses pribadi | Nama tamu ditulis besar seperti kartu akses, plus jumlah kursi: "Berlaku untuk 2 orang" |
| Batas konfirmasi | "Mohon konfirmasi sebelum 1 September 2027" |
| Monogram atau segel | Inisial pasangan dalam lingkaran garis tipis, atau segel lilin |
| Catatan privasi | "Undangan ini bersifat pribadi" dalam huruf kecil |
| Kartu masuk QR (opsional) | QR berisi nama dan nomor tamu untuk registrasi di lokasi |

## 4. Warna

- Wajib lolos `periksa.py` dengan skor ≥ 85 dan mengikuti aturan anti-krem (skill warna-mewah).
- Paling banyak 3 warna ditambah 1 logam. Palet didominasi monokrom: arang, abu batu, navy tua, espresso, atau hijau botol.
- Logam: sampanye, platinum, atau perak. Hanya untuk garis tipis, angka, dan monogram, paling banyak 5% layar.
- Setiap tema memilih satu mode:
  - **Terang:** latar netral dingin atau abu batu.
  - **Gelap:** latar arang atau hitam hangat, dengan bagian terang sebagai selingan.
- Foto dan video diselaraskan dengan palet, misalnya hitam-putih atau warna redup. Penyelarasan dikerjakan saat memproses berkas, bukan dengan filter CSS yang berat.

## 5. Huruf

- **Judul dan nama:** serif klasik berkontras tinggi atau huruf Romawi. Contoh: Libre Caslon Display, Gilda Display, Italiana, Cinzel, EB Garamond. Ditulis kapital berjarak (spasi 0,1–0,2 em) atau serif miring.
- **Teks:** sans modern yang ringan. Contoh: Jost, Manrope, Figtree, Outfit, DM Sans.
- **Dilarang:** huruf sambung atau script, huruf dekoratif, serta Inter, Space Grotesk, dan Poppins (terlalu umum, terkesan templat).
- **Skala tetap:** 64 / 40 / 24 / 16 / 12 px. Label kapital 11 px dengan spasi 0,3 em.
- **Angka:** tanggal boleh memakai format titik (`18.09.2027`), dan tahun boleh ditulis dengan angka Romawi (`MMXXVII`) sebagai sentuhan klasik.

## 6. Tata letak dan bentuk

- Satu kolom, lebar maksimal 480 px, kelipatan 8 px, margin samping minimal 28 px.
- Pergantian bagian memakai garis lurus atau garis rambut, bukan sambungan lengkung (`--lengkung: 0`).
- **Bingkai foto yang boleh:**
  - persegi panjang tegas (radius 0–2 px);
  - lengkung (arch) klasik, paling banyak satu per undangan;
  - foto penuh layar;
  - letterbox sinematik 2,39:1.
- **Bingkai yang tidak dipakai:** siluet adat, polaroid, berserak, oval, dan bentuk sobek.
- Penomoran (I, II, III) hanya untuk urutan yang benar-benar berurutan, seperti susunan acara. Jangan dipakai sebagai hiasan judul bagian.

## 7. Foto dan video

### Foto

- Prewedding berbusana modern formal: jas atau tuksedo, gaun, atau kebaya modern yang minimalis. Busana adat dan pakaian kasual tidak dipakai.
- Gaya editorial: pose natural, komposisi bersih, latar arsitektur, studio, atau alam yang lapang.
- Kebutuhan minimal: 1 foto pasangan untuk cover dan hero, 1 potret dekat per mempelai, dan 6–9 foto galeri.

### Video

- **Peran video:**
  - hero berulang 6–10 detik;
  - 1–2 selingan sinematik letterbox;
  - galeri campuran dengan paling banyak 3 video.
- **Teknis:**
  - MP4 H.264, resolusi 720p (tegak 720×1280 atau 4:5 720×900), 24–30 fps;
  - tanpa audio, berulang mulus;
  - target 1–2 MB per klip (maksimal 2,5 MB);
  - poster JPG wajib ada.
- **Pemutaran:**
  - atribut `muted autoplay playsinline loop preload="none"`;
  - video dimuat saat mendekati layar dan dijeda saat keluar layar;
  - bila tamu memilih kurangi gerak (`prefers-reduced-motion`) atau hemat data (Save-Data), yang tampil hanya poster.
- **Gambar awal (poster) wajib tajam dan langsung tampil:**
  - setiap video punya poster berupa foto tajam, diambil dari frame terbaik dan sama dengan frame pertama video, supaya pergantian dari foto ke video tidak melompat;
  - resolusi poster sama dengan video, format JPG atau WebP, paling besar 150 KB;
  - poster tampil sejak detik pertama halaman dibuka. Poster hero dimuat lebih dulu (`preload`), poster lain dimuat bersama bagiannya;
  - video baru menggantikan poster setelah benar-benar siap diputar (event `canplay`), dengan pudar halus sekitar 400 ms;
  - **dilarang:** gambar blur atau buram sebagai pengganti sementara, layar hitam atau kosong, dan ikon loading berputar. Selama video belum siap, yang terlihat tetap poster.
- **Bobot halaman:** muatan awal di bawah 3 MB, dan total dengan semua video paling banyak 12 MB.
- **Sumber:**
  - demo memakai Pexels Video (bebas untuk usaha), diperiksa visual satu per satu;
  - klien: video prewedding mereka dipotong menjadi 3–5 klip.
- **Musik:** instrumental piano, string, atau jazz lembut. Video tidak bersuara, dan musik latar tetap berjalan.

## 8. Susunan bagian

| No | Bagian | Isi dan catatan |
|---|---|---|
| 1 | Cover (kartu akses) | Monogram, nama tamu, nomor undangan, jumlah kursi, tombol "Buka Undangan" |
| 2 | Hero | Video berulang selebar layar, nama pasangan, tanggal |
| 3 | Pembuka | Salam singkat. Ayat atau kutipan opsional, satu kalimat saja |
| 4 | Mempelai | Potret editorial, nama lengkap, orang tua (opsional) |
| 5 | Kisah | Opsional. Paling banyak 3 titik waktu, masing-masing satu kalimat |
| 6 | Selingan sinematik | Video letterbox dan satu kutipan pendek |
| 7 | Acara | Format agenda: waktu, acara, tempat. Peta dan tombol tambah ke kalender |
| 8 | Dress code | Gaya busana (misalnya *black tie optional*) dan contoh warna |
| 9 | Info tamu | Parkir, hotel terdekat, kebijakan anak, protokol |
| 10 | Galeri | Campuran foto dan video, tata letak kisi editorial atau pita film |
| 11 | Konfirmasi (RSVP) | Batas waktu, jumlah kursi sesuai undangan, ucapan |
| 12 | Tanda kasih | Opsional dan diskret, tersembunyi di balik tombol |
| 13 | Penutup | Monogram, terima kasih, nomor undangan diulang |

Menu melayang tetap dipakai.

## 9. Bahasa dan nada

- Bahasa Indonesia baku yang ringkas. Versi dua bahasa (Indonesia dan Inggris) boleh untuk tamu internasional.
- Hindari kata berlebihan, emoji, dan tanda seru.
- Format konsisten: `Sabtu, 18 September 2027 · 16.00 WIB`.

## 10. Gerak

- Durasi 600–1.200 ms dengan perlambatan halus. Yang boleh: pudar, geser kecil, dan garis yang tergambar.
- Tidak ada pantulan, zoom besar, kelopak, partikel, atau kilau.
- Semua gerak mati bila tamu memilih kurangi gerak.

## 11. Daftar larangan

- Ornamen adat, bunga cat air, kelopak berjatuhan, partikel, dan glitter.
- Huruf sambung atau dekoratif.
- Latar krem bawaan, putih murni, dan emas kuning.
- Border tebal, bingkai ganda, polaroid, dan stiker.
- Video bersuara, video yang tetap berputar saat hemat data, dan video di atas 2,5 MB.
- Teks panjang dan lebih dari satu kutipan per bagian.
- Foto berbusana adat (kecuali permintaan klien) dan foto kasual.

## 12. Checklist sebelum tayang

- [ ] Palet lolos `periksa.py` (≥ 85) dan tidak krem.
- [ ] Minimal 3 penanda "terbatas" tampil.
- [ ] Tidak ada huruf sambung dan tidak ada ornamen.
- [ ] Muatan awal di bawah 3 MB, setiap video ≤ 2,5 MB, dan setiap video punya poster.
- [ ] Video tidak berputar saat kurangi gerak atau hemat data (dicek dengan emulasi).
- [ ] Dibuka dengan emulasi jaringan lambat (3G): yang terlihat sejak awal adalah poster tajam, bukan gambar blur, layar hitam, atau ikon loading.
- [ ] Semua foto dan video berbusana modern formal, dan lisensinya tercatat di `KREDIT.md`.
- [ ] Uji di lebar 360 px: tanpa error, tanpa geser ke samping, dan tombol ≥ 44 px.
- [ ] Zona waktu benar (`zonaWaktu`).
- [ ] Teks ringkas tanpa tanda seru.

## 13. Alur kerja

1. **Usulan singkat:** nama tema, mode terang atau gelap, dan konsep dalam satu paragraf. User menyetujui dulu.
2. **Palet:** halaman pilihan dengan minimal 3 opsi, salah satunya berlatar gelap. User memilih.
3. **Aset:** foto dan video (sumber dan lisensi), lalu dipotong, dikompres, dan diselaraskan warnanya.
4. **Membangun:** menyalin templat koleksi, mengisi `data.js`, dan menulis `tema.css`.
5. **Uji, katalog, tayang:** jalankan checklist, buat thumbnail, push, dan cek sampai tayang.

## 14. Kebutuhan engine (belum dibuat)

Fitur yang perlu ditambahkan ke engine sebelum undangan pertama koleksi ini:

- Isian `koleksi: "modern-klasik"` untuk mengaktifkan gaya koleksi (garis lurus, tanpa lengkung, tanpa partikel).
- Nomor undangan dan jumlah kursi dari tautan tamu, misalnya `?to=Bapak%20Ahmad&no=48&kursi=2`, dengan total di `undangan.total`.
- `video.hero`, `video.selingan[]`, dan item galeri berupa video (`{ video, poster }`), lengkap dengan pemuatan malas, jeda di luar layar, dan cadangan poster.
- Bagian baru: `dressCode`, `infoTamu`, `batasKonfirmasi`, dan kartu masuk QR (opsional).
- `bahasa: "id" | "en"` untuk versi dua bahasa (tahap berikutnya).
