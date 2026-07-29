import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI Client (Lazy check in endpoint for missing key safety)
  const getGenAIClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "ClipKenya API", timestamp: new Date().toISOString() });
  });

  // SEO Endpoints: robots.txt and sitemap.xml
  app.get("/robots.txt", (_req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *\nAllow: /\nSitemap: https://clipkenya.co.ke/sitemap.xml\n`);
  });

  app.get("/sitemap.xml", (_req, res) => {
    res.type("application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://clipkenya.co.ke/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://clipkenya.co.ke/clipping</loc><changefreq>hourly</changefreq><priority>0.9</priority></url>
  <url><loc>https://clipkenya.co.ke/creators</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
  <url><loc>https://clipkenya.co.ke/ugc</loc><changefreq>daily</changefreq><priority>0.8</priority></url>
  <url><loc>https://clipkenya.co.ke/pricing</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://clipkenya.co.ke/academy</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>https://clipkenya.co.ke/about</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
</urlset>`);
  });

  // AI Tool Endpoint: Generate Hook Ideas, Viral Scripts, Captions, or Campaign Briefs
  app.post("/api/ai/generate", async (req, res) => {
    try {
      const { type, prompt, niche, platform, language, targetAudience } = req.body;
      const ai = getGenAIClient();

      if (!ai) {
        // Fallback response if GEMINI_API_KEY is not present yet
        return res.json({
          success: true,
          result: `[AI Studio Mode] Generated ideas for "${prompt || "ClipKenya Creator"}":\n\n1. "Stop scrolling if you're in ${niche || "Kenya"}! Here is the $1,000 secret..."\n2. "3 mistakes every African creator makes on ${platform || "TikTok"}"\n3. "How this Nairobi brand made 500k KES using UGC videos"\n\n(Tip: Configure GEMINI_API_KEY in Secrets panel for live Google Gemini AI responses!)`,
          fallback: true
        });
      }

      let systemInstruction = "You are ClipKenya's lead AI Creator Strategist. You specialize in viral short-form content, creator economy trends, and high-converting brand campaigns across Kenya and Africa.";
      let userPrompt = "";

      if (type === "hooks") {
        systemInstruction += " Generate 5 irresistible video hooks with visual cues and estimated retention score.";
        userPrompt = `Generate 5 viral short-form video hooks for ${platform || "TikTok/Reels"} about: "${prompt}". Target audience: ${targetAudience || "African youth and tech/lifestyle enthusiasts"}. Language style: ${language || "English with subtle Sheng/Kenyan touch"}. Include visual action cues in brackets.`;
      } else if (type === "script") {
        systemInstruction += " Format output with timestamps [0:00-0:05], Visual Scene, Audio/Voiceover script, and On-screen Text overlays.";
        userPrompt = `Write a compelling 45-second short video script for ${platform || "TikTok"} about: "${prompt}". Niche: ${niche || "Creator/Tech"}. Include Hook, Body Value, and CTA to follow on ClipKenya.`;
      } else if (type === "captions") {
        systemInstruction += " Return 3 caption options (High-engagement, Storytelling, and Direct CTA) plus 15 relevant viral hashtags including Kenyan/African tags.";
        userPrompt = `Create engaging captions and hashtags for a video about: "${prompt}". Platform: ${platform || "Instagram/TikTok"}.`;
      } else if (type === "brief") {
        systemInstruction += " Format as a professional Brand UGC/Campaign Brief with Objective, Deliverables, Target Creator Profile, Key Messages, and Do's & Don'ts.";
        userPrompt = `Draft a high-performing brand campaign brief for: "${prompt}". Industry: ${niche || "E-commerce/SaaS"}. Target Creators: ${targetAudience || "Kenyan UGC & Micro-influencers"}.`;
      } else {
        userPrompt = prompt;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        success: true,
        result: response.text || "No content generated.",
        type
      });
    } catch (error: any) {
      console.error("Gemini AI error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to generate AI content",
      });
    }
  });

  // M-Pesa Simulated Payment Endpoint
  app.post("/api/payments/mpesa-express", (req, res) => {
    const { phoneNumber, amount, type, reference } = req.body;
    
    if (!phoneNumber || !amount) {
      return res.status(400).json({ success: false, message: "Phone number and amount required" });
    }

    // Simulate M-Pesa STK Push
    const checkoutRequestId = "ws_CO_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
    const mpesaReceiptNumber = "R" + Math.random().toString(36).substring(2, 10).toUpperCase();

    setTimeout(() => {
      // Async STK push simulation
    }, 1000);

    res.json({
      success: true,
      message: `M-Pesa STK Push sent to ${phoneNumber}. Please enter your M-Pesa PIN on your phone.`,
      CheckoutRequestID: checkoutRequestId,
      MpesaReceiptNumber: mpesaReceiptNumber,
      amount: Number(amount),
      currency: "KES",
      status: "COMPLETED",
      timestamp: new Date().toISOString()
    });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 ClipKenya server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
