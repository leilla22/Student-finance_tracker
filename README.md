# Student Finance Tracker

A lightweight, vanilla JavaScript web application for tracking student expenses. Built without frameworks, this tracker emphasizes semantic HTML, responsive design, regex-powered validation and search, and accessibility best practices.

## Features

### Core Functionality
- **Dashboard/Stats**: View total expenses, category breakdown, and last 7-day spending trends
- **Records Management**: Add, edit, and delete expense transactions with automatic timestamps
- **Advanced Search**: Regex-based live search with highlighted matches and case-insensitive toggle
- **Smart Sorting**: Sort by date, description, or amount in ascending/descending order
- **Persistent Storage**: Auto-save all changes to localStorage with JSON import/export
- **Currency Support**: Base currency plus 2 alternate currencies with manual exchange rates (configurable in Settings)
- **Spending Cap**: Set a monthly budget cap with ARIA live alerts (polite/assertive messaging)

### Default Categories
Food, Books, Transport, Entertainment, Fees, Other (fully editable)

### Accessibility
- Keyboard-only navigation 
- Visible focus indicators on all interactive elements
- ARIA live regions for status updates and errors
- Adequate color contrast
- Skip-to-content link for quick navigation
- Properly labeled form inputs and tables

### Responsive Design
Mobile-first layout with breakpoints at ~360px, 768px, and 1024px. Works seamlessly on phones, tablets, and desktops.

### UI/UX Enhancements
- Smooth transitions and animations
- Inline record editing with confirmation dialogs
- Real-time validation feedback
- Clear error messages
- Toast-style notifications for actions

---

## Regex Patterns & Examples

All patterns include case-insensitive matching and are tested in `tests.html`.

| Pattern | Purpose | Example Match |
|---------|---------|---|
| `^\S(?:.*\S)? | Description (no leading/trailing spaces, collapse doubles) | "Lunch at cafeteria" |
| `^(0\|[1-9]\d*)(\.\d{1,2})? | Amount (numeric, up to 2 decimals) | "12.50", "100" |
| `^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01]) | Date (YYYY-MM-DD) | "2025-09-29" |
| `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Category/Tag (letters, spaces, hyphens) | "Transport", "Gift-Money" |
| `/\.\d{2}\b/` | Cents present (advanced) | Finds ".50", ".99" in amounts |
| `/(coffee\|tea)/i` | Beverage keyword (advanced) | Matches "coffee", "Coffee", "TEA" |
| `/\b(\w+)\s+\1\b/` | Duplicate words (back-reference) | Catches "the the", "food food" |


---

## Keyboard Navigation Map

| Key | Action |
|-----|--------|
| `Tab` | Move between form fields, buttons, and table rows |
| `Shift + Tab` | Move backward through focusable elements |
| `Enter` | Submit form, open edit modal, or activate button |
| `Escape` | Close modals or cancel editing |
| `Space` | Toggle checkbox (if present), activate button when focused |
| `↑ / ↓` | Navigate table rows (optional enhancement) |
| `Ctrl + S` | Trigger export (if implemented) |
| `Alt + Skip` | Jump to main content (skip-to-content link) |


---

## Accessibility Notes

### Implementation Details
- **Semantic Markup**: All sections use proper `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` tags
- **Form Labels**: Every input has an associated `<label>` with a `for` attribute
- **ARIA Attributes**: 
  - `role="status"` for transient messages (amount limits exceeded)
  - `aria-live="polite"` for budget status under limit
  - `aria-live="assertive"` for overage alerts
  - `aria-label` for icon-only buttons
- **Focus Management**: Focus trapped in modals; returns to trigger button on close
- **Color Contrast**: All text meets WCAG AA standards (4.5:1 for normal text)
- **Responsive Text**: Minimum 16px font size on mobile; scales appropriately
- **Error Announcements**: Validation errors read aloud and displayed near inputs
- **Skip Link**: Visible on focus, allows keyboard users to bypass navigation

---



## File Structure

