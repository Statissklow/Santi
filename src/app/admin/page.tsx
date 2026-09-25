"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    Users,
    BookOpen,
    ClipboardList,
    Plus,
    Trash2,
    Edit2,
    Calendar,
    FileText,
    Music,
    Video,
    Upload,
    CheckCircle2,
    Clock,
    AlertCircle,
    XCircle,
    Download,
    LogOut,
    Eye,
    Globe,
    User as UserIcon,
    Search,
    ChevronRight,
    Loader2,
    Sparkles,
    ExternalLink,
    LogIn,
    Activity
} from "lucide-react";

// Accent & Palette
const ACCENT = "#e44c65";

interface LoginRecord {
    id: string;
    userId: string;
    createdAt: string;
    user?: {
        id: string;
        name: string;
        email: string;
        instrument?: string | null;
        role?: string;
    };
}

interface Student {
    id: string;
    name: string;
    email: string;
    instrument: string | null;
    phone: string | null;
    notes: string | null;
    lastLoginAt?: string | null;
    createdAt: string;
    loginLogs?: { id: string; createdAt: string }[];
    _count?: {
        assignedLessons: number;
        lessonLogs: number;
        loginLogs?: number;
    };
}

interface Material {
    id: string;
    name: string;
    category: string;
    source: string;
    url: string;
    size?: string | null;
}

interface Lesson {
    id: string;
    title: string;
    description: string;
    notes: string;
    instrument: string;
    isGlobal: boolean;
    studentId: string | null;
    studentName?: string;
    createdAt: string;
    files: Material[];
}

interface LessonLog {
    id: string;
    studentId: string;
    date: string;
    status: "PRESENT" | "ABSENT" | "EXCUSED" | "CANCELED";
    topic: string | null;
    homework: string | null;
    notes: string | null;
    student?: {
        id: string;
        name: string;
        email: string;
        instrument: string | null;
    };
}

interface Offer {
    id: string;
    icon: string;
    title: string;
    desc: string;
    cta: string;
    link: string;
    active: boolean;
    order: number;
}

const PRESET_ICONS = ["🎙️", "🎬", "🎵", "🎓", "🎁", "🥁", "⭐", "🎧", "🎹", "💡", "🔥", "🚀"];

