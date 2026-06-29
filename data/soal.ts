export interface Soal {
  id: string;
  tipe: 'PG' | 'MCMA' | 'BS' | 'Isian'| 'TabelBS';
  pertanyaan: string;
  opsi?: string[];
  kunci: string | string[];
}

export const bobotSoal = {
  PG: 2,
  MCMA: 5,
  BS: 3,
  Isian: 8
};

// Konfigurasi durasi ujian untuk semua mata pelajaran (dalam detik)
export const durasiUjian: Record<string, Record<string, number>> = {
  // Jenjang SD/MI
  "SD/MI": {
  "Matematika": 3600,
  "Bahasa Indonesia": 3600,},
  
  // Jenjang SMP
 "SMP/MTs": {
  "Matematika": 3600,
  "Bahasa Indonesia": 3600,},
  
  // Jenjang SMA Wajib
    "SMA/MA/SMK": {
  "Matematika": 3600,
  "Bahasa Indonesia": 3600,
  "Bahasa Inggris": 3600,
  
  // Jenjang SMA Pilihan
  "Matematika TL": 3600,
  "Indonesia TL": 3600,
  "Inggris TL": 3600,
  "Fisika": 3600,
  "Kimia": 3600,
  "Biologi": 3600,
  "Informatika": 3600,
  "Ekonomi": 3600,
  "Sosiologi": 3600,
  "Geografi": 3600,
  "Sejarah": 3600,
  "Antropologi": 3600,
  "PPKn": 3600,
  "Arab": 3600,
  "Jepang": 3600,
  "Mandarin": 3600,
  "Korea": 3600,
  "Prancis": 3600,
  "Jerman": 3600,
  "Projek Kreatif & Kewirausahaan": 3600,},
};

