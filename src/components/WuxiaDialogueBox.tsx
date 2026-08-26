import React from 'react';
import { sound } from '../audio';
import { FastForward, ChevronRight } from 'lucide-react';

export interface DialogueLine {
  speaker: string;
  speakerSide?: 'left' | 'right' | 'narrator';
  nameTag?: string;
  tagColor?: string;
  text: string;
  avatarType?: 'ganjiang' | 'yulang' | 'zilu' | 'confucius' | 'ruffian' | 'elder' | 'narrator';
}

interface WuxiaDialogueBoxProps {
  dialogues: DialogueLine[];
  currentIndex: number;
  onNext: () => void;
  onSkip?: () => void;
  headerTag?: string;
  sceneBackground?: string;
}

// 1. 干将 (少年剑师 / 佩剑束发)
export const GanJiangBust: React.FC<{ isActive: boolean; side?: 'left' | 'right' }> = ({
  isActive,
  side = 'right',
}) => (
  <div
    className={`relative transition-all duration-500 ease-out transform ${
      isActive
        ? 'scale-100 sm:scale-105 opacity-100 drop-shadow-[0_15px_30px_rgba(223,186,115,0.4)] z-20 brightness-105'
        : 'scale-95 opacity-40 brightness-50 z-10'
    }`}
  >
    <svg
      width="280"
      height="340"
      viewBox="0 0 280 340"
      className={`w-[170px] sm:w-[230px] md:w-[280px] h-auto pointer-events-none drop-shadow-2xl ${
        side === 'left' ? 'scale-x-[-1]' : ''
      }`}
    >
      <defs>
        <linearGradient id="gjRobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#403226" />
          <stop offset="50%" stopColor="#2b2018" />
          <stop offset="100%" stopColor="#17110c" />
        </linearGradient>
        <linearGradient id="gjSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f7e6d2" />
          <stop offset="100%" stopColor="#dfc3a3" />
        </linearGradient>
        <linearGradient id="gjHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c221a" />
          <stop offset="100%" stopColor="#0d0907" />
        </linearGradient>
      </defs>

      {/* Sword Scabbard on Back */}
      <g transform="translate(200, 60) rotate(24)">
        <rect x="-8" y="-40" width="16" height="210" rx="4" fill="#1c140e" stroke="#8c6742" strokeWidth="2" />
        <rect x="-12" y="-45" width="24" height="12" rx="2" fill="#dfba73" stroke="#8c6742" strokeWidth="1" />
        <circle cx="0" cy="150" r="6" fill="#a6321e" stroke="#dfba73" strokeWidth="1.5" />
        <path d="M0,156 L0,185" stroke="#a6321e" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Robe Body & Shoulders */}
      <path
        d="M35,340 Q65,220 115,200 L175,200 Q225,220 255,340 Z"
        fill="url(#gjRobeGrad)"
        stroke="#1c130b"
        strokeWidth="2.5"
      />
      {/* Robe Collar Layering */}
      <path d="M105,200 L145,275 L185,200 Z" fill="#18110b" />
      <path d="M115,200 L145,255 L175,200 Z" fill="#d9c3a3" stroke="#8c6742" strokeWidth="1" />
      <path d="M125,200 L145,235 L165,200 Z" fill="#3d2716" />

      {/* Leather Sword Harness across Chest */}
      <path d="M60,270 L225,225" stroke="#382114" strokeWidth="11" strokeLinecap="round" />
      <circle cx="145,247" r="7" fill="#dfba73" stroke="#382114" strokeWidth="2" />

      {/* Neck */}
      <path d="M120,165 L120,205 Q145,212 170,205 L170,165 Z" fill="url(#gjSkinGrad)" />

      {/* Face Base */}
      <circle cx="110" cy="145" r="10" fill="#dfc3a3" />
      <circle cx="180" cy="145" r="10" fill="#dfc3a3" />
      <path
        d="M112,120 Q106,182 145,190 Q184,182 178,120 Q145,102 112,120 Z"
        fill="url(#gjSkinGrad)"
        stroke="#b89370"
        strokeWidth="1.5"
      />

      {/* Eyes & Eyebrows (Sword-sharp focus) */}
      <path d="M118,132 Q130,126 138,131" stroke="#1f140d" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M152,131 Q160,126 172,132" stroke="#1f140d" strokeWidth="3" strokeLinecap="round" fill="none" />
      
      {/* Eyes */}
      <ellipse cx="128" cy="142" rx="5.5" ry="5" fill="#1f140d" />
      <circle cx="130" cy="140" r="1.8" fill="#ffffff" />
      <ellipse cx="162" cy="142" rx="5.5" ry="5" fill="#1f140d" />
      <circle cx="164" cy="140" r="1.8" fill="#ffffff" />

      {/* Nose & Mouth */}
      <path d="M145,143 L142,158 L148,158" stroke="#a67c52" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M136,170 Q145,176 154,170" stroke="#7a3622" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Hair (Wuxia Topknot & Flowing Bangs) */}
      <path
        d="M102,120 Q96,65 145,62 Q194,65 188,120 Q176,82 145,80 Q114,82 102,120 Z"
        fill="url(#gjHairGrad)"
      />
      {/* Topknot Bun */}
      <ellipse cx="145" cy="50" rx="18" ry="15" fill="url(#gjHairGrad)" stroke="#120c08" strokeWidth="2" />
      {/* Bronze Hairpin */}
      <path d="M115,48 L175,44" stroke="#dfba73" strokeWidth="4" strokeLinecap="round" />
      {/* Side Forelock Bangs */}
      <path d="M106,108 Q100,165 98,195 Q108,168 112,128 Z" fill="url(#gjHairGrad)" />
      <path d="M184,108 Q190,165 192,195 Q182,168 178,128 Z" fill="url(#gjHairGrad)" />
    </svg>
  </div>
);

