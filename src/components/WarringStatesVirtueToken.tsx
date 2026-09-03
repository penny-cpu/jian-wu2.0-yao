import React from 'react';
import { VirtueId } from '../types';

interface WarringStatesVirtueTokenProps {
  virtueId: VirtueId | 'FINAL';
  character?: string;
  name?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isUnlocked?: boolean;
  onClick?: () => void;
  className?: string;
  showSubtitle?: boolean;
  variant?: 'plaque' | 'medallion' | 'badge';
}

/**
 * 🏛️【战国时期古朴青铜金石德行令牌（参考图1设计：磨刀开刃式样）】
 * 融合春秋战国青铜重器古朴质感：
 * 1. 幽暗苍劲青铜/深绿锈金底色，精雕战国饕餮纹/夔龙卷云纹上下对称透雕顶冠；
 * 2. 左右两侧青铜折角耳饰与四方黑金边棱；
 * 3. 浑厚古朴的战国金文/阳刻高浮雕金色书法字，带金石凿刻反光与下沉阴影；
 * 4. 右侧/居中内嵌同心圆青铜古剑环纹徽章（剑锋磨石纹样），完美复刻参考图1的神韵。
 */
export const WarringStatesVirtueToken: React.FC<WarringStatesVirtueTokenProps> = ({
  virtueId,
  character,
  name,
  title,
  size = 'md',
  isUnlocked = true,
  onClick,
  className = '',
  showSubtitle = true,
  variant = 'plaque',
}) => {
  const defaultMeta: Record<
    VirtueId | 'FINAL',
    { char: string; name: string; title: string; color: string; desc: string }
  > = {
    REN: { char: '仁', name: '仁 · 雪夜炊烟', title: '以仁御锋', color: '#5cb87a', desc: '残剑生温' },
    LI: { char: '礼', name: '礼 · 剑问圣人', title: '收锋守礼', color: '#dfba73', desc: '敬意归心' },
    YI: { char: '义', name: '义 · 烈风之断', title: '仗剑卫道', color: '#e06c53', desc: '当为则为' },
    ZHI: { char: '智', name: '智 · 空谷之兽', title: '以智破妄', color: '#4e9dc7', desc: '洞察克敌' },
    XIN: { char: '信', name: '信 · 孤山挂剑', title: '履信守诺', color: '#ffd885', desc: '孤山挂剑' },
    FINAL: { char: '终', name: '五德归一', title: '天地铸炉', color: '#ffd885', desc: '剑心通明' },
  };

  const meta = defaultMeta[virtueId] || defaultMeta.REN;
  const displayChar = character || meta.char;
  const displayName = name || meta.name;
  const displayTitle = title || meta.title;

  // Render Compact Badge (for HUD, Map tags, level headers)
  if (variant === 'badge') {
    return (
      <div
        onClick={onClick}
        className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-black bg-[#121c18] shadow-[0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(223,186,115,0.2)] select-none ${
          onClick ? 'cursor-pointer hover:border-[#dfba73] active:scale-95 transition-all' : ''
        } ${className}`}
      >
        {/* Top/Bottom subtle bronze line accent */}
        <div className="absolute inset-x-1 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#dfba73]/40 to-transparent" />
        <div className="absolute inset-x-1 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#dfba73]/40 to-transparent" />

        {/* Embossed Bronze Seal Token */}
        <div
          className="w-5 h-5 rounded-none border border-black bg-gradient-to-b from-[#2a3830] via-[#1a2620] to-[#0f1814] flex items-center justify-center font-serif font-bold text-xs shadow-inner"
          style={{
            color: isUnlocked ? '#ffd885' : '#7a8f85',
            textShadow: isUnlocked ? '0 1px 2px rgba(0,0,0,0.9), 0 0 6px rgba(255,216,133,0.5)' : 'none',
          }}
        >
          {displayChar}
        </div>

        <span
          className="text-xs font-serif font-bold tracking-wider"
          style={{ color: isUnlocked ? '#f5efe3' : '#7a8f85' }}
        >
          {displayName}
        </span>
      </div>
    );
  }

  // Render Circular Medallion (for Final Chapter circular matrix)
  if (variant === 'medallion') {
    return (
      <div
        onClick={onClick}
        className={`group relative flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-300 ${
          isUnlocked ? 'hover:scale-110 active:scale-95' : 'opacity-80 hover:opacity-100 hover:scale-105'
        } ${className}`}
      >
        {/* Outer Warring States Ding Filigree Ring */}
        <div
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-black flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.9)] overflow-hidden"
          style={{
            background: isUnlocked
              ? 'radial-gradient(circle at 40% 30%, #2f453a 0%, #172720 50%, #0b1310 100%)'
              : 'radial-gradient(circle at 40% 30%, #1e2b24 0%, #121a16 50%, #070d0a 100%)',
          }}
        >
          {/* Concentric Double Bronze Rings */}
          <div className="absolute inset-1 rounded-full border border-[#dfba73]/30 pointer-events-none" />
          <div className="absolute inset-2 rounded-full border border-black/80 pointer-events-none" />
          <div className="absolute inset-3 rounded-full border border-[#dfba73]/20 pointer-events-none" />

          {/* Antique Cloud Etching Texture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(223,186,115,0.15),transparent_70%)] pointer-events-none" />

          {/* Central Golden Relief Calligraphy Character */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span
              className="text-3xl sm:text-4xl font-serif font-black tracking-widest leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]"
              style={{
                color: isUnlocked ? '#ffd885' : '#889e93',
                textShadow: isUnlocked
                  ? '0 2px 4px #000, 0 0 16px rgba(255, 216, 133, 0.6), 0 -1px 1px rgba(255,255,255,0.6)'
                  : '0 2px 4px #000',
              }}
            >
              {displayChar}
            </span>

            {showSubtitle && (
              <span className="text-[10px] sm:text-[11px] font-serif font-bold text-[#a8bfb4] mt-0.5 tracking-wider">
                {isUnlocked ? '已悟德行' : '叩问剑心'}
              </span>
            )}
          </div>

          {/* Bronze Sword / Medallion Mini Etching at bottom */}
          <div className="absolute bottom-1 w-6 h-[1.5px] bg-[#dfba73]/50 rounded-full" />
        </div>

        {/* Top & Bottom Warring States Dragon Filigree Crests (SVG) */}
        <div className="absolute -top-2 w-10 h-3 pointer-events-none flex justify-center">
          <svg viewBox="0 0 40 12" className="w-full h-full text-[#dfba73] drop-shadow-sm">
            <path
              d="M 4 10 Q 12 2 20 0 Q 28 2 36 10 Q 20 4 4 10 Z"
              fill="#1b2a22"
              stroke="#dfba73"
              strokeWidth="0.8"
            />
            <circle cx="20" cy="4" r="1.2" fill="#ffd885" />
          </svg>
        </div>
        <div className="absolute -bottom-2 w-10 h-3 pointer-events-none flex justify-center rotate-180">
          <svg viewBox="0 0 40 12" className="w-full h-full text-[#dfba73] drop-shadow-sm">
            <path
              d="M 4 10 Q 12 2 20 0 Q 28 2 36 10 Q 20 4 4 10 Z"
              fill="#1b2a22"
              stroke="#dfba73"
              strokeWidth="0.8"
            />
            <circle cx="20" cy="4" r="1.2" fill="#ffd885" />
          </svg>
        </div>
      </div>
    );
  }

  // Render Full Horizontal Warring States Plaque (Exact 1:1 Aesthetic of Reference Image 1 "磨刀开刃")
  return (
    <div
      onClick={onClick}
      className={`group relative inline-flex items-center justify-between select-none transition-all duration-300 ${
        onClick ? 'cursor-pointer active:scale-98' : ''
      } ${className}`}
    >
      {/* 1. Main Plaque Frame (Dark Patinated Bronze with Double Black & Bronze Outer Linework) */}
      <div className="relative w-full px-5 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-[#17251f] via-[#21352c] to-[#17251f] border-2 border-black rounded-none shadow-[0_12px_32px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,216,133,0.3)] flex items-center justify-between gap-4 overflow-hidden">
        {/* Inner Bronze Inset Hairline Frame */}
        <div className="absolute inset-1 border border-[#dfba73]/30 pointer-events-none" />
        <div className="absolute inset-1.5 border border-black/80 pointer-events-none" />

        {/* Four Corner Rivets */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#dfba73] border border-black" />
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#dfba73] border border-black" />
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#dfba73] border border-black" />
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#dfba73] border border-black" />

        {/* Left Side: Ancient Warring States Relief Calligraphy */}
        <div className="relative z-10 flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-[0.25em] drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)] leading-tight"
              style={{
                color: isUnlocked ? '#ffd885' : '#889e93',
                textShadow: isUnlocked
                  ? '0 2px 4px #000, 0 0 20px rgba(255, 216, 133, 0.5), 0 -1px 1px rgba(255,255,255,0.7)'
                  : '0 2px 4px #000',
              }}
            >
              {displayChar}
            </span>
            <span className="text-base sm:text-lg font-serif font-bold text-[#f5efe3] tracking-widest drop-shadow-sm">
              {displayTitle}
            </span>
          </div>

          {/* Symmetrical Carved Divider Line with Diamond Center Node (参考图1文字下方的中轴线) */}
          <div className="relative w-full max-w-[140px] sm:max-w-[180px] h-[1px] bg-gradient-to-r from-transparent via-[#dfba73] to-transparent my-1 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rotate-45 bg-[#dfba73] border border-black" />
          </div>

          {showSubtitle && (
            <div className="text-[11px] sm:text-xs font-serif text-[#9bb5a9] tracking-widest">
              【{meta.desc}】· {displayName}
            </div>
          )}
        </div>

        {/* Right Side: Circular Bronze Sword Medallion (参考图1右侧带剑与磨石的圆形铜环徽章) */}
        <div className="relative z-10 flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-black bg-gradient-to-b from-[#2a3c33] via-[#182620] to-[#0d1511] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
          {/* Medallion Concentric Inner Borders */}
          <div className="absolute inset-0.5 rounded-full border border-[#dfba73]/40" />
          <div className="absolute inset-1 rounded-full border border-black/70" />

          {/* Mini Inscribed Ancient Sword / Ingot Graphic */}
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-lg sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              🗡️
            </span>
            <span className="text-[8px] font-serif font-bold text-[#dfba73] tracking-tighter leading-none mt-0.5">
              春秋铭器
            </span>
          </div>

          {/* Mini 4-point Diamond Accents around ring */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rotate-45 bg-[#dfba73]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rotate-45 bg-[#dfba73]" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-1 h-1 rotate-45 bg-[#dfba73]" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-1 rotate-45 bg-[#dfba73]" />
        </div>
      </div>

      {/* 2. Top Center Sculpted Warring States Kui-Dragon/Taotie Cloud Crest (参考图1顶部雕花顶冠) */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-4 pointer-events-none flex justify-center z-20">
        <svg viewBox="0 0 120 16" className="w-full h-full text-[#dfba73] drop-shadow-md">
          <path
            d="M 10 14 Q 35 2 60 0 Q 85 2 110 14 Q 85 8 60 4 Q 35 8 10 14 Z"
            fill="#16241e"
            stroke="#dfba73"
            strokeWidth="1"
          />
          {/* Center Diamond Jewel */}
          <polygon points="60,1 63,5 60,9 57,5" fill="#ffd885" stroke="#16241e" strokeWidth="0.5" />
          <circle cx="38" cy="7" r="1.5" fill="#dfba73" />
          <circle cx="82" cy="7" r="1.5" fill="#dfba73" />
        </svg>
      </div>

      {/* 3. Bottom Center Symmetrical Sculpted Bronze Crest (参考图1底部雕花底座) */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-4 pointer-events-none flex justify-center z-20 rotate-180">
        <svg viewBox="0 0 120 16" className="w-full h-full text-[#dfba73] drop-shadow-md">
          <path
            d="M 10 14 Q 35 2 60 0 Q 85 2 110 14 Q 85 8 60 4 Q 35 8 10 14 Z"
            fill="#16241e"
            stroke="#dfba73"
            strokeWidth="1"
          />
          <polygon points="60,1 63,5 60,9 57,5" fill="#ffd885" stroke="#16241e" strokeWidth="0.5" />
          <circle cx="38" cy="7" r="1.5" fill="#dfba73" />
          <circle cx="82" cy="7" r="1.5" fill="#dfba73" />
        </svg>
      </div>

      {/* 4. Left and Right Notched Bronze Ears (参考图1左右两侧外凸折角耳饰) */}
      <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-2 h-6 bg-[#16241e] border-y border-l border-black flex items-center justify-center pointer-events-none">
        <div className="w-1 h-3 bg-[#dfba73]/60" />
      </div>
      <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-2 h-6 bg-[#16241e] border-y border-r border-black flex items-center justify-center pointer-events-none">
        <div className="w-1 h-3 bg-[#dfba73]/60" />
      </div>
    </div>
  );
};
