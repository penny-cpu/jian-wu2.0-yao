import React from 'react';
import { sound } from '../audio';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { BronzeCornerPlaque } from './BronzeCornerPlaque';
import { BronzeFiligreeButton } from './BronzeFiligreeButton';
import bronzeScrollBg from '../assets/images/bronze_scroll_bg_1788276709995.jpg';

interface GameplayIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameplayIntroModal: React.FC<GameplayIntroModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060a08]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-fade-in">
      {/* Container with Warring States Bronze Corner Linework (图4设计) and Scroll Top/Bottom Borders (图2设计) */}
      <BronzeCornerPlaque className="relative w-full max-w-2xl bg-[#16221e]/95 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.98)] p-6 sm:p-8 overflow-hidden max-h-[92vh] flex flex-col justify-between">
        {/* Background Image Layer (参考图2卷轴底图) */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${bronzeScrollBg})` }}
        />
        {/* 70% 遮罩层 (参考要求：遮罩70%) */}
        <div className="absolute inset-0 bg-[#0a100d]/70 pointer-events-none" />

        {/* Top Scroll Border Inscription Line (参考图2上下边框纹线设计) */}
        <div className="absolute top-1 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#dfba73]/80 to-transparent pointer-events-none" />
        <div className="absolute top-2 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent pointer-events-none" />

        {/* Bottom Scroll Border Inscription Line (参考图2上下边框纹线设计) */}
        <div className="absolute bottom-2 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-1 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#dfba73]/80 to-transparent pointer-events-none" />

        {/* Top Header & Close Button */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#3b554b]/70 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[#ffd885] text-lg">◇</span>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#f5efe3] tracking-widest flex items-center gap-2">
                <span>【 以五德问剑 · 玩法介绍 】</span>
              </h2>
              <p className="text-xs font-serif text-[#ffd885] tracking-wider font-semibold">
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
            className="p-1.5 rounded-sm bg-[#111916]/90 border border-[#3b554b] text-[#7bb39d] hover:text-[#ffd885] hover:border-[#dfba73] transition-colors cursor-pointer shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Gameplay Content */}
        <div className="relative z-10 space-y-3.5 my-auto py-2 text-left">
          {/* Paragraph 1 */}
          <div className="flex items-start gap-2.5 bg-[#111916]/85 backdrop-blur-sm p-3 rounded-sm border border-[#2b3e36]/80">
            <span className="text-[#ffd885] mt-0.5 font-bold">◆</span>
            <p className="font-serif text-xs sm:text-sm md:text-base text-[#d6e0db] leading-relaxed tracking-wide">
              跟随干将踏上问剑之旅，依次完成五关剑道试炼。
            </p>
          </div>

          {/* Paragraph 2 */}
          <div className="flex items-start gap-2.5 bg-[#111916]/85 backdrop-blur-sm p-3.5 rounded-sm border border-[#2b3e36]/80">
            <span className="text-[#ffd885] mt-0.5 font-bold">◆</span>
            <p className="font-serif text-xs sm:text-sm md:text-base text-[#d6e0db] leading-relaxed tracking-wide">
              在不同关卡中，通过<strong className="text-[#ffd885]">点击、滑动、判断与闪避</strong>等操作，完成<span className="text-[#7bb39d] font-bold">锻剑、格挡、出招、剑法选择与躲避障碍</span>等挑战。
            </p>
          </div>

          {/* Paragraph 3 */}
          <div className="p-4 rounded-sm bg-[#111916]/90 backdrop-blur-sm border border-[#dfba73]/40 space-y-3 shadow-inner">
            <div className="flex items-start gap-2.5">
              <span className="text-[#ffd885] mt-0.5 font-bold">◆</span>
              <p className="font-serif text-xs sm:text-sm md:text-base text-[#d6e0db] leading-relaxed tracking-wide">
                每完成一关，即可分别点亮对应五德——
              </p>
            </div>

            {/* Five Virtues Badges Row */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 py-2 px-3 rounded-sm bg-[#0c1411]/90 border border-[#2b3e36]">
              <span className="font-serif text-base sm:text-lg text-[#5cb87a] font-bold px-2 py-0.5 bg-[#16291e] rounded-sm border border-[#5cb87a]/60 shadow-sm">仁</span>
              <span className="text-[#dfba73]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#dfba73] font-bold px-2 py-0.5 bg-[#2b2716] rounded-sm border border-[#dfba73]/60 shadow-sm">礼</span>
              <span className="text-[#dfba73]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#e06666] font-bold px-2 py-0.5 bg-[#2b1716] rounded-sm border border-[#e06666]/60 shadow-sm">义</span>
              <span className="text-[#dfba73]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#5cb8b2] font-bold px-2 py-0.5 bg-[#10272c] rounded-sm border border-[#5cb8b2]/60 shadow-sm">智</span>
              <span className="text-[#dfba73]">·</span>
              <span className="font-serif text-base sm:text-lg text-[#d64d3e] font-bold px-2 py-0.5 bg-[#2a120e] rounded-sm border border-[#d64d3e]/60 shadow-sm">信</span>
            </div>

            <p className="font-serif text-xs sm:text-sm text-[#ffd885] leading-relaxed tracking-wide text-center font-bold pt-1">
              补全破碎的剑心，最终找到“为何持剑”的答案。
            </p>
          </div>
        </div>

        {/* Footer Button (图3居中青铜按键) */}
        <div className="relative z-10 text-center pt-3 mt-2 flex justify-center">
          <BronzeFiligreeButton
            id="gameplay-modal-confirm"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            variant="gold"
            size="md"
            leftOrnament={<Sparkles className="w-3.5 h-3.5 text-[#dfba73]" />}
            rightOrnament={<Sparkles className="w-3.5 h-3.5 text-[#dfba73]" />}
          >
            <span>我已明了 · 领悟剑意</span>
          </BronzeFiligreeButton>
        </div>
      </BronzeCornerPlaque>
    </div>
  );
};

