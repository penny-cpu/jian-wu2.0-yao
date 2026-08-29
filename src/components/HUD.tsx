import React, { useState, useEffect, useRef } from 'react';
import { VirtueState, GameScene, VirtueId } from '../types';
import { sound } from '../audio';
import { Volume2, VolumeX, User, BookOpen, Compass, Award, Sparkles } from 'lucide-react';

interface HUDProps {
  virtues: Record<VirtueId, VirtueState>;
  currentScene: GameScene;
  onNavigate: (scene: GameScene) => void;
  onOpenCharacter: () => void;
  onOpenGameplay: () => void;
  onOpenManual: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
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

export const HUD: React.FC<HUDProps> = ({
  virtues,
  currentScene,
  onNavigate,
  onOpenCharacter,
  onOpenGameplay,
  onOpenManual,
  isMuted,
  onToggleMute,
}) => {
  const virtueList = Object.values(virtues) as VirtueState[];
  const unlockedCount = virtueList.filter((v: VirtueState) => v.unlocked).length;

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
      // Trigger golden particle dispersion effect
      const colors = ['#ffd885', '#ffe5a3', '#dfba73', '#ffffff', '#5cb87a', '#f5efe3'];
      const newParticles: GoldenParticle[] = Array.from({ length: 42 }).map((_, i) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random() * 180;
        return {
          id: Date.now() + i,
          x: 50 + (Math.random() - 0.5) * 30, // %
          y: 30 + (Math.random() - 0.5) * 20, // px
          size: 3 + Math.random() * 6,
          tx: Math.cos(angle) * dist,
          ty: Math.sin(angle) * dist - (30 + Math.random() * 40), // float upwards
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
    <header className="relative w-full bg-[#0a0f0d]/95 backdrop-blur-md border-b border-[#3b554b] px-3 sm:px-6 py-2 flex items-center justify-between z-30 select-none shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
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
          <div className="relative px-6 py-2.5 rounded-sm bg-gradient-to-r from-[#172720] via-[#2a4237] to-[#172720] border-2 border-[#dfba73] shadow-[0_0_40px_rgba(223,186,115,0.7),inset_0_0_15px_rgba(223,186,115,0.3)] text-center flex items-center gap-3">
            {/* Corner accents */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#ffd885]" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-[#ffd885]" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-[#ffd885]" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#ffd885]" />

            {/* Glowing Icon */}
            <div className="w-9 h-9 rounded-full bg-[#111c17] border border-[#dfba73] flex items-center justify-center shadow-[0_0_15px_#dfba73]">
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

            <div className="w-7 h-7 rounded-sm bg-[#9a2b20] border border-[#dfba73] flex items-center justify-center text-[#faece8] font-serif text-xs font-bold shadow-md">
              {activeUnlockToast.name}
            </div>
          </div>
        </div>
      )}

      {/* Left: Brand / Title or Return to Map & Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {currentScene !== 'TITLE' && currentScene !== 'MAP' ? (
          <button
            id="hud-btn-back-map"
            onClick={() => {
              sound.playClick();
              onNavigate('MAP');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#ffd885] hover:text-[#fff] transition-all text-xs sm:text-sm font-serif cursor-pointer shadow-md active:scale-95"
          >
            <Compass className="w-3.5 h-3.5 text-[#ffd885]" />
            <span>返回九州图</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 mr-1">
            <span className="font-serif font-bold text-[#f5efe3] text-sm sm:text-base md:text-lg tracking-widest flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              <span className="w-2 h-2 rotate-45 bg-[#b83a2d] shadow-[0_0_8px_#b83a2d] inline-block" />
              <span>五徳剑道</span>
            </span>
          </div>
        )}

        <button
          id="hud-btn-manual"
          onClick={() => {
            sound.playClick();
            onOpenManual();
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-[#1e2e28] border border-[#446558] hover:border-[#dfba73] text-[#ffd885] hover:text-[#fff] transition-all text-xs font-serif cursor-pointer shadow-md active:scale-95"
          title="查看我的闯关"
        >
          <Award className="w-3.5 h-3.5 text-[#ffd885]" />
          <span className="font-bold">我的闯关</span>
        </button>

        <button
          id="hud-btn-character"
          onClick={() => {
            sound.playClick();
            onOpenCharacter();
          }}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#c7beaf] hover:text-[#ffd885] transition-all text-xs font-serif cursor-pointer active:scale-95"
          title="查看人物志 (干将)"
        >
          <User className="w-3.5 h-3.5 text-[#9ab3a6]" />
          <span>人物志</span>
        </button>

        <button
          id="hud-btn-gameplay"
          onClick={() => {
            sound.playClick();
            onOpenGameplay();
          }}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#c7beaf] hover:text-[#ffd885] transition-all text-xs font-serif cursor-pointer active:scale-95"
          title="查看玩法介绍与试炼指引"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#9ab3a6]" />
          <span>玩法介绍</span>
        </button>
      </div>

      {/* Center: Five Virtues Badges Styled as Warring States Inscribed Bronze Seals */}
      <div className="hidden lg:flex items-center gap-1 sm:gap-2" id="hud-virtue-badges">
        {virtueList.map(v => {
          const isUnlocked = v.unlocked;
          const isNewlyUnlocked = activeUnlockToast?.id === v.id;

          return (
            <div
              key={v.id}
              id={`hud-badge-${v.id}`}
              className={`relative px-2.5 sm:px-3 py-1 rounded-sm text-xs sm:text-sm font-serif font-bold transition-all duration-500 flex items-center gap-1 ${
                isNewlyUnlocked
                  ? 'bg-gradient-to-r from-[#2a4237] via-[#3d5e4f] to-[#2a4237] border-2 border-[#ffd885] text-[#ffffff] shadow-[0_0_20px_#ffd885] scale-110'
                  : isUnlocked
                  ? 'bg-[#20312a] border border-[#c5a059] text-[#ffd885] shadow-[0_0_12px_rgba(197,160,89,0.3)]'
                  : 'bg-[#111916]/80 border border-[#263730] text-[#5e776d]'
              }`}
            >
              {isUnlocked && (
                <span className={`text-[10px] leading-none ${isNewlyUnlocked ? 'text-[#ffd885] animate-bounce' : 'text-[#d64d3e]'}`}>
                  ◆
                </span>
              )}
              <span>{v.name}</span>
            </div>
          );
        })}
      </div>

      {/* Right: Sound Mute & Progress Counter */}
      <div className="flex items-center gap-2">
        <div className="text-xs font-serif text-[#b8ab97] flex items-center gap-1.5 bg-[#111916] px-2.5 py-1 rounded-sm border border-[#2b3e36]">
          <span className="text-[#ffd885] font-bold">{unlockedCount}</span>
          <span className="text-[#4e6b5f]">/</span>
          <span>5 德圆满</span>
        </div>

        <button
          id="hud-btn-mute"
          onClick={() => {
            sound.playClick();
            onToggleMute();
          }}
          className="p-1.5 rounded-sm bg-[#16221e] border border-[#3b554b] text-[#b8ab97] hover:text-[#ffd885] hover:border-[#dfba73] transition-all cursor-pointer active:scale-95"
          title={isMuted ? '取消静音' : '静音'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#d64d3e]" /> : <Volume2 className="w-4 h-4 text-[#7bb39d]" />}
        </button>
      </div>
    </header>
  );
};
