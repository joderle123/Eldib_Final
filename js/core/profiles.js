// Profile & Evaluation Management
// Handles multiple student profiles and their evaluations

// Global profile variables
let allProfiles = {};  // Alle Schülerprofile
let currentProfileId = null;
let currentEvaluationId = null;
let blockingRulesEnabled = true;  // Blockade-Regeln standardmäßig aktiviert

// Toggle für Blockade-Regeln
function toggleBlockingRules() {
    const toggle = document.getElementById('blockingRulesToggle');
    blockingRulesEnabled = toggle.checked;
    renderAllDomains();
    // Speichere Einstellung
    localStorage.setItem('eldib_blocking_rules', blockingRulesEnabled);
}

// Lade Blockade-Regeln Einstellung
function loadBlockingRulesSetting() {
    const saved = localStorage.getItem('eldib_blocking_rules');
    if (saved !== null) {
        blockingRulesEnabled = saved === 'true';
        const toggle = document.getElementById('blockingRulesToggle');
        if (toggle) toggle.checked = blockingRulesEnabled;
    }
}

// Generate unique ID
function generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Create new profile
function createNewProfile() {
    const name = prompt('Name des Schülers/der Schülerin:');
    if (!name || name.trim() === '') return;

    const profileId = generateId();
    allProfiles[profileId] = {
        id: profileId,
        studentData: {
            name: name.trim(),
            birthDate: '',
            foerderort: '',
            assessorName: ''
        },
        evaluations: []
    };

    saveAllProfiles();
    updateProfileDropdown();
    loadProfile(profileId);

    // Automatisch erste Evaluation erstellen
    createNewEvaluation();
}

// Load profile
function loadProfile(profileId) {
    if (!profileId) {
        currentProfileId = null;
        currentEvaluationId = null;
        document.getElementById('deleteProfileBtn').style.display = 'none';
        document.getElementById('evaluationSelect').innerHTML = '<option value="">-- Evaluation wählen --</option>';
        updateEvaluationUI();
        localStorage.removeItem('eldib_last_profile');
        return;
    }

    currentProfileId = profileId;
    const profile = allProfiles[profileId];

    // Letztes verwendetes Profil speichern
    localStorage.setItem('eldib_last_profile', profileId);

    // Stammdaten laden
    document.getElementById('studentName').value = profile.studentData.name || '';
    document.getElementById('birthDate').value = profile.studentData.birthDate || '';
    document.getElementById('foerderort').value = profile.studentData.foerderort || '';

    document.getElementById('deleteProfileBtn').style.display = 'inline-block';

    updateEvaluationDropdown();

    // Letzte Evaluation laden falls vorhanden
    if (profile.evaluations.length > 0) {
        loadEvaluation(profile.evaluations[profile.evaluations.length - 1].id);
    } else {
        currentEvaluationId = null;
        resetAssessments();
        updateEvaluationUI();
    }
}

// Delete current profile
function deleteCurrentProfile() {
    if (!currentProfileId) return;
    const profile = allProfiles[currentProfileId];
    if (!confirm(`Profil "${profile.studentData.name}" und alle ${profile.evaluations.length} Evaluationen löschen?`)) return;

    delete allProfiles[currentProfileId];
    currentProfileId = null;
    currentEvaluationId = null;

    saveAllProfiles();
    updateProfileDropdown();
    document.getElementById('profileSelect').value = '';
    loadProfile('');
}

