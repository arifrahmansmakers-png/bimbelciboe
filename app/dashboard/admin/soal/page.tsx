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
import { tkaMemberSubjects, TKAPaket, TKASoal, TipeSoalTKA } from "@/data/tka_member";

export default function AdminSoalPage() {
  // State Filter Mapel & Paket
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("matematika");
  const [selectedPaketId, setSelectedPaketId] = useState<string>("");
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
  const [formStimulus, setFormStimulus] = useState("");
  const [formPertanyaan, setFormPertanyaan] = useState("");
  const [formOpsiA, setFormOpsiA] = useState("");
  const [formOpsiB, setFormOpsiB] = useState("");
  const [formOpsiC, setFormOpsiC] = useState("");
  const [formOpsiD, setFormOpsiD] = useState("");
  const [formKunciPG, setFormKunciPG] = useState("A");
  const [formKunciMCMA, setFormKunciMCMA] = useState<string[]>(["A"]);
  const [formKunciBS, setFormKunciBS] = useState("BENAR");
  const [formPembahasan, setFormPembahasan] = useState("");
  const [formKonsepKunci, setFormKonsepKunci] = useState("");

  // Form State Tambah Paket Baru
  const [newPaketTitle, setNewPaketTitle] = useState("");
  const [newPaketDesc, setNewPaketDesc] = useState("");
  const [newPaketJenjang, setNewPaketJenjang] = useState<"SD/MI" | "SMP/MTs" | "SMA">("SD/MI");
  const [newPaketLevel, setNewPaketLevel] = useState<
    "Level 1: Dasar & Pemahaman" | "Level 2: Aplikasi & Terapan" | "Level 3: Analisis & HOTS Mahir"
  >("Level 1: Dasar & Pemahaman");
  const [newPaketDurasi, setNewPaketDurasi] = useState(25);
  const [newPaketPassing, setNewPaketPassing] = useState(50);

  // Muat data awal
  const refreshData = () => {
    const data = getAllCustomPakets();
    setAllPakets(data);
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener("tka_bank_soal_updated", handleUpdate);
    return () => window.removeEventListener("tka_bank_soal_updated", handleUpdate);
  }, []);

  // Filter paket berdasarkan subject yang dipilih
  const paketsInSubject = allPakets.filter((p) => p.subjectId === selectedSubjectId);

  // Atur selectedPaketId default jika kosong atau tidak sesuai subject
  useEffect(() => {
    if (paketsInSubject.length > 0) {
      if (!selectedPaketId || !paketsInSubject.some((p) => p.id === selectedPaketId)) {
        setSelectedPaketId(paketsInSubject[0].id);
      }
    } else {
      setSelectedPaketId("");
    }
  }, [selectedSubjectId, paketsInSubject]);

  // Paket yang sedang aktif diedit
  const activePaket = allPakets.find((p) => p.id === selectedPaketId);

  // Filter soal dalam paket aktif dengan pencarian
  const filteredSoalList = activePaket
    ? activePaket.soalList.filter((s) => {
        if (!searchKeyword) return true;
        const q = searchKeyword.toLowerCase();
        return (
          s.pertanyaan.toLowerCase().includes(q) ||
          (s.stimulus && s.stimulus.toLowerCase().includes(q)) ||
          s.pembahasan.toLowerCase().includes(q)
        );
      })
    : [];

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Buka Modal Tambah Soal
  const handleOpenAddSoal = () => {
    setSoalModalMode("add");
    setEditingSoalId(null);
    setFormTipe("PG");
    setFormStimulus("");
    setFormPertanyaan("");
    setFormOpsiA("");
    setFormOpsiB("");
    setFormOpsiC("");
    setFormOpsiD("");
    setFormKunciPG("A");
    setFormKunciMCMA(["A"]);
    setFormKunciBS("BENAR");
    setFormPembahasan("");
    setFormKonsepKunci("");
    setShowSoalModal(true);
  };

  // Buka Modal Edit Soal
  const handleOpenEditSoal = (soal: TKASoal) => {
    setSoalModalMode("edit");
    setEditingSoalId(soal.id);
    setFormTipe(soal.tipe);
    setFormStimulus(soal.stimulus || "");
    setFormPertanyaan(soal.pertanyaan);
    setFormOpsiA(soal.opsi?.[0] || "");
    setFormOpsiB(soal.opsi?.[1] || "");
    setFormOpsiC(soal.opsi?.[2] || "");
    setFormOpsiD(soal.opsi?.[3] || "");

    if (soal.tipe === "PG") {
      setFormKunciPG(typeof soal.kunci === "string" ? soal.kunci : "A");
    } else if (soal.tipe === "BS") {
      setFormKunciBS(typeof soal.kunci === "string" ? soal.kunci : "BENAR");
    } else if (soal.tipe === "MCMA") {
      setFormKunciMCMA(Array.isArray(soal.kunci) ? soal.kunci : [soal.kunci]);
    }

    setFormPembahasan(soal.pembahasan || "");
    setFormKonsepKunci(soal.konsepKunci || "");
    setShowSoalModal(true);
  };

  // Simpan Tambah / Edit Soal
  const handleSaveSoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePaket) return;

    if (!formPertanyaan.trim()) {
      showToast("Teks pertanyaan tidak boleh kosong!", "error");
      return;
    }

    let opsi: string[] | undefined = undefined;
    let kunci: string | string[] = formKunciPG;

    if (formTipe === "PG" || formTipe === "MCMA") {
      opsi = [formOpsiA.trim(), formOpsiB.trim(), formOpsiC.trim(), formOpsiD.trim()];
      if (formTipe === "MCMA") {
        if (formKunciMCMA.length === 0) {
          showToast("Pilih minimal 1 kunci jawaban untuk Pilihan Ganda Kompleks!", "error");
          return;
        }
        kunci = formKunciMCMA;
      } else {
        kunci = formKunciPG;
      }
    } else if (formTipe === "BS") {
      opsi = ["BENAR", "SALAH"];
      kunci = formKunciBS;
    }

    const payload = {
      tipe: formTipe,
      stimulus: formStimulus.trim() || undefined,
      pertanyaan: formPertanyaan.trim(),
      opsi,
      kunci,
      pembahasan: formPembahasan.trim() || "Pembahasan belum ditambahkan.",
      konsepKunci: formKonsepKunci.trim() || undefined,
    };

    if (soalModalMode === "add") {
      addCustomSoal(activePaket.id, payload);
      showToast("Soal baru berhasil ditambahkan ke " + activePaket.title);
    } else if (editingSoalId) {
      updateCustomSoal(activePaket.id, editingSoalId, payload);
      showToast("Soal berhasil diperbarui!");
    }

    setShowSoalModal(false);
    refreshData();
  };

  // Hapus Soal
  const handleDeleteSoal = (soalId: string) => {
    if (!activePaket) return;
    if (confirm("Apakah Anda yakin ingin menghapus butir soal ini? Tindakan ini tidak dapat dibatalkan.")) {
      deleteCustomSoal(activePaket.id, soalId);
      showToast("Soal berhasil dihapus!");
      refreshData();
    }
  };

  // Buka Modal Pindah Soal
  const handleOpenMoveModal = (soalId: string) => {
    setMovingSoalId(soalId);
    // Cari paket selain paket aktif
    const otherPakets = allPakets.filter((p) => p.id !== selectedPaketId);
    if (otherPakets.length > 0) {
      setTargetPaketId(otherPakets[0].id);
    }
    setShowMoveModal(true);
  };

  // Eksekusi Pindah Soal
  const handleExecuteMove = () => {
    if (!selectedPaketId || !targetPaketId || !movingSoalId) return;

    const ok = moveCustomSoal(selectedPaketId, targetPaketId, movingSoalId);
    if (ok) {
      showToast("Soal berhasil dipindahkan ke paket tujuan!");
      setShowMoveModal(false);
      refreshData();
    } else {
      showToast("Gagal memindahkan soal.", "error");
    }
  };

  // Buat Paket Baru
  const handleCreateNewPaket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaketTitle.trim()) {
      showToast("Nama paket tidak boleh kosong!", "error");
      return;
    }

    const activeSub = tkaMemberSubjects.find((s) => s.id === selectedSubjectId);
    const mapelName = activeSub?.name || "Mata Pelajaran TKA";

    const created = addCustomPaket({
      subjectId: selectedSubjectId,
      mapelName,
      jenjang: newPaketJenjang,
      title: newPaketTitle.trim(),
      description: newPaketDesc.trim() || "Paket soal latihan kemampuan akademik terstandar.",
      levelKesukaran: newPaketLevel,
      durasiMenit: Number(newPaketDurasi) || 25,
      passingScore: Number(newPaketPassing) || 50,
    });

    showToast("Paket baru berhasil dibuat: " + created.title);
    setShowAddPaketModal(false);
    setNewPaketTitle("");
    setNewPaketDesc("");
    refreshData();
    setSelectedPaketId(created.id);
  };

  // Hapus Paket
  const handleDeleteCurrentPaket = () => {
    if (!activePaket) return;
    if (
      confirm(
        `PERINGATAN: Apakah Anda yakin ingin menghapus '${activePaket.title}' beserta ${activePaket.totalSoal} butir soal di dalamnya?`
      )
    ) {
      deleteCustomPaket(activePaket.id);
      showToast("Paket berhasil dihapus!");
      refreshData();
    }
  };

  // Reset ke Default
  const handleResetDefault = () => {
    if (
      confirm(
        "PERINGATAN: Reset akan mengembalikan seluruh bank soal ke versi default awal sistem (semua editan kustom admin akan dihapus). Lanjutkan?"
      )
    ) {
      resetCustomPaketsToDefault();
      showToast("Bank soal berhasil di-reset ke versi awal sistem!");
      refreshData();
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-16">
      {/* Toast Notifikasi */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-bold shadow-2xl transition-all animate-in slide-in-from-bottom-5 ${
            notification.type === "success" ? "bg-emerald-600" : "bg-rose-600"
          }`}
        >
          {notification.type === "success" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
          <span>{notification.text}</span>
        </div>
      )}

      {/* HEADER BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2747] via-[#173b63] to-[#24527d] p-6 text-white shadow-xl md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur">
              <Sparkles size={14} className="text-amber-300" />
              <span>Human-in-the-Loop Content Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Kelola & Kurasi Bank Soal TKA
            </h1>
            <p className="mt-2 text-sm text-blue-100 leading-relaxed">
              Kaji dan sempurnakan butir soal secara manual. Anda memiliki akses penuh untuk menambah, mengedit teks bacaan &amp; pembahasan, menghapus, memindahkan soal antarpaket, hingga membuat paket soal baru.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAddPaketModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition"
            >
              <Plus size={16} />
              <span>Tambah Paket Baru</span>
            </button>

            <button
              onClick={handleResetDefault}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition"
              title="Kembalikan semua soal ke versi baku awal"
            >
              <RotateCcw size={14} />
              <span>Reset Default</span>
            </button>
          </div>
        </div>
      </section>

      {/* FILTER 1: PILIH MATA PELAJARAN (TABS) */}
      <div className="space-y-2">
        <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
          Langkah 1: Pilih Mata Pelajaran yang Ingin Diedit
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {tkaMemberSubjects.map((sub) => {
            const isSelected = selectedSubjectId === sub.id;
            const countPaket = allPakets.filter((p) => p.subjectId === sub.id).length;

            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubjectId(sub.id)}
                className={`text-left p-4 rounded-3xl border transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${sub.color.badge}`}>
                    {sub.jenjang}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{countPaket} Paket</span>
                </div>
                <h3 className="text-sm font-black text-slate-900 leading-snug">{sub.name}</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{sub.tagline}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER 2: PILIH PAKET SOAL DALAM MAPEL */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">
              Langkah 2: Pilih Paket Soal
            </label>
            <div className="flex items-center gap-3">
              <select
                value={selectedPaketId}
                onChange={(e) => setSelectedPaketId(e.target.value)}
                className="px-4 py-2.5 rounded-2xl border border-slate-300 font-bold text-sm text-slate-800 bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none min-w-[280px]"
              >
                {paketsInSubject.map((p) => (
                  <option key={p.id} value={p.id}>
                    Paket {p.paketNumber}: {p.title} ({p.soalList.length} Soal)
                  </option>
                ))}
              </select>

              {activePaket && (
                <button
                  onClick={handleDeleteCurrentPaket}
                  className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition"
                  title="Hapus paket ini"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>

          {activePaket && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleOpenAddSoal}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition"
              >
                <Plus size={16} />
                <span>+ Tambah Soal ke Paket Ini</span>
              </button>
            </div>
          )}
        </div>

        {/* Info Ringkas Paket Aktif */}
        {activePaket && (
          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            <span className="flex items-center gap-1 font-bold text-slate-800">
              <BookOpen size={14} className="text-blue-600" />
              <span>{activePaket.title}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-slate-400" />
              <span>Durasi: {activePaket.durasiMenit} Menit</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <Target size={14} />
              <span>Passing Score: {activePaket.passingScore}%</span>
            </span>
            <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-bold">
              {activePaket.levelKesukaran}
            </span>
            <span className="text-slate-400 font-bold ml-auto">
              Total: {activePaket.soalList.length} Butir Soal
            </span>
          </div>
        )}
      </div>

      {/* SEARCH SOAL */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari teks soal, stimulus bacaan, atau pembahasan..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* DAFTAR SOAL DALAM PAKET */}
      <div className="space-y-4">
        {filteredSoalList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
            <HelpCircle size={40} className="text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-700">Belum Ada Soal di Paket Ini</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Klik tombol &quot;+ Tambah Soal ke Paket Ini&quot; di atas untuk mulai memasukkan butir soal buatan sendiri.
            </p>
          </div>
        ) : (
          filteredSoalList.map((soal, idx) => (
            <div
              key={soal.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-all space-y-4"
            >
              {/* Header Card Soal */}
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xs">
                    {soal.nomor || idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    ID: <code className="text-slate-700 font-mono">{soal.id}</code>
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {soal.tipe === "PG"
                      ? "Pilihan Ganda"
                      : soal.tipe === "MCMA"
                      ? "Pilihan Ganda Kompleks"
                      : "Benar / Salah"}
                  </span>
                </div>

                {/* Action Buttons: Edit, Move, Delete */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenMoveModal(soal.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 transition"
                    title="Pindahkan butir soal ini ke paket lain"
                  >
                    <ArrowRightLeft size={13} />
                    <span>Pindah Paket</span>
                  </button>

                  <button
                    onClick={() => handleOpenEditSoal(soal)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition"
                  >
                    <Edit3 size={13} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDeleteSoal(soal.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                    title="Hapus soal ini"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Stimulus jika ada */}
              {soal.stimulus && (
                <div className="p-3.5 bg-slate-50 border-l-4 border-blue-500 rounded-r-xl text-xs text-slate-700 leading-relaxed">
                  <strong className="block text-[11px] text-blue-800 uppercase tracking-wider mb-1">
                    Stimulus / Konteks Bacaan:
                  </strong>
                  {soal.stimulus}
                </div>
              )}

              {/* Pertanyaan */}
              <div className="text-sm font-bold text-slate-900 leading-relaxed">
                {soal.pertanyaan}
              </div>

              {/* Opsi & Kunci */}
              {soal.opsi && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {soal.opsi.map((op, opIdx) => {
                    const letter = String.fromCharCode(65 + opIdx);
                    const isKey =
                      soal.tipe === "MCMA"
                        ? Array.isArray(soal.kunci) && soal.kunci.includes(letter)
                        : soal.kunci === letter;

                    return (
                      <div
                        key={opIdx}
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          isKey
                            ? "bg-emerald-50 border-emerald-400 font-bold text-emerald-900"
                            : "bg-white border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-black/5 flex items-center justify-center font-bold text-[11px]">
                            {letter}
                          </span>
                          <span>{op}</span>
                        </div>
                        {isKey && (
                          <span className="text-[10px] font-black text-emerald-700 uppercase">
                            Kunci ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Box Pembahasan Lengkap */}
              <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-2xl text-xs space-y-1.5">
                <span className="font-black text-blue-900 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-500" />
                  <span>Pembahasan Langkah demi Langkah:</span>
                </span>
                <p className="text-slate-700 leading-relaxed">{soal.pembahasan}</p>
                {soal.konsepKunci && (
                  <span className="inline-block bg-white px-2.5 py-1 rounded-lg border border-blue-200 text-blue-800 font-semibold text-[11px]">
                    Konsep Kunci: {soal.konsepKunci}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL: TAMBAH / EDIT BUTIR SOAL */}
      {showSoalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl my-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Edit3 size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {soalModalMode === "add" ? "Tambah Butir Soal Baru" : "Edit Butir Soal"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Paket: {activePaket?.title} ({activePaket?.mapelName})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSoalModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSoal} className="space-y-5">
              {/* Pilihan Tipe Soal */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tipe Soal TKA:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["PG", "MCMA", "BS"] as TipeSoalTKA[]).map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setFormTipe(t)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        formTipe === t
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {t === "PG"
                        ? "Pilihan Ganda"
                        : t === "MCMA"
                        ? "Pilihan Ganda Kompleks"
                        : "Benar / Salah"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stimulus / Bacaan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Stimulus / Konteks Cerita (Opsional):
                </label>
                <textarea
                  rows={3}
                  value={formStimulus}
                  onChange={(e) => setFormStimulus(e.target.value)}
                  placeholder="Masukkan teks cerita, studi kasus, data infografis, atau latar belakang soal..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Teks Pertanyaan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Teks Pertanyaan <span className="text-rose-500">*</span>:
                </label>
                <textarea
                  rows={2}
                  required
                  value={formPertanyaan}
                  onChange={(e) => setFormPertanyaan(e.target.value)}
                  placeholder="Ketik kalimat pertanyaan yang jelas dan lugas..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>

              {/* Pilihan Opsi untuk PG & MCMA */}
              {(formTipe === "PG" || formTipe === "MCMA") && (
                <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                    Pilihan Opsi Jawaban (A, B, C, D):
                  </label>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                        A
                      </span>
                      <input
                        type="text"
                        required
                        value={formOpsiA}
                        onChange={(e) => setFormOpsiA(e.target.value)}
                        placeholder="Teks Opsi A"
                        className="flex-1 p-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                        B
                      </span>
                      <input
                        type="text"
                        required
                        value={formOpsiB}
                        onChange={(e) => setFormOpsiB(e.target.value)}
                        placeholder="Teks Opsi B"
                        className="flex-1 p-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                        C
                      </span>
                      <input
                        type="text"
                        required
                        value={formOpsiC}
                        onChange={(e) => setFormOpsiC(e.target.value)}
                        placeholder="Teks Opsi C"
                        className="flex-1 p-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                        D
                      </span>
                      <input
                        type="text"
                        required
                        value={formOpsiD}
                        onChange={(e) => setFormOpsiD(e.target.value)}
                        placeholder="Teks Opsi D"
                        className="flex-1 p-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Kunci Jawaban PG */}
                  {formTipe === "PG" && (
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Pilih Kunci Jawaban Benar (1 Opsi):
                      </label>
                      <div className="flex gap-3">
                        {["A", "B", "C", "D"].map((k) => (
                          <label key={k} className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                            <input
                              type="radio"
                              name="kunciPG"
                              value={k}
                              checked={formKunciPG === k}
                              onChange={() => setFormKunciPG(k)}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span>Opsi {k}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Kunci Jawaban MCMA (Multi-Select) */}
                  {formTipe === "MCMA" && (
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Centang Kunci Jawaban Benar (Bisa lebih dari 1):
                      </label>
                      <div className="flex gap-4">
                        {["A", "B", "C", "D"].map((k) => {
                          const isChecked = formKunciMCMA.includes(k);
                          return (
                            <label key={k} className="flex items-center gap-1.5 text-xs font-bold cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    setFormKunciMCMA(formKunciMCMA.filter((x) => x !== k));
                                  } else {
                                    setFormKunciMCMA([...formKunciMCMA, k]);
                                  }
                                }}
                                className="text-emerald-600 rounded focus:ring-emerald-500"
                              />
                              <span>Opsi {k}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Kunci Jawaban untuk Benar/Salah */}
              {formTipe === "BS" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Kunci Jawaban Pernyataan:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["BENAR", "SALAH"].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setFormKunciBS(val)}
                        className={`py-2.5 rounded-xl font-black text-xs border transition ${
                          formKunciBS === val
                            ? val === "BENAR"
                              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                              : "bg-rose-600 text-white border-rose-600 shadow-sm"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Teks Pembahasan Lengkap */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pembahasan Lengkap Langkah demi Langkah:
                </label>
                <textarea
                  rows={3}
                  required
                  value={formPembahasan}
                  onChange={(e) => setFormPembahasan(e.target.value)}
                  placeholder="Jelaskan alasan mengapa opsi tersebut benar, rumus yang digunakan, atau analisis kalimat..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Konsep Kunci */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rangkuman Konsep Kunci:
                </label>
                <input
                  type="text"
                  value={formKonsepKunci}
                  onChange={(e) => setFormKonsepKunci(e.target.value)}
                  placeholder="Misal: FPB & KPK, Ide Pokok Paragraf, Teorema Pythagoras, dll."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Tombol Simpan */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowSoalModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition"
                >
                  {soalModalMode === "add" ? "Simpan Butir Soal" : "Perbarui Soal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PINDAH SOAL KE PAKET LAIN */}
      {showMoveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="text-purple-600" size={20} />
                <h3 className="font-black text-slate-900 text-base">Pindahkan Soal ke Paket Lain</h3>
              </div>
              <button
                onClick={() => setShowMoveModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Pilih paket tujuan untuk butir soal ini. Soal akan otomatis dipindahkan dan nomor urut di kedua paket akan dirapikan kembali.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Pilih Paket Tujuan:
              </label>
              <select
                value={targetPaketId}
                onChange={(e) => setTargetPaketId(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                {allPakets
                  .filter((p) => p.id !== selectedPaketId)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.jenjang} - {p.mapelName}] Paket {p.paketNumber}: {p.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setShowMoveModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleExecuteMove}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md transition"
              >
                Konfirmasi Pindahkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: TAMBAH PAKET SOAL BARU */}
      {showAddPaketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl my-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Buat Paket Soal Baru</h3>
                  <p className="text-xs text-slate-500">
                    Menambahkan paket baru ke mata pelajaran {tkaMemberSubjects.find((s) => s.id === selectedSubjectId)?.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddPaketModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateNewPaket} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama / Judul Paket <span className="text-rose-500">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={newPaketTitle}
                  onChange={(e) => setNewPaketTitle(e.target.value)}
                  placeholder="Misal: Paket 11: Pengayaan Numerasi Terapan"
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deskripsi Paket:
                </label>
                <textarea
                  rows={2}
                  value={newPaketDesc}
                  onChange={(e) => setNewPaketDesc(e.target.value)}
                  placeholder="Deskripsi singkat topik materi atau tujuan paket..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jenjang Pendidikan:
                  </label>
                  <select
                    value={newPaketJenjang}
                    onChange={(e) => setNewPaketJenjang(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="SD/MI">SD / MI</option>
                    <option value="SMP/MTs">SMP / MTs</option>
                    <option value="SMA">SMA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tingkat Kesukaran:
                  </label>
                  <select
                    value={newPaketLevel}
                    onChange={(e) => setNewPaketLevel(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Level 1: Dasar & Pemahaman">Level 1: Dasar</option>
                    <option value="Level 2: Aplikasi & Terapan">Level 2: Aplikasi</option>
                    <option value="Level 3: Analisis & HOTS Mahir">Level 3: HOTS Mahir</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Durasi (Menit):
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={newPaketDurasi}
                    onChange={(e) => setNewPaketDurasi(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Passing Score (Syarat Nilai):
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={newPaketPassing}
                    onChange={(e) => setNewPaketPassing(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddPaketModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition"
                >
                  Buat Paket Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
