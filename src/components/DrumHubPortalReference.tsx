import { useState } from "react";

const LEVELS = {
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

interface Lesson {
    id: number;
    title: string;
    completed: boolean;
    locked: boolean;
    videos: number;
    pdfs: number;
    audios: number;
    content?: {
        videos: string[];
        pdfs: string[];
        audios: string[];
    };
}

export default function DrumHubPortal() {
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [activeTab, setActiveTab] = useState("video");
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const studentName = "Max";
    const studentLevel = 1;
    const instrument = "Schlagzeug";
    const completedCount = lessons.filter(l => l.completed).length;
    const progress = Math.round((completedCount / lessons.length) * 100);

    if (!loggedIn) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                padding: "20px"
            }}>
                <div style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "24px",
                    padding: "48px 40px",
                    width: "100%",
                    maxWidth: "420px",
                    backdropFilter: "blur(20px)"
                }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <div style={{
                            fontSize: "48px",
                            marginBottom: "12px",
                            filter: "drop-shadow(0 0 20px rgba(255,140,50,0.3))"
                        }}>🥁</div>
                        <h1 style={{
                            color: "#fff",
                            fontSize: "28px",
                            fontWeight: "700",
                            margin: "0 0 6px 0",
                            letterSpacing: "-0.5px"
                        }}>DrumHub</h1>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>
                            Schüler-Portal
                        </p>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
                            Benutzername
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Dein Benutzername"
                            style={{
                                width: "100%",
                                padding: "14px 16px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "15px",
                                outline: "none",
                                transition: "border-color 0.2s",
                                boxSizing: "border-box"
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255,140,50,0.5)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                        <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
                            Passwort
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                                width: "100%",
                                padding: "14px 16px",
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "15px",
                                outline: "none",
                                transition: "border-color 0.2s",
                                boxSizing: "border-box"
                            }}
                            onFocus={(e) => e.currentTarget.style.borderColor = "rgba(255,140,50,0.5)"}
                            onBlur={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                    </div>

                    <button
                        onClick={() => setLoggedIn(true)}
                        style={{
                            width: "100%",
                            padding: "16px",
                            background: "linear-gradient(135deg, #ff8c32 0%, #e85d04 100%)",
                            border: "none",
                            borderRadius: "12px",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "700",
                            cursor: "pointer",
                            transition: "transform 0.15s, box-shadow 0.15s",
                            boxShadow: "0 4px 20px rgba(255,140,50,0.3)"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(255,140,50,0.4)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,140,50,0.3)"; }}
                    >
                        Einloggen
                    </button>

                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", textAlign: "center", marginTop: "20px" }}>
                        Zugangsdaten bekommst du von deinem Lehrer
                    </p>
                </div>
            </div>
        );
    }

    if (activeLesson && activeLesson.content) {
        return (
            <div style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                color: "#fff"
            }}>
                {/* Header */}
                <div style={{
                    padding: "16px 24px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
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
                            fontSize: "14px"
                        }}
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
                            background: "rgba(255,140,50,0.15)",
                            color: "#ff8c32",
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
                                    background: activeTab === tab.key ? "rgba(255,140,50,0.15)" : "transparent",
                                    border: activeTab === tab.key ? "1px solid rgba(255,140,50,0.3)" : "1px solid transparent",
                                    borderRadius: "10px",
                                    color: activeTab === tab.key ? "#ff8c32" : "rgba(255,255,255,0.5)",
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
                        {activeTab === "video" && activeLesson.content.videos.map((v, i) => (
                            <div key={i} style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: "16px",
                                overflow: "hidden"
                            }}>
                                <div style={{
                                    height: "200px",
                                    background: "linear-gradient(135deg, rgba(255,140,50,0.1), rgba(255,140,50,0.02))",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <div style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                        background: "rgba(255,140,50,0.2)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "24px",
                                        cursor: "pointer",
                                        border: "2px solid rgba(255,140,50,0.4)"
                                    }}>▶</div>
                                </div>
                                <div style={{ padding: "16px 20px" }}>
                                    <p style={{ margin: 0, fontWeight: "600", fontSize: "15px" }}>{v}</p>
                                </div>
                            </div>
                        ))}

                        {activeTab === "pdf" && activeLesson.content.pdfs.map((p, i) => (
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

                        {activeTab === "audio" && activeLesson.content.audios.map((a, i) => (
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
                                    <div style={{
                                        height: "4px",
                                        background: "rgba(255,255,255,0.06)",
                                        borderRadius: "2px",
                                        overflow: "hidden"
                                    }}>
                                        <div style={{
                                            width: "0%",
                                            height: "100%",
                                            background: "linear-gradient(90deg, #22c55e, #4ade80)",
                                            borderRadius: "2px"
                                        }} />
                                    </div>
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
                        <button style={{
                            padding: "16px 24px",
                            background: "linear-gradient(135deg, #ff8c32, #e85d04)",
                            border: "none",
                            borderRadius: "14px",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "700",
                            cursor: "pointer",
                            boxShadow: "0 4px 16px rgba(255,140,50,0.25)"
                        }}>
                            Nächste Lektion →
                        </button>
                    </div>

                    {/* Promo Strip in lesson view */}
                    <div style={{
                        marginTop: "48px",
                        paddingTop: "32px",
                        borderTop: "1px solid rgba(255,255,255,0.06)"
                    }}>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "16px", fontWeight: "600" }}>
                            Meine Services
                        </p>
                        <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "8px" }}>
                            {promoItems.slice(0, 4).map((item, i) => (
                                <div key={i} style={{
                                    minWidth: "150px",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    borderRadius: "12px",
                                    padding: "14px",
                                    textAlign: "center",
                                    flexShrink: 0
                                }}>
                                    <div style={{ fontSize: "24px", marginBottom: "6px" }}>{item.icon}</div>
                                    <p style={{ margin: "0 0 4px 0", fontWeight: "600", fontSize: "13px" }}>{item.title}</p>
                                    <p style={{ margin: 0, color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // DASHBOARD
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            color: "#fff"
        }}>
            {/* Header */}
            <div style={{
                padding: "16px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "24px" }}>🥁</span>
                    <span style={{ fontWeight: "700", fontSize: "18px", letterSpacing: "-0.3px" }}>DrumHub</span>
                </div>
                <button
                    onClick={() => setLoggedIn(false)}
                    style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        color: "rgba(255,255,255,0.5)",
                        padding: "6px 14px",
                        cursor: "pointer",
                        fontSize: "13px"
                    }}
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
                        background: "rgba(255,140,50,0.08)",
                        border: "1px solid rgba(255,140,50,0.15)",
                        borderRadius: "16px",
                        padding: "18px 20px"
                    }}>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 6px 0", fontWeight: "600" }}>Level</p>
                        <p style={{ fontSize: "22px", fontWeight: "700", margin: 0, color: "#ff8c32" }}>
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
                                background: "linear-gradient(90deg, #ff8c32, #ffb347)",
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
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                                    <div style={{
                                        width: "40px", height: "40px", borderRadius: "12px",
                                        background: lesson.completed ? "rgba(34,197,94,0.12)" : lesson.locked ? "rgba(255,255,255,0.03)" : "rgba(255,140,50,0.1)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "16px", fontWeight: "700",
                                        color: lesson.completed ? "#22c55e" : lesson.locked ? "rgba(255,255,255,0.2)" : "#ff8c32"
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
                    paddingTop: "32px"
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
                                    e.currentTarget.style.background = "rgba(255,140,50,0.06)";
                                    e.currentTarget.style.borderColor = "rgba(255,140,50,0.15)";
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
                                    background: "rgba(255,140,50,0.12)",
                                    color: "#ff8c32",
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
                        © 2026 DrumHub · Dein Schlagzeug-Portal
                    </p>
                </div>
            </div>
        </div>
    );
}
