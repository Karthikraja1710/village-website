import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border border-[#e4dcce] bg-[#fffdfa] text-[#1c382b] transition-all transform animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-[#2e6844] shrink-0 mt-0.5" />
          )}
          {toast.type === 'warning' && (
            <AlertCircle className="w-5 h-5 text-[#c2593f] shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#59735d] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[#1c382b] leading-tight">{toast.title}</h4>
            {toast.description && (
              <p className="text-xs text-[#526f58] mt-1 leading-relaxed">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-[#8aa18e] hover:text-[#1c382b] p-1 rounded-md transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

