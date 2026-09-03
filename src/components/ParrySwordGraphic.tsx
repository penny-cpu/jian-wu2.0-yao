import React from 'react';

export interface ParrySwordGraphicProps {
  id: number;
  isHit?: boolean;
}

/**
 * 试炼一 · 子路拔剑袭来飞剑/拔剑特写组件：
 * - 战国青铜剑格与剑锋流光 (Bronze Guard & Blade Qi)
 * - 剑体破空下落拖尾 (Sword Qi Trail)
 * - 锐利剑气金红/烈阳色调 (Gold-Crimson Sparkles)
 */
export const ParrySwordGraphic: React.FC<ParrySwordGraphicProps> = ({ id, isHit = false }) => {
  // Variations based on id
  const rotation = ((id * 37) % 30) - 15; // -15deg to +15deg slight tilt

  return (
    <div
      className="relative flex flex-col items-center justify-center filter drop-shadow-[0_0_12px_rgba(255,80,30,0.85)] group-hover:scale-125 transition-transform duration-150"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg
        width="44"
        height="76"
        viewBox="0 0 44 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`parryBladeGrad_${id}`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#ffe6a3" />
            <stop offset="70%" stopColor="#dfba73" />
            <stop offset="100%" stopColor="#4a3720" />
          </linearGradient>

          <linearGradient id={`parryQiGrad_${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4411" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffaa00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffdd55" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Trailing Sword Qi Aura (破空剑气流光) */}
        <path
          d="M 16 0 L 22 -14 L 28 0 L 32 40 L 22 74 L 12 40 Z"
          fill={`url(#parryQiGrad_${id})`}
          className="animate-pulse"
        />

        {/* 2. Pommel (环首) */}
        <circle cx="22" cy="6" r="4.5" fill="#3b2b10" stroke="#ffd885" strokeWidth="1.2" />

        {/* 3. Hilt Grip (缠绳剑柄) */}
        <rect x="20" y="10" width="4" height="14" rx="1" fill="#24110e" stroke="#5a2d26" strokeWidth="0.8" />
        <line x1="20" y1="13" x2="24" y2="14" stroke="#dfba73" strokeWidth="1" />
        <line x1="20" y1="17" x2="24" y2="18" stroke="#dfba73" strokeWidth="1" />
        <line x1="20" y1="21" x2="24" y2="22" stroke="#dfba73" strokeWidth="1" />

        {/* 4. Guard (青铜剑格) */}
        <path
          d="M 12 24 C 12 22, 32 22, 32 24 L 30 28 C 26 29, 18 29, 14 28 Z"
          fill="#dfba73"
          stroke="#1c1208"
          strokeWidth="1"
        />

        {/* 5. Blade Body Pointing Downwards (剑锋下指) */}
        <path
          d="M 17 28 
             L 27 28 
             L 26 58 
             L 22 72 
             L 18 58 
             Z"
          fill={`url(#parryBladeGrad_${id})`}
          stroke="#26170d"
          strokeWidth="1"
        />

        {/* Center Ridge Gleam (剑脊流光) */}
        <line x1="22" y1="28" x2="22" y2="70" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

        {/* Glint Sparks */}
        <circle cx="22" cy="70" r="2.5" fill="#ffffff" className="animate-ping" />
        <circle cx="22" cy="45" r="1.5" fill="#ffd885" />
      </svg>
    </div>
  );
};
