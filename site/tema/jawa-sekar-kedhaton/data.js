// Data undangan tema "Sekar Kedhaton" (adat Jawa), kerangka v2 (docs/kerangka-undangan.md).
// Untuk klien: salin folder ini ke site/u/<nama-pasangan>/, ganti foto di foto/, lalu ubah isi file ini.
window.UNDANGAN = {
  id: "demo-jawa-sekar-kedhaton",
  kerangka: true,
  agama: "islam",
  label: "Pawiwahan",
  judul: "Undangan Pernikahan Larasati & Danang",
  hashtag: "#LarasDanangDhaup",
  aksara: { teks: "ꦱꦸꦒꦼꦁꦫꦮꦸꦃ", lang: "jv", arti: "Sugeng Rawuh (selamat datang)" },

  tampilan: { gelap: ["salam", "kisah", "countdown", "konfirmasi", "hadiah", "penutup"] },
  gayaFoto: { hero: "lengkung", heroMuncul: "tirai", profil: "lengkung", profilMuncul: "zoom", kisah: "lingkaran", kisahMuncul: "zoom", galeri: "mozaik" },
  foto: { utama: "foto/hero.jpg" },

  pasangan: {
    urutan: "wanita-dulu",
    wanita: { panggilan: "Larasati", nama: "Larasati Puspitasari, S.E.", ortu: "Putri kedua dari Bapak H. Suparno & Ibu Hj. Sri Rejeki", peran: "Temanten Putri", foto: "foto/wanita.jpg", instagram: "larasatips" },
    pria: { panggilan: "Danang", nama: "Danang Prasetyo, S.T.", ortu: "Putra pertama dari Bapak Budi Santoso & Ibu Endang Lestari", peran: "Temanten Kakung", foto: "foto/pria.jpg", instagram: "danangpras" },
  },

  salam: {
    pembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    teks: "Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan pawiwahan putra-putri kami.",
  },
  ayat: {
    arab: "وَمِن كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ لَعَلَّكُمْ تَذَكَّرُونَ",
    arti: "Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah).",
    sumber: "QS. Adz-Dzariyat: 49",
  },
  judulBagian: {
    mempelai: ["Mempelai", "Temanten"],
    kisah: ["Kisah Kami", "Lelampahan"],
    galeri: ["Momen Berharga", "Galeri"],
    countdown: ["Menuju Hari Bahagia", "Save the date"],
    acara: ["Rangkaian Acara", "Wekdal & papan"],
    rsvp: ["Ucapan & Doa", "Nyuwun pangestu"],
    hadiah: ["Tanda Kasih", "Amplop digital"],
  },
  teks: { dariKami: "Matur nuwun, kami yang berbahagia" },
  galeriKutipan: "“Sekar kang mekar ing taman, dados seksi tresna ingkang sejati.”",
  teksAcara: "Tanpa mengurangi rasa hormat, kami mengharap kehadiran Bapak/Ibu/Saudara/i pada:",

  acara: [
    { nama: "Midodareni", mulai: "2027-05-07T19:00:00+07:00", selesai: "2027-05-07T21:00:00+07:00", tempat: "Kediaman Mempelai Putri", alamat: "Jl. Slamet Riyadi No. 275, Penumping, Laweyan, Surakarta", peta: "Jl. Slamet Riyadi 275, Surakarta" },
    { nama: "Ijab Kabul", mulai: "2027-05-08T08:00:00+07:00", selesai: "2027-05-08T09:00:00+07:00", tempat: "Masjid Agung Surakarta", alamat: "Jl. Masjid Agung, Kauman, Pasar Kliwon, Surakarta", peta: "Masjid Agung Surakarta", utama: true },
    { nama: "Panggih & Resepsi", mulai: "2027-05-08T11:00:00+07:00", selesai: "2027-05-08T13:30:00+07:00", tempat: "Pendhapi Gedhe Balaikota Surakarta", alamat: "Jl. Jend. Sudirman No. 2, Kp. Baru, Pasar Kliwon, Surakarta", peta: "Pendhapi Gedhe Balaikota Surakarta" },
  ],

  kisah: [
    { waktu: "2021", judul: "Pertama Bertemu", teks: "Dipertemukan di sebuah acara keluarga. Sederhana, tanpa banyak kata, tapi meninggalkan kesan.", foto: "foto/g2.jpg" },
    { waktu: "2025", judul: "Nontoni & Lamaran", teks: "Keluarga Danang datang bersilaturahmi dan menyampaikan niat baik. Alhamdulillah, diterima dengan penuh syukur.", foto: "foto/g1.jpg" },
    { waktu: "2027", judul: "Pawiwahan", teks: "Insya Allah kami menikah. Terima kasih atas doa yang mengantar kami sampai di sini.", foto: "foto/g4.jpg" },
  ],
  galeri: ["foto/cover.jpg", "foto/g3.jpg", "foto/g2.jpg", "foto/g1.jpg", "foto/g4.jpg", "foto/hero.jpg"],

  jumlahKonfirmasi: 214,
  turutMengundang: ["Keluarga Besar Trah Hadiwijoyo", "Keluarga Besar Bapak Budi Santoso", "Paguyuban Warga Laweyan", "Rekan Kerja Bank Jateng"],
  streaming: { link: "https://www.youtube.com/", label: "Tonton Siaran Langsung", teks: "Bagi keluarga dan sahabat yang berhalangan hadir, ikuti ijab kabul kami secara langsung." },

  hadiah: [
    { bank: "Bank Jateng", nomor: "2031458720", nama: "Larasati Puspitasari" },
    { bank: "Bank BCA", nomor: "0154421877", nama: "Danang Prasetyo" },
  ],
  alamatKado: "Jl. Slamet Riyadi No. 275, Penumping, Laweyan, Surakarta 57141 (a.n. Larasati)",

  musik: "../../assets/musik/musik-1.m4a",
  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doanya, kami haturkan matur nuwun.",
  contohUcapan: [
    { nama: "Keluarga Pakdhe Harjo", hadir: "Hadir", ucapan: "Sugeng pawiwahan. Mugi dados keluarga ingkang sakinah, mawaddah, warahmah." },
    { nama: "Teman Kantor", hadir: "Hadir", ucapan: "Barakallahu lakuma. Bahagia selalu untuk kalian berdua." },
  ],
};
