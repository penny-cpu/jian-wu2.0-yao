import React from 'react';
import { sound } from '../audio';
import { getPlaceholderImage, getButtonImage } from '../assets/placeholderGenerator';

export type ButtonVariant = 'primary' | 'secondary' | 'bronze' | 'jade' | 'crimson' | 'action' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface UIButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bgAssetKey?: string; // e.g. 'btn_primary_bg', 'btn_bronze_bg', 'btn_jade_bg'
  useCustomBgImage?: boolean;
  soundType?: 'click' | 'sword' | 'parry' | 'hammer' | 'chime';
  glow?: boolean;
}

export const UIButton: React.FC<UIButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  rightIcon,
  bgAssetKey,
  useCustomBgImage = true,
  soundType = 'click',
  glow = false,
  className = '',
  onClick,
  disabled,
  ...rest
}) => {
  // Determine asset key based on variant if not explicitly provided
  const assetKey = bgAssetKey || `btn_${variant}_bg`;
  const bgImgUrl = useCustomBgImage ? getButtonImage(assetKey, variant) : '';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (soundType === 'sword') sound.playSwordSlash();
    else if (soundType === 'parry') sound.playParry();
    else if (soundType === 'hammer') sound.playHammerStrike();
    else if (soundType === 'chime') sound.playVirtueChime();
    else sound.playClick();

    if (onClick) onClick(e);
  };

  // Size styling classes
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1 text-xs sm:text-xs gap-1.5 min-h-[30px]',
    md: 'px-5 py-2 text-xs sm:text-sm gap-2 min-h-[38px]',
    lg: 'px-8 py-3 text-sm sm:text-base gap-2.5 min-h-[46px]',
    xl: 'px-10 py-3.5 sm:px-14 sm:py-4 text-base sm:text-lg gap-3 min-h-[54px]',
  };

  // Variant palette classes (border, text colors, gradients and shadow effects)
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'border-2 border-[#dfba73] text-[#ffd885] hover:text-white hover:border-[#fff] shadow-[0_0_20px_rgba(223,186,115,0.35)] hover:shadow-[0_0_30px_rgba(255,216,133,0.6)] bg-gradient-to-r from-[#1c2c25] via-[#2a4037] to-[#1c2c25]',
    bronze:
      'border border-[#c5a059] text-[#ffd885] hover:text-white hover:border-[#ffd885] shadow-[0_0_15px_rgba(197,160,89,0.25)] bg-[#1b2621]',
    jade:
      'border border-[#5cb87a] text-[#5cb87a] hover:text-white hover:border-[#a3f0bf] shadow-[0_0_15px_rgba(92,184,122,0.3)] bg-[#14231c]',
    crimson:
      'border border-[#d64d3e] text-[#ffd885] hover:text-white hover:border-[#ff9c91] shadow-[0_0_15px_rgba(214,77,62,0.35)] bg-gradient-to-r from-[#291716] via-[#3a1d1b] to-[#291716]',
    secondary:
      'border border-[#3b554b] text-[#c7beaf] hover:text-[#ffd885] hover:border-[#dfba73] shadow-md bg-[#16221e]',
    action:
      'border-2 border-[#ffd885] text-[#111916] bg-gradient-to-r from-[#dfba73] via-[#ffe6a3] to-[#dfba73] shadow-[0_0_25px_rgba(223,186,115,0.5)] hover:scale-105 font-extrabold',
    subtle:
      'border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885] hover:border-[#3b554b] bg-[#111916]/80',
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        backgroundImage: bgImgUrl ? `url(${bgImgUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className={`group relative inline-flex items-center justify-center font-serif font-bold tracking-widest rounded-sm transition-all duration-300 select-none cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${
        glow ? 'animate-pulse' : ''
      } ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {/* Decorative Corner Filigree Pins */}
      <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-[#dfba73]/70 pointer-events-none" />
      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-[#dfba73]/70 pointer-events-none" />
      <span className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-[#dfba73]/70 pointer-events-none" />
      <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-[#dfba73]/70 pointer-events-none" />

      {/* Button Content */}
      {icon && <span className="relative z-10 flex items-center">{icon}</span>}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {rightIcon && <span className="relative z-10 flex items-center">{rightIcon}</span>}
    </button>
  );
};
