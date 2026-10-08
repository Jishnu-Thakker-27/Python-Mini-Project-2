import React from 'react';
import { Theme, UserStats } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  theme: Theme;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userStats,
  theme,
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm rounded-3xl frosted-glass p-6 flex flex-col gap-4 shadow-2xl modal-enter border ${
          isLight
            ? 'bg-white/90 border-white/80 text-slate-800'
            : 'bg-[#121b2b]/95 border-white/15 text-[#dae2fd]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full transition-colors border shadow-sm ${
            isLight
              ? 'text-slate-500 hover:text-slate-900 hover:bg-white/80 border-white/60'
              : 'text-slate-400 hover:text-white hover:bg-white/10 border-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* User Card Header */}
        <div className="flex items-center gap-3.5 pr-8">
          <img
            src={userStats.avatarUrl}
            alt={userStats.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-sky-100 dark:ring-sky-900 shadow-md"
          />
          <div className="flex flex-col">
            <h3
              className={`text-[19px] font-bold leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {userStats.name}
            </h3>
            <span className="text-[12px] text-slate-500 dark:text-slate-400">
              {userStats.email}
            </span>
            <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-500/20 border border-sky-200/60 dark:border-sky-500/30 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse" />
              <span className="text-[10px] text-sky-800 dark:text-sky-300 font-bold uppercase tracking-wider">
                Leaderboard Rank #{userStats.rank}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div
            className={`p-3 rounded-2xl border shadow-sm flex flex-col ${
              isLight
                ? 'bg-white/70 border-white/80'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">
              Quizzes Taken
            </span>
            <span
              className={`text-[22px] font-bold mt-0.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {userStats.quizzesTaken}
            </span>
            <span className="text-[11px] text-teal-600 dark:text-teal-400 flex items-center gap-0.5 mt-0.5 font-medium">
              <span className="material-symbols-outlined text-[14px]">
                trending_up
              </span>
              +12 this week
            </span>
          </div>

          <div
            className={`p-3 rounded-2xl border shadow-sm flex flex-col ${
              isLight
                ? 'bg-white/70 border-white/80'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">
              Accuracy Marks
            </span>
            <span className="text-[22px] font-bold mt-0.5 text-sky-600 dark:text-sky-400">
              {userStats.accuracy}%
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Top 2% percentile
            </span>
          </div>
        </div>

        {/* Past Quizzes Breakdown */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 px-1">
            Past Quizzes
          </span>
          <div className="flex flex-col gap-1.5">
            {userStats.pastQuizzes.map((pq, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-2.5 rounded-xl border ${
                  isLight
                    ? 'bg-white/60 border-white/70 shadow-sm'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex flex-col">
                  <span
                    className={`text-[13px] font-semibold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {pq.title}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {pq.timeAgo} • {pq.totalQuestions} Questions
                  </span>
                </div>
                <span
                  className={`text-[13px] font-bold ${
                    idx === 0
                      ? 'text-sky-600 dark:text-sky-400'
                      : 'text-teal-600 dark:text-teal-400'
                  }`}
                >
                  {pq.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Modal Action */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-slate-900 dark:bg-sky-500 hover:bg-slate-800 dark:hover:bg-sky-400 text-white font-semibold text-[14px] text-center transition-colors active:scale-95 shadow-md mt-1 cursor-pointer"
        >
          Close Overview
        </button>
      </div>
    </div>
  );
};
