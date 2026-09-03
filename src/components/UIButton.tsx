import React from 'react';
import { sound } from '../audio';
import { WuxiaPlaqueButton } from './WuxiaPlaqueButton';
import { BronzeFiligreeButton } from './BronzeFiligreeButton';

export type ButtonVariant = 'primary' | 'secondary' | 'bronze' | 'jade' | 'crimson' | 'action' | 'subtle' | 'plaque' | 'filigree';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface UIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bgAssetKey?: string;
  useCustomBgImage?: boolean;
  soundType?: 'click' | 'sword' | 'parry' | 'hammer' | 'chime';
  glow?: boolean;
  subtitle?: React.ReactNode;
  asPlaque?: boolean;
  asFiligree?: boolean;
}

export const UIButton: React.FC<UIButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  rightIcon,
  bgAssetKey,
  useCustomBgImage = false,
  soundType = 'click',
  glow = false,
  subtitle,
  asPlaque = false,
  asFiligree = false,
  className = '',
  onClick,
  disabled,
  ...rest
}) => {
  // If explicitly requested as filigree or variant is filigree, render Figure 3 frameless centered bronze filigree button
  if (asFiligree || variant === 'filigree') {
    const filigreeVariant =
      variant === 'jade' ? 'jade' : variant === 'crimson' ? 'crimson' : variant === 'bronze' ? 'bronze' : 'gold';
    return (
      <BronzeFiligreeButton
        variant={filigreeVariant}
        size={size}
        leftOrnament={icon}
        rightOrnament={rightIcon}
        soundType={soundType}
        glow={glow}
        onClick={onClick}
        disabled={disabled}
        className={className}
        {...rest}
      >
        {children}
      </BronzeFiligreeButton>
    );
  }

  // If explicitly requested as plaque or variant is plaque, render the ornate bronze plaque
  if (asPlaque || variant === 'plaque') {
    const plaqueVariant =
      variant === 'jade' ? 'jade' : variant === 'crimson' ? 'crimson' : variant === 'action' ? 'gold' : 'bronze';
    return (
      <WuxiaPlaqueButton
        variant={plaqueVariant}
        size={size}
        icon={rightIcon || icon}
        subtitle={subtitle}
        soundType={soundType}
        glow={glow}
        onClick={onClick}
        disabled={disabled}
        className={className}
        {...rest}
      >
        {children}
      </WuxiaPlaqueButton>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (soundType === 'sword') sound.playSwordSlash();
    else if (soundType === 'parry') sound.playParry();
    else if (soundType === 'hammer') sound.playHammerStrike();
    else if (soundType === 'chime') sound.playVirtueChime();
    else sound.playClick();

    if (onClick) onClick(e);
  };

  // Figure 3 compliant button: borderless sides, top & bottom line with centered bronze emblem
  const sizeStyles = {
    sm: { py: 'py-1.5 px-6', fontSize: 'text-xs sm:text-sm tracking-widest', crestW: 'w-14' },
    md: { py: 'py-2 px-8 sm:px-10', fontSize: 'text-sm sm:text-base tracking-[0.2em]', crestW: 'w-20' },
    lg: { py: 'py-2.5 px-10 sm:px-12', fontSize: 'text-base sm:text-lg tracking-[0.25em]', crestW: 'w-24' },
    xl: { py: 'py-3.5 px-12 sm:px-16', fontSize: 'text-lg sm:text-xl tracking-[0.3em]', crestW: 'w-28' },
  }[size];

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`group relative inline-flex flex-col items-center justify-center font-serif font-bold transition-all duration-300 select-none cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${
        glow ? 'animate-pulse' : ''
      } ${sizeStyles.py} ${className}`}
      {...rest}
    >
      {/* Background layer without left/right borders */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#16241e]/85 to-transparent group-hover:via-[#22362c]/95 transition-all duration-300 pointer-events-none" />

      {/* TOP FILIGREE LINE (Figure 3) */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-center pointer-events-none">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#a67c33] to-[#dfba73] opacity-80 group-hover:opacity-100" />
        <div className="px-1 -top-[3px] relative shrink-0">
          <svg width="60" height="8" viewBox="0 0 60 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30 1 L 27 5 L 30 7 L 33 5 Z" fill="#ffd885" />
            <path d="M 30 4 C 25 1 20 1 12 4 M 30 4 C 35 1 40 1 48 4" stroke="#dfba73" strokeWidth="0.9" fill="none" />
            <circle cx="20" cy="4" r="0.8" fill="#ffd885" />
            <circle cx="40" cy="4" r="0.8" fill="#ffd885" />
          </svg>
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#a67c33] to-[#dfba73] opacity-80 group-hover:opacity-100" />
      </div>

      {/* Button Content */}
      <div className={`relative z-10 flex items-center justify-center gap-2 text-[#ffd885] group-hover:text-white transition-colors drop-shadow-sm ${sizeStyles.fontSize}`}>
        {icon && <span className="flex items-center">{icon}</span>}
        <span className="whitespace-nowrap">{children}</span>
        {rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </div>

      {/* BOTTOM FILIGREE LINE (Figure 3) */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-center pointer-events-none">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#a67c33] to-[#dfba73] opacity-80 group-hover:opacity-100" />
        <div className="px-1 -bottom-[3px] relative shrink-0 rotate-180">
          <svg width="60" height="8" viewBox="0 0 60 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 30 1 L 27 5 L 30 7 L 33 5 Z" fill="#ffd885" />
            <path d="M 30 4 C 25 1 20 1 12 4 M 30 4 C 35 1 40 1 48 4" stroke="#dfba73" strokeWidth="0.9" fill="none" />
            <circle cx="20" cy="4" r="0.8" fill="#ffd885" />
            <circle cx="40" cy="4" r="0.8" fill="#ffd885" />
          </svg>
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#a67c33] to-[#dfba73] opacity-80 group-hover:opacity-100" />
      </div>

      {/* Hover Gold Shine */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(223,186,115,0.25),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};
