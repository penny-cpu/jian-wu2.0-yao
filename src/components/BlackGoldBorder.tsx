import React from 'react';

/**
 * ⚔️【黑墨绿色居中纹路线条组件库】
 * 规范：只做上下两条边的黑墨绿色纹路线条勾勒，纹路线条设计集中在上下两边的中间；
 * 左右两侧完全无边框（border-x-0），尽显春秋战国青铜墨玉典雅风范。
 */

/**
 * 1. 大弹窗与卡片适用的上下居中黑墨绿战国纹饰 (Top / Bottom Ornament)
 */
export const LargeBlackGoldOrnament: React.FC<{ inverted?: boolean; className?: string }> = ({
  inverted = false,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full flex items-center justify-center pointer-events-none z-30 ${
        inverted ? '-bottom-[7px]' : '-top-[7px]'
      } ${className}`}
    >
      {/* Left horizontal hairline: extends to left edge with black-dark-green dual gradient */}
      <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#1c3e32] to-[#3a7559] relative">
        <div className="absolute top-[1px] inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-black to-black/95" />
      </div>

      {/* Center concentrated Warring States Black-Dark-Green Filigree Motif (集中在上下两边的中间) */}
      <div className="shrink-0 px-1 transform ${inverted ? 'rotate-180' : ''}">
        <svg width="180" height="15" viewBox="0 0 180 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={inverted ? 'rotate-180' : ''}>
          {/* Black drop shadow behind motif */}
          <g filter="drop-shadow(0 1px 2px rgba(0,0,0,0.95))">
            {/* Horizontal flanking ink-green lines leading into central motif */}
            <line x1="10" y1="7.5" x2="60" y2="7.5" stroke="#3a7559" strokeWidth="1.5" />
            <line x1="10" y1="9" x2="60" y2="9" stroke="#000000" strokeWidth="1" />
            <line x1="120" y1="7.5" x2="170" y2="7.5" stroke="#3a7559" strokeWidth="1.5" />
            <line x1="120" y1="9" x2="170" y2="9" stroke="#000000" strokeWidth="1" />

            {/* Left Cloud and Thunder Scroll (云雷勾云纹 - 黑墨绿色) */}
            <path
              d="M 60 7.5 Q 68 2, 74 7.5 Q 79 12, 83 7.5"
              stroke="#3a7559"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 60 9 Q 68 3.5, 74 9 Q 79 13.5, 83 9"
              stroke="#000000"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />

            {/* Right Cloud and Thunder Scroll */}
            <path
              d="M 120 7.5 Q 112 2, 106 7.5 Q 101 12, 97 7.5"
              stroke="#3a7559"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 120 9 Q 112 3.5, 106 9 Q 101 13.5, 97 9"
              stroke="#000000"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />

            {/* Center Diamond Seal with Black & Ink-Green inlay (战国黑墨绿铜印结节) */}
            <rect
              x="84"
              y="1.5"
              width="8.5"
              height="8.5"
              transform="rotate(45 90 7.5)"
              fill="#091410"
              stroke="#3a7559"
              strokeWidth="1.5"
            />
            <rect
              x="86.5"
              y="4"
              width="4.5"
              height="4.5"
              transform="rotate(45 90 7.5)"
              fill="#5aa082"
              stroke="#000000"
              strokeWidth="1"
            />

            {/* Flanking decorative pin points */}
            <circle cx="50" cy="7.5" r="1.5" fill="#5aa082" stroke="#000000" strokeWidth="0.8" />
            <circle cx="130" cy="7.5" r="1.5" fill="#5aa082" stroke="#000000" strokeWidth="0.8" />
          </g>
        </svg>
      </div>

      {/* Right horizontal hairline: extends to right edge with black-dark-green dual gradient */}
      <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#1c3e32] to-[#3a7559] relative">
        <div className="absolute top-[1px] inset-x-0 h-[1px] bg-gradient-to-l from-transparent via-black to-black/95" />
      </div>
    </div>
  );
};

/**
 * 2. 小按钮与状态标牌适用的上下居中黑墨绿细微纹饰 (Compact Top / Bottom Ornament)
 */
export const SmallBlackGoldOrnament: React.FC<{ inverted?: boolean; className?: string }> = ({
  inverted = false,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full flex items-center justify-center pointer-events-none z-30 ${
        inverted ? '-bottom-[4px]' : '-top-[4px]'
      } ${className}`}
    >
      {/* Left fine line */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#1a382b] to-[#3a7559] relative">
        <div className="absolute top-[0.8px] inset-x-0 h-[0.8px] bg-gradient-to-r from-transparent via-black to-black/90" />
      </div>

      {/* Center micro black-dark-green motif */}
      <div className="shrink-0 px-0.5">
        <svg width="68" height="9" viewBox="0 0 68 9" fill="none" xmlns="http://www.w3.org/2000/svg" className={inverted ? 'rotate-180' : ''}>
          <g filter="drop-shadow(0 1px 1px rgba(0,0,0,0.9))">
            {/* Left micro sweep */}
            <path d="M 6 4.5 L 23 4.5 Q 26 2, 29 4.5" stroke="#3a7559" strokeWidth="1.2" fill="none" />
            <path d="M 6 5.5 L 23 5.5 Q 26 3, 29 5.5" stroke="#000000" strokeWidth="0.8" fill="none" />

            {/* Right micro sweep */}
            <path d="M 62 4.5 L 45 4.5 Q 42 2, 39 4.5" stroke="#3a7559" strokeWidth="1.2" fill="none" />
            <path d="M 62 5.5 L 45 5.5 Q 42 3, 39 5.5" stroke="#000000" strokeWidth="0.8" fill="none" />

            {/* Center diamond pin */}
            <rect
              x="31"
              y="1.5"
              width="4.2"
              height="4.2"
              transform="rotate(45 34 4.5)"
              fill="#5aa082"
              stroke="#000000"
              strokeWidth="0.9"
            />
          </g>
        </svg>
      </div>

      {/* Right fine line */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#1a382b] to-[#3a7559] relative">
        <div className="absolute top-[0.8px] inset-x-0 h-[0.8px] bg-gradient-to-l from-transparent via-black to-black/90" />
      </div>
    </div>
  );
};

/**
 * 3. 弹窗与大卡片专用容器组件：【上下两条边的黑墨绿色纹路线条勾勒，左右完全无边框】
 */
export interface BlackGoldPlaqueProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  title?: string;
  id?: string;
}

