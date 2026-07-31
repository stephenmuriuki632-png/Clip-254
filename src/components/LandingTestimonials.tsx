import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { Card } from './UI/Card';
import { Badge } from './UI/Badge';

export const LandingTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Brian Kiptoo',
      role: 'Short-Form Video Clipper',
      location: 'Nairobi, Kenya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      earnings: 'Made KES 145,000 last month',
      quote: 'ClipForge changed my life as a university editor. I extract 60-second clips from top podcasters and receive instant M-Pesa payouts the minute my clips hit view milestones!',
      verified: true
    },
    {
      name: 'Dr. Amina Hassan',
      role: 'Health & Lifestyle Tech YouTuber',
      location: 'Mombasa, Kenya',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      earnings: '1.2M+ TikTok views gained',
      quote: 'Instead of spending hours editing TikToks myself, I post my 45-minute YouTube episodes here. Over 80 clippers repurpose my content daily. My channel views exploded 400%!',
      verified: true
    },
    {
      name: 'Safaricom Youth Brand Team',
      role: 'Brand Marketing Manager',
      location: 'Nairobi HQ',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      earnings: 'Launched 15+ UGC Briefs',
      quote: 'Finding authentic Kenyan micro-influencers used to take weeks. With ClipForge’s UGC Marketplace, we receive 50+ vetted video submissions in under 48 hours with full usage rights.',
      verified: true
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="blue" size="lg">
            Community Love
          </Badge>
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by 15,000+ Creators, Editors & Brands
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Hear how ClipForge is empowering African digital entrepreneurs with fair compensation and escrow protection.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <Card key={idx} variant="default" padding="lg" className="space-y-4 relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200 dark:text-slate-800" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-heading font-bold text-xs text-slate-900 dark:text-white">{t.name}</h4>
                      {t.verified && <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.role} • {t.location}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 shrink-0">
                  {t.earnings}
                </span>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
