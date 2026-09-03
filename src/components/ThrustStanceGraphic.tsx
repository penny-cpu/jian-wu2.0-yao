import React from 'react';

export interface ThrustStanceGraphicProps {
  active?: boolean;
}

/**
 * 试炼一 · 刺式单剑动画组件：
 * “只用一把剑的图标，一把剑向斜上斜下刺两次停住”
 */
export const ThrustStanceGraphic: React.FC<ThrustStanceGraphicProps> = ({ active = true }) => {
  return (
    <div className="relative w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden select-none">
      <svg
        viewBox="0 0 180 120"
        className="w-full h-full max-w-[180px] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cyan-Gold Thrust Energy Beam */}
          <linearGradient id="singleThrustBeamGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffd885" stopOpacity="0" />
            <stop offset="60%" stopColor="#7bf0b5" stopOpacity="0.7" />
            <stop offset="90%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#5cb87a" stopOpacity="1" />
          </linearGradient>

          {/* Bronze Blade Metallic Gradient */}
          <linearGradient id="singleThrustBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d2b14" />
            <stop offset="40%" stopColor="#dfba73" />
            <stop offset="85%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <filter id="singleThrustGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Diagonal Qi Trails (斜上与斜下穿透剑气光芒) */}
        <g className={active ? 'opacity-80' : 'opacity-20'}>
          {/* Upper Diagonal Trail */}
          <line
            x1="30"
            y1="75"
            x2="150"
            y2="30"
            stroke="url(#singleThrustBeamGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 5px #7bf0b5)',
              animation: active ? 'singleThrustUpperTrail 2.6s ease-in-out infinite' : 'none',
            }}
          />
          {/* Lower Diagonal Trail */}
          <line
            x1="30"
            y1="45"
            x2="150"
            y2="90"
            stroke="url(#singleThrustBeamGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 5px #ffd885)',
              animation: active ? 'singleThrustLowerTrail 2.6s ease-in-out infinite' : 'none',
            }}
          />
        </g>

        {/* 2. Single Ancient Sword: 向斜上与斜下各刺一次（共两次）然后停住 */}
        <g
          style={{
            transformOrigin: '40px 60px',
            animation: active ? 'singleSwordThrustTwoPunctures 2.6s cubic-bezier(0.25, 1, 0.5, 1) infinite' : 'none',
          }}
        >
          {/* Sword Blade (剑身) */}
          <line
            x1="40"
            y1="60"
            x2="135"
            y2="60"
            stroke="url(#singleThrustBladeGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#singleThrustGlow)"
          />
          {/* Blade Spine Highlight (剑脊锋刃) */}
          <line
            x1="42"
            y1="60"
            x2="133"
            y2="60"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Sword Tip (剑尖三角) */}
          <polygon points="135,60 144,60 135,56" fill="#ffffff" />
          <polygon points="135,60 144,60 135,64" fill="#ffffff" />

          {/* Sword Guard Cross (剑格) */}
          <line
            x1="40"
            y1="50"
            x2="40"
            y2="70"
            stroke="#ffd885"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Sword Hilt Grip (剑柄) */}
          <line
            x1="40"
            y1="60"
            x2="22"
            y2="60"
            stroke="#24140d"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Sword Pommel (剑首铜环) */}
          <circle cx="20" cy="60" r="3.5" fill="#dfba73" stroke="#ffd885" strokeWidth="1" />
        </g>

        {/* Tip Piercing Star Flash */}
        {active && (
          <g
            style={{
              animation: 'singleThrustFlash 2.6s ease-in-out infinite',
            }}
          >
            <circle cx="145" cy="40" r="4" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 8px #7bf0b5)' }} />
            <circle cx="145" cy="80" r="4" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 8px #ffd885)' }} />
          </g>
        )}
      </svg>

      {/* Keyframe Animation: Single sword thrusts diagonally up and diagonally down twice and holds */}
      <style>{`
        @keyframes singleSwordThrustTwoPunctures {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          /* 第一次向斜上刺 (Diagonally Upward Thrust) */
          15% {
            transform: translate(26px, -18px) rotate(-18deg);
          }
          26% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          /* 第二次向斜下刺 (Diagonally Downward Thrust) */
          42% {
            transform: translate(26px, 18px) rotate(18deg);
          }
          58% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          /* 停住 (Hold steady) */
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
        }

        @keyframes singleThrustUpperTrail {
          0%, 8%, 24%, 100% {
            opacity: 0;
            stroke-dasharray: 0 100;
          }
          15% {
            opacity: 1;
            stroke-dasharray: 100 0;
          }
        }

        @keyframes singleThrustLowerTrail {
          0%, 34%, 52%, 100% {
            opacity: 0;
            stroke-dasharray: 0 100;
          }
          42% {
            opacity: 1;
            stroke-dasharray: 100 0;
          }
        }

        @keyframes singleThrustFlash {
          0%, 12%, 20%, 38%, 48%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          15%, 42% {
            opacity: 1;
            transform: scale(1.4);
          }
        }
      `}</style>
    </div>
  );
};
