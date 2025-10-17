const UI = {
    
    renderNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(e.target.dataset.section).classList.add('active');
            });
        });
    },

    
    renderCategoryFilters() {
        const select = document.getElementById('categoryFilter');
        if (select) {
            select.innerHTML = '<option value="">All Categories</option>' + 
                State.categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
        }
        
        const transSelect = document.getElementById('transCategory');
        if (transSelect) {
            transSelect.innerHTML = State.categories.map(cat => 
                `<option value="${cat}">${cat}</option>`
            ).join('');
        }
    },

    openAddModal() {
        State.editingId = null;
        document.getElementById('modaldescription').textContent = 'Add Transaction';
        document.getElementById('transDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('transdescription').value = '';
        document.getElementById('transAmount').value = '';
        document.getElementById('transCategory').value = State.categories[0];
        document.getElementById('validationMessage').innerHTML = '';
        document.getElementById('transactionModal').classList.add('active');
    },

    
    openEditModal(id) {
        const trans = State.transactions.find(t => t.id === id);
        if (!trans) return;
        
        State.editingId = id;
        document.getElementById('modaldescription').textContent = 'Edit Transaction';
        document.getElementById('transDate').value = trans.date;
        document.getElementById('transdescription').value = trans.description;
        document.getElementById('transAmount').value = trans.amount;
        document.getElementById('transCategory').value = trans.category;
        document.getElementById('validationMessage').innerHTML = '';
        document.getElementById('transactionModal').classList.add('active');
    },

    
    closeModal() {
        document.getElementById('transactionModal').classList.remove('active');
        State.editingId = null;
    },

    
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        State.settings.theme = theme;
        Storage.saveSettings(State.settings);
    },

    
    loadTheme() {
        if (State.settings.theme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    },

    
    updateBudgetAlert() {
        const stats = State.getStats();
        const spent = parseFloat(stats.sum);
        const cap = State.settings.budgetCap;
        const remaining = cap - spent;
        const alertDiv = document.getElementById('budgetAlert');
        const isOver = spent > cap;

        if (isOver) {
            alertDiv.setAttribute('aria-live', 'assertive');
            alertDiv.textContent = ` Alert: Budget exceeded by $${Math.abs(remaining).toFixed(2)}`;
        } else {
            alertDiv.setAttribute('aria-live', 'polite');
            alertDiv.textContent = ` Budget on track: $${remaining.toFixed(2)} remaining`;
        }
    }
};