export const bankSoal: any = { 
  // Jenjang SD
  "SD/MI": {
  "Matematika": [],
  "Bahasa Indonesia": [],},
  
  // Jenjang SMP
 "SMP/MTs": {
  "Matematika": [],
  "Bahasa Indonesia": [],},
  
  // Jenjang SMA Wajib
  "SMA_Wajib": {
  "Matematika": [],

 "Bahasa Indonesia": [{"id": "BI01", "tipe": "PG", "pertanyaan": "Portal Computer Based Test (CBT) di sekolah memicu efisiensi administrasi. Guru berperan sebagai fasilitator utama.\n Apa peran guru menurut teks?", "opsi": ["Administrator", "Fasilitator", "Pengembang", "Pengawas"], "kunci": "B",},
            {"id": "BI02", "tipe": "PG", "pertanyaan": "Portal Computer Based Test (CBT) di sekolah memicu efisiensi administrasi. Guru berperan sebagai fasilitator utama. \n Kata serapan asing dalam teks adalah...", "opsi": ["Guru", "Portal", "Sekolah", "Utama"], "kunci": "B",},
            {"id": "BI03", "tipe": "BS", "pertanyaan": "Portal Computer Based Test (CBT) di sekolah memicu efisiensi administrasi. Guru berperan sebagai fasilitator utama. \n CBT otomatis menghilangkan peran guru.", "opsi": ["BENAR", "SALAH"], "kunci": "SALAH",},
            {"id": "BI04", "tipe": "MCMA", "pertanyaan": "Portal Computer Based Test (CBT) di sekolah memicu efisiensi administrasi. Guru berperan sebagai fasilitator utama. \n Tujuan utama CBT:", "opsi": ["Efisiensi", "Modernisasi", "Mempersulit guru", "Mengurangi kertas"], "kunci": ["A", "B", "D"],},
            {"id": "BI05", "tipe": "PG", "pertanyaan": "Kurikulum Merdeka berfokus pada konsep. Siswa lebih kritis dalam memecahkan masalah daripada sekadar menghafal.\n  Ide pokok teks tersebut adalah...", "opsi": ["Cara menghafal", "Fokus konsep kurikulum", "Masalah siswa", "Jumlah ujian"], "kunci": "B",},
            {"id": "BI06", "tipe": "PG", "pertanyaan": "Kurikulum Merdeka berfokus pada konsep. Siswa lebih kritis dalam memecahkan masalah daripada sekadar menghafal.\n Apa arti 'kritis' dalam konteks teks?", "opsi": ["Marah", "Berpikir tajam", "Berbahaya", "Lambat"], "kunci": "B",},
            {"id": "BI07", "tipe": "BS", "pertanyaan": "Kurikulum Merdeka berfokus pada konsep. Siswa lebih kritis dalam memecahkan masalah daripada sekadar menghafal.\n  Kurikulum ini mengutamakan hafalan.", "opsi": ["BENAR", "SALAH"], "kunci": "SALAH",},
            {"id": "BI08", "tipe": "MCMA", "pertanyaan": "Kurikulum Merdeka berfokus pada konsep. Siswa lebih kritis dalam memecahkan masalah daripada sekadar menghafal.\n  Karakteristik siswa Kurikulum Merdeka:", "opsi": ["Kritis", "Aplikatif", "Pasif", "Penghafal"], "kunci": ["A", "B"],},
            {"id": "BI09", "tipe": "PG", "pertanyaan": "Kesenjangan akses internet di wilayah 3T menghambat digitalisasi pendidikan yang inklusif bagi semua siswa.\n Fenomena yang dibahas adalah...", "opsi": ["Kehebatan teknologi", "Ketimpangan akses", "Harga internet", "Libur sekolah"], "kunci": "B",},
            {"id": "BI10", "tipe": "MCMA", "pertanyaan": "Kesenjangan akses internet di wilayah 3T menghambat digitalisasi pendidikan yang inklusif bagi semua siswa.\n Dampak kesenjangan akses:", "opsi": ["Akses info sulit", "Kualitas beda", "Kota jadi maju", "Pendidikan tidak merata"], "kunci": ["A", "B", "D"],},
            {"id": "BI11", "tipe": "BS", "pertanyaan": "Kesenjangan akses internet di wilayah 3T menghambat digitalisasi pendidikan yang inklusif bagi semua siswa.\n Digitalisasi sudah merata di seluruh pelosok.", "opsi": ["BENAR", "SALAH"], "kunci": "SALAH",},
            {"id": "BI12", "tipe": "PG", "pertanyaan": "Kesenjangan akses internet di wilayah 3T menghambat digitalisasi pendidikan yang inklusif bagi semua siswa.\n Apa prediksi masa depan jika tidak diatasi?", "opsi": ["Kesenjangan makin lebar", "Akses merata", "Siswa pintar", "Teknologi murah"], "kunci": "A",},
            {"id": "BI13", "tipe": "PG", "pertanyaan": "Menembus sekat layar, jemari menari di atas tuts,\n Mencari cahaya di ufuk digital yang kian memutus,\n Dunia maya membentang luas tanpa ada garis batas,\n Namun jiwa seringkali terasa lelah dan bergegas.\n Di balik pendaran piksel, ada rindu yang tersembunyi,\n Mencari arti di antara kode yang terus berbunyi,\n Kita adalah pengembara di dalam ruang yang sunyi,\n Mengetikkan harapan agar asa tetap murni.\n Biarlah tuts ini menjadi saksi setiap dentang pikir,\n Tentang mimpi yang takkan pernah sudi untuk berakhir,\n Di ufuk digital, kita terus melangkah tanpa kikir,\n Merajut makna hingga ke pelosok semesta yang hadir.\n Apa respons emosional dari puisi tersebut?", "opsi": ["Takut", "Semangat/optimis", "Bosan", "Marah"], "kunci": "B",},
            {"id": "BI14", "tipe": "PG", "pertanyaan": "Menembus sekat layar, jemari menari di atas tuts,\n Mencari cahaya di ufuk digital yang kian memutus,\n Dunia maya membentang luas tanpa ada garis batas,\n Namun jiwa seringkali terasa lelah dan bergegas.\n Di balik pendaran piksel, ada rindu yang tersembunyi,\n Mencari arti di antara kode yang terus berbunyi,\n Kita adalah pengembara di dalam ruang yang sunyi,\n Mengetikkan harapan agar asa tetap murni.\n Biarlah tuts ini menjadi saksi setiap dentang pikir,\n Tentang mimpi yang takkan pernah sudi untuk berakhir,\n Di ufuk digital, kita terus melangkah tanpa kikir,\n Merajut makna hingga ke pelosok semesta yang hadir.\n  Makna 'cahaya' dalam puisi adalah...", "opsi": ["Lampu", "Ilmu/harapan", "Matahari", "Layar HP"], "kunci": "B",},
            {"id": "BI15", "tipe": "BS", "pertanyaan": "Menembus sekat layar, jemari menari di atas tuts,\n Mencari cahaya di ufuk digital yang kian memutus,\n Dunia maya membentang luas tanpa ada garis batas,\n Namun jiwa seringkali terasa lelah dan bergegas.\n Di balik pendaran piksel, ada rindu yang tersembunyi,\n Mencari arti di antara kode yang terus berbunyi,\n Kita adalah pengembara di dalam ruang yang sunyi,\n Mengetikkan harapan agar asa tetap murni.\n Biarlah tuts ini menjadi saksi setiap dentang pikir,\n Tentang mimpi yang takkan pernah sudi untuk berakhir,\n Di ufuk digital, kita terus melangkah tanpa kikir,\n Merajut makna hingga ke pelosok semesta yang hadir.\n  Puisi ini menggambarkan kegelapan malam.", "opsi": ["BENAR", "SALAH"], "kunci": "SALAH",},
            {"id": "BI16", "tipe": "MCMA", "pertanyaan": "Menembus sekat layar, jemari menari di atas tuts,\n Mencari cahaya di ufuk digital yang kian memutus,\n Dunia maya membentang luas tanpa ada garis batas,\n Namun jiwa seringkali terasa lelah dan bergegas.\n Di balik pendaran piksel, ada rindu yang tersembunyi,\n Mencari arti di antara kode yang terus berbunyi,\n Kita adalah pengembara di dalam ruang yang sunyi,\n Mengetikkan harapan agar asa tetap murni.\n Biarlah tuts ini menjadi saksi setiap dentang pikir,\n Tentang mimpi yang takkan pernah sudi untuk berakhir,\n Di ufuk digital, kita terus melangkah tanpa kikir,\n Merajut makna hingga ke pelosok semesta yang hadir.\n  Gambaran suasana:", "opsi": ["Inspiratif", "Penuh perjuangan", "Statis", "Dinamis"], "kunci": ["A", "B", "D"],},  
            {"id": "BI17", "tipe": "PG", "pertanyaan": "Perhatikan bagan dibawah ini.\n [bagan.png] \n Langkah penentu keberhasilan adalah...", "opsi": ["Pendataan", "Validasi", "Laporan", "Evaluasi"], "kunci": "D",},
            {"id": "BI18", "tipe": "TabelBS", pertanyaan: `Perhatikan bagan penelitian iklim demokrasi Indonesia berikut:
\n [bagan.png] \n Berdasarkan alur penelitian di atas, tentukan apakah pernyataan berikut benar atau salah.`,
  opsi: [
    "Tahap evaluasi merupakan tahap terakhir yang menjadi penentu keberhasilan penelitian.",
    "Proses verifikasi kualitas data dan triangulasi dilakukan pada tahap Pendataan.",
    "Penyusunan draf laporan akhir dilakukan setelah melalui tahap validasi."
  ],
  kunci: ["Setuju", "Tidak Setuju", "Setuju"],
  },
            {"id": "BI19", "tipe": "MCMA", "pertanyaan": "Perhatikan bagan dibawah ini.\n [bagan.png] \n Urutan sistem laporan:", "opsi": ["Pendataan", "Validasi", "Evaluasi", "Distribusi"], "kunci": ["A", "B", "C"],},
            {"id": "BI20", "tipe": "PG", "pertanyaan": "Perhatikan bagan dibawah ini.\n [bagan.png] \n Teks tersebut berbentuk...", "opsi": ["Cerita pendek", "Bagan kerangka", "Puisi", "Drama"], "kunci": "B",}],
  
    "Bahasa Inggris": [],
},
  // Jenjang SMA Pilihan
  "SMA_Pilihan":{
    "Matematika TL": [ { 
    id: "TRY01", 
    tipe: "PG", 
    pertanyaan: "Jika $P = Q^T$ dengan $P = \\begin{pmatrix} x-y & 4 \\\\ 3x & 5 \\end{pmatrix}$ dan $Q = \\begin{pmatrix} 7 & 6 \\\\ 4 & z \\end{pmatrix}$, nilai $x + y + z = \\dots$", 
    opsi: ["$12$", "$14$", "$16$", "$18$"], 
    kunci: "C" 
  },
  { 
    id: "TRY02", 
    tipe: "PG", 
    pertanyaan: "Jika $A = \\begin{pmatrix} 1 & 3 \\\\ 2 & 4 \\end{pmatrix}$ dan $B = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}$, maka $A \\times B = \\dots$", 
    opsi: ["$\\begin{pmatrix} 2 & 10 \\\\ 4 & 14 \\end{pmatrix}$", "$\\begin{pmatrix} 2 & 10 \\\\ 4 & 16 \\end{pmatrix}$", "$\\begin{pmatrix} 3 & 10 \\\\ 4 & 14 \\end{pmatrix}$", "$\\begin{pmatrix} 2 & 10 \\\\ 6 & 14 \\end{pmatrix}$"], 
    kunci: "A" 
  },
  { 
    id: "TRY03", 
    tipe: "PG", 
    pertanyaan: "Invers matriks $M = \\begin{pmatrix} 3 & 2 \\\\ 5 & 4 \\end{pmatrix}$ adalah ...", 
    opsi: ["$\\frac{1}{2} \\begin{pmatrix} 4 & -2 \\\\ -5 & 3 \\end{pmatrix}$", "$\\frac{1}{2} \\begin{pmatrix} 3 & -2 \\\\ -5 & 4 \\end{pmatrix}$", "$\\begin{pmatrix} 4 & -5 \\\\ -2 & 3 \\end{pmatrix}$", "$\\begin{pmatrix} -4 & 2 \\\\ 5 & -3 \\end{pmatrix}$"], 
    kunci: "A" 
  },
  { 
    id: "TRY04", 
    tipe: "PG", 
    pertanyaan: "Bayangan $B(3, -2)$ oleh translasi $\\binom{-2}{5}$ lalu rotasi $90^\\circ$ pusat $(0,0)$ adalah ...", 
    opsi: ["$(3, -1)$", "$(-3, 1)$", "$(1, 3)$", "$(-1, -3)$"], 
    kunci: "B" 
  },
  { 
    id: "TRY05", 
    tipe: "PG", 
    pertanyaan: "Bayangan $Q(4, -6)$ oleh dilatasi pusat $(0,0)$ faktor skala $\\frac{1}{2}$ adalah ...", 
    opsi: ["$(2, -3)$", "$(8, -12)$", "$(-2, 3)$", "$(2, 3)$"], 
    kunci: "A" 
  },
  { 
    id: "TRY06", 
    tipe: "PG", 
    pertanyaan: "Nilai dari $\\frac{\\cos 60^\\circ + \\sin 30^\\circ}{\\tan 45^\\circ} = \\dots$", 
    opsi: ["$-1$", "$1$", "$0$", "$\\sqrt{3}$"], 
    kunci: "B" 
  },
    { id: "TRY07", tipe: "PG", pertanyaan: "Segitiga $ABC$: $AB=8$, $BC=5$, sudut $B=120^\\circ$. Panjang $AC = \\dots$", opsi: ["$7$", "$9$", "$\\sqrt{129}$", "$11$"], kunci: "C" },
    { id: "TRY08", tipe: "PG", pertanyaan: "Segitiga $PQR$ lancip, $\\sin P = \\frac{3}{5}$. Jika $\\tan Q \\times \\tan R = 3$, maka $\\tan Q + \\tan R = \\dots$", opsi: ["$1$", "$3$", "$2$", "$2\\sqrt{3}$"], kunci: "B" },
    { id: "TRY09", tipe: "PG", pertanyaan: "Garis singgung $x^2 + y^2 = 25$ dengan gradien $m = 2$ adalah ...", opsi: ["$y = 2x \\pm 5\\sqrt{5}$", "$y = 2x \\pm 25$", "$y = 2x + 5$", "$y = 2x \\pm \\sqrt{5}$"], kunci: "A" },
    { id: "TRY10", tipe: "PG", pertanyaan: "Persamaan lingkaran pusat $(-2, 1)$ menyinggung sumbu $Y$ adalah ...", opsi: ["$x^2+y^2+4x-2y+1=0$", "$x^2+y^2-4x+2y+1=0$", "$x^2 + y^2 + 2x - 4y + 1 = 0$", "$x^2+y^2+4x+2y+1=0$"], kunci: "A" },
    { id: "TRY11", tipe: "MCMA", pertanyaan: "Diketahui $A = \\begin{pmatrix} 2 & 1 \\\\ 4 & 3 \\end{pmatrix}$, $B = \\begin{pmatrix} 1 & 0 \\\\ 2 & 2 \\end{pmatrix}$. Pernyataan benar:", opsi: ["$$\\det(A)=2$$", "$$\\det(B)=1$$", "$$A+B = \\begin{pmatrix} 3 & 1 \\\\ 6 & 5 \\end{pmatrix}$$", "$$A-B = \\begin{pmatrix} 0 & 1 \\\\ 2 & 2 \\end{pmatrix}$$"], kunci: ["AC"] },
    { id: "TRY12", tipe: "MCMA", pertanyaan: "Titik $P(2,1)$, $R(5,3)$ dicermin $y=x$ lalu translasi $\\binom{1}{-1}$. Titik:", opsi: ["$P'(2, 1)$", "$P'(0, 2)$", "$P'(2, 0)$", "$P'(3, 5)$"], kunci: ["A"] },
    { id: "TRY13", tipe: "MCMA", pertanyaan: "Nilai trigonometri $= -\\frac{1}{2} \\sqrt{3}$ :", opsi: ["$\\sin 240^\\circ$", "$\\cos 150^\\circ$", "$\\cos 210^\\circ$", "$\\sin 300^\\circ$"], kunci: ["ABCD"] },
    { id: "TRY14", tipe: "MCMA", pertanyaan: "Diketahui $\\sin 2\\theta < 0$. Nilai $\\theta$ yang sesuai:", opsi: ["$100^\\circ$", "$200^\\circ$", "$300^\\circ$", "$400^\\circ$"], kunci: ["AC"] },
    { id: "TRY15", tipe: "MCMA", pertanyaan: "Garis singgung $x^2 + y^2 = 1$ yang benar:", opsi: ["$y = x + \\sqrt{2}$", "$y = -x + \\sqrt{2}$", "$x = 1$", "$y = 1$"], kunci: ["CD"] },
    { id: "TRY16", tipe: "BS", pertanyaan: "$Q(3, 4)$ ditranslasi $\\binom{-1}{-2}$ menjadi $Q'(2, 2)$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
    { id: "TRY17", tipe: "BS", pertanyaan: "Transformasi $S(1, 0)$ oleh $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$ adalah $(0, 1)$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
    { id: "TRY18", tipe: "BS", pertanyaan: "Tangga $10m$ bersandar ke tembok, sudut $60^\\circ$ dengan tanah. Jarak kaki ke tembok $5m$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
    { id: "TRY19", tipe: "BS", pertanyaan: "Menara $40m$. Pengamat melihat mobil sudut depresi $30^\\circ$. Jarak mobil ke menara $40\\sqrt{3}m$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
    { id: "TRY20", tipe: "BS", pertanyaan: "Lingkaran $(x+3)^2 + (y-4)^2 = 16$ berpusat di $(-3, 4)$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
    { id: "TRY21", tipe: "Isian", pertanyaan: "Determinan dari $\\begin{pmatrix} 1 & 2 & 1 \\\\ 0 & 3 & 2 \\\\ 1 & 0 & 1 \\end{pmatrix}$ adalah ...", kunci: "-4" },
    { id: "TRY22", tipe: "Isian", pertanyaan: "Titik $(1, 2)$ ditransformasi matriks $\\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}$ lalu $\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$. Hasilnya ...", kunci: "(4,2)" },
    { id: "TRY23", tipe: "Isian", pertanyaan: "Jika $\\sin \\theta = \\frac{3}{5}$, maka $\\cos^2 \\theta = \\dots$", kunci: "16/25" },
    { id: "TRY24", tipe: "Isian", pertanyaan: "Nilai $\\cos 120^\\circ + \\sin 210^\\circ = \\dots$", kunci: "-1" },
    { id: "TRY25", tipe: "Isian", pertanyaan: "Titik potong $x$ dari $x^2 + y^2 = 16$ dan $y = 0$ adalah ...", kunci: "(4,0) dan (-4,0)" } ],
  "Indonesia TL": [],
  "Inggris TL": [],
  "Fisika": [],
  "Kimia": [],
  "Biologi": [],
  "Informatika": [],
  "Ekonomi": [],
  "Sosiologi": [],
  "Geografi": [],
  "Sejarah": [],
  "Antropologi": [],
  "PPKn": [],
  "Arab": [],
  "Jepang": [],
  "Mandarin": [],
  "Korea": [],
  "Prancis": [],
  "Jerman": [],
  "Projek Kreatif & Kewirausahaan": []
}
};
