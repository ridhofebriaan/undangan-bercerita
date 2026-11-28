// Data undangan tema "Soirée" (koleksi Modern Klasik), docs/koleksi-modern-klasik.md.
// Tautan tamu: ?to=Nama%20Tamu&no=48&kursi=2 (nomor undangan dan jumlah kursi per tamu).
// Untuk klien: salin folder ini ke site/u/<nama-pasangan>/, ganti foto/ dan video/, lalu ubah isi file ini.
window.UNDANGAN = {
  id: "demo-modern-soiree",
  kerangka: true,
  koleksi: "modern-klasik",
  agama: "kristen",
  zonaWaktu: "WIB",
  label: "Undangan Pernikahan",
  judul: "Undangan Pernikahan Clarissa & Jonathan",
  monogram: "C·J",
  undangan: { total: 180, kursiBawaan: 2, catatan: "Undangan ini bersifat pribadi" },

  // Pembuka geser ke atas (bukan segel tekan-dan-tahan); bagian navy sebagai selingan di mode terang
  tampilan: { buka: "geser", gelap: ["countdown", "dresscode", "konfirmasi", "penutup"] },
  gayaFoto: { hero: "penuh", profil: "persegi", profilMuncul: "tirai", galeri: "kisi" },
  foto: { cover: "foto/cover.jpg" },
  video: {
    hero: { src: "video/hero.mp4", poster: "video/hero.jpg", alt: "Cincin dipasangkan di jari pengantin" },
    selingan: [
      { src: "video/selingan1.mp4", poster: "video/selingan1.jpg", kutipan: "“Kasih itu sabar; kasih itu murah hati.”" },
      { src: "video/selingan2.mp4", poster: "video/selingan2.jpg", kutipan: "“Satu malam untuk merayakan seumur hidup.”" },
    ],
  },

  pasangan: {
    urutan: "pria-dulu",
    pria: { panggilan: "Jonathan", nama: "Jonathan Halim, S.T., M.Sc.", ortu: "Putra dari Bapak Hendrik Halim dan Ibu Lanny Susanto", foto: "foto/pria.jpg" },
    wanita: { panggilan: "Clarissa", nama: "Clarissa Wijaya, S.Ked.", ortu: "Putri dari Bapak Robert Wijaya dan Ibu Melinda Tan", foto: "foto/wanita.jpg" },
  },

  salam: {
    pembuka: "Dengan penuh syukur",
    teks: "Atas kasih karunia Tuhan, kami mengundang Bapak/Ibu/Saudara/i untuk menjadi saksi dan berbagi sukacita di hari pernikahan kami.",
    penutup: "Tuhan memberkati",
  },
  ayat: {
    arti: "Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan.",
    sumber: "Kolose 3:14",
  },
  judulBagian: {
    mempelai: ["Mempelai", "Dengan penuh syukur"],
    countdown: ["Menuju Hari H", "Save the date"],
    acara: ["Susunan Acara", "Sabtu, 21 Oktober 2028"],
    galeri: ["Potret", "Galeri"],
    konfirmasi: ["Konfirmasi Kehadiran", "RSVP"],
    rsvp: ["Ucapan", "Doa dan pesan"],
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
    { nama: "Pemberkatan Nikah", mulai: "2028-10-21T10:00:00+07:00", selesai: "2028-10-21T11:30:00+07:00", tempat: "GKI Diponegoro Surabaya", alamat: "Jl. Raya Diponegoro No. 146, Darmo, Wonokromo, Surabaya", peta: "GKI Diponegoro Surabaya", utama: true },
    { nama: "Resepsi", mulai: "2028-10-21T18:30:00+07:00", selesai: "2028-10-21T21:00:00+07:00", tempat: "Shangri-La Surabaya, Grand Ballroom", alamat: "Jl. Mayjend Sungkono No. 120, Dukuh Pakis, Surabaya", peta: "Shangri-La Surabaya" },
  ],

  dressCode: {
    judul: "Black Tie",
    teks: "Jas gelap atau tuksedo untuk pria. Gaun panjang bernuansa gelap atau netral untuk wanita. Mohon hindari busana putih.",
    warna: [
      { nama: "Navy", hex: "#1c2433" },
      { nama: "Sampanye", hex: "#c3ae84" },
      { nama: "Abu Kabut", hex: "#b9bec8" },
      { nama: "Hitam", hex: "#15171b" },
    ],
  },
  infoTamu: [
    { judul: "Registrasi", teks: "Tunjukkan kartu masuk atau nomor undangan di meja penerima tamu." },
    { judul: "Parkir", teks: "Valet tersedia di lobi utama. Parkir mandiri di gedung parkir hotel." },
    { judul: "Akomodasi", teks: "Tarif khusus tamu di Shangri-La Surabaya dengan kode CLARJON28." },
    { judul: "Anak", teks: "Dengan hormat, resepsi ini khusus untuk tamu dewasa." },
  ],

  galeri: [
    "foto/g1.jpg",
    "foto/g2.jpg",
    { video: "video/g-manset.mp4", poster: "video/g-manset.jpg" },
    "foto/g4.jpg",
    "foto/g5.jpg",
    "foto/g6.jpg",
    "foto/g7.jpg",
    { video: "video/g-meja.mp4", poster: "video/g-meja.jpg" },
    "foto/g9.jpg",
  ],

  batasKonfirmasi: "2028-10-07",
  jumlahKonfirmasi: 112,

  hadiah: [
    { bank: "Bank BCA", nomor: "0883145526", nama: "Clarissa Wijaya" },
    { bank: "Bank OCBC", nomor: "693810274415", nama: "Jonathan Halim" },
  ],
  alamatKado: "Jl. Raya Darmo Permai III No. 21, Surabaya 60226 (a.n. Clarissa)",
  teksHadiah: "Kehadiran Anda sudah lebih dari cukup. Bila ingin memberi tanda kasih, detailnya ada di bawah ini.",

  // Sementara memakai musik umum; ganti ke instrumental piano atau string bila berkasnya sudah ada
  musik: "../../assets/musik/musik-1.m4a",
  penutup: "Kehadiran dan doa restu Anda adalah hadiah terbaik bagi kami.",
  contohUcapan: [
    { nama: "Tim Radiologi RS Darmo", hadir: "Hadir", ucapan: "Selamat menempuh hidup baru, Clarissa dan Jonathan. Tuhan memberkati." },
    { nama: "Kevin & Natalia", hadir: "Hadir", ucapan: "Bahagia selalu. Sampai jumpa di hari bahagia." },
  ],
};
