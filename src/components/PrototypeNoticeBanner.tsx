import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, SlidersHorizontal, Info } from 'lucide-react';

export const PrototypeNoticeBanner: React.FC = () => {
  const { setIsSettingsModalOpen } = useStore();

  return (
    <div className="bg-[#14281f] text-[#ece3d3] text-xs py-2 px-4 border-b border-[#264a39]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#bf563b]/20 text-[#f5a894] border border-[#bf563b]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bf563b] animate-pulse"></span>
            FUNCTIONAL PROTOTYPE
          </span>
          <p className="hidden sm:inline text-[#c9d6cb]">
            Sample village farm data &amp; editable placeholders. No live transactions or unverified claims.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-[#eef3ef] hover:text-white underline decoration-dotted underline-offset-4 font-medium transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8aa18e]" />
            <span>Store Config &amp; Placeholders</span>
          </button>
        </div>
      </div>
    </div>
  );
};
