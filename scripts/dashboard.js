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
            <div id="trendChart"></div>
        `;
        
        this.renderStats();
        this.renderBudgetStatus();
        this.renderRecentTransactions();
        this.renderTrendChart();
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
        const cap = State.settings.budgetCap;
        const percentage = Math.min((spent / cap) * 100, 100);
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
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    ${recent.map(t => `
                        <tr>
                            <td>${t.date}</td>
                            <td>${t.title}</td>
                            <td>$${t.amount.toFixed(2)}</td>
                            <td>${t.category}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    renderTrendChart() {
        const stats = State.getStats();
        const sevenDayStats = {};
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
                .toISOString().split('T')[0];
            sevenDayStats[date] = 0;
        }
        
        stats.sevenDayTransactions.forEach(t => {
            sevenDayStats[t.date] = (sevenDayStats[t.date] || 0) + t.amount;
        });

        const maxAmount = Math.max(...Object.values(sevenDayStats), 1);
        const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        const chartHTML = `
            <h3 style="margin-top: 2rem;">7-Day Spending Trend</h3>
            <div style="display: flex; gap: 0.5rem; align-items: flex-end; height: 150px; margin-top: 1rem;">
                ${Object.entries(sevenDayStats).map(([date, amount]) => {
                    const height = (amount / maxAmount) * 100;
                    const dateObj = new Date(date);
                    const dayLabel = dayLabels[dateObj.getDay()];
                    return `
                        <div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                            <div style="background: var(--accent-color); width: 100%; height: ${height}%; border-radius: 4px 4px 0 0; position: relative;">
                                <span style="position: absolute; top: -20px; width: 100%; text-align: center; font-size: 0.8rem;">$${amount.toFixed(0)}</span>
                            </div>
                            <small style="margin-top: 0.5rem;">${dayLabel}</small>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        const container = document.getElementById('trendChart');
        if (container) {
            container.innerHTML = chartHTML;
        }
    }
};