import { ProjectPageLayout } from "@/components/ProjectPageLayout";

export default function TambourDuo() {
    return (
        <ProjectPageLayout
            title="Tambour Duo / Quartet"
            subtitle="Als Duo geboren, im Quartett mit neuen Klangfarben gewachsen"
            kicker="Ensemble &amp; Dialog"
            backHref="/#services"
            backLabel="← Zurück zur Übersicht"
            imageSrc="/images/Tmbour.jpg"
            imageAlt="Tambour Duo / Quartet"
            videoSrc="https://www.youtube.com/embed/6HTHxZ1uv2M"
            description={
                <div className="space-y-8">
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Klangwelten zwischen Orient &amp; Okzident
                        </h3>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            Das <strong>Tambour Quartet</strong>, ursprünglich als intimes Duo gegründet, erweitert seine Musik kontinuierlich um neue Horizonte und Klangwelten.
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light mb-4">
                            Ein erdiger, atmender Sound, der spielerisch zwischen orientalischer Rhythmustradition, lyrischem Jazz und der Ausdruckskraft des Blues changiert – geprägt von den vielschichtigen Identitäten der internationalen Musiker.
                        </p>
                        <p className="text-white/75 text-base sm:text-lg leading-relaxed font-light">
                            Mal feinsinnig und zart, mal kraftvoll, perkussiv und treibend: Ein dichter Teppich verschiedenster Stile, die organisch ineinanderfließen und zu einem homogenen Gesamtkunstwerk verschmelzen.
                        </p>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 text-center">
                        <span className="text-xs uppercase tracking-[0.24em] text-[#e44c65] font-medium block mb-3">
                            Booking &amp; Konzerte
                        </span>
                        <h4 className="text-xl sm:text-2xl font-light uppercase tracking-[0.12em] text-white mb-4">
                            Tambour live erleben
                        </h4>
                        <p className="text-white/75 text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto mb-8">
                            Für Konzertanfragen, Festival-Bookings und musikalische Kooperationen stehen wir gerne zur Verfügung.
                        </p>
                        <a
                            href="mailto:info@santinoscavelli.de?subject=Booking%20Tambour"
                            className="inline-block px-10 py-4 rounded-full bg-[#e44c65] text-white hover:bg-[#c43c52] transition-all font-medium text-xs sm:text-sm uppercase tracking-[0.16em] hover:scale-105 shadow-[0_0_30px_rgba(228,76,101,0.35)]"
                        >
                            Booking anfragen
                        </a>
                    </div>
                </div>
            }
        />
    );
}
