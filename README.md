# SaaS Role-Allocation Simulator

A turn-based React/TypeScript dashboard for modeling core SaaS metrics (churn, growth, marketing spend, expansions) plus new role allocations for your 20-person team (New Business, Account Management, and Support). This "management sim" approach offers monthly decisions, random variation, and final summary stats—ideal for showcasing front-end, performance, and accessibility fundamentals.

## Features

### 1. Turn-Based Role Allocation
- Each month, allocate 20 employees among New Business, Account Management, and Support.
- Press "Next Month" to simulate changes (user count, churn, MRR, etc.).

### 2. Monthly Dashboards & Overlays
- Intro Overlay: Brief tutorial on roles.
- End Screen: Final stats after 24 months (or your chosen timeframe).

### 3. Real-Time Analytics
- Line Chart shows monthly MRR and user count changes.
- Analytics Cards show month-to-month trends (e.g., MRR diff, user diff, churn rate).

### 4. Random Variation
- ±5% fluctuation each month to churn or expansions, adding unpredictability and replay value.

### 5. Responsive & Accessible
- Built with Next.js 14 and Tailwind CSS, with basic ARIA roles on dialogs and form fields.

## Screenshots

![Welcome Dialog](/public/dashboard-welcome.png)
![Allocation Selection Dialog](/public/dashboard-allocate.png)
![Dashboard Screenshot](/public/dashboard-midgame.png)
![Dashboard Screenshot](/public/dashboard-end.png)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/iamwallam/saas-product-sim.git
cd saas-product-sim
```

### 2. Install Dependencies
```bash
npm install
```
or
```bash
yarn install
```

### 3. Run the Dev Server
```bash
npm run dev
```
- App will be available at http://localhost:3000 (by default)

### 4. Build & Production
```bash
npm run build
npm run start
```
- Creates a production build and starts the server

## How It Works

### Role Allocations & Logic
- You have 20 total employees to distribute among:
  - New Business: Each rep acquires +5 new customers/month.
  - Account Management: Increases revenue expansions by a % each month.
  - Support: Reduces churn by a base amount for each support member.
- Marketing Spend & baseline churn/growth can still be configured if desired.
- Each turn (month), the simulation calculates:
  - New user count (previous month's users – churn + new biz signups).
  - MRR (baseline revenue + expansions).
  - Adjusts for random fluctuations (±5%) in churn or expansions.

### Game Flow (Intro & End Screens)
- Intro Overlay: Explains roles and the objective (maximize MRR by month 24). Closes when you click "Start Simulation."
- Month-to-Month: You open a popover to adjust your staff roles each month, then click "Next Month."
- End Screen: At Month 24, an overlay shows final MRR, total revenue (cumulative MRR), final user count, and churn. "Play Again" resets everything.

### Business Logic & Randomness
- simulateMonth() in simulate.ts:
  - Reads the current roles from SimulatorParams.
  - Applies formulas for churn, expansions, and new acquisitions.
  - Generates a small random factor each month (e.g. (Math.random() - 0.5) / 10) to vary churn/growth ±5%.
  - Stores results in a history array for charting & analytics.

## Tech Stack
- Next.js 14 / React: Routing, server rendering, hooks-based components.
- TypeScript: Strict typing for business logic, ensuring reliability and clarity.
- Tailwind CSS: Utility-first styling for quick, responsive layouts.
- Recharts: Data visualization for the monthly MRR / user charts.
- Radix UI (optional): Accessible dialog components for overlays.

## Project Structure
```
/app
  /components
    analytics-card.tsx                  // Reusable card with trend indicators
    analytics-chart.tsx                 // Recharts line chart for MRR/users
    app-sidebar.tsx                     // Main navigation sidebar
    data-table.tsx                      // Monthly metrics table
    date-picker.tsx                     // Date range selector
    end-dialog.tsx                      // Final results overlay
    intro-dialog.tsx                    // Welcome & rules overlay
    simulated-analytics-cards.tsx       // Analytics card grid
    simulator-dialog.tsx                // Team allocation controls
    ...
  /simulator
    context.tsx                         // Global state & simulator params
    simulate.ts                         // Core monthly simulation logic
dashboard.tsx                           // Main dashboard layout
layout.tsx                              // Next.js root layout
    ...
```

## Accessibility & Responsiveness
- Dialogs: Each modal uses DialogTitle, DialogDescription, and handles tab focus. ARIA labels are in place for form fields.
- Responsive Layout: Tailwind breakpoints ensure a mobile-friendly view.
- WCAG Compliant Color Contrast
- Future: A more thorough pass with real-device testing and Lighthouse audits

## Limitations & Future Ideas
1. Visual Polish: Could be refined to look more like a production SaaS dashboard
2. In-Depth Account Management: Currently, expansions are simplified
3. Random Events: Add monthly event cards that affect churn or expansions
4. Persistence: Save or share scenarios via localStorage or an API
5. Advanced A11y: Provide textual equivalents for charts

## License & Credits
- License: MIT (Update as needed)
- Built With: Next.js, TypeScript, Tailwind CSS, Recharts, and an accessible UI library

	Note: This project is a work in progress—about 70-80% feature-complete. It demonstrates turn-based SaaS simulation logic, front-end fundamentals, and partial accessibility measures, but further polish is recommended before a public portfolio launch.

## Thank You!

Enjoy exploring (or extending) this SaaS Role-Allocation Simulator. Feel free to open an issue or submit a pull request if you have improvements or suggestions.