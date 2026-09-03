import React from 'react';

export interface InscriptionStageBoxProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  accentColor?: string;
  widthClass?: string;
  heightClass?: string;
  label?: string;
  bgImageUrl?: string;
  bgMaskOpacity?: number; // 0 for no mask, 0.4 for 40%, etc.
}

export const InscriptionStageBox: React.FC<InscriptionStageBoxProps> = ({
  children,
  className = '',
  glow = false,
  accentColor = '#dfba73',
  widthClass = 'w-72 sm:w-84 md:w-96',
  heightClass = 'h-44 sm:h-52 md:h-60',
  label,
  bgImageUrl,
  bgMaskOpacity = 0,
}) => {
  return (
    <div
      className={`relative ${widthClass} ${heightClass} flex flex-col items-center justify-center p-4 my-3 select-none overflow-hidden rounded-sm group ${
        bgImageUrl ? 'bg-cover bg-center shadow-[0_15px_40px_rgba(0,0,0,0.85)] border border-[#dfba73]/40' : ''
      } ${className}`}
      style={bgImageUrl ? { backgroundImage: `url(${bgImageUrl})` } : undefined}
    >
      {/* Background Image Mask if specified */}
      {bgImageUrl && bgMaskOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: `rgba(10, 15, 13, ${bgMaskOpacity})` }}
        />
      )}

      {/* Subtle Atmospheric Radial Ambient Glow (Frameless - Background Art Shines Through) */}
      {!bgImageUrl && (
        <div className="absolute inset-0 bg-radial-gradient from-[#0c1411]/40 via-transparent to-transparent pointer-events-none rounded-lg" />
      )}
      {glow && (
        <div
          className="absolute inset-0 rounded-lg animate-pulse pointer-events-none"
          style={{
            boxShadow: `0 0 40px ${accentColor}33, inset 0 0 20px ${accentColor}22`,
          }}
        />
      )}

      {/* =========================================================================
          FOUR CORNER BRONZE INSCRIPTION LINES & ACCENT GEOMETRIC KNOTS (四角铭文线)
         ========================================================================= */}

      {/* TOP-LEFT BRONZE INSCRIPTION CORNER */}
      <div className="absolute -top-1.5 -left-1.5 w-7 h-7 sm:w-9 sm:h-9 pointer-events-none z-20">
        {/* Horizontal Line */}
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-[#ffd885] via-[#dfba73] to-transparent shadow-[0_0_8px_rgba(223,186,115,0.6)]" />
        {/* Vertical Line */}
        <div className="absolute top-0 left-0 h-full w-[1.5px] bg-gradient-to-b from-[#ffd885] via-[#dfba73] to-transparent shadow-[0_0_8px_rgba(223,186,115,0.6)]" />
        {/* Corner Inscription Step Bracket */}
        <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#dfba73]/80" />
        {/* Diamond Node Pin */}
        <div className="absolute -top-1 -left-1 w-2 h-2 rotate-45 bg-[#ffd885] border border-[#7d5c21] shadow-sm" />
      </div>

      {/* TOP-RIGHT BRONZE INSCRIPTION CORNER */}
      <div className="absolute -top-1.5 -right-1.5 w-7 h-7 sm:w-9 sm:h-9 pointer-events-none z-20">
        <div className="absolute top-0 right-0 w-full h-[1.5px] bg-gradient-to-l from-[#ffd885] via-[#dfba73] to-transparent shadow-[0_0_8px_rgba(223,186,115,0.6)]" />
        <div className="absolute top-0 right-0 h-full w-[1.5px] bg-gradient-to-b from-[#ffd885] via-[#dfba73] to-transparent shadow-[0_0_8px_rgba(223,186,115,0.6)]" />
        <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#dfba73]/80" />
        <div className="absolute -top-1 -right-1 w-2 h-2 rotate-45 bg-[#ffd885] border border-[#7d5c21] shadow-sm" />
      </div>

      {/* BOTTOM-LEFT BRONZE INSCRIPTION CORNER */}
      <div className="absolute -bottom-1.5 -left-1.5 w-7 h-7 sm:w-9 sm:h-9 pointer-events-none z-20">
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-[#ffd885] via-[#dfba73] to-transparent shadow-[0_0_8px_rgba(223,186,115,0.6)]" />
        <div className="absolute bottom-0 left-0 h-full w-[1.5px] bg-gradient-to-t from-[#ffd885] via-[#dfba73] to-transparent shadow-[0_0_8px_rgba(223,186,115,0.6)]" />
        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-[#dfba73]/80" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 rotate-45 bg-[#ffd885] border border-[#7d5c21] shadow-sm" />
      </div>

      {/* BOTTOM-RIGHT BRONZE INSCRIPTION CORNER */}
      <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 sm:w-9 sm:h-9 pointer-events-none z-20">
        <div className="absolute bottom-0 right-0 w-full h-[1.5px] bg-gradient-to-l from-[#ffd885] via-[#dfba73] to-transparent shadow-[0_0_8px_rgba(223,186,115,0.6)]" />
        <div className="absolute bottom-0 right-0 h-full w-[1.5px] bg-gradient-to-t from-[#ffd885] via-[#dfba73] to-transparent shadow-[0_0_8px_rgba(223,186,115,0.6)]" />
        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-[#dfba73]/80" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 rotate-45 bg-[#ffd885] border border-[#7d5c21] shadow-sm" />
      </div>

      {/* Stage Bottom Floating Label (if any) */}
      {label && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#111a16]/90 border border-[#dfba73]/60 text-[#dfba73] text-[11px] font-serif tracking-widest pointer-events-none shadow-md z-20">
          {label}
        </div>
      )}

      {/* Interactive Canvas / Stage Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
