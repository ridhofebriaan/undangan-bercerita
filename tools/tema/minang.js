// Template adat Minangkabau. Dibaca oleh tools/buat-tema.js.
// "Suntiang Gadang": 3 animasi mewah, yaitu Pintu Rumah Gadang (pembuka), Suntiang Mekar (hero), Songket Ditenun (tiap bagian).
const { AYAT, acara } = require("./_bersama.js");

const bawaan = {
  agama: "islam",
  label: "Baralek Gadang",
  salam: {
    pembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    teks: "Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta'ala serta restu ninik mamak, kami bermaksud menyelenggarakan baralek pernikahan anak kami.",
  },
  judulBagian: {
    mempelai: ["Mempelai", "Anak Daro & Marapulai"],
    countdown: ["Menuju Hari Baralek", "Insya Allah"],
    acara: ["Rangkaian Acara", "Hari & Tempat"],
    kisah: ["Kisah Kami", "Dari Rantau ke Pelaminan"],
    galeri: ["Galeri", "Kenangan"],
    rsvp: ["Ucapan & Doa", "Doa jo Restu"],
    hadiah: ["Amplop Digital", "Tanda Kasih"],
  },
  teks: { dariKami: "Tarimo kasih, kami yang berbahagia" },
  teksAcara: "Tanpa mengurangi rasa hormat, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada:",
  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doanya, kami ucapkan tarimo kasih.",
  musik: "../../assets/musik/musik-1.m4a",
  contohUcapan: [
    { nama: "Keluarga Mamak Datuak", hadir: "Hadir", ucapan: "Barakallahu lakuma. Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah." },
    { nama: "Kawan Sarantau", hadir: "Hadir", ucapan: "Selamat baralek! Bahagia dunia akhirat untuak kalian baduo." },
  ],
};

const PEMBUKA = {
  judul: "Adat Basandi Syarak",
  teks: "Syarak basandi Kitabullah. Dengan ridha Allah dan restu ninik mamak, dua keluarga bersatu dalam ikatan pernikahan.",
};

const KISAH = [
  { waktu: "2023", judul: "Bakenalan", teks: "Bertemu di rantau, sama-sama anak Minang yang merindukan kampung halaman." },
  { waktu: "2026", judul: "Maminang", teks: "Sesuai adat Minangkabau, keluarga Rahmi datang meminang ke rumah keluarga Fadhil. Alhamdulillah, diterima." },
  { waktu: "2026", judul: "Batimbang Tando", teks: "Kedua keluarga bertukar tanda sebagai ikatan janji menuju hari baralek." },
];

const tema = [
  {
    kode: "minang-suntiang-gadang",
    nama: "Suntiang Gadang",
    harga: 119000,
    tag: "Premium",
    deskripsi: "Merah marun dan emas Minang dengan 3 animasi mewah: pintu rumah gadang terbuka memancarkan cahaya emas, suntiang mekar tiga lapis, dan pita songket ditenun di setiap bagian.",
    warna: {
      bg: "#2b0a0e", surface: "#3b1117", ink: "#fbefe0", muted: "#e2c6b0", primary: "#e8c77a", primaryInk: "#2b0a0e",
      accent: "#d4a548", accentText: "#ebcb82", line: "#5a222b", gelap: "#140405", onGelap: "#fbefe0", accentGelap: "#ebcb82",
      coverBg: "#7a1220", coverInk: "#fff3e3", coverNama: "#f6d58a", coverAksen: "#f6d58a", coverMuted: "#f3d9c6",
      coverTombol: "#ebcb82", coverTombolInk: "#2b0a0e", coverOrn: "#ebcb82",
      pt1: "#f1d184", pt2: "#c99a3c", pt3: "#fff1c6",
    },
    font: { display: "Cormorant SC", nama: "Cinzel Decorative", body: "Crimson Pro" },
    tampilan: { buka: "gadang", gerak: "kabur", letak: "bingkai", pola: "songket", hias: "suntiang", gelap: ["countdown", "hadiah", "penutup"] },
    partikel: { jenis: "kelopak", jumlah: 14 },
    ayat: "arRum21",
    pembuka: true,
    bank: ["Bank Nagari", "Bank Syariah Indonesia"],
    pasangan: {
      wanita: ["Rahmi", "Annisa Rahmi Putri, S.Pd.", "Putri pertama dari Bapak H. Zulkarnain Dt. Rajo Lelo & Ibu Hj. Yusnimar", "Anak Daro"],
      pria: ["Fadhil", "Fadhil Ilham, S.T.", "Putra kedua dari Bapak Syafrizal & Ibu Nurhayati", "Marapulai · gala Sutan Bagindo"],
    },
    tanggal: "2027-06-26",
    kota: "Tanah Datar",
    acara: [
      ["Malam Bainai", "2027-06-25T20:00", "2027-06-25T22:00", "Rumah Gadang Keluarga Anak Daro", "Nagari Pariangan, Kec. Pariangan, Kab. Tanah Datar"],
      ["Akad Nikah", "08:00", "09:30", "Masjid Ishlah Pariangan", "Nagari Pariangan, Kec. Pariangan, Kab. Tanah Datar", true],
      ["Baralek", "11:00", null, "Rumah Gadang Keluarga Anak Daro", "Nagari Pariangan, Kec. Pariangan, Kab. Tanah Datar"],
    ],
    hashtag: "#RahmiFadhilBaralek",
    kisah: true,
    css: "",
  },
];

module.exports = { adat: "minang", namaAdat: "Minangkabau", bawaan, tema, AYAT, PEMBUKA, KISAH, acara };
