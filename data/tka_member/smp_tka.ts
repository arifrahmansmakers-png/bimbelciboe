import { TKAPaket } from "./types";

// ============================================================================
// BANK SOAL TKA MEMBER: SMP/MTs NUMERASI & LITERASI (10 PAKET BERTINGKAT)
// Tingkat kesukaran bertingkat dari Paket 1 (Dasar) hingga Paket 10 (HOTS Analitik)
// ============================================================================

export const paketSMPNumerasi: TKAPaket[] = [
  {
    id: "smp-num-p1",
    subjectId: "smp-numerasi",
    jenjang: "SMP/MTs",
    mapelName: "Numerasi & Penalaran Matematika SMP",
    paketNumber: 1,
    title: "Paket 1: Operasi Bilangan Rasional & Aljabar Dasar",
    description: "Operasi hitung campuran bilangan bulat, pecahan aljabar, dan persamaan linear satu variabel.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMP-NUM-01-01",
        tipe: "PG",
        stimulus: "Suhu di dalam ruang pendingin daging mula-mula adalah -8°C. Pada siang hari suhu dinaikkan 5°C, lalu saat malam hari diturunkan kembali 3°C.",
        pertanyaan: "Berapa derajat Celcius suhu ruangan pendingin tersebut pada malam hari?",
        opsi: ["-6°C", "-10°C", "-16°C", "0°C"],
        kunci: "A",
        pembahasan: "Suhu akhir = -8 + 5 - 3 = -3 - 3 = -6°C.",
        konsepKunci: "Operasi hitung penjumlahan dan pengurangan bilangan bulat."
      },
      {
        nomor: 2,
        id: "SMP-NUM-01-02",
        tipe: "MCMA",
        stimulus: "Diketahui persamaan linear satu variabel: 3(2x - 4) = 4x + 6.",
        pertanyaan: "Pilihlah kesimpulan aljabar yang BENAR mengenai persamaan tersebut:",
        opsi: [
          "Bentuk ekuivalen ruas kiri adalah 6x - 12.",
          "Nilai x yang memenuhi persamaan tersebut adalah x = 9.",
          "Jika x disubstitusikan, nilai kedua ruas adalah 42.",
          "Nilai x merupakan bilangan prima genap."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "3(2x - 4) = 6x - 12 (Benar). 6x - 12 = 4x + 6 -> 6x - 4x = 6 + 12 -> 2x = 18 -> x = 9 (Benar). Cek ruas: 6(9) - 12 = 54 - 12 = 42 (Benar). 9 adalah bilangan ganjil komposit, bukan prima genap (Pernyataan D Salah).",
        konsepKunci: "Penyelesaian persamaan linear satu variabel (PLSV)."
      },
      {
        nomor: 3,
        id: "SMP-NUM-01-03",
        tipe: "BS",
        pertanyaan: "Bentuk sederhana dari aljabar 4a + 7b - 2a + 3b adalah 2a + 10b.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Gabungkan suku-suku sejenis: (4a - 2a) + (7b + 3b) = 2a + 10b. Pernyataan BENAR.",
        konsepKunci: "Penyederhanaan suku sejenis pada bentuk aljabar."
      },
      {
        nomor: 4,
        id: "SMP-NUM-01-04",
        tipe: "PG",
        pertanyaan: "Sebuah peta dibuat dengan skala 1 : 250.000. Jika jarak dua kecamatan pada peta adalah 8 cm, maka jarak sebenarnya adalah...",
        opsi: ["2 km", "20 km", "200 km", "2.000 km"],
        kunci: "B",
        pembahasan: "Jarak sebenarnya = 8 cm x 250.000 = 2.000.000 cm = 20 km.",
        konsepKunci: "Skala dan perbandingan jarak."
      },
      {
        nomor: 5,
        id: "SMP-NUM-01-05",
        tipe: "BS",
        pertanyaan: "Himpunan penyelesaian dari pertidaksamaan 2x - 5 < 7 untuk x bilangan bulat positif adalah {1, 2, 3, 4, 5}.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "2x < 12 -> x < 6. Bilangan bulat positif yang kurang dari 6 adalah 1, 2, 3, 4, 5. Pernyataan BENAR.",
        konsepKunci: "Pertidaksamaan linear satu variabel."
      }
    ]
  },
  {
    id: "smp-num-p2",
    subjectId: "smp-numerasi",
    jenjang: "SMP/MTs",
    mapelName: "Numerasi & Penalaran Matematika SMP",
    paketNumber: 2,
    title: "Paket 2: Himpunan & Diagram Venn Keanggotaan Klub",
    description: "Konsep himpunan bagian, irisan, gabungan, dan diagram Venn data siswa.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMP-NUM-02-01",
        tipe: "PG",
        stimulus: "Dari 40 orang siswa di kelas 8A, 25 siswa gemar bulu tangkis, 20 siswa gemar futsal, dan 12 siswa gemar keduanya.",
        pertanyaan: "Berapa orang siswa yang TIDAK gemar bulu tangkis maupun futsal?",
        opsi: ["5 orang", "7 orang", "8 orang", "10 orang"],
        kunci: "B",
        pembahasan: "Siswa gemar minimal satu cabang = n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = 25 + 20 - 12 = 33 orang. Siswa yang tidak gemar keduanya = 40 - 33 = 7 orang.",
        konsepKunci: "Rumus gabungan dan irisan himpunan pada diagram Venn."
      },
      {
        nomor: 2,
        id: "SMP-NUM-02-02",
        tipe: "MCMA",
        stimulus: "Perhatikan himpunan P = {x | 1 < x ≤ 10, x bilangan prima}.",
        pertanyaan: "Pernyataan yang BENAR mengenai himpunan P adalah:",
        opsi: [
          "Anggota himpunan P adalah {2, 3, 5, 7}.",
          "Banyaknya anggota himpunan n(P) = 4.",
          "Banyaknya himpunan bagian dari P adalah 2⁴ = 16.",
          "Angka 9 termasuk anggota himpunan P."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Bilangan prima antara 1 dan 10 adalah 2, 3, 5, 7. Total anggota n(P) = 4. Himpunan bagian = 2^n = 2⁴ = 16. Angka 9 bukan prima karena 9 = 3 x 3 (Pernyataan D Salah).",
        konsepKunci: "Notasi himpunan dan rumus himpunan bagian 2^n."
      },
      {
        nomor: 3,
        id: "SMP-NUM-02-03",
        tipe: "BS",
        pertanyaan: "Jika himpunan A = {1, 2, 3} dan B = {3, 4, 5}, maka irisan A ∩ B adalah {3}.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Irisan adalah anggota yang dimiliki bersama oleh kedua himpunan. Anggota yang sama adalah 3. Pernyataan BENAR.",
        konsepKunci: "Irisan dua himpunan."
      },
      {
        nomor: 4,
        id: "SMP-NUM-02-04",
        tipe: "PG",
        pertanyaan: "Gradien (kemiringan) garis yang melalui titik A(2, 3) dan B(6, 11) adalah...",
        opsi: ["2", "3", "4", "5"],
        kunci: "A",
        pembahasan: "Gradien m = (y2 - y1) / (x2 - x1) = (11 - 3) / (6 - 2) = 8 / 4 = 2.",
        konsepKunci: "Gradien garis lurus: m = Δy / Δx."
      },
      {
        nomor: 5,
        id: "SMP-NUM-02-05",
        tipe: "BS",
        pertanyaan: "Dua garis saling sejajar jika dan hanya jika kedua garis tersebut memiliki gradien yang sama (m1 = m2).",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Syarat dua garis sejajar adalah m1 = m2. Pernyataan BENAR.",
        konsepKunci: "Hubungan gradien dua garis sejajar."
      }
    ]
  },
  {
    id: "smp-num-p3",
    subjectId: "smp-numerasi",
    jenjang: "SMP/MTs",
    mapelName: "Numerasi & Penalaran Matematika SMP",
    paketNumber: 3,
    title: "Paket 3: Sistem Persamaan Linear Dua Variabel (SPLDV)",
    description: "Metode eliminasi dan substitusi pada SPLDV dalam konteks transaksi ekonomi siswa.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMP-NUM-03-01",
        tipe: "PG",
        stimulus: "Di koperasi sekolah, harga 2 buku tulis dan 3 pulpen adalah Rp17.000,00. Sedangkan harga 3 buku tulis dan 1 pulpen adalah Rp15.000,00.",
        pertanyaan: "Berapa harga yang harus dibayar jika Maya membeli 1 buku tulis dan 2 pulpen?",
        opsi: ["Rp8.000,00", "Rp10.000,00", "Rp11.000,00", "Rp12.000,00"],
        kunci: "B",
        pembahasan: "Misal buku = b, pulpen = p.\n(1) 2b + 3p = 17.000\n(2) 3b + p = 15.000 -> p = 15.000 - 3b.\nSubstitusi ke (1): 2b + 3(15.000 - 3b) = 17.000 -> 2b + 45.000 - 9b = 17.000 -> -7b = -28.000 -> b = 4.000. Maka p = 15.000 - 3(4.000) = 3.000.\nHarga 1 buku + 2 pulpen = 4.000 + 2(3.000) = Rp10.000,00.",
        konsepKunci: "Penyelesaian SPLDV metode eliminasi-substitusi."
      },
      {
        nomor: 2,
        id: "SMP-NUM-03-02",
        tipe: "MCMA",
        stimulus: "Sebuah fungsi linear dinyatakan dengan rumus f(x) = 3x - 5.",
        pertanyaan: "Pilihlah pernyataan yang BENAR mengenai fungsi f(x):",
        opsi: [
          "Nilai f(4) adalah 7.",
          "Nilai f(-2) adalah -11.",
          "Jika f(a) = 10, maka nilai a = 5.",
          "Grafik fungsi memotong sumbu-y di titik (0, 5)."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "f(4) = 3(4) - 5 = 12 - 5 = 7 (Benar). f(-2) = 3(-2) - 5 = -6 - 5 = -11 (Benar). f(a) = 3a - 5 = 10 -> 3a = 15 -> a = 5 (Benar). Untuk x = 0, y = 3(0) - 5 = -5, jadi memotong sumbu-y di (0, -5), bukan (0, 5) (Pernyataan D Salah).",
        konsepKunci: "Nilai fungsi dan titik potong sumbu Cartesius."
      },
      {
        nomor: 3,
        id: "SMP-NUM-03-03",
        tipe: "BS",
        pertanyaan: "Pasangan terurut (2, -1) merupakan titik penyelesaian dari sistem persamaan x + y = 1 dan 2x - y = 5.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Cek: 2 + (-1) = 1 (Benar). 2(2) - (-1) = 4 + 1 = 5 (Benar). Titik (2, -1) memenuhi kedua persamaan. Pernyataan BENAR.",
        konsepKunci: "Verifikasi solusi sistem persamaan linear."
      },
      {
        nomor: 4,
        id: "SMP-NUM-03-04",
        tipe: "PG",
        pertanyaan: "Persamaan garis yang melalui titik (0, 4) dengan gradien -3 adalah...",
        opsi: ["y = -3x + 4", "y = 3x + 4", "y = -3x - 4", "3x + y = -4"],
        kunci: "A",
        pembahasan: "Persamaan garis dengan gradien m dan titik potong sumbu-y (0, c) adalah y = mx + c -> y = -3x + 4.",
        konsepKunci: "Bentuk persamaan garis kemiringan y = mx + c."
      },
      {
        nomor: 5,
        id: "SMP-NUM-03-05",
        tipe: "BS",
        pertanyaan: "Jika dua garis memiliki gradien m1 dan m2 dan saling tegak lurus, maka hasil kali gradiennya bernilai m1 x m2 = -1.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Dua garis berpotongan tegak lurus memenuhi hubungan m1 x m2 = -1. Pernyataan BENAR.",
        konsepKunci: "Syarat dua garis tegak lurus."
      }
    ]
  },
  {
    id: "smp-num-p4",
    subjectId: "smp-numerasi",
    jenjang: "SMP/MTs",
    mapelName: "Numerasi & Penalaran Matematika SMP",
    paketNumber: 4,
    title: "Paket 4: Teorema Pythagoras & Geometri Ruang Sisi Datar",
    description: "Tripel Pythagoras, diagonal ruang kubus dan balok, serta luas prisma dan limas.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMP-NUM-04-01",
        tipe: "PG",
        stimulus: "Sebuah kapal berlayar ke arah barat sejauh 60 mil, kemudian berbelok ke arah utara sejauh 80 mil. Berapa jarak terpendek kapal dari titik keberangkatan mula-mula?",
        pertanyaan: "Jarak terpendek kapal tersebut adalah...",
        opsi: ["100 mil", "120 mil", "140 mil", "160 mil"],
        kunci: "A",
        pembahasan: "Arah barat dan utara membentuk sudut siku-siku 90°. Berdasarkan teorema Pythagoras: c = √(60² + 80²) = √(3.600 + 6.400) = √10.000 = 100 mil.",
        konsepKunci: "Teorema Pythagoras pada arah navigasi."
      },
      {
        nomor: 2,
        id: "SMP-NUM-04-02",
        tipe: "MCMA",
        stimulus: "Perhatikan kelompok tiga bilangan ukuran panjang sisi segitiga.",
        pertanyaan: "Manakah kelompok bilangan berikut yang membentuk Tripel Pythagoras (segitiga siku-siku)?",
        opsi: [
          "3, 4, 5",
          "5, 12, 13",
          "8, 15, 17",
          "7, 10, 15"
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "3² + 4² = 9 + 16 = 25 = 5² (Benar). 5² + 12² = 25 + 144 = 169 = 13² (Benar). 8² + 15² = 64 + 225 = 289 = 17² (Benar). 7² + 10² = 49 + 100 = 149 ≠ 15² = 225 (Salah).",
        konsepKunci: "Identifikasi tripel Pythagoras a² + b² = c²."
      },
      {
        nomor: 3,
        id: "SMP-NUM-04-03",
        tipe: "BS",
        pertanyaan: "Panjang diagonal ruang kubus dengan panjang rusuk 6 cm adalah 6√3 cm.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Panjang diagonal ruang kubus dirumuskan dengan s√3. Untuk s = 6 cm, panjangnya 6√3 cm. Pernyataan BENAR.",
        konsepKunci: "Panjang diagonal ruang kubus."
      },
      {
        nomor: 4,
        id: "SMP-NUM-04-04",
        tipe: "PG",
        pertanyaan: "Luas permukaan balok dengan ukuran panjang 10 cm, lebar 6 cm, dan tinggi 4 cm adalah...",
        opsi: ["124 cm²", "248 cm²", "240 cm²", "360 cm²"],
        kunci: "B",
        pembahasan: "Luas permukaan = 2(pl + pt + lt) = 2(10x6 + 10x4 + 6x4) = 2(60 + 40 + 24) = 2(124) = 248 cm².",
        konsepKunci: "Luas permukaan bangun ruang balok."
      },
      {
        nomor: 5,
        id: "SMP-NUM-04-05",
        tipe: "BS",
        pertanyaan: "Volume prisma segitiga siku-siku dengan alas segitiga 6 cm dan 8 cm serta tinggi prisma 15 cm adalah 360 cm³.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Luas alas segitiga = (6 x 8) / 2 = 24 cm². Volume prisma = Luas alas x tinggi prisma = 24 x 15 = 360 cm³. Pernyataan BENAR.",
        konsepKunci: "Volume prisma tegak segitiga."
      }
    ]
  },
  {
    id: "smp-num-p5",
    subjectId: "smp-numerasi",
    jenjang: "SMP/MTs",
    mapelName: "Numerasi & Penalaran Matematika SMP",
    paketNumber: 5,
    title: "Paket 5: Bangun Ruang Sisi Lengkung & Debit Fluida",
    description: "Volume dan luas permukaan tabung, kerucut, dan bola dalam aplikasi kehidupan nyata.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMP-NUM-05-01",
        tipe: "PG",
        stimulus: "Sebuah tangki air berbentuk tabung dengan jari-jari 1 meter dan tinggi 3,5 meter terisi air penuh. (π = 22/7)",
        pertanyaan: "Berapa liter volume air yang mengisi tangki tersebut?",
        opsi: ["1.100 liter", "11.000 liter", "22.000 liter", "3.500 liter"],
        kunci: "B",
        pembahasan: "Volume tabung = π x r² x t = (22/7) x 1 x 1 x 3,5 = 22 x 0,5 = 11 m³. Ingat: 1 m³ = 1.000 liter. Maka 11 m³ = 11.000 liter.",
        konsepKunci: "Volume tabung dan konversi satuan m³ ke liter."
      },
      {
        nomor: 2,
        id: "SMP-NUM-05-02",
        tipe: "MCMA",
        stimulus: "Perhatikan perbandingan volume antara kerucut, bola, dan tabung yang memiliki jari-jari (r) dan tinggi yang sama (t = 2r untuk bola dan tabung).",
        pertanyaan: "Pernyataan yang BENAR mengenai hubungan ketiga bangun ruang tersebut adalah:",
        opsi: [
          "Volume bola adalah 4/3 π r³.",
          "Volume tabung dengan tinggi 2r adalah 2 π r³.",
          "Perbandingan volume kerucut : bola : tabung dengan tinggi sama (2r) adalah 1 : 2 : 3.",
          "Volume bola selalu lebih besar daripada volume tabung dengan jari-jari dan tinggi sama."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "V_kerucut = 1/3 π r² (2r) = 2/3 π r³. V_bola = 4/3 π r³. V_tabung = π r² (2r) = 6/3 π r³. Perbandingannya 2/3 : 4/3 : 6/3 = 1 : 2 : 3. Pernyataan D salah karena volume bola (4/3) lebih kecil dari tabung (2).",
        konsepKunci: "Perbandingan Archimedes kerucut, bola, dan tabung."
      },
      {
        nomor: 3,
        id: "SMP-NUM-05-03",
        tipe: "BS",
        pertanyaan: "Luas permukaan bola dengan jari-jari 7 cm adalah 616 cm². (Gunakan π = 22/7)",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Luas permukaan bola = 4 x π x r² = 4 x (22/7) x 7 x 7 = 4 x 22 x 7 = 616 cm². Pernyataan BENAR.",
        konsepKunci: "Luas permukaan bola 4πr²."
      },
      {
        nomor: 4,
        id: "SMP-NUM-05-04",
        tipe: "PG",
        pertanyaan: "Topi ulang tahun berbentuk kerucut memiliki jari-jari alas 6 cm dan tinggi 8 cm. Luas kertas karton yang dibutuhkan untuk membuat selimut topi tersebut adalah... (π = 3,14)",
        opsi: ["150,72 cm²", "188,4 cm²", "301,44 cm²", "94,2 cm²"],
        kunci: "B",
        pembahasan: "Garis pelukis s = √(6² + 8²) = √(36 + 64) = 10 cm. Luas selimut kerucut = π x r x s = 3,14 x 6 x 10 = 188,4 cm².",
        konsepKunci: "Luas selimut kerucut πrs."
      },
      {
        nomor: 5,
        id: "SMP-NUM-05-05",
        tipe: "BS",
        pertanyaan: "Jika jari-jari sebuah tabung diperbesar menjadi 2 kali semula sedangkan tingginya tetap, maka volumenya bertambah menjadi 4 kali lipat dari volume semula.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "V = π r² t. Jika r' = 2r, maka V' = π (2r)² t = 4 π r² t = 4V. Pernyataan BENAR.",
        konsepKunci: "Dampak perubahan dimensi terhadap volume bangun ruang."
      }
    ]
  },
  {
    id: "smp-num-p6",
    subjectId: "smp-numerasi",
    jenjang: "SMP/MTs",
    mapelName: "Numerasi & Penalaran Matematika SMP",
    paketNumber: 6,
    title: "Paket 6: Statistika & Analisis Data Diagram Batang",
    description: "Ukuran pemusatan data kelompok, kuartil, jangkauan interkuartil, dan interpretasi grafik.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMP-NUM-06-01",
        tipe: "PG",
        stimulus: "Data nilai tes matematika 10 orang siswa adalah: 65, 70, 75, 80, 80, 85, 85, 85, 90, 95.",
        pertanyaan: "Kuartil bawah (Q1) dan kuartil atas (Q3) dari data tersebut berturut-turut adalah...",
        opsi: ["75 dan 85", "70 dan 90", "75 dan 90", "80 dan 85"],
        kunci: "A",
        pembahasan: "Data telah terurut: 10 data. Median (Q2) membagi 5 data kiri (65, 70, 75, 80, 80) dan 5 data kanan (85, 85, 85, 90, 95). Nilai tengah data kiri adalah Q1 = 75. Nilai tengah data kanan adalah Q3 = 85.",
        konsepKunci: "Menentukan kuartil data tunggal terurut."
      },
      {
        nomor: 2,
        id: "SMP-NUM-06-02",
        tipe: "MCMA",
        stimulus: "Nilai rata-rata ulangan harian dari 15 siswa laki-laki adalah 72, sedangkan rata-rata nilai dari 10 siswa perempuan adalah 82.",
        pertanyaan: "Pilihlah pernyataan yang BENAR mengenai data gabungan kelas tersebut:",
        opsi: [
          "Total nilai siswa laki-laki adalah 1.080.",
          "Total nilai siswa perempuan adalah 820.",
          "Rata-rata gabungan seluruh siswa kelas tersebut adalah 76.",
          "Rata-rata gabungan adalah rata-rata sederhana dari 72 dan 82 yaitu 77."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Total L = 15 x 72 = 1.080 (Benar). Total P = 10 x 82 = 820 (Benar). Total siswa = 25 orang. Rata-rata gabungan = (1.080 + 820) / 25 = 1.900 / 25 = 76 (Benar). Pernyataan D salah karena jumlah siswa L dan P tidak sama sehingga tidak bisa dirata-rata langsung.",
        konsepKunci: "Rata-rata gabungan terbobot (weighted mean)."
      },
      {
        nomor: 3,
        id: "SMP-NUM-06-03",
        tipe: "BS",
        pertanyaan: "Jangkauan interkuartil (interquartile range) dirumuskan sebagai selisih antara kuartil atas dan kuartil bawah (Q3 - Q1).",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Jangkauan interkuartil IQR = Q3 - Q1. Pernyataan BENAR.",
        konsepKunci: "Definisi jangkauan interkuartil."
      },
      {
        nomor: 4,
        id: "SMP-NUM-06-04",
        tipe: "PG",
        pertanyaan: "Dalam pelemparan sebuah dadu bermata enam sebanyak 120 kali, frekuensi harapan munculnya mata dadu bilangan prima adalah...",
        opsi: ["40 kali", "60 kali", "80 kali", "100 kali"],
        kunci: "B",
        pembahasan: "Bilangan prima pada dadu: {2, 3, 5} ada 3 titik sampel dari 6 mata dadu. Peluang P = 3/6 = 1/2. Frekuensi harapan = P x N = (1/2) x 120 = 60 kali.",
        konsepKunci: "Peluang teoretis dan frekuensi harapan."
      },
      {
        nomor: 5,
        id: "SMP-NUM-06-05",
        tipe: "BS",
        pertanyaan: "Peluang suatu kejadian pasti (pasti terjadi) bernilai 1, sedangkan peluang kejadian mustahil bernilai 0.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Rentang nilai peluang kejadian adalah 0 ≤ P(A) ≤ 1. 0 untuk kemustahilan dan 1 untuk kepastian. Pernyataan BENAR.",
        konsepKunci: "Batas-batas nilai peluang."
      }
    ]
  },
  {
    id: "smp-num-p7",
    subjectId: "smp-numerasi",
    jenjang: "SMP/MTs",
    mapelName: "Numerasi & Penalaran Matematika SMP",
    paketNumber: 7,
    title: "Paket 7: Transformasi Geometri (Translasi & Refleksi)",
    description: "Pergeseran titik, pencerminan terhadap sumbu, rotasi, dan dilatasi koordinat kartesius.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 25,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMP-NUM-07-01",
        tipe: "PG",
        stimulus: "Titik P(3, -5) ditranslasikan oleh vektor geser T(-2, 7).",
        pertanyaan: "Koordinat bayangan titik P' adalah...",
        opsi: ["(1, 2)", "(5, -12)", "(1, -2)", "(-6, -35)"],
        kunci: "A",
        pembahasan: "Translasi: P'(x', y') = (x + a, y + b) = (3 + (-2), -5 + 7) = (1, 2).",
        konsepKunci: "Rumus translasi koordinat kartesius."
      },
      {
        nomor: 2,
        id: "SMP-NUM-07-02",
        tipe: "MCMA",
        stimulus: "Titik Q(4, -3) dicerminkan (refleksi) terhadap sumbu-x dan sumbu-y.",
        pertanyaan: "Pernyataan yang BENAR mengenai bayangan titik Q adalah:",
        opsi: [
          "Bayangan Q terhadap sumbu-x adalah (4, 3).",
          "Bayangan Q terhadap sumbu-y adalah (-4, -3).",
          "Bayangan Q terhadap titik asal O(0,0) adalah (-4, 3).",
          "Refleksi mengubah luas bangun datar yang dicerminkan."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Refleksi sb-x: (x, -y) -> (4, 3) (Benar). Refleksi sb-y: (-x, y) -> (-4, -3) (Benar). Refleksi O(0,0): (-x, -y) -> (-4, 3) (Benar). Refleksi adalah transformasi isometri, tidak mengubah bentuk maupun ukuran luas (Pernyataan D Salah).",
        konsepKunci: "Refleksi titik dan sifat isometri transformasi geometri."
      },
      {
        nomor: 3,
        id: "SMP-NUM-07-03",
        tipe: "BS",
        pertanyaan: "Bayangan titik A(2, 6) yang didilatasi dengan faktor skala k = 3 berpusat di titik asal O(0,0) adalah A'(6, 18).",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Dilatasi [O, k]: (kx, ky) = (3 x 2, 3 x 6) = (6, 18). Pernyataan BENAR.",
        konsepKunci: "Dilatasi koordinat pada pusat O(0,0)."
      },
      {
        nomor: 4,
        id: "SMP-NUM-07-04",
        tipe: "PG",
        pertanyaan: "Rotasi titik B(5, 2) sebesar 90° berlawanan arah jarum jam berpusat di O(0,0) menghasilkan bayangan titik...",
        opsi: ["(-2, 5)", "(2, -5)", "(-5, -2)", "(5, -2)"],
        kunci: "A",
        pembahasan: "Rumus rotasi 90° berlawanan jarum jam: (x, y) -> (-y, x). Jadi (5, 2) -> (-2, 5).",
        konsepKunci: "Rotasi 90° berlawanan arah jarum jam."
      },
      {
        nomor: 5,
        id: "SMP-NUM-07-05",
        tipe: "BS",
        pertanyaan: "Dua bangun datar dikatakan kongruen jika memiliki bentuk yang sama persis dan ukuran sisi-sisi yang bersesuaian sama panjang.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Kongruensi mensyaratkan kesamaan bentuk (sudut bersesuaian sama) dan kesamaan ukuran (sisi bersesuaian sama panjang). Pernyataan BENAR.",
        konsepKunci: "Syarat kongruensi dua bangun datar."
      }
    ]
  },
  {
    id: "smp-num-p8",
    subjectId: "smp-numerasi",
    jenjang: "SMP/MTs",
    mapelName: "Numerasi & Penalaran Matematika SMP",
    paketNumber: 8,
    title: "Paket 8: Pola Barisan & Deret Bilangan Aritmetika Geometri",
    description: "Suku ke-n, jumlah deret aritmetika dan geometri pada pemodelan pertumbuhan populasi.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMP-NUM-08-01",
        tipe: "PG",
        stimulus: "Suku ke-3 suatu barisan aritmetika adalah 11 dan suku ke-8 adalah 26.",
        pertanyaan: "Berapa suku ke-20 barisan tersebut?",
        opsi: ["56", "62", "65", "68"],
        kunci: "B",
        pembahasan: "U3 = a + 2b = 11. U8 = a + 7b = 26. Selisih: 5b = 15 -> b = 3. Maka a = 11 - 2(3) = 5. Suku ke-20: U20 = 5 + (19) x 3 = 5 + 57 = 62.",
        konsepKunci: "Suku ke-n barisan aritmetika Un = a + (n-1)b."
      },
      {
        nomor: 2,
        id: "SMP-NUM-08-02",
        tipe: "MCMA",
        stimulus: "Bakteri jenis tertentu membelah diri menjadi 2 setiap 15 menit. Mula-mula terdapat 10 bakteri dalam tabung pembiakan.",
        pertanyaan: "Pilihlah pernyataan yang BENAR mengenai perkembangbiakan bakteri tersebut:",
        opsi: [
          "Pola pertambahan bakteri membentuk barisan geometri dengan rasio r = 2.",
          "Setelah 1 jam (4 periode pembelahan), banyak bakteri menjadi 160 sel.",
          "Banyak bakteri setelah 30 menit adalah 40 sel.",
          "Setelah 2 jam, banyak bakteri mencapai 10.000 sel."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Rasio = 2 (Benar). 1 jam = 60 menit = 4 kali pembelahan. N = 10 x 2⁴ = 10 x 16 = 160 bakteri (Benar). 30 menit = 2 periode: 10 x 2² = 40 (Benar). Setelah 2 jam = 8 periode: 10 x 2⁸ = 10 x 256 = 2.560 bakteri, bukan 10.000 (Pernyataan D Salah).",
        konsepKunci: "Penerapan barisan geometri pada pembelahan sel."
      },
      {
        nomor: 3,
        id: "SMP-NUM-08-03",
        tipe: "BS",
        pertanyaan: "Jumlah 10 suku pertama dari deret aritmetika 2 + 5 + 8 + 11 + ... adalah 155.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "a = 2, b = 3. Sn = n/2 (2a + (n-1)b) -> S10 = 10/2 (2(2) + 9(3)) = 5 (4 + 27) = 5 (31) = 155. Pernyataan BENAR.",
        konsepKunci: "Rumus jumlah deret aritmetika Sn."
      },
      {
        nomor: 4,
        id: "SMP-NUM-08-04",
        tipe: "PG",
        pertanyaan: "Sebuah tali dipotong menjadi 5 bagian membentuk barisan geometri. Panjang potongan terpendek 4 cm dan terpanjang 64 cm. Panjang tali mula-mula sebelum dipotong adalah...",
        opsi: ["120 cm", "124 cm", "128 cm", "132 cm"],
        kunci: "B",
        pembahasan: "a = 4, U5 = a r⁴ = 64 -> 4 r⁴ = 64 -> r⁴ = 16 -> r = 2. S5 = a(r⁵ - 1) / (r - 1) = 4(32 - 1) / (2 - 1) = 4 x 31 = 124 cm.",
        konsepKunci: "Deret geometri pada masalah pembagian panjang."
      },
      {
        nomor: 5,
        id: "SMP-NUM-08-05",
        tipe: "BS",
        pertanyaan: "Pada barisan geometri 3, 6, 12, 24, ..., rasio antarsuku yang berdekatan selalu tetap yaitu bernilai 2.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Rasio r = U2 / U1 = 6 / 3 = 2. Pernyataan BENAR.",
        konsepKunci: "Rasio konstan barisan geometri."
      }
    ]
  },
  {
    id: "smp-num-p9",
    subjectId: "smp-numerasi",
    jenjang: "SMP/MTs",
    mapelName: "Numerasi & Penalaran Matematika SMP",
    paketNumber: 9,
    title: "Paket 9: Persamaan Kuadrat & Fungsi Kuadrat",
    description: "Akar-akar persamaan kuadrat, diskriminan, titik puncak parabola, dan sumbu simetri.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMP-NUM-09-01",
        tipe: "PG",
        stimulus: "Akar-akar dari persamaan kuadrat x² - 5x + 6 = 0 adalah x1 dan x2.",
        pertanyaan: "Berapa nilai dari x1² + x2²?",
        opsi: ["11", "13", "15", "19"],
        kunci: "B",
        pembahasan: "Berdasarkan teorema Vieta: x1 + x2 = -b/a = 5, dan x1 x2 = c/a = 6. Maka x1² + x2² = (x1 + x2)² - 2(x1 x2) = 5² - 2(6) = 25 - 12 = 13.",
        konsepKunci: "Teorema Vieta persamaan kuadrat."
      },
      {
        nomor: 2,
        id: "SMP-NUM-09-02",
        tipe: "MCMA",
        stimulus: "Perhatikan fungsi kuadrat f(x) = -x² + 6x - 5.",
        pertanyaan: "Pilihlah karakteristik kurva parabola f(x) yang BENAR:",
        opsi: [
          "Kurva parabola terbuka ke bawah karena koefisien a = -1 (< 0).",
          "Titik puncak (titik maksimum) parabola berada di koordinat (3, 4).",
          "Persamaan sumbu simetrinya adalah garis x = 3.",
          "Diskriminan D = b² - 4ac bernilai negatif sehingga kurva tidak memotong sumbu-x."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "a = -1 (terbuka ke bawah). Sumbu simetri x = -b/2a = -6/(2(-1)) = 3. Nilai maksimum y = -(3)² + 6(3) - 5 = -9 + 18 - 5 = 4. Titik puncak (3, 4). D = 6² - 4(-1)(-5) = 36 - 20 = 16 > 0, kurva memotong sumbu-x di 2 titik berbeda (Pernyataan D Salah).",
        konsepKunci: "Karakteristik fungsi kuadrat dan titik ekstrem."
      },
      {
        nomor: 3,
        id: "SMP-NUM-09-03",
        tipe: "BS",
        pertanyaan: "Sebuah persamaan kuadrat ax² + bx + c = 0 memiliki dua akar real kembar jika dan hanya jika nilai diskriminannya bernilai nol (D = 0).",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Jika D > 0 memiliki 2 akar real berbeda, jika D = 0 memiliki akar real kembar, jika D < 0 tidak memiliki akar real. Pernyataan BENAR.",
        konsepKunci: "Sifat diskriminan D = b² - 4ac."
      },
      {
        nomor: 4,
        id: "SMP-NUM-09-04",
        tipe: "PG",
        pertanyaan: "Sebuah peluru ditembakkan ke atas dengan rumus ketinggian h(t) = 40t - 5t² (dalam meter dan t dalam detik). Tinggi maksimum yang dapat dicapai peluru tersebut adalah...",
        opsi: ["60 meter", "80 meter", "100 meter", "120 meter"],
        kunci: "B",
        pembahasan: "Waktu mencapai puncak: t = -b/(2a) = -40 / (2 x -5) = -40 / -10 = 4 detik. Tinggi maksimum h(4) = 40(4) - 5(4)² = 160 - 5(16) = 160 - 80 = 80 meter.",
        konsepKunci: "Aplikasi nilai optimum fungsi kuadrat pada gerak parabola."
      },
      {
        nomor: 5,
        id: "SMP-NUM-09-05",
        tipe: "BS",
        pertanyaan: "Faktorisasi aljabar dari bentuk 2x² + 7x + 3 adalah (2x + 1)(x + 3).",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Cek perkalian: (2x + 1)(x + 3) = 2x² + 6x + x + 3 = 2x² + 7x + 3. Pernyataan BENAR.",
        konsepKunci: "Faktorisasi bentuk kuadrat ax² + bx + c."
      }
    ]
  },
  {
    id: "smp-num-p10",
    subjectId: "smp-numerasi",
    jenjang: "SMP/MTs",
    mapelName: "Numerasi & Penalaran Matematika SMP",
    paketNumber: 10,
    title: "Paket 10: Grand Final Numerasi SMP (HOTS Tingkat Mahir)",
    description: "Pemecahan masalah multi-tahap, kombinasi aljabar geometri, dan penalaran statistik terpadu.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMP-NUM-10-01",
        tipe: "PG",
        stimulus: "Dua buah dadu bersisi enam dilemparkan bersama-sama satu kali.",
        pertanyaan: "Peluang munculnya jumlah mata dadu sama dengan 8 atau mata dadu bernilai sama (kembar) adalah...",
        opsi: ["10/36", "11/36", "12/36", "15/36"],
        kunci: "A",
        pembahasan: "Ruang sampel total = 36.\nKejadian A (jumlah 8): {(2,6), (3,5), (4,4), (5,3), (6,2)} -> 5 titik.\nKejadian B (kembar): {(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)} -> 6 titik.\nIrisan A ∩ B: {(4,4)} -> 1 titik.\nTotal gabungan = 5 + 6 - 1 = 10 titik. Peluang = 10/36.",
        konsepKunci: "Peluang gabungan dua kejadian tidak saling lepas."
      },
      {
        nomor: 2,
        id: "SMP-NUM-10-02",
        tipe: "MCMA",
        stimulus: "Sebuah kerucut terpancung (ember) memiliki jari-jari lingkaran atas R = 10 cm, jari-jari lingkaran bawah r = 4 cm, dan tinggi t = 8 cm.",
        pertanyaan: "Pilihlah fakta geometris yang BENAR mengenai bangun tersebut:",
        opsi: [
          "Panjang garis pelukis miring selimutnya adalah 10 cm.",
          "Luas penampang alas bawah kerucut terpancung adalah 16π cm².",
          "Luas penampang atas kerucut terpancung adalah 100π cm².",
          "Volume kerucut terpancung dihitung dengan formula 1/3 π t (R² + Rr + r²)."
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "Selisih jari-jari = 10 - 4 = 6 cm. Garis pelukis s = √(6² + 8²) = 10 cm (Benar). Luas alas = π(4)² = 16π (Benar). Luas atas = π(10)² = 100π (Benar). Formula volume kerucut terpancung 1/3 π t (R² + Rr + r²) (Benar). Keempat pernyataan benar!",
        konsepKunci: "Geometri kerucut terpancung."
      },
      {
        nomor: 3,
        id: "SMP-NUM-10-03",
        tipe: "BS",
        pertanyaan: "Jika x dan y adalah bilangan bulat positif yang memenuhi x² - y² = 19, maka nilai dari x + y = 19 dan x - y = 1.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "x² - y² = (x + y)(x - y) = 19. Karena 19 adalah bilangan prima, faktornya hanya 19 x 1. Karena x dan y positif, maka (x + y) = 19 dan (x - y) = 1. Pernyataan BENAR.",
        konsepKunci: "Teori bilangan dan faktorisasi selisih kuadrat."
      },
      {
        nomor: 4,
        id: "SMP-NUM-10-04",
        tipe: "PG",
        pertanyaan: "Dalam sebuah barisan geometri tak hingga, suku pertama adalah 18 dan rasionya adalah 1/3. Jumlah deret geometri tak hingga tersebut adalah...",
        opsi: ["24", "27", "30", "36"],
        kunci: "B",
        pembahasan: "Rumus deret geometri tak hingga: S∞ = a / (1 - r) = 18 / (1 - 1/3) = 18 / (2/3) = 18 x (3/2) = 27.",
        konsepKunci: "Deret geometri tak hingga konvergen S∞ = a / (1 - r)."
      },
      {
        nomor: 5,
        id: "SMP-NUM-10-05",
        tipe: "BS",
        pertanyaan: "Sebuah segitiga dengan panjang sisi 10 cm, 24 cm, dan 26 cm merupakan segitiga siku-siku karena memenuhi 10² + 24² = 100 + 576 = 676 = 26².",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Memenuhi kebalikan teorema Pythagoras sehingga membentuk segitiga siku-siku. Pernyataan BENAR.",
        konsepKunci: "Kebalikan teorema Pythagoras."
      }
    ]
  }
];
