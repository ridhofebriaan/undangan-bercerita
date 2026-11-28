// Data undangan tema "Kori Agung" (adat Bali, Hindu), Format Pintu (docs/format-pintu.md).
// Untuk klien: salin folder ini ke site/u/<nama-pasangan>/, ganti foto di folder foto/ (nama file sama), lalu ubah isi file ini.
window.UNDANGAN = {
  id: "demo-bali-kori-agung",
  agama: "hindu",
  zonaWaktu: "WITA",
  label: "Pawiwahan",
  judul: "Undangan Pawiwahan Ayu & Arya",
  hashtag: "#AyuAryaRahajeng",

  foto: {
    sampul: "foto/sampul.jpg", // foto dalam bingkai lengkung di cover (tegak 3:4)
    hero: "foto/hero.jpg", // teks hero di bawah, jadi wajah boleh di sepertiga atas
  },
  kelopak: 14, // kelopak bunga jepun yang berjatuhan, 0 = mati

  pasangan: {
    urutan: "pria-dulu",
    pria: {
      panggilan: "Arya",
      nama: "I Made Arya Wiradharma, S.T.",
      ortu: "Putra kedua dari Bapak I Ketut Wiradana & Ibu Ni Made Sriani",
      foto: "foto/pria.jpg",
      instagram: "aryawiradharma",
    },
    wanita: {
      panggilan: "Ayu",
      nama: "Ni Putu Ayu Saraswati, S.Pd.",
      ortu: "Putri pertama dari Bapak I Nyoman Suarta & Ibu Ni Wayan Sukerti",
      foto: "foto/wanita.jpg",
      instagram: "ayusaraswati",
    },
  },

  salam: {
    pembuka: "Om Swastyastu",
    teks: "Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa, kami bermaksud mengundang Bapak/Ibu/Saudara/i pada Upacara Manusa Yadnya Pawiwahan putra-putri kami.",
    penutup: "Om Shanti Shanti Shanti Om",
  },

  ayat: {
    sloka: "Samtusto bharyaya bharta, bhartra bharya tathaiva ca, yasminn eva kule nityam, kalyanam tatra vai dhruvam.",
    arti: "Pada keluarga di mana suami berbahagia dengan istrinya, dan demikian pula istri terhadap suaminya, kebahagiaan pasti kekal.",
    sumber: "Manawa Dharmasastra III.60",
  },

  pembuka: {
    judul: "Om Awighnam Astu",
    teks: "Semoga tiada halangan. Dengan memohon restu Ida Sang Hyang Widhi Wasa, dua keluarga kami persatukan dalam ikatan suci pawiwahan.",
  },

  judulBagian: {
    mempelai: ["Mempelai", "Atas berkat Hyang Widhi"],
    kisah: ["Kisah Kami", "Dari sekaa teruna ke pelaminan"],
  },
  teks: {
    dariKami: "Matur suksma, kami yang berbahagia",
    contohUcapan: "Rahajeng pawiwahan, dumogi langgeng lan rahayu...",
    terimaKasih: "Matur suksma, ucapan Anda sudah terkirim.",
  },

  teksAcara: "Dengan segala hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada upacara dan resepsi pawiwahan kami:",

  acara: [
    {
      nama: "Upacara Pawiwahan",
      mulai: "2028-03-18T08:00:00+08:00",
      selesai: "2028-03-18T11:00:00+08:00",
      tempat: "Kediaman Keluarga I Ketut Wiradana",
      alamat: "Br. Taman Kaja, Ubud, Kabupaten Gianyar, Bali",
      peta: "Banjar Taman Kaja Ubud Gianyar",
      utama: true,
    },
    {
      nama: "Resepsi Pawiwahan",
      mulai: "2028-03-18T18:00:00+08:00",
      selesai: "2028-03-18T21:00:00+08:00",
      tempat: "Gedung Ksirarnawa, Taman Budaya Bali",
      alamat: "Jl. Nusa Indah No. 1, Panjer, Denpasar Selatan, Bali",
      peta: "Gedung Ksirarnawa Taman Budaya Denpasar",
    },
  ],

  kisah: [
    { waktu: "2021", judul: "Sekaa Teruna", teks: "Bertemu saat menyiapkan ogoh-ogoh bersama sekaa teruna banjar. Dari sering ngayah, kami saling mengenal lebih dekat." },
    { waktu: "2027", judul: "Memadik", teks: "Keluarga besar datang meminang secara adat. Hari baik pun dipilih bersama, rahajeng semua dimudahkan." },
    { waktu: "2028", judul: "Pawiwahan", teks: "Upacara mekala-kalaan dan natab banten menjadi awal kami membangun keluarga yang rahayu." },
  ],

  galeri: [
    // Urutan menentukan susunan mozaik: foto 1 besar (persegi), foto 7 lebar, foto 11 memanjang.
    "foto/g01.jpg", "foto/g02.jpg", "foto/g03.jpg", "foto/g04.jpg", "foto/g05.jpg", "foto/g06.jpg",
    "foto/g07.jpg", "foto/g08.jpg", "foto/g09.jpg", "foto/g10.jpg", "foto/g11.jpg", "foto/g12.jpg",
  ],

  hadiah: [
    { bank: "Bank BPD Bali", nomor: "0180202718845", nama: "I Made Arya Wiradharma" },
    { bank: "Bank BCA", nomor: "6110457823", nama: "Ni Putu Ayu Saraswati" },
  ],
  alamatKado: "Jl. Tukad Badung No. 27, Renon, Denpasar Selatan 80226 (a.n. Ayu)",

  musik: "../../assets/musik/musik-bali.m4a",

  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa restunya, kami ucapkan matur suksma.",

  contohUcapan: [
    { nama: "Keluarga Besar Suarta", hadir: "Hadir", ucapan: "Rahajeng pawiwahan Ayu lan Arya. Dumogi langgeng lan rahayu." },
    { nama: "Sekaa Teruna Banjar Taman", hadir: "Hadir", ucapan: "Selamat menempuh hidup baru, semeton! Semoga selalu bahagia." },
  ],
};
