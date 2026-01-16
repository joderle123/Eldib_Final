// DS Export - Spezialisierte Diagnostik Word Export
// Main export function for creating DS documents


function exportDS() {
    const student = getStudentData();
    const today = new Date().toLocaleDateString('de-DE');
    const biologicalAge = calculateAge(student.birthDate);
    const devAges = calculateAllDevelopmentalAges();
    const gridData = generateELDiBGrid();

    // Exaktes HTML für DS-Dokument nach CDSE Template
    let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spezialisierte Diagnostik - ${student.name || 'DS'}</title>
<style>
@page {
    size: A4;
    margin: 2cm 2.5cm 2cm 2.5cm;
}
body {
    font-family: Calibri, 'Segoe UI', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #000;
    margin: 0;
    padding: 0;
}
p { margin: 0 0 11pt 0; }

/* Header rechts ausgerichtet */
.header-right {
    text-align: right;
    font-size: 11pt;
    line-height: 1.5;
    margin-bottom: 24pt;
}

/* Titel zentriert */
.title-main {
    text-align: center;
    font-size: 16pt;
    font-weight: bold;
    margin: 0 0 6pt 0;
}
.title-sub {
    text-align: center;
    font-size: 14pt;
    font-weight: normal;
    margin: 0 0 24pt 0;
}

/* Info-Tabelle ohne Rahmen, nur vertikale Linie */
.info-table {
    width: 100%;
    border-collapse: collapse;
    margin: 24pt 0;
}
.info-table td {
    padding: 6pt 10pt;
    border: none;
    vertical-align: top;
    line-height: 1.5;
}
.info-table td:first-child {
    font-weight: bold;
    width: 180pt;
    border-right: 1pt solid #AEAAAA;
}
.info-table td:last-child {
    padding-left: 15pt;
}

/* Empfehlungen Box */
.empfehlungen-box {
    margin: 18pt 0;
    padding: 0;
}
.empfehlungen-header {
    font-weight: bold;
    padding: 6pt 0;
    border-bottom: 1pt solid #000;
    margin-bottom: 6pt;
}
.checkbox-row {
    padding: 4pt 0;
    line-height: 1.4;
}
.checkbox-indent {
    padding-left: 50pt;
    font-size: 10pt;
}

/* Überschriften */
.heading1 {
    font-size: 14pt;
    font-weight: bold;
    color: #2F5496;
    margin: 18pt 0 6pt 0;
    page-break-after: avoid;
}
.heading2 {
    font-size: 12pt;
    font-weight: bold;
    color: #2F5496;
    margin: 12pt 0 6pt 0;
    page-break-after: avoid;
}

/* Inhaltsverzeichnis */
.toc {
    margin: 12pt 0;
}
.toc-entry {
    margin: 3pt 0;
    line-height: 1.5;
}
.toc-indent {
    margin-left: 24pt;
}

/* Platzhalter Text */
.placeholder-text {
    color: #808080;
    font-style: italic;
}

/* Tabellen allgemein */
.data-table {
    width: 100%;
    border-collapse: collapse;
    margin: 12pt 0;
    font-size: 10pt;
}
.data-table th, .data-table td {
    border: 1pt solid #000;
    padding: 6pt 8pt;
    text-align: left;
    vertical-align: top;
}
.data-table th {
    background: #D9E2F3;
    font-weight: bold;
}

/* ELDiB Grid */
.eldib-grid {
    border-collapse: collapse;
    margin: 12pt auto;
    font-size: 7pt;
}
.eldib-grid td, .eldib-grid th {
    border: 0.5pt solid #000;
    width: 18pt;
    height: 14pt;
    text-align: center;
    padding: 1pt;
    vertical-align: middle;
}
.eldib-grid .header-cell {
    background: #4472C4;
    color: white;
    font-weight: bold;
    font-size: 8pt;
}
.eldib-grid .stufe-cell {
    background: #D9E2F3;
    font-weight: bold;
    font-size: 7pt;
    width: 100pt;
    text-align: left;
    padding-left: 4pt;
}
.erreicht { background: #70AD47 !important; color: white; }
.ziel { background: #FFC000 !important; color: #000; }
.empty-cell { background: #E7E6E6; }

/* Legende */
.legend {
    margin: 12pt 0;
    font-size: 9pt;
    text-align: center;
}
.legend-item {
    display: inline-block;
    margin: 0 12pt;
}
.legend-box {
    display: inline-block;
    width: 14pt;
    height: 10pt;
    border: 0.5pt solid #000;
    vertical-align: middle;
    margin-right: 4pt;
}

/* Altersbalken */
.age-comparison {
    margin: 18pt 0;
}
.age-comparison-title {
    font-weight: bold;
    margin-bottom: 12pt;
}
.age-bar-row {
    margin: 6pt 0;
    display: table;
    width: 100%;
}
.age-bar-label {
    display: table-cell;
    width: 160pt;
    font-size: 10pt;
    vertical-align: middle;
}
.age-bar-container {
    display: table-cell;
    width: 200pt;
    vertical-align: middle;
}
.age-bar-wrapper {
    width: 200pt;
    height: 16pt;
    background: #E7E6E6;
    border: 0.5pt solid #999;
}
.age-bar {
    height: 100%;
    display: block;
}
.age-bar.bio { background: #5B9BD5; }
.age-bar.verhalten { background: #ED7D31; }
.age-bar.kommunikation { background: #70AD47; }
.age-bar.sozialisation { background: #9E480E; }
.age-bar.kognition { background: #7030A0; }
.age-value {
    display: table-cell;
    width: 60pt;
    text-align: right;
    font-size: 10pt;
    vertical-align: middle;
    padding-left: 8pt;
}

/* Copyright */
.copyright {
    font-size: 7pt;
    text-align: center;
    margin-top: 12pt;
    color: #666;
}

/* Seitenumbruch */
.page-break { page-break-before: always; }

/* Unterschrift */
.signature-block {
    margin-top: 36pt;
}
.signature-line {
    border-bottom: 1pt solid #000;
    width: 200pt;
    margin-bottom: 6pt;
}
</style>
</head>
<body>

<!-- SEITE 1: Deckblatt -->
<div class="header-right">
<strong>Commission nationale d'inclusion</strong><br>
33, Rives de Clausen<br>
L-2165 Luxembourg
</div>

<p class="title-main">Spezialisierte Diagnostik</p>
<p class="title-sub">des Zentrums für sozio-emotionale Entwicklung (CDSE)</p>

<table class="info-table">
<tr><td>Name des/der Schüler.in</td><td>${student.name || ''}</td></tr>
<tr><td>Sozialversicherungsnummer</td><td>${student.birthDate ? new Date(student.birthDate).toLocaleDateString('de-DE').replace(/\./g, ' ').split(' ').reverse().join(' ') : ''}</td></tr>
<tr><td>Alter</td><td>${biologicalAge ? biologicalAge.years + ' Jahre, ' + biologicalAge.months + ' Monate' : ''}</td></tr>
<tr><td>Schule</td><td>${student.foerderort || ''}</td></tr>
<tr><td>Klasse</td><td></td></tr>
<tr><td>Sprachen</td><td><span class="placeholder-text">(Sprachkompetenzranking)</span></td></tr>
</table>

<div class="empfehlungen-box">
<div class="empfehlungen-header">Empfehlungen des CDSE</div>
<div class="checkbox-row">☐ Spezialisierte Diagnostik in Zusammenarbeit mit einem Kompetenzzentrum</div>
<div class="checkbox-row">☐ Beratung und Begleitung der Eltern und des/der betroffenen Schülers/-in</div>
<div class="checkbox-row">☐ Beratung und Begleitung der Fachleute</div>
<div class="checkbox-row">☐ Spezialisierte Lernwerkstatt</div>
<div class="checkbox-row">☐ Spezialisierte ambulante Intervention (ISA)</div>
<div class="checkbox-row">☐ Spezialisierte Beschulung im CDSE</div>
<div class="checkbox-indent">☐ Classe de Participation (ClaPa)</div>
<div class="checkbox-indent">☐ Centre socio-thérapeutique (CST)</div>
<div class="checkbox-indent">☐ Annexe Junglinster</div>
<div class="checkbox-row">☐ Spezialisierte Beschulung im Ausland</div>
<div class="checkbox-row">☐ Abschluss der Aktivitäten des CDSE</div>
<div class="checkbox-row">☐ Schließung der Akte im CDSE</div>
</div>

<!-- SEITE 2: Inhaltsverzeichnis -->
<div class="page-break"></div>
<p class="heading1" style="margin-top:0;">Inhaltsverzeichnis</p>
<div class="toc">
<div class="toc-entry">1. Auftragsklärung</div>
<div class="toc-entry">2. Anamnese</div>
<div class="toc-entry toc-indent">2.1 Vorgeschichte</div>
<div class="toc-entry toc-indent">2.2 Sozialbericht</div>
<div class="toc-entry">3. Aktuelle Situation</div>
<div class="toc-entry toc-indent">3.1 Aktuelle schulische und außerschulische Unterstützungsmaßnahmen</div>
<div class="toc-entry toc-indent">3.2 Sichtweise der Schule</div>
<div class="toc-entry toc-indent">3.3 Sichtweise des Schülers/ der Schülerin</div>
<div class="toc-entry toc-indent">3.4 Sichtweise der Eltern / Erziehungsberechtigten</div>
<div class="toc-entry">4. Diagnostische Verfahren</div>
<div class="toc-entry toc-indent">4.1 Verhaltensbeobachtungen</div>
<div class="toc-entry toc-indent">4.2 Ergebnisse der Testverfahren</div>
<div class="toc-entry toc-indent">4.3 Interpretation</div>
<div class="toc-entry">5. Schlussfolgerung</div>
<div class="toc-entry toc-indent">5.1 Spezifische Bedürfnisse des Schülers/der Schülerin</div>
<div class="toc-entry toc-indent">5.2 Ziele</div>
<div class="toc-entry toc-indent">5.3 Empfehlungen</div>
<div class="toc-entry toc-indent">5.4 Empfehlungen - CNI</div>
<div class="toc-entry">6. Anhänge</div>
<div class="toc-entry toc-indent">6.1 Übersicht der Interventionen des CDSE</div>
<div class="toc-entry toc-indent">6.2 Testergebnisse</div>
<div class="toc-entry toc-indent">6.3 Produktionen des Schülers/der Schülerin</div>
</div>

<!-- SEITE 3: Auftragsklärung & Anamnese -->
<div class="page-break"></div>
<p class="heading1" style="margin-top:0;">1. Auftragsklärung</p>
<p>Das Zentrum für sozio-emotionale Entwicklung wurde am <span class="placeholder-text">(Datum)</span> von der nationalen Kommission zur Inklusion (CNI) damit beauftragt, eine vertiefende Diagnostik bei <span class="placeholder-text">(Name des/der Schülers/Schülerin)</span> durchzuführen, um dessen aktuellen sozio-emotionalen Entwicklungsstand und Förderbedarf festzustellen. Der Anlass für die Beauftragung ist/sind <span class="placeholder-text">(spezifische Auffälligkeiten aus dem CI-Dokument kurz benennen)</span> in der Schule und/oder zu Hause, mit dem Anliegen eine <span class="placeholder-text">(ISA / Conseil & Guidance / CST)</span> einzuleiten. Die Anfrage erfolgte auf Empfehlung der betreuenden Fachkraft / Lehrperson / Arzt/Ärztin und/oder auf Wunsch der Eltern.</p>

<p class="heading1">2. Anamnese</p>
<p class="heading2">2.1 Vorgeschichte</p>
<p class="placeholder-text">(Frühkindliche/Kindliche Entwicklung, wenn es relevant ist / bereits gestellte Diagnosen / schulische und außerschulische Unterstützungsmaßnahmen aus den letzten drei Jahren chronologisch aufzählen in Tabellen Form oder in einem Fliesstext / SCAS / CPI / …)</p>

<table class="data-table">
<tr><th>Zeitraum</th><th>Klasse</th><th>Maßnahme</th><th>Akteur</th></tr>
<tr><td><span class="placeholder-text">Von … bis… oder seit …</span></td><td></td><td><span class="placeholder-text">SCAS, CPI, ESEB</span></td><td><span class="placeholder-text">Dir. XY, SPAD, …</span></td></tr>
</table>

<p class="heading2">2.2 Sozialbericht</p>
<p class="placeholder-text">(Zusammensetzung der Familie / Familienstand / Besuchsrecht / Markante Ereignisse / Persönliche Situation der Eltern / Familienkonstellation / Berufliche Situation der Eltern / Arbeitszeiten / Organisation der Freizeit / Sprache zu Hause…)</p>

<!-- SEITE 4: Aktuelle Situation -->
<div class="page-break"></div>
<p class="heading1" style="margin-top:0;">3. Aktuelle Situation</p>
<p>Der/Die Schüler/Schülerin besucht derzeit die <span class="placeholder-text">...</span> Klasse der Schule in <span class="placeholder-text">... (Name und Ort der Schule)</span>, bei <span class="placeholder-text">… (Name der Lehrperson)</span> und seine Referenzperson ist <span class="placeholder-text">… (ESEB Referenzperson)</span>.</p>

<p class="heading2">3.1 Aktuelle schulische und außerschulische Unterstützungsmaßnahmen</p>
<p class="placeholder-text">(Aktuelle Unterstützungsmaßnahmen aus den letzten drei Jahren chronologisch aufzählen / SCAS / CPI / …)</p>

<table class="data-table">
<tr><th>Zeitraum</th><th>Klasse</th><th>Maßnahme</th><th>Akteur</th></tr>
<tr><td><span class="placeholder-text">Von … bis… oder seit …</span></td><td></td><td><span class="placeholder-text">SCAS, CPI, ESEB</span></td><td><span class="placeholder-text">Dir. XY, SPAD, …</span></td></tr>
</table>

<p class="placeholder-text">(die folgenden 3 Punkte können ebenfalls in einem Fließtext verfasst werden, z.B. wenn sich alle drei Sichtweisen sehr ähnlich sind.)</p>

<p class="heading2">3.2 Sichtweise der Schule</p>
<p class="placeholder-text">(Verhalten in der Schule / Leistungen in der Schule / Beziehungen/ Erwartungen / Anliegen / Aussichtspunkt der Lehrperson …)</p>

<p class="heading2">3.3 Sichtweise des Schülers/ der Schülerin</p>
<p class="placeholder-text">(Leidensdruck / Eltern-Kind-Beziehung / Verhalten in der Schule / Lehrer:in-Schüler:in Verhalten / Hobbys / Freunde / Anliegen / Aussichtspunkt des/der Schülers/Schülerin/ …)</p>

<p class="heading2">3.4 Sichtweise der Eltern / Erziehungsberechtigten</p>
<p class="placeholder-text">(Verhalten zu Hause / Eltern-Kind-Beziehungen / Anliegen Erwartungen der Eltern / ...)</p>

<!-- SEITE 5: Diagnostische Verfahren -->
<div class="page-break"></div>
<p class="heading1" style="margin-top:0;">4. Diagnostische Verfahren</p>
<p>Diese Einschätzung wurde aufgrund von dem/den Tests/Methoden (z.B. ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen, …) und der Beobachtungen im Klassenzimmer und in Zusammenarbeit mit den Lehrpersonen von <span class="placeholder-text">(Name des/der Schülers/Schülerin)</span> in <span class="placeholder-text">(Ortschaft)</span> durchgeführt.</p>

<p class="heading2">4.1 Verhaltensbeobachtungen</p>
<p class="placeholder-text">(objektiv, konkrete, relevante Verhaltensweisen beschreiben / sowohl die negativen als auch die positiven)</p>

<p class="heading2">4.2 Ergebnisse der Testverfahren</p>
` + generate42Section(student, devAges) + `

<p class="heading2">4.3 Interpretation</p>
<p class="placeholder-text">(von allen Informationen, Testergebnissen und Beobachtungen, Überschneidungen/Differenzen – wie kann man diese interpretieren? / ELDiB-Welche Abwehrmechanismen sind, wie genau, bei dem/der Schüler:in zu beobachten, die die jeweiligen Entwicklungsängste kompensieren?)</p>

<!-- SEITE 6: Schlussfolgerung -->
<div class="page-break"></div>
<p class="heading1" style="margin-top:0;">5. Schlussfolgerung</p>
<p>Auf Basis der erhobenen Testergebnisse, Beobachtungen und anamnestischen Informationen wurden in enger Abstimmung mit dem Schüler bzw. der Schülerin (ab etwa 12 Jahren) sowie den Eltern gezielte Förderbedarfe identifiziert. Daraus abgeleitet wurden gemeinsam Empfehlungen formuliert, die die individuelle Entwicklung wirksam unterstützen sollen.</p>

<p class="heading2">5.1 Spezifische Bedürfnisse des Schülers/der Schülerin</p>
<p class="placeholder-text">(Zusammenfassend in Bezug auf die Testergebnisse, Beobachtungen und Anamnese spezifische Bedürfnisse kurz beschreiben und welche Ressourcen der/die Schülerin hat.)</p>

<p class="heading2">5.2 Ziele</p>
<p class="placeholder-text">(SMART-Ziele ausgehend von den formulierten ELDiB Zielen)</p>

<p class="heading2">5.3 Empfehlungen</p>
<p class="placeholder-text">(Es ist wichtig die Maßnahmen zu gliedern nach dem familiären Kontext / schulischen Kontext / außerschulischer Kontext und ggfls. dem privaten Leben.)</p>

<p class="heading2">5.4 Empfehlungen - CNI</p>
<p class="placeholder-text">(Genaue Bezeichnung der CDSE Maßnahme, welche empfohlen wird / ggfls. eines Kompetenzzentrums, wenn weitere Diagnostik empfohlen wird...)</p>

<div class="signature-block">
<div class="signature-line"></div>
<p style="margin:0;">Name des Verfassers des Berichts<br>
Berufsbezeichnung<br>
Unité de diagnostic, de conseil et de suivi</p>
</div>

<!-- SEITE 7: Anhänge -->
<div class="page-break"></div>
<p class="heading1" style="margin-top:0;">6. Anhänge</p>

<p class="heading2">6.1 Übersicht der Interventionen des CDSE</p>

<table class="data-table" style="font-size: 9pt;">
<tr>
<th>Datum</th>
<th>Klassenbeobachtungen</th>
<th>Kontakte mit Erziehungsberechtigten</th>
<th>Kontakte mit der Herkunftsschule</th>
<th>Kontakte mit externem Fachpersonal</th>
<th>Kontakte mit dem/der Schüler:in</th>
</tr>
<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
</table>

<!-- SEITE 8: Testergebnisse (ELDiB) -->
<div class="page-break"></div>
<p class="heading2" style="margin-top:0;">6.2 Testergebnisse</p>

<p style="text-align: center; font-weight: bold; margin: 12pt 0;">Zusammenfassung der Entwicklungsziele des ELDiB ©<br>
<span style="font-weight: normal;">(Entwicklungstherapeutischer / entwicklungspädagogischer Lernziel-Diagnose-Bogen)</span></p>

<table class="info-table" style="margin: 12pt 0;">
<tr><td style="width: 140pt;">Name des/der Schüler:in</td><td>${student.name || ''}</td></tr>
<tr><td>Geburtsdatum (Alter)</td><td>${student.birthDate ? new Date(student.birthDate).toLocaleDateString('de-DE') : ''} (${biologicalAge ? biologicalAge.years + ' Jahre ' + biologicalAge.months + ' Monate' : ''})</td></tr>
<tr><td>Datum der Einschätzung</td><td>${student.assessmentDate ? new Date(student.assessmentDate).toLocaleDateString('de-DE') : today}</td></tr>
</table>

${generateDSGridHTML(gridData)}

<div class="legend">
<span>Legende: V-Verhalten; K-Kommunikation; SOZ-Sozialisation; KOG-Kognition</span><br>
<span class="legend-item"><span class="legend-box erreicht"></span>grün = Entwicklungsziel erreicht</span>
<span class="legend-item"><span class="legend-box ziel"></span>gelb = Förderziel</span>
</div>

<div class="copyright">
© Distributed in the English original by the Developmental Therapy Institute, Inc., 1992.<br>
© deutsche Ausgabe: Institut für Entwicklungstherapie/Entwicklungspädagogik e.V. (ETEP Europe) und Marita Bergsson
</div>

<!-- Altersbalken -->
<div class="age-comparison">
<p class="age-comparison-title">Vergleich: Biologisches Alter vs. Sozio-emotionales Entwicklungsalter</p>
${generateAgeBarHTML('Biologisches Alter', biologicalAge ? biologicalAge.decimal : 0, 'bio', 17)}
${generateAgeBarHTML('Verhalten (V)', devAges.verhalten || 0, 'verhalten', 17)}
${generateAgeBarHTML('Kommunikation (K)', devAges.kommunikation || 0, 'kommunikation', 17)}
${generateAgeBarHTML('Sozialisation (SOZ)', devAges.sozialisation || 0, 'sozialisation', 17)}
${generateAgeBarHTML('Kognition (KOG)', devAges.kognition || 0, 'kognition', 17)}
</div>

<!-- SEITE 9: Produktionen -->
<div class="page-break"></div>
<p class="heading2" style="margin-top:0;">6.3 Produktionen des Schülers/der Schülerin</p>
<p class="placeholder-text">(Hier können Zeichnungen, Texte oder andere Produktionen des Schülers/der Schülerin eingefügt werden.)</p>

</body>
</html>`;

    // Download als .doc
    var blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'DS_' + (student.name || 'Spezialisierte_Diagnostik').replace(/\s+/g, '_') + '_' + today.replace(/\./g, '-') + '.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
