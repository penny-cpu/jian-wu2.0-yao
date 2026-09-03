import React from 'react';
import jadePlaqueImg from '../assets/images/level3_jade_plaque_ornament_1788329193469.jpg';

export interface SwordGuardSocketGraphicProps {
  isInserted?: boolean;
  onClick?: () => void;
}

/**
 * 试炼二 · 剑格凹槽光点引导组件：
 * - 配合背景无遮罩剑柄图使用
 * - 未嵌合时：仅显示中央闪烁光点（Pulsing Pinpoint of Light）引导玩家点击
 * - 已嵌合时：玉珏完美嵌合入位，绽放碧玉神光与共鸣光晕
 */
export const SwordGuardSocketGraphic: React.FC<SwordGuardSocketGraphicProps> = ({
  isInserted = false,
  onClick,
}) => {
  return (
    <button
      id="lvl3-btn-sword-guard-socket"
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 focus:outline-none ${
        isInserted ? 'scale-105' : 'hover:scale-110 active:scale-95'
      }`}
      title={isInserted ? '剑格与玉珏已共鸣激活' : '点击将剑形玉珏嵌入此凹槽光点处'}
    >
      <div className="relative w-36 sm:w-44 h-28 sm:h-36 flex items-center justify-center">
        {!isInserted ? (
          /* 1. 未嵌合状态：闪烁的光点 (Pulsing Light Pinpoint) */
          <div className="relative flex items-center justify-center">
            {/* Outer expanding pulse rings */}
            <div className="absolute w-16 h-16 rounded-full bg-[#ffd885]/20 animate-ping pointer-events-none" />
            <div className="absolute w-12 h-12 rounded-full bg-[#7bf0b5]/30 animate-pulse pointer-events-none" />

            {/* Target Reticle Ring */}
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-[#ffd885] flex items-center justify-center shadow-[0_0_15px_#ffd885] bg-[#0c1612]/70 group-hover:border-white transition-colors">
              {/* Bright Central Glowing Point */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffffff] shadow-[0_0_12px_#ffffff,0_0_20px_#7bf0b5] animate-pulse" />
            </div>

            {/* Subtle Label Underneath */}
            <div className="absolute -bottom-6 px-2.5 py-0.5 rounded-full bg-[#0a120e]/90 border border-[#dfba73]/60 text-[10px] sm:text-xs font-serif text-[#ffd885] whitespace-nowrap shadow-md">
              ✦ 剑格凹槽
            </div>
          </div>
        ) : (
          /* 2. 已嵌合状态：玉珏入槽，神光共鸣 (Inlaid Jade Plaque with Resonating Light) */
          <div className="relative flex flex-col items-center justify-center animate-fade-in">
            {/* Brilliant Halo */}
            <div className="absolute -inset-2 rounded-sm bg-[#7bf0b5]/40 blur-md animate-pulse pointer-events-none" />

            {/* Inlaid Jade Plaque image fitting into sword cavity */}
            <div className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-sm border-2 border-[#ffd885] overflow-hidden shadow-[0_0_25px_rgba(123,240,181,0.8)] bg-[#0a130f]">
              <img
                src={jadePlaqueImg}
                alt="已嵌合剑形玉珏"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain p-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5cb87a]/20 to-transparent pointer-events-none" />
            </div>

            {/* Success Resonance Tag */}
            <div className="absolute -bottom-6 px-3 py-0.5 rounded-full bg-[#11241c]/95 border border-[#5cb87a] text-[10px] sm:text-xs font-serif font-bold text-[#7bf0b5] whitespace-nowrap shadow-[0_0_10px_rgba(92,184,122,0.5)]">
              ✨ 玉珏已合 · 神兵共鸣
            </div>
          </div>
        )}
      </div>
    </button>
  );
};
