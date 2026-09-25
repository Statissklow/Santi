import Link from "next/link";

export default function Datenschutz() {
    return (
        <div className="min-h-screen bg-[#0f0f14] font-[family-name:var(--font-lato)] text-white pt-32 pb-24 px-6">
            <div className="max-w-3xl mx-auto">

                <p className="text-[#e44c65] text-sm font-bold uppercase tracking-widest mb-4">Rechtliches</p>
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Datenschutzerklärung</h1>
                <p className="text-white/40 text-sm mb-12">Stand: Februar 2025</p>

                {/* 1 */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        1. Datenschutz auf einen Blick
                    </h2>
                    <h3 className="text-white font-bold mb-2">Allgemeine Hinweise</h3>
                    <p className="text-white/70 leading-relaxed mb-4">
                        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                        personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
                        Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                    </p>
                    <h3 className="text-white font-bold mb-2">Datenerfassung auf dieser Website</h3>
                    <p className="text-white/70 leading-relaxed mb-2">
                        <strong className="text-white">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
                        Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                    </p>
                    <p className="text-white/70 leading-relaxed mb-2">
                        <strong className="text-white">Wie erfassen wir Ihre Daten?</strong><br />
                        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. per
                        E-Mail-Kontaktformular). Andere Daten werden automatisch oder nach Ihrer Einwilligung
                        beim Besuch der Website durch unsere IT-Systeme erfasst – das sind vor allem technische
                        Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                    </p>
                    <p className="text-white/70 leading-relaxed">
                        <strong className="text-white">Wofür nutzen wir Ihre Daten?</strong><br />
                        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
                        gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                    </p>
                </section>

                {/* 2 */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        2. Hosting
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Diese Website wird bei einem externen Dienstleister gehostet (Vercel Inc., 340 Pine
                        Street, Suite 701, San Francisco, CA 94104, USA). Die personenbezogenen Daten, die auf
                        dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei
                        kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
                        Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine
                        Website generiert werden, handeln.
                    </p>
                </section>

                {/* 3 */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        3. Allgemeine Hinweise und Pflichtinformationen
                    </h2>
                    <h3 className="text-white font-bold mb-2">Datenschutz</h3>
                    <p className="text-white/70 leading-relaxed mb-4">
                        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
                        behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
                        Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                    </p>
                    <h3 className="text-white font-bold mb-2">Hinweis zur verantwortlichen Stelle</h3>
                    <div className="text-white/70 leading-relaxed space-y-1 mb-4">
                        <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                        <p className="text-white font-medium">Santino Scavelli</p>
                        <p>[Straße und Hausnummer]</p>
                        <p>68[XXX] Mannheim</p>
                        <p>E-Mail: <a href="mailto:info@santinoscavelli.de" className="text-[#e44c65] hover:underline">info@santinoscavelli.de</a></p>
                    </div>
                    <h3 className="text-white font-bold mb-2">Speicherdauer</h3>
                    <p className="text-white/70 leading-relaxed mb-4">
                        Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
                        wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
                        Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder
                        eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern
                        wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
                        personenbezogenen Daten haben.
                    </p>
                    <h3 className="text-white font-bold mb-2">Ihre Rechte</h3>
                    <p className="text-white/70 leading-relaxed">
                        Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und
                        Zweck Ihrer gespeicherten personenbezogenen Daten sowie das Recht auf Berichtigung,
                        Sperrung oder Löschung dieser Daten (Art. 15–17 DSGVO). Hierzu sowie zu weiteren Fragen
                        zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
                    </p>
                </section>

                {/* 4 */}
                <section className="mb-10">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        4. Datenerfassung auf dieser Website
                    </h2>
                    <h3 className="text-white font-bold mb-2">Server-Log-Dateien</h3>
                    <p className="text-white/70 leading-relaxed mb-4">
                        Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                        Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp und
                        Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden
                        Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Eine Zusammenführung dieser Daten
                        mit anderen Datenquellen wird nicht vorgenommen.
                    </p>
                    <h3 className="text-white font-bold mb-2">Kontaktformular und E-Mail</h3>
                    <p className="text-white/70 leading-relaxed mb-4">
                        Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben inklusive der von Ihnen
                        angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
                        Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung
                        weiter. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                    </p>
                    <h3 className="text-white font-bold mb-2">Eingebettete YouTube-Videos</h3>
                    <p className="text-white/70 leading-relaxed">
                        Diese Website bindet Videos der YouTube LLC, 901 Cherry Ave., San Bruno, CA 94066, USA
                        ein. Beim Besuch von Seiten mit eingebetteten YouTube-Videos wird eine Verbindung zu den
                        Servern von YouTube hergestellt. YouTube erfährt dabei u.a. Ihre IP-Adresse. Wenn Sie in
                        Ihrem YouTube-Account eingeloggt sind, ermöglichen Sie YouTube, Ihr Surfverhalten direkt
                        Ihrem Profil zuzuordnen. Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in
                        der Datenschutzerklärung von YouTube:{" "}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#e44c65] hover:underline"
                        >
                            https://policies.google.com/privacy
                        </a>
                        .
                    </p>
                </section>

                {/* 5 */}
                <section className="mb-16">
                    <h2 className="text-xl font-black text-white uppercase tracking-wide mb-4 pb-2 border-b border-white/10">
                        5. Student Portal
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Das Student Portal setzt Cookies und speichert Anmeldedaten zur Authentifizierung
                        (NextAuth.js Session). Diese Daten werden ausschließlich zur Bereitstellung des
                        Unterrichtsmaterials genutzt und nicht an Dritte weitergegeben. Die Speicherung erfolgt
                        auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
                    </p>
                </section>

                <div className="flex flex-wrap gap-4 text-sm text-white/40">
                    <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
                    <span>·</span>
                    <Link href="/bildnachweis" className="hover:text-white transition-colors">Bildnachweis</Link>
                    <span>·</span>
                    <Link href="/" className="hover:text-white transition-colors">← Zurück zur Startseite</Link>
                </div>
            </div>
        </div>
    );
}
