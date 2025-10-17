const About = {
    render() {
        const container = document.getElementById('about');
        
        const categoriesHTML = State.categories
            .map(cat => `<span style="background: var(--accent-alt); color: white; padding: 0.4rem 0.8rem; border-radius: 4px;">${cat}</span>`)
            .join('');

        container.innerHTML = `
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px;">
                <h2>About Financial Manager</h2>
                <p style="margin-top: 1rem; font-size: 1.1rem;">
                    A lightweight, offline-first financial tracking application built with vanilla JavaScript. 
                    All your financial data is stored locally on your device for maximum privacy and offline access.
                </p>

                <h3 style="margin-top: 2rem;"> Features</h3>
                <ul style="margin-left: 1.5rem; margin-top: 1rem;">
                    <li>✓ Add, edit, and delete transactions</li>
                    <li>✓ Real-time search and filtering</li>
                    <li>✓ Advanced filtering by category and date range</li>
                    <li>✓ Sort transactions by date or title</li>
                    <li>✓ Budget tracking with smart alerts</li>
                    <li>✓ Financial analytics and statistics</li>
                    <li>✓ 7-day spending trend visualization</li>
                    <li>✓ Dark mode / Light mode support</li>
                    <li>✓ Fully responsive design (mobile, tablet, desktop)</li>
                    <li>✓ Complete offline capability with LocalStorage</li>
                    <li>✓ Export/Import data as JSON</li>
                    <li>✓ Customizable categories and exchange rates</li>
                </ul>

                <h3 style="margin-top: 2rem;"> Default Categories</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;">
                    ${categoriesHTML}
                </div>
                <p style="margin-top: 1rem; color: var(--text-secondary);">
                    You can add custom categories in the Settings section.
                </p>

                <h3 style="margin-top: 2rem;"> Search Patterns</h3>
                <div style="background: var(--bg-primary); padding: 1rem; border-radius: 4px; margin-top: 1rem; font-family: monospace; font-size: 0.9rem;">
                    <p><strong>Cents Validation:</strong> /\.\d{2}\b/ - Validates 2 decimal places</p>
                    <p><strong>Beverage Detection:</strong> /(coffee|tea)/i - Auto-tags beverages</p>
                    <p><strong>Duplicate Words:</strong> /\b(\w+)\s+\ 1\b/ - Flags repeated words</p>
                </div>

                <h3 style="margin-top: 2rem;"> Currency & Rates</h3>
                <p style="margin-top: 1rem;">
                    Primary currency: <strong>USD</strong>
                </p>
                <p>Manual exchange rates can be configured in Settings:</p>
                <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>USD to EUR</li>
                    <li>USD to RWF (Rwandan Franc)</li>
                </ul>

                <h3 style="margin-top: 2rem;"> Statistics</h3>
                <p style="margin-top: 1rem;">Dashboard displays:</p>
                <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>Total number of transactions</li>
                    <li>Total amount spent</li>
                    <li>Top spending category</li>
                    <li>Average transaction amount</li>
                    <li>7-day spending trend chart</li>
                </ul>

                <h3 style="margin-top: 2rem;"> Privacy & Security</h3>
                <p style="margin-top: 1rem;">
                    ✓ All data stored locally in your browser<br>
                    ✓ No server transmission<br>
                    ✓ No tracking or analytics<br>
                    ✓ Works completely offline<br>
                    ✓ Export your data anytime
                </p>

                <h3 style="margin-top: 2rem;"> Responsive Design</h3>
                <p style="margin-top: 1rem;">
                    Optimized for all screen sizes:
                </p>
                <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li> Mobile (≥360px) - Compact, touch-friendly</li>
                    <li> Tablet (≥768px) - Balanced layout</li>
                    <li> Desktop (≥1024px) - Full featured view</li>
                </ul>

                <h3 style="margin-top: 2rem;"> Keyboard Shortcuts</h3>
                <ul style="margin-left: 1.5rem; margin-top: 1rem;">
                    <li><strong>ESC</strong> - Close modals</li>
                </ul>

                <h3 style="margin-top: 2rem;">❓ Help & Support</h3>
                <p style="margin-top: 1rem;">
                    <strong>Getting Started:</strong>
                </p>
                <ol style="margin-left: 1.5rem; margin-top: 0.5rem;">
                    <li>Go to Transactions tab and click "+ Add Transaction"</li>
                    <li>Fill in the date, title, amount, category, and optional notes</li>
                    <li>Click "Save Transaction"</li>
                    <li>View your statistics on the Dashboard</li>
                    <li>Manage your budget in Settings</li>
                </ol>

                <p style="margin-top: 2rem; color: var(--text-secondary); font-size: 0.9rem;">
                              | Version 1.0 | No external dependencies
                </p>
            </div>
        `;
    }
};