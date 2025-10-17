const Settings = {
    render() {
        const container = document.getElementById('settings');
        container.innerHTML = `
            <h2>Settings</h2>

            <form onsubmit="saveBudgetLimit(event)">
                <h3>Budget Management</h3>
                <label>Monthly Budget Limit (USD):
                    <input type="number" id="budgetLimit" step="0.01" min="0" value="${State.settings.budgetLimit}">
                </label>
                <button type="submit" style="margin-top: 1rem;">Save Budget Limit</button>
            </form>

            <form onsubmit="saveExchangeRates(event)">
                <h3>Exchange Rates (Manual)</h3>
                <label>USD to EUR:
                    <input type="number" id="usdToEur" step="0.01" min="0" value="${State.settings.exchangeRates.EUR}">
                </label>
                <label>USD to RWF:
                    <input type="number" id="usdToRWF" step="0.01" min="0" value="${State.settings.exchangeRates.RWF}">
                </label>
                <button type="submit" style="margin-top: 1rem;">Save Rates</button>
            </form>

            <form onsubmit="addCategory(event)">
                <h3>Add Custom Category</h3>
                <label>Category Name:
                    <input type="text" id="newCategory" placeholder="e.g., Healthcare">
                </label>
                <button type="submit" style="margin-top: 1rem;">Add Category</button>
            </form>

            <div style="margin-top: 2rem;">
                <h3>Data Management</h3>
                <button type="button" onclick="exportDataHandler()" class="secondary mb-1"> Export Data</button>
                <button type="button" onclick="document.getElementById('importFile').click()" class="secondary mb-1"> Import Data</button>
                <input type="file" id="importFile" accept=".json" onchange="importDataHandler(event)" style="display: none;">
                <button type="button" onclick="resetData()" class="danger"> Reset All Data</button>
            </div>
        `;
    },

    saveBudgetCap(e) {
        e.preventDefault();
        State.settings.budgetLimit = parseFloat(document.getElementById('budgetLimit').value) || 2000;
        Storage.saveSettings(State.settings);
        refreshUI();
        alert('Budget Limit saved!');
    },

    saveExchangeRates(e) {
        e.preventDefault();
        State.settings.exchangeRates = {
            EUR: parseFloat(document.getElementById('usdToEur').value) || 0.8,
            RWF: parseFloat(document.getElementById('usdToRwf').value) || 1450
        };
        Storage.saveSettings(State.settings);
        alert('Exchange rates saved!');
    },

    addCategory(e) {
        e.preventDefault();
        const newCat = document.getElementById('newCategory').value.trim();
        if (newCat && !State.categories.includes(newCat)) {
            State.categories.push(newCat);
            Storage.saveSettings(State.settings);
            document.getElementById('newCategory').value = '';
            UI.renderCategoryFilters();
            alert('Category added!');
        } else if (State.categories.includes(newCat)) {
            alert('Category already exists!');
        }
    },

    exportDataHandler() {
        const data = { transactions: State.transactions, settings: State.settings };
        Storage.exportData(data);
    },

    importDataHandler(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = Storage.importData(event.target.result);
                if (data && data.transactions) {
                    State.transactions = data.transactions || [];
                    State.settings = data.settings || State.settings;
                    Storage.saveTransactions(State.transactions);
                    Storage.saveSettings(State.settings);
                    refreshUI();
                    alert('Data imported successfully!');
                } else {
                    alert('Invalid file format');
                }
            } catch (err) {
                alert('Error importing file: ' + err.message);
            }
        };
        reader.readAsText(file);
    },

    
    resetData() {
        if (confirm('Reset all data to default? This cannot be undone!')) {
            State.transactions = [...SEED_DATA];
            Storage.saveTransactions(State.transactions);
            refreshUI();
            alert('Data reset to default seed');
        }
    }
};