function openAddModal() {
    UI.openAddModal();
}

function openEditModal(id) {
    UI.openEditModal(id);
}

function closeModal() {
    UI.closeModal();
}

function toggleTheme() {
    UI.toggleTheme();
}

function handleSaveTransaction(e) {
    Transactions.handleSaveTransaction(e);
}

function deleteTransaction(id) {
    Transactions.deleteTransaction(id);
}

function handleSearch() {
    Transactions.handleSearch();
}

function handleCategoryFilter() {
    Transactions.handleCategoryFilter();
}

function handleDateFilter() {
    Transactions.handleDateFilter();
}

function sortTable(field) {
    Transactions.sortTable(field);
}

function saveBudgetLimit(e) {
    Settings.saveBudgetLimit(e);
}

function saveExchangeRates(e) {
    Settings.saveExchangeRates(e);
}

function addCategory(e) {
    Settings.addCategory(e);
}

function exportDataHandler() {
    Settings.exportDataHandler();
}

function importDataHandler(e) {
    Settings.importDataHandler(e);
}

function resetData() {
    Settings.resetData();
}

function refreshUI() {
    Dashboard.render();
    Transactions.render();
    About.render();
    Settings.render();
    UI.updateBudgetAlert();
}


function initApp() {
    State.init();
    UI.loadTheme();
    UI.renderNavigation();
    refreshUI();
    setupKeyboardShortcuts();
}


function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}


window.addEventListener('load', initApp);