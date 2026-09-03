import React from 'react';
import jadePlaqueImg from '../assets/images/level3_jade_plaque_ornament_1788329193469.jpg';

export interface SwordJadePendantGraphicProps {
  isInserted?: boolean;
  onClick?: () => void;
}

/**
 * 试炼二 · 剑形玉珏图片组件（参考图1羊脂白玉透雕造型与质感）：
 * - 采用专属生成的透雕白玉/羊脂碧玉纹理图片
 * - 饰以红金丝绦与温润宝光
 * - 未嵌合时：悬浮浮动光晕，提示点击飞入剑格凹槽
 * - 已嵌合时：原位呈现淡雅虚影
 */
export const SwordJadePendantGraphic: React.FC<SwordJadePendantGraphicProps> = ({
  isInserted = false,
  onClick,
}) => {
  return (
    <button
      id="lvl3-btn-sword-jade-pendant"
      onClick={onClick}
      disabled={isInserted}
      className={`group relative flex flex-col items-center justify-center transition-all duration-500 focus:outline-none ${
        isInserted
          ? 'opacity-30 pointer-events-none filter grayscale-[40%]'
          : 'cursor-pointer hover:scale-110 active:scale-95 animate-bounce-subtle'
      }`}
      title={isInserted ? '剑形玉珏已嵌入剑格' : '点击剑形玉珏，将其嵌入剑格凹槽'}
    >
      {/* Outer Luminous Aura */}
      {!isInserted && (
        <div className="absolute -inset-1.5 rounded-md bg-[#7bf0b5]/20 blur-md animate-pulse pointer-events-none" />
      )}

      {/* Jade Item Card Container */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-sm bg-[#0d1713]/90 border border-[#7bf0b5]/70 p-1.5 flex flex-col items-center justify-between shadow-[0_0_20px_rgba(92,184,122,0.45)]">
        {/* Jade Image Thumbnail with Relief Texture */}
        <div className="relative w-full flex-1 rounded-xs overflow-hidden border border-[#5cb87a]/40 bg-[#08100d] flex items-center justify-center">
          <img
            src={jadePlaqueImg}
            alt="剑形玉珏"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
          />
          {/* Subtle Glistening Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#ffffff]/10 to-transparent pointer-events-none" />
        </div>

        {/* Caption */}
        <div className="mt-1 text-[11px] font-serif font-bold text-[#ffd885] tracking-wider flex items-center gap-1">
          <span className="text-xs">💠</span>
          <span>剑形玉珏</span>
        </div>
      </div>
    </button>
  );
};
