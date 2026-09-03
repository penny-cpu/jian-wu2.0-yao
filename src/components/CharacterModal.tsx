import React, { useState } from 'react';
import { sound } from '../audio';
import { X, Sparkles } from 'lucide-react';
import { BronzeCornerPlaque } from './BronzeCornerPlaque';
import { BronzeFiligreeButton } from './BronzeFiligreeButton';

/* =========================================================================
 * 🎭【春秋人物志 · 三大主角人物形象背景底图配置位置】
 * 如需更换各人物（干将 / 莫邪 / 欧冶子）的背景立绘底图，可直接在下方对应修改图片路径：
 * ========================================================================= */
import ganjiangBioBg from '../assets/images/ganjiang_bio_bg_1787798389392.jpg';
import moyeBioBg from '../assets/images/moye_bio_bg_1788277575393.jpg';
import ouyeziBioBg from '../assets/images/ouyezi_bio_bg_1788277591224.jpg';

export const CHARACTER_BIO_IMAGES: Record<string, string> = {
  ganjiang: ganjiangBioBg, // 干将人物形象底图
  moye: moyeBioBg,         // 莫邪人物形象底图
  ouyezi: ouyeziBioBg,     // 欧冶子人物形象底图
};

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CharacterDossier {
  id: string;
  name: string;
  subTitle: string; // 铸剑师 · 问剑者
  sealText: string;
  identity: string; // 身份
  training: string; // 所习
  belief: string;   // 信念
  character: string;// 心性
  swordHeart: string;// 剑心
  question: string; // 所问
  bgImage: string;  // 人物立绘底图
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ isOpen, onClose }) => {
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);

  const characters: CharacterDossier[] = [
    {
      id: 'ganjiang',
      name: '干将',
      subTitle: '铸剑师 · 问剑者',
      sealText: '干将之印',
      identity: '铸剑师',
      training: '辨金 · 识火 · 淬锋',
      belief: '剑有锋芒，当为守护。',
      character: '沉静 · 守正 · 善思',
      swordHeart: '以剑自省，以德驭锋。',
      question: '好剑，究竟为何而生？',
      bgImage: CHARACTER_BIO_IMAGES.ganjiang,
    },
    {
      id: 'moye',
      name: '莫邪',
      subTitle: '铸剑师 · 剑魄相依',
      sealText: '莫邪之印',
      identity: '铸剑名匠 · 剑魄通玄',
      training: '辨金 · 识火 · 舍身铸魂',
      belief: '刚柔相济，以身淬剑，生死同心。',
      character: '坚毅 · 沉静 · 纯澈 · 仁善',
      swordHeart: '夫子铸刚，妾身铸柔；以柔克刚。',
      question: '剑有灵犀，何时方能止息人间兵戈？',
      bgImage: CHARACTER_BIO_IMAGES.moye,
    },
    {
      id: 'ouyezi',
      name: '欧冶子',
      subTitle: '铸剑宗师 · 天工开物',
      sealText: '湛卢开山',
      identity: '万剑之祖 · 越地大宗师',
      training: '勘探地脉 · 辨金石 · 驭地火',
      belief: '仁道湛卢，不行霸道；剑不妄杀。',
      character: '通达 · 仁厚 · 虚怀 · 超然',
      swordHeart: '大巧若拙，以德化剑，剑通天地。',
      question: '天下之利器，可能尽归于仁德？',
      bgImage: CHARACTER_BIO_IMAGES.ouyezi,
    },
  ];

  if (!isOpen) return null;

  const current = characters[selectedCharIndex];

  return (
    <div className="fixed inset-0 z-50 bg-[#060a08]/92 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none overflow-y-auto">
      {/* Outer Card Container with Warring States Bronze Corner Linework (图4设计) */}
      <BronzeCornerPlaque className="relative w-full max-w-4xl bg-[#0e1613] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.98)] overflow-hidden my-auto flex flex-col p-0">
        
        {/* Top Floating Header & Character Selector */}
        <div className="relative z-40 w-full px-4 py-2 bg-[#0a0f0d]/90 border-b border-[#2b3e36] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-serif text-[#ffd885]">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd885]" />
              <span className="font-bold tracking-widest">春秋人物志</span>
            </div>

            {/* Character switcher tabs */}
            <div className="flex gap-1.5 ml-2">
              {characters.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCharIndex(idx);
                  }}
                  className={`px-3 py-0.5 rounded-sm text-xs font-serif transition-all cursor-pointer ${
                    selectedCharIndex === idx
                      ? 'bg-[#22352e] border border-[#dfba73] text-[#ffd885] font-bold shadow-[0_0_10px_rgba(223,186,115,0.3)]'
                      : 'bg-[#121c17] border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            id="char-modal-close"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] text-[#ffd885] hover:text-white hover:border-[#dfba73] transition-colors cursor-pointer active:scale-95"
            title="关闭人物志"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Visual Presentation (无遮罩纯净呈现人物立绘全貌) */}
        <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] bg-[#0c1310] flex items-stretch overflow-hidden">
          
          {/* Main Canvas Background Image (无遮罩，完整展现人物、服饰与铸剑背景) */}
          <div
            key={current.id}
            className="absolute inset-0 bg-cover bg-left md:bg-center transition-all duration-300 ease-out"
            style={{
              backgroundImage: `url(${current.bgImage})`,
            }}
          />

          {/* Left Vertical Calligraphy & Character Seal Area */}
          <div className="relative z-20 p-6 sm:p-8 flex flex-col justify-between select-none pointer-events-none">
            {/* Top Left Calligraphy Name & Subtitle */}
            <div className="space-y-3">
              {/* Calligraphy Name in Vertical Orientation with sharp stroke shadow */}
              <div className="text-4xl sm:text-5xl md:text-6xl font-brush text-[#fdfaf5] tracking-[0.25em] [writing-mode:vertical-rl] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {current.name}
              </div>

              {/* Subtitle Vertical Flow */}
              <div className="text-xs sm:text-sm font-serif text-[#ffd885] tracking-[0.3em] [writing-mode:vertical-rl] opacity-95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] pt-1">
                {current.subTitle}
              </div>
            </div>

            {/* Bottom Left Cinnabar Seal */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xs bg-[#9a2b20] border border-[#d64d3e] flex items-center justify-center text-[#faece8] font-serif text-[10px] sm:text-xs font-bold [writing-mode:vertical-rl] shadow-lg">
              {current.sealText}
            </div>
          </div>

          {/* Right Side: Ancient Rice Paper Parchment Splash Card */}
          <div className="relative z-20 ml-auto w-full max-w-[55%] sm:max-w-[52%] md:max-w-[48%] h-full flex flex-col justify-center p-4 sm:p-6 md:p-8 my-auto">
            {/* Parchment Textured Container with Ripped Brush Edge Look */}
            <div className="relative bg-[#d7ccba]/95 text-[#1a2420] p-4 sm:p-6 rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.85)] border border-[#a89b84] backdrop-blur-sm">
              
              {/* Subtle Parchment Texture & Border */}
              <div className="absolute inset-1 border border-[#9b8d75]/30 pointer-events-none" />

              {/* Top Right Decorative Cinnabar Seal Stamp */}
              <div className="absolute top-3 right-3 w-6 h-6 rounded-xs bg-[#8e251b] border border-[#b83a2d] flex items-center justify-center text-[#f8ede9] font-serif text-[8px] font-bold [writing-mode:vertical-rl] shadow-xs">
                剑心通玄
              </div>

              {/* Six Structured Items */}
              <div className="space-y-2.5 sm:space-y-3 font-serif text-xs sm:text-sm text-left">
                {/* 1. 身份 */}
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#202925] text-[#ebdcc8] text-[11px] sm:text-xs font-bold tracking-widest shadow-xs">
                    身 份 ：
                  </span>
                  <span className="font-serif font-bold text-[#1a2420] text-xs sm:text-sm">
                    {current.identity}
                  </span>
                </div>

                {/* 2. 所习 */}
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#202925] text-[#ebdcc8] text-[11px] sm:text-xs font-bold tracking-widest shadow-xs">
                    所 习 ：
                  </span>
                  <span className="font-serif text-[#2a3832] text-xs sm:text-sm">
                    {current.training}
                  </span>
                </div>

                {/* 3. 信念 */}
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#202925] text-[#ebdcc8] text-[11px] sm:text-xs font-bold tracking-widest shadow-xs">
                    信 念 ：
                  </span>
                  <span className="font-serif text-[#2a3832] text-xs sm:text-sm leading-snug">
                    {current.belief}
                  </span>
                </div>

                {/* 4. 心性 */}
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#202925] text-[#ebdcc8] text-[11px] sm:text-xs font-bold tracking-widest shadow-xs">
                    心 性 ：
                  </span>
                  <span className="font-serif text-[#2a3832] text-xs sm:text-sm">
                    {current.character}
                  </span>
                </div>

                {/* Bronze Diamond Divider Line */}
                <div className="relative py-1 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#8e7f67] to-transparent" />
                  <span className="absolute px-1 bg-[#d7ccba] text-[#8e7f67] text-[10px]">◇</span>
                </div>

                {/* 5. 剑心 */}
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#202925] text-[#ebdcc8] text-[11px] sm:text-xs font-bold tracking-widest shadow-xs">
                    剑 心 ：
                  </span>
                  <span className="font-serif font-bold text-[#1a2420] text-xs sm:text-sm">
                    {current.swordHeart}
                  </span>
                </div>

                {/* 6. 所问 */}
                <div className="flex items-center gap-2.5">
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-[#202925] text-[#ebdcc8] text-[11px] sm:text-xs font-bold tracking-widest shadow-xs">
                    所 问 ：
                  </span>
                  <span className="font-serif font-bold text-[#7d1e16] text-xs sm:text-sm tracking-wide">
                    {current.question}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer Note with Figure 3 BronzeFiligreeButton */}
        <div className="relative z-30 px-4 py-2.5 bg-[#0a0f0d] border-t border-[#2b3e36] flex items-center justify-between text-xs font-serif text-[#7bb39d]">
          <span className="tracking-wider">◇ 春秋古卷 · 金石刻铭 · 传世名侠 ◇</span>
          <BronzeFiligreeButton
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            variant="gold"
            size="sm"
          >
            合上画卷
          </BronzeFiligreeButton>
        </div>
      </BronzeCornerPlaque>
    </div>
  );
};
