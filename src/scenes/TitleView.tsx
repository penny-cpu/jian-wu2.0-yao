import React from 'react';
import { sound } from '../audio';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { User, BookOpen, Award, Swords, Scroll } from 'lucide-react';

interface TitleViewProps {
  onStartGame: () => void;
  onOpenCharacter: () => void;
  onOpenStory: () => void;
  onOpenGameplay: () => void;
  onOpenManual: () => void;
}

export const TitleView: React.FC<TitleViewProps> = ({
  onStartGame,
  onOpenCharacter,
  onOpenStory,
  onOpenGameplay,
  onOpenManual,
}) => {
  const bgUrl = getPlaceholderImage('intro_bg', '五德融剑 · 刚柔舞韵', '剑由铁铸 · 心由德成', '#D4AF37');

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-5 sm:p-8 select-none overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bgUrl})` }}>
      {/* Dark Ambient Overlay with Bronze & Verdigris Patina Texture */}
      <div className="absolute inset-0 bg-[#0a0f0d]/90 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,37,32,0.6)_0%,rgba(9,13,11,0.96)_100%)] pointer-events-none" />
      
      {/* Subtle Ancient Geometric Bronze Grid Lines */}
      <div className="absolute inset-4 border border-[#2b3e36]/40 pointer-events-none" />
      <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-[#dfba73]/70 pointer-events-none" />
      <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#dfba73]/70 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-[#dfba73]/70 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-[#dfba73]/70 pointer-events-none" />

      {/* Top Floating Badges & Centrally Symmetric Bronze Navigation Buttons */}
      <div className="relative z-10 w-full flex justify-between items-center max-w-4xl">
        {/* Left Side: 故事背景 & 玩法介绍 */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="title-btn-story"
            onClick={() => {
              sound.playClick();
              onOpenStory();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#c7beaf] hover:text-[#ffd885] transition-all text-xs sm:text-sm font-serif cursor-pointer shadow-md active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-[#7bb39d]" />
            <span>故事背景</span>
          </button>

          <button
            id="title-btn-gameplay"
            onClick={() => {
              sound.playClick();
              onOpenGameplay();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#c7beaf] hover:text-[#ffd885] transition-all text-xs sm:text-sm font-serif cursor-pointer shadow-md active:scale-95"
          >
            <Scroll className="w-4 h-4 text-[#7bb39d]" />
            <span>玩法介绍</span>
          </button>
        </div>

        {/* Right Side: 剑谱·侠客令 & 人物志 (Centrally Symmetric with Left Side) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="title-btn-manual"
            onClick={() => {
              sound.playClick();
              onOpenManual();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#22332c] border border-[#527768] hover:border-[#dfba73] text-[#ffd885] hover:text-[#fff] transition-all text-xs sm:text-sm font-serif cursor-pointer shadow-md active:scale-95"
          >
            <Award className="w-4 h-4 text-[#ffd885]" />
            <span className="font-bold">剑谱·侠客令</span>
          </button>

          <button
            id="title-btn-char"
            onClick={() => {
              sound.playClick();
              onOpenCharacter();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#c7beaf] hover:text-[#ffd885] transition-all text-xs sm:text-sm font-serif cursor-pointer shadow-md active:scale-95"
          >
            <User className="w-4 h-4 text-[#7bb39d]" />
            <span>人物志</span>
          </button>
        </div>
      </div>

      {/* Center Title & Warring States Stone Stele Section */}
      <div className="relative z-10 text-center my-auto -translate-y-2 sm:-translate-y-4 max-w-4xl px-4 py-2 flex flex-col items-center">
        {/* Subtle Bronze Dynasty Marker */}
        <div className="text-[11px] sm:text-xs font-serif text-[#7bb39d] tracking-[0.3em] mb-2 uppercase flex items-center gap-2">
          <span>◇</span>
          <span>春秋干将 · 金石铭刻</span>
          <span>◇</span>
        </div>

        {/* Main Title with Bronze & Inscribed Stone Feel */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-brush text-[#f5efe3] tracking-[0.18em] leading-tight mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.98)] whitespace-nowrap">
          五德融剑 · 刚柔舞韵
        </h1>

        {/* 3 Unified Description Lines with Bronze Cinnabar Accent */}
        <div className="flex flex-col items-center justify-center space-y-2 text-center max-w-2xl mx-auto">
          <div className="text-xs sm:text-sm font-serif text-[#d64d3e] font-bold tracking-[0.25em] flex items-center gap-2">
            <span>—</span>
            <span>【 武 侠 宏 旨 】</span>
            <span>—</span>
          </div>
          <p className="text-xs sm:text-sm md:text-base font-serif text-[#ffd885] tracking-wider leading-relaxed font-semibold drop-shadow-md">
            “剑由铁铸，心由德成；五德存于心，方知手中之剑为何而出。”
          </p>
          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] tracking-wider leading-relaxed">
            跟随春秋铸剑名师干将，历经仁、礼、义、智、信五重江湖问剑试炼
          </p>
        </div>
      </div>

      {/* Bottom Start Button Styled as Heavy Bronze Stele Plaque */}
      <div className="relative z-10 text-center pb-3 sm:pb-5">
        <button
          id="title-btn-start"
          onClick={() => {
            sound.playSwordDraw();
            setTimeout(() => {
              onStartGame();
            }, 350);
          }}
          className="group relative inline-flex items-center justify-center px-8 py-3.5 sm:px-14 sm:py-4 rounded-sm bg-gradient-to-r from-[#20312a] via-[#334c41] to-[#20312a] border-2 border-[#c5a059] text-[#ffd885] hover:text-white font-serif text-lg sm:text-xl font-bold tracking-widest shadow-[0_0_30px_rgba(197,160,89,0.35)] hover:shadow-[0_0_45px_rgba(197,160,89,0.7)] hover:border-[#fff] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span className="text-[#c5a059] group-hover:text-white mr-2">◇</span>
          <Swords className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#ffd885] group-hover:rotate-12 transition-transform duration-300" />
          <span>拔 剑 出 鞘 · 踏 入 江 湖</span>
          <Swords className="w-5 h-5 sm:w-6 sm:h-6 ml-2 text-[#ffd885] group-hover:-rotate-12 transition-transform duration-300" />
          <span className="text-[#c5a059] group-hover:text-white ml-2">◇</span>
        </button>

        <p className="text-[11px] font-serif text-[#6d8a7e] mt-2.5 tracking-wider">
          滑动鼠标挥洒剑气 · 悟透五德重铸绝世仁剑
        </p>
      </div>
    </div>
  );
};

