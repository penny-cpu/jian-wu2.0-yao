import React from 'react';
import { sound } from '../audio';
import { FastForward } from 'lucide-react';

export interface DialogueLine {
  speaker: string;
  speakerSide: 'left' | 'right' | 'narrator';
  nameTag: string;
  tagColor?: string;
  text: string;
  avatarType?: 'ganjiang' | 'zilu' | 'confucius' | 'narrator';
}

interface WuxiaDialogueBoxProps {
  dialogues: DialogueLine[];
  currentIndex: number;
  onNext: () => void;
  onSkip: () => void;
}

// 1. Protagonist Bust (干将 - 少年剑客 / 束发带剑)
export const GanJiangBust: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div
    className={`relative transition-all duration-300 transform ${
      isActive
        ? 'scale-105 opacity-100 drop-shadow-[0_10px_25px_rgba(212,175,55,0.45)]'
        : 'scale-95 opacity-50 grayscale-[25%] hover:opacity-75'
    }`}
  >
    {/* Active Character Speaking Bubble Indicator (💬 三) */}
    {isActive && (
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 bg-[#fffdf7] border-2 border-[#8c6742] px-2.5 py-0.5 rounded-full shadow-lg animate-bounce flex items-center justify-center">
        <span className="text-xs font-bold text-[#8c462e]">💬</span>
        <div className="w-1.5 h-1.5 bg-[#fffdf7] border-r-2 border-b-2 border-[#8c6742] absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45" />
      </div>
    )}

    {/* Character Bust SVG */}
    <svg
      width="220"
      height="260"
      viewBox="0 0 220 260"
      className="w-[150px] sm:w-[190px] md:w-[220px] h-auto pointer-events-none drop-shadow-xl"
    >
      <defs>
        <linearGradient id="gjRobe" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#edd9b6" />
          <stop offset="60%" stop-color="#dfc89d" />
          <stop offset="100%" stop-color="#c5aa7b" />
        </linearGradient>
        <linearGradient id="gjSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#faebd7" />
          <stop offset="100%" stop-color="#e2c59f" />
        </linearGradient>
        <linearGradient id="gjHair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#241912" />
          <stop offset="100%" stop-color="#0f0a07" />
        </linearGradient>
      </defs>

      {/* Sword on Back Strap */}
      <g transform="translate(160, 40) rotate(22)">
        <rect x="-6" y="-30" width="12" height="150" rx="3" fill="#3a2517" stroke="#8c6742" stroke-width="1.5" />
        <rect x="-10" y="-35" width="20" height="8" rx="2" fill="#ffd700" />
        <circle cx="0" cy="115" r="5" fill="#a6321e" stroke="#ffd700" stroke-width="1" />
      </g>

      {/* Robe Body / Shoulders */}
      <path
        d="M30,260 Q50,170 85,155 L135,155 Q170,170 195,260 Z"
        fill="url(#gjRobe)"
        stroke="#5a3d24"
        stroke-width="2"
      />
      {/* Robe Inner Collar (Dark trim) */}
      <path d="M80,155 L110,210 L140,155 Z" fill="#2d1c10" />
      <path d="M88,155 L110,195 L132,155 Z" fill="#fffaf0" />
      
      {/* Leather Sword Strap across chest */}
      <path d="M45,210 L175,175" stroke="#4a301a" stroke-width="9" stroke-linecap="round" />
      <circle cx="110" cy="192" r="5" fill="#ffd700" stroke="#4a301a" stroke-width="1.5" />

      {/* Neck */}
      <path d="M92,125 L92,160 Q110,165 128,160 L128,125 Z" fill="url(#gjSkin)" />
      
      {/* Face & Ears */}
      <circle cx="83" cy="108" r="8" fill="#e2c59f" />
      <circle cx="137" cy="108" r="8" fill="#e2c59f" />
      <path
        d="M85,90 Q80,140 110,146 Q140,140 135,90 Q110,75 85,90 Z"
        fill="url(#gjSkin)"
        stroke="#c49a72"
        stroke-width="1"
      />

      {/* Cheeks blush */}
      <ellipse cx="94" cy="116" rx="6" ry="3" fill="#e89880" opacity="0.4" />
      <ellipse cx="126" cy="116" rx="6" ry="3" fill="#e89880" opacity="0.4" />

      {/* Eyes & Eyebrows (Sword-like sharp gaze) */}
      <path d="M90,98 Q100,94 105,98" stroke="#1f140d" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M115,98 Q120,94 130,98" stroke="#1f140d" stroke-width="2.5" stroke-linecap="round" fill="none" />
      
      {/* Animated Bright Eyes */}
      <circle cx="98" cy="106" r="4.5" fill="#1f140d" />
      <circle cx="99.5" cy="104.5" r="1.5" fill="#ffffff" />
      <circle cx="122" cy="106" r="4.5" fill="#1f140d" />
      <circle cx="123.5" cy="104.5" r="1.5" fill="#ffffff" />

      {/* Nose & Confident Smile */}
      <path d="M110,108 L108,118 L112,118" stroke="#a67c52" stroke-width="1.5" stroke-linecap="round" fill="none" />
      <path d="M104,128 Q110,134 116,128" stroke="#8c462e" stroke-width="2" stroke-linecap="round" fill="none" />

      {/* Hair (Wuxia Topknot + Flowing bangs) */}
      <path
        d="M75,90 Q72,50 110,48 Q148,50 145,90 Q135,62 110,60 Q85,62 75,90 Z"
        fill="url(#gjHair)"
      />
      {/* Topknot Bun */}
      <ellipse cx="110" cy="38" rx="14" ry="12" fill="url(#gjHair)" stroke="#1a110a" stroke-width="1.5" />
      {/* Headband / Hair ribbon */}
      <path d="M78,78 Q110,70 142,78" stroke="#3d2716" stroke-width="7" stroke-linecap="round" />
      <path d="M78,78 Q110,70 142,78" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="3,3" />

      {/* Side bangs framing the face */}
      <path d="M80,80 Q76,120 74,145 Q82,125 84,95 Z" fill="url(#gjHair)" />
      <path d="M140,80 Q144,120 146,145 Q138,125 136,95 Z" fill="url(#gjHair)" />
    </svg>
  </div>
);

