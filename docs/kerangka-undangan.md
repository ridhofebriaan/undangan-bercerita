# Kerangka Undangan Digital RB Digital

Dokumen ini adalah standar baku untuk semua undangan RB Digital. Setiap undangan baru wajib mengikuti kerangka ini. Yang boleh berbeda antarundangan hanya **paket aset** (ilustrasi, ornamen, palet, huruf) dan **gaya foto**.

- **Acuan struktur:** [our-wedding.link/design/traditional-minang](https://our-wedding.link/design/traditional-minang). Yang diambil hanya alur, komponen, dan prinsip tata letaknya. Ilustrasi, foto, teks, dan kode milik mereka **tidak** disalin.
- **Status:** versi 1, 13 November 2026.

## 1. Prinsip

1. **Mewah datang dari aset dan komposisi, bukan dari efek.** Ilustrasi berkualitas, foto yang baik, palet yang konsisten, dan lapisan yang tertata lebih penting daripada animasi berat.
2. **Kerangka tetap, gaya berganti.** Alur bagian dan komponen selalu sama, sehingga kualitas terjaga. Karakter tiap adat datang dari paket asetnya.
3. **Satu tangan, satu gulir.** Dirancang untuk HP dan dibaca dengan satu jempol. Desktop menampilkan kolom yang sama di tengah layar.
4. **Hormat pada adat dan agama.** Istilah, salam, doa, dan urutan acara mengikuti adat dan agama pasangan.
5. **Aset harus sah.** Hanya aset buatan sendiri, domain publik, CC0, atau CC-BY (nama pembuat dicantumkan). Lisensi NonCommercial dilarang karena undangan dijual.

## 2. Alur bagian

Urutan tetap. Bagian opsional boleh dihilangkan, tetapi urutan sisanya tidak diubah.

| # | Bagian | Status | Isi | Data dari klien |
|---|---|---|---|---|
| 1 | Cover | Wajib | Label acara, nama pasangan, tanggal, nama tamu dari link, tombol "Buka Undangan" | Nama panggilan, tanggal acara utama |
| 2 | Hero | Wajib | Foto utama pasangan dalam bingkai, nama, tanggal, tagar | 1 foto utama, tagar (opsional) |
| 3 | Ayat / doa | Wajib | Kutipan sesuai agama, dengan terjemahan dan sumber | Pilihan ayat atau doa |
| 4 | Mempelai | Wajib | Foto, nama lengkap dan gelar, peran adat, orang tua, Instagram | 2 foto, nama lengkap, nama orang tua, Instagram |
| 5 | Kisah cinta | Opsional | 3–4 kartu cerita (judul, waktu, teks, foto) | Cerita singkat dan foto per tahap |
| 6 | Galeri momen | Opsional | Kumpulan foto dengan gaya galeri terpilih, plus kutipan pendek | 6–12 foto |
| 7 | Save the date | Wajib | Hitung mundur, simpan ke kalender, tombol pengingat | Tanggal dan jam acara utama |
| 8 | Acara | Wajib | Kartu per acara (nama, hari, jam, tempat, alamat, tombol lokasi), peta | Daftar acara, tempat, alamat, titik peta |
| 9 | RSVP & turut mengundang | Wajib | Jumlah tamu yang sudah konfirmasi, tombol RSVP, daftar keluarga yang turut mengundang | Daftar "turut mengundang" |
| 10 | Live streaming | Opsional | Teks pengantar dan tombol tautan siaran | Link siaran |
| 11 | Amplop & kado | Opsional | Rekening dengan tombol salin, alamat kado dengan tombol salin | Bank, nomor, nama, alamat |
| 12 | Ucapan & doa | Wajib | Daftar ucapan dan formulir (nama, kehadiran, jumlah, ucapan) | Tidak ada |
| 13 | Penutup | Wajib | Kalimat terima kasih, salam penutup, nama pasangan, kredit RB Digital | Kalimat penutup (opsional) |

## 3. Komponen standar

| Komponen | Aturan |
|---|---|
| **Bingkai foto** | Bentuk mengikuti gaya foto terpilih (lihat bagian 5). Garis tepi tipis dengan warna aksen. |
| **Kartu** | Latar warna terang dengan sudut membulat (16–28 px) dan bayangan halus. Dipakai untuk ayat, acara, kado, dan formulir. |
| **Sambungan antarbagian** | Bagian gelap dan terang bergantian, dipisah kurva atau lengkung, tidak dipotong garis lurus. |
| **Ornamen tepi** | Juntaian atau rumbai khas adat di sisi kiri dan kanan layar, terutama di bagian gelap. |
| **Menu melayang** | Bilah di bawah layar dengan 5 pintasan: Mempelai, Galeri, Tanggal, Lokasi, Ucapan. Bagian yang sedang dibaca disorot. Muncul setelah undangan dibuka. |
| **Tombol** | Bentuk pil. Tombol utama berwarna penuh, tombol kedua bergaris tipis. Tinggi minimal 44 px. |
| **Tombol musik** | Bulat di pojok kanan bawah, di atas menu melayang, dan berputar saat musik menyala. |
| **Judul bagian** | Subjudul kecil berhuruf kapital renggang, lalu judul besar berhuruf serif tipis, lalu pemisah ornamen. |

## 4. Sistem visual

### 4.1 Tiga lapisan

1. **Lapis belakang:** ilustrasi pemandangan satu warna bergaya ukiran atau etsa (rumah adat, alam, satwa, flora), dengan latar kertas bertekstur.
2. **Lapis tengah:** konten, yaitu foto, kartu, dan teks.
3. **Lapis depan:** ornamen yang sengaja menimpa sebagian tepi foto atau kartu, misalnya ilustrasi rumah adat di bawah foto hero atau bunga di sudut kartu. Lapisan inilah yang memberi kesan berlapis dan mewah.

### 4.2 Warna

Mengikuti skill **warna-mewah** ([`docs/skills/warna-mewah/`](skills/warna-mewah/SKILL.md)), yang berisi riset, aturan terukur, pustaka palet, dan alat pemeriksa.

- **Komposisi 3–4 warna:**
  - satu jangkar gelap yang dalam dan tidak mencolok (contoh Minang: merah marun);
  - satu netral hangat untuk latar dan kartu (gading atau krem, bukan putih murni);
  - satu aksen kalem (contoh: hijau sage);
  - emas antik atau sampanye.
- **Proporsi 60-30-10:** netral 60%, jangkar gelap 30%, aksen dan emas paling banyak 10% luas layar. Emas dipakai sebagai kilau tipis (garis, nama, ikon), bukan blok.
- **Dilarang:** warna neon atau terang mencolok, emas kuning datar (#FFD700), putih atau hitam murni, lebih dari 2 keluarga rona berwarna, dan latar polos tanpa tekstur.
- Bagian gelap dan terang bergantian sepanjang halaman.
- Kontras teks minimal 4,5:1 (WCAG AA).
- **Wajib lolos pemeriksa** dengan skor ≥ 85:

  ```
  python3 docs/skills/warna-mewah/periksa.py gelap=#.. terang=#.. aksen=#.. emas=#.. teks=#.. --teks teks:terang
  ```

- **Alur memilih:** saya usulkan 3 palet yang lolos pemeriksa, user memilih, dan pilihan itu menjadi patokan berikutnya.

### 4.3 Huruf

- **Judul:** satu huruf serif tipis yang elegan.
- **Isi:** satu huruf yang mudah dibaca, minimal 15 px.
- **Nama pasangan:** boleh huruf sambung atau serif besar.
- Maksimal 3 jenis huruf per undangan. Huruf tambahan hanya untuk aksara daerah atau Arab.

### 4.4 Ruang

- Banyak ruang kosong. Teks rata tengah, paragraf pendek.
- Lebar konten maksimal 480 px, dengan jarak tepi minimal 16 px di HP.

## 5. Gaya foto (variabel per undangan, bahkan per bagian)

Setiap undangan memilih kombinasi dari tiga daftar di bawah. Hero, profil, kisah, dan galeri boleh memakai gaya berbeda dalam satu undangan.

**Bentuk bingkai**

| Kode | Bentuk |
|---|---|
| `lengkung` | Lengkung atas (arch) |
| `oval` | Oval tegak |
| `lingkaran` | Lingkaran |
| `persegi` | Persegi bersudut tumpul |
| `siluet` | Siluet adat (gonjong, gunungan, candi bentar, dan lainnya) |
| `polaroid` | Polaroid miring dengan bayangan |
| `sobek` | Tepi kertas sobek |
| `penuh` | Tanpa bingkai, penuh layar dengan gradasi ke latar |

**Tata letak galeri**

| Kode | Tata letak |
|---|---|
| `kisi` | Kisi rapi 2–3 kolom |
| `mozaik` | Mozaik besar-kecil |
| `carousel` | Digeser ke samping |
| `cerita` | Slide penuh layar seperti Instagram Story |
| `berserak` | Polaroid berserakan |
| `film` | Pita film |

**Cara foto muncul**

| Kode | Gerak |
|---|---|
| `zoom` | Zoom pelan |
| `parallax` | Bergerak lebih lambat dari scroll |
| `tirai` | Tersingkap dari bawah ke atas |
| `mekar` | Muncul dari tengah bingkai |
| `balik` | Berbalik seperti kartu |

Contoh kombinasi:
- **Minang:** hero `siluet` gonjong + `parallax`, profil `oval`, galeri `carousel`.
- **Jawa:** hero `penuh` + `zoom`, profil `lengkung`, galeri `berserak`.

## 6. Paket aset per adat

Hanya bagian ini yang dibuat baru untuk setiap undangan.

| Slot | Isi | Contoh Minang |
|---|---|---|
| Ilustrasi latar | Pemandangan dengan rumah adat dan alam khas, satu warna | Rumah gadang, air terjun, palem |
| Satwa / flora | 1–2 elemen ikonik untuk lapis depan | Merak, anthurium |
| Ornamen tepi | Juntaian atau rumbai khas | Rumbai songket |
| Pemisah judul | Motif kecil khas | Saik galamai |
| Palet | Gelap, terang, aksen | Merah marun, krem, hijau sage |
| Huruf | Judul, isi, nama | Serif tipis, huruf isi, sambung atau serif |
| Musik | Instrumental bernuansa daerah, berlisensi bebas | Talempong atau saluang |
| Teks adat | Istilah, salam, doa, nama acara | Anak Daro, Marapulai, Baralek, Malam Bainai |

Sumber aset yang diizinkan, berurutan dari yang paling diutamakan:
1. Buatan sendiri, misalnya SVG atau lukisan prosedural.
2. Ilustrasi ukiran domain publik (buku lama), diwarnai ulang.
3. CC0.
4. CC-BY, dengan nama pembuat dicantumkan di kredit penutup.

Riset warna, motif, prosesi, dan istilah per adat ada di [`riset/panduan-adat.md`](../riset/panduan-adat.md).

## 7. Gerak dan interaksi standar

- **Cover ke hero:** transisi halus 0,8–1,5 detik (memudar, tirai, atau pintu sesuai tema).
- **Muncul saat scroll:** setiap bagian muncul bertahap. Gerakannya pendek dan halus, tidak memantul berlebihan.
- **Parallax:** lapis belakang dan lapis depan bergerak sedikit berbeda dari konten.
- **Menu melayang:** sorotan berpindah mengikuti bagian yang terlihat. Mengetuk ikon menggulir halus ke bagian itu.
- **Musik:** mulai saat undangan dibuka, dengan suara naik perlahan. Berhenti saat tab ditinggalkan.
- **Kurangi gerak:** bila pengguna mengaktifkan pengaturan "kurangi gerakan" di HP, semua animasi dimatikan dan konten tetap tampil.

## 8. Standar kualitas (wajib lolos sebelum dirilis)

- [ ] Tampil benar di lebar 360 px dan 390 px, tanpa geser ke samping.
- [ ] Semua tombol minimal 44 px.
- [ ] Kontras teks minimal 4,5:1.
- [ ] Palet lolos `periksa.py` (skor ≥ 85), emas ≤ 10% layar, dan tidak ada latar polos.
- [ ] Tidak ada error di konsol, dan tidak ada file yang gagal dimuat.
- [ ] Siap dalam kurang dari 3 detik di HP kelas menengah. Ukuran total di bawah 3 MB tanpa musik.
- [ ] Nama tamu dari link tampil benar, termasuk nama panjang.
- [ ] Hitung mundur, kalender, peta, salin rekening, RSVP, dan musik berfungsi.
- [ ] Pratinjau link WhatsApp (judul, deskripsi, gambar) tampil.
- [ ] Semua aset tercatat lisensinya, dan kredit CC-BY tercantum.
- [ ] Istilah adat dan teks agama sudah diperiksa.

## 9. Kesenjangan dengan engine saat ini

**Sudah ada:** cover dan nama tamu, ayat, mempelai, kisah, galeri dengan lightbox, hitung mundur dan kalender, acara dan peta, RSVP (masih tersimpan di perangkat), amplop dan salin, ucapan, musik, kurangi gerak.

**Perlu ditambah:**
1. Menu melayang dengan sorotan bagian aktif.
2. Bingkai foto dan gaya galeri sebagai pilihan (bagian 5).
3. Sistem tiga lapisan dengan slot aset (bagian 4.1 dan 6).
4. Sambungan lengkung antarbagian dan ornamen tepi.
5. Jumlah tamu yang sudah konfirmasi, serta daftar "turut mengundang".
6. Bagian live streaming.
7. Tombol pengingat di save the date.
8. Kartu kisah cinta dengan foto.
9. RSVP dan ucapan tersimpan di server (Google Sheets), agar terlihat oleh semua tamu.

Rencana pengembangan untuk menutup kesenjangan ini dibuat terpisah.
