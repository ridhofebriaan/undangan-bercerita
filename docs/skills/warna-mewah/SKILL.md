---
name: warna-mewah
description: Membedakan warna/palet yang terkesan mewah dan yang terkesan murah, lalu memilih atau memperbaiki palet untuk desain premium (undangan pernikahan, katalog, brand). Gunakan saat memilih palet, menilai tangkapan layar desain, atau ketika user bilang hasil "kurang mewah", "terlihat murah", "polos", atau minta kesan "elegan/premium/luxury".
---

# Warna Mewah

Panduan dan alat untuk menilai apakah sebuah palet terasa **mewah** atau **murah**, berdasarkan riset persepsi warna dan praktik desain merek premium. Skill ini tidak menggantikan selera user: hasil akhirnya selalu dikonfirmasi ke user, dan pilihannya disimpan sebagai patokan.

## Dasar riset (ringkas)

1. **Saturasi rendah = status lebih tinggi.** Tujuh studi eksperimen dan lapangan (Zhou, Xiao, Yoon & Zhu) menemukan bahwa warna bersaturasi rendah meningkatkan persepsi status merek mewah, lewat kesan "berwarisan/abadi". Pengecualian: merek yang menonjolkan inovasi baru.
2. **Gelap = berbobot.** Warna logo yang lebih gelap dikaitkan dengan dominasi dan persepsi mewah. Warna jenuh tinggi menurunkan rasa senang dan kesan mewah (penelitian tesis, anggap sebagai indikasi).
3. **Sedikit warna = percaya diri.** Panduan merek mewah sepakat bahwa palet terdiri dari 3–4 warna: satu jangkar gelap, satu logam, dan satu atau dua netral. Terlalu banyak warna terasa kacau atau murah.
4. **Emas sedikit saja.** Emas efektif dalam skala kecil. Ketika mendominasi, emas tidak lagi menandakan keahlian dan hanya terbaca sebagai dekorasi.
5. **Putih yang mahal tidak pernah putih murni.** Netral mewah punya sedikit kehangatan (gading, krem, putih tulang). Versi "dasar" dari sebuah warna cenderung terlihat murah.
6. **Hierarki.** Palet mahal menciptakan urutan yang jelas: satu warna utama, satu pendukung, satu aksen yang dipakai hemat.

Sumber ada di bagian akhir.

## Aturan terukur (OKLCH: L = terang 0–1, C = saturasi, h = rona)

