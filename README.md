💹 FinancialWeb — Trading UI

A modern trading dashboard built with React, Vite, Tailwind CSS, and Firebase Authentication.
It provides a sleek, responsive interface including watchlists, stock charts, order management, portfolio view, funds tracking, and user profile management.

🚀 Features

Firebase Authentication (Google Sign‑In)
Secure sign‑in and sign‑out flow using Firebase Auth with Google provider.

Real‑Time Stock Watchlist
Displays mock and live NSE/BSE stock data using an external API, refreshed every 30 seconds.

Interactive Charts
Beautiful stock charts rendered via Recharts and ApexCharts.

Orders & Portfolio Modules
Simulated order interface, portfolio overview, and positions placeholder pages.

Fund Dashboard
Equity & commodity overview with margin details and transaction summaries.

Responsive Layout
❖ Mobile‑first
❖ Adaptive sidebar and floating menu button for small screens.

Persistent Auth Guard
Private routes via React Router; redirects unauthorized users to the sign‑in page.

Toast Alerts
Clean success/error notification system using react‑hot‑toast.

🧩 Tech Stack

Category    	Technology
Framework        	 React 19 + Vite 7
Styling     	     TailwindCSS 4
Charts      	     Recharts and ApexCharts
Authentication	   Firebase Auth
Routing          	 React Router 7
Icons	             Lucide React + React Icons
Alerts             react‑hot‑toast
Linting	           ESLint v9 (recommended rules + React Hooks config)

🏗️ Project Structure

sagarkailiya-tradingui/
│
├── src/
│   ├── components/       → Reusable UI components
│   ├── layout/           → NavBar, Footer, and Main Layout
│   ├── pages/            → App pages (Home, Sign‑in, Protected views)
│   ├── firebase.js       → Firebase initialization
│   ├── App.jsx           → Routing and authentication logic
│   └── main.jsx          → Application entry point
│
├── public/
├── package.json
├── vite.config.js
├── firebase.json
├── .firebaserc
└── README.md

⚙️ Setup & Installation

1.Clone repository

git clone https://github.com/yourusername/financialweb.git
cd financialweb

2.Install dependencies

npm install

3.Run local development server
npm run dev

📸 Screens Overview

Sign‑in Page — Google authentication.
Dashboard — Shows funds and margin details.
Watchlist + Chart — Real‑time market snapshot and graph.
Orders, Holdings, Portfolio, Bids — Interactive placeholders.
User Page — Profile, logout, and quick menu.
Each section is highly readable, Tailwind‑styled, and oriented for future integration with live brokerage APIs.


🧠 Developer Notes

Default auth guarding implemented via <PrivateRoute /> (see src/pages/privateroute).
Uses localStorage token fallback for reliability.
Mock data ensures UI renders even if API requests fail.


❤️ Acknowledgements
Created by Sagar Kailiya
Icons by Lucide
Charts by Recharts and ApexCharts
Hosted via Firebase


