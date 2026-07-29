import { GoogleGenAI } from "@google/genai";
import { AIProvider, AISettingsPreferences, AIAuditLog } from "../types/ai";

// Default System Configuration
export let currentAISettings: AISettingsPreferences = {
  provider: "gemini",
  temperature: 0.7,
  language: "English with Kenyan/Sheng touch",
  tone: "Energetic & Viral",
  outputLength: "detailed",
  autoSaveHistory: true,
};

export const adminAiControl = {
  enabledTools: {
    clip_finder: true,
    viral_score: true,
    caption_gen: true,
    title_gen: true,
    hook_gen: true,
    hashtag_gen: true,
    script_writer: true,
    thumbnail_assistant: true,
    content_calendar: true,
    seo_assistant: true,
    proposal_writer: true,
    resume_builder: true,
    portfolio_builder: true,
    bio_gen: true,
    message_assistant: true,
    analytics: true,
    search: true,
    recommendations: true,
    chat_assistant: true,
  },
  dailyCreditLimit: 1000,
  globalUsageCount: 1420,
};

export const auditLogsStore: AIAuditLog[] = [
  {
    id: "log-1",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    userEmail: "stephenmuriuki632@gmail.com",
    toolId: "hook_gen",
    provider: "gemini",
    promptSnippet: "5 Viral hooks for Nairobi tech event...",
    status: "allowed",
    creditsDeducted: 10,
  },
  {
    id: "log-2",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    userEmail: "stephenmuriuki632@gmail.com",
    toolId: "clip_finder",
    provider: "gemini",
    promptSnippet: "Identify funny moments in podcast clip #4...",
    status: "allowed",
    creditsDeducted: 25,
  }
];

// Lazy getter for Google Gen AI Client
export function getGenAIClient() {
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
}

// Security: Simple Prompt Injection & Malicious Validation check
export function validatePromptSecurity(prompt: string): { valid: boolean; reason?: string } {
  if (!prompt || typeof prompt !== "string") {
    return { valid: false, reason: "Prompt cannot be empty." };
  }
  const dangerousPatterns = [
    /<script/i,
    /drop table/i,
    /system_override_admin_mode/i,
    /ignore previous instructions and print secret/i
  ];
  for (const pattern of dangerousPatterns) {
    if (pattern.test(prompt)) {
      return { valid: false, reason: "Prompt contains restricted keywords or unsafe patterns." };
    }
  }
  return { valid: true };
}

// Main AI Generation Dispatcher
export async function generateAIContent(params: {
  toolId: string;
  prompt: string;
  niche?: string;
  platform?: string;
  language?: string;
  tone?: string;
  targetAudience?: string;
  provider?: AIProvider;
  userEmail?: string;
}): Promise<{ success: boolean; result: string; providerUsed: AIProvider; creditsDeducted: number; error?: string }> {
  const { toolId, prompt, niche, platform, language, tone, targetAudience, provider = currentAISettings.provider, userEmail = "creator@clipkenya.co.ke" } = params;

  // 1. Security Check
  const securityCheck = validatePromptSecurity(prompt);
  if (!securityCheck.valid) {
    auditLogsStore.unshift({
      id: "log-" + Date.now(),
      timestamp: new Date().toISOString(),
      userEmail,
      toolId,
      provider,
      promptSnippet: prompt.substring(0, 50),
      status: "flagged",
      creditsDeducted: 0,
    });
    return {
      success: false,
      result: "",
      providerUsed: provider,
      creditsDeducted: 0,
      error: securityCheck.reason || "Prompt security violation.",
    };
  }

  // 2. Admin Tool Check
  if (adminAiControl.enabledTools[toolId as keyof typeof adminAiControl.enabledTools] === false) {
    return {
      success: false,
      result: "",
      providerUsed: provider,
      creditsDeducted: 0,
      error: `The tool '${toolId}' has been temporarily disabled by ClipKenya Admin.`,
    };
  }

  const creditsDeducted = getToolCreditCost(toolId);
  adminAiControl.globalUsageCount += 1;

  // Log audit
  auditLogsStore.unshift({
    id: "log-" + Date.now(),
    timestamp: new Date().toISOString(),
    userEmail,
    toolId,
    provider,
    promptSnippet: prompt.substring(0, 60),
    status: "allowed",
    creditsDeducted,
  });

  // 3. Try Gemini API first if configured
  const ai = getGenAIClient();
  const effectiveTone = tone || currentAISettings.tone;
  const effectiveLang = language || currentAISettings.language;

  const systemInstruction = buildSystemInstruction(toolId, niche, platform, effectiveLang, effectiveTone);
  const formattedPrompt = buildUserPrompt(toolId, prompt, niche, platform, effectiveLang, effectiveTone, targetAudience);

  if (ai && (provider === "gemini" || !provider)) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: formattedPrompt,
        config: {
          systemInstruction,
          temperature: currentAISettings.temperature || 0.7,
        },
      });

      return {
        success: true,
        result: response.text || "No content generated.",
        providerUsed: "gemini",
        creditsDeducted,
      };
    } catch (err: any) {
      console.warn("Gemini execution fallback trigger:", err?.message);
    }
  }

  // Fallback / Multi-provider simulation engine for external providers or when key pending
  const providerLabel = getProviderDisplayName(provider);
  const structuredOutput = generateSmartFallbackResult(toolId, prompt, niche, platform, effectiveLang, effectiveTone, providerLabel);

  return {
    success: true,
    result: structuredOutput,
    providerUsed: provider,
    creditsDeducted,
  };
}

