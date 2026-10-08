import React, { useState } from 'react';
import { Theme } from '../types';

interface SanctuaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
  theme: Theme;
}

export const SanctuaryModal: React.FC<SanctuaryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  theme,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name.trim() || 'Wanderer', email.trim() || 'wanderer@aether.io');
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
          <div className="w-9 h-9 rounded-xl bg-teal-100/80 dark:bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <span className="material-symbols-outlined text-[20px]">
              temp_preferences_custom
            </span>
          </div>
          <div>
            <h3
              className={`text-[15px] font-bold ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Create Sanctuary
            </h3>
            <p className="text-[12px] text-slate-500 dark:text-slate-400">
              Begin your personal voyage
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <div
            className={`relative flex items-center rounded-full px-3.5 py-2 frosted-input border ${
              isLight ? 'border-white/80' : 'border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">
              badge
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Chosen Name"
              className={`w-full bg-transparent text-[13px] focus:outline-none ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            />
          </div>

          <div
            className={`relative flex items-center rounded-full px-3.5 py-2 frosted-input border ${
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
              placeholder="Domain / Email"
              className={`w-full bg-transparent text-[13px] focus:outline-none ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            />
          </div>

          <div
            className={`relative flex items-center rounded-full px-3.5 py-2 frosted-input border ${
              isLight ? 'border-white/80' : 'border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">
              lock
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passphrase (min 6)"
              className={`w-full bg-transparent text-[13px] focus:outline-none ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white text-[13px] font-bold shadow-md shadow-sky-500/30 active:scale-95 transition-all mt-1 cursor-pointer"
          >
            Establish Realm
          </button>
        </form>
      </div>
    </div>
  );
};
