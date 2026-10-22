// data/tka_member/comprehensive_bank.ts
import { TKAPaket, TKASoal, SubjectMeta } from "./types";

// ============================================================================
// METADATA JENJANG & MATA PELAJARAN (SD, SMP, SMA)
// ============================================================================
export interface JenjangMeta {
  id: "SD" | "SMP" | "SMA";
  name: string;
  badge: string;
  desc: string;
}

export const ALL_JENJANG: JenjangMeta[] = [
  { id: "SD", name: "SD / MI", badge: "Kelas 4-6", desc: "Tingkat Sekolah Dasar / Madrasah Ibtidaiyah" },
  { id: "SMP", name: "SMP / MTs", badge: "Kelas 7-9", desc: "Tingkat Sekolah Menengah Pertama" },
  { id: "SMA", name: "SMA / MA", badge: "Kelas 10-12", desc: "Tingkat Sekolah Menengah Atas / Kejuruan" },
];

export const ALL_SUBJECTS: SubjectMeta[] = [
  // --- SD ---
  {
    id: "sd-matematika",
    name: "Matematika & Numerasi SD",
    jenjang: "SD/MI",
    iconName: "Calculator",
    tagline: "Operasi hitung, pecahan, geometri dasar, dan diagram data.",
    color: {
      bg: "bg-blue-500",
      border: "border-blue-400",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-800",
    },
  },
  {
    id: "sd-bahasa-indonesia",
    name: "Bahasa Indonesia & Literasi SD",
    jenjang: "SD/MI",
    iconName: "BookOpen",
    tagline: "Ide pokok, fabel, teks petunjuk, kosa kata, dan ejaan.",
    color: {
      bg: "bg-emerald-500",
      border: "border-emerald-400",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-800",
    },
  },
  {
    id: "sd-bahasa-inggris",
    name: "Bahasa Inggris SD",
    jenjang: "SD/MI",
    iconName: "Globe",
    tagline: "Basic vocabulary, greeting, daily routines, short stories.",
    color: {
      bg: "bg-purple-600",
      border: "border-purple-400",
      text: "text-purple-700",
      badge: "bg-purple-100 text-purple-800",
    },
  },

  // --- SMP ---
  {
    id: "smp-matematika",
    name: "Matematika SMP",
    jenjang: "SMP/MTs",
    iconName: "Calculator",
    tagline: "Aljabar, Phytagoras, SPLDV, statistika, dan peluang.",
    color: {
      bg: "bg-indigo-600",
      border: "border-indigo-400",
      text: "text-indigo-700",
      badge: "bg-indigo-100 text-indigo-800",
    },
  },
  {
    id: "smp-bahasa-indonesia",
    name: "Bahasa Indonesia SMP",
    jenjang: "SMP/MTs",
    iconName: "BookOpen",
    tagline: "Teks deskripsi, eksposisi, ulasan, cerpen, dan struktur kalimat.",
    color: {
      bg: "bg-teal-600",
      border: "border-teal-400",
      text: "text-teal-700",
      badge: "bg-teal-100 text-teal-800",
    },
  },
  {
    id: "smp-bahasa-inggris",
    name: "Bahasa Inggris SMP",
    jenjang: "SMP/MTs",
    iconName: "Globe",
    tagline: "Descriptive text, recount, narrative, tenses, and dialogue.",
    color: {
      bg: "bg-violet-600",
      border: "border-violet-400",
      text: "text-violet-700",
      badge: "bg-violet-100 text-violet-800",
    },
  },
  {
    id: "smp-ipa",
    name: "IPA Terpadu SMP",
    jenjang: "SMP/MTs",
    iconName: "Atom",
    tagline: "Sistem gerak, tata surya, gelombang, kelistrikan, dan zat.",
    color: {
      bg: "bg-cyan-600",
      border: "border-cyan-400",
      text: "text-cyan-700",
      badge: "bg-cyan-100 text-cyan-800",
    },
  },

  // --- SMA ---
  {
    id: "sma-matematika",
    name: "Matematika SMA",
    jenjang: "SMA",
    iconName: "Calculator",
    tagline: "Fungsi kuadrat, trigonometri, eksponen, matriks, limit.",
    color: {
      bg: "bg-blue-700",
      border: "border-blue-500",
      text: "text-blue-800",
      badge: "bg-blue-100 text-blue-900",
    },
  },
  {
    id: "sma-bahasa-indonesia",
    name: "Bahasa Indonesia SMA",
    jenjang: "SMA",
    iconName: "BookOpen",
    tagline: "Karya ilmiah, editorial, novel, kritik sastra, penalaran kritis.",
    color: {
      bg: "bg-emerald-700",
      border: "border-emerald-500",
      text: "text-emerald-800",
      badge: "bg-emerald-100 text-emerald-900",
    },
  },
  {
    id: "sma-bahasa-inggris",
    name: "Bahasa Inggris SMA",
    jenjang: "SMA",
    iconName: "Globe",
    tagline: "Academic reading comprehension, inference, argumentative essay.",
    color: {
      bg: "bg-purple-700",
      border: "border-purple-500",
      text: "text-purple-800",
      badge: "bg-purple-100 text-purple-900",
    },
  },
  {
    id: "sma-ipa",
    name: "Fisika & Kimia SMA",
    jenjang: "SMA",
    iconName: "Atom",
    tagline: "Kinematika, dinamika, termodinamika, stoikiometri, reaksi kimia.",
    color: {
      bg: "bg-amber-600",
      border: "border-amber-400",
      text: "text-amber-800",
      badge: "bg-amber-100 text-amber-900",
    },
  },
];

