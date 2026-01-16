// Render Functions - Domain and Item display
// Handles rendering of all UI components

function renderDomain(domain) {
    const data = ELDIB_DATA[domain];
    let html = '';

    data.stufen.forEach(stufe => {
        const allReached = isStufeComplete(domain, stufe.nummer);
        const zielDisabledByAge = isZielDisabledByBioAge(domain, stufe.nummer);
        const ageHint = zielDisabledByAge ? '<span class="age-hint" title="Ziele auf dieser Stufe sind deaktiviert, da das biologische Alter dem Entwicklungsalter entspricht oder darüber liegt">⚠️ Altersgemäß - keine Ziele möglich</span>' : '';

        html += `
            <div class="stufe-container" data-domain="${domain}">
                <div class="stufe-header">
                    <div class="stufe-header-text">
                        <h3>Stufe ${stufe.nummer}: ${stufe.stufenziel}</h3>
                        <p>${stufe.bereichsziel}</p>
                        ${ageHint}
                    </div>
                    <button class="stufe-complete-btn ${allReached ? 'completed' : ''}"
                            onclick="toggleStufeComplete('${domain}', ${stufe.nummer})">
                        ${allReached ? '✓ Stufe erreicht' : '☐ Stufe komplett erreicht'}
                    </button>
                </div>
                <div class="items-list">
                    ${stufe.items.map(item => renderItem(domain, item, stufe.nummer)).join('')}
                </div>
            </div>
        `;
    });

    return html;
}

function renderItem(domain, item, stufeNummer) {
    const status = assessments[domain][item.id];

    // Prüfe ob Ziele blockiert werden sollen
    const blockCheck = isZielBlocked(domain, item.id);
    const zielDisabled = blockCheck.blocked;
    const zielDisabledClass = zielDisabled ? 'checkbox-disabled' : '';
    const zielGroupDisabled = zielDisabled ? 'disabled' : '';
    const zielTitle = zielDisabled ? blockCheck.reason : 'Als Ziel definieren';

    return `
        <div class="item-row" data-domain="${domain}" data-item-id="${item.id}">
            <div class="item-info" ondblclick="showItemModal('${domain}', '${item.id}')">
                <span class="item-code">${item.id}</span>
                <span class="item-name">${item.name}</span>
                <div class="item-description">${item.beschreibung}</div>
            </div>
            <div class="item-checkboxes">
                <div class="checkbox-group">
                    <label>Erreicht</label>
                    <div class="checkbox-erreicht ${status.erreicht ? 'checked' : ''}"
                         onclick="toggleStatus('${domain}', '${item.id}', 'erreicht')"></div>
                </div>
                <div class="checkbox-group">
                    <label>Nicht err.</label>
                    <div class="checkbox-nicht-erreicht ${status.nichtErreicht ? 'checked' : ''}"
                         onclick="toggleStatus('${domain}', '${item.id}', 'nichtErreicht')"></div>
                </div>
                <div class="checkbox-group ${zielGroupDisabled}" title="${zielTitle}">
                    <label>Ziel</label>
                    <div class="checkbox-ziel ${status.ziel ? 'checked' : ''} ${zielDisabledClass}"
                         onclick="toggleStatus('${domain}', '${item.id}', 'ziel')"></div>
                </div>
            </div>
        </div>
    `;
}

function renderAllDomains() {
    const container = document.getElementById('domainContent');
    let html = '';

    Object.keys(ELDIB_DATA).forEach(domain => {
        html += `<div class="domain-section ${domain === currentDomain ? 'active' : ''}" data-domain="${domain}">
            ${renderDomain(domain)}
        </div>`;
    });

    container.innerHTML = html;
}

// Check if all items in a stage are reached
function isStufeComplete(domain, stufeNummer) {
    const data = ELDIB_DATA[domain];
    const stufe = data.stufen.find(s => s.nummer === stufeNummer);
    if (!stufe) return false;
    return stufe.items.every(item => assessments[domain][item.id].erreicht);
}

// Toggle all items in a stage
function toggleStufeComplete(domain, stufeNummer) {
    const data = ELDIB_DATA[domain];
    const stufe = data.stufen.find(s => s.nummer === stufeNummer);
    if (!stufe) return;

    const allReached = isStufeComplete(domain, stufeNummer);

    // Toggle: if all reached, uncheck all; otherwise check all
    stufe.items.forEach(item => {
        assessments[domain][item.id].erreicht = !allReached;
        if (!allReached) {
            assessments[domain][item.id].ziel = false;
        }
    });

    renderAllDomains();
    updateStats();
    saveToLocalStorage();
}

