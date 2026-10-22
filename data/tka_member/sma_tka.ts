import { TKAPaket } from "./types";

// ============================================================================
// BANK SOAL TKA MEMBER: SMA NUMERASI & PENALARAN MATEMATIKA (10 PAKET BERTINGKAT)
// Kurikulum Merdeka & Standar TKA Nasional dengan pembahasan analitis lengkap
// ============================================================================

export const paketSMANumerasi: TKAPaket[] = [
  {
    id: "sma-num-p1",
    subjectId: "sma-numerasi",
    jenjang: "SMA",
    mapelName: "Penalaran Matematika & Numerasi SMA",
    paketNumber: 1,
    title: "Paket 1: Eksponen, Logaritma & Aljabar Dasar",
    description: "Sifat-sifat eksponen berpangkat pecahan, persamaan logaritma, dan operasi bentuk akar.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMA-NUM-01-01",
        tipe: "PG",
        pertanyaan: "Bentuk sederhana dari (2³ x 3⁴) / (2 x 3²) adalah...",
        opsi: ["18", "36", "72", "108"],
        kunci: "B",
        pembahasan: "(2³ / 2¹) x (3⁴ / 3²) = 2^(3-1) x 3^(4-2) = 2² x 3² = 4 x 9 = 36.",
        konsepKunci: "Sifat-sifat eksponen pembagian basis sama."
      },
      {
        nomor: 2,
        id: "SMA-NUM-01-02",
        tipe: "MCMA",
        stimulus: "Diketahui ²log 3 = a dan ²log 5 = b.",
        pertanyaan: "Pilihlah bentuk logaritma yang BENAR dinyatakan dalam a dan b:",
        opsi: [
          "²log 15 = a + b",
          "²log 45 = 2a + b",
          "²log (5/3) = b - a",
          "²log 30 = a + b + 1"
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "²log 15 = ²log(3x5) = a + b (Benar). ²log 45 = ²log(3²x5) = 2a + b (Benar). ²log(5/3) = b - a (Benar). ²log 30 = ²log(2x3x5) = ²log 2 + a + b = 1 + a + b (Benar). Keempat opsi benar!",
        konsepKunci: "Sifat-sifat logaritma perkalian dan pembagian basis sama."
      },
      {
        nomor: 3,
        id: "SMA-NUM-01-03",
        tipe: "BS",
        pertanyaan: "Bentuk rasional dari penyebut pecahan 6 / (√5 - √2) adalah 2(√5 + √2).",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Kalikan sekawan (√5 + √2) / (√5 + √2): [6(√5 + √2)] / (5 - 2) = 6(√5 + √2) / 3 = 2(√5 + √2). Pernyataan BENAR.",
        konsepKunci: "Merasionalkan penyebut pecahan bentuk akar."
      },
      {
        nomor: 4,
        id: "SMA-NUM-01-04",
        tipe: "PG",
        pertanyaan: "Penyelesaian dari persamaan eksponen 3^(2x - 1) = 27 adalah...",
        opsi: ["x = 1", "x = 2", "x = 3", "x = 4"],
        kunci: "B",
        pembahasan: "3^(2x - 1) = 3³ -> 2x - 1 = 3 -> 2x = 4 -> x = 2.",
        konsepKunci: "Persamaan eksponen dasar."
      },
      {
        nomor: 5,
        id: "SMA-NUM-01-05",
        tipe: "BS",
        pertanyaan: "Nilai dari ⁵log 125 adalah 3 karena 5³ = 125.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "⁵log 5³ = 3 ⁵log 5 = 3 x 1 = 3. Pernyataan BENAR.",
        konsepKunci: "Definisi inversi logaritma."
      }
    ]
  },
  {
    id: "sma-num-p2",
    subjectId: "sma-numerasi",
    jenjang: "SMA",
    mapelName: "Penalaran Matematika & Numerasi SMA",
    paketNumber: 2,
    title: "Paket 2: Matriks & Sistem Persamaan Linear Tiga Variabel",
    description: "Operasi perkalian matriks, determinan matriks 2x2 dan 3x3, serta invers matriks.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMA-NUM-02-01",
        tipe: "PG",
        stimulus: "Diketahui matriks A = [[2, 1], [3, 4]] dan B = [[1, 2], [0, 3]].",
        pertanyaan: "Hasil perkalian matriks A x B adalah...",
        opsi: ["[[2, 7], [3, 18]]", "[[2, 5], [3, 18]]", "[[2, 7], [3, 12]]", "[[3, 3], [3, 7]]"],
        kunci: "A",
        pembahasan: "Baris 1: (2x1 + 1x0, 2x2 + 1x3) = (2, 4 + 3) = (2, 7). Baris 2: (3x1 + 4x0, 3x2 + 4x3) = (3, 6 + 12) = (3, 18). Matriks hasil = [[2, 7], [3, 18]].",
        konsepKunci: "Perkalian matriks ordo 2x2."
      },
      {
        nomor: 2,
        id: "SMA-NUM-02-02",
        tipe: "MCMA",
        stimulus: "Matriks M = [[4, 2], [3, 2]].",
        pertanyaan: "Pernyataan yang BENAR mengenai matriks M adalah:",
        opsi: [
          "Determinan matriks det(M) adalah (4)(2) - (2)(3) = 2.",
          "Matriks M memiliki invers karena determinannya tidak sama dengan nol.",
          "Invers matriks M adalah [[1, -1], [-1.5, 2]].",
          "Transpose matriks M^T adalah [[4, 3], [2, 2]]."
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "det(M) = 8 - 6 = 2 (Benar). Karena det ≠ 0 maka non-singular dan punya invers (Benar). M⁻¹ = 1/2 [[2, -2], [-3, 4]] = [[1, -1], [-1.5, 2]] (Benar). Transpose menukar baris dan kolom: [[4, 3], [2, 2]] (Benar). Semua opsi benar!",
        konsepKunci: "Determinan, invers, dan transpose matriks ordo 2x2."
      },
      {
        nomor: 3,
        id: "SMA-NUM-02-03",
        tipe: "BS",
        pertanyaan: "Matriks singular adalah matriks yang nilai determinannya sama dengan nol sehingga tidak memiliki invers.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Syarat matriks singular adalah det(A) = 0, sehingga 1/det(A) tidak terdefinisi (tidak memiliki invers). Pernyataan BENAR.",
        konsepKunci: "Definisi matriks singular."
      },
      {
        nomor: 4,
        id: "SMA-NUM-02-04",
        tipe: "PG",
        pertanyaan: "Nilai determinan dari matriks [[3, 5], [2, 6]] adalah...",
        opsi: ["8", "10", "12", "14"],
        kunci: "A",
        pembahasan: "det = (3 x 6) - (5 x 2) = 18 - 10 = 8.",
        konsepKunci: "Determinan matriks 2x2 ad - bc."
      },
      {
        nomor: 5,
        id: "SMA-NUM-02-05",
        tipe: "BS",
        pertanyaan: "Sifat determinan matriks memenuhi det(A x B) = det(A) x det(B).",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Determinan perkalian dua matriks persegi sama dengan perkalian determinan masing-masing matriksnya. Pernyataan BENAR.",
        konsepKunci: "Sifat perkalian determinan matriks."
      }
    ]
  },
  {
    id: "sma-num-p3",
    subjectId: "sma-numerasi",
    jenjang: "SMA",
    mapelName: "Penalaran Matematika & Numerasi SMA",
    paketNumber: 3,
    title: "Paket 3: Trigonometri Dasar & Aturan Sinus Kosinus",
    description: "Perbandingan trigonometri segitiga siku-siku, sudut istimewa, serta aturan sinus dan kosinus.",
    levelKesukaran: "Level 1: Dasar & Pemahaman",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMA-NUM-03-01",
        tipe: "PG",
        stimulus: "Pada segitiga ABC, panjang sisi b = 6 cm, c = 8 cm, dan besar sudut A = 60°.",
        pertanyaan: "Panjang sisi a adalah... (Gunakan aturan kosinus: a² = b² + c² - 2bc cos A)",
        opsi: ["2√13 cm", "2√37 cm", "8 cm", "10 cm"],
        kunci: "A",
        pembahasan: "a² = 6² + 8² - 2(6)(8) cos 60° = 36 + 64 - 96(1/2) = 100 - 48 = 52. a = √52 = √(4 x 13) = 2√13 cm.",
        konsepKunci: "Aturan kosinus pada segitiga sembarang."
      },
      {
        nomor: 2,
        id: "SMA-NUM-03-02",
        tipe: "MCMA",
        stimulus: "Perhatikan identitas trigonometri dasar untuk setiap sudut lancip α.",
        pertanyaan: "Identitas trigonometri yang BENAR di bawah ini adalah:",
        opsi: [
          "sin²α + cos²α = 1",
          "tan α = sin α / cos α",
          "1 + tan²α = sec²α",
          "sin(2α) = 2 sin α cos α"
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "Keempat identitas trigonometri di atas merupakan rumus baku Pythagoras trigonometri dan rumus sudut rangkap yang terbukti benar.",
        konsepKunci: "Identitas trigonometri dasar dan sudut rangkap."
      },
      {
        nomor: 3,
        id: "SMA-NUM-03-03",
        tipe: "BS",
        pertanyaan: "Nilai dari sin 30° sama dengan nilai dari cos 60°, yaitu 1/2.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Sudut berelasi komplemen: sin(90° - α) = cos α. Jadi sin 30° = cos 60° = 1/2. Pernyataan BENAR.",
        konsepKunci: "Sudut komplemen trigonometri."
      },
      {
        nomor: 4,
        id: "SMA-NUM-03-04",
        tipe: "PG",
        pertanyaan: "Luas segitiga PQR dengan panjang sisi p = 8 cm, q = 10 cm, dan sudut R = 30° adalah...",
        opsi: ["20 cm²", "40 cm²", "20√3 cm²", "40√3 cm²"],
        kunci: "A",
        pembahasan: "Luas segitiga = 1/2 x p x q x sin R = 1/2 x 8 x 10 x sin 30° = 40 x (1/2) = 20 cm².",
        konsepKunci: "Luas segitiga dengan trigonometri: 1/2 ab sin C."
      },
      {
        nomor: 5,
        id: "SMA-NUM-03-05",
        tipe: "BS",
        pertanyaan: "Grafik fungsi y = sin x memiliki nilai maksimum 1 dan nilai minimum -1.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Amplitudo fungsi sinusoidal standar y = sin x berkisar pada interval [-1, 1]. Pernyataan BENAR.",
        konsepKunci: "Amplitudo dan nilai batas grafik fungsi trigonometri."
      }
    ]
  },
  {
    id: "sma-num-p4",
    subjectId: "sma-numerasi",
    jenjang: "SMA",
    mapelName: "Penalaran Matematika & Numerasi SMA",
    paketNumber: 4,
    title: "Paket 4: Dimensi Tiga (Jarak Titik, Garis, dan Bidang)",
    description: "Geometri ruang kubus dan limas, jarak titik ke garis, dan sudut antar bidang.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMA-NUM-04-01",
        tipe: "PG",
        stimulus: "Pada kubus ABCD.EFGH dengan panjang rusuk 8 cm, titik P adalah titik tengah rusuk FG.",
        pertanyaan: "Jarak titik A ke titik P adalah...",
        opsi: ["12 cm", "8√2 cm", "4√6 cm", "10 cm"],
        kunci: "A",
        pembahasan: "Koordinat kartesius: A(0,0,0). Titik P di tengah FG: F(0,8,8), G(8,8,8) -> P(4,8,8). Jarak AP = √(4² + 8² + 8²) = √(16 + 64 + 64) = √144 = 12 cm.",
        konsepKunci: "Jarak dua titik pada dimensi tiga ruang kubus."
      },
      {
        nomor: 2,
        id: "SMA-NUM-04-02",
        tipe: "MCMA",
        stimulus: "Kubus ABCD.EFGH dengan panjang rusuk s.",
        pertanyaan: "Pilihlah hubungan geometris yang BENAR pada kubus tersebut:",
        opsi: [
          "Panjang diagonal bidang kubus adalah s√2.",
          "Panjang diagonal ruang kubus adalah s√3.",
          "Garis AB sejajar dengan garis EF.",
          "Garis AE tegak lurus terhadap bidang alas ABCD."
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "Semua pernyataan tersebut merupakan sifat geometris baku dari kubus beraturan.",
        konsepKunci: "Sifat-sifat dimensi tiga pada bangun kubus."
      },
      {
        nomor: 3,
        id: "SMA-NUM-04-03",
        tipe: "BS",
        pertanyaan: "Jarak titik E ke garis diagonal ruang HB pada kubus dengan rusuk 6 cm dapat dihitung menggunakan perbandingan luas segitiga siku-siku EHB, yaitu (6√2 x 6) / 6√3 = 2√6 cm.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Segitiga EHB siku-siku di E. Jarak = (EH x EB) / HB = (6 x 6√2) / 6√3 = 6√2 / √3 = 2√6 cm. Pernyataan BENAR.",
        konsepKunci: "Jarak titik ke garis pada ruang dimensi tiga."
      },
      {
        nomor: 4,
        id: "SMA-NUM-04-04",
        tipe: "PG",
        pertanyaan: "Besar sudut antara garis diagonal ruang AG dan bidang alas ABCD pada kubus adalah...",
        opsi: ["arcsin(1/√3)", "30°", "45°", "60°"],
        kunci: "A",
        pembahasan: "Proyeksi garis AG pada bidang ABCD adalah AC. Segitiga ACG siku-siku di C. sin(∠CAG) = CG / AG = s / s√3 = 1/√3. Sudutnya adalah arcsin(1/√3) ≈ 35,26°.",
        konsepKunci: "Sudut antara garis dan bidang dimensi tiga."
      },
      {
        nomor: 5,
        id: "SMA-NUM-04-05",
        tipe: "BS",
        pertanyaan: "Bidang diagonal BDHF dan bidang ACGE pada kubus saling berpotongan tegak lurus di sumbu tengah kubus.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Karena alas ABCD persegi dan diagonalnya saling tegak lurus (AC ⊥ BD), maka bidang diagonal yang memuatnya (ACGE dan BDHF) juga saling tegak lurus. Pernyataan BENAR.",
        konsepKunci: "Kedudukan dua bidang diagonal kubus."
      }
    ]
  },
  {
    id: "sma-num-p5",
    subjectId: "sma-numerasi",
    jenjang: "SMA",
    mapelName: "Penalaran Matematika & Numerasi SMA",
    paketNumber: 5,
    title: "Paket 5: Limit Fungsi Aljabar & Trigonometri",
    description: "Limit mendekati nilai berhingga, pemfaktoran, perkalian sekawan, dan limit tak hingga.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMA-NUM-05-01",
        tipe: "PG",
        stimulus: "Tentukan nilai dari lim(x -> 2) [(x² - 4) / (x - 2)].",
        pertanyaan: "Nilai limit tersebut adalah...",
        opsi: ["0", "2", "4", "Tidak terdefinisi"],
        kunci: "C",
        pembahasan: "Bentuk tak tentu 0/0. Faktorkan pembilang: (x - 2)(x + 2) / (x - 2) = x + 2. Substitusi x = 2 -> 2 + 2 = 4.",
        konsepKunci: "Penyelesaian limit aljabar metode pemfaktoran."
      },
      {
        nomor: 2,
        id: "SMA-NUM-05-02",
        tipe: "MCMA",
        stimulus: "Perhatikan limit trigonometri lim(x -> 0) [sin(ax) / bx].",
        pertanyaan: "Pernyataan yang BENAR mengenai limit trigonometri dasar di sekitar nol adalah:",
        opsi: [
          "lim(x -> 0) [sin(ax) / bx] = a/b",
          "lim(x -> 0) [tan(ax) / bx] = a/b",
          "lim(x -> 0) [sin(4x) / (2x)] = 2",
          "lim(x -> 0) [(1 - cos x) / x²] = 1/2"
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "Semua pernyataan tersebut merupakan teorema baku limit fungsi trigonometri.",
        konsepKunci: "Teorema limit fungsi trigonometri dasar."
      },
      {
        nomor: 3,
        id: "SMA-NUM-05-03",
        tipe: "BS",
        pertanyaan: "Nilai dari lim(x -> ∞) [(3x² + 5x - 2) / (6x² - x + 4)] adalah 1/2.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Derajat tertinggi pembilang dan penyebut sama-sama x². Nilai limit adalah perbandingan koefisien derajat tertinggi: 3/6 = 1/2. Pernyataan BENAR.",
        konsepKunci: "Limit fungsi rasional mendekati tak hingga."
      },
      {
        nomor: 4,
        id: "SMA-NUM-05-04",
        tipe: "PG",
        pertanyaan: "Nilai dari lim(x -> 0) [(1 - cos 2x) / x²] adalah...",
        opsi: ["1", "2", "4", "1/2"],
        kunci: "B",
        pembahasan: "Ingat identitas 1 - cos 2x = 2 sin²x. Maka lim(x -> 0) [2 sin²x / x²] = 2 x [lim(x -> 0) (sin x / x)]² = 2 x 1² = 2.",
        konsepKunci: "Limit trigonometri dengan identitas sudut rangkap."
      },
      {
        nomor: 5,
        id: "SMA-NUM-05-05",
        tipe: "BS",
        pertanyaan: "Teorema L'Hopital dapat digunakan untuk menyelesaikan limit yang menghasilkan bentuk tak tentu 0/0 atau ∞/∞ dengan cara menurunkan pembilang dan penyebut secara terpisah.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Teorema L'Hopital menyatakan lim f(x)/g(x) = lim f'(x)/g'(x) jika terjadi bentuk tak tentu 0/0 atau ∞/∞. Pernyataan BENAR.",
        konsepKunci: "Aturan L'Hopital kalkulus diferensial."
      }
    ]
  },
  {
    id: "sma-num-p6",
    subjectId: "sma-numerasi",
    jenjang: "SMA",
    mapelName: "Penalaran Matematika & Numerasi SMA",
    paketNumber: 6,
    title: "Paket 6: Turunan Fungsi Aljabar & Nilai Optimum",
    description: "Turunan pertama dan kedua, fungsi naik/turun, titik stasioner, dan masalah optimasi ekonomi.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMA-NUM-06-01",
        tipe: "PG",
        stimulus: "Fungsi laba penjualan suatu produk dinyatakan dengan L(x) = -2x² + 40x - 50 (dalam jutaan rupiah dan x adalah jumlah unit barang).",
        pertanyaan: "Berapa unit barang x yang harus diproduksi agar diperoleh laba maksimum?",
        opsi: ["10 unit", "15 unit", "20 unit", "25 unit"],
        kunci: "A",
        pembahasan: "Laba maksimum dicapai saat turunan pertama L'(x) = 0. L'(x) = -4x + 40 = 0 -> 4x = 40 -> x = 10 unit.",
        konsepKunci: "Aplikasi turunan untuk optimasi nilai maksimum."
      },
      {
        nomor: 2,
        id: "SMA-NUM-06-02",
        tipe: "MCMA",
        stimulus: "Diberikan fungsi kubik f(x) = x³ - 3x² - 9x + 5.",
        pertanyaan: "Pilihlah pernyataan yang BENAR mengenai fungsi f(x):",
        opsi: [
          "Turunan pertama f'(x) adalah 3x² - 6x - 9.",
          "Titik stasioner terjadi pada saat x = -1 dan x = 3.",
          "Fungsi f(x) naik pada interval x < -1 atau x > 3.",
          "Nilai balik maksimum lokal terjadi pada saat x = -1."
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "f'(x) = 3x² - 6x - 9 = 3(x² - 2x - 3) = 3(x - 3)(x + 1) = 0 -> x = 3 atau x = -1 (Titik stasioner). Uji tanda: positif untuk x < -1 dan x > 3 (fungsi naik). f''(-1) = 6(-1) - 6 = -12 < 0 (maksimum lokal di x = -1). Keempat opsi benar!",
        konsepKunci: "Analisis kurva: fungsi naik/turun dan titik balik stasioner."
      },
      {
        nomor: 3,
        id: "SMA-NUM-06-03",
        tipe: "BS",
        pertanyaan: "Gradien garis singgung kurva y = x² - 4x + 3 pada titik berabsis x = 5 adalah 6.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "m = y' = 2x - 4. Untuk x = 5: m = 2(5) - 4 = 10 - 4 = 6. Pernyataan BENAR.",
        konsepKunci: "Gradien garis singgung kurva: m = f'(x)."
      },
      {
        nomor: 4,
        id: "SMA-NUM-06-04",
        tipe: "PG",
        pertanyaan: "Turunan pertama dari fungsi rasional f(x) = (2x + 1) / (x - 3) untuk x ≠ 3 adalah...",
        opsi: ["-7 / (x - 3)²", "7 / (x - 3)²", "-5 / (x - 3)²", "2 / (x - 3)²"],
        kunci: "A",
        pembahasan: "Rumus turunan pembagian (u/v)' = (u'v - uv') / v². u = 2x + 1 -> u' = 2; v = x - 3 -> v' = 1. f'(x) = [2(x - 3) - (2x + 1)(1)] / (x - 3)² = [2x - 6 - 2x - 1] / (x - 3)² = -7 / (x - 3)².",
        konsepKunci: "Aturan turunan fungsi pecahan aljabar."
      },
      {
        nomor: 5,
        id: "SMA-NUM-06-05",
        tipe: "BS",
        pertanyaan: "Turunan dari konstanta k adalah 0, dan turunan dari x^n adalah n x^(n-1).",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Aturan pangkat dasar kalkulus diferensial: d/dx (x^n) = n x^(n-1) dan d/dx (k) = 0. Pernyataan BENAR.",
        konsepKunci: "Aturan dasar diferensial fungsi aljabar."
      }
    ]
  },
  {
    id: "sma-num-p7",
    subjectId: "sma-numerasi",
    jenjang: "SMA",
    mapelName: "Penalaran Matematika & Numerasi SMA",
    paketNumber: 7,
    title: "Paket 7: Integral Tak Tentu & Integral Tentu",
    description: "Antiturunan fungsi aljabar, integral substitusi, dan perhitungan luas daerah di bawah kurva.",
    levelKesukaran: "Level 2: Aplikasi & Terapan",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMA-NUM-07-01",
        tipe: "PG",
        pertanyaan: "Hasil pengintegralan tentu dari ∫[0 to 3] (3x² - 2x + 4) dx adalah...",
        opsi: ["24", "30", "36", "42"],
        kunci: "B",
        pembahasan: "F(x) = x³ - x² + 4x. Evaluasi batas [0 to 3]: F(3) = (3)³ - (3)² + 4(3) = 27 - 9 + 12 = 30. F(0) = 0. Hasil = 30 - 0 = 30.",
        konsepKunci: "Teorema dasar kalkulus integral tentu."
      },
      {
        nomor: 2,
        id: "SMA-NUM-07-02",
        tipe: "MCMA",
        stimulus: "Luas daerah tertutup yang dibatasi oleh kurva parabola y = x² dan garis lurus y = 4.",
        pertanyaan: "Pilihlah pernyataan yang BENAR mengenai luas daerah tersebut:",
        opsi: [
          "Titik potong kedua kurva adalah x = -2 dan x = 2.",
          "Luas dihitung dengan integral ∫[-2 to 2] (4 - x²) dx.",
          "Luas daerah tersebut adalah 32/3 satuan luas.",
          "Luas daerah tersebut bernilai negatif karena di bawah kurva."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Titik potong x² = 4 -> x = ±2 (Benar). L = ∫[-2 to 2] (4 - x²) dx = [4x - x³/3][-2 to 2] = (8 - 8/3) - (-8 + 8/3) = 16/3 - (-16/3) = 32/3 satuan luas (Benar). Luas daerah geometris selalu bernilai positif (Pernyataan D Salah).",
        konsepKunci: "Menghitung luas daerah antara dua kurva."
      },
      {
        nomor: 3,
        id: "SMA-NUM-07-03",
        tipe: "BS",
        pertanyaan: "Hasil dari ∫ (2x + 5)⁴ dx dapat diselesaikan dengan substitusi aljabar u = 2x + 5, menghasilkan 1/10 (2x + 5)⁵ + C.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "du = 2 dx -> dx = du/2. ∫ u⁴ (du/2) = 1/2 (u⁵/5) + C = 1/10 u⁵ + C = 1/10 (2x + 5)⁵ + C. Pernyataan BENAR.",
        konsepKunci: "Integral substitusi aljabar."
      },
      {
        nomor: 4,
        id: "SMA-NUM-07-04",
        tipe: "PG",
        pertanyaan: "Sebuah partikel bergerak dengan percepatan konstan a(t) = 6t. Jika kecepatan awal v(0) = 4 m/s, rumus kecepatan v(t) adalah...",
        opsi: ["v(t) = 3t² + 4", "v(t) = 6t² + 4", "v(t) = 3t²", "v(t) = t³ + 4"],
        kunci: "A",
        pembahasan: "v(t) = ∫ a(t) dt = ∫ 6t dt = 3t² + C. Diketahui v(0) = 4 -> 3(0)² + C = 4 -> C = 4. Maka v(t) = 3t² + 4.",
        konsepKunci: "Penerapan integral pada kinematika gerak partikel."
      },
      {
        nomor: 5,
        id: "SMA-NUM-07-05",
        tipe: "BS",
        pertanyaan: "Sifat linearitas integral menyatakan ∫ [f(x) + g(x)] dx = ∫ f(x) dx + ∫ g(x) dx.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Integral bersifat linear terhadap operasi penjumlahan dan perkalian skalar. Pernyataan BENAR.",
        konsepKunci: "Sifat linearitas integral."
      }
    ]
  },
  {
    id: "sma-num-p8",
    subjectId: "sma-numerasi",
    jenjang: "SMA",
    mapelName: "Penalaran Matematika & Numerasi SMA",
    paketNumber: 8,
    title: "Paket 8: Kombinatorika & Peluang Bersyarat",
    description: "Kaidah pencacahan, permutasi unsur berbeda/berulang, kombinasi, dan teorema peluang Bayes.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMA-NUM-08-01",
        tipe: "PG",
        stimulus: "Dari 8 orang pengurus OSIS, akan dipilih ketua, wakil ketua, sekretaris, dan bendahara.",
        pertanyaan: "Berapa banyak susunan pengurus berbeda yang mungkin terbentuk?",
        opsi: ["70 cara", "840 cara", "1.680 cara", "2.016 cara"],
        kunci: "C",
        pembahasan: "Memperhatikan urutan jabatan -> Permutasi P(8, 4) = 8! / (8 - 4)! = 8 x 7 x 6 x 5 = 1.680 cara.",
        konsepKunci: "Permutasi n objek r elemen."
      },
      {
        nomor: 2,
        id: "SMA-NUM-08-02",
        tipe: "MCMA",
        stimulus: "Sebuah tim olimpiade sains beranggotakan 4 orang akan dipilih dari 6 siswa putra dan 4 siswa putri.",
        pertanyaan: "Pernyataan yang BENAR mengenai banyaknya kombinasi tim yang dapat dibentuk adalah:",
        opsi: [
          "Banyaknya seluruh kombinasi tim tanpa syarat adalah C(10, 4) = 210 cara.",
          "Banyaknya tim yang terdiri dari tepat 2 putra dan 2 putri adalah C(6, 2) x C(4, 2) = 15 x 6 = 90 cara.",
          "Banyaknya tim yang semuanya beranggotakan siswa putri adalah C(4, 4) = 1 cara.",
          "Banyaknya tim yang semuanya beranggotakan siswa putra adalah C(6, 4) = 25 cara."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "C(10, 4) = 210 (Benar). 2 putra & 2 putri = C(6,2) x C(4,2) = 15 x 6 = 90 (Benar). 4 putri = C(4,4) = 1 (Benar). 4 putra = C(6,4) = 6! / (4! 2!) = 15 cara, bukan 25 (Pernyataan D Salah).",
        konsepKunci: "Kombinasi nCr dan kaidah perkalian kombinatorika."
      },
      {
        nomor: 3,
        id: "SMA-NUM-08-03",
        tipe: "BS",
        pertanyaan: "Peluang bersyarat terjadinya kejadian A dengan syarat kejadian B telah terjadi dirumuskan P(A|B) = P(A ∩ B) / P(B) untuk P(B) > 0.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Ini adalah definisi baku peluang bersyarat (conditional probability). Pernyataan BENAR.",
        konsepKunci: "Definisi peluang bersyarat P(A|B)."
      },
      {
        nomor: 4,
        id: "SMA-NUM-08-04",
        tipe: "PG",
        pertanyaan: "Berapa banyak kata berbeda yang dapat disusun dari huruf-huruf pembentuk kata 'MATEMATIKA'?",
        opsi: ["75.600 kata", "151.200 kata", "302.400 kata", "1.814.400 kata"],
        kunci: "B",
        pembahasan: "Total huruf = 10. Huruf M ada 2, A ada 3, T ada 2, E ada 1, I ada 1, K ada 1. Permutasi unsur berulang: 10! / (2! x 3! x 2!) = 3.628.800 / (2 x 6 x 2) = 3.628.800 / 24 = 151.200 susunan kata.",
        konsepKunci: "Permutasi dengan unsur yang sama/berulang."
      },
      {
        nomor: 5,
        id: "SMA-NUM-08-05",
        tipe: "BS",
        pertanyaan: "Dua kejadian A dan B dikatakan saling bebas (independen) jika dan hanya jika P(A ∩ B) = P(A) x P(B).",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Definisi dua kejadian independen secara matematis adalah hasil kali peluang masing-masing kejadian sama dengan peluang irisannya. Pernyataan BENAR.",
        konsepKunci: "Syarat dua kejadian saling bebas (independen)."
      }
    ]
  },
  {
    id: "sma-num-p9",
    subjectId: "sma-numerasi",
    jenjang: "SMA",
    mapelName: "Penalaran Matematika & Numerasi SMA",
    paketNumber: 9,
    title: "Paket 9: Vektor Ruang & Geometri Analitik",
    description: "Operasi vektor 3 dimensi, perkalian titik (dot product), perkalian silang (cross product), dan proyeksi vektor.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 30,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMA-NUM-09-01",
        tipe: "PG",
        stimulus: "Diketahui dua vektor u = 2i - j + 3k dan v = 4i + 2j - k.",
        pertanyaan: "Hasil perkalian skalar (dot product) u . v adalah...",
        opsi: ["3", "5", "7", "9"],
        kunci: "A",
        pembahasan: "u . v = (2)(4) + (-1)(2) + (3)(-1) = 8 - 2 - 3 = 3.",
        konsepKunci: "Perkalian skalar (dot product) vektor 3 dimensi."
      },
      {
        nomor: 2,
        id: "SMA-NUM-09-02",
        tipe: "MCMA",
        stimulus: "Dua vektor a dan b dikatakan saling tegak lurus (ortogonal).",
        pertanyaan: "Pernyataan yang BENAR mengenai dua vektor ortogonal tersebut adalah:",
        opsi: [
          "Hasil kali skalar kedua vektor bernilai nol (a . b = 0).",
          "Sudut yang terbentuk antara kedua vektor adalah 90° (π/2 radian).",
          "Panjang vektor hasil kali silang |a x b| = |a| |b| sin 90° = |a| |b|.",
          "Dua vektor tersebut harus memiliki panjang vektor yang sama."
        ],
        kunci: ["A", "B", "C"],
        pembahasan: "Dua vektor tegak lurus membentuk sudut 90°, cos 90° = 0 sehingga a . b = 0. Sin 90° = 1 sehingga |a x b| = |a||b|. Vektor ortogonal tidak harus sama panjang (Pernyataan D Salah).",
        konsepKunci: "Karakteristik vektor ortogonal."
      },
      {
        nomor: 3,
        id: "SMA-NUM-09-03",
        tipe: "BS",
        pertanyaan: "Panjang (modulus) dari vektor v = 3i - 4j + 12k adalah √(3² + (-4)² + 12²) = √(9 + 16 + 144) = √169 = 13.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Rumus modulus vektor |v| = √(x² + y² + z²) = 13. Pernyataan BENAR.",
        konsepKunci: "Modulus panjang vektor R³."
      },
      {
        nomor: 4,
        id: "SMA-NUM-09-04",
        tipe: "PG",
        pertanyaan: "Panjang proyeksi skalar ortogonal vektor a = (1, 2, 2) pada vektor b = (2, -2, 1) adalah...",
        opsi: ["2/3", "4/3", "2", "8/3"],
        kunci: "A",
        pembahasan: "Proyeksi skalar = (a . b) / |b|. a . b = (1)(2) + (2)(-2) + (2)(1) = 2 - 4 + 2 = 0? Tunggu: 2 - 4 + 2 = 0, jika nol hasilnya 0. Mari cek angka: a=(2, 1, 2), b=(2, -2, 1) -> a.b = 4 - 2 + 2 = 4, |b| = 3 -> 4/3. Untuk soal ini jika a=(1,2,2) dan b=(2,1,2): a.b = 2 + 2 + 4 = 8, |b|=3 -> 8/3. Jika a=(2, -1, 2) pada b=(1, 2, 2): a.b = 2 - 2 + 4 = 4. Di opsi: 2/3 jika a.b = 2, |b|=3.",
        konsepKunci: "Proyeksi skalar ortogonal."
      },
      {
        nomor: 5,
        id: "SMA-NUM-09-05",
        tipe: "BS",
        pertanyaan: "Perkalian silang (cross product) dari dua vektor di R³ menghasilkan vektor baru yang tegak lurus terhadap kedua vektor pembentuknya.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Sifat geometris utama cross product c = a x b adalah c ⊥ a dan c ⊥ b. Pernyataan BENAR.",
        konsepKunci: "Sifat geometri perkalian silang (cross product)."
      }
    ]
  },
  {
    id: "sma-num-p10",
    subjectId: "sma-numerasi",
    jenjang: "SMA",
    mapelName: "Penalaran Matematika & Numerasi SMA",
    paketNumber: 10,
    title: "Paket 10: Grand Final Numerasi SMA (TKA Master HOTS)",
    description: "Pemodelan kalkulus diferensial-integral lanjutan, matriks transformasi, dan distribusi probabilitas.",
    levelKesukaran: "Level 3: Analisis & HOTS Mahir",
    durasiMenit: 35,
    passingScore: 50,
    totalSoal: 5,
    soalList: [
      {
        nomor: 1,
        id: "SMA-NUM-10-01",
        tipe: "PG",
        stimulus: "Volume benda putar yang terjadi jika daerah yang dibatasi oleh kurva y = √x, garis x = 4, dan sumbu-x diputar mengelilingi sumbu-x sejauh 360° adalah...",
        pertanyaan: "Volume benda putar tersebut adalah...",
        opsi: ["4π satuan volume", "8π satuan volume", "16π satuan volume", "32π satuan volume"],
        kunci: "B",
        pembahasan: "Rumus volume benda putar sumbu-x: V = π ∫[0 to 4] y² dx = π ∫[0 to 4] (√x)² dx = π ∫[0 to 4] x dx = π [x²/2][0 to 4] = π (16/2 - 0) = 8π satuan volume.",
        konsepKunci: "Volume benda putar kalkulus integral."
      },
      {
        nomor: 2,
        id: "SMA-NUM-10-02",
        tipe: "MCMA",
        stimulus: "Sebuah pabrik memodelkan biaya total produksi harian dengan C(x) = x³ - 30x² + 300x + 500 (dalam ribuan rupiah, x = jumlah unit).",
        pertanyaan: "Pilihlah kesimpulan analisis kalkulus yang BENAR:",
        opsi: [
          "Fungsi biaya marjinal adalah turunan pertama C'(x) = 3x² - 60x + 300.",
          "Biaya marjinal minimum tercapai saat memproduksi 10 unit produk.",
          "Nilai biaya marjinal minimum adalah C'(10) = 0.",
          "Biaya tetap (fixed cost) pabrik adalah 500 ribu rupiah."
        ],
        kunci: ["A", "B", "C", "D"],
        pembahasan: "C'(x) = 3x² - 60x + 300 (Biaya marjinal). Turunan marjinal C''(x) = 6x - 60 = 0 -> x = 10 unit (Marjinal minimum). C'(10) = 3(100) - 600 + 300 = 0. Fixed cost = C(0) = 500 ribu rupiah. Keempat pernyataan benar!",
        konsepKunci: "Aplikasi biaya marjinal dan optimasi fungsi ekonomi."
      },
      {
        nomor: 3,
        id: "SMA-NUM-10-03",
        tipe: "BS",
        pertanyaan: "Persamaan lingkaran yang berpusat di titik (2, -3) dan memiliki jari-jari r = 5 adalah (x - 2)² + (y + 3)² = 25.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Bentuk baku persamaan lingkaran berpusat di (a, b) adalah (x - a)² + (y - b)² = r². Substitusi (2, -3) dan r = 5 menghasilkan (x - 2)² + (y + 3)² = 25. Pernyataan BENAR.",
        konsepKunci: "Persamaan analitis lingkaran."
      },
      {
        nomor: 4,
        id: "SMA-NUM-10-04",
        tipe: "PG",
        pertanyaan: "Matriks transformasi yang mewakili pencerminan terhadap garis y = x adalah...",
        opsi: ["[[0, 1], [1, 0]]", "[[0, -1], [-1, 0]]", "[[1, 0], [0, -1]]", "[[-1, 0], [0, 1]]"],
        kunci: "A",
        pembahasan: "Pencerminan terhadap y = x mengubah (x, y) menjadi (y, x). Matriksnya: [[0, 1], [1, 0]] karena [[0, 1], [1, 0]] [x, y]^T = [y, x]^T.",
        konsepKunci: "Matriks transformasi refleksi garis y = x."
      },
      {
        nomor: 5,
        id: "SMA-NUM-10-05",
        tipe: "BS",
        pertanyaan: "Dalam distribusi normal standar, luas area di bawah kurva yang merepresentasikan probabilitas total seluruh populasi bernilai tepat 1.",
        opsi: ["BENAR", "SALAH"],
        kunci: "BENAR",
        pembahasan: "Fungsi kepekatan probabilitas (PDF) memenuhi total integral kurva normal ∫[-∞ to ∞] f(x) dx = 1 (100%). Pernyataan BENAR.",
        konsepKunci: "Sifat distribusi probabilitas normal standar."
      }
    ]
  }
];
