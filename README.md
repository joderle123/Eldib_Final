# ELDiB Digital - Vollständige Projektdokumentation

## Was ist diese App?

ELDiB (Entwicklungstherapeutischer/Entwicklungspädagogischer Lernziel-Diagnose-Bogen) ist ein 
standardisiertes Einschätzungsinstrument zur Erfassung der sozio-emotionalen Entwicklung von 
Kindern und Jugendlichen (0-17 Jahre). Diese Web-App digitalisiert den ELDiB-Bogen.

## Kernfunktionen der App

### 1. Profilverwaltung
- Mehrere Schülerprofile mit Name, Geburtsdatum, Förderort
- Jedes Profil kann mehrere Evaluationen (Zeitpunkte) haben
- Alles wird in localStorage gespeichert

### 2. ELDiB-Assessment (4 Entwicklungsbereiche)
- **Verhalten (V)**: 33 Items, Farbe #e74c3c (rot)
- **Kommunikation (K)**: 35 Items, Farbe #3498db (blau)
- **Sozialisation (SOZ)**: 41 Items, Farbe #27ae60 (grün)
- **Kognition (KOG)**: 62 Items, Farbe #9b59b6 (lila)

### 3. Entwicklungsstufen (5 Stufen)
| Stufe | Alter | Richtziel |
|-------|-------|-----------|
| I | 0-2 J. | Mit Freude auf die Umwelt reagieren |
| II | 3-5 J. | Erfolgreich auf die Umwelt reagieren |
| III | 6-9 J. | Fähigkeiten zur erfolgreichen Gruppenteilnahme erwerben |
| IV | 10-12 J. | Sich in Gruppenprozesse einbringen |
| V | 13-17 J. | Fähigkeiten in neuen Situationen anwenden |

### 4. Item-Bewertung
Jedes Item kann markiert werden als:
- **Erreicht** (grün, #27ae60) - Fähigkeit vorhanden
- **Nicht erreicht** (grau, #95a5a6) - Noch nicht vorhanden
- **Ziel** (gelb, #f39c12/#FFC000) - Aktuelles Förderziel

### 5. Blockierungsregeln für Ziele
- Ziele können nur für Stufen VOR dem biologischen Alter gesetzt werden
- Wenn ein früheres Item "nicht erreicht" ist, können spätere Items keine Ziele sein
- Diese Regeln können ein/ausgeschaltet werden

### 6. Entwicklungsalter-Berechnung
Aus den erreichten Items wird pro Bereich ein Entwicklungsalter berechnet:
- Höchste Stufe mit erreichten Items finden
- Prozentsatz der erreichten Items in dieser Stufe berechnen
- Entwicklungsalter = Stufen-Minimum + (Prozentsatz × Altersspanne)

## DS-Export (Spezialisierte Diagnostik)

### Was ist das DS-Dokument?
Ein offizielles Word-Dokument für die Commission nationale d'inclusion (CNI) in Luxemburg.
Es folgt einem exakten CDSE-Template mit fester Struktur.

### Struktur des DS-Dokuments (EXAKT einhalten!)

**Seite 1: Deckblatt**
- Header rechts: "Commission nationale d'inclusion, 33 Rives de Clausen, L-2165 Luxembourg"
- Titel zentriert: "Spezialisierte Diagnostik" (16pt, fett)
- Untertitel: "des Zentrums für sozio-emotionale Entwicklung (CDSE)" (14pt)
- Info-Tabelle mit vertikaler Linie: Name, Sozialversicherungsnummer, Alter, Schule, Klasse, Sprachen
- Empfehlungen-Box mit Checkboxen (☐)

**Seite 2: Inhaltsverzeichnis**
1. Auftragsklärung
2. Anamnese (2.1 Vorgeschichte, 2.2 Sozialbericht)
3. Aktuelle Situation (3.1-3.4)
4. Diagnostische Verfahren (4.1 Verhaltensbeobachtungen, 4.2 Ergebnisse, 4.3 Interpretation)
5. Schlussfolgerung (5.1-5.4)
6. Anhänge (6.1-6.3)

**Seite 5: Abschnitt 4.2 - AUTOMATISCH GENERIERT**
Dieser Abschnitt wird aus den ELDiB-Daten generiert:
- ELDiB Einleitung (standardisierter Text)
- Höchster Entwicklungsbereich mit Stufe, Alter, Richtziel, Lernzielen
- Mittlere Bereiche (falls vorhanden)
- Niedrigster Bereich mit Details
- Platzhalter für individuelle Beobachtungen

**Seite 8: Abschnitt 6.2 - Testergebnisse**
1. ELDiB-Raster (kompakte Tabelle):
   - 5 Spalten: V | KOMM | SOZ | KOG | Stufe
   - Nach Stufen gruppiert (Stufe 5 oben, Stufe 1 unten)
   - Farben: Grün (#70AD47) = erreicht, Gelb (#FFC000) = Ziel, Weiß = nicht erreicht
   - Muss auf eine A4-Seite passen!

2. Altersbalken-Visualisierung:
   - Horizontale Balken für Bio-Alter vs. Entwicklungsalter
   - Bio-Alter: Blau (#5B9BD5)
   - Verhalten: Orange (#ED7D31)
   - Kommunikation: Grün (#70AD47)
   - Sozialisation: Braun (#9E480E)
   - Kognition: Lila (#7030A0)
   - Balkenbreite = (Alter / 17 Jahre) × 100%

### Styling des DS-Dokuments
- Schriftart: Calibri, 11pt
- Überschriften: Calibri, 14pt/12pt, fett, Farbe #2F5496
- Seitenränder: 2cm oben/unten, 2.5cm links/rechts
- Export als .doc (HTML mit MIME-Type application/msword)

## Dateistruktur


## Wichtige Funktionen

### generateAgeBarHTML(label, age, cssClass, maxAge)
Generiert einen horizontalen Altersbalken für die Visualisierung.

### generateDSGridHTML(gridData)
Generiert das kompakte ELDiB-Raster für den DS-Export.
- Items werden nach Stufen gruppiert
- rowspan für Stufen-Labels
- Muss auf A4 passen (font-size: 7pt)

### generate42Section(student, devAges)
Generiert automatisch den Text für Abschnitt 4.2 basierend auf:
- Sortierte Bereiche nach Entwicklungsalter
- Höchster/niedrigster Bereich mit Details
- Stufe, Richtziel, Lernziele

### exportDS()
Hauptfunktion für den DS-Export:
- Sammelt alle Daten
- Generiert HTML im CDSE-Template-Format
- Download als .doc Datei

## Keine Build-Tools
Die App funktioniert ohne npm/webpack - einfache Script-Tags im HTML.
Lade-Reihenfolge beachten: data → core → ui → export → app
