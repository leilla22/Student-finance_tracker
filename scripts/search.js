const Search = {

    searchTransactions(term, transactions) {
        if (!term.trim()) return transactions;
        const lower = term.toLowerCase();
        return transactions.filter(t => 
            t.title.toLowerCase().includes(lower) ||
            t.category.toLowerCase().includes(lower) ||
            t.amount.toString().includes(lower) ||
            t.notes.toLowerCase().includes(lower)
        );
    },


    filterByCategory(category, transactions) {
        if (!category) return transactions;
        return transactions.filter(t => t.category === category);
    },


    filterByDateRange(from, to, transactions) {
        return transactions.filter(t => {
            if (from && t.date < from) return false;
            if (to && t.date > to) return false;
            return true;
        });
    },

    
    combineFilters(filters, transactions) {
        let result = [...transactions];
        result = this.searchTransactions(filters.search || '', result);
        result = this.filterByCategory(filters.category || '', result);
        result = this.filterByDateRange(filters.dateFrom || '', filters.dateTo || '', result);
        return result;
    }
};