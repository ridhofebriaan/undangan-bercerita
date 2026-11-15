// Data undangan tema "Baju Bodo" (adat Bugis), kerangka v2 (docs/kerangka-undangan.md).
// Untuk klien: salin folder ini ke site/u/<nama-pasangan>/, ganti foto di foto/, lalu ubah isi file ini.
window.UNDANGAN = {
  id: "demo-bugis-baju-bodo",
  kerangka: true,
  agama: "islam",
  zonaWaktu: "WITA",
  label: "Mappabotting",
  judul: "Undangan Pernikahan Tenri & Fikri",
  hashtag: "#TenriFikriMappabotting",
  // Aksara Lontara: "Mappabotting" (ditulis ma-pa-bo-ti, tanpa konsonan rangkap dan akhir, sesuai kaidah Lontara)
  aksara: { teks: "ᨆᨄᨅᨚᨈᨗ", lang: "bug", arti: "Mappabotting (pesta pernikahan)" },

  tampilan: { gelap: ["salam", "kisah", "countdown", "konfirmasi", "hadiah", "penutup"] },
  gayaFoto: { hero: "siluet", heroMuncul: "mekar", profil: "oval", profilMuncul: "mekar", kisah: "lengkung", kisahMuncul: "zoom", galeri: "film" },
  foto: { utama: "foto/utama.jpg" },

  pasangan: {
    urutan: "wanita-dulu",
    wanita: { panggilan: "Tenri", nama: "Andi Tenriawaru, S.H.", ortu: "Putri kedua dari Bapak H. Andi Mappasessu & Ibu Hj. Andi Besse", peran: "Botting Makkunrai", foto: "foto/wanita.jpg", instagram: "anditenri" },
    pria: { panggilan: "Fikri", nama: "Muhammad Fikri Ramadhan, S.T.", ortu: "Putra pertama dari Bapak H. Syamsuddin & Ibu Hj. Nurhaedah", peran: "Botting Woroane", foto: "foto/pria.jpg", instagram: "fikriramadhan" },
  },

  salam: {
    pembuka: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
    teks: "Dengan memohon rahmat dan ridha Allah Subhanahu wa Ta'ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami.",
  },
  ayat: {
    arab: "وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ ۚ إِن يَكُونُوا فُقَرَاءَ يُغْنِهِمُ اللَّهُ مِن فَضْلِهِ",
    arti: "Dan nikahkanlah orang-orang yang masih membujang di antara kamu, dan juga orang-orang yang layak (menikah) dari hamba-hamba sahayamu yang laki-laki dan perempuan. Jika mereka miskin, Allah akan memberi kemampuan kepada mereka dengan karunia-Nya.",
    sumber: "QS. An-Nur: 32",
  },
  judulBagian: {
    mempelai: ["Mempelai", "Botting"],
    kisah: ["Kisah Kami", "Dari rantau ke pelaminan"],
    galeri: ["Momen Berharga", "Galeri"],
    countdown: ["Menuju Hari Bahagia", "Save the date"],
    acara: ["Rangkaian Acara", "Wettu & onrong"],
    rsvp: ["Ucapan & Doa", "Doa restu"],
    hadiah: ["Tanda Kasih", "Amplop digital"],
  },
  teks: { dariKami: "Tabe', kami yang berbahagia" },
  galeriKutipan: "“Taro ada taro gau: apa yang diucapkan, itulah yang dilakukan.”",
  teksAcara: "Tanpa mengurangi rasa hormat, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada:",

  acara: [
    { nama: "Mappacci", mulai: "2027-11-12T19:30:00+08:00", selesai: "2027-11-12T21:30:00+08:00", tempat: "Kediaman Botting Makkunrai", alamat: "Jl. Andi Djemma No. 18, Banta-Bantaeng, Rappocini, Kota Makassar", peta: "Jl. Andi Djemma, Makassar" },
    { nama: "Akad Nikah", mulai: "2027-11-13T08:00:00+08:00", selesai: "2027-11-13T09:30:00+08:00", tempat: "Masjid Al-Markaz Al-Islami", alamat: "Jl. Masjid Raya No. 57, Bontoala, Kota Makassar", peta: "Masjid Al-Markaz Al-Islami Makassar", utama: true },
    { nama: "Mappasikarawa & Tudang Botting", mulai: "2027-11-13T11:00:00+08:00", selesai: "2027-11-13T14:00:00+08:00", tempat: "Hotel Claro Makassar", alamat: "Jl. A. P. Pettarani No. 3, Mannuruki, Tamalate, Kota Makassar", peta: "Hotel Claro Makassar" },
  ],

  kisah: [
    { waktu: "2021", judul: "Pertama Bertemu", teks: "Sama-sama merantau kuliah di Makassar, dipertemukan dalam satu kepanitiaan kampus.", foto: "foto/k1.jpg" },
    { waktu: "2026", judul: "Madduta", teks: "Keluarga Fikri datang madduta, melamar secara adat. Alhamdulillah, niat baik itu diterima.", foto: "foto/k2.jpg" },
    { waktu: "2026", judul: "Mappettu Ada", teks: "Kedua keluarga bermusyawarah menetapkan hari baik. Kata sepakat pun diikat menuju hari pernikahan.", foto: "foto/k3.jpg" },
  ],
  galeri: ["foto/g1.jpg", "foto/g2.jpg", "foto/g3.jpg", "foto/g4.jpg", "foto/g5.jpg", "foto/g6.jpg", "foto/g7.jpg"],

  jumlahKonfirmasi: 243,
  turutMengundang: ["Keluarga Besar H. Andi Mappasessu", "Keluarga Besar H. Syamsuddin", "Kerukunan Keluarga Sulawesi Selatan", "Rekan Kerja Bank Sulselbar"],
  streaming: { link: "https://www.youtube.com/", label: "Tonton Siaran Langsung", teks: "Bagi keluarga dan sahabat yang berhalangan hadir, ikuti akad nikah kami secara langsung." },

  hadiah: [
    { bank: "Bank Sulselbar", nomor: "1600214587", nama: "Andi Tenriawaru" },
    { bank: "Bank Syariah Indonesia", nomor: "7209184451", nama: "Muhammad Fikri Ramadhan" },
  ],
  alamatKado: "Jl. Andi Djemma No. 18, Banta-Bantaeng, Rappocini, Kota Makassar 90222 (a.n. Tenri)",

  // Sementara memakai musik umum; ganti ke musik kecapi Bugis bila berkasnya sudah ada
  musik: "../../assets/musik/musik-1.m4a",
  penutup: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doanya, kami ucapkan terima kasih.",
  contohUcapan: [
    { nama: "Keluarga Puang Haji", hadir: "Hadir", ucapan: "Barakallahu lakuma. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah." },
    { nama: "Teman Kampus", hadir: "Hadir", ucapan: "Selamat menempuh hidup baru, Tenri dan Fikri! Bahagia selalu." },
  ],
};
