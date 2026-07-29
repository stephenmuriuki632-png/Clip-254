# 🏛️ ClipKenya - Enterprise Architecture & System Overview

## 1. System Overview
ClipKenya is built as a high-performance, full-stack creator platform tailored for the East African creator economy. It features an event-driven architecture, modular AI integrations, instant M-Pesa STK Push payments, escrow transaction engines, visual workflow automation, and progressive offline capabilities.

---

## 2. Core Architectural Layers

```
+-----------------------------------------------------------------------+
|                         ClipKenya UI / PWA Layer                      |
| (React 18 + TypeScript + Vite + Tailwind CSS + Lucide + PWA Cache)    |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                       Application State & Context                     |
|  (AppContext + ToastContext + PWA Context + LocalStorage Engine)      |
+-----------------------------------------------------------------------+
                                   |
         +-------------------------+-------------------------+
         |                                                   |
         v                                                   v
+----------------------------------+        +-----------------------------------+
|    Payment & Escrow Engine       |        |   Enterprise AI & Automation      |
|  - M-Pesa Daraja (STK Push)      |        |  - Gemini 2.5 Flash API           |
|  - Airtel Money / Visa           |        |  - Visual Drag & Drop Workflows   |
|  - Multi-Sig Escrow Hold         |        |  - Predictive Analytics Engine    |
+----------------------------------+        +-----------------------------------+
         |                                                   |
         +-------------------------+-------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                    Database & Backend Infrastructure                  |
|  (Supabase PostgreSQL + Firebase Auth + Realtime Sync + Edge Functions)|
+-----------------------------------------------------------------------+
```

---

## 3. Database Schema Overview (Supabase PostgreSQL)

- `users`: Core profile metadata, roles (`clipper`, `creator`, `brand`, `agency`, `freelancer`, `admin`), KYC verification status, and M-Pesa phone number.
- `bounties`: Video clip bounty campaigns, video URLs (Twitch/YouTube/TikTok), total escrow budget, per-clip reward (KES), and active submissions count.
- `clip_submissions`: Individual clip entries, video links, viral views count, AI viral score, and payout status (`pending`, `approved`, `disbursed`, `rejected`).
- `ugc_campaigns`: Brand campaigns, content briefs, required deliverables, video duration rules, and creator assignments.
- `escrow_transactions`: Transaction logs, M-Pesa CheckoutRequestIDs, lock status, release timestamps, and arbitration logs.
- `freelance_jobs`: Service listings, proposal submissions, milestone escrows, and contract completion states.
- `visual_workflows`: Workflow node configurations, trigger rules, conditional logic, execution history, and AI prompt steps.
- `ai_prompt_history`: Stored prompt records, provider used, generated outputs, credit consumption, and favorite tags.

---

## 4. Security & Compliance
- **Role-Based Access Control (RBAC)**: Strict permission boundaries enforcing user privileges across Admin, Brand, and Clipper dashboards.
- **Audit Logging**: Immutable tracking of wallet withdrawals, dispute decisions, and security settings changes.
- **Data Encryption**: All secret keys and sensitive user attributes are encrypted at rest and in transit.
- **Input Validation & Sanitization**: Strict schema validation on all API requests and AI prompt inputs.

---

## 5. Deployment & Scalability
- **Static Hosting**: Vercel / Cloudflare Pages for instant CDN delivery.
- **Server Runtime**: Express + Node.js (via `server.ts`) for server-side proxy routes and Gemini secret protection.
- **Database**: Supabase / Cloud SQL PostgreSQL with auto-scaling connections and read-replicas.