// Create new evaluation
function createNewEvaluation() {
    if (!currentProfileId) {
        alert('Bitte zuerst ein Schülerprofil erstellen oder auswählen.');
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    const evaluationId = generateId();

    const newEvaluation = {
        id: evaluationId,
        date: today,
        assessorName: document.getElementById('assessorName').value || '',
        assessments: JSON.parse(JSON.stringify(assessments)), // Deep copy
        developmentalAges: null // Wird beim Speichern berechnet
    };

    // Bisherige Bewertungen als Ausgangspunkt (falls gewünscht)
    const profile = allProfiles[currentProfileId];
    if (profile.evaluations.length > 0) {
        const copyPrevious = confirm('Vorherige Bewertungen als Ausgangspunkt übernehmen?');
        if (copyPrevious) {
            const lastEval = profile.evaluations[profile.evaluations.length - 1];
            newEvaluation.assessments = JSON.parse(JSON.stringify(lastEval.assessments));
        }
    }

    profile.evaluations.push(newEvaluation);
    saveAllProfiles();
    updateEvaluationDropdown();
    loadEvaluation(evaluationId);
}

// Load evaluation
function loadEvaluation(evaluationId) {
    if (!currentProfileId || !evaluationId) {
        currentEvaluationId = null;
        document.getElementById('deleteEvalBtn').style.display = 'none';
        updateEvaluationUI();
        return;
    }

    const profile = allProfiles[currentProfileId];
    const evaluation = profile.evaluations.find(e => e.id === evaluationId);

    if (!evaluation) return;

    currentEvaluationId = evaluationId;

    // Bewertungen laden
    Object.keys(evaluation.assessments).forEach(domain => {
        if (assessments[domain]) {
            Object.assign(assessments[domain], evaluation.assessments[domain]);
        }
    });

    // Datum und Bewerter laden
    document.getElementById('assessmentDate').value = evaluation.date || '';
    document.getElementById('assessorName').value = evaluation.assessorName || '';

    document.getElementById('deleteEvalBtn').style.display = 'inline-block';

    renderAllDomains();
    updateStats();
    updateEvaluationUI();
}

// Delete current evaluation
function deleteCurrentEvaluation() {
    if (!currentProfileId || !currentEvaluationId) return;

    const profile = allProfiles[currentProfileId];
    const evalIndex = profile.evaluations.findIndex(e => e.id === currentEvaluationId);

    if (evalIndex === -1) return;

    const evalDate = profile.evaluations[evalIndex].date;
    if (!confirm(`Evaluation vom ${new Date(evalDate).toLocaleDateString('de-DE')} löschen?`)) return;

    profile.evaluations.splice(evalIndex, 1);
    currentEvaluationId = null;

    saveAllProfiles();
    updateEvaluationDropdown();

    // Letzte Evaluation laden falls vorhanden
    if (profile.evaluations.length > 0) {
        loadEvaluation(profile.evaluations[profile.evaluations.length - 1].id);
    } else {
        resetAssessments();
        updateEvaluationUI();
    }
}

// Save current evaluation
function saveCurrentEvaluation() {
    if (!currentProfileId || !currentEvaluationId) return;

    const profile = allProfiles[currentProfileId];
    const evaluation = profile.evaluations.find(e => e.id === currentEvaluationId);

    if (!evaluation) return;

    // Stammdaten aktualisieren
    profile.studentData.name = document.getElementById('studentName').value;
    profile.studentData.birthDate = document.getElementById('birthDate').value;
    profile.studentData.foerderort = document.getElementById('foerderort').value;

    // Evaluation aktualisieren
    evaluation.date = document.getElementById('assessmentDate').value;
    evaluation.assessorName = document.getElementById('assessorName').value;
    evaluation.assessments = JSON.parse(JSON.stringify(assessments));

    // Entwicklungsalter berechnen und speichern
    evaluation.developmentalAges = calculateAllDevelopmentalAges();

    saveAllProfiles();
    updateProfileDropdown(); // Name könnte sich geändert haben
}

// Manual save
function manualSave() {
    console.log('ELDiB: manualSave aufgerufen, currentProfileId:', currentProfileId);

    // Wenn kein Profil existiert, automatisch eines erstellen
    if (!currentProfileId) {
        const studentName = document.getElementById('studentName').value.trim();
        console.log('ELDiB: Neues Profil erstellen für:', studentName);
        if (!studentName) {
            alert('Bitte geben Sie einen Schülernamen ein.');
            return;
        }

        // Automatisch Profil erstellen
        const profileId = generateId();
        allProfiles[profileId] = {
            id: profileId,
            studentData: {
                name: studentName,
                birthDate: document.getElementById('birthDate').value || '',
                foerderort: document.getElementById('foerderort').value || '',
                assessorName: document.getElementById('assessorName').value || ''
            },
            evaluations: []
        };

        currentProfileId = profileId;
        console.log('ELDiB: Profil erstellt mit ID:', profileId);
        saveAllProfiles();
        updateProfileDropdown();
        document.getElementById('profileSelect').value = profileId;
        document.getElementById('deleteProfileBtn').style.display = 'inline-block';
        localStorage.setItem('eldib_last_profile', profileId);
        console.log('ELDiB: Last profile ID gespeichert:', profileId);
    }

    // Wenn keine Evaluation existiert, automatisch eine erstellen
    if (!currentEvaluationId) {
        const today = new Date().toISOString().split('T')[0];
        const evaluationId = generateId();
        console.log('ELDiB: Neue Evaluation erstellen mit ID:', evaluationId);

        const newEvaluation = {
            id: evaluationId,
            date: document.getElementById('assessmentDate').value || today,
            assessorName: document.getElementById('assessorName').value || '',
            assessments: JSON.parse(JSON.stringify(assessments)),
            developmentalAges: null
        };

        allProfiles[currentProfileId].evaluations.push(newEvaluation);
        currentEvaluationId = evaluationId;
        updateEvaluationDropdown();
        document.getElementById('evaluationSelect').value = evaluationId;
        document.getElementById('deleteEvalBtn').style.display = 'inline-block';
    }

    saveCurrentEvaluation();

    // Visuelles Feedback
    const indicator = document.getElementById('saveIndicator');
    indicator.classList.add('show');
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 2000);

    console.log('ELDiB: Speichern abgeschlossen, currentProfileId:', currentProfileId);

    // Überprüfe Speicherung
    setTimeout(() => {
        const savedProfiles = localStorage.getItem('eldib_profiles_v3');
        const lastProfile = localStorage.getItem('eldib_last_profile');
        console.log('ELDiB: Verifizierung - Gespeicherte Profile:', savedProfiles ? 'vorhanden' : 'FEHLT');
        console.log('ELDiB: Verifizierung - Last Profile ID:', lastProfile);
    }, 100);
}

