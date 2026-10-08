import React, { useState } from 'react';
import { Theme, UserStats } from '../types';
import { CONTENDERS_LIST } from '../data/mockData';

interface LeaderboardScreenProps {
  theme: Theme;
  userStats: UserStats;
  onOpenProfile: () => void;
  showToast: (msg: string, icon?: string) => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  theme,
  userStats,
  onOpenProfile,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'week' | 'all-time' | 'category'>('week');
  const [searchQuery, setSearchQuery] = useState('');

  const isLight = theme === 'light';

  // Filter contenders list by search
  const filteredChallengers = CONTENDERS_LIST.slice(4).filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top1 = CONTENDERS_LIST[0];
  const top2 = CONTENDERS_LIST[1];
  const top3 = CONTENDERS_LIST[2];

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col gap-4 px-4 pt-20 pb-28 select-none">
      {/* Ambient background glows */}
      <div
        className={`fixed -top-24 -left-16 w-80 h-80 rounded-full blur-[70px] pointer-events-none -z-10 ${
          isLight ? 'bg-sky-300/40' : 'bg-sky-500/15'
        }`}
      />
      <div
        className={`fixed top-44 -right-16 w-72 h-72 rounded-full blur-[65px] pointer-events-none -z-10 ${
          isLight ? 'bg-sky-400/30' : 'bg-indigo-500/15'
        }`}
      />
      <div
        className={`fixed top-[450px] -left-20 w-80 h-80 rounded-full blur-[75px] pointer-events-none -z-10 ${
          isLight ? 'bg-cyan-200/50' : 'bg-teal-500/10'
        }`}
      />

