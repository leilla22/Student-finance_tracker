const Storage = {
    loadTransactions() {
        try {
            const stored = localStorage.getItem('financeData');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            console.error('Error loading transactions:', e);
            return null;
        }
    },


    saveTransactions(transactions) {
        try {
            localStorage.setItem('financeData', JSON.stringify(transactions));
            return true;
        } catch (e) {
            console.error('Error saving transactions:', e);
            return false;
        }
    },


    loadSettings() {
        try {
            const stored = localStorage.getItem('financeSettings');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            console.error('Error loading settings:', e);
            return null;
        }
    },

    saveSettings(settings) {
        try {
            localStorage.setItem('financeSettings', JSON.stringify(settings));
            return true;
        } catch (e) {
            console.error('Error saving settings:', e);
            return false;
        }
    },

    exportData(data) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `finance-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    importData(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return null;
        }
    },

    clearAll() {
        localStorage.removeItem('financeData');
        localStorage.removeItem('financeSettings');
    }
};