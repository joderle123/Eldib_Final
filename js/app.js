// ELDiB App - Main Application Initialization
// Entry point for the application

document.addEventListener('DOMContentLoaded', () => {
    // Warnung für file:// URLs
    if (window.location.protocol === 'file:') {
        console.warn('ELDiB: App läuft über file:// - localStorage könnte nicht persistent sein!');
        // Zeige Warnung nach 2 Sekunden, wenn noch keine Profile existieren
        setTimeout(() => {
            const saved = localStorage.getItem('eldib_profiles_v3');
            if (!saved || saved === '{}') {
                console.log('ELDiB: Keine gespeicherten Profile gefunden.');
            }
        }, 2000);
    }

    // Initialize assessments from ELDIB_DATA
    initializeAssessments();

    // Neue Profile laden
    loadAllProfiles();
    console.log('ELDiB: Profile geladen:', Object.keys(allProfiles).length, 'Profile');
    updateProfileDropdown();

    // Blockade-Regeln Einstellung laden
    loadBlockingRulesSetting();

    // Letztes verwendetes Profil laden, wenn vorhanden
    const lastProfileId = localStorage.getItem('eldib_last_profile');
    console.log('ELDiB: Letztes Profil ID:', lastProfileId);
    if (lastProfileId && allProfiles[lastProfileId]) {
        document.getElementById('profileSelect').value = lastProfileId;
        loadProfile(lastProfileId);
        console.log('ELDiB: Profil geladen:', allProfiles[lastProfileId].studentData?.name);
    } else {
        // Alte Daten für Kompatibilität laden (nur wenn kein Profil gespeichert)
        loadFromLocalStorage();
    }

    renderAllDomains();
    updateStats();
    updateEvaluationUI();

    // Auto-save für alle Eingabefelder im Schüler-Grid
    document.querySelectorAll('.student-grid input').forEach(input => {
        input.addEventListener('change', () => {
            saveToLocalStorage();
            // Speichere aktuelles Profil
            if (currentProfileId) {
                localStorage.setItem('eldib_last_profile', currentProfileId);
            }
        });
    });

    // Geburtsdatum-Änderung: Re-render um Bio-Alter-Sperre zu aktualisieren
    document.getElementById('birthDate')?.addEventListener('change', () => {
        renderAllDomains();
    });
});
