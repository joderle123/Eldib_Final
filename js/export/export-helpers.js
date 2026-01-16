// Export Helper Functions for DS Export
// Helper functions used by the DS export


// Hilfsfunktion: Stufe aus Alter ermitteln
function getStageForAge(age) {
    if (age <= 2) return 1;
    if (age <= 5) return 2;
    if (age <= 9) return 3;
    if (age <= 12) return 4;
    return 5;
}

// Hilfsfunktion: Stufe als römische Zahl
function getStageRoman(stage) {
    var romans = {1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V'};
    return romans[stage] || stage;
}

// Hilfsfunktion: Stufenbeschreibung
function getStageDescription(stage) {
    var descriptions = {
        1: '0-2 Jahre',
        2: '3-5 Jahre',
        3: '6-9 Jahre',
        4: '10-12 Jahre',
        5: '13-17 Jahre'
    };
    return descriptions[stage] || '';
}

// Hilfsfunktion: Richtziel für Stufe
function getStageRichtziel(stage) {
    var richtziele = {
        1: 'Auf die Umwelt mit Freude reagieren',
        2: 'Auf die Umwelt mit Erfolg reagieren',
        3: 'Fähigkeiten zur erfolgreichen Gruppenteilnahme erwerben',
        4: 'Sich in Gruppenprozesse einbringen',
        5: 'Individuelle/gruppenbezogene Fähigkeiten in neuen Situationen anwenden'
    };
    return richtziele[stage] || '';
}

// Hilfsfunktion: Bereichsname
function getDomainName(domain) {
    var names = {
        verhalten: 'Verhalten (V)',
        kommunikation: 'Kommunikation (K)',
        sozialisation: 'Sozialisation (SOZ)',
        kognition: 'Kognition (KOG)'
    };
    return names[domain] || domain;
}

// Hilfsfunktion: Bereichscode
function getDomainCode(domain) {
    var codes = {
        verhalten: 'V',
        kommunikation: 'K',
        sozialisation: 'SOZ',
        kognition: 'KOG'
    };
    return codes[domain] || domain;
}

// Hilfsfunktion: Sortierte Bereiche nach Entwicklungsalter
function getSortedDomainsByAge(devAges) {
    var domains = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];
    return domains
        .filter(function(d) { return devAges[d] && devAges[d] > 0; })
        .sort(function(a, b) { return (devAges[b] || 0) - (devAges[a] || 0); });
}

// Hilfsfunktion: Ziele für einen Bereich sammeln
function getGoalsForDomain(domain) {
    var goals = [];
    if (!ELDIB_DATA[domain]) return goals;
    ELDIB_DATA[domain].stufen.forEach(function(stufe) {
        stufe.items.forEach(function(item) {
            var status = assessments[domain][item.id];
            if (status && status.ziel) {
                goals.push({
                    id: item.id,
                    nummer: item.id.split('-')[1],
                    text: item.text,
                    stufe: stufe.nummer
                });
            }
        });
    });
    return goals;
}

// Hilfsfunktion: Erreichte Items für einen Bereich
function getReachedItemsForDomain(domain) {
    var reached = [];
    if (!ELDIB_DATA[domain]) return reached;
    ELDIB_DATA[domain].stufen.forEach(function(stufe) {
        stufe.items.forEach(function(item) {
            var status = assessments[domain][item.id];
            if (status && status.erreicht) {
                reached.push({
                    id: item.id,
                    nummer: item.id.split('-')[1],
                    text: item.text,
                    stufe: stufe.nummer
                });
            }
        });
    });
    return reached;
}

