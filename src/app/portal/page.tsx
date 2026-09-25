"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    BookOpen,
    Calendar,
    FileText,
    Music,
    Video,
    Download,
    ExternalLink,
    CheckCircle2,
    Clock,
    AlertCircle,
    XCircle,
    LogOut,
    Search,
    ChevronDown,
    ChevronUp,
    Play,
    Loader2,
    Sparkles,
    User as UserIcon,
    Flame
} from "lucide-react";

interface Material {
    id: string;
    name: string;
    category: "pdf" | "video" | "audio" | "image" | string;
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
}

interface StudentProfile {
    id: string;
    name: string;
    email: string;
    instrument?: string | null;
    phone?: string | null;
    notes?: string | null;
}

const promoItems = [
    { icon: "🎙️", title: "Recording Studio", desc: "Drums professionell im Studio aufnehmen lassen", cta: "Anfragen", link: "/#contact" },
    { icon: "🎬", title: "Video-Produktion", desc: "High-End Drum-Videos mit Multi-Cam erstellen", cta: "Mehr erfahren", link: "/#contact" },
    { icon: "🎵", title: "Arrangement & Beats", desc: "Individuelle Grooves, Percussion & Playalongs", cta: "Anfragen", link: "/#contact" },
    { icon: "🎓", title: "Workshops & Masterclasses", desc: "Intensive Gruppen-Sessions & Hybrid Drumming", cta: "Termine", link: "/#contact" },
    { icon: "🎁", title: "Gutscheine", desc: "Unterricht & Studiozeit an Freunde verschenken", cta: "Gutschein holen", link: "/#contact" },
    { icon: "🥁", title: "Synthesys Sample Pack", desc: "Exklusive Drum-Samples & Hybrid Texturen", cta: "Zum Pack", link: "/sample-packs" },
];

