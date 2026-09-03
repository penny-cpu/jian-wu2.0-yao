import React from 'react';

export interface SlashStanceGraphicProps {
  active?: boolean;
}

/**
 * 试炼一 · 劈式单剑动画组件：
 * “只用一把剑的图标，一把剑向下劈两次停住”
 */
export const SlashStanceGraphic: React.FC<SlashStanceGraphicProps> = ({ active = true }) => {
  return (
    <div className="relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden select-none">
      <svg
        viewBox="0 0 180 120"
        className="w-full h-full max-w-[180px] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Bronze Blade Metallic Gradient */}
          <linearGradient id="singleSlashBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#ffd885" />
            <stop offset="60%" stopColor="#dfba73" />
            <stop offset="90%" stopColor="#8c6a32" />
            <stop offset="100%" stopColor="#3d2b14" />
          </linearGradient>

          {/* Sweeping Golden Cleave Arc */}
          <linearGradient id="singleSlashArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="40%" stopColor="#ffd885" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#d64d3e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ff2200" stopOpacity="0" />
          </linearGradient>

          <filter id="singleSlashGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Downward Cleave Wind Trail (向下劈斩金色破空剑气) */}
        <g className={active ? 'animate-pulse' : 'opacity-40'}>
          <path
            d="M 60 15 Q 120 25 135 85"
            stroke="url(#singleSlashArcGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 6px #ff7733)' }}
          />
          <path
            d="M 72 12 Q 128 20 142 80"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            className="opacity-75"
          />
        </g>

        {/* 2. Single Ancient Sword: 下劈两次后停住 (Chop twice then pause/hold) */}
        <g
          style={{
            transformOrigin: '50px 90px',
            animation: active ? 'singleSwordSlashTwoChops 2.6s cubic-bezier(0.25, 1, 0.5, 1) infinite' : 'none',
          }}
        >
          {/* Sword Blade (剑身) */}
          <line
            x1="50"
            y1="90"
            x2="140"
            y2="25"
            stroke="url(#singleSlashBladeGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#singleSlashGlow)"
          />
          {/* Blade Spine Highlight (剑脊微光) */}
          <line
            x1="52"
            y1="88"
            x2="138"
            y2="26"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Sword Tip Sharp Point (剑尖) */}
          <polygon points="140,25 146,20 141,30" fill="#ffffff" />

          {/* Sword Guard Cross (剑格) */}
          <line
            x1="45"
            y1="82"
            x2="55"
            y2="98"
            stroke="#ffd885"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Sword Hilt Grip (剑柄) */}
          <line
            x1="50"
            y1="90"
            x2="35"
            y2="102"
            stroke="#24140d"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Sword Pommel (剑首铜环) */}
          <circle cx="33" cy="104" r="3.5" fill="#dfba73" stroke="#ffd885" strokeWidth="1" />
        </g>

        {/* Spark impact at strike bottom */}
        {active && (
          <g
            style={{
              animation: 'singleSlashSpark 2.6s ease-in-out infinite',
            }}
          >
            <circle cx="138" cy="86" r="3" fill="#ffd885" style={{ filter: 'drop-shadow(0 0 6px #ffaa33)' }} />
            <line x1="138" y1="86" x2="152" y2="76" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="138" y1="86" x2="148" y2="98" stroke="#ff8833" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}
      </svg>

      {/* Keyframe Animation: Single sword chops down twice and holds */}
      <style>{`
        @keyframes singleSwordSlashTwoChops {
          0% {
            transform: rotate(-35deg);
          }
          /* 第一劈 */
          15% {
            transform: rotate(35deg);
          }
          26% {
            transform: rotate(-25deg);
          }
          /* 第二劈 */
          42% {
            transform: rotate(40deg);
          }
          58% {
            transform: rotate(0deg);
          }
          /* 停住 */
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes singleSlashSpark {
          0%, 12%, 18%, 38%, 46%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          15%, 42% {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  );
};
