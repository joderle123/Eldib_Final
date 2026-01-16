// Comparison Functions - Compare evaluations over time

// Show comparison view
function showComparison() {
    switchDomain('vergleich');
}

// Render comparison view
function renderComparison() {
    const container = document.getElementById('comparisonContent');
    if (!currentProfileId) {
        container.innerHTML = '<p>Bitte wählen Sie ein Profil aus.</p>';
        return;
    }

    const profile = allProfiles[currentProfileId];
    if (profile.evaluations.length < 2) {
        container.innerHTML = '<p>Mindestens 2 Evaluationen nötig für den Vergleich.</p>';
        return;
    }

    // Tabelle mit Evaluationen
    let tableHtml = `<table class="comparison-table">
        <thead>
            <tr>
                <th>Bereich</th>`;

    profile.evaluations.forEach((eval, idx) => {
        const date = new Date(eval.date).toLocaleDateString('de-DE');
        tableHtml += `<th>${idx + 1}. Eval. (${date})</th>`;
    });
    tableHtml += `<th>Δ (Erste → Letzte)</th></tr></thead><tbody>`;

    // Zeilen für jeden Bereich
    const domains = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];
    const domainNames = {
        verhalten: 'Verhalten (V)',
        kommunikation: 'Kommunikation (K)',
        sozialisation: 'Sozialisation (SOZ)',
        kognition: 'Kognition (KOG)'
    };

    domains.forEach(domain => {
        tableHtml += `<tr><td>${domainNames[domain]}</td>`;

        let firstAge = null;
        let lastAge = null;

        profile.evaluations.forEach((eval, idx) => {
            const devAge = eval.developmentalAges?.[domain] || 0;
            if (idx === 0) firstAge = devAge;
            if (idx === profile.evaluations.length - 1) lastAge = devAge;
            tableHtml += `<td>${devAge.toFixed(1)} Jahre</td>`;
        });

        const delta = lastAge - firstAge;
        const deltaClass = delta > 0 ? 'delta-positive' : (delta < 0 ? 'delta-negative' : '');
        const deltaSign = delta > 0 ? '+' : '';
        tableHtml += `<td class="${deltaClass}">${deltaSign}${delta.toFixed(1)} Jahre</td></tr>`;
    });

    tableHtml += '</tbody></table>';

    // Progress Chart
    let chartHtml = renderProgressChart(profile);

    container.innerHTML = tableHtml + chartHtml;
}

// Render progress chart
function renderProgressChart(profile) {
    const domains = ['verhalten', 'kommunikation', 'sozialisation', 'kognition'];
    const domainNames = {
        verhalten: 'Verhalten',
        kommunikation: 'Kommunikation',
        sozialisation: 'Sozialisation',
        kognition: 'Kognition'
    };
    const domainColors = {
        verhalten: '#e74c3c',
        kommunikation: '#3498db',
        sozialisation: '#27ae60',
        kognition: '#9b59b6'
    };

    let html = '<div class="progress-chart"><h3>Entwicklungsverlauf</h3>';

    domains.forEach(domain => {
        html += `<div class="chart-row">
            <div class="chart-label" style="color: ${domainColors[domain]}">${domainNames[domain]}</div>
            <div class="chart-bars">`;

        profile.evaluations.forEach((eval, idx) => {
            const devAge = eval.developmentalAges?.[domain] || 0;
            const height = Math.min((devAge / 17) * 100, 100);
            const date = new Date(eval.date).toLocaleDateString('de-DE', { month: 'short', year: '2-digit' });
            html += `<div class="chart-bar" style="height: ${height}%; background: linear-gradient(180deg, ${domainColors[domain]} 0%, ${domainColors[domain]}88 100%);">
                <span class="chart-bar-value">${devAge.toFixed(1)}</span>
                <span class="chart-bar-label">${date}</span>
            </div>`;
        });

        html += '</div></div>';
    });

    html += '</div>';
    return html;
}