export default function StudentPortal() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<"lektionen" | "journal">("lektionen");
    const [profile, setProfile] = useState<StudentProfile | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [logs, setLogs] = useState<LessonLog[]>([]);
    const [offers, setOffers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filters & Interaction
    const [lessonSearch, setLessonSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

    // Redirect unauthenticated users
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    // Load portal data
    useEffect(() => {
        if (status === "authenticated" && (session?.user as any)?.id) {
            const studentId = (session.user as any).id;
            loadPortalData(studentId);
        }
    }, [status, session]);

    const loadPortalData = async (studentId: string) => {
        try {
            setLoading(true);

            // Fetch profile, lessons, logs, and offers in parallel
            const [profileRes, lessonsRes, logsRes, offersRes] = await Promise.all([
                fetch(`/api/students/${studentId}`).catch(() => null),
                fetch(`/api/lessons?studentId=${studentId}`).catch(() => null),
                fetch(`/api/students/${studentId}/logs`).catch(() => null),
                fetch(`/api/offers`).catch(() => null),
            ]);

            if (profileRes && profileRes.ok) {
                const profileData = await profileRes.json();
                setProfile(profileData);
            }

            if (lessonsRes && lessonsRes.ok) {
                const lessonsData = await lessonsRes.json();
                setLessons(Array.isArray(lessonsData) ? lessonsData : []);
            }

            if (logsRes && logsRes.ok) {
                const logsData = await logsRes.json();
                setLogs(Array.isArray(logsData) ? logsData : []);
            }

            if (offersRes && offersRes.ok) {
                const offersData = await offersRes.json();
                if (Array.isArray(offersData) && offersData.length > 0) {
                    setOffers(offersData);
                }
            }
        } catch (err) {
            console.error("Fehler beim Laden der Schülerdaten:", err);
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-[#0e0f15] flex flex-col items-center justify-center pt-24 sm:pt-28">
                <Loader2 className="w-10 h-10 text-[#e44c65] animate-spin mb-4" />
                <p className="text-white/50 text-sm font-medium tracking-wide">Dein Portal wird geladen...</p>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    const studentName = profile?.name || session.user?.name || "Schüler";
    const studentInstrument = profile?.instrument || "Schlagzeug";

    // Attendance stats
    const totalSessions = logs.length;
    const presentCount = logs.filter(l => l.status === "PRESENT").length;
    const excusedCount = logs.filter(l => l.status === "EXCUSED").length;
    const absentCount = logs.filter(l => l.status === "ABSENT").length;
    const canceledCount = logs.filter(l => l.status === "CANCELED").length;

    // Filter lessons
    const filteredLessons = lessons.filter(lesson => {
        const matchesSearch =
            lesson.title.toLowerCase().includes(lessonSearch.toLowerCase()) ||
            lesson.description.toLowerCase().includes(lessonSearch.toLowerCase()) ||
            lesson.files.some(f => f.name.toLowerCase().includes(lessonSearch.toLowerCase()));

        if (!matchesSearch) return false;

        if (selectedCategory === "all") return true;
        return lesson.files.some(f => f.category === selectedCategory);
    });

    const getYouTubeId = (url: string) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?#]+)/);
        return match ? match[1] : null;
    };

    return (
        <div className="min-h-screen bg-[#0e0f15] text-gray-200 font-sans pt-24 sm:pt-28 pb-20">
            {/* Background ambient accents */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#e44c65]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ─── HEADER / WELCOME CARD ─────────────────────────────────── */}
                <div className="bg-[#14151f]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#e44c65]/10 to-transparent pointer-events-none rounded-bl-full" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e44c65]/10 border border-[#e44c65]/20 text-[#e44c65] text-xs font-semibold mb-3">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Santino Scavelli DrumHub · Schülerbereich</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                                Willkommen zurück, {studentName}! 👋
                            </h1>
                            <p className="text-white/60 text-sm sm:text-base mt-2 flex items-center gap-2 flex-wrap">
                                <span>Fokus: <strong className="text-white font-medium">🥁 {studentInstrument}</strong></span>
                                <span className="text-white/20">•</span>
                                <span className="text-white/40">{profile?.email || session.user?.email}</span>
                            </p>
                        </div>

                        {/* Logout button */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-xs sm:text-sm font-medium transition-all"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Abmelden</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Counters */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1">
                                Lektionen
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-white">{lessons.length}</span>
                                <span className="text-xs text-white/40">verfügbar</span>
                            </div>
                        </div>

                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1">
                                Einheiten
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-[#e44c65]">{totalSessions}</span>
                                <span className="text-xs text-white/40">dokumentiert</span>
                            </div>
                        </div>

                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1">
                                Anwesend
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-emerald-400">{presentCount}</span>
                                <span className="text-xs text-emerald-500/70">
                                    {totalSessions > 0 ? `${Math.round((presentCount / totalSessions) * 100)}%` : "100%"}
                                </span>
                            </div>
                        </div>

                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1">
                                Entschuldigt
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-amber-400">{excusedCount}</span>
                                <span className="text-xs text-white/40">Einheiten</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── TABS NAVIGATION ───────────────────────────────────────── */}
                <div className="flex items-center gap-3 p-1.5 bg-[#14151f] border border-white/10 rounded-2xl mb-8">
                    <button
                        onClick={() => setActiveTab("lektionen")}
                        className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                            activeTab === "lektionen"
                                ? "bg-[#e44c65] text-white shadow-lg shadow-[#e44c65]/25"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <BookOpen className="w-4 h-4" />
                        <span>Meine Lektionen ({lessons.length})</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("journal")}
                        className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                            activeTab === "journal"
                                ? "bg-[#e44c65] text-white shadow-lg shadow-[#e44c65]/25"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <Calendar className="w-4 h-4" />
                        <span>Unterrichtsjournal ({logs.length})</span>
                    </button>
                </div>

                {/* ─── TAB 1: MEINE LEKTIONEN ─────────────────────────────────── */}
                {activeTab === "lektionen" && (
                    <div className="space-y-6">
                        {/* Search & Material Filter */}
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                            <div className="relative flex-1">
                                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="text"
                                    placeholder="Lektionen, PDFs oder Notizen durchsuchen..."
                                    value={lessonSearch}
                                    onChange={(e) => setLessonSearch(e.target.value)}
                                    className="w-full bg-[#14151f] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#e44c65] transition-colors"
                                />
                            </div>

                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                                {[
                                    { key: "all", label: "Alle" },
                                    { key: "pdf", label: "📄 PDF" },
                                    { key: "audio", label: "🎵 Audio" },
                                    { key: "video", label: "🎬 Video" },
                                ].map(cat => (
                                    <button
                                        key={cat.key}
                                        onClick={() => setSelectedCategory(cat.key)}
                                        className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                            selectedCategory === cat.key
                                                ? "bg-white/15 text-white border border-white/20"
                                                : "bg-[#14151f] text-white/50 border border-white/5 hover:text-white hover:bg-white/5"
                                        }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Lesson List */}
                        {filteredLessons.length === 0 ? (
                            <div className="bg-[#14151f]/50 border border-white/10 rounded-3xl p-12 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-2xl">
                                    🥁
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Keine Lektionen gefunden</h3>
                                <p className="text-white/50 text-sm max-w-md mx-auto">
                                    {lessonSearch
                                        ? "Keine passenden Lektionen für deine Suchanfrage gefunden."
                                        : "Santino hat dir noch keine speziellen Lektionen zugewiesen. Schau bald wieder vorbei!"}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredLessons.map((lesson) => {
                                    const isExpanded = expandedLessonId === lesson.id;
                                    const pdfs = lesson.files.filter(f => f.category === "pdf");
                                    const audios = lesson.files.filter(f => f.category === "audio");
                                    const videos = lesson.files.filter(f => f.category === "video");

                                    return (
                                        <div
                                            key={lesson.id}
                                            className="bg-[#14151f] border border-white/10 hover:border-white/20 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-lg"
                                        >
                                            {/* Lesson Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2.5 flex-wrap mb-2">
                                                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#e44c65]/15 text-[#e44c65] border border-[#e44c65]/30">
                                                            🥁 {lesson.instrument || studentInstrument}
                                                        </span>
                                                        {lesson.isGlobal ? (
                                                            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                                🌐 Basis Lektion
                                                            </span>
                                                        ) : (
                                                            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                                👤 Speziell für dich
                                                            </span>
                                                        )}
                                                        <span className="text-xs text-white/40">
                                                            {new Date(lesson.createdAt).toLocaleDateString("de-DE", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric"
                                                            })}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                                                        {lesson.title}
                                                    </h3>

                                                    {lesson.description && (
                                                        <p className="text-sm text-white/70 leading-relaxed mb-4">
                                                            {lesson.description}
                                                        </p>
                                                    )}

                                                    {/* Material Badges Quick summary */}
                                                    <div className="flex items-center gap-3 text-xs text-white/50">
                                                        {pdfs.length > 0 && (
                                                            <span className="flex items-center gap-1.5 text-blue-400">
                                                                <FileText className="w-3.5 h-3.5" />
                                                                {pdfs.length} {pdfs.length === 1 ? "Notenblatt / PDF" : "Notenblätter / PDFs"}
                                                            </span>
                                                        )}
                                                        {audios.length > 0 && (
                                                            <span className="flex items-center gap-1.5 text-emerald-400">
                                                                <Music className="w-3.5 h-3.5" />
                                                                {audios.length} {audios.length === 1 ? "Audio Track" : "Audio Tracks"}
                                                            </span>
                                                        )}
                                                        {videos.length > 0 && (
                                                            <span className="flex items-center gap-1.5 text-[#e44c65]">
                                                                <Video className="w-3.5 h-3.5" />
                                                                {videos.length} {videos.length === 1 ? "Video" : "Videos"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Toggle Button */}
                                                <button
                                                    onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                                                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                                        isExpanded
                                                            ? "bg-white/10 text-white border-white/20"
                                                            : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10"
                                                    }`}
                                                >
                                                    <span>{isExpanded ? "Einklappen" : "Materialien ansehen"}</span>
                                                    {isExpanded ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>

                                            {/* Teacher Notes box (if present) */}
                                            {lesson.notes && (
                                                <div className="mt-4 p-3.5 bg-white/[0.03] border-l-2 border-[#e44c65] rounded-r-xl text-xs text-white/80">
                                                    <span className="font-bold text-[#e44c65] block mb-1">
                                                        Tipp von Santino:
                                                    </span>
                                                    {lesson.notes}
                                                </div>
                                            )}

                                            {/* Expanded Materials View */}
                                            {isExpanded && (
                                                <div className="mt-6 pt-6 border-t border-white/10 space-y-6 animate-fadeIn">
                                                    {/* PDFs & Sheets */}
                                                    {pdfs.length > 0 && (
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                                                                <FileText className="w-4 h-4 text-blue-400" />
                                                                <span>Noten & PDFs ({pdfs.length})</span>
                                                            </h4>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                {pdfs.map((pdf) => (
                                                                    <div
                                                                        key={pdf.id}
                                                                        className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl hover:border-blue-500/30 transition-all"
                                                                    >
                                                                        <div className="flex items-center gap-3 overflow-hidden mr-3">
                                                                            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                                                                                <FileText className="w-4 h-4" />
                                                                            </div>
                                                                            <div className="truncate">
                                                                                <p className="text-xs font-semibold text-white truncate">
                                                                                    {pdf.name}
                                                                                </p>
                                                                                <p className="text-[11px] text-white/40">
                                                                                    {pdf.size || "PDF Dokument"}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <a
                                                                            href={pdf.url}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-medium transition-all shrink-0"
                                                                        >
                                                                            <Download className="w-3.5 h-3.5" />
                                                                            <span>Öffnen</span>
                                                                        </a>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Audio Files */}
                                                    {audios.length > 0 && (
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                                                                <Music className="w-4 h-4 text-emerald-400" />
                                                                <span>Audio Tracks & Playalongs ({audios.length})</span>
                                                            </h4>
                                                            <div className="space-y-3">
                                                                {audios.map((audio) => (
                                                                    <div
                                                                        key={audio.id}
                                                                        className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-emerald-500/30 transition-all"
                                                                    >
                                                                        <div className="flex items-center justify-between gap-3 mb-3">
                                                                            <div className="flex items-center gap-2.5 truncate">
                                                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                                                                                    <Music className="w-4 h-4" />
                                                                                </div>
                                                                                <span className="text-xs font-semibold text-white truncate">
                                                                                    {audio.name}
                                                                                </span>
                                                                            </div>
                                                                            <a
                                                                                href={audio.url}
                                                                                download
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                className="inline-flex items-center gap-1 text-[11px] text-white/40 hover:text-white transition-colors"
                                                                            >
                                                                                <Download className="w-3 h-3" />
                                                                                <span>Download</span>
                                                                            </a>
                                                                        </div>
                                                                        {/* Inline Audio Player */}
                                                                        <audio
                                                                            controls
                                                                            src={audio.url}
                                                                            className="w-full h-9 rounded-lg"
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Videos */}
                                                    {videos.length > 0 && (
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3 flex items-center gap-2">
                                                                <Video className="w-4 h-4 text-[#e44c65]" />
                                                                <span>Video Erklärungen ({videos.length})</span>
                                                            </h4>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                {videos.map((vid) => {
                                                                    const ytId = getYouTubeId(vid.url);
                                                                    return (
                                                                        <div
                                                                            key={vid.id}
                                                                            className="bg-black/30 border border-white/5 rounded-xl overflow-hidden"
                                                                        >
                                                                            {ytId ? (
                                                                                <div className="relative pt-[56.25%]">
                                                                                    <iframe
                                                                                        src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                                                                                        title={vid.name}
                                                                                        className="absolute inset-0 w-full h-full border-0"
                                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                        allowFullScreen
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                <div className="p-4">
                                                                                    <video
                                                                                        controls
                                                                                        src={vid.url}
                                                                                        className="w-full rounded-lg max-h-60 bg-black"
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                            <div className="p-3 bg-white/[0.02] flex items-center justify-between">
                                                                                <span className="text-xs font-medium text-white truncate mr-2">
                                                                                    {vid.name}
                                                                                </span>
                                                                                <a
                                                                                    href={vid.url}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                    className="text-white/40 hover:text-white p-1"
                                                                                >
                                                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {lesson.files.length === 0 && (
                                                        <p className="text-xs text-white/40 italic">
                                                            Keine Dateien für diese Lektion hinterlegt.
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* ─── TAB 2: UNTERRICHTSJOURNAL (LEKTIONSTAGEBUCH) ───────────── */}
                {activeTab === "journal" && (
                    <div className="space-y-6">
                        {/* Attendance Summary Banner */}
                        <div className="bg-[#14151f] border border-white/10 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <span>Lektionstagebuch & Anwesenheit</span>
                                </h3>
                                <p className="text-xs text-white/50 mt-1">
                                    Chronologische Übersicht deiner Einheiten, Übe-Ziele und Hausaufgaben.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap text-xs">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    {presentCount}x Anwesend
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    {excusedCount}x Entschuldigt
                                </span>
                                {absentCount > 0 && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 font-medium">
                                        <XCircle className="w-3.5 h-3.5" />
                                        {absentCount}x Abwesend
                                    </span>
                                )}
                                {canceledCount > 0 && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-500/10 text-gray-400 border border-gray-500/20 font-medium">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        {canceledCount}x Ausgefallen
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Journal Timeline */}
                        {logs.length === 0 ? (
                            <div className="bg-[#14151f]/50 border border-white/10 rounded-3xl p-12 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-2xl">
                                    📖
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Noch keine Einträge</h3>
                                <p className="text-white/50 text-sm max-w-md mx-auto">
                                    Nach deinen Unterrichtsstunden trägt Santino hier die behandelten Themen und deine Hausaufgaben ein.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {logs.map((log) => {
                                    const dateObj = new Date(log.date);
                                    const dateStr = dateObj.toLocaleDateString("de-DE", {
                                        weekday: "long",
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric"
                                    });

                                    const isPresent = log.status === "PRESENT";
                                    const isExcused = log.status === "EXCUSED";
                                    const isAbsent = log.status === "ABSENT";
                                    const isCanceled = log.status === "CANCELED";

                                    return (
                                        <div
                                            key={log.id}
                                            className="bg-[#14151f] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-lg transition-all"
                                        >
                                            {/* Left color bar indicator */}
                                            <div
                                                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                                    isPresent
                                                        ? "bg-emerald-500"
                                                        : isExcused
                                                        ? "bg-amber-500"
                                                        : isAbsent
                                                        ? "bg-red-500"
                                                        : "bg-gray-500"
                                                }`}
                                            />

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-base font-bold text-white tracking-tight">
                                                        {dateStr}
                                                    </span>
                                                </div>

                                                {/* Status Badge */}
                                                <div>
                                                    {isPresent && (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            Anwesend
                                                        </span>
                                                    )}
                                                    {isExcused && (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            Entschuldigt
                                                        </span>
                                                    )}
                                                    {isAbsent && (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                                                            <XCircle className="w-3.5 h-3.5" />
                                                            Abwesend
                                                        </span>
                                                    )}
                                                    {isCanceled && (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20">
                                                            <AlertCircle className="w-3.5 h-3.5" />
                                                            Ausgefallen
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Topic / Behandelte Inhalte */}
                                            {log.topic && (
                                                <div className="mb-4">
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                                                        Behandelte Inhalte & Thema:
                                                    </span>
                                                    <p className="text-sm text-white/90 leading-relaxed font-medium">
                                                        {log.topic}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Homework / Übe-Fokus */}
                                            {log.homework && (
                                                <div className="mt-3 p-4 bg-[#e44c65]/10 border border-[#e44c65]/20 rounded-xl">
                                                    <span className="text-xs font-bold text-[#e44c65] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                                                        <Flame className="w-4 h-4" />
                                                        <span>Hausaufgabe & Übe-Fokus bis zur nächsten Stunde:</span>
                                                    </span>
                                                    <p className="text-sm text-white font-medium leading-relaxed">
                                                        {log.homework}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Notes / Feedback */}
                                            {log.notes && (
                                                <div className="mt-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-white/70">
                                                    <span className="font-semibold text-white/50 block mb-1">
                                                        Notizen / Feedback:
                                                    </span>
                                                    {log.notes}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* ─── PROMO / SERVICES STRIP ─────────────────────────────────── */}
                <div className="mt-16 pt-12 border-t border-white/10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <span className="text-[11px] font-bold text-[#e44c65] uppercase tracking-wider block">
                                Santino Scavelli Services
                            </span>
                            <h3 className="text-lg font-bold text-white tracking-tight">
                                Drum Recording, Workshops & Special Offers
                            </h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(offers.length > 0 ? offers : promoItems).map((item, i) => (
                            <Link
                                key={item.id || i}
                                href={item.link || "/#contact"}
                                className="group p-5 bg-[#14151f] hover:bg-white/[0.04] border border-white/5 hover:border-[#e44c65]/30 rounded-2xl transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-2xl mb-3 block">{item.icon}</span>
                                    <h4 className="text-sm font-bold text-white group-hover:text-[#e44c65] transition-colors mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-white/50 leading-relaxed mb-4">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e44c65]">
                                    <span>{item.cta}</span>
                                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Footer copyright */}
                <div className="mt-16 text-center text-xs text-white/30">
                    <p>© {new Date().getFullYear()} Santino Scavelli · DrumHub. Alle Rechte vorbehalten.</p>
                </div>
            </div>
        </div>
    );
}
