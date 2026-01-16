// Modal Functions - Item detail modal handling

// Show item detail modal
function showItemModal(domain, itemId) {
    const data = ELDIB_DATA[domain];
    let item = null;

    for (const stufe of data.stufen) {
        item = stufe.items.find(i => i.id === itemId);
        if (item) break;
    }

    if (!item) return;

    document.getElementById('modalItemCode').textContent = item.id;
    document.getElementById('modalItemCode').style.background = data.color;
    document.getElementById('modalItemTitle').textContent = item.name;
    document.getElementById('modalItemDescription').textContent = item.beschreibung;

    // Beispiele anzeigen
    const beispiele = BEISPIELE[itemId] || [];
    const examplesList = document.getElementById('modalExamplesList');
    if (beispiele.length > 0) {
        examplesList.innerHTML = beispiele.map(b => `<li>${b}</li>`).join('');
        document.getElementById('modalItemExamples').style.display = 'block';
    } else {
        document.getElementById('modalItemExamples').style.display = 'none';
    }

    document.getElementById('itemModal').classList.add('active');

    // ESC-Taste zum Schließen
    document.addEventListener('keydown', handleModalEsc);
}

// Handle ESC key press
function handleModalEsc(e) {
    if (e.key === 'Escape') closeItemModal();
}

// Close item modal
function closeItemModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('itemModal').classList.remove('active');
    document.removeEventListener('keydown', handleModalEsc);
}