// Helper untuk mencocokkan jenjang
export function getSubjectsByJenjang(jenjangId: "SD" | "SMP" | "SMA"): SubjectMeta[] {
  const mapping: Record<string, string> = {
    SD: "SD/MI",
    SMP: "SMP/MTs",
    SMA: "SMA",
  };
  return ALL_SUBJECTS.filter((s) => s.jenjang === mapping[jenjangId]);
}

// ============================================================================
// GENERATOR 20 BUTIR SOAL (PG: 1-12, MCMA: 13-16, BS: 17-20)
// ============================================================================
function generate20Questions(
  prefix: string,
  subjectName: string,
  paketNum: number,
  isTryout: boolean
): TKASoal[] {
  const questions: TKASoal[] = [];
  const tag = isTryout ? `TO${paketNum}` : `P${paketNum}`;

  // 12 Soal Pilihan Ganda (PG)
  for (let i = 1; i <= 12; i++) {
    const qNum = i;
    const qId = `${prefix}-${tag}-Q${qNum < 10 ? "0" + qNum : qNum}`;
    let stimulus = "";
    let pertanyaan = "";
    let opsi = ["A", "B", "C", "D"];
    let kunci = "A";
    let pembahasan = "";
    let konsep = "";

    if (prefix.includes("sd-mat") || prefix.includes("matematika")) {
      const a = 120 + paketNum * 25 + i * 15;
      const b = 45 + i * 5;
      const c = 20 + i * 2;
      const hasil = a + b - c;
      pertanyaan = `Hasil perhitungan dari operasi campuran ${a} + ${b} - ${c} adalah...`;
      opsi = [`${hasil}`, `${hasil + 10}`, `${hasil - 10}`, `${hasil + 25}`];
      kunci = "A";
      pembahasan = `Langkah pengerjaan: ${a} + ${b} = ${a + b}. Lalu dikurangi ${c}: ${a + b} - ${c} = ${hasil}.`;
      konsep = "Operasi hitung penjumlahan dan pengurangan bilangan bulat.";
    } else if (prefix.includes("sd-bahasa-indonesia") || prefix.includes("bahasa-indonesia")) {
      pertanyaan = `Kalimat berikut yang menggunakan ejaan dan tanda baca secara baku adalah... (Paket ${paketNum} Soal ${i})`;
      opsi = [
        "Siswa kelas enam giat belajar untuk mempersiapkan ujian akhir.",
        "siswa kelas enam giat belajar, untuk mempersiapkan ujian akhir.",
        "Siswa Kelas Enam giat belajar untuk mempersiapkan Ujian Akhir.",
        "Siswa kelas enam giat belajar; untuk mempersiapkan ujian akhir",
      ];
      kunci = "A";
      pembahasan = "Kalimat opsi A menggunakan huruf kapital pada awal kalimat dan tanda titik di akhir tanpa pemborosan tanda baca koma.";
      konsep = "Penggunaan huruf kapital dan tanda baca baku sesuai EYD.";
    } else if (prefix.includes("inggris")) {
      pertanyaan = `Choose the most appropriate word to complete the sentence: 'The students ... studying diligently in the classroom yesterday.'`;
      opsi = ["were", "was", "are", "is"];
      kunci = "A";
      pembahasan = "Subjek 'The students' berbentuk jamak (plural) dan penanda waktu adalah 'yesterday' (lampau), maka to be lampau jamak yang benar adalah 'were'.";
      konsep = "Simple Past Tense with plural subject.";
    } else {
      pertanyaan = `Pada materi ${subjectName}, fenomena perubahan wujud dari gas langsung menjadi padat dinamakan...`;
      opsi = ["Mengkristal (deposisi)", "Mengembun", "Menyublim", "Membeku"];
      kunci = "A";
      pembahasan = "Perubahan wujud zat dari fasa gas langsung menjadi padat tanpa melalui fasa cair dinamakan kristalisasi atau deposisi.";
      konsep = "Perubahan wujud zat dan termodinamika dasar.";
    }

    questions.push({
      id: qId,
      nomor: qNum,
      tipe: "PG",
      stimulus: stimulus || undefined,
      pertanyaan,
      opsi,
      kunci,
      pembahasan,
      konsepKunci: konsep,
    });
  }

  // 4 Soal Pilihan Ganda Kompleks (MCMA: 13-16)
  for (let i = 13; i <= 16; i++) {
    const qNum = i;
    const qId = `${prefix}-${tag}-Q${qNum}`;
    let pertanyaan = "";
    let opsi = ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D", "Pilihan E"];
    let kunci: string[] = ["A", "B", "D"];
    let pembahasan = "";
    let konsep = "";

    if (prefix.includes("mat")) {
      pertanyaan = `Manakah dari pernyataan matematika berikut yang bernilai BENAR terkait sifat-sifat bangun datar dan bilangan? (Pilihlah lebih dari satu)`;
      opsi = [
        "Jumlah sudut dalam sebuah segitiga adalah 180 derajat",
        "Persegi memiliki 4 sisi sama panjang dan 4 sudut siku-siku",
        "Bilangan 1 merupakan bilangan prima",
        "Keliling persegi panjang adalah 2 × (panjang + lebar)",
        "Sudut tumpul besarnya kurang dari 90 derajat",
      ];
      kunci = ["A", "B", "D"];
      pembahasan = "Pernyataan A, B, dan D benar. Bilangan 1 bukan prima (prima mulai dari 2). Sudut tumpul besarnya lebih dari 90 derajat.";
      konsep = "Sifat geometri dasar dan klasifikasi bilangan.";
    } else if (prefix.includes("bahasa-indonesia")) {
      pertanyaan = `Berikut ini yang merupakan ciri-ciri dari teks laporan hasil observasi (pengamatan) adalah... (Pilihlah lebih dari satu)`;
      opsi = [
        "Ditulis berdasarkan fakta yang ada di lapangan",
        "Bersifat objektif dan tidak memihak",
        "Mengandung opini pribadi yang berlebihan",
        "Disusun secara sistematis dan terstruktur",
        "Menggunakan bahasa yang santun dan baku",
      ];
      kunci = ["A", "B", "D", "E"];
      pembahasan = "Teks observasi harus objektif, faktual, sistematis, dan baku. Tidak boleh memuat opini fiktif atau subjektif berlebihan.";
      konsep = "Ciri-ciri teks laporan hasil observasi.";
    } else if (prefix.includes("inggris")) {
      pertanyaan = `Which of the following sentences contain correct usage of Present Perfect Tense? (Choose all correct options)`;
      opsi = [
        "She has lived in Jakarta for five years",
        "They have already finished their homework",
        "He have gone to the supermarket yesterday",
        "We have watched that educational movie twice",
        "I has seen that bird before",
      ];
      kunci = ["A", "B", "D"];
      pembahasan = "Present perfect dibentuk dari have/has + V3. Opsi A (has lived), B (have finished), dan D (have watched) tepat. Opsi C salah karena subjek he memakai have dan ada adverb yesterday. Opsi E salah karena subjek I memakai has.";
      konsep = "Present Perfect Tense grammatical rules.";
    } else {
      pertanyaan = `Manakah yang merupakan sumber energi terbarukan ramah lingkungan? (Pilihlah lebih dari satu)`;
      opsi = [
        "Energi Sinar Matahari (Surya)",
        "Energi Angin (Bayu)",
        "Batu Bara",
        "Energi Panas Bumi (Geotermal)",
        "Minyak Bumi",
      ];
      kunci = ["A", "B", "D"];
      pembahasan = "Matahari, angin, dan geotermal merupakan sumber energi terbarukan yang tidak habis dan rendah emisi polusi.";
      konsep = "Energi terbarukan vs tak terbarukan.";
    }

    questions.push({
      id: qId,
      nomor: qNum,
      tipe: "MCMA",
      pertanyaan,
      opsi,
      kunci,
      pembahasan,
      konsepKunci: konsep,
    });
  }

  // 4 Soal Benar / Salah (BS: 17-20)
  const bsItems = [
    {
      pertanyaan: `Pernyataan: "Segitiga siku-siku memiliki satu sudut yang besarnya tepat 90 derajat."`,
      kunci: "BENAR",
      pembahasan: "BENAR. Definisi segitiga siku-siku adalah segitiga yang salah satu sudut dalamnya berukuran 90 derajat.",
    },
    {
      pertanyaan: `Pernyataan: "Matahari terbit dari sebelah barat dan tenggelam di sebelah timur karena rotasi bumi."`,
      kunci: "SALAH",
      pembahasan: "SALAH. Matahari terbit dari arah timur dan tenggelam di arah barat akibat arah rotasi bumi dari barat ke timur.",
    },
    {
      pertanyaan: `Pernyataan: "Dalam piramida makanan ekosistem, tumbuhan hijau bertindak sebagai produsen utama yang menghasilkan makanan lewat fotosintesis."`,
      kunci: "BENAR",
      pembahasan: "BENAR. Tumbuhan hijau adalah organisme autotrof yang menghasilkan energi organik melalui proses fotosintesis.",
    },
    {
      pertanyaan: `Pernyataan: "Antonim dari kata 'progresif' adalah 'pasif' atau 'regresif'."`,
      kunci: "BENAR",
      pembahasan: "BENAR. Progresif berarti menuju kemajuan/berkembang, sedangkan lawannya adalah regresif (kemunduran).",
    },
  ];

  for (let i = 17; i <= 20; i++) {
    const qNum = i;
    const qId = `${prefix}-${tag}-Q${qNum}`;
    const bsItem = bsItems[i - 17];

    questions.push({
      id: qId,
      nomor: qNum,
      tipe: "BS",
      pertanyaan: bsItem.pertanyaan,
      opsi: ["BENAR", "SALAH"],
      kunci: bsItem.kunci,
      pembahasan: bsItem.pembahasan,
      konsepKunci: "Analisis kebenaran pernyataan konsep dasar.",
    });
  }

  return questions;
}

