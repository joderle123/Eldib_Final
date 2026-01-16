// State Management - ELDiB Assessments
// Global state variables for the application

// Global assessments object - will be initialized after ELDIB_DATA is loaded
const assessments = {};

// Current active domain
let currentDomain = 'verhalten';

// Initialize assessments from ELDIB_DATA
function initializeAssessments() {
    Object.keys(ELDIB_DATA).forEach(domain => {
        assessments[domain] = {};
        ELDIB_DATA[domain].stufen.forEach(stufe => {
            stufe.items.forEach(item => {
                assessments[domain][item.id] = { erreicht: false, nichtErreicht: false, ziel: false };
            });
        });
    });
}

// Get student data from form inputs
function getStudentData() {
    return {
        name: document.getElementById('studentName').value,
        birthDate: document.getElementById('birthDate').value,
        foerderort: document.getElementById('foerderort').value,
        assessmentDate: document.getElementById('assessmentDate').value,
        assessorName: document.getElementById('assessorName').value
    };
}

// Reset all assessments to default state
function resetAssessments() {
    Object.keys(ELDIB_DATA).forEach(domain => {
        ELDIB_DATA[domain].stufen.forEach(stufe => {
            stufe.items.forEach(item => {
                assessments[domain][item.id] = { erreicht: false, nichtErreicht: false, ziel: false };
            });
        });
    });
    renderAllDomains();
    updateStats();
}

// Calculate developmental ages for all domains
function calculateAllDevelopmentalAges() {
    const stageData = {};
    Object.keys(ELDIB_DATA).forEach(domain => {
        stageData[domain] = {};
        ELDIB_DATA[domain].stufen.forEach(stufe => {
            stageData[domain][stufe.nummer] = {
                total: stufe.items.length,
                erreicht: 0
            };
            stufe.items.forEach(item => {
                if (assessments[domain][item.id].erreicht) {
                    stageData[domain][stufe.nummer].erreicht++;
                }
            });
        });
    });

    const result = {};
    Object.keys(ELDIB_DATA).forEach(domain => {
        let highestStage = 0;
        for (let i = 5; i >= 1; i--) {
            if (stageData[domain][i].erreicht > 0) {
                highestStage = i;
                break;
            }
        }
        const devAge = calculateDevelopmentalAge(highestStage, stageData, domain);
        result[domain] = devAge.age;
    });

    return result;
}

// Calculate developmental age for a specific stage and domain
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
}

// Update statistics display
function updateStats() {
    let totalErreicht = 0;
    let totalZiele = 0;

    Object.keys(assessments).forEach(domain => {
        Object.values(assessments[domain]).forEach(status => {
            if (status.erreicht) totalErreicht++;
            if (status.ziel) totalZiele++;
        });
    });

    document.getElementById('totalErreicht').textContent = totalErreicht;
    document.getElementById('totalZiele').textContent = totalZiele;
}
