import Link from "next/link";

const credits = [
    {
        category: "Portraitfotos & Künstlerbilder",
        items: [
            { file: "Santi at meinl Perc shoot 2024.jpg", desc: "Portraitshooting", credit: "© Torsten Redler" },
            { file: "pic01.jpg – pic23.jpeg", desc: "Künstlerfotos", credit: "© Torsten Redler / Hannes Auerochs" },
            { file: "profil.png", desc: "Profilbild", credit: "© Torsten Redler" },
            { file: "santidrum.jpg", desc: "Drumset-Foto", credit: "© Hannes Auerochs" },
            { file: "banner.jpg / banner1.jpg", desc: "Banner-Fotos", credit: "© Torsten Redler" },
        ],
    },
    {
        category: "DrumHub Studio",
        items: [
            { file: "drumhub-01 bis drumhub-08.jpg", desc: "Studio-Aufnahmen DrumHub Mannheim", credit: "© Santino Scavelli / DrumHub Studio" },
            { file: "drumset.JPG, drumset-iii.jpg, Drumset GB Studio.JPG etc.", desc: "Drumset-Fotos", credit: "© Santino Scavelli / DrumHub Studio" },
            { file: "eingang.jpg / eingang-ii.jpg", desc: "Studioeingang", credit: "© Santino Scavelli / DrumHub Studio" },
            { file: "ganzstudio.jpg", desc: "Studio-Übersicht", credit: "© Santino Scavelli / DrumHub Studio" },
            { file: "Splitset GB Studio.JPG etc.", desc: "Split-Set Fotos", credit: "© Santino Scavelli / DrumHub Studio" },
        ],
    },
    {
        category: "Live & Events",
        items: [
            { file: "meinldrumfestival.jpg / Meinldrumfestival II.jpg", desc: "Meinl Drum Festival", credit: "© Torsten Redler" },
            { file: "jazzopen.jpg", desc: "Jazzopen Stuttgart", credit: "© Hannes Auerochs" },
            { file: "openjazz.jpg", desc: "Open Jazz Event", credit: "© Hannes Auerochs" },
            { file: "ewerk.jpg", desc: "e-werk Kulturzentrum", credit: "© Hannes Auerochs" },
            { file: "national theater.jpg", desc: "Nationaltheater Mannheim", credit: "© Torsten Redler" },
        ],
    },
    {
        category: "Percussion & Instrumente",
        items: [
            { file: "latinpercussion.jpg", desc: "Latin Percussion", credit: "© Santino Scavelli" },
            { file: "orientalische Percussion.jpg", desc: "Orientalische Percussion", credit: "© Santino Scavelli" },
            { file: "rahmentrommel.jpg", desc: "Rahmentrommel / Frame Drum", credit: "© Santino Scavelli" },
            { file: "tamburi.jpg / tamburimundi.jpg", desc: "Tamburi Mundi", credit: "© Hannes Auerochs" },
        ],
    },
    {
        category: "Projekte",
        items: [
            { file: "_DSC1321.jpg", desc: "Pulse Project", credit: "© Torsten Redler" },
            { file: "Tmbour.jpg", desc: "Tambour Duo", credit: "© Hannes Auerochs" },
            { file: "tobi.jpg", desc: "Monkey Beatz", credit: "© Hannes Auerochs" },
            { file: "noah.jpg", desc: "Session-Foto", credit: "© Torsten Redler" },
            { file: "murat.jpg", desc: "Murat Coşkun", credit: "© Torsten Redler" },
        ],
    },
    {
        category: "Endorsement-Logos",
        items: [
            { file: "Meinl.png", desc: "Meinl Percussion Logo", credit: "® Meinl Percussion GmbH & Co. KG" },
            { file: "evans.png / evansII .png", desc: "Evans Drumheads Logo", credit: "® D'Addario & Company, Inc." },
            { file: "Tama.png", desc: "Tama Drums Logo", credit: "® Hoshino Gakki Co., Ltd." },
            { file: "Audix.png / Download.png", desc: "Audix Microphones Logo", credit: "® Audix Corporation" },
            { file: "zoom.png / zoomII.png", desc: "Zoom Logo", credit: "® Zoom Corporation" },
            { file: "Hoerluchs.png / Hoerluchs III.jpg / Download (2).png", desc: "Hörluchs Logo", credit: "® Hörluchs GmbH" },
            { file: "Download (1).png", desc: "MOTU Logo", credit: "® Mark of the Unicorn, Inc." },
        ],
    },
    {
        category: "Sonstige",
        items: [
            { file: "German Flag.png", desc: "Deutsche Flagge", credit: "Gemeinfrei" },
            { file: "Uk Flag.jpeg / Uk Flag.png", desc: "UK Flagge", credit: "Gemeinfrei" },
            { file: "splitset.jpg", desc: "Split-Set", credit: "© Santino Scavelli" },
        ],
    },
];

export default function Bildnachweis() {
    return (
        <div className="min-h-screen bg-[#0f0f14] font-[family-name:var(--font-lato)] text-white pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
                <p className="text-[#e44c65] text-sm font-bold uppercase tracking-widest mb-4">Rechtliches</p>
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Bildnachweis</h1>
                <p className="text-white/40 text-sm mb-12">
                    Alle Bilder sind urheberrechtlich geschützt. Reproduktion nur mit ausdrücklicher Genehmigung.
                    Fehlende Angaben bitte melden: {" "}
                    <a href="mailto:info@santinoscavelli.de" className="text-[#e44c65] hover:underline">
                        info@santinoscavelli.de
                    </a>
                </p>

                <div className="space-y-12">
                    {credits.map((section) => (
                        <section key={section.category}>
                            <h2 className="text-lg font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                                {section.category}
                            </h2>
                            <div className="space-y-3">
                                {section.items.map((item) => (
                                    <div
                                        key={item.file}
                                        className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-3 border-b border-white/5"
                                    >
                                        <span className="text-white/40 text-sm font-mono">{item.file}</span>
                                        <span className="text-white/70 text-sm">{item.desc}</span>
                                        <span className="text-white/60 text-sm italic">{item.credit}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <div className="mt-16 flex flex-wrap gap-4 text-sm text-white/40">
                    <Link href="/en/impressum" className="hover:text-white transition-colors">Impressum</Link>
                    <span>·</span>
                    <Link href="/en/datenschutz" className="hover:text-white transition-colors">Datenschutzerklärung</Link>
                    <span>·</span>
                    <Link href="/en" className="hover:text-white transition-colors">← Zurück zur Startseite</Link>
                </div>
            </div>
        </div>
    );
}
