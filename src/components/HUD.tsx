import React from 'react';
import { VirtueState, GameScene, VirtueId } from '../types';
import { sound } from '../audio';
import { Volume2, VolumeX, User, BookOpen, Compass, Award } from 'lucide-react';

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

  return (
    <header className="w-full bg-[#0a0f0d]/95 backdrop-blur-md border-b border-[#3b554b] px-3 sm:px-6 py-2 flex items-center justify-between z-30 select-none shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
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
          return (
            <div
              key={v.id}
              id={`hud-badge-${v.id}`}
              className={`relative px-2.5 sm:px-3 py-1 rounded-sm text-xs sm:text-sm font-serif font-bold transition-all duration-500 flex items-center gap-1 ${
                isUnlocked
                  ? 'bg-[#20312a] border border-[#c5a059] text-[#ffd885] shadow-[0_0_12px_rgba(197,160,89,0.3)]'
                  : 'bg-[#111916]/80 border border-[#263730] text-[#5e776d]'
              }`}
            >
              {isUnlocked && (
                <span className="text-[10px] leading-none text-[#d64d3e]">
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

