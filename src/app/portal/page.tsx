"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

// --- STATIC DATA (Placeholder for DB) ---
const LEVELS: { [key: number]: string } = {
    1: "Einsteiger",
    2: "Grundlagen",
    3: "Fortgeschritten",
    4: "Advanced",
    5: "Pro"
};

const lessons = [
    {
        id: 1, title: "Stickhalten & Sitzposition", completed: true, locked: false,
        videos: 2, pdfs: 1, audios: 1,
        content: {
            videos: ["Richtig sitzen am Drumset", "Matched vs. Traditional Grip"],
            pdfs: ["Übungsblatt_Haltung.pdf"],
            audios: ["Metronom_60bpm.mp3"]
        }
    },
    {
        id: 2, title: "Dein erster Groove", completed: true, locked: false,
        videos: 3, pdfs: 2, audios: 4,
        content: {
            videos: ["Basic Rock Beat erklärt", "Groove Demo langsam", "Groove Demo Originaltempo"],
            pdfs: ["Notation_Rock_Beat.pdf", "Übungsblatt_Groove1.pdf"],
            audios: ["BackingTrack_60bpm.mp3", "BackingTrack_80bpm.mp3", "BackingTrack_100bpm.mp3", "BackingTrack_120bpm.mp3"]
        }
    },
    {
        id: 3, title: "Einfache Fill-Ins", completed: false, locked: false,
        videos: 2, pdfs: 2, audios: 3,
        content: {
            videos: ["Fill-In Grundlagen", "8tel-Fills rund ums Set"],
            pdfs: ["Fill-In_Notation.pdf", "Übungsblatt_Fills.pdf"],
            audios: ["Fill_Demo_Slow.mp3", "BackingTrack_mit_Fills_80bpm.mp3", "BackingTrack_mit_Fills_100bpm.mp3"]
        }
    },
    {
        id: 4, title: "Hi-Hat Variationen", completed: false, locked: true,
        videos: 2, pdfs: 1, audios: 3
    },
    {
        id: 5, title: "Dein erster Song", completed: false, locked: true,
        videos: 3, pdfs: 2, audios: 5
    },
];

const promoItems = [
    { icon: "🎙️", title: "Recording", desc: "Drums professionell aufnehmen lassen", cta: "Anfragen" },
    { icon: "🎬", title: "Video-Produktion", desc: "Solo- oder Song-Video erstellen", cta: "Mehr erfahren" },
    { icon: "🎵", title: "Arrangement", desc: "Song oder Solo schreiben lassen", cta: "Anfragen" },
    { icon: "👕", title: "Merch", desc: "T-Shirts, Sticks & mehr", cta: "Zum Shop" },
    { icon: "🎓", title: "Workshops", desc: "Gruppen-Sessions & Masterclasses", cta: "Termine" },
    { icon: "🎁", title: "Gutscheine", desc: "Unterricht verschenken", cta: "Kaufen" },
];