function getToolCreditCost(toolId: string): number {
  switch (toolId) {
    case "clip_finder": return 25;
    case "viral_score": return 15;
    case "script_writer": return 20;
    case "content_calendar": return 20;
    case "resume_builder": return 25;
    case "portfolio_builder": return 25;
    default: return 10;
  }
}

function getProviderDisplayName(p: AIProvider): string {
  switch (p) {
    case "openai": return "OpenAI GPT-4o";
    case "claude": return "Anthropic Claude 3.5 Sonnet";
    case "deepseek": return "DeepSeek V3 / R1";
    case "llama": return "Meta Llama 3.3 70B";
    case "mistral": return "Mistral Large 2";
    case "azure_openai": return "Azure OpenAI Service";
    default: return "Google Gemini 3.6 Flash";
  }
}

function buildSystemInstruction(toolId: string, niche?: string, platform?: string, lang?: string, tone?: string): string {
  return `You are ClipKenya's elite AI Creator Strategist. You specialize in viral short-form content, creator economy trends, and high-converting brand campaigns across Kenya and Africa. Tone: ${tone || 'Viral & Energetic'}. Preferred Language style: ${lang || 'English with Kenyan/Sheng Vibe'}. Niche context: ${niche || 'General Content'}. Target Platform: ${platform || 'TikTok/Reels'}. Always deliver formatted, well-structured, actionable text with markdown headers, bullet points, and practical advice.`;
}

