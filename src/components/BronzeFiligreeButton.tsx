import React from 'react';
import { sound } from '../audio';

export interface BronzeFiligreeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'gold' | 'bronze' | 'jade' | 'crimson' | 'dark' | 'cyan' | 'red';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  soundType?: 'click' | 'sword' | 'parry' | 'hammer' | 'chime';
  glow?: boolean;
  leftOrnament?: React.ReactNode;
  rightOrnament?: React.ReactNode;
  fillBg?: boolean;
}


/**
 * ⚔️【青铜纹路上下居中无框按键（参考图3设计）】
 * 左右完全无边框，仅保留上下两边居中用细腻青铜纹路/古典卷草花纹勾勒线条，
 * 视觉空灵典雅，符合春秋战国名匠意境。
 */
export const BronzeFiligreeButton: React.FC<BronzeFiligreeButtonProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  soundType = 'click',
  glow = false,
  leftOrnament,
  rightOrnament,
  fillBg = true,
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

  // Color schemes
  const colorMap: Record<string, { line: string; motif: string; text: string; bgHover: string; glow: string }> = {
    gold: {
      line: '#3a7559',
      motif: '#5aa082',
      text: 'text-[#e0eee7] group-hover:text-[#7bf0b5]',
      bgHover: 'group-hover:bg-[#1a382b]/30',
      glow: 'shadow-[0_0_20px_rgba(58,117,89,0.35)]',
    },
    bronze: {
      line: '#2d5e47',
      motif: '#4a8f72',
      text: 'text-[#e0eee7] group-hover:text-[#7bf0b5]',
      bgHover: 'group-hover:bg-[#1a382b]/30',
      glow: 'shadow-[0_0_15px_rgba(45,94,71,0.3)]',
    },
    jade: {
      line: '#5cb87a',
      motif: '#7bf0b5',
      text: 'text-[#7bf0b5] group-hover:text-white',
      bgHover: 'group-hover:bg-[#5cb87a]/15',
      glow: 'shadow-[0_0_20px_rgba(92,184,122,0.35)]',
    },
    cyan: {
      line: '#38bdf8',
      motif: '#a5f3fc',
      text: 'text-[#a5f3fc] group-hover:text-white',
      bgHover: 'group-hover:bg-[#0284c7]/15',
      glow: 'shadow-[0_0_20px_rgba(56,189,248,0.35)]',
    },
    crimson: {
      line: '#d64d3e',
      motif: '#ff8a7a',
      text: 'text-[#ff8a7a] group-hover:text-white',
      bgHover: 'group-hover:bg-[#d64d3e]/15',
      glow: 'shadow-[0_0_20px_rgba(214,77,62,0.35)]',
    },
    red: {
      line: '#d64d3e',
      motif: '#ff8a7a',
      text: 'text-[#ff8a7a] group-hover:text-white',
      bgHover: 'group-hover:bg-[#d64d3e]/15',
      glow: 'shadow-[0_0_20px_rgba(214,77,62,0.35)]',
    },
    dark: {
      line: '#4e6b5f',
      motif: '#7bb39d',
      text: 'text-[#b8ab97] group-hover:text-[#ffd885]',
      bgHover: 'group-hover:bg-[#20312a]/30',
      glow: 'shadow-[0_0_10px_rgba(78,107,95,0.2)]',
    },
  };

  const colors = colorMap[variant] || colorMap.gold;


  // Size styling
  const sizeStyles = {
    sm: {
      py: 'py-1.5 px-6',
      fontSize: 'text-xs sm:text-sm tracking-widest',
      crestScale: 'scale-75',
      minW: 'min-w-[120px]',
    },
    md: {
      py: 'py-2 px-8 sm:px-10',
      fontSize: 'text-sm sm:text-base tracking-[0.2em]',
      crestScale: 'scale-90',
      minW: 'min-w-[160px]',
    },
    lg: {
      py: 'py-2.5 px-10 sm:px-14',
      fontSize: 'text-base sm:text-lg tracking-[0.25em]',
      crestScale: 'scale-100',
      minW: 'min-w-[200px]',
    },
    xl: {
      py: 'py-3.5 px-12 sm:px-18',
      fontSize: 'text-lg sm:text-xl tracking-[0.3em]',
      crestScale: 'scale-110',
      minW: 'min-w-[240px]',
    },
  }[size];

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`group relative inline-flex flex-col items-center justify-center font-serif font-bold transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${
        sizeStyles.minW
      } ${sizeStyles.py} ${colors.text} ${className}`}
      {...rest}
    >
      {/* Subtle translucent background (no side borders!) */}
      {fillBg && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#14221c]/70 to-transparent transition-colors duration-300 ${colors.bgHover} pointer-events-none`}
        />
      )}

      {/* TOP FILIGREE LINE WITH CENTERED ORNAMENT (图3设计) */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-center pointer-events-none">
        {/* Left rule extending outward */}
        <div
          className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#a67c33] to-[#dfba73] opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: colors.line }}
        />

        {/* Center Ornate Classical Filigree Crest (图3对称青铜古典花纹) */}
        <div className={`relative px-1 -top-[4px] shrink-0 ${sizeStyles.crestScale} transition-transform duration-300 group-hover:scale-105`}>
          <svg width="84" height="12" viewBox="0 0 84 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Center leaf/palmette spire */}
            <path d="M 42 1 Q 40 5 36 6 Q 40 7 42 11 Q 44 7 48 6 Q 44 5 42 1 Z" fill={colors.motif} opacity="0.9" />
            {/* Left flourish scroll */}
            <path
              d="M 42 6 C 36 2 30 1 24 5 C 18 9 12 4 4 6 M 34 8 Q 28 11 22 8 C 16 5 10 9 2 6"
              stroke={colors.line}
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right flourish scroll */}
            <path
              d="M 42 6 C 48 2 54 1 60 5 C 66 9 72 4 80 6 M 50 8 Q 56 11 62 8 C 68 5 74 9 82 6"
              stroke={colors.line}
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
            {/* Fine accent dots */}
            <circle cx="42" cy="6" r="1" fill="#fff" />
            <circle cx="28" cy="6" r="0.8" fill={colors.motif} />
            <circle cx="56" cy="6" r="0.8" fill={colors.motif} />
          </svg>
        </div>

        {/* Right rule extending outward */}
        <div
          className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#a67c33] to-[#dfba73] opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: colors.line }}
        />
      </div>

      {/* BUTTON CONTENT (Centered label and optional emblems) */}
      <div className={`relative z-10 flex items-center justify-center gap-2 ${sizeStyles.fontSize} drop-shadow-sm`}>
        {leftOrnament && <span className="opacity-80 group-hover:opacity-100">{leftOrnament}</span>}
        <span>{children}</span>
        {rightOrnament && <span className="opacity-80 group-hover:opacity-100">{rightOrnament}</span>}
      </div>

      {/* BOTTOM FILIGREE LINE WITH CENTERED FLIPPED ORNAMENT (图3设计) */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-center pointer-events-none">
        {/* Left rule extending outward */}
        <div
          className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#a67c33] to-[#dfba73] opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: colors.line }}
        />

        {/* Center Ornate Classical Filigree Crest (Flipped) */}
        <div className={`relative px-1 -bottom-[4px] shrink-0 ${sizeStyles.crestScale} rotate-180 transition-transform duration-300 group-hover:scale-105`}>
          <svg width="84" height="12" viewBox="0 0 84 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 42 1 Q 40 5 36 6 Q 40 7 42 11 Q 44 7 48 6 Q 44 5 42 1 Z" fill={colors.motif} opacity="0.9" />
            <path
              d="M 42 6 C 36 2 30 1 24 5 C 18 9 12 4 4 6 M 34 8 Q 28 11 22 8 C 16 5 10 9 2 6"
              stroke={colors.line}
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 42 6 C 48 2 54 1 60 5 C 66 9 72 4 80 6 M 50 8 Q 56 11 62 8 C 68 5 74 9 82 6"
              stroke={colors.line}
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="42" cy="6" r="1" fill="#fff" />
            <circle cx="28" cy="6" r="0.8" fill={colors.motif} />
            <circle cx="56" cy="6" r="0.8" fill={colors.motif} />
          </svg>
        </div>

        {/* Right rule extending outward */}
        <div
          className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#a67c33] to-[#dfba73] opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: colors.line }}
        />
      </div>

      {/* Subtle hover golden aura */}
      {(glow || true) && (
        <div className="absolute inset-x-8 inset-y-1 bg-[radial-gradient(ellipse_at_center,rgba(223,186,115,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </button>
  );
};
