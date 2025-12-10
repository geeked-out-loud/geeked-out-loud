'use client';

import { useEffect, useState } from 'react';
import { FileWarning, X } from 'lucide-react';

interface MissingPageProps {
  show: boolean;
  path: string;
  onCloseAction: () => void;
}

export default function MissingPage({ show, path, onCloseAction }: MissingPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onCloseAction, 300); // Wait for exit animation
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show, onCloseAction]);

  if (!show && !isVisible) return null;

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="bg-zinc-900 text-white px-6 py-4 rounded-lg shadow-2xl border border-zinc-700 min-w-[320px] max-w-md relative">
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onCloseAction, 300);
          }}
          className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-4 pr-6">
          <div className="shrink-0 flex items-center">
            <FileWarning className="w-6.5 h-6.5 text-zinc-500" />
          </div>
          <div className="flex-1">
            <div className="font-mono text-sm font-semibold mb-1">YO!: Not So Fast</div>
            <div className="font-mono text-xs text-zinc-400">
              {path}
              <span className="text-zinc-500"> is under construction <br /> and i'm caffeine deprived.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
