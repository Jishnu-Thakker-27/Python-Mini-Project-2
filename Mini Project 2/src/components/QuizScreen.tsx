import React, { useState, useEffect } from 'react';
import { Theme, Question, UserStats } from '../types';
import { QUIZ_QUESTIONS } from '../data/mockData';

interface QuizScreenProps {
  theme: Theme;
  userStats: UserStats;
  onOpenProfile: () => void;
  showToast: (msg: string, icon?: string, isError?: boolean) => void;
  onCompleteQuiz?: (score: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  theme,
  userStats,
  onOpenProfile,
  showToast,
}) => {
  // Current active question index (defaults to index 5 which corresponds to Question 06 from screenshots)
  const [currentIdx, setCurrentIdx] = useState(5);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'B',
    4: 'A',
    5: 'A', // default selection matching screenshot
  });
  const [showHint, setShowHint] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(24);
  const [streak, setStreak] = useState(5);

  const currentQuestion: Question = QUIZ_QUESTIONS[currentIdx] || QUIZ_QUESTIONS[0];
  const isLight = theme === 'light';

  // Live countdown timer matching screenshot "00:24"
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectOption = (letter: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: letter,
    }));
    showToast(`Choice ${letter} locked in`, 'check_circle');
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setShowHint(false);
      showToast(`Advancing to Question 0${currentIdx + 2}...`, 'arrow_forward');
    } else {
      showToast('Voyage module complete! Final scores tallied.', 'celebration');
    }
  };

  const handleSkip = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setShowHint(false);
      showToast(`Question 0${currentIdx + 1} deferred to end of queue`, 'redo');
    } else {
      showToast('All celestial questions reviewed', 'done_all');
    }
  };

  const progressPercent = Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100);
  const circumference = 2 * Math.PI * 30; // radius 30
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  const formattedTime = `00:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col gap-4 px-4 pt-20 pb-28 select-none">
      {/* Ambient background blur spots */}
      <div
        className={`fixed top-24 left-1/2 -translate-x-1/2 w-80 h-44 rounded-full blur-[80px] pointer-events-none -z-10 ${
          isLight ? 'bg-sky-200/40' : 'bg-sky-400/10'
        }`}
      />
      <div
        className={`fixed bottom-32 right-6 w-60 h-60 rounded-full blur-[90px] pointer-events-none -z-10 ${
          isLight ? 'bg-indigo-100/50' : 'bg-teal-500/10'
        }`}
      />

      {/* Screen Top Bar / Quick Status Strip */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold backdrop-blur-xl border shadow-sm ${
              isLight
                ? 'bg-white/80 border-white/90 text-sky-700'
                : 'bg-[#121b2b]/80 border-white/10 text-sky-400'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span className="truncate">{currentQuestion.domain}</span>
          </span>

          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-xl border ${
              isLight
                ? 'bg-white/60 border-white/80 text-slate-500'
                : 'bg-white/5 border-white/10 text-slate-400'
            }`}
          >
            Stage 02
          </span>
        </div>

        {/* Live Countdown Timer Pill */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-2xl border shadow-sm shrink-0 ${
            isLight
              ? 'bg-white/80 border-white/90 text-slate-800'
              : 'bg-[#121b2b]/90 border-white/10 text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[17px] text-sky-500">
            timer
          </span>
          <span className="text-[14px] font-bold tracking-tight text-sky-600 dark:text-sky-400">
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Bento Stats Row: Progress Arc Card + Question Breadcrumb Widget */}
      <div className="grid grid-cols-12 gap-3">
        {/* Left: Circular Progress Card */}
        <div
          className={`col-span-5 p-4 rounded-3xl backdrop-blur-2xl border flex flex-col items-center justify-center text-center relative overflow-hidden transition-all ${
            isLight
              ? 'bg-white/70 border-white/90 shadow-[0_12px_28px_-8px_rgba(15,23,42,0.05),inset_0_1px_2px_rgba(255,255,255,0.95)]'
              : 'bg-[#121b2b]/70 border-white/10 shadow-[0_14px_35px_rgba(0,0,0,0.3)]'
          }`}
        >
          <div className="relative w-18 h-18 flex items-center justify-center my-0.5">
            <svg className="w-18 h-18 transform -rotate-90" viewBox="0 0 72 72">
              <circle
                className={isLight ? 'text-slate-200/70' : 'text-slate-800'}
                cx="36"
                cy="36"
                fill="transparent"
                r="30"
                stroke="currentColor"
                strokeWidth="5"
              />
              <circle
                className="text-sky-500 transition-all duration-700 ease-out"
                cx="36"
                cy="36"
                fill="transparent"
                r="30"
                stroke="currentColor"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="5"
                style={{
                  filter: isLight
                    ? 'drop-shadow(0 3px 8px rgba(14, 165, 233, 0.4))'
                    : 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.6))',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`text-[17px] font-bold leading-none ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {progressPercent}%
              </span>
            </div>
          </div>
          <span
            className={`text-[10px] uppercase tracking-wider font-semibold mt-1 ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Quiz Progress
          </span>
        </div>

        {/* Right: Question Track & Streak Card */}
        <div
          className={`col-span-7 p-4 rounded-3xl backdrop-blur-2xl border flex flex-col justify-between relative overflow-hidden transition-all ${
            isLight
              ? 'bg-white/70 border-white/90 shadow-[0_12px_28px_-8px_rgba(15,23,42,0.05),inset_0_1px_2px_rgba(255,255,255,0.95)]'
              : 'bg-[#121b2b]/70 border-white/10 shadow-[0_14px_35px_rgba(0,0,0,0.3)]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-[11px] uppercase tracking-wider font-semibold ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Question Track
            </span>
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-bold ${
                isLight
                  ? 'text-amber-700 bg-amber-50/80 border-amber-200/60'
                  : 'text-teal-300 bg-teal-500/15 border-teal-500/30'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                local_fire_department
              </span>
              <span>{streak} Streak</span>
            </div>
          </div>

          <div className="flex flex-col my-1.5">
            <span
              className={`text-[21px] font-bold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Question 0{currentIdx + 1}
              <span
                className={`text-[13px] font-normal ${
                  isLight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {' '}
                / 10
              </span>
            </span>
            <span
              className={`text-[12px] font-medium mt-0.5 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Points Reward:{' '}
              <span className="text-sky-600 dark:text-sky-400 font-bold">
                +{currentQuestion.pointsReward} XP
              </span>
            </span>
          </div>

          <div
            className={`w-full rounded-full h-2 overflow-hidden flex p-0.5 shadow-inner ${
              isLight ? 'bg-slate-200/60' : 'bg-slate-800'
            }`}
          >
            <div
              className="bg-gradient-to-r from-sky-400 to-sky-500 h-full rounded-full transition-all duration-500 shadow-[0_1px_4px_rgba(14,165,233,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Track Indicators (1 to 10) */}
      <div
        className={`flex items-center justify-between px-3.5 py-2 rounded-full backdrop-blur-xl border shadow-sm gap-1 ${
          isLight
            ? 'bg-white/65 border-white/80'
            : 'bg-[#121b2b]/60 border-white/10'
        }`}
      >
        {QUIZ_QUESTIONS.map((q, idx) => {
          const isAnswered = selectedAnswers[idx] !== undefined && idx < currentIdx;
          const isActive = idx === currentIdx;

          if (isAnswered) {
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-200/80 dark:border-teal-700/60 text-[11px] font-bold shadow-sm transition-all hover:scale-105"
              >
                ✓
              </button>
            );
          }

          if (isActive) {
            return (
              <button
                key={q.id}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-sky-500 text-white text-[12px] font-bold shadow-[0_3px_10px_rgba(14,165,233,0.45)] scale-110 ring-2 ring-sky-300/60 transition-all"
              >
                {idx + 1}
              </button>
            );
          }

          return (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(idx)}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] border transition-all hover:scale-105 ${
                isLight
                  ? 'bg-white/70 text-slate-400 border-white/80'
                  : 'bg-white/5 text-slate-500 border-white/10'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Primary Question Frosted Panel */}
      <div
        className={`relative p-5 rounded-3xl backdrop-blur-3xl border flex flex-col gap-2.5 overflow-hidden transition-all ${
          isLight
            ? 'bg-white/75 border-white/90 shadow-[0_14px_35px_-10px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]'
            : 'bg-[#121b2b]/75 border-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.35)]'
        }`}
      >
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px]">
          <span className="material-symbols-outlined text-[19px] text-sky-600 dark:text-sky-400">
            neurology
          </span>
          <span className="uppercase tracking-wider font-semibold">
            {currentQuestion.category}
          </span>
        </div>

        <h2
          className={`text-[20px] font-bold leading-snug tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          {currentQuestion.question}
        </h2>

        <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-white/10">
          <span className="text-[12px] text-slate-500 dark:text-slate-400 font-medium">
            Single choice selection
          </span>
          <span
            className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${
              isLight
                ? 'text-sky-700 bg-sky-100/70 border-sky-200/80'
                : 'text-sky-300 bg-sky-500/15 border-sky-500/30'
            }`}
          >
            {currentQuestion.difficulty}
          </span>
        </div>
      </div>

      {/* 4 Interactive Frosted Glass Option Cards */}
      <div className="flex flex-col gap-2.5">
        {currentQuestion.options.map((opt) => {
          const isSelected = selectedAnswers[currentIdx] === opt.letter;

          return (
            <div
              key={opt.letter}
              onClick={() => handleSelectOption(opt.letter)}
              className={`group relative p-3.5 rounded-2xl backdrop-blur-2xl transition-all duration-200 cursor-pointer active:scale-[0.99] flex items-center gap-3.5 ${
                isSelected
                  ? isLight
                    ? 'bg-white/95 border-2 border-sky-400 shadow-[0_8px_25px_rgba(14,165,233,0.18),inset_0_1px_2px_rgba(255,255,255,0.95)]'
                    : 'bg-gradient-to-r from-sky-500/15 via-[#1a2538] to-[#1a2538] border-2 border-sky-400/80 shadow-[0_0_24px_rgba(56,189,248,0.22)]'
                  : isLight
                  ? 'bg-white/65 hover:bg-white/90 border border-white/90 shadow-[0_4px_16px_rgba(15,23,42,0.03),inset_0_1px_2px_rgba(255,255,255,0.85)]'
                  : 'bg-[#121b2b]/40 hover:bg-[#121b2b]/70 border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
              }`}
            >
              {/* Badge Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[16px] font-bold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-[0_4px_14px_rgba(14,165,233,0.45)]'
                    : isLight
                    ? 'bg-slate-100/90 text-slate-600 group-hover:text-slate-900 border border-slate-200/70'
                    : 'bg-slate-800 text-slate-400 group-hover:text-white border border-white/10'
                }`}
              >
                {opt.letter}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[13.5px] leading-snug transition-colors ${
                    isSelected
                      ? isLight
                        ? 'text-slate-900 font-bold'
                        : 'text-white font-bold'
                      : isLight
                      ? 'text-slate-700 font-normal group-hover:text-slate-900'
                      : 'text-slate-300 font-normal group-hover:text-white'
                  }`}
                >
                  {opt.text}
                </p>
              </div>

              {/* Checkmark Icon */}
              <span
                className={`material-symbols-outlined text-[22px] shrink-0 transition-colors ${
                  isSelected
                    ? 'text-sky-500'
                    : 'text-transparent'
                }`}
              >
                check_circle
              </span>
            </div>
          );
        })}
      </div>

      {/* Interactive Hint Tray (Expandable) */}
      {showHint && (
        <div
          className={`rounded-2xl p-4 backdrop-blur-2xl border shadow-sm transition-all modal-enter ${
            isLight
              ? 'bg-white/85 border-white/90 text-slate-700'
              : 'bg-[#121b2b]/85 border-white/10 text-slate-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-teal-500 text-[22px] shrink-0 mt-0.5">
              tips_and_updates
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-bold text-teal-600 dark:text-teal-400">
                {currentQuestion.hint.title}
              </span>
              <p className="text-[12px] leading-relaxed">
                {currentQuestion.hint.description}
              </p>
              {currentQuestion.hint.formula && (
                <div className="mt-1 font-mono text-[11px] text-teal-700 dark:text-teal-300 bg-teal-500/10 px-2 py-1 rounded-md w-fit border border-teal-500/20">
                  {currentQuestion.hint.formula}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Controls: Hint, Skip, Next Question */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={() => setShowHint(!showHint)}
          className={`h-12 px-4 rounded-full active:scale-95 transition-all flex items-center gap-1.5 backdrop-blur-xl border shadow-sm font-semibold text-[13px] ${
            showHint
              ? 'bg-teal-50 text-teal-700 border-teal-300 dark:bg-teal-900/30 dark:text-teal-300'
              : isLight
              ? 'bg-white/75 hover:bg-white text-slate-700 border-white/90'
              : 'bg-[#121b2b]/70 hover:bg-[#121b2b] text-slate-300 border-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-teal-500 text-[19px]">
            lightbulb
          </span>
          <span>Hint</span>
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className={`h-12 px-4 rounded-full active:scale-95 transition-all flex items-center gap-1.5 backdrop-blur-xl border shadow-sm font-semibold text-[13px] ${
            isLight
              ? 'bg-white/60 hover:bg-white text-slate-600 border-white/80'
              : 'bg-[#121b2b]/50 hover:bg-[#121b2b] text-slate-400 border-white/10'
          }`}
        >
          <span>Skip</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex-1 h-12 px-5 rounded-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white text-[14.5px] font-bold flex items-center justify-center gap-2 active:scale-95 shadow-[0_8px_24px_rgba(14,165,233,0.4)] transition-all cursor-pointer"
        >
          <span>Next Question</span>
          <span className="material-symbols-outlined text-[19px]">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Minimal Thought Pane / Stargazer Codex Quote */}
      <div
        className={`relative p-3.5 rounded-2xl backdrop-blur-xl border flex flex-col gap-1 shadow-sm ${
          isLight
            ? 'bg-white/70 border-white/80 text-slate-600'
            : 'bg-[#121b2b]/40 border-white/10 text-slate-400'
        }`}
      >
        <div className="text-slate-400 text-[20px] font-serif leading-none opacity-70">
          “
        </div>
        <p className="text-[12px] leading-relaxed pl-1 italic">
          Focus on progress, not perfection. Every discovery expands the frontier.
        </p>
        <div className="w-8 h-0.5 bg-sky-400/60 rounded-full my-0.5 ml-1" />
        <span className="text-[10px] uppercase tracking-wider font-semibold pl-1 text-sky-600 dark:text-sky-400">
          Aether Stargazer Codex
        </span>
      </div>

      {/* Dedicated Student Avatar Card & Profile Trigger */}
      <div
        className={`p-3.5 rounded-2xl backdrop-blur-2xl border flex items-center justify-between shadow-sm ${
          isLight
            ? 'bg-white/75 border-white/90'
            : 'bg-[#121b2b]/60 border-white/10'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={userStats.avatarUrl}
            alt={userStats.name}
            className="w-11 h-11 rounded-full object-cover shadow-sm ring-2 ring-white shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span
              className={`text-[14px] font-bold truncate leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {userStats.name}
            </span>
            <span className="text-[12px] text-slate-500 dark:text-slate-400 truncate">
              {userStats.title} • {userStats.points.toLocaleString()} pts
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenProfile}
          className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-all active:scale-95 shrink-0 flex items-center gap-1 border ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200/80 text-sky-700 border-slate-200/60'
              : 'bg-white/10 hover:bg-white/15 text-sky-400 border-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            equalizer
          </span>
          <span>Stats</span>
        </button>
      </div>
    </div>
  );
};
