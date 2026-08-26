import React, { useState, useEffect } from 'react';
import { WarfareSilhouetteEffect } from '../components/WarfareSilhouetteEffect';
import { sound } from '../audio';
import { FastForward, Compass, ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryPrologueViewProps {
  onStartJourney: () => void;
  onBackToTitle?: () => void;
}

export const StoryPrologueView: React.FC<StoryPrologueViewProps> = ({
  onStartJourney,
  onBackToTitle,
}) => {
  // Page 1: 4 steps; Page 2: 4 steps
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [visibleStep, setVisibleStep] = useState<number>(0);
  const [isCompletedReveal, setIsCompletedReveal] = useState<boolean>(false);

  const totalSteps = 4;

  useEffect(() => {
    setVisibleStep(0);
    setIsCompletedReveal(false);

    const timer = setInterval(() => {
      setVisibleStep(prev => {
        if (prev < totalSteps) {
          return prev + 1;
        }
        clearInterval(timer);
        setIsCompletedReveal(true);
        return prev;
      });
    }, 850);

    return () => clearInterval(timer);
  }, [currentPage]);

  const handleRevealAll = () => {
    sound.playClick();
    setVisibleStep(totalSteps);
    setIsCompletedReveal(true);
  };

  const handleNextPage = () => {
    sound.playStarTwinkle();
    setCurrentPage(2);
  };

  const handlePrevPage = () => {
    sound.playClick();
    setCurrentPage(1);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between px-5 sm:px-12 md:px-16 py-4 sm:py-6 select-none overflow-y-auto overflow-x-hidden text-left bg-[#090e0c]"
      onClick={() => {
        if (visibleStep < totalSteps) {
          setVisibleStep(prev => Math.min(totalSteps, prev + 2));
        }
      }}
    >
      {/* 1. Warfare Silhouette & Blood-Rain Desolate Bronze Background */}
      <WarfareSilhouetteEffect />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,16,14,0.35)_0%,rgba(9,14,12,0.92)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,14,12,0.6)_0%,transparent_35%,transparent_65%,rgba(9,14,12,0.85)_100%)] pointer-events-none" />
      <div className="absolute inset-4 border border-[#3b554b]/30 pointer-events-none" />

      {/* 2. Top Header Bar: Reference Style */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex items-center justify-between pt-1 pb-3 border-b border-[#2b3e36]/60">
        {/* Left: Back button or Dynasty tag */}
        <div className="flex items-center gap-3">
          {currentPage === 2 ? (
            <button
              id="prologue-btn-prev-page"
              onClick={e => {
                e.stopPropagation();
                handlePrevPage();
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-sm bg-[#16221e]/90 border border-[#3b554b] text-xs font-serif text-[#ffd885] hover:border-[#c5a059] transition-all cursor-pointer shadow-md active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>上一页</span>
            </button>
          ) : onBackToTitle ? (
            <button
              id="prologue-btn-back"
              onClick={e => {
                e.stopPropagation();
                sound.playClick();
                onBackToTitle();
              }}
              className="flex items-center gap-1 px-3 py-1 rounded-sm bg-[#16221e]/90 border border-[#3b554b] text-xs font-serif text-[#ffd885] hover:border-[#c5a059] transition-all cursor-pointer shadow-md active:scale-95"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>返回首页</span>
            </button>
          ) : (
            <div className="text-xs font-serif text-[#7bb39d] tracking-widest flex items-center gap-1.5">
              <span>「春秋」</span>
              <span className="text-[#c7beaf]">干将问剑</span>
            </div>
          )}
        </div>

        {/* Right: Chapter Title '序幕' & Page Indicator & Fast Forward */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-serif text-[#7bb39d] px-2.5 py-0.5 bg-[#16221e]/85 border border-[#3b554b] rounded-sm flex items-center gap-1.5">
            <span>第 {currentPage}/2 页</span>
            <span className="text-[#3b554b]">|</span>
            <span className="text-[#ffd885]">{currentPage === 1 ? '剑心破碎' : '启程问剑'}</span>
          </div>

          <span className="text-xs sm:text-sm font-serif text-[#a8b8b0] tracking-[0.25em]">
            序 幕
          </span>

          {!isCompletedReveal && visibleStep < totalSteps && (
            <button
              id="prologue-btn-skip"
              onClick={e => {
                e.stopPropagation();
                handleRevealAll();
              }}
              className="px-2.5 py-0.5 rounded-sm bg-[#16221e]/90 hover:bg-[#20302a] border border-[#3b554b] hover:border-[#dfba73] text-[11px] font-serif text-[#dfba73] transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-md"
              title="全部显现"
            >
              <FastForward className="w-3 h-3 text-[#ffd885]" />
              <span>速览</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Main Narrative Body */}
      <div className="relative z-20 my-auto w-full max-w-4xl mx-auto py-3 sm:py-6 space-y-5 sm:space-y-6 text-left">
        {currentPage === 1 ? (
          /* PAGE 1 CONTENT: 剑心破碎 */
          <>
            {/* Page 1 Chapter Subtitle (Matching Fig 1 Diamond Header) */}
            <div className="pb-1">
              <div className="inline-flex items-center gap-2.5 text-sm sm:text-base font-serif text-[#dfba73] tracking-[0.35em]">
                <span className="text-[#7bb39d] text-base">◆</span>
                <span className="font-bold">剑 心 破 碎</span>
              </div>
            </div>

            {/* Step 1: Opening reflection on forging */}
            <div
              className={`transition-all duration-700 transform ${
                visibleStep >= 1
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <p className="text-sm sm:text-base md:text-lg font-serif text-[#d8cbb8] tracking-wide leading-relaxed">
                半生炉火，千锤百炼。<br />
                干将曾以为，剑越锋利，便越接近铸剑的极致。
              </p>
            </div>

            {/* Step 2: Blood on the blade & Doubt */}
            <div
              className={`transition-all duration-700 transform ${
                visibleStep >= 2
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <p className="text-sm sm:text-base md:text-lg font-serif text-[#d8cbb8] tracking-wide leading-relaxed">
                直到亲眼看见自己所铸之剑染上鲜血，他第一次开始怀疑：
              </p>
            </div>

            {/* Step 3: Giant Question Quote - Single Line */}
            <div
              className={`transition-all duration-700 transform pt-1 ${
                visibleStep >= 3
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <h2 className="font-serif text-[18px] sm:text-[23px] md:text-[28px] text-[#f5efe3] tracking-wide leading-normal whitespace-normal sm:whitespace-nowrap drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                “我铸了一辈子的剑，到底是在守护人，还是在杀人？”
              </h2>
            </div>

            {/* Step 4: Final Conclusion on Page 1 (Matching Fig 1 Fourth Row Golden Bold Style) */}
            <div
              className={`transition-all duration-700 transform pt-2 ${
                visibleStep >= 4
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <p className="text-[24px] sm:text-[28px] md:text-[32px] font-serif font-bold text-[#ffd885] tracking-widest drop-shadow-[0_2px_14px_rgba(255,216,133,0.38)]">
                自此，炉火熄灭，剑心破碎。
              </p>
            </div>
          </>
        ) : (
          /* PAGE 2 CONTENT: 启程问剑 (Matching Fig 1 Layout & Styles Exactly) */
          <>
            {/* Page 2 Chapter Subtitle */}
            <div className="pb-1">
              <div className="inline-flex items-center gap-2.5 text-sm sm:text-base font-serif text-[#dfba73] tracking-[0.35em]">
                <span className="text-[#7bb39d] text-base">◆</span>
                <span className="font-bold">启 程 问 剑</span>
              </div>
            </div>

            {/* Step 1: Hearth Extinguished & Resuming the Journey */}
            <div
              className={`transition-all duration-700 transform ${
                visibleStep >= 1
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <p className="text-sm sm:text-base md:text-lg font-serif text-[#d8cbb8] tracking-wide leading-relaxed">
                许久之后，干将重新背起长剑，踏上问剑之旅。
              </p>
            </div>

            {/* Step 2: Five Stories Ahead - Single Line */}
            <div
              className={`transition-all duration-700 transform pt-1 ${
                visibleStep >= 2
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-2 text-xs sm:text-sm md:text-base font-serif tracking-wide whitespace-normal sm:whitespace-nowrap">
                <span className="text-[#ffd885] font-medium">前路之上，五段因剑而起的故事正等待着他——</span>
                <span className="text-[#7bb39d] tracking-wider font-bold">雪夜炊烟 · 剑问圣人 · 烈风之断 · 空谷之兽 · 孤山挂剑</span>
              </div>
            </div>

            {/* Step 3: Five Encounters */}
            <div
              className={`transition-all duration-700 transform pt-1 ${
                visibleStep >= 3
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <p className="text-sm sm:text-base md:text-lg font-serif text-[#d8cbb8] tracking-wide leading-relaxed">
                五段相遇，五次抉择。<br />
                他要寻找的，不是一柄更锋利的剑，<br />
                而是一个答案——
              </p>
            </div>

            {/* Step 4: The Final Core Question */}
            <div
              className={`transition-all duration-700 transform pt-2 ${
                visibleStep >= 4
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <p className="text-[24px] sm:text-[28px] md:text-[32px] font-serif font-bold text-[#ffd885] tracking-widest drop-shadow-[0_2px_14px_rgba(255,216,133,0.38)]">
                人，究竟为何持剑？
              </p>
            </div>
          </>
        )}
      </div>

      {/* 4. Bottom Action Bar (Matching Fig 1 Layout & Button) */}
      <div
        className={`relative z-20 transition-all duration-700 transform flex flex-col sm:flex-row items-center justify-between pt-3 pb-1 border-t border-[#2b3e36]/60 ${
          visibleStep >= totalSteps
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="text-[11px] sm:text-xs font-serif text-[#6d8a7e] mb-2 sm:mb-0">
          金石铸剑 · 德配其锋
        </div>

        {currentPage === 1 ? (
          /* PAGE 1: NEXT BUTTON */
          <button
            id="prologue-btn-next-page"
            onClick={e => {
              e.stopPropagation();
              handleNextPage();
            }}
            className="group px-8 sm:px-10 py-2.5 sm:py-3 rounded-sm bg-gradient-to-r from-[#1b2a24] via-[#2a3f36] to-[#1b2a24] border border-[#3b554b] hover:border-[#dfba73] text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base transition-all shadow-[0_0_20px_rgba(59,85,75,0.4)] hover:shadow-[0_0_25px_rgba(223,186,115,0.4)] hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <span className="tracking-widest">继 续 · 问 剑 之 旅</span>
            <ChevronRight className="w-4 h-4 text-[#ffd885] group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          /* PAGE 2: START JOURNEY BUTTON (Matching Fig 1 领悟剑道 · 启程问剑 🧭) */
          <button
            id="prologue-btn-start"
            onClick={e => {
              e.stopPropagation();
              sound.playVirtueChime();
              onStartJourney();
            }}
            className="group px-8 sm:px-12 py-2.5 sm:py-3 rounded-sm bg-gradient-to-r from-[#1c2923] via-[#2d4238] to-[#1c2923] border border-[#c5a059] text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base transition-all shadow-[0_0_25px_rgba(197,160,89,0.35)] hover:shadow-[0_0_35px_rgba(197,160,89,0.6)] hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
          >
            <span className="tracking-widest">领悟剑道 · 启程问剑</span>
            <Compass className="w-4 h-4 text-[#ffd885] group-hover:rotate-45 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
