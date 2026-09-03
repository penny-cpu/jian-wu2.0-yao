import React from 'react';
import { sound } from '../audio';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { User, BookOpen, Award, Swords, Scroll } from 'lucide-react';

/* =========================================================================
 * 📌【首页“五德剑道”底图配置位置】
 * 如需更换首页背景图，可直接在此处修改引入的图片文件路径或变量：
 * ========================================================================= */
import homeIntroBgImage from '../assets/images/intro_bg_1788276445051.jpg';

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
  // 首页底图路径 (优先使用配置的底图，或降级至通用占位生成器)
  const bgUrl = homeIntroBgImage || getPlaceholderImage('intro_bg', '五德融剑 · 刚柔舞韵', '剑由铁铸 · 心由德成', '#D4AF37');

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-5 sm:p-8 select-none overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* 遮罩层：遮罩感 50% (精确 50% 半透明暗调遮罩，兼顾底图古战场恢宏意境与前景文字清晰度) */}
      <div className="absolute inset-0 bg-[#0a0f0d]/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,30,25,0.2)_0%,rgba(9,13,11,0.65)_100%)] pointer-events-none" />
      
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
            <span className="font-bold">我的闯关</span>
          </button>

          <button
            id="title-btn-char"
            onClick={() => {
              sound.playClick();
              onOpenCharacter();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#c7beaf] hover:text-[#ffd885] transition-all text-xs sm:text-sm font-serif cursor-pointer shadow-md active:scale-95"
          >
            <User className="w-4 h-4 text-[#7bb39d]" />
            <span>人物志</span>
          </button>
        </div>
      </div>

      {/* Center Title & Warring States Stone Stele Section */}
      <div className="relative z-10 text-center my-auto -translate-y-1 sm:-translate-y-2 max-w-4xl px-4 py-2 flex flex-col items-center">
        {/* Main Title with Bronze & Inscribed Stone Feel */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-brush text-[#f5efe3] tracking-[0.2em] leading-tight mb-2 drop-shadow-[0_4px_25px_rgba(0,0,0,0.98)] whitespace-nowrap">
          五徳剑道
        </h1>

        {/* Subtitle */}
        <div className="text-sm sm:text-lg md:text-xl font-serif text-[#dfba73] tracking-[0.35em] font-medium mb-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] flex items-center justify-center gap-2 sm:gap-3">
          <span className="text-xs text-[#7bb39d]">❖</span>
          <span>剑舞文化交互游戏</span>
          <span className="text-xs text-[#7bb39d]">❖</span>
        </div>

        {/* Martial Motto: 2-line Golden Text */}
        <div className="flex flex-col items-center justify-center space-y-2 text-center max-w-2xl mx-auto">
          <div className="text-xs sm:text-sm font-serif text-[#d64d3e] font-bold tracking-[0.25em] flex items-center gap-2">
            <span>—</span>
            <span>【 武 侠 宏 旨 】</span>
            <span>—</span>
          </div>
          <div className="space-y-1.5 text-center">
            <p className="text-sm sm:text-base md:text-lg font-serif text-[#ffd885] tracking-[0.18em] leading-relaxed font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              剑由铁铸，心由德成；
            </p>
            <p className="text-sm sm:text-base md:text-lg font-serif text-[#ffd885] tracking-[0.18em] leading-relaxed font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              五德存于心，方知手中之剑为何而出。
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Start Button */}
      <div className="relative z-10 text-center pb-4 sm:pb-6 flex flex-col items-center">
        <button
          id="title-btn-start"
          onClick={() => {
            sound.playSwordDraw();
            setTimeout(() => {
              onStartGame();
            }, 350);
          }}
          className="group relative inline-flex items-center justify-center px-10 py-3.5 sm:px-14 sm:py-4 rounded-sm bg-gradient-to-r from-[#1c2a23] via-[#2f473c] to-[#1c2a23] border-2 border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white font-serif text-lg sm:text-2xl font-bold tracking-[0.25em] shadow-[0_0_30px_rgba(223,186,115,0.4)] hover:shadow-[0_0_50px_rgba(223,186,115,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <Swords className="w-6 h-6 mr-3 text-[#ffd885] group-hover:rotate-45 transition-transform" />
          <span>拔剑出鞘 · 踏入江湖</span>
          <Swords className="w-6 h-6 ml-3 text-[#ffd885] group-hover:-rotate-45 transition-transform" />
        </button>

        <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mt-3 tracking-wider leading-relaxed max-w-xl text-center font-medium">
          跟随春秋铸剑师干将，历经仁、礼、义、智、信五重江湖问剑试炼
        </p>
      </div>
    </div>
  );
};

