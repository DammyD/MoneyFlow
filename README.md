# MoneyFlow

MoneyFlow is a financial planning web application that helps users intentionally divide their income into structured financial pockets such as savings, investments, emergency funds, bills, and lifestyle spending.

The goal is to provide users with financial clarity before spending begins.

---

## Features

### Phase 1 Features

- Income input
- Financial mode selection
- Automatic allocation generation
- Dashboard overview
- Editable percentage allocations
- Responsive modern UI

---

## Financial Modes

### Survival Mode
Focused on financial stability and emergency preparedness.

### Growth Mode
Focused on balanced savings and wealth building.

### Soft Life Mode
Focused on lifestyle flexibility while maintaining financial structure.

---

## User Flow

1. User signs up or logs in
2. User enters monthly income
3. User selects a financial mode
4. User clicks **"Generate Plan"**
5. MoneyFlow generates a structured financial allocation dashboard

---

## Tech Stack

### Frontend
- Next.js
-TypeScript.tsx
- Tailwind CSS
- Framer Motion
- Recharts

### Optional Backend
- Next.js API Routes
- Node.js

---

## Installation

Clone the repository:

```bash
git clone https://github.com/DammyD/MoneyFlow.git
```

Navigate into the project:

```bash
cd moneyflow
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## Project Structure

```bash
/app
/components
/lib
/styles
/public
```

---

## Core Pages

### Public Pages
- Landing Page
- Why It Matters
- How It Works
- Features
- Login
- Signup

### App Pages
- Setup Page
- Dashboard / My Plan

---

## Allocation Logic Example

```js
const growthMode = {
  bills: 40,
  savings: 20,
  investments: 20,
  emergency: 10,
  flex: 10,
};
```

---

## MVP Scope

This project currently focuses only on Phase 1:

- Financial allocation setup
- Visualization
- Structured planning

Advanced financial features will be added in future phases.

---

## Vision

MoneyFlow is designed to help users:

- Gain financial clarity
- Reduce impulsive spending
- Build intentional money habits
- Create structured financial plans

---

## Status

> **Phase 1 MVP — In Development**

---

## Authors
- Blessing Dawodu
- Favour Osayuwamen
- David Jonathan