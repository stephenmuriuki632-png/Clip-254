import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import {
  currentAISettings,
  adminAiControl,
  auditLogsStore,
  generateAIContent
} from "./src/server/aiService";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

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

  // AI Settings API
  app.get("/api/ai/config", (_req, res) => {
    res.json({ success: true, settings: currentAISettings });
  });

  app.post("/api/ai/config", (req, res) => {
    const { provider, temperature, language, tone, outputLength, autoSaveHistory } = req.body;
    if (provider) currentAISettings.provider = provider;
    if (temperature !== undefined) currentAISettings.temperature = Number(temperature);
    if (language) currentAISettings.language = language;
    if (tone) currentAISettings.tone = tone;
    if (outputLength) currentAISettings.outputLength = outputLength;
    if (autoSaveHistory !== undefined) currentAISettings.autoSaveHistory = autoSaveHistory;

    res.json({ success: true, settings: currentAISettings, message: "AI Settings updated successfully" });
  });

  // Admin AI Panel API
  app.get("/api/ai/admin", (_req, res) => {
    res.json({
      success: true,
      control: adminAiControl,
      auditLogsCount: auditLogsStore.length
    });
  });

  app.post("/api/ai/admin", (req, res) => {
    const { toolId, enabled, dailyCreditLimit } = req.body;
    if (toolId && enabled !== undefined) {
      adminAiControl.enabledTools[toolId as keyof typeof adminAiControl.enabledTools] = Boolean(enabled);
    }
    if (dailyCreditLimit) {
      adminAiControl.dailyCreditLimit = Number(dailyCreditLimit);
    }
    res.json({ success: true, control: adminAiControl, message: "Admin AI settings saved" });
  });

  app.get("/api/ai/audit-logs", (_req, res) => {
    res.json({ success: true, logs: auditLogsStore });
  });

  // AI Tool Generation Endpoint
  app.post("/api/ai/generate", async (req, res) => {
    try {
      const { toolId = "hook_gen", type, prompt, niche, platform, language, tone, targetAudience, provider, userEmail } = req.body;
      const effectiveToolId = toolId || (type === "hooks" ? "hook_gen" : type === "script" ? "script_writer" : type === "captions" ? "caption_gen" : type === "brief" ? "proposal_writer" : "hook_gen");

      const response = await generateAIContent({
        toolId: effectiveToolId,
        prompt: prompt || "Viral short-form creator content idea for Kenya",
        niche,
        platform,
        language,
        tone,
        targetAudience,
        provider,
        userEmail
      });

      if (!response.success) {
        return res.status(400).json({
          success: false,
          error: response.error || "Generation blocked by system security or admin control."
        });
      }

      res.json({
        success: true,
        result: response.result,
        toolId: effectiveToolId,
        providerUsed: response.providerUsed,
        creditsDeducted: response.creditsDeducted
      });
    } catch (error: any) {
      console.error("AI Generation error:", error);
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