// 2. 玉琅 (少女雕玉传人 / 颈佩玉珏 / 楚楚坚毅)
export const YuLangBust: React.FC<{ isActive: boolean; side?: 'left' | 'right' }> = ({
  isActive,
  side = 'left',
}) => (
  <div
    className={`relative transition-all duration-500 ease-out transform ${
      isActive
        ? 'scale-100 sm:scale-105 opacity-100 drop-shadow-[0_15px_30px_rgba(0,255,255,0.35)] z-20 brightness-105'
        : 'scale-95 opacity-40 brightness-50 z-10'
    }`}
  >
    <svg
      width="280"
      height="340"
      viewBox="0 0 280 340"
      className={`w-[170px] sm:w-[230px] md:w-[280px] h-auto pointer-events-none drop-shadow-2xl ${
        side === 'right' ? 'scale-x-[-1]' : ''
      }`}
    >
      <defs>
        <linearGradient id="ylRobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d4e4a" />
          <stop offset="50%" stopColor="#283834" />
          <stop offset="100%" stopColor="#15211e" />
        </linearGradient>
        <linearGradient id="ylSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff2e3" />
          <stop offset="100%" stopColor="#f3d8be" />
        </linearGradient>
        <linearGradient id="ylHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#251a14" />
          <stop offset="100%" stopColor="#0a0705" />
        </linearGradient>
        <linearGradient id="jadeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8fff4" />
          <stop offset="50%" stopColor="#55e6c1" />
          <stop offset="100%" stopColor="#1b9c7b" />
        </linearGradient>
      </defs>

      {/* Robe Body / Slender Feminine Silhouette */}
      <path
        d="M45,340 Q75,230 118,210 L162,210 Q205,230 235,340 Z"
        fill="url(#ylRobeGrad)"
        stroke="#15211e"
        strokeWidth="2"
      />
      {/* Robe Collar with Silk Trim */}
      <path d="M108,210 L140,280 L172,210 Z" fill="#20302b" />
      <path d="M116,210 L140,262 L164,210 Z" fill="#faeedd" stroke="#55e6c1" strokeWidth="1" />
      <path d="M124,210 L140,245 L156,210 Z" fill="#4d2f22" />

      {/* Neck */}
      <path d="M122,170 L122,215 Q140,222 158,215 L158,170 Z" fill="url(#ylSkinGrad)" />

      {/* Chest Jade Pendant (家族传承羊脂玉珏) */}
      <g transform="translate(140, 240)">
        {/* Jade cord */}
        <path d="M-15,-30 L0,0 M15,-30 L0,0" stroke="#a6321e" strokeWidth="1.8" />
        {/* Dragon Jade Disc (玉珏) */}
        <circle cx="0" cy="5" r="14" fill="url(#jadeGlow)" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="0" cy="5" r="5" fill="#15211e" />
        <path d="M0,0 L0,5" stroke="#15211e" strokeWidth="2.5" />
      </g>

      {/* Face */}
      <circle cx="112" cy="148" r="8" fill="#f3d8be" />
      <circle cx="168" cy="148" r="8" fill="#f3d8be" />
      <path
        d="M114,125 Q110,185 140,192 Q170,185 166,125 Q140,110 114,125 Z"
        fill="url(#ylSkinGrad)"
        stroke="#caa585"
        strokeWidth="1.2"
      />

      {/* Cheeks Blush */}
      <ellipse cx="123" cy="154" rx="7" ry="4" fill="#e89880" opacity="0.45" />
      <ellipse cx="157" cy="154" rx="7" ry="4" fill="#e89880" opacity="0.45" />

      {/* Gentle Eyebrows (柳叶娥眉) */}
      <path d="M120,135 Q128,131 136,134" stroke="#251a14" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M144,134 Q152,131 160,135" stroke="#251a14" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Eyes (Clear, resolute yet innocent) */}
      <ellipse cx="127" cy="144" rx="5" ry="4.5" fill="#1c120c" />
      <circle cx="129" cy="142" r="1.6" fill="#ffffff" />
      <circle cx="125" cy="145" r="0.8" fill="#ffffff" />
      <ellipse cx="153" cy="144" rx="5" ry="4.5" fill="#1c120c" />
      <circle cx="155" cy="142" r="1.6" fill="#ffffff" />
      <circle cx="151" cy="145" r="0.8" fill="#ffffff" />

      {/* Nose & Delicate Lips */}
      <path d="M140,146 L138,158 L142,158" stroke="#caa585" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M134,170 Q140,175 146,170" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" fill="none" />
      <ellipse cx="140" cy="172" rx="3.5" ry="1.5" fill="#e74c3c" opacity="0.8" />

      {/* Hair (Ancient Maiden Twin Buns & Flowing Silken Hair) */}
      <path
        d="M106,128 Q98,75 140,70 Q182,75 174,128 Q162,90 140,88 Q118,90 106,128 Z"
        fill="url(#ylHairGrad)"
      />
      {/* Side Flowing Hair Locks */}
      <path d="M108,115 Q95,175 92,230 Q105,190 114,140 Z" fill="url(#ylHairGrad)" />
      <path d="M172,115 Q185,175 188,230 Q175,190 166,140 Z" fill="url(#ylHairGrad)" />
      {/* Hair Ornaments / Jade Hairpin */}
      <ellipse cx="102" cy="78" rx="14" ry="12" fill="url(#ylHairGrad)" />
      <ellipse cx="178" cy="78" rx="14" ry="12" fill="url(#ylHairGrad)" />
      <circle cx="104" cy="78" r="4" fill="#55e6c1" stroke="#ffffff" strokeWidth="1" />
      <circle cx="176" cy="78" r="4" fill="#55e6c1" stroke="#ffffff" strokeWidth="1" />
      <path d="M85,82 L115,70" stroke="#dfba73" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M195,82 L165,70" stroke="#dfba73" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </div>
);

