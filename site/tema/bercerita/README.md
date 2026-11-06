# Demo Undangan Bercerita: Aisyah & Fikri

Halaman statis (HTML + CSS + JS). Tidak perlu build.

## Menjalankan di komputer

```
cd demo
python3 -m http.server 8765
```

Buka http://localhost:8765/?to=Bapak%20Ahmad (nama tamu diambil dari `?to=`).

## File

| File | Isi |
|---|---|
| `story.js` | Semua isi undangan: nama, 5 bab, ayat, acara, rekening. Ganti file ini untuk pasangan lain. |
| `app.js` | Story player, info acara, RSVP, amplop. |
| `theme.css` | Tema Klasik Islami. |
| `assets/og-image.jpg` | Gambar preview link WhatsApp (1200x630). Sumbernya `assets/og-source.html`. |
| `assets/audio/musik.m4a` | Musik latar buatan sendiri (bebas lisensi), dibuat oleh `tools/buat-musik.js`. Ganti dengan nasyid berlisensi bila mau, lalu ubah `audio.src` di `story.js`. |

## Sebelum dikirim ke calon klien

- [ ] Verifikasi teks Arab + terjemahan QS Adz-Dzariyat: 49 dan QS Ar-Rum: 21 (mis. quran.kemenag.go.id).
- [ ] Review naskah 5 bab di `story.js`.
- [x] Musik latar sudah ada (buatan sendiri). Dengarkan dulu di HP; ganti bila kurang cocok.
- [x] `og:image` dan `og:url` sudah memakai alamat GitHub Pages. Ganti bila pindah domain.
- [ ] Uji di HP asli lewat browser bawaan WhatsApp.
- [ ] Rekam video promosi 30 detik.
