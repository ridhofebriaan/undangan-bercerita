# Koleksi Modern Klasik: aturan baku

Dokumen ini adalah standar untuk semua undangan koleksi **Modern Klasik**. Koleksi ini terpisah dari tema adat. Struktur dasarnya tetap mengikuti [kerangka undangan](kerangka-undangan.md), dan warnanya mengikuti skill [warna-mewah](skills/warna-mewah/SKILL.md). Bila ada aturan yang berbeda, dokumen ini yang berlaku untuk koleksi ini. Ringkasan untuk Claude ada di skill [modern-klasik](skills/modern-klasik/SKILL.md), dan alat bantunya di [`tools/`](../tools/README.md).

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
| Kartu masuk ber-QR | Muncul setelah tamu mengonfirmasi hadir: nama, nomor undangan, kursi, dan QR untuk registrasi di lokasi |

## 4. Warna

- Wajib lolos `periksa.py` dengan skor ≥ 85 dan mengikuti aturan anti-krem (skill warna-mewah).
- Paling banyak 3 warna ditambah 1 logam. Palet didominasi monokrom: arang, abu batu, navy tua, espresso, atau hijau botol.
- Logam: sampanye, platinum, atau perak. Hanya untuk garis tipis, angka, dan monogram, paling banyak 5% layar.
- Setiap tema memilih satu mode:
  - **Terang:** latar netral dingin atau abu batu.
  - **Gelap:** latar arang atau hitam hangat, dengan bagian terang sebagai selingan.
- **Palet terpilih untuk undangan pertama (15 Nov 2026): M6 Espresso & Perunggu, mode gelap.** Gelap `#231b18`, terang `#e9e5e1`, aksen `#6b5a50`, perunggu `#a8825f`. Skor `periksa.py` 100.
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
  - poster wajib ada (aturannya di bawah).
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
- **Gaya video:** gerak lambat dan kamera tenang. Tidak ada teks, watermark, atau transisi ramai di dalam video.
- **Bobot halaman:** muatan awal di bawah 3 MB, dan total dengan semua video paling banyak 12 MB.
- **Sumber:**
  - demo memakai Pexels Video (bebas untuk usaha), diperiksa visual satu per satu;
  - klien: video prewedding mereka dipotong menjadi 3–5 klip.
- **Musik:** instrumental piano, string, atau jazz lembut. Video tidak bersuara, dan musik latar tetap berjalan.

## 8. Susunan bagian

| No | Bagian | Isi dan catatan |
|---|---|---|
| 1 | Cover (kartu akses) | Nama tamu, nomor undangan, jumlah kursi, dan segel monogram yang dibuka dengan menekan dan menahan |
| 2 | Hero | Video berulang selebar layar, nama pasangan, tanggal |
| 3 | Pembuka | Salam singkat. Ayat atau kutipan opsional, satu kalimat saja |
| 4 | Mempelai | Potret editorial, nama lengkap, orang tua (opsional) |
| 5 | Kisah | Opsional. Paling banyak 3 titik waktu, masing-masing satu kalimat |
| 6 | Selingan sinematik | Video letterbox dan satu kutipan pendek |
| 7 | Acara | Format agenda: waktu, acara, tempat. Peta dan tombol tambah ke kalender |
| 8 | Dress code | Gaya busana (misalnya *black tie optional*) dan contoh warna |
| 9 | Info tamu | Parkir, hotel terdekat, kebijakan anak, protokol |
| 10 | Galeri | Campuran foto dan video dalam kisi editorial. Diketuk membuka tampilan Story layar penuh |
| 11 | Konfirmasi (RSVP) | Batas waktu, lalu konfirmasi bertahap (hadir, kursi, ucapan), lalu kartu masuk |
| 12 | Tanda kasih | Opsional dan diskret, tersembunyi di balik tombol |
| 13 | Penutup | Monogram, terima kasih, nomor undangan diulang |

Menu melayang tetap dipakai.

## 9. Bahasa dan nada

- Bahasa Indonesia baku yang ringkas. Versi dua bahasa (Indonesia dan Inggris) boleh untuk tamu internasional.
- Hindari kata berlebihan, emoji, dan tanda seru.
- Format konsisten: `Sabtu, 18 September 2027 · 16.00 WIB`.

## 10. Gerak

- Durasi 600–1.200 ms dengan perlambatan halus. Yang boleh: pudar, geser kecil, dan garis yang tergambar.
- Tidak ada pantulan, zoom besar, kelopak, partikel, atau kilau yang berkelip sendiri.
- Yang boleh: sorotan foil yang bergerak hanya karena tamu (HP dimiringkan, layar disentuh, segel ditahan), dan gerak yang terikat pada gulir di hero.
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
- [ ] `node tools/uji-interaksi.js <kode>` lulus semua: segel, hero, Story, konfirmasi dan kartu masuk, agenda hari H, tanpa error.
- [ ] Teks ringkas tanpa tanda seru.

## 13. Alur kerja

1. **Usulan singkat:** nama tema, mode terang atau gelap, dan konsep dalam satu paragraf. User menyetujui dulu.
2. **Palet:** halaman pilihan dengan minimal 3 opsi, salah satunya berlatar gelap. User memilih.
3. **Aset:** foto dan video (sumber dan lisensi), lalu dipotong, dikompres, dan diselaraskan warnanya.
4. **Membangun:** menyalin templat koleksi, mengisi `data.js`, dan menulis `tema.css`.
5. **Uji, katalog, tayang:** jalankan checklist, buat thumbnail, push, dan cek sampai tayang.

