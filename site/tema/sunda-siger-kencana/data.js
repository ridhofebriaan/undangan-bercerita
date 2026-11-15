// Data undangan tema "Siger Kencana" (adat Sunda), kerangka v2 (docs/kerangka-undangan.md).
// Untuk klien: salin folder ini ke site/u/<nama-pasangan>/, ganti foto di foto/, lalu ubah isi file ini.
window.UNDANGAN = {
  id: "demo-sunda-siger-kencana",
  kerangka: true,
  agama: "islam",
  label: "Walimatul ‘Urs",
  judul: "Undangan Pernikahan Intan & Galih",
  hashtag: "#IntanGalihNgahiji",
  // Aksara Sunda: "Wilujeng Sumping"
  aksara: { teks: "ᮝᮤᮜᮥᮏᮨᮀ ᮞᮥᮙ᮪ᮕᮤᮀ", lang: "su", arti: "Wilujeng Sumping (selamat datang)" },

  tampilan: { gelap: ["salam", "kisah", "countdown", "konfirmasi", "hadiah", "penutup"] },
  gayaFoto: { hero: "penuh", heroMuncul: "zoom", profil: "lingkaran", profilMuncul: "zoom", kisah: "persegi", kisahMuncul: "tirai", galeri: "berserak", garis: "tipis" },
  foto: { utama: "foto/utama.jpg" },

  pasangan: {
    urutan: "wanita-dulu",
    wanita: { panggilan: "Intan", nama: "Intan Nurul Fadhilah, S.Psi.", ortu: "Putri bungsu dari Bapak H. Dadang Suherman & Ibu Hj. Euis Rohayati", peran: "Pangantén Istri", foto: "foto/wanita.jpg", instagram: "intannurulf" },
    pria: { panggilan: "Galih", nama: "Galih Rakasiwi, S.Kom.", ortu: "Putra kedua dari Bapak Asep Sunandar & Ibu Neneng Hasanah", peran: "Pangantén Pameget", foto: "foto/pria.jpg", instagram: "galihrakasiwi" },
  },

  salam: {
    pembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    teks: "Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
  },
  ayat: {
    arab: "سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا مِمَّا تُنبِتُ الْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ",
    arti: "Mahasuci (Allah) yang telah menciptakan semuanya berpasang-pasangan, baik dari apa yang ditumbuhkan oleh bumi dan dari diri mereka sendiri, maupun dari apa yang tidak mereka ketahui.",
    sumber: "QS. Yasin: 36",
  },
  judulBagian: {
    mempelai: ["Mempelai", "Pangantén"],
    kisah: ["Kisah Kami", "Lalakon urang"],
    galeri: ["Momen Berharga", "Galeri"],
    countdown: ["Menuju Hari Bahagia", "Save the date"],
    acara: ["Rangkaian Acara", "Waktos & tempat"],
    rsvp: ["Ucapan & Doa", "Nyuhunkeun pidu'a"],
    hadiah: ["Tanda Kasih", "Amplop digital"],
  },
  teks: { dariKami: "Hatur nuhun, kami yang berbahagia" },
  galeriKutipan: "“Silih asih, silih asah, silih asuh: saling mengasihi, saling menuntun, saling menjaga.”",
  teksAcara: "Tanpa mengurangi rasa hormat, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada:",

  acara: [
    { nama: "Ngeuyeuk Seureuh", mulai: "2027-10-08T19:30:00+07:00", selesai: "2027-10-08T21:00:00+07:00", tempat: "Kediaman Pangantén Istri", alamat: "Jl. Dago Pojok No. 21, Coblong, Kota Bandung", peta: "Dago Pojok, Coblong, Bandung" },
    { nama: "Akad Nikah", mulai: "2027-10-09T08:00:00+07:00", selesai: "2027-10-09T09:30:00+07:00", tempat: "Masjid Pusdai Jawa Barat", alamat: "Jl. Diponegoro No. 63, Cihaur Geulis, Cibeunying Kaler, Kota Bandung", peta: "Masjid Pusdai Jawa Barat", utama: true },
    { nama: "Sawer, Nincak Endog & Resepsi", mulai: "2027-10-09T11:00:00+07:00", selesai: "2027-10-09T14:00:00+07:00", tempat: "Savoy Homann Hotel", alamat: "Jl. Asia Afrika No. 112, Cikawao, Lengkong, Kota Bandung", peta: "Savoy Homann Hotel Bandung" },
  ],

  kisah: [
    { waktu: "2022", judul: "Patepang", teks: "Dipertemukan di sebuah kegiatan kampus di Bandung. Obrolan singkat yang ternyata berlanjut panjang.", foto: "foto/k1.jpg" },
    { waktu: "2026", judul: "Narosan", teks: "Keluarga Galih datang narosan secara resmi. Alhamdulillah, ditampi kalayan bingah oleh keluarga Intan.", foto: "foto/k2.jpg" },
    { waktu: "2027", judul: "Rendengan", teks: "Insya Allah kami menikah. Sawer, nincak endog, dan doa keluarga mengantar kami memulai hidup baru.", foto: "foto/k3.jpg" },
  ],
  galeri: ["foto/g1.jpg", "foto/g2.jpg", "foto/g3.jpg", "foto/g4.jpg", "foto/g5.jpg", "foto/g6.jpg"],

  jumlahKonfirmasi: 186,
  turutMengundang: ["Keluarga Besar H. Oman Abdurahman", "Keluarga Besar Bapak Asep Sunandar", "Warga RW 07 Dago Pojok", "Rekan Kerja bank bjb"],
  streaming: { link: "https://www.youtube.com/", label: "Tonton Siaran Langsung", teks: "Bagi keluarga dan sahabat yang berhalangan hadir, ikuti akad nikah kami secara langsung." },

  hadiah: [
    { bank: "bank bjb", nomor: "0081245570100", nama: "Intan Nurul Fadhilah" },
    { bank: "Bank BCA", nomor: "4370218856", nama: "Galih Rakasiwi" },
  ],
  alamatKado: "Jl. Dago Pojok No. 21, Coblong, Kota Bandung 40135 (a.n. Intan)",

  // Sementara memakai musik umum; ganti ke musik degung Sunda bila berkasnya sudah ada
  musik: "../../assets/musik/musik-1.m4a",
  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doanya, kami ucapkan hatur nuhun.",
  contohUcapan: [
    { nama: "Kulawarga Mang Ujang", hadir: "Hadir", ucapan: "Wilujeng nikah. Mugia janten kulawarga nu sakinah, mawaddah, warahmah." },
    { nama: "Batur Kuliah", hadir: "Hadir", ucapan: "Barakallahu lakuma! Bahagia selalu untuk kalian berdua." },
  ],
};
