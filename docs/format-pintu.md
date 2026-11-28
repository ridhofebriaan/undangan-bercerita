# Format Pintu: aturan baku

Format ini dipakai untuk membuat beberapa undangan dengan pola yang sama seperti tema **Melayu** ([demo](https://ridhofebriaan.github.io/undangan-bercerita/tema/melayu/?to=Bapak%20Ahmad)). Tema Melayu menjadi **acuan dan templat**. Setiap undangan baru menyalin strukturnya, lalu mengganti palet, ornamen, huruf, foto, dan isi.

Aturan bersama yang tetap berlaku:
- warna mengikuti skill [warna-mewah](skills/warna-mewah/SKILL.md), termasuk aturan anti-krem;
- bingkai foto modern;
- foto wajib sesuai tema atau adat.

Lihat juga [kerangka undangan](kerangka-undangan.md) untuk prinsip umum.

## 1. Ciri khas format

Delapan ciri ini wajib ada di setiap undangan Format Pintu. Ciri-ciri inilah yang membuat undangannya terasa satu keluarga.

| No | Ciri | Wujud di tema Melayu |
|---|---|---|
| 1 | **Cover pintu** | Dua daun pintu bermotif ubin menutupi layar. Saat "Buka Undangan" ditekan, kedua daun bergeser ke samping seperti pintu dibuka |
| 2 | **Foto sampul berbingkai lengkung** di cover | Foto pasangan dalam lengkung (arch) di atas nama |
| 3 | **Sudut ornamen yang tergambar** | Ornamen sudut di cover dan kartu acara tergambar perlahan seperti ditulis tangan (animasi garis SVG) |
| 4 | **Hero foto penuh layar** | Foto pasangan setinggi layar dengan gradasi gelap di atas, nama besar huruf sambung, dan zoom sangat pelan |
| 5 | **Selang-seling gelap dan terang** | Bagian pembuka, hitung mundur, tanda kasih, dan penutup berlatar gelap bermotif ubin. Bagian lain terang |
| 6 | **Nama dan judul acara berhuruf sambung** | Nama pasangan, judul acara, dan judul kisah memakai huruf sambung yang anggun |
| 7 | **Kelopak berjatuhan** | Kelopak tiga warna berjatuhan pelan sepanjang halaman |
| 8 | **Galeri mozaik 12 foto** | Kisi 3 kolom: foto ke-1 besar (2×2), ke-7 lebar (3×2), ke-11 memanjang (2×1) |

## 2. Kapan memakai format ini

| Format | Cocok untuk | Ciri |
|---|---|---|
| **Format Pintu** (dokumen ini) | Undangan klasik yang hangat dan banyak foto, bisa bertema adat atau umum | Cover pintu, foto penuh, huruf sambung, kelopak |
| Kerangka v2 ([kerangka-undangan.md](kerangka-undangan.md)) | Undangan adat dengan ilustrasi toile dan banyak bagian | Lapisan ilustrasi, menu melayang, gaya foto bervariasi |
| Modern Klasik ([koleksi-modern-klasik.md](koleksi-modern-klasik.md)) | Pasangan profesional, kesan terbatas, foto dan video | Kartu akses bernomor, tanpa ornamen, interaktif |

Format Pintu memakai engine dasar (`engine/undangan.css` dan `engine/undangan.js`) **tanpa** `kerangka: true` dan tanpa `koleksi`.

## 3. Struktur folder

```
site/tema/<kode>/
  index.html     judul, meta WhatsApp (og:image alamat lengkap), huruf, CSS
  data.js        isi undangan (bagian 9)
  tema.css       token warna & huruf + gaya format (salin dari tema Melayu, lalu sesuaikan)
  ubin.svg       motif latar gelap dan pintu cover (48×48, diulang)
  tepi.svg       pita tepi bawah (32×28, diulang mendatar)
  sudut.svg      ornamen sudut, tergambar beranimasi (120×120)
  medali.svg     bunga/medali untuk pemisah, kartu ayat, pembuka, penutup (64×64)
  foto/          sampul, hero, wanita, pria, g01–g12
  KREDIT.md      sumber dan lisensi foto, ornamen, musik
```

Di tema Melayu, keempat SVG bernama `songket.svg`, `rebung.svg`, `sudut.svg`, dan `bunga.svg`. Undangan baru boleh memakai nama netral seperti di atas, asalkan `tema.css` merujuk nama yang sama.

`index.html` memuat CSS dengan jalur relatif `tema.css`. Jangan pakai `../../tema/melayu/tema.css`, karena undangan baru akan diam-diam memakai CSS Melayu.

## 4. Alur bagian

Urutan mengikuti engine dasar. Bagian bertanda (opsional) muncul hanya bila isiannya ada.

| No | Bagian | Latar | Isi | Gerak |
|---|---|---|---|---|
| 1 | Cover | Pintu gelap bermotif ubin | Sudut tergambar, foto sampul lengkung, label, nama satu baris, tanggal, nama tamu, tombol emas, pita tepi bawah | Isi naik bertahap, nama muncul dari kabur, pintu terbuka ke samping |
| 2 | Hero | Foto penuh dengan gradasi gelap | Label, nama besar bersusun, tanggal, tagar, pita tepi bawah | Foto zoom sangat pelan, nama muncul dari kabur |
| 3 | Salam dan ayat | Terang | Bismillah, salam, teks, kartu ayat dengan medali di atasnya | Muncul saat digulir |
| 4 | Pembuka (opsional) | Gelap bermotif ubin | Medali berputar pelan, judul huruf sambung, doa singkat | Medali berputar 40 detik per putaran |
| 5 | Mempelai | Terang | Foto lengkung, nama, orang tua, Instagram, "&" huruf sambung | Foto wanita masuk dari kiri, pria dari kanan, foto zoom keluar |
| 6 | Hitung mundur | Gelap bermotif ubin | Empat kotak angka, tombol simpan ke kalender | |
| 7 | Acara | Terang | Kartu acara dengan dua sudut ornamen, judul acara huruf sambung, tombol lokasi, peta | Kartu muncul seperti terlipat lalu terbuka |
| 8 | Kisah (opsional) | Terang | Garis waktu berpenanda belah ketupat, judul huruf sambung | Masuk dari kiri |
| 9 | Galeri | Terang | Mozaik 12 foto dan lightbox | Foto membesar dari 92%, berurutan |
| 10 | Ucapan dan RSVP | Terang | Formulir, daftar ucapan | |
| 11 | Tanda kasih (opsional) | Gelap bermotif ubin | Kartu rekening dan alamat kado, tombol salin | |
| 12 | Penutup | Gelap bermotif ubin | Medali berputar, teks penutup, salam, nama huruf sambung, pita tepi bawah | |

Musik berjalan setelah undangan dibuka, dan kelopak berjatuhan di seluruh halaman.

## 5. Komponen dan gaya (dari `tema.css` Melayu)

Salin `site/tema/melayu/tema.css` sebagai titik awal. Bagian-bagian berikut adalah inti format, jadi strukturnya dipertahankan dan hanya warna, ukuran, serta berkasnya yang diganti.

- **Pintu cover:**
  - `.cover::before` dan `.cover::after` adalah dua daun selebar 50% berlatar `var(--dark) url("ubin.svg")`, dengan transisi 0,95 detik;
  - `.cover.opened::before` bergeser `translateX(-101%)` dan `::after` bergeser `translateX(101%)`;
  - isi cover memudar dan sedikit mengecil saat terbuka.
- **Variasi arah pintu (boleh):**
  - dua daun ke samping (bawaan);
  - dua daun atas-bawah: `top/bottom` 50% dan `translateY(∓101%)`;
  - satu daun bergeser ke atas;
  - dua daun berayun ke dalam (3D): `.cover { perspective: 1500px; --buka-ms: 1350 }`, `transform-origin` di tepi luar, `rotateY(±105deg)`, `backface-visibility: hidden`, dan opacity baru turun di akhir (tunda 0,95 detik) supaya ayunannya terlihat.
- **Sudut tergambar:** `sudut.svg` memuat `<style>` sendiri. Garis memakai `stroke-dasharray` lalu animasi `draw` selama 2,4 detik, titik-titik muncul setelahnya, dan semuanya hormat pada `prefers-reduced-motion`. Dipakai di sudut cover (`.orn-cover::before/::after`, 104 px) dan sudut kartu acara (`.event::before/::after`, 58 px).
- **Pita tepi:** `tepi.svg` diulang mendatar di bawah cover, hero, dan penutup (tinggi 28 px).
- **Hero:** `.sec-hero` setinggi `100svh`. `.has-photo .photo-bg::after` memberi gradasi gelap dari atas (92%) ke tengah (0%) lalu sedikit gelap di bawah. Animasi `slow-zoom` berdurasi 18 detik.
- **Nama muncul dari kabur:** animasi `blur-in` (kabur 10 px ke tajam, jarak huruf merapat) di cover dan hero.
- **Galeri mozaik:** `grid-template-columns: repeat(3, 1fr)`, `grid-auto-rows: min(27vw, 136px)`, `grid-auto-flow: dense`. Foto ke-1 `span 2 / span 2`, ke-7 `span 3 / span 2`, ke-11 `span 2`.
- **Kelopak:** `data.js` berisi `kelopak: 16` (0 = mati, maksimal 28). Tiga warna diatur di `.petal.p0/.p1/.p2`. Kelopak mati otomatis saat tamu memilih kurangi gerak.
- **Kurangi gerak:** blok `@media (prefers-reduced-motion: reduce)` di akhir `tema.css` wajib ada. Blok ini mematikan semua animasi dekoratif dan transisi pintu.

## 6. Yang divariasikan per undangan

Supaya beberapa undangan Format Pintu tidak terlihat kembar, setiap undangan wajib berbeda di minimal **lima** dari daftar berikut:

| Elemen | Cara mengganti | Contoh |
|---|---|---|
| Palet | Token `:root` di `tema.css`, lolos `periksa.py` | Hijau diraja, biru tua, marun, ungu, hijau zaitun |
| Motif ubin | `ubin.svg` digambar sendiri | Songket, kawung, ikat, tumpal, geometris Art Deco |
| Pita tepi | `tepi.svg` | Pucuk rebung, gunungan kecil, gelombang, tumpal |
| Sudut | `sudut.svg` | Awan larat, sulur, garis Art Deco |
| Medali | `medali.svg` | Bunga cengkih, melati, teratai, bintang delapan |
| Huruf | Tiga peran: judul kapital, nama huruf sambung, teks serif | Cinzel + Alex Brush + Lora (Melayu); Marcellus + Great Vibes + Cormorant; Cormorant SC + Parisienne + EB Garamond |
| Arah pintu | Lihat bagian 5 | Samping, atas-bawah, satu daun |
| Bentuk bingkai | Lengkung (bawaan) atau oval | |
| Warna kelopak | `.petal.p0/.p1/.p2` | Selaras logam dan netral palet |
| Bagian gelap | Selektor `.sec-pembuka, .sec-countdown, .sec-hadiah` | Boleh menambah `.sec-kisah` |

Ornamen digambar sendiri dalam satu warna logam palet. Tidak boleh menyalin motif dari undangan lain.

## 7. Aturan bersama (berlaku juga di format ini)

- **Warna:**
  - wajib lolos `python3 docs/skills/warna-mewah/periksa.py` dengan skor ≥ 85;
  - latar terang bawaannya netral pucat berona palet. Krem seperti tema Melayu **sesekali boleh**: jangan dipakai di dua undangan baru berturut-turut, dan paling banyak sepertiga tema di katalog;
  - logam paling banyak 10% layar.
- **Bingkai foto:** bawaannya modern, yaitu lengkung dengan bayangan halus atau satu garis tipis 1 px warna logam. Cincin ganda seperti tema Melayu (`box-shadow` berlapis) **sesekali boleh**: jangan dipakai di dua undangan berturut-turut, dan paling banyak sepertiga undangan Format Pintu.
- **Foto sesuai tema:** undangan bertema adat wajib memakai foto berbusana adat yang sama. Undangan umum memakai foto pasangan yang serasi dengan suasananya.
- **Aset legal:** foto dari Pexels atau Unsplash (bebas untuk usaha) atau foto klien. Ornamen digambar sendiri. Musik bebas lisensi. Semuanya dicatat di `KREDIT.md`.
- **Zona waktu** acara diisi lewat `zonaWaktu` (WIB, WITA, atau WIT).

## 8. Kebutuhan foto

| Berkas | Dipakai di | Rasio | Lebar simpan |
|---|---|---|---|
| `sampul.jpg` | Bingkai lengkung cover | 3:4 tegak | 600 px |
| `hero.jpg` | Hero penuh layar | Tegak 2:3 atau 9:16, wajah di sepertiga atas, titik fokus sekitar 60% | 1200 px |
| `wanita.jpg`, `pria.jpg` | Bingkai lengkung mempelai | 3:4, wajah di tengah atas | 600 px |
| `g01`–`g12` | Galeri mozaik | Urutan di `data.js`: ke-1 hampir persegi, ke-7 lebar 3:2, ke-11 lebar 2:1, sisanya bebas (dipotong persegi) | 900 px |

Total semua foto paling banyak sekitar 2,5 MB, sehingga muatan awal tanpa musik tetap di bawah 3 MB. Potong dan kecilkan foto dengan `node tools/potong.js jobs.json`, dan pilih foto dengan `node tools/lembar.js`.

## 9. Isian `data.js`

| Isian | Wajib | Keterangan |
|---|---|---|
| `id`, `label`, `judul`, `hashtag` | Ya | `id` unik, `judul` jadi judul tab |
| `agama`, `zonaWaktu` | Ya | `agama` mengatur bismillah dan salam |
| `foto: { sampul, hero }` | Ya | Bagian 8 |
| `kelopak` | Ya | Jumlah kelopak (disarankan 12–18) |
| `pasangan` | Ya | `urutan`, serta `wanita` dan `pria` (`panggilan`, `nama`, `ortu`, `foto`, `instagram`) |
| `salam`, `ayat` | Ya | `ayat: { arab, sloka, arti, sumber }`. `sloka` (teks latin miring, misalnya Sanskerta) untuk Hindu. Untuk agama lain, ganti dengan kutipan kitab yang sesuai |
| `pembuka: { judul, teks }` | Opsional | Bagian gelap kedua |
| `teksAcara`, `acara[]` | Ya | `acara`: `nama`, `mulai`, `selesai`, `tempat`, `alamat`, `peta`, `utama` |
| `kisah[]` | Opsional | `waktu`, `judul`, `teks` |
| `galeri[]` | Ya | Tepat 12 foto, urutan menentukan mozaik |
| `hadiah[]`, `alamatKado` | Opsional | |
| `musik` | Ya | `../../assets/musik/<berkas>.m4a` |
| `penutup`, `contohUcapan[]` | Ya | |
| `teks: { ... }` | Opsional | Mengganti teks bawaan, misalnya `kepada`, `tombolBuka`, `dariKami` |

## 10. Langkah membuat undangan baru

1. **Usulan singkat:** nama undangan, suasana, dan tema adat atau umum dalam satu paragraf. Tunggu persetujuan.
2. **Palet:** halaman pilihan berisi minimal 3 opsi (salah satunya berlatar gelap), dicek dengan `periksa.py`. Simpan pilihan user ke memori.
3. **Salin templat:** `cp -R site/tema/melayu site/tema/<kode>`, lalu hapus foto lama.
4. **Ornamen:** gambar `ubin.svg`, `tepi.svg`, `sudut.svg`, dan `medali.svg` baru sesuai tema. Pratinjau di atas latar gelap dan terang sebelum dipakai.
5. **`tema.css`:**
   - ganti token `:root` dan nama berkas SVG;
   - pilih bingkai: modern (bawaan) atau cincin ganda bila undangan sebelumnya tidak memakainya;
   - pilih variasi dari bagian 6.
6. **Foto:** cari dan potong sesuai bagian 8, lalu catat di `KREDIT.md`.
7. **Musik:** user menaruh berkas di `site/assets/musik/`, lalu dikonversi dengan `afconvert -f m4af -d aac -b 112000 masuk.mp3 keluar.m4a`. Berkas mp3 mentah tidak di-commit.
8. **`data.js` dan `index.html`:** isi data, judul, deskripsi, `og:image` beralamat lengkap `https://ridhofebriaan.github.io/undangan-bercerita/assets/katalog/<kode>.jpg`, dan huruf Google Fonts.
9. **Uji:** jalankan `cd site && python3 -m http.server 8765`, lalu `node tools/uji.js <keluaran> <kode>` dan `node tools/hd.js <awalan> <kode> salam mempelai acara galeri penutup`.
10. **Katalog dan tayang:** tambah entri `site/katalog.js`, buat thumbnail cover 360×740 @1,5× (JPG dan WebP) di `site/assets/katalog/`, lalu commit, push, dan cek sampai tayang.

## 11. Undangan Format Pintu yang sudah ada

Cek tabel ini sebelum membuat undangan baru, supaya minimal 5 elemen berbeda dan krem atau cincin ganda tidak dipakai berturut-turut.

| Undangan | Palet | Ubin / tepi / sudut / medali | Huruf (judul, nama, teks) | Pintu | Bingkai | Latar terang |
|---|---|---|---|---|---|---|
| Melayu | Hijau diraja + emas | Songket / pucuk rebung / awan larat / bunga cengkih | Cinzel, Alex Brush, Lora | Samping | Cincin ganda | Krem |
| Gorga Toba (Batak) | T9 Merah Karat Gorga: merah karat, hitam, putih, emas | Gorga spiral / ipon-ipon / spiral bersulur / Desa Na Ualu | Forum, Allura, Crimson Pro | Atas-bawah | Modern 1 px | Abu putih |
| Kori Agung (Bali) | B1 Hitam Poleng: hitam hangat, abu putih, abu batu, emas prada | Poleng + patra punggel / pita poleng / undakan pura + patra / bunga jepun | Marcellus, Pinyon Script, EB Garamond | Berayun 3D ke dalam | Modern berbayang (sampul 1 px) | Abu putih `#eae9e6` |

Bagian gelap Gorga Toba selang-seling: merah (pembuka, tanda kasih) dan hitam (hitung mundur, penutup).

Kori Agung: semua bagian gelap hitam poleng; teks hero diletakkan di bawah (wajah dan pintu pura berukir tetap terlihat); agama Hindu dengan sloka Manawa Dharmasastra.

## 12. Checklist sebelum tayang

- [ ] Kedelapan ciri khas (bagian 1) ada dan berfungsi: pintu terbuka, sudut tergambar, nama muncul dari kabur, kelopak berjatuhan, mozaik 12 foto.
- [ ] Minimal lima elemen berbeda dari undangan Format Pintu lain (bagian 6).
- [ ] Palet lolos `periksa.py` (≥ 85). Krem dan cincin ganda hanya sesekali: tidak berturut-turut, dan paling banyak sepertiga.
- [ ] Foto sesuai tema atau adat, dan `KREDIT.md` lengkap.
- [ ] `index.html` memuat `tema.css` relatif, dan `og:image` beralamat lengkap ke `undangan-bercerita`.
- [ ] Uji di lebar 360 px: tanpa error, tanpa geser ke samping, tombol ≥ 44 px.
- [ ] Muatan awal tanpa musik di bawah 3 MB.
- [ ] Saat kurangi gerak: pintu, kelopak, dan animasi mati, tapi semua isi tetap tampil.
- [ ] Jam acara memakai zona waktu yang benar.
