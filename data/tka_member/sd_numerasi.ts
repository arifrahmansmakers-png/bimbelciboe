import { TKAPaket } from "./types";

// ============================================================================
// BANK SOAL TKA MEMBER: SD/MI NUMERASI & MATEMATIKA CERIA (10 PAKET BERTINGKAT)
// Dibuat ramah, seru, dan menyenangkan untuk siswa kelas 6 dengan grafik SVG
// ============================================================================

export const paketSDNumerasi: TKAPaket[] = [
  // --- PAKET 1: Petualangan Kantin Sehat & Bilangan Ceria (Dasar) ---
  {
    id: "sd-num-p1",
    subjectId: "matematika",
    jenjang: "SD/MI",
    mapelName: "Numerasi & Matematika Ceria SD",
    paketNumber: 1,
    title: "Paket 1: Petualangan Kantin Sehat & Bilangan Ceria",
    description: "Mengenal operasi hitung bilangan bulat, pecahan sederhana, dan membaca diagram buah segar di kantin.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-NUM-01-01",
        tipe: "PG",
        stimulus: "Di Kantin Sekolah Sehat SD Merdeka, Bu Sari mencatat jumlah buah segar yang terjual selama hari Senin sampai Kamis. Berikut adalah grafik batang penjualan buahnya:",
        svgGraphic: `<svg viewBox="0 0 400 200" class="w-full max-w-md mx-auto my-3 bg-blue-50/50 rounded-xl p-2 border border-blue-100">
          <text x="200" y="25" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">Penjualan Buah di Kantin Bu Sari (Porsi)</text>
          <!-- Grid Lines -->
          <line x1="50" y1="150" x2="360" y2="150" stroke="#94a3b8" stroke-width="1.5"/>
          <line x1="50" y1="110" x2="360" y2="110" stroke="#cbd5e1" stroke-dasharray="3,3"/>
          <line x1="50" y1="70" x2="360" y2="70" stroke="#cbd5e1" stroke-dasharray="3,3"/>
          <line x1="50" y1="35" x2="360" y2="35" stroke="#cbd5e1" stroke-dasharray="3,3"/>
          <!-- Labels Y -->
          <text x="40" y="155" text-anchor="end" font-size="10" fill="#64748b">0</text>
          <text x="40" y="115" text-anchor="end" font-size="10" fill="#64748b">20</text>
          <text x="40" y="75" text-anchor="end" font-size="10" fill="#64748b">40</text>
          <text x="40" y="40" text-anchor="end" font-size="10" fill="#64748b">60</text>
          <!-- Bars -->
          <rect x="75" y="70" width="40" height="80" rx="4" fill="#3b82f6"/>
          <text x="95" y="65" text-anchor="middle" font-size="11" font-weight="bold" fill="#1d4ed8">40</text>
          <text x="95" y="168" text-anchor="middle" font-size="10" fill="#334155">Senin</text>
          <rect x="150" y="50" width="40" height="100" rx="4" fill="#10b981"/>
          <text x="170" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#047857">50</text>
          <text x="170" y="168" text-anchor="middle" font-size="10" fill="#334155">Selasa</text>
          <rect x="225" y="90" width="40" height="60" rx="4" fill="#f59e0b"/>
          <text x="245" y="85" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309">30</text>
          <text x="245" y="168" text-anchor="middle" font-size="10" fill="#334155">Rabu</text>
          <rect x="300" y="35" width="40" height="115" rx="4" fill="#ec4899"/>
          <text x="320" y="30" text-anchor="middle" font-size="11" font-weight="bold" fill="#be185d">58</text>
          <text x="320" y="168" text-anchor="middle" font-size="10" fill="#334155">Kamis</text>
        </svg>`,
        pertanyaan: "Berdasarkan grafik batang di atas, berapa selisih penjualan buah paling banyak dan paling sedikit dalam empat hari tersebut?",
        opsi: ["18 porsi", "28 porsi", "20 porsi", "38 porsi"],
        kunci: "B",
        pembahasan: "Penjualan tertinggi terjadi pada hari Kamis (58 porsi) dan penjualan terendah terjadi pada hari Rabu (30 porsi). Selisihnya adalah 58 - 30 = 28 porsi.",
        konsepKunci: "Membaca data grafik batang: nilai maksimum - nilai minimum."
      },
      {
        nomor: 2,
        id: "SD-NUM-01-02",
        tipe: "MCMA",
        stimulus: "Edo membawa bekal 1 loyang pizza mini berbentuk lingkaran yang dipotong menjadi 8 bagian sama besar. Edo memakan 2 potong, lalu memberikan 3 potong kepada Siti.",
        pertanyaan: "Pilihlah pernyataan-pernyataan yang BENAR mengenai sisa pizza Edo:",
        opsi: [
          "Bagian pizza yang sudah dimakan dan dibagikan adalah 5/8 bagian.",
          "Sisa pizza Edo sekarang adalah 3/8 bagian.",
          "Sisa pizza Edo lebih dari setengah loyang.",
          "Pecahan sisa pizza Edo senilai dengan 0,375."
        ],
        kunci: ["A", "B", "D"],
        pembahasan: "Total bagian = 8/8. Yang berkurang = 2/8 + 3/8 = 5/8 bagian (Pernyataan A Benar). Sisa pizza = 8/8 - 5/8 = 3/8 bagian (Pernyataan B Benar). Karena 3/8 < 4/8 (setengah), maka sisa pizza kurang dari setengah loyang (Pernyataan C Salah). Bentuk desimal dari 3/8 adalah 3 : 8 = 0,375 (Pernyataan D Benar).",
        konsepKunci: "Operasi pecahan dan konversi pecahan biasa ke desimal."
      },
      {
        nomor: 3,
        id: "SD-NUM-01-03",
        tipe: "BS",
        pertanyaan: "Suhu segelas es teh lemon di meja kantin mula-mula adalah 4°C. Setelah didiamkan selama 30 menit, suhunya naik sebesar 12°C. Suhu es teh sekarang adalah 16°C.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Suhu mula-mula = 4°C. Kenaikan suhu = +12°C. Suhu akhir = 4°C + 12°C = 16°C. Jadi pernyataan tersebut BENAR.",
        konsepKunci: "Penjumlahan bilangan bulat pada pengukuran suhu."
      },
      {
        nomor: 4,
        id: "SD-NUM-01-04",
        tipe: "PG",
        pertanyaan: "Kakek membagikan 48 buah jeruk dan 60 buah apel ke dalam kantong plastik dengan jumlah sama banyak untuk setiap kantong tanpa sisa. Berapa jumlah kantong plastik terbanyak yang diperlukan Kakek?",
        opsi: ["6 kantong", "12 kantong", "15 kantong", "24 kantong"],
        kunci: "B",
        pembahasan: "Mencari kantong terbanyak dengan isi sama banyak artinya mencari FPB (Faktor Persekutuan Terbesar) dari 48 dan 60. Faktorisasi prima: 48 = 2^4 x 3, 60 = 2^2 x 3 x 5. FPB = 2^2 x 3 = 4 x 3 = 12 kantong.",
        konsepKunci: "Penerapan konsep FPB dalam kehidupan sehari-hari."
      },
      {
        nomor: 5,
        id: "SD-NUM-01-05",
        tipe: "BS",
        pertanyaan: "Lampu hias merah menyala setiap 4 detik sekali, dan lampu hijau menyala setiap 6 detik sekali. Kedua lampu tersebut akan menyala bersama-sama untuk pertama kalinya pada detik ke-12.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Menyala bersama secara berkala diselesaikan dengan KPK (Kelipatan Persekutuan Terkecil) dari 4 dan 6. Kelipatan 4: 4, 8, 12, 16... Kelipatan 6: 6, 12, 18... KPK dari 4 dan 6 adalah 12 detik. Jadi pernyataan BENAR.",
        konsepKunci: "Penerapan KPK pada jadwal waktu periodik."
      }
    ]
  },

  // --- PAKET 2: Festival Kebun Buah Kakek (Tingkat Dasar Lanjutan) ---
  {
    id: "sd-num-p2",
    subjectId: "matematika",
    jenjang: "SD/MI",
    mapelName: "Numerasi & Matematika Ceria SD",
    paketNumber: 2,
    title: "Paket 2: Festival Kebun Buah & Keliling Lapangan",
    description: "Menghitung luas dan keliling bangun datar di kebun buah, perbandingan sederhana, dan satuan panjang.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-NUM-02-01",
        tipe: "PG",
        stimulus: "Paman memiliki sebidang kebun stroberi berbentuk persegi panjang dengan panjang 24 meter dan lebar 15 meter. Di sekeliling kebun akan dipasang pagar kawat bambu.",
        pertanyaan: "Berapa panjang kawat bambu yang dibutuhkan untuk memagari seluruh sekeliling kebun Paman?",
        opsi: ["39 meter", "78 meter", "360 meter", "84 meter"],
        kunci: "B",
        pembahasan: "Keliling persegi panjang = 2 x (panjang + lebar) = 2 x (24 + 15) = 2 x 39 = 78 meter.",
        konsepKunci: "Keliling bangun datar persegi panjang: 2 x (p + l)."
      },
      {
        nomor: 2,
        id: "SD-NUM-02-02",
        tipe: "MCMA",
        stimulus: "Rani menata ubin hias di teras rumahnya yang berbentuk persegi dengan panjang sisi 8 meter.",
        pertanyaan: "Pilihlah fakta matematis yang BENAR mengenai teras rumah Rani:",
        opsi: [
          "Luas teras rumah Rani adalah 64 meter persegi.",
          "Keliling teras rumah Rani adalah 32 meter.",
          "Jika dipasang ubin berukuran 1 m x 1 m, maka dibutuhkan 64 ubin.",
          "Luas teras sama dengan keliling teras dalam nilai angka."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Luas persegi = s x s = 8 x 8 = 64 m². Keliling = 4 x s = 4 x 8 = 32 m. Jumlah ubin 1 m² = 64 / 1 = 64 ubin. Nilai luas (64) tidak sama dengan keliling (32).",
        konsepKunci: "Luas dan keliling bangun persegi."
      },
      {
        nomor: 3,
        id: "SD-NUM-02-03",
        tipe: "BS",
        pertanyaan: "Perbandingan jumlah mangga matang dan mangga mentah di keranjang adalah 3 : 5. Jika jumlah seluruh mangga ada 40 buah, maka banyak mangga matang adalah 15 buah.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Total bagian perbandingan = 3 + 5 = 8 bagian. Mangga matang = (3/8) x 40 = 3 x 5 = 15 buah. Pernyataan BENAR.",
        konsepKunci: "Perbandingan senilai bagian terhadap total."
      },
      {
        nomor: 4,
        id: "SD-NUM-02-04",
        tipe: "PG",
        pertanyaan: "Toni berlari mengelilingi lapangan berbentuk lingkaran dengan diameter 14 meter sebanyak 3 kali putaran. Jarak total yang ditempuh Toni adalah... (gunakan π = 22/7)",
        opsi: ["44 meter", "88 meter", "132 meter", "154 meter"],
        kunci: "C",
        pembahasan: "Keliling 1 putaran lingkaran = π x d = (22/7) x 14 = 44 meter. Karena Toni berlari 3 kali putaran, maka jarak total = 3 x 44 = 132 meter.",
        konsepKunci: "Keliling lingkaran = π x d."
      },
      {
        nomor: 5,
        id: "SD-NUM-02-05",
        tipe: "BS",
        pertanyaan: "Ibu membeli 2,5 kg beras, 750 gram gula pasir, dan 1/4 kg mentega. Berat seluruh belanjaan Ibu adalah 3,5 kg.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Samakan ke kg: 2,5 kg + (750 g = 0,75 kg) + (1/4 kg = 0,25 kg) = 2,5 + 0,75 + 0,25 = 3,5 kg. Pernyataan BENAR.",
        konsepKunci: "Konversi satuan berat: 1 kg = 1.000 gram."
      }
    ]
  },

  // --- PAKET 3: Denah Wisata & Skala Peta Petualang Cilik (Menengah Awal) ---
  {
    id: "sd-num-p3",
    subjectId: "matematika",
    jenjang: "SD/MI",
    mapelName: "Numerasi & Matematika Ceria SD",
    paketNumber: 3,
    title: "Paket 3: Denah Wisata & Skala Peta Petualang Cilik",
    description: "Memahami skala denah, koordinat peta kartesius sederhana, dan operasi waktu kecepatan jarak.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-NUM-03-01",
        tipe: "PG",
        stimulus: "Pada peta wisata kebun binatang, jarak antara kandang jerapah dan kolam lumba-lumba digambar sepanjang 4 cm. Skala peta tersebut adalah 1 : 2.500.",
        pertanyaan: "Berapa meter jarak sebenarnya antara kandang jerapah dan kolam lumba-lumba tersebut?",
        opsi: ["10 meter", "100 meter", "1.000 meter", "250 meter"],
        kunci: "B",
        pembahasan: "Jarak sebenarnya = Jarak pada peta / Skala = 4 cm x 2.500 = 10.000 cm. Ubah cm ke meter (dibagi 100): 10.000 cm = 100 meter.",
        konsepKunci: "Skala = Jarak pada peta : Jarak sebenarnya."
      },
      {
        nomor: 2,
        id: "SD-NUM-03-02",
        tipe: "MCMA",
        stimulus: "Bus sekolah melaju dari halte A menuju tempat perkemahan sejauh 90 km dengan kecepatan rata-rata 60 km/jam. Bus berangkat tepat pukul 07.15 WIB.",
        pertanyaan: "Pernyataan yang BENAR mengenai perjalanan bus sekolah tersebut adalah:",
        opsi: [
          "Waktu tempuh perjalanan bus adalah 1,5 jam (90 menit).",
          "Bus sekolah akan tiba di perkemahan pada pukul 08.45 WIB.",
          "Jika kecepatan dinaikkan menjadi 90 km/jam, waktu tempuh menjadi 1 jam.",
          "Kecepatan 60 km/jam sama dengan 1 km per detik."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Waktu = Jarak / Kecepatan = 90 / 60 = 1,5 jam = 1 jam 30 menit. Tiba di tujuan: 07.15 + 01.30 = 08.45 WIB. Jika kecepatan 90 km/jam, waktu = 90 / 90 = 1 jam. Kecepatan 60 km/jam = 1 km per menit (bukan per detik).",
        konsepKunci: "Rumus Jarak = Kecepatan x Waktu."
      },
      {
        nomor: 3,
        id: "SD-NUM-03-03",
        tipe: "BS",
        pertanyaan: "Sebuah akuarium berbentuk balok memiliki panjang 50 cm, lebar 30 cm, dan tinggi 40 cm. Volume air maksimal yang dapat ditampung akuarium tersebut adalah 60 liter.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Volume balok = p x l x t = 50 x 30 x 40 = 60.000 cm³. Ingat: 1 liter = 1 dm³ = 1.000 cm³. Jadi 60.000 cm³ = 60 liter. Pernyataan BENAR.",
        konsepKunci: "Volume balok dan konversi cm³ ke liter."
      },
      {
        nomor: 4,
        id: "SD-NUM-03-04",
        tipe: "PG",
        pertanyaan: "Sebuah kran air mampu mengisi ember bervolume 18 liter dalam waktu 3 menit. Debit aliran air dari kran tersebut adalah...",
        opsi: ["6 liter/menit", "0,1 liter/detik", "54 liter/menit", "3 liter/menit"],
        kunci: "A",
        pembahasan: "Debit = Volume / Waktu = 18 liter / 3 menit = 6 liter/menit.",
        konsepKunci: "Debit = Volume / Waktu."
      },
      {
        nomor: 5,
        id: "SD-NUM-03-05",
        tipe: "BS",
        pertanyaan: "Sudut terkecil yang dibentuk oleh kedua jarum jam pada pukul 03.00 tepat adalah sudut siku-siku sebesar 90°.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Jarum pendek di angka 3, jarum panjang di angka 12. Jarak antarangka = 30°. Total = 3 x 30° = 90° (sudut siku-siku). Pernyataan BENAR.",
        konsepKunci: "Pengukuran sudut jarum jam."
      }
    ]
  },

  // --- PAKET 4: Misi Detektif Lingkungan & Diagram Lingkaran (Menengah) ---
  {
    id: "sd-num-p4",
    subjectId: "matematika",
    jenjang: "SD/MI",
    mapelName: "Numerasi & Matematika Ceria SD",
    paketNumber: 4,
    title: "Paket 4: Misi Pengelolaan Sampah & Diagram Lingkaran",
    description: "Menganalisis persentase daur ulang, diagram lingkaran, dan penyajian data statistik sederhana.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 20,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-NUM-04-01",
        tipe: "PG",
        stimulus: "Siswa kelas 6 mengumpulkan 200 kg sampah daur ulang di sekolah. Data komposisi sampah disajikan dalam diagram lingkaran berikut:",
        svgGraphic: `<svg viewBox="0 0 300 180" class="w-full max-w-xs mx-auto my-3 bg-emerald-50/50 rounded-xl p-2 border border-emerald-100">
          <circle cx="90" cy="90" r="70" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
          <!-- Kertas 50% (setengah lingkaran) -->
          <path d="M 90 90 L 90 20 A 70 70 0 0 1 90 160 Z" fill="#3b82f6"/>
          <!-- Plastik 25% (seperempat) -->
          <path d="M 90 90 L 90 160 A 70 70 0 0 1 20 90 Z" fill="#10b981"/>
          <!-- Logam 15% & Kaca 10% -->
          <path d="M 90 90 L 20 90 A 70 70 0 0 1 48 38 Z" fill="#f59e0b"/>
          <path d="M 90 90 L 48 38 A 70 70 0 0 1 90 20 Z" fill="#8b5cf6"/>
          <!-- Legend -->
          <rect x="180" y="30" width="12" height="12" fill="#3b82f6" rx="2"/><text x="200" y="41" font-size="11" fill="#334155">Kertas (50%)</text>
          <rect x="180" y="55" width="12" height="12" fill="#10b981" rx="2"/><text x="200" y="66" font-size="11" fill="#334155">Plastik (25%)</text>
          <rect x="180" y="80" width="12" height="12" fill="#f59e0b" rx="2"/><text x="200" y="91" font-size="11" fill="#334155">Logam (15%)</text>
          <rect x="180" y="105" width="12" height="12" fill="#8b5cf6" rx="2"/><text x="200" y="116" font-size="11" fill="#334155">Kaca (10%)</text>
        </svg>`,
        pertanyaan: "Berapa kilogram berat sampah plastik yang berhasil dikumpulkan oleh siswa kelas 6?",
        opsi: ["25 kg", "50 kg", "75 kg", "100 kg"],
        kunci: "B",
        pembahasan: "Persentase sampah plastik adalah 25%. Berat sampah plastik = 25% x 200 kg = (25/100) x 200 = 50 kg.",
        konsepKunci: "Membaca diagram lingkaran persentase: P% x Total."
      },
      {
        nomor: 2,
        id: "SD-NUM-04-02",
        tipe: "MCMA",
        stimulus: "Nilai ulangan matematika 6 orang siswa kelompok mawar adalah: 70, 80, 80, 90, 80, 100.",
        pertanyaan: "Pilihlah kesimpulan statistik yang BENAR untuk kelompok mawar:",
        opsi: [
          "Modus (nilai yang paling sering muncul) adalah 80.",
          "Nilai rata-rata (mean) ulangan kelompok mawar adalah 83,3.",
          "Median (nilai tengah data setelah diurutkan) adalah 80.",
          "Jangkauan (nilai tertinggi dikurangi terendah) adalah 30."
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "Modus = 80 (muncul 3 kali). Rata-rata = (70 + 80 + 80 + 90 + 80 + 100) / 6 = 500 / 6 = 83,33. Urutan: 70, 80, 80, 80, 90, 100. Median = (80 + 80)/2 = 80. Jangkauan = 100 - 70 = 30. Keempat pernyataan benar!",
        konsepKunci: "Statistika dasar: Mean, Median, Modus, dan Range."
      },
      {
        nomor: 3,
        id: "SD-NUM-04-03",
        tipe: "BS",
        pertanyaan: "Jika rata-rata nilai 4 orang anak adalah 75, maka jumlah total nilai keempat anak tersebut adalah 300.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Jumlah nilai = Rata-rata x Banyak anak = 75 x 4 = 300. Pernyataan BENAR.",
        konsepKunci: "Hubungan rata-rata dan total data."
      },
      {
        nomor: 4,
        id: "SD-NUM-04-04",
        tipe: "PG",
        pertanyaan: "Dalam sebuah kotak terdapat 12 kelereng merah, 8 kelereng biru, dan 5 kelereng kuning. Peluang terambilnya sebuah kelereng biru secara acak adalah...",
        opsi: ["8/25", "12/25", "5/25", "8/17"],
        kunci: "A",
        pembahasan: "Total kelereng = 12 + 8 + 5 = 25 kelereng. Peluang kelereng biru = jumlah biru / total kelereng = 8/25.",
        konsepKunci: "Peluang sederhana kejadian acak."
      },
      {
        nomor: 5,
        id: "SD-NUM-04-05",
        tipe: "BS",
        pertanyaan: "Sebuah toko memberikan diskon 20% untuk tas seharga Rp150.000,00. Uang yang harus dibayarkan pembeli setelah dipotong diskon adalah Rp120.000,00.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Besar diskon = 20% x 150.000 = Rp30.000,00. Harga setelah diskon = 150.000 - 30.000 = Rp120.000,00. Pernyataan BENAR.",
        konsepKunci: "Aritmatika sosial: Diskon persentase."
      }
    ]
  },

  // --- PAKET 5: Laboratorium Cilik & Geometri Ruang (Menengah Terapan) ---
  {
    id: "sd-num-p5",
    subjectId: "matematika",
    jenjang: "SD/MI",
    mapelName: "Numerasi & Matematika Ceria SD",
    paketNumber: 5,
    title: "Paket 5: Geometri Ruang & Percobaan Sains Cilik",
    description: "Volume tabung, luas permukaan kubus, jaring-jaring bangun ruang, dan hubungan antar satuan debit.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-NUM-05-01",
        tipe: "PG",
        stimulus: "Sebuah wadah tabung reaksi laboratorium mini memiliki jari-jari alas 7 cm dan tinggi 20 cm. Wadah tersebut diisi air sampai penuh.",
        pertanyaan: "Berapa volume air yang mengisi wadah tabung tersebut? (Gunakan π = 22/7)",
        opsi: ["3.080 cm³", "1.540 cm³", "6.160 cm³", "880 cm³"],
        kunci: "A",
        pembahasan: "Volume tabung = π x r² x t = (22/7) x 7 x 7 x 20 = 22 x 7 x 20 = 154 x 20 = 3.080 cm³.",
        konsepKunci: "Volume tabung = π x r² x t."
      },
      {
        nomor: 2,
        id: "SD-NUM-05-02",
        tipe: "MCMA",
        stimulus: "Andi membuat sebuah kotak kado tanpa tutup berbentuk kubus dengan panjang rusuk 10 cm menggunakan kertas karton warna-warni.",
        pertanyaan: "Pernyataan yang BENAR mengenai kotak kado Andi adalah:",
        opsi: [
          "Kotak tanpa tutup memiliki 5 buah sisi persegi.",
          "Luas karton yang dibutuhkan untuk kotak tanpa tutup adalah 500 cm².",
          "Volume kotak kado tersebut adalah 1.000 cm³.",
          "Jika diberi tutup, luas seluruh permukaannya menjadi 600 cm²."
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "Kotak tanpa tutup memiliki 5 sisi. Luas 1 sisi = 10 x 10 = 100 cm². Luas 5 sisi = 5 x 100 = 500 cm². Volume kubus = s³ = 10 x 10 x 10 = 1.000 cm³. Dengan tutup ada 6 sisi, luasnya = 6 x 100 = 600 cm². Semua pernyataan benar!",
        konsepKunci: "Sifat-sifat dan luas permukaan kubus."
      },
      {
        nomor: 3,
        id: "SD-NUM-05-03",
        tipe: "BS",
        pertanyaan: "Sebuah limas segi empat memiliki 5 buah titik sudut dan 8 buah rusuk.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Limas segi empat memiliki 1 titik puncak + 4 titik sudut alas = 5 titik sudut. Rusuknya: 4 rusuk alas + 4 rusuk tegak = 8 rusuk. Pernyataan BENAR.",
        konsepKunci: "Unsur bangun ruang limas segi empat."
      },
      {
        nomor: 4,
        id: "SD-NUM-05-04",
        tipe: "PG",
        pertanyaan: "Sebuah bak mandi bervolume 240 liter terisi air penuh. Karena ada lubang kecil di dasar bak, air bocor dengan debit 2 liter per menit. Waktu yang diperlukan hingga air di bak mandi habis adalah...",
        opsi: ["2 jam", "1,5 jam", "3 jam", "4 jam"],
        kunci: "A",
        pembahasan: "Waktu = Volume / Debit = 240 liter / 2 liter/menit = 120 menit. Ubah menit ke jam: 120 / 60 = 2 jam.",
        konsepKunci: "Debit dan konversi satuan waktu."
      },
      {
        nomor: 5,
        id: "SD-NUM-05-05",
        tipe: "BS",
        pertanyaan: "Sebuah segitiga sama sisi memiliki panjang sisi 12 cm. Keliling segitiga tersebut adalah 36 cm.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Keliling segitiga sama sisi = 3 x sisi = 3 x 12 cm = 36 cm. Pernyataan BENAR.",
        konsepKunci: "Keliling segitiga sama sisi."
      }
    ]
  },

  // --- PAKET 6: Proyek Tabungan & Pola Bilangan Cerdas (HOTS Menengah) ---
  {
    id: "sd-num-p6",
    subjectId: "matematika",
    jenjang: "SD/MI",
    mapelName: "Numerasi & Matematika Ceria SD",
    paketNumber: 6,
    title: "Paket 6: Proyek Tabungan & Barisan Pola Bilangan",
    description: "Menganalisis barisan pola bilangan berulang, bunga simpanan tabungan, dan penalaran aljabar sederhana.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-NUM-06-01",
        tipe: "PG",
        stimulus: "Budi menabung uang sakunya dengan pola yang teratur setiap minggu: Minggu ke-1 menabung Rp5.000, Minggu ke-2 menabung Rp8.000, Minggu ke-3 menabung Rp11.000, dan seterusnya selalu bertambah Rp3.000 setiap minggu.",
        pertanyaan: "Berapa rupiah uang yang ditabung Budi pada Minggu ke-7?",
        opsi: ["Rp20.000", "Rp23.000", "Rp26.000", "Rp29.000"],
        kunci: "B",
        pembahasan: "Pola bilangan aritmetika: U1 = 5.000, beda (b) = 3.000. Rumus suku ke-n: Un = a + (n - 1)b. U7 = 5.000 + (7 - 1) x 3.000 = 5.000 + 18.000 = Rp23.000.",
        konsepKunci: "Pola barisan bilangan bertambah tetap."
      },
      {
        nomor: 2,
        id: "SD-NUM-06-02",
        tipe: "MCMA",
        stimulus: "Perhatikan susunan pola korek api yang membentuk segitiga bersusun berikut: Pola 1 butuh 3 korek, Pola 2 butuh 5 korek, Pola 3 butuh 7 korek.",
        pertanyaan: "Pilihlah pernyataan yang BENAR terkait pola susunan korek api tersebut:",
        opsi: [
          "Banyak korek api selalu bertambah 2 batang pada setiap pola berikutnya.",
          "Rumus pola ke-n susunan korek api tersebut adalah 2n + 1.",
          "Pada pola ke-10, dibutuhkan 21 batang korek api.",
          "Pada pola ke-5, dibutuhkan 15 batang korek api."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Beda susunan = 2 (Pernyataan A Benar). Rumus Un: a + (n - 1)b = 3 + (n - 1)2 = 2n + 1 (Pernyataan B Benar). Untuk n = 10 -> 2(10) + 1 = 21 korek (Pernyataan C Benar). Untuk n = 5 -> 2(5) + 1 = 11 korek (Pernyataan D Salah karena tertulis 15).",
        konsepKunci: "Menemukan rumus aturan pola barisan geometri/aritmetika."
      },
      {
        nomor: 3,
        id: "SD-NUM-06-03",
        tipe: "BS",
        pertanyaan: "Tiga buah bilangan genap berurutan memiliki jumlah 72. Bilangan terkecil dari ketiga bilangan tersebut adalah 22.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Misal bilangan tengahnya = n. Maka bilangannya adalah (n - 2), n, (n + 2). Jumlahnya = 3n = 72 -> n = 24. Jadi ketiga bilangan itu adalah 22, 24, 26. Bilangan terkecil adalah 22. Pernyataan BENAR.",
        konsepKunci: "Penalaran aljabar sederhana pada bilangan berurutan."
      },
      {
        nomor: 4,
        id: "SD-NUM-06-04",
        tipe: "PG",
        pertanyaan: "Sebuah tali sepanjang 4,8 meter dipotong-potong menjadi beberapa bagian yang sama panjang. Jika setiap potongan berukuran 60 cm, berapa banyak potongan tali yang dihasilkan?",
        opsi: ["6 potong", "8 potong", "10 potong", "12 potong"],
        kunci: "B",
        pembahasan: "Samakan satuan: 4,8 meter = 480 cm. Banyak potongan = 480 cm / 60 cm = 8 potong tali.",
        konsepKunci: "Pembagian panjang dengan penyetaraan satuan."
      },
      {
        nomor: 5,
        id: "SD-NUM-06-05",
        tipe: "BS",
        pertanyaan: "Nilai dari 15% dari Rp200.000,00 sama dengan Rp30.000,00.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "15% x 200.000 = (15 / 100) x 200.000 = 15 x 2.000 = Rp30.000,00. Pernyataan BENAR.",
        konsepKunci: "Perhitungan persen dari suatu nilai nominal."
      }
    ]
  },

  // --- PAKET 7: Arsitek Cilik & Luas Gabungan Bangun Datar (Menengah Atas) ---
  {
    id: "sd-num-p7",
    subjectId: "matematika",
    jenjang: "SD/MI",
    mapelName: "Numerasi & Matematika Ceria SD",
    paketNumber: 7,
    title: "Paket 7: Arsitek Cilik & Luas Gabungan Bangun Datar",
    description: "Menghitung luas gabungan bangun datar, keliling bangun tak beraturan, dan simetri putar.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-NUM-07-01",
        tipe: "PG",
        stimulus: "Denah teras rumah paman berbentuk gabungan persegi panjang berukuran 10 m x 6 m dan segitiga siku-siku di sampingnya dengan alas 4 m dan tinggi 6 m.",
        pertanyaan: "Berapa meter persegi luas seluruh teras rumah paman tersebut?",
        opsi: ["60 m²", "72 m²", "84 m²", "96 m²"],
        kunci: "B",
        pembahasan: "Luas persegi panjang = 10 x 6 = 60 m². Luas segitiga = (alas x tinggi) / 2 = (4 x 6) / 2 = 12 m². Luas total gabungan = 60 + 12 = 72 m².",
        konsepKunci: "Luas gabungan bangun datar (persegi panjang + segitiga)."
      },
      {
        nomor: 2,
        id: "SD-NUM-07-02",
        tipe: "MCMA",
        stimulus: "Perhatikan sifat-sifat bangun datar belah ketupat.",
        pertanyaan: "Pilihlah sifat-sifat yang BENAR dari bangun belah ketupat:",
        opsi: [
          "Keempat sisinya sama panjang.",
          "Kedua diagonalnya saling berpotongan tegak lurus dan membagi dua sama panjang.",
          "Sudut-sudut yang berhadapan sama besar.",
          "Memiliki 4 buah simetri lipat dan 4 simetri putar."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Belah ketupat memiliki 4 sisi sama panjang, diagonal berpotongan tegak lurus, dan sudut berhadapan sama besar. Belah ketupat hanya memiliki 2 simetri lipat dan 2 simetri putar (bukan 4). Pilihan D salah.",
        konsepKunci: "Sifat-sifat geometris belah ketupat."
      },
      {
        nomor: 3,
        id: "SD-NUM-07-03",
        tipe: "BS",
        pertanyaan: "Sebuah taman berbentuk setengah lingkaran memiliki diameter 28 meter. Luas taman tersebut adalah 308 meter persegi. (π = 22/7)",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Jari-jari (r) = 28 / 2 = 14 meter. Luas 1 lingkaran utuh = π x r² = (22/7) x 14 x 14 = 616 m². Karena setengah lingkaran, maka luasnya = 616 / 2 = 308 m². Pernyataan BENAR.",
        konsepKunci: "Luas setengah lingkaran = 1/2 x π x r²."
      },
      {
        nomor: 4,
        id: "SD-NUM-07-04",
        tipe: "PG",
        pertanyaan: "Roda gerobak berdiameter 70 cm berputar sebanyak 200 kali putaran di jalan datar. Jarak yang telah ditempuh gerobak tersebut adalah... (π = 22/7)",
        opsi: ["220 meter", "440 meter", "140 meter", "880 meter"],
        kunci: "B",
        pembahasan: "Keliling 1 putaran roda = π x d = (22/7) x 70 = 220 cm. Jarak total = 220 cm x 200 putaran = 44.000 cm. Ubah ke meter: 44.000 / 100 = 440 meter.",
        konsepKunci: "Jarak = Keliling roda x Banyak putaran."
      },
      {
        nomor: 5,
        id: "SD-NUM-07-05",
        tipe: "BS",
        pertanyaan: "Bangun datar trapesium sama kaki memiliki sepasang sisi yang sejajar dan dua pasang sudut yang sama besar.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Trapesium sama kaki memiliki sisi atas dan bawah yang sejajar, serta sudut-sudut di alas sama besar dan sudut-sudut di atap sama besar. Pernyataan BENAR.",
        konsepKunci: "Sifat geometris trapesium sama kaki."
      }
    ]
  },

  // --- PAKET 8: Ekspedisi Ruang Angkasa Cilik & Kecepatan Relatif (HOTS Tingkat Lanjut) ---
  {
    id: "sd-num-p8",
    subjectId: "matematika",
    jenjang: "SD/MI",
    mapelName: "Numerasi & Matematika Ceria SD",
    paketNumber: 8,
    title: "Paket 8: Ekspedisi Sains & Waktu Berpapasan Dua Kendaraan",
    description: "Memecahkan masalah waktu berpapasan, sususulan, dan penalaran grafik garis bertingkat.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-NUM-08-01",
        tipe: "PG",
        stimulus: "Jarak kota A dan kota B adalah 180 km. Pak Rudi berangkat dari kota A menuju kota B mengendarai mobil dengan kecepatan 50 km/jam pukul 08.00. Pada saat yang sama, Pak Danu berangkat dari kota B menuju kota A dengan kecepatan 40 km/jam.",
        pertanyaan: "Pada pukul berapa kedua mobil tersebut akan saling berpapasan di jalan?",
        opsi: ["Pukul 09.30", "Pukul 10.00", "Pukul 10.30", "Pukul 11.00"],
        kunci: "B",
        pembahasan: "Waktu berpapasan = Jarak total / (Kecepatan 1 + Kecepatan 2) = 180 / (50 + 40) = 180 / 90 = 2 jam. Waktu berpapasan = 08.00 + 2 jam = 10.00 WIB.",
        konsepKunci: "Penerapan konsep waktu berpapasan: t = s / (v1 + v2)."
      },
      {
        nomor: 2,
        id: "SD-NUM-08-02",
        tipe: "MCMA",
        stimulus: "Dua buah pompa air digunakan untuk mengisi kolam ikan berkapasitas 1.200 liter. Pompa A mampu mengisi kolam hingga penuh dalam waktu 60 menit, sedangkan Pompa B mampu mengisi kolam penuh dalam waktu 30 menit.",
        pertanyaan: "Pilihlah kesimpulan matematis yang BENAR jika kedua pompa air dinyalakan bersama-sama:",
        opsi: [
          "Debit pompa A adalah 20 liter per menit.",
          "Debit pompa B adalah 40 liter per menit.",
          "Debit gabungan kedua pompa saat dinyalakan bersama adalah 60 liter per menit.",
          "Kolam akan terisi penuh dalam waktu 20 menit jika kedua pompa dinyalakan bersama."
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "Debit A = 1.200 / 60 = 20 l/mnt. Debit B = 1.200 / 30 = 40 l/mnt. Debit gabungan = 20 + 40 = 60 l/mnt. Waktu bersama = 1.200 / 60 = 20 menit. Semua pernyataan benar!",
        konsepKunci: "Laju kerja bersama (work rate problem)."
      },
      {
        nomor: 3,
        id: "SD-NUM-08-03",
        tipe: "BS",
        pertanyaan: "Ayah mengendarai sepeda motor dengan kecepatan 45 km/jam. Kecepatan tersebut setara dengan 12,5 meter per detik.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Ubah km/jam ke m/detik: 45 x (1.000 m / 3.600 detik) = 45.000 / 3.600 = 12,5 m/s. Pernyataan BENAR.",
        konsepKunci: "Konversi satuan kelajuan km/jam ke m/detik."
      },
      {
        nomor: 4,
        id: "SD-NUM-08-04",
        tipe: "PG",
        pertanyaan: "Harga 3 buah buku tulis dan 2 buah pensil adalah Rp17.000,00. Jika harga 1 buah buku tulis adalah Rp4.000,00, maka harga 1 buah pensil adalah...",
        opsi: ["Rp2.000,00", "Rp2.500,00", "Rp3.000,00", "Rp3.500,00"],
        kunci: "B",
        pembahasan: "Harga 3 buku = 3 x 4.000 = Rp12.000,00. Harga 2 pensil = 17.000 - 12.000 = Rp5.000,00. Harga 1 pensil = 5.000 / 2 = Rp2.500,00.",
        konsepKunci: "Persamaan linear satu variabel aplikatif."
      },
      {
        nomor: 5,
        id: "SD-NUM-08-05",
        tipe: "BS",
        pertanyaan: "Jika nilai rata-rata ulangan 5 orang siswa adalah 82, lalu seorang siswa baru dengan nilai 70 bergabung, maka nilai rata-rata sekarang menjadi 80.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Jumlah nilai 5 siswa = 5 x 82 = 410. Siswa baru masuk: total nilai = 410 + 70 = 480. Banyak siswa sekarang = 6 orang. Rata-rata baru = 480 / 6 = 80. Pernyataan BENAR.",
        konsepKunci: "Perubahan rata-rata gabungan data."
      }
    ]
  },

  // --- PAKET 9: Festival Coding Robotik Cilik & Probabilitas (HOTS Mahir) ---
  {
    id: "sd-num-p9",
    subjectId: "matematika",
    jenjang: "SD/MI",
    mapelName: "Numerasi & Matematika Ceria SD",
    paketNumber: 9,
    title: "Paket 9: Festival Coding Robotik & Peluang Percobaan",
    description: "Menganalisis permutasi penataan, peluang dadu koin, dan logika perbandingan bertingkat.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-NUM-09-01",
        tipe: "PG",
        stimulus: "Dalam lomba merakit robot, terdapat 3 modul sensor (Sensor Jarak, Sensor Cahaya, dan Sensor Suara) yang akan disusun sejajar pada badan robot.",
        pertanyaan: "Berapa banyak urutan posisi susunan ketiga modul sensor yang berbeda yang dapat dibuat?",
        opsi: ["3 cara", "6 cara", "9 cara", "12 cara"],
        kunci: "B",
        pembahasan: "Menyusun 3 objek berbeda secara sejajar diselesaikan dengan permutasi: 3! = 3 x 2 x 1 = 6 susunan berbeda.",
        konsepKunci: "Kaidah pencacahan dasar (faktorial)."
      },
      {
        nomor: 2,
        id: "SD-NUM-09-02",
        tipe: "MCMA",
        stimulus: "Dua keping uang logam dilempar secara bersamaan sebanyak 60 kali percobaan.",
        pertanyaan: "Pernyataan yang BENAR mengenai peluang munculnya sisi mata uang adalah:",
        opsi: [
          "Ruang sampel pelemparan dua koin adalah {(A,A), (A,G), (G,A), (G,G)} dengan total 4 titik sampel.",
          "Peluang munculnya tepat 1 Gambar dan 1 Angka adalah 2/4 atau 1/2.",
          "Frekuensi harapan munculnya 2 Angka (A,A) dalam 60 kali lemparan adalah 15 kali.",
          "Peluang tidak muncul gambar sama sekali adalah 3/4."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Ruang sampel ada 4 titik. Titik (1G, 1A) ada 2 yaitu (A,G) dan (G,A), peluang = 2/4 = 1/2 (Benar). Titik (A,A) ada 1, peluang = 1/4. Frekuensi harapan = (1/4) x 60 = 15 kali (Benar). Tidak muncul gambar artinya (A,A), peluangnya 1/4, bukan 3/4 (Pernyataan D Salah).",
        konsepKunci: "Peluang teoretis dan frekuensi harapan."
      },
      {
        nomor: 3,
        id: "SD-NUM-09-03",
        tipe: "BS",
        pertanyaan: "Perbandingan umur Kakak dan Adik sekarang adalah 5 : 3. Jika selisih umur mereka adalah 6 tahun, maka umur Kakak sekarang adalah 15 tahun.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Selisih perbandingan = 5 - 3 = 2 bagian. Nilai 1 bagian = 6 / 2 = 3 tahun. Umur Kakak = 5 x 3 = 15 tahun. Umur Adik = 3 x 3 = 9 tahun. Pernyataan BENAR.",
        konsepKunci: "Perbandingan dengan informasi selisih nilai."
      },
      {
        nomor: 4,
        id: "SD-NUM-09-04",
        tipe: "PG",
        pertanyaan: "Sebuah peta dibuat dengan skala 1 : 500.000. Jika jarak dua kota pada peta adalah 7 cm, berapa jarak sebenarnya kedua kota tersebut?",
        opsi: ["3,5 km", "35 km", "350 km", "3.500 km"],
        kunci: "B",
        pembahasan: "Jarak sebenarnya = 7 cm x 500.000 = 3.500.000 cm. Ubah cm ke km (dibagi 100.000): 3.500.000 / 100.000 = 35 km.",
        konsepKunci: "Skala peta pada jarak antarkota."
      },
      {
        nomor: 5,
        id: "SD-NUM-09-05",
        tipe: "BS",
        pertanyaan: "Sebuah kolam renang memiliki panjang 20 m, lebar 10 m, dan kedalaman rata-rata 1,5 m. Banyak air yang dibutuhkan untuk mengisi penuh kolam tersebut adalah 300.000 liter.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Volume = 20 x 10 x 1,5 = 300 m³. Ingat: 1 m³ = 1.000 liter. Maka 300 m³ = 300 x 1.000 = 300.000 liter. Pernyataan BENAR.",
        konsepKunci: "Volume bangun balok dan konversi m³ ke liter."
      }
    ]
  },

  // --- PAKET 10: Grand Final Olimpiade Matematika Cilik (Master HOTS) ---
  {
    id: "sd-num-p10",
    subjectId: "matematika",
    jenjang: "SD/MI",
    mapelName: "Numerasi & Matematika Ceria SD",
    paketNumber: 10,
    title: "Paket 10: Grand Final Numerasi Cilik & HOTS Tertinggi",
    description: "Tantangan penalaran numerasi komprehensif, multi-step problem solving, dan interpretasi grafik kompleks.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SD-NUM-10-01",
        tipe: "PG",
        stimulus: "Pak Ahmad memiliki sebidang tanah seluas 1.200 m². Sebanyak 1/3 bagian tanah dibangun rumah tinggal, 1/4 bagian dijadikan kebun buah, dan 20% bagian dibuat kolam ikan koi. Sisanya akan ditanami rumput hias jepang.",
        pertanyaan: "Berapa meter persegi luas tanah Pak Ahmad yang ditanami rumput hias jepang?",
        opsi: ["260 m²", "300 m²", "320 m²", "360 m²"],
        kunci: "A",
        pembahasan: "Rumah tinggal = 1/3 x 1.200 = 400 m². Kebun buah = 1/4 x 1.200 = 300 m². Kolam ikan = 20% x 1.200 = 240 m². Total terpakai = 400 + 300 + 240 = 940 m². Sisa untuk rumput hias = 1.200 - 940 = 260 m².",
        konsepKunci: "Operasi hitung campuran pecahan dan persen pada luas tanah."
      },
      {
        nomor: 2,
        id: "SD-NUM-10-02",
        tipe: "MCMA",
        stimulus: "Sebuah kerucut pasir memiliki diameter alas 14 cm (jari-jari 7 cm) dan tinggi tegak 24 cm. Garis pelukis kerucut tersebut dapat dihitung menggunakan teorema Pythagoras: s = √(7² + 24²).",
        pertanyaan: "Pernyataan yang BENAR mengenai kerucut pasir tersebut adalah: (Gunakan π = 22/7)",
        opsi: [
          "Panjang garis pelukis kerucut (s) adalah 25 cm.",
          "Luas selimut kerucut adalah π x r x s = 550 cm².",
          "Volume kerucut tersebut adalah 1.232 cm³.",
          "Luas alas kerucut adalah 308 cm²."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Panjang garis pelukis s = √(49 + 576) = √625 = 25 cm (Benar). Luas selimut = (22/7) x 7 x 25 = 22 x 25 = 550 cm² (Benar). Volume kerucut = 1/3 x π x r² x t = 1/3 x (22/7) x 49 x 24 = 1/3 x 154 x 24 = 154 x 8 = 1.232 cm³ (Benar). Luas alas = π x r² = (22/7) x 49 = 154 cm² (bukan 308 cm², Pernyataan D Salah).",
        konsepKunci: "Geometri ruang kerucut: Garis pelukis, luas selimut, dan volume."
      },
      {
        nomor: 3,
        id: "SD-NUM-10-03",
        tipe: "BS",
        pertanyaan: "Sebuah mobil menempuh jarak 120 km menghabiskan 10 liter bensin. Jika mobil tersebut akan menempuh perjalanan sejauh 300 km dengan kondisi jalan yang serupa, maka bensin yang diperlukan adalah 25 liter.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Konsumsi bensin per km: 120 km / 10 liter = 12 km/liter. Bensin untuk 300 km = 300 / 12 = 25 liter. Menggunakan perbandingan senilai: (300 / 120) x 10 = 2,5 x 10 = 25 liter. Pernyataan BENAR.",
        konsepKunci: "Perbandingan senilai pada konsumsi bahan bakar."
      },
      {
        nomor: 4,
        id: "SD-NUM-10-04",
        tipe: "PG",
        pertanyaan: "Sebuah akuarium berbentuk balok dengan panjang 80 cm, lebar 50 cm, dan tinggi 60 cm mula-mula terisi air setinggi 35 cm. Sebuah batu hias dimasukkan hingga seluruhnya tenggelam ke dalam air, menyebabkan permukaan air naik menjadi 42 cm. Berapa volume batu hias tersebut?",
        opsi: ["28.000 cm³", "35.000 cm³", "42.000 cm³", "48.000 cm³"],
        kunci: "A",
        pembahasan: "Kenaikan tinggi air = 42 cm - 35 cm = 7 cm. Volume benda yang tercelup sama dengan volume kenaikan air: V = panjang x lebar x kenaikan tinggi = 80 x 50 x 7 = 4.000 x 7 = 28.000 cm³.",
        konsepKunci: "Prinsip perpindahan zat cair (Archimedes pada bangun ruang)."
      },
      {
        nomor: 5,
        id: "SD-NUM-10-05",
        tipe: "BS",
        pertanyaan: "Hasil perhitungan dari (-18) + 24 x (-3) - (-40) bernilai negatif 50.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Operasi perkalian didahulukan: 24 x (-3) = -72. Kalimat matematika menjadi: (-18) + (-72) - (-40) = -90 + 40 = -50. Pernyataan BENAR.",
        konsepKunci: "Operasi hitung campuran bilangan bulat negatif dan positif."
      }
    ]
  }
];
