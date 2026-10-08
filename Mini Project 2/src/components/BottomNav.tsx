import React from 'react';
import { Screen, Theme } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  theme: Theme;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  theme,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe pointer-events-none">
      <div className="px-4 pb-3 pt-1 flex justify-center">
        <div
          className={`pointer-events-auto flex items-center justify-around gap-1 px-3 py-1.5 w-full max-w-sm rounded-full backdrop-blur-2xl transition-all duration-300 ${
            theme === 'light'
              ? 'bg-white/80 border border-white/80 shadow-[0_12px_32px_rgba(15,23,42,0.08)]'
              : 'bg-[#121b2b]/80 border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.4)]'
          }`}
        >
          {/* Home Tab */}
          <button
            onClick={() => onNavigate('auth')}
            className={`flex-1 min-w-[70px] h-12 flex flex-col items-center justify-center gap-0.5 rounded-full transition-all active:scale-95 ${
              currentScreen === 'auth'
                ? theme === 'light'
                  ? 'text-sky-600 bg-sky-50 shadow-sm font-semibold'
                  : 'text-sky-400 bg-sky-500/15 shadow-[0_0_15px_rgba(56,189,248,0.2)] font-semibold'
                : theme === 'light'
                ? 'text-slate-500 hover:text-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">explore</span>
            <span className="text-[11px] font-medium leading-none">Home</span>
          </button>

          {/* Quiz Tab */}
          <button
            onClick={() => onNavigate('quiz')}
            className={`flex-1 min-w-[70px] h-12 flex flex-col items-center justify-center gap-0.5 rounded-full transition-all active:scale-95 ${
              currentScreen === 'quiz'
                ? theme === 'light'
                  ? 'text-sky-600 bg-sky-50 shadow-sm font-semibold'
                  : 'text-sky-400 bg-sky-500/15 shadow-[0_0_15px_rgba(56,189,248,0.2)] font-semibold'
                : theme === 'light'
                ? 'text-slate-500 hover:text-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">psychology</span>
            <span className="text-[11px] font-medium leading-none">Quiz</span>
          </button>

          {/* Rankings Tab */}
          <button
            onClick={() => onNavigate('rankings')}
            className={`flex-1 min-w-[70px] h-12 flex flex-col items-center justify-center gap-0.5 rounded-full transition-all active:scale-95 ${
              currentScreen === 'rankings'
                ? theme === 'light'
                  ? 'text-sky-600 bg-sky-50 shadow-sm font-semibold'
                  : 'text-sky-400 bg-sky-500/15 shadow-[0_0_15px_rgba(56,189,248,0.2)] font-semibold'
                : theme === 'light'
                ? 'text-slate-500 hover:text-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">leaderboard</span>
            <span className="text-[11px] font-medium leading-none">Rankings</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
