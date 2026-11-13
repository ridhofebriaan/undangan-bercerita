// Data undangan tema "Rumah Gadang" (adat Minangkabau), kerangka v2 (docs/kerangka-undangan.md).
// Untuk klien: salin folder ini ke site/u/<nama-pasangan>/, ganti foto di foto/, lalu ubah isi file ini.
window.UNDANGAN = {
  id: "demo-minang-rumah-gadang",
  kerangka: true,
  agama: "islam",
  label: "Baralek Gadang",
  judul: "Undangan Pernikahan Rahmi & Fadhil",
  hashtag: "#RahmiFadhilBaralek",

  // Bagian berlatar gelap (bergantian dengan terang)
  tampilan: { gelap: ["salam", "kisah", "countdown", "konfirmasi", "hadiah", "penutup"] },
  // Gaya foto: bingkai & cara muncul (lihat bagian 5 dokumen kerangka)
  gayaFoto: { hero: "lengkung", heroMuncul: "parallax", profil: "oval", profilMuncul: "zoom", kisah: "persegi", kisahMuncul: "zoom", galeri: "carousel" },
  foto: { utama: "foto/utama.jpg" },

  pasangan: {
    urutan: "wanita-dulu",
    wanita: { panggilan: "Rahmi", nama: "Annisa Rahmi Putri, S.Pd.", ortu: "Putri pertama dari Bapak H. Zulkarnain Dt. Rajo Lelo & Ibu Hj. Yusnimar", peran: "Anak Daro", foto: "foto/wanita.jpg", instagram: "rahmiputri" },
    pria: { panggilan: "Fadhil", nama: "Fadhil Ilham, S.T.", ortu: "Putra kedua dari Bapak Syafrizal & Ibu Nurhayati", peran: "Marapulai · gala Sutan Bagindo", foto: "foto/pria.jpg", instagram: "fadhililham" },
  },

  salam: {
    pembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    teks: "Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta'ala serta restu ninik mamak, kami bermaksud menyelenggarakan baralek pernikahan anak kami.",
  },
  ayat: {
    arab: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    arti: "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antara kamu rasa cinta dan kasih sayang.",
    sumber: "QS. Ar-Rum: 21",
  },
  judulBagian: {
    mempelai: ["Mempelai", "Anak Daro & Marapulai"],
    kisah: ["Kisah Kami", "Dari rantau ke pelaminan"],
    galeri: ["Momen Berharga", "Galeri"],
    countdown: ["Menuju Hari Baralek", "Save the date"],
    acara: ["Rangkaian Acara", "Hari & tempat"],
    rsvp: ["Ucapan & Doa", "Doa jo restu"],
    hadiah: ["Tanda Kasih", "Amplop digital"],
  },
  teks: { dariKami: "Tarimo kasih, kami yang berbahagia" },
  galeriKutipan: "“Menciptakan kenangan adalah hadiah yang tak ternilai. Kenangan bertahan seumur hidup.”",
  teksAcara: "Tanpa mengurangi rasa hormat, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada:",

  acara: [
    { nama: "Malam Bainai", mulai: "2027-06-25T20:00:00+07:00", selesai: "2027-06-25T22:00:00+07:00", tempat: "Rumah Gadang Keluarga Anak Daro", alamat: "Nagari Pariangan, Kec. Pariangan, Kab. Tanah Datar", peta: "Pariangan, Tanah Datar" },
    { nama: "Akad Nikah", mulai: "2027-06-26T08:00:00+07:00", selesai: "2027-06-26T09:30:00+07:00", tempat: "Masjid Ishlah Pariangan", alamat: "Nagari Pariangan, Kec. Pariangan, Kab. Tanah Datar", peta: "Masjid Ishlah Pariangan", utama: true },
    { nama: "Baralek", mulai: "2027-06-26T11:00:00+07:00", selesai: null, tempat: "Rumah Gadang Keluarga Anak Daro", alamat: "Nagari Pariangan, Kec. Pariangan, Kab. Tanah Datar", peta: "Pariangan, Tanah Datar" },
  ],

  kisah: [
    { waktu: "2023", judul: "Bakenalan", teks: "Bertemu di rantau, sama-sama anak Minang yang merindukan kampung halaman.", foto: "foto/g3.jpg" },
    { waktu: "2026", judul: "Maminang", teks: "Sesuai adat Minangkabau, keluarga Rahmi datang meminang ke rumah keluarga Fadhil. Alhamdulillah, diterima.", foto: "foto/g4.jpg" },
    { waktu: "2026", judul: "Batimbang Tando", teks: "Kedua keluarga bertukar tanda sebagai ikatan janji menuju hari baralek.", foto: "foto/g5.jpg" },
  ],
  galeri: ["foto/g1.jpg", "foto/g2.jpg", "foto/g3.jpg", "foto/g4.jpg", "foto/g5.jpg", "foto/g6.jpg"],

  jumlahKonfirmasi: 128,
  turutMengundang: ["Keluarga Besar Suku Piliang", "Keluarga Besar Dt. Rajo Lelo", "Ikatan Keluarga Pariangan Perantauan", "Rekan Kerja PT Semen Padang"],
  streaming: { link: "https://www.youtube.com/", label: "Tonton Siaran Langsung", teks: "Bagi keluarga dan sahabat yang berhalangan hadir, ikuti akad nikah kami secara langsung." },

  hadiah: [
    { bank: "Bank Nagari", nomor: "8720174218", nama: "Annisa Rahmi Putri" },
    { bank: "Bank Syariah Indonesia", nomor: "7140081256", nama: "Fadhil Ilham" },
  ],
  alamatKado: "Nagari Pariangan, Kec. Pariangan, Kab. Tanah Datar, Sumatera Barat 27264 (a.n. Rahmi)",

  musik: "../../assets/musik/musik-minang.m4a",
  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doanya, kami ucapkan tarimo kasih.",
  contohUcapan: [
    { nama: "Keluarga Mamak Datuak", hadir: "Hadir", ucapan: "Barakallahu lakuma. Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah." },
    { nama: "Kawan Sarantau", hadir: "Hadir", ucapan: "Selamat baralek! Bahagia dunia akhirat untuak kalian baduo." },
  ],
};
