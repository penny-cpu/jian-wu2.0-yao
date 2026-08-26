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
                <span>【 问剑心法 · 玩法介绍 】</span>
              </h2>
              <p className="text-xs font-serif text-[#7bb39d] tracking-wider">
                春秋铸心 · 以德驭锋 · 知进退 · 刚柔并济
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
          <div className="flex items-start gap-2.5">
            <span className="text-[#ffd885] mt-0.5">◆</span>
            <p className="font-serif text-xs sm:text-sm md:text-base text-[#d8cbb8] leading-relaxed tracking-wide">
              这一路，你将与干将一同经历五段关于<strong className="text-[#ffd885] font-semibold">“剑”</strong>的春秋金石故事。
            </p>
          </div>

          {/* Paragraph 2 */}
          <div className="flex items-start gap-2.5">
            <span className="text-[#ffd885] mt-0.5">◆</span>
            <p className="font-serif text-xs sm:text-sm md:text-base text-[#d8cbb8] leading-relaxed tracking-wide">
              从识剑、持剑到出剑，在一次次<span className="text-[#ffd885] font-medium">点击、滑动、蓄力、判断与闪避</span>中，学会如何控制力量，如何圆柔进退，也学会在面对不义与困境时，坚守自己的选择与承诺。
            </p>
          </div>

          {/* Highlight Key Principles Callout */}
          <div className="p-3.5 sm:p-4 rounded-sm bg-[#131d19] border border-[#2e473d] space-y-2 shadow-inner">
            <div className="font-serif text-xs sm:text-sm text-[#ffd885] leading-relaxed tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffd885] shrink-0" />
              <span>你需要知道何时出剑，何时收剑；</span>
            </div>
            <div className="font-serif text-xs sm:text-sm text-[#7bb39d] leading-relaxed tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7bb39d] shrink-0" />
              <span>何时以刚破局，何时以柔化力；</span>
            </div>
            <div className="font-serif text-xs sm:text-sm text-[#dfba73] leading-relaxed tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#dfba73] shrink-0" />
              <span>也要在一次次抉择中，守住心中的道义。</span>
            </div>
          </div>

          {/* Five Virtues Summary */}
          <div className="space-y-2 pt-1">
            <p className="font-serif text-xs sm:text-sm md:text-base text-[#d8cbb8] leading-relaxed tracking-wide">
              五段旅程，对应五种德性：
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-6 py-2 px-3 rounded-sm bg-[#131d19] border border-[#2b3e36]">
              <span className="font-serif text-base sm:text-lg text-[#5cb87a] font-bold">仁</span>
              <span className="text-[#4e6b5f]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#dfba73] font-bold">礼</span>
              <span className="text-[#4e6b5f]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#d64d3e] font-bold">义</span>
              <span className="text-[#4e6b5f]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#66a3d2] font-bold">智</span>
              <span className="text-[#4e6b5f]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#f5efe3] font-bold">信</span>
            </div>
            <p className="font-serif text-xs sm:text-sm text-[#9ab3a6] leading-relaxed tracking-wide text-center pt-1">
              每完成一段历练，便点亮一德，也补全一分破碎的剑心。
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

