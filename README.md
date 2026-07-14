# Stellar Invoice Protocol (SIP) Dashboard

Stellar Invoice Protocol (SIP) is a modern, decentralized invoicing solution built on the Stellar network. It enables businesses and freelancers to issue, track, and settle invoices globally using Soroban smart contracts, complete with verifiable public payment proofs.

This repository contains the Next.js 15 frontend dashboard, featuring full TypeScript support, Tailwind CSS utility styling, and integrated wallet authentication via the Freighter extension.

---

## 🚀 Features

- **Decentralized Auth:** Zero-account creation required. Connect instantly via your Stellar Freighter wallet.
- **Invoice Management:** Track issued and received invoices with dynamic state management (`Created`, `PartiallyPaid`, `Paid`, `Overdue`, `Cancelled`).
- **Soroban Integration:** Transparent smart contract transaction triggers prepared directly on-chain for execution.
- **Public Verification:** Share standalone public URLs with clients to verify payment statuses and cryptographic settlement proofs without requiring wallet connection.
- **Dark Mode Native:** Clean, modular, card-based interface optimized for both light and dark systems.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4 compatible)
- **Wallet Integration:** `@stellar/freighter-api`
- **State Management:** Custom React Context hooks

---

## 📋 Prerequisites

Before setting up locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.17.0 or higher, v20+ recommended)
- [Freighter Wallet Browser Extension](https://www.freighter.app/) configured for the Stellar Testnet/Futurenet.

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/stellar-invoice-protocol-frontend.git](https://github.com/your-username/stellar-invoice-protocol-frontend.git)
cd stellar-invoice-protocol-frontend