// Switch between domains
function switchDomain(domain) {
    currentDomain = domain;

    // Update tabs
    document.querySelectorAll('.domain-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.domain === domain);
    });

    // Update sections
    document.querySelectorAll('.domain-section').forEach(section => {
        section.classList.toggle('active', section.dataset.domain === domain);
    });

    // Vergleichs-Sektion
    const compSection = document.getElementById('comparisonSection');
    const mainContent = document.querySelector('.main-content');

    if (domain === 'vergleich') {
        compSection.classList.add('active');
        mainContent.style.display = 'none';
        renderComparison();
    } else {
        compSection.classList.remove('active');
        mainContent.style.display = 'block';
    }
}

// Toggle item status (erreicht, nichtErreicht, ziel)
function toggleStatus(domain, itemId, type) {
    const item = assessments[domain][itemId];

    switch (type) {
        case 'erreicht':
            item.erreicht = !item.erreicht;
            if (item.erreicht) {
                // Erreicht schließt nichtErreicht und ziel aus
                item.nichtErreicht = false;
                item.ziel = false;
            }
            break;

        case 'nichtErreicht':
            item.nichtErreicht = !item.nichtErreicht;
            if (item.nichtErreicht) {
                // Nicht erreicht schließt erreicht aus, ziel wird automatisch deaktiviert
                item.erreicht = false;
                item.ziel = false;
            }
            break;

        case 'ziel':
            // Prüfe alle Blockierungsregeln
            const blockCheck = isZielBlocked(domain, itemId);
            if (blockCheck.blocked) {
                console.log('Ziel blockiert:', blockCheck.reason);
                return; // Abbrechen ohne Änderung
            }
            item.ziel = !item.ziel;
            if (item.ziel) {
                // Ziel schließt erreicht aus
                item.erreicht = false;
            }
            break;
    }

    renderAllDomains();
    updateStats();
    saveToLocalStorage();
}

// Age-related blocking logic
function getBioAgeStufe(bioAge) {
    if (bioAge <= 2) return 1;   // 0-2 Jahre
    if (bioAge <= 5) return 2;   // 2-5 Jahre
    if (bioAge <= 9) return 3;   // 6-9 Jahre
    if (bioAge <= 12) return 4;  // 10-12 Jahre
    return 5;                     // 13-16 Jahre
}

function isZielDisabledByBioAge(domain, stufeNummer) {
    const birthDate = document.getElementById('birthDate')?.value;
    if (!birthDate) return false;

    const ageResult = calculateAge(birthDate);
    if (!ageResult) return false;

    const bioAgeDecimal = ageResult.decimal;
    if (isNaN(bioAgeDecimal) || bioAgeDecimal <= 0) return false;

    const bioAgeStufe = getBioAgeStufe(bioAgeDecimal);
    return stufeNummer >= bioAgeStufe;
}

function getStufeForItem(domain, itemId) {
    const data = ELDIB_DATA[domain];
    for (const stufe of data.stufen) {
        if (stufe.items.some(i => i.id === itemId)) {
            return stufe.nummer;
        }
    }
    return null;
}

function hasEarlierNichtErreicht(domain, itemId) {
    const data = ELDIB_DATA[domain];

    for (const stufe of data.stufen) {
        for (const item of stufe.items) {
            if (item.id === itemId) {
                return false;
            }
            if (assessments[domain][item.id]?.nichtErreicht) {
                return true;
            }
        }
    }
    return false;
}

function isZielBlocked(domain, itemId) {
    if (!blockingRulesEnabled) {
        return { blocked: false, reason: '' };
    }

    if (hasEarlierNichtErreicht(domain, itemId)) {
        return { blocked: true, reason: 'Ein früheres Item ist als "nicht erreicht" markiert' };
    }

    const stufeNummer = getStufeForItem(domain, itemId);
    if (stufeNummer && isZielDisabledByBioAge(domain, stufeNummer)) {
        return { blocked: true, reason: 'Bio-Alter entspricht der Entwicklungsstufe' };
    }

    return { blocked: false, reason: '' };
}

// Calculate age from birth date
function calculateAge(birthDate) {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    let months = today.getMonth() - birth.getMonth();
    if (today.getDate() < birth.getDate()) months--;
    if (months < 0) months += 12;
    return { years: age, months: months, decimal: age + (months / 12) };
}