function formatLastLogin(dateStr: string | null | undefined): { text: string; isRecent: boolean } {
    if (!dateStr) return { text: "Noch nie eingeloggt", isRecent: false };
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 5) return { text: "Gerade eben online", isRecent: true };
    if (diffMins < 60) return { text: `vor ${diffMins} Minuten`, isRecent: true };
    if (diffHours < 24) return { text: `Heute um ${date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr`, isRecent: true };
    if (diffDays === 1) return { text: `Gestern um ${date.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr`, isRecent: false };
    if (diffDays < 7) return { text: `vor ${diffDays} Tagen`, isRecent: false };
    return { text: date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" }), isRecent: false };
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<"dashboard" | "schueler" | "lektionen" | "journal" | "angebote">("dashboard");
    const [students, setStudents] = useState<Student[]>([]);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [logs, setLogs] = useState<LessonLog[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [recentLogins, setRecentLogins] = useState<LoginRecord[]>([]);
    const [loading, setLoading] = useState(true);

    // Selected student detail view
    const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

    // Modals
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [studentForm, setStudentForm] = useState({
        name: "",
        email: "",
        password: "",
        instrument: "Schlagzeug",
        phone: "",
        notes: ""
    });
    const [studentFormLoading, setStudentFormLoading] = useState(false);
    const [studentFormError, setStudentFormError] = useState("");

    // Lesson creation & editing
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
    const [lessonForm, setLessonForm] = useState({
        title: "",
        description: "",
        notes: "",
        instrument: "Schlagzeug",
        assignee: "ALL", // "ALL" or studentId
    });
    const [lessonFormLoading, setLessonFormLoading] = useState(false);

    // Upload state in lesson editor
    const [uploadingFile, setUploadingFile] = useState(false);
    const [fileCategory, setFileCategory] = useState("pdf");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Journal Modal
    const [showLogModal, setShowLogModal] = useState(false);
    const [logForm, setLogForm] = useState({
        studentId: "",
        date: new Date().toISOString().split("T")[0],
        status: "PRESENT" as "PRESENT" | "ABSENT" | "EXCUSED" | "CANCELED",
        topic: "",
        homework: "",
        notes: ""
    });
    const [logFormLoading, setLogFormLoading] = useState(false);

    // Offers Modal
    const [showOfferModal, setShowOfferModal] = useState(false);
    const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
    const [offerForm, setOfferForm] = useState({
        icon: "🎙️",
        title: "",
        desc: "",
        cta: "Anfragen",
        link: "/#contact",
        active: true,
    });
    const [offerFormLoading, setOfferFormLoading] = useState(false);

    // Filter states
    const [studentSearch, setStudentSearch] = useState("");
    const [lessonFilter, setLessonFilter] = useState("ALL");
    const [journalStudentFilter, setJournalStudentFilter] = useState("ALL");

    // Fetch initial data
    const loadAllData = async () => {
        try {
            setLoading(true);
            const [sRes, lRes, logRes, oRes, loginRes] = await Promise.all([
                fetch("/api/students"),
                fetch("/api/lessons"),
                fetch("/api/logs"),
                fetch("/api/offers?all=true"),
                fetch("/api/logins?limit=25"),
            ]);

            const [sData, lData, logData, oData, loginData] = await Promise.all([
                sRes.json(),
                lRes.json(),
                logRes.json(),
                oRes.json(),
                loginRes.json(),
            ]);

            setStudents(Array.isArray(sData) ? sData : []);
            setLessons(Array.isArray(lData) ? lData : []);
            setLogs(Array.isArray(logData) ? logData : []);
            setOffers(Array.isArray(oData) ? oData : []);
            setRecentLogins(Array.isArray(loginData) ? loginData : []);
        } catch (err) {
            console.error("Error loading admin data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role === "ADMIN") {
            loadAllData();
        }
    }, [status, session]);

    // Student CRUD
    const handleSaveStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        setStudentFormLoading(true);
        setStudentFormError("");

        try {
            if (editingStudent) {
                // Update
                const res = await fetch(`/api/students/${editingStudent.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(studentForm),
                });
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || "Fehler beim Aktualisieren des Schülers");
                }
                const updated = await res.json();
                setStudents(prev => prev.map(s => s.id === updated.id ? { ...s, ...updated } : s));
            } else {
                // Create
                const res = await fetch("/api/students", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(studentForm),
                });
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || "Fehler beim Erstellen des Schülers");
                }
                const created = await res.json();
                setStudents(prev => [...prev, created]);
            }
            setShowStudentModal(false);
            setEditingStudent(null);
            setStudentForm({ name: "", email: "", password: "", instrument: "Schlagzeug", phone: "", notes: "" });
        } catch (err: any) {
            setStudentFormError(err.message || "Fehler beim Speichern");
        } finally {
            setStudentFormLoading(false);
        }
    };

    const handleDeleteStudent = async (id: string, name: string) => {
        if (!confirm(`Möchtest du den Schüler "${name}" wirklich löschen?`)) return;

        try {
            const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
            if (res.ok) {
                setStudents(prev => prev.filter(s => s.id !== id));
                if (selectedStudentId === id) setSelectedStudentId(null);
            }
        } catch (err) {
            console.error("Error deleting student:", err);
        }
    };

    // Lesson CRUD
    const handleSaveLesson = async (e: React.FormEvent) => {
        e.preventDefault();
        setLessonFormLoading(true);

        const isGlobal = lessonForm.assignee === "ALL";
        const studentId = isGlobal ? null : lessonForm.assignee;

        try {
            if (editingLessonId && showLessonModal) {
                // Update basic lesson info
                const res = await fetch(`/api/lessons/${editingLessonId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: lessonForm.title,
                        description: lessonForm.description,
                        notes: lessonForm.notes,
                        instrument: lessonForm.instrument,
                        isGlobal,
                        studentId,
                    }),
                });
                if (res.ok) {
                    const updated = await res.json();
                    setLessons(prev => prev.map(l => l.id === updated.id ? { ...l, ...updated } : l));
                    setShowLessonModal(false);
                }
            } else {
                // Create
                const res = await fetch("/api/lessons", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: lessonForm.title,
                        description: lessonForm.description,
                        notes: lessonForm.notes,
                        instrument: lessonForm.instrument,
                        isGlobal,
                        studentId,
                    }),
                });
                if (res.ok) {
                    const created = await res.json();
                    setLessons(prev => [created, ...prev]);
                    setShowLessonModal(false);
                    setEditingLessonId(created.id); // Open editor immediately to add materials
                }
            }
        } catch (err) {
            console.error("Error saving lesson:", err);
        } finally {
            setLessonFormLoading(false);
        }
    };

    const handleDeleteLesson = async (id: string, title: string) => {
        if (!confirm(`Möchtest du die Lektion "${title}" wirklich löschen?`)) return;

        try {
            const res = await fetch(`/api/lessons/${id}`, { method: "DELETE" });
            if (res.ok) {
                setLessons(prev => prev.filter(l => l.id !== id));
                if (editingLessonId === id) setEditingLessonId(null);
            }
        } catch (err) {
            console.error("Error deleting lesson:", err);
        }
    };

    // Material Upload to Lesson
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, lessonId: string) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setUploadingFile(true);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const formData = new FormData();
            formData.append("file", file);

            try {
                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!uploadRes.ok) throw new Error("Upload fehlgeschlagen");
                const { url } = await uploadRes.json();

                // Save material to lesson
                const matRes = await fetch("/api/materials", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        lessonId,
                        name: file.name,
                        category: fileCategory,
                        source: "upload",
                        url,
                        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                    }),
                });

                if (matRes.ok) {
                    const newMat = await matRes.json();
                    setLessons(prev => prev.map(l => {
                        if (l.id === lessonId) {
                            return { ...l, files: [...l.files, newMat] };
                        }
                        return l;
                    }));
                }
            } catch (err) {
                console.error("File upload error:", err);
                alert("Fehler beim Hochladen der Datei.");
            }
        }

        setUploadingFile(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDeleteMaterial = async (lessonId: string, materialId: string) => {
        try {
            const res = await fetch("/api/materials", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: materialId }),
            });
            if (res.ok) {
                setLessons(prev => prev.map(l => {
                    if (l.id === lessonId) {
                        return { ...l, files: l.files.filter(f => f.id !== materialId) };
                    }
                    return l;
                }));
            }
        } catch (err) {
            console.error("Error deleting material:", err);
        }
    };

    // Journal CRUD
    const handleSaveLog = async (e: React.FormEvent) => {
        e.preventDefault();
        setLogFormLoading(true);

        try {
            const res = await fetch("/api/logs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(logForm),
            });
            if (res.ok) {
                const created = await res.json();
                setLogs(prev => [created, ...prev]);
                setShowLogModal(false);
                setLogForm({
                    studentId: "",
                    date: new Date().toISOString().split("T")[0],
                    status: "PRESENT",
                    topic: "",
                    homework: "",
                    notes: ""
                });
            }
        } catch (err) {
            console.error("Error saving log:", err);
        } finally {
            setLogFormLoading(false);
        }
    };

    const handleDeleteLog = async (id: string) => {
        if (!confirm("Möchtest du diesen Journaleintrag löschen?")) return;

        try {
            const res = await fetch("/api/logs", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (res.ok) {
                setLogs(prev => prev.filter(l => l.id !== id));
            }
        } catch (err) {
            console.error("Error deleting log:", err);
        }
    };

    // Offers CRUD
    const handleSaveOffer = async (e: React.FormEvent) => {
        e.preventDefault();
        setOfferFormLoading(true);

        try {
            if (editingOffer) {
                const res = await fetch(`/api/offers/${editingOffer.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(offerForm),
                });
                if (res.ok) {
                    const updated = await res.json();
                    setOffers(prev => prev.map(o => o.id === updated.id ? updated : o));
                    setShowOfferModal(false);
                    setEditingOffer(null);
                }
            } else {
                const res = await fetch("/api/offers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(offerForm),
                });
                if (res.ok) {
                    const created = await res.json();
                    setOffers(prev => [...prev, created]);
                    setShowOfferModal(false);
                }
            }
            setOfferForm({ icon: "🎙️", title: "", desc: "", cta: "Anfragen", link: "/#contact", active: true });
        } catch (err) {
            console.error("Error saving offer:", err);
        } finally {
            setOfferFormLoading(false);
        }
    };

    const handleToggleOfferActive = async (offer: Offer) => {
        const newActive = !offer.active;
        setOffers(prev => prev.map(o => o.id === offer.id ? { ...o, active: newActive } : o));

        try {
            await fetch(`/api/offers/${offer.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ active: newActive }),
            });
        } catch (err) {
            console.error("Error toggling offer:", err);
            setOffers(prev => prev.map(o => o.id === offer.id ? { ...o, active: !newActive } : o));
        }
    };

    const handleDeleteOffer = async (id: string, title: string) => {
        if (!confirm(`Möchtest du das Angebot "${title}" wirklich löschen?`)) return;

        try {
            const res = await fetch(`/api/offers/${id}`, { method: "DELETE" });
            if (res.ok) {
                setOffers(prev => prev.filter(o => o.id !== id));
            }
        } catch (err) {
            console.error("Error deleting offer:", err);
        }
    };

    // Filtered lists
    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
        (s.instrument && s.instrument.toLowerCase().includes(studentSearch.toLowerCase()))
    );

    const filteredLessons = lessons.filter(l => {
        if (lessonFilter === "ALL") return true;
        if (lessonFilter === "GLOBAL") return l.isGlobal;
        return l.studentId === lessonFilter;
    });

    const filteredLogs = logs.filter(l => {
        if (journalStudentFilter === "ALL") return true;
        return l.studentId === journalStudentFilter;
    });

    const selectedStudent = students.find(s => s.id === selectedStudentId);
    const activeEditingLesson = lessons.find(l => l.id === editingLessonId);

    return (
        <div className="min-h-screen bg-[#0e0f15] text-gray-200 font-sans pt-24 sm:pt-28">
            <div className="flex min-h-[calc(100vh-7rem)]">
                {/* ─── SIDEBAR ─────────────────────────────────────────── */}
                <aside className="w-64 bg-[#14151f] border-r border-white/10 flex flex-col shrink-0">
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🥁</span>
                            <div>
                                <h2 className="text-base font-bold text-white tracking-wide">DrumHub</h2>
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#e44c65]">
                                    Lehrer Dashboard
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="p-4 space-y-1.5 flex-1">
                        <button
                            onClick={() => { setActiveTab("dashboard"); setSelectedStudentId(null); setEditingLessonId(null); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                activeTab === "dashboard"
                                    ? "bg-[#e44c65]/15 text-[#e44c65] border border-[#e44c65]/30 shadow-lg"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <span className="text-lg">📊</span>
                            <span>Übersicht</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab("schueler"); setEditingLessonId(null); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                activeTab === "schueler"
                                    ? "bg-[#e44c65]/15 text-[#e44c65] border border-[#e44c65]/30 shadow-lg"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <Users size={18} />
                            <span>Schüler ({students.length})</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab("lektionen"); setSelectedStudentId(null); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                activeTab === "lektionen"
                                    ? "bg-[#e44c65]/15 text-[#e44c65] border border-[#e44c65]/30 shadow-lg"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <BookOpen size={18} />
                            <span>Lektionen ({lessons.length})</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab("journal"); setSelectedStudentId(null); setEditingLessonId(null); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                activeTab === "journal"
                                    ? "bg-[#e44c65]/15 text-[#e44c65] border border-[#e44c65]/30 shadow-lg"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <ClipboardList size={18} />
                            <span>Unterrichtsjournal</span>
                        </button>

                        <button
                            onClick={() => { setActiveTab("angebote"); setSelectedStudentId(null); setEditingLessonId(null); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                activeTab === "angebote"
                                    ? "bg-[#e44c65]/15 text-[#e44c65] border border-[#e44c65]/30 shadow-lg"
                                    : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <Sparkles size={18} />
                            <span>Angebote & Services ({offers.length})</span>
                        </button>
                    </nav>

                    {/* Admin Sign Out */}
                    <div className="p-4 border-t border-white/10">
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                        >
                            <LogOut size={16} />
                            <span>Abmelden</span>
                        </button>
                    </div>
                </aside>

                {/* ─── MAIN CONTENT AREA ──────────────────────────────── */}
                <main className="flex-1 p-8 sm:p-10 overflow-y-auto">
                    {loading ? (
                        <div className="h-96 flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-[#e44c65] animate-spin" />
                        </div>
                    ) : (
                        <>
                            {/* TAB 1: ÜBERSICHT (DASHBOARD) */}
                            {activeTab === "dashboard" && (
                                <div className="space-y-8 max-w-7xl mx-auto">
                                    <div>
                                        <h1 className="text-3xl font-light tracking-[0.1em] uppercase text-white">
                                            Willkommen zurück, Santino!
                                        </h1>
                                        <p className="text-sm text-gray-400 font-light mt-1">
                                            Hier ist der aktuelle Stand deiner Schüler, Lektionen und Unterrichtsstunden.
                                        </p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                        <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e44c65]/10 rounded-bl-full pointer-events-none" />
                                            <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                                                <Users size={16} className="text-[#e44c65]" />
                                                <span>Aktive Schüler</span>
                                            </div>
                                            <div className="text-3xl font-bold text-white">{students.length}</div>
                                        </div>

                                        <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full pointer-events-none" />
                                            <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                                                <BookOpen size={16} className="text-blue-400" />
                                                <span>Lektionen</span>
                                            </div>
                                            <div className="text-3xl font-bold text-white">{lessons.length}</div>
                                        </div>

                                        <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
                                            <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                                                <ClipboardList size={16} className="text-emerald-400" />
                                                <span>Journal-Einträge</span>
                                            </div>
                                            <div className="text-3xl font-bold text-white">{logs.length}</div>
                                        </div>

                                        <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full pointer-events-none" />
                                            <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
                                                <Sparkles size={16} className="text-purple-400" />
                                                <span>Schüler-Angebote</span>
                                            </div>
                                            <div className="text-3xl font-bold text-white">
                                                {offers.filter(o => o.active).length} <span className="text-sm font-normal text-white/40">/ {offers.length} aktiv</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6">
                                        <h3 className="text-base font-bold text-white mb-4">Schnellzugriff</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <button
                                                onClick={() => {
                                                    setEditingStudent(null);
                                                    setStudentForm({ name: "", email: "", password: "", instrument: "Schlagzeug", phone: "", notes: "" });
                                                    setShowStudentModal(true);
                                                }}
                                                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left transition-all"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[#e44c65]/20 text-[#e44c65] flex items-center justify-center font-bold">
                                                    +
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white text-sm">Neuer Schüler</p>
                                                    <p className="text-xs text-white/40">Zugang anlegen</p>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setEditingLessonId(null);
                                                    setLessonForm({ title: "", description: "", notes: "", instrument: "Schlagzeug", assignee: "ALL" });
                                                    setShowLessonModal(true);
                                                }}
                                                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left transition-all"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                                                    +
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white text-sm">Neue Lektion</p>
                                                    <p className="text-xs text-white/40">Noten & Audio teilen</p>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setLogForm({
                                                        studentId: students[0]?.id || "",
                                                        date: new Date().toISOString().split("T")[0],
                                                        status: "PRESENT",
                                                        topic: "",
                                                        homework: "",
                                                        notes: ""
                                                    });
                                                    setShowLogModal(true);
                                                }}
                                                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left transition-all"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                                                    +
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white text-sm">Unterrichtseintrag</p>
                                                    <p className="text-xs text-white/40">Hausaufgabe festhalten</p>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => setActiveTab("angebote")}
                                                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left transition-all"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                                                    ⭐
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white text-sm">Angebote verwalten</p>
                                                    <p className="text-xs text-white/40">Services & Promo</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* ─── LIVE-AKTIVITÄT: WER HAT SICH WANN EINGELOGGT? ──── */}
                                    <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                                    <Activity size={16} />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-bold text-white">Letzte Schüler-Logins (Wer war wann online?)</h3>
                                                    <p className="text-xs text-white/50">Automatische Erfassung jedes Logins im Schülerportal</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-emerald-400/80 font-medium flex items-center gap-1.5">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                                Live-Tracking aktiv
                                            </span>
                                        </div>

                                        {recentLogins.length === 0 ? (
                                            <div className="p-6 text-center bg-white/[0.02] border border-white/5 rounded-xl">
                                                <p className="text-xs text-white/40">Noch keine Logins erfasst.</p>
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-white/5">
                                                {recentLogins.slice(0, 10).map((record) => {
                                                    const date = new Date(record.createdAt);
                                                    const formatted = formatLastLogin(record.createdAt);
                                                    const isStudent = record.user?.role === "STUDENT";

                                                    return (
                                                        <div key={record.id} className="py-3 flex items-center justify-between gap-4">
                                                            <div className="flex items-center gap-3 min-w-0">
                                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                                                                    isStudent
                                                                        ? "bg-[#e44c65]/15 text-[#e44c65] border border-[#e44c65]/30"
                                                                        : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                                                                }`}>
                                                                    {record.user?.name?.charAt(0).toUpperCase() || "?"}
                                                                </div>
                                                                <div className="truncate">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-sm font-semibold text-white truncate">
                                                                            {record.user?.name || "Unbekannter Nutzer"}
                                                                        </span>
                                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                                            isStudent ? "bg-white/5 text-white/60" : "bg-purple-500/20 text-purple-300"
                                                                        }`}>
                                                                            {isStudent ? (record.user?.instrument ? `🥁 ${record.user.instrument}` : "Schüler") : "Admin"}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-xs text-white/40 truncate">{record.user?.email}</p>
                                                                </div>
                                                            </div>

                                                            <div className="text-right shrink-0">
                                                                <span className={`text-xs font-semibold block ${formatted.isRecent ? "text-emerald-400" : "text-white/70"}`}>
                                                                    {formatted.text}
                                                                </span>
                                                                <span className="text-[11px] text-white/30">
                                                                    {date.toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: SCHÜLERVERWALTUNG */}
                            {activeTab === "schueler" && (
                                <div className="space-y-6 max-w-7xl mx-auto">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-white tracking-tight">Schülerverwaltung</h1>
                                            <p className="text-sm text-gray-400">Verwalte deine Schüler, Kontaktdaten, Zugänge und Login-Aktivitäten.</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingStudent(null);
                                                setStudentForm({ name: "", email: "", password: "", instrument: "Schlagzeug", phone: "", notes: "" });
                                                setShowStudentModal(true);
                                            }}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e44c65] text-white text-sm font-semibold shadow-lg hover:bg-[#c43c52] transition-colors"
                                        >
                                            <Plus size={18} />
                                            <span>Neuer Schüler</span>
                                        </button>
                                    </div>

                                    {/* Search Bar */}
                                    <div className="relative">
                                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                                        <input
                                            type="text"
                                            placeholder="Schüler nach Name, E-Mail oder Instrument durchsuchen..."
                                            value={studentSearch}
                                            onChange={e => setStudentSearch(e.target.value)}
                                            className="w-full bg-[#14151f] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#e44c65]"
                                        />
                                    </div>

                                    {/* Students List */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {filteredStudents.map(student => {
                                            const loginInfo = formatLastLogin(student.lastLoginAt);

                                            return (
                                                <div
                                                    key={student.id}
                                                    className="bg-[#14151f] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <div className="flex items-start justify-between gap-3 mb-3">
                                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#e44c65] to-orange-400 text-white flex items-center justify-center font-bold text-lg">
                                                                {student.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingStudent(student);
                                                                        setStudentForm({
                                                                            name: student.name,
                                                                            email: student.email,
                                                                            password: "",
                                                                            instrument: student.instrument || "Schlagzeug",
                                                                            phone: student.phone || "",
                                                                            notes: student.notes || ""
                                                                        });
                                                                        setShowStudentModal(true);
                                                                    }}
                                                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                                                                    title="Bearbeiten"
                                                                >
                                                                    <Edit2 size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteStudent(student.id, student.name)}
                                                                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                                                    title="Löschen"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <h3 className="text-lg font-bold text-white mb-1">{student.name}</h3>
                                                        <p className="text-xs text-white/50 mb-3">{student.email}</p>

                                                        <div className="space-y-1.5 text-xs text-white/70">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-white/40">Instrument:</span>
                                                                <span className="font-semibold text-white">🥁 {student.instrument || "Schlagzeug"}</span>
                                                            </div>
                                                            {student.phone && (
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-white/40">Telefon:</span>
                                                                    <span>{student.phone}</span>
                                                                </div>
                                                            )}
                                                            {student.notes && (
                                                                <div className="mt-2 p-2 bg-white/[0.02] border border-white/5 rounded-lg text-white/60 italic text-[11px]">
                                                                    {student.notes}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Last Login Info Badge on Student Card */}
                                                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs">
                                                            <span className={`w-2 h-2 rounded-full shrink-0 ${
                                                                loginInfo.isRecent ? "bg-emerald-400 animate-pulse" : student.lastLoginAt ? "bg-amber-400" : "bg-white/20"
                                                            }`} />
                                                            <span className="text-white/40">Zuletzt online:</span>
                                                            <span className={`font-semibold ${loginInfo.isRecent ? "text-emerald-400" : student.lastLoginAt ? "text-white/80" : "text-white/40"}`}>
                                                                {loginInfo.text}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                                                        <span>{student._count?.assignedLessons || 0} Lektionen</span>
                                                        <span>{student._count?.lessonLogs || 0} Stunden</span>
                                                        <button
                                                            onClick={() => setSelectedStudentId(student.id)}
                                                            className="text-[#e44c65] font-semibold hover:underline inline-flex items-center gap-1"
                                                        >
                                                            <span>Details & Logins</span>
                                                            <ChevronRight size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* TAB 3: LEKTIONEN VERWALTEN */}
                            {activeTab === "lektionen" && (
                                <div className="space-y-6 max-w-7xl mx-auto">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-white tracking-tight">Lektionen & Material</h1>
                                            <p className="text-sm text-gray-400">Erstelle Lektionen und lade PDFs, Audio und Videos hoch.</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingLessonId(null);
                                                setLessonForm({ title: "", description: "", notes: "", instrument: "Schlagzeug", assignee: "ALL" });
                                                setShowLessonModal(true);
                                            }}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e44c65] text-white text-sm font-semibold shadow-lg hover:bg-[#c43c52] transition-colors"
                                        >
                                            <Plus size={18} />
                                            <span>Neue Lektion erstellen</span>
                                        </button>
                                    </div>

                                    {/* Filter: All, Global, Specific student */}
                                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                        <button
                                            onClick={() => setLessonFilter("ALL")}
                                            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                                lessonFilter === "ALL"
                                                    ? "bg-[#e44c65] text-white shadow-md"
                                                    : "bg-[#14151f] text-white/60 hover:text-white border border-white/5"
                                            }`}
                                        >
                                            Alle Lektionen ({lessons.length})
                                        </button>
                                        <button
                                            onClick={() => setLessonFilter("GLOBAL")}
                                            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                                lessonFilter === "GLOBAL"
                                                    ? "bg-[#e44c65] text-white shadow-md"
                                                    : "bg-[#14151f] text-white/60 hover:text-white border border-white/5"
                                            }`}
                                        >
                                            🌐 Für alle Schüler ({lessons.filter(l => l.isGlobal).length})
                                        </button>
                                        {students.map(s => (
                                            <button
                                                key={s.id}
                                                onClick={() => setLessonFilter(s.id)}
                                                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                                    lessonFilter === s.id
                                                        ? "bg-[#e44c65] text-white shadow-md"
                                                        : "bg-[#14151f] text-white/60 hover:text-white border border-white/5"
                                                }`}
                                            >
                                                👤 {s.name} ({lessons.filter(l => l.studentId === s.id).length})
                                            </button>
                                        ))}
                                    </div>

                                    {/* Lessons List */}
                                    <div className="space-y-4">
                                        {filteredLessons.map(lesson => (
                                            <div
                                                key={lesson.id}
                                                className="bg-[#14151f] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#e44c65]/15 text-[#e44c65] border border-[#e44c65]/30">
                                                                🥁 {lesson.instrument}
                                                            </span>
                                                            {lesson.isGlobal ? (
                                                                <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                                    🌐 Alle Schüler
                                                                </span>
                                                            ) : (
                                                                <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                                    👤 {lesson.studentName}
                                                                </span>
                                                            )}
                                                            <span className="text-xs text-white/40">
                                                                {new Date(lesson.createdAt).toLocaleDateString("de-DE")}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-lg font-bold text-white mb-2">{lesson.title}</h3>
                                                        {lesson.description && (
                                                            <p className="text-sm text-white/70 mb-3">{lesson.description}</p>
                                                        )}

                                                        {lesson.notes && (
                                                            <div className="p-3 bg-white/[0.02] border-l-2 border-[#e44c65] rounded-r-lg text-xs text-white/60 mb-3">
                                                                <span className="font-bold text-[#e44c65] block mb-1">Lehrer-Notiz:</span>
                                                                {lesson.notes}
                                                            </div>
                                                        )}

                                                        {/* Attached Files List */}
                                                        {lesson.files && lesson.files.length > 0 && (
                                                            <div className="mt-4 pt-4 border-t border-white/10">
                                                                <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2">
                                                                    Angehängte Materialien ({lesson.files.length})
                                                                </p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {lesson.files.map(file => (
                                                                        <div
                                                                            key={file.id}
                                                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs"
                                                                        >
                                                                            <span>{file.category === "pdf" ? "📄" : file.category === "audio" ? "🎵" : "🎬"}</span>
                                                                            <a href={file.url} target="_blank" rel="noreferrer" className="text-white hover:underline truncate max-w-xs">
                                                                                {file.name}
                                                                            </a>
                                                                            <button
                                                                                onClick={() => handleDeleteMaterial(lesson.id, file.id)}
                                                                                className="text-red-400 hover:text-red-300 ml-1"
                                                                                title="Datei entfernen"
                                                                            >
                                                                                ✕
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <button
                                                            onClick={() => setEditingLessonId(lesson.id)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all"
                                                        >
                                                            <Upload size={14} />
                                                            <span>Dateien hochladen</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteLesson(lesson.id, lesson.title)}
                                                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                                            title="Lektion löschen"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TAB 4: UNTERRICHTSJOURNAL */}
                            {activeTab === "journal" && (
                                <div className="space-y-6 max-w-7xl mx-auto">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-white tracking-tight">Unterrichtsjournal</h1>
                                            <p className="text-sm text-gray-400">Halte Anwesenheit, behandelte Inhalte und Hausaufgaben fest.</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setLogForm({
                                                    studentId: students[0]?.id || "",
                                                    date: new Date().toISOString().split("T")[0],
                                                    status: "PRESENT",
                                                    topic: "",
                                                    homework: "",
                                                    notes: ""
                                                });
                                                setShowLogModal(true);
                                            }}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e44c65] text-white text-sm font-semibold shadow-lg hover:bg-[#c43c52] transition-colors"
                                        >
                                            <Plus size={18} />
                                            <span>Neuer Eintrag</span>
                                        </button>
                                    </div>

                                    {/* Filter by Student */}
                                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                                        <button
                                            onClick={() => setJournalStudentFilter("ALL")}
                                            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                                journalStudentFilter === "ALL"
                                                    ? "bg-[#e44c65] text-white shadow-md"
                                                    : "bg-[#14151f] text-white/60 hover:text-white border border-white/5"
                                            }`}
                                        >
                                            Alle Schüler ({logs.length})
                                        </button>
                                        {students.map(s => (
                                            <button
                                                key={s.id}
                                                onClick={() => setJournalStudentFilter(s.id)}
                                                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                                    journalStudentFilter === s.id
                                                        ? "bg-[#e44c65] text-white shadow-md"
                                                        : "bg-[#14151f] text-white/60 hover:text-white border border-white/5"
                                                }`}
                                            >
                                                👤 {s.name} ({logs.filter(l => l.studentId === s.id).length})
                                            </button>
                                        ))}
                                    </div>

                                    {/* Journal Entries List */}
                                    <div className="space-y-4">
                                        {filteredLogs.map(log => {
                                            const isPresent = log.status === "PRESENT";
                                            const isExcused = log.status === "EXCUSED";
                                            const isAbsent = log.status === "ABSENT";
                                            const isCanceled = log.status === "CANCELED";

                                            return (
                                                <div
                                                    key={log.id}
                                                    className="bg-[#14151f] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-lg"
                                                >
                                                    <div
                                                        className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                                            isPresent ? "bg-emerald-500" : isExcused ? "bg-amber-500" : isAbsent ? "bg-red-500" : "bg-gray-500"
                                                        }`}
                                                    />

                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-bold text-white text-base">
                                                                {log.student?.name || "Unbekannter Schüler"}
                                                            </span>
                                                            <span className="text-xs text-white/40">
                                                                {new Date(log.date).toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            {isPresent && (
                                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                                    ✅ Anwesend
                                                                </span>
                                                            )}
                                                            {isExcused && (
                                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                                    ⚠️ Entschuldigt
                                                                </span>
                                                            )}
                                                            {isAbsent && (
                                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                                                    ❌ Abwesend
                                                                </span>
                                                            )}
                                                            {isCanceled && (
                                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20">
                                                                    🚫 Ausgefallen
                                                                </span>
                                                            )}

                                                            <button
                                                                onClick={() => handleDeleteLog(log.id)}
                                                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors ml-2"
                                                                title="Eintrag löschen"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {log.topic && (
                                                        <div className="mb-3">
                                                            <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                                                                Behandelte Inhalte:
                                                            </span>
                                                            <p className="text-sm text-white/90 font-medium">{log.topic}</p>
                                                        </div>
                                                    )}

                                                    {log.homework && (
                                                        <div className="mt-3 p-3.5 bg-[#e44c65]/10 border border-[#e44c65]/20 rounded-xl">
                                                            <span className="text-xs font-bold text-[#e44c65] uppercase tracking-wider block mb-1">
                                                                🎯 Hausaufgabe & Übe-Fokus:
                                                            </span>
                                                            <p className="text-sm text-white font-medium">{log.homework}</p>
                                                        </div>
                                                    )}

                                                    {log.notes && (
                                                        <div className="mt-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-white/60">
                                                            <span className="font-semibold text-white/40 block mb-1">Interne Notiz:</span>
                                                            {log.notes}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* TAB 5: ANGEBOTE & SERVICES VERWALTUNG */}
                            {activeTab === "angebote" && (
                                <div className="space-y-8 max-w-7xl mx-auto">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-2xl font-bold text-white tracking-tight">Schüler-Angebote & Services</h1>
                                            <p className="text-sm text-gray-400">
                                                Diese Angebote erscheinen im Schülerportal unten als Services-Streifen. Du kannst sie anpassen oder aktivieren/deaktivieren.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingOffer(null);
                                                setOfferForm({ icon: "🎙️", title: "", desc: "", cta: "Anfragen", link: "/#contact", active: true });
                                                setShowOfferModal(true);
                                            }}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e44c65] text-white text-sm font-semibold shadow-lg hover:bg-[#c43c52] transition-colors"
                                        >
                                            <Plus size={18} />
                                            <span>Neues Angebot erstellen</span>
                                        </button>
                                    </div>

                                    {/* Live Preview Strip */}
                                    <div className="bg-[#14151f] border border-white/10 rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-bold uppercase tracking-wider text-white/40 flex items-center gap-2">
                                                <Eye size={15} className="text-[#e44c65]" />
                                                <span>Live-Vorschau im Schülerportal</span>
                                            </span>
                                            <span className="text-xs text-white/40">
                                                {offers.filter(o => o.active).length} von {offers.length} Angeboten aktiv
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {offers.filter(o => o.active).map(o => (
                                                <div
                                                    key={o.id}
                                                    className="p-5 bg-white/[0.02] border border-white/10 rounded-2xl flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <span className="text-2xl mb-3 block">{o.icon}</span>
                                                        <h4 className="text-sm font-bold text-white mb-1">{o.title}</h4>
                                                        <p className="text-xs text-white/50 leading-relaxed mb-4">{o.desc}</p>
                                                    </div>
                                                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e44c65]">
                                                        <span>{o.cta}</span>
                                                        <span>→</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Offers Management List */}
                                    <div className="space-y-4">
                                        <h3 className="text-base font-bold text-white">Alle Angebote bearbeiten</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {offers.map(offer => (
                                                <div
                                                    key={offer.id}
                                                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                                                        offer.active
                                                            ? "bg-[#14151f] border-white/10 hover:border-white/20"
                                                            : "bg-white/[0.02] border-white/5 opacity-60"
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
                                                            {offer.icon}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                                <h4 className="text-base font-bold text-white truncate">{offer.title}</h4>
                                                                {/* Active Toggle Switch */}
                                                                <button
                                                                    onClick={() => handleToggleOfferActive(offer)}
                                                                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                                                                        offer.active
                                                                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                                                            : "bg-white/10 text-white/40 border border-white/10"
                                                                    }`}
                                                                >
                                                                    {offer.active ? "Aktiv" : "Pausiert"}
                                                                </button>
                                                            </div>
                                                            <p className="text-xs text-white/60 line-clamp-2 mb-2">{offer.desc}</p>
                                                            <div className="flex items-center gap-3 text-[11px] text-white/40">
                                                                <span>Button: <strong className="text-white/70">{offer.cta}</strong></span>
                                                                <span>•</span>
                                                                <span className="truncate">Link: {offer.link}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingOffer(offer);
                                                                setOfferForm({
                                                                    icon: offer.icon,
                                                                    title: offer.title,
                                                                    desc: offer.desc,
                                                                    cta: offer.cta,
                                                                    link: offer.link,
                                                                    active: offer.active,
                                                                });
                                                                setShowOfferModal(true);
                                                            }}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white transition-all"
                                                        >
                                                            <Edit2 size={13} />
                                                            <span>Bearbeiten</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteOffer(offer.id, offer.title)}
                                                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                                            title="Löschen"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>

            {/* ─── MODAL: SCHÜLER-DETAILS (HISTORIE & LOGIN-AKTIVITÄT) ─ */}
            {selectedStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-[#14151f] border border-white/15 rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#e44c65] to-orange-400 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                                    {selectedStudent.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-xl font-bold text-white">{selectedStudent.name}</h3>
                                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#e44c65]/15 text-[#e44c65] border border-[#e44c65]/30">
                                            🥁 {selectedStudent.instrument || "Schlagzeug"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white/50 mt-0.5">{selectedStudent.email}</p>
                                    {selectedStudent.phone && (
                                        <p className="text-xs text-white/40 mt-0.5">📞 {selectedStudent.phone}</p>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedStudentId(null)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Login Activity Section */}
                        <div className="mb-6 p-5 bg-white/[0.02] border border-white/10 rounded-2xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <LogIn size={16} className="text-emerald-400" />
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                                        Login-Aktivität (Wann online gewesen?)
                                    </h4>
                                </div>
                                <span className="text-xs text-emerald-400 font-semibold">
                                    {formatLastLogin(selectedStudent.lastLoginAt).text}
                                </span>
                            </div>

                            {selectedStudent.loginLogs && selectedStudent.loginLogs.length > 0 ? (
                                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                                    {selectedStudent.loginLogs.map((log) => {
                                        const d = new Date(log.createdAt);
                                        return (
                                            <div key={log.id} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-white/[0.02]">
                                                <span className="text-white/80 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                    <span>{d.toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "long", year: "numeric" })}</span>
                                                </span>
                                                <span className="font-mono text-white/50">
                                                    {d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit" })} Uhr
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-xs text-white/40 italic">
                                    {selectedStudent.lastLoginAt ? `Zuletzt eingeloggt am: ${new Date(selectedStudent.lastLoginAt).toLocaleString("de-DE")}` : "Noch kein Login verzeichnet."}
                                </p>
                            )}
                        </div>

                        {/* Recent Journal History */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
                                Unterrichtsstunden ({logs.filter(l => l.studentId === selectedStudent.id).length})
                            </h4>
                            <div className="space-y-3">
                                {logs.filter(l => l.studentId === selectedStudent.id).length === 0 ? (
                                    <p className="text-xs text-white/40 italic">Noch keine Stunden im Journal dokumentiert.</p>
                                ) : (
                                    logs.filter(l => l.studentId === selectedStudent.id).map(log => (
                                        <div key={log.id} className="p-3.5 bg-white/[0.03] border border-white/5 rounded-xl text-xs space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-white">
                                                    {new Date(log.date).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}
                                                </span>
                                                <span className="text-[11px] font-semibold text-emerald-400">
                                                    {log.status === "PRESENT" ? "✅ Anwesend" : log.status === "EXCUSED" ? "⚠️ Entschuldigt" : "❌ Abwesend"}
                                                </span>
                                            </div>
                                            {log.topic && <p className="text-white/80">{log.topic}</p>}
                                            {log.homework && (
                                                <p className="text-[#e44c65] font-medium pt-1">🎯 {log.homework}</p>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                            <button
                                onClick={() => setSelectedStudentId(null)}
                                className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-semibold"
                            >
                                Schließen
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── MODAL: SCHÜLER ANLEGEN / BEARBEITEN ───────────────── */}
            {showStudentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-[#14151f] border border-white/15 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">
                                {editingStudent ? "Schüler bearbeiten" : "Neuen Schüler anlegen"}
                            </h3>
                            <button
                                onClick={() => setShowStudentModal(false)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {studentFormError && (
                            <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                                {studentFormError}
                            </div>
                        )}

                        <form onSubmit={handleSaveStudent} className="space-y-4">
                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={studentForm.name}
                                    onChange={e => setStudentForm({ ...studentForm, name: e.target.value })}
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">E-Mail *</label>
                                <input
                                    type="email"
                                    required
                                    value={studentForm.email}
                                    onChange={e => setStudentForm({ ...studentForm, email: e.target.value })}
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">
                                    {editingStudent ? "Neues Passwort (leer lassen zum Beibehalten)" : "Passwort *"}
                                </label>
                                <input
                                    type="password"
                                    required={!editingStudent}
                                    value={studentForm.password}
                                    onChange={e => setStudentForm({ ...studentForm, password: e.target.value })}
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Instrument</label>
                                    <select
                                        value={studentForm.instrument}
                                        onChange={e => setStudentForm({ ...studentForm, instrument: e.target.value })}
                                        className="w-full bg-[#181924] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                    >
                                        <option value="Schlagzeug">🥁 Schlagzeug</option>
                                        <option value="Cajon">🪘 Cajon</option>
                                        <option value="Hybrid Set">🎛️ Hybrid Set</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Telefon</label>
                                    <input
                                        type="tel"
                                        value={studentForm.phone}
                                        onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })}
                                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Interne Lehrer-Notizen</label>
                                <textarea
                                    rows={2}
                                    value={studentForm.notes}
                                    onChange={e => setStudentForm({ ...studentForm, notes: e.target.value })}
                                    placeholder="Notizen zum Leistungsstand, Übungszielen etc."
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={studentFormLoading}
                                    className="flex-1 py-3 bg-[#e44c65] text-white rounded-xl text-xs uppercase tracking-wider font-semibold shadow-lg hover:bg-[#c43c52] transition-colors disabled:opacity-50"
                                >
                                    {studentFormLoading ? "Speichert..." : editingStudent ? "Änderungen speichern" : "Schüler anlegen"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowStudentModal(false)}
                                    className="px-5 py-3 bg-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/15 transition-colors"
                                >
                                    Abbrechen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ─── MODAL: LEKTION ANLEGEN ────────────────────────────── */}
            {showLessonModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-[#14151f] border border-white/15 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Neue Lektion erstellen</h3>
                            <button onClick={() => setShowLessonModal(false)} className="text-white/40 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleSaveLesson} className="space-y-4">
                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Titel der Lektion *</label>
                                <input
                                    type="text"
                                    required
                                    value={lessonForm.title}
                                    onChange={e => setLessonForm({ ...lessonForm, title: e.target.value })}
                                    placeholder="z.B. Ghost Notes & Backbeat Essentials"
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Zuweisung *</label>
                                <select
                                    value={lessonForm.assignee}
                                    onChange={e => setLessonForm({ ...lessonForm, assignee: e.target.value })}
                                    className="w-full bg-[#181924] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                >
                                    <option value="ALL">🌐 Alle Schüler (Basis-Lektion)</option>
                                    <optgroup label="Spezifischer Schüler:">
                                        {students.map(s => (
                                            <option key={s.id} value={s.id}>👤 {s.name} ({s.instrument || "Schlagzeug"})</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Instrument</label>
                                    <select
                                        value={lessonForm.instrument}
                                        onChange={e => setLessonForm({ ...lessonForm, instrument: e.target.value })}
                                        className="w-full bg-[#181924] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                    >
                                        <option value="Schlagzeug">🥁 Schlagzeug</option>
                                        <option value="Cajon">🪘 Cajon</option>
                                        <option value="Hybrid Set">🎛️ Hybrid Set</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Beschreibung</label>
                                <textarea
                                    rows={2}
                                    value={lessonForm.description}
                                    onChange={e => setLessonForm({ ...lessonForm, description: e.target.value })}
                                    placeholder="Kurze Erklärung der Lektion..."
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Tipp von Santino (Notiz)</label>
                                <input
                                    type="text"
                                    value={lessonForm.notes}
                                    onChange={e => setLessonForm({ ...lessonForm, notes: e.target.value })}
                                    placeholder="z.B. Erst langsam bei 60 BPM üben"
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={lessonFormLoading}
                                    className="flex-1 py-3 bg-[#e44c65] text-white rounded-xl text-xs uppercase tracking-wider font-semibold shadow-lg hover:bg-[#c43c52] transition-colors disabled:opacity-50"
                                >
                                    {lessonFormLoading ? "Erstellt..." : "Lektion erstellen & Dateien hinzufügen →"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowLessonModal(false)}
                                    className="px-5 py-3 bg-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/15 transition-colors"
                                >
                                    Abbrechen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ─── DRAWER / MODAL: DATEIEN ZU LEKTION HOCHLADEN ──────── */}
            {editingLessonId && activeEditingLesson && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-[#14151f] border border-white/15 rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#e44c65]">Dateien verwalten</span>
                                <h3 className="text-xl font-bold text-white">{activeEditingLesson.title}</h3>
                            </div>
                            <button onClick={() => setEditingLessonId(null)} className="text-white/40 hover:text-white">✕</button>
                        </div>

                        {/* File Upload Box */}
                        <div className="p-6 bg-white/[0.02] border-2 border-dashed border-white/15 rounded-2xl text-center mb-6">
                            <div className="flex justify-center gap-3 mb-4">
                                {[
                                    { key: "pdf", label: "📄 PDF / Notenblatt" },
                                    { key: "audio", label: "🎵 Audio / MP3" },
                                    { key: "video", label: "🎬 Video" },
                                ].map(cat => (
                                    <button
                                        key={cat.key}
                                        type="button"
                                        onClick={() => setFileCategory(cat.key)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                            fileCategory === cat.key
                                                ? "bg-[#e44c65] text-white shadow"
                                                : "bg-white/5 text-white/50 hover:text-white"
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                id="lessonFileInput"
                                className="hidden"
                                onChange={e => handleFileUpload(e, activeEditingLesson.id)}
                            />

                            <label
                                htmlFor="lessonFileInput"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm cursor-pointer transition-all"
                            >
                                <Upload size={16} />
                                <span>{uploadingFile ? "Wird hochgeladen..." : "Datei vom Computer auswählen"}</span>
                            </label>
                            <p className="text-[11px] text-white/40 mt-2">
                                Unterstützt PDFs, Notenblätter, MP3 Audio-Playalongs und Videos
                            </p>
                        </div>

                        {/* Existing Files */}
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
                                Bereits hinterlegte Dateien ({activeEditingLesson.files?.length || 0})
                            </h4>

                            {activeEditingLesson.files?.length === 0 ? (
                                <p className="text-xs text-white/40 italic">Noch keine Dateien hochgeladen.</p>
                            ) : (
                                <div className="space-y-2">
                                    {activeEditingLesson.files?.map(f => (
                                        <div key={f.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-xs">
                                            <div className="flex items-center gap-2 truncate">
                                                <span>{f.category === "pdf" ? "📄" : f.category === "audio" ? "🎵" : "🎬"}</span>
                                                <span className="text-white font-medium truncate">{f.name}</span>
                                                {f.size && <span className="text-white/40">({f.size})</span>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                                                    Öffnen
                                                </a>
                                                <button
                                                    onClick={() => handleDeleteMaterial(activeEditingLesson.id, f.id)}
                                                    className="text-red-400 hover:text-red-300 ml-2"
                                                >
                                                    Löschen
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                            <button
                                onClick={() => setEditingLessonId(null)}
                                className="px-6 py-2.5 bg-[#e44c65] text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow hover:bg-[#c43c52]"
                            >
                                Fertig
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── MODAL: UNTERRICHTSJOURNAL EINTRAGEN ────────────────── */}
            {showLogModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-[#14151f] border border-white/15 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Unterrichtsstunde eintragen</h3>
                            <button onClick={() => setShowLogModal(false)} className="text-white/40 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleSaveLog} className="space-y-4">
                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Schüler *</label>
                                <select
                                    required
                                    value={logForm.studentId}
                                    onChange={e => setLogForm({ ...logForm, studentId: e.target.value })}
                                    className="w-full bg-[#181924] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                >
                                    <option value="">Schüler auswählen...</option>
                                    {students.map(s => (
                                        <option key={s.id} value={s.id}>👤 {s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Datum</label>
                                    <input
                                        type="date"
                                        required
                                        value={logForm.date}
                                        onChange={e => setLogForm({ ...logForm, date: e.target.value })}
                                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Anwesenheit</label>
                                    <select
                                        value={logForm.status}
                                        onChange={e => setLogForm({ ...logForm, status: e.target.value as any })}
                                        className="w-full bg-[#181924] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                    >
                                        <option value="PRESENT">✅ Anwesend</option>
                                        <option value="EXCUSED">⚠️ Entschuldigt</option>
                                        <option value="ABSENT">❌ Unentschuldigt</option>
                                        <option value="CANCELED">🚫 Ausgefallen</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Thema / Was wurde gemacht?</label>
                                <input
                                    type="text"
                                    value={logForm.topic}
                                    onChange={e => setLogForm({ ...logForm, topic: e.target.value })}
                                    placeholder="z.B. Song 'Rosanna' Half-Time Shuffle geübt"
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-[#e44c65] block mb-1.5">Hausaufgabe / Übungsfokus für den Schüler</label>
                                <textarea
                                    rows={2}
                                    value={logForm.homework}
                                    onChange={e => setLogForm({ ...logForm, homework: e.target.value })}
                                    placeholder="z.B. Takt 1-16 mit Backbeat bei 80 BPM üben..."
                                    className="w-full bg-[#e44c65]/5 border border-[#e44c65]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Interne Lehrer-Notiz</label>
                                <input
                                    type="text"
                                    value={logForm.notes}
                                    onChange={e => setLogForm({ ...logForm, notes: e.target.value })}
                                    placeholder="Optional"
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={logFormLoading}
                                    className="flex-1 py-3 bg-[#e44c65] text-white rounded-xl text-xs uppercase tracking-wider font-semibold shadow-lg hover:bg-[#c43c52] transition-colors disabled:opacity-50"
                                >
                                    {logFormLoading ? "Speichert..." : "Eintrag speichern"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowLogModal(false)}
                                    className="px-5 py-3 bg-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/15 transition-colors"
                                >
                                    Abbrechen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ─── MODAL: ANGEBOT ANLEGEN / BEARBEITEN ────────────────── */}
            {showOfferModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-[#14151f] border border-white/15 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">
                                {editingOffer ? "Angebot bearbeiten" : "Neues Angebot erstellen"}
                            </h3>
                            <button onClick={() => setShowOfferModal(false)} className="text-white/40 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleSaveOffer} className="space-y-4">
                            {/* Icon Presets Picker */}
                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Icon / Emoji</label>
                                <div className="flex items-center gap-2 flex-wrap mb-2">
                                    {PRESET_ICONS.map(emoji => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => setOfferForm({ ...offerForm, icon: emoji })}
                                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                                                offerForm.icon === emoji
                                                    ? "bg-[#e44c65] text-white scale-110 shadow-md"
                                                    : "bg-white/5 hover:bg-white/10 text-white/70"
                                            }`}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={offerForm.icon}
                                    onChange={e => setOfferForm({ ...offerForm, icon: e.target.value })}
                                    placeholder="Eigenes Emoji oder Zeichen eingeben"
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Titel des Angebots *</label>
                                <input
                                    type="text"
                                    required
                                    value={offerForm.title}
                                    onChange={e => setOfferForm({ ...offerForm, title: e.target.value })}
                                    placeholder="z.B. Recording Studio"
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div>
                                <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Beschreibung *</label>
                                <textarea
                                    rows={2}
                                    required
                                    value={offerForm.desc}
                                    onChange={e => setOfferForm({ ...offerForm, desc: e.target.value })}
                                    placeholder="z.B. Drums professionell im Studio aufnehmen lassen"
                                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Button-Text (CTA)</label>
                                    <input
                                        type="text"
                                        value={offerForm.cta}
                                        onChange={e => setOfferForm({ ...offerForm, cta: e.target.value })}
                                        placeholder="z.B. Anfragen"
                                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-white/60 block mb-1.5">Link / Ziel</label>
                                    <input
                                        type="text"
                                        value={offerForm.link}
                                        onChange={e => setOfferForm({ ...offerForm, link: e.target.value })}
                                        placeholder="z.B. /#contact oder URL"
                                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e44c65]"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="offerActiveCheck"
                                    checked={offerForm.active}
                                    onChange={e => setOfferForm({ ...offerForm, active: e.target.checked })}
                                    className="w-4 h-4 rounded text-[#e44c65] focus:ring-[#e44c65] bg-white/5 border-white/20"
                                />
                                <label htmlFor="offerActiveCheck" className="text-xs text-white/80 cursor-pointer">
                                    Angebot sofort im Schülerportal anzeigen (Aktiv)
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={offerFormLoading}
                                    className="flex-1 py-3 bg-[#e44c65] text-white rounded-xl text-xs uppercase tracking-wider font-semibold shadow-lg hover:bg-[#c43c52] transition-colors disabled:opacity-50"
                                >
                                    {offerFormLoading ? "Speichert..." : editingOffer ? "Änderungen speichern" : "Angebot erstellen"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowOfferModal(false)}
                                    className="px-5 py-3 bg-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/15 transition-colors"
                                >
                                    Abbrechen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
