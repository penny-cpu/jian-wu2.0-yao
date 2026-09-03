import React, { useState, useEffect, useRef } from 'react';
import { VirtueState, GameScene, VirtueId } from '../types';
import { sound, SoundFXMode } from '../audio';
import { Volume2, VolumeX, User, BookOpen, Compass, Award, Sparkles, Music, Swords } from 'lucide-react';
import { WarringStatesVirtueToken } from './WarringStatesVirtueToken';
import { BlackGoldButton, BlackGoldTag } from './BlackGoldBorder';

interface HUDProps {
  virtues: Record<VirtueId, VirtueState>;
  currentScene: GameScene;
  onNavigate: (scene: GameScene) => void;
  onOpenCharacter: () => void;
  onOpenGameplay: () => void;
  onOpenManual: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  soundFXMode?: SoundFXMode;
  onSelectSoundMode?: (mode: SoundFXMode) => void;
}

interface GoldenParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  tx: number;
  ty: number;
  opacity: number;
  duration: number;
  delay: number;
  color: string;
}

/**
 * 🏛️【HUD 顶部导航栏】
 * 所有按钮与状态框均遵循【四边黑线勾勒】规范（Clean 4-side Black Lines），
 * 仁、礼、义、智、信徽章采用【战国古朴青铜令牌】风格（参考图1磨刀开刃式样）。
 */
