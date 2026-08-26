import React, { useState, useEffect } from 'react';
import { BambooLeavesEffect } from '../components/BambooLeavesEffect';
import { sound } from '../audio';
import { FastForward, Compass, ChevronLeft } from 'lucide-react';

interface StoryPrologueViewProps {
  onStartJourney: () => void;
  onBackToTitle?: () => void;
}

export const StoryPrologueView: React.FC<StoryPrologueViewProps> = ({
  onStartJourney,
  onBackToTitle,
}) => {
  const totalSteps = 6;
  const [visibleStep, setVisibleStep] = useState<number>(0);
  const [isCompletedReveal, setIsCompletedReveal] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleStep(prev => {
        if (prev < totalSteps) {
          return prev + 1;
        }
        clearInterval(timer);
        setIsCompletedReveal(true);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSteps]);

  const handleRevealAll = () => {
    sound.playClick();
    setVisibleStep(totalSteps);
    setIsCompletedReveal(true);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between px-5 sm:px-12 md:px-16 py-4 sm:py-6 select-none overflow-y-auto overflow-x-hidden text-left bg-[#0a0f0d]"
      onClick={() => {
        if (visibleStep < totalSteps) {
          setVisibleStep(prev => Math.min(totalSteps, prev + 2));
        }
      }}
    >
      {/* 1. Martial Falling Leaves & Patinated Bronze Background */}
      <BambooLeavesEffect />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,30,26,0.5)_0%,rgba(9,13,11,0.96)_100%)] pointer-events-none" />
      <div className="absolute inset-4 border border-[#2b3e36]/30 pointer-events-none" />

      {/* 2. Top Header Bar: Reference Image Style (Top tags on left/right) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex items-center justify-between pt-1 pb-3 border-b border-[#2b3e36]/60">
        {/* Left: Dynasty / Story tag or Back Button */}
        <div className="flex items-center gap-3">
          {onBackToTitle ? (
            <button
              id="prologue-btn-back"
              onClick={e => {
                e.stopPropagation();
                sound.playClick();
                onBackToTitle();
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#16221e] border border-[#3b554b] text-xs font-serif text-[#ffd885] hover:border-[#c5a059] transition-all cursor-pointer shadow-md active:scale-95"
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

        {/* Right: Chapter Title '序幕' & Fast Forward */}
        <div className="flex items-center gap-3">
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

      {/* 3. Main Narrative Body: Pure Typography, Left Aligned, No Boxed Borders */}
      <div className="relative z-20 my-auto w-full max-w-4xl mx-auto py-3 sm:py-6 space-y-4 sm:space-y-6 text-left">
        
        {/* Step 1: Subtitle / Cold Opening */}
        <div
          className={`transition-all duration-700 transform ${
            visibleStep >= 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <p className="text-xs sm:text-sm font-serif text-[#7bb39d] tracking-[0.25em]">
            第一次觉察 · 剑由铁铸，心由德成
          </p>
        </div>

        {/* Step 2: Giant Hero Headline */}
        <div
          className={`transition-all duration-700 transform ${
            visibleStep >= 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#f5efe3] tracking-wide leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            我铸了一辈子的剑，<br className="hidden sm:inline" />
            到底是在守护人，还是在杀人？
          </h2>
        </div>

        {/* Step 3: Story Narrative Reflection */}
        <div
          className={`transition-all duration-700 transform ${
            visibleStep >= 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <p className="font-serif text-xs sm:text-base md:text-lg text-[#d8cbb8] tracking-wide leading-relaxed max-w-3xl">
            炉火熄灭，剑心破碎。重新背起三尺青锋，踏上春秋战国九州问剑之旅。
          </p>
        </div>

        {/* Step 4: Five Stages & Inscribed Paths (Pure Left Aligned Typography, No Box Containers) */}
        <div
          className={`transition-all duration-700 transform space-y-2.5 ${
            visibleStep >= 4
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="text-xs sm:text-sm font-serif text-[#ffd885] font-bold tracking-widest flex items-center gap-2">
            <span className="text-[#d64d3e]">◆</span>
            <span>五段关于“剑”的故事 · 五德融剑</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 text-xs sm:text-sm font-serif pt-1">
            <div className="flex flex-col gap-0.5">
              <span className="text-[#5cb87a] font-bold tracking-wider">【 仁 】雪夜炊烟</span>
              <span className="text-[11px] sm:text-xs text-[#a8b8b0]">以仁御锋，护佑苍生温饱</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#dfba73] font-bold tracking-wider">【 礼 】剑问圣人</span>
              <span className="text-[11px] sm:text-xs text-[#a8b8b0]">收锋守礼，以敬出招知分寸</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#d64d3e] font-bold tracking-wider">【 义 】烈风之断</span>
              <span className="text-[11px] sm:text-xs text-[#a8b8b0]">当为则为，临难不苟卫正道</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#66a3d2] font-bold tracking-wider">【 智 】空谷之兽</span>
              <span className="text-[11px] sm:text-xs text-[#a8b8b0]">以柔化力，洞察破局御凶芒</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[#f5efe3] font-bold tracking-wider">【 信 】孤山挂剑</span>
              <span className="text-[11px] sm:text-xs text-[#a8b8b0]">千金一诺，重诺守誓不负心</span>
            </div>
          </div>
        </div>

        {/* Step 5: Core Martial Law Notice (知进退 & 刚柔并济) */}
        <div
          className={`transition-all duration-700 transform space-y-1.5 pt-1 ${
            visibleStep >= 5
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <p className="text-xs sm:text-sm font-serif text-[#d8cbb8] leading-relaxed tracking-wide">
            你需要知道何时出剑，何时收剑；何时以刚破局，何时以柔化力；
          </p>
          <p className="text-xs sm:text-sm font-serif text-[#ffd885] leading-relaxed tracking-wide font-medium">
            也要在一次次抉择中，守住心中的道义。每完成一段历练，便点亮一德，也补全一段剑意。
          </p>
        </div>

      </div>

      {/* 4. Bottom Action & Enlightenment Button */}
      <div
        className={`relative z-20 transition-all duration-700 transform flex flex-col sm:flex-row items-center justify-between pt-3 pb-1 border-t border-[#2b3e36]/60 ${
          visibleStep >= totalSteps
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="text-[11px] font-serif text-[#6d8a7e] mb-2 sm:mb-0">
          金石铸剑 · 德配其锋
        </div>

        <button
          id="prologue-btn-start"
          onClick={e => {
            e.stopPropagation();
            sound.playVirtueChime();
            onStartJourney();
          }}
          className="group px-8 sm:px-12 py-2.5 sm:py-3 rounded-sm bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#c5a059] text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base transition-all shadow-[0_0_25px_rgba(197,160,89,0.35)] hover:shadow-[0_0_35px_rgba(197,160,89,0.6)] hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
        >
          <span className="tracking-widest">领悟剑道 · 启程问剑</span>
          <Compass className="w-4 h-4 text-[#ffd885] group-hover:rotate-45 transition-transform" />
        </button>
      </div>
    </div>
  );
};

