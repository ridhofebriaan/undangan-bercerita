// Data undangan tema "Sasirangan" (adat Banjar), kerangka v2 (docs/kerangka-undangan.md).
// Untuk klien: salin folder ini ke site/u/<nama-pasangan>/, ganti foto di foto/, lalu ubah isi file ini.
window.UNDANGAN = {
  id: "demo-banjar-sasirangan",
  kerangka: true,
  agama: "islam",
  zonaWaktu: "WITA",
  label: "Walimatul 'Ursy",
  judul: "Undangan Pernikahan Raudah & Fahmi",
  hashtag: "#RaudahFahmiBatatai",
  // Tulisan Arab "Walimatul 'Ursy" (orang Banjar dulu menulis dengan huruf Arab Melayu)
  aksara: { teks: "وَلِيمَةُ الْعُرْسِ", lang: "ar", arti: "Walimatul 'Ursy (pesta pernikahan)" },

  tampilan: { gelap: ["salam", "kisah", "countdown", "konfirmasi", "hadiah", "penutup"] },
  gayaFoto: { hero: "oval", heroMuncul: "parallax", profil: "lengkung", profilMuncul: "tirai", kisah: "lingkaran", kisahMuncul: "mekar", galeri: "kisi" },
  foto: { utama: "foto/utama.jpg" },

  pasangan: {
    urutan: "wanita-dulu",
    wanita: { panggilan: "Raudah", nama: "Siti Raudatul Jannah, S.E.", ortu: "Putri pertama dari Bapak H. Muhammad Syarkawi & Ibu Hj. Siti Mariam", peran: "Pengantin Bibinian", foto: "foto/wanita.jpg", instagram: "raudatuljannah" },
    pria: { panggilan: "Fahmi", nama: "Ahmad Fahmi Ramadhani, S.H.", ortu: "Putra kedua dari Bapak H. Abdul Hamid & Ibu Hj. Norhayati", peran: "Pengantin Lalakian", foto: "foto/pria.jpg", instagram: "fahmiramadhani" },
  },

  salam: {
    pembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    teks: "Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
  },
  ayat: {
    arab: "وَاللَّهُ جَعَلَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا وَجَعَلَ لَكُم مِّنْ أَزْوَاجِكُم بَنِينَ وَحَفَدَةً وَرَزَقَكُم مِّنَ الطَّيِّبَاتِ",
    arti: "Dan Allah menjadikan bagimu pasangan (suami atau istri) dari jenis kamu sendiri, menjadikan anak dan cucu bagimu dari pasanganmu, serta memberimu rezeki dari yang baik-baik.",
    sumber: "QS. An-Nahl: 72",
  },
  judulBagian: {
    mempelai: ["Mempelai", "Pengantin Banjar"],
    kisah: ["Kisah Kami", "Dari bakenalan ke batatai"],
    galeri: ["Momen Berharga", "Galeri"],
    countdown: ["Menuju Hari Bahagia", "Save the date"],
    acara: ["Rangkaian Acara", "Waktu wan tampat"],
    rsvp: ["Ucapan & Doa", "Doa restu"],
    hadiah: ["Tanda Kasih", "Amplop digital"],
  },
  teks: { dariKami: "Tarima kasih banyak, kami nang bahagia" },
  galeriKutipan: "“Waja sampai ka puting”: teguh dari awal sampai akhir.",
  teksAcara: "Tanpa mengurangi rasa hormat, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada:",

  acara: [
    { nama: "Batamat Al-Qur'an & Bapacar", mulai: "2028-05-12T19:30:00+08:00", selesai: "2028-05-12T21:30:00+08:00", tempat: "Kediaman Pengantin Bibinian", alamat: "Jl. Sultan Adam, Kompleks Mekkah No. 27, Banjarmasin Utara", peta: "Jl. Sultan Adam Banjarmasin" },
    { nama: "Akad Nikah", mulai: "2028-05-13T08:00:00+08:00", selesai: "2028-05-13T09:30:00+08:00", tempat: "Masjid Raya Sabilal Muhtadin", alamat: "Jl. Jenderal Sudirman No. 1, Antasan Besar, Banjarmasin Tengah", peta: "Masjid Raya Sabilal Muhtadin Banjarmasin", utama: true },
    { nama: "Bausung & Batatai", mulai: "2028-05-13T11:00:00+08:00", selesai: "2028-05-13T15:00:00+08:00", tempat: "Hotel Rattan Inn Banjarmasin", alamat: "Jl. Ahmad Yani Km. 5,7, Banjarmasin", peta: "Hotel Rattan Inn Banjarmasin" },
  ],

  kisah: [
    { waktu: "2022", judul: "Bakenalan", teks: "Dipertemukan di majelis taklim. Dari obrolan ringan sesudah pengajian, kami mulai saling mengenal.", foto: "foto/k1.jpg" },
    { waktu: "2027", judul: "Badatang", teks: "Keluarga Fahmi datang melamar secara adat. Alhamdulillah, niat baik itu diterima dengan senang hati.", foto: "foto/k2.jpg" },
    { waktu: "2028", judul: "Maantar Jujuran", teks: "Jujuran diantar dan hari baik ditetapkan bersama. Bismillah, menuju akad dan batatai.", foto: "foto/k3.jpg" },
  ],
  galeri: ["foto/g1.jpg", "foto/g2.jpg", "foto/g3.jpg", "foto/g4.jpg", "foto/g5.jpg", "foto/g6.jpg"],

  jumlahKonfirmasi: 186,
  turutMengundang: ["Keluarga Besar H. Muhammad Syarkawi", "Keluarga Besar H. Abdul Hamid", "Majelis Taklim Nurul Hidayah", "Rekan Kerja Bank Kalsel"],
  streaming: { link: "https://www.youtube.com/", label: "Tonton Siaran Langsung", teks: "Bagi keluarga dan sahabat yang berhalangan hadir, ikuti akad nikah kami secara langsung." },

  hadiah: [
    { bank: "Bank Kalsel", nomor: "0310145872", nama: "Siti Raudatul Jannah" },
    { bank: "Bank Syariah Indonesia", nomor: "7218845106", nama: "Ahmad Fahmi Ramadhani" },
  ],
  alamatKado: "Jl. Sultan Adam, Kompleks Mekkah No. 27, Banjarmasin Utara 70123 (a.n. Raudah)",

  // Sementara memakai musik umum; ganti ke musik panting Banjar bila berkasnya sudah ada
  musik: "../../assets/musik/musik-1.m4a",
  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doanya, kami ucapkan terima kasih.",
  contohUcapan: [
    { nama: "Keluarga H. Syarkawi", hadir: "Hadir", ucapan: "Barakallahu lakuma. Salamat bapangantin, mudahan jadi keluarga nang sakinah, mawaddah, warahmah." },
    { nama: "Kawan Kuliah ULM", hadir: "Hadir", ucapan: "Selamat menempuh hidup baru Raudah wan Fahmi, bahagia salalu!" },
  ],
};