export default function PortalPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [activeLesson, setActiveLesson] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("video");

    // Redirect if not authenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[#1c1d26] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#e44c65] animate-spin" />
            </div>
        );
    }

    if (!session) {
        return null; // Will redirect
    }

    const studentName = session.user?.name || "Drummer";
    const studentLevel = 1; // TODO: Fetch from DB user profile
    const instrument = "Schlagzeug";
    const completedCount = lessons.filter(l => l.completed).length;
    const progress = Math.round((completedCount / lessons.length) * 100);

    // --- LESSON VIEW ---
    if (activeLesson && activeLesson.content) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #1c1d26 0%, #1a1a2e 50%, #16213e 100%)",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                color: "#fff",
                paddingBottom: "80px"
            }}>
                {/* Header */}
                <div style={{
                    padding: "16px 24px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "rgba(28, 29, 38, 0.95)",
                    backdropFilter: "blur(10px)",
                    position: "sticky",
                    top: 0,
                    zIndex: 50
                }}>
                    <button
                        onClick={() => { setActiveLesson(null); setActiveTab("video"); }}
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "10px",
                            color: "#fff",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontSize: "14px",
                            transition: "background 0.2s"
                        }}
                        className="hover:bg-white/10"
                    >
                        ← Zurück
                    </button>
                    <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>
                        Lektion {activeLesson.id} von {lessons.length}
                    </span>
                </div>

                {/* Lesson Content */}
                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
                    <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{
                            background: "rgba(228, 76, 101, 0.15)", // Project accent
                            color: "#e44c65", // Project accent
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "600"
                        }}>
                            Level {studentLevel} – {LEVELS[studentLevel]}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>{instrument}</span>
                    </div>
                    <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "12px 0 32px 0", letterSpacing: "-0.5px" }}>
                        {activeLesson.title}
                    </h1>

                    {/* Tabs */}
                    <div style={{ display: "flex", gap: "4px", marginBottom: "28px", background: "rgba(255,255,255,0.03)", borderRadius: "14px", padding: "4px" }}>
                        {[
                            { key: "video", label: "🎥 Videos", count: activeLesson.content.videos.length },
                            { key: "pdf", label: "📄 Dokumente", count: activeLesson.content.pdfs.length },
                            { key: "audio", label: "🎵 Audio", count: activeLesson.content.audios.length }
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                style={{
                                    flex: 1,
                                    padding: "12px 8px",
                                    background: activeTab === tab.key ? "rgba(228, 76, 101, 0.15)" : "transparent",
                                    border: activeTab === tab.key ? "1px solid rgba(228, 76, 101, 0.3)" : "1px solid transparent",
                                    borderRadius: "10px",
                                    color: activeTab === tab.key ? "#e44c65" : "rgba(255,255,255,0.5)",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    transition: "all 0.2s"
                                }}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {activeTab === "video" && activeLesson.content.videos.map((v: string, i: number) => (
                            <div key={i} style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "16px",
                                overflow: "hidden"
                            }}>
                                <div style={{
                                    height: "200px",
                                    background: "linear-gradient(135deg, rgba(228, 76, 101, 0.1), rgba(228, 76, 101, 0.02))",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <div style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                        background: "rgba(228, 76, 101, 0.2)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "24px",
                                        cursor: "pointer",
                                        border: "2px solid rgba(228, 76, 101, 0.4)"
                                    }}>▶</div>
                                </div>
                                <div style={{ padding: "16px 20px" }}>
                                    <p style={{ margin: 0, fontWeight: "600", fontSize: "15px" }}>{v}</p>
                                </div>
                            </div>
                        ))}

                        {activeTab === "pdf" && activeLesson.content.pdfs.map((p: string, i: number) => (
                            <div key={i} style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "14px",
                                padding: "18px 20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                    <div style={{
                                        width: "42px", height: "42px", borderRadius: "10px",
                                        background: "rgba(239,68,68,0.12)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "18px"
                                    }}>📄</div>
                                    <span style={{ fontWeight: "500", fontSize: "14px" }}>{p}</span>
                                </div>
                                <button style={{
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                    color: "#fff",
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    fontSize: "13px"
                                }}>Herunterladen</button>
                            </div>
                        ))}

                        {activeTab === "audio" && activeLesson.content.audios.map((a: string, i: number) => (
                            <div key={i} style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "14px",
                                padding: "18px 20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "14px"
                            }}>
                                <div style={{
                                    width: "42px", height: "42px", borderRadius: "50%",
                                    background: "rgba(34,197,94,0.12)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    border: "1px solid rgba(34,197,94,0.2)"
                                }}>▶</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: "0 0 6px 0", fontWeight: "500", fontSize: "14px" }}>{a}</p>
                                </div>
                                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>3:24</span>
                            </div>
                        ))}
                    </div>

                    {/* Lesson Complete */}
                    <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
                        <button style={{
                            flex: 1,
                            padding: "16px",
                            background: activeLesson.completed ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.03)",
                            border: activeLesson.completed ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "14px",
                            color: activeLesson.completed ? "#22c55e" : "rgba(255,255,255,0.6)",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}>
                            {activeLesson.completed ? "✅ Abgeschlossen" : "☐ Als erledigt markieren"}
                        </button>
                        <button
                            onClick={() => setActiveLesson(null)} // Placeholder: go back to list
                            style={{
                                padding: "16px 24px",
                                background: "linear-gradient(135deg, #e44c65, #c43c52)",
                                border: "none",
                                borderRadius: "14px",
                                color: "#fff",
                                fontSize: "14px",
                                fontWeight: "700",
                                cursor: "pointer",
                                boxShadow: "0 4px 16px rgba(228, 76, 101, 0.25)"
                            }}
                        >
                            Nächste Lektion →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- DASHBOARD VIEW ---
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #1c1d26 0%, #1a1a2e 50%, #16213e 100%)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            color: "#fff"
        }}>
            {/* Header */}
            <div style={{
                padding: "16px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(28, 29, 38, 0.8)",
                backdropFilter: "blur(10px)",
                position: "sticky",
                top: 0,
                zIndex: 50
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "24px" }}>🥁</span>
                    <span style={{ fontWeight: "700", fontSize: "18px", letterSpacing: "-0.3px" }}>DrumHub</span>
                </div>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        color: "rgba(255,255,255,0.5)",
                        padding: "6px 14px",
                        cursor: "pointer",
                        fontSize: "13px",
                        transition: "all 0.2s"
                    }}
                    className="hover:bg-white/10 hover:text-white"
                >
                    Ausloggen
                </button>
            </div>

            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 24px" }}>
                {/* Welcome */}
                <div style={{ marginBottom: "36px" }}>
                    <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
                        Hey {studentName}! 👋
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.4)", margin: 0, fontSize: "15px" }}>
                        Weiter geht&apos;s mit deinem {instrument}-Training
                    </p>
                </div>

                {/* Stats Row */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "36px", flexWrap: "wrap" }}>
                    <div style={{
                        flex: "1 1 140px",
                        background: "rgba(228, 76, 101, 0.08)",
                        border: "1px solid rgba(228, 76, 101, 0.15)",
                        borderRadius: "16px",
                        padding: "18px 20px"
                    }}>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px 0", fontWeight: "600" }}>Level</p>
                        <p style={{ fontSize: "22px", fontWeight: "700", margin: 0, color: "#e44c65" }}>
                            {LEVELS[studentLevel]}
                        </p>
                    </div>
                    <div style={{
                        flex: "1 1 140px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "16px",
                        padding: "18px 20px"
                    }}>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px 0", fontWeight: "600" }}>Instrument</p>
                        <p style={{ fontSize: "22px", fontWeight: "700", margin: 0 }}>🥁 {instrument}</p>
                    </div>
                    <div style={{
                        flex: "1 1 140px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "16px",
                        padding: "18px 20px"
                    }}>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px 0", fontWeight: "600" }}>Fortschritt</p>
                        <p style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 8px 0" }}>{progress}%</p>
                        <div style={{
                            height: "6px",
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: "3px",
                            overflow: "hidden"
                        }}>
                            <div style={{
                                width: `${progress}%`,
                                height: "100%",
                                background: "linear-gradient(90deg, #e44c65, #ff8c32)",
                                borderRadius: "3px",
                                transition: "width 0.5s ease"
                            }} />
                        </div>
                    </div>
                </div>

                {/* Lessons */}
                <div style={{ marginBottom: "36px" }}>
                    <h2 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 18px 0" }}>
                        Deine Lektionen
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                onClick={() => !lesson.locked && setActiveLesson(lesson)}
                                style={{
                                    background: lesson.locked ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${lesson.completed ? "rgba(34,197,94,0.2)" : lesson.locked ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.08)"}`,
                                    borderRadius: "16px",
                                    padding: "18px 20px",
                                    cursor: lesson.locked ? "not-allowed" : "pointer",
                                    opacity: lesson.locked ? 0.4 : 1,
                                    transition: "all 0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                                className={!lesson.locked ? "hover:bg-white/5" : ""}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                    <div style={{
                                        width: "40px", height: "40px", borderRadius: "12px",
                                        background: lesson.completed ? "rgba(34,197,94,0.12)" : lesson.locked ? "rgba(255,255,255,0.03)" : "rgba(228, 76, 101, 0.1)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "16px", fontWeight: "700",
                                        color: lesson.completed ? "#22c55e" : lesson.locked ? "rgba(255,255,255,0.2)" : "#e44c65"
                                    }}>
                                        {lesson.completed ? "✓" : lesson.locked ? "🔒" : lesson.id}
                                    </div>
                                    <div>
                                        <p style={{ margin: "0 0 4px 0", fontWeight: "600", fontSize: "15px" }}>
                                            {lesson.title}
                                        </p>
                                        <p style={{ margin: 0, color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
                                            {lesson.videos} Videos · {lesson.pdfs} PDFs · {lesson.audios} Audio
                                        </p>
                                    </div>
                                </div>
                                {!lesson.locked && (
                                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>→</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* PROMO STRIP */}
                <div style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "32px",
                    paddingBottom: "40px"
                }}>
                    <p style={{
                        color: "rgba(255,255,255,0.3)", fontSize: "11px", textTransform: "uppercase",
                        letterSpacing: "1.5px", marginBottom: "16px", fontWeight: "600"
                    }}>
                        🔥 Meine Services & Angebote
                    </p>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                        gap: "12px"
                    }}>
                        {promoItems.map((item, i) => (
                            <div key={i} style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "16px",
                                padding: "20px 16px",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(228, 76, 101, 0.06)";
                                    e.currentTarget.style.borderColor = "rgba(228, 76, 101, 0.15)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                                }}>
                                <div style={{ fontSize: "28px", marginBottom: "10px" }}>{item.icon}</div>
                                <p style={{ margin: "0 0 4px 0", fontWeight: "700", fontSize: "14px" }}>{item.title}</p>
                                <p style={{ margin: "0 0 12px 0", color: "rgba(255,255,255,0.4)", fontSize: "12px", lineHeight: "1.4" }}>{item.desc}</p>
                                <span style={{
                                    display: "inline-block",
                                    padding: "6px 14px",
                                    background: "rgba(228, 76, 101, 0.12)",
                                    color: "#e44c65",
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                    fontWeight: "600"
                                }}>{item.cta}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: "48px",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                    textAlign: "center"
                }}>
                    <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px", margin: 0 }}>
                        © 2026 Santino Scavelli · Student Portal
                    </p>
                </div>
            </div>
        </div>
    );
}
