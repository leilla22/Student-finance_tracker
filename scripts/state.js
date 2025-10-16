const State = {
    transactions: [],
    categories: ['Food', 'Books', 'Transport', 'Entertainment', 'tuition', 'bills','Others'],
    settings: {
        budgetCap: 1000,
        theme: 'light',
        exchangeRates: { EUR: 0.92, GBP: 0.79, RWF: 1300 }
    },
    filters: { search: '', category: '', dateFrom: '', dateTo: '' },
    editingId: null,

    init() {
        const stored = Storage.loadTransactions();
        this.transactions = stored || [...SEED_DATA];
        
        const settingsStored = Storage.loadSettings();
        if (settingsStored) {
            this.settings = settingsStored;
        }
    },


    addTransaction(date, description, amount, category) {
        const newId = Math.max(...this.transactions.map(t => t.id), 0) + 1;
        this.transactions.push({ 
            id: newId,
            description, 
            amount: parseFloat(amount),
            category, 
            date, 
            createdAt,
            updatedAt 
             
        });
        Storage.saveTransactions(this.transactions);
    },

    updateTransaction(id, date, description, amount, category ) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            this.transactions[index] = { 
                id, 
                date, 
                amount: parseFloat(amount), 
                category, 
                description 
            };
            Storage.saveTransactions(this.transactions);
        }
    },


    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        Storage.saveTransactions(this.transactions);
    },


    getFilteredTransactions() {
        return Search.combineFilters(this.filters, this.transactions);
    },

    
    getStats() {
        const filtered = this.getFilteredTransactions();
        const total = filtered.length;
        const sum = filtered.reduce((acc, t) => acc + t.amount, 0);
        
        const categoryTotals = {};
        filtered.forEach(t => {
            categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        });
        const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0] || ['N/A', 0];
        
        const today = new Date();
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const sevenDayData = filtered.filter(t => new Date(t.date) >= sevenDaysAgo);
        
        const average = total > 0 ? (sum / total).toFixed(2) : 0;
        
        return {
            total,
            sum: sum.toFixed(2),
            topCategory: topCategory[0],
            topCategoryAmount: topCategory[1].toFixed(2),
            sevenDayTransactions: sevenDayData,
            average
        };
    }
};