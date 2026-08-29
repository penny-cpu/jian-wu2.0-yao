import React, { useState, useEffect } from 'react';
import { BambooLeavesEffect } from './BambooLeavesEffect';
import { sound } from '../audio';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { FastForward, Sparkles } from 'lucide-react';

export interface EpilogueLine {
  text: string;
  type?: 'narrative' | 'quote' | 'reflection' | 'conclusion';
  highlight?: boolean;
  italic?: boolean;
  color?: string;
}

interface WuxiaEpilogueProps {
  levelName?: string;
  badge?: string;
  badgeColor?: string;
  title: string;
  lines: (string | EpilogueLine)[];
  buttonText: string;
  onComplete: () => void;
  accentColor?: string;
  stepDelayMs?: number;
  bgImageKey?: string;
}

export const WuxiaEpilogue: React.FC<WuxiaEpilogueProps> = ({
  levelName,
  badge = '❖ 通关小结 ❖',
  badgeColor = '#d9533f',
  title,
  lines,
  buttonText,
  onComplete,
  accentColor = '#ffd700',
  stepDelayMs = 1200,
  bgImageKey,
}) => {
  // Normalize lines to structured objects
  const normalizedLines: EpilogueLine[] = lines.map(item => {
    if (typeof item === 'string') {
      if (item.startsWith('“') || item.startsWith('‘') || item.includes('持剑之') || item.includes('剑不向')) {
        return { text: item, type: 'quote', color: '#ffd700' };
      }
      if (item.includes('终于明白') || item.includes('剑有锋芒') || item.includes('天地清明')) {
        return { text: item, type: 'conclusion', highlight: true, italic: true };
      }
      return { text: item, type: 'narrative' };
    }
    return item;
  });

  // Total steps: 0 = badge & header, 1 = title, 2..2+N-1 = lines, 2+N = button
  const totalSteps = 2 + normalizedLines.length + 1;
  const [visibleStep, setVisibleStep] = useState<number>(0);
  const [isCompletedReveal, setIsCompletedReveal] = useState<boolean>(false);

  const bgUrl = bgImageKey
    ? getPlaceholderImage(bgImageKey, `${levelName || '关卡'} · 通关小结`, title, accentColor)
    : '';

  useEffect(() => {
    // Start revealing step by step at uniform pace
    const timer = setInterval(() => {
      setVisibleStep(prev => {
        if (prev < totalSteps) {
          return prev + 1;
        }
        clearInterval(timer);
        setIsCompletedReveal(true);
        return prev;
      });
    }, stepDelayMs);

    return () => clearInterval(timer);
  }, [totalSteps, stepDelayMs]);

  // Quick skip / speed up to full reveal
  const handleRevealAll = () => {
    sound.playClick();
    setVisibleStep(totalSteps);
    setIsCompletedReveal(true);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between px-3 sm:px-6 py-2 sm:py-3 select-none overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : undefined }}
      onClick={() => {
        // If still revealing, clicking reveals next or all
        if (visibleStep < totalSteps) {
          setVisibleStep(prev => Math.min(totalSteps, prev + 2));
        }
      }}
    >
      {/* Background Dimming & Inscription Overlay */}
      {bgUrl && <div className="absolute inset-0 bg-[#080d0b]/85 backdrop-blur-[1px] pointer-events-none" />}

      {/* 1. Martial Bamboo Forest & Falling Leaves + Sword Qi Effect (剑气江湖的竹林落叶特效动画) */}
      <BambooLeavesEffect />

      {/* 2. Top Bar: Level Name Pill on Left, '通关小结' Badge in Center (Horizontally Aligned), Skip Button on Right */}
      <div className="relative z-20 w-full max-w-4xl flex items-center justify-between pt-1 pb-1">
        {/* Left: Level Tag */}
        <div className="min-w-[120px] sm:min-w-[160px] flex items-center">
          {levelName ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-[#16221e]/95 border border-[#3b554b] text-xs sm:text-sm font-serif text-[#ffd885] shadow-md backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#d64d3e] shadow-[0_0_8px_#d64d3e] animate-pulse" />
              <span className="font-bold whitespace-nowrap">{levelName}</span>
            </div>
          ) : (
            <div className="w-4" />
          )}
        </div>

        {/* Center: Badge aligned with top header */}
        <div
          className={`transition-all duration-700 transform ${
            visibleStep >= 0
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          <div
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-sm border text-xs sm:text-sm font-serif tracking-[0.2em] shadow-[0_0_15px_rgba(0,0,0,0.8)] backdrop-blur-md"
            style={{
              borderColor: badgeColor || '#dfba73',
              color: badgeColor || '#ffd885',
              backgroundColor: 'rgba(22, 34, 30, 0.9)',
            }}
          >
            <span className="text-[10px] opacity-80">❖</span>
            <span className="font-bold">{badge.replace(/❖/g, '').trim()}</span>
            <span className="text-[10px] opacity-80">❖</span>
          </div>
        </div>

        {/* Right: Fast Forward Button */}
        <div className="min-w-[120px] sm:min-w-[160px] flex justify-end">
          {!isCompletedReveal && visibleStep < totalSteps && (
            <button
              id="epilogue-btn-skip-animation"
              onClick={e => {
                e.stopPropagation();
                handleRevealAll();
              }}
              className="px-3 py-1 rounded-sm bg-[#16221e]/90 hover:bg-[#20312a] border border-[#3b554b] hover:border-[#dfba73] text-xs font-serif text-[#ffd885] transition-all flex items-center gap-1 backdrop-blur-sm cursor-pointer active:scale-95 shadow-md"
              title="全部显现"
            >
              <FastForward className="w-3 h-3 text-[#ffd885]" />
              <span>速览悟道</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Main Center Floating Typographic Reading Canvas (居中对齐、从上至下依次出现、不消失、无文本框) */}
      <div className="relative z-20 my-auto w-full max-w-3xl flex flex-col items-center text-center px-4 py-1">
        {/* Row 1: Grand Calligraphic Title (如：剑有锋芒 · 亦须知礼) */}
        <div
          className={`transition-all duration-700 delay-100 transform ${
            visibleStep >= 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#f5efe3] tracking-[0.16em] mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            style={{
              textShadow: `0 0 25px ${accentColor}33, 0 2px 10px rgba(0,0,0,0.9)`,
            }}
          >
            {title}
          </h2>
        </div>

        {/* Rows 2..N: Progressive Epiphany Lines (逐排均匀显现，慢读慢醒悟) */}
        <div className="w-full flex flex-col items-center space-y-2 sm:space-y-3">
          {normalizedLines.map((line, idx) => {
            const isVisible = visibleStep >= 2 + idx;
            const isQuote = line.type === 'quote';
            const isConclusion = line.type === 'conclusion';

            return (
              <div
                key={idx}
                className={`w-full max-w-2xl text-center transition-all duration-700 transform ${
                  isVisible
                    ? 'opacity-100 translate-y-0 filter-none'
                    : 'opacity-0 translate-y-3 blur-[1px] pointer-events-none'
                }`}
                style={{
                  transitionDelay: '80ms',
                }}
              >
                {isQuote ? (
                  /* Callout Quote in luminous bronze/gold */
                  <p
                    className="font-serif font-semibold text-sm sm:text-base md:text-lg text-[#ffd885] leading-relaxed tracking-wider drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] px-2"
                    style={{
                      color: line.color || '#ffd885',
                      textShadow: '0 0 16px rgba(255, 216, 133, 0.35)',
                    }}
                  >
                    {line.text}
                  </p>
                ) : isConclusion ? (
                  /* Final Enlightenment Epiphany */
                  <p
                    className="font-serif text-base sm:text-xl md:text-2xl font-bold tracking-widest pt-1 sm:pt-2 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
                    style={{
                      color: line.color || badgeColor || '#dfba73',
                      textShadow: `0 0 20px ${badgeColor || '#dfba73'}55`,
                    }}
                  >
                    {line.text}
                  </p>
                ) : (
                  /* Standard meditative narrative line */
                  <p className="font-serif text-xs sm:text-sm md:text-base text-[#d8cbb8] leading-relaxed tracking-wide sm:tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {line.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Action Enlightenment Button (显现完成后伴随金光呼吸入场，始终处于视口内) */}
      <div
        className={`relative z-20 transition-all duration-700 transform pb-2 sm:pb-3 ${
          visibleStep >= totalSteps - 1
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <button
          id="epilogue-btn-complete"
          onClick={e => {
            e.stopPropagation();
            sound.playVirtueChime();
            onComplete();
          }}
          className="group relative px-8 sm:px-12 py-2.5 sm:py-3 rounded-sm bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border border-[#dfba73] hover:border-[#ffd885] text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base transition-all shadow-[0_0_30px_rgba(223,186,115,0.25)] hover:shadow-[0_0_40px_rgba(255,216,133,0.5)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span className="font-serif font-bold text-base sm:text-lg tracking-widest">{buttonText}</span>
          <Sparkles className="w-4 h-4 text-[#ffd885] group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
};
