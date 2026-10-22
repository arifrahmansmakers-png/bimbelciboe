"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Search,
  RotateCcw,
  X,
  Layers,
  Sparkles,
  HelpCircle,
  Clock,
  Target,
  Award,
  ChevronRight,
  Filter,
  GraduationCap,
  Calculator,
  Globe,
  Atom,
} from "lucide-react";
import {
  getAllCustomPakets,
  getCustomPaketsBySubject,
  addCustomSoal,
  updateCustomSoal,
  deleteCustomSoal,
  moveCustomSoal,
  addCustomPaket,
  deleteCustomPaket,
  resetCustomPaketsToDefault,
} from "@/data/tka_member/store";
import {
  ALL_JENJANG,
  ALL_SUBJECTS,
  getSubjectsByJenjang,
  TKAPaket,
  TKASoal,
  TipeSoalTKA,
} from "@/data/tka_member";

export default function AdminSoalPage() {
  // STEP 1: Pilih Jenjang
  const [selectedJenjang, setSelectedJenjang] = useState<"SD" | "SMP" | "SMA">("SD");

  // STEP 2: Pilih Mapel (difilter berdasarkan jenjang)
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("sd-matematika");

  // STEP 3: Pilih Kategori & Paket
  const [selectedCategory, setSelectedCategory] = useState<"latihan" | "tryout">("latihan");
  const [selectedPaketId, setSelectedPaketId] = useState<string>("");

  // Search keyword di dalam butir soal
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Bank Data dari Store
  const [allPakets, setAllPakets] = useState<TKAPaket[]>([]);
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal States
  const [showAddPaketModal, setShowAddPaketModal] = useState(false);
  const [showSoalModal, setShowSoalModal] = useState(false);
  const [soalModalMode, setSoalModalMode] = useState<"add" | "edit">("add");
  const [editingSoalId, setEditingSoalId] = useState<string | null>(null);

  // Modal Pindah Soal
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [movingSoalId, setMovingSoalId] = useState<string | null>(null);
  const [targetPaketId, setTargetPaketId] = useState<string>("");

  // Form State Soal
  const [formTipe, setFormTipe] = useState<TipeSoalTKA>("PG");
  const [formStimulus, setFormStimulus] = useState<string>("");
  const [formPertanyaan, setFormPertanyaan] = useState<string>("");
  const [formOpsi, setFormOpsi] = useState<string[]>(["", "", "", ""]);
  const [formKunciPG, setFormKunciPG] = useState<string>("A");
  const [formKunciMCMA, setFormKunciMCMA] = useState<string[]>(["A"]);
  const [formKunciBS, setFormKunciBS] = useState<string>("BENAR");
  const [formPembahasan, setFormPembahasan] = useState<string>("");
  const [formKonsepKunci, setFormKonsepKunci] = useState<string>("");

  // Form State Tambah Paket Baru
  const [newPaketTitle, setNewPaketTitle] = useState("");
  const [newPaketDesc, setNewPaketDesc] = useState("");
  const [newPaketCategory, setNewPaketCategory] = useState<"latihan" | "tryout">("latihan");
  const [newPaketLevel, setNewPaketLevel] = useState<
    "Level 1: Dasar & Pemahaman" | "Level 2: Aplikasi & Terapan" | "Level 3: Analisis & HOTS Mahir"
  >("Level 1: Dasar & Pemahaman");
  const [newPaketDuration, setNewPaketDuration] = useState<number>(30);
  const [newPaketPassingScore, setNewPaketPassingScore] = useState<number>(50);

  // Load bank soal dari store
  const refreshData = () => {
    const data = getAllCustomPakets();
    setAllPakets(data);
  };

  useEffect(() => {
    refreshData();

    const handleUpdate = () => {
      refreshData();
    };

    window.addEventListener("tka_bank_soal_updated", handleUpdate);
    return () => window.removeEventListener("tka_bank_soal_updated", handleUpdate);
  }, []);

  // Update daftar mapel saat jenjang berubah
  const subjectsInJenjang = getSubjectsByJenjang(selectedJenjang);

  useEffect(() => {
    if (subjectsInJenjang.length > 0) {
      if (!subjectsInJenjang.some((s) => s.id === selectedSubjectId)) {
        setSelectedSubjectId(subjectsInJenjang[0].id);
      }
    }
  }, [selectedJenjang, subjectsInJenjang, selectedSubjectId]);

  // Paket dalam mapel dan kategori terpilih
  const paketsInFilter = allPakets.filter((p) => {
    const isSubjectMatch = p.subjectId === selectedSubjectId || p.subjectId === selectedSubjectId.replace("sd-", "");
    const isCategoryMatch = (p.category || "latihan") === selectedCategory;
    return isSubjectMatch && isCategoryMatch;
  }).sort((a, b) => a.paketNumber - b.paketNumber);

  // Auto-select paket pertama jika paket terpilih tidak ada di filter
  useEffect(() => {
    if (paketsInFilter.length > 0) {
      if (!selectedPaketId || !paketsInFilter.some((p) => p.id === selectedPaketId)) {
        setSelectedPaketId(paketsInFilter[0].id);
      }
    } else {
      setSelectedPaketId("");
    }
  }, [selectedSubjectId, selectedCategory, paketsInFilter, selectedPaketId]);

  // Paket yang sedang aktif diedit
  const activePaket = allPakets.find((p) => p.id === selectedPaketId);

  // Filter soal dalam paket aktif dengan pencarian
  const filteredSoalList = activePaket
    ? activePaket.soalList.filter((s) => {
        if (!searchKeyword.trim()) return true;
        const q = searchKeyword.toLowerCase();
        return (
          s.pertanyaan.toLowerCase().includes(q) ||
          (s.stimulus && s.stimulus.toLowerCase().includes(q)) ||
          s.pembahasan.toLowerCase().includes(q) ||
          (s.konsepKunci && s.konsepKunci.toLowerCase().includes(q))
        );
      })
    : [];

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Reset Form Soal
  const resetSoalForm = () => {
    setFormTipe("PG");
    setFormStimulus("");
    setFormPertanyaan("");
    setFormOpsi(["", "", "", ""]);
    setFormKunciPG("A");
    setFormKunciMCMA(["A"]);
    setFormKunciBS("BENAR");
    setFormPembahasan("");
    setFormKonsepKunci("");
    setEditingSoalId(null);
  };

  // Buka Modal Tambah Soal
  const handleOpenAddSoal = () => {
    if (!activePaket) {
      showToast("Pilih paket soal terlebih dahulu!", "error");
      return;
    }
    resetSoalForm();
    setSoalModalMode("add");
    setShowSoalModal(true);
  };

  // Buka Modal Edit Soal
  const handleOpenEditSoal = (soal: TKASoal) => {
    setSoalModalMode("edit");
    setEditingSoalId(soal.id);
    setFormTipe(soal.tipe);
    setFormStimulus(soal.stimulus || "");
    setFormPertanyaan(soal.pertanyaan);
    setFormOpsi(soal.opsi ? [...soal.opsi] : ["", "", "", ""]);

    if (soal.tipe === "PG") {
      setFormKunciPG(typeof soal.kunci === "string" ? soal.kunci : "A");
    } else if (soal.tipe === "MCMA") {
      setFormKunciMCMA(Array.isArray(soal.kunci) ? soal.kunci : ["A"]);
    } else if (soal.tipe === "BS") {
      setFormKunciBS(typeof soal.kunci === "string" ? soal.kunci : "BENAR");
    }

    setFormPembahasan(soal.pembahasan);
    setFormKonsepKunci(soal.konsepKunci || "");
    setShowSoalModal(true);
  };

  // Simpan Soal (Tambah atau Edit)
  const handleSaveSoal = () => {
    if (!activePaket) return;
    if (!formPertanyaan.trim()) {
      showToast("Pertanyaan soal tidak boleh kosong!", "error");
      return;
    }
    if (!formPembahasan.trim()) {
      showToast("Pembahasan wajib diisi untuk panduan siswa!", "error");
      return;
    }

    let finalKunci: string | string[] = "A";
    let finalOpsi: string[] = [];

    if (formTipe === "PG") {
      finalKunci = formKunciPG;
      finalOpsi = formOpsi.map((o) => o.trim()).filter((o) => o.length > 0);
      if (finalOpsi.length < 2) {
        showToast("Pilihan Ganda harus memiliki minimal 2 opsi jawaban!", "error");
        return;
      }
    } else if (formTipe === "MCMA") {
      finalKunci = formKunciMCMA;
      finalOpsi = formOpsi.map((o) => o.trim()).filter((o) => o.length > 0);
      if (finalKunci.length === 0) {
        showToast("Pilih minimal satu kunci jawaban untuk Pilihan Ganda Kompleks!", "error");
        return;
      }
    } else if (formTipe === "BS") {
      finalKunci = formKunciBS;
      finalOpsi = ["BENAR", "SALAH"];
    }

    const payload: Omit<TKASoal, "id" | "nomor"> = {
      tipe: formTipe,
      stimulus: formStimulus.trim() || undefined,
      pertanyaan: formPertanyaan.trim(),
      opsi: finalOpsi,
      kunci: finalKunci,
      pembahasan: formPembahasan.trim(),
      konsepKunci: formKonsepKunci.trim() || undefined,
    };

    if (soalModalMode === "add") {
      const added = addCustomSoal(activePaket.id, payload);
      if (added) {
        showToast(`Soal #${added.nomor} berhasil ditambahkan ke ${activePaket.title}!`);
        setShowSoalModal(false);
      } else {
        showToast("Gagal menambahkan soal", "error");
      }
    } else if (soalModalMode === "edit" && editingSoalId) {
      const ok = updateCustomSoal(activePaket.id, editingSoalId, payload);
      if (ok) {
        showToast("Perubahan butir soal berhasil disimpan!");
        setShowSoalModal(false);
      } else {
        showToast("Gagal memperbarui soal", "error");
      }
    }
  };

  // Hapus Soal
  const handleDeleteSoal = (soalId: string, nomor: number) => {
    if (!activePaket) return;
    if (confirm(`Apakah Anda yakin ingin menghapus Soal #${nomor} dari ${activePaket.title}?`)) {
      const ok = deleteCustomSoal(activePaket.id, soalId);
      if (ok) {
        showToast(`Soal #${nomor} berhasil dihapus.`);
      } else {
        showToast("Gagal menghapus soal", "error");
      }
    }
  };

  // Buka Modal Pindah Paket
  const handleOpenMoveModal = (soalId: string) => {
    setMovingSoalId(soalId);
    // Cari paket selain paket aktif
    const otherPakets = allPakets.filter((p) => p.id !== activePaket?.id);
    if (otherPakets.length > 0) {
      setTargetPaketId(otherPakets[0].id);
    }
    setShowMoveModal(true);
  };

  // Eksekusi Pindah Soal
  const handleExecuteMove = () => {
    if (!activePaket || !movingSoalId || !targetPaketId) return;

    const ok = moveCustomSoal(activePaket.id, targetPaketId, movingSoalId);
    if (ok) {
      const target = allPakets.find((p) => p.id === targetPaketId);
      showToast(`Soal berhasil dipindahkan ke ${target?.title || "paket target"}!`);
      setShowMoveModal(false);
    } else {
      showToast("Gagal memindahkan soal", "error");
    }
  };

  // Simpan Paket Baru
  const handleCreateNewPaket = () => {
    if (!newPaketTitle.trim()) {
      showToast("Judul paket wajib diisi!", "error");
      return;
    }

    const currentPakets = allPakets.filter(
      (p) => p.subjectId === selectedSubjectId && (p.category || "latihan") === newPaketCategory
    );
    const nextNum = currentPakets.length + 1;
    const currentSubject = ALL_SUBJECTS.find((s) => s.id === selectedSubjectId);

    const jenjangMapping: Record<string, "SD/MI" | "SMP/MTs" | "SMA"> = {
      SD: "SD/MI",
      SMP: "SMP/MTs",
      SMA: "SMA",
    };

    addCustomPaket({
      subjectId: selectedSubjectId,
      jenjang: jenjangMapping[selectedJenjang] || "SD/MI",
      mapelName: currentSubject?.name || "Mata Pelajaran",
      category: newPaketCategory,
      paketNumber: nextNum,
      title: newPaketTitle.trim(),
      description: newPaketDesc.trim() || `Paket baru untuk ${currentSubject?.name}`,
      levelKesukaran: newPaketLevel,
      durasiMenit: newPaketDuration,
      passingScore: newPaketPassingScore,
    });

    showToast(`Paket baru "${newPaketTitle}" berhasil ditambahkan!`);
    setShowAddPaketModal(false);
    setNewPaketTitle("");
    setNewPaketDesc("");
  };

  // Reset ke Seed Bawaan
  const handleResetDefault = () => {
    if (
      confirm(
        "PERINGATAN: Apakah Anda yakin ingin mereset seluruh bank soal ke bawaan kurikulum standar? Seluruh perubahan edit soal kustom akan dikembalikan."
      )
    ) {
      resetCustomPaketsToDefault();
      showToast("Bank soal berhasil dikembalikan ke default!");
    }
  };

  // Active Subject Meta
  const activeSubjectMeta = ALL_SUBJECTS.find((s) => s.id === selectedSubjectId) || subjectsInJenjang[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* TOAST NOTIFIKASI */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold transition-all ${
            notification.type === "success"
              ? "bg-emerald-600 text-white shadow-emerald-600/30"
              : "bg-red-600 text-white shadow-red-600/30"
          }`}
        >
          {notification.type === "success" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <span>{notification.text}</span>
          <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-75">
            <X size={16} />
          </button>
        </div>
      )}

      {/* HEADER UTAMA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <FileText size={26} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Bank Soal & Kurasi</h1>
            <p className="text-sm text-slate-500">
              Pilih Jenjang &rarr; Pilih Mapel &rarr; Pilih Paket untuk mengedit, menambah, dan menyusun butir soal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefault}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 shadow-sm transition"
            title="Kembalikan semua soal ke versi bawaan kurikulum"
          >
            <RotateCcw size={14} />
            <span>Reset Default</span>
          </button>
          <button
            onClick={() => setShowAddPaketModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition"
          >
            <Plus size={15} />
            <span>+ Tambah Paket Baru</span>
          </button>
        </div>
      </div>

      {/* PANEL 3-LANGKAH PEMILIHAN HIERARKIS */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        {/* LANGKAH 1: PILIH JENJANG */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-black">
              1
            </span>
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              Pilih Jenjang Pendidikan:
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ALL_JENJANG.map((jenjang) => {
              const isSelected = selectedJenjang === jenjang.id;
              return (
                <button
                  key={jenjang.id}
                  onClick={() => setSelectedJenjang(jenjang.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl border text-left transition ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20"
                      : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl font-black text-sm ${
                        isSelected ? "bg-blue-600 text-white" : "bg-white text-slate-700 border border-slate-200"
                      }`}
                    >
                      {jenjang.id}
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-900">{jenjang.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{jenjang.badge}</div>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 size={18} className="text-blue-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* LANGKAH 2: PILIH MATA PELAJARAN */}
        <div className="border-t border-slate-100 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-black">
              2
            </span>
            <label className="text-xs font-black uppercase tracking-wider text-slate-700">
              Pilih Mata Pelajaran ({selectedJenjang}):
            </label>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {subjectsInJenjang.map((subject) => {
              const isSelected = selectedSubjectId === subject.id;
              return (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubjectId(subject.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-black transition ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <BookOpen size={14} className={isSelected ? "text-white" : "text-emerald-600"} />
                  <span>{subject.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LANGKAH 3: PILIH KATEGORI & PAKET SOAL */}
        <div className="border-t border-slate-100 pt-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white text-xs font-black">
                3
              </span>
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                Pilih Kategori & Paket Soal:
              </label>
            </div>

            {/* TAB KATEGORI: LATIHAN VS TRYOUT */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => setSelectedCategory("latihan")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  selectedCategory === "latihan"
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Latihan Soal (10 Paket)
              </button>
              <button
                onClick={() => setSelectedCategory("tryout")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  selectedCategory === "tryout"
                    ? "bg-white text-purple-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tryout CBT (3 Paket &bull; 45 Menit)
              </button>
            </div>
          </div>

          {/* GRID PILIHAN PAKET */}
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 gap-2.5">
            {paketsInFilter.map((paket) => {
              const isSelected = selectedPaketId === paket.id;
              return (
                <button
                  key={paket.id}
                  onClick={() => setSelectedPaketId(paket.id)}
                  className={`p-3 rounded-2xl border text-left transition ${
                    isSelected
                      ? "border-purple-600 bg-purple-50/80 ring-2 ring-purple-600/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider">
                      {paket.category === "tryout" ? `Tryout #${paket.paketNumber}` : `Paket #${paket.paketNumber}`}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {paket.durasiMenit} Menit
                    </span>
                  </div>
                  <div className="font-black text-xs text-slate-900 mt-1 line-clamp-1">{paket.title}</div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>{paket.soalList.length} Soal</span>
                    <span className="text-emerald-600 font-bold">&gt;{paket.passingScore}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* INFORMASI PAKET AKTIF & ACTION BAR */}
      {activePaket ? (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-indigo-500/30 px-3 py-0.5 text-xs font-bold text-indigo-300">
                  {activePaket.jenjang}
                </span>
                <span className="rounded-full bg-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-300">
                  {activePaket.mapelName}
                </span>
                <span className="rounded-full bg-amber-500/30 px-3 py-0.5 text-xs font-bold text-amber-300">
                  {activePaket.levelKesukaran}
                </span>
              </div>
              <h2 className="text-xl font-black">{activePaket.title}</h2>
              <p className="text-xs text-slate-300 max-w-2xl">{activePaket.description}</p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleOpenAddSoal}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-4 py-2.5 text-xs font-black text-slate-950 shadow transition"
              >
                <Plus size={16} />
                <span>+ Tambah Soal ke Paket Ini</span>
              </button>
            </div>
          </div>

          {/* SEARCH & JUMLAH SOAL */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm font-bold text-slate-700">
              Menampilkan {filteredSoalList.length} dari total {activePaket.soalList.length} butir soal
            </div>
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari kata kunci soal / pembahasan..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* DAFTAR BUTIR SOAL */}
          <div className="space-y-3">
            {filteredSoalList.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-400">
                <FileText size={40} className="mx-auto text-slate-300 mb-3" />
                <p className="font-bold text-slate-700">Belum ada soal pada paket ini</p>
                <p className="text-xs text-slate-400 mt-1">
                  Klik tombol &quot;+ Tambah Soal ke Paket Ini&quot; di atas untuk membuat soal baru.
                </p>
              </div>
            ) : (
              filteredSoalList.map((soal) => (
                <div
                  key={soal.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-300 transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-50 font-black text-xs text-indigo-700 border border-indigo-200">
                        {soal.nomor}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          soal.tipe === "PG"
                            ? "bg-blue-100 text-blue-800"
                            : soal.tipe === "MCMA"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {soal.tipe === "PG"
                          ? "Pilihan Ganda"
                          : soal.tipe === "MCMA"
                          ? "Pilihan Ganda Kompleks"
                          : "Benar / Salah"}
                      </span>
                    </div>

                    {/* AKSI EDIT, PINDAH, HAPUS */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditSoal(soal)}
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 px-3 py-1.5 text-xs font-bold text-slate-700 transition"
                        title="Edit soal ini"
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleOpenMoveModal(soal.id)}
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-700 px-3 py-1.5 text-xs font-bold text-slate-700 transition"
                        title="Pindahkan soal ini ke paket lain"
                      >
                        <ArrowRightLeft size={13} />
                        <span>Pindah</span>
                      </button>
                      <button
                        onClick={() => handleDeleteSoal(soal.id, soal.nomor)}
                        className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-700 px-3 py-1.5 text-xs font-bold text-slate-700 transition"
                        title="Hapus soal ini"
                      >
                        <Trash2 size={13} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>

                  {/* STIMULUS JIKA ADA */}
                  {soal.stimulus && (
                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-700 leading-relaxed italic">
                      <strong className="not-italic text-slate-900 block mb-1">Stimulus / Bacaan:</strong>
                      {soal.stimulus}
                    </div>
                  )}

                  {/* PERTANYAAN */}
                  <div className="text-sm font-bold text-slate-900 leading-relaxed">
                    {soal.pertanyaan}
                  </div>

                  {/* OPSI & KUNCI JAWABAN */}
                  <div className="grid sm:grid-cols-2 gap-2 pt-1">
                    {(soal.opsi || []).map((opsi, oIdx) => {
                      const label = String.fromCharCode(65 + oIdx);
                      const isCorrect = Array.isArray(soal.kunci)
                        ? soal.kunci.includes(label)
                        : soal.kunci === label || soal.kunci === opsi;

                      return (
                        <div
                          key={oIdx}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs ${
                            isCorrect
                              ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold"
                              : "border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg text-[10px] font-black ${
                              isCorrect ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {soal.tipe === "BS" ? (oIdx === 0 ? "B" : "S") : label}
                          </span>
                          <span className="flex-1">{opsi}</span>
                          {isCorrect && <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* PEMBAHASAN */}
                  <div className="rounded-2xl bg-blue-50/70 border border-blue-200 p-3 text-xs space-y-1">
                    <span className="font-black text-blue-900 block">Pembahasan Lengkap:</span>
                    <p className="text-blue-950 leading-relaxed">{soal.pembahasan}</p>
                    {soal.konsepKunci && (
                      <div className="pt-1 text-[11px] text-blue-700">
                        <strong>Konsep Kunci:</strong> {soal.konsepKunci}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-400">
          <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="font-bold text-slate-700">Pilih Jenjang, Mapel, dan Paket Soal di atas</p>
        </div>
      )}

      {/* MODAL EDIT / TAMBAH BUTIR SOAL */}
      {showSoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {soalModalMode === "add" ? "+ Tambah Soal Baru" : "Edit Butir Soal"}
                </h3>
                <p className="text-xs text-slate-500">Paket: {activePaket?.title}</p>
              </div>
              <button
                onClick={() => setShowSoalModal(false)}
                className="rounded-xl p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM TIPE SOAL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Tipe Soal:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "PG", label: "Pilihan Ganda" },
                  { id: "MCMA", label: "PG Kompleks (Banyak Kunci)" },
                  { id: "BS", label: "Benar / Salah" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormTipe(t.id as TipeSoalTKA)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                      formTipe === t.id
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-600/20"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* STIMULUS (OPSIONAL) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teks Stimulus / Wacana Bacaan (Opsional):
              </label>
              <textarea
                rows={2}
                value={formStimulus}
                onChange={(e) => setFormStimulus(e.target.value)}
                placeholder="Masukkan teks narasi, bacaan, atau tabel jika soal memerlukan stimulus..."
                className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-indigo-500"
              />
            </div>

            {/* PERTANYAAN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pertanyaan / Soal (*):</label>
              <textarea
                rows={3}
                value={formPertanyaan}
                onChange={(e) => setFormPertanyaan(e.target.value)}
                placeholder="Tuliskan butir pertanyaan secara jelas..."
                className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-indigo-500"
              />
            </div>

            {/* OPSI & KUNCI JAWABAN */}
            {formTipe === "PG" && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Opsi Jawaban & Pilih Kunci yang Benar:
                </label>
                {["A", "B", "C", "D"].map((label, idx) => (
                  <div key={label} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="kunciPG"
                      checked={formKunciPG === label}
                      onChange={() => setFormKunciPG(label)}
                      className="h-4 w-4 text-indigo-600"
                    />
                    <span className="font-black text-xs text-slate-700 w-4">{label}.</span>
                    <input
                      type="text"
                      value={formOpsi[idx] || ""}
                      onChange={(e) => {
                        const copy = [...formOpsi];
                        copy[idx] = e.target.value;
                        setFormOpsi(copy);
                      }}
                      placeholder={`Pilihan jawaban ${label}`}
                      className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {formTipe === "MCMA" && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Opsi Jawaban & Centang Semua Kunci yang Benar:
                </label>
                {["A", "B", "C", "D", "E"].map((label, idx) => {
                  const isChecked = formKunciMCMA.includes(label);
                  return (
                    <div key={label} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormKunciMCMA([...formKunciMCMA, label]);
                          } else {
                            setFormKunciMCMA(formKunciMCMA.filter((k) => k !== label));
                          }
                        }}
                        className="h-4 w-4 text-indigo-600 rounded"
                      />
                      <span className="font-black text-xs text-slate-700 w-4">{label}.</span>
                      <input
                        type="text"
                        value={formOpsi[idx] || ""}
                        onChange={(e) => {
                          const copy = [...formOpsi];
                          copy[idx] = e.target.value;
                          setFormOpsi(copy);
                        }}
                        placeholder={`Pilihan jawaban ${label}`}
                        className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-indigo-500"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {formTipe === "BS" && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Kunci Benar / Salah:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <input
                      type="radio"
                      name="kunciBS"
                      value="BENAR"
                      checked={formKunciBS === "BENAR"}
                      onChange={() => setFormKunciBS("BENAR")}
                    />
                    BENAR
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-red-700">
                    <input
                      type="radio"
                      name="kunciBS"
                      value="SALAH"
                      checked={formKunciBS === "SALAH"}
                      onChange={() => setFormKunciBS("SALAH")}
                    />
                    SALAH
                  </label>
                </div>
              </div>
            )}

            {/* PEMBAHASAN */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pembahasan Terperinci (*):
              </label>
              <textarea
                rows={3}
                value={formPembahasan}
                onChange={(e) => setFormPembahasan(e.target.value)}
                placeholder="Tuliskan langkah-langkah logika pengerjaan dan alasan jawaban benar..."
                className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-indigo-500"
              />
            </div>

            {/* KONSEP KUNCI */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Konsep Kunci / Teori Singkat (Opsional):
              </label>
              <input
                type="text"
                value={formKonsepKunci}
                onChange={(e) => setFormKonsepKunci(e.target.value)}
                placeholder="Misal: Operasi hitung campuran bilangan bulat"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSoalModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveSoal}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-md shadow-indigo-600/20"
              >
                Simpan Soal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PINDAH SOAL KE PAKET LAIN */}
      {showMoveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">Pindahkan Soal ke Paket Lain</h3>
              <button
                onClick={() => setShowMoveModal(false)}
                className="rounded-xl p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Pilih paket tujuan untuk memindahkan butir soal ini. Nomor urut soal akan otomatis disesuaikan di paket tujuan.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Pilih Paket Tujuan:</label>
              <select
                value={targetPaketId}
                onChange={(e) => setTargetPaketId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold outline-none focus:border-indigo-500"
              >
                {allPakets
                  .filter((p) => p.id !== activePaket?.id)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.jenjang}] {p.mapelName} &bull; {p.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end gap-2.5 pt-3">
              <button
                type="button"
                onClick={() => setShowMoveModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleExecuteMove}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow"
              >
                Pindahkan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH PAKET BARU */}
      {showAddPaketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">+ Tambah Paket Baru</h3>
                <p className="text-xs text-slate-500">
                  Untuk {activeSubjectMeta?.name} ({selectedJenjang})
                </p>
              </div>
              <button
                onClick={() => setShowAddPaketModal(false)}
                className="rounded-xl p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Paket:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewPaketCategory("latihan");
                      setNewPaketDuration(30);
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                      newPaketCategory === "latihan"
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Latihan Soal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewPaketCategory("tryout");
                      setNewPaketDuration(45);
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                      newPaketCategory === "tryout"
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    Tryout CBT (45 Menit)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Paket (*):</label>
                <input
                  type="text"
                  value={newPaketTitle}
                  onChange={(e) => setNewPaketTitle(e.target.value)}
                  placeholder="Contoh: Paket 11: Pengayaan Eksponen HOTS"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Paket:</label>
                <textarea
                  rows={2}
                  value={newPaketDesc}
                  onChange={(e) => setNewPaketDesc(e.target.value)}
                  placeholder="Deskripsikan fokus materi dan tujuan paket latihan ini..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tingkat Kesukaran:</label>
                  <select
                    value={newPaketLevel}
                    onChange={(e: any) => setNewPaketLevel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold outline-none"
                  >
                    <option value="Level 1: Dasar & Pemahaman">Level 1: Dasar & Pemahaman</option>
                    <option value="Level 2: Aplikasi & Terapan">Level 2: Aplikasi & Terapan</option>
                    <option value="Level 3: Analisis & HOTS Mahir">Level 3: Analisis & HOTS Mahir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Durasi Pengerjaan (Menit):</label>
                  <input
                    type="number"
                    value={newPaketDuration}
                    onChange={(e) => setNewPaketDuration(parseInt(e.target.value, 10) || 30)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddPaketModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCreateNewPaket}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow"
              >
                Buat Paket Baru
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
