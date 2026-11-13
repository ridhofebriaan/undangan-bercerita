# RB Digital: Undangan Pernikahan Digital

Situs statis yang tayang di GitHub Pages dari folder `site/`. Tidak ada proses build dan tidak ada server.

## Struktur

```
site/
  index.html, katalog.css, katalog.js   halaman katalog (data tema di katalog.js)
  engine/                               mesin undangan (dipakai kedua tema)
  tema/melayu/                          tema Melayu (songket, pintu terbuka, galeri 12 foto)
  tema/cat-air/                         tema Taman Cat Air 3D (Three.js + cat air prosedural)
  u/<nama-pasangan>/                    undangan klien
  assets/musik/                         musik bebas lisensi
  assets/katalog/                       gambar pratinjau katalog
tools/buat-musik.js                     generator musik latar
```

## Menjalankan di komputer

```
cd site && python3 -m http.server 8765
```

Buka http://localhost:8765/

## Membuat undangan klien

1. Salin folder tema, misalnya `site/tema/melayu/`, ke `site/u/<nama-pasangan>/` (contoh `site/u/aina-hafiz/`).
2. Ubah `data.js` dengan data dari formulir klien, ganti `id` agar unik, lalu ganti foto di `foto/`.
3. Ubah judul dan tag `og:` di `index.html`.
4. Commit dan push. Link undangan: `https://ridhofebriaan.github.io/undangan-bercerita/u/<nama-pasangan>/?to=Nama+Tamu`

## Menambah tema di katalog

Tambah atau ubah entri di `site/katalog.js`.
