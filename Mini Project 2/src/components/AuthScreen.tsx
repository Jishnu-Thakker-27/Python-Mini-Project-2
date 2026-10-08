import React, { useState } from 'react';
import { Theme } from '../types';

interface AuthScreenProps {
  theme: Theme;
  onToggleTheme: (newTheme: Theme) => void;
  onBeginVoyage: (identifier: string) => void;
  onOpenRecovery: () => void;
  onOpenSanctuary: () => void;
  showToast: (msg: string, icon?: string, isError?: boolean) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  theme,
  onToggleTheme,
  onBeginVoyage,
  onOpenRecovery,
  onOpenSanctuary,
  showToast,
}) => {
  const [identifier, setIdentifier] = useState('wanderer@aether.io');
  const [passphrase, setPassphrase] = useState('celestialVoyage99');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ id?: string; pwd?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { id?: string; pwd?: string } = {};

    if (!identifier.trim()) {
      newErrors.id = 'Please enter a valid wanderer identifier';
    }
    if (!passphrase.trim()) {
      newErrors.pwd = 'Required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please provide both credentials', 'warning', true);
      return;
    }

    setErrors({});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      showToast(`Welcome back, ${identifier.split('@')[0]}! Voyage begun.`, 'verified');
      onBeginVoyage(identifier);
    }, 900);
  };

  const handleSocialConnect = (provider: string) => {
    if (provider === 'Passkey') {
      showToast('Biometric passkey verified', 'fingerprint');
    } else if (provider === 'Guest') {
      showToast('Entering voyage as Guest Wanderer', 'explore');
    } else {
      showToast(`Authenticating through ${provider}...`, 'lock_reset');
    }
    setTimeout(() => {
      onBeginVoyage(provider === 'Guest' ? 'guest_wanderer' : 'wanderer@aether.io');
    }, 600);
  };

  const isLight = theme === 'light';

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 py-8 overflow-hidden select-none">
      {/* Ambient Atmospheric Glowing Orbs */}
      <div
        className={`absolute -top-24 -left-20 w-88 h-88 rounded-full blur-[64px] pointer-events-none transition-all duration-1000 ${
          isLight
            ? 'bg-gradient-to-br from-white via-sky-200/70 to-cyan-200/40 opacity-90'
            : 'bg-radial from-sky-500/20 to-blue-900/10 opacity-60'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-20 w-80 h-80 rounded-full blur-[72px] pointer-events-none transition-all duration-1000 ${
          isLight
            ? 'bg-gradient-to-bl from-blue-100/60 via-indigo-100/40 to-white opacity-80'
            : 'bg-radial from-indigo-500/20 to-transparent opacity-50'
        }`}
      />
      <div
        className={`absolute -bottom-16 left-1/4 w-72 h-72 rounded-full blur-[80px] pointer-events-none ${
          isLight ? 'bg-sky-200/40' : 'bg-sky-400/10'
        }`}
      />

      {/* Main Glassmorphic Wrapper */}
      <div className="relative z-10 w-full max-w-sm flex flex-col gap-5">
        {/* Top Bar: Ambient Version Badge & Theme Switcher Pill */}
        <div className="flex justify-between items-center w-full">
          <div
            className={`flex items-center gap-1.5 backdrop-blur-md px-3 py-1.5 rounded-full border shadow-sm transition-colors ${
              isLight
                ? 'bg-white/70 border-white/80 shadow-slate-200/40 text-slate-600'
                : 'bg-slate-900/60 border-white/10 text-slate-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              Aether v2.4
            </span>
          </div>

          {/* Theme Switcher Pill */}
          <div
            className={`inline-flex items-center p-1 rounded-full border shadow-sm backdrop-blur-xl transition-colors ${
              isLight
                ? 'bg-white/60 border-white/80 shadow-slate-200/50'
                : 'bg-slate-900/70 border-white/10'
            }`}
          >
            <button
              onClick={() => onToggleTheme('light')}
              type="button"
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold transition-all duration-300 ${
                isLight
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-amber-500">
                light_mode
              </span>
              <span>Light</span>
            </button>
            <button
              onClick={() => onToggleTheme('dark')}
              type="button"
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold transition-all duration-300 ${
                !isLight
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                dark_mode
              </span>
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* Central Hero Glass Card */}
        <div
          className={`relative w-full rounded-2xl frosted-glass p-6 flex flex-col gap-5 ${
            isLight ? 'border-white/90 shadow-xl' : 'border-white/10 shadow-2xl'
          }`}
        >
          {/* Top Specular Highlight Streak */}
          <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          {/* App Emblem & Identity Header */}
          <div className="flex flex-col items-center text-center pt-1">
            <div
              onClick={() => showToast('Aether Quiz Engine v2.4 • In equilibrium', 'psychology')}
              className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 dark:bg-white/10 backdrop-blur-md shadow-md mb-2 group cursor-pointer active:scale-95 transition-all"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-400/25 via-teal-300/30 to-white/60 blur-md pointer-events-none"></div>
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/75 dark:bg-slate-900/60 backdrop-blur-xl border border-white/80 dark:border-white/20 shadow-lg shadow-sky-200/50 group-hover:scale-105 transition-all">
                <span className="material-symbols-outlined text-sky-600 dark:text-sky-400 text-[34px] group-hover:rotate-12 transition-transform duration-500">
                  psychology
                </span>
                <span className="absolute -top-1 -right-1 material-symbols-outlined text-teal-500 text-[14px] animate-pulse">
                  sparkles
                </span>
              </div>
            </div>

            <h1
              className={`text-[24px] font-bold tracking-tight leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Aether Quiz
            </h1>
            <p
              className={`text-[12px] mt-0.5 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Clean. Calm. Test your mind.
            </p>
          </div>

          {/* Interactive Input Form */}
          <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
            {/* Identifier Field */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between px-1">
                <label
                  className={`text-[11px] uppercase tracking-wider font-semibold ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  Identifier
                </label>
                {errors.id && (
                  <span className="text-[11px] text-rose-500 font-medium">
                    {errors.id}
                  </span>
                )}
              </div>
              <div
                className={`relative flex items-center rounded-full px-4 py-3 frosted-input transition-all ${
                  isLight ? 'border-white/80' : 'border-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2.5">
                  alternate_email
                </span>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="wanderer@aether.io"
                  className={`w-full bg-transparent text-[14px] focus:outline-none ${
                    isLight ? 'text-slate-900 placeholder:text-slate-400' : 'text-white placeholder:text-slate-500'
                  }`}
                />
                {identifier.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIdentifier('')}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      close
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Passphrase Field */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between px-1">
                <label
                  className={`text-[11px] uppercase tracking-wider font-semibold ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
                >
                  Passphrase
                </label>
                {errors.pwd && (
                  <span className="text-[11px] text-rose-500 font-medium">
                    {errors.pwd}
                  </span>
                )}
              </div>
              <div
                className={`relative flex items-center rounded-full px-4 py-3 frosted-input transition-all ${
                  isLight ? 'border-white/80' : 'border-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2.5">
                  lock_open
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="••••••••••••"
                  className={`w-full bg-transparent text-[14px] focus:outline-none ${
                    isLight ? 'text-slate-900 placeholder:text-slate-400' : 'text-white placeholder:text-slate-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 rounded-full text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Checkbox & Recovery */}
            <div className="flex items-center justify-between px-1 pt-0.5">
              <label
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2 cursor-pointer group select-none"
              >
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center transition-all ${
                    rememberMe
                      ? 'bg-sky-600 border border-sky-600 text-white'
                      : isLight
                      ? 'bg-white/80 border border-slate-300 text-transparent'
                      : 'bg-slate-800 border border-slate-600 text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px] font-bold">
                    check
                  </span>
                </div>
                <span
                  className={`text-[12px] font-medium transition-colors ${
                    isLight ? 'text-slate-600 group-hover:text-slate-900' : 'text-slate-400 group-hover:text-white'
                  }`}
                >
                  Remember
                </span>
              </label>

              <button
                type="button"
                onClick={onOpenRecovery}
                className="text-[12px] font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-colors focus:outline-none"
              >
                Recovery?
              </button>
            </div>

            {/* Primary Action Button: Begin Voyage */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative overflow-hidden mt-1.5 w-full py-3.5 px-6 rounded-full text-white text-[15px] font-bold flex items-center justify-center gap-2 group active:scale-[0.98] transition-all duration-300 shadow-[0_12px_28px_-6px_rgba(14,165,233,0.45)] hover:shadow-[0_16px_36px_-6px_rgba(14,165,233,0.6)] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgb(56, 189, 248) 0%, rgb(2, 132, 199) 100%)',
              }}
            >
              <span className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
              <span className="absolute inset-0 w-full h-full bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-300" />

              {!isLoading ? (
                <>
                  <span className="tracking-wide">Begin Voyage</span>
                  <span className="material-symbols-outlined text-[19px] transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 btn-spinner" />
                  <span className="tracking-wide text-white/90">Harmonizing...</span>
                </div>
              )}
            </button>
          </form>

          {/* Minimal Divider */}
          <div className="relative flex items-center justify-center my-0.5">
            <div
              className={`w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300/60 dark:via-white/10 to-transparent`}
            />
            <span
              className={`absolute px-3 text-[11px] font-medium rounded-full backdrop-blur-sm border transition-colors ${
                isLight
                  ? 'bg-white/85 text-slate-500 border-white/80'
                  : 'bg-slate-900/85 text-slate-400 border-white/10'
              }`}
            >
              or connect via
            </span>
          </div>

          {/* Social Connect Trays: Google, Passkey, Guest */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleSocialConnect('Google')}
              className="flex flex-col items-center justify-center py-2.5 rounded-xl frosted-btn-subtle backdrop-blur-md transition-all active:scale-95 group focus:outline-none"
            >
              <span className="material-symbols-outlined text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 text-[20px] transition-colors">
                account_circle
              </span>
              <span className="text-[11px] text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white mt-1 font-semibold transition-colors">
                Google
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialConnect('Passkey')}
              className="flex flex-col items-center justify-center py-2.5 rounded-xl frosted-btn-subtle backdrop-blur-md transition-all active:scale-95 group focus:outline-none"
            >
              <span className="material-symbols-outlined text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 text-[20px] transition-colors">
                fingerprint
              </span>
              <span className="text-[11px] text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white mt-1 font-semibold transition-colors">
                Passkey
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialConnect('Guest')}
              className="flex flex-col items-center justify-center py-2.5 rounded-xl frosted-btn-subtle backdrop-blur-md transition-all active:scale-95 group focus:outline-none"
            >
              <span className="material-symbols-outlined text-slate-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 text-[20px] transition-colors">
                explore
              </span>
              <span className="text-[11px] text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white mt-1 font-semibold transition-colors">
                Guest
              </span>
            </button>
          </div>
        </div>

        {/* Minimal Thought of the Dawn Quote Card */}
        <div
          className={`relative w-full rounded-2xl frosted-btn-subtle backdrop-blur-xl p-4 flex flex-col gap-1 shadow-sm transition-colors ${
            isLight ? 'border-white/80' : 'border-white/10'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[20px] text-sky-600 dark:text-sky-400 leading-none font-serif font-bold">
              “
            </span>
            <span
              className={`text-[10px] uppercase tracking-wider font-bold ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Thought of the Dawn
            </span>
          </div>
          <p
            className={`text-[12px] italic pl-2 leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            Focus on clarity, not speed. The mind unravels at its own natural rhythm.
          </p>
          <div className="w-12 h-[2px] bg-sky-400/60 rounded-full mt-1.5 ml-2" />
        </div>

        {/* Footer: Registration Invitation */}
        <div className="flex items-center justify-center gap-1.5 text-center pb-2">
          <span
            className={`text-[12px] ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Unregistered wanderer?
          </span>
          <button
            type="button"
            onClick={onOpenSanctuary}
            className="text-[12px] font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 underline decoration-sky-400/40 underline-offset-4 transition-colors focus:outline-none"
          >
            Create Sanctuary
          </button>
        </div>
      </div>
    </div>
  );
};
