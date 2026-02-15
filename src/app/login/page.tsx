"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (!res?.error) {
                router.push("/portal");
                router.refresh();
            } else {
                setError("Ungültige Email oder Passwort");
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setError("Ein Fehler ist aufgetreten");
            setLoading(false);
        }
    };

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
                        filter: "drop-shadow(0 0 20px rgba(228, 76, 101, 0.3))" // Changed to project accent color
                    }}>🥁</div>
                    <h1 style={{
                        color: "#fff",
                        fontSize: "28px",
                        fontWeight: "700",
                        margin: "0 0 6px 0",
                        letterSpacing: "-0.5px"
                    }}>DrumHub</h1>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", margin: 0 }}>
                        Schüler-Portal Login
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit}>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="dein.name@example.com"
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
                            onFocus={(e) => e.target.style.borderColor = "rgba(228, 76, 101, 0.5)"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                    </div>

                    <div style={{ marginBottom: "32px" }}>
                        <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
                            Passwort
                        </label>
                        <input
                            type="password"
                            required
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
                            onFocus={(e) => e.target.style.borderColor = "rgba(228, 76, 101, 0.5)"}
                            onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "16px",
                            background: "linear-gradient(135deg, #e44c65 0%, #c43c52 100%)", // Project accent
                            border: "none",
                            borderRadius: "12px",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "700",
                            cursor: loading ? "wait" : "pointer",
                            transition: "transform 0.15s, box-shadow 0.15s",
                            boxShadow: "0 4px 20px rgba(228, 76, 101, 0.3)",
                            opacity: loading ? 0.7 : 1
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.transform = "translateY(-1px)";
                                e.currentTarget.style.boxShadow = "0 6px 28px rgba(228, 76, 101, 0.4)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 20px rgba(228, 76, 101, 0.3)";
                            }
                        }}
                    >
                        {loading ? "Wird geladen..." : "Einloggen"}
                    </button>
                </form>

                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", textAlign: "center", marginTop: "20px" }}>
                    Zugangsdaten bekommst du von deinem Lehrer
                </p>
            </div>
        </div>
    );
}
