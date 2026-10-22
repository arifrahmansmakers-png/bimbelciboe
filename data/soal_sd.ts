import { Soal } from "./soal";

// Bank Soal Jenjang SD/MI (20 Soal per Paket)
// Mencakup PG, MCMA (Pilihan Ganda Kompleks), dan BS (Benar/Salah)

export const soalSD_Matematika1: Soal[] = [
  { id: "SD-M1-01", tipe: "PG", pertanyaan: "Hasil dari $1.250 + 750 - 450 = \\dots$", opsi: ["1.450", "1.550", "1.650", "1.750"], kunci: "B" },
  { id: "SD-M1-02", tipe: "PG", pertanyaan: "Bentuk pecahan paling sederhana dari $\\frac{18}{24}$ adalah...", opsi: ["$\\frac{2}{3}$", "$\\frac{3}{4}$", "$\\frac{4}{5}$", "$\\frac{3}{5}$"], kunci: "B" },
  { id: "SD-M1-03", tipe: "BS", pertanyaan: "Bilangan 37 merupakan salah satu bilangan prima.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M1-04", tipe: "MCMA", pertanyaan: "Manakah bilangan di bawah ini yang merupakan kelipatan persekutuan dari 3 dan 4?", opsi: ["12", "18", "24", "30", "36"], kunci: ["A", "C", "E"] },
  { id: "SD-M1-05", tipe: "PG", pertanyaan: "Sebuah persegi memiliki panjang sisi 14 cm. Keliling persegi tersebut adalah...", opsi: ["28 cm", "42 cm", "56 cm", "196 cm"], kunci: "C" },
  { id: "SD-M1-06", tipe: "PG", pertanyaan: "Pak Budi memanen 12 keranjang jeruk. Setiap keranjang berisi 45 buah jeruk. Total jeruk yang dipanen adalah...", opsi: ["520 buah", "540 buah", "560 buah", "580 buah"], kunci: "B" },
  { id: "SD-M1-07", tipe: "BS", pertanyaan: "Sudut tumpul adalah sudut yang besarnya kurang dari $90^\\circ$.", opsi: ["BENAR", "SALAH"], kunci: "SALAH" },
  { id: "SD-M1-08", tipe: "MCMA", pertanyaan: "Pernyataan yang BENAR mengenai bangun datar jajar genjang adalah...", opsi: ["Memiliki 4 sisi", "Sisi yang berhadapan sejajar dan sama panjang", "Semua sudutnya siku-siku", "Memiliki 2 pasang sudut yang sama besar"], kunci: ["A", "B", "D"] },
  { id: "SD-M1-09", tipe: "PG", pertanyaan: "KPK dari 12 dan 18 adalah...", opsi: ["24", "36", "48", "72"], kunci: "B" },
  { id: "SD-M1-10", tipe: "PG", pertanyaan: "Ibu membeli $2\\frac{1}{2}$ kg beras, lalu membeli lagi $1\\frac{1}{4}$ kg. Total beras yang dibeli ibu adalah...", opsi: ["$3\\frac{1}{4}$ kg", "$3\\frac{3}{4}$ kg", "$4\\frac{1}{4}$ kg", "$4\\frac{3}{4}$ kg"], kunci: "B" },
  { id: "SD-M1-11", tipe: "BS", pertanyaan: "Luas segitiga dengan alas 10 cm dan tinggi 8 cm adalah $40\\text{ cm}^2$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M1-12", tipe: "MCMA", pertanyaan: "Pilihlah bilangan-bilangan yang bernilai lebih besar dari 0,6:", opsi: ["0,45", "0,75", "0,65", "0,58", "0,9"], kunci: ["B", "C", "E"] },
  { id: "SD-M1-13", tipe: "PG", pertanyaan: "FPB dari bilangan 24 dan 36 adalah...", opsi: ["6", "8", "12", "18"], kunci: "C" },
  { id: "SD-M1-14", tipe: "PG", pertanyaan: "Volume kubus yang memiliki panjang rusuk 8 cm adalah...", opsi: ["64 cm³", "384 cm³", "512 cm³", "1.024 cm³"], kunci: "C" },
  { id: "SD-M1-15", tipe: "BS", pertanyaan: "Jumlah besar ketiga sudut pada sebuah segitiga selalu sama dengan $180^\\circ$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M1-16", tipe: "MCMA", pertanyaan: "Satuan-satuan berikut yang merupakan satuan baku untuk mengukur volume/isi adalah...", opsi: ["Liter", "Kilogram", "Meter kubik (m³)", "Mililiter (ml)", "Meter persegi (m²)"], kunci: ["A", "C", "D"] },
  { id: "SD-M1-17", tipe: "PG", pertanyaan: "Hasil dari $25 \\times 16 = \\dots$", opsi: ["350", "400", "450", "500"], kunci: "B" },
  { id: "SD-M1-18", tipe: "PG", pertanyaan: "Sebuah bus berangkat pukul 07.15 dan tiba di tujuan pukul 09.45. Lama perjalanan bus tersebut adalah...", opsi: ["1 jam 30 menit", "2 jam 15 menit", "2 jam 30 menit", "2 jam 45 menit"], kunci: "C" },
  { id: "SD-M1-19", tipe: "BS", pertanyaan: "Pecahan $\\frac{3}{5}$ senilai dengan 60%.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M1-20", tipe: "MCMA", pertanyaan: "Manakah bangun datar berikut yang memiliki simetri putar tingkat dua atau lebih?", opsi: ["Persegi", "Persegi panjang", "Segitiga sembarang", "Belah ketupat"], kunci: ["A", "B", "D"] }
];

