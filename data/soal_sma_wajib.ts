import { Soal } from "./soal";

// Bank Soal SMA Wajib (20 Soal per Paket)
// Mencakup PG, MCMA (Pilihan Ganda Kompleks), dan BS (Benar/Salah)

export const soalSMA_Matematika1: Soal[] = [
  { id: "SMA-M1-01", tipe: "PG", pertanyaan: "Nilai $x$ yang memenuhi persamaan eksponen $3^{2x - 1} = 27$ adalah...", opsi: ["1", "2", "3", "4"], kunci: "B" },
  { id: "SMA-M1-02", tipe: "PG", pertanyaan: "Jika $^2\\log 3 = a$ dan $^3\\log 5 = b$, maka nilai $^2\\log 15 = \\dots$", opsi: ["$a + b$", "$a + ab$", "$a(1 + b)$", "$ab + 1$"], kunci: "C" },
  { id: "SMA-M1-03", tipe: "BS", pertanyaan: "Matriks $A = \\begin{pmatrix} 2 & 1 \\\\ 4 & 2 \\end{pmatrix}$ merupakan matriks singular karena nilai determinannya sama dengan 0.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M1-04", tipe: "MCMA", pertanyaan: "Pilihlah pernyataan yang BENAR mengenai sistem pertidaksamaan kuadrat dan linier:", opsi: ["Grafik pertidaksamaan kuadrat berbentuk kurva parabola", "Titik uji $(0,0)$ dapat digunakan untuk menentukan daerah himpunan penyelesaian", "Garis putus-putus digunakan untuk tanda pertidaksamaan $\\le$ atau $\\ge$", "Daerah penyelesaian adalah irisan dari semua pertidaksamaan"], kunci: ["A", "B", "D"] },
  { id: "SMA-M1-05", tipe: "PG", pertanyaan: "Diketahui deret aritmetika dengan suku pertama $a = 4$ dan beda $b = 3$. Jumlah 15 suku pertama ($S_{15}$) adalah...", opsi: ["345", "375", "390", "420"], kunci: "B" },
  { id: "SMA-M1-06", tipe: "PG", pertanyaan: "Jika fungsi $f(x) = 2x + 5$ dan $g(x) = x^2 - 1$, maka nilai $(g \\circ f)(1) = \\dots$", opsi: ["45", "48", "49", "50"], kunci: "B" },
  { id: "SMA-M1-07", tipe: "BS", pertanyaan: "Invers dari fungsi $f(x) = \\frac{2x - 3}{x + 4}$ dengan $x \\neq -4$ adalah $f^{-1}(x) = \\frac{-4x - 3}{x - 2}$ dengan $x \\neq 2$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M1-08", tipe: "MCMA", pertanyaan: "Manakah relasi sudut berelasi dalam trigonometri yang bernilai BENAR?", opsi: ["$\\sin(180^\\circ - \\alpha) = \\sin\\alpha$", "$\\cos(180^\\circ - \\alpha) = -\\cos\\alpha$", "$\\tan(180^\\circ - \\alpha) = \\tan\\alpha$", "$\\sin(90^\\circ - \\alpha) = \\cos\\alpha$"], kunci: ["A", "B", "D"] },
  { id: "SMA-M1-09", tipe: "PG", pertanyaan: "Nilai dari $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} = \\dots$", opsi: ["3", "6", "9", "Tidak terdefinisi"], kunci: "B" },
  { id: "SMA-M1-10", tipe: "PG", pertanyaan: "Turunan pertama dari $f(x) = 3x^3 - 5x^2 + 4x - 7$ adalah...", opsi: ["$9x^2 - 10x + 4$", "$6x^2 - 10x + 4$", "$9x^2 - 5x + 4$", "$3x^2 - 10x + 4$"], kunci: "A" },
  { id: "SMA-M1-11", tipe: "BS", pertanyaan: "Integral tak tentu dari $\\int (4x^3 + 2x) \\, dx$ adalah $x^4 + x^2 + C$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M1-12", tipe: "MCMA", pertanyaan: "Pilihlah besaran yang termasuk dalam statistik lima serangkai (Five-number summary):", opsi: ["Nilai minimum ($x_{\\min}$)", "Kuartil bawah ($Q_1$)", "Median / Kuartil tengah ($Q_2$)", "Kuartil atas ($Q_3$)", "Nilai maksimum ($x_{\\max}$)"], kunci: ["A", "B", "C", "D", "E"] },
  { id: "SMA-M1-13", tipe: "PG", pertanyaan: "Banyak cara menyusun 3 pengurus (Ketua, Sekretaris, Bendahara) dari 7 calon yang tersedia adalah...", opsi: ["21 cara", "35 cara", "210 cara", "840 cara"], kunci: "C" },
  { id: "SMA-M1-14", tipe: "PG", pertanyaan: "Dari seperangkat kartu bridge (52 kartu) diambil satu kartu secara acak. Peluang terambilnya kartu As adalah...", opsi: ["$\\frac{1}{52}$", "$\\frac{1}{26}$", "$\\frac{1}{13}$", "$\\frac{4}{13}$"], kunci: "C" },
  { id: "SMA-M1-15", tipe: "BS", pertanyaan: "Vektor $\\vec{u}$ dan $\\vec{v}$ saling tegak lurus jika hasil kali titiknya $\\vec{u} \\cdot \\vec{v} = 0$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M1-16", tipe: "MCMA", pertanyaan: "Sifat-sifat eksponen yang benar adalah...", opsi: ["$a^p \\cdot a^q = a^{p+q}$", "$(a^p)^q = a^{pq}$", "$(ab)^p = a^p b^p$", "$a^{-p} = -a^p$"], kunci: ["A", "B", "C"] },
  { id: "SMA-M1-17", tipe: "PG", pertanyaan: "Persamaan lingkaran yang berpusat di titik $(0,0)$ dan berjari-jari 5 adalah...", opsi: ["$x^2 + y^2 = 5$", "$x^2 + y^2 = 10$", "$x^2 + y^2 = 25$", "$x + y = 25$"], kunci: "C" },
  { id: "SMA-M1-18", tipe: "PG", pertanyaan: "Nilai minimum dari fungsi kuadrat $f(x) = x^2 - 6x + 13$ adalah...", opsi: ["3", "4", "5", "6"], kunci: "B" },
  { id: "SMA-M1-19", tipe: "BS", pertanyaan: "Deret geometri tak hingga $1 + \\frac{1}{2} + \\frac{1}{4} + \\dots$ konvergen dan memiliki jumlah $S_\\infty = 2$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M1-20", tipe: "MCMA", pertanyaan: "Diketahui kubus ABCD.EFGH. Garis yang saling bersilangan adalah...", opsi: ["AB dan CG", "AD dan FG", "AC dan BD", "BC dan DH"], kunci: ["A", "D"] }
];

