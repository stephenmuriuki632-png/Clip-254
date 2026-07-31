import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Scissors,
  Mail,
  Lock,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Building2,
  Video,
  Camera,
  Briefcase,
  Users,
  AlertCircle,
  RefreshCw,
  Globe,
  Smartphone
} from 'lucide-react';
import { UserRole } from '../../types';

export type AuthMode = 'login' | 'register' | 'forgot_password' | 'verify_email' | 'reset_password' | 'profile_setup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onAuthSuccess?: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onAuthSuccess
}) => {
  const { setCurrentRole, updateUserProfile, currentUser } = useApp();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Form Fields
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('creator');
  const [otpCode, setOtpCode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2 || score === 3) return { score: 65, label: 'Medium', color: 'bg-amber-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (mode === 'login') {
        setSuccessMsg('Welcome back! Logging into ClipForge...');
        setTimeout(() => {
          onClose();
          if (onAuthSuccess) onAuthSuccess(selectedRole);
        }, 800);
      } else if (mode === 'register') {
        setMode('verify_email');
        setSuccessMsg(`Verification code sent to ${email || 'your email'}`);
      } else if (mode === 'verify_email') {
        if (otpCode.length < 4) {
          setErrorMsg('Please enter the 4-digit verification code sent to your phone/email.');
          return;
        }
        setMode('profile_setup');
      } else if (mode === 'forgot_password') {
        setSuccessMsg('Password reset instructions sent to your email.');
        setTimeout(() => setMode('login'), 2000);
      } else if (mode === 'reset_password') {
        setSuccessMsg('Password reset successfully! Please log in.');
        setTimeout(() => setMode('login'), 1500);
      } else if (mode === 'profile_setup') {
        updateUserProfile({
          name: fullName || currentUser.name,
          email: email || currentUser.email,
          role: selectedRole,
          primaryRole: selectedRole
        });
        setCurrentRole(selectedRole);
        setSuccessMsg('Profile setup complete!');
        setTimeout(() => {
          onClose();
          if (onAuthSuccess) onAuthSuccess(selectedRole);
        }, 1000);
      }
    }, 1000);
  };

  const handleSocialAuth = (provider: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`Authenticated via ${provider}`);
      setTimeout(() => {
        onClose();
        if (onAuthSuccess) onAuthSuccess(selectedRole);
      }, 800);
    }, 1200);
  };

  const rolesList: { id: UserRole; title: string; desc: string; icon: any }[] = [
    { id: 'creator', title: 'Content Creator', desc: 'Post streamer bounties & run campaigns', icon: Video },
    { id: 'clipper', title: 'Streamer Clipper', desc: 'Edit viral TikTok clips & earn M-Pesa payouts', icon: Scissors },
    { id: 'ugc', title: 'UGC Creator', desc: 'Create authentic product videos for brands', icon: Camera },
    { id: 'freelancer', title: 'Creative Freelancer', desc: 'Offer 4K video editing, voiceovers & motion graphics', icon: Briefcase },
    { id: 'brand', title: 'Brand / Business', desc: 'Sponsor creator campaigns with Escrow safety', icon: Building2 },
    { id: 'agency', title: 'Talent Agency', desc: 'Manage roster of African creators & automated payouts', icon: Users }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8">
        
        {/* Top Decorative Banner */}
        <div className="relative h-28 bg-gradient-to-r from-indigo-600 via-indigo-700 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
              <Scissors className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-lg text-white">ClipForge</h2>
              <p className="text-[11px] text-indigo-200">Africa's Premier Creator Economy Platform</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center font-bold text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Messages */}
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Mode Switcher Header */}
          {mode === 'login' || mode === 'register' ? (
            <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
                  mode === 'login'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
                  mode === 'register'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          ) : null}

          {/* Mode Titles */}
          {mode === 'forgot_password' && (
            <div className="text-center space-y-1">
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">Reset Password</h3>
              <p className="text-xs text-slate-500">Enter your email or M-Pesa registered phone number.</p>
            </div>
          )}

          {mode === 'verify_email' && (
            <div className="text-center space-y-1">
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">Verify Account</h3>
              <p className="text-xs text-slate-500">Enter the 4-digit code sent to your mobile device.</p>
            </div>
          )}

          {mode === 'profile_setup' && (
            <div className="text-center space-y-1">
              <h3 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">Select Primary Role</h3>
              <p className="text-xs text-slate-500">How do you intend to use ClipForge?</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Profile Setup Role Selector */}
            {mode === 'profile_setup' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-1">
                  {rolesList.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.id;
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRole(r.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-500/30'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-xs text-slate-900 dark:text-white font-heading">{r.title}</h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{r.desc}</p>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Registration Fields */}
            {mode === 'register' && (
              <>
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Maina Kamau"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">M-Pesa Phone Number</label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+254 712 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Field (Login, Register, Forgot) */}
            {(mode === 'login' || mode === 'register' || mode === 'forgot_password') && (
              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="creator@clipforge.africa"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Password Field (Login, Register, Reset) */}
            {(mode === 'login' || mode === 'register' || mode === 'reset_password') && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot_password')}
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {mode === 'register' && password && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Password Strength:</span>
                      <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${strength.color}`} style={{ width: `${strength.score}%` }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* OTP Code Verification Field */}
            {mode === 'verify_email' && (
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block text-center">4-Digit Security Code</label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="8 2 9 1"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full py-3 text-center text-xl font-mono font-extrabold tracking-widest rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[10px] text-slate-400 text-center">Didn't receive code? <button type="button" onClick={() => setSuccessMsg('New OTP sent!')} className="text-indigo-600 font-bold hover:underline">Resend</button></p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>
                    {mode === 'login' && 'Sign In to Studio'}
                    {mode === 'register' && 'Continue to Verification'}
                    {mode === 'forgot_password' && 'Send Reset Link'}
                    {mode === 'verify_email' && 'Verify Code'}
                    {mode === 'profile_setup' && 'Complete Profile Setup'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Sign-In Buttons */}
          {(mode === 'login' || mode === 'register') && (
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-bold text-center text-slate-400 uppercase tracking-wider">Or continue with</p>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('M-Pesa Account')}
                  className="py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>M-Pesa Express</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('Google Account')}
                  className="py-2.5 px-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  <Globe className="w-4 h-4 text-indigo-500" />
                  <span>Google</span>
                </button>
              </div>
            </div>
          )}

          {/* Trust Badges & Privacy */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-center">
            <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> M-Pesa Escrow
              </span>
              <span>•</span>
              <span>100% Identity Verified</span>
            </div>
            <p className="text-[10px] text-slate-400">
              By proceeding, you agree to ClipForge's <button onClick={onClose} className="underline hover:text-slate-600">Terms of Service</button> & <button onClick={onClose} className="underline hover:text-slate-600">Privacy Policy</button>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
