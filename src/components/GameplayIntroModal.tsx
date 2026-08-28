import React from 'react';
import { sound } from '../audio';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

interface GameplayIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameplayIntroModal: React.FC<GameplayIntroModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0e1512] border border-[#3b554b] rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.98)] p-5 sm:p-8 overflow-y-auto max-h-[92vh] flex flex-col justify-between">
        {/* Bronze Metallic Inset Border & Corner Rivets */}
        <div className="absolute inset-1.5 border border-[#dfba73]/20 pointer-events-none z-0" />
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#dfba73]" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#dfba73]" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#dfba73]" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#dfba73]" />

        {/* Top Header & Close Button */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#2a3e36] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-[#ffd885] text-lg">◇</span>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#f5efe3] tracking-widest flex items-center gap-2">
                <span>【 以五德问剑 · 玩法介绍 】</span>
              </h2>
              <p className="text-xs font-serif text-[#7bb39d] tracking-wider">
                春秋铸心 · 以德驭锋 · 刚柔并济 · 剑心重铸
              </p>
            </div>
          </div>

          <button
            id="gameplay-modal-close"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] text-[#c7beaf] hover:text-[#ffd885] hover:border-[#dfba73] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Gameplay Content */}
        <div className="relative z-10 space-y-4 my-auto py-2 text-left">
          {/* Paragraph 1 */}
          <div className="flex items-start gap-2.5 bg-[#131d19]/60 p-3 rounded-sm border border-[#23352e]">
            <span className="text-[#ffd885] mt-0.5">◆</span>
            <p className="font-serif text-xs sm:text-sm md:text-base text-[#e6dbca] leading-relaxed tracking-wide">
              跟随干将踏上问剑之旅，依次完成五关剑道试炼。
            </p>
          </div>

          {/* Paragraph 2 */}
          <div className="flex items-start gap-2.5 bg-[#131d19]/60 p-3.5 rounded-sm border border-[#23352e]">
            <span className="text-[#ffd885] mt-0.5">◆</span>
            <p className="font-serif text-xs sm:text-sm md:text-base text-[#e6dbca] leading-relaxed tracking-wide">
              在不同关卡中，通过<strong className="text-[#ffd885]">点击、滑动、判断与闪避</strong>等操作，完成<span className="text-[#7bb39d] font-medium">锻剑、格挡、出招、剑法选择与躲避障碍</span>等挑战。
            </p>
          </div>

          {/* Paragraph 3 */}
          <div className="p-4 rounded-sm bg-[#131d19] border border-[#3b554b] space-y-3 shadow-inner">
            <div className="flex items-start gap-2.5">
              <span className="text-[#d64d3e] mt-0.5">◆</span>
              <p className="font-serif text-xs sm:text-sm md:text-base text-[#e6dbca] leading-relaxed tracking-wide">
                每完成一关，即可分别点亮对应五德——
              </p>
            </div>

            {/* Five Virtues Badges Row */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 py-2 px-3 rounded-sm bg-[#0a0f0d] border border-[#2b3e36]">
              <span className="font-serif text-base sm:text-lg text-[#5cb87a] font-bold px-2 py-0.5 bg-[#16241e] rounded-sm border border-[#5cb87a]/40 shadow-sm">仁</span>
              <span className="text-[#4e6b5f]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#dfba73] font-bold px-2 py-0.5 bg-[#242116] rounded-sm border border-[#dfba73]/40 shadow-sm">礼</span>
              <span className="text-[#4e6b5f]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#d64d3e] font-bold px-2 py-0.5 bg-[#261716] rounded-sm border border-[#d64d3e]/40 shadow-sm">义</span>
              <span className="text-[#4e6b5f]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#66a3d2] font-bold px-2 py-0.5 bg-[#162026] rounded-sm border border-[#66a3d2]/40 shadow-sm">智</span>
              <span className="text-[#4e6b5f]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#f5efe3] font-bold px-2 py-0.5 bg-[#222421] rounded-sm border border-[#f5efe3]/40 shadow-sm">信</span>
            </div>

            <p className="font-serif text-xs sm:text-sm text-[#ffd885] leading-relaxed tracking-wide text-center font-medium pt-1">
              补全破碎的剑心，最终找到“为何持剑”的答案。
            </p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="relative z-10 text-center pt-4 border-t border-[#2a3e36] mt-3">
          <button
            id="gameplay-modal-confirm"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-8 py-2.5 rounded-sm bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] hover:text-[#fff] transition-all text-xs sm:text-sm font-serif shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <CheckCircle2 className="w-4 h-4 text-[#ffd885]" />
            <span>我已明了 · 领悟剑意</span>
          </button>
        </div>
      </div>
    </div>
  );
};

