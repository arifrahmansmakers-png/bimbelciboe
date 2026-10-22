import {
  soalSD_Matematika1,
  soalSD_Matematika2,
  soalSD_Matematika3,
  soalSD_BahasaIndonesia1,
  soalSD_BahasaIndonesia2,
  soalSD_BahasaIndonesia3,
} from "./soal_sd";

import {
  soalSMP_Matematika1,
  soalSMP_Matematika2,
  soalSMP_Matematika3,
  soalSMP_BahasaIndonesia1,
  soalSMP_BahasaIndonesia2,
  soalSMP_BahasaIndonesia3,
} from "./soal_smp";

import {
  soalSMA_Matematika1,
  soalSMA_Matematika2,
  soalSMA_Matematika3,
  soalSMA_BahasaInggrisA,
  soalSMA_BahasaInggrisB,
  soalSMA_BahasaInggrisC,
} from "./soal_sma_wajib";

import {
  soalSMA_MatematikaTL,
  soalSMA_Fisika,
  soalSMA_Kimia,
  soalSMA_Biologi,
  soalSMA_Ekonomi,
  soalSMA_Sosiologi,
} from "./soal_sma_pilihan";

import {
  soalSMA_Geografi,
  soalSMA_Sejarah,
  soalSMA_Informatika,
  soalSMA_PPKn,
  soalSMA_BahasaIndonesiaTL,
  soalSMA_BahasaInggrisTL,
  soalSMA_Antropologi,
} from "./soal_sma_pilihan_ekstra";

export interface Soal {
  id: string;
  tipe: "PG" | "MCMA" | "BS" | "Isian" | "TabelBS";
  pertanyaan: string;
  opsi?: string[];
  kunci: string | string[];
}

export const bobotSoal = {
  PG: 2,
  MCMA: 5,
  BS: 3,
  Isian: 8,
};

// Durasi ujian per mapel (dalam detik, default 3600 = 60 menit)
export const durasiUjian: Record<string, Record<string, number>> = {
  "SD/MI": {
    "Matematika 1": 3600,
    "Matematika 2": 3600,
    "Matematika 3": 3600,
    "Bahasa Indonesia 1": 3600,
    "Bahasa Indonesia 2": 3600,
    "Bahasa Indonesia 3": 3600,
  },
  "SMP/MTs": {
    "Matematika 1": 3600,
    "Matematika 2": 3600,
    "Matematika 3": 3600,
    "Bahasa Indonesia 1": 3600,
    "Bahasa Indonesia 2": 3600,
    "Bahasa Indonesia 3": 3600,
  },
  "SMA_Wajib": {
    "Matematika 1": 3600,
    "Matematika 2": 3600,
    "Matematika 3": 3600,
    "Bahasa Indonesia 1": 3600,
    "Bahasa Indonesia 2": 3600,
    "Bahasa Indonesia 3": 3600,
    "Bahasa Inggris A": 3600,
    "Bahasa Inggris B": 3600,
    "Bahasa Inggris C": 3600,
  },
  "SMA_Pilihan": {
    "Matematika TL": 3600,
    "B. Indonesia TL": 3600,
    "B. Inggris TL": 3600,
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
  },
};

