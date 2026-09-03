import React from 'react';
import { VirtueState, GameScene, VirtueId } from '../types';
import { sound } from '../audio';
import { Sparkles, CheckCircle2, Lock, Flame, Home } from 'lucide-react';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { BronzeFiligreeButton } from '../components/BronzeFiligreeButton';
import { BlackGoldTag, BlackGoldPlaque, BlackGoldButton } from '../components/BlackGoldBorder';

/* =========================================================================
 * 🗺️【九州五德大地图背景底图配置位置】
 * 如需更换大地图底图，可直接在此处修改引入的图片文件路径或变量：
 * ========================================================================= */
import mapScrollBgImage from '../assets/images/map_scroll_bg_hd_1788277069306.jpg';

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
  posX: string;
  posY: string;
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
      color: '#dfba73',
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
      color: '#e06c53',
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

  const mapBgUrl = mapScrollBgImage || getPlaceholderImage('map_scroll_bg', '九州五德大地图', '剑由铁铸 · 心由德成');

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between select-none overflow-hidden bg-cover bg-center bg-[#0c1411]"
      style={{ backgroundImage: `url(${mapBgUrl})` }}
    >
      {/* 45% 遮罩层 (用户明确要求：将九州五德大地图的背景地图遮罩效果改为45%) */}
      <div className="absolute inset-0 bg-[#0c1411]/45 pointer-events-none" />
      
      {/* 柔和暗角微光 (纯净过渡) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(7,13,11,0.6)_100%)] pointer-events-none" />
      
      {/* 4-side clean black outer frame */}
      <div className="absolute inset-2 border-2 border-black rounded-none pointer-events-none z-30" />
      <div className="absolute inset-[11px] border border-black/70 rounded-none pointer-events-none z-30" />

      {/* Top Header: Inscribed Bronze Stele Title (九州五德大地图) */}
      <header className="relative z-20 w-full pt-3.5 px-4 sm:px-8 flex items-start justify-between">
        {/* Left Bronze Seal */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-7 h-7 rounded-none border border-black bg-[#1e2e27] shadow-md flex items-center justify-center text-[#ffd885] text-xs font-serif font-bold">
            干
          </div>
          <div className="text-[11px] font-serif text-[#7bb39d] tracking-widest leading-tight">
            <div>春秋吴越</div>
            <div className="text-[#ffd885]">名匠青铜卷</div>
          </div>
        </div>

        {/* Center: Main Title */}
        <div className="text-center mx-auto">
          <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-[#f5efe3] tracking-[0.25em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] flex items-center justify-center gap-2">
            <span className="text-[#dfba73] text-lg sm:text-2xl">❖</span>
            <span>九 州 五 德 大 地 图</span>
            <span className="text-[#dfba73] text-lg sm:text-2xl">❖</span>
          </h1>
          <p className="text-xs sm:text-sm font-serif text-[#ffd885] tracking-[0.2em] mt-1 font-medium">
            【 遍历江湖五境 · 从右往左叩问五德试炼 】
          </p>
        </div>

        {/* Right Seal & Progress Badge (Top/bottom black-gold lines) */}
        <div className="flex items-center gap-2">
          <BlackGoldTag>
            <Sparkles className="w-3.5 h-3.5 text-[#ffd885]" />
            <span>已悟: </span>
            <span className="font-bold text-[#fff]">{unlockedCount}</span>
            <span className="text-[#7bb39d]">/ 5 德</span>
          </BlackGoldTag>
        </div>

      </header>

      {/* Main Interactive Map Area (Right-to-Left Ordered Inscribed Bronze Steles) */}
      <div className="relative z-10 w-full h-[390px] sm:h-[450px] md:h-[490px] my-auto">
        
        {/* Constellation Trace Lines connecting right to left */}
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
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-3 bg-[#c59b58] relative">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border border-black bg-[#1a120b]" />
              </div>

              {/* Plaque Body with 4-side Black Border */}
              <div className="relative w-12 sm:w-14 py-2.5 px-1 bg-gradient-to-b from-[#382618] via-[#24180f] to-[#1a110a] border-2 border-black rounded-none shadow-[0_6px_20px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center transition-all group-hover:border-[#dfba73] group-hover:shadow-[0_0_20px_rgba(223,186,115,0.4)]">
                <div className="w-4 h-4 mb-1 rounded-none bg-[#9e2a20] border border-black flex items-center justify-center text-[#fff] text-[9px] font-serif font-bold shadow-sm">
                  终
                </div>

                <div className="font-serif font-bold text-[#f5efe3] text-sm sm:text-base tracking-[0.2em] leading-snug [writing-mode:vertical-rl] group-hover:text-[#ffd885]">
                  天地铸炉
                </div>

                <div className="w-6 h-[1px] bg-[#c59b58]/50 mt-1.5" />
              </div>
            </div>

            <div className="mt-1 px-2 py-0.5 rounded-none border border-black bg-[#16221e] text-[10px] font-serif text-[#ffd885] whitespace-nowrap shadow-lg flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#ff7b00]" />
              <span>{isAllUnlocked ? '【五德圆满·终局】' : '【终章绘卷】'}</span>
            </div>
          </button>
        </div>

        {/* Render the 5 Inscribed Warring States Tokens from Right to Left: 仁 -> 礼 -> 义 -> 智 -> 信 */}
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
                <div className="flex flex-col items-center">
                  <div className={`w-[1.5px] h-3 relative ${isUnlocked ? 'bg-[#c59b58]' : 'bg-[#7a6850]'}`}>
                    <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full border border-black ${
                      isUnlocked ? 'bg-[#1a120b]' : 'bg-[#121c17]'
                    }`} />
                  </div>

                  {/* Plaque Body with 4-side clean black border */}
                  <div
                    className={`relative w-10 sm:w-12 py-2 sm:py-2.5 px-1 border-2 border-black rounded-none shadow-[0_4px_16px_rgba(0,0,0,0.75)] flex flex-col items-center justify-center transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-b from-[#342417] via-[#241910] to-[#18100a] group-hover:border-[#dfba73] group-hover:shadow-[0_0_18px_rgba(223,186,115,0.45)]'
                        : 'bg-gradient-to-b from-[#221811] via-[#1a120d] to-[#120d09] opacity-90 group-hover:opacity-100 group-hover:border-[#967755]'
                    }`}
                  >
                    {/* Virtue Character Stamp (参考图1战国金文古印) */}
                    <div
                      className="w-5 h-5 mb-1 rounded-none border border-black flex items-center justify-center text-xs font-serif font-black shadow-sm"
                      style={{
                        backgroundColor: isUnlocked ? '#8f2319' : '#3d251d',
                        color: isUnlocked ? '#ffd885' : '#bda391',
                        textShadow: isUnlocked ? '0 1px 2px #000, 0 0 8px rgba(255,216,133,0.6)' : 'none',
                      }}
                    >
                      {loc.name}
                    </div>

                    <div className="font-serif font-bold text-[#f5efe3] text-xs sm:text-sm tracking-[0.2em] leading-snug [writing-mode:vertical-rl] group-hover:text-[#ffd885]">
                      {loc.steleLabel}
                    </div>

                    <div className="text-[8px] sm:text-[9px] font-serif text-[#c2ad97] mt-1 scale-90 tracking-tighter [writing-mode:vertical-rl]">
                      {loc.subtitle}
                    </div>

                    <div className={`w-5 h-[1px] mt-1.5 ${isUnlocked ? 'bg-[#c59b58]/60' : 'bg-[#6b553e]/40'}`} />
                  </div>
                </div>

                {/* State Tag Pill (Top/bottom centered black-gold filigree, no side borders) */}
                <BlackGoldTag className="mt-1 px-2 py-0.5 text-[10px] text-[#f5efe3] whitespace-nowrap shadow-md flex items-center gap-1 group-hover:text-[#ffd885]">
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
                </BlackGoldTag>

              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Footer: Progress & Return to Home Button (Top/bottom black-gold lines, no side borders) */}
      <footer className="relative z-20 w-full pb-3 px-4 sm:px-8 flex flex-col items-center">
        <BlackGoldPlaque className="w-full max-w-lg bg-[#16221e]/95 p-3 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-serif text-[#f5efe3] mb-1.5">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-none bg-[#dfba73] border border-black inline-block" />
              <span className="text-[#a8b8b0]">五德参悟进度:</span>
              <strong className="text-[#ffd885] ml-1">{unlockedCount} / 5</strong>
            </span>
            <span className="text-[#ffd885] text-[11px] font-bold">
              {isAllUnlocked ? '【五德归一 · 炉火纯青】' : '【点选吊牌 · 寻访问道】'}
            </span>
          </div>

          {/* Golden Bronze Meter */}
          <div className="w-full h-2 bg-[#0a0f0d] rounded-none overflow-hidden border border-black p-[1px]">
            <div
              className={`h-full rounded-none transition-all duration-700 ${
                isAllUnlocked
                  ? 'bg-gradient-to-r from-[#2b5947] via-[#dfba73] to-[#fff] shadow-[0_0_10px_rgba(223,186,115,0.8)]'
                  : 'bg-gradient-to-r from-[#20312a] via-[#3b554b] to-[#dfba73]'
              }`}
              style={{ width: `${(unlockedCount / 5) * 100}%` }}
            />
          </div>
        </BlackGoldPlaque>


        <div className="flex items-center justify-between w-full max-w-lg mt-2 text-[11px] font-serif text-[#7bb39d]">
          {onBackToTitle && (
            <BlackGoldButton
              id="map-btn-back-home"
              onClick={() => {
                sound.playClick();
                onBackToTitle();
              }}
              variant="dark"
              size="sm"
            >
              <Home className="w-3.5 h-3.5 text-[#7bf0b5]" />
              <span>返回首页</span>
            </BlackGoldButton>
          )}
          <span className="mx-auto tracking-wider font-medium text-[#7bb39d]">
            ❖ 九州大地因缘际会 · 剑由铁铸 · 心由德成 ❖
          </span>
        </div>
      </footer>
    </div>
  );
};