export const soalSD_Matematika2: Soal[] = [
  { id: "SD-M2-01", tipe: "PG", pertanyaan: "Hasil dari $3.600 : 40 + 120 = \\dots$", opsi: ["180", "200", "210", "240"], kunci: "C" },
  { id: "SD-M2-02", tipe: "PG", pertanyaan: "Sebuah kolam berbentuk persegi panjang dengan panjang 12 m dan lebar 7 m. Luas kolam adalah...", opsi: ["38 m²", "72 m²", "84 m²", "96 m²"], kunci: "C" },
  { id: "SD-M2-03", tipe: "BS", pertanyaan: "Bilangan genap terkecil yang lebih dari 0 adalah 2.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M2-04", tipe: "MCMA", pertanyaan: "Manakah operasi hitung di bawah ini yang menghasilkan nilai 100?", opsi: ["25 × 4", "150 - 50", "400 : 4", "60 + 30"], kunci: ["A", "B", "C"] },
  { id: "SD-M2-05", tipe: "PG", pertanyaan: "Jarak kota A ke kota B pada peta berskala 1 : 100.000 adalah 4 cm. Jarak sebenarnya adalah...", opsi: ["0,4 km", "4 km", "40 km", "400 km"], kunci: "B" },
  { id: "SD-M2-06", tipe: "PG", pertanyaan: "Nilai rata-rata dari data: 7, 8, 6, 9, 10 adalah...", opsi: ["7", "7,5", "8", "8,5"], kunci: "C" },
  { id: "SD-M2-07", tipe: "BS", pertanyaan: "Segitiga sama sisi memiliki 3 sisi yang sama panjang dan 3 sudut yang sama besar yaitu masing-masing 60 derajat.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M2-08", tipe: "MCMA", pertanyaan: "Ciri-ciri bangun ruang balok yang tepat adalah...", opsi: ["Memiliki 6 sisi", "Memiliki 8 titik sudut", "Memiliki 12 rusuk", "Semua sisinya selalu berbentuk lingkaran"], kunci: ["A", "B", "C"] },
  { id: "SD-M2-09", tipe: "PG", pertanyaan: "Hasil operasi hitung $(-15) + 28 = \\dots$", opsi: ["-13", "13", "43", "-43"], kunci: "B" },
  { id: "SD-M2-10", tipe: "PG", pertanyaan: "Keliling lingkaran yang memiliki diameter 28 cm adalah... (gunakan $\\pi = \\frac{22}{7}$)", opsi: ["44 cm", "88 cm", "176 cm", "616 cm"], kunci: "B" },
  { id: "SD-M2-11", tipe: "BS", pertanyaan: "Bilangan desimal 0,25 setara dengan pecahan seperempat $\\frac{1}{4}$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M2-12", tipe: "MCMA", pertanyaan: "Pilihlah bentuk pecahan yang nilainya sama dengan $\\frac{1}{2}$:", opsi: ["$\\frac{2}{4}$", "$\\frac{5}{10}$", "$\\frac{3}{8}$", "$\\frac{50}{100}$"], kunci: ["A", "B", "D"] },
  { id: "SD-M2-13", tipe: "PG", pertanyaan: "Sebuah wadah berisi 3,5 liter air. Dituangkan ke dalam gelas sebanyak 750 ml. Sisa air dalam wadah adalah...", opsi: ["2.250 ml", "2.750 ml", "3.000 ml", "3.250 ml"], kunci: "B" },
  { id: "SD-M2-14", tipe: "PG", pertanyaan: "FPB dari 30 dan 45 adalah...", opsi: ["5", "10", "15", "25"], kunci: "C" },
  { id: "SD-M2-15", tipe: "BS", pertanyaan: "1 jam sama dengan 3.600 detik.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M2-16", tipe: "MCMA", pertanyaan: "Yang termasuk jenis segitiga berdasarkan panjang sisinya adalah...", opsi: ["Segitiga sama sisi", "Segitiga sama kaki", "Segitiga sembarang", "Segitiga tumpul"], kunci: ["A", "B", "C"] },
  { id: "SD-M2-17", tipe: "PG", pertanyaan: "Hasil dari $15^2 = \\dots$", opsi: ["125", "225", "250", "300"], kunci: "B" },
  { id: "SD-M2-18", tipe: "PG", pertanyaan: "Toko menjual 5 lusin buku tulis. Berapa buah buku yang dijual toko tersebut?", opsi: ["50 buah", "60 buah", "70 buah", "120 buah"], kunci: "B" },
  { id: "SD-M2-19", tipe: "BS", pertanyaan: "Nilai dari $\\sqrt{144}$ adalah 12.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M2-20", tipe: "MCMA", pertanyaan: "Pernyataan yang BENAR mengenai prisma segitiga adalah...", opsi: ["Mempunyai alas dan tutup berbentuk segitiga", "Memiliki 5 sisi", "Memiliki 9 rusuk", "Memiliki 12 titik sudut"], kunci: ["A", "B", "C"] }
];

