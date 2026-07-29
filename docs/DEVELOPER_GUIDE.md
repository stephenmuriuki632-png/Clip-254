# 👨‍💻 ClipKenya Developer Guide

Welcome to the ClipKenya developer documentation. This guide details codebase conventions, architecture decisions, component design, state management, and security patterns.

---

## 🏗️ Directory Structure

```
├── public/
│   ├── manifest.json         # PWA Web Application Manifest
│   ├── sw.js                  # Service Worker with offline caching & background sync
│   ├── offline.html           # Standalone offline fallback
│   ├── robots.txt             # SEO Search Engine directives
│   └── sitemap.xml            # XML Sitemap
├── src/
│   ├── components/
│   │   ├── AI/                # Gemini AI viral generators & hook writers
│   │   ├── Academy/           # ClipKenya Creator Academy course player & store
│   │   ├── Admin/             # Admin portal, dispute resolution, analytics
│   │   ├── Bounties/          # Clipping bounties, submission dialogs
│   │   ├── Campaigns/         # UGC Brand campaigns and creator applications
│   │   ├── Common/            # Reusable UI cards, badges, modal dialogs, 404/500/Offline pages
│   │   ├── Community/         # Creator forums, viral posts, leaderboard
│   │   ├── Dashboards/        # Role-specific dashboards (Clipper, Creator, Brand, Admin)
│   │   ├── Freelance/         # Media service listings, escrow order creation
│   │   ├── Messaging/         # Real-time chat system with escrow quick-offers
│   │   ├── Mobile/            # PWA bottom nav, FAB, mobile video uploader, push manager
│   │   ├── SEO/               # SEOHead dynamic meta & JSON-LD schema builder
│   │   ├── Sponsorships/      # Influencer sponsorship deal marketplace
│   │   └── Wallet/            # M-Pesa deposit, STK Push triggers, withdrawal
│   ├── context/
│   │   ├── AppContext.tsx     # Global state engine, role switcher, persistent storage
│   │   └── ToastContext.tsx   # Toast notification dispatcher
│   ├── hooks/
│   │   ├── useNetworkStatus.ts# Offline / Online status observer
│   │   └── usePwaInstall.ts   # PWA prompt deferred installer
│   ├── lib/
│   │   └── securityAudit.ts   # CSRF, XSS input sanitizer, audit logger
│   ├── pwa/
│   │   └── registerServiceWorker.ts # SW Registration handler
│   ├── types.ts               # Core TypeScript interface declarations
│   ├── App.tsx                # Main Router & Global App Frame
│   └── main.tsx               # Entry point mounting AppProvider
```

---

## 🔐 Security & RBAC Guidelines

1. **Input Sanitization**: Always pass user-generated content through `SecurityAudit.sanitizeInput()` before rendering if dangerously setting inner HTML.
2. **Kenyan Phone Validation**: Use `SecurityAudit.validateKenyanPhone()` for M-Pesa numbers.
3. **Audit Logging**: Call `SecurityAudit.logEvent()` when executing wallet withdrawals, bounty approvals, or role switching.

---

## 🎨 UI & Styling Standards

- All styling strictly uses **Tailwind CSS**.
- Responsive layout uses mobile-first design (`sm:`, `md:`, `lg:`).
- Custom dark mode support via Tailwind `dark:` classes driven by `isDarkMode` state in `AppContext`.
- Icons strictly from `lucide-react`.

---

## 🧪 Testing Strategy

1. **Unit Tests**: Test core helper logic in `securityAudit.ts`, wallet calculations, and state reducers.
2. **Integration Tests**: Verify flow from Bounty Creation -> Clipper Submission -> Creator Approval -> M-Pesa Escrow Payout.
3. **Accessibility**: Maintain 4.5:1 WCAG AA contrast ratio and proper `aria-label` tags on buttons.
