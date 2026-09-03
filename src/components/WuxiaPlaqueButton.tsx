import React from 'react';
import { sound } from '../audio';

export interface WuxiaPlaqueButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'bronze' | 'gold' | 'jade' | 'crimson';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  soundType?: 'click' | 'sword' | 'parry' | 'hammer' | 'chime';
  glow?: boolean;
}

export const WuxiaPlaqueButton: React.FC<WuxiaPlaqueButtonProps> = ({
  children,
  title,
  subtitle,
  icon,
  variant = 'bronze',
  size = 'md',
  soundType = 'click',
  glow = false,
  className = '',
  onClick,
  disabled,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (soundType === 'sword') sound.playSwordSlash();
    else if (soundType === 'parry') sound.playParry();
    else if (soundType === 'hammer') sound.playHammerStrike();
    else if (soundType === 'chime') sound.playVirtueChime();
    else sound.playClick();

    if (onClick) onClick(e);
  };

  const displayText = title || children;

  // Size scalings
  const sizeStyles = {
    sm: {
      container: 'px-4 py-1.5 min-h-[42px] max-w-xs',
      text: 'text-sm sm:text-base tracking-widest',
      iconBox: 'w-7 h-7',
      subText: 'text-[10px]',
      crestW: 'w-10 h-3',
    },
    md: {
      container: 'px-6 py-2.5 sm:px-8 sm:py-3 min-h-[56px] min-w-[220px] max-w-md',
      text: 'text-base sm:text-xl tracking-[0.25em]',
      iconBox: 'w-10 h-10 sm:w-11 sm:h-11',
      subText: 'text-xs',
      crestW: 'w-16 h-4',
    },
    lg: {
      container: 'px-8 py-3.5 sm:px-10 sm:py-4 min-h-[66px] min-w-[280px] max-w-lg',
      text: 'text-lg sm:text-2xl tracking-[0.3em]',
      iconBox: 'w-12 h-12 sm:w-14 sm:h-14',
      subText: 'text-xs sm:text-sm',
      crestW: 'w-20 h-5',
    },
    xl: {
      container: 'px-10 py-4 sm:px-14 sm:py-5 min-h-[76px] min-w-[320px]',
      text: 'text-xl sm:text-3xl tracking-[0.35em]',
      iconBox: 'w-14 h-14 sm:w-16 sm:h-16',
      subText: 'text-sm',
      crestW: 'w-24 h-6',
    },
  }[size];

  // Colors per variant
  const palette = {
    bronze: {
      border: '#a67c33',
      innerBorder: '#4a3818',
      bgGradients: 'from-[#172420] via-[#24352e] to-[#172420]',
      textColor: 'from-[#fff5dc] via-[#ffd885] to-[#c59c47]',
      glowShadow: 'rgba(223, 186, 115, 0.4)',
      accentColor: '#dfba73',
      medallionBorder: '#c59c47',
      medallionBg: 'radial-gradient(circle, #2a3d34 0%, #111a16 100%)',
    },
    gold: {
      border: '#dfba73',
      innerBorder: '#7d5c21',
      bgGradients: 'from-[#2a2416] via-[#3d331d] to-[#2a2416]',
      textColor: 'from-[#ffffff] via-[#ffe6a3] to-[#dfba73]',
      glowShadow: 'rgba(255, 216, 133, 0.6)',
      accentColor: '#ffd885',
      medallionBorder: '#ffd885',
      medallionBg: 'radial-gradient(circle, #3d331d 0%, #19140a 100%)',
    },
    jade: {
      border: '#5cb87a',
      innerBorder: '#235233',
      bgGradients: 'from-[#13261c] via-[#1d3829] to-[#13261c]',
      textColor: 'from-[#e6faee] via-[#a3f0bf] to-[#5cb87a]',
      glowShadow: 'rgba(92, 184, 122, 0.45)',
      accentColor: '#7fe29f',
      medallionBorder: '#5cb87a',
      medallionBg: 'radial-gradient(circle, #1d3829 0%, #0d1a13 100%)',
    },
    crimson: {
      border: '#d64d3e',
      innerBorder: '#5e1e17',
      bgGradients: 'from-[#2a1715] via-[#3d201d] to-[#2a1715]',
      textColor: 'from-[#fff0ed] via-[#ffaba0] to-[#dfba73]',
      glowShadow: 'rgba(214, 77, 62, 0.45)',
      accentColor: '#ff7b6b',
      medallionBorder: '#d64d3e',
      medallionBg: 'radial-gradient(circle, #3d201d 0%, #170b0a 100%)',
    },
  }[variant];

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-between font-serif font-bold transition-all duration-300 select-none cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${
        glow ? 'animate-pulse' : ''
      } ${sizeStyles.container} ${className}`}
      style={{
        boxShadow: `0 8px 24px rgba(0,0,0,0.85), 0 0 20px ${palette.glowShadow}`,
      }}
      {...rest}
    >
      {/* 1. LAYER: TOP & BOTTOM ORNAMENTAL CLOUD CRESTS (SVGs) */}
      {/* Top Center Cloud Finial */}
      <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 ${sizeStyles.crestW} pointer-events-none z-20 flex justify-center`}>
        <svg viewBox="0 0 100 28" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" fill="none">
          <path
            d="M50 0 L58 10 C68 4, 78 8, 85 15 C88 18, 92 19, 96 19 L100 24 L0 24 L4 19 C8 19, 12 18, 15 15 C22 8, 32 4, 42 10 Z"
            fill="url(#bronzeGradient)"
            stroke={palette.border}
            strokeWidth="1.2"
          />
          {/* Central Diamond Gem */}
          <polygon points="50,4 55,12 50,20 45,12" fill={palette.accentColor} stroke="#ffffff" strokeWidth="0.8" />
          <defs>
            <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dfba73" />
              <stop offset="50%" stopColor="#8a6327" />
              <stop offset="100%" stopColor="#453112" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Center Cloud Finial */}
      <div className={`absolute -bottom-3.5 left-1/2 -translate-x-1/2 ${sizeStyles.crestW} pointer-events-none z-20 flex justify-center rotate-180`}>
        <svg viewBox="0 0 100 28" className="w-full h-full drop-shadow-[0_-2px_4px_rgba(0,0,0,0.9)]" fill="none">
          <path
            d="M50 0 L58 10 C68 4, 78 8, 85 15 C88 18, 92 19, 96 19 L100 24 L0 24 L4 19 C8 19, 12 18, 15 15 C22 8, 32 4, 42 10 Z"
            fill="url(#bronzeGradientBottom)"
            stroke={palette.border}
            strokeWidth="1.2"
          />
          <polygon points="50,4 55,12 50,20 45,12" fill={palette.accentColor} stroke="#ffffff" strokeWidth="0.8" />
          <defs>
            <linearGradient id="bronzeGradientBottom" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dfba73" />
              <stop offset="50%" stopColor="#8a6327" />
              <stop offset="100%" stopColor="#453112" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 2. LAYER: MAIN OUTER BRONZE INSCRIBED FRAME WITH STEPPED CORNERS */}
      <div
        className="absolute inset-0 rounded-[6px] border-[2.5px] pointer-events-none z-10 transition-colors duration-300 group-hover:border-[#ffe199]"
        style={{
          borderColor: palette.border,
          boxShadow: `inset 0 1px 2px rgba(255,255,255,0.4), inset 0 0 10px rgba(0,0,0,0.9)`,
        }}
      />

      {/* Inner Inscribed Bevel Line */}
      <div
        className="absolute inset-[3px] rounded-[3px] border pointer-events-none z-10"
        style={{ borderColor: palette.innerBorder }}
      />

      {/* 3. LAYER: FOUR CORNER STEPPED LUGS / FILIGREE ACCENTS */}
      {/* Top Left Lug */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 pointer-events-none z-20" style={{ borderColor: palette.border }}>
        <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-[#dfba73] rotate-45" />
      </div>
      {/* Top Right Lug */}
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 pointer-events-none z-20" style={{ borderColor: palette.border }}>
        <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-[#dfba73] rotate-45" />
      </div>
      {/* Bottom Left Lug */}
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 pointer-events-none z-20" style={{ borderColor: palette.border }}>
        <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-[#dfba73] rotate-45" />
      </div>
      {/* Bottom Right Lug */}
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 pointer-events-none z-20" style={{ borderColor: palette.border }}>
        <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-[#dfba73] rotate-45" />
      </div>

      {/* Left and Right Side Centered Diamond Insets */}
      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-[#172420] border border-[#dfba73] rotate-45 z-20 flex items-center justify-center pointer-events-none">
        <div className="w-1 h-1 bg-[#ffd885]" />
      </div>
      <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-[#172420] border border-[#dfba73] rotate-45 z-20 flex items-center justify-center pointer-events-none">
        <div className="w-1 h-1 bg-[#ffd885]" />
      </div>

      {/* 4. LAYER: BACKGROUND DARK BRONZE TEXTURE & CLOUD DAMASK SHADING */}
      <div
        className={`absolute inset-0 rounded-[4px] bg-gradient-to-r ${palette.bgGradients} overflow-hidden pointer-events-none`}
      >
        {/* Subtle cloud engraving texture */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-black" />
        {/* Metallic sheen on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      </div>

      {/* 5. LAYER: CONTENT - LEFT/CENTER CALLIGRAPHIC TEXT WITH ENGRAVED LINE */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center py-1 px-2 text-center">
        {/* Main Inscribed Calligraphy Heading */}
        <span
          className={`font-serif font-black bg-gradient-to-b ${palette.textColor} bg-clip-text text-transparent group-hover:brightness-125 transition-all ${sizeStyles.text}`}
          style={{
            filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.95)) drop-shadow(0 0 10px rgba(223,186,115,0.35))',
          }}
        >
          {displayText}
        </span>

        {/* Engraved Subtitle Rule with Diamond Accent */}
        {subtitle ? (
          <div className="w-full flex items-center justify-center gap-1.5 mt-0.5">
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#dfba73]/60 to-transparent" />
            <span className={`text-[#dfba73] font-serif ${sizeStyles.subText} tracking-wider`}>
              {subtitle}
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent via-[#dfba73]/60 to-transparent" />
          </div>
        ) : (
          <div className="w-full flex items-center justify-center gap-1 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
            <span className="h-[1px] w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#dfba73]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#dfba73]" />
            <span className="h-[1px] w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#dfba73]" />
          </div>
        )}
      </div>

      {/* 6. LAYER: RIGHT CIRCULAR MEDALLION BADGE (Image 2 style) */}
      <div
        className={`relative z-20 flex-shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ml-2 sm:ml-4 ${sizeStyles.iconBox}`}
        style={{
          background: palette.medallionBg,
          border: `2px solid ${palette.medallionBorder}`,
          boxShadow: `inset 0 2px 5px rgba(0,0,0,0.9), 0 0 12px ${palette.glowShadow}`,
        }}
      >
        {/* Outer Cross-Axis Diamond Nodule Pins at 0, 90, 180, 270 deg */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#dfba73] rotate-45" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#dfba73] rotate-45" />
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1.5 h-1.5 bg-[#dfba73] rotate-45" />
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 bg-[#dfba73] rotate-45" />

        {/* Icon content or Default Sword Motif */}
        <div className="text-[#ffd885] group-hover:text-white transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {icon || (
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor">
              {/* Classical Sword on Whetstone icon */}
              <path d="M19.7 4.3a1 1 0 0 0-1.4 0L12 10.6l-2-2a1 1 0 0 0-1.4 1.4l2 2-6.3 6.3a1 1 0 0 0 0 1.4l1.4 1.4a1 1 0 0 0 1.4 0L13.4 13.4l2 2a1 1 0 0 0 1.4-1.4l-2-2 6.3-6.3a1 1 0 0 0 0-1.4zM5 19l2-2 1.4 1.4-2 2z" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};
