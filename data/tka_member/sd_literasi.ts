import { TKAPaket } from "./types";

// ============================================================================
// BANK SOAL TKA MEMBER: SD/MI LITERASI MEMBACA & BAHASA INDONESIA CERIA (10 PAKET)
// Dibuat ramah, seru, dan menyenangkan untuk siswa kelas 6 dengan pembahasan lengkap
// ============================================================================

export const paketSDLiterasi: TKAPaket[] = [
  // --- PAKET 1: Petualangan Menyelamatkan Anak Kucing (Dasar) ---
  {
    id: "sd-lit-p1",
    subjectId: "bahasa-indonesia",
    jenjang: "SD/MI",
    mapelName: "Literasi Membaca Ceria SD",
    paketNumber: 1,
    title: "Paket 1: Detektif Cilik & Anak Kucing di Bawah Pohon Rindang",
    description: "Membaca teks cerita naratif sederhana, menemukan informasi tersurat, dan menentukan watak tokoh.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-LIT-01-01",
        tipe: "PG",
        stimulus: "Sore itu, sepulang sekolah, Dito dan Nisa mendengar suara mengeong lirih dari semak-semak dekat pohon beringin tua. Saat didekati dengan hati-hati, seekor anak kucing belang tiga tampak basah kuyup karena hujan deras tadi siang. Dito segera membuka jaketnya untuk menghangatkan anak kucing itu, sementara Nisa berlari ke warung terdekat untuk meminta kardus bekas dan membeli sedikit susu hangat.",
        pertanyaan: "Di manakah Dito dan Nisa pertama kali menemukan anak kucing belang tiga tersebut?",
        opsi: [
          "Di dalam ruang kelas sekolah",
          "Di warung dekat persimpangan jalan",
          "Di semak-semak dekat pohon beringin tua",
          "Di teras rumah Dito"
        ],
        kunci: "C",
        pembahasan: "Informasi tersurat pada kalimat pertama teks secara jelas menyebutkan: '...Dito dan Nisa mendengar suara mengeong lirih dari semak-semak dekat pohon beringin tua.' Jadi jawabannya adalah opsi C.",
        konsepKunci: "Menemukan informasi tersurat (lokasi kejadian) dalam teks narasi."
      },
      {
        nomor: 2,
        id: "SD-LIT-01-02",
        tipe: "MCMA",
        stimulus: "Perhatikan tindakan Dito dan Nisa saat menemukan anak kucing kedinginan.",
        pertanyaan: "Manakah nilai karakter dan sifat terpuji yang ditunjukkan oleh Dito dan Nisa?",
        opsi: [
          "Peduli dan menyayangi makhluk hidup",
          "Cepat tanggap menolong yang kesusahan",
          "Suka mengabaikan hewan yang terlantar",
          "Bekerja sama dan saling tolong menolong"
        ],
        kunci: ["A", "B", "D"],
        pembahasan: "Dito membuka jaket untuk menghangatkan kucing dan Nisa mencari kardus serta susu. Ini menunjukkan rasa kepedulian pada makhluk hidup (A), cepat tanggap (B), dan kerja sama yang baik (D). Pilihan C bertentangan dengan isi teks.",
        konsepKunci: "Mengidentifikasi watak tokoh dan amanat cerita."
      },
      {
        nomor: 3,
        id: "SD-LIT-01-03",
        tipe: "BS",
        pertanyaan: "Berdasarkan cerita di atas, anak kucing tersebut basah kuyup karena terjatuh ke dalam selokan yang dalam.",
        opsi: ["BENAR", "SALAH"],
        kunci: "SALAH",
        pembahasan: "Pada teks tertulis: '...tampak basah kuyup karena hujan deras tadi siang', bukan karena jatuh ke dalam selokan. Pernyataan SALAH.",
        konsepKunci: "Ketelitian menemukan fakta kejadian sesuai teks."
      },
      {
        nomor: 4,
        id: "SD-LIT-01-04",
        tipe: "PG",
        pertanyaan: "Makna kata 'lirih' pada kalimat '...mendengar suara mengeong lirih...' adalah...",
        opsi: [
          "Sangat keras dan menggelegar",
          "Pelan, lembut, dan sayup-sayup",
          "Cepat dan terburu-buru",
          "Kasar dan menakutkan"
        ],
        kunci: "B",
        pembahasan: "Menurut KBBI, kata 'lirih' berarti bersuara perlahan, lembut, tidak keras, atau sayup-sayup.",
        konsepKunci: "Memahami makna leksikal kata dalam konteks kalimat."
      },
      {
        nomor: 5,
        id: "SD-LIT-01-05",
        tipe: "BS",
        pertanyaan: "Nisa berinisiatif mencari kardus bekas dan membeli susu hangat untuk merawat anak kucing tersebut.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Teks menyatakan: '...sementara Nisa berlari ke warung terdekat untuk meminta kardus bekas dan membeli sedikit susu hangat.' Pernyataan BENAR.",
        konsepKunci: "Menilai kesesuaian pernyataan dengan isi teks bacaan."
      }
    ]
  },

  // --- PAKET 2: Festival Jajanan Tradisional Nusantara (Pemahaman Teks Informasi) ---
  {
    id: "sd-lit-p2",
    subjectId: "bahasa-indonesia",
    jenjang: "SD/MI",
    mapelName: "Literasi Membaca Ceria SD",
    paketNumber: 2,
    title: "Paket 2: Festival Kue Tradisional & Warisan Nenek Moyang",
    description: "Memahami teks eksposisi budaya, ide pokok paragraf, dan istilah khusus makanan tradisional.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-LIT-02-01",
        tipe: "PG",
        stimulus: "Kue klepon adalah salah satu jajanan pasar tradisional nusantara yang sangat digemari. Kue berbentuk bulat kenyal berwarna hijau ini terbuat dari tepung beras ketan yang diisi gula kelapa cair dan dibalut parutan kelapa gurih. Saat digigit, cairan gula merah yang manis akan meletus di dalam mulut, menciptakan perpaduan rasa manis dan gurih yang khas.",
        pertanyaan: "Ide pokok dari paragraf di atas adalah...",
        opsi: [
          "Harga kue klepon di pasar tradisional",
          "Ciri khas dan keunikan rasa kue klepon tradisional",
          "Cara memarut buah kelapa yang gurih",
          "Sejarah gula kelapa di nusantara"
        ],
        kunci: "B",
        pembahasan: "Paragraf tersebut membahas tentang kue klepon mulai dari bentuknya, bahan pembuatannya, hingga keunikan sensasi rasanya yang meletus di mulut. Ide pokoknya adalah ciri khas dan keunikan kue klepon tradisional.",
        konsepKunci: "Menentukan gagasan utama / ide pokok paragraf."
      },
      {
        nomor: 2,
        id: "SD-LIT-02-02",
        tipe: "MCMA",
        stimulus: "Perhatikan bahan-bahan utama pembuat kue klepon berdasarkan teks bacaan.",
        pertanyaan: "Bahan-bahan apa sajakah yang digunakan untuk membuat kue klepon?",
        opsi: [
          "Tepung beras ketan",
          "Gula kelapa (gula merah) cair",
          "Parutan kelapa gurih",
          "Cokelat batang impor"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Berdasarkan teks, klepon terbuat dari tepung beras ketan, gula kelapa cair, dan balutan parutan kelapa. Cokelat impor bukan bahan klepon tradisional.",
        konsepKunci: "Rincian isi teks informasi."
      },
      {
        nomor: 3,
        id: "SD-LIT-02-03",
        tipe: "BS",
        pertanyaan: "Warna hijau alami pada kue klepon biasanya diperoleh dari perasan daun suji atau daun pandan wangi.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Dalam budaya kuliner nusantara, warna hijau klepon didapat dari pewarna alami daun suji dan pandan wangi. Pernyataan BENAR.",
        konsepKunci: "Pengetahuan kearifan lokal pangan nusantara."
      },
      {
        nomor: 4,
        id: "SD-LIT-02-04",
        tipe: "PG",
        pertanyaan: "Kalimat manakah di bawah ini yang paling tepat menggunakan tanda koma (,) untuk perincian?",
        opsi: [
          "Ibu membeli ketan kelapa, dan gula merah.",
          "Ibu membeli ketan, kelapa, dan gula merah.",
          "Ibu, membeli ketan kelapa dan gula merah.",
          "Ibu membeli, ketan, kelapa, dan gula merah."
        ],
        kunci: "B",
        pembahasan: "Menurut kaidah tata bahasa Indonesia (EYD/PUEBI), tanda koma digunakan di antara unsur-unsur dalam perincian atau pembilangan: 'Ibu membeli ketan, kelapa, dan gula merah.'",
        konsepKunci: "Kaidah ejaan dan tanda baca perincian."
      },
      {
        nomor: 5,
        id: "SD-LIT-02-05",
        tipe: "BS",
        pertanyaan: "Sensasi khas yang dirasakan saat menggigit kue klepon adalah cairan gula merah yang meleleh dan meletus di mulut bercampur parutan kelapa gurih.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Sesuai dengan kalimat terakhir teks: 'Saat digigit, cairan gula merah yang manis akan meletus di dalam mulut, menciptakan perpaduan rasa manis dan gurih yang khas.' Pernyataan BENAR.",
        konsepKunci: "Konfirmasi kebenaran informasi bacaan."
      }
    ]
  },

  // --- PAKET 3: Rahasia Burung Elang & Hutan Lindung (Analisis Hubungan Sebab Akibat) ---
  {
    id: "sd-lit-p3",
    subjectId: "bahasa-indonesia",
    jenjang: "SD/MI",
    mapelName: "Literasi Membaca Ceria SD",
    paketNumber: 3,
    title: "Paket 3: Sahabat Rimba & Rantai Makanan Hutan Hujan",
    description: "Menganalisis hubungan sebab akibat, simpulan paragraf, dan fungsi ekosistem satwa lindung.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-LIT-03-01",
        tipe: "PG",
        stimulus: "Burung elang jawa merupakan salah satu predator puncak di hutan tropis pulau Jawa. Keberadaannya sangat penting untuk mengontrol populasi tikus hutan, ular, dan tupai agar tidak berkembang biak secara berlebihan. Namun, perburuan liar dan penyempitan habitat hutan membuat jumlah elang jawa semakin langka.",
        pertanyaan: "Apa dampak yang akan terjadi jika populasi burung elang jawa di hutan punah?",
        opsi: [
          "Hutan akan semakin luas",
          "Populasi tikus hutan dan ular dapat melonjak tanpa kendali",
          "Pohon-pohon di hutan akan cepat berbuah",
          "Semua hewan karnivora lainnya akan ikut punah seketika"
        ],
        kunci: "B",
        pembahasan: "Karena elang jawa adalah predator pemangsa tikus dan ular, jika elang punah, maka mangsanya (tikus dan ular) akan berkembang biak secara tidak terkendali sehingga merusak keseimbangan rantai makanan.",
        konsepKunci: "Prediksi logis berdasarkan hubungan sebab-akibat ekologis."
      },
      {
        nomor: 2,
        id: "SD-LIT-03-02",
        tipe: "MCMA",
        stimulus: "Perhatikan faktor-faktor yang menyebabkan kelangkaan satwa langka pada bacaan.",
        pertanyaan: "Penyebab utama berkurangnya populasi elang jawa menurut teks adalah...",
        opsi: [
          "Perburuan liar oleh manusia yang tidak bertanggung jawab",
          "Penyempitan dan kerusakan habitat hutan tempat tinggalnya",
          "Elang jawa tidak suka makan daging",
          "Serangan predator air tawar"
        ],
        kunci: ["A", "B"],
        pembahasan: "Teks menyatakan: 'Namun, perburuan liar dan penyempitan habitat hutan membuat jumlah elang jawa semakin langka.' Jawaban A dan B benar.",
        konsepKunci: "Menemukan faktor penyebab masalah pada teks sains/lingkungan."
      },
      {
        nomor: 3,
        id: "SD-LIT-03-03",
        tipe: "BS",
        pertanyaan: "Burung elang jawa sering dijadikan lambang kebanggaan satwa nasional karena kemiripannya dengan burung Garuda Pancasila.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Secara ilmiah dan budaya, elang jawa (Nisaetus bartelsi) ditetapkan sebagai satwa nasional perlambang Garuda karena jambul khas di kepalanya. Pernyataan BENAR.",
        konsepKunci: "Integrasi literasi satwa langka nusantara."
      },
      {
        nomor: 4,
        id: "SD-LIT-03-04",
        tipe: "PG",
        pertanyaan: "Antonim (lawan kata) dari kata 'langka' adalah...",
        opsi: ["Sedikit", "Banyak / melimpah", "Mahal", "Unik"],
        kunci: "B",
        pembahasan: "Langka artinya jarang ditemukan atau sedikit jumlahnya. Lawan kata (antonim) dari langka adalah melimpah, banyak, atau sering dijumpai.",
        konsepKunci: "Hubungan antonim kata."
      },
      {
        nomor: 5,
        id: "SD-LIT-03-05",
        tipe: "BS",
        pertanyaan: "Memelihara satwa langka yang dilindungi undang-undang di dalam sangkar rumah diperbolehkan secara bebas tanpa izin pemerintah.",
        opsi: ["BENAR", "SALAH"],
        kunci: "SALAH",
        pembahasan: "Satwa langka dilindungi oleh undang-undang konservasi sumber daya alam hayati dan tidak boleh ditangkap atau dipelihara secara bebas tanpa izin resmi balai konservasi. Pernyataan SALAH.",
        konsepKunci: "Sikap sadar hukum dan pelestarian lingkungan."
      }
    ]
  },

  // --- PAKET 4: Detektif Energi Terbarukan & Rumah Ramah Lingkungan (Menengah) ---
  {
    id: "sd-lit-p4",
    subjectId: "bahasa-indonesia",
    jenjang: "SD/MI",
    mapelName: "Literasi Membaca Ceria SD",
    paketNumber: 4,
    title: "Paket 4: Rumah Panel Surya & Energi Bersih Masa Depan",
    description: "Membaca teks petunjuk infografis, istilah sains energi terbarukan, dan menyusun ringkasan bacaan.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-LIT-04-01",
        tipe: "PG",
        stimulus: "Keluarga Bayu memasang panel surya di atap rumah mereka. Panel surya bekerja dengan cara menangkap sinar matahari pada siang hari dan mengubahnya menjadi energi listrik melalui sel fotovoltaik. Energi listrik ini disimpan ke dalam baterai besar sehingga dapat digunakan untuk menyalakan lampu, kipas angin, dan televisi di malam hari tanpa menghasilkan polusi asap.",
        pertanyaan: "Bagaimanakah cara kerja panel surya menurut teks di atas?",
        opsi: [
          "Mengumpulkan angin kencang untuk memutar baling-baling",
          "Menangkap sinar matahari dan mengubahnya menjadi listrik melalui sel fotovoltaik",
          "Membakar minyak tanah untuk memanaskan generator",
          "Menyaring air hujan menjadi uap bertekanan tinggi"
        ],
        kunci: "B",
        pembahasan: "Teks menjelaskan: 'Panel surya bekerja dengan cara menangkap sinar matahari pada siang hari dan mengubahnya menjadi energi listrik melalui sel fotovoltaik.' Opsi B adalah jawaban yang paling tepat.",
        konsepKunci: "Memahami teks prosedur dan cara kerja alat sains."
      },
      {
        nomor: 2,
        id: "SD-LIT-04-02",
        tipe: "MCMA",
        stimulus: "Perhatikan manfaat pemanfaatan energi matahari di rumah.",
        pertanyaan: "Keunggulan menggunakan panel surya di rumah antara lain...",
        opsi: [
          "Menghemat tagihan biaya listrik bulanan",
          "Merupakan sumber energi ramah lingkungan yang tidak menimbulkan polusi asap",
          "Memanfaatkan energi matahari yang melimpah dan tidak pernah habis",
          "Hanya bisa bekerja saat turun hujan lebat"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Panel surya ramah lingkungan, memanfaatkan sinar matahari terbarukan, dan menghemat biaya listrik. Pilihan D salah karena panel surya justru membutuhkan sinar matahari, bukan hujan lebat.",
        konsepKunci: "Mengidentifikasi keuntungan teknologi ramah lingkungan."
      },
      {
        nomor: 3,
        id: "SD-LIT-04-03",
        tipe: "BS",
        pertanyaan: "Matahari, angin, dan aliran air tergolong sebagai sumber energi terbarukan karena ketersediaannya melimpah dan dapat pulih secara alami.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Energi terbarukan adalah energi yang bersumber dari alam yang tidak akan habis, seperti surya, air, angin, dan panas bumi. Pernyataan BENAR.",
        konsepKunci: "Definisi energi terbarukan."
      },
      {
        nomor: 4,
        id: "SD-LIT-04-04",
        tipe: "PG",
        pertanyaan: "Kata berimbuhan yang bermakna 'melakukan tindakan' pada kalimat 'Keluarga Bayu memasang panel surya...' adalah...",
        opsi: ["Keluarga", "Memasang", "Panel", "Surya"],
        kunci: "B",
        pembahasan: "Kata 'memasang' berasal dari kata dasar 'pasang' yang mendapat awalan me- sehingga membentuk kata kerja aktif transitif yang menyatakan perbuatan/tindakan.",
        konsepKunci: "Tata bentukan kata (morfologi) verba berimbuhan."
      },
      {
        nomor: 5,
        id: "SD-LIT-04-05",
        tipe: "BS",
        pertanyaan: "Energi matahari yang telah diubah menjadi energi listrik dapat disimpan dalam baterai untuk cadangan di malam hari.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Teks menyatakan: 'Energi listrik ini disimpan ke dalam baterai besar sehingga dapat digunakan untuk menyalakan lampu, kipas angin, dan televisi di malam hari...' Pernyataan BENAR.",
        konsepKunci: "Verifikasi informasi teknis dalam bacaan."
      }
    ]
  },

  // --- PAKET 5: Cerita Fabel Modern Si Kancil & Robot Pembersih Sungai (Kreatif Menengah) ---
  {
    id: "sd-lit-p5",
    subjectId: "bahasa-indonesia",
    jenjang: "SD/MI",
    mapelName: "Literasi Membaca Ceria SD",
    paketNumber: 5,
    title: "Paket 5: Fabel Modern: Si Kancil & Inovasi Robot Pembersih Sungai",
    description: "Menganalisis fabel modern, amanat tersirat, gaya bahasa personifikasi, dan konflik cerita.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-LIT-05-01",
        tipe: "PG",
        stimulus: "Di Hutan Harapan, aliran sungai mulai tercemar oleh botol plastik yang hanyut dari hilir. Kancil yang cerdik tidak tinggal diam. Bersama Berang-berang yang ahli menyelam dan Burung Pipit si penjelajah udara, mereka merakit sebuah perahu jaring bertenaga kayuhan kincir air untuk menjaring sampah-sampah plastik. Berkat kerja keras mereka, sungai hutan kembali jernih dan ikan-ikan dapat berenang dengan riang.",
        pertanyaan: "Apakah peran Kancil dan teman-temannya dalam cerita di atas?",
        opsi: [
          "Memburu ikan di sungai hutan",
          "Merakit perahu jaring untuk membersihkan sampah plastik di sungai",
          "Menebang pohon di sekitar bantaran sungai",
          "Membangun bendungan raksasa yang menutup aliran air"
        ],
        kunci: "B",
        pembahasan: "Kancil, Berang-berang, dan Pipit berkolaborasi merakit perahu jaring bertenaga kincir air untuk menjaring botol plastik di sungai.",
        konsepKunci: "Menemukan inti tindakan tokoh dalam alur cerita."
      },
      {
        nomor: 2,
        id: "SD-LIT-05-02",
        tipe: "MCMA",
        stimulus: "Perhatikan pesan moral yang terkandung dalam fabel modern tersebut.",
        pertanyaan: "Amanat moral yang dapat kita petik dari fabel Si Kancil adalah...",
        opsi: [
          "Kecerdasan hendaknya digunakan untuk hal bermanfaat dan menolong sesama",
          "Menjaga kebersihan lingkungan sungai adalah tanggung jawab bersama",
          "Kerja sama yang baik antarteman akan membuahkan hasil yang memuaskan",
          "Membuang sampah ke sungai adalah hal biasa yang tidak merugikan"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Cerita mengajarkan pentingnya memanfaatkan akal untuk kebaikan, menjaga sungai dari sampah, dan gotong royong memecahkan masalah. Pilihan D adalah perilaku tercela.",
        konsepKunci: "Menggali pesan moral dan amanat cerita fabel."
      },
      {
        nomor: 3,
        id: "SD-LIT-05-03",
        tipe: "BS",
        pertanyaan: "Kalimat '...ikan-ikan dapat berenang dengan riang' menggunakan gaya bahasa personifikasi yang mengibaratkan ikan berperasaan gembira seperti manusia.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Majas personifikasi melekatkan sifat, emosi, atau perilaku manusia (berenang riang gembira) kepada benda mati atau hewan. Pernyataan BENAR.",
        konsepKunci: "Majas personifikasi dalam teks sastra anak."
      },
      {
        nomor: 4,
        id: "SD-LIT-05-04",
        tipe: "PG",
        pertanyaan: "Kalimat berikut yang merupakan kalimat ajakan (persuasif) yang santun untuk menjaga sungai adalah...",
        opsi: [
          "Sungai di hutan itu sangat kotor dan bau busuk.",
          "Mari kita jaga kelestarian sungai kita dengan tidak membuang sampah sembarangan!",
          "Siapa yang membuang sampah di sini?",
          "Perahu jaring kancil terbuat dari bambu dan jaring bekas."
        ],
        kunci: "B",
        pembahasan: "Kalimat ajakan ditandai dengan kata persuasif seperti 'mari', 'ayo', atau 'hendaknya' yang mengajak pembaca berbuat baik secara santun.",
        konsepKunci: "Mengenali jenis kalimat ajakan (persuasif)."
      },
      {
        nomor: 5,
        id: "SD-LIT-05-05",
        tipe: "BS",
        pertanyaan: "Masalah utama yang memicu Kancil bertindak adalah sungai di Hutan Harapan mulai tercemar oleh sampah botol plastik.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Kalimat pertama menyatakan: 'Di Hutan Harapan, aliran sungai mulai tercemar oleh botol plastik yang hanyut dari hilir. Kancil yang cerdik tidak tinggal diam.' Pernyataan BENAR.",
        konsepKunci: "Konflik awal dalam alur narasi fiksi."
      }
    ]
  },

  // --- PAKET 6: Petualangan Menembus Candi Megah Nusantara (Literasi Sejarah & Budaya) ---
  {
    id: "sd-lit-p6",
    subjectId: "bahasa-indonesia",
    jenjang: "SD/MI",
    mapelName: "Literasi Membaca Ceria SD",
    paketNumber: 6,
    title: "Paket 6: Megahnya Relief Candi Borobudur & Nilai Kejujuran",
    description: "Memahami teks deskripsi sejarah, membedakan fakta dan opini, serta menyimpulkan nilai luhur bangsa.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-LIT-06-01",
        tipe: "PG",
        stimulus: "Candi Borobudur dibangun pada masa Dinasti Syailendra sekitar abad ke-8 masehi di Magelang, Jawa Tengah. Bangunan megah ini disusun dari jutaan balok batu andesit vulkanik tanpa menggunakan semen perekat sama sekali, melainkan menggunakan sistem kancing sambungan batu yang saling mengunci dengan presisi tinggi. Di sepanjang dinding candi terpahat relief indah yang mengisahkan ajaran moral dan kehidupan masyarakat masa lalu.",
        pertanyaan: "Bagaimanakah cara para arsitek masa lalu menyusun balok batu Candi Borobudur?",
        opsi: [
          "Menggunakan adukan semen dan pasir modern",
          "Menggunakan paku besi dan kawat baja",
          "Menggunakan sistem kancing sambungan batu yang saling mengunci tanpa semen",
          "Direkatkan dengan getah pohon karet yang dipanaskan"
        ],
        kunci: "C",
        pembahasan: "Teks menyatakan: '...tanpa menggunakan semen perekat sama sekali, melainkan menggunakan sistem kancing sambungan batu yang saling mengunci dengan presisi tinggi.'",
        konsepKunci: "Fakta sejarah arsitektur candi nusantara."
      },
      {
        nomor: 2,
        id: "SD-LIT-06-02",
        tipe: "MCMA",
        stimulus: "Perhatikan kalimat-kalimat berikut dan tentukan mana yang merupakan kalimat FAKTA.",
        pertanyaan: "Manakah kalimat berikut yang tergolong FAKTA berdasarkan teks?",
        opsi: [
          "Candi Borobudur terletak di Kabupaten Magelang, Jawa Tengah.",
          "Candi Borobudur dibangun pada masa Dinasti Syailendra sekitar abad ke-8.",
          "Semua wisatawan pasti menyukai relief Candi Borobudur melebihi objek wisata lainnya.",
          "Balok batu penyusun candi adalah batu andesit vulkanik."
        ],
        kunci: ["A", "B", "D"],
        pembahasan: "A, B, dan D memuat data objektif yang terbukti secara historis dan geografis. Opsi C memuat kata 'pasti menyukai' yang bersifat subjektif (opini).",
        konsepKunci: "Membedakan kalimat fakta dan opini dalam teks."
      },
      {
        nomor: 3,
        id: "SD-LIT-06-03",
        tipe: "BS",
        pertanyaan: "Sistem sambungan batu yang saling mengunci pada Candi Borobudur terbukti membuat bangunan tersebut tahan terhadap guncangan gempa bumi selama berabad-abad.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Teknik kuncian interlocking stone memungkinkan energi gempa tersalurkan tanpa membuat susunan batu runtuh seketika. Pernyataan BENAR.",
        konsepKunci: "Penalaran ilmiah atas karya arsitektur kuno."
      },
      {
        nomor: 4,
        id: "SD-LIT-06-04",
        tipe: "PG",
        pertanyaan: "Sinonim (persamaan kata) dari kata 'presisi' dalam teks adalah...",
        opsi: ["Kira-kira", "Tepat / akurat", "Lambat", "Keras"],
        kunci: "B",
        pembahasan: "Presisi berarti ketepatan yang tinggi, kecermatan, atau akurat.",
        konsepKunci: "Sinonim kosakata serapan."
      },
      {
        nomor: 5,
        id: "SD-LIT-06-05",
        tipe: "BS",
        pertanyaan: "Menjaga kelestarian candi dapat dilakukan dengan cara membuang sampah pada tempatnya dan tidak mencoret-coret relief dinding candi.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Menjaga kebersihan dan tidak melakukan vandalisme merupakan wujud nyata kepedulian terhadap cagar budaya bangsa. Pernyataan BENAR.",
        konsepKunci: "Sikap positif merawat warisan budaya."
      }
    ]
  },

  // --- PAKET 7: Waspada Hoaks di Era Digital & Literasi Kritis (HOTS Menengah) ---
  {
    id: "sd-lit-p7",
    subjectId: "bahasa-indonesia",
    jenjang: "SD/MI",
    mapelName: "Literasi Membaca Ceria SD",
    paketNumber: 7,
    title: "Paket 7: Detektif Digital & Waspada Berita Bohong (Anti-Hoaks)",
    description: "Menganalisis teks persuasi digital, memverifikasi kebenaran informasi, dan etika berinternet sehat.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-LIT-07-01",
        tipe: "PG",
        stimulus: "Kemarin malam, sebuah pesan berantai masuk ke grup gawai kelas 6. Pesan itu berisi: 'Bagi-bagi laptop dan kuota internet gratis 100 GB dari kementerian, klik tautan rahasia ini sekarang juga sebelum kehabisan!'. Farhan yang cermat tidak langsung percaya. Ia memeriksa situs resmi kementerian dan berkonsultasi kepada Bu Guru. Ternyata, pesan tersebut adalah hoaks penipuan yang bertujuan mencuri data pribadi pengguna.",
        pertanyaan: "Mengapa Farhan tidak langsung mengklik tautan hadiah pada pesan berantai tersebut?",
        opsi: [
          "Karena gawai Farhan sedang rusak",
          "Karena Farhan bersikap cermat dan memeriksa kebenaran informasi ke sumber resmi",
          "Karena Farhan tidak memerlukan laptop dan kuota",
          "Karena Farhan malas membaca pesan"
        ],
        kunci: "B",
        pembahasan: "Farhan bersikap kritis dan cermat. Ia memeriksa situs resmi dan bertanya kepada gurunya untuk memverifikasi kebenaran sebelum bertindak.",
        konsepKunci: "Sikap bernalar kritis terhadap informasi digital (anti-phishing)."
      },
      {
        nomor: 2,
        id: "SD-LIT-07-02",
        tipe: "MCMA",
        stimulus: "Perhatikan ciri-ciri pesan bohong (hoaks) yang sering beredar di media sosial.",
        pertanyaan: "Ciri-ciri berita atau pesan bohong (hoaks) antara lain adalah...",
        opsi: [
          "Judulnya provokatif dan menghebohkan secara berlebihan",
          "Meminta penerima pesan untuk segera menyebarkan (viral) dengan iming-iming hadiah",
          "Menggunakan tautan situs tidak resmi yang mencurigakan",
          "Diterbitkan secara resmi di portal web kementerian atau kantor berita terpercaya"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Pesan hoaks biasanya memicu kepanikan/antusiasme berlebihan, menyuruh membagikan ke banyak orang, dan tautan acak mencurigakan. Berita resmi justru diterbitkan di kanal terpercaya. Pilihan A, B, dan C benar.",
        konsepKunci: "Karakteristik berita hoaks vs berita valid."
      },
      {
        nomor: 3,
        id: "SD-LIT-07-03",
        tipe: "BS",
        pertanyaan: "Membagikan berita yang belum jelas kebenarannya ke grup keluarga atau teman dapat merugikan orang lain dan melanggar etika bermedia sosial.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Saring sebelum berbagi (sharing) adalah prinsip utama literasi digital agar tidak menimbulkan keresahan masyarakat. Pernyataan BENAR.",
        konsepKunci: "Etika kewarganegaraan digital."
      },
      {
        nomor: 4,
        id: "SD-LIT-07-04",
        tipe: "PG",
        pertanyaan: "Langkah terbaik pertama kali yang harus dilakukan anak sekolah saat menerima pesan mencurigakan berisi undian berhadiah adalah...",
        opsi: [
          "Segera mengisi formulir nama lengkap dan nomor kartu keluarga",
          "Meneruskan pesan ke seluruh kontak di gawai",
          "Mengonfirmasikan pesan tersebut kepada orang tua atau guru",
          "Menghapus nomor telepon orang tua"
        ],
        kunci: "C",
        pembahasan: "Mengonfirmasi kepada orang tua atau guru adalah langkah paling aman dan bijak bagi siswa untuk menghindari penipuan daring.",
        konsepKunci: "Prosedur keamanan berinternet bagi anak."
      },
      {
        nomor: 5,
        id: "SD-LIT-07-05",
        tipe: "BS",
        pertanyaan: "Istilah 'tautan' dalam bahasa Indonesia merupakan padanan baku dari kata asing 'link' atau 'hyperlink'.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Sesuai dengan pedoman peristilahan bahasa Indonesia oleh Badan Bahasa Kemendikdasmen, padanan resmi dari kata 'link' adalah 'tautan'. Pernyataan BENAR.",
        konsepKunci: "Kosakata baku bidang teknologi informasi."
      }
    ]
  },

  // --- PAKET 8: Ekspedisi Terumbu Karang & Kekayaan Maritim (HOTS Lanjutan) ---
  {
    id: "sd-lit-p8",
    subjectId: "bahasa-indonesia",
    jenjang: "SD/MI",
    mapelName: "Literasi Membaca Ceria SD",
    paketNumber: 8,
    title: "Paket 8: Taman Bawah Laut Raja Ampat & Mutiara Khatulistiwa",
    description: "Menganalisis teks laporan hasil observasi laut, kosakata lingkungan maritim, dan kesimpulan komprehensif.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-LIT-08-01",
        tipe: "PG",
        stimulus: "Kepulauan Raja Ampat di Papua Barat Daya dikenal sebagai jantung segitiga terumbu karang dunia. Wilayah perairan ini menjadi rumah bagi lebih dari 540 jenis karang keras dan ribuan spesies ikan hias warna-warni. Keberadaan terumbu karang yang sehat tidak hanya menjadi benteng alami pemecah gelombang tsunami bagi pulau-pulau kecil, tetapi juga menjadi tempat pembibitan ikan yang menyokong mata pencaharian nelayan tradisional setempat.",
        pertanyaan: "Mengapa terumbu karang di Raja Ampat memiliki peran yang sangat penting bagi masyarakat pesisir?",
        opsi: [
          "Karena dapat dijadikan bahan tambang bangunan",
          "Sebagai benteng alami pelindung pantai dan tempat berkembang biak ikan tangkapan nelayan",
          "Karena membuat air laut menjadi tawar",
          "Untuk mempermudah kapal besar berlabuh di pantai"
        ],
        kunci: "B",
        pembahasan: "Teks menyatakan dua fungsi utama: menjadi benteng alami pemecah gelombang dan tempat pembibitan ikan yang menyokong nelayan.",
        konsepKunci: "Fungsi ekologis dan ekonomis ekosistem terumbu karang."
      },
      {
        nomor: 2,
        id: "SD-LIT-08-02",
        tipe: "MCMA",
        stimulus: "Perhatikan ancaman yang membahayakan terumbu karang laut.",
        pertanyaan: "Aktivitas manusia yang dapat merusak terumbu karang laut adalah...",
        opsi: [
          "Menangkap ikan menggunakan bom ikan atau racun sianida",
          "Membuang sampah plastik dan limbah kimia ke laut",
          "Menanam kembali bibit terumbu karang (transplantasi karang)",
          "Menginjak-injak karang saat berenang atau menyelam"
        ],
        kunci: ["A", "B", "D"],
        pembahasan: "Bom ikan, racun, sampah plastik, dan terinjak wisatawan dapat menghancurkan karang yang membutuhkan puluhan tahun untuk tumbuh. Transplantasi karang (C) justru kegiatan penyelamatan.",
        konsepKunci: "Analisis dampak aktivitas manusia terhadap biosfer laut."
      },
      {
        nomor: 3,
        id: "SD-LIT-08-03",
        tipe: "BS",
        pertanyaan: "Terumbu karang adalah kumpulan hewan kecil bernama polip yang bersimbiosis dengan alga bersel satu, bukan sekadar bebatuan mati.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Secara biologi, karang merupakan koloni hewan avertebrata kecil (polip) yang bersimbiosis dengan alga zooxanthellae. Pernyataan BENAR.",
        konsepKunci: "Pemahaman sains kelautan dalam teks literasi."
      },
      {
        nomor: 4,
        id: "SD-LIT-08-04",
        tipe: "PG",
        pertanyaan: "Kalimat di bawah ini yang menggunakan kata penghubung (konjungsi) antarparagraf yang menyatakan 'pertentangan' adalah...",
        opsi: [
          "Oleh karena itu, kita harus menjaga kebersihan pantai.",
          "Namun, perusakan terumbu karang masih terus terjadi di beberapa lokasi.",
          "Kemudian para nelayan kembali berlayar ke tengah samudra.",
          "Selain itu, Raja Ampat juga memiliki burung cendrawasih yang memesona."
        ],
        kunci: "B",
        pembahasan: "Konjungsi 'Namun' berfungsi menyatakan hubungan pertentangan dengan kalimat sebelumnya.",
        konsepKunci: "Penggunaan konjungsi koordinatif dan antarkalimat."
      },
      {
        nomor: 5,
        id: "SD-LIT-08-05",
        tipe: "BS",
        pertanyaan: "Indonesia disebut sebagai negara maritim karena sebagian besar wilayah kedaulatannya berupa lautan dan kepulauan yang luas.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Negara maritim adalah negara yang sebagian besar wilayahnya terdiri dari perairan dan memiliki budaya kelautan yang kuat. Pernyataan BENAR.",
        konsepKunci: "Konsep wawasan kemaritiman Indonesia."
      }
    ]
  },

  // --- PAKET 9: Puisi Alam & Tafsir Makna Kiasan (Apresiasi Sastra Cilik) ---
  {
    id: "sd-lit-p9",
    subjectId: "bahasa-indonesia",
    jenjang: "SD/MI",
    mapelName: "Literasi Membaca Ceria SD",
    paketNumber: 9,
    title: "Paket 9: Melodi Gemericik Air & Makna Kiasan Puisi Sahabat",
    description: "Menganalisis teks puisi anak, suasana batin pengarang, rima, dan makna konotasi kata.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-LIT-09-01",
        tipe: "PG",
        stimulus: "Bacalah kutipan puisi berikut dengan cermat:\n\n'Di pucuk cemara angin bernyanyi,\nMenyapa embun yang bergelantungan suci.\nLangkah kaki melangkah pasti,\nMenuntut ilmu menggapai mimpi.'\n",
        pertanyaan: "Suasana yang paling terpancar dalam bait puisi anak di atas adalah...",
        opsi: [
          "Sedih dan penuh ratapan duka",
          "Semangat, ceria, dan penuh harapan di pagi hari",
          "Takut menghadapi malam yang gelap",
          "Marah karena kegagalan ujian"
        ],
        kunci: "B",
        pembahasan: "Gambaran pucuk cemara, embun pagi, dan langkah kaki pasti menuntut ilmu menggapai mimpi memancarkan suasana pagi yang segar, penuh optimisme, dan semangat membara.",
        konsepKunci: "Menentukan suasana puisi anak."
      },
      {
        nomor: 2,
        id: "SD-LIT-09-02",
        tipe: "MCMA",
        stimulus: "Perhatikan baris pertama: 'Di pucuk cemara angin bernyanyi'.",
        pertanyaan: "Pernyataan yang BENAR mengenai baris puisi tersebut adalah:",
        opsi: [
          "Menggunakan majas personifikasi karena mengumpamakan angin bernyanyi seperti manusia.",
          "Makna angin bernyanyi menggambarkan suara hembusan semilir angin yang merdu.",
          "Angin tersebut benar-benar memegang mikrofon dan menyanyikan lagu anak.",
          "Menimbulkan citraan pendengaran (auditori) bagi pembaca."
        ],
        kunci: ["A", "B", "D"],
        pembahasan: "Angin bernyanyi adalah personifikasi (A), maknanya suara desir angin sejuk (B), dan menghidupkan citraan pendengaran pembaca (D). Pilihan C tidak masuk akal.",
        konsepKunci: "Analisis majas dan citraan dalam puisi."
      },
      {
        nomor: 3,
        id: "SD-LIT-09-03",
        tipe: "BS",
        pertanyaan: "Rima akhir pada bait puisi di atas berpola a-a-a-a (berbunyi akhir 'i' pada keempat barisnya: bernyanyi, suci, pasti, mimpi).",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Baris 1 berakhiran -yi, baris 2 -ci, baris 3 -ti, baris 4 -pi. Semuanya berima akhir vokal 'i'. Pola rimanya sama. Pernyataan BENAR.",
        konsepKunci: "Menganalisis rima sajak puisi."
      },
      {
        nomor: 4,
        id: "SD-LIT-09-04",
        tipe: "PG",
        pertanyaan: "Amanat utama yang ingin disampaikan penyair melalui puisi tersebut adalah...",
        opsi: [
          "Kita harus tidur lebih lama di pagi hari",
          "Rajinlah belajar dan bersekolah dengan gigih untuk mewujudkan cita-cita",
          "Pohon cemara harus sering dipotong",
          "Embun pagi berbahaya bagi kesehatan"
        ],
        kunci: "B",
        pembahasan: "Baris 'Langkah kaki melangkah pasti, menuntut ilmu menggapai mimpi' menegaskan pesan agar anak-anak rajin menuntut ilmu untuk meraih cita-cita.",
        konsepKunci: "Menemukan amanat puisi."
      },
      {
        nomor: 5,
        id: "SD-LIT-09-05",
        tipe: "BS",
        pertanyaan: "Kata kiasan 'menggapai mimpi' dalam puisi tersebut bermakna meraih cita-cita dan harapan masa depan.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "'Mimpi' dalam konteks ini adalah konotasi positif untuk cita-cita dan harapan luhur. Pernyataan BENAR.",
        konsepKunci: "Makna konotatif kata dalam sastra."
      }
    ]
  },

  // --- PAKET 10: Master Literasi Evaluasi Teks Sains & Masa Depan Bumi (Master HOTS) ---
  {
    id: "sd-lit-p10",
    subjectId: "bahasa-indonesia",
    jenjang: "SD/MI",
    mapelName: "Literasi Membaca Ceria SD",
    paketNumber: 10,
    title: "Paket 10: Grand Final Literasi Kritis: Menjaga Iklim Bumi Kita",
    description: "Evaluasi kritis teks argumentasi ilmiah, sintesis data solusi pemanasan global, dan komitmen cinta bumi.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-LIT-10-01",
        tipe: "PG",
        stimulus: "Pemanasan global telah memicu anomali cuaca di berbagai belahan bumi. Gas rumah kaca seperti karbon dioksida yang dilepaskan oleh asap kendaraan dan pembakaran batu bara menumpuk di atmosfer, memerangkap panas matahari mirip efek rumah kaca kaca penumbuh tanaman. Akibatnya, es kutub mencair lebih cepat, permukaan air laut naik, dan musim kemarau menjadi lebih panjang. Gerakan menanam pohon, berjalan kaki atau bersepeda ke sekolah dekat, dan mematikan lampu yang tidak terpakai adalah aksi nyata siswa untuk menyejukkan bumi.",
        pertanyaan: "Mengapa gas rumah kaca yang menumpuk di atmosfer menyebabkan suhu bumi meningkat?",
        opsi: [
          "Karena gas tersebut menghasilkan api di langit",
          "Karena gas tersebut memerangkap pantulan radiasi panas matahari dan menahannya di atmosfer",
          "Karena gas tersebut memadamkan sinar matahari",
          "Karena gas tersebut membuat lapisan ozon bertambah tebal"
        ],
        kunci: "B",
        pembahasan: "Sesuai analogi efek rumah kaca dalam teks: gas rumah kaca menumpuk dan memerangkap pantulan radiasi panas matahari sehingga tidak bisa lolos keluar atmosfer, menyebabkan suhu permukaan bumi naik.",
        konsepKunci: "Mekanisme sains efek rumah kaca dan pemanasan global."
      },
      {
        nomor: 2,
        id: "SD-LIT-10-02",
        tipe: "MCMA",
        stimulus: "Perhatikan aksi nyata yang dapat dilakukan siswa sekolah dasar untuk mengurangi pemanasan global.",
        pertanyaan: "Aksi sederhana sehari-hari anak sekolah yang berkontribusi menekan pemanasan global adalah...",
        opsi: [
          "Mematikan lampu dan kipas angin saat meninggalkan ruangan kelas kosong",
          "Membawa botol minum (tumbler) guna ulang untuk mengurangi sampah plastik sekali pakai",
          "Menanam tanaman hijau di halaman sekolah atau rumah",
          "Membiarkan keran air wastafel mengalir terus-menerus"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Hemat listrik, kurangi sampah plastik, dan menanam pohon adalah aksi nyata mitigasi iklim. Membiarkan air terbuang (D) adalah pemborosan sumber daya.",
        konsepKunci: "Sikap ramah lingkungan berwawasan iklim."
      },
      {
        nomor: 3,
        id: "SD-LIT-10-03",
        tipe: "BS",
        pertanyaan: "Hutan hujan tropis di Indonesia dijuluki sebagai 'paru-paru dunia' karena kemampuannya menyerap miliaran ton gas karbon dioksida dan melepaskan oksigen segar.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Melalui proses fotosintesis, pohon di hutan menyerap karbon dioksida (CO2) dan menghasilkan oksigen (O2), sehingga hutan tropis berperan vital menstabilkan iklim bumi. Pernyataan BENAR.",
        konsepKunci: "Peran hutan sebagai penyerap emisi karbon."
      },
      {
        nomor: 4,
        id: "SD-LIT-10-04",
        tipe: "PG",
        pertanyaan: "Simpulan paling tepat dan komprehensif dari teks bacaan di atas adalah...",
        opsi: [
          "Pemanasan global adalah hal wajar yang tidak dapat dihindari oleh manusia",
          "Pemanasan global mengancam keseimbangan bumi, sehingga diperlukan aksi nyata bersama termasuk langkah sederhana anak sekolah untuk menghemat energi",
          "Siswa sekolah sebaiknya tidak perlu peduli terhadap kondisi kutub utara",
          "Penebangan hutan harus ditingkatkan untuk membangun pabrik kaca"
        ],
        kunci: "B",
        pembahasan: "Simpulan yang baik merangkum masalah utama (pemanasan global mengancam keseimbangan bumi) dan solusi aksi nyata yang dapat dijalankan (langkah hemat energi siswa).",
        konsepKunci: "Menarik kesimpulan komprehensif teks eksposisi ilmiah."
      },
      {
        nomor: 5,
        id: "SD-LIT-10-05",
        tipe: "BS",
        pertanyaan: "Kata 'anomali' pada kalimat pertama memiliki makna penyimpangan atau ketidaklaziman dari kondisi normal yang biasa.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Menurut KBBI, anomali berarti penyimpangan atau ketidaknormalan dari aturan atau keadaan umum. Pernyataan BENAR.",
        konsepKunci: "Kosakata ilmiah dalam konteks klimatologi."
      }
    ]
  }
];