export const BlackGoldPlaque: React.FC<BlackGoldPlaqueProps> = ({
  children,
  className = '',
  style,
  onClick,
  title,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      title={title}
      style={style}
      className={`relative border-x-0 border-y-0 rounded-none shadow-[0_20px_60px_rgba(0,0,0,0.98)] ${className}`}
    >
      {/* TOP EDGE: Concentrated Black-Dark-Green Warring States Motif in Center */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <LargeBlackGoldOrnament inverted={false} />
      </div>

      {/* BOTTOM EDGE: Concentrated Black-Dark-Green Warring States Motif in Center */}
      <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
        <LargeBlackGoldOrnament inverted={true} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

/**
 * 4. 小按钮专用组件：【上下两条边的黑墨绿色纹路线条勾勒，左右完全无边框】
 */
export interface BlackGoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'gold' | 'dark' | 'jade' | 'crimson' | 'bronze';
  size?: 'sm' | 'md' | 'lg';
}

export const BlackGoldButton: React.FC<BlackGoldButtonProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
  onClick,
  disabled,
  ...rest
}) => {
  const sizeClasses = {
    sm: 'py-1 px-3 text-xs',
    md: 'py-1.5 px-4 text-xs sm:text-sm',
    lg: 'py-2 px-6 text-sm sm:text-base',
  }[size];

  const variantClasses = {
    gold: 'bg-[#13221b]/95 hover:bg-[#1a3026] text-[#e0eee7] hover:text-[#7bf0b5]',
    bronze: 'bg-[#13221b]/95 hover:bg-[#1a3026] text-[#e0eee7] hover:text-[#7bf0b5]',
    dark: 'bg-[#0f1915]/95 hover:bg-[#162620] text-[#c7beaf] hover:text-[#7bf0b5]',
    jade: 'bg-[#13261e]/95 hover:bg-[#1d382c] text-[#7bf0b5] hover:text-white',
    crimson: 'bg-[#241513]/95 hover:bg-[#331c19] text-[#ff8a7a] hover:text-white',
  }[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center border-x-0 border-y-0 rounded-none font-serif tracking-wider transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-md ${sizeClasses} ${variantClasses} ${className}`}
      {...rest}
    >
      {/* Top Black-Dark-Green Line with Centered Ornament */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <SmallBlackGoldOrnament inverted={false} />
      </div>

      {/* Bottom Black-Dark-Green Line with Centered Ornament */}
      <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
        <SmallBlackGoldOrnament inverted={true} />
      </div>

      {/* Button Children */}
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </button>
  );
};

/**
 * 5. 小状态标牌/进度小框专用组件：【上下两条边的黑墨绿色纹路线条勾勒，左右完全无边框】
 */
export interface BlackGoldTagProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const BlackGoldTag: React.FC<BlackGoldTagProps> = ({ children, className = '', id }) => {
  return (
    <div
      id={id}
      className={`relative inline-flex items-center gap-1.5 border-x-0 border-y-0 rounded-none bg-[#111916]/95 px-3 py-1 font-serif text-xs text-[#e0eee7] shadow-md backdrop-blur-sm select-none ${className}`}
    >
      {/* Top Black-Dark-Green Line with Centered Ornament */}
      <div className="absolute top-0 inset-x-0 z-30 pointer-events-none">
        <SmallBlackGoldOrnament inverted={false} />
      </div>

      {/* Bottom Black-Dark-Green Line with Centered Ornament */}
      <div className="absolute bottom-0 inset-x-0 z-30 pointer-events-none">
        <SmallBlackGoldOrnament inverted={true} />
      </div>

      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </div>
  );
};
