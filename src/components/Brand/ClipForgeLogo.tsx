import React from 'react';

export interface ClipForgeLogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon' | 'monochrome';
  theme?: 'color' | 'light' | 'dark' | 'emerald';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export const ClipForgeLogo: React.FC<ClipForgeLogoProps> = ({
  variant = 'horizontal',
  theme = 'color',
  size = 'md',
  showBadge = false,
  className = '',
}) => {
  // Dimensions map based on size
  const iconSizeMap = {
    sm: 'w-6 h-6',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textGradMap = {
    color: 'text-slate-900 dark:text-white',
    light: 'text-white',
    dark: 'text-slate-900',
    emerald: 'text-slate-900 dark:text-white',
  };

  const badgeThemeMap = {
    color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900',
    light: 'bg-white/10 text-white border-white/20',
    dark: 'bg-slate-100 text-slate-800 border-slate-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const uniqueId = React.useId();
  const primaryGradId = `cf-grad-primary-${uniqueId}`;
  const accentGradId = `cf-grad-accent-${uniqueId}`;
  const darkGradId = `cf-grad-dark-${uniqueId}`;

  // Pure Vector Mark SVG
  const IconMark = (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${iconSizeMap[size]} transition-transform duration-200 group-hover:scale-105 shrink-0`}
    >
      <defs>
        <linearGradient id={primaryGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id={accentGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id={darkGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {theme === 'light' ? (
        // Light Theme Mark
        <g>
          <rect width="100" height="100" rx="26" fill="white" fillOpacity="0.15" />
          <path
            d="M26 32 C26 24 32 18 40 18 L68 18 C72 18 75 21 75 25 L75 32 L42 32 C38 32 36 34 36 38 L36 62 C36 66 38 68 42 68 L75 68 L75 75 C75 79 72 82 68 82 L40 82 C32 82 26 76 26 68 Z"
            fill="white"
          />
          <path
            d="M48 42 L72 42 C76 42 78 44 78 48 L78 52 L56 52 C52 52 50 54 50 58 L50 68 L42 68 L42 48 C42 44 44 42 48 42 Z"
            fill="white"
            fillOpacity="0.8"
          />
          <polygon points="62,38 82,50 62,62" fill="#10B981" />
        </g>
      ) : theme === 'dark' ? (
        // Dark Theme Mark
        <g>
          <rect width="100" height="100" rx="26" fill={`url(#${darkGradId})`} />
          <path
            d="M26 32 C26 24 32 18 40 18 L68 18 C72 18 75 21 75 25 L75 32 L42 32 C38 32 36 34 36 38 L36 62 C36 66 38 68 42 68 L75 68 L75 75 C75 79 72 82 68 82 L40 82 C32 82 26 76 26 68 Z"
            fill="#3B82F6"
          />
          <polygon points="62,38 82,50 62,62" fill="#10B981" />
        </g>
      ) : theme === 'monochrome' ? (
        // Monochrome Mark
        <g>
          <rect width="100" height="100" rx="26" fill="currentColor" />
          <path
            d="M26 32 C26 24 32 18 40 18 L68 18 C72 18 75 21 75 25 L75 32 L42 32 C38 32 36 34 36 38 L36 62 C36 66 38 68 42 68 L75 68 L75 75 C75 79 72 82 68 82 L40 82 C32 82 26 76 26 68 Z"
            fill="white"
          />
          <polygon points="62,38 82,50 62,62" fill="white" fillOpacity="0.6" />
        </g>
      ) : (
        // Default Color Signature Mark
        <g>
          {/* Base Shield Canvas */}
          <rect width="100" height="100" rx="26" fill={`url(#${primaryGradId})`} />

          {/* Subtly Cut Frame overlay */}
          <path
            d="M24 34 C24 25 31 18 40 18 L66 18 C71 18 74 21 74 26 C74 31 71 34 66 34 L40 34 C36 34 34 36 34 40 L34 60 C34 64 36 66 40 66 L66 66 C71 66 74 69 74 74 C74 79 71 82 66 82 L40 82 C31 82 24 75 24 66 Z"
            fill="white"
          />

          {/* Precision Forge Spark / Play Trigger */}
          <path
            d="M48 38 L72 38 C77 38 80 41 80 46 C80 49 78 52 74 53 L58 53 L58 64 C58 68 55 71 50 71 C45 71 42 68 42 64 L42 44 C42 40 44 38 48 38 Z"
            fill="white"
            fillOpacity="0.85"
          />

          {/* Emerald Forge Accent Diamond */}
          <polygon points="64,38 84,50 64,62" fill={`url(#${accentGradId})`} />
          <circle cx="74" cy="50" r="3" fill="#FFFFFF" />
        </g>
      )}
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {IconMark}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 group ${className}`}>
        {IconMark}
        <div className="flex flex-col items-center">
          <span className={`font-heading font-extrabold tracking-tight ${textGradMap[theme]} text-2xl`}>
            Clip<span className="text-indigo-600 dark:text-indigo-400">Forge</span>
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
            Creator Economy Super Platform
          </p>
          {showBadge && (
            <span className={`mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeThemeMap[theme]}`}>
              Global Platform
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      {IconMark}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-heading font-extrabold text-lg tracking-tight ${textGradMap[theme]}`}>
            Clip<span className="text-indigo-600 dark:text-indigo-400">Forge</span>
          </span>
          {showBadge && (
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${badgeThemeMap[theme]}`}>
              v2.5
            </span>
          )}
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
          Global Creator Super Platform
        </p>
      </div>
    </div>
  );
};