// Generiert den 4.2 Abschnitt automatisch aus ELDiB-Daten
function generate42Section(student, devAges) {
    var sortedDomains = getSortedDomainsByAge(devAges);
    if (sortedDomains.length === 0) {
        return '<p class="placeholder-text">(Keine ELDiB-Daten vorhanden)</p>';
    }

    var html = '';
    var studentName = student.name || '(Name des/der Schülers/Schülerin)';

    // ELDiB Einleitung
    html += '<p><strong>ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen):</strong> ';
    html += 'Der ELDiB ist ein standardisiertes Einschätzungsinstrument, das dazu dient, die soziale und emotionale ';
    html += 'Entwicklung von Kindern und Jugendlichen im Alter zwischen Geburt und sechzehn Jahren zu erfassen. ';
    html += 'Er stellt ein Profil von spezifischen Fähigkeiten zur Verfügung, die als Indikatoren der sozialen und emotionalen Förderung dienen.</p>';

    // Höchster Bereich
    var highestDomain = sortedDomains[0];
    var highestAge = devAges[highestDomain];
    var highestStage = getStageForAge(highestAge);
    var highestGoals = getGoalsForDomain(highestDomain);

    html += '<p><strong>Der am weitesten entwickelte Bereich</strong> bei ' + studentName + ', ist der ';
    html += '<strong>' + getDomainName(highestDomain) + '</strong>, hier befindet sich der/die Schüler:in auf ';
    html += '<strong>Entwicklungsstufe ' + getStageRoman(highestStage) + ' (' + getStageDescription(highestStage) + ')</strong> ';
    html += 'mit einem Entwicklungsalter von <strong>' + highestAge.toFixed(1) + ' Jahren</strong>. ';
    html += '<span class="placeholder-text">Er/Sie zeigt bereits gute ... . Dies wird beispielsweise deutlich durch ... . ';
    html += 'Allerdings gelingt es ihm/ihr noch nicht immer, ... (anhand von 1-2 Beispielen darstellen).</span></p>';

    html += '<p>Ausgehend vom Richtziel <em>„' + getStageRichtziel(highestStage) + '"</em> (siehe ELDiB Booklet), ergaben sich folgende Lernziele:</p>';
    if (highestGoals.length > 0) {
        html += '<ul style="margin: 6pt 0 12pt 24pt;">';
        highestGoals.slice(0, 3).forEach(function(goal) {
            html += '<li>' + getDomainCode(highestDomain) + ' ' + goal.nummer + ' – ' + goal.text + '</li>';
        });
        html += '</ul>';
    } else {
        html += '<ul style="margin: 6pt 0 12pt 24pt;"><li>' + getDomainCode(highestDomain) + ' <span class="placeholder-text">… – … (siehe ELDiB Booklet)</span></li></ul>';
    }

    // Mittlere Bereiche
    for (var i = 1; i < sortedDomains.length - 1; i++) {
        var domain = sortedDomains[i];
        var age = devAges[domain];
        var stage = getStageForAge(age);
        var goals = getGoalsForDomain(domain);

        html += '<p><strong>Im Bereich ' + getDomainName(domain) + '</strong> befindet sich der/die Schüler:in auf der ';
        html += '<strong>Entwicklungsstufe ' + getStageRoman(stage) + ' (' + getStageDescription(stage) + ')</strong> ';
        html += 'mit einem Entwicklungsalter von <strong>' + age.toFixed(1) + ' Jahren</strong>. ';
        html += '<span class="placeholder-text">Er/Sie zeigt bereits gute ... . Dies wird beispielsweise deutlich durch ... . ';
        html += 'Allerdings gelingt es ihm/ihr noch nicht immer, ... (anhand von 1-2 Beispielen darstellen).</span></p>';

        html += '<p>Ausgehend vom Richtziel <em>„' + getStageRichtziel(stage) + '"</em> (siehe ELDiB Booklet), ergaben sich folgende Lernziele:</p>';
        if (goals.length > 0) {
            html += '<ul style="margin: 6pt 0 12pt 24pt;">';
            goals.slice(0, 3).forEach(function(goal) {
                html += '<li>' + getDomainCode(domain) + ' ' + goal.nummer + ' – ' + goal.text + '</li>';
            });
            html += '</ul>';
        } else {
            html += '<ul style="margin: 6pt 0 12pt 24pt;"><li>' + getDomainCode(domain) + ' <span class="placeholder-text">… – … (siehe ELDiB Booklet)</span></li></ul>';
        }
    }

    // Niedrigster Bereich (falls mehr als ein Bereich)
    if (sortedDomains.length > 1) {
        var lowestDomain = sortedDomains[sortedDomains.length - 1];
        var lowestAge = devAges[lowestDomain];
        var lowestStage = getStageForAge(lowestAge);
        var lowestGoals = getGoalsForDomain(lowestDomain);

        html += '<p><strong>Der am niedrigsten entwickelte Bereich</strong> bei ' + studentName + ', ist der ';
        html += '<strong>' + getDomainName(lowestDomain) + '</strong>, hier befindet sich der/die Schüler:in auf der ';
        html += '<strong>Entwicklungsstufe ' + getStageRoman(lowestStage) + ' (' + getStageDescription(lowestStage) + ')</strong> ';
        html += 'mit einem Entwicklungsalter von <strong>' + lowestAge.toFixed(1) + ' Jahren</strong>. ';
        html += '<span class="placeholder-text">Er/Sie zeigt bereits gute ... . Dies wird beispielsweise deutlich durch ... . ';
        html += 'Allerdings gelingt es ihm/ihr noch nicht immer, ... (anhand von 1-2 Beispielen darstellen).</span></p>';

        html += '<p>Ausgehend vom Richtziel <em>„' + getStageRichtziel(lowestStage) + '"</em> (siehe ELDiB Booklet), ergaben sich folgende Lernziele:</p>';
        if (lowestGoals.length > 0) {
            html += '<ul style="margin: 6pt 0 12pt 24pt;">';
            lowestGoals.slice(0, 3).forEach(function(goal) {
                html += '<li>' + getDomainCode(lowestDomain) + ' ' + goal.nummer + ' – ' + goal.text + '</li>';
            });
            html += '</ul>';
        } else {
            html += '<ul style="margin: 6pt 0 12pt 24pt;"><li>' + getDomainCode(lowestDomain) + ' <span class="placeholder-text">… – … (siehe ELDiB Booklet)</span></li></ul>';
        }
    }

    return html;
}

