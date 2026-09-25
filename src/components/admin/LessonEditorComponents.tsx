import { useState, useRef } from "react";
import { Loader2 } from "lucide-react";

// ============================================================
// STYLES & CONFIG
// ============================================================
export const s = {
    bg: "#0c0c14",
    card: "rgba(255,255,255,0.025)",
    cardBorder: "rgba(255,255,255,0.06)",
    accent: "#ff8c32",
    accentDim: "rgba(255,140,50,0.12)",
    text: "#fff",
    textMuted: "rgba(255,255,255,0.45)",
    textDim: "rgba(255,255,255,0.25)",
    green: "#22c55e",
    greenDim: "rgba(34,197,94,0.12)",
    blue: "#3b82f6",
    blueDim: "rgba(59,130,246,0.12)",
    red: "#ef4444",
    redDim: "rgba(239,68,68,0.12)",
    yellow: "#f59e0b",
    yellowDim: "rgba(245,158,11,0.12)",
    purple: "#a855f7",
    purpleDim: "rgba(168,85,247,0.12)",
};

export const sourceConfig: any = {
    upload: { label: "Upload", color: s.textMuted, bg: "rgba(255,255,255,0.04)", icon: "📁" },
    youtube: { label: "YouTube", color: "#ef4444", bg: "rgba(239,68,68,0.1)", icon: "▶️" },
    gdrive: { label: "Google Drive", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: "📂" },
    vimeo: { label: "Vimeo", color: "#1ab7ea", bg: "rgba(26,183,234,0.1)", icon: "🎬" },
    dropbox: { label: "Dropbox", color: "#0061ff", bg: "rgba(0,97,255,0.1)", icon: "📦" },
    soundcloud: { label: "SoundCloud", color: "#ff5500", bg: "rgba(255,85,0,0.1)", icon: "☁️" },
};

export const categoryConfig: any = {
    video: { label: "Video", icon: "🎥", color: s.purple, bg: s.purpleDim },
    pdf: { label: "Dokument", icon: "📄", color: s.red, bg: s.redDim },
    audio: { label: "Audio", icon: "🎵", color: s.green, bg: s.greenDim },
    image: { label: "Bild", icon: "🖼️", color: s.blue, bg: s.blueDim },
    song: { label: "Song/Play-Along", icon: "🎶", color: s.yellow, bg: s.yellowDim },
};

// ============================================================
// UI PRIMITIVES
// ============================================================
export const Card = ({ children, style, onClick }: any) => (
    <div onClick={onClick} style={{
        background: s.card, border: `1px solid ${s.cardBorder}`,
        borderRadius: "18px", padding: "22px", ...style,
    }}>{children}</div>
);

export const Badge = ({ color, bg, children, style }: any) => (
    <span style={{
        background: bg, color, padding: "4px 10px", borderRadius: "8px",
        fontSize: "11px", fontWeight: "700", letterSpacing: "0.3px", whiteSpace: "nowrap", ...style,
    }}>{children}</span>
);

