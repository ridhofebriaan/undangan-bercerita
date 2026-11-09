// Data undangan tema Elegant (pakai foto). Untuk klien baru: salin folder ini ke site/u/<nama-pasangan>/,
// ganti foto di folder foto/ dengan foto klien (nama file sama), lalu ubah isi file ini.
// Foto demo: Unsplash (lisensi Unsplash, bebas dipakai), fotografer Rizky Motion, Jeremy Wong Weddings, Dua Hazia.
window.UNDANGAN = {
  id: "demo-elegant",
  label: "The Wedding of",
  judul: "Undangan Pernikahan Salsabila & Fajar",
  hashtag: "#SalsaFajarBersama",

  // Foto latar penuh. Cover dan hero sebaiknya potret (tegak), minimal 900 x 1300 px.
  foto: {
    cover: "foto/cover.jpg",
    hero: "foto/hero.jpg",
    penutup: "foto/penutup.jpg",
  },

  pasangan: {
    urutan: "wanita-dulu",
    wanita: {
      panggilan: "Salsabila",
      nama: "Salsabila Putri Ramadhani",
      ortu: "Putri pertama dari Bapak Ir. Hendra Gunawan & Ibu Dewi Lestari",
      foto: "foto/wanita.jpg",
      instagram: "salsabila.pr",
    },
    pria: {
      panggilan: "Fajar",
      nama: "Muhammad Fajar Hidayat, S.Kom.",
      ortu: "Putra kedua dari Bapak Drs. Agus Salim & Ibu Siti Aminah",
      foto: "foto/pria.jpg",
      instagram: "fajarhidayat",
    },
  },

  salam: {
    pembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    teks: "Maha suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon rahmat dan ridha-Nya, kami bermaksud menyelenggarakan pernikahan kami.",
  },

  ayat: {
    arab: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    arti: "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antara kamu rasa cinta dan kasih sayang.",
    sumber: "QS. Ar-Rum: 21",
  },

  acara: [
    {
      nama: "Akad Nikah",
      mulai: "2027-03-20T08:00:00+07:00",
      selesai: "2027-03-20T10:00:00+07:00",
      tempat: "Masjid Pusdai Jawa Barat",
      alamat: "Jl. Diponegoro No. 63, Cihaur Geulis, Kota Bandung",
      peta: "Pusdai Jawa Barat, Bandung",
    },
    {
      nama: "Resepsi",
      mulai: "2027-03-20T11:00:00+07:00",
      selesai: "2027-03-20T14:00:00+07:00",
      tempat: "Gedung Sabuga ITB",
      alamat: "Jl. Tamansari No. 73, Lb. Siliwangi, Kota Bandung",
      peta: "Sabuga ITB, Bandung",
    },
  ],

  kisah: [
    { waktu: "2021", judul: "Pertama Bertemu", teks: "Satu kepanitiaan kajian kampus. Saling kenal, saling sapa, tanpa menyangka akan sejauh ini." },
    { waktu: "2025", judul: "Lamaran", teks: "Fajar datang bersama keluarga untuk meminang. Dengan restu kedua orang tua, kami memutuskan melangkah bersama." },
    { waktu: "2027", judul: "Hari Bahagia", teks: "Insya Allah kami menikah. Terima kasih atas doa yang mengantar kami sampai di sini." },
  ],

  galeri: ["foto/g1.jpg", "foto/g2.jpg", "foto/g3.jpg", "foto/g4.jpg"],

  hadiah: [
    { bank: "Bank BCA", nomor: "1234567890", nama: "Salsabila Putri Ramadhani" },
    { bank: "Bank Mandiri", nomor: "1300012345678", nama: "Muhammad Fajar Hidayat" },
  ],
  alamatKado: "Jl. Cigadung Raya Timur No. 21, Cibeunying Kaler, Kota Bandung 40191 (a.n. Salsabila)",

  musik: "../../assets/musik/musik-1.m4a",

  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.",

  contohUcapan: [
    { nama: "Rina & Keluarga", hadir: "Hadir", ucapan: "Barakallahu lakuma. Semoga menjadi keluarga sakinah, mawaddah, wa rahmah." },
    { nama: "Teman Kajian Kampus", hadir: "Hadir", ucapan: "Akhirnya! Bahagia selalu untuk kalian berdua." },
  ],
};
