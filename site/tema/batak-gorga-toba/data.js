// Data undangan tema "Gorga Toba" (adat Batak Toba), Format Pintu (docs/format-pintu.md).
// Untuk klien: salin folder ini ke site/u/<nama-pasangan>/, ganti foto di folder foto/ (nama file sama), lalu ubah isi file ini.
window.UNDANGAN = {
  id: "demo-batak-gorga-toba",
  agama: "kristen",
  zonaWaktu: "WIB",
  label: "Pesta Unjuk",
  judul: "Undangan Pernikahan Tiur & Daniel",
  hashtag: "#TiurDanielHoras",

  foto: {
    sampul: "foto/sampul.jpg", // foto dalam bingkai lengkung di cover (tegak 3:4)
    hero: "foto/hero.jpg",
  },
  kelopak: 14, // kelopak merah, putih, dan emas yang berjatuhan, 0 = mati

  pasangan: {
    urutan: "wanita-dulu",
    wanita: {
      panggilan: "Tiur",
      nama: "Tiurma Br. Simanjuntak, S.Ak.",
      ortu: "Putri sulung dari Bapak St. Marihot Simanjuntak & Ibu Rosmawati Br. Siahaan",
      foto: "foto/wanita.jpg",
      instagram: "tiurmasimanjuntak",
    },
    pria: {
      panggilan: "Daniel",
      nama: "Daniel Parulian Sitompul, S.T.",
      ortu: "Putra kedua dari Bapak Jonner Sitompul & Ibu Hotmaida Br. Nainggolan",
      foto: "foto/pria.jpg",
      instagram: "danielsitompul",
    },
  },

  salam: {
    pembuka: "Syalom dan Horas!",
    teks: "Dengan sukacita dan atas berkat Tuhan Yang Maha Kasih, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pemberkatan pernikahan dan pesta adat kami.",
    penutup: "Mauliate godang, Horas!",
  },

  ayat: {
    arti: "Dan bilamana seorang dapat dialahkan, dua orang akan dapat bertahan. Tali tiga lembar tak mudah diputuskan.",
    sumber: "Pengkhotbah 4:12",
  },

  pembuka: {
    judul: "Horas!",
    teks: "“Sahat-sahat ni solu, sahat ma tu bontean. Leleng ma hita mangolu, sai sahat ma tu panggabean.” Sampailah perahu ke tambatannya; panjanglah umur kita, sampai kepada kebahagiaan.",
  },

  judulBagian: {
    mempelai: ["Mempelai", "Boru dohot hela"],
    kisah: ["Kisah Kami", "Dari Naposo Bulung ke pelaminan"],
  },
  teks: {
    dariKami: "Mauliate, kami yang berbahagia",
  },

  teksAcara: "Dengan segala hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada pemberkatan dan pesta adat pernikahan kami:",

  acara: [
    {
      nama: "Pemberkatan Nikah",
      mulai: "2028-01-15T09:00:00+07:00",
      selesai: "2028-01-15T10:30:00+07:00",
      tempat: "HKBP Kernolong",
      alamat: "Jl. Kernolong, Kenari, Senen, Jakarta Pusat",
      peta: "HKBP Kernolong Jakarta",
      utama: true,
    },
    {
      nama: "Pesta Unjuk",
      mulai: "2028-01-15T12:00:00+07:00",
      selesai: "2028-01-15T17:00:00+07:00",
      tempat: "Gedung Sopo Marpingkir",
      alamat: "Jl. Jend. Ahmad Yani, Kayu Putih, Pulo Gadung, Jakarta Timur",
      peta: "Sopo Marpingkir Jakarta",
    },
  ],

  kisah: [
    { waktu: "2021", judul: "Naposo Bulung", teks: "Dipertemukan dalam persekutuan pemuda gereja. Sering melayani bersama, lalu saling mengenal lebih dekat." },
    { waktu: "2027", judul: "Marhusip & Martumpol", teks: "Kedua keluarga bermusyawarah dan menyampaikan janji di hadapan jemaat. Puji Tuhan, semua dimudahkan." },
    { waktu: "2028", judul: "Pesta Unjuk", teks: "Menerima ulos dan pasu-pasu dari keluarga besar, memulai hidup baru dalam Dalihan Na Tolu." },
  ],

  galeri: [
    // Urutan menentukan susunan mozaik: foto 1 besar (persegi), foto 7 lebar, foto 11 memanjang.
    "foto/g01.jpg", "foto/g02.jpg", "foto/g03.jpg", "foto/g12.jpg", "foto/g05.jpg", "foto/g06.jpg",
    "foto/g07.jpg", "foto/g08.jpg", "foto/g10.jpg", "foto/g04.jpg", "foto/g11.jpg", "foto/g09.jpg",
  ],

  hadiah: [
    { bank: "Bank BCA", nomor: "5420187736", nama: "Tiurma Simanjuntak" },
    { bank: "Bank Mandiri", nomor: "1220018845721", nama: "Daniel Parulian Sitompul" },
  ],
  alamatKado: "Jl. Cempaka Putih Tengah No. 21, Jakarta Pusat 10510 (a.n. Tiurma)",

  // Sementara memakai musik umum; ganti ke musik gondang atau uning-uningan Batak bila berkasnya sudah ada
  musik: "../../assets/musik/musik-1.m4a",

  penutup: "Merupakan suatu kehormatan dan sukacita bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doanya, kami ucapkan mauliate godang.",

  contohUcapan: [
    { nama: "Keluarga Besar Simanjuntak", hadir: "Hadir", ucapan: "Horas! Selamat menempuh hidup baru. Tuhan Yesus memberkati rumah tangga kalian." },
    { nama: "Teman Naposo Bulung", hadir: "Hadir", ucapan: "Selamat berbahagia Tiur dan Daniel. Sahat ma tu panggabean!" },
  ],
};