// 3. 孔子 (先师孔子 / 高筒儒冠 / 渊雅美髯)
export const ConfuciusBust: React.FC<{ isActive: boolean; side?: 'left' | 'right' }> = ({
  isActive,
  side = 'right',
}) => (
  <div
    className={`relative transition-all duration-500 ease-out transform ${
      isActive
        ? 'scale-100 sm:scale-105 opacity-100 drop-shadow-[0_15px_30px_rgba(223,186,115,0.4)] z-20 brightness-105'
        : 'scale-95 opacity-40 brightness-50 z-10'
    }`}
  >
    <svg
      width="280"
      height="340"
      viewBox="0 0 280 340"
      className={`w-[170px] sm:w-[230px] md:w-[280px] h-auto pointer-events-none drop-shadow-2xl ${
        side === 'left' ? 'scale-x-[-1]' : ''
      }`}
    >
      <defs>
        <linearGradient id="cfRobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c3e38" />
          <stop offset="50%" stopColor="#1e2b27" />
          <stop offset="100%" stopColor="#101715" />
        </linearGradient>
        <linearGradient id="cfSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#faebd7" />
          <stop offset="100%" stopColor="#d9b68c" />
        </linearGradient>
      </defs>

      {/* Robe Body */}
      <path
        d="M25,340 Q55,210 105,195 L175,195 Q225,210 255,340 Z"
        fill="url(#cfRobeGrad)"
        stroke="#101715"
        strokeWidth="2"
      />
      {/* Broad Collar */}
      <path d="M95,195 L140,270 L185,195 Z" fill="#3b281b" />
      <path d="M108,195 L140,248 L172,195 Z" fill="#f5eedc" />

      {/* Neck */}
      <path d="M115,160 L115,200 Q140,205 165,200 L165,160 Z" fill="url(#cfSkinGrad)" />

      {/* Face */}
      <path
        d="M106,120 Q100,175 140,182 Q180,175 174,120 Q140,105 106,120 Z"
        fill="url(#cfSkinGrad)"
        stroke="#b88f63"
        strokeWidth="1.2"
      />

      {/* Gentle Wise Eyes & Wrinkles */}
      <path d="M114,128 Q125,124 134,129" stroke="#2b1e16" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M146,129 Q155,124 166,128" stroke="#2b1e16" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="124" cy="138" rx="4.5" ry="3" fill="#1f150e" />
      <ellipse cx="156" cy="138" rx="4.5" ry="3" fill="#1f150e" />

      {/* Nose */}
      <path d="M140,135 L136,152 L144,152" stroke="#8c6a46" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Long Dignified Beard (美髯公长须) */}
      <path
        d="M125,162 Q140,158 155,162 Q162,176 152,180 Q140,174 128,180 Z"
        fill="#211812"
      />
      <path
        d="M125,170 Q128,265 140,285 Q152,265 155,170 Z"
        fill="#211812"
        stroke="#120d09"
        strokeWidth="1"
      />
      <path d="M135,180 L135,255 M145,180 L145,255" stroke="#3d2c20" strokeWidth="1.5" />

      {/* Confucian Tall Cap (儒冠) */}
      <g transform="translate(140, 68)">
        <path d="M-32,38 L-22,-25 Q0,-32 22,-25 L32,38 Z" fill="#1f1813" stroke="#0a0806" strokeWidth="2" />
        <ellipse cx="-52" cy="24" rx="24" ry="14" fill="#1f1813" stroke="#0a0806" strokeWidth="1.5" />
        <ellipse cx="52" cy="24" rx="24" ry="14" fill="#1f1813" stroke="#0a0806" strokeWidth="1.5" />
        <rect x="-40" y="30" width="80" height="15" rx="4" fill="#140f0c" stroke="#dfba73" strokeWidth="1.5" />
      </g>
    </svg>
  </div>
);