// Hilfsfunktion: Altersbalken HTML generieren
function generateAgeBarHTML(label, age, cssClass, maxAge) {
    var width = age > 0 ? Math.min((age / maxAge) * 100, 100) : 0;
    var displayAge = age > 0 ? age.toFixed(1) + ' Jahre' : '-';
    return '<div class="age-bar-row">' +
        '<span class="age-bar-label">' + label + ':</span>' +
        '<span class="age-bar-container"><div class="age-bar-wrapper"><span class="age-bar ' + cssClass + '" style="width:' + width + '%;"></span></div></span>' +
        '<span class="age-value">' + displayAge + '</span>' +
        '</div>';
}

// Hilfsfunktion fuer DS Grid HTML - Kompaktes Format für DIN A4
function generateDSGridHTML(gridData) {
    var statusLookup = {};
    Object.keys(gridData).forEach(function(domain) {
        statusLookup[domain] = {};
        gridData[domain].forEach(function(item) {
            statusLookup[domain][item.nummer] = item.status;
        });
    });

    // Kompakte Tabelle - 5 Spalten nebeneinander pro Zeile für jede Stufe
    var html = '<table style="width:100%; border-collapse:collapse; font-size:7pt; margin:8pt 0;">';

    // Header
    html += '<tr>';
    html += '<td style="border:1px solid #000; background:#4472C4; color:white; font-weight:bold; text-align:center; padding:3pt; width:6%;">V</td>';
    html += '<td style="border:1px solid #000; background:#4472C4; color:white; font-weight:bold; text-align:center; padding:3pt; width:6%;">KOMM</td>';
    html += '<td style="border:1px solid #000; background:#4472C4; color:white; font-weight:bold; text-align:center; padding:3pt; width:6%;">SOZ</td>';
    html += '<td style="border:1px solid #000; background:#4472C4; color:white; font-weight:bold; text-align:center; padding:3pt; width:6%;">KOG</td>';
    html += '<td style="border:1px solid #000; background:#D9E2F3; font-weight:bold; text-align:left; padding:3pt;">Stufe</td>';
    html += '</tr>';

    // Stufendefinitionen mit Item-Bereichen
    var stufen = [
        { nr: 5, label: 'Stufe 5: 13-17 J.', v: [29,33], k: [30,35], s: [35,41], kog: [57,62] },
        { nr: 4, label: 'Stufe 4: 10-12 J.', v: [23,28], k: [23,29], s: [28,34], kog: [50,56] },
        { nr: 3, label: 'Stufe 3: 6-9 J.', v: [15,22], k: [14,22], s: [18,27], kog: [37,49] },
        { nr: 2, label: 'Stufe 2: 3-5 J.', v: [8,14], k: [7,13], s: [9,17], kog: [20,36] },
        { nr: 1, label: 'Stufe 1: 0-2 J.', v: [1,7], k: [1,6], s: [1,8], kog: [1,19] }
    ];

    stufen.forEach(function(stufe) {
        // Mehrere Zeilen pro Stufe - komprimiert
        var maxRows = Math.max(
            stufe.v[1] - stufe.v[0] + 1,
            stufe.k[1] - stufe.k[0] + 1,
            stufe.s[1] - stufe.s[0] + 1,
            stufe.kog[1] - stufe.kog[0] + 1
        );

        for (var i = 0; i < maxRows; i++) {
            html += '<tr style="height:12pt;">';

            // V
            var vNum = stufe.v[1] - i;
            if (vNum >= stufe.v[0]) {
                var vStatus = statusLookup.verhalten ? (statusLookup.verhalten[vNum] || '') : '';
                var vBg = vStatus === 'erreicht' ? '#70AD47' : (vStatus === 'ziel' ? '#FFC000' : '#fff');
                var vCol = vStatus === 'erreicht' ? '#fff' : '#000';
                html += '<td style="border:1px solid #000; text-align:center; background:' + vBg + '; color:' + vCol + ';">' + vNum + '</td>';
            } else {
                html += '<td style="border:1px solid #000; background:#E7E6E6;"></td>';
            }

            // KOMM
            var kNum = stufe.k[1] - i;
            if (kNum >= stufe.k[0]) {
                var kStatus = statusLookup.kommunikation ? (statusLookup.kommunikation[kNum] || '') : '';
                var kBg = kStatus === 'erreicht' ? '#70AD47' : (kStatus === 'ziel' ? '#FFC000' : '#fff');
                var kCol = kStatus === 'erreicht' ? '#fff' : '#000';
                html += '<td style="border:1px solid #000; text-align:center; background:' + kBg + '; color:' + kCol + ';">' + kNum + '</td>';
            } else {
                html += '<td style="border:1px solid #000; background:#E7E6E6;"></td>';
            }

            // SOZ
            var sNum = stufe.s[1] - i;
            if (sNum >= stufe.s[0]) {
                var sStatus = statusLookup.sozialisation ? (statusLookup.sozialisation[sNum] || '') : '';
                var sBg = sStatus === 'erreicht' ? '#70AD47' : (sStatus === 'ziel' ? '#FFC000' : '#fff');
                var sCol = sStatus === 'erreicht' ? '#fff' : '#000';
                html += '<td style="border:1px solid #000; text-align:center; background:' + sBg + '; color:' + sCol + ';">' + sNum + '</td>';
            } else {
                html += '<td style="border:1px solid #000; background:#E7E6E6;"></td>';
            }

            // KOG
            var kogNum = stufe.kog[1] - i;
            if (kogNum >= stufe.kog[0]) {
                var kogStatus = statusLookup.kognition ? (statusLookup.kognition[kogNum] || '') : '';
                var kogBg = kogStatus === 'erreicht' ? '#70AD47' : (kogStatus === 'ziel' ? '#FFC000' : '#fff');
                var kogCol = kogStatus === 'erreicht' ? '#fff' : '#000';
                html += '<td style="border:1px solid #000; text-align:center; background:' + kogBg + '; color:' + kogCol + ';">' + kogNum + '</td>';
            } else {
                html += '<td style="border:1px solid #000; background:#E7E6E6;"></td>';
            }

            // Stufe Label nur in erster Zeile
            if (i === 0) {
                html += '<td style="border:1px solid #000; background:#D9E2F3; font-weight:bold; padding:2pt 4pt;" rowspan="' + maxRows + '">' + stufe.label + '</td>';
            }

            html += '</tr>';
        }
    });

    html += '</table>';
    return html;
}

