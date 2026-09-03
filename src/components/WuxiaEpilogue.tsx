import React, { useState, useEffect } from 'react';
import { BambooLeavesEffect } from './BambooLeavesEffect';
import { sound } from '../audio';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { FastForward, Sparkles } from 'lucide-react';
import { BronzeCornerPlaque } from './BronzeCornerPlaque';
import { BronzeFiligreeButton } from './BronzeFiligreeButton';
import { BlackGoldTag, BlackGoldButton } from './BlackGoldBorder';


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
  bgImageUrl?: string;
  maskOpacity?: number; // e.g. 0.10 for 10% mask
  maskClass?: string;
  cardBgImageUrl?: string; // 弹窗内部底图
  cardMaskOpacity?: number; // 弹窗内部底图遮罩 (默认 0.40 即 40%)
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
  bgImageUrl,
  maskOpacity = 0.10, // 默认 10% 遮罩
  maskClass,
  cardBgImageUrl,
  cardMaskOpacity = 0.40,
}) => {
  // Normalize lines to structured objects
  const normalizedLines: EpilogueLine[] = (lines || [])
    .filter(Boolean)
    .map(item => {
      if (typeof item === 'string') {
        if (item.startsWith('“') || item.startsWith('‘') || item.includes('持剑之') || item.includes('剑不向')) {
          return { text: item, type: 'quote', color: '#ffd700' };
        }
        if (item.includes('终于明白') || item.includes('剑有锋芒') || item.includes('天地清明')) {
          return { text: item, type: 'conclusion', highlight: true, italic: true };
        }
        return { text: item, type: 'narrative' };
      }
      if (item && typeof item === 'object') {
        return { text: item.text || '', ...item };
      }
      return { text: String(item || ''), type: 'narrative' };
    });

  // Total steps: 0 = badge & header, 1 = title, 2..2+N-1 = lines, 2+N = button
  const totalSteps = 2 + normalizedLines.length + 1;
  const [visibleStep, setVisibleStep] = useState<number>(0);
  const [isCompletedReveal, setIsCompletedReveal] = useState<boolean>(false);

  const [isTransitioningOut, setIsTransitioningOut] = useState<boolean>(false);
  const [isBgLoaded, setIsBgLoaded] = useState<boolean>(false);

  const bgUrl = cardBgImageUrl
    ? ''
    : (bgImageUrl || (bgImageKey
        ? getPlaceholderImage(bgImageKey, `${levelName || '关卡'} · 通关小结`, title, accentColor)
        : ''));

  useEffect(() => {
    // Trigger initial ink wash diffusion sound
    sound.playGuqinPluckSingle(0);
    setIsBgLoaded(true);

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

  const handleFinish = () => {
    sound.playVirtueChime();
    setIsTransitioningOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-between px-3 sm:px-6 py-2 sm:py-3 select-none overflow-hidden bg-[#0a100d] ${
        isTransitioningOut ? 'animate-ink-fadeout' : isBgLoaded ? 'animate-ink-wash' : 'opacity-0'
      }`}
      onClick={() => {
        // If still revealing, clicking reveals next or all
        if (visibleStep < totalSteps) {
          setVisibleStep(prev => Math.min(totalSteps, prev + 2));
        }
      }}
    >
      {/* Background Image Layer with Ink Wash Diffusion and Subtle Zoom */}
      {bgUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform pointer-events-none scale-100"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      )}

      {/* Background Dimming & Inscription Overlay (10% 遮罩) */}
      {bgUrl && (
        <div
          className={`absolute inset-0 pointer-events-none ${maskClass || ''}`}
          style={{
            backgroundColor: maskClass ? undefined : `rgba(8, 13, 11, ${maskOpacity})`,
          }}
        />
      )}

      {/* Water-Ink Wash Diffuse Radial Vignette Effect (水墨晕染渐变扩散层) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(6,10,8,0.7)_75%,rgba(3,6,5,0.95)_100%)] z-10" />

      {/* 1. Martial Bamboo Forest & Falling Leaves + Sword Qi Effect (剑气江湖的竹林落叶特效动画) */}
      <BambooLeavesEffect />

      {/* 2. Top Bar: Level Name Pill on Left, '通关小结' Badge in Center (Horizontally Aligned), Skip Button on Right */}
      <div className="relative z-20 w-full max-w-4xl flex items-center justify-between pt-1 pb-1">
        {/* Left: Level Tag */}
        <div className="min-w-[120px] sm:min-w-[160px] flex items-center">
          {levelName ? (
            <BlackGoldTag className="px-3 py-1 text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-[#d64d3e] shadow-[0_0_8px_#d64d3e] animate-pulse" />
              <span className="font-bold whitespace-nowrap">{levelName}</span>
            </BlackGoldTag>
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
          <BlackGoldTag className="px-3.5 py-1 text-xs sm:text-sm tracking-[0.2em]">
            <span className="text-[10px] opacity-80">❖</span>
            <span className="font-bold text-[#ffd885]">{badge.replace(/❖/g, '').trim()}</span>
            <span className="text-[10px] opacity-80">❖</span>
          </BlackGoldTag>
        </div>

        {/* Right: Fast Forward Button */}
        <div className="min-w-[120px] sm:min-w-[160px] flex justify-end">
          {!isCompletedReveal && visibleStep < totalSteps && (
            <BlackGoldButton
              id="epilogue-btn-skip-animation"
              variant="bronze"
              size="sm"
              onClick={e => {
                e.stopPropagation();
                handleRevealAll();
              }}
              title="全部显现"
            >
              <FastForward className="w-3 h-3 text-[#ffd885]" />
              <span>速览悟道</span>
            </BlackGoldButton>
          )}
        </div>
      </div>


      {/* 3. Main Center Floating Typographic Reading Canvas (通关小结无弹窗框：纯净无边框，只显示文字) */}
      <div className="relative z-20 my-auto w-full max-w-3xl flex flex-col items-center text-center px-4 sm:px-6 py-2">
        <div className="relative w-full max-w-2xl p-4 sm:p-6 flex flex-col items-center animate-fade-in">
          {/* Row 1: Grand Calligraphic Title (如：剑有锋芒 · 亦须知礼 / 当为则为 · 仗义卫道) */}
          <div
            className={`relative z-10 transition-all duration-700 delay-100 transform ${
              visibleStep >= 1
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#f5efe3] tracking-[0.16em] mb-4 sm:mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
              style={{
                textShadow: `0 0 25px ${accentColor}33, 0 2px 10px rgba(0,0,0,0.9)`,
              }}
            >
              {title}
            </h2>
          </div>

          {/* Rows 2..N: Progressive Epiphany Lines (逐排均匀显现，无框通透慢读) */}
          <div className="relative z-10 w-full flex flex-col items-center space-y-3.5 sm:space-y-4">
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
                      {line?.text || ''}
                    </p>
                  ) : isConclusion ? (
                    /* Final Enlightenment Epiphany */
                    <p
                      className="font-serif text-base sm:text-xl md:text-2xl font-bold tracking-widest pt-2 sm:pt-3 drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
                      style={{
                        color: line.color || badgeColor || '#dfba73',
                        textShadow: `0 0 20px ${badgeColor || '#dfba73'}55`,
                      }}
                    >
                      {line?.text || ''}
                    </p>
                  ) : (
                    /* Standard meditative narrative line */
                    <p className="font-serif text-xs sm:text-sm md:text-base text-[#d8cbb8] leading-relaxed tracking-wide sm:tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {line?.text || ''}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
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
        <BlackGoldButton
          id="epilogue-btn-complete"
          onClick={e => {
            e.stopPropagation();
            handleFinish();
          }}
          variant="gold"
          size="lg"
          className="px-8 py-2.5 text-sm sm:text-base font-bold shadow-2xl"
        >
          <Sparkles className="w-4 h-4 text-[#7bf0b5]" />
          <span>{buttonText}</span>
          <Sparkles className="w-4 h-4 text-[#7bf0b5]" />
        </BlackGoldButton>
      </div>
    </div>
  );
};
