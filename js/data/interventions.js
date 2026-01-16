// Interventions-Datenbank
// Enthält Zielformulierungen und Interventionen für ELDiB-Items

// Entwicklungsstufen-Mapping

const STAGE_DATA = {
    1: { ageMin: 0, ageMax: 2, ageMid: 1, label: "0-2 Jahre", angst: "Verlassenheit", beschreibung: "Grundlegendes Vertrauen aufbauen" },
    2: { ageMin: 2, ageMax: 5, ageMid: 3.5, label: "2-5 Jahre", angst: "Unzulänglichkeit", beschreibung: "Autonomie und Selbstwirksamkeit entwickeln" },
    3: { ageMin: 6, ageMax: 9, ageMid: 7.5, label: "6-9 Jahre", angst: "Schuld", beschreibung: "Initiative und Kompetenz erwerben" },
    4: { ageMin: 10, ageMax: 12, ageMid: 11, label: "10-12 Jahre", angst: "Konflikt", beschreibung: "Soziale Rollen und Beziehungen gestalten" },
    5: { ageMin: 13, ageMax: 16, ageMid: 14.5, label: "13-16 Jahre", angst: "Identität", beschreibung: "Identität und Werte entwickeln" }
};

// Interventions-Datenbank aus ELDiB-Dokumenten
const INTERVENTIONS_DATA = {
    // VERHALTEN
    "V-1": {
        zielformulierung: "Ich schaue den/die LehrerIn an, wenn sie/er mich berührt.",
        interventionen: ["Aktivierung des Ziels durch direkten Kontakt", "Spiegeln der Reaktionen des Kindes", "Sensorische Reize gezielt einsetzen"]
    },
    "V-2": {
        zielformulierung: "Ich schaue mir Bilder an, die die Lehrerin/der Lehrer mir zeigt.",
        interventionen: ["Geschichte vorlesen und Bilder zeigen", "Sensomotorische Aktivitäten anbieten", "Interaktive Spiele mit verschiedenen Texturen"]
    },
    "V-3": {
        zielformulierung: "Ich schaue auf das, was mir vorgezeigt wird.",
        interventionen: ["Aufmerksamkeit auf kurze Erklärungsphasen lenken", "Mit visuellen Verstärkungssignalen arbeiten (Piktogramme)", "Kurze, prägnante Reize verwenden"]
    },
    "V-4": {
        zielformulierung: "Wenn der/die LehrerIn mir die Hand reicht, nehme ich sie.",
        interventionen: ["Verhaltensanweisungen gezielt und direkt formulieren", "Konzentration durch spielerische Anreize fördern", "Individuelle Verhaltensanweisungen ausarbeiten"]
    },
    "V-5": {
        zielformulierung: "Ich baue einen Turm, wenn ich Bauklötze angeboten bekomme.",
        interventionen: ["Gezielte Aktivitäten mit klaren Anweisungen anbieten", "Rollenspiele und praktische Übungen", "Strukturierung der Umgebung"]
    },
    "V-6": {
        zielformulierung: "Morgens hänge ich meine Jacke an den Haken.",
        interventionen: ["Routineabläufe garantieren und institutionalisieren", "Piktogramme einsetzen", "Lernen am Modell ermöglichen"]
    },
    "V-7": {
        zielformulierung: "Ich räume die Bücher in das Regal wenn die/der LehrerIn das sagt.",
        interventionen: ["Verhaltensanforderung klar benennen", "Aufräumaktivitäten zur Zielerreichung nutzen", "Vielfältige Spielmaterialien anbieten"]
    },
    "V-8": {
        zielformulierung: "Wenn der Lehrer/die Lehrerin sagt, dass wir in die Pause gehen, räume ich mein Pult.",
        interventionen: ["Visualisierung durch Stundenablauf", "Klar definierte Aktivitätenbereiche", "Rituale und Routineabläufe garantieren"]
    },
    "V-9": {
        zielformulierung: "In der Pause benutze ich den Fußball auf dem Fußballfeld.",
        interventionen: ["Klare Spielregeln definieren", "Spiegeln bei angepasstem Verhalten", "Kontrolle des Materials durch den Erwachsenen"]
    },
    "V-10": {
        zielformulierung: "Ich warte bis der/die LehrerIn mich mit meinem Namen ruft.",
        interventionen: ["Wartezeit konkretisieren mit Time Timer oder Sanduhr", "Physische Nähe bieten", "Vorhersehbare Routine einführen"]
    },
    "V-11": {
        zielformulierung: "Ich bleibe während der Matheaufgabe sitzen.",
        interventionen: ["Zeitliche Struktur mit Time Timer festsetzen", "Interessante Aktivitäten anbieten", "Bewegungspausen einplanen"]
    },
    "V-12": {
        zielformulierung: "Ich beteilige mich während des Sportunterrichts.",
        interventionen: ["Wiederkehrenden Ablauf etablieren", "Piktogramme zur Visualisierung", "Ansprechende Bewegungspausen anbieten"]
    },
    "V-13": {
        zielformulierung: "Ich setze mich in den Morgenkreis, wenn der Tag beginnt.",
        interventionen: ["Zieleinführung und Aktivierung des Ziels", "Tagesablauf strukturieren", "Interessen des Kindes berücksichtigen"]
    },
    "V-14": {
        zielformulierung: "Ich nehme Lob von anderen an und behalte die Kontrolle.",
        interventionen: ["Selbstwertgefühl stärken", "Spezifische Lobsituationen initiieren (Rollenspiele)", "Ritual 'Siegerfaust' initiieren"]
    },
    "V-15": {
        zielformulierung: "Wenn ich eine Aufgabe verstanden habe, löse ich sie alleine.",
        interventionen: ["Zeit ankündigen mit Time Timer", "Strukturierung der Aufgaben anpassen", "Kleine Erfolgserlebnisse sichern"]
    },
    "V-16": {
        zielformulierung: "Wenn mich jemand fragt, sage ich, was unsere Ziele in der Klasse sind.",
        interventionen: ["Visualisieren der Ziele", "Ziele zu fest gelegten Zeiten aktivieren und einüben", "Klare Erklärungen geben"]
    },
    "V-17": {
        zielformulierung: "Wenn ich gefragt werde, kann ich sagen warum ein bestimmtes Verhalten erwartet wird.",
        interventionen: ["Im Klassenrat Verhalten und Folgen reflektieren", "Regelnotwendigkeit an Situationen erarbeiten", "Kognitive Rückschau durchführen"]
    },
    "V-18": {
        zielformulierung: "Ich sage wie ich mich anders und angemessen verhalten könnte.",
        interventionen: ["Konfliktgespräche initiieren", "Alternative Verhaltensweisen erarbeiten", "Rollenspiele zu sozialen Situationen"]
    },
    // KOMMUNIKATION
    "K-1": {
        zielformulierung: "Ich produziere verschiedene Laute um mich auszudrücken.",
        interventionen: ["Logopädische Unterstützung einschalten", "Lautmuster wiederholen und bestärken", "Musikalische Aktivitäten anbieten"]
    },
    "K-2": {
        zielformulierung: "Ich schaue die Person an, die spricht.",
        interventionen: ["Blickkontakt herstellen", "Interessante Stimme und Gestik einsetzen", "Kurze und klare Kommunikation"]
    },
    "K-4": {
        zielformulierung: "Wenn ich etwas gefragt werde, antworte ich.",
        interventionen: ["Einfache Sprache verwenden", "Unterstützende Umgebung schaffen", "Fragen in Spiele integrieren"]
    },
    "K-5": {
        zielformulierung: "Wenn der/die LehrerIn mir etwas zeigt und fragt was es ist, antworte ich.",
        interventionen: ["Lernen am Modell", "Offene Fragen stellen", "Vokabular spielerisch erweitern"]
    },
    "K-6": {
        zielformulierung: "Ich spreche mit dem/der LehrerIn, wenn ich etwas möchte.",
        interventionen: ["Piktogramme benutzen", "Relevante Situationen schaffen", "Objekte benennen zur Vokabelerarbeitung"]
    },
    "K-7": {
        zielformulierung: "Ich spreche mit dem anderen Kind, wenn ich etwas möchte.",
        interventionen: ["Rollenspiel mit minimalem Vokabular", "Einfache Kooperationsspiele anbieten", "Visualisierung des Zieles durch Piktogramm"]
    },
    "K-8": {
        zielformulierung: "Wenn ich etwas sagen will, mache ich einen ganzen Satz.",
        interventionen: ["Wiederholung des ganzen Satzes", "Spielerisches Erlernen vom Satzbau", "Positive Verstärkung durch Spiegeln"]
    },
    "K-9": {
        zielformulierung: "Ich antworte auf die Frage, die mir gestellt wird, so dass jeder meine Antwort verstehen kann.",
        interventionen: ["Adaptierte Fragen gezielt stellen", "Kooperationsspiele anbieten", "Kleingruppenarbeit ermöglichen"]
    },
    "K-11": {
        zielformulierung: "Ich spreche freundlich, wenn ich etwas haben möchte.",
        interventionen: ["Einüben von freundlichem Sprechen (Rollenspiel)", "Giraffensprache einführen", "Adäquate Kontaktaufnahme einüben"]
    },
    "K-15": {
        zielformulierung: "Ich erzähle von Dingen, die ich erlebt habe.",
        interventionen: ["Morgenkreis und Erzählkreis nutzen", "Klassenrat für Austausch", "Gruppenaktivitäten die Austausch erfordern"]
    },
    "K-16": {
        zielformulierung: "Wenn ich wütend bin, sage ich, was mich stört, ohne jemanden zu verletzen.",
        interventionen: ["Gefühlsbarometer einführen", "Methoden zum Gefühle-Mitteilen erlernen", "Material zur Stressbewältigung anbieten"]
    },
    "K-17": {
        zielformulierung: "Bei Besprechungen in der Gruppe sage ich ruhig und freundlich meine Meinung.",
        interventionen: ["Verhaltensanforderungen klar formulieren", "Klassenrat nutzen", "Gesprächsregeln visualisieren"]
    },
    // SOZIALISATION
    "SOZ-1": {
        zielformulierung: "Ich nehme wahr, wenn andere Kinder in meiner Nähe sind.",
        interventionen: ["Gemeinsame Aktivitäten in Kleingruppen", "Physische Nähe zu anderen ermöglichen", "Parallelspiel fördern"]
    },
    "SOZ-4": {
        zielformulierung: "Ich beschäftige mich selbstständig mit Spielmaterialien.",
        interventionen: ["Strukturierte Spielzeit anbieten", "Interessantes Material bereitstellen", "Sichere Spielumgebung schaffen"]
    },
    "SOZ-10": {
        zielformulierung: "Ich spiele neben anderen Kindern.",
        interventionen: ["Parallelspiel-Situationen schaffen", "Gemeinsame Spielbereiche einrichten", "Positives Verhalten spiegeln"]
    },
    "SOZ-14": {
        zielformulierung: "Ich warte ohne körperliche Steuerungshilfe.",
        interventionen: ["Time Timer oder Sanduhr verwenden", "Physische Nähe bieten", "Konkrete Verhaltensanweisungen geben"]
    },
    "SOZ-15": {
        zielformulierung: "Ich zeige Ansätze, Kontakt zu einem anderen Kind aufzunehmen.",
        interventionen: ["Kooperative Spiele initiieren", "Soziale Skripts üben", "Positive Interaktionen verstärken"]
    },
    "SOZ-17": {
        zielformulierung: "Ich beteilige mich erfolgreich an interaktivem Spiel mit einem anderen Kind.",
        interventionen: ["Strukturierte Spielsituationen schaffen", "Spielregeln klar kommunizieren", "Erwachsene als Spielbegleiter einsetzen"]
    },
    "SOZ-19": {
        zielformulierung: "Ich teile von mir aus Materialien und wechsle mich mit anderen ab.",
        interventionen: ["Teilen explizit üben", "Positive Verstärkung beim Teilen", "Abwechseln in Spielen thematisieren"]
    },
    "SOZ-25": {
        zielformulierung: "Ich zeige beginnende Freundschaft durch Vorliebe für ein bestimmtes Kind.",
        interventionen: ["Gemeinsame Aktivitäten mit bevorzugtem Kind", "Freundschaftliche Interaktionen fördern", "Über Freundschaft sprechen"]
    },
    // KOGNITION
    "KOG-1": {
        zielformulierung: "Ich reagiere auf Reize mit Zuwendung zur Reizquelle.",
        interventionen: ["Sensorische Aktivitäten anbieten", "Visuelle und auditive Reize einsetzen", "Aufmerksamkeit gezielt lenken"]
    },
    "KOG-3": {
        zielformulierung: "Ich erkenne Personen oder Objekte wieder.",
        interventionen: ["Memory-Spiele einsetzen", "Bekannte Objekte benennen", "Wiedererkennungsspiele spielen"]
    },
    "KOG-10": {
        zielformulierung: "Ich passe ein Objekt in eine passende Lücke ein.",
        interventionen: ["Form-Sortierspiele anbieten", "Puzzles in steigender Schwierigkeit", "Hands-on Materialien verwenden"]
    },
    "KOG-15": {
        zielformulierung: "Ich erkenne den Gebrauchswert vertrauter Gegenstände.",
        interventionen: ["Alltagsgegenstände erkunden", "Funktionen spielerisch erarbeiten", "So-tun-als-ob-Spiele"]
    },
    "KOG-22": {
        zielformulierung: "Ich zähle bis 4 und wende dabei 1-zu-1 Zuordnung an.",
        interventionen: ["Zählspiele mit konkretem Material", "Mengen visuell darstellen", "Alltägliche Zählsituationen nutzen"]
    },
    "KOG-34": {
        zielformulierung: "Ich lese 50 Wörter des Grundwortschatzes.",
        interventionen: ["Tägliche Leseübungen", "Wort-Bild-Zuordnungen", "Lesespiele und -apps einsetzen"]
    }
};

