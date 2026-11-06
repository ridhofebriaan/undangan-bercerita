// Semua isi undangan ada di sini.
// Untuk pasangan berikutnya cukup ganti data di file ini, tanpa mengubah app.js.

window.STORY = {
  couple: {
    short: "Aisyah & Fikri",
    bride: {
      name: "Aisyah Putri Rahmani",
      nick: "Aisyah",
      parents: "Putri dari Bapak Hasan Basri & Ibu Fatimah",
    },
    groom: {
      name: "Muhammad Fikri Ramadhan",
      nick: "Fikri",
      parents: "Putra dari Bapak Rahmat Hidayat & Ibu Siti Aminah",
    },
  },

  // Nama tamu diambil dari link: ?to=Bapak%20Ahmad
  defaultGuest: "Bapak/Ibu/Saudara/i",

  // Musik latar buatan sendiri (tools/buat-musik.js), bebas lisensi.
  // Kosongkan src untuk tanpa audio; tombol audio otomatis disembunyikan.
  audio: {
    src: "../../assets/musik/musik-1.m4a",
  },

  // Lama tampil per bab (detik) dihitung otomatis dari jumlah kata.
  chapters: [
    {
      label: "Bab 1",
      title: "Sebelum Bertemu",
      art: "stars",
      text:
        "Jauh sebelum kami saling mengenal, nama kami telah tertulis di Lauh Mahfuzh. " +
        "Aisyah tumbuh di Bandung, di antara buku dan teh hangat sore hari. " +
        "Fikri besar di Yogyakarta, belajar merakit mimpi di bengkel kecil ayahnya.",
      verse: {
        arabic: "وَمِن كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ لَعَلَّكُمْ تَذَكَّرُونَ",
        translation:
          "Segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah).",
        source: "QS. Adz-Dzariyat: 49",
      },
    },
    {
      label: "Bab 2",
      title: "Pertemuan",
      art: "paths",
      text:
        "Tahun 2023, kegiatan relawan bencana di Cianjur mempertemukan kami. " +
        "Tidak ada percakapan panjang, hanya satu tim, satu tenda logistik, " +
        "dan rasa hormat yang tumbuh diam-diam. Kami pulang ke kota masing-masing, " +
        "menyimpan nama itu dalam doa.",
    },
    {
      label: "Bab 3",
      title: "Keraguan & Istikharah",
      art: "night",
      text:
        "Ketika niat baik datang, ragu ikut menyertai. Apakah ini jalan-Nya? " +
        "Dalam sujud istikharah kami tidak meminta tanda yang ajaib, " +
        "hanya hati yang tenang dan jalan yang dimudahkan. Dan Allah memudahkannya.",
    },
    {
      label: "Bab 4",
      title: "Khitbah",
      art: "homes",
      text:
        "Juni 2026, Fikri datang bersama keluarganya ke Bandung. " +
        "Dengan suara sedikit bergetar, ia menyampaikan niatnya kepada ayah Aisyah. " +
        "Sebuah anggukan, senyum ibu, dan bismillah yang pelan. Dua keluarga kini menjadi satu.",
    },
    {
      label: "Bab 5",
      title: "Menuju Akad",
      art: "arch",
      text:
        "Kini kami melangkah menuju mitsaqan ghalizha, perjanjian yang kokoh. " +
        "Bukan karena kami sempurna, tetapi karena kami ingin saling menyempurnakan di jalan-Nya.",
    },
  ],

  // Slide penutup kisah
  closing: {
    arabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ",
    translation:
      "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antara kamu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    source: "QS. Ar-Rum: 21",
  },

  // Waktu dalam WIB (+07:00)
  events: [
    {
      name: "Akad Nikah",
      date: "2026-12-19T08:00:00+07:00",
      dateText: "Sabtu, 19 Desember 2026",
      timeText: "08.00 - 10.00 WIB",
      place: "Masjid Pusdai Jawa Barat",
      address: "Jl. Diponegoro No. 63, Cihaur Geulis, Bandung",
    },
    {
      name: "Resepsi",
      date: "2026-12-19T11:00:00+07:00",
      dateText: "Sabtu, 19 Desember 2026",
      timeText: "11.00 - 14.00 WIB",
      place: "Aula Pusdai Jawa Barat",
      address: "Jl. Diponegoro No. 63, Cihaur Geulis, Bandung",
    },
  ],
  map: {
    query: "Pusdai Jawa Barat, Bandung",
  },

  gifts: [
    { bank: "Bank Syariah Indonesia", number: "7123456789", holder: "Aisyah Putri Rahmani" },
    { bank: "Bank Muamalat", number: "3310987654", holder: "Muhammad Fikri Ramadhan" },
  ],

  // Contoh doa yang tampil di demo
  sampleWishes: [
    { name: "Ustadzah Nur", text: "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair." },
    { name: "Tim Relawan Cianjur", text: "Dari satu tenda logistik ke pelaminan. Semoga sakinah, mawaddah, wa rahmah!" },
  ],
};
