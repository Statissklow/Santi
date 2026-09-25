import Link from "next/link";

export default function Impressum() {
    return (
        <div className="min-h-screen bg-[#0f0f14] font-[family-name:var(--font-lato)] text-white pt-32 pb-24 px-6">
            <div className="max-w-3xl mx-auto">

                <p className="text-[#e44c65] text-sm font-bold uppercase tracking-widest mb-4">Rechtliches</p>
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-12">Impressum</h1>

                {/* Angaben gemäß §5 TMG */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        Angaben gemäß §5 TMG
                    </h2>
                    <div className="text-white/70 leading-relaxed space-y-1">
                        <p className="text-white font-bold">Santino Scavelli</p>
                        <p>DrumHub Studio</p>
                        <p>Obere Riedstr. 26</p>
                        <p>68309 Mannheim</p>
                        <p>Deutschland</p>
                    </div>
                </section>

                {/* Kontakt */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        Kontakt
                    </h2>
                    <div className="text-white/70 leading-relaxed space-y-2">
                        <p>
                            E-Mail:{" "}
                            <a href="mailto:info@santinoscavelli.de" className="text-[#e44c65] hover:underline">
                                info@santinoscavelli.de
                            </a>
                        </p>
                        <p>Website: <span className="text-white">www.santinoscavelli.de</span></p>
                    </div>
                </section>

                {/* Umsatzsteuer */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        Umsatzsteuer-ID
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                        <span className="text-white">[USt-IdNr. eintragen]</span>
                    </p>
                </section>

                {/* Berufliche Angaben */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        Berufsbezeichnung und berufsrechtliche Regelungen
                    </h2>
                    <div className="text-white/70 leading-relaxed space-y-1">
                        <p>Berufsbezeichnung: Musiker, Musikpädagoge, Musical Director</p>
                        <p>Zuständige Kammer: [ggf. eintragen]</p>
                        <p>Verliehen in: Bundesrepublik Deutschland</p>
                    </div>
                </section>

                {/* Streitschlichtung */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        EU-Streitschlichtung
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                        <a
                            href="https://ec.europa.eu/consumers/odr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e44c65] hover:underline"
                        >
                            https://ec.europa.eu/consumers/odr/
                        </a>
                        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        Verbraucherstreitbeilegung / Universalschlichtungsstelle
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                        Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                </section>

                {/* Haftung für Inhalte */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        Haftung für Inhalte
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Als Diensteanbieter sind wir gemäß §7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                        nach den allgemeinen Gesetzen verantwortlich. Nach §§8 bis 10 TMG sind wir als
                        Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                        Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                        Tätigkeit hinweisen.
                    </p>
                </section>

                {/* Haftung für Links */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        Haftung für Links
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
                        übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder
                        Betreiber der Seiten verantwortlich.
                    </p>
                </section>

                {/* Urheberrecht */}
                <section className="mb-16">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        Urheberrecht
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                        dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                        der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                        Zustimmung des jeweiligen Autors bzw. Erstellers.
                    </p>
                </section>

                <div className="flex flex-wrap gap-4 text-sm text-white/40">
                    <Link href="/en/datenschutz" className="hover:text-white transition-colors">Datenschutzerklärung</Link>
                    <span>·</span>
                    <Link href="/en/bildnachweis" className="hover:text-white transition-colors">Bildnachweis</Link>
                    <span>·</span>
                    <Link href="/en" className="hover:text-white transition-colors">← Zurück zur Startseite</Link>
                </div>
            </div>
        </div>
    );
}
