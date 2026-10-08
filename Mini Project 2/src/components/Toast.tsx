import React from 'react';

export interface ToastMessage {
  id: string;
  message: string;
  icon?: string;
  isError?: boolean;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2 w-full px-4 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-toast flex items-center gap-2.5 px-4 py-2.5 rounded-full text-[13px] font-medium shadow-xl backdrop-blur-2xl border pointer-events-auto select-none ${
            toast.isError
              ? 'bg-rose-50/95 dark:bg-rose-950/90 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800'
              : 'bg-white/95 dark:bg-[#121b2b]/95 text-slate-900 dark:text-white border-white/80 dark:border-white/10'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[18px] ${
              toast.isError
                ? 'text-rose-500'
                : 'text-sky-500'
            }`}
          >
            {toast.icon || 'info'}
          </span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
