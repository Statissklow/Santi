"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, Mail, KeyRound } from "lucide-react";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !email.includes("@")) {
            setError("Bitte gib eine gültige E-Mail-Adresse ein.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Das Passwort muss mindestens 6 Zeichen lang sein.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Die beiden Passwörter stimmen nicht überein.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Fehler beim Zurücksetzen des Passworts.");
            }

            setSuccess(true);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ein unerwarteter Fehler ist aufgetreten.");
            }
        } finally {
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
            padding: "100px 20px 40px 20px"
        }}>
            <div style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "24px",
                padding: "48px 40px",
                width: "100%",
                maxWidth: "440px",
                backdropFilter: "blur(20px)"
            }}>
                <div style={{ textAlign: "center", marginBottom: "36px" }}>
                    <div style={{
                        fontSize: "44px",
                        marginBottom: "12px",
                        filter: "drop-shadow(0 0 20px rgba(228, 76, 101, 0.3))"
                    }}>🥁</div>
                    <h1 style={{
                        color: "#fff",
                        fontSize: "26px",
                        fontWeight: "700",
                        margin: "0 0 6px 0",
                        letterSpacing: "-0.5px"
                    }}>Passwort zurücksetzen</h1>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: 0 }}>
                        DrumHub Admin &amp; Schüler-Zugang
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-3.5 rounded-xl mb-6 text-xs text-center font-medium">
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="text-center py-4 space-y-6">
                        <div className="w-16 h-16 rounded-full bg-[#e44c65]/20 border border-[#e44c65] text-[#e44c65] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(228,76,101,0.4)]">
                            <CheckCircle2 size={32} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-white">Passwort erfolgreich geändert!</h3>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                Dein neues Passwort ist ab sofort aktiv. Du kannst dich jetzt direkt mit deiner E-Mail und dem neuen Passwort anmelden.
                            </p>
                        </div>
                        <div className="pt-2">
                            <Link
                                href="/login"
                                className="w-full inline-block py-3.5 px-6 bg-[#e44c65] text-white text-sm font-semibold rounded-xl text-center shadow-[0_0_20px_rgba(228,76,101,0.4)] hover:bg-[#c43c52] transition-colors"
                            >
                                Jetzt zum Login
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
                                Deine E-Mail-Adresse
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="z.B. info@santinoscavelli.de"
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "12px",
                                    color: "#fff",
                                    fontSize: "14px",
                                    outline: "none",
                                    boxSizing: "border-box"
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
                                Neues Passwort
                            </label>
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Mindestens 6 Zeichen"
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "12px",
                                    color: "#fff",
                                    fontSize: "14px",
                                    outline: "none",
                                    boxSizing: "border-box"
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: "8px" }}>
                                Neues Passwort bestätigen
                            </label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Passwort wiederholen"
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "12px",
                                    color: "#fff",
                                    fontSize: "14px",
                                    outline: "none",
                                    boxSizing: "border-box"
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "16px",
                                background: "linear-gradient(135deg, #e44c65 0%, #c43c52 100%)",
                                border: "none",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "15px",
                                fontWeight: "700",
                                cursor: loading ? "wait" : "pointer",
                                transition: "all 0.2s",
                                boxShadow: "0 4px 20px rgba(228, 76, 101, 0.3)",
                                opacity: loading ? 0.7 : 1,
                                marginTop: "12px"
                            }}
                        >
                            {loading ? "Wird gespeichert..." : "Neues Passwort festlegen"}
                        </button>

                        <div className="pt-4 text-center">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors"
                            >
                                <ArrowLeft size={14} />
                                <span>Zurück zum Login</span>
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
