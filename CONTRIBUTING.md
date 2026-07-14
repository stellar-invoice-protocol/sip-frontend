# Contributing to Stellar Invoice Protocol (SIP)

Thank you for your interest in contributing! Whether you're fixing a UI bug, optimizing Soroban contract interactions, or improving documentation, your contributions help make decentralized invoicing accessible to everyone.

This guide covers everything you need to know to contribute effectively — from local setup to submitting your first pull request.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [What We're Looking For](#what-were-looking-for)
- [Local Development Setup](#local-development-setup)
- [Project Architecture](#project-architecture)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Getting Help](#getting-help)

---

## 🤝 Code of Conduct

This project adheres to a standard of respectful, constructive collaboration. Please be kind to fellow contributors, provide actionable feedback in reviews, and assume good intent. Harassment or toxic behavior will not be tolerated.

---

## 🎯 What We're Looking For

We welcome contributions in these areas:

| Type | Examples |
|------|----------|
| **🐛 Bug Fixes** | UI glitches, transaction failures, wallet connection issues |
| **✨ Features** | New invoice statuses, export formats, multi-currency support |
| **⚡ Performance** | Optimizing Soroban contract calls, reducing bundle size |
| **📚 Documentation** | README improvements, code comments, usage examples |
| **🧪 Testing** | Unit tests for `lib/`, integration tests for contract flows |

**Before starting major work**, open an issue to discuss your approach. This avoids duplicate effort and ensures alignment with project goals.

---

## 💻 Local Development Setup

### Prerequisites

- **Node.js** `>= 18.17.0` (LTS recommended)
- **npm** `>= 9.0.0`
- **Git**

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/sip.git
cd sip
```

### 2. Install Dependencies

We use a strict lockfile to ensure reproducible builds:

```bash
npm install
```

> ⚠️ Do not use `yarn` or `pnpm` — our CI/CD pipeline expects `package-lock.json`.

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_STELLAR_NETWORK` | Stellar network to target | `testnet` |
| `NEXT_PUBLIC_SOROBAN_RPC_URL` | Soroban RPC endpoint | `https://soroban-testnet.stellar.org` |
| `NEXT_PUBLIC_CONTRACT_ID` | Deployed SIP contract ID | `C...` |

> 🔒 Never commit `.env.local` or any file containing secrets.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## 🏗️ Project Architecture

Understanding the codebase structure helps you contribute in the right places:

```
sip/
├── app/                    # Next.js App Router
│   ├── (routes)/           # Page components
│   ├── layout.tsx          # Root layout with providers
│   └── globals.css         # Global Tailwind styles
├── components/             # Reusable React components
│   ├── InvoiceTable.tsx    # Invoice list view
│   ├── StatusBadge.tsx     # Invoice status indicators
│   ├── WalletStatus.tsx    # Freighter wallet connector
│   └── SectionHead.tsx     # Page section headers
├── lib/                    # Core utilities & hooks
│   ├── api.ts              # Soroban contract interactions
│   ├── freighter.ts        # Freighter wallet integration
│   └── useWallet.ts        # Wallet state management hook
├── types/                  # TypeScript definitions
│   └── invoice.ts          # Invoice domain types
├── public/                 # Static assets
├── tests/                  # Test suites
└── package.json
```

### Key Technologies

- **Next.js 14+** — App Router, Server Components
- **TypeScript** — Strict type checking
- **Tailwind CSS** — Utility-first styling
- **Stellar SDK** — Blockchain interactions
- **Freighter API** — Browser wallet integration

---

## 🔄 Development Workflow

### Branch Naming

Use descriptive branch names with type prefixes:

```bash
# Bug fix
git checkout -b fix/invoice-status-update

# New feature
git checkout -b feat/pdf-export

# Documentation
git checkout -b docs/api-examples

# Performance
git checkout -b perf/reduce-bundle-size
```

### Making Changes

1. **Create a branch** from `main` (see naming above)
2. **Write code** following our [Coding Standards](#coding-standards)
3. **Add tests** for new functionality
4. **Run the test suite** locally before pushing
5. **Update documentation** if your changes affect usage

---

## 📝 Coding Standards

### TypeScript

- Enable **strict mode** — no `any` types without explicit justification
- Define interfaces in `types/` for all domain objects
- Use explicit return types on exported functions

```typescript
// ✅ Good
export interface Invoice {
  id: string;
  amount: string; // Use string for Stellar amounts to avoid floating-point issues
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  createdAt: number;
}

// ❌ Avoid
export type Invoice = any;
```

### React Components

- Use **Server Components** by default; add `'use client'` only when necessary
- Keep components focused — one component, one responsibility
- Use Tailwind for styling; avoid inline styles

```tsx
// ✅ Good
import { StatusBadge } from '@/components/StatusBadge';

export function InvoiceRow({ invoice }: { invoice: Invoice }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3">{invoice.id}</td>
      <td className="px-4 py-3">
        <StatusBadge status={invoice.status} />
      </td>
    </tr>
  );
}
```

### Stellar/Soroban Patterns

- Always handle transaction submission failures gracefully
- Use `try-catch` with specific error types from `@stellar/stellar-sdk`
- Validate contract responses before state updates

```typescript
// ✅ Good
try {
  const result = await contract.submitTransaction(tx);
  if (!result.success) {
    throw new Error(`Transaction failed: ${result.error}`);
  }
  return result;
} catch (error) {
  if (error instanceof SorobanError) {
    console.error('Soroban error:', error.message);
    throw new AppError('Transaction failed. Please try again.');
  }
  throw error;
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Writing Tests

- Place unit tests alongside source files (`*.test.ts`) or in `tests/`
- Test contract interactions with mocked Stellar SDK responses
- Use React Testing Library for component tests

```typescript
// lib/api.test.ts
import { describe, it, expect, vi } from 'vitest';
import { getInvoice } from './api';

describe('getInvoice', () => {
  it('returns invoice data for valid ID', async () => {
    const mockResponse = { id: 'inv-1', amount: '100', status: 'pending' };
    vi.mocked(contract.getInvoice).mockResolvedValue(mockResponse);

    const result = await getInvoice('inv-1');
    expect(result).toEqual(mockResponse);
  });
});
```

---

## 💬 Commit Guidelines

We follow **Conventional Commits** to generate changelogs automatically:

```bash
# Format: <type>(<scope>): <description>
# Example:
git commit -m "feat(invoice): add PDF export functionality"

# Types:
#   feat     — New feature
#   fix      — Bug fix
#   docs     — Documentation only
#   style    — Code style (formatting, semicolons, etc.)
#   refactor — Code change that neither fixes a bug nor adds a feature
#   perf     — Performance improvement
#   test     — Adding or correcting tests
#   chore    — Build process or auxiliary tool changes
```

### Commit Message Tips

- Use present tense: "Add feature" not "Added feature"
- Be specific: "Fix status badge color" not "Fix bug"
- Reference issues: `Fixes #123` or `Relates to #456`

---

## 🚀 Pull Request Process

1. **Ensure your branch is up to date** with `main`:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run quality checks** locally:
   ```bash
   npm run lint        # ESLint
   npm run typecheck   # TypeScript
   npm test            # Test suite
   ```

3. **Push your branch** and open a Pull Request on GitHub

4. **Fill out the PR template** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Link to related issue(s)

5. **Request review** from maintainers

6. **Address feedback** promptly — we aim to merge within 48 hours of approval

### PR Checklist

- [ ] Branch is up to date with `main`
- [ ] All CI checks pass
- [ ] Tests added/updated for new code
- [ ] Documentation updated if needed
- [ ] No `console.log` or debug code left in production files
- [ ] Commit messages follow Conventional Commits

---

## 🆘 Getting Help

- **GitHub Discussions** — For questions, ideas, and general chat
- **GitHub Issues** — For bug reports and feature requests
- **Stellar Discord** — `#soroban` and `#freighter` channels for blockchain-specific questions

---

## 🙏 Recognition

Contributors will be acknowledged in our release notes and, for significant contributions, in the project README.

Thank you for helping build the future of decentralized invoicing! 🌟
