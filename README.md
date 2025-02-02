# SaaS Product Simulator

A minimal React/TypeScript dashboard for modeling key SaaS business metrics (churn, growth, pricing, marketing spend, and expansions). This simulator provides a simple way to visualize month-by-month revenue and user counts, along with interactive charts and analytics cards.

## Features

### 1. Interactive Parameter Controls
Adjust essential SaaS inputs in a popover form:
- Churn Rate (%)
- Growth Rate (%)
- Price per User ($)
- Marketing Spend
- Expansion Rate

### 2. Real-Time Analytics
- Line Chart showing monthly revenue (MRR) updates in real time
- Analytics Cards displaying final month MRR, total revenue, and user counts, each with trend indicators (up/down arrows)

### 3. Context-Based State Management
- The simulator parameters are stored in a shared React Context, ensuring changes are reflected instantly across charts and cards

### 4. Responsive UI
- Uses Next.js 14, Tailwind CSS, and Recharts for an accessible, modern dashboard experience
- Fits various screen sizes, with potential for easy theming or brand expansion

![Dashboard Screenshot](/public/dashboard-screenshot.png)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/saas-product-sim.git
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

### 1. Simulator Params & Context
- You define churn, growth, marketing, etc. in a React Context (simulator/context.tsx), so multiple components can access and update these values seamlessly

### 2. Business Logic
- simulate.ts contains a 12-month loop that calculates new users, expansions, and monthly MRR based on the inputs

### 3. Analytics Cards
- Show final month MRR, total revenue, user counts, and trends derived from the first vs. last month metrics

### 4. Line Chart
- Renders the mrr data in a Recharts `<LineChart>`, giving a visual timeline of revenue progression



## Project Structure
```
/app
  /components
    analytics-chart.tsx     // Line chart for monthly revenue
    analytics-card.tsx      // Reusable card component with trend indicators
    simulator-popover.tsx   // Popover form for adjusting churn/growth/etc.
    ...
  /simulator
    context.tsx             // Defines SimulatorParams & provides context
    simulate.ts             // Core monthly logic for user growth & MRR
  page.tsx                  // Main dashboard layout
  layout.tsx               // Next.js root layout
  ...
```

## Limitations & Future Ideas

### Simplified Formula
- Only handles a linear 12-month period with basic assumptions about churn/growth/marketing

### No Persistence
- Scenario settings reset on refresh

### Potential Enhancements
- Multiple scenario comparison
- Advanced charts
- Saving/loading user scenarios

## License & Credits
- This project is under the MIT License (change if needed)
- Built with Next.js, TypeScript, Tailwind CSS, Recharts, and Radix UI

---
