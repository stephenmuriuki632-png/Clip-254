import React from 'react';
import { Accordion } from './UI/Accordion';
import { Badge } from './UI/Badge';

export const LandingFAQ: React.FC = () => {
  const faqItems = [
    {
      id: 'faq-1',
      title: 'How do M-Pesa payouts work on ClipKenya?',
      content: 'When a campaign bounty or UGC service order is created, funds are safely deposited into our Escrow account. Once you submit your video clip or UGC delivery link and it is approved by the creator/brand (or auto-approved after review period), the payment is instantly dispatched to your registered Safaricom M-Pesa phone number in Kenyan Shillings (KES).'
    },
    {
      id: 'faq-2',
      title: 'Do I need professional video editing software to be a clipper?',
      content: 'Not at all! Many top clippers on ClipKenya use mobile editing apps like CapCut, VN Editor, or InShot alongside our built-in Gemini AI Viral Suite to generate hooks and captions. Raw 4K clips are provided directly in campaign source files.'
    },
    {
      id: 'faq-3',
      title: 'Who owns the copyright of clipped videos?',
      content: 'The original content creator retains long-form rights, while granting clippers commercial license to repurpose clips for the specified campaign duration. Brands purchasing UGC videos acquire full commercial usage rights as detailed in our Terms of Service.'
    },
    {
      id: 'faq-4',
      title: 'How does ClipKenya protect creators and clippers against fraud?',
      content: 'All campaign budgets are 100% pre-funded and held in escrow before clippers begin work. If a creator fails to review submitted work within 72 hours, funds are automatically released to the clipper. Disputes are handled by our 24/7 ClipKenya Audit Team.'
    },
    {
      id: 'faq-5',
      title: 'Can brands outside Kenya use ClipKenya to target African audiences?',
      content: 'Yes! International brands can fund bounties in USD via Visa, Mastercard, or PayPal. Our system converts payments to local currencies (KES, NGN, ZAR, RWF) so local African creators receive seamless local mobile money payouts.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-3">
          <Badge variant="purple" size="lg">
            Got Questions?
          </Badge>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Everything you need to know about payouts, campaign creation, escrow safety, and creator licensing.
          </p>
        </div>

        <Accordion items={faqItems} defaultOpenId="faq-1" />

      </div>
    </section>
  );
};
