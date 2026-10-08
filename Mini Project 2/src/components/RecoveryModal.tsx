import React, { useState } from 'react';
import { Theme } from '../types';

interface RecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  theme: Theme;
}

export const RecoveryModal: React.FC<RecoveryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  theme,
}) => {
  const [email, setEmail] = useState('wanderer@aether.io');

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-xs rounded-2xl frosted-glass p-5 flex flex-col gap-4 shadow-2xl relative modal-enter border ${
          isLight
            ? 'bg-white/90 border-white/80 text-slate-800'
            : 'bg-[#121b2b]/95 border-white/15 text-[#dae2fd]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-100/80 dark:bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <span className="material-symbols-outlined text-[20px]">key</span>
          </div>
          <div>
            <h3
              className={`text-[15px] font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Mind Recovery
            </h3>
            <p className="text-[12px] text-slate-500 dark:text-slate-400">
              Retrieve your sanctuary key
            </p>
          </div>
        </div>

        <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed">
          Enter your email or wanderer pass to receive a celestial recovery link.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div
            className={`relative flex items-center rounded-full px-3.5 py-2.5 frosted-input border ${
              isLight ? 'border-white/80' : 'border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">
              mail
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="wanderer@aether.io"
              className={`w-full bg-transparent text-[13px] focus:outline-none ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            />
          </div>

          <div className="flex gap-2 mt-1">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2 rounded-full border text-[12px] font-medium transition-colors ${
                isLight
                  ? 'border-slate-200 text-slate-600 hover:bg-white/40'
                  : 'border-white/10 text-slate-400 hover:bg-white/5'
              }`}
            >
              Dismiss
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-[12px] font-bold shadow-md shadow-sky-500/30 active:scale-95 transition-all cursor-pointer"
            >
              Transmit Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