// 2. Sage / Confucian Master Bust (孔子 - 儒冠长须 / 渊渟岳峙)
export const ConfuciusBust: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div
    className={`relative transition-all duration-300 transform ${
      isActive
        ? 'scale-105 opacity-100 drop-shadow-[0_10px_25px_rgba(212,175,55,0.45)]'
        : 'scale-95 opacity-50 grayscale-[25%] hover:opacity-75'
    }`}
  >
    {/* Active Speaking Indicator */}
    {isActive && (
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 bg-[#fffdf7] border-2 border-[#8c6742] px-2.5 py-0.5 rounded-full shadow-lg animate-bounce flex items-center justify-center">
        <span className="text-xs font-bold text-[#204d6b]">💬</span>
        <div className="w-1.5 h-1.5 bg-[#fffdf7] border-r-2 border-b-2 border-[#8c6742] absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45" />
      </div>
    )}

    {/* Character Bust SVG */}
    <svg
      width="220"
      height="260"
      viewBox="0 0 220 260"
      className="w-[150px] sm:w-[190px] md:w-[220px] h-auto pointer-events-none drop-shadow-xl"
    >
      <defs>
        <linearGradient id="cfRobe" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2d5550" />
          <stop offset="60%" stop-color="#1f3d39" />
          <stop offset="100%" stop-color="#132724" />
        </linearGradient>
        <linearGradient id="cfSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#faebd7" />
          <stop offset="100%" stop-color="#d9b68c" />
        </linearGradient>
        <linearGradient id="cfCap" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2c241e" />
          <stop offset="100%" stop-color="#120e0b" />
        </linearGradient>
      </defs>

      {/* Robe Body / Broad Shoulders */}
      <path
        d="M20,260 Q40,165 80,150 L140,150 Q180,165 200,260 Z"
        fill="url(#cfRobe)"
        stroke="#132724"
        stroke-width="2"
      />
      {/* Broad White Collar & Inner Robe */}
      <path d="M75,150 L110,215 L145,150 Z" fill="#442a18" />
      <path d="M85,150 L110,195 L135,150 Z" fill="#f5eedc" />

      {/* Neck */}
      <path d="M90,120 L90,155 Q110,160 130,155 L130,120 Z" fill="url(#cfSkin)" />

      {/* Face */}
      <circle cx="80" cy="105" r="9" fill="#d9b68c" />
      <circle cx="140" cy="105" r="9" fill="#d9b68c" />
      <path
        d="M82,85 Q78,135 110,142 Q142,135 138,85 Q110,75 82,85 Z"
        fill="url(#cfSkin)"
        stroke="#b88f63"
        stroke-width="1"
      />

      {/* Serene Eyebrows */}
      <path d="M88,92 Q98,88 104,94" stroke="#2b1e16" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <path d="M116,94 Q122,88 132,92" stroke="#2b1e16" stroke-width="2.5" stroke-linecap="round" fill="none" />

      {/* Gentle Wise Eyes & Crows feet */}
      <ellipse cx="96" cy="101" rx="4" ry="2.5" fill="#1f150e" />
      <ellipse cx="124" cy="101" rx="4" ry="2.5" fill="#1f150e" />
      <path d="M88,101 L91,101 M129,101 L132,101" stroke="#8c6a46" stroke-width="1" />

      {/* Nose */}
      <path d="M110,98 L107,114 L113,114" stroke="#8c6a46" stroke-width="1.8" stroke-linecap="round" fill="none" />

      {/* Venerable Mustache & Full Beard (美髯公特征) */}
      <path
        d="M98,120 Q110,118 122,120 Q128,132 120,135 Q110,130 100,135 Q92,132 98,120 Z"
        fill="#211812"
      />
      {/* Flowing Long Beard down the chest */}
      <path
        d="M98,128 Q100,195 110,210 Q120,195 122,128 Z"
        fill="#211812"
        stroke="#120d09"
        stroke-width="1"
      />
      <path d="M106,135 L106,190 M114,135 L114,190" stroke="#3d2c20" stroke-width="1" />

      {/* Classical Confucian Scholar Hat (高筒儒冠 + 展翅) */}
      <g transform="translate(110, 50)">
        {/* Main tall cap */}
        <path d="M-28,30 L-20,-20 Q0,-25 20,-20 L28,30 Z" fill="url(#cfCap)" stroke="#0a0806" stroke-width="1.5" />
        {/* Side wings (展角) */}
        <ellipse cx="-45" cy="20" rx="20" ry="12" fill="url(#cfCap)" stroke="#0a0806" stroke-width="1.5" />
        <ellipse cx="45" cy="20" rx="20" ry="12" fill="url(#cfCap)" stroke="#0a0806" stroke-width="1.5" />
        {/* Cap lower rim */}
        <rect x="-35" y="24" width="70" height="12" rx="4" fill="#1a140f" stroke="#8c6742" stroke-width="1" />
      </g>
    </svg>
  </div>
);