export const soalSMA_Matematika2: Soal[] = [
  { id: "SMA-M2-01", tipe: "PG", pertanyaan: "Himpunan penyelesaian dari $|2x - 3| = 7$ adalah...", opsi: ["$\\{-2, 5\\}$", "$\\{2, 5\\}$", "$\\{-5, 2\\}$", "$\\{-2, -5\\}$"], kunci: "A" },
  { id: "SMA-M2-02", tipe: "PG", pertanyaan: "Jika matriks $A = \\begin{pmatrix} 3 & 2 \\\\ 1 & 4 \\end{pmatrix}$, maka determinan matriks $A$ adalah...", opsi: ["10", "12", "14", "16"], kunci: "A" },
  { id: "SMA-M2-03", tipe: "BS", pertanyaan: "Dua matriks $A$ dan $B$ dapat dikalikan jika banyak kolom matriks $A$ sama dengan banyak baris matriks $B$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M2-04", tipe: "MCMA", pertanyaan: "Pernyataan yang BENAR mengenai fungsi trigonometri adalah...", opsi: ["Nilai maksimum fungsi $y = \\sin x$ adalah 1", "Periode fungsi $y = \\cos x$ adalah $360^\\circ$", "Nilai dari $\\tan 45^\\circ = 1$", "$\\sin^2 x + \\cos^2 x = 0$"], kunci: ["A", "B", "C"] },
  { id: "SMA-M2-05", tipe: "PG", pertanyaan: "Nilai suku ke-8 dari barisan geometri 3, 6, 12, 24, ... adalah...", opsi: ["192", "384", "768", "1.536"], kunci: "B" },
  { id: "SMA-M2-06", tipe: "PG", pertanyaan: "Gradien garis singgung kurva $y = x^2 - 4x + 1$ pada titik berabsis $x = 3$ adalah...", opsi: ["1", "2", "3", "4"], kunci: "B" },
  { id: "SMA-M2-07", tipe: "BS", pertanyaan: "Fungsi $f(x)$ dikatakan stasioner jika turunan pertamanya bernilai nol ($f'(x) = 0$).", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M2-08", tipe: "MCMA", pertanyaan: "Manakah persamaan lingkaran berikut yang berpusat di titik $(2, -3)$?", opsi: ["$(x - 2)^2 + (y + 3)^2 = 16$", "$x^2 + y^2 - 4x + 6y - 3 = 0$", "$(x + 2)^2 + (y - 3)^2 = 16$", "$x^2 + y^2 + 4x - 6y - 3 = 0$"], kunci: ["A", "B"] },
  { id: "SMA-M2-09", tipe: "PG", pertanyaan: "Nilai dari $\\int_0^2 (3x^2 + 2x) \\, dx = \\dots$", opsi: ["10", "12", "14", "16"], kunci: "B" },
  { id: "SMA-M2-10", tipe: "PG", pertanyaan: "Sebuah kotak berisi 5 bola merah dan 3 bola putih. Diambil 2 bola sekaligus secara acak. Banyak titik sampel pengambilan bola adalah...", opsi: ["16", "24", "28", "56"], kunci: "C" },
  { id: "SMA-M2-11", tipe: "BS", pertanyaan: "Kombinasi $C(n, r) = \\frac{n!}{r!(n - r)!}$ digunakan ketika urutan pemilihan objek TIDAK diperhatikan.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M2-12", tipe: "MCMA", pertanyaan: "Ukuran pemusatan data (central tendency) dalam statistika meliputi...", opsi: ["Mean (rata-rata hitung)", "Median (nilai tengah)", "Modus (nilai paling sering muncul)", "Standar deviasi"], kunci: ["A", "B", "C"] },
  { id: "SMA-M2-13", tipe: "PG", pertanyaan: "Diketahui kubus ABCD.EFGH dengan panjang rusuk 6 cm. Jarak titik B ke titik H adalah...", opsi: ["$6\\sqrt{2}$ cm", "$6\\sqrt{3}$ cm", "$12$ cm", "$3\\sqrt{6}$ cm"], kunci: "B" },
  { id: "SMA-M2-14", tipe: "PG", pertanyaan: "Nilai dari $\\lim_{x \\to \\infty} \\frac{4x^2 - 3x + 1}{2x^2 + 5x - 7} = \\dots$", opsi: ["0", "1", "2", "$\\infty$"], kunci: "C" },
  { id: "SMA-M2-15", tipe: "BS", pertanyaan: "Turunan pertama dari $f(x) = \\sin(3x)$ adalah $f'(x) = 3\\cos(3x)$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M2-16", tipe: "MCMA", pertanyaan: "Pilihlah sifat-sifat logaritma yang tepat:", opsi: ["$^a\\log(xy) = \\, ^a\\log x + \\, ^a\\log y$", "$^a\\log(x/y) = \\, ^a\\log x - \\, ^a\\log y$", "$^a\\log x^n = n \\cdot \\, ^a\\log x$", "$^a\\log a = 0$"], kunci: ["A", "B", "C"] },
  { id: "SMA-M2-17", tipe: "PG", pertanyaan: "Nilai simpangan baku dari data: 4, 6, 8, 2, 5 jika ragamnya adalah 4 adalah...", opsi: ["1", "2", "4", "16"], kunci: "B" },
  { id: "SMA-M2-18", tipe: "PG", pertanyaan: "Jika suku ke-3 barisan geometri adalah 18 dan suku ke-5 adalah 162, maka rasio positifnya ($r$) adalah...", opsi: ["2", "3", "4", "5"], kunci: "B" },
  { id: "SMA-M2-19", tipe: "BS", pertanyaan: "Vektor posisi titik $A(2, -4, 5)$ dinyatakan dengan $\\vec{a} = 2\\hat{i} - 4\\hat{j} + 5\\hat{k}$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M2-20", tipe: "MCMA", pertanyaan: "Syarat agar fungsi kuadrat $f(x) = ax^2 + bx + c$ selalu bernilai positif untuk semua nilai $x$ (definit positif) adalah...", opsi: ["$a > 0$", "Diskriminan $D < 0$", "$a < 0$", "Diskriminan $D > 0$"], kunci: ["A", "B"] }
];

export const soalSMA_Matematika3: Soal[] = [
  { id: "SMA-M3-01", tipe: "PG", pertanyaan: "Himpunan penyelesaian pertidaksamaan $|x - 2| < 3$ adalah...", opsi: ["$-1 < x < 5$", "$x < -1$ atau $x > 5$", "$-5 < x < 1$", "$1 < x < 5$"], kunci: "A" },
  { id: "SMA-M3-02", tipe: "PG", pertanyaan: "Jika matriks $A = \\begin{pmatrix} 2 & 3 \\\\ 1 & 2 \\end{pmatrix}$, maka invers matriks $A^{-1} = \\dots$", opsi: ["$\\begin{pmatrix} 2 & -3 \\\\ -1 & 2 \\end{pmatrix}$", "$\\begin{pmatrix} -2 & 3 \\\\ 1 & -2 \\end{pmatrix}$", "$\\begin{pmatrix} 2 & 1 \\\\ 3 & 2 \\end{pmatrix}$", "$\\begin{pmatrix} 1 & -3 \\\\ -1 & 2 \\end{pmatrix}$"], kunci: "A" },
  { id: "SMA-M3-03", tipe: "BS", pertanyaan: "Nilai dari $\\cos 60^\\circ$ sama dengan nilai dari $\\sin 30^\\circ$, yaitu $\\frac{1}{2}$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M3-04", tipe: "MCMA", pertanyaan: "Pilihlah rumus turunan fungsi aljabar yang BENAR:", opsi: ["Jika $f(x) = c$ maka $f'(x) = 0$", "Jika $f(x) = x^n$ maka $f'(x) = n x^{n-1}$", "Jika $f(x) = u \\cdot v$ maka $f'(x) = u'v + uv'$", "Jika $f(x) = u / v$ maka $f'(x) = u'v - uv'$"], kunci: ["A", "B", "C"] },
  { id: "SMA-M3-05", tipe: "PG", pertanyaan: "Sebuah mobil mengalami perlambatan dengan percepatan $a(t) = -2t + 4$. Kecepatan awal $v(0) = 12$ m/s. Persamaan kecepatan mobil adalah...", opsi: ["$v(t) = -t^2 + 4t + 12$", "$v(t) = -2t^2 + 4t + 12$", "$v(t) = -t^2 + 2t + 12$", "$v(t) = -t^2 + 4t$"], kunci: "A" },
  { id: "SMA-M3-06", tipe: "PG", pertanyaan: "Luas daerah yang dibatasi oleh kurva $y = 2x$, sumbu X, garis $x = 1$, dan $x = 3$ adalah...", opsi: ["6 satuan luas", "8 satuan luas", "10 satuan luas", "12 satuan luas"], kunci: "B" },
  { id: "SMA-M3-07", tipe: "BS", pertanyaan: "Dua dadu dilempar bersama-sama satu kali. Peluang muncul jumlah mata dadu sama dengan 7 adalah $\\frac{6}{36} = \\frac{1}{6}$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M3-08", tipe: "MCMA", pertanyaan: "Transformasi matriks geometri yang tidak mengubah ukuran bentuk bangun (isometri) adalah...", opsi: ["Translasi", "Refleksi", "Rotasi", "Dilatasi dengan faktor $k = 3$"], kunci: ["A", "B", "C"] },
  { id: "SMA-M3-09", tipe: "PG", pertanyaan: "Berapa banyak diagonal ruang pada sebuah balok?", opsi: ["4", "6", "8", "12"], kunci: "A" },
  { id: "SMA-M3-10", tipe: "PG", pertanyaan: "Nilai dari $\\lim_{x \\to 0} \\frac{\\sin 4x}{2x} = \\dots$", opsi: ["1", "2", "4", "0"], kunci: "B" },
  { id: "SMA-M3-11", tipe: "BS", pertanyaan: "Persamaan garis singgung lingkaran $x^2 + y^2 = 25$ di titik $(3, 4)$ adalah $3x + 4y = 25$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M3-12", tipe: "MCMA", pertanyaan: "Aturan pencacahan dalam matematika meliputi...", opsi: ["Aturan perkalian (kaidah pengisian tempat)", "Permutasi unsur berbeda", "Permutasi siklis (melingkar)", "Kombinasi"], kunci: ["A", "B", "C", "D"] },
  { id: "SMA-M3-13", tipe: "PG", pertanyaan: "Banyak susunan huruf berbeda yang dapat dibentuk dari kata 'MALAM' adalah...", opsi: ["30", "60", "120", "15"], kunci: "A" },
  { id: "SMA-M3-14", tipe: "PG", pertanyaan: "Jarak titik $P(1, 2, 3)$ ke titik $Q(4, 6, 3)$ dalam ruang dimensi tiga adalah...", opsi: ["3", "4", "5", "6"], kunci: "C" },
  { id: "SMA-M3-15", tipe: "BS", pertanyaan: "Suku tengah ($U_t$) dari suatu barisan aritmetika dengan banyak suku ganjil dihitung dengan rumus $U_t = \\frac{a + U_n}{2}$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M3-16", tipe: "MCMA", pertanyaan: "Pilihlah pernyataan yang BENAR tentang aturan sinus dan kosinus pada segitiga ABC:", opsi: ["$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$", "$a^2 = b^2 + c^2 - 2bc \\cos A$", "Luas $\\Delta ABC = \\frac{1}{2} ab \\sin C$", "$a^2 = b^2 + c^2 + 2bc \\cos A$"], kunci: ["A", "B", "C"] },
  { id: "SMA-M3-17", tipe: "PG", pertanyaan: "Modus dari data kelompok dapat ditentukan dengan rumus $Mo = Tb + \\left(\\frac{d_1}{d_1 + d_2}\\right) p$. Nilai $d_1$ adalah...", opsi: ["Frekuensi kelas modus", "Selisih frekuensi kelas modus dengan kelas sebelumnya", "Selisih frekuensi kelas modus dengan kelas sesudahnya", "Panjang kelas"], kunci: "B" },
  { id: "SMA-M3-18", tipe: "PG", pertanyaan: "Nilai dari $\\int (6x^2 - 4x + 3) \\, dx = \\dots$", opsi: ["$2x^3 - 2x^2 + 3x + C$", "$3x^3 - 2x^2 + 3x + C$", "$2x^3 - 4x^2 + 3x + C$", "$6x^3 - 2x^2 + 3x + C$"], kunci: "A" },
  { id: "SMA-M3-19", tipe: "BS", pertanyaan: "Jika dua peristiwa A dan B saling bebas (independen), maka $P(A \\cap B) = P(A) \\cdot P(B)$.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-M3-20", tipe: "MCMA", pertanyaan: "Sifat-sifat perkalian skalar dua vektor $\\vec{u}$ dan $\\vec{v}$ adalah...", opsi: ["$\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$ (komutatif)", "$\\vec{u} \\cdot (\\vec{v} + \\vec{w}) = \\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$ (distributif)", "$\\vec{u} \\cdot \\vec{u} = |\\vec{u}|^2$", "$\\vec{u} \\cdot \\vec{v} = -\\vec{v} \\cdot \\vec{u}$"], kunci: ["A", "B", "C"] }
];

export const soalSMA_BahasaInggrisA: Soal[] = [
  { id: "SMA-E1-01", tipe: "PG", pertanyaan: "Read the text:\n'Renewable energy sources such as solar and wind power are vital to mitigating the consequences of global climate change.'\nWhat is the main topic of the sentence?", opsi: ["Fossil fuels exploration", "The importance of renewable energy", "The history of wind turbines", "Industrial pollution"], kunci: "B" },
  { id: "SMA-E1-02", tipe: "PG", pertanyaan: "The word 'mitigating' in the context above is closest in meaning to...", opsi: ["Aggravating", "Alleviating / reducing", "Ignoring", "Multiplying"], kunci: "B" },
  { id: "SMA-E1-03", tipe: "BS", pertanyaan: "Solar and wind energy are classified as non-renewable energy sources.", opsi: ["BENAR", "SALAH"], kunci: "SALAH" },
  { id: "SMA-E1-04", tipe: "MCMA", pertanyaan: "Which of the following are examples of renewable energy sources mentioned in academic texts?", opsi: ["Geothermal power", "Hydroelectric energy", "Coal mining", "Biomass energy"], kunci: ["A", "B", "D"] },
  { id: "SMA-E1-05", tipe: "PG", pertanyaan: "'If I had studied harder for the entrance test, I ... accepted into the state university.'\nThe correct phrase to complete the conditional sentence is...", opsi: ["would be", "will be", "would have been", "had been"], kunci: "C" },
  { id: "SMA-E1-06", tipe: "PG", pertanyaan: "Identify the tone of an academic research abstract discussing economic disparity:", opsi: ["Humorous", "Objective and formal", "Aggressive", "Sarcastic"], kunci: "B" },
  { id: "SMA-E1-07", tipe: "BS", pertanyaan: "In English grammar, passive voice emphasizes the recipient or result of the action rather than the performer.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E1-08", tipe: "MCMA", pertanyaan: "Which sentences demonstrate correct subject-verb agreement?", opsi: ["The list of items is on the desk.", "Neither the teacher nor the students were present.", "The committee has reached its decision.", "A group of researchers are arriving tomorrow."], kunci: ["A", "B", "C"] },
  { id: "SMA-E1-09", tipe: "PG", pertanyaan: "'The sudden proliferation of artificial intelligence tools has reshaped modern education.'\nWhat is the synonym of 'proliferation'?", opsi: ["Decline", "Rapid growth / increase", "Destruction", "Postponement"], kunci: "B" },
  { id: "SMA-E1-10", tipe: "PG", pertanyaan: "Which conjunction expresses a contrast between two ideas?", opsi: ["Moreover", "Nevertheless", "Furthermore", "Consequently"], kunci: "B" },
  { id: "SMA-E1-11", tipe: "BS", pertanyaan: "The word 'unprecedented' refers to something that has never happened or existed before.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E1-12", tipe: "MCMA", pertanyaan: "Which of the following transition words signal cause and effect in an argumentative essay?", opsi: ["Therefore", "As a consequence", "However", "Because of this"], kunci: ["A", "B", "D"] },
  { id: "SMA-E1-13", tipe: "PG", pertanyaan: "'Despite ... tired after a long journey, the delegates attended the opening conference.'\nThe appropriate form to fill in the blank is...", opsi: ["being", "they were", "be", "been"], kunci: "A" },
  { id: "SMA-E1-14", tipe: "PG", pertanyaan: "What is the primary function of a topic sentence in an essay paragraph?", opsi: ["To provide concluding remarks", "To express the central controlling idea of the paragraph", "To introduce citations", "To list counterarguments"], kunci: "B" },
  { id: "SMA-E1-15", tipe: "BS", pertanyaan: "An antonym of the word 'scarce' is 'abundant'.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E1-16", tipe: "MCMA", pertanyaan: "Select the sentences written in grammatically correct passive voice:", opsi: ["The monument was inaugurated in 1965.", "Many discoveries were made during the expedition.", "He writes a letter yesterday.", "The results have been validated by the laboratory."], kunci: ["A", "B", "D"] },
  { id: "SMA-E1-17", tipe: "PG", pertanyaan: "'The novel, ... author won the Nobel prize, has been translated into dozens of languages.'", opsi: ["who", "whom", "whose", "which"], kunci: "C" },
  { id: "SMA-E1-18", tipe: "PG", pertanyaan: "Choose the correct indirect speech form of: 'She asked, \"Where do you live?\"'", opsi: ["She asked where did I live.", "She asked where I lived.", "She asked where do I live.", "She asked where had I lived."], kunci: "B" },
  { id: "SMA-E1-19", tipe: "BS", pertanyaan: "A thesis statement usually appears at the end of the introductory paragraph in academic writing.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E1-20", tipe: "MCMA", pertanyaan: "Which prefixes convey a negative or opposite meaning in English vocabulary?", opsi: ["Un- (e.g. uncertain)", "Dis- (e.g. disagree)", "Mis- (e.g. misunderstand)", "Re- (e.g. rewrite)"], kunci: ["A", "B", "C"] }
];

export const soalSMA_BahasaInggrisB: Soal[] = [
  { id: "SMA-E2-01", tipe: "PG", pertanyaan: "Read the excerpt:\n'Digital literacy involves not merely operating digital devices, but also critically evaluating online information.'\nWhat can be inferred from the text?", opsi: ["Digital literacy is only about hardware repair.", "Critical thinking is an essential component of digital literacy.", "Information on the internet is always trustworthy.", "Technology replaces human judgment."], kunci: "B" },
  { id: "SMA-E2-02", tipe: "PG", pertanyaan: "The word 'evaluating' is synonymous with...", opsi: ["Ignoring", "Assessing / analyzing", "Deleting", "Copying"], kunci: "B" },
  { id: "SMA-E2-03", tipe: "BS", pertanyaan: "The text implies that anyone who can turn on a computer is automatically fully digitally literate.", opsi: ["BENAR", "SALAH"], kunci: "SALAH" },
  { id: "SMA-E2-04", tipe: "MCMA", pertanyaan: "Which skills are related to critical information evaluation?", opsi: ["Checking author credentials and source credibility", "Cross-referencing multiple verifiable sources", "Sharing sensational headlines without reading", "Identifying logical fallacies and emotional bias"], kunci: ["A", "B", "D"] },
  { id: "SMA-E2-05", tipe: "PG", pertanyaan: "'Hardly ... the laboratory when the fire alarm sounded.'\nChoose the correct inversion structure:", opsi: ["he had entered", "had he entered", "did he entered", "he was entered"], kunci: "B" },
  { id: "SMA-E2-06", tipe: "PG", pertanyaan: "The word 'resilient' most closely describes someone or something that...", opsi: ["Breaks easily under pressure", "Recovers quickly from difficulties or setbacks", "Shows extreme anger", "Remains stubborn and uncooperative"], kunci: "B" },
  { id: "SMA-E2-07", tipe: "BS", pertanyaan: "In an exposition text, the 'thesis' section presents the writer's stance regarding the discussed topic.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E2-08", tipe: "MCMA", pertanyaan: "Which modal verbs can express possibility or probability?", opsi: ["May", "Might", "Could", "Must not"], kunci: ["A", "B", "C"] },
  { id: "SMA-E2-09", tipe: "PG", pertanyaan: "'She insisted that he ... present at the annual board symposium.'", opsi: ["is", "was", "be", "has been"], kunci: "C" },
  { id: "SMA-E2-10", tipe: "PG", pertanyaan: "What does the idiom 'once in a blue moon' mean?", opsi: ["Very frequently", "Very rarely", "During nighttime", "Regularly each month"], kunci: "B" },
  { id: "SMA-E2-11", tipe: "BS", pertanyaan: "The antonym of 'mandatory' is 'optional'.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E2-12", tipe: "MCMA", pertanyaan: "Which of the following are relative pronouns used in English complex sentences?", opsi: ["Which", "Whom", "Whose", "Because"], kunci: ["A", "B", "C"] },
  { id: "SMA-E2-13", tipe: "PG", pertanyaan: "'Not only the students but also the professor ... surprised by the test results.'", opsi: ["was", "were", "are", "have been"], kunci: "A" },
  { id: "SMA-E2-14", tipe: "PG", pertanyaan: "An author's purpose in writing a scientific report is predominantly to...", opsi: ["Entertain readers with fiction", "Inform and present factual empirical findings", "Persuade people to vote", "Criticize personal opponents"], kunci: "B" },
  { id: "SMA-E2-15", tipe: "BS", pertanyaan: "Gerunds always end in '-ing' and function as nouns in sentences.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E2-16", tipe: "MCMA", pertanyaan: "Which sentences contain a gerund functioning as the subject of the sentence?", opsi: ["Swimming is excellent cardiovascular exercise.", "Reading expands one's intellectual horizons.", "She is running in the park right now.", "Investing wisely requires financial knowledge."], kunci: ["A", "B", "D"] },
  { id: "SMA-E2-17", tipe: "PG", pertanyaan: "'By the time the symposium concludes tomorrow, Dr. Aris ... his keynote speech.'", opsi: ["will deliver", "will have delivered", "has delivered", "delivers"], kunci: "B" },
  { id: "SMA-E2-18", tipe: "PG", pertanyaan: "Which suffix converts an adjective into an abstract noun?", opsi: ["-ly", "-ness (e.g. dark -> darkness)", "-ed", "-ing"], kunci: "B" },
  { id: "SMA-E2-19", tipe: "BS", pertanyaan: "The phrase 'in a nutshell' is used to introduce a brief summary or conclusion.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E2-20", tipe: "MCMA", pertanyaan: "Select the synonyms for the word 'crucial':", opsi: ["Essential", "Vital", "Pivotal", "Trivial"], kunci: ["A", "B", "C"] }
];

export const soalSMA_BahasaInggrisC: Soal[] = [
  { id: "SMA-E3-01", tipe: "PG", pertanyaan: "Read the statement:\n'Biodiversity loss threatens the stability of natural ecosystems and compromises global food security.'\nThe main implication of biodiversity loss is...", opsi: ["Enhanced industrial output", "A threat to ecological balance and food supply", "Decrease in agricultural costs", "Expansion of clean energy"], kunci: "B" },
  { id: "SMA-E3-02", tipe: "PG", pertanyaan: "The word 'compromises' in the sentence above is closest in meaning to...", opsi: ["Endangers / undermines", "Settles peacefully", "Strengthens", "Expands"], kunci: "A" },
  { id: "SMA-E3-03", tipe: "BS", pertanyaan: "Preserving diverse species of flora and fauna helps sustain agricultural resilience.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E3-04", tipe: "MCMA", pertanyaan: "Factors contributing to biodiversity loss worldwide include...", opsi: ["Deforestation and habitat fragmentation", "Overfishing and poaching", "Renewable energy adoption", "Chemical pollution and pesticide runoff"], kunci: ["A", "B", "D"] },
  { id: "SMA-E3-05", tipe: "PG", pertanyaan: "'Had the committee known about the budget deficit, they ... the project.'", opsi: ["would postpone", "would have postponed", "will postpone", "postponed"], kunci: "B" },
  { id: "SMA-E3-06", tipe: "PG", pertanyaan: "Choose the word with the closest meaning to 'comprehensive':", opsi: ["Narrow", "Exhaustive / thorough", "Confusing", "Temporary"], kunci: "B" },
  { id: "SMA-E3-07", tipe: "BS", pertanyaan: "In academic reading, scanning is the technique used to locate specific facts or numbers quickly.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E3-08", tipe: "MCMA", pertanyaan: "Which reading techniques are commonly practiced in academic examinations?", opsi: ["Skimming for general gist", "Scanning for specific data", "Reading word-by-word with vocalization", "Critical evaluation of evidence"], kunci: ["A", "B", "D"] },
  { id: "SMA-E3-09", tipe: "PG", pertanyaan: "'The committee reached a consensus after hours of deliberations.'\n'Consensus' means...", opsi: ["Disagreement", "General agreement or concord", "Cancellation", "Financial penalty"], kunci: "B" },
  { id: "SMA-E3-10", tipe: "PG", pertanyaan: "Identify the sentence with correct parallel structure:", opsi: ["She likes hiking, swimming, and to ride bicycles.", "She likes hiking, swimming, and cycling.", "She likes to hike, swimming, and bicycle.", "She likes hiking, to swim, and cycling."], kunci: "B" },
  { id: "SMA-E3-11", tipe: "BS", pertanyaan: "The word 'ambiguous' describes a statement that has multiple possible interpretations or lacks clarity.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E3-12", tipe: "MCMA", pertanyaan: "Which words are antonyms of 'perpetual'?", opsi: ["Transient", "Fleeting", "Temporary", "Endless"], kunci: ["A", "B", "C"] },
  { id: "SMA-E3-13", tipe: "PG", pertanyaan: "'The government implemented strict measures with a view to ... inflation.'", opsi: ["curb", "curbing", "curbed", "have curbed"], kunci: "B" },
  { id: "SMA-E3-14", tipe: "PG", pertanyaan: "What is the primary characteristic of an argumentative essay?", opsi: ["Narrating a chronological adventure", "Defending a claim using evidence and logic", "Instructing how to cook a recipe", "Describing visual sensations in poetry"], kunci: "B" },
  { id: "SMA-E3-15", tipe: "BS", pertanyaan: "A conclusion in an essay should introduce completely brand-new arguments never discussed in the body paragraphs.", opsi: ["BENAR", "SALAH"], kunci: "SALAH" },
  { id: "SMA-E3-16", tipe: "MCMA", pertanyaan: "Which rhetorical devices are used to strengthen an academic argument?", opsi: ["Empirical statistics and studies", "Expert testimonials and peer-reviewed quotes", "Unverified rumors and gossip", "Counterargument refutations"], kunci: ["A", "B", "D"] },
  { id: "SMA-E3-17", tipe: "PG", pertanyaan: "'The novel was so captivating ... she finished reading it in one sitting.'", opsi: ["as", "that", "than", "so"], kunci: "B" },
  { id: "SMA-E3-18", tipe: "PG", pertanyaan: "Choose the sentence that correctly uses the subjunctive mood:", opsi: ["I suggest that she takes the exam early.", "I suggest that she take the exam early.", "I suggest that she took the exam early.", "I suggest that she will take the exam early."], kunci: "B" },
  { id: "SMA-E3-19", tipe: "BS", pertanyaan: "The idiom 'burn the midnight oil' means to study or work late into the night.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "SMA-E3-20", tipe: "MCMA", pertanyaan: "Which of the following are common coordinating conjunctions represented by the acronym FANBOYS?", opsi: ["For", "And", "Nor", "Because", "Yet"], kunci: ["A", "B", "C", "E"] }
];
