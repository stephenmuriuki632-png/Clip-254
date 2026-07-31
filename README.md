# 🚀 ClipForge - Global Creator Economy Super Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-emerald.svg)](https://clipforge.com)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20Ready-indigo.svg)](https://clipforge.com)
[![M-Pesa Escrow](https://img.shields.io/badge/M--Pesa-Instant%20STK%20Push-green.svg)](https://clipforge.com)
[![Enterprise AI](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-purple.svg)](https://clipforge.com)

**ClipForge** is a leading marketplace and creator super platform connecting creators, video editors, brands, UGC creators, and agencies. It empowers streamers, podcasters, brands, and video clippers with automated clip bounties, escrow settlements, visual node workflows, AI viral generators, predictive analytics, and instant M-Pesa & global payouts.

---

## 🌟 Key Features & Core Modules

1. **✂️ Video Clipping Bounties**: Streamers post Twitch/YouTube/TikTok links with KES & USD rewards for viral 9:16 short clips.
2. **📱 UGC Brand Campaigns**: Brands launch campaigns with automated AI content guidelines and escrow budget locks.
3. **💰 M-Pesa & Escrow Engine**: Instant KES deposits, STK Push automated triggers, and multi-signature release for verified submissions.
4. **⚡ Visual Workflow Builder**: Zapier & Make.com inspired visual node builder supporting triggers, conditional logic, AI actions, and payouts.
5. **🤖 Enterprise AI & Copilot Assistant**: Gemini 2.5 Flash script generator, viral TikTok hook writer, automated bio enhancer, proposal generator, and prompt history tracker.
6. **📈 Smart Predictive Analytics**: ML revenue forecasting, viral likelihood scoring, best posting window recommendations, and automated achievement badges.
7. **🤝 Sponsorship & Freelance Marketplace**: Connect brands with macro/micro-influencers, video editors, and thumbnail artists with milestone escrows.
8. **🎓 ClipForge Creator Academy**: Courses, viral cheat codes, and skill certifications with M-Pesa course enrollments.
9. **💬 Real-Time Messaging**: Secure direct chat between brands, clippers, and creators with file sharing and escrow quick-offers.
10. **📱 Progressive Web App (PWA)**: 100% offline support, push notifications, background sync, and native mobile install.
11. **🛡️ Enterprise RBAC & Admin Portal**: Multi-role support (`clipper`, `creator`, `brand`, `agency`, `freelancer`, `admin`) with dispute arbitration and KYC verification.

---

## 🛠️ Technology Stack

- **Frontend**: React 18+, TypeScript, Vite, Tailwind CSS, Lucide Icons, Motion Animation
- **State Management**: React Context Engine with LocalStorage Persistence
- **Mobile / PWA**: Web Manifest v2, Service Worker with Stale-While-Revalidate caching, Web Push Notifications
- **Integrations**: Gemini 2.5 Flash AI, Safaricom Daraja M-Pesa API (Simulated & Webhook Ready), Supabase / Cloud SQL Ready

---

## 🚀 Quick Start & Development Setup

### 1. Requirements
- Node.js `v18.x` or higher
- npm `v9.x` or higher

### 2. Installation

```bash
# Clone repository
git clone https://github.com/clipforge/clipforge-platform.git
cd clipforge-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run on `http://localhost:3000`.

---

## 🌐 Environment Variables Setup

Create a `.env` or `.env.local` file based on `.env.example`:

```env
# Gemini AI Key
GEMINI_API_KEY=your_gemini_api_key

# M-Pesa Daraja Credentials
VITE_MPESA_CONSUMER_KEY=your_daraja_key
VITE_MPESA_CONSUMER_SECRET=your_daraja_secret
VITE_MPESA_SHORTCODE=600000
VITE_MPESA_PASSKEY=your_passkey

# Supabase / Cloud Persistence
VITE_SUPABASE_URL=https://your-app.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 📖 Production Deployment Guide

### Deploying to Vercel

ClipForge is fully optimized for single-click deployment on **Vercel**:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

---

## 📜 Documentation & Guides

For complete architecture, API specifications, and contribution rules, check our `/docs` folder:
- [Developer Guide](./docs/DEVELOPER_GUIDE.md)
- [Architecture Guide](./docs/ARCHITECTURE_GUIDE.md)
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)

---

## 🛡️ License & Support

Distributed under the MIT License. Copyright © 2026 **ClipForge Technologies Ltd**.
For support, contact `support@clipforge.com` or call `+254 700 000 000`.

