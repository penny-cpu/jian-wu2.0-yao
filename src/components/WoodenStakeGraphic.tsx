import React from 'react';

export interface WoodenStakeGraphicProps {
  index: 0 | 1; // 0: Left Stake, 1: Right Stake
  chopClicks: number;
  animating?: boolean;
  className?: string;
}

/**
 * 古朴山间冻木桩 / 练武木桩图形组件：
 * - 树皮粗粝纹理 (Natural Bark Texture)
 * - 顶部年轮截面 (Top Tree Rings)
 * - 铁箍绳索加固 (Iron Bands / Hemp Ropes)
 * - 受击交互反应：
 *   - chopClicks 0: 完好冻木 (覆雪青灰，坚实未破)
 *   - chopClicks 1: 左木桩被一剑斜劈开裂 (金红木心裂口，剑痕流光)
 *   - chopClicks 2: 左右两桩尽数劈裂成干燥柴薪 (散落倾斜，炭红微光)
 *   - chopClicks 3: 炉火大炽，满木生暖 (烈焰自木桩内部喷涌燃烧，化为熊熊生暖之柴)
 */
export const WoodenStakeGraphic: React.FC<WoodenStakeGraphicProps> = ({
  index,
  chopClicks,
  animating = false,
  className = '',
}) => {
  const isLeft = index === 0;
  const isCut = isLeft ? chopClicks >= 1 : chopClicks >= 2;
  const isLit = chopClicks >= 3;

  // Split transformation
  let splitTransform = '';
  if (isCut) {
    splitTransform = isLeft
      ? 'translate-x-[-12px] rotate-[-8deg] opacity-90'
      : 'translate-x-[12px] rotate-[8deg] opacity-90';
  }
  if (animating && ((isLeft && chopClicks === 1) || (!isLeft && chopClicks === 2))) {
    splitTransform += ' scale-95';
  }

  // Glow filters
  let stakeFilter = 'drop-shadow(0 4px 10px rgba(0,0,0,0.85))';
  if (isLit) {
    stakeFilter = 'drop-shadow(0 0 24px rgba(255, 100, 30, 0.95)) drop-shadow(0 0 8px rgba(255, 200, 50, 0.8))';
  } else if (isCut) {
    stakeFilter = 'drop-shadow(0 0 14px rgba(223, 140, 60, 0.6)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))';
  }

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center transition-all duration-500 ${splitTransform} ${className}`}
      style={{ filter: stakeFilter }}
    >
      <svg
        width="110"
        height="130"
        viewBox="0 0 110 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Wood Bark Outer Gradient */}
          <linearGradient id={`barkGrad_${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2c1d15" />
            <stop offset="25%" stopColor="#4a3224" />
            <stop offset="60%" stopColor="#5c3f2d" />
            <stop offset="85%" stopColor="#3d291c" />
            <stop offset="100%" stopColor="#1e130c" />
          </linearGradient>

          {/* Tree Rings Top Cap Gradient */}
          <radialGradient id={`ringGrad_${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6e4f3a" />
            <stop offset="40%" stopColor="#9a7155" />
            <stop offset="75%" stopColor="#5a3d2c" />
            <stop offset="100%" stopColor="#38251a" />
          </radialGradient>

          {/* Fresh Cut Timber Heartwood Glow */}
          <linearGradient id={`heartwoodGrad_${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d98236" />
            <stop offset="50%" stopColor="#f5aa5d" />
            <stop offset="100%" stopColor="#8c471c" />
          </linearGradient>

          {/* Rope / Iron Band */}
          <linearGradient id={`bandGrad_${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1c2b24" />
            <stop offset="50%" stopColor="#3d554a" />
            <stop offset="100%" stopColor="#15211b" />
          </linearGradient>
        </defs>

        {/* 1. Main Wood Trunk Body */}
        <path
          d="M 16 30 
             C 16 30, 14 75, 18 116 
             L 92 116 
             C 96 75, 94 30, 94 30 
             Z"
          fill={`url(#barkGrad_${index})`}
          stroke="#160e09"
          strokeWidth="1.5"
        />

        {/* Bark Vertical Grooves & Natural Knots */}
        <g stroke="#1a110b" strokeWidth="1.5" opacity="0.75">
          <path d="M 30 32 Q 28 65 32 114" />
          <path d="M 46 33 Q 48 70 45 115" />
          <path d="M 64 33 Q 62 60 66 115" />
          <path d="M 80 32 Q 82 75 78 114" />
          {/* Wood Knot */}
          <circle cx="55" cy="72" r="4" fill="#140c07" />
          <path d="M 50 68 Q 55 64 60 68 Q 62 74 58 78 Q 52 78 50 68" fill="none" strokeWidth="1" />
        </g>

        {/* 2. Top Cross Section & Annual Tree Rings */}
        <ellipse
          cx="55"
          cy="30"
          rx="39"
          ry="14"
          fill={`url(#ringGrad_${index})`}
          stroke="#26170f"
          strokeWidth="1.5"
        />
        {/* Ring Concentric Lines */}
        <ellipse cx="55" cy="30" rx="28" ry="10" fill="none" stroke="#3d271a" strokeWidth="1" opacity="0.8" />
        <ellipse cx="55" cy="30" rx="17" ry="6" fill="none" stroke="#4a3122" strokeWidth="1" opacity="0.85" />
        <ellipse cx="55" cy="30" rx="7" ry="2.5" fill="#2d1c12" stroke="#5a3c2a" strokeWidth="0.8" />

        {/* 3. Strengthening Rope / Bronze Band */}
        <rect x="16" y="92" width="78" height="8" rx="2" fill={`url(#bandGrad_${index})`} stroke="#101814" strokeWidth="1" />
        <line x1="16" y1="96" x2="94" y2="96" stroke="#5cb87a" strokeWidth="0.8" opacity="0.6" strokeDasharray="3 2" />

        {/* 4. Diagonal Slash Cut & Exposed Split Heartwood (被青芒宝剑劈开的裂痕) */}
        {isCut && (
          <g>
            {/* Deep Slash Chasm */}
            <path
              d={
                isLeft
                  ? "M 40 18 L 68 85 L 62 116 L 56 116 L 34 26 Z"
                  : "M 70 18 L 42 85 L 48 116 L 54 116 L 76 26 Z"
              }
              fill={`url(#heartwoodGrad_${index})`}
              stroke="#ffcf87"
              strokeWidth="1.2"
            />
            {/* Slash Glowing Glint Line */}
            <path
              d={isLeft ? "M 38 16 L 68 85 L 62 116" : "M 72 16 L 42 85 L 48 116"}
              stroke="#00ffff"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.95"
            />
            {/* Flying Wood Chips / Embers */}
            <g fill="#dfba73">
              <polygon points="25,40 28,36 30,42" />
              <polygon points="85,60 88,57 87,64" />
              <polygon points="50,95 53,92 51,98" />
            </g>
          </g>
        )}

        {/* 5. Fire Blaze when chopClicks >= 3 (生暖熊熊烈火) */}
        {isLit && (
          <g className="animate-pulse">
            {/* Base Fire Glow */}
            <ellipse cx="55" cy="30" rx="22" ry="12" fill="#ff4411" opacity="0.7" />
            
            {/* Center Flame Plume */}
            <path
              d="M 55 5 
                 C 42 16, 40 32, 55 35 
                 C 70 32, 68 16, 55 5 Z"
              fill="#ffcc00"
              stroke="#ff5500"
              strokeWidth="1"
            />
            <path
              d="M 55 12 
                 C 48 18, 47 28, 55 30 
                 C 63 28, 62 18, 55 12 Z"
              fill="#ffffff"
            />
            
            {/* Side Flames */}
            <path
              d="M 38 18 C 30 25, 34 35, 42 34 C 40 26, 46 22, 38 18 Z"
              fill="#ff6611"
            />
            <path
              d="M 72 18 C 80 25, 76 35, 68 34 C 70 26, 64 22, 72 18 Z"
              fill="#ff6611"
            />

            {/* Rising Embers Sparkles */}
            <circle cx="52" cy="0" r="2" fill="#ffe066" />
            <circle cx="62" cy="-4" r="1.5" fill="#ff7722" />
            <circle cx="44" cy="-2" r="1.5" fill="#ffaa33" />
          </g>
        )}
      </svg>
    </div>
  );
};