// 3. Disciple Bust (子路 - 武者气宇 / 拔剑问礼)
export const ZiLuBust: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <div
    className={`relative transition-all duration-300 transform ${
      isActive
        ? 'scale-105 opacity-100 drop-shadow-[0_10px_25px_rgba(212,175,55,0.45)]'
        : 'scale-95 opacity-50 grayscale-[25%] hover:opacity-75'
    }`}
  >
    {/* Active Speaking Indicator */}
    {isActive && (
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 bg-[#fffdf7] border-2 border-[#8c6742] px-2.5 py-0.5 rounded-full shadow-lg animate-bounce flex items-center justify-center">
        <span className="text-xs font-bold text-[#8c2b18]">💬</span>
        <div className="w-1.5 h-1.5 bg-[#fffdf7] border-r-2 border-b-2 border-[#8c6742] absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45" />
      </div>
    )}

    {/* Character Bust SVG */}
    <svg
      width="220"
      height="260"
      viewBox="0 0 220 260"
      className="w-[150px] sm:w-[190px] md:w-[220px] h-auto pointer-events-none drop-shadow-xl"
    >
      <defs>
        <linearGradient id="zlRobe" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4a3123" />
          <stop offset="60%" stop-color="#342217" />
          <stop offset="100%" stop-color="#1f140e" />
        </linearGradient>
        <linearGradient id="zlSkin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ebd1b5" />
          <stop offset="100%" stop-color="#cfab85" />
        </linearGradient>
      </defs>

      {/* Robe Body / Martial Shoulders */}
      <path
        d="M20,260 Q45,160 80,150 L140,150 Q175,160 200,260 Z"
        fill="url(#zlRobe)"
        stroke="#1c130b"
        stroke-width="2"
      />
      {/* Martial Collar & Bronze Trim */}
      <path d="M75,150 L110,215 L145,150 Z" fill="#241810" />
      <path d="M85,150 L110,195 L135,150 Z" fill="#a6321e" />

      {/* Sword in Hand / Martial Stance */}
      <g transform="translate(45, 170) rotate(-40)">
        <rect x="-4" y="-50" width="8" height="110" fill="#e5be65" stroke="#8c6742" stroke-width="1" />
        <rect x="-10" y="0" width="20" height="6" rx="2" fill="#d4af37" />
      </g>

      {/* Neck */}
      <path d="M90,120 L90,155 Q110,160 130,155 L130,120 Z" fill="url(#zlSkin)" />

      {/* Face */}
      <circle cx="80" cy="105" r="9" fill="#cfab85" />
      <circle cx="140" cy="105" r="9" fill="#cfab85" />
      <path
        d="M82,85 Q78,135 110,144 Q142,135 138,85 Q110,75 82,85 Z"
        fill="url(#zlSkin)"
        stroke="#b88f63"
        stroke-width="1"
      />

      {/* Fierce / Resolute Eyebrows */}
      <path d="M86,94 L104,89" stroke="#1c130b" stroke-width="3" stroke-linecap="round" />
      <path d="M116,89 L134,94" stroke="#1c130b" stroke-width="3" stroke-linecap="round" />

      {/* Eyes */}
      <circle cx="96" cy="102" r="4.5" fill="#1c130b" />
      <circle cx="97.5" cy="100.5" r="1.5" fill="#ffffff" />
      <circle cx="124" cy="102" r="4.5" fill="#1c130b" />
      <circle cx="125.5" cy="100.5" r="1.5" fill="#ffffff" />

      {/* Nose & Resolute Mouth */}
      <path d="M110,98 L107,114 L113,114" stroke="#8c6a46" stroke-width="1.8" stroke-linecap="round" fill="none" />
      <path d="M102,126 L118,126" stroke="#5a3d28" stroke-width="2.5" stroke-linecap="round" />
      {/* Neat Martial Chin Beards */}
      <path d="M106,134 Q110,146 114,134 Z" fill="#1c130b" />

      {/* Disciple Cap / Headband */}
      <g transform="translate(110, 52)">
        <path d="M-24,30 L-18,-10 Q0,-15 18,-10 L24,30 Z" fill="#1c130b" stroke="#0a0806" stroke-width="1.5" />
        <rect x="-30" y="24" width="60" height="10" rx="3" fill="#a6321e" stroke="#d4af37" stroke-width="1" />
      </g>
    </svg>
  </div>
);

