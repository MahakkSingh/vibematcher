import React from 'react';

export const CheckerboardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative overflow-hidden bg-black text-white py-12 px-6">
    <div className="absolute top-0 right-0 w-full h-full opacity-10 checkerboard pointer-events-none"></div>
    <div className="relative z-10 max-w-7xl mx-auto">
      {children}
    </div>
  </div>
);

// Added onClick prop to allow clicking the glass card as requested in App.tsx
export const GlassCard: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`glass-morphism rounded-3xl p-6 shadow-xl border-2 border-white/50 ${className}`}
  >
    {children}
  </div>
);

export const CDIcon: React.FC<{ size?: string; className?: string }> = ({ size = "w-12 h-12", className = "" }) => (
  <div className={`${size} rounded-full bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 flex items-center justify-center border-2 border-white shadow-lg vinyl-spin ${className}`}>
    <div className="w-1/3 h-1/3 rounded-full bg-white/40 border border-white"></div>
  </div>
);

export const NeonButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  active?: boolean;
  className?: string;
}> = ({ children, onClick, active, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-2xl flex items-center gap-2 transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 ${
      active 
        ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]' 
        : 'bg-white text-slate-700 border-slate-200 hover:border-black shadow-sm'
    } ${className}`}
  >
    {children}
  </button>
);