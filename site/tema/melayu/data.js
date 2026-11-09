// Data undangan tema Melayu (pakai foto). Untuk klien baru: salin folder ini ke site/u/<nama-pasangan>/,
// ganti foto di folder foto/ dengan foto klien (nama file sama), lalu ubah isi file ini.
// Foto demo: Unsplash (lisensi Unsplash, bebas dipakai), fotografer Fahmy Taza.
window.UNDANGAN = {
  id: "demo-melayu",
  label: "The Wedding of",
  judul: "Undangan Pernikahan Aina & Hafiz",
  hashtag: "#AinaHafizBersatu",

  foto: {
    sampul: "foto/sampul.jpg", // foto dalam bingkai lengkung di cover (tegak 3:4)
    hero: "foto/hero.jpg",
  },
  kelopak: 16, // jumlah kelopak bunga yang berjatuhan, 0 = mati

  pasangan: {
    urutan: "wanita-dulu",
    wanita: {
      panggilan: "Aina",
      nama: "Nur Aina Syafiqah, S.Pd.",
      ortu: "Putri bungsu dari Bapak H. Zulkifli Hasan & Ibu Hj. Rosmawati",
      foto: "foto/wanita.jpg",
      instagram: "ainasyafiqah",
    },
    pria: {
      panggilan: "Hafiz",
      nama: "Muhammad Hafiz Ramadhan, S.T.",
      ortu: "Putra ketiga dari Bapak Azhar Mahmud & Ibu Nurhayati",
      foto: "foto/pria.jpg",
      instagram: "hafizramadhan",
    },
  },

  salam: {
    pembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    teks: "Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
  },

  ayat: {
    arab: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    arti: "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antara kamu rasa cinta dan kasih sayang.",
    sumber: "QS. Ar-Rum: 21",
  },

  pembuka: {
    judul: "We Are Getting Married!",
    teks: "Semoga Allah menghimpun yang terserak dari keduanya, memberkahi mereka berdua, dan meningkatkan kualitas keturunannya.",
  },

  teksAcara: "Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami yang insya Allah akan diselenggarakan pada:",

  acara: [
    {
      nama: "Akad Nikah",
      mulai: "2027-05-15T08:00:00+07:00",
      selesai: "2027-05-15T09:30:00+07:00",
      tempat: "Masjid Raya An-Nur Provinsi Riau",
      alamat: "Jl. Hang Tuah, Sumahilang, Kec. Pekanbaru Kota, Pekanbaru",
      peta: "Masjid Raya An-Nur, Pekanbaru",
    },
    {
      nama: "Resepsi",
      mulai: "2027-05-15T11:00:00+07:00",
      selesai: null,
      tempat: "Balai Adat Melayu Riau",
      alamat: "Jl. Diponegoro No. 39, Suka Mulia, Kec. Sail, Pekanbaru",
      peta: "Balai Adat Melayu Riau, Pekanbaru",
    },
  ],

  kisah: [
    { waktu: "2022", judul: "Awal Pertemuan", teks: "Bertemu pertama kali di acara keluarga besar. Sederhana, tanpa banyak kata, tapi meninggalkan kesan." },
    { waktu: "2025", judul: "Memantapkan Hati", teks: "Setelah saling mengenal dalam batas yang baik, kami sepakat untuk melangkah ke jenjang yang lebih serius." },
    { waktu: "2026", judul: "Lamaran", teks: "Keluarga Hafiz datang meminang dengan adat Melayu. Alhamdulillah, pinangan diterima dengan penuh syukur." },
  ],

  galeri: [
    // Urutan menentukan susunan mozaik: foto 1 besar (persegi), foto 7 lebar, foto 11 memanjang.
    "foto/g04.jpg", "foto/g02.jpg", "foto/g06.jpg", "foto/g05.jpg", "foto/g09.jpg", "foto/g10.jpg",
    "foto/g07.jpg", "foto/g03.jpg", "foto/g11.jpg", "foto/g08.jpg", "foto/g01.jpg", "foto/g12.jpg",
  ],

  hadiah: [
    { bank: "Bank Riau Kepri Syariah", nomor: "8123456789", nama: "Nur Aina Syafiqah" },
    { bank: "Bank Mandiri", nomor: "1080012345678", nama: "Muhammad Hafiz Ramadhan" },
  ],
  alamatKado: "Jl. Sudirman Gg. Melati No. 8, Kel. Simpang Empat, Pekanbaru 28121 (a.n. Aina)",

  musik: "../../assets/musik/musik-1.m4a",

  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doanya, kami ucapkan terima kasih.",

  contohUcapan: [
    { nama: "Keluarga Pak Long", hadir: "Hadir", ucapan: "Barakallahu lakuma wa baraka 'alaikuma. Semoga sakinah, mawaddah, wa rahmah." },
    { nama: "Kawan Sekolah", hadir: "Hadir", ucapan: "Selamat menempuh hidup baru, semoga bahagia dunia akhirat." },
  ],
};