export const WuxiaDialogueBox: React.FC<WuxiaDialogueBoxProps> = ({
  dialogues,
  currentIndex,
  onNext,
  onSkip,
}) => {
  const current = dialogues[currentIndex] || dialogues[0];

  const isLeftSpeaking = current.speakerSide === 'left';
  const isRightSpeaking = current.speakerSide === 'right';

  // Determine which right character to show (Confucius or Zilu)
  const isConfucius = current.speaker.includes('孔子');

  return (
    <div className="relative z-20 w-full flex flex-col justify-end items-center px-3 sm:px-6 pb-2 sm:pb-4 select-none">
      
      {/* Top Right Skip Button (图2顶部右上角 ⏭️ 跳过 风格) */}
      <div className="w-full max-w-5xl flex justify-end mb-2">
        <button
          id="dialogue-btn-skip"
          onClick={() => {
            sound.playClick();
            onSkip();
          }}
          className="px-3.5 py-1 rounded-full bg-[#1e150e]/85 hover:bg-[#2e2015] border border-[#8c6742] hover:border-[#ffd700] text-xs font-serif text-[#ffd700] transition-all flex items-center gap-1.5 shadow-lg backdrop-blur-sm cursor-pointer active:scale-95"
        >
          <FastForward className="w-3.5 h-3.5 text-[#ffd700]" />
          <span>跳过</span>
        </button>
      </div>

      {/* Character Busts Presentation Area (Standing behind/above the dialogue box) */}
      <div className="w-full max-w-4xl flex items-end justify-between px-4 sm:px-12 -mb-5 sm:-mb-6 pointer-events-none">
        {/* Left Side: Protagonist (干将) */}
        <div className="flex flex-col items-center">
          <GanJiangBust isActive={isLeftSpeaking} />
        </div>

        {/* Right Side: Interlocutor (孔子 或 子路) */}
        <div className="flex flex-col items-center">
          {isConfucius ? (
            <ConfuciusBust isActive={isRightSpeaking} />
          ) : (
            <ZiLuBust isActive={isRightSpeaking} />
          )}
        </div>
      </div>

      {/* Main Dialogue Box (Warring States Bronze & Stone Stele UI) */}
      <div
        id="dialogue-box-container"
        onClick={() => {
          sound.playClick();
          onNext();
        }}
        className="relative w-full max-w-4xl min-h-[135px] sm:min-h-[150px] bg-[#16221e]/95 border border-[#3b554b] rounded-sm shadow-[0_12px_40px_rgba(0,0,0,0.95)] p-4 sm:p-6 cursor-pointer transition-transform duration-150 active:scale-[0.99] flex flex-col justify-between backdrop-blur-md"
      >
        {/* Decorative Antiquity Inner Hairline Border & Corner Rivets */}
        <div className="absolute inset-1.5 border border-[#dfba73]/25 rounded-sm pointer-events-none" />
        <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#dfba73] pointer-events-none" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#dfba73] pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#dfba73] pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#dfba73] pointer-events-none" />

        {/* Character Name Tag Plaque */}
        <div className="absolute -top-4 left-6 sm:left-10 z-20">
          <div
            className="px-4 sm:px-6 py-1 rounded-sm text-xs sm:text-sm font-serif font-bold text-[#ffd885] shadow-lg border border-[#dfba73] flex items-center gap-1.5 bg-[#1f2f29]"
          >
            <span className="font-serif font-bold text-sm sm:text-base tracking-wider">{current.nameTag || current.speaker}</span>
          </div>
        </div>

        {/* Dialogue Text Content */}
        <div className="mt-2.5 sm:mt-3 px-1 sm:px-4 text-[#f5efe3] font-serif text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose">
          <p className="tracking-wide">{current.text}</p>
        </div>

        {/* Bottom Footer with Progress and Click Advance Arrow */}
        <div className="mt-2 flex items-center justify-between border-t border-[#2b3e36] pt-2 px-1 text-xs font-serif text-[#7bb39d]">
          <span className="text-[11px] text-[#a8b8b0]">
            第 {currentIndex + 1} / {dialogues.length} 幕 · 点击任意处继续
          </span>

          {/* Pulsing Advance Arrow */}
          <div className="flex items-center gap-1.5 text-[#ffd885] font-bold animate-pulse">
            <span className="text-xs sm:text-sm">
              {currentIndex < dialogues.length - 1 ? '点击继续' : '依礼启程'}
            </span>
            <span className="text-base sm:text-lg">➜</span>
          </div>
        </div>
      </div>
    </div>
  );
};