## 14. Fitur engine dan isian data.js

Sudah tersedia (15 Nov 2026). Contoh lengkap ada di `site/tema/modern-atelier/` (tema Atelier), dan folder itu juga menjadi templat koleksi.

| Isian `data.js` | Fungsi |
|---|---|
| `koleksi: "modern-klasik"` | Mengaktifkan gaya koleksi (`engine/modern-klasik.css`): garis lurus, tanpa ornamen, urutan bagian koleksi |
| `monogram: "A·R"` | Monogram di cover dan penutup |
| `undangan: { total, kursiBawaan, catatan }` | Nomor undangan `No. 048 / 150`, jumlah kursi, dan catatan privasi |
| Tautan tamu `?to=Nama&no=48&kursi=2` | Nama, nomor undangan, dan jumlah kursi per tamu. Tanpa `no`, nomor tidak ditampilkan |
| `video: { hero: { src, poster }, selingan: [{ src, poster, kutipan }] }` | Video hero berposter dan selingan letterbox |
| Item galeri `{ video, poster }` | Video di galeri, diputar saat terlihat. Lightbox ikut memutar video |
| `dressCode: { judul, teks, warna: [{ nama, hex }] }` | Bagian dress code dengan contoh warna |
| `infoTamu: [{ judul, teks }]` | Bagian info tamu |
| `batasKonfirmasi: "2027-11-20"` | Batas konfirmasi di bagian konfirmasi dan RSVP. Pilihan jumlah tamu dibatasi sesuai kursi |
| `tampilan.gelap` | Untuk tema bermode gelap, berisi bagian selingan berlatar terang. Tema membalik token warnanya di `.koleksi-modern-klasik .sec.gelap` |

Hadiah tampil diskret di balik tombol "Lihat Rekening & Alamat". Saat tamu memilih kurangi gerak atau hemat data, video tidak dimuat sama sekali.

**Alat uji video:** `node tools/uji-video.js <kode>` memeriksa 4 hal:
- video berputar dan bobot halaman;
- skenario kurangi gerak;
- skenario hemat data;
- poster hero di jaringan 3G.

**Belum dibuat:** versi dua bahasa (`bahasa: "id" | "en"`).

## 15. Interaksi koleksi

Semua interaksi ini otomatis aktif untuk tema dengan `koleksi: "modern-klasik"`. Setiap interaksi wajib punya jalan alternatif, supaya tidak ada tamu yang tertahan.

| No | Interaksi | Cara kerja | Jalan alternatif |
|---|---|---|---|
| 1 | Segel tekan-dan-tahan | Di cover, tamu menekan dan menahan monogram selama 1 detik. Lingkaran logam terisi, HP Android bergetar halus, lalu undangan terbuka. Ketukan singkat memunculkan pengingat "Tekan dan tahan" | Tombol keyboard (Enter atau spasi) langsung membuka |
| 2 | Kilau foil | Sorotan logam di nama dan nomor undangan bergerak mengikuti kemiringan HP (Android), sentuhan di cover, dan tahanan segel | Mati saat kurangi gerak. Tanpa interaksi, teks tampil polos |
| 3 | Hero sinematik | Video hero membesar sedikit dan meredup saat digulir. Label, nama, dan tanggal muncul bertahap setelah undangan dibuka | Saat kurangi gerak, semua langsung tampil tanpa gerak |
| 4 | Galeri Story | Mengetuk foto membuka tampilan layar penuh dengan garis waktu. Foto tampil 5 detik dan video 6 detik. Ketuk kanan untuk maju, ketuk kiri untuk mundur, tahan untuk jeda, geser ke bawah atau Esc untuk menutup | Panah kiri dan kanan di keyboard. Video diganti poster saat hemat data |
| 5 | Konfirmasi bertahap | Satu pertanyaan per layar: nama (bila tautan tanpa nama), hadir atau berhalangan, jumlah kursi (dibatasi sesuai undangan), dan ucapan. Hasilnya **kartu masuk** ber-QR yang bisa disimpan sebagai gambar (bagikan atau unduh) dan tetap tampil saat undangan dibuka ulang | Tombol "Kembali" di tiap langkah dan "Ubah jawaban" setelah selesai |
| 6 | Agenda hidup | Di hari H, acara diberi penanda "Sedang berlangsung", "Berikutnya" (24 jam ke depan), atau "Selesai". Tiap acara punya tombol Rute (Google Maps) dan Kalender | Demo atau uji dengan `&sekarang=2027-12-04T16:30` di tautan |

**Teks yang bisa diganti lewat `D.teks`:** `petunjukSegel`, `tombolRute`, `tombolKalender`, `sedangBerlangsung`, `acaraBerikutnya`, `acaraSelesai`, `tanyaNama`, `tanyaHadir`, `tanyaKursi`, `tanyaUcapan`, `tombolLanjut`, `tombolKembali`, `tombolKirim`, `ubahJawaban`, `kartuMasuk`, `kartuSiap`, `catatanKartu`, `simpanKartu`, `labelKursi`, `terimaBerhalangan`.

**Token tema untuk kartu masuk:** `--kartu-bg`, `--kartu-teks`, `--kartu-logam`. Kartu masuk sebaiknya selalu bergaya kartu akses gelap, juga pada tema bermode terang.

**Pustaka:** QR dibuat dengan `qrcode-generator` (MIT, `site/engine/vendor/qrcode.js`). Pustaka ini hanya dimuat saat kartu masuk ditampilkan.

