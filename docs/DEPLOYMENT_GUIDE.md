# 🚀 ClipKenya Production Deployment Guide

This guide provides step-by-step instructions for building, testing, and deploying ClipKenya to production environments like **Vercel**, **Google Cloud Run**, or **Docker/Nginx**.

---

## 📦 Build Process

To compile ClipKenya for production:

```bash
# 1. Run type checks and linter
npm run lint

# 2. Build production assets
npm run build
```

This compiles static SPA output into the `dist/` directory and packages `server.ts` into CommonJS bundled format.

---

## ⚙️ Environment Configuration

Ensure all required production environment variables are configured in your hosting platform:

```env
NODE_ENV=production
PORT=3000

# Gemini AI Service
GEMINI_API_KEY=AIzaSy...

# Safaricom M-Pesa Daraja Credentials
VITE_MPESA_CONSUMER_KEY=prod_key
VITE_MPESA_CONSUMER_SECRET=prod_secret
VITE_MPESA_SHORTCODE=600000
VITE_MPESA_PASSKEY=bfb279f9aa...

# Supabase / Cloud SQL URL
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. Connect your repository to Vercel.
3. Set Framework Preset: **Vite / Node**.
4. Configure environment variables in the Vercel Dashboard under **Settings -> Environment Variables**.
5. Click **Deploy**.

---

## ⚡ Performance Optimization Checklist

- [x] PWA Service Worker caching active (`sw.js`)
- [x] Gzip / Brotli compression configured on CDN
- [x] Lazy loading active for heavy components
- [x] Lucide icons optimized via subpath imports
- [x] Images optimized via Unsplash CDN parameters (`auto=format&fit=crop&w=800&q=80`)
- [x] Web fonts loaded via Google Fonts with `display=swap`