function generateELDiBGrid() {
    const grid = {
        verhalten: [],
        kommunikation: [],
        sozialisation: [],
        kognition: []
    };

    // Map items to their status
    Object.keys(ELDIB_DATA).forEach(domain => {
        ELDIB_DATA[domain].stufen.forEach(stufe => {
            stufe.items.forEach(item => {
                const status = assessments[domain][item.id];
                let statusClass = 'nicht-erreicht';
                if (status?.erreicht) statusClass = 'erreicht';
                else if (status?.ziel) statusClass = 'ziel';

                grid[domain].push({
                    id: item.id,
                    nummer: parseInt(item.id.split('-')[1]),
                    stufe: stufe.nummer,
                    status: statusClass
                });
            });
        });
    });

    return grid;
}

function generateELDiBGridHTML(gridData) {
    // Define the grid structure based on PEI document
    // COMP: 1-33, COMM: 1-35, SOC: 1-41, COG: 1-62
    const maxItems = { verhalten: 33, kommunikation: 35, sozialisation: 41, kognition: 62 };
    const stufeRanges = {
        1: { min: 0, max: 2, label: 'NIVEAU I (0-2 J.)' },
        2: { min: 2, max: 5, label: 'NIVEAU II (2-5 J.)' },
        3: { min: 6, max: 9, label: 'NIVEAU III (6-9 J.)' },
        4: { min: 10, max: 12, label: 'NIVEAU IV (10-12 J.)' },
        5: { min: 13, max: 16, label: 'NIVEAU V (13-16 J.)' }
    };

    // Create lookup for status
    const statusLookup = {};
    Object.keys(gridData).forEach(domain => {
        statusLookup[domain] = {};
        gridData[domain].forEach(item => {
            statusLookup[domain][item.nummer] = item.status;
        });
    });

    // Build the grid HTML (similar to the PEI document format)
    let html = `<table class="eldib-grid">
        <thead>
            <tr>
                <th>COMP</th>
                <th>COMM</th>
                <th>SOC</th>
                <th>COG</th>
                <th>Niveau</th>
            </tr>
        </thead>
        <tbody>`;

    // Build rows from highest item number down to 1
    const maxRow = 62; // Maximum items (Kognition has 62)

    for (let row = maxRow; row >= 1; row--) {
        // Determine which Niveau this row belongs to
        let niveau = '';
        if (row >= 57) niveau = 'V';
        else if (row >= 50 && row <= 56) niveau = 'IV';
        else if (row >= 37 && row <= 49) niveau = 'III';
        else if (row >= 20 && row <= 36) niveau = 'II';
        else if (row >= 1 && row <= 19) niveau = 'I';

        html += '<tr>';

        // COMP (Verhalten) - max 33
        if (row <= 33) {
            const status = statusLookup.verhalten[row] || 'nicht-erreicht';
            html += `<td class="${status}">${row}</td>`;
        } else {
            html += '<td class="empty"></td>';
        }

        // COMM (Kommunikation) - max 35
        if (row <= 35) {
            const status = statusLookup.kommunikation[row] || 'nicht-erreicht';
            html += `<td class="${status}">${row}</td>`;
        } else {
            html += '<td class="empty"></td>';
        }

        // SOC (Sozialisation) - max 41
        if (row <= 41) {
            const status = statusLookup.sozialisation[row] || 'nicht-erreicht';
            html += `<td class="${status}">${row}</td>`;
        } else {
            html += '<td class="empty"></td>';
        }

        // COG (Kognition) - max 62
        if (row <= 62) {
            const status = statusLookup.kognition[row] || 'nicht-erreicht';
            html += `<td class="${status}">${row}</td>`;
        } else {
            html += '<td class="empty"></td>';
        }

        // Niveau column
        html += `<td class="niveau-header">${niveau}</td>`;
        html += '</tr>';
    }

    html += '</tbody></table>';
    return html;
}