// Fallback für Items ohne spezifische Intervention
function getInterventionData(itemId) {
    if (INTERVENTIONS_DATA[itemId]) {
        return INTERVENTIONS_DATA[itemId];
    }
    // Generische Intervention basierend auf Bereich
    const prefix = itemId.split('-')[0];
    const genericInterventions = {
        'V': {
            zielformulierung: "Ich zeige das erwartete Verhalten in der beschriebenen Situation.",
            interventionen: ["Verhaltensanforderung klar benennen und aktivieren", "Positives Verhalten spiegeln", "Strukturierte Übungssituationen schaffen"]
        },
        'K': {
            zielformulierung: "Ich drücke mich angemessen aus.",
            interventionen: ["Sprachliche Modelle anbieten", "Kommunikationssituationen schaffen", "Positive Verstärkung bei Kommunikation"]
        },
        'SOZ': {
            zielformulierung: "Ich verhalte mich sozial angemessen in der Gruppe.",
            interventionen: ["Soziale Situationen üben", "Kooperative Spiele anbieten", "Positive Interaktionen verstärken"]
        },
        'KOG': {
            zielformulierung: "Ich bewältige die kognitive Anforderung.",
            interventionen: ["Aufgaben in kleine Schritte unterteilen", "Konkretes Material verwenden", "Wiederholung und Übung sicherstellen"]
        }
    };
    return genericInterventions[prefix] || genericInterventions['V'];
}
