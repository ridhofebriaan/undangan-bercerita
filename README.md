# RB Digital: Undangan Pernikahan Digital

Situs statis yang tayang di GitHub Pages (folder `site/`). Tanpa build, tanpa server.

## Struktur

```
site/
  index.html, katalog.css, katalog.js   halaman katalog (data tema di katalog.js)
  engine/                               mesin bersama semua tema
  tema/<kode>/                          demo tiap tema (index.html, data.js, tema.css)
  tema/bercerita/                       tema premium (story player sendiri)
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

## Membuat undangan klien (tema biasa, mis. Syari)

1. Salin `site/tema/syari/` ke `site/u/<nama-pasangan>/` (contoh `site/u/nadia-rizky/`).
2. Hapus file ornamen (`*.svg`, `tema.css`) dari salinan. Cukup simpan `index.html` dan `data.js`.
3. Ubah `data.js` dengan data dari formulir klien, dan ganti `id` agar unik.
4. Ubah judul dan `og:` di `index.html`.
5. Commit dan push. Link: `https://ridhofebriaan.github.io/rb-digital/u/<nama-pasangan>/?to=Nama+Tamu`

## Menambah tema di katalog

Tambah atau ubah entri di `site/katalog.js`. `siap: false` tampil sebagai "Segera hadir".
