// Local Storage Functions
// Save and load data from browser localStorage

// Save current state to localStorage
function saveToLocalStorage() {
    // Alte Speichermethode für Kompatibilität
    const data = {
        assessments: assessments,
        student: getStudentData()
    };
    localStorage.setItem('eldib_data_v2', JSON.stringify(data));

    // Neue Speichermethode: Aktuelle Evaluation speichern
    saveCurrentEvaluation();
}

// Load data from localStorage (legacy support)
function loadFromLocalStorage() {
    const saved = localStorage.getItem('eldib_data_v2');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.assessments) {
                Object.keys(data.assessments).forEach(domain => {
                    if (assessments[domain]) {
                        Object.assign(assessments[domain], data.assessments[domain]);
                    }
                });
            }
            if (data.student) {
                document.getElementById('studentName').value = data.student.name || '';
                document.getElementById('birthDate').value = data.student.birthDate || '';
                document.getElementById('foerderort').value = data.student.foerderort || '';
                document.getElementById('assessmentDate').value = data.student.assessmentDate || '';
                document.getElementById('assessorName').value = data.student.assessorName || '';
            }
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

// Save all profiles to localStorage
function saveAllProfiles() {
    try {
        const data = JSON.stringify(allProfiles);
        localStorage.setItem('eldib_profiles_v3', data);
        console.log('ELDiB: Profile gespeichert, Größe:', data.length, 'Bytes');

        // Verifiziere Speicherung
        const verify = localStorage.getItem('eldib_profiles_v3');
        if (verify !== data) {
            console.error('ELDiB: Speicherung fehlgeschlagen - Daten stimmen nicht überein!');
            alert('WARNUNG: Die Speicherung konnte nicht verifiziert werden. Bitte starten Sie die App über einen lokalen Webserver.');
        }
    } catch (e) {
        console.error('ELDiB: Fehler beim Speichern:', e);
        alert('Fehler beim Speichern: ' + e.message);
    }
}

// Load all profiles from localStorage
function loadAllProfiles() {
    const saved = localStorage.getItem('eldib_profiles_v3');
    console.log('ELDiB: localStorage eldib_profiles_v3:', saved ? saved.substring(0, 100) + '...' : 'LEER');
    if (saved) {
        try {
            allProfiles = JSON.parse(saved);
            console.log('ELDiB: Profile erfolgreich geparst:', Object.keys(allProfiles));
        } catch (e) {
            console.error('ELDiB: Fehler beim Laden der Profile:', e);
            allProfiles = {};
        }
    } else {
        console.log('ELDiB: Keine gespeicherten Profile im localStorage gefunden.');
        allProfiles = {};
    }
}