// 4. 子路 (勇武弟子 / 束发结缨 / 按剑昂立)
export const ZiLuBust: React.FC<{ isActive: boolean; side?: 'left' | 'right' }> = ({
  isActive,
  side = 'right',
}) => (
  <div
    className={`relative transition-all duration-500 ease-out transform ${
      isActive
        ? 'scale-100 sm:scale-105 opacity-100 drop-shadow-[0_15px_30px_rgba(214,77,62,0.4)] z-20 brightness-105'
        : 'scale-95 opacity-40 brightness-50 z-10'
    }`}
  >
    <svg
      width="280"
      height="340"
      viewBox="0 0 280 340"
      className={`w-[170px] sm:w-[230px] md:w-[280px] h-auto pointer-events-none drop-shadow-2xl ${
        side === 'left' ? 'scale-x-[-1]' : ''
      }`}
    >
      <defs>
        <linearGradient id="zlRobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a3020" />
          <stop offset="50%" stopColor="#322015" />
          <stop offset="100%" stopColor="#1c110a" />
        </linearGradient>
        <linearGradient id="zlSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ebd1b5" />
          <stop offset="100%" stopColor="#cfab85" />
        </linearGradient>
      </defs>

      {/* Robe Body / Martial Shoulders */}
      <path
        d="M25,340 Q55,210 105,195 L175,195 Q225,210 255,340 Z"
        fill="url(#zlRobeGrad)"
        stroke="#1c130b"
        strokeWidth="2.5"
      />
      {/* Martial Collar */}
      <path d="M95,195 L140,270 L185,195 Z" fill="#241810" />
      <path d="M108,195 L140,250 L172,195 Z" fill="#a6321e" stroke="#dfba73" strokeWidth="1" />

      {/* Neck */}
      <path d="M115,160 L115,200 Q140,205 165,200 L165,160 Z" fill="url(#zlSkinGrad)" />

      {/* Face */}
      <path
        d="M106,120 Q100,175 140,184 Q180,175 174,120 Q140,105 106,120 Z"
        fill="url(#zlSkinGrad)"
        stroke="#b88f63"
        strokeWidth="1.5"
      />

      {/* Fierce Eyebrows */}
      <path d="M112,130 L134,124" stroke="#1c130b" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M146,124 L168,130" stroke="#1c130b" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="124" cy="138" r="5" fill="#1c130b" />
      <circle cx="126" cy="136" r="1.5" fill="#ffffff" />
      <circle cx="156" cy="138" r="5" fill="#1c130b" />
      <circle cx="158" cy="136" r="1.5" fill="#ffffff" />

      {/* Disciple Cap */}
      <g transform="translate(140, 72)">
        <path d="M-28,38 L-20,-12 Q0,-18 20,-12 L28,38 Z" fill="#1c130b" stroke="#0a0806" strokeWidth="2" />
        <rect x="-35" y="30" width="70" height="12" rx="3" fill="#a6321e" stroke="#dfba73" strokeWidth="1.5" />
      </g>
    </svg>
  </div>
);

