// ELDiB Data - Entwicklungstherapeutischer Lernziel-Diagnose-Bogen
// Contains all items for the 4 domains: Verhalten, Kommunikation, Sozialisation, Kognition
// Each domain has 5 stages (Stufen) with multiple items


const ELDIB_DATA = {
    verhalten: {
        name: "Verhalten",
        code: "V",
        color: "#e74c3c",
        stufen: [
            {
                nummer: 1,
                stufenziel: "Mit Freude auf die Umwelt reagieren",
                bereichsziel: "Den eigenen körperlichen Fähigkeiten vertrauen",
                items: [
                    { id: "V-1", name: "Wahrnehmung", beschreibung: "Lässt Wahrnehmung eines sensorischen Reizes erkennen durch beliebige Bewegungsreaktionen von der Reizquelle weg oder zu ihr hin." },
                    { id: "V-2", name: "Orientierung", beschreibung: "Reagiert auf sensorischen Reiz mit Zuwendung zur Reizquelle, entweder durch körperliche Reaktion oder durch Hinsehen." },
                    { id: "V-3", name: "Aufmerksamkeit", beschreibung: "Reagiert auf einen Reiz mit kurzzeitig anhaltender Aufmerksamkeit." },
                    { id: "V-4", name: "Motorische Reaktion", beschreibung: "Reagiert von sich aus auf einfache Umgebungsreize mit einer motorischen Handlung." },
                    { id: "V-5", name: "Komplexe Reaktion", beschreibung: "Reagiert auf komplexe Umgebungsreize und verbale Impulse mit motorischer Handlung." },
                    { id: "V-6", name: "Selbsthilfe", beschreibung: "Beteiligt sich aktiv am Erlernen von Selbsthilfe-Fähigkeiten (Hände waschen, essen, Toilette, anziehen)." },
                    { id: "V-7", name: "Spielmaterial", beschreibung: "Reagiert eigenständig auf verschiedene Spielmaterialien." },
                    { id: "V-8", name: "Routineabläufe", beschreibung: "Zeigt Wiedererkennen von Routineabläufen durch eigenständigen Wechsel von einem Aktivitätsbereich zum nächsten." }
                ]
            },
            {
                nummer: 2,
                stufenziel: "Erfolgreich auf die Umwelt reagieren",
                bereichsziel: "Erfolgreich an Routineabläufen und Aktivitäten teilnehmen",
                items: [
                    { id: "V-9", name: "Spielerfahrung", beschreibung: "Geht mit Spielmaterialien sachgerecht um." },
                    { id: "V-10", name: "Warten", beschreibung: "Wartet ohne körperliche Steuerungshilfe durch den Erwachsenen." },
                    { id: "V-11", name: "Sitzen", beschreibung: "Beteiligt sich verbal und physisch an Aktivitäten im Sitzen ohne körperliche Steuerungshilfe." },
                    { id: "V-12", name: "Bewegung", beschreibung: "Beteiligt sich verbal und physisch an Bewegungsaktivitäten ohne körperliche Steuerungshilfe." },
                    { id: "V-13", name: "Aktivitäten", beschreibung: "Nimmt von sich aus verbal und physisch an Aktivitäten teil." },
                    { id: "V-14", name: "Lob/Erfolg", beschreibung: "Akzeptiert Lob oder Erfolg ohne unangemessenes Verhalten oder Kontrollverlust." }
                ]
            },
            {
                nummer: 3,
                stufenziel: "Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen",
                bereichsziel: "Erworbene Fähigkeiten anwenden, um innerhalb einer Gruppe das eigene Verhalten erfolgreich zu steuern",
                items: [
                    { id: "V-15", name: "Beenden", beschreibung: "Beendet kurze, individuelle Aufgaben mit vertrautem Material selbstständig." },
                    { id: "V-16", name: "Erwartungen", beschreibung: "Lässt Bewusstsein für Verhaltensweisen erkennen, die zu Hause, in der Schule und in der Öffentlichkeit erwartet werden." },
                    { id: "V-17", name: "Begründungen", beschreibung: "Nennt Gründe für Verhaltenserwartungen." },
                    { id: "V-18", name: "Alternativen", beschreibung: "Beschreibt alternative, angemessenere Verhaltensmöglichkeiten für eine gegebene Situation." },
                    { id: "V-19", name: "Gruppenwahl", beschreibung: "Reagiert angemessen auf Gruppenwahl als Anführer bzw. Teilnehmer." },
                    { id: "V-20", name: "Zurückhalten", beschreibung: "Hält sich von inakzeptablem Verhalten zurück, wenn andere in der Gruppe die Selbstkontrolle verlieren." },
                    { id: "V-21", name: "Kontrolle", beschreibung: "Behält während der Gruppenaktivitäten akzeptable physische und verbale Selbstkontrolle." }
                ]
            },
            {
                nummer: 4,
                stufenziel: "Sich einbringen in Gruppenprozesse",
                bereichsziel: "Persönliche Fähigkeiten einsetzen, um zum Gruppenerfolg beizutragen",
                items: [
                    { id: "V-22", name: "Fortschritt", beschreibung: "Zeigt beginnendes Bewusstsein für eigenen Verhaltensfortschritt." },
                    { id: "V-23", name: "Flexibilität", beschreibung: "Lässt Flexibilität erkennen, wenn Abläufe aufgrund sich ändernder Anforderungen umgestaltet werden müssen." },
                    { id: "V-24", name: "Neue Erfahrungen", beschreibung: "Beteiligt sich verbal und physisch kontrolliert an neuen Erfahrungen bzw. Aktivitäten." },
                    { id: "V-25", name: "Anwenden", beschreibung: "Wendet alternative, sozial akzeptable Verhaltensweisen an." },
                    { id: "V-26", name: "Provokation", beschreibung: "Reagiert von sich aus auf Provokationen mit verbal und physisch kontrolliertem Verhalten." },
                    { id: "V-27", name: "Verantwortung", beschreibung: "Akzeptiert Verantwortung für die Folgen des eigenen Verhaltens und eigener Einstellungen." },
                    { id: "V-28", name: "Lösungsvorschlag", beschreibung: "Reagiert in kritischen Situationen auf Probleme mit konstruktiven Lösungsvorschlägen." }
                ]
            },
            {
                nummer: 5,
                stufenziel: "Anwenden von Fähigkeiten in neuen Situationen",
                bereichsziel: "Realen Lebenserfahrungen mit konstruktivem Verhalten begegnen",
                items: [
                    { id: "V-29", name: "Gewohnheiten", beschreibung: "Entwickelt neue persönliche Gewohnheiten oder Fähigkeiten mit Bezug zur Arbeitswelt." },
                    { id: "V-30", name: "Positive Rolle", beschreibung: "Sucht und entwickelt eine begehrte positive Rolle innerhalb einer Gruppe." },
                    { id: "V-31", name: "Recht/Ordnung", beschreibung: "Zeigt Verständnis und Akzeptanz von Rechts- und Ordnungsprinzipien in Schule und Öffentlichkeit." },
                    { id: "V-32", name: "Selbstverantwortung", beschreibung: "Befürwortet Verfahren zur Selbstverantwortung und Regelung des Gruppenlebens." },
                    { id: "V-33", name: "Einsicht", beschreibung: "Löst persönliche Probleme anhand von Einsicht, Analyse und Generalisierung." }
                ]
            }
        ]
    },
    kommunikation: {
        name: "Kommunikation",
        code: "K",
        color: "#3498db",
        stufen: [
            {
                nummer: 1,
                stufenziel: "Mit Freude auf die Umwelt reagieren",
                bereichsziel: "Gebraucht Wörter, um Bedürfnisse zu befriedigen",
                items: [
                    { id: "K-1", name: "Laute", beschreibung: "Produziert Laute (wiederholt eigene Lautmuster, um sich sozial oder imitierend zu äußern)." },
                    { id: "K-2", name: "Sprecher", beschreibung: "Richtet die Aufmerksamkeit auf eine sprechende Person." },
                    { id: "K-3", name: "Verbaler Impuls", beschreibung: "Reagiert auf einen verbalen Impuls mit einer Bewegung oder Handlung." },
                    { id: "K-4", name: "Wort-Annäherung", beschreibung: "Reagiert verbal auf Fragen oder Aufforderungen mit erkennbaren Wort-Annäherungen." },
                    { id: "K-5", name: "Wörter spontan", beschreibung: "Verwendet von sich aus erkennbare Wörter, um ein Ereignis oder Objekt zu beschreiben oder zu benennen." },
                    { id: "K-6", name: "Wörter Erwachsener", beschreibung: "Produziert einzelne erkennbare Wörter, um eine gewünschte Reaktion des Erwachsenen zu erhalten." },
                    { id: "K-7", name: "Wörter Peer", beschreibung: "Produziert einzelne erkennbare Wörter, um eine erwünschte Reaktion von einem gleichaltrigen Kind zu erhalten." },
                    { id: "K-8", name: "Wortreihung", beschreibung: "Produziert eine sinnvolle Wortsequenz, um von Anderen eine Reaktion zu erhalten." }
                ]
            },
            {
                nummer: 2,
                stufenziel: "Erfolgreich auf die Umwelt reagieren",
                bereichsziel: "Gebraucht Wörter, um andere in konstruktiver Weise zu beeinflussen",
                items: [
                    { id: "K-9", name: "Beantworten", beschreibung: "Beantwortet Fragen, Bitten oder Aufforderungen mit erkennbaren, sinnvollen Wörtern." },
                    { id: "K-10", name: "Vokabular", beschreibung: "Zeigt ein rezeptives Vokabular, das nicht mehr als zwei Jahre hinter normalen Erwartungen zurückliegt." },
                    { id: "K-11", name: "Wortsequenzen", beschreibung: "Verwendet von sich aus einfache Wortsequenzen, um etwas zu fordern, zu erfragen oder zu erbitten." },
                    { id: "K-12", name: "Austausch Erwachsene", beschreibung: "Verwendet von sich aus Wörter, um mit einem Erwachsenen minimale Informationen auszutauschen." },
                    { id: "K-13", name: "Merkmale", beschreibung: "Beschreibt einfache, konkrete Merkmale sowohl von sich als auch von anderen." },
                    { id: "K-14", name: "Austausch Kind", beschreibung: "Verwendet von sich aus Wörter, um mit einem anderen Kind minimale Informationen auszutauschen." }
                ]
            },
            {
                nummer: 3,
                stufenziel: "Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen",
                bereichsziel: "Gebraucht Wörter, um sich auf konstruktive Weise innerhalb einer Gruppe zu äußern",
                items: [
                    { id: "K-15", name: "Persönliches", beschreibung: "Verwendet von sich aus Wörter, um eigene Erfahrungen, Vorstellungen oder Arbeit zu beschreiben." },
                    { id: "K-16", name: "Gefühlsreaktionen", beschreibung: "Verwendet Wörter oder Gesten, um angemessene Gefühlsreaktionen auf die Umgebung zu zeigen." },
                    { id: "K-17", name: "Gespräche", beschreibung: "Beteiligt sich an Gruppengesprächen in einer Weise, die sich nicht störend auswirkt." },
                    { id: "K-18", name: "Stolz – ich", beschreibung: "Verwendet von sich aus Wörter, um Stolz auf eigene Arbeit oder Aktivitäten zu zeigen." },
                    { id: "K-19", name: "Eigenschaften – ich", beschreibung: "Beschreibt charakteristische Eigenschaften, Stärken und Schwächen bei sich selbst." },
                    { id: "K-20", name: "Eigenschaften – du", beschreibung: "Beschreibt charakteristische Eigenschaften bei anderen." },
                    { id: "K-21", name: "Gefühle – du", beschreibung: "Erkennt Gefühle anderer." },
                    { id: "K-22", name: "Stolz – wir", beschreibung: "Verwendet von sich aus Wörter, um Stolz auf Gruppenleistungen auszudrücken." }
                ]
            },
            {
                nummer: 4,
                stufenziel: "Sich einbringen in Gruppenprozesse",
                bereichsziel: "Verwendet Wörter, um Verständnis von Gefühlen und Verhaltensweisen zu zeigen",
                items: [
                    { id: "K-23", name: "Kreativität", beschreibung: "Kanalisiert Gefühle oder Erfahrungen durch kreative Ausdrucksmittel wie Kunst, Musik, Tanz." },
                    { id: "K-24", name: "Fortschritt", beschreibung: "Zeigt beginnendes Bewusstsein für eigenen Verhaltensfortschritt." },
                    { id: "K-25", name: "Beeinflussung", beschreibung: "Erklärt, wie eigenes Verhalten das Verhalten anderer beeinflusst." },
                    { id: "K-26", name: "Gefühle – ich", beschreibung: "Verwendet Wörter, um in der Gruppe eigene Gefühle auf angemessene Weise auszudrücken." },
                    { id: "K-27", name: "Beziehung", beschreibung: "Verwendet Wörter, um positive Beziehungen mit Gleichaltrigen und Erwachsenen anzuknüpfen." },
                    { id: "K-28", name: "Unterstützen", beschreibung: "Verwendet Wörter, um eine andere Person zu loben oder persönlich zu unterstützen." },
                    { id: "K-29", name: "Relationen", beschreibung: "Beschreibt den Ursache-Wirkungs-Zusammenhang von Gefühlen und Verhalten." }
                ]
            },
            {
                nummer: 5,
                stufenziel: "Anwenden von Fähigkeiten in neuen Situationen",
                bereichsziel: "Verwendet Wörter, um Beziehungen auszubauen und zu pflegen",
                items: [
                    { id: "K-30", name: "Komplexe Aussagen", beschreibung: "Formuliert Aussagen, die weitgehend komplex strukturiert und inhaltlich bildhaft oder abstrakt sind." },
                    { id: "K-31", name: "Ausgleich", beschreibung: "Wählt bei Provokationen einen Sprachgebrauch, der auf versöhnliche Absichten hindeutet." },
                    { id: "K-32", name: "Anerkennung", beschreibung: "Unterstützt andere durch Anerkennung ihrer Beiträge." },
                    { id: "K-33", name: "Motive", beschreibung: "Beschreibt verschiedene Motive und Wertvorstellungen in sozialen Situationen." },
                    { id: "K-34", name: "Ideale", beschreibung: "Beschreibt von sich aus eigene Wertvorstellungen, Ideale und Überzeugungen." },
                    { id: "K-35", name: "Erhalt/Pflege", beschreibung: "Verwendet kommunikative Fähigkeiten, um positive zwischenmenschliche Beziehungen zu erhalten." }
                ]
            }
        ]
    },
    sozialisation: {
        name: "Sozialisation",
        code: "SOZ",
        color: "#27ae60",
        stufen: [
            {
                nummer: 1,
                stufenziel: "Mit Freude auf die Umwelt reagieren",
                bereichsziel: "Einem Erwachsenen genügend vertrauen, um auf ihn zu reagieren",
                items: [
                    { id: "SOZ-1", name: "Gegenwart", beschreibung: "Ist sich der Gegenwart anderer bewusst." },
                    { id: "SOZ-2", name: "Gerichtetheit", beschreibung: "Richtet Aufmerksamkeit auf Handlungen anderer." },
                    { id: "SOZ-3", name: "Eigenname", beschreibung: "Reagiert, wenn ein Erwachsener den Namen des Kindes nennt." },
                    { id: "SOZ-4", name: "Spiel allein", beschreibung: "Beschäftigt sich mit organisiertem Spiel und spielt dabei für sich allein." },
                    { id: "SOZ-5", name: "Nonverbale Interaktion", beschreibung: "Interagiert nonverbal mit Erwachsenen, um Bedürfnisse auszudrücken." },
                    { id: "SOZ-6", name: "Kommen", beschreibung: "Reagiert auf die Aufforderung des Erwachsenen, zu ihm zu kommen." },
                    { id: "SOZ-7", name: "Aufforderungen", beschreibung: "Zeigt, dass es einzelne verbale Aufforderungen des Erwachsenen versteht." },
                    { id: "SOZ-8", name: "Wörter Erwachsener", beschreibung: "Produziert einzelne erkennbare Wörter für eine gewünschte Reaktion des Erwachsenen." },
                    { id: "SOZ-9", name: "Selbst-Bewusstheit", beschreibung: "Zeigt deutliche Anzeichen für eine beginnende Herausbildung des Selbst." },
                    { id: "SOZ-10", name: "Spiel parallel", beschreibung: "Nimmt von sich aus an parallelem Spiel teil." },
                    { id: "SOZ-11", name: "Wörter Peer", beschreibung: "Produziert einzelne erkennbare Wörter für eine Reaktion von einem gleichaltrigen Kind." },
                    { id: "SOZ-12", name: "Kontaktsuche", beschreibung: "Sucht in unterschiedlichen Situationen Kontakt mit einem vertrauten Erwachsenen." }
                ]
            },
            {
                nummer: 2,
                stufenziel: "Erfolgreich auf die Umwelt reagieren",
                bereichsziel: "Sich erfolgreich an Aktivitäten beteiligen",
                items: [
                    { id: "SOZ-13", name: "Fantasie", beschreibung: "Beschäftigt sich von sich aus mit Fantasie- und 'So-tun-als-ob'-Spielen." },
                    { id: "SOZ-14", name: "Warten", beschreibung: "Wartet ohne körperliche Steuerungshilfe durch den Erwachsenen." },
                    { id: "SOZ-15", name: "Kontakt", beschreibung: "Zeigt Ansätze, einen angemessenen sozialen Kontakt zu einem anderen Kind aufzunehmen." },
                    { id: "SOZ-16", name: "Teilen", beschreibung: "Beteiligt sich an einer Aktivität, die Teilen erfordert." },
                    { id: "SOZ-17", name: "Spiel interaktiv", beschreibung: "Beteiligt sich erfolgreich an interaktivem Spiel mit einem anderen Kind." },
                    { id: "SOZ-18", name: "Kooperation", beschreibung: "Kooperiert selbstständig mit einem anderen Kind in strukturierten Aktivitäten." }
                ]
            },
            {
                nummer: 3,
                stufenziel: "Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen",
                bereichsziel: "Gruppenaktivitäten als befriedigend erleben",
                items: [
                    { id: "SOZ-19", name: "Abwechseln", beschreibung: "Teilt von sich aus Materialien und wechselt sich mit anderen ab." },
                    { id: "SOZ-20", name: "Nachahmen", beschreibung: "Ahmt von sich aus angemessenes Verhalten eines anderen Kindes nach." },
                    { id: "SOZ-21", name: "Werten", beschreibung: "Bezeichnet einfache soziale Situationen mit wertenden Aussagen (richtig/falsch, gut/schlecht)." },
                    { id: "SOZ-22", name: "Leiten", beschreibung: "Leitet eine Gruppenaktivität oder demonstriert eine Aktivität für die Gruppe." },
                    { id: "SOZ-23", name: "Vorschlag andere", beschreibung: "Nimmt an einer Aktivität teil, die ein gleichaltriges Kind vorgeschlagen hat." },
                    { id: "SOZ-24", name: "Erfahrungen", beschreibung: "Beschreibt eigene Erfahrungen in der Reihenfolge, in der sie sich ereignet haben." },
                    { id: "SOZ-25", name: "Vorliebe", beschreibung: "Lässt beginnende Freundschaft erkennen durch Vorliebe für ein bestimmtes Kind." },
                    { id: "SOZ-26", name: "Unterstützung", beschreibung: "Sucht von sich aus Hilfe oder Lob durch ein anderes Kind." },
                    { id: "SOZ-27", name: "Gruppenregeln", beschreibung: "Hilft anderen von sich aus bei der Einhaltung von Gruppenregeln." }
                ]
            },
            {
                nummer: 4,
                stufenziel: "Sich einbringen in Gruppenprozesse",
                bereichsziel: "Nimmt von sich aus und erfolgreich als Gruppenmitglied an Aktivitäten teil",
                items: [
                    { id: "SOZ-28", name: "Identifizieren", beschreibung: "Identifiziert sich mit erwachsenen Führungspersonen oder Vorbildern." },
                    { id: "SOZ-29", name: "Gruppenerfahrung", beschreibung: "Beschreibt soziale Gruppenerfahrungen in der Reihenfolge, in der sie sich ereignet haben." },
                    { id: "SOZ-30", name: "Gruppenaktivität", beschreibung: "Schlägt von sich aus eine geeignete Gruppenaktivität vor." },
                    { id: "SOZ-31", name: "Verschiedenheit", beschreibung: "Erkennt, wie sich die eigenen sozialen Handlungen von denen anderer Kinder unterscheiden." },
                    { id: "SOZ-32", name: "Respekt", beschreibung: "Hört und respektiert die Vorstellungen, Gedanken und Meinungen anderer." },
                    { id: "SOZ-33", name: "Interesse", beschreibung: "Bekundet offen sein Interesse an der Meinung Gleichaltriger über die eigene Person." },
                    { id: "SOZ-34", name: "Lösungsvorschlag", beschreibung: "Reagiert in kritischen Situationen mit konstruktiven Lösungsvorschlägen." },
                    { id: "SOZ-35", name: "Wertvorstellung", beschreibung: "Erkennt und unterscheidet gegensätzliche Werte in sozialen Situationen." },
                    { id: "SOZ-36", name: "Schlussfolgerungen", beschreibung: "Zieht Schlussfolgerungen aus sozialen Situationen." }
                ]
            },
            {
                nummer: 5,
                stufenziel: "Anwenden von Fähigkeiten in neuen Situationen",
                bereichsziel: "Beginnt und pflegt selbständig dauerhafte und tragfähige Beziehungen",
                items: [
                    { id: "SOZ-37", name: "Empathie", beschreibung: "Lässt erkennen, dass er persönliche Situationen und Gefühle anderer versteht und achtet." },
                    { id: "SOZ-38", name: "Verschiedene Rollen", beschreibung: "Interagiert erfolgreich mit anderen in unterschiedlichen sozialen Rollen." },
                    { id: "SOZ-39", name: "Prinzipien", beschreibung: "Trifft in sozialen Situationen persönliche Entscheidungen aufgrund eigener Wertvorstellungen." },
                    { id: "SOZ-40", name: "Selbstverständnis", beschreibung: "Lässt realistisches Verständnis und Einschätzung des eigenen Selbst erkennen." },
                    { id: "SOZ-41", name: "Interpersonalität", beschreibung: "Zeigt die Fähigkeit, dauerhafte und tragfähige Beziehungen aufzubauen und zu erhalten." }
                ]
            }
        ]
    },
    kognition: {
        name: "Kognition",
        code: "KOG",
        color: "#9b59b6",
        stufen: [
            {
                nummer: 1,
                stufenziel: "Mit Freude auf die Umwelt reagieren",
                bereichsziel: "Auf die Umgebung reagieren mit gezielten Körperbewegungen und elementaren mentalen Prozessen",
                items: [
                    { id: "KOG-1", name: "Orientierung", beschreibung: "Reagiert auf sensorischen Reiz mit Zuwendung zur Reizquelle." },
                    { id: "KOG-2", name: "Aufmerksamkeit", beschreibung: "Reagiert auf einen Reiz mit kurzzeitig anhaltender Aufmerksamkeit." },
                    { id: "KOG-3", name: "Kurzzeitgedächtnis", beschreibung: "Zeigt Kurzzeitgedächtnis durch Wiedererkennen von Personen oder Objekten." },
                    { id: "KOG-4", name: "Komplexe Reaktionen", beschreibung: "Reagiert auf komplexe Umgebungsreize und verbale Impulse mit motorischer Handlung." },
                    { id: "KOG-5", name: "Einfache Imitation", beschreibung: "Imitiert von sich aus einfache, vertraute Handlungen des Erwachsenen." },
                    { id: "KOG-6", name: "Motorik 18 Monate", beschreibung: "Zeigt rudimentäre fein- und grobmotorische Fähigkeiten auf dem Niveau von 18 Monaten." },
                    { id: "KOG-7", name: "Bezeichnung", beschreibung: "Lässt Verständnis von Bezeichnungen für vertraute Objekte erkennen." },
                    { id: "KOG-8", name: "Wort-Annäherung", beschreibung: "Reagiert verbal auf Fragen mit erkennbaren Wort-Annäherungen." },
                    { id: "KOG-9", name: "Wörter spontan", beschreibung: "Verwendet von sich aus erkennbare Wörter bei verschiedenen Aktivitäten." },
                    { id: "KOG-10", name: "Form", beschreibung: "Passt ein Objekt in eine dafür passende Lücke ein." },
                    { id: "KOG-11", name: "Körperteile", beschreibung: "Identifiziert eigene Körperteile." },
                    { id: "KOG-12", name: "Details", beschreibung: "Erkennt einfache Details in Bildern." },
                    { id: "KOG-13", name: "Sortieren", beschreibung: "Ordnet zwei Sorten von Objekten einander zu." },
                    { id: "KOG-14", name: "Bilder benennen", beschreibung: "Äußert einzelne Wörter, um auf Abbildungen vertraute Dinge zu bezeichnen." }
                ]
            },
            {
                nummer: 2,
                stufenziel: "Erfolgreich auf die Umwelt reagieren",
                bereichsziel: "Beteiligung an Aktivitäten, die Selbsthilfe, motorische Koordination und Sprache erfordern",
                items: [
                    { id: "KOG-15", name: "Gebrauchswert", beschreibung: "Erkennt Gebrauchswert vertrauter Gegenstände." },
                    { id: "KOG-16", name: "Körper 3 Jahre", beschreibung: "Führt motorische Aktivitäten auf dem Niveau eines dreijährigen Kindes aus." },
                    { id: "KOG-17", name: "Serie identisch", beschreibung: "Ordnet zwei identische Bilder einander zu." },
                    { id: "KOG-18", name: "Feinmotorik 3 Jahre", beschreibung: "Führt feinmotorische Aktivitäten auf dem Niveau eines dreijährigen Kindes aus." },
                    { id: "KOG-19", name: "Serie anders", beschreibung: "Erkennt das Objekt, das sich von den anderen unterscheidet." },
                    { id: "KOG-20", name: "Gegenteile", beschreibung: "Versteht mindestens drei einfache Gegenteile." },
                    { id: "KOG-21", name: "Kategorisieren", beschreibung: "Gebraucht Kategorien beim Zuordnen einfacher Bilder." },
                    { id: "KOG-22", name: "Zählen 4", beschreibung: "Zählt bis 4 und wendet dabei 1 zu 1 Zuordnung an." },
                    { id: "KOG-23", name: "Farben", beschreibung: "Identifiziert vier Farben und drei Formen." },
                    { id: "KOG-24", name: "Alternation", beschreibung: "Gibt korrekte Antworten bei wechselnden Zuordnungsaufgaben." },
                    { id: "KOG-25", name: "Zählen 10", beschreibung: "Zählt mit 1 zu 1 Zuordnung bis 10." },
                    { id: "KOG-26", name: "Auge-Hand 5 Jahre", beschreibung: "Führt Aktivitäten aus, die Auge-Hand-Koordination auf 5-Jahres-Niveau erfordern." },
                    { id: "KOG-27", name: "Unterscheiden", beschreibung: "Unterscheidet zwischen Ziffern, Zeichen und Großbuchstaben." },
                    { id: "KOG-28", name: "Körper 5 Jahre", beschreibung: "Führt motorische Aktivitäten auf dem Niveau eines fünfjährigen Kindes aus." },
                    { id: "KOG-29", name: "Objekte 5", beschreibung: "Erkennt die Anzahl von Objekten in einer Menge bis zu 5, ohne zu zählen." },
                    { id: "KOG-30", name: "Gedächtnis", beschreibung: "Gibt Auswendiggelerntes wieder auf dem Niveau eines fünfjährigen Kindes." },
                    { id: "KOG-31", name: "Bilderserie", beschreibung: "Ordnet drei einfache Bilder in richtiger Reihenfolge an." }
                ]
            },
            {
                nummer: 3,
                stufenziel: "Erwerben von Fähigkeiten zur erfolgreichen Teilnahme in Gruppen",
                bereichsziel: "Beteiligt sich erfolgreich in einer Lerngruppe mit grundlegenden Lernkompetenzen",
                items: [
                    { id: "KOG-32", name: "Auge-Hand 6 Jahre", beschreibung: "Führt Aktivitäten aus, die Auge-Hand-Koordination auf 6-Jahres-Niveau erfordern." },
                    { id: "KOG-33", name: "Körper 6 Jahre", beschreibung: "Führt motorische Aktivitäten auf dem Niveau eines sechsjährigen Kindes aus." },
                    { id: "KOG-34", name: "Lesen 50", beschreibung: "Liest 50 Wörter des Grundwortschatzes." },
                    { id: "KOG-35", name: "Zahlen 10", beschreibung: "Erkennt und schreibt Zahlen, die Mengen bis 10 repräsentieren." },
                    { id: "KOG-36", name: "Schreiben 50", beschreibung: "Schreibt 50 Wörter des Grundwortschatzes nach Diktat." },
                    { id: "KOG-37", name: "Verständnis", beschreibung: "Hört einer Geschichte zu und lässt Verständnis der Fakten erkennen." },
                    { id: "KOG-38", name: "Erklären", beschreibung: "Erklärt das Verhalten anderer." },
                    { id: "KOG-39", name: "Sinnentnahme", beschreibung: "Liest einfache Sätze und lässt dabei Verständnis des Inhalts erkennen." },
                    { id: "KOG-40", name: "Plus/Minus 9", beschreibung: "Beherrscht Addition und Subtraktion im Zahlenraum bis 9." },
                    { id: "KOG-41", name: "Unlogik", beschreibung: "Erkennt Unstimmigkeiten in einfachen Situationen." },
                    { id: "KOG-42", name: "Antwortsätze", beschreibung: "Schreibt einfache Sätze als Antworten auf Fragen." },
                    { id: "KOG-43", name: "Sport/Spiele", beschreibung: "Zeigt mindestens zwei motorische Kompetenzen auf Grundschulniveau." },
                    { id: "KOG-44", name: "Sätze frei", beschreibung: "Formuliert und schreibt einfache Sätze." },
                    { id: "KOG-45", name: "Numerische Konzepte", beschreibung: "Wendet grundlegende numerische Konzepte an (Addition, Subtraktion, Zeit, Geld)." },
                    { id: "KOG-46", name: "Quantitativa", beschreibung: "Liest und erklärt quantitative Begriffe für Maßeinheiten." },
                    { id: "KOG-47", name: "Sachverhalte", beschreibung: "Liest kurze Geschichten und erzählt von den Ereignissen." },
                    { id: "KOG-48", name: "Operationen", beschreibung: "Führt grundlegende Rechenoperationen durch (Stellenwert, Übertrag, Multiplikation)." }
                ]
            },
            {
                nummer: 4,
                stufenziel: "Sich einbringen in Gruppenprozesse",
                bereichsziel: "Gebraucht kognitive und schulische Fähigkeiten für soziale Gruppenerfahrungen",
                items: [
                    { id: "KOG-49", name: "Kommunikation", beschreibung: "Schreibt, um Informationen, Ereignisse oder Gefühle mitzuteilen." },
                    { id: "KOG-50", name: "Mult./Divis. 100", beschreibung: "Rechnet Multiplikations- und Divisionsaufgaben im Zahlenraum bis 100." },
                    { id: "KOG-51", name: "Informationsgewinn", beschreibung: "Liest aus Freude am Lesen und zum persönlichen Informationsgewinn." },
                    { id: "KOG-52", name: "Geldmenge 10€", beschreibung: "Berechnet Wert für Geldmengen bis zu 10 Euro." },
                    { id: "KOG-53", name: "Fiktion", beschreibung: "Beschreibt fiktive Charaktere und erklärt deren Motive." },
                    { id: "KOG-54", name: "Grammatik", beschreibung: "Verwendet grammatische Regeln beim Schreiben." },
                    { id: "KOG-55", name: "Wertvorstellungen", beschreibung: "Erkennt und unterscheidet gegensätzliche Werte in sozialen Situationen." },
                    { id: "KOG-56", name: "Konzepte", beschreibung: "Gebraucht Maßeinheiten, um einfache logische Probleme zu lösen." }
                ]
            },
            {
                nummer: 5,
                stufenziel: "Anwenden von Fähigkeiten in neuen Situationen",
                bereichsziel: "Setzt erfolgreich kognitive Fähigkeiten zur Bereicherung persönlicher Erfahrungen ein",
                items: [
                    { id: "KOG-57", name: "Zeitgeschichte", beschreibung: "Sucht die Meinung anderer zu aktuellen Problemen zu erfahren." },
                    { id: "KOG-58", name: "Meinungen", beschreibung: "Unterscheidet in Texten zwischen Fakten und Meinungen." },
                    { id: "KOG-59", name: "Inkonsistenz", beschreibung: "Erkennt unlogisches und unstimmiges Verhalten bei anderen." },
                    { id: "KOG-60", name: "Textaufgaben", beschreibung: "Löst Textaufgaben mit Bruchrechnung, Dezimalrechnung und negativen Zahlen." },
                    { id: "KOG-61", name: "Einsicht", beschreibung: "Löst persönliche Probleme anhand von Einsicht, Analyse und Generalisierung." },
                    { id: "KOG-62", name: "Bürger/in", beschreibung: "Gebraucht selbständig kognitive Verfahren in der Rolle als Bürger/in und Arbeitnehmer/in." }
                ]
            }
        ]
    }
};