| Aturan | Mewah | Murah / perlu dirapikan |
|---|---|---|
| Saturasi warna terang | C ≤ 0.15 | C > 0.15 dan L > 0.6 (dan neon bila C > 0.20) |
| Jangkar gelap | L < 0.42, C 0.04–0.15 (nada permata) | Tidak ada nada gelap, atau gelap yang terlalu jenuh (C > 0.17) |
| Netral latar | L > 0.88, C 0.005–0.04 (gading/krem) | Putih murni #FFFFFF, atau latar terang yang terlalu berwarna (C > 0.05) |
| Hitam | Hitam hangat (sedikit cokelat/hijau/biru) | Hitam murni #000000 |
| Emas | Antik/sampanye: h 50–100°, C 0.06–0.13, L 0.6–0.82 | Emas kuning terang (#FFD700, C > 0.15) |
| Jumlah warna | 3–4 | Lebih dari 5 |
| Keluarga rona berwarna | 1–2 (di luar netral dan emas) | 3 atau lebih |
| Kontras teks | ≥ 4.5:1 | < 4.5:1 |

Jalankan pemeriksa:

```
python3 ~/.claude/skills/warna-mewah/periksa.py gelap=#6b1d24 terang=#f3eadb aksen=#8a9a82 emas=#b8975a teks=#2e2420 --teks teks:terang
```

Peran yang dikenali: `gelap`, `terang`, `aksen`, `emas`, `teks`, dan nama lain. Hasilnya berupa skor dan putusan:
- 85 atau lebih: **MEWAH**
- 65–84: **CUKUP, PERLU DIRAPIKAN**
- di bawah 65: **TIDAK MEWAH**

## Warna mewah juga soal penerapan

Palet yang lolos pemeriksa bisa tetap terlihat murah kalau penerapannya salah. Ini kesalahan yang pernah terjadi di proyek undangan (dikritik user: "background polos", "terlalu banyak emas").

- **Proporsi 60-30-10:** netral 60%, jangkar gelap 30%, aksen dan emas paling banyak 10% dari luas layar.
- **Emas sebagai kilau, bukan blok:** pakai gradasi emas tipis (gelap, terang, gelap) pada garis, huruf nama, atau ikon kecil. Jangan tombol besar atau latar emas penuh.
- **Tekstur, bukan bidang polos:** latar besar diberi tekstur halus (kertas, linen, ilustrasi satu warna yang samar) supaya tidak terasa datar.
- **Satu warna utama yang tegas:** jangkar gelap dipakai berani di beberapa bagian (selang-seling gelap dan terang), bukan disebar tipis di mana-mana.
- **Ornamen hemat:** satu motif khas yang diulang konsisten lebih mewah daripada banyak ornamen berbeda.
- **Huruf ikut menentukan:** serif tipis dengan spasi lega terasa mahal; huruf tebal dan rapat terasa promosi.

## Proses kerja

1. Tentukan suasana (contoh: adat Minang, malam, keraton) dan pilih atau susun **3 kandidat palet** dari pustaka di bawah. Sesuaikan bila perlu.
2. Jalankan `periksa.py` untuk setiap kandidat. Perbaiki sampai skor ≥ 85.
3. Tunjukkan ketiganya ke user sebagai contoh warna, dan sebutkan skor serta alasannya singkat.
4. User memilih. **Simpan pilihan user ke memory** sebagai patokan selera ("palet yang disukai: ...").
5. Saat menilai desain jadi, ambil tangkapan layar dan periksa:
   - proporsi emas ≤ 10%;
   - latar tidak polos;
   - hanya ada 1–2 keluarga rona;
   - teks kontras.

## Pustaka palet terverifikasi (semua skor 100 di `periksa.py`)

| Nama | Gelap | Terang | Aksen | Emas | Cocok untuk |
|---|---|---|---|---|---|
| Marun Toile | `#6b1d24` | `#f3eadb` | `#8a9a82` sage | `#b8975a` | Minangkabau, Palembang |
| Sogan Keraton | `#4f3322` | `#efe4d0` | `#1f1a16` hitam hangat | `#b08d57` | Jawa (Solo/Yogya) |
| Zamrud Diraja | `#143d33` | `#f5efe2` | — | `#c2a061` | Melayu, Aceh, Banjar |
| Navy Sampanye | `#1c2a44` | `#f2ece0` | `#e8dcc4` sampanye | `#b89b5e` | Nasional, modern formal |
| Plum Malam | `#3b1f33` | `#f4ebe7` | `#ead7d3` blush | `#b98673` rose gold | Malam, romantis |
| Mocha Gading | `#5e4537` | `#f6f0e6` | `#d8c3a0` | `#b8a07a` | Quiet luxury, minimalis |
| Batu Bali | `#2f4d40` | `#f6f2ea` | `#d9d0bf` batu paras | `#b39257` | Bali, tropis |
| Hitam Emas | `#17130f` | `#efe6d6` | — | `#c5a35f` | Keraton malam, wayang |

## Tanda bahaya cepat (tanpa alat)

- Ada warna yang "menyala" di layar HP (merah cabai, pink fanta, hijau stabilo, biru elektrik).
- Emas tampak kuning seperti stiker.
- Putih terasa silau.
- Lebih dari dua warna menonjol dalam satu layar.
- Semua bagian berlatar satu warna rata tanpa tekstur atau ilustrasi.
- Ornamen dan emas ada di setiap sudut.

## Sumber

- [Zhou dkk., saturasi warna dan warisan merek mewah](https://libraries.escp.eu/doc/bth/192754203)
- [Pengaruh warna logo pada emosi dan persepsi mewah (Univ. Dundee)](https://discovery.dundee.ac.uk/en/studentTheses/the-influence-of-brands-logo-colours-on-consumer-emotions-and-lux/)
- [Atlantis Press, warna dalam pemasaran video merek mewah](https://www.atlantis-press.com/article/126021742.pdf)
- [Luxury brand color palette (InspoAI)](https://www.inspoai.io/blogs/luxury-brand-color-palette)
- [Luxury color palettes with hex codes (Made Good Designs)](https://madegooddesigns.com/?p=7919)
- [Why do some things feel expensive?](https://designerpublication.substack.com/p/why-do-some-things-feel-expensive)
- [Livingetc, warna yang membuat ruang terasa mahal](https://www.livingetc.com/advice/most-expensive-looking-colors-in-interiors)
- [Paperlust, palet pernikahan 2026](https://paperlust.co/blog/?p=12756)
- [Printed.com, tren warna 2026](https://www.printed.com/blog/2026-colour-trends/)