// 5. 街市恶霸 / 市井人物 (Ruffian / Street Merchant)
export const RuffianBust: React.FC<{ isActive: boolean; side?: 'left' | 'right' }> = ({
  isActive,
  side = 'left',
}) => (
  <div
    className={`relative transition-all duration-500 ease-out transform ${
      isActive
        ? 'scale-100 sm:scale-105 opacity-100 drop-shadow-[0_15px_30px_rgba(214,77,62,0.4)] z-20 brightness-105'
        : 'scale-95 opacity-40 brightness-50 z-10'
    }`}
  >
    <svg
      width="280"
      height="340"
      viewBox="0 0 280 340"
      className={`w-[170px] sm:w-[230px] md:w-[280px] h-auto pointer-events-none drop-shadow-2xl ${
        side === 'right' ? 'scale-x-[-1]' : ''
      }`}
    >
      <defs>
        <linearGradient id="rfRobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d2b20" />
          <stop offset="50%" stopColor="#291b13" />
          <stop offset="100%" stopColor="#140d09" />
        </linearGradient>
        <linearGradient id="rfSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8bf97" />
          <stop offset="100%" stopColor="#be8f65" />
        </linearGradient>
      </defs>

      {/* Robe Body */}
      <path
        d="M20,340 Q50,210 100,195 L180,195 Q230,210 260,340 Z"
        fill="url(#rfRobeGrad)"
        stroke="#140d09"
        strokeWidth="2.5"
      />
      <path d="M90,195 L140,270 L190,195 Z" fill="#24140c" />

      {/* Neck */}
      <path d="M110,160 L110,205 Q140,212 170,205 L170,160 Z" fill="url(#rfSkinGrad)" />

      {/* Face */}
      <path
        d="M102,120 Q96,180 140,188 Q184,180 178,120 Q140,102 102,120 Z"
        fill="url(#rfSkinGrad)"
        stroke="#966a45"
        strokeWidth="1.5"
      />

      {/* Arrogant Expression */}
      <path d="M110,126 L130,132" stroke="#1c130b" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M150,132 L170,126" stroke="#1c130b" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="120" cy="140" rx="4.5" ry="3.5" fill="#1c130b" />
      <ellipse cx="160" cy="140" rx="4.5" ry="3.5" fill="#1c130b" />
      {/* Sneer Mouth */}
      <path d="M128,168 Q145,160 156,168" stroke="#5a2216" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Street Headcloth (头巾) */}
      <g transform="translate(140, 75)">
        <path d="M-36,38 L-25,-10 Q0,-16 25,-10 L36,38 Z" fill="#2c1a11" stroke="#0a0806" strokeWidth="2" />
        <rect x="-42" y="28" width="84" height="14" rx="3" fill="#1f120c" stroke="#8c5835" strokeWidth="1.5" />
      </g>
    </svg>
  </div>
);

