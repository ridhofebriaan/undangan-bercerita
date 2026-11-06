// Data undangan. Untuk klien baru: salin folder ini ke site/u/<nama-pasangan>/ lalu ubah isi file ini.
// Tanggal & jam ditulis dalam format ISO WIB (+07:00); hari dan bulan diformat otomatis.
window.UNDANGAN = {
  id: "demo-syari",
  label: "Walimatul 'Ursy",
  judul: "Undangan Pernikahan Nadia & Rizky",
  hashtag: "#NadiaRizkyMenujuHalal",

  pasangan: {
    urutan: "wanita-dulu", // atau "pria-dulu"
    wanita: {
      panggilan: "Nadia",
      nama: "Nadia Khairunnisa",
      ortu: "Putri kedua dari Bapak H. Abdul Malik & Ibu Hj. Rahmawati",
      // foto: "foto-wanita.jpg",   // opsional, tema Syari umumnya tanpa foto
      // instagram: "nadia",
    },
    pria: {
      panggilan: "Rizky",
      nama: "Rizky Maulana Akbar",
      ortu: "Putra pertama dari Bapak Sulaiman & Ibu Nur Aini",
    },
  },

  salam: {
    pembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    teks: "Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan walimah pernikahan putra-putri kami.",
  },

  ayat: {
    arab: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    arti: "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antara kamu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    sumber: "QS. Ar-Rum: 21",
  },

  acara: [
    {
      nama: "Akad Nikah",
      mulai: "2027-01-10T08:00:00+07:00",
      selesai: "2027-01-10T09:30:00+07:00",
      tempat: "Masjid Agung Sunda Kelapa",
      alamat: "Jl. Taman Sunda Kelapa No. 16, Menteng, Jakarta Pusat",
      peta: "Masjid Agung Sunda Kelapa, Jakarta",
    },
    {
      nama: "Walimatul 'Ursy",
      mulai: "2027-01-10T11:00:00+07:00",
      selesai: null, // null = "selesai"
      tempat: "Aula Masjid Agung Sunda Kelapa",
      alamat: "Jl. Taman Sunda Kelapa No. 16, Menteng, Jakarta Pusat",
      peta: "Masjid Agung Sunda Kelapa, Jakarta",
    },
  ],

  // Opsional. Hapus bagian ini bila tidak dipakai.
  kisah: [
    { waktu: "Maret 2026", judul: "Ta'aruf", teks: "Dipertemukan melalui guru ngaji kami, berawal dari niat yang sama untuk menyempurnakan separuh agama." },
    { waktu: "Agustus 2026", judul: "Khitbah", teks: "Keluarga Rizky datang bersilaturahmi dan menyampaikan lamaran. Alhamdulillah, diterima dengan penuh syukur." },
    { waktu: "Januari 2027", judul: "Akad", teks: "Insya Allah kami akan mengikat janji suci. Mohon doa agar dimudahkan dan diberkahi." },
  ],

  galeri: [], // contoh: ["galeri/1.jpg", "galeri/2.jpg"]

  hadiah: [
    { bank: "Bank Syariah Indonesia", nomor: "7001234567", nama: "Nadia Khairunnisa" },
    { bank: "DANA / GoPay", nomor: "081234567890", nama: "Rizky Maulana Akbar" },
  ],
  alamatKado: "Jl. Cempaka Putih Raya No. 12, Jakarta Pusat 10510 (a.n. Nadia)",

  musik: "../../assets/musik/musik-1.m4a",

  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.",

  contohUcapan: [
    { nama: "Ustadzah Fitri", hadir: "Hadir", ucapan: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair." },
    { nama: "Keluarga Bapak Hasan", hadir: "Hadir", ucapan: "Semoga menjadi keluarga sakinah, mawaddah, wa rahmah. Aamiin." },
  ],
};