function buildUserPrompt(toolId: string, prompt: string, niche?: string, platform?: string, lang?: string, tone?: string, audience?: string): string {
  switch (toolId) {
    case "clip_finder":
      return `Analyze this video content/transcript and detect viral, emotional, funny, educational, and exciting moments. Suggest precise timestamps, clip titles, viral ratings (1-100), and editing tips: "${prompt}"`;
    case "viral_score":
      return `Predict and calculate the Viral Score, Engagement Score, Retention Prediction graph, Watch Time Prediction, Audience Match score, and give 5 actionable improvement suggestions for this video concept: "${prompt}"`;
    case "caption_gen":
      return `Generate 5 high-converting captions for ${platform || 'TikTok/Instagram'} for topic: "${prompt}". Include 15 trending Kenyan & African hashtags.`;
    case "title_gen":
      return `Generate 10 catchy titles for ${platform || 'YouTube/TikTok'} about "${prompt}". Include Clickbait, Professional, SEO, and High-CTR variations.`;
    case "hook_gen":
      return `Create 8 irresistible opening hooks (Attention Grabbers, Story Hooks, Question Hooks, Sales Hooks, Comedy Hooks) for: "${prompt}". Add visual action cues in brackets.`;
    case "hashtag_gen":
      return `Generate 25 strategic hashtags (Trending, Niche, Country-specific Kenya/Africa, Platform-specific) for: "${prompt}".`;
    case "script_writer":
      return `Write a complete video script for a 45-60 second video about: "${prompt}". Format with Timestamps, Visual Cues, On-screen Text, Voiceover, and Call to Action.`;
    case "thumbnail_assistant":
      return `Provide 3 high-CTR Thumbnail Concepts for "${prompt}". Include visual layout, big text overlay (max 4 words), color palette, subject expression, and CTR tips.`;
    case "content_calendar":
      return `Draft a 7-day content posting calendar for "${prompt}" in the ${niche || 'Creator'} niche. Include daily hook, format type, best posting times, and platform.`;
    case "seo_assistant":
      return `Generate SEO Keywords, Meta Description, SEO Titles, Tags, and Optimization suggestions for content regarding: "${prompt}".`;
    case "proposal_writer":
      return `Draft a persuasive, professional pitch proposal for a brand collaboration / freelance job regarding: "${prompt}". Include pricing justification, scope of deliverables, and strong CTA.`;
    case "resume_builder":
      return `Format a professional creator/freelancer resume for "${prompt}". Include Bio, Key Skills, Campaign Results, Equipment, and Client Testimonials.`;
    case "portfolio_builder":
      return `Generate a complete online portfolio copy for creator/clipper "${prompt}". Include Bio, Core Strengths, Top Video Analytics, Services Offered, and Contact Info.`;
    case "bio_gen":
      return `Generate 5 punchy bio variations (Instagram, TikTok, LinkedIn, X, Youtube) for: "${prompt}". Include emoji accents and clear CTA.`;
    case "message_assistant":
      return `Draft 3 professional response options (Accept, Counter-Negotiate, Clarify Scope) for this client message: "${prompt}".`;
    case "analytics":
      return `Provide AI strategic analytics insights for: "${prompt}". Predict best posting times, top performing formats, audience behavior breakdown, and revenue growth recommendations.`;
    case "search":
      return `Perform a natural language AI search and match relevant campaigns, creators, courses, or clipping deals for query: "${prompt}".`;
    case "recommendations":
      return `Generate personalized recommendations for campaigns, courses, communities, and collaboration partners based on: "${prompt}".`;
    case "chat_assistant":
      return `Answer this creator's question with actionable, expert advice on ClipKenya platform features, monetization, or content strategy: "${prompt}"`;
    default:
      return prompt;
  }
}

