const SEED_DATA = [
    {id: 1, description: 'lunch at cafeteria', amount: 12.50, category: 'food', date: '2025-09-25', createdAt: '2025-09-25 10:00', updatedAt: '2025-09-25 10:00'},
    {id: 2, description: 'chemistry textbook', amount: 89.99, category: 'books', date: '2025-09-23', createdAt: '2025-09-23 16:00', updatedAt: '2025-09-23 16:00'},
    {id: 3, description: 'bus pass', amount: 45, category: 'transport', date: '2024-09-20', createdAt: '2025-09-20 11:00', updatedAt: '2025-09-20 11:00'},
    {id: 4, description: 'coffee with friends', amount: 8.75, category: 'entertainment', date: '2025-09-28', createdAt: '2025-09-28 13:00', updatedAt: '2025-09-28 13:00'},
    {id: 5, description: 'Wifi bills', amount: 30, category: 'Bills', date: '2025-10-01', createdAt: '2025-10-01 20:00', updatedAt: '2025-10-01 20:00' },
    {id: 6, description: 'buying new clothes', amount: 100, category: 'shopping', date: '2025-10-01', createdAt: '2025-10-01 23:00', updatedAt: '2025-10-01 23:00'},
    {id: 7, description: 'drake concert tickets', amount: 150, category: 'entertainment', date: '2025-10-01', createdAt: '2025-10-01 23:40', updatedAt: '2025-10-01 23:50'},
    {id: 8, description: 'buying food groceries', amount: 20, category: 'Bills', date: '2025-10-2', createdAt: '2025-10-2 10:00', updatedAt: '2025-10-2 10:00'},
    {id: 9, description: 'donating to people', amount: 100, category: 'others', date: '2025-10-2', createdAt: '2025-10-2 12:00', updatedAt: '2025-10-2 13:00'},
    {id: 10, description: 'paying school tuition', amount: 500, category: 'tuition', date: '2025-10-3', createdAt: '2025-10-3 10:00', updatedAt: '2025-10-3 10:00'}, 
];


const State = {
    transactions: [],
    categories: ['Food', 'Books', 'Transport', 'Entertainment', 'tuition', 'bills','Others'],
    settings: {
        budgetCap: 1000,
        theme: 'light',
        exchangeRates: { USD: 1, EUR: 0.8, RWF: 1450 }
    },
    filters: { search: '', category: '', dateFrom: '', dateTo: '' },
    editingId: null,

    async init() {
        const stored = Storage.loadTransactions();
        const normalize = (r, existingIds = []) => {
            const idNum = typeof r.id === 'number' ? r.id : (parseInt(r.id, 10) || null);
            const description = r.description ?? r.title ?? '';
            const amount = r.amount !== undefined ? parseFloat(r.amount) : 0;
            const category = r.category ?? r.tag ?? 'Other';
            const date = r.date ?? (r.createdAt ? r.createdAt.split(' ')[0] : new Date().toISOString().split('T')[0]);
            const createdAt = r.createdAt ?? r.created_at ?? date;
            const updatedAt = r.updatedAt ?? r.updated_at ?? createdAt;
            const nextId = (Math.max(0, ...existingIds.filter(n=>typeof n==='number')) || 0) + 1;
            return { id: idNum || nextId, description, amount, category, date, createdAt, updatedAt };
        };

        if (stored && Array.isArray(stored)) {
            this.transactions = stored.map(r => normalize(r, stored.map(s => (typeof s.id === 'number' ? s.id : parseInt(s.id,10)||0))));
        } else {
            try {
                const resp = await fetch('seed.json');
                if (resp.ok) {
                    const data = await resp.json();
                    if (data && Array.isArray(data.transactions)) {
                        this.transactions = data.transactions.map((r, idx) => normalize(r, data.transactions.map(s => (typeof s.id === 'number' ? s.id : parseInt(s.id,10)||0))));
                    } else {
                        this.transactions = SEED_DATA.map(r => normalize(r, SEED_DATA.map(s => s.id)));
                    }
                } else {
                    this.transactions = SEED_DATA.map(r => normalize(r, SEED_DATA.map(s => s.id)));
                }
            } catch (e) {
                this.transactions = SEED_DATA.map(r => normalize(r, SEED_DATA.map(s => s.id)));
            }
        }
        
        const settingsStored = Storage.loadSettings();
        if (settingsStored) {
            this.settings = settingsStored;
        }
    },


    addTransaction(date, description, amount, category) {
        const newId = Math.max(...this.transactions.map(t => t.id), 0) + 1;
        const timestamp = new Date().toISOString();
        this.transactions.push({ 
            id: newId,
            description, 
            amount: parseFloat(amount),
            category, 
            date, 
            createdAt: timestamp,
            updatedAt: timestamp
        });
        Storage.saveTransactions(this.transactions);
    },

    updateTransaction(id, date, description, amount, category) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            const existing = this.transactions[index];
            const updatedAt = new Date().toISOString();
            this.transactions[index] = { 
                id, 
                date, 
                amount: parseFloat(amount), 
                category, 
                description,
                createdAt: existing.createdAt || existing.date || updatedAt,
                updatedAt
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
    const sum = filtered.reduce((acc, t) => acc + (parseFloat(t.amount) || 0), 0);
        
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