export const HUD: React.FC<HUDProps> = ({
  virtues,
  currentScene,
  onNavigate,
  onOpenCharacter,
  onOpenGameplay,
  onOpenManual,
  isMuted,
  onToggleMute,
  soundFXMode = 'ALL',
  onSelectSoundMode,
}) => {
  const [isSoundMenuOpen, setIsSoundMenuOpen] = useState(false);
  const virtueList = Object.values(virtues) as VirtueState[];
  const unlockedCount = virtueList.filter((v: VirtueState) => v.unlocked).length;

  // Update dynamic BGM progression based on unlocked virtue count
  useEffect(() => {
    sound.setBGMProgressionByCount(unlockedCount, currentScene === 'FINAL');
  }, [unlockedCount, currentScene]);

  // Track newly unlocked virtue to trigger golden particle dispersion & ceremonial toast
  const prevVirtuesRef = useRef<Record<VirtueId, boolean>>({
    REN: virtues.REN?.unlocked || false,
    LI: virtues.LI?.unlocked || false,
    YI: virtues.YI?.unlocked || false,
    ZHI: virtues.ZHI?.unlocked || false,
    XIN: virtues.XIN?.unlocked || false,
  });

  const [activeUnlockToast, setActiveUnlockToast] = useState<{
    id: VirtueId;
    name: string;
    title: string;
    color: string;
  } | null>(null);

  const [particles, setParticles] = useState<GoldenParticle[]>([]);

  useEffect(() => {
    const prev = prevVirtuesRef.current;
    let newlyUnlocked: VirtueState | null = null;

    for (const v of virtueList) {
      if (v.unlocked && !prev[v.id]) {
        newlyUnlocked = v;
        break;
      }
    }

    // Update ref
    prevVirtuesRef.current = {
      REN: virtues.REN?.unlocked || false,
      LI: virtues.LI?.unlocked || false,
      YI: virtues.YI?.unlocked || false,
      ZHI: virtues.ZHI?.unlocked || false,
      XIN: virtues.XIN?.unlocked || false,
    };

    if (newlyUnlocked) {
      const colors = ['#ffd885', '#ffe5a3', '#dfba73', '#ffffff', '#5cb87a', '#f5efe3'];
      const newParticles: GoldenParticle[] = Array.from({ length: 42 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 180;
        return {
          id: Date.now() + i,
          x: 50 + (Math.random() - 0.5) * 30,
          y: 30 + (Math.random() - 0.5) * 20,
          size: 3 + Math.random() * 6,
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist - (30 + Math.random() * 40),
          opacity: 0.8 + Math.random() * 0.2,
          duration: 1.2 + Math.random() * 1.4,
          delay: Math.random() * 0.35,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
      });

      setParticles(newParticles);
      setActiveUnlockToast({
        id: newlyUnlocked.id,
        name: newlyUnlocked.name,
        title: newlyUnlocked.title,
        color: '#dfba73',
      });

      sound.playVirtueChime();
      setTimeout(() => sound.playStarTwinkle(), 250);

      const timer = setTimeout(() => {
        setActiveUnlockToast(null);
        setParticles([]);
      }, 3800);

      return () => clearTimeout(timer);
    }
  }, [virtues]);

  return (
    <header className="relative w-full bg-[#0a0f0d]/95 backdrop-blur-md border-b-2 border-black px-3 sm:px-6 py-2 flex items-center justify-between z-30 select-none shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
      {/* Golden particle dispersion container */}
      {particles.length > 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
          {particles.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full shadow-[0_0_10px_currentColor] animate-ping"
              style={{
                left: `${p.x}%`,
                top: `${p.y}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                color: p.color,
                transform: `translate(${p.tx}px, ${p.ty}px)`,
                transition: `all ${p.duration}s cubic-bezier(0.2, 0.8, 0.2, 1) ${p.delay}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Floating Golden Ceremonial Epiphany Toast on Virtue Unlock */}
      {activeUnlockToast && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
          <div className="relative px-6 py-2.5 rounded-none bg-gradient-to-r from-[#172720] via-[#2a4237] to-[#172720] border-2 border-black shadow-[0_0_40px_rgba(0,0,0,0.95)] text-center flex items-center gap-3">
            <div className="absolute inset-[2px] border border-[#dfba73]/40 pointer-events-none" />

            {/* Glowing Icon */}
            <div className="w-9 h-9 rounded-none border border-black bg-[#111c17] flex items-center justify-center shadow-[0_0_15px_#dfba73]">
              <Sparkles className="w-5 h-5 text-[#ffd885] animate-spin" style={{ animationDuration: '8s' }} />
            </div>

            <div className="text-left">
              <div className="text-xs font-serif text-[#ffd885] tracking-widest font-bold flex items-center gap-1.5">
                <span>✦ 剑心淬炼 · 领悟「{activeUnlockToast.name}」德 ✦</span>
              </div>
              <div className="text-sm sm:text-base font-serif font-bold text-[#f5efe3] tracking-wide mt-0.5">
                {activeUnlockToast.title}
              </div>
            </div>

            <div className="w-7 h-7 rounded-none bg-[#9a2b20] border border-black flex items-center justify-center text-[#faece8] font-serif text-xs font-bold shadow-md">
              {activeUnlockToast.name}
            </div>
          </div>
        </div>
      )}

      {/* Left: Brand / Return to Map & Action Buttons (All using top/bottom centered black-gold lines, no side borders) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {currentScene !== 'TITLE' && currentScene !== 'MAP' ? (
          <BlackGoldButton
            id="hud-btn-back-map"
            variant="gold"
            size="sm"
            onClick={() => {
              sound.playClick();
              onNavigate('MAP');
            }}
          >
            <Compass className="w-3.5 h-3.5 text-[#ffd885]" />
            <span>返回九州图</span>
          </BlackGoldButton>
        ) : (
          <div className="flex items-center gap-2 mr-1">
            <span className="font-serif font-bold text-[#f5efe3] text-sm sm:text-base md:text-lg tracking-widest flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              <span className="w-2 h-2 rotate-45 bg-[#b83a2d] border border-black shadow-[0_0_8px_#b83a2d] inline-block" />
              <span>五德剑道</span>
            </span>
          </div>
        )}

        <BlackGoldButton
          id="hud-btn-manual"
          variant="gold"
          size="sm"
          onClick={() => {
            sound.playClick();
            onOpenManual();
          }}
          title="查看我的闯关"
        >
          <Award className="w-3.5 h-3.5 text-[#ffd885]" />
          <span className="font-bold">我的闯关</span>
        </BlackGoldButton>

        <div className="hidden sm:inline-flex">
          <BlackGoldButton
            id="hud-btn-character"
            variant="dark"
            size="sm"
            onClick={() => {
              sound.playClick();
              onOpenCharacter();
            }}
            title="查看人物志 (干将)"
          >
            <User className="w-3.5 h-3.5 text-[#9ab3a6]" />
            <span>人物志</span>
          </BlackGoldButton>
        </div>

        <div className="hidden sm:inline-flex">
          <BlackGoldButton
            id="hud-btn-gameplay"
            variant="dark"
            size="sm"
            onClick={() => {
              sound.playClick();
              onOpenGameplay();
            }}
            title="查看玩法介绍与试炼指引"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#9ab3a6]" />
            <span>玩法介绍</span>
          </BlackGoldButton>
        </div>
      </div>

      {/* Center: Five Virtues Badges Styled as Warring States Inscribed Bronze Tokens */}
      <div className="hidden lg:flex items-center gap-1 sm:gap-2" id="hud-virtue-badges">
        {virtueList.map(v => (
          <WarringStatesVirtueToken
            key={v.id}
            virtueId={v.id}
            character={v.name}
            name={v.name}
            isUnlocked={v.unlocked}
            variant="badge"
          />
        ))}
      </div>

      {/* Right: Sound FX Mode Selector & Mute & Progress Counter (All using top/bottom centered black-gold lines) */}
      <div className="relative flex items-center gap-1.5 sm:gap-2">
        <BlackGoldTag className="text-xs">
          <span className="text-[#ffd885] font-bold">{unlockedCount}</span>
          <span className="text-[#4e6b5f]">/</span>
          <span>5 德圆满</span>
        </BlackGoldTag>

        {/* Sound FX Mode Setting Button */}
        <div className="relative">
          <BlackGoldButton
            id="hud-btn-sound-mode"
            variant={
              isMuted
                ? 'crimson'
                : soundFXMode === 'GUQIN'
                ? 'jade'
                : soundFXMode === 'METAL'
                ? 'gold'
                : 'gold'
            }
            size="sm"
            onClick={() => {
              sound.playClick();
              setIsSoundMenuOpen(!isSoundMenuOpen);
            }}
            title="全局古琴背景音与交互音效设置"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#e65a4b]" />
            ) : soundFXMode === 'GUQIN' ? (
              <Music className="w-3.5 h-3.5 text-[#7bf0b5]" />
            ) : soundFXMode === 'METAL' ? (
              <Swords className="w-3.5 h-3.5 text-[#ffd885]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#7bb39d]" />
            )}
            <span className="hidden sm:inline">
              {isMuted
                ? '静音'
                : soundFXMode === 'GUQIN'
                ? '古琴音效'
                : soundFXMode === 'METAL'
                ? '金铁剑鸣'
                : '琴剑合奏'}
            </span>
          </BlackGoldButton>


          {/* Sound FX Dropdown Menu (4-side black line frame) */}
          {isSoundMenuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 bg-[#111c17] border-2 border-black rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.95)] p-1.5 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-2 py-1 text-[11px] font-serif text-[#7bb39d] border-b border-black flex items-center justify-between">
                <span>古风音韵模式</span>
                <Sparkles className="w-3 h-3 text-[#dfba73]" />
              </div>

              <button
                id="sound-opt-all"
                onClick={() => {
                  if (onSelectSoundMode) onSelectSoundMode('ALL');
                  sound.setSoundMode('ALL');
                  sound.playGuqinStrum();
                  setIsSoundMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded-none border border-black transition-all flex items-center justify-between text-xs font-serif ${
                  soundFXMode === 'ALL' && !isMuted
                    ? 'bg-[#1f3329] text-[#ffd885]'
                    : 'bg-[#141e1a] text-[#c7beaf] hover:bg-[#1a2822]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-[#ffd885]" />
                  <span>琴剑和鸣（全开）</span>
                </div>
                {soundFXMode === 'ALL' && !isMuted && <span className="text-[10px] text-[#ffd885]">✓</span>}
              </button>

              <button
                id="sound-opt-guqin"
                onClick={() => {
                  if (onSelectSoundMode) onSelectSoundMode('GUQIN');
                  sound.setSoundMode('GUQIN');
                  sound.playGuqinPluckSingle(0);
                  setIsSoundMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded-none border border-black transition-all flex items-center justify-between text-xs font-serif ${
                  soundFXMode === 'GUQIN' && !isMuted
                    ? 'bg-[#1f3329] text-[#7bf0b5]'
                    : 'bg-[#141e1a] text-[#c7beaf] hover:bg-[#1a2822]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-[#7bf0b5]" />
                  <span>古琴幽韵（纯琴）</span>
                </div>
                {soundFXMode === 'GUQIN' && !isMuted && <span className="text-[10px] text-[#7bf0b5]">✓</span>}
              </button>

              <button
                id="sound-opt-metal"
                onClick={() => {
                  if (onSelectSoundMode) onSelectSoundMode('METAL');
                  sound.setSoundMode('METAL');
                  sound.playMetalClashSoft();
                  setIsSoundMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded-none border border-black transition-all flex items-center justify-between text-xs font-serif ${
                  soundFXMode === 'METAL' && !isMuted
                    ? 'bg-[#282216] text-[#ffd885]'
                    : 'bg-[#141e1a] text-[#c7beaf] hover:bg-[#1a2822]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-[#ffd885]" />
                  <span>金铁剑鸣（铿锵）</span>
                </div>
                {soundFXMode === 'METAL' && !isMuted && <span className="text-[10px] text-[#ffd885]">✓</span>}
              </button>

              <button
                id="sound-opt-mute"
                onClick={() => {
                  onToggleMute();
                  setIsSoundMenuOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded-none border border-black transition-all flex items-center justify-between text-xs font-serif ${
                  isMuted
                    ? 'bg-[#291715] text-[#e65a4b]'
                    : 'bg-[#141e1a] text-[#c7beaf] hover:bg-[#1a2822]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <VolumeX className="w-3.5 h-3.5 text-[#e65a4b]" />
                  <span>静音模式</span>
                </div>
                {isMuted && <span className="text-[10px] text-[#e65a4b]">✓</span>}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