export const Btn = ({ children, variant = "primary", size = "md", onClick, style, disabled, type = "button" }: any) => {
    const base = {
        border: "none", borderRadius: size === "sm" ? "8px" : "12px",
        cursor: disabled ? "not-allowed" : "pointer", fontWeight: "700",
        fontSize: size === "sm" ? "12px" : "14px",
        padding: size === "sm" ? "6px 12px" : "12px 20px",
        transition: "all 0.15s", opacity: disabled ? 0.4 : 1,
    };
    const variants: any = {
        primary: { background: `linear-gradient(135deg, ${s.accent}, #e85d04)`, color: "#fff", boxShadow: "0 4px 16px rgba(255,140,50,0.25)" },
        secondary: { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", border: `1px solid ${s.cardBorder}` },
        danger: { background: s.redDim, color: s.red },
        success: { background: s.greenDim, color: s.green },
        ghost: { background: "transparent", color: s.textMuted, padding: size === "sm" ? "4px 8px" : "8px 12px" },
    };
    return <button type={type} onClick={disabled ? undefined : onClick} style={{ ...base, ...variants[variant], ...style }} disabled={disabled}>{children}</button>;
};

export const Input = ({ label, value, onChange, placeholder, type = "text", style, multiline }: any) => (
    <div style={{ marginBottom: "14px", ...style }}>
        {label && <label style={{ display: "block", color: s.textMuted, fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>{label}</label>}
        {multiline ? (
            <textarea
                value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
                rows={4}
                style={{
                    width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${s.cardBorder}`, borderRadius: "10px", color: s.text,
                    fontSize: "14px", outline: "none", boxSizing: "border-box", resize: "vertical",
                    fontFamily: "inherit", lineHeight: "1.5",
                }}
            />
        ) : (
            <input
                type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
                style={{
                    width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${s.cardBorder}`, borderRadius: "10px", color: s.text,
                    fontSize: "14px", outline: "none", boxSizing: "border-box",
                }}
            />
        )}
    </div>
);

export const Select = ({ label, value, onChange, options, style }: any) => (
    <div style={{ marginBottom: "14px", ...style }}>
        {label && <label style={{ display: "block", color: s.textMuted, fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>{label}</label>}
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{
            width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.04)",
            border: `1px solid ${s.cardBorder}`, borderRadius: "10px", color: s.text,
            fontSize: "14px", outline: "none", boxSizing: "border-box",
        }}>
            {options.map((o: any, i: number) => <option key={i} value={o.value} style={{ background: "#1a1a2e", color: "#ffffff" }}>{o.label}</option>)}
        </select>
    </div>
);

export const StatCard = ({ icon, label, value, color, bg }: any) => (
    <Card style={{ flex: "1 1 160px", minWidth: "160px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{icon}</div>
            <div>
                <p style={{ margin: 0, color: s.textMuted, fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</p>
                <p style={{ margin: "2px 0 0 0", fontSize: "24px", fontWeight: "800", color: color || s.text }}>{value}</p>
            </div>
        </div>
    </Card>
);

export const Modal = ({ children, onClose, width = "520px" }: any) => (
    <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(10px)",
    }} onClick={onClose}>
        <div onClick={e => e.stopPropagation()} style={{
            background: "#14141f", border: `1px solid ${s.cardBorder}`, borderRadius: "20px",
            padding: "28px", width: "100%", maxWidth: width, maxHeight: "92vh", overflowY: "auto",
        }}>{children}</div>
    </div>
);

// ============================================================
// FILE MANAGEMENT COMPONENTS
// ============================================================
export const DropZoneComponent = ({ lessonId, category, label, dragOver, setDragOver, addFileToLesson }: any) => {
    const isOver = dragOver === `${lessonId}-${category}`;
    const [uploading, setUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = async (files: File[]) => {
        setUploading(true);
        for (const file of files) {
            try {
                // Server-side upload via FormData
                const formData = new FormData();
                formData.append('file', file);

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || 'Upload fehlgeschlagen');
                }

                const { url } = await res.json();

                if (url) {
                    await addFileToLesson(lessonId, {
                        name: file.name, category, source: "upload", url,
                        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
                    });
                }
            } catch (e) {
                console.error(e);
                alert('Fehler beim Upload: ' + (e as any).message);
            }
        }
        setUploading(false);
    };

    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(`${lessonId}-${category}`); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={(e) => {
                e.preventDefault(); setDragOver(null);
                const files = Array.from(e.dataTransfer.files);
                handleFiles(files);
            }}
            onClick={() => !uploading && inputRef.current?.click()}
            style={{
                padding: "20px", border: `2px dashed ${isOver ? s.accent : uploading ? s.yellow : s.cardBorder}`,
                borderRadius: "14px", textAlign: "center", cursor: uploading ? "wait" : "pointer",
                background: isOver ? `${s.accent}08` : uploading ? `${s.yellow}08` : "rgba(255,255,255,0.015)",
                transition: "all 0.2s", marginBottom: "10px",
                position: "relative", overflow: "hidden"
            }}
        >
            <input
                type="file"
                multiple
                ref={inputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        handleFiles(Array.from(e.target.files));
                    }
                }}
            />
            {uploading ? (
                <div style={{ padding: "10px" }}>
                    <Loader2 style={{ width: "24px", height: "24px", animation: "spin 1s linear infinite", color: s.yellow, margin: "0 auto 8px" }} />
                    <p style={{ margin: 0, fontSize: "13px", color: s.yellow }}>Wird hochgeladen...</p>
                </div>
            ) : (
                <>
                    <p style={{ fontSize: "22px", margin: "0 0 6px 0" }}>{categoryConfig[category]?.icon || "📁"}</p>
                    <p style={{ margin: 0, fontSize: "13px", color: isOver ? s.accent : s.textMuted }}>
                        {isOver ? "Loslassen zum Hochladen" : `${label} hierher ziehen`}
                    </p>
                    <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: s.textDim }}>
                        oder klicken zum Auswählen
                    </p>
                </>
            )}
        </div>
    );
};

