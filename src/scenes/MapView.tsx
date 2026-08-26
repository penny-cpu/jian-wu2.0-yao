import React from 'react';
import { VirtueState, GameScene, VirtueId } from '../types';
import { sound } from '../audio';
import { Sparkles, CheckCircle2, Lock, Flame, Home } from 'lucide-react';

interface MapViewProps {
  virtues: Record<VirtueId, VirtueState>;
  onSelectLevel: (scene: GameScene, virtueId: VirtueId) => void;
  onSelectFinalChapter: () => void;
  onBackToTitle?: () => void;
}

interface SteleLocation {
  id: VirtueId;
  scene: GameScene;
  name: string;
  steleLabel: string;
  landscapeTag: string;
  subtitle: string;
  poem: string;
  color: string;
  // Position percentage across scroll (Ordered strictly right-to-left: 仁 -> 礼 -> 义 -> 智 -> 信)
  posX: string; // Left percentage
  posY: string; // Top percentage
}

export const MapView: React.FC<MapViewProps> = ({
  virtues,
  onSelectLevel,
  onSelectFinalChapter,
  onBackToTitle,
}) => {
  // 5 Virtues arranged from RIGHT to LEFT: 仁 (84%) -> 礼 (68%) -> 义 (50%) -> 智 (34%) -> 信 (18%) -> 最终章 (7%)
  const locations: SteleLocation[] = [
    {
      id: 'REN',
      scene: 'LEVEL1',
      name: '仁',
      steleLabel: '姑苏寒舍',
      landscapeTag: '姑苏 · 水乡镇',
      subtitle: '雪夜炊烟',
      poem: '以仁御锋，残剑生温',
      color: '#5cb87a',
      posX: '84%',
      posY: '55%',
    },
    {
      id: 'LI',
      scene: 'LEVEL2',
      name: '礼',
      steleLabel: '曲阜圣坛',
      landscapeTag: '曲阜 · 古柏观',
      subtitle: '剑问圣人',
      poem: '收锋守礼，敬意归心',
      color: '#d64d3e',
      posX: '68%',
      posY: '38%',
    },
    {
      id: 'YI',
      scene: 'LEVEL3',
      name: '义',
      steleLabel: '吴市闹坊',
      landscapeTag: '吴都 · 繁华市',
      subtitle: '烈风之断',
      poem: '当为则为，仗剑卫道',
      color: '#dfba73',
      posX: '50%',
      posY: '60%',
    },
    {
      id: 'ZHI',
      scene: 'LEVEL4',
      name: '智',
      steleLabel: '空谷幽壑',
      landscapeTag: '青崖 · 幽深谷',
      subtitle: '空谷之兽',
      poem: '以智破妄，洞察克敌',
      color: '#4e9dc7',
      posX: '34%',
      posY: '36%',
    },
    {
      id: 'XIN',
      scene: 'LEVEL5',
      name: '信',
      steleLabel: '孤山千仞',
      landscapeTag: '孤山 · 千仞崖',
      subtitle: '孤山挂剑',
      poem: '履信守诺，挂剑立本',
      color: '#ffd885',
      posX: '18%',
      posY: '58%',
    },
  ];

  const unlockedCount = (Object.values(virtues) as VirtueState[]).filter(v => v.unlocked).length;
  const isAllUnlocked = unlockedCount >= 5;

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-[#0c1411]">
      {/* Background Bronze Cloud-Thunder & Patina Realm Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#16231e_0%,#0c1411_65%,#070d0b_100%)] pointer-events-none" />
      
      {/* Gold & Bronze Meander Watermark Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,85,75,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,85,75,0.08)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
      
      {/* Patina & Bronze Stele Inset Borders */}
      <div className="absolute inset-2 border border-[#3b554b]/50 rounded-sm pointer-events-none" />
      <div className="absolute inset-3 border border-[#dfba73]/20 rounded-sm pointer-events-none" />
      
      {/* Bronze Corner Rivets */}
      <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-[#dfba73] pointer-events-none z-30" />
      <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-[#dfba73] pointer-events-none z-30" />
      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-[#dfba73] pointer-events-none z-30" />
      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-[#dfba73] pointer-events-none z-30" />

      {/* Top Header: Inscribed Bronze Stele Title (九州五德大地图) */}
      <header className="relative z-20 w-full pt-3.5 px-4 sm:px-8 flex items-start justify-between">
        {/* Left Bronze Seal */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-7 h-7 rounded-sm bg-[#1e2e27] border border-[#dfba73] shadow-md flex items-center justify-center text-[#ffd885] text-xs font-serif font-bold">
            干
          </div>
          <div className="text-[11px] font-serif text-[#7bb39d] tracking-widest leading-tight">
            <div>春秋吴越</div>
            <div className="text-[#ffd885]">名匠青铜卷</div>
          </div>
        </div>

        {/* Center: Main Stele Inscription Title */}
        <div className="text-center mx-auto">
          <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-[#f5efe3] tracking-[0.25em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] flex items-center justify-center gap-2">
            <span className="text-[#dfba73] text-lg sm:text-2xl">❖</span>
            <span>九 州 五 德 大 地 图</span>
            <span className="text-[#dfba73] text-lg sm:text-2xl">❖</span>
          </h1>
          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] tracking-[0.2em] mt-1 font-medium">
            【 遍历江湖五境 · 从右往左叩问五德试炼 】
          </p>
        </div>

        {/* Right Seal & Progress Badge */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-sm bg-[#16221e]/90 border border-[#3b554b] text-[#ffd885] text-xs font-serif shadow-md backdrop-blur-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd885]" />
            <span>已悟: </span>
            <span className="font-bold text-[#fff]">{unlockedCount}</span>
            <span className="text-[#7bb39d]">/ 5 德</span>
          </div>
        </div>
      </header>

      {/* Main Interactive Map Area (Right-to-Left Ordered Inscribed Bronze Steles) */}
      <div className="relative z-10 w-full h-[390px] sm:h-[450px] md:h-[490px] my-auto">
        
        {/* Subtle Bronze Constellation Trace Lines connecting right to left */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
          <path
            d="M 84% 55% L 68% 38% L 50% 60% L 34% 36% L 18% 58% L 7% 28%"
            fill="none"
            stroke="#dfba73"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Far-Left Climax Pavilion: 天地铸炉 (最终章 - posX: 7%, posY: 28%) */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: '7%', top: '28%' }}
        >
          <button
            id="map-btn-final-furnace"
            onClick={() => {
              sound.playVirtueChime();
              onSelectFinalChapter();
            }}
            className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 active:scale-95 ${
              isAllUnlocked ? 'scale-105 animate-pulse' : 'hover:scale-105'
            }`}
          >
            {/* Bronze Ding Stele Tag for Final Chapter */}
            <div className="flex flex-col items-center">
              {/* Bronze Top Clasp */}
              <div className="w-14 sm:w-16 h-2 rounded-sm bg-[#20312a] border border-[#dfba73] shadow-md flex items-center justify-between px-1">
                <div className="w-1 h-1 rounded-full bg-[#dfba73]" />
                <div className="w-1 h-1 rounded-full bg-[#dfba73]" />
              </div>

              {/* Stele Plaque Body */}
              <div className="w-11 sm:w-13 py-2 px-1 bg-[#16221e]/95 border-x border-[#c5a059] shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-sm flex flex-col items-center justify-center transition-all group-hover:border-[#ffd885] group-hover:shadow-[0_0_20px_rgba(223,186,115,0.4)]">
                {/* Decorative Seal on Top */}
                <div className="w-4 h-4 mb-1 rounded-sm bg-[#b83a2d] flex items-center justify-center text-[#fff] text-[9px] font-bold shadow-sm">
                  终
                </div>

                {/* Vertical Bronze Inscription */}
                <div className="font-serif font-bold text-[#f5efe3] text-sm sm:text-base tracking-[0.25em] leading-snug [writing-mode:vertical-rl] group-hover:text-[#ffd885]">
                  天地铸炉
                </div>

                {/* Bottom Bronze Rivet */}
                <div className="w-1.5 h-1.5 rounded-full bg-[#dfba73] mt-1.5 shadow-sm" />
              </div>

              {/* Bottom Bronze Clasp */}
              <div className="w-14 sm:w-16 h-2 rounded-sm bg-[#20312a] border border-[#dfba73] shadow-md flex items-center justify-between px-1">
                <div className="w-1 h-1 rounded-full bg-[#dfba73]" />
                <div className="w-1 h-1 rounded-full bg-[#dfba73]" />
              </div>
            </div>

            {/* Hover Tooltip / Status Bubble */}
            <div className="mt-1 px-2 py-0.5 rounded-sm bg-[#16221e] border border-[#dfba73] text-[10px] font-serif text-[#ffd885] whitespace-nowrap shadow-lg flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#ff7b00]" />
              <span>{isAllUnlocked ? '【五德圆满·终局】' : '【终章绘卷】'}</span>
            </div>
          </button>
        </div>

        {/* Render the 5 Inscribed Bronze Steles from Right to Left: 仁 -> 礼 -> 义 -> 智 -> 信 */}
        {locations.map((loc) => {
          const isUnlocked = virtues[loc.id]?.unlocked;

          return (
            <div
              key={loc.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: loc.posX, top: loc.posY }}
            >
              <button
                id={`map-scroll-${loc.id}`}
                onClick={() => {
                  sound.playSwordSlash();
                  onSelectLevel(loc.scene, loc.id);
                }}
                className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95"
              >
                {/* Warring States Bronze Inscribed Stele */}
                <div className="flex flex-col items-center">
                  {/* Top Bronze Bar / Fitting */}
                  <div className={`w-12 sm:w-14 h-1.5 sm:h-2 rounded-sm border shadow-md flex items-center justify-between px-1 transition-colors ${
                    isUnlocked
                      ? 'bg-[#20312a] border-[#dfba73]'
                      : 'bg-[#16221e] border-[#2b3e36]'
                  }`}>
                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#dfba73]" />
                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#dfba73]" />
                  </div>

                  {/* Stele Bronze Surface */}
                  <div
                    className={`w-9 sm:w-11 py-2 sm:py-2.5 px-0.5 border-x shadow-[0_4px_16px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center transition-all ${
                      isUnlocked
                        ? 'bg-[#16221e] border-[#c5a059] group-hover:border-[#ffd885] group-hover:shadow-[0_0_18px_rgba(197,160,89,0.5)]'
                        : 'bg-[#111916] border-[#2b3e36] opacity-95 group-hover:opacity-100 group-hover:bg-[#16221e] group-hover:border-[#3b554b]'
                    }`}
                  >
                    {/* Virtue Initial Stamp on Top */}
                    <div
                      className="w-4 h-4 mb-1 rounded-sm flex items-center justify-center text-[9px] sm:text-[10px] font-serif font-bold shadow-sm"
                      style={{
                        backgroundColor: isUnlocked ? '#20312a' : '#141d19',
                        color: isUnlocked ? '#ffd885' : '#7bb39d',
                        border: isUnlocked ? '1px solid #dfba73' : '1px solid #2b3e36',
                      }}
                    >
                      {loc.name}
                    </div>

                    {/* Vertical Inscribed Stele Title */}
                    <div className="font-serif font-bold text-[#f5efe3] text-xs sm:text-sm tracking-[0.2em] leading-snug [writing-mode:vertical-rl] group-hover:text-[#ffd885]">
                      {loc.steleLabel}
                    </div>

                    {/* Subtitle / Virtue Subtitle */}
                    <div className="text-[8px] sm:text-[9px] font-serif text-[#7bb39d] mt-1 scale-90 tracking-tighter [writing-mode:vertical-rl]">
                      {loc.subtitle}
                    </div>

                    {/* Bottom Bronze Rivet */}
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shadow-sm"
                      style={{ backgroundColor: isUnlocked ? '#dfba73' : '#3b554b' }}
                    />
                  </div>

                  {/* Bottom Bronze Bar / Fitting */}
                  <div className={`w-12 sm:w-14 h-1.5 sm:h-2 rounded-sm border shadow-md flex items-center justify-between px-1 transition-colors ${
                    isUnlocked
                      ? 'bg-[#20312a] border-[#dfba73]'
                      : 'bg-[#16221e] border-[#2b3e36]'
                  }`}>
                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#dfba73]" />
                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-[#dfba73]" />
                  </div>
                </div>

                {/* State Tag Pill Floating Below */}
                <div className="mt-1 px-2 py-0.5 rounded-sm bg-[#16221e] border border-[#3b554b] text-[10px] font-serif text-[#f5efe3] whitespace-nowrap shadow-md flex items-center gap-1 group-hover:border-[#dfba73]">
                  {isUnlocked ? (
                    <>
                      <CheckCircle2 className="w-2.5 h-2.5 text-[#5cb87a]" />
                      <span className="text-[#ffd885]">已悟·{loc.name}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-2.5 h-2.5 text-[#7bb39d]" />
                      <span className="text-[#a8b8b0]">问剑入局</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Footer: Classical Bronze Progress & Return to Home Button */}
      <footer className="relative z-20 w-full pb-3 px-4 sm:px-8 flex flex-col items-center">
        {/* Progress Bar Container in Warring States Bronze Style */}
        <div className="w-full max-w-lg bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-2.5 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-serif text-[#f5efe3] mb-1.5">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#dfba73] inline-block" />
              <span className="text-[#a8b8b0]">五德参悟进度:</span>
              <strong className="text-[#ffd885] ml-1">{unlockedCount} / 5</strong>
            </span>
            <span className="text-[#7bb39d] text-[11px]">
              {isAllUnlocked ? '【五德归一 · 炉火纯青】' : '【点选铭碑 · 寻访问道】'}
            </span>
          </div>

          {/* Golden Bronze Meter */}
          <div className="w-full h-2 bg-[#0a0f0d] rounded-sm overflow-hidden border border-[#2b3e36] p-[1px]">
            <div
              className={`h-full rounded-sm transition-all duration-700 ${
                isAllUnlocked
                  ? 'bg-gradient-to-r from-[#2b5947] via-[#dfba73] to-[#fff] shadow-[0_0_10px_rgba(223,186,115,0.8)]'
                  : 'bg-gradient-to-r from-[#20312a] via-[#3b554b] to-[#dfba73]'
              }`}
              style={{ width: `${(unlockedCount / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full max-w-lg mt-2 text-[11px] font-serif text-[#7bb39d]">
          {onBackToTitle && (
            <button
              onClick={() => {
                sound.playClick();
                onBackToTitle();
              }}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#ffd885] hover:text-[#fff] transition-all cursor-pointer text-xs"
            >
              <Home className="w-3 h-3 text-[#ffd885]" />
              <span>返回首页</span>
            </button>
          )}
          <span className="mx-auto tracking-wider font-medium text-[#7bb39d]">
            ❖ 九州大地因缘际会 · 剑由铁铸 · 心由德成 ❖
          </span>
        </div>
      </footer>
    </div>
  );
};
