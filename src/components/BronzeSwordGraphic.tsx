import React from 'react';

export interface BronzeSwordGraphicProps {
  mode: 'forge' | 'grind' | 'chop';
  clicks: number;
  animating?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 战国青铜古剑 (按图定制)：
 * - 环首圆柄头 (Round Pommel)
 * - 缠绳握柄 (Cord-wrapped Hilt)
 * - 云雷纹青铜剑格 (Inscribed Rectangular Guard)
 * - 剑脊铭文血槽 (Fuller with Ancient Cloud Scrolls)
 * - 剑尖回勾倒刺倒钩 (Hooked Barb on Spine near tip)
 * - 锋锐剑锋 (Spearhead Point)
 */
export const BronzeSwordGraphic: React.FC<BronzeSwordGraphicProps> = ({
  mode,
  clicks,
  animating = false,
  className = '',
  size = 'md',
}) => {
  // Compute visual filters & colors based on mode and click progress
  let glowFilter = '';
  let bladeColorClass = '';
  let fullerColor = '#1f2b26';
  let rotationDeg = 0;
  let scaleEffect = animating ? 'scale-105' : 'scale-100';

  if (mode === 'forge') {
    // 锻剑阶段：弯折 -> 炭红 -> 炽热金红 -> 挺拔通透
    if (clicks === 0) {
      rotationDeg = -5;
      bladeColorClass = 'brightness-75 contrast-95 sepia-[0.3] hue-rotate-[20deg]';
      glowFilter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.9))';
      fullerColor = '#1a1f1d';
    } else if (clicks === 1) {
      rotationDeg = -3;
      bladeColorClass = 'brightness-90 contrast-110 sepia-[0.4] hue-rotate-[-30deg]';
      glowFilter = 'drop-shadow(0 0 12px rgba(235, 90, 40, 0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.8))';
      fullerColor = '#8a2b16';
    } else if (clicks === 2) {
      rotationDeg = -1;
      bladeColorClass = 'brightness-110 contrast-125 saturate-150 sepia-[0.5] hue-rotate-[-45deg]';
      glowFilter = 'drop-shadow(0 0 20px rgba(255, 100, 30, 0.85)) drop-shadow(0 0 8px rgba(255, 200, 80, 0.6))';
      fullerColor = '#d94b18';
    } else {
      rotationDeg = 0;
      bladeColorClass = 'brightness-125 contrast-130 saturate-200 sepia-[0.3] hue-rotate-[-15deg]';
      glowFilter = 'drop-shadow(0 0 28px rgba(255, 180, 50, 0.95)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))';
      fullerColor = '#e69822';
    }
  } else if (mode === 'grind') {
    // 开刃阶段：青铜暗色 -> 青光微泛 -> 寒气逼人 -> 青锋如水碧芒大放
    rotationDeg = 0;
    if (clicks === 0) {
      bladeColorClass = 'brightness-85 contrast-100';
      glowFilter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.8))';
      fullerColor = '#243b32';
    } else if (clicks === 1) {
      bladeColorClass = 'brightness-100 contrast-110 hue-rotate-[130deg] saturate-125';
      glowFilter = 'drop-shadow(0 0 14px rgba(0, 240, 255, 0.65)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))';
      fullerColor = '#0d5c56';
    } else if (clicks === 2) {
      bladeColorClass = 'brightness-115 contrast-125 hue-rotate-[145deg] saturate-150';
      glowFilter = 'drop-shadow(0 0 22px rgba(0, 255, 230, 0.85)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))';
      fullerColor = '#107a72';
    } else {
      bladeColorClass = 'brightness-130 contrast-135 hue-rotate-[155deg] saturate-200';
      glowFilter = 'drop-shadow(0 0 32px rgba(0, 255, 255, 1)) drop-shadow(0 0 14px rgba(120, 255, 210, 0.9))';
      fullerColor = '#17a89d';
    }
  } else if (mode === 'chop') {
    // 劈柴阶段：青芒宝剑
    rotationDeg = animating ? -12 : (clicks >= 3 ? 0 : -2);
    bladeColorClass = 'brightness-120 contrast-125 hue-rotate-[150deg] saturate-150';
    glowFilter = clicks >= 3 
      ? 'drop-shadow(0 0 28px rgba(0, 255, 230, 0.9)) drop-shadow(0 0 16px rgba(255, 140, 40, 0.7))'
      : 'drop-shadow(0 0 20px rgba(0, 240, 255, 0.8)) drop-shadow(0 4px 8px rgba(0,0,0,0.9))';
    fullerColor = '#107a72';
  }

  const width = size === 'sm' ? 240 : size === 'lg' ? 360 : 310;
  const height = size === 'sm' ? 60 : size === 'lg' ? 84 : 72;

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-transform duration-500 ${scaleEffect} ${className}`}
      style={{
        transform: `rotate(${rotationDeg}deg)`,
        filter: glowFilter,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 380 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-500 overflow-visible ${bladeColorClass}`}
      >
        <defs>
          {/* Blade Metal Gradient */}
          <linearGradient id="bronzeBladeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#4a6156" />
            <stop offset="25%" stopColor="#879e92" />
            <stop offset="50%" stopColor="#2c3d36" />
            <stop offset="85%" stopColor="#9fb5a9" />
            <stop offset="100%" stopColor="#3d5249" />
          </linearGradient>

          {/* Edge Sharpness Highlight Gradient */}
          <linearGradient id="edgeGleam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#d5e8de" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#9fb5a9" stopOpacity="0.6" />
          </linearGradient>

          {/* Fuller Bronze Dark Inscription Fill */}
          <linearGradient id="fullerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15211c" />
            <stop offset="50%" stopColor="#20332c" />
            <stop offset="100%" stopColor="#121b17" />
          </linearGradient>

          {/* Hilt Leather Cord Wrap Gradient */}
          <linearGradient id="hiltCordGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5a2d26" />
            <stop offset="30%" stopColor="#7a3d34" />
            <stop offset="70%" stopColor="#381b16" />
            <stop offset="100%" stopColor="#24110e" />
          </linearGradient>

          {/* Guard & Pommel Bronze Patina */}
          <linearGradient id="bronzeFittingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9c7a3c" />
            <stop offset="40%" stopColor="#dfba73" />
            <stop offset="80%" stopColor="#54411d" />
            <stop offset="100%" stopColor="#2b200b" />
          </linearGradient>
        </defs>

        {/* =========================================================================
         * 1. 剑身主体 (Blade Body with barb, edges, bevels)
         * 尖端位于左侧 (x=10)，剑格位于右侧 (x=280)
         * 具有标志性倒勾刺 (Hooked Barb at top spine x=75..90)
         * ========================================================================= */}
        <g id="blade-assembly">
          {/* Main Blade Silhouette: Point -> Lower Edge -> Guard -> Upper Guard -> Barb -> Upper Point */}
          <path
            d="M 12 45 
               L 48 30 
               L 75 32 
               L 82 22 
               L 86 33 
               L 282 34 
               L 282 56 
               L 48 60 
               Z"
            fill="url(#bronzeBladeGrad)"
            stroke="#213029"
            strokeWidth="1.5"
          />

          {/* Upper Razor Edge Line with Barb Profile */}
          <path
            d="M 12 45 L 48 30 L 75 32 L 82 22 L 86 33 L 282 34"
            stroke="url(#edgeGleam)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Lower Razor Edge Line */}
          <path
            d="M 12 45 L 48 60 L 282 56"
            stroke="url(#edgeGleam)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Central Ridge Line (剑脊线) */}
          <line
            x1="18"
            y1="45"
            x2="280"
            y2="45"
            stroke="#d4e6dc"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />

          {/* Central Fuller / Blood Groove with Inscriptions (云雷纹铭文血槽) */}
          <rect
            x="88"
            y="41"
            width="186"
            height="8"
            rx="2"
            fill={fullerColor}
            stroke="#415e52"
            strokeWidth="1"
          />

          {/* Ancient Cloud & Thunder Scroll Inscription Marks (云雷铭文点缀) */}
          <g stroke="#dfba73" strokeWidth="1" strokeLinecap="round" opacity="0.85">
            <path d="M 98 43 Q 102 41 106 45 Q 110 49 114 44" />
            <path d="M 124 44 Q 128 41 132 45 Q 136 49 140 44" />
            <path d="M 150 44 Q 154 41 158 45 Q 162 49 166 44" />
            <path d="M 176 44 Q 180 41 184 45 Q 188 49 192 44" />
            <path d="M 202 44 Q 206 41 210 45 Q 214 49 218 44" />
            <path d="M 228 44 Q 232 41 236 45 Q 240 49 244 44" />
            <path d="M 254 44 Q 258 41 262 45 Q 266 49 270 44" />
          </g>
        </g>

        {/* =========================================================================
         * 2. 青铜剑格 (Bronze Guard with Relinquished Scroll Relief)
         * ========================================================================= */}
        <g id="guard-assembly">
          {/* Guard Outer Silhouette */}
          <path
            d="M 280 24 
               C 283 22, 290 22, 292 26 
               L 293 64 
               C 290 68, 283 68, 280 66 
               Z"
            fill="url(#bronzeFittingGrad)"
            stroke="#2b1f0b"
            strokeWidth="1.5"
          />
          {/* Guard Inner Geometric Carving Line */}
          <line x1="286" y1="28" x2="286" y2="62" stroke="#ffd885" strokeWidth="1.2" opacity="0.8" />
          <circle cx="286" cy="45" r="3" fill="#3b2b10" stroke="#ffd885" strokeWidth="1" />
        </g>

        {/* =========================================================================
         * 3. 剑柄握把 (Cord-Wrapped Hilt)
         * ========================================================================= */}
        <g id="hilt-assembly">
          {/* Base Grip Tube */}
          <rect x="292" y="38" width="62" height="14" rx="2" fill="url(#hiltCordGrad)" stroke="#1a0d0a" strokeWidth="1" />
          
          {/* Leather / Silk Cord Wrapping Ribs (缠绳斜纹) */}
          <g stroke="#9a5246" strokeWidth="2.5" strokeLinecap="round" opacity="0.95">
            <line x1="300" y1="38" x2="304" y2="52" />
            <line x1="310" y1="38" x2="314" y2="52" />
            <line x1="320" y1="38" x2="324" y2="52" />
            <line x1="330" y1="38" x2="334" y2="52" />
            <line x1="340" y1="38" x2="344" y2="52" />
            <line x1="350" y1="38" x2="354" y2="52" />
          </g>
        </g>

        {/* =========================================================================
         * 4. 环首剑首 (Round Bronze Pommel)
         * ========================================================================= */}
        <g id="pommel-assembly">
          <ellipse
            cx="362"
            cy="45"
            rx="9"
            ry="14"
            fill="url(#bronzeFittingGrad)"
            stroke="#2b1f0b"
            strokeWidth="1.5"
          />
          <ellipse
            cx="364"
            cy="45"
            rx="4"
            ry="9"
            fill="#3b2b10"
            stroke="#ffd885"
            strokeWidth="1"
          />
        </g>

        {/* =========================================================================
         * 5. 动态光效叠加 (Dynamic Sparkle / Embers)
         * ========================================================================= */}
        {mode === 'forge' && clicks >= 1 && (
          <g className="animate-pulse">
            <circle cx="85" cy="24" r="2.5" fill="#ff7733" />
            <circle cx="160" cy="45" r="3" fill="#ffaa33" />
            <circle cx="220" cy="42" r="2" fill="#ff4411" />
            {clicks >= 2 && (
              <>
                <circle cx="48" cy="30" r="3" fill="#ffdd55" />
                <circle cx="120" cy="46" r="3.5" fill="#ff5522" />
                <circle cx="270" cy="45" r="2.5" fill="#ffaa44" />
              </>
            )}
          </g>
        )}

        {mode === 'grind' && clicks >= 1 && (
          <g className="animate-pulse">
            <circle cx="30" cy="38" r="2.5" fill="#a0ffff" />
            <circle cx="82" cy="22" r="3" fill="#ffffff" />
            <circle cx="180" cy="44" r="2.5" fill="#55ffff" />
            {clicks >= 2 && (
              <>
                <circle cx="60" cy="52" r="3" fill="#88ffff" />
                <circle cx="240" cy="34" r="3.5" fill="#ffffff" />
              </>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