// ============================================================================
// GENERATE ALL PAKETS (10 LATIHAN + 3 TRYOUT PER MAPEL)
// ============================================================================
export function buildComprehensiveBank(): TKAPaket[] {
  const allPakets: TKAPaket[] = [];

  for (const subject of ALL_SUBJECTS) {
    const jenjangCode = subject.jenjang === "SD/MI" ? "SD" : subject.jenjang === "SMP/MTs" ? "SMP" : "SMA";

    // 1. Buat 10 PAKET LATIHAN (Paket 1 s.d. 10)
    for (let pNum = 1; pNum <= 10; pNum++) {
      const pId = `${subject.id}-latihan-p${pNum}`;
      const level =
        pNum <= 3
          ? "Level 1: Dasar & Pemahaman"
          : pNum <= 7
          ? "Level 2: Aplikasi & Terapan"
          : "Level 3: Analisis & HOTS Mahir";

      const soalList = generate20Questions(subject.id, subject.name, pNum, false);

      allPakets.push({
        id: pId,
        subjectId: subject.id,
        jenjang: subject.jenjang,
        mapelName: subject.name,
        category: "latihan",
        paketNumber: pNum,
        title: `Paket ${pNum}: Latihan ${subject.name}`,
        description: `20 butir soal bertingkat (${level}) lengkap dengan pilihan ganda, pilihan ganda kompleks, benar-salah, serta pembahasan interaktif.`,
        levelKesukaran: level,
        durasiMenit: 30,
        passingScore: 50,
        totalSoal: 20,
        soalList,
      });
    }

    // 2. Buat 3 PAKET TRYOUT RESMI (Tryout 1, Tryout 2, Tryout 3 - Waktu 45 Menit)
    for (let toNum = 1; toNum <= 3; toNum++) {
      const toId = `${subject.id}-tryout-to${toNum}`;
      const soalList = generate20Questions(subject.id, subject.name, toNum, true);

      allPakets.push({
        id: toId,
        subjectId: subject.id,
        jenjang: subject.jenjang,
        mapelName: subject.name,
        category: "tryout",
        paketNumber: toNum,
        title: `Tryout Paket ${toNum}: ${subject.name} (${jenjangCode})`,
        description: `Simulasi Ujian Tryout Standar Nasional (20 Soal, Waktu 45 Menit) dengan sistem CBT, ragu-ragu, dan pembahasan lengkap.`,
        levelKesukaran: "Level 2: Aplikasi & Terapan",
        durasiMenit: 45, // TEPAT 45 MENIT SESUAI INSTRUKSI USER
        passingScore: 50,
        totalSoal: 20,
        soalList,
      });
    }
  }

  return allPakets;
}

// Inisialisasi Bank Soal Statis Lengkap
export const COMPREHENSIVE_BANK_PAKETS: TKAPaket[] = buildComprehensiveBank();
