const Transactions = {
    render() {
        const container = document.getElementById('transactions');
        container.innerHTML = `
            <h2>Transactions</h2>
            <button onclick="openAddModal()" class="mt-1 mb-1">+ Add Transaction</button>

            <div class="search-container">
                <input type="text" id="searchInput" placeholder=" Search transactions..." oninput="handleSearch()">
                <div id="searchResults" class="search-results hidden"></div>
            </div>

            <div class="mt-1">
                <label>Filter by Category:</label>
                <select id="categoryFilter" onchange="handleCategoryFilter()">
                    <option value="">All Categories</option>
                </select>
            </div>

            <div class="mt-1">
                <label>Filter by Date Range:</label>
                <input type="date" id="dateFrom" onchange="handleDateFilter()"> to
                <input type="date" id="dateTo" onchange="handleDateFilter()">
            </div>

            <div class="mt-1 mb-1">
                <table id="transactionsTable">
                    <thead>
                        <tr>

                            <th>id</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>createdAt</th>
                            <th>updatedAt</th>
                                    <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="transactionsTableBody">
                    </tbody>
                </table>
            </div>
        `;

        UI.renderCategoryFilters();
        this.renderTable();
    },

    renderTable() {
        const filtered = State.getFilteredTransactions();
        const tbody = document.getElementById('transactionsTableBody');

        if (!tbody) return;

        tbody.innerHTML = filtered.map(t => `
            <tr>

                <td>${t.id}</td>
                <td>${t.date}</td>
                <td>${t.description}</td>
                <td>$${(t.amount || 0).toFixed(2)}</td>
                <td>${t.category}</td>
                <td>${t.createdAt}</td>
                <td>${t.updatedAt}</td>
                <td>
                    <button onclick="openEditModal(${t.id})" class="secondary" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Edit</button>
                    <button onclick="deleteTransaction(${t.id})" class="danger" style="padding: 0.4rem 0.8rem; font-size: 0.9rem;">Delete</button>
                </td>
            </tr>
        `).join('');

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No transactions found</td></tr>';
        }
    },

    handleSaveTransaction(e) {
        e.preventDefault();

        const date = document.getElementById('transDate').value;
        const description = document.getElementById('transDescription').value;
        const amountRaw = document.getElementById('transAmount').value;
        const amount = parseFloat(amountRaw);
        const category = document.getElementById('transCategory').value;
        const msgDiv = document.getElementById('validationMessage');

        const titleValidation = Validators.validateTitle(description);
        const amountValidation = Validators.validateAmount(amount);
        const dateValidation = Validators.validateDate(date);
        const categoryValidation = { isValid: !!category, message: 'Please select a category' };

        if (!titleValidation.isValid || !amountValidation.isValid || !dateValidation.isValid || !categoryValidation.isValid) {
            msgDiv.innerHTML = `<span class="text-danger">${titleValidation.message || amountValidation.message || dateValidation.message || categoryValidation.message}</span>`;
            return;
        }

        if (titleValidation.warning) {
            msgDiv.innerHTML = `<span class="text-warning">${titleValidation.message}</span>`;
        }

        const timestamp = new Date().toISOString();

        if (State.editingId) {
            State.updateTransaction(State.editingId, date, description, amount, category);
        } else {
            State.addTransaction(date, description, amount, category);
        }

        UI.closeModal();
        refreshUI();
    },

    deleteTransaction(id) {
        if (confirm('Delete this transaction?')) {
            State.deleteTransaction(id);
            refreshUI();
        }
    },

    handleSearch() {
        State.filters.search = document.getElementById('searchInput').value;
        const results = State.getFilteredTransactions();
        const resultsDiv = document.getElementById('searchResults');

        if (State.filters.search.trim() && results.length > 0) {
            resultsDiv.classList.remove('hidden');
            resultsDiv.textContent = `Found ${results.length} result(s)`;
        } else if (State.filters.search.trim()) {
            resultsDiv.classList.remove('hidden');
            resultsDiv.textContent = 'No results found';
        } else {
            resultsDiv.classList.add('hidden');
        }

        this.renderTable();
        Dashboard.renderStats();
        Dashboard.renderBudgetStatus();
    },

    handleCategoryFilter() {
        State.filters.category = document.getElementById('categoryFilter').value;
        this.renderTable();
        Dashboard.renderStats();
        Dashboard.renderBudgetStatus();
    },

    handleDateFilter() {
        State.filters.dateFrom = document.getElementById('dateFrom').value;
        State.filters.dateTo = document.getElementById('dateTo').value;
        this.renderTable();
        Dashboard.renderStats();
        Dashboard.renderBudgetStatus();
    },

    sortTable(field) {
        State.transactions.sort((a, b) => {
            if (field === 'date') {
                return new Date(b.date) - new Date(a.date);
            } else if (field === 'description') {
                return a.description.localeCompare(b.description);
            }
            return 0;
        });
        Storage.saveTransactions(State.transactions);
        this.renderTable();
    }
};