import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  keywords?: string[];
  jsonLdSchema?: Record<string, any>[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "ClipKenya - Africa's #1 Creator Economy Super Platform",
  description = "Monetize live stream clipping bounties, UGC campaigns, brand sponsorships, and freelance media gigs in Kenya with instant M-Pesa payouts.",
  canonicalUrl = "https://clipkenya.com",
  ogImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  ogType = "website",
  keywords = [
    "ClipKenya",
    "video clipping bounties Kenya",
    "M-Pesa creator payouts",
    "UGC creators Kenya",
    "brand sponsorships Nairobi",
    "TikTok clipper jobs Africa",
    "YouTube Shorts clipping",
    "freelance video editors Kenya"
  ],
  jsonLdSchema
}) => {
  useEffect(() => {
    // Dynamic document title update
    document.title = title;

    // Helper function to update or inject meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // JSON-LD Schemas injection
    const defaultOrganizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "ClipKenya",
      "url": "https://clipkenya.com",
      "logo": "https://clipkenya.com/logo.png",
      "description": "Africa's leading platform for video clipping bounties, UGC, brand sponsorships, and M-Pesa creator settlements.",
      "sameAs": [
        "https://twitter.com/clipkenya",
        "https://instagram.com/clipkenya",
        "https://tiktok.com/@clipkenya",
        "https://youtube.com/@clipkenya"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254-700-000-000",
        "contactType": "customer service",
        "areaServed": "KE",
        "availableLanguage": ["en", "Swahili"]
      }
    };

    const schemasToInject = jsonLdSchema ? [defaultOrganizationSchema, ...jsonLdSchema] : [defaultOrganizationSchema];

    // Remove old injected scripts
    const existingScripts = document.querySelectorAll('script[data-seo-jsonld="true"]');
    existingScripts.forEach((s) => s.remove());

    // Append new scripts
    schemasToInject.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-jsonld', 'true');
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

  }, [title, description, canonicalUrl, ogImage, ogType, keywords, jsonLdSchema]);

  return null;
};
