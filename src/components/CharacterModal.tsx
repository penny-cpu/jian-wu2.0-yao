import React, { useState } from 'react';
import { sound } from '../audio';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { X, Sparkles } from 'lucide-react';

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CharacterProfile {
  id: string;
  name: string;
  subTitle: string;
  dongtian: string; // 洞天
  number: string; // 编号 001-1
  rarity: string; // SSR / UR
  titleTag: string; // 仁心剑圣 · 傲骨铸尊
  realm: string; // 通神境 / 止境大宗师
  portraitKey: string;
  quote: string; // 专属语录
  talents: string[]; // 天赋特质
  skills: string; // 招牌绝技
  bonds: string; // 羁绊
  stats: {
    jiandao: number; // 剑道
    wudao: number;   // 武道
    shufa: number;   // 术法
    roushen: number; // 肉身
    xinjing: number; // 心境
    qiyun: number;   // 气运
  };
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ isOpen, onClose }) => {
  const [selectedCharIndex, setSelectedCharIndex] = useState(0);

  const characters: CharacterProfile[] = [
    {
      id: 'ganjiang',
      name: '干将',
      subTitle: '【 吴越铸剑时期 】',
      dongtian: '铸剑洞天',
      number: '001-1',
      rarity: 'SSR',
      titleTag: '仁心剑圣 · 傲骨铸尊',
      realm: '通神境',
      portraitKey: 'char_ganjiang',
      quote: '“剑由铁铸，心由德成；道理讲不通，便用剑来讲。”',
      talents: ['【 真龙剑骨 】', '【 天生剑心 】', '【 烈性傲骨 】', '【 五德融身 】'],
      skills: '仁锋温刃 · 疾风快剑 · 烈风之断 · 归一神铸',
      bonds: '莫邪（剑魄同修）、欧冶子（同门师友）',
      stats: {
        jiandao: 98,
        wudao: 88,
        shufa: 76,
        roushen: 86,
        xinjing: 99,
        qiyun: 95,
      },
    },
    {
      id: 'moye',
      name: '莫邪',
      subTitle: '【 舍身淬剑时期 】',
      dongtian: '赤霄洞天',
      number: '001-2',
      rarity: 'SSR',
      titleTag: '神魄通玄 · 柔韧无双',
      realm: '通神境',
      portraitKey: 'char_moye',
      quote: '“夫子铸刚，妾身铸柔；刚柔并济，方得千古名锋。”',
      talents: ['【 灵犀剑魄 】', '【 舍身化灵 】', '【 柔心似水 】'],
      skills: '秋水回锋 · 碧波绕指 · 霜刃清吟 · 双剑合璧',
      bonds: '干将（生死同道）、越王（因缘宿敌）',
      stats: {
        jiandao: 94,
        wudao: 82,
        shufa: 96,
        roushen: 72,
        xinjing: 98,
        qiyun: 91,
      },
    },
    {
      id: 'ouyezi',
      name: '欧冶子',
      subTitle: '【 湛卢开山时期 】',
      dongtian: '龙泉洞天',
      number: '000-0',
      rarity: 'UR',
      titleTag: '万剑宗师 · 天工开物',
      realm: '止境大宗师',
      portraitKey: 'char_ouyezi',
      quote: '“赤金以作，神采百炼；仁道湛卢，不行霸道。”',
      talents: ['【 万剑之祖 】', '【 地火天炉 】', '【 仁者无锋 】'],
      skills: '湛卢仁光 · 纯钧华彩 · 胜邪破妄 · 巨阙开天',
      bonds: '干将（同门师兄）、薛烛（相剑知己）',
      stats: {
        jiandao: 99,
        wudao: 92,
        shufa: 90,
        roushen: 90,
        xinjing: 100,
        qiyun: 98,
      },
    },
  ];

  if (!isOpen) return null;

  const current = characters[selectedCharIndex];
  const portraitUrl = getPlaceholderImage(current.portraitKey, current.name, current.titleTag, '#c5a059');

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto select-none">
      {/* Outer Card Container */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-[#0a0f0d] border border-[#3b554b] rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col my-auto">
        
        {/* Bronze Inset Border & Corner Rivets */}
        <div className="absolute inset-1.5 border border-[#dfba73]/20 pointer-events-none z-30" />
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#dfba73] z-30" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#dfba73] z-30" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#dfba73] z-30" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#dfba73] z-30" />

        {/* Top Floating Control Bar */}
        <div className="relative z-40 w-full px-4 pt-3 pb-1 flex items-center justify-between text-xs font-serif text-[#a8b8b0]">
          <div className="flex items-center gap-1.5 bg-[#16221e]/90 px-2 py-0.5 rounded-sm border border-[#2b3e36]">
            <Sparkles className="w-3 h-3 text-[#ffd885]" />
            <span className="text-[10px] text-[#ffd885]">春秋名侠志 · 青铜金卷</span>
          </div>

          {/* Close Button */}
          <button
            id="char-modal-close"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] text-[#ffd885] hover:text-white hover:border-[#c5a059] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Character Switcher Tabs */}
        <div className="relative z-40 px-4 py-1.5 flex items-center gap-2 border-b border-[#2b3e36] bg-[#111916]">
          <span className="text-[10px] font-serif text-[#6d8a7e]">名侠切换:</span>
          {characters.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                sound.playSwordSlash();
                setSelectedCharIndex(idx);
              }}
              className={`px-3 py-0.5 rounded-sm text-xs font-serif transition-all cursor-pointer ${
                selectedCharIndex === idx
                  ? 'bg-gradient-to-r from-[#20312a] to-[#334c41] border border-[#c5a059] text-[#ffd885] font-bold shadow-[0_0_10px_rgba(197,160,89,0.3)]'
                  : 'bg-[#16221e] border border-[#2b3e36] text-[#7bb39d] hover:text-[#ffd885]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Card Main Canvas */}
        <div className="relative w-full h-[290px] sm:h-[330px] overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${portraitUrl})` }}>
          {/* Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-transparent to-[#0a0f0d]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0d]/60 via-transparent to-[#0a0f0d]/60" />

          {/* Top Left: Dongtian & Number Badge */}
          <div className="absolute top-3 left-4 z-20 flex flex-col items-start gap-1">
            {/* Dongtian Vertical Plate */}
            <div className="px-1.5 py-1 bg-[#16221e]/90 border border-[#3b554b] rounded-sm text-[10px] font-serif text-[#ffd885] [writing-mode:vertical-rl] tracking-widest shadow-md">
              {current.dongtian}
            </div>
            {/* Number Box */}
            <div className="px-1.5 py-0.5 bg-[#0a0f0d]/90 border border-[#c5a059] rounded-sm text-[9px] font-mono text-[#f5efe3] font-bold">
              {current.number}
            </div>
            {/* Stage Tag */}
            <div className="text-[9px] font-serif text-[#7bb39d] [writing-mode:vertical-rl] tracking-widest bg-[#111916]/80 px-0.5 py-1 rounded-sm">
              {current.subTitle.replace(/【|】/g, '')}
            </div>
          </div>

          {/* Center-Left: Big Chiseled Name */}
          <div className="absolute top-6 left-14 sm:left-16 z-20 flex flex-col items-start">
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#f5efe3] tracking-[0.2em] leading-none [writing-mode:vertical-rl] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              {current.name}
            </h2>
            <div className="mt-2 text-[10px] font-serif text-[#a8b8b0] tracking-widest bg-[#131d19]/90 px-1.5 py-0.5 rounded-sm border border-[#2b3e36]">
              {current.subTitle}
            </div>
          </div>

          {/* Top Right: SSR Badge & Title Banner */}
          <div className="absolute top-2 right-4 z-20 flex flex-col items-end gap-1.5">
            {/* SSR Shiny Logo */}
            <div className="flex items-center gap-1">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-[#ffd885] tracking-wider drop-shadow-[0_0_15px_rgba(255,216,133,0.8)]">
                {current.rarity}
              </span>
              <span className="text-[10px] text-[#6d8a7e] font-mono">3/18</span>
            </div>

            {/* Vertical Bronze Title Ribbon */}
            <div className="px-1.5 py-2 rounded-sm bg-[#16221e]/95 border border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.3)] flex flex-col items-center">
              <div className="text-[#ffd885] text-xs mb-1">◇</div>
              <div className="text-[11px] font-serif text-[#ffd885] font-bold [writing-mode:vertical-rl] tracking-[0.25em]">
                {current.titleTag}
              </div>
            </div>

            {/* Realm Tag */}
            <div className="px-2 py-0.5 bg-[#16221e] border border-[#b83a2d] rounded-sm text-[10px] font-serif text-[#e65a4b] shadow-md font-semibold">
              {current.realm}
            </div>
          </div>
        </div>

        {/* Lower Half: Hexagonal Six-Dimension Stats Bar */}
        <div className="relative z-30 px-3 sm:px-4 py-2 bg-[#111916] border-t border-b border-[#2b3e36]">
          <div className="flex items-center gap-2">
            {/* Left Six-Dimension Badge */}
            <div className="w-7 h-16 rounded-sm bg-[#16221e] border border-[#3b554b] flex flex-col items-center justify-center text-[11px] font-serif font-bold text-[#ffd885] shadow-inner">
              <span>六</span>
              <span>维</span>
            </div>

            {/* 6 Stats Horizontal Distribution Grid */}
            <div className="flex-1 grid grid-cols-6 gap-1.5 text-center">
              {/* 剑道 */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-serif text-[#7bb39d]">剑道</span>
                <span className="text-xs font-mono font-bold text-[#66a3d2]">{current.stats.jiandao}</span>
                <div className="w-full h-1.5 bg-[#0e1512] rounded-sm overflow-hidden mt-0.5">
                  <div className="h-full bg-[#3b82f6] rounded-sm shadow-[0_0_6px_#3b82f6]" style={{ width: `${current.stats.jiandao}%` }} />
                </div>
              </div>

              {/* 武道 */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-serif text-[#dfba73]">武道</span>
                <span className="text-xs font-mono font-bold text-[#ffd885]">{current.stats.wudao}</span>
                <div className="w-full h-1.5 bg-[#0e1512] rounded-sm overflow-hidden mt-0.5">
                  <div className="h-full bg-[#dfba73] rounded-sm shadow-[0_0_6px_#dfba73]" style={{ width: `${current.stats.wudao}%` }} />
                </div>
              </div>

              {/* 术法 */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-serif text-[#a88eb2]">术法</span>
                <span className="text-xs font-mono font-bold text-[#c084fc]">{current.stats.shufa}</span>
                <div className="w-full h-1.5 bg-[#0e1512] rounded-sm overflow-hidden mt-0.5">
                  <div className="h-full bg-[#a855f7] rounded-sm shadow-[0_0_6px_#a855f7]" style={{ width: `${current.stats.shufa}%` }} />
                </div>
              </div>

              {/* 肉身 */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-serif text-[#b88c8c]">肉身</span>
                <span className="text-xs font-mono font-bold text-[#f87171]">{current.stats.roushen}</span>
                <div className="w-full h-1.5 bg-[#0e1512] rounded-sm overflow-hidden mt-0.5">
                  <div className="h-full bg-[#ef4444] rounded-sm shadow-[0_0_6px_#ef4444]" style={{ width: `${current.stats.roushen}%` }} />
                </div>
              </div>

              {/* 心境 */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-serif text-[#5cb87a]">心境</span>
                <span className="text-xs font-mono font-bold text-[#5cb87a]">{current.stats.xinjing}</span>
                <div className="w-full h-1.5 bg-[#0e1512] rounded-sm overflow-hidden mt-0.5">
                  <div className="h-full bg-[#10b981] rounded-sm shadow-[0_0_6px_#10b981]" style={{ width: `${current.stats.xinjing}%` }} />
                </div>
              </div>

              {/* 气运 */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-serif text-[#ffd885]">气运</span>
                <span className="text-xs font-mono font-bold text-[#fbbf24]">{current.stats.qiyun}</span>
                <div className="w-full h-1.5 bg-[#0e1512] rounded-sm overflow-hidden mt-0.5">
                  <div className="h-full bg-[#f59e0b] rounded-sm shadow-[0_0_6px_#f59e0b]" style={{ width: `${current.stats.qiyun}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Info Area: Quote, Talents, Skills, Bonds */}
        <div className="relative z-30 p-3 sm:p-4 bg-[#0a0f0d] space-y-2.5">
          {/* Quote Block */}
          <div className="p-2.5 rounded-sm bg-[#131d19] border border-[#2b3e36] shadow-inner">
            <p className="text-xs font-serif text-[#ffd885] italic text-center leading-relaxed">
              {current.quote}
            </p>
          </div>

          {/* Talents Badges */}
          <div>
            <div className="text-[10px] font-serif text-[#7bb39d] mb-1 flex items-center gap-1">
              <span>【 天赋特质 】</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {current.talents.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-sm bg-[#16221e] border border-[#2b3e36] text-[11px] font-serif text-[#d8cbb8]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Skills & Bonds */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif">
            <div className="p-2 rounded-sm bg-[#111916] border border-[#2b3e36]">
              <span className="text-[#7bb39d] text-[10px] block">【 招牌绝技 】</span>
              <span className="text-[#ffd885] text-[11px] leading-snug">{current.skills}</span>
            </div>
            <div className="p-2 rounded-sm bg-[#111916] border border-[#2b3e36]">
              <span className="text-[#7bb39d] text-[10px] block">【 江湖羁绊 】</span>
              <span className="text-[#a8b8b0] text-[11px] leading-snug">{current.bonds}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