export const FileRowComponent = ({ file, lessonId, removeFileFromLesson }: any) => {
    const src = sourceConfig[file.source] || sourceConfig.upload;
    const cat = categoryConfig[file.category] || categoryConfig.pdf;
    return (
        <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 14px", background: "rgba(255,255,255,0.02)",
            borderRadius: "10px", marginBottom: "6px",
            border: `1px solid rgba(255,255,255,0.03)`,
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                <div style={{
                    width: "34px", height: "34px", borderRadius: "8px",
                    background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", flexShrink: 0,
                }}>{cat.icon}</div>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ margin: 0, fontSize: "13px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                        <Badge color={src.color} bg={src.bg} style={{ fontSize: "10px", padding: "2px 7px" }}>
                            {src.icon} {src.label}
                        </Badge>
                        {file.size && <span style={{ fontSize: "10px", color: s.textDim }}>{file.size}</span>}
                        {file.url && file.source !== "upload" && (
                            <span style={{ fontSize: "10px", color: s.textDim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
                                {file.url}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <Btn variant="ghost" size="sm" onClick={() => removeFileFromLesson(lessonId, file.id)}>✕</Btn>
        </div>
    );
};

export const AddFileSectionComponent = ({ category, lesson, addingFile, setAddingFile, newFileForm, setNewFileForm, addFileToLesson, removeFileFromLesson, dragOver, setDragOver }: any) => {
    const cat = categoryConfig[category] || categoryConfig.pdf;
    const isAdding = addingFile?.category === category && addingFile?.lessonId === lesson.id;
    const files = lesson.files.filter((f: any) => f.category === category);

    return (
        <div style={{ marginBottom: "24px" }}>
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: "10px",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                    <span style={{ fontSize: "14px", fontWeight: "700" }}>{cat.label}s</span>
                    <Badge color={s.textMuted} bg="rgba(255,255,255,0.04)">{files.length}</Badge>
                </div>
                <Btn
                    variant="ghost" size="sm"
                    onClick={() => {
                        if (isAdding) setAddingFile(null);
                        else {
                            setAddingFile({ category, lessonId: lesson.id });
                            setNewFileForm({ name: "", url: "", source: "upload" });
                        }
                    }}
                >
                    {isAdding ? "Abbrechen" : "+ Hinzufügen"}
                </Btn>
            </div>

            {isAdding && (
                <div style={{
                    padding: "16px", background: "rgba(255,255,255,0.02)",
                    borderRadius: "14px", marginBottom: "16px", border: `1px solid ${s.cardBorder}`
                }}>
                    <Select
                        label="Quelle"
                        value={newFileForm.source}
                        onChange={(val: any) => setNewFileForm({ ...newFileForm, source: val })}
                        options={Object.keys(sourceConfig).map(k => ({ value: k, label: sourceConfig[k].label }))}
                    />

                    {newFileForm.source === "upload" ? (
                        <DropZoneComponent lessonId={lesson.id} category={category} label={`${cat.label}-Dateien`} dragOver={dragOver} setDragOver={setDragOver} addFileToLesson={addFileToLesson} />
                    ) : (
                        <>
                            <Input
                                label={`${sourceConfig[newFileForm.source]?.label}-Link`}
                                value={newFileForm.url}
                                onChange={(val: any) => {
                                    setNewFileForm({ ...newFileForm, url: val });
                                    // Auto-title for youtube?
                                }}
                                placeholder="https://..."
                            />
                            {newFileForm.source === "youtube" && newFileForm.url && (
                                <div style={{ marginBottom: "14px", borderRadius: "10px", overflow: "hidden" }}>
                                    <iframe width="100%" height="200" src={newFileForm.url.replace("watch?v=", "embed/")} frameBorder="0" allowFullScreen />
                                </div>
                            )}
                        </>
                    )}

                    <Input
                        label="Titel"
                        value={newFileForm.name}
                        onChange={(val: any) => setNewFileForm({ ...newFileForm, name: val })}
                        placeholder={`Name des ${cat.label}s`}
                    />

                    <div style={{ display: "flex", gap: "8px" }}>
                        <Btn size="sm" disabled={!newFileForm.name} onClick={() => {
                            addFileToLesson(lesson.id, {
                                name: newFileForm.name,
                                category,
                                source: newFileForm.source,
                                url: newFileForm.url
                            });
                            setAddingFile(null);
                        }}>
                            ✓ Hinzufügen
                        </Btn>
                    </div>
                </div>
            )}

            {files.length > 0 ? (
                <div>
                    {files.map((file: any, i: number) => (
                        <FileRowComponent key={i} file={file} lessonId={lesson.id} removeFileFromLesson={removeFileFromLesson} />
                    ))}
                </div>
            ) : (
                <div style={{
                    padding: "20px", border: `2px dashed ${s.cardBorder}`, borderRadius: "14px",
                    textAlign: "center", color: s.textDim, fontSize: "13px"
                }}>
                    Keine {cat.label}s
                </div>
            )}
        </div>
    );
};