function generateDomainStatement(domain, domainName, bioAge, devAge, gap, stage, angst, domainStageData) {
    if (gap === null || !bioAge || !devAge) {
        return `Keine vollständige Einschätzung im Bereich ${domainName} möglich.`;
    }

    // Globale Implikationen: Was bedeutet dieser Entwicklungsstand konkret?
    const implications = {
        verhalten: {
            1: {
                alltag: "Das Kind braucht ständige Begleitung und reagiert impulsiv auf Reize. Übergänge und Veränderungen lösen starke Reaktionen aus.",
                schwierigkeit: "Selbstständige Teilnahme an Gruppenaktivitäten ist nicht möglich. Jeder Handlungsschritt braucht direkte Anleitung.",
                peers: "Während Gleichaltrige selbstständig Routinen folgen, benötigt dieses Kind 1:1-Begleitung wie ein Kleinkind."
            },
            2: {
                alltag: "Das Kind kann kurz warten und an Aktivitäten teilnehmen, verliert aber bei Frustration schnell die Kontrolle.",
                schwierigkeit: "Gruppensituationen ohne enge Begleitung führen zu Konflikten. Regeln werden noch nicht als sinnvoll verstanden.",
                peers: "Gleichaltrige zeigen bereits Frustrationstoleranz - dieses Kind reagiert auf Enttäuschungen noch wie ein Kleinkind."
            },
            3: {
                alltag: "Das Kind kennt Regeln und verhält sich in strukturierten Situationen angemessen, braucht aber Erinnerungen und Unterstützung.",
                schwierigkeit: "Bei unerwarteten Situationen oder wenn andere die Kontrolle verlieren, destabilisiert sich das Kind.",
                peers: "Im Vergleich zu Gleichaltrigen fehlt die Fähigkeit, Verhalten flexibel an neue Situationen anzupassen."
            },
            4: {
                alltag: "Das Kind kann sein Verhalten reflektieren und Alternativen benennen, setzt diese unter Stress aber nicht immer um.",
                schwierigkeit: "Eigenverantwortung und Selbststeuerung in komplexen Situationen fallen noch schwer.",
                peers: "Gleichaltrige übernehmen bereits Verantwortung für Gruppenentscheidungen."
            },
            5: {
                alltag: "Das Kind zeigt reife Verhaltenssteuerung und reagiert auch in neuen Situationen angemessen.",
                schwierigkeit: "Unter extremem Druck können frühere Muster auftreten.",
                peers: "Das Verhalten entspricht dem der Gleichaltrigen."
            }
        },
        kommunikation: {
            1: {
                alltag: "Kommunikation erfolgt hauptsächlich nonverbal oder mit einzelnen Wörtern. Bedürfnisse werden durch Verhalten ausgedrückt.",
                schwierigkeit: "Frustration durch mangelnde Ausdrucksmöglichkeit führt zu Verhaltensauffälligkeiten. Anweisungen werden oft nicht verstanden.",
                peers: "Während Gleichaltrige komplexe Gespräche führen, kommuniziert dieses Kind auf Kleinkind-Niveau."
            },
            2: {
                alltag: "Einfache Sätze werden verwendet, komplexe Gedanken können aber nicht verbalisiert werden.",
                schwierigkeit: "Missverständnisse sind häufig. Konflikte können nicht verbal gelöst werden - das Kind greift auf Handlungen zurück.",
                peers: "Gleichaltrige diskutieren und argumentieren - dieses Kind kann nur einfache Aussagen machen."
            },
            3: {
                alltag: "Das Kind berichtet über Erlebnisse und benennt Gefühle, hat aber Schwierigkeiten mit abstrakten Themen.",
                schwierigkeit: "Schulische Anforderungen an Leseverständnis und Ausdruck überfordern das Kind oft.",
                peers: "Gespräche mit Gleichaltrigen scheitern manchmal am unterschiedlichen Sprachniveau."
            },
            4: {
                alltag: "Gefühle werden reflektiert und Beziehungen sprachlich gestaltet, komplexe Themen brauchen Unterstützung.",
                schwierigkeit: "Abstrakte Unterrichtsinhalte und differenzierte Diskussionen sind herausfordernd.",
                peers: "Kommunikation gelingt, tiefere Gespräche über Werte oder Zukunft fallen schwer."
            },
            5: {
                alltag: "Differenzierte Kommunikation und sprachliche Beziehungspflege sind möglich.",
                schwierigkeit: "Sehr abstrakte oder emotionale Themen können gelegentlich schwierig sein.",
                peers: "Kommunikationsfähigkeit entspricht der Altersgruppe."
            }
        },
        sozialisation: {
            1: {
                alltag: "Das Kind spielt allein oder parallel, zeigt wenig Interesse an Peers. Bindung zu Erwachsenen steht im Vordergrund.",
                schwierigkeit: "Gruppenaktivitäten sind kaum möglich. Das Kind sucht ständig die Nähe vertrauter Erwachsener.",
                peers: "Gleichaltrige bilden Freundschaften und spielen kooperativ - dieses Kind ist noch im Parallelspiel."
            },
            2: {
                alltag: "Kurzes gemeinsames Spiel ist möglich, Teilen und Abwechseln führen aber oft zu Konflikten.",
                schwierigkeit: "Stabile Freundschaften entstehen nicht. Das Kind wird oft ausgeschlossen wegen unreifen Sozialverhaltens.",
                peers: "Während Gleichaltrige feste Freundschaften haben, wechselt dieses Kind häufig Spielpartner."
            },
            3: {
                alltag: "Beginnende Freundschaften und Befolgen von Gruppenregeln, aber Konflikte brauchen Unterstützung.",
                schwierigkeit: "Komplexe soziale Dynamiken wie Cliquen oder subtile Ausgrenzung werden nicht verstanden.",
                peers: "Gleichaltrige navigieren komplexe Situationen - dieses Kind versteht nur einfache Gruppenstrukturen."
            },
            4: {
                alltag: "Aktive Beteiligung in Gruppen und Berücksichtigung verschiedener Perspektiven.",
                schwierigkeit: "Tiefere Freundschaften mit gegenseitiger Unterstützung entwickeln sich noch.",
                peers: "Soziale Fähigkeiten nähern sich dem Niveau Gleichaltriger an."
            },
            5: {
                alltag: "Tragfähige Beziehungen und echte Empathie sind vorhanden.",
                schwierigkeit: "Komplexe Situationen wie romantische Beziehungen können herausfordernd sein.",
                peers: "Soziale Kompetenz entspricht der Altersgruppe."
            }
        },
        kognition: {
            1: {
                alltag: "Lernen erfolgt durch Sinneserfahrung und Wiederholung. Abstraktes Denken ist nicht möglich.",
                schwierigkeit: "Schulische Anforderungen können nicht erfüllt werden. Jeder Lernschritt braucht konkretes Material.",
                peers: "Gleichaltrige arbeiten mit Texten und Zahlen - dieses Kind braucht Bildmaterial und Handlungsorientierung."
            },
            2: {
                alltag: "Sortieren, Zählen und einfache Muster werden erkannt, Lesen und Schreiben sind noch nicht möglich.",
                schwierigkeit: "Der Regellehrplan ist nicht zugänglich. Adaptiertes Material auf Vorschulniveau wird benötigt.",
                peers: "Während Gleichaltrige lesen und rechnen, arbeitet dieses Kind mit Vorschulmaterial."
            },
            3: {
                alltag: "Grundlegende Kulturtechniken sind vorhanden, schulische Anforderungen entsprechen jüngerem Alter.",
                schwierigkeit: "Komplexere Aufgaben, Textaufgaben und abstraktes Denken überfordern.",
                peers: "Der Leistungsunterschied zu Gleichaltrigen wird in höheren Klassen deutlicher."
            },
            4: {
                alltag: "Wissen wird angewendet und einfache Probleme werden gelöst.",
                schwierigkeit: "Abstrakte Konzepte erfordern zusätzliche Erklärung.",
                peers: "Kognitive Fähigkeiten nähern sich dem Niveau Gleichaltriger an."
            },
            5: {
                alltag: "Differenziertes Denken und Problemanalyse sind möglich.",
                schwierigkeit: "Sehr komplexe Problemstellungen können Unterstützung erfordern.",
                peers: "Kognitive Kompetenz entspricht der Altersgruppe."
            }
        }
    };

    const impl = implications[domain]?.[stage] || implications.verhalten[1];
    const stufenLabel = STAGE_DATA[stage]?.label || "0-2 Jahre";

    // Altersgemäß
    if (gap <= 0) {
        return `<strong>${domainName} – Altersgemäß (Stufe ${stage}):</strong> ${impl.alltag} Diese Kompetenz ist eine wichtige Ressource.`;
    }

    // Mit Entwicklungsdifferenz
    return `<strong>${domainName} – Stufe ${stage} (${stufenLabel}) | ${gap.toFixed(1)} Jahre Differenz</strong><br>
<em>Entwicklungsthema: ${angst}</em><br><br>
<u>Alltag:</u> ${impl.alltag}<br>
<u>Schwierigkeit:</u> ${impl.schwierigkeit}<br>
<u>Vergleich Peers:</u> ${impl.peers}`;
}

function calculateDevelopmentalAge(highestStage, stageData, domain) {
    if (highestStage === 0) return { age: 0, stage: 0 };

    const stage = STAGE_DATA[highestStage];
    const sd = stageData[domain][highestStage];

    // Calculate weighted position within stage based on completion percentage
    const completionPercent = sd.erreicht / sd.total;
    const ageRange = stage.ageMax - stage.ageMin;
    const developmentalAge = stage.ageMin + (ageRange * completionPercent);

    return {
        age: Math.round(developmentalAge * 10) / 10,
        stage: highestStage,
        stageLabel: stage.label,
        angst: stage.angst,
        beschreibung: stage.beschreibung,
        completion: Math.round(completionPercent * 100)
    };
