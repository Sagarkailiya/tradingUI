# 💹 FinancialWeb — Trading UI

A modern **trading dashboard** built with **React**, **Vite**, **Tailwind CSS**, and **Firebase Authentication**.  
It provides a sleek, responsive interface with watchlists, stock charts, order management, portfolio view, funds tracking, and user profile management.

---

## 🚀 Features

### 🔐 Firebase Authentication (Google Sign-In)
Secure sign-in and sign-out flow using **Firebase Auth** with **Google provider**.

### 📈 Real-Time Stock Watchlist
Displays mock and live **NSE/BSE stock data** using an external API, refreshed every 30 seconds.

### 📊 Interactive Charts
Beautiful and dynamic stock charts rendered via **Recharts** and **ApexCharts**.

### 💼 Orders & Portfolio Modules
Includes a simulated **order interface**, **portfolio overview**, and **positions** placeholder pages.

### 💰 Fund Dashboard
Equity & commodity overview with margin details and transaction summaries.

### 📱 Responsive Layout
- ✅ Mobile-first design  
- ✅ Adaptive sidebar and floating menu button for small screens

### 🔒 Persistent Auth Guard
Private routes via **React Router** — redirects unauthorized users to the **sign-in** page.

### 🔔 Toast Alerts
Clean success/error notification system using **react-hot-toast**.

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | **React 19 + Vite 7** |
| Styling | **Tailwind CSS 4** |
| Charts | **Recharts**, **ApexCharts** |
| Authentication | **Firebase Auth (Google Sign-In)** |
| Routing | **React Router 7** |
| Icons | **Lucide React**, **React Icons** |
| Alerts | **react-hot-toast** |
| Linting | **ESLint v9 (React Hooks config)** |

---

## 🏗️ Project Structure
Directory structure:
└── sagarkailiya-tradingui/
    ├── README.md
    ├── eslint.config.js
    ├── firebase.json
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── .firebaserc
    ├── src/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── firebase.js
    │   ├── index.css
    │   ├── main.jsx
    │   ├── components/
    │   │   ├── funds.jsx
    │   │   ├── bids/
    │   │   │   └── bids.jsx
    │   │   ├── funddashboard/
    │   │   │   └── funddashboard.jsx
    │   │   ├── holdings/
    │   │   │   └── holding.jsx
    │   │   ├── order/
    │   │   │   └── order.jsx
    │   │   ├── portfolio/
    │   │   │   └── portfolio.jsx
    │   │   ├── stockChart/
    │   │   │   └── stockchart.jsx
    │   │   ├── stockWatchlist/
    │   │   │   └── StockWatchlistSidebar.jsx
    │   │   ├── userdetail/
    │   │   │   └── userdetail.jsx
    │   │   └── watchlist/
    │   │       └── watchlist.jsx
    │   ├── layout/
    │   │   ├── footer.jsx
    │   │   ├── mainlayout.jsx
    │   │   └── navBar.jsx
    │   └── pages/
    │       ├── home.jsx
    │       ├── privateroute/
    │       │   └── privateroute.jsx
    │       ├── signin/
    │       │   └── signin.jsx
    │       └── signOut/
    │           └── signout.jsx
    └── .firebase/
        ├── hosting.LmZpcmViYXNlXHRyYWRpbmd1aS1iMmI0OFxob3N0aW5n.cache
        └── tradingui-b2b48/
            └── hosting/
                ├── index.html
                └── assets/
                    └── index-CLpl2Xgf.css



---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Sagarkailiya/tradingUI.git
cd tradingUI

2️⃣ Install dependencies
npm install

3️⃣ Run local development server
npm run dev

📸 Screens Overview

| Section                                  | Description                             |
| ---------------------------------------- | --------------------------------------- |
| **Sign-in Page**                         | Google authentication via Firebase      |
| **Dashboard**                            | Displays funds and margin details       |
| **Watchlist + Chart**                    | Real-time market snapshot with graphs   |
| **Orders / Holdings / Portfolio / Bids** | Interactive placeholders                |
| **User Page**                            | Profile details, logout, and quick menu |

🧠 Developer Notes

🛡️ Default authentication guarding via <PrivateRoute /> (see src/pages/privateroute)

💾 Uses localStorage token fallback for reliability

📊 Mock data ensures UI renders even if API requests fail

⚙️ Built with React Hooks, Context API, and Firebase modular SDK



❤️ Acknowledgements

👨‍💻 Created by Sagar Kailiya

🎨 Icons by Lucide

📈 Charts by Recharts and ApexCharts

☁️ Hosted via Firebase