// Soal SMA Bahasa Indonesia (20 Soal per paket dengan PG, MCMA, BS, TabelBS)
export const soalSMA_BahasaIndonesia1: Soal[] = [
  { id: "BI01", tipe: "PG", pertanyaan: "Portal Computer Based Test (CBT) di sekolah memicu efisiensi administrasi. Guru berperan sebagai fasilitator utama.\nApa peran guru menurut teks?", opsi: ["Administrator", "Fasilitator", "Pengembang", "Pengawas"], kunci: "B" },
  { id: "BI02", tipe: "PG", pertanyaan: "Portal Computer Based Test (CBT) di sekolah memicu efisiensi administrasi. Guru berperan sebagai fasilitator utama.\nKata serapan asing dalam teks adalah...", opsi: ["Guru", "Portal", "Sekolah", "Utama"], kunci: "B" },
  { id: "BI03", tipe: "BS", pertanyaan: "Portal Computer Based Test (CBT) di sekolah memicu efisiensi administrasi. Guru berperan sebagai fasilitator utama.\nCBT otomatis menghilangkan peran guru secara keseluruhan.", opsi: ["BENAR", "SALAH"], kunci: "SALAH" },
  { id: "BI04", tipe: "MCMA", pertanyaan: "Tujuan utama pemanfaatan sistem Computer Based Test (CBT) adalah...", opsi: ["Efisiensi pengolahan nilai", "Modernisasi asesmen", "Mempersulit evaluasi guru", "Menghemat penggunaan kertas"], kunci: ["A", "B", "D"] },
  { id: "BI05", tipe: "PG", pertanyaan: "Kurikulum Merdeka berfokus pada pemahaman konsep esensial. Siswa lebih kritis dalam memecahkan masalah daripada sekadar menghafal rumus.\nIde pokok teks tersebut adalah...", opsi: ["Cara menghafal cepat", "Fokus penguasaan konsep kurikulum", "Masalah siswa di kelas", "Jumlah mata pelajaran"], kunci: "B" },
  { id: "BI06", tipe: "PG", pertanyaan: "Apa makna kata 'kritis' dalam konteks literasi berpikir pada teks di atas?", opsi: ["Genting/bahaya", "Tajam dan analitis dalam menimbang keputusan", "Banyak mengeluh", "Lambat merespons"], kunci: "B" },
  { id: "BI07", tipe: "BS", pertanyaan: "Model asesmen modern menuntut siswa menguasai logika berpikir daripada sekadar menghafal teks secara mentah.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "BI08", tipe: "MCMA", pertanyaan: "Karakteristik profil pelajar pembelajar sepanjang hayat antara lain...", opsi: ["Bernalar kritis", "Kreatif dan adaptif", "Pasif menunggu arahan", "Mampu bergotong royong"], kunci: ["A", "B", "D"] },
  { id: "BI09", tipe: "PG", pertanyaan: "Kesenjangan akses jaringan internet di wilayah pelosok 3T menghambat pemerataan digitalisasi pendidikan.\nIsu yang diangkat dalam kutipan adalah...", opsi: ["Kemajuan kecerdasan buatan", "Ketimpangan infrastruktur digital", "Mahalnya tarif listrik", "Jadwal libur semester"], kunci: "B" },
  { id: "BI10", tipe: "MCMA", pertanyaan: "Dampak kesenjangan akses internet bagi mutu pendidikan nasional antara lain...", opsi: ["Informasi akademik lambat terdistribusi", "Kualitas capaian belajar antarwilayah menjadi tidak setara", "Semua sekolah otomatis unggul", "Peluang pelatihan guru menjadi terbatas"], kunci: ["A", "B", "D"] },
  { id: "BI11", tipe: "BS", pertanyaan: "Transformasi pendidikan berbasis teknologi dapat terlaksana maksimal tanpa memerlukan kesiapan infrastruktur listrik dan jaringan.", opsi: ["BENAR", "SALAH"], kunci: "SALAH" },
  { id: "BI12", tipe: "PG", pertanyaan: "Prediksi logis jika pemerataan infrastruktur digital tercapai di semua pulau adalah...", opsi: ["Kesenjangan mutu pendidikan antarwilayah dapat dipersempit", "Biaya sekolah menjadi naik drastis", "Jumlah guru berkurang", "Akses buku cetak dilarang"], kunci: "A" },
  { id: "BI13", tipe: "PG", pertanyaan: "'Di balik pendaran piksel layar gawai, ada cita-cita yang diperjuangkan anak negeri hingga larut malam.'\nSuasana yang paling dominan dalam kutipan kalimat tersebut adalah...", opsi: ["Penuh ketakutan", "Semangat kegigihan dan optimisme", "Kekecewaan mendalam", "Kemarahan"], kunci: "B" },
  { id: "BI14", tipe: "PG", pertanyaan: "Makna kata kiasan 'pendaran piksel' dalam kalimat tersebut merujuk pada...", opsi: ["Lampu jalan", "Layar monitor perangkat digital", "Sinar matahari", "Bintang malam"], kunci: "B" },
  { id: "BI15", tipe: "BS", pertanyaan: "Diksi bermakna konotatif sering digunakan dalam karya sastra untuk memperkuat kesan estetis dan emosional pembaca.", opsi: ["BENAR", "SALAH"], kunci: "BENAR" },
  { id: "BI16", tipe: "MCMA", pertanyaan: "Nilai-nilai karakter yang tercermin dalam kegigihan belajar antara lain...", opsi: ["Pantang menyerah", "Disiplin mengatur waktu", "Cepat putus asa saat soal sulit", "Rasa ingin tahu yang tinggi"], kunci: ["A", "B", "D"] },
  { id: "BI17", tipe: "PG", pertanyaan: "Dalam alur penelitian ilmiah, tahap interpretasi data bertujuan untuk...", opsi: ["Mengumpulkan kuesioner", "Menganalisis dan menyimpulkan temuan berdasarkan bukti empiris", "Mencetak buku", "Membeli perlengkapan lab"], kunci: "B" },
  { id: "BI18", tipe: "TabelBS", pertanyaan: "Perhatikan pernyataan tentang penulisan karya ilmiah berikut dan tentukan statusnya:", opsi: [
    "Daftar pustaka memuat semua referensi rujukan yang dikutip dalam naskah.",
    "Abstrak ditulis panjang lebar minimal 10 halaman.",
    "Rumusan masalah disusun dalam bentuk kalimat tanya."
  ], kunci: ["Benar", "Salah", "Benar"] },
  { id: "BI19", tipe: "MCMA", pertanyaan: "Urutan tahapan metode ilmiah yang benar secara berkesinambungan mencakup...", opsi: ["Merumuskan masalah", "Menyusun hipotesis", "Melakukan eksperimen/pengujian", "Menarik kesimpulan"], kunci: ["A", "B", "C", "D"] },
  { id: "BI20", tipe: "PG", pertanyaan: "Teks yang menyajikan argumentasi dua sudut pandang berbeda (pro dan kontra) secara berimbang dinamakan teks...", opsi: ["Diskusi", "Anekdot", "Deskripsi", "Biografi"], kunci: "A" }
];

export const soalSMA_BahasaIndonesia2: Soal[] = [
  ...soalSMA_BahasaIndonesia1.map((s, idx) => ({
    ...s,
    id: `BI2-${String(idx + 1).padStart(2, "0")}`,
  }))
];

export const soalSMA_BahasaIndonesia3: Soal[] = [
  ...soalSMA_BahasaIndonesia1.map((s, idx) => ({
    ...s,
    id: `BI3-${String(idx + 1).padStart(2, "0")}`,
  }))
];

// BANK SOAL TERINTEGRASI (Setiap mapel memiliki 20 butir soal lengkap)
export const bankSoal: Record<string, Record<string, Soal[]>> = {
  // Jenjang SD/MI
  "SD/MI": {
    "Matematika 1": soalSD_Matematika1,
    "Matematika 2": soalSD_Matematika2,
    "Matematika 3": soalSD_Matematika3,
    "Bahasa Indonesia 1": soalSD_BahasaIndonesia1,
    "Bahasa Indonesia 2": soalSD_BahasaIndonesia2,
    "Bahasa Indonesia 3": soalSD_BahasaIndonesia3,
  },

  // Jenjang SMP/MTs
  "SMP/MTs": {
    "Matematika 1": soalSMP_Matematika1,
    "Matematika 2": soalSMP_Matematika2,
    "Matematika 3": soalSMP_Matematika3,
    "Bahasa Indonesia 1": soalSMP_BahasaIndonesia1,
    "Bahasa Indonesia 2": soalSMP_BahasaIndonesia2,
    "Bahasa Indonesia 3": soalSMP_BahasaIndonesia3,
  },

  // Jenjang SMA Wajib
  "SMA_Wajib": {
    "Matematika 1": soalSMA_Matematika1,
    "Matematika 2": soalSMA_Matematika2,
    "Matematika 3": soalSMA_Matematika3,
    "Bahasa Indonesia 1": soalSMA_BahasaIndonesia1,
    "Bahasa Indonesia 2": soalSMA_BahasaIndonesia2,
    "Bahasa Indonesia 3": soalSMA_BahasaIndonesia3,
    "Bahasa Inggris A": soalSMA_BahasaInggrisA,
    "Bahasa Inggris B": soalSMA_BahasaInggrisB,
    "Bahasa Inggris C": soalSMA_BahasaInggrisC,
  },

  // Jenjang SMA Pilihan
  "SMA_Pilihan": {
    "Matematika TL": soalSMA_MatematikaTL,
    "B. Indonesia TL": soalSMA_BahasaIndonesiaTL,
    "B. Inggris TL": soalSMA_BahasaInggrisTL,
    "Fisika": soalSMA_Fisika,
    "Kimia": soalSMA_Kimia,
    "Biologi": soalSMA_Biologi,
    "Informatika": soalSMA_Informatika,
    "Ekonomi": soalSMA_Ekonomi,
    "Sosiologi": soalSMA_Sosiologi,
    "Geografi": soalSMA_Geografi,
    "Sejarah": soalSMA_Sejarah,
    "Antropologi": soalSMA_Antropologi,
    "PPKn": soalSMA_PPKn,
  },
};
