import React, { useState, useEffect } from 'react';

export interface UnsheatheSwordEffectProps {
  onAnimationEnd?: () => void;
  active?: boolean;
}

/**
 * 拔剑破空与剑气相向专属特效动画组件 (Unsheathe Sword Effect):
 * - 剑鞘脱离微颤
 * - 金红破空剑光自左/右向中间出鞘拔出 (Slash Light Beam)
 * - 剑气波纹扩散 (Sword Qi Wave Ring)
 * - 四散剑气火星与流光飞屑 (Sparks & Qi trails)
 */
export const UnsheatheSwordEffect: React.FC<UnsheatheSwordEffectProps> = ({
  onAnimationEnd,
  active = true,
}) => {
  const [stage, setStage] = useState<'draw' | 'flash' | 'fade'>('draw');

  useEffect(() => {
    if (!active) return;
    const t1 = setTimeout(() => setStage('flash'), 300);
    const t2 = setTimeout(() => setStage('fade'), 1100);
    const t3 = setTimeout(() => {
      onAnimationEnd?.();
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [active, onAnimationEnd]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden flex items-center justify-center">
      {/* 1. 全屏剑气破空闪光 (Screen Qi Flash) */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-[#ff5500]/20 via-[#ffd885]/35 to-[#ff5500]/20 transition-opacity duration-700 ${
          stage === 'flash' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 2. 拔剑对决破空光刃轨迹 (Dynamic Cross Slash Beams) */}
      <div
        className={`absolute w-[140%] h-[3px] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent shadow-[0_0_25px_#ff7722,0_0_50px_#ffd885] transform -rotate-12 transition-all duration-700 ease-out ${
          stage === 'draw'
            ? 'scale-x-0 opacity-0'
            : stage === 'flash'
            ? 'scale-x-100 opacity-100'
            : 'scale-x-125 opacity-0'
        }`}
      />

      <div
        className={`absolute w-[140%] h-[2px] bg-gradient-to-r from-transparent via-[#ffd885] to-transparent shadow-[0_0_20px_#00ffff] transform rotate-12 transition-all duration-700 ease-out delay-100 ${
          stage === 'draw'
            ? 'scale-x-0 opacity-0'
            : stage === 'flash'
            ? 'scale-x-100 opacity-90'
            : 'scale-x-125 opacity-0'
        }`}
      />

      {/* 3. 剑气对撞冲击波环 (Expanding Qi Shockwave Ring) */}
      <div
        className={`w-64 h-64 sm:w-96 sm:h-96 rounded-full border-2 border-[#ffd885] shadow-[0_0_40px_rgba(255,100,20,0.8)] transition-all duration-1000 ease-out ${
          stage === 'draw'
            ? 'scale-0 opacity-0'
            : stage === 'flash'
            ? 'scale-125 opacity-90'
            : 'scale-150 opacity-0'
        }`}
      />

      {/* 4. 浮空拔剑文字印鉴 (Calligraphy Accent) */}
      <div
        className={`absolute top-1/4 px-6 py-2 rounded-sm bg-[#16221e]/90 border border-[#dfba73] shadow-[0_0_30px_rgba(223,186,115,0.6)] flex items-center gap-3 transition-all duration-700 ${
          stage === 'flash' ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 -translate-y-4'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#d64d3e] animate-ping" />
        <span className="font-serif font-bold text-base sm:text-lg text-[#ffd885] tracking-[0.3em]">
          ❖ 拔剑相向 · 剑气破空 ❖
        </span>
      </div>
    </div>
  );
};
