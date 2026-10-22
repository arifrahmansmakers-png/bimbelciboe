import { Soal } from "./soal";

// Bank Soal Jenjang SMP/MTs (20 Soal per Paket)
// Mencakup PG, MCMA (Pilihan Ganda Kompleks), dan BS (Benar/Salah)

export const soalSMP_Matematika1: Soal[] = [
  { id: "SMP-M1-01", tipe: "PG", pertanyaan: "Hasil dari $(-12) \\times 8 + 72 : (-6) = \\dots$", opsi: ["-108", "-96", "-84", "-72"], kunci: "A" },
  { id: "SMP-M1-02", tipe: "PG", pertanyaan: "Bentuk sederhana dari operasi aljabar $3(2x - 5) - 2(x + 4)$ adalah...", opsi: ["$4x - 7$", "$4x - 23$", "$4x - 1$", "$5x - 23$"], kunci: "B" },
  { id: "SMP-M1-03", tipe: "BS", pertanyaan: "Pada segitiga siku-siku dengan panjang sisi tegak 6 cm dan 8 cm, panjang sisi miringnya adalah 10 cm.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M1-04", tipe: "MCMA", pertanyaan: "Kelompok bilangan berikut yang merupakan tripel Pythagoras adalah...", opsi: ["3, 4, 5", "5, 12, 13", "7, 24, 25", "6, 9, 12"], kunci: ["A", "B", "C"] },
  { id: "SMP-M1-05", tipe: "PG", pertanyaan: "Penyelesaian dari persamaan linier $3x + 7 = 22$ adalah...", opsi: ["$x = 3$", "$x = 5$", "$x = 7$", "$x = 9$"], kunci: "B" },
  { id: "SMP-M1-06", tipe: "PG", pertanyaan: "Diketahui fungsi $f(x) = 4x - 3$. Nilai dari $f(5)$ adalah...", opsi: ["15", "17", "20", "23"], kunci: "B" },
  { id: "SMP-M1-07", tipe: "BS", pertanyaan: "Gradien garis yang memiliki persamaan $y = 3x - 4$ adalah 3.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M1-08", tipe: "MCMA", pertanyaan: "Himpunan semesta dari $A = \\{2, 3, 5, 7\\}$ yang mungkin adalah...", opsi: ["Himpunan bilangan ganjil", "Himpunan bilangan prima", "Himpunan bilangan asli kurang dari 10", "Himpunan bilangan cacah"], kunci: ["B", "C", "D"] },
  { id: "SMP-M1-09", tipe: "PG", pertanyaan: "Sebuah tabung memiliki jari-jari alas 7 cm dan tinggi 10 cm. Volume tabung tersebut adalah... (gunakan $\\pi = \\frac{22}{7}$)", opsi: ["1.440 cm³", "1.540 cm³", "1.640 cm³", "1.740 cm³"], kunci: "B" },
  { id: "SMP-M1-10", tipe: "PG", pertanyaan: "Suku ke-10 dari barisan aritmetika 3, 7, 11, 15, ... adalah...", opsi: ["35", "37", "39", "41"], kunci: "C" },
  { id: "SMP-M1-11", tipe: "BS", pertanyaan: "Dua garis saling tegak lurus jika hasil kali kedua gradiennya sama dengan -1 ($m_1 \\times m_2 = -1$).", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M1-12", tipe: "MCMA", pertanyaan: "Pilihlah pertidaksamaan linear satu variabel dari daftar berikut:", opsi: ["$2x + 5 < 11$", "$x^2 + 3x \\ge 0$", "$3y - 7 > 8$", "$4a - 2 = 10$"], kunci: ["A", "C"] },
  { id: "SMP-M1-13", tipe: "PG", pertanyaan: "Nilai median dari data: 4, 5, 6, 7, 7, 8, 9, 10 adalah...", opsi: ["6,5", "7", "7,5", "8"], kunci: "B" },
  { id: "SMP-M1-14", tipe: "PG", pertanyaan: "Sebuah peta mempunyai skala 1 : 250.000. Jika jarak dua kota pada peta 6 cm, maka jarak sebenarnya adalah...", opsi: ["15 km", "25 km", "150 km", "250 km"], kunci: "A" },
  { id: "SMP-M1-15", tipe: "BS", pertanyaan: "Peluang munculnya mata dadu genap pada pelemparan satu buah dadu bersisi 6 adalah $\\frac{1}{2}$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M1-16", tipe: "MCMA", pertanyaan: "Bangun-bangun datar berikut yang pasti sebangun untuk setiap pasangan ukurannya adalah...", opsi: ["Dua buah persegi", "Dua buah lingkaran", "Dua buah segitiga sama sisi", "Dua buah persegi panjang"], kunci: ["A", "B", "C"] },
  { id: "SMP-M1-17", tipe: "PG", pertanyaan: "Hasil pemfaktoran dari $x^2 - 9$ adalah...", opsi: ["$(x - 3)(x - 3)$", "$(x + 3)(x - 3)$", "$(x + 3)(x + 3)$", "$(x - 9)(x + 1)$"], kunci: "B" },
  { id: "SMP-M1-18", tipe: "PG", pertanyaan: "Panjang busur lingkaran dengan sudut pusat $90^\\circ$ dan jari-jari 14 cm adalah...", opsi: ["11 cm", "22 cm", "44 cm", "88 cm"], kunci: "B" },
  { id: "SMP-M1-19", tipe: "BS", pertanyaan: "Himpunan kosong dinotasikan dengan lambang $\\emptyset$ atau $\\{\\}$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M1-20", tipe: "MCMA", pertanyaan: "Yang merupakan ukuran penyebaran data dalam statistika adalah...", opsi: ["Jangkauan (range)", "Kuartil", "Mean (rata-rata)", "Simpangan kuartil"], kunci: ["A", "B", "D"] }
];

export const soalSMP_Matematika2: Soal[] = [
  { id: "SMP-M2-01", tipe: "PG", pertanyaan: "Nilai dari $\\sqrt{75} - \\sqrt{12} + \\sqrt{27} = \\dots$", opsi: ["$4\\sqrt{3}$", "$5\\sqrt{3}$", "$6\\sqrt{3}$", "$7\\sqrt{3}$"], kunci: "C" },
  { id: "SMP-M2-02", tipe: "PG", pertanyaan: "Akar-akar penyelesaian dari persamaan kuadrat $x^2 - 5x + 6 = 0$ adalah...", opsi: ["$x = 1$ atau $x = 6$", "$x = 2$ atau $x = 3$", "$x = -2$ atau $x = -3$", "$x = -1$ atau $x = -6$"], kunci: "B" },
  { id: "SMP-M2-03", tipe: "BS", pertanyaan: "Grafik fungsi kuadrat $f(x) = ax^2 + bx + c$ terbuka ke atas jika nilai $a > 0$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M2-04", tipe: "MCMA", pertanyaan: "Berikut ini yang merupakan relasi dari himpunan A ke B yang memenuhi syarat sebagai FUNGSI adalah...", opsi: ["Setiap anggota A dipasangkan dengan tepat satu anggota B", "Ada anggota A yang memiliki dua kawan di B", "Tidak ada anggota A yang tidak memiliki pasangan", "Setiap anggota B harus memiliki pasangan di A"], kunci: ["A", "C"] },
  { id: "SMP-M2-05", tipe: "PG", pertanyaan: "Bayangan titik $A(3, 5)$ yang direfleksikan terhadap sumbu X adalah...", opsi: ["$A'(3, -5)$", "$A'(-3, 5)$", "$A'(-3, -5)$", "$A'(5, 3)$"], kunci: "A" },
  { id: "SMP-M2-06", tipe: "PG", pertanyaan: "Dalam sebuah kelas terdapat 30 siswa. 18 siswa suka matematika, 15 siswa suka IPA, dan 7 siswa suka keduanya. Banyak siswa yang tidak suka keduanya adalah...", opsi: ["2 orang", "4 orang", "5 orang", "7 orang"], kunci: "B" },
  { id: "SMP-M2-07", tipe: "BS", pertanyaan: "Bentuk baku dari bilangan 0,00045 adalah $4,5 \\times 10^{-4}$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M2-08", tipe: "MCMA", pertanyaan: "Sifat-sifat dari bangun ruang kerucut yang benar adalah...", opsi: ["Mempunyai 2 sisi", "Mempunyai 1 rusuk lengkung", "Mempunyai 1 titik puncak", "Mempunyai 8 titik sudut"], kunci: ["A", "B", "C"] },
  { id: "SMP-M2-09", tipe: "PG", pertanyaan: "Jika sistem persamaan $2x + y = 9$ dan $x - y = 3$, maka nilai $x$ adalah...", opsi: ["2", "3", "4", "5"], kunci: "C" },
  { id: "SMP-M2-10", tipe: "PG", pertanyaan: "Volume bola dengan jari-jari 21 cm adalah... (gunakan $\\pi = \\frac{22}{7}$)", opsi: ["38.808 cm³", "19.404 cm³", "9.702 cm³", "4.851 cm³"], kunci: "A" },
  { id: "SMP-M2-11", tipe: "BS", pertanyaan: "Nilai diskriminan $D = b^2 - 4ac$ bernilai 0 berarti persamaan kuadrat memiliki dua akar real yang sama (kembar).", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M2-12", tipe: "MCMA", pertanyaan: "Jenis transformasi geometri di bawah ini adalah...", opsi: ["Translasi (pergeseran)", "Refleksi (pencerminan)", "Rotasi (perputaran)", "Dilatasi (perkalian skala)"], kunci: ["A", "B", "C", "D"] },
  { id: "SMP-M2-13", tipe: "PG", pertanyaan: "Suku pertama dan beda dari barisan aritmetika dengan $U_3 = 11$ dan $U_7 = 23$ berturut-turut adalah...", opsi: ["$a = 5$ dan $b = 3$", "$a = 3$ dan $b = 4$", "$a = 2$ dan $b = 5$", "$a = 4$ dan $b = 3$"], kunci: "A" },
  { id: "SMP-M2-14", tipe: "PG", pertanyaan: "Sebuah foto diletakkan pada karton berukuran 40 cm × 50 cm. Di sebelah kiri, kanan, dan atas foto tersisa karton 4 cm. Jika foto dan karton sebangun, sisa karton bagian bawah adalah...", opsi: ["5 cm", "6 cm", "7 cm", "8 cm"], kunci: "B" },
  { id: "SMP-M2-15", tipe: "BS", pertanyaan: "Peluang suatu kejadian pasti terjadi bernilai 1.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M2-16", tipe: "MCMA", pertanyaan: "Manakah operasi aljabar yang benar?", opsi: ["$a^m \\times a^n = a^{m+n}$", "$\\frac{a^m}{a^n} = a^{m-n}$", "$(a^m)^n = a^{m \\times n}$", "$a^0 = 0$"], kunci: ["A", "B", "C"] },
  { id: "SMP-M2-17", tipe: "PG", pertanyaan: "Luas permukaan kubus yang volumenya 125 cm³ adalah...", opsi: ["100 cm²", "125 cm²", "150 cm²", "175 cm²"], kunci: "C" },
  { id: "SMP-M2-18", tipe: "PG", pertanyaan: "Gradien garis yang melalui titik $(2, -3)$ dan $(5, 6)$ adalah...", opsi: ["2", "3", "4", "5"], kunci: "B" },
  { id: "SMP-M2-19", tipe: "BS", pertanyaan: "Sudut keliling yang menghadap diameter lingkaran selalu berupa sudut siku-siku ($90^\\circ$).", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M2-20", tipe: "MCMA", pertanyaan: "Manakah yang merupakan barisan geometri?", opsi: ["2, 4, 8, 16, ...", "3, 9, 27, 81, ...", "5, 10, 15, 20, ...", "1, $\\frac{1}{2}$, $\\frac{1}{4}$, $\\frac{1}{8}$, ..."], kunci: ["A", "B", "D"] }
];

export const soalSMP_Matematika3: Soal[] = [
  { id: "SMP-M3-01", tipe: "PG", pertanyaan: "Bentuk sederhana dari $\\frac{6}{\\sqrt{3}}$ adalah...", opsi: ["$2\\sqrt{3}$", "$3\\sqrt{3}$", "$4\\sqrt{3}$", "$6\\sqrt{3}$"], kunci: "A" },
  { id: "SMP-M3-02", tipe: "PG", pertanyaan: "Persamaan garis yang melalui titik $(0, 4)$ dan bergradien $-2$ adalah...", opsi: ["$y = -2x - 4$", "$y = -2x + 4$", "$y = 2x + 4$", "$2y = -x + 4$"], kunci: "B" },
  { id: "SMP-M3-03", tipe: "BS", pertanyaan: "Titik puncak fungsi kuadrat $f(x) = x^2 - 4x + 3$ berada di koordinat $(2, -1)$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M3-04", tipe: "MCMA", pertanyaan: "Ciri-ciri segitiga yang kongruen menurut kriteria geometri adalah...", opsi: ["Sisi - Sisi - Sisi (s - s - s)", "Sisi - Sudut - Sisi (s - sd - s)", "Sudut - Sisi - Sudut (sd - s - sd)", "Sudut - Sudut - Sudut (sd - sd - sd)"], kunci: ["A", "B", "C"] },
  { id: "SMP-M3-05", tipe: "PG", pertanyaan: "Sebuah tiang bendera tingginya 12 m menghasilkan bayangan 9 m. Pada saat yang sama pohon menghasilkan bayangan 15 m. Tinggi pohon tersebut adalah...", opsi: ["18 m", "20 m", "22 m", "24 m"], kunci: "B" },
  { id: "SMP-M3-06", tipe: "PG", pertanyaan: "Titik $P(-2, 4)$ ditranslasikan oleh $T = \\begin{pmatrix} 3 \\\\ -5 \\end{pmatrix}$. Koordinat bayangannya adalah...", opsi: ["$(1, -1)$", "$(-5, 9)$", "$(1, 9)$", "$(-5, -1)$"], kunci: "A" },
  { id: "SMP-M3-07", tipe: "BS", pertanyaan: "Peluang majemuk dua kejadian saling lepas adalah $P(A \\cup B) = P(A) + P(B)$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M3-08", tipe: "MCMA", pertanyaan: "Bilangan-bilangan berikut yang merupakan bilangan irasional adalah...", opsi: ["$\\sqrt{2}$", "$\\pi$", "$\\sqrt{4}$", "$\\sqrt{5}$"], kunci: ["A", "B", "D"] },
  { id: "SMP-M3-09", tipe: "PG", pertanyaan: "Nilai $x$ yang memenuhi $2(3x - 1) = 4(x + 3)$ adalah...", opsi: ["5", "6", "7", "8"], kunci: "C" },
  { id: "SMP-M3-10", tipe: "PG", pertanyaan: "Luas juring lingkaran dengan sudut $60^\\circ$ dan jari-jari 21 cm adalah...", opsi: ["231 cm²", "462 cm²", "693 cm²", "924 cm²"], kunci: "A" },
  { id: "SMP-M3-11", tipe: "BS", pertanyaan: "Persamaan linier dua variabel dapat diselesaikan dengan metode eliminasi, substitusi, atau gabungan keduanya.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M3-12", tipe: "MCMA", pertanyaan: "Pernyataan yang tepat tentang jangkauan interkuartil (Qd) adalah...", opsi: ["Dihitung dari selisih $Q_3 - Q_1$", "Menggambarkan 50% data di tengah", "Dihitung dari selisih data maksimum dan data minimum", "Nilai setengah dari rentang antarkuartil"], kunci: ["A", "B"] },
  { id: "SMP-M3-13", tipe: "PG", pertanyaan: "Rumus suku ke-$n$ dari barisan 2, 5, 8, 11, ... adalah...", opsi: ["$U_n = 3n - 1$", "$U_n = 3n + 1$", "$U_n = 2n + 1$", "$U_n = 4n - 2$"], kunci: "A" },
  { id: "SMP-M3-14", tipe: "PG", pertanyaan: "Sebuah kerucut memiliki diameter alas 14 cm dan garis pelukis 25 cm. Tinggi kerucut tersebut adalah...", opsi: ["20 cm", "22 cm", "24 cm", "26 cm"], kunci: "C" },
  { id: "SMP-M3-15", tipe: "BS", pertanyaan: "Rotasi sebesar $180^\\circ$ searah jarum jam menghasilkan bayangan yang sama dengan rotasi $180^\\circ$ berlawanan arah jarum jam.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M3-16", tipe: "MCMA", pertanyaan: "Dua bangun datar dikatakan sebangun jika...", opsi: ["Sudut-sudut yang bersesuaian sama besar", "Sisi-sisi yang bersesuaian memiliki perbandingan yang senilai", "Luas kedua bangun harus selalu sama persis", "Bentuk kedua bangun sama"], kunci: ["A", "B", "D"] },
  { id: "SMP-M3-17", tipe: "PG", pertanyaan: "Hasil dari $2^{-3} = \\dots$", opsi: ["-6", "-8", "$\\frac{1}{6}$", "$\\frac{1}{8}$"], kunci: "D" },
  { id: "SMP-M3-18", tipe: "PG", pertanyaan: "Berapa banyak ruang sampel pada pelemparan 3 keping uang logam bersamaan?", opsi: ["3", "6", "8", "9"], kunci: "C" },
  { id: "SMP-M3-19", tipe: "BS", pertanyaan: "Garis singgung lingkaran selalu tegak lurus terhadap jari-jari yang ditarik ke titik singgung tersebut.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-M3-20", tipe: "MCMA", pertanyaan: "Fungsi kuadrat $f(x) = -x^2 + 6x - 5$ memiliki ciri-ciri...", opsi: ["Kurva parabola terbuka ke bawah", "Sumbu simetri di $x = 3$", "Memotong sumbu Y di titik $(0, -5)$", "Memiliki nilai minimum"], kunci: ["A", "B", "C"] }
];

export const soalSMP_BahasaIndonesia1: Soal[] = [
  { id: "SMP-B1-01", tipe: "PG", pertanyaan: "Teks yang bertujuan untuk memaparkan objek secara terperinci sehingga pembaca seolah-olah melihat dan merasakan langsung disebut teks...", opsi: ["Laporan", "Deskripsi", "Eksplanasi", "Persuasi"], kunci: "B" },
  { id: "SMP-B1-02", tipe: "PG", pertanyaan: "Unsur 5W+1H dalam teks berita yang menjawab pertanyaan mengenai latar waktu terjadinya peristiwa adalah...", opsi: ["Who", "Where", "When", "Why"], kunci: "C" },
  { id: "SMP-B1-03", tipe: "BS", pertanyaan: "Teks eksposisi bertujuan untuk meyakinkan pembaca dengan menyajikan argumen-argumen logis yang disertai fakta.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B1-04", tipe: "MCMA", pertanyaan: "Struktur teks tanggapan kritis meliputi bagian...", opsi: ["Konteks", "Deskripsi pengamatan", "Penilaian", "Orientasi komplikasi"], kunci: ["A", "B", "C"] },
  { id: "SMP-B1-05", tipe: "PG", pertanyaan: "Konjungsi kausalitas yang tepat untuk menghubungkan sebab dan akibat adalah...", opsi: ["Kemudian", "Sebab / Karena", "Meskipun", "Atau"], kunci: "B" },
  { id: "SMP-B1-06", tipe: "PG", pertanyaan: "Sudut pandang pengarang yang menggunakan kata ganti 'ia', 'dia', atau nama orang tergolong sudut pandang...", opsi: ["Orang pertama pelaku utama", "Orang pertama pelaku sampingan", "Orang ketiga serbatahu", "Orang kedua"], kunci: "C" },
  { id: "SMP-B1-07", tipe: "BS", pertanyaan: "Kalimat pasif ditandai dengan predikat yang berawalan di- atau ter-.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B1-08", tipe: "MCMA", pertanyaan: "Ciri-ciri teks persuasi yang tepat adalah...", opsi: ["Mengandung bujukan atau ajakan", "Menggunakan kata imperatif seperti 'ayo', 'mari', 'hendaklah'", "Menyajikan fakta untuk memperkuat dorongan", "Berisi alur fiktif dengan tokoh imajiner"], kunci: ["A", "B", "C"] },
  { id: "SMP-B1-09", tipe: "PG", pertanyaan: "Sinonim dari kata 'signifikan' dalam konteks penelitian adalah...", opsi: ["Remeh", "Berarti / penting", "Sulit", "Tertutup"], kunci: "B" },
  { id: "SMP-B1-10", tipe: "PG", pertanyaan: "Bagian struktur teks fabel yang berisi penyelesaian masalah antar tokoh disebut...", opsi: ["Orientasi", "Komplikasi", "Resolusi", "Koda"], kunci: "C" },
  { id: "SMP-B1-11", tipe: "BS", pertanyaan: "Gaya bahasa hiperbola adalah majas yang melebih-lebihkan suatu hal secara dramatis.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B1-12", tipe: "MCMA", pertanyaan: "Manakah kalimat yang menggunakan majas hiperbola?", opsi: ["Suaranya menggelegar membelah angkasa.", "Darahnya membeku mendengar kabar duka itu.", "Pena itu menari-nari di atas kertas putih.", "Air matanya menganak sungai."], kunci: ["A", "B", "D"] },
  { id: "SMP-B1-13", tipe: "PG", pertanyaan: "Kata baku yang tepat di bawah ini adalah...", opsi: ["Objektif", "Obyektif", "Obyek", "Obyektivitas"], kunci: "A" },
  { id: "SMP-B1-14", tipe: "PG", pertanyaan: "Langkah pertama dalam menyusun ringkasan dari sebuah teks bacaan adalah...", opsi: ["Menulis draf akhir", "Membaca teks asli secara menyeluruh", "Menghafal kalimat penjelas", "Mengubah sudut pandang"], kunci: "B" },
  { id: "SMP-B1-15", tipe: "BS", pertanyaan: "Teks ulasan buku (resensi) berisi penilaian kelebihan dan kekurangan dari suatu karya tulis.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B1-16", tipe: "MCMA", pertanyaan: "Unsur ekstrinsik dalam sebuah karya sastra meliputi...", opsi: ["Latar belakang pengarang", "Kondisi sosial budaya masyarakat saat karya dibuat", "Nilai moral dan agama pengarang", "Alur cerita (plot)"], kunci: ["A", "B", "C"] },
  { id: "SMP-B1-17", tipe: "PG", pertanyaan: "Konjungsi yang menyatakan pertentangan antara dua klausa adalah...", opsi: ["Dan", "Tetapi", "Serta", "Lalu"], kunci: "B" },
  { id: "SMP-B1-18", tipe: "PG", pertanyaan: "Penulisan daftar pustaka yang sesuai dengan kaidah EYD adalah...", opsi: ["Nama penulis, tahun terbit, judul buku, kota terbit, penerbit.", "Tahun terbit, judul buku, nama penulis.", "Kota terbit, penerbit, judul buku, tahun.", "Nama penerbit, judul, penulis."], kunci: "A" },
  { id: "SMP-B1-19", tipe: "BS", pertanyaan: "Puisi rakyat seperti gurindam memiliki 2 baris dalam satu bait dan bersajak a-a.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B1-20", tipe: "MCMA", pertanyaan: "Berikut yang merupakan kaidah kebahasaan dalam teks berita adalah...", opsi: ["Menggunakan bahasa baku", "Menggunakan verba transitif dan pewarta", "Menggunakan keterangan waktu dan tempat", "Menggunakan bahasa kiasan berlebihan"], kunci: ["A", "B", "C"] }
];

export const soalSMP_BahasaIndonesia2: Soal[] = [
  { id: "SMP-B2-01", tipe: "PG", pertanyaan: "Teks yang menjelaskan urutan kejadian fenomena alam berdasarkan sebab dan akibat disebut teks...", opsi: ["Eksplanasi", "Deskripsi", "Prosedur", "Narasi"], kunci: "A" },
  { id: "SMP-B2-02", tipe: "PG", pertanyaan: "Bagian dari struktur teks pidato yang memuat salam dan ucapan syukur adalah...", opsi: ["Pendahuluan", "Isi pidato", "Penutup", "Simpulan"], kunci: "A" },
  { id: "SMP-B2-03", tipe: "BS", pertanyaan: "Fakta adalah hal, keadaan, atau peristiwa yang merupakan kenyataan dan benar-benar terjadi.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B2-04", tipe: "MCMA", pertanyaan: "Ciri-ciri teks prosedur yang tepat adalah...", opsi: ["Terdapat tujuan dan langkah-langkah kerja yang berurutan", "Menggunakan kalimat perintah (imperatif)", "Menggunakan kata keterangan cara dan ukuran", "Berisi opini subjektif tanpa tahapan"], kunci: ["A", "B", "C"] },
  { id: "SMP-B2-05", tipe: "PG", pertanyaan: "Kata hubung kronologis yang menandai urutan waktu contohnya adalah...", opsi: ["Meskipun", "Setelah itu / Kemudian", "Karena", "Supaya"], kunci: "B" },
  { id: "SMP-B2-06", tipe: "PG", pertanyaan: "Kalimat yang menggunakan kata serapan asing secara benar adalah...", opsi: ["Proses fotosintesis memerlukan cahaya matahari.", "Proses photosintetis memerlukan cahaya matahari.", "Proses fotosintesa membutuhkan cahaya.", "Proses fotosintesisan membutuhkan sinar."], kunci: "A" },
  { id: "SMP-B2-07", tipe: "BS", pertanyaan: "Opini adalah pandangan, anggapan, atau perkiraan seseorang terhadap suatu persoalan yang belum tentu terbukti kebenarannya.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B2-08", tipe: "MCMA", pertanyaan: "Unsur fisik dalam puisi modern terdiri dari...", opsi: ["Diksi (pilihan kata)", "Imaji (citraan)", "Tipografi (tata wajah puisi)", "Tema dan amanat"], kunci: ["A", "B", "C"] },
  { id: "SMP-B2-09", tipe: "PG", pertanyaan: "Penulisan gabungan kata yang benar terdapat pada...", opsi: ["Tanggungjawab", "Tanggung jawab", "Bertanggung jawabkan", "Pertanggung-jawaban"], kunci: "B" },
  { id: "SMP-B2-10", tipe: "PG", pertanyaan: "Kalimat yang mengandung kritikan yang santun adalah...", opsi: ["Karyamu sangat jelek dan tidak berguna.", "Sebaiknya tata warna pada lukisan ini diperhalus agar lebih harmonis.", "Lukisan ini membuang-buang waktu penonton.", "Jangan melukis lagi jika hasilnya seperti ini."], kunci: "B" },
  { id: "SMP-B2-11", tipe: "BS", pertanyaan: "Karya sastra drama memiliki ciri khas utama ditulis dalam bentuk dialog antartokoh disertai petunjuk pementasan.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B2-12", tipe: "MCMA", pertanyaan: "Istilah dalam seni peran teater/drama meliputi...", opsi: ["Prolog", "Epilog", "Monolog", "Dialog"], kunci: ["A", "B", "C", "D"] },
  { id: "SMP-B2-13", tipe: "PG", pertanyaan: "Konjungsi 'agar' dan 'supaya' berfungsi menyatakan hubungan...", opsi: ["Waktu", "Tujuan", "Syarat", "Sebab"], kunci: "B" },
  { id: "SMP-B2-14", tipe: "PG", pertanyaan: "Teks laporan percobaan diawali dengan bagian...", opsi: ["Judul dan tujuan percobaan", "Daftar pustaka", "Hasil analisis", "Ucapan terima kasih"], kunci: "A" },
  { id: "SMP-B2-15", tipe: "BS", pertanyaan: "Slogan adalah perkataan atau kalimat pendek yang menarik dan mudah diingat untuk memberitahukan atau mengiklankan sesuatu.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B2-16", tipe: "MCMA", pertanyaan: "Berikut yang merupakan kalimat fakta adalah...", opsi: ["Air mendidih pada suhu 100 derajat Celcius pada tekanan 1 atm.", "Ibu kota negara Indonesia adalah Jakarta (saat ini).", "Film horor itu pasti sangat menakutkan bagi semua orang.", "Gunung Merapi terletak di wilayah Jawa Tengah dan Yogyakarta."], kunci: ["A", "B", "D"] },
  { id: "SMP-B2-17", tipe: "PG", pertanyaan: "Antonim dari kata 'progresif' adalah...", opsi: ["Aktif", "Regresif / Mundur", "Dinamis", "Kreatif"], kunci: "B" },
  { id: "SMP-B2-18", tipe: "PG", pertanyaan: "Penggunaan huruf miring dalam kalimat bahasa Indonesia digunakan untuk...", opsi: ["Menuliskan nama orang", "Menuliskan judul buku, nama majalah, atau istilah asing", "Menuliskan nama kota", "Menuliskan hari besar nasional"], kunci: "B" },
  { id: "SMP-B2-19", tipe: "BS", pertanyaan: "Konjungsi 'meskipun' dan 'walaupun' menyatakan hubungan konsesif (perlawanan bersyarat).", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B2-20", tipe: "MCMA", pertanyaan: "Ciri-ciri teks cerpen yang membedakannya dengan novel adalah...", opsi: ["Jumlah kata biasanya kurang dari 10.000 kata", "Fokus cerita pada satu konflik utama", "Alur cerita lebih padat dan singkat", "Memiliki banyak sub-alur cerita berbelit-belit"], kunci: ["A", "B", "C"] }
];

export const soalSMP_BahasaIndonesia3: Soal[] = [
  { id: "SMP-B3-01", tipe: "PG", pertanyaan: "Paragraf yang bertujuan membuktikan suatu kebenaran sehingga pembaca meyakini kebenaran tersebut dinamakan...", opsi: ["Deskripsi", "Argumentasi", "Narasi", "Prosedur"], kunci: "B" },
  { id: "SMP-B3-02", tipe: "PG", pertanyaan: "Kalimat yang menggunakan konjungsi temporal adalah...", opsi: ["Ayah bekerja keras membanting tulang.", "Setelah ujian selesai, para siswa membersihkan ruang kelas.", "Rumah itu sangat megah tetapi sepi.", "Kita harus belajar tekun."], kunci: "B" },
  { id: "SMP-B3-03", tipe: "BS", pertanyaan: "Resensi buku mencakup data identitas buku seperti judul, penulis, penerbit, tebal halaman, dan tahun terbit.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B3-04", tipe: "MCMA", pertanyaan: "Ciri-ciri kalimat sanggahan yang santun dalam diskusi adalah...", opsi: ["Mengemukakan alasan logis", "Tidak menyerang pribadi pembicara", "Menggunakan bahasa yang merendahkan lawan bicara", "Diawali dengan permohonan maaf atau pengantar sopan"], kunci: ["A", "B", "D"] },
  { id: "SMP-B3-05", tipe: "PG", pertanyaan: "Makna peribahasa 'Tong kosong nyaring bunyinya' adalah...", opsi: ["Orang yang banyak bicara biasanya sedikit ilmunya", "Alat musik yang sangat merdu", "Orang miskin yang dermawan", "Barang yang hampa udara"], kunci: "A" },
  { id: "SMP-B3-06", tipe: "PG", pertanyaan: "Kata serapan yang penulisannya sesuai standar KBBI adalah...", opsi: ["Frekuensi", "Frekwensi", "Frekwensi-an", "Prequensi"], kunci: "A" },
  { id: "SMP-B3-07", tipe: "BS", pertanyaan: "Kalimat langsung dalam bahasa Indonesia selalu ditandai dengan sepasang tanda petik dua (\"...\").", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B3-08", tipe: "MCMA", pertanyaan: "Hal-hal yang perlu dicantumkan dalam notula rapat adalah...", opsi: ["Hari, tanggal, dan waktu pelaksanaan rapat", "Daftar hadir peserta rapat", "Menu konsumsi yang disajikan", "Keputusan dan hasil kesepakatan rapat"], kunci: ["A", "B", "D"] },
  { id: "SMP-B3-09", tipe: "PG", pertanyaan: "Majas yang membandingkan dua hal berbeda secara langsung tanpa kata pembanding dinamakan majas...", opsi: ["Metafora", "Personifikasi", "Simile", "Hiperbola"], kunci: "A" },
  { id: "SMP-B3-10", tipe: "PG", pertanyaan: "Contoh kalimat bermajas metafora adalah...", opsi: ["Dewi malam menyinari bumi.", "Raja siang membakar kulit.", "Bocah itu menjadi anak emas kesayangan ibunya.", "Semua jawaban benar."], kunci: "D" },
  { id: "SMP-B3-11", tipe: "BS", pertanyaan: "Teks inspiratif bertujuan menggugah empati, simpati, dan semangat pantang menyerah bagi pembacanya.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B3-12", tipe: "MCMA", pertanyaan: "Struktur teks cerita inspiratif meliputi...", opsi: ["Orientasi", "Perumitan peristiwa", "Komplikasi", "Resolusi", "Koda"], kunci: ["A", "B", "C", "D", "E"] },
  { id: "SMP-B3-13", tipe: "PG", pertanyaan: "Kata turunan yang mengalami proses reduplikasi semu adalah...", opsi: ["Kupu-kupu", "Berjalan-jalan", "Tarik-menarik", "Rumah-rumah"], kunci: "A" },
  { id: "SMP-B3-14", tipe: "PG", pertanyaan: "Tanda baca titik dua (:) tidak digunakan jika rangkaian rincian tersebut...", opsi: ["Merupakan pelengkap yang mengakhiri kalimat utuh tanpa pengantar", "Didahului kalimat lengkap", "Dipakai dalam teks drama", "Dipakai pada naskah resmi"], kunci: "A" },
  { id: "SMP-B3-15", tipe: "BS", pertanyaan: "Sinonim dari kata 'dampak' adalah akibat atau konsekuensi.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B3-16", tipe: "MCMA", pertanyaan: "Berikut yang merupakan jenis karya sastra prosa adalah...", opsi: ["Novel", "Cerita pendek", "Dongeng", "Syair pantun"], kunci: ["A", "B", "C"] },
  { id: "SMP-B3-17", tipe: "PG", pertanyaan: "Kalimat yang menggunakan kata emotif positif adalah...", opsi: ["Pemandangan di puncak gunung itu sangat menakjubkan dan menyejukkan hati.", "Suasana malam itu mencekam dan menakutkan.", "Bau menyengat tercium di gang itu.", "Jalanan sangat becek dan kotor."], kunci: "A" },
  { id: "SMP-B3-18", tipe: "PG", pertanyaan: "Penulisan gelar akademik yang benar menurut kaidah EYD adalah...", opsi: ["Dr. Ir. Budi Santoso, M.Pd.", "Dr, Ir, Budi Santoso M.Pd", "Dr. Ir. Budi Santoso MPd.", "Dr Ir Budi Santoso, M.Pd"], kunci: "A" },
  { id: "SMP-B3-19", tipe: "BS", pertanyaan: "Kata depan 'di' dan 'ke' ditulis terpisah dari kata yang mengikutinya jika menyatakan tempat.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMP-B3-20", tipe: "MCMA", pertanyaan: "Contoh penulisan kata depan yang tepat adalah...", opsi: ["Di sekolah", "Ke pasar", "Di rumah", "Dimakan"], kunci: ["A", "B", "C"] }
];
