# Stellar Invoice Protocol (SIP) Dashboard

> A modern, decentralized invoicing solution built on the Stellar network.

Stellar Invoice Protocol (SIP) enables businesses and freelancers to issue, track, and settle invoices globally using Soroban smart contracts — complete with verifiable public payment proofs.

This repository contains the **Next.js 15 frontend dashboard**, featuring full TypeScript support, Tailwind CSS utility styling, and integrated wallet authentication via the Freighter extension.

---

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [Prerequisites](#-prerequisites)
- [Getting Started](#%EF%B8%8F-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Features

| Feature | Description |
|---|---|
| **Decentralized Auth** | Zero account creation required — connect instantly via your Stellar Freighter wallet. |
| **Invoice Management** | Track issued and received invoices with dynamic state management: `Created`, `PartiallyPaid`, `Paid`, `Overdue`, `Cancelled`. |
| **Soroban Integration** | Transparent smart contract transaction triggers, prepared directly on-chain for execution. |
| **Public Verification** | Share standalone public URLs so clients can verify payment statuses and cryptographic settlement proofs — no wallet connection required. |
| **Dark Mode Native** | Clean, modular, card-based interface optimized for both light and dark systems. |
| **Invoice Finder** | Search invoice metadata, filter by status or wallet role, sort results, and share the current dashboard view via URL. |

### 🔍 Invoice Finder

Connect a wallet and open `/dashboard` to use the finder:

- **Search** matches invoice IDs, issuer and payer addresses, currencies, and descriptions.
- **Filters & sorting** — non-default choices are stored in the URL, so a focused view can be bookmarked or shared with others.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) (v4 compatible) |
| Wallet Integration | [`@stellar/freighter-api`](https://www.npmjs.com/package/@stellar/freighter-api) |
| State Management | Custom React Context hooks |

---

## 📋 Prerequisites

Before setting up locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) — v18.17.0 or higher (v20+ recommended)
- [Freighter Wallet](https://www.freighter.app/) browser extension, configured for the Stellar **Testnet** or **Futurenet**

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/stellar-invoice-protocol-frontend.git
cd stellar-invoice-protocol-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables (if applicable)

If the project includes a `.env.example` file, copy it and fill in the required values:

```bash
cp .env.example .env.local
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open the app

Visit [http://localhost:3000](http://localhost:3000) in your browser, then connect your Freighter wallet to get started.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run the linter |

---

## 📁 Project Structure

```
stellar-invoice-protocol-frontend/
├── app/            # Next.js App Router pages and layouts
├── components/     # Reusable UI components
├── context/        # React Context providers (wallet, invoices)
├── lib/            # Utilities and Soroban/Stellar helpers
├── public/         # Static assets
└── ...
```

> Adjust this section to match the actual repository layout.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