export const soalSD_Matematika3: Soal[] = [
  { id: "SD-M3-01", tipe: "PG", pertanyaan: "Hasil dari $500 \\times 8 : 20 = \\dots$", opsi: ["150", "200", "250", "300"], kunci: "B" },
  { id: "SD-M3-02", tipe: "PG", pertanyaan: "Sebuah trapesium memiliki sisi sejajar 10 cm dan 14 cm serta tinggi 6 cm. Luas trapesium tersebut adalah...", opsi: ["60 cm²", "72 cm²", "84 cm²", "144 cm²"], kunci: "B" },
  { id: "SD-M3-03", tipe: "BS", pertanyaan: "Garis tengah lingkaran dinamakan jari-jari.", opsi: ["BENAR", "SALAH"], kunci: "SALAH" },
  { id: "SD-M3-04", tipe: "MCMA", pertanyaan: "Berikut ini yang merupakan bangun ruang adalah...", opsi: ["Tabung", "Kerucut", "Persegi panjang", "Bola", "Trapesium"], kunci: ["A", "B", "D"] },
  { id: "SD-M3-05", tipe: "PG", pertanyaan: "Harga 3 buah buku adalah Rp15.000,00. Berapa harga 7 buah buku yang sama?", opsi: ["Rp30.000,00", "Rp35.000,00", "Rp40.000,00", "Rp45.000,00"], kunci: "B" },
  { id: "SD-M3-06", tipe: "PG", pertanyaan: "Modus dari data nilai matematika: 6, 7, 7, 8, 8, 8, 9, 10 adalah...", opsi: ["6", "7", "8", "9"], kunci: "C" },
  { id: "SD-M3-07", tipe: "BS", pertanyaan: "Bilangan 1 merupakan bilangan prima.", opsi: ["BENAR", "SALAH"], kunci: "SALAH" },
  { id: "SD-M3-08", tipe: "MCMA", pertanyaan: "Pilihlah bilangan yang habis dibagi oleh 5:", opsi: ["25", "42", "60", "85", "93"], kunci: ["A", "C", "D"] },
  { id: "SD-M3-09", tipe: "PG", pertanyaan: "Berapa gram nilai dari 2,5 kg?", opsi: ["250 gram", "2.500 gram", "25.000 gram", "25 gram"], kunci: "B" },
  { id: "SD-M3-10", tipe: "PG", pertanyaan: "Sebuah bangun memiliki 4 sisi sama panjang dan sudut-sudutnya membentuk sudut siku-siku. Bangun tersebut adalah...", opsi: ["Belah ketupat", "Persegi panjang", "Persegi", "Layang-layang"], kunci: "C" },
  { id: "SD-M3-11", tipe: "BS", pertanyaan: "Titik potong sumbu mendatar (X) dan sumbu tegak (Y) pada diagram kartesius disebut titik pusat (0,0).", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M3-12", tipe: "MCMA", pertanyaan: "Pilihlah ukuran sudut yang tergolong sudut lancip:", opsi: ["$30^\\circ$", "$45^\\circ$", "$90^\\circ$", "$85^\\circ$", "$120^\\circ$"], kunci: ["A", "B", "D"] },
  { id: "SD-M3-13", tipe: "PG", pertanyaan: "Hasil dari $3^3 + 4^2 = \\dots$", opsi: ["35", "43", "45", "52"], kunci: "B" },
  { id: "SD-M3-14", tipe: "PG", pertanyaan: "Kakek memiliki 60 ekor ayam. Sebanyak $\\frac{2}{5}$ bagian adalah ayam jantan. Berapa ekor jumlah ayam betina?", opsi: ["24 ekor", "30 ekor", "36 ekor", "40 ekor"], kunci: "C" },
  { id: "SD-M3-15", tipe: "BS", pertanyaan: "Rumus volume balok adalah panjang dikali lebar dikali tinggi ($p \\times l \\times t$).", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M3-16", tipe: "MCMA", pertanyaan: "Pernyataan yang tepat tentang lingkaran adalah...", opsi: ["Memiliki simetri putar tak terhingga", "Memiliki simetri lipat tak terhingga", "Memiliki 4 titik sudut", "Panjang diameter sama dengan 2 kali jari-jari"], kunci: ["A", "B", "D"] },
  { id: "SD-M3-17", tipe: "PG", pertanyaan: "Hasil dari $1.000 - 325 - 275 = \\dots$", opsi: ["400", "450", "500", "550"], kunci: "A" },
  { id: "SD-M3-18", tipe: "PG", pertanyaan: "Sebuah mobil melaju dengan kecepatan 60 km/jam selama 2,5 jam. Jarak yang ditempuh mobil adalah...", opsi: ["120 km", "140 km", "150 km", "160 km"], kunci: "C" },
  { id: "SD-M3-19", tipe: "BS", pertanyaan: "Pecahan $\\frac{4}{10}$ dalam bentuk persen adalah 40%.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-M3-20", tipe: "MCMA", pertanyaan: "Diagram yang sering digunakan untuk menyajikan data statistik di tingkat sekolah dasar adalah...", opsi: ["Diagram batang", "Diagram garis", "Diagram lingkaran", "Diagram sebar kompleks"], kunci: ["A", "B", "C"] }
];

export const soalSD_BahasaIndonesia1: Soal[] = [
  { id: "SD-B1-01", tipe: "PG", pertanyaan: "Gagasan utama yang mendasari sebuah paragraf disebut juga...", opsi: ["Kalimat penjelas", "Ide pokok", "Kata kunci", "Kesimpulan"], kunci: "B" },
  { id: "SD-B1-02", tipe: "PG", pertanyaan: "Bacalah teks berikut:\n'Hutan mangrove memiliki peran penting dalam mencegah abrasi di wilayah pesisir pantai.'\nArti kata 'abrasi' pada kalimat tersebut adalah...", opsi: ["Pengikisan tanah oleh air laut", "Pencemaran air oleh sampah", "Kekeringan di tepi laut", "Penangkapan ikan berlebihan"], kunci: "A" },
  { id: "SD-B1-03", tipe: "BS", pertanyaan: "Teks eksplanasi adalah teks yang menjelaskan proses terjadinya suatu fenomena alam atau sosial.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B1-04", tipe: "MCMA", pertanyaan: "Berikut ini yang merupakan ciri-ciri kalimat efektif adalah...", opsi: ["Memiliki unsur subjek dan predikat yang jelas", "Menggunakan kata-kata yang berbelit-belit", "Hemat dalam penggunaan kata", "Sesuai dengan kaidah ejaan yang berlaku"], kunci: ["A", "C", "D"] },
  { id: "SD-B1-05", tipe: "PG", pertanyaan: "Kata baku yang tepat di bawah ini adalah...", opsi: ["Apotik", "Apotek", "Apoteek", "Apotik-an"], kunci: "B" },
  { id: "SD-B1-06", tipe: "PG", pertanyaan: "Latar tempat yang tergambar dalam dongeng 'Kancil dan Buaya' pada umumnya adalah...", opsi: ["Pasar malam", "Sungai di dalam hutan", "Gedung sekolah", "Gurun pasir"], kunci: "B" },
  { id: "SD-B1-07", tipe: "BS", pertanyaan: "Antonim dari kata 'dermawan' adalah 'kikir' atau pelit.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B1-08", tipe: "MCMA", pertanyaan: "Manakah yang termasuk kata penghubung (konjungsi) antar klausa?", opsi: ["Dan", "Tetapi", "Rumah", "Sehingga", "Cepat"], kunci: ["A", "B", "D"] },
  { id: "SD-B1-09", tipe: "PG", pertanyaan: "Tanda baca yang tepat untuk mengakhiri kalimat tanya adalah...", opsi: ["Tanda titik (.)", "Tanda tanya (?)", "Tanda seru (!)", "Tanda koma (,)"], kunci: "B" },
  { id: "SD-B1-10", tipe: "PG", pertanyaan: "Sinonim kata 'rajin' adalah...", opsi: ["Tekun", "Cerdas", "Malas", "Cepat"], kunci: "A" },
  { id: "SD-B1-11", tipe: "BS", pertanyaan: "Kalimat perintah biasanya diakhiri dengan tanda seru (!).", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B1-12", tipe: "MCMA", pertanyaan: "Unsur intrinsik dalam sebuah karya cerita fiksi/cerpen meliputi...", opsi: ["Tema", "Tokoh dan penokohan", "Penerbit buku", "Alur (plot)", "Amanat"], kunci: ["A", "B", "D", "E"] },
  { id: "SD-B1-13", tipe: "PG", pertanyaan: "Pesan kebaikan yang ingin disampaikan pengarang kepada pembaca dalam cerita disebut...", opsi: ["Alur", "Latar", "Amanat", "Tokoh"], kunci: "C" },
  { id: "SD-B1-14", tipe: "PG", pertanyaan: "Kalimat yang menggunakan huruf kapital secara benar adalah...", opsi: ["adi pergi ke bandung naik kereta api.", "Adi pergi ke Bandung naik kereta api.", "Adi Pergi Ke bandung Naik Kereta Api.", "adi pergi ke Bandung naik Kereta api."], kunci: "B" },
  { id: "SD-B1-15", tipe: "BS", pertanyaan: "Fabel adalah cerita rakyat yang tokoh-tokoh utamanya diperankan oleh hewan yang bertingkah seperti manusia.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B1-16", tipe: "MCMA", pertanyaan: "Pilihlah pasangan kata yang merupakan sinonim:", opsi: ["Besar - Akbar", "Melihat - Memandang", "Terang - Gelap", "Cepat - Lekas"], kunci: ["A", "B", "D"] },
  { id: "SD-B1-17", tipe: "PG", pertanyaan: "Bagian awal pada teks cerita yang mengenalkan tokoh dan latar disebut...", opsi: ["Orientasi", "Komplikasi", "Resolusi", "Koda"], kunci: "A" },
  { id: "SD-B1-18", tipe: "PG", pertanyaan: "Ungkapan 'panjang tangan' memiliki arti...", opsi: ["Suka menolong", "Suka mencuri", "Suka berolahraga", "Tangan yang kuat"], kunci: "B" },
  { id: "SD-B1-19", tipe: "BS", pertanyaan: "Puisi lama yang setiap baitnya terdiri dari 4 baris bersajak a-b-a-b disebut pantun.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B1-20", tipe: "MCMA", pertanyaan: "Ciri-ciri pantun yang benar adalah...", opsi: ["Setiap baris terdiri atas 8-12 suku kata", "Baris pertama dan kedua adalah sampiran", "Baris ketiga dan keempat adalah isi", "Semua baris adalah sampiran"], kunci: ["A", "B", "C"] }
];

export const soalSD_BahasaIndonesia2: Soal[] = [
  { id: "SD-B2-01", tipe: "PG", pertanyaan: "Paragraf yang kalimat utamanya terletak di awal paragraf disebut paragraf...", opsi: ["Deduktif", "Induktif", "Campuran", "Naratif"], kunci: "A" },
  { id: "SD-B2-02", tipe: "PG", pertanyaan: "Langkah-langkah yang memandu seseorang membuat atau mengoperasikan sesuatu dinamakan teks...", opsi: ["Deskripsi", "Petunjuk/Prosedur", "Narasi", "Laporan"], kunci: "B" },
  { id: "SD-B2-03", tipe: "BS", pertanyaan: "Iklan bertujuan untuk membujuk atau mempengaruhi pembaca agar tertarik pada barang atau jasa yang ditawarkan.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B2-04", tipe: "MCMA", pertanyaan: "Berikut ini yang termasuk kata baku adalah...", opsi: ["Kualitas", "Jadwal", "Praktek", "Nasihat", "Ijin"], kunci: ["A", "B", "D"] },
  { id: "SD-B2-05", tipe: "PG", pertanyaan: "Kata dasar dari kata berimbuhan 'mengonsumsi' adalah...", opsi: ["Konsumsi", "Konsum", "Nonsumsi", "Sonsumsi"], kunci: "A" },
  { id: "SD-B2-06", tipe: "PG", pertanyaan: "Peribahasa 'Besar pasak daripada tiang' bermakna...", opsi: ["Pengeluaran lebih besar daripada pemasukan", "Orang yang hemat", "Rajin menabung", "Membangun rumah yang kokoh"], kunci: "A" },
  { id: "SD-B2-07", tipe: "BS", pertanyaan: "Kata 'olahraga' ditulis secara terpisah yaitu 'olah raga'.", opsi: ["BENAR", "SALAH"], kunci: "SALAH" },
  { id: "SD-B2-08", tipe: "MCMA", pertanyaan: "Manakah kalimat yang tergolong kalimat majemuk setara?", opsi: ["Rudi membaca buku dan Ani menggambar pemandangan.", "Adik tidur ketika ibu memasak.", "Budi anak yang rajin tetapi adiknya pemalas.", "Ayah pulang saat hujan turun lebat."], kunci: ["A", "C"] },
  { id: "SD-B2-09", tipe: "PG", pertanyaan: "Kalimat berikut yang menyatakan fakta adalah...", opsi: ["Bunga mawar adalah bunga tercantik di dunia.", "Indonesia merdeka pada tanggal 17 Agustus 1945.", "Es krim cokelat rasanya paling lezat.", "Cuaca hari ini sangat menyenangkan."], kunci: "B" },
  { id: "SD-B2-10", tipe: "PG", pertanyaan: "Antonim dari kata 'optimis' adalah...", opsi: ["Pesimis", "Realistis", "Dinamis", "Aktif"], kunci: "A" },
  { id: "SD-B2-11", tipe: "BS", pertanyaan: "Tokoh antagonis adalah tokoh yang memiliki sifat jahat atau penentang tokoh utama.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B2-12", tipe: "MCMA", pertanyaan: "Fungsi tanda titik dua (:) dalam penulisan kalimat adalah...", opsi: ["Dipakai pada akhir pernyataan lengkap yang diikuti rincian", "Dipakai sesudah kata penjelas waktu (jam:menit)", "Dipakai untuk mengakhiri kalimat tanya", "Dipakai dalam teks drama sesudah nama pelaku"], kunci: ["A", "B", "D"] },
  { id: "SD-B2-13", tipe: "PG", pertanyaan: "Cerita rakyat yang menceritakan tentang asal-usul terjadinya suatu tempat atau daerah disebut...", opsi: ["Mite", "Legenda", "Sage", "Fabel"], kunci: "B" },
  { id: "SD-B2-14", tipe: "PG", pertanyaan: "Penggunaan tanda koma yang tepat terdapat pada kalimat...", opsi: ["Ibu membeli apel jeruk, dan mangga.", "Ibu membeli apel, jeruk, dan mangga.", "Ibu, membeli apel jeruk dan mangga.", "Ibu membeli, apel, jeruk, dan mangga."], kunci: "B" },
  { id: "SD-B2-15", tipe: "BS", pertanyaan: "Majas personifikasi adalah majas yang mengumpamakan benda mati seolah-olah bertingkah seperti manusia.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B2-16", tipe: "MCMA", pertanyaan: "Contoh kalimat yang mengandung majas personifikasi adalah...", opsi: ["Angin malam membelai rambutnya dengan lembut.", "Nyiur melambai-lambai di tepi pantai.", "Wajahnya cantik bagai bidadari.", "Matahari tersenyum menyapa pagi."], kunci: ["A", "B", "D"] },
  { id: "SD-B2-17", tipe: "PG", pertanyaan: "Ringkasan isi buku atau tulisan yang memuat intisari penting disebut...", opsi: ["Daftar pustaka", "Ikhtisar/Rangkuman", "Kata pengantar", "Indeks"], kunci: "B" },
  { id: "SD-B2-18", tipe: "PG", pertanyaan: "Teks yang menggambarkan objek secara jelas dan terperinci sehingga pembaca seolah merasakan langsung disebut teks...", opsi: ["Deskripsi", "Narasi", "Eksposisi", "Argumentasi"], kunci: "A" },
  { id: "SD-B2-19", tipe: "BS", pertanyaan: "Kata 'aktifitas' adalah bentuk baku dari 'aktivitas'.", opsi: ["BENAR", "SALAH"], kunci: "SALAH" },
  { id: "SD-B2-20", tipe: "MCMA", pertanyaan: "Yang merupakan unsur dalam pembuatan surat resmi/dinas adalah...", opsi: ["Kepala surat (kop surat)", "Nomor surat", "Nama orang tua", "Tanggal surat", "Tanda tangan dan stempel"], kunci: ["A", "B", "D", "E"] }
];

export const soalSD_BahasaIndonesia3: Soal[] = [
  { id: "SD-B3-01", tipe: "PG", pertanyaan: "Kalimat utama yang berada di akhir paragraf menunjukkan paragraf...", opsi: ["Deduktif", "Induktif", "Ineratif", "Naratif"], kunci: "B" },
  { id: "SD-B3-02", tipe: "PG", pertanyaan: "Pertanyaan dengan kata tanya 'Mengapa' bertujuan untuk menanyakan...", opsi: ["Waktu terjadinya peristiwa", "Alasan atau penyebab terjadinya peristiwa", "Tempat kejadian", "Pelaku kejadian"], kunci: "B" },
  { id: "SD-B3-03", tipe: "BS", pertanyaan: "Biografi adalah teks yang menceritakan riwayat hidup seseorang yang ditulis oleh orang lain.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B3-04", tipe: "MCMA", pertanyaan: "Ciri-ciri bahasa dalam teks laporan hasil pengamatan adalah...", opsi: ["Menggunakan bahasa yang baku dan santun", "Bersifat objektif berdasarkan fakta pengamatan", "Mengandung unsur fiktif dan khayalan", "Disusun secara sistematis"], kunci: ["A", "B", "D"] },
  { id: "SD-B3-05", tipe: "PG", pertanyaan: "Makna kata 'konservasi' dalam lingkungan hidup adalah...", opsi: ["Eksploitasi sumber daya", "Pelestarian dan perlindungan alam", "Pembukaan lahan baru", "Perburuan hewan liar"], kunci: "B" },
  { id: "SD-B3-06", tipe: "PG", pertanyaan: "Kata ulang yang bermakna 'banyak dan bermacam-macam' adalah...", opsi: ["Kuda-kuda", "Tumbuh-tumbuhan", "Lari-lari", "Jalan-jalan"], kunci: "B" },
  { id: "SD-B3-07", tipe: "BS", pertanyaan: "Kata hubung 'karena' digunakan untuk menyatakan hubungan sebab-akibat.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B3-08", tipe: "MCMA", pertanyaan: "Manakah kata di bawah ini yang penulisannya sudah sesuai dengan KBBI?", opsi: ["Objek", "Aktif", "Zaman", "Kongkret", "Cinderamata"], kunci: ["A", "B", "C"] },
  { id: "SD-B3-09", tipe: "PG", pertanyaan: "Slogan yang tepat untuk tema pelestarian lingkungan adalah...", opsi: ["Buku adalah jendela dunia.", "Hijau bumiku, nyaman hidupku.", "Rajin pangkal pandai.", "Hemat pangkal kaya."], kunci: "B" },
  { id: "SD-B3-10", tipe: "PG", pertanyaan: "Tokoh yang selalu netral dan menjadi penengah dalam pertikaian cerita disebut tokoh...", opsi: ["Protagonis", "Antagonis", "Tritagonis", "Figuran"], kunci: "C" },
  { id: "SD-B3-11", tipe: "BS", pertanyaan: "Dongeng Sangkuriang dari Jawa Barat menceritakan asal mula terjadinya Gunung Tangkuban Parahu.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B3-12", tipe: "MCMA", pertanyaan: "Hal-hal yang perlu diperhatikan saat membaca puisi di depan umum adalah...", opsi: ["Intonasi suara", "Lafal dan artikulasi", "Ekspresi wajah dan mimik", "Membaca secepat mungkin"], kunci: ["A", "B", "C"] },
  { id: "SD-B3-13", tipe: "PG", pertanyaan: "Bentuk kata ulang berubah bunyi contohnya adalah...", opsi: ["Sayur-mayur", "Anak-anak", "Tarik-menarik", "Rumah-rumah"], kunci: "A" },
  { id: "SD-B3-14", tipe: "PG", pertanyaan: "Arti peribahasa 'Air tenang menghanyutkan' adalah...", opsi: ["Orang yang pendiam tetapi banyak ilmu pengetahuannya", "Orang yang suka marah", "Orang yang penakut", "Sungai yang sangat dalam"], kunci: "A" },
  { id: "SD-B3-15", tipe: "BS", pertanyaan: "Wawancara adalah kegiatan tanya jawab antara pewawancara dan narasumber untuk memperoleh informasi.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B3-16", tipe: "MCMA", pertanyaan: "Sikap yang baik bagi pewawancara saat melakukan wawancara adalah...", opsi: ["Menyapa dengan sopan", "Memotong pembicaraan narasumber", "Mendengarkan penjelasan dengan saksama", "Mencatat poin-poin penting"], kunci: ["A", "C", "D"] },
  { id: "SD-B3-17", tipe: "PG", pertanyaan: "Bagian surat yang berisi salam pembuka resmi adalah...", opsi: ["Dengan hormat,", "Halo sobat,", "Sampai jumpa,", "Salam manis,"], kunci: "A" },
  { id: "SD-B3-18", tipe: "PG", pertanyaan: "Istilah kata penutup pada sebuah pidato yang tepat adalah...", opsi: ["Hadirin yang berbahagia...", "Marilah kita panjatkan puji syukur...", "Demikian pidato yang saya sampaikan, mohon maaf atas kekhilafan...", "Pertama-tama saya sampaikan..."], kunci: "C" },
  { id: "SD-B3-19", tipe: "BS", pertanyaan: "Kata 'antre' merupakan bentuk baku dari kata 'antri'.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SD-B3-20", tipe: "MCMA", pertanyaan: "Media cetak yang memuat berita peristiwa sehari-hari adalah...", opsi: ["Koran / Surat kabar", "Majalah berkala", "Novel fiksi", "Tabloid berita"], kunci: ["A", "B", "D"] }
];
