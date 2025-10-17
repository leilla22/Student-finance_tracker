const Dashboard = {
    
    render() {
        const container = document.getElementById('dashboard');
        container.innerHTML = `
            <h2>Dashboard</h2>
            <div id="statsContainer" class="stats-grid"></div>
            <div class="budget-widget">
                <h3>Monthly Budget</h3>
                <div id="budgetStatus"></div>
            </div>
            <h3>Recent Transactions</h3>
            <div id="recentTransactions"></div>
        `;
        
        this.renderStats();
        this.renderBudgetStatus();
        this.renderRecentTransactions();
        // 7-day trend chart removed per request
    },

    
    renderStats() {
        const stats = State.getStats();
        const container = document.getElementById('statsContainer');
        
        container.innerHTML = `
            <div class="stat-card">
                <h3>Total Records</h3>
                <div class="stat-value">${stats.total}</div>
            </div>
            <div class="stat-card">
                <h3>Total Spent</h3>
                <div class="stat-value">$${stats.sum}</div>
            </div>
            <div class="stat-card">
                <h3>Top Category</h3>
                <div class="stat-value">${stats.topCategory}</div>
                <small>$${stats.topCategoryAmount}</small>
            </div>
            <div class="stat-card">
                <h3>Average Transaction</h3>
                <div class="stat-value">$${stats.average}</div>
            </div>
        `;
    },


    renderBudgetStatus() {
        const stats = State.getStats();
        const spent = parseFloat(stats.sum);
        // Use budgetCap as canonical setting name (fall back to budgetLimit for compatibility)
        const cap = parseFloat(State.settings.budgetCap ?? State.settings.budgetLimit ?? 1000);
        const percentage = cap > 0 ? Math.min((spent / cap) * 100, 100) : 0;
        const remaining = cap - spent;
        const isOver = spent > cap;

        const budgetHTML = `
            <p>Spent: <strong>$${spent.toFixed(2)}</strong> / Cap: <strong>$${cap.toFixed(2)}</strong></p>
            <div class="budget-bar">
                <div class="budget-fill ${isOver ? 'warning' : ''}" style="width: ${percentage}%"></div>
            </div>
            <div class="budget-alert ${isOver ? 'danger' : 'safe'}">
                ${isOver ? `⚠️ Over budget by $${Math.abs(remaining).toFixed(2)}` : `✓ $${remaining.toFixed(2)} remaining`}
            </div>
        `;
        
        const container = document.getElementById('budgetStatus');
        if (container) {
            container.innerHTML = budgetHTML;
        }
        
        UI.updateBudgetAlert();
    },

    renderRecentTransactions() {
        const recent = [...State.transactions]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        const container = document.getElementById('recentTransactions');
        if (!container) return;
        
        container.innerHTML = `
            <table style="margin-top: 1rem;">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    ${recent.map(t => `
                        <tr>
                            <td>${t.date}</td>
                            <td>${t.description}</td>
                            <td>$${t.amount.toFixed(2)}</td>
                            <td>${t.category}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    // renderTrendChart intentionally removed
};