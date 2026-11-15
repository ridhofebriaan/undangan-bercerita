// Data undangan tema "Atelier" (koleksi Modern Klasik), docs/koleksi-modern-klasik.md.
// Tautan tamu: ?to=Nama%20Tamu&no=48&kursi=2 (nomor undangan dan jumlah kursi per tamu).
// Untuk klien: salin folder ini ke site/u/<nama-pasangan>/, ganti foto/ dan video/, lalu ubah isi file ini.
window.UNDANGAN = {
  id: "demo-modern-atelier",
  kerangka: true,
  koleksi: "modern-klasik",
  agama: "islam",
  zonaWaktu: "WIB",
  label: "Undangan Pernikahan",
  judul: "Undangan Pernikahan Alya & Raka",
  monogram: "A·R",
  undangan: { total: 150, kursiBawaan: 2, catatan: "Undangan ini bersifat pribadi" },

  // Bagian berlatar terang sebagai selingan (tema bermode gelap)
  tampilan: { gelap: ["mempelai", "acara", "konfirmasi", "rsvp"] },
  gayaFoto: { hero: "penuh", profil: "persegi", profilMuncul: "zoom", galeri: "kisi" },
  foto: { cover: "foto/cover.jpg" },
  video: {
    hero: { src: "video/hero.mp4", poster: "video/hero.jpg", alt: "Genggaman tangan pengantin" },
    selingan: [
      { src: "video/selingan1.mp4", poster: "video/selingan1.jpg", kutipan: "“Bersiap untuk satu janji yang dijaga seumur hidup.”" },
      { src: "video/selingan2.mp4", poster: "video/selingan2.jpg", kutipan: "“Dua tangan, satu arah.”" },
    ],
  },

  pasangan: {
    urutan: "wanita-dulu",
    wanita: { panggilan: "Alya", nama: "Alya Kirana Wibowo, M.B.A.", ortu: "Putri dari Bapak Hendra Wibowo dan Ibu Ratna Sari", foto: "foto/wanita.jpg" },
    pria: { panggilan: "Raka", nama: "Raka Pradipta Hartono, S.H., LL.M.", ortu: "Putra dari Bapak Agus Hartono dan Ibu Diana Lestari", foto: "foto/pria.jpg" },
  },

  salam: {
    pembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    teks: "Dengan memohon rahmat Allah Subhanahu wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i untuk berbagi kebahagiaan di hari pernikahan kami.",
  },
  judulBagian: {
    mempelai: ["Mempelai", "Yang berbahagia"],
    countdown: ["Menuju Hari H", "Save the date"],
    acara: ["Susunan Acara", "Sabtu, 4 Desember 2027"],
    galeri: ["Potret", "Galeri"],
    konfirmasi: ["Konfirmasi Kehadiran", "RSVP"],
    rsvp: ["Ucapan", "Konfirmasi dan doa"],
    hadiah: ["Tanda Kasih", "Opsional"],
  },
  teks: {
    kepada: "Kepada",
    catatanTamu: "Mohon maaf bila ada kesalahan penulisan nama atau gelar",
    dariKami: "Dengan hormat, kami yang berbahagia",
    teksJumlah: "tamu telah mengonfirmasi kehadiran",
    contohUcapan: "Tulis ucapan singkat untuk kedua mempelai",
    hadir: "Akan hadir",
    terimaKasih: "Terima kasih, konfirmasi dan ucapan Anda sudah kami terima.",
  },

  acara: [
    { nama: "Akad Nikah", mulai: "2027-12-04T16:00:00+07:00", selesai: "2027-12-04T17:00:00+07:00", tempat: "The Dharmawangsa Jakarta", alamat: "Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan", peta: "The Dharmawangsa Jakarta", utama: true },
    { nama: "Resepsi", mulai: "2027-12-04T19:00:00+07:00", selesai: "2027-12-04T21:30:00+07:00", tempat: "The Dharmawangsa Jakarta, Grand Ballroom", alamat: "Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan", peta: "The Dharmawangsa Jakarta" },
  ],

  dressCode: {
    judul: "Black Tie Optional",
    teks: "Jas gelap atau tuksedo untuk pria. Gaun panjang atau kebaya modern untuk wanita. Mohon hindari busana putih.",
    warna: [
      { nama: "Espresso", hex: "#3a2a24" },
      { nama: "Perunggu", hex: "#a8825f" },
      { nama: "Pasir", hex: "#cbbfb3" },
      { nama: "Hitam", hex: "#1a1614" },
    ],
  },
  infoTamu: [
    { judul: "Registrasi", teks: "Tunjukkan undangan ini beserta nomor undangan di meja penerima tamu." },
    { judul: "Parkir", teks: "Valet tersedia di lobi utama. Parkir mandiri di basement P1." },
    { judul: "Akomodasi", teks: "Tarif khusus tamu di The Dharmawangsa dengan kode ALYARAKA27." },
    { judul: "Anak", teks: "Dengan hormat, acara ini khusus untuk tamu dewasa." },
  ],

  galeri: [
    "foto/g1.jpg",
    "foto/g2.jpg",
    { video: "video/g-korsase.mp4", poster: "video/g-korsase.jpg" },
    "foto/g4.jpg",
    "foto/g5.jpg",
    "foto/g6.jpg",
    "foto/g3.jpg",
  ],

  batasKonfirmasi: "2027-11-20",
  jumlahKonfirmasi: 97,

  hadiah: [
    { bank: "Bank BCA", nomor: "5270184432", nama: "Alya Kirana Wibowo" },
    { bank: "Bank Mandiri", nomor: "1240009871236", nama: "Raka Pradipta Hartono" },
  ],
  alamatKado: "Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan 12190 (a.n. Alya)",
  teksHadiah: "Kehadiran Anda sudah lebih dari cukup. Bila ingin memberi tanda kasih, detailnya ada di bawah ini.",

  musik: "../../assets/musik/musik-1.m4a",
  penutup: "Kehadiran dan doa restu Anda adalah hadiah terbaik bagi kami.",
  contohUcapan: [
    { nama: "Tim Corporate Finance", hadir: "Hadir", ucapan: "Selamat menempuh hidup baru, Alya dan Raka. Bahagia selalu." },
    { nama: "Dimas & Sarah", hadir: "Hadir", ucapan: "Barakallahu lakuma. Sampai jumpa di hari bahagia." },
  ],
};