```
├── index.html
├── tests.html
├── README.md
├── seed.json
│
├── styles/
│   ├── main.css
│   ├── responsive.css
│   └── theme.css
│
└── scripts/
    ├── about.js
    ├── app.js
    ├── dashboard.js
    ├── search.js
    ├── settings.js
    ├── state.js
    ├── storage.js
    ├── transaction.js
    ├── ui.js
    └── validators.js
```

---

## Getting Started

### Installation
1. Clone the repository
2. Open `index.html` in a modern browser
3. No build step or dependencies required

### Loading Sample Data
1. Click **Settings** → **Import Data**
2. Select the provided `seed.json` file or paste JSON manually
3. Records validate before import; errors display clearly

### Running Tests
Open `tests.html` in your browser to verify all regex patterns and validation rules.

---

## Usage

### Add an Expense
1. Click **Add Record** (or **+** button)
2. Fill in description, amount, category, and date
3. Real-time validation provides feedback
4. Click **Save** — record appears in table and stats update instantly

### Search & Filter
1. Type a regex pattern in the search bar (e.g., `coffee|tea`, `\.50\b`)
2. Toggle **Case Sensitive** if needed
3. Matching descriptions highlight in real-time
4. Invalid regex patterns show a gentle error message

### Sort Records
- Click column headers to sort by date, description, or amount
- Click again to reverse sort order (A↔Z, ↑↓)

### Edit a Record
1. Click **Edit** on any row
2. Update fields in the modal
3. Click **Save** — record updates with new `updatedAt` timestamp

### Delete a Record
1. Click **Delete** on any row
2. Confirm in the dialog
3. Record removed; stats and localStorage update immediately

### Set Budget & Currency
1. Go to **Settings**
2. Set monthly spending cap
3. Add exchange rates for alternative currencies
4. Changes save automatically

---

## Import/Export

### Export Data
1. Click **Settings** → **Export Data**
2. Browser downloads `finance-tracker-backup.json`
3. Share or back up securely

### Import Data
1. Click **Settings** → **Import Data**
2. Select a JSON file (validates structure)
3. Successful import appends records; duplicates by ID are skipped
4. Confirmation message displays record count

### JSON Format
Must follow the data model above. Missing required fields or invalid types trigger clear error messages.

---

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 13+)
- IE 11: Not supported (uses modern ES6+ features)

---

## Technologies Used

- **HTML5**: Semantic markup, form validation
- **CSS3**: Flexbox, media queries, transitions, animations
- **Vanilla JavaScript (ES6+)**: Modular architecture (IIFE or ES modules), no frameworks
- **localStorage API**: Persistent data storage
- **RegExp**: Pattern matching and validation

---

## Performance & Accessibility Audits

- **Lighthouse**: Score 90+ on Accessibility, Performance, and Best Practices
- **WAVE Tool**: No errors or contrast violations
- **Keyboard Testing**: Full navigation without mouse
- **Screen Reader**: Tested with NVDA (Windows) and VoiceOver (macOS)

---

## Known Limitations & Future Enhancements

### Current Limitations
- Exchange rates updated manually (no live API)
- No recurring transaction templates
- Offline mode relies on browser cache only

### Possible Stretch Features
- Service worker for true offline-first experience
- Light/Dark theme toggle (persisted)
- CSV export with proper escaping
- Mini jQuery scraping page for parsing HTML expense receipts
- Spending category charts (Chart.js or D3)
- Monthly reports and projections

---

## Deployment

This app is deployed on **GitHub Pages**:
- [Live Demo](https://YOUR-USERNAME.github/.io/student-finance-tracker)
- Push to `gh-pages` branch or enable Pages in repository settings

---

## Demo Video

Watch the full feature walkthrough (keyboard navigation, regex search, import/export):
- [Unlisted Demo Video](https://www.youtube.com/watch?v=YOUR-VIDEO-ID)

*2–3 minute video showing:*
- Keyboard-only navigation
- Regex pattern edge cases (duplicate words, beverage search)
- Import/export workflow
- Responsive behavior on mobile

---


## License

This project is for educational purposes. Feel free to fork and adapt for your own learning.

---

## Contact

**Author**: Imanzi leilla  


---

**Last Updated**: October 2025