      {/* Header Stat & Title Capsule */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded-full border shadow-sm ${
                isLight
                  ? 'bg-white/80 border-white/70 text-sky-700'
                  : 'bg-white/10 border-white/10 text-sky-400'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">stars</span>
            </span>
            <span
              className={`text-[11px] uppercase tracking-wider font-bold ${
                isLight ? 'text-slate-700' : 'text-sky-400'
              }`}
            >
              Global Season 14
            </span>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full backdrop-blur-md border shadow-sm ${
              isLight
                ? 'bg-white/75 border-white/70 text-slate-700'
                : 'bg-[#121b2b]/80 border-white/10 text-teal-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold">Live Updating</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-1">
          <h1
            className={`text-[23px] font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Arena Standings
          </h1>
          <span
            className={`text-[12px] font-medium ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            42,891 contenders
          </span>
        </div>
      </div>

      {/* Search Bar & Scope Pills */}
      <div className="flex flex-col gap-2.5">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[19px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contenders, guilds, or ranks..."
            className={`w-full h-11 pl-10 pr-4 rounded-2xl backdrop-blur-2xl text-[13.5px] border focus:outline-none transition-all shadow-sm ${
              isLight
                ? 'bg-white/75 border-white/90 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-sky-400/40'
                : 'bg-[#121b2b]/60 border-white/10 text-white placeholder:text-slate-500 focus:bg-[#121b2b]/90 focus:ring-2 focus:ring-sky-500/40'
            }`}
          />
        </div>

        {/* Scope Filter Tabs */}
        <div
          className={`flex items-center gap-1 p-1 rounded-2xl backdrop-blur-2xl border shadow-sm ${
            isLight
              ? 'bg-white/70 border-white/90 shadow-[0_4px_16px_rgba(15,23,42,0.04)]'
              : 'bg-[#121b2b]/50 border-white/10'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab('week');
              showToast('Filtered: This Week', 'calendar_today');
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-center text-[12px] transition-all active:scale-95 ${
              activeTab === 'week'
                ? isLight
                  ? 'bg-white text-slate-900 shadow-sm font-bold border border-white/90'
                  : 'bg-sky-500 text-white shadow-sm font-bold'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 font-medium'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            This Week
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('all-time');
              showToast('Filtered: All-Time records', 'history');
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-center text-[12px] transition-all active:scale-95 ${
              activeTab === 'all-time'
                ? isLight
                  ? 'bg-white text-slate-900 shadow-sm font-bold border border-white/90'
                  : 'bg-sky-500 text-white shadow-sm font-bold'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 font-medium'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            All-Time
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('category');
              showToast('Filtered: By Category Elo', 'category');
            }}
            className={`flex-1 py-1.5 px-3 rounded-xl text-center text-[12px] transition-all active:scale-95 ${
              activeTab === 'category'
                ? isLight
                  ? 'bg-white text-slate-900 shadow-sm font-bold border border-white/90'
                  : 'bg-sky-500 text-white shadow-sm font-bold'
                : isLight
                ? 'text-slate-600 hover:text-slate-900 font-medium'
                : 'text-slate-400 hover:text-white font-medium'
            }`}
          >
            By Category
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards with Frosted Pedestals */}
      <div className="grid grid-cols-3 gap-2.5 items-end pt-2">
        {/* 2nd Place: Kenji Sato */}
        <div
          onClick={() => showToast(`Kenji Sato: 2,210 PTS (${top2.accuracy}% Acc)`, 'military_tech')}
          className="flex flex-col items-center group cursor-pointer active:scale-95 transition-all"
        >
          <div className="relative mb-2">
            <div
              className={`w-14 h-14 rounded-full p-1 backdrop-blur-xl shadow-md ring-2 ${
                isLight ? 'bg-white/90 ring-slate-200/90' : 'bg-slate-800 ring-slate-600'
              }`}
            >
              <img
                src={top2.avatarUrl}
                alt={top2.name}
                className="w-full h-full object-cover rounded-full shadow-inner"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-white flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-[11px] font-bold leading-none">2</span>
            </div>
          </div>

          <div
            className={`w-full rounded-2xl p-2.5 backdrop-blur-2xl border flex flex-col items-center text-center relative overflow-hidden transition-all ${
              isLight
                ? 'bg-white/75 border-white/90 shadow-[0_16px_32px_-10px_rgba(15,23,42,0.08)]'
                : 'bg-[#121b2b]/70 border-white/10 shadow-[0_16px_32px_rgba(0,0,0,0.3)]'
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <span
              className={`text-[13px] font-semibold truncate w-full mt-0.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {top2.name}
            </span>
            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold tracking-wide mt-0.5">
              {top2.points.toLocaleString()} PTS
            </span>
            <div
              className={`mt-1.5 py-0.5 px-2 rounded-full text-[9px] uppercase font-semibold border ${
                isLight
                  ? 'bg-slate-100/90 text-slate-700 border-slate-200/60'
                  : 'bg-slate-800 text-slate-300 border-white/10'
              }`}
            >
              {top2.accuracy}% Acc
            </div>
          </div>
        </div>

        {/* 1st Place: Elena Rostova (Elevated Hero Pedestal) */}
        <div
          onClick={() => showToast(`Elena R.: Champion (2,450 PTS, 98% Acc)`, 'workspace_premium')}
          className="flex flex-col items-center -translate-y-2.5 group cursor-pointer active:scale-95 transition-all"
        >
          <div className="relative mb-2">
            <div
              className={`w-16 h-16 rounded-full p-1 backdrop-blur-2xl shadow-lg ring-2 relative ${
                isLight
                  ? 'bg-white/95 ring-amber-300/90 shadow-amber-200/40'
                  : 'bg-slate-800 ring-amber-400/90 shadow-amber-500/20'
              }`}
            >
              <img
                src={top1.avatarUrl}
                alt={top1.name}
                className="w-full h-full object-cover rounded-full shadow-inner"
              />
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-amber-500 drop-shadow-[0_2px_6px_rgba(245,158,11,0.5)]">
                <span className="material-symbols-outlined text-[24px]">
                  workspace_premium
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-[11px] font-bold leading-none">1</span>
            </div>
          </div>

          <div
            className={`w-full rounded-2xl p-2.5 backdrop-blur-3xl border flex flex-col items-center text-center relative overflow-hidden transition-all ${
              isLight
                ? 'bg-white/85 border-white shadow-[0_20px_38px_-8px_rgba(14,165,233,0.14)]'
                : 'bg-[#121b2b]/90 border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.4)]'
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-amber-300 to-sky-400" />
            <span
              className={`text-[14px] font-bold truncate w-full mt-1 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {top1.name}
            </span>
            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold tracking-wide mt-0.5">
              {top1.points.toLocaleString()} PTS
            </span>
            <div
              className={`mt-1.5 py-0.5 px-2.5 rounded-full text-[10px] uppercase font-bold border ${
                isLight
                  ? 'bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-800 border-sky-200/80'
                  : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
              }`}
            >
              {top1.accuracy}% Acc
            </div>
          </div>
        </div>

        {/* 3rd Place: Maya Patel */}
        <div
          onClick={() => showToast(`Maya Patel: 2,040 PTS (${top3.accuracy}% Acc)`, 'military_tech')}
          className="flex flex-col items-center group cursor-pointer active:scale-95 transition-all"
        >
          <div className="relative mb-2">
            <div
              className={`w-14 h-14 rounded-full p-1 backdrop-blur-xl shadow-md ring-2 ${
                isLight ? 'bg-white/90 ring-amber-200/70' : 'bg-slate-800 ring-amber-600'
              }`}
            >
              <img
                src={top3.avatarUrl}
                alt={top3.name}
                className="w-full h-full object-cover rounded-full shadow-inner"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-amber-700 to-amber-900 text-white flex items-center justify-center shadow-md border-2 border-white">
              <span className="text-[11px] font-bold leading-none">3</span>
            </div>
          </div>

          <div
            className={`w-full rounded-2xl p-2.5 backdrop-blur-2xl border flex flex-col items-center text-center relative overflow-hidden transition-all ${
              isLight
                ? 'bg-white/75 border-white/90 shadow-[0_16px_32px_-10px_rgba(15,23,42,0.08)]'
                : 'bg-[#121b2b]/70 border-white/10 shadow-[0_16px_32px_rgba(0,0,0,0.3)]'
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
            <span
              className={`text-[13px] font-semibold truncate w-full mt-0.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {top3.name}
            </span>
            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold tracking-wide mt-0.5">
              {top3.points.toLocaleString()} PTS
            </span>
            <div
              className={`mt-1.5 py-0.5 px-2 rounded-full text-[9px] uppercase font-semibold border ${
                isLight
                  ? 'bg-slate-100/90 text-slate-700 border-slate-200/60'
                  : 'bg-slate-800 text-slate-300 border-white/10'
              }`}
            >
              {top3.accuracy}% Acc
            </div>
          </div>
        </div>
      </div>

      {/* 'Your Position' Pinned Pristine Frosted Card */}
      <div
        onClick={onOpenProfile}
        className={`relative w-full rounded-2xl p-4 backdrop-blur-3xl border flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99] group ${
          isLight
            ? 'bg-white/85 border-white shadow-[0_18px_36px_-6px_rgba(14,165,233,0.12),inset_0_1px_1px_rgba(255,255,255,1)] hover:bg-white/95'
            : 'bg-[#121b2b]/85 border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.35)] hover:bg-[#121b2b]'
        }`}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full bg-gradient-to-b from-sky-400 to-sky-600 shadow-[0_0_12px_rgba(14,165,233,0.7)]" />

        <div className="flex items-center gap-3 min-w-0 pl-1.5 relative z-10">
          <div className="flex flex-col items-center justify-center w-7 shrink-0">
            <span className="text-[20px] font-bold text-sky-600 dark:text-sky-400 drop-shadow-sm">
              #{userStats.rank}
            </span>
          </div>

          <div className="relative shrink-0">
            <img
              src={userStats.avatarUrl}
              alt={userStats.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white shadow-sm" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[15px] font-bold truncate ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {userStats.name}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-sky-500 to-sky-600 text-white text-[9px] uppercase font-bold shadow-sm tracking-wide">
                You
              </span>
            </div>
            <span className="text-[12px] text-slate-500 dark:text-slate-400 truncate font-medium mt-0.5">
              {userStats.pastQuizzes.length * 8} Quizzes • {userStats.accuracy}% Accuracy
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0 relative z-10">
          <span
            className={`text-[19px] font-bold tracking-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {userStats.points.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">
              keyboard_double_arrow_up
            </span>
            Top 5%
          </span>
        </div>
      </div>

      {/* Subsequent Competitors Frosted Glass List (#5 - #10) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1 mb-0.5">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
            Challenger Tier
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            Realtime Elo 1,500+
          </span>
        </div>

        {filteredChallengers.map((contender) => (
          <div
            key={contender.rank}
            onClick={() => showToast(`${contender.name} • ${contender.points} PTS`, 'verified')}
            className={`flex items-center justify-between p-3 rounded-2xl backdrop-blur-xl border transition-all cursor-pointer active:scale-[0.99] ${
              isLight
                ? 'bg-white/65 hover:bg-white/85 border-white/80 shadow-[0_4px_16px_rgba(15,23,42,0.03)]'
                : 'bg-[#121b2b]/40 hover:bg-[#121b2b]/70 border-white/10 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-5 text-center text-[13px] text-slate-400 font-semibold shrink-0">
                {contender.rank}
              </span>
              <div className="w-10 h-10 rounded-full ring-1 ring-white/90 dark:ring-white/10 overflow-hidden shrink-0 shadow-sm">
                <img
                  src={contender.avatarUrl}
                  alt={contender.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-[14px] font-semibold truncate ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {contender.name}
                </span>
                <span className="text-[11.5px] text-slate-500 dark:text-slate-400">
                  {contender.quizzes} Quizzes • {contender.accuracy}% Acc
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <span
                className={`text-[14px] font-bold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {contender.points.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                PTS
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Goal & Motivational Mindful Note Widgets */}
      <div className="grid grid-cols-2 gap-2.5 mt-1">
        {/* Progress Ring Glass Capsule */}
        <div
          className={`p-3.5 rounded-2xl backdrop-blur-2xl border flex items-center justify-between shadow-sm ${
            isLight
              ? 'bg-white/70 border-white/80 shadow-[0_8px_25px_rgba(15,23,42,0.05)]'
              : 'bg-[#121b2b]/50 border-white/10'
          }`}
        >
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
              Weekly Goal
            </span>
            <span
              className={`text-[19px] font-bold mt-0.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {userStats.weeklyGoal.completed}/{userStats.weeklyGoal.total}
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              {userStats.weeklyGoal.total - userStats.weeklyGoal.completed} quizzes left
            </span>
          </div>

          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle
                className={isLight ? 'text-slate-200' : 'text-slate-800'}
                cx="18"
                cy="18"
                fill="none"
                r="14"
                stroke="currentColor"
                strokeWidth="3.2"
              />
              <circle
                className="text-sky-500 drop-shadow-[0_2px_4px_rgba(14,165,233,0.3)]"
                cx="18"
                cy="18"
                fill="none"
                r="14"
                stroke="currentColor"
                strokeDasharray="88"
                strokeDashoffset="17.6"
                strokeLinecap="round"
                strokeWidth="3.4"
              />
            </svg>
            <span
              className={`absolute text-[10px] font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              80%
            </span>
          </div>
        </div>

        {/* Motivational Mindful Note Pane */}
        <div
          className={`p-3.5 rounded-2xl backdrop-blur-2xl border flex flex-col justify-between shadow-sm ${
            isLight
              ? 'bg-white/70 border-white/80 shadow-[0_8px_25px_rgba(15,23,42,0.05)]'
              : 'bg-[#121b2b]/50 border-white/10'
          }`}
        >
          <span className="text-[24px] text-sky-600 dark:text-sky-400 leading-none -mt-1 font-serif select-none font-bold">
            “
          </span>
          <p
            className={`text-[12px] leading-snug font-medium italic ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            Focus on progress, not perfection.
          </p>
          <div className="h-0.5 w-8 bg-sky-500/60 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
};
