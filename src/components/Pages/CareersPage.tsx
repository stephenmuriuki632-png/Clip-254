import React from 'react';
import { Briefcase, MapPin, ArrowRight } from 'lucide-react';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';

export const CareersPage: React.FC = () => {
  const jobs = [
    {
      title: 'Senior Full-Stack Engineer (Node.js & Supabase)',
      dept: 'Engineering',
      location: 'Nairobi / Remote',
      type: 'Full-time'
    },
    {
      title: 'Head of Creator Ecosystem & Growth',
      dept: 'Community & Growth',
      location: 'Nairobi, Kenya',
      type: 'Full-time'
    },
    {
      title: 'Product Designer (Design Systems & Mobile)',
      dept: 'Design',
      location: 'Remote (Africa Timezone)',
      type: 'Full-time'
    },
    {
      title: 'M-Pesa & Payments Operations Lead',
      dept: 'Finance & Trust',
      location: 'Nairobi, Kenya',
      type: 'Full-time'
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <Badge variant="blue" size="lg">Join ClipKenya</Badge>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Help Us Empower 1 Million African Creators
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          We are a fast-growing team of creators, engineers, and product builders passionate about building financial infrastructure for Africa’s creator economy.
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job, idx) => (
          <Card key={idx} variant="default" padding="md" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-indigo-500/50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">{job.title}</h3>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-semibold">{job.dept}</span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{job.location} • {job.type}</span>
              </p>
            </div>

            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Apply Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