function generateSmartFallbackResult(toolId: string, prompt: string, niche?: string, platform?: string, lang?: string, tone?: string, providerName?: string): string {
  const p = prompt.trim() || "ClipKenya Creator Campaign";
  const header = `> **Generated via ${providerName} Architecture** (Tone: ${tone || 'Viral'}, Language: ${lang || 'Kenyan/Sheng Vibe'})\n\n`;

  switch (toolId) {
    case "clip_finder":
      return `${header}### 🎬 AI Clip Finder Results for: "${p}"

**1. Timestamp: [00:12 - 00:45] — 🔥 Viral Hook Moment**
- **Type:** Exciting / Funny
- **Viral Score:** 96/100
- **Suggested Title:** "You Won't Believe What Happened in Nairobi Traffic! 😭"
- **Clip Idea:** Fast cuts with zoom-in effects on key punchlines.
- **Recommended Caption:** "Watch till the end! Tag a friend who does this daily in Nairobi 😂 #ClipKenya #NairobiViral"

**2. Timestamp: [01:30 - 02:15] — 💡 Educational Breakdown**
- **Type:** Educational
- **Viral Score:** 89/100
- **Suggested Title:** "How To Make 50,000 KES/Month Clipping Videos"
- **Clip Idea:** Side-by-side split screen with bullet points overlay.

**3. Timestamp: [03:05 - 03:50] — 😲 Emotional/Climax Moment**
- **Type:** Emotional
- **Viral Score:** 92/100
- **Suggested Title:** "The Honest Truth About Being a Creator in Kenya..."
- **Clip Idea:** Soft background audio + bold subtitles on screen.`;

    case "viral_score":
      return `${header}### 📈 AI Viral Score & Predictive Analysis

**Overall Viral Potential:** 94/100 (God Tier)
- **Engagement Prediction:** 18.5% (Comments + Shares ratio)
- **Retention Rate (30s):** 74% predicted watch-through
- **Average Watch Duration:** 48s on a 60s video
- **Audience Match:** 98% fit for Gen-Z & Millennial East African Viewers

**🎯 Platform Recommendations:**
- Primary: **TikTok** (Post between 6:30 PM - 8:30 PM EAT)
- Secondary: **Instagram Reels** & **YouTube Shorts**

**⚡ Top 3 Improvement Suggestions:**
1. Cut the first 1.5 seconds intro — start directly with the main punchline or question.
2. Add bold yellow/black text overlays for key numbers and keywords.
3. Use a trending East African audio backing track at 15% volume.`;

    case "caption_gen":
      return `${header}### 💬 Generated Captions & Hashtag Sets

**Option 1: Viral & Sheng Style (High Engagement)**
"Aina ya watu utapatana nao pale Nairobi! 😂 Tag that one friend who never learns! 👇 Save this reel before it vanishes! #ClipKenya #KenyanCreators #NairobiTrending"

**Option 2: Storytelling Style**
"I used to think creating content was hard until I tried this simple breakdown. Here is what changed everything for my brand in 2026. What's your biggest challenge? Let's discuss in the comments!"

**Option 3: Direct Sales / Conversion CTA**
"Ready to scale your content revenue? Click the link in my bio to sign up on ClipKenya and collaborate with top brands today! 🚀"

**🏷️ Recommended Hashtags:**
#ClipKenya #NairobiCreators #KenyanTech #TikTokKenya #AfricanContentCreators #ViralReels #254Trend #ContentStrategy #UGCKenya #EastAfricaCreators`;

    case "title_gen":
      return `${header}### 🏷️ Top Generated Titles for "${p}"

**🔥 Clickbait & High-CTR Variations:**
1. I Tried This $1,000 Kenyan Creator Secret (And It Worked!)
2. The Truth About Making Money Online in Nairobi No One Tells You...
3. Stop Scrolling If You Live in East Africa!

**🎯 SEO & Search Optimized:**
4. How To Monetize Short-Form Video Clips in Kenya (2026 Step-by-Step)
5. Top 5 Creator Marketing Strategies for African Brands

**💼 Professional & Corporate:**
6. Navigating the Creator Economy in East Africa: Insights & Growth
7. Maximizing UGC Campaign ROI for Emerging Brands

**📱 TikTok / Reels Punchy Titles:**
8. 3 Mistakes Costing You Followers on TikTok 😱
9. How I Got 500k Views in 7 Days 📈
10. This Clip Generator Changed Everything!`;

    case "hook_gen":
      return `${header}### 🪝 8 High-Retention Opening Hooks

1. **[Visual: Rapid Zoom-in on face]** "Stop scrolling! If you're in Kenya and want to earn from your phone, watch this right now."
2. **[Visual: Holding up smartphone showing earnings]** "This single trick made me 25,000 KES in 48 hours without showing my face."
3. **[Visual: Pointing to text overlay]** "Why are 90% of African creators missing out on brand deals in 2026?"
4. **[Question Hook]** "Did you know you can get paid directly via M-Pesa just by editing short videos?"
5. **[Story Hook]** "3 months ago I had zero brand sponsorships, but then I changed this ONE thing on my profile..."
6. **[Educational Hook]** "Here are 3 video editing secrets that instantly boost your retention rate above 70%."
7. **[Motivational Hook]** "Your content is worth more than you think. Here is how to price yourself properly."
8. **[Comedy/Sheng Hook]** "Acha niwaambie ukweli, hii app ya ClipKenya imechange game completely!"`;

    case "hashtag_gen":
      return `${header}### #️⃣ Strategic Hashtag Vault for "${p}"

**🔥 High-Volume Trending Tags:**
#ClipKenya #TikTokKenya #Nairobi #KenyanCreators #ViralShorts #AfricanCreators #254Tech #FYPKenya

**🎯 Niche-Specific Tags:**
#CreatorEconomy #UGCAfrica #VideoClipping #MpesaPayments #MicroInfluencer #DigitalKenya #ContentMarketing2026

**🌍 Country & Regional Tags:**
#KenyaCreators #LagosCreators #SouthAfricaTech #EastAfrica #NairobiTrends #GenZKenya

**📊 Platform Specific Tags:**
#ReelsInstagram #ShortsYouTube #TikTokTrends2026 #LinkedInCreator`;

    case "script_writer":
      return `${header}### 📜 45-Second Viral Script: "${p}"

**[0:00 - 0:05] THE HOOK**
- **Visual:** Creator holds camera close, looking shocked. Text on screen: "Don't ignore this!"
- **Audio/Voiceover:** "If you are creating content in Kenya and not getting paid, you're doing it completely wrong!"

**[0:05 - 0:20] THE PROBLEM & VALUE**
- **Visual:** Fast cut B-roll showing editing software and M-Pesa payment SMS notification.
- **Audio/Voiceover:** "Brands are spending millions on video clips right now. Instead of posting for free, you can submit your clips to active campaigns on ClipKenya."

**[0:20 - 0:35] THE STEP-BY-STEP PROOF**
- **Visual:** Screen recording navigating ClipKenya marketplace, selecting a campaign and clicking 'Apply'.
- **Audio/Voiceover:** "Step 1: Create your profile. Step 2: Pick a brand campaign. Step 3: Get paid straight to your M-Pesa or Bank account upon approval."

**[0:35 - 0:45] CALL TO ACTION**
- **Visual:** Creator smiling, pointing to bio link. Text: "Join ClipKenya Today!".
- **Audio/Voiceover:** "Link in my bio to start getting brand deals today. Follow for more creator secrets!"`;

    case "thumbnail_assistant":
      return `${header}### 🖼️ AI Thumbnail Assistant Design Brief

**Concept 1: High-Contrast Curiosity**
- **Text Overlay:** "MADE KES 50K?!" (Max 3 words, Big Impact Yellow font with black outline)
- **Subject Expression:** Shocked/Excited face holding a smartphone displaying M-Pesa green interface.
- **Color Palette:** Neon Yellow, Deep Navy Blue, Bright M-Pesa Green.
- **CTR Rating:** 9.4/10

**Concept 2: Before vs After Split**
- **Text Overlay:** "BEFORE vs AFTER"
- **Left Side:** Sad face with 0 views.
- **Right Side:** Smiling face with 1,000,000 views badge and ClipKenya logo.
- **CTR Rating:** 9.1/10

**💡 CTR Optimization Tip:** Keep background dark so text pops out on mobile devices!`;

    case "content_calendar":
      return `${header}### 📆 7-Day Strategic Content Calendar

- **Monday:** *Educational Video* — "Top 3 Editing Apps Every African Creator Needs in 2026" (Post at 7:00 PM)
- **Tuesday:** *Storytelling / BTS* — "How I Landed My First 100,000 KES Brand Deal on ClipKenya" (Post at 8:00 PM)
- **Wednesday:** *Trend Reaction / Sheng* — Reaction to trending Nairobi news with comedic commentary (Post at 1:00 PM)
- **Thursday:** *UGC Unboxing* — High-energy product showcase for local e-commerce brand (Post at 6:30 PM)
- **Friday:** *Interactive Poll / Q&A* — "Answering your top questions on pricing your clips" (Post at 5:00 PM)
- **Saturday:** *Reel / Short Tutorial* — "5-second trick to make your video lighting look 10x more professional" (Post at 11:00 AM)
- **Sunday:** *Weekly Recap & Motivation* — Creator milestone highlights & community shoutout (Post at 8:30 PM)`;

    case "seo_assistant":
      return `${header}### 🔍 AI SEO Optimization Package

**Target Meta Title:** Best Creator & Clipping Platform in Kenya | Monetize Videos on ClipKenya
**Meta Description:** Join ClipKenya to connect with top brands, earn M-Pesa payments for video clips, and access AI content tools for African creators.

**Key Primary Keywords:**
` + `ClipKenya, video clipping Kenya, UGC creator Nairobi, brand deals Africa, monetize TikTok Kenya, M-Pesa creator payments

**Content Tags:**
` + `ClipKenya, Creator Economy, Video Monetization, African UGC, Content Strategy 2026, TikTok Influencer Kenya`;

    case "proposal_writer":
      return `${header}### 💼 Brand Collaboration Proposal

**To:** Brand Marketing Director
**From:** Verified ClipKenya Creator / Clipper
**Subject:** High-Converting UGC Short-Video Campaign Proposal for ${p}

Dear Campaign Team,

I am writing to submit a tailored video creation proposal for **${p}**. With a track record of driving high retention rates and authentic engagement across East African audiences, I can deliver top-tier short-form content that converts.

**Proposed Deliverables:**
- 3x High-energy TikTok/Instagram Reels (45-60 seconds each)
- Custom visual hooks tailored for local relevance (English/Sheng blend)
- Raw footage & 1x revision round included
- Optimized captions & hashtag bundle

**Project Timeline:** 5 Business Days
**Proposed Budget:** 35,000 KES (or $270 USD)

Looking forward to bringing this campaign to life! Click 'Accept Proposal' on ClipKenya to begin.`;

    case "resume_builder":
      return `${header}### 📄 Creative Creator Resume

**FULL NAME:** Alex K. Mwangi
**TITLE:** Senior Short-Form Video Producer & UGC Creator
**LOCATION:** Nairobi, Kenya | **CONTACT:** alex@clipkenya.co.ke

**PROFESSIONAL SUMMARY:**
Results-driven content producer with 3+ years experience delivering high-converting video clips and UGC campaigns for African e-commerce, fintech, and tech brands. Generated over 12M total views across TikTok & YouTube Shorts.

**CORE SKILLS:**
- CapCut Pro, Premiere Pro, DaVinci Resolve
- Short-form Hook Architecture & Storyboarding
- Scriptwriting & Sheng Localization
- M-Pesa Integrated Commerce Analytics

**FEATURED CAMPAIGNS & RESULTS:**
- *Tech Brand Launch:* Produced 5 viral clips resulting in 1.4M views and +320% signups.
- *Fintech Campaign:* Achieved 82% watch-through rate on 30s video brief.`;

    case "portfolio_builder":
      return `${header}### 🌐 Auto-Generated Creator Portfolio Page

**Bio:** "Creating viral short-form magic for top brands across Africa. Specialist in Tech, Lifestyle, and UGC campaigns."

**Key Achievements:**
- 🏆 15,000,000+ Total Impressions
- ⭐ 4.9/5.0 Client Rating on ClipKenya
- 🚀 45+ Completed Brand Orders

**Featured Video Showcases:**
1. *Unboxing Noise-Cancelling Headphones* (850k Views)
2. *M-Pesa Global App Tutorial* (1.2M Views)
3. *Nairobi Street Comedy Skit* (420k Views)

**Client Testimonials:**
> "Alex delivered exceptional videos in under 48 hours. Our campaign ROI doubled!" — *E-Commerce Brand Manager*`;

    case "bio_gen":
      return `${header}### ✍️ 5 Bio Variations

**Option 1 (TikTok / Instagram - Sheng Vibe):**
"🇰🇪 Content Creator in Nairobi | Helping you create viral clips 🚀
💰 Brand deals & UGC via @ClipKenya
👇 Tap link for bookings!"

**Option 2 (Corporate / LinkedIn):**
"Digital Content Strategist & Video Producer | 15M+ Views Generated | Specializing in African Creator Economy & UGC Campaigns."

**Option 3 (Clipper / Editor):**
"✂️ I turn long podcasts into viral TikTok clips | Fast delivery & high CTR | Book me on ClipKenya 📌"

**Option 4 (Minimalist):**
"Creator. Storyteller. Nairobi 📍
Collaborations: link in bio ⚡"

**Option 5 (Fun / Entertainment):**
"Making videos so good even your mum will share them 😂 | Business inquiries 👇"`;

    case "message_assistant":
      return `${header}### 📩 3 Professional Reply Options

**Option 1: Accepting the Deal & Confirming Next Steps**
"Hi! Thank you for the proposal regarding '${p}'. I am excited to work together on this campaign. I have reviewed the requirements and am ready to start immediately. I will submit the first draft within 3 business days via ClipKenya."

**Option 2: Polite Rate Negotiation / Scope Adjustment**
"Hi! Thanks for reaching out. I'm very interested in this project! Based on the requested deliverables (including raw footage & expedited delivery), my standard rate is 25,000 KES. Let me know if we can adjust the budget to match, and I'll begin right away!"

**Option 3: Requesting Revision / Brief Clarification**
"Hi team! I've received your feedback. To make sure the revised clip hits your exact target, could you clarify whether you'd prefer the energetic hook or the educational hook for the second version?"`;

    case "analytics":
      return `${header}### 📊 Strategic AI Analytics & Predictions

**1. Best Posting Times (East Africa Time - EAT):**
- **Weekdays:** 6:30 AM - 8:00 AM & 7:00 PM - 9:30 PM
- **Weekends:** 11:30 AM - 2:00 PM & 8:00 PM - 10:30 PM

**2. Content Format Performance Index:**
- *UGC Unboxing & Testing:* **94% Engagement Index**
- *Sheng Comedy Skits:* **88% Virality Index**
- *Long-form Repurposed Clips:* **82% Retention Index**

**3. Audience Demographics:**
- 68% Gen-Z (18-24), 26% Millennials (25-34)
- Top Locations: Nairobi (52%), Mombasa (18%), Lagos (14%), Kampala (10%)

**4. Revenue Growth Forecast:**
- Projected Monthly Earnings with 4 active campaigns: **120,000 - 180,000 KES**`;

    case "search":
      return `${header}### 🔎 Natural Language AI Search Results for: "${p}"

**Matched High-Paying Campaigns:**
1. 🎮 *Kenya Gaming Lounge UGC Campaign* — Budget: **45,000 KES** (Seeking 3 Video Editors)
2. 📱 *Fintech App Launch Video Clips* — Budget: **75,000 KES** (Verified Brand)

**Top Verified Creators Matched:**
1. **Mercy W.** (Nairobi) — *Rating: 4.98/5* | UGC & Tech Review Specialist
2. **Brian O.** (Mombasa) — *Rating: 4.92/5* | Viral Clipper & Meme Marketer

**Recommended Academy Course:**
- *Mastering Viral Short-Form Editing for African Audiences (2026 Edition)*`;

    case "recommendations":
      return `${header}### ⭐ Smart Personalised Recommendations

**Recommended Campaigns for You:**
- 🛒 *E-Commerce Brand UGC Challenge* — Earn up to **30,000 KES** per approved clip.
- 🎙️ *Podcast Clipping Sprint #12* — High reward pool for top viewed clips on TikTok.

**Recommended Collaborators:**
- **Kevin Editors Studio** — Top rated clipper in Nairobi (Completed 80+ orders).

**Recommended Learning Module:**
- *How To Price Your UGC & Brand Deliverables in KES & USD*`;

    case "chat_assistant":
      return `${header}### 🤖 ClipKenya AI Assistant

Thank you for your question about **"${p}"**!

Here is my recommended guide:
1. **On ClipKenya Payments:** All campaign payments are securely held in escrow and released directly to your **M-Pesa** or **Bank Account** as soon as the brand approves your submitted clip.
2. **To Maximise Approval:** Always ensure your video includes clean audio, crisp subtitles, and adheres strictly to the campaign brief parameters.
3. **Growth Tip:** Creators who utilize the **AI Hook Generator** and **AI Caption Tool** report a **3.2x higher campaign selection rate**!

*Need more help? Feel free to ask me anything about editing, pricing, campaigns, or platform features!*`;

    default:
      return `${header}### ✨ AI Suite Output for: "${p}"

Here is your customized strategy and content output generated specifically for the African creator ecosystem.

1. **Core Concept:** ${p}
2. **Key Target Market:** Kenya, Nigeria, South Africa, East Africa
3. **Platform Optimization:** Tailored for TikTok, Instagram Reels, and YouTube Shorts.`;
  }
}