export const WuxiaDialogueBox: React.FC<WuxiaDialogueBoxProps> = ({
  dialogues,
  currentIndex,
  onNext,
  onSkip,
  headerTag,
}) => {
  const current = dialogues[currentIndex] || dialogues[0];

  // Helper to determine speaker side
  let speakerSide = current.speakerSide;
  if (!speakerSide) {
    if (current.speaker.includes('干将')) {
      speakerSide = 'right';
    } else if (current.speaker.includes('旁白')) {
      speakerSide = 'narrator';
    } else {
      speakerSide = 'left';
    }
  }

  const isLeftActive = speakerSide === 'left';
  const isRightActive = speakerSide === 'right';

  // Determine which left avatar to render
  const renderLeftBust = () => {
    if (current.speaker.includes('玉琅') || current.avatarType === 'yulang') {
      return <YuLangBust isActive={isLeftActive} side="left" />;
    }
    if (current.speaker.includes('恶霸') || current.speaker.includes('市井') || current.speaker.includes('菜贩') || current.avatarType === 'ruffian') {
      return <RuffianBust isActive={isLeftActive} side="left" />;
    }
    if (current.speaker.includes('干将') && speakerSide === 'left') {
      return <GanJiangBust isActive={isLeftActive} side="left" />;
    }
    // Default left is YuLang or Ruffian
    return <YuLangBust isActive={isLeftActive} side="left" />;
  };

  // Determine which right avatar to render
  const renderRightBust = () => {
    if (current.speaker.includes('孔子') || current.avatarType === 'confucius') {
      return <ConfuciusBust isActive={isRightActive} side="right" />;
    }
    if (current.speaker.includes('子路') || current.avatarType === 'zilu') {
      return <ZiLuBust isActive={isRightActive} side="right" />;
    }
    // Default right is protagonist GanJiang
    return <GanJiangBust isActive={isRightActive} side="right" />;
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden">
      {/* 1. Top Header Bar with Chapter Title & Skip Button */}
      <div className="relative z-30 w-full max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8 pt-3 pb-1">
        {headerTag ? (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#16221e]/90 border border-[#3b554b] text-xs sm:text-sm font-serif text-[#ffd885] shadow-md backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#d64d3e] shadow-[0_0_8px_#d64d3e] animate-pulse" />
            <span className="font-bold">{headerTag}</span>
          </div>
        ) : (
          <div className="text-xs font-serif text-[#7bb39d] tracking-widest flex items-center gap-1.5">
            <span>「剧情」</span>
            <span className="text-[#c7beaf]">因剑相遇</span>
          </div>
        )}

        {onSkip && (
          <button
            id="dialogue-btn-skip"
            onClick={e => {
              e.stopPropagation();
              sound.playClick();
              onSkip();
            }}
            className="px-3.5 py-1 rounded-sm bg-[#16221e]/85 hover:bg-[#23352e] border border-[#3b554b] hover:border-[#dfba73] text-xs font-serif text-[#ffd885] transition-all flex items-center gap-1.5 shadow-lg backdrop-blur-md cursor-pointer active:scale-95"
            title="跳过对话"
          >
            <FastForward className="w-3.5 h-3.5 text-[#ffd885]" />
            <span>跳过</span>
          </button>
        )}
      </div>

      {/* 2. Character Bust Presentation Stage (Standing Above Bottom Dialogue Box - Matching Fig 3) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex items-end justify-between px-2 sm:px-12 pointer-events-none -mb-3 sm:-mb-5">
        {/* Left Character Bust */}
        <div className="flex flex-col items-center">
          {renderLeftBust()}
        </div>

        {/* Right Character Bust */}
        <div className="flex flex-col items-center">
          {renderRightBust()}
        </div>
      </div>

      {/* 3. Bottom Wuxia Narrative Dialogue Box (Matching Fig 3 Reference UI) */}
      <div className="relative z-30 w-full max-w-5xl mx-auto px-3 sm:px-6 pb-3 sm:pb-6">
        <div
          id="dialogue-box-container"
          onClick={() => {
            sound.playClick();
            onNext();
          }}
          className="group relative w-full min-h-[135px] sm:min-h-[155px] bg-[#101714]/94 hover:bg-[#131c19]/96 border-2 border-[#3b554b]/80 hover:border-[#dfba73]/70 rounded-md sm:rounded-lg shadow-[0_15px_45px_rgba(0,0,0,0.92)] p-4 sm:p-6 sm:px-8 cursor-pointer transition-all duration-200 active:scale-[0.995] flex flex-col justify-between backdrop-blur-md"
        >
          {/* Classical Double Hairline Inset & Ornamental Corner Rivets */}
          <div className="absolute inset-1.5 border border-[#dfba73]/20 rounded-md pointer-events-none" />
          
          {/* Corner Bronze Cloud Motifs */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#dfba73]/70 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#dfba73]/70 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#dfba73]/70 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#dfba73]/70 pointer-events-none" />

          {/* 4. Fig 3 Signature: Character Name Capsule Badge with Cloud Wing Ornament */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 sm:left-12 sm:translate-x-0 z-30 flex items-center">
            {/* Left Cloud Wing */}
            <svg width="24" height="24" viewBox="0 0 24 24" className="w-5 h-5 text-[#dfba73]/60 -mr-1 hidden sm:block">
              <path d="M22,12 Q14,8 8,14 Q2,20 0,12" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>

            {/* Name Capsule Plaque (Matching Fig 3: 菜贩子 / 干将 / 玉琅) */}
            <div className="px-6 sm:px-8 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#1c2923] via-[#2d4238] to-[#1c2923] border border-[#dfba73] shadow-[0_4px_16px_rgba(0,0,0,0.85)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd885] shadow-[0_0_6px_#ffd885]" />
              <span className="font-serif font-bold text-sm sm:text-base tracking-[0.2em] text-[#ffd885] drop-shadow-sm">
                {current.nameTag || current.speaker}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd885] shadow-[0_0_6px_#ffd885]" />
            </div>

            {/* Right Cloud Wing */}
            <svg width="24" height="24" viewBox="0 0 24 24" className="w-5 h-5 text-[#dfba73]/60 -ml-1 scale-x-[-1] hidden sm:block">
              <path d="M22,12 Q14,8 8,14 Q2,20 0,12" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* 5. Main Spoken Dialogue Text */}
          <div className="mt-3 sm:mt-2.5 px-1 sm:px-3 text-[#f5efe3] font-serif text-base sm:text-lg md:text-xl leading-relaxed tracking-wide min-h-[50px] flex items-center">
            <p className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {current.text}
            </p>
          </div>

          {/* 6. Bottom Navigation Line: Progress & Click-Advance Prompt */}
          <div className="mt-2.5 flex items-center justify-between border-t border-[#2b3e36]/70 pt-2 px-1 text-xs font-serif">
            <span className="text-[11px] sm:text-xs text-[#7bb39d] tracking-wider">
              第 {currentIndex + 1} / {dialogues.length} 幕 · 点击任意处继续
            </span>

            {/* Glowing Advance Prompt (Matching Fig 3) */}
            <div className="flex items-center gap-1.5 text-[#ffd885] font-bold group-hover:translate-x-0.5 transition-transform animate-pulse">
              <span className="text-xs sm:text-sm tracking-wider">
                {currentIndex < dialogues.length - 1 ? '点击继续' : '仗剑启程'}
              </span>
              <ChevronRight className="w-4 h-4 text-[#ffd885]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