// Update profile dropdown
function updateProfileDropdown() {
    const select = document.getElementById('profileSelect');
    const currentValue = select.value;

    select.innerHTML = '<option value="">-- Profil wählen --</option>';

    Object.values(allProfiles)
        .sort((a, b) => a.studentData.name.localeCompare(b.studentData.name))
        .forEach(profile => {
            const option = document.createElement('option');
            option.value = profile.id;
            option.textContent = profile.studentData.name + ` (${profile.evaluations.length} Eval.)`;
            select.appendChild(option);
        });

    if (currentProfileId && allProfiles[currentProfileId]) {
        select.value = currentProfileId;
    }
}

// Update evaluation dropdown
function updateEvaluationDropdown() {
    const select = document.getElementById('evaluationSelect');
    select.innerHTML = '<option value="">-- Evaluation wählen --</option>';

    if (!currentProfileId) return;

    const profile = allProfiles[currentProfileId];
    profile.evaluations
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach((evaluation, index) => {
            const option = document.createElement('option');
            option.value = evaluation.id;
            const date = new Date(evaluation.date).toLocaleDateString('de-DE');
            option.textContent = `${index + 1}. Evaluation - ${date}`;
            select.appendChild(option);
        });

    if (currentEvaluationId) {
        select.value = currentEvaluationId;
    }
}

// Update evaluation UI
function updateEvaluationUI() {
    const profile = currentProfileId ? allProfiles[currentProfileId] : null;
    const evalCount = profile ? profile.evaluations.length : 0;

    document.getElementById('evaluationCount').textContent = evalCount + ' Evaluation' + (evalCount !== 1 ? 'en' : '');

    // Vergleichs-Button und Tab anzeigen wenn mehr als 1 Evaluation
    const showComparison = evalCount > 1;
    document.getElementById('compareBtn').style.display = showComparison ? 'inline-block' : 'none';
    document.getElementById('comparisonTab').style.display = showComparison ? 'inline-block' : 'none';
}
