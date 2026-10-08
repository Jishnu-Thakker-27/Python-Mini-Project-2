import React, { useState } from 'react';
import { Theme, Screen, UserStats } from '../types';
import { AETHER_LOGO_URL } from '../data/mockData';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  currentScreen: Screen;
  userStats: UserStats;
  onOpenProfile: () => void;
  onNavigate: (screen: Screen) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  currentScreen,
  userStats,
  onOpenProfile,
  onNavigate,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getSubtitle = () => {
    switch (currentScreen) {
      case 'quiz':
        return 'Live Quiz Arena';
      case 'rankings':
        return 'Global Leaderboard';
      default:
        return 'Mindful Sanctuary';
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 pt-safe backdrop-blur-2xl transition-colors duration-500 ${
          theme === 'light'
            ? 'bg-white/75 border-b border-white/60 shadow-[0_4px_25px_rgba(0,0,0,0.03)]'
            : 'bg-[#0b1326]/75 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.25)]'
        }`}
      >
        <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-2 max-w-lg mx-auto">
          {/* Logo & Title */}
          <div
            className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
            onClick={() => onNavigate('quiz')}
          >
            <img
              src={AETHER_LOGO_URL}
              alt="Aether Quiz Logo"
              className="h-8 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span
                className={`text-[16px] font-semibold tracking-tight truncate leading-tight ${
                  theme === 'light' ? 'text-slate-900' : 'text-[#f8fafc]'
                }`}
              >
                Aether Quiz
              </span>
              <span
                className={`text-[10px] uppercase tracking-wider truncate font-semibold ${
                  theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {getSubtitle()}
              </span>
            </div>
          </div>

          {/* Actions: Theme Toggle & Avatar */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onToggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                theme === 'light'
                  ? 'text-slate-600 hover:text-sky-600 hover:bg-white/80 border border-white/60 shadow-sm bg-white/50'
                  : 'text-slate-300 hover:text-sky-400 hover:bg-white/10 border border-white/10 shadow-sm bg-white/5'
              }`}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle theme"
            >
              <span className="material-symbols-outlined text-[20px]">
                {theme === 'light' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative p-0.5 rounded-full hover:ring-2 hover:ring-sky-400/50 transition-all active:scale-95 focus:outline-none flex items-center justify-center shadow-sm"
              aria-label="Open profile menu"
            >
              <img
                src={userStats.avatarUrl}
                alt={userStats.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/80 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Avatar Dropdown Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`fixed top-16 right-4 z-50 w-64 rounded-2xl backdrop-blur-3xl p-3 shadow-2xl transition-all duration-200 ${
              theme === 'light'
                ? 'bg-white/90 border border-white/80 text-slate-800'
                : 'bg-[#121b2b]/95 border border-white/10 text-[#dae2fd]'
            }`}
          >
            <div className="px-3 py-2 mb-1 border-b border-slate-200/50 dark:border-white/10">
              <p
                className={`text-[15px] font-semibold leading-snug ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}
              >
                {userStats.name}
              </p>
              <p className="text-[11px] text-sky-500 font-medium">
                {userStats.title} • Rank #{userStats.rank}
              </p>
            </div>

            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenProfile();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-[13px] font-medium transition-colors hover:bg-sky-500/10"
              >
                <span className="material-symbols-outlined text-sky-500 text-[18px]">
                  account_circle
                </span>
                <span>Profile Overview</span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onToggleTheme();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-[13px] font-medium transition-colors hover:bg-sky-500/10"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-teal-500 text-[18px]">
                    palette
                  </span>
                  <span>Theme Switcher</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold opacity-70">
                  {theme === 'light' ? 'Light' : 'Dark'}
                </span>
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('rankings');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-[13px] font-medium transition-colors hover:bg-sky-500/10"
              >
                <span className="material-symbols-outlined text-amber-500 text-[18px]">
                  leaderboard
                </span>
                <span>Arena Standings</span>
              </button>

              <div className="my-1 h-px bg-slate-200/50 dark:bg-white/10" />

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('auth');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-[13px] font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  logout
                </span>
                <span>Return to Voyage Gate</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
