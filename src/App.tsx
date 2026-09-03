import React, { useState } from 'react';
import { GameScene, VirtueId, VirtueState } from './types';
import { HUD } from './components/HUD';
import { CharacterModal } from './components/CharacterModal';
import { StoryIntroModal } from './components/StoryIntroModal';
import { GameplayIntroModal } from './components/GameplayIntroModal';
import { JianghuManualModal } from './components/JianghuManualModal';
import { JianghuAtmosphere } from './components/JianghuAtmosphere';
import { SwordSlashCanvas } from './components/SwordSlashCanvas';
import { TitleView } from './scenes/TitleView';
import { StoryPrologueView } from './scenes/StoryPrologueView';
import { MapView } from './scenes/MapView';
import { Level1View } from './scenes/Level1View';
import { Level2View } from './scenes/Level2View';
import { Level3View } from './scenes/Level3View';
import { Level4View } from './scenes/Level4View';
import { Level5View } from './scenes/Level5View';
import { FinalChapterView } from './scenes/FinalChapterView';
import { sound, SoundFXMode } from './audio';

export default function App() {
  const [currentScene, setCurrentScene] = useState<GameScene>('TITLE');
  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isGameplayModalOpen, setIsGameplayModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [soundFXMode, setSoundFXMode] = useState<SoundFXMode>('ALL');

  const [virtues, setVirtues] = useState<Record<VirtueId, VirtueState>>({
    REN: {
      id: 'REN',
      name: '仁',
      title: '雪夜炊烟',
      fullName: '仁 · 雪夜炊烟',
      color: '#5cb87a',
      unlocked: false,
      desc: '以仁御锋，残剑生温',
    },
    LI: {
      id: 'LI',
      name: '礼',
      title: '剑问圣人',
      fullName: '礼 · 剑问圣人',
      color: '#d9533f',
      unlocked: false,
      desc: '收锋守礼，敬意归心',
    },
    YI: {
      id: 'YI',
      name: '义',
      title: '烈风之断',
      fullName: '义 · 烈风之断',
      color: '#e5be65',
      unlocked: false,
      desc: '当为则为，仗剑卫道',
    },
    ZHI: {
      id: 'ZHI',
      name: '智',
      title: '空谷之兽',
      fullName: '智 · 空谷之兽',
      color: '#66a3d2',
      unlocked: false,
      desc: '以智破妄，洞察克敌',
    },
    XIN: {
      id: 'XIN',
      name: '信',
      title: '孤山挂剑',
      fullName: '信 · 孤山挂剑',
      color: '#f5ebd7',
      unlocked: false,
      desc: '履信守诺，挂剑立本',
    },
  });

  const unlockVirtue = (id: VirtueId) => {
    setVirtues(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        unlocked: true,
      },
    }));
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleLevelComplete = (id: VirtueId) => {
    unlockVirtue(id);
    setCurrentScene('MAP');
  };

  return (
    <div className="relative w-screen h-screen bg-[#0a0705] text-[#e6dbca] flex flex-col font-serif overflow-hidden select-none">
      {/* Dynamic Martial Jianghu Falling Bamboo Leaves & Ink Wisps */}
      <JianghuAtmosphere />

      {/* Real-time Interactive Sword Slash Trail & Spark Canvas */}
      <SwordSlashCanvas />

      {/* Background Ink Wash & Bronze Patina Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#111916_0%,#0a0f0d_60%,#050807_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,85,75,0.15)_0%,transparent_50%)] pointer-events-none z-0" />

      {/* Top Wuxia HUD Bar */}
      <HUD
        virtues={virtues}
        currentScene={currentScene}
        onNavigate={setCurrentScene}
        onOpenCharacter={() => setIsCharacterModalOpen(true)}
        onOpenGameplay={() => setIsGameplayModalOpen(true)}
        onOpenManual={() => setIsManualModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        soundFXMode={soundFXMode}
        onSelectSoundMode={setSoundFXMode}
      />

      {/* Main Game Stage Container (800x600 responsive aspect ratio) */}
      <main className="flex-1 relative w-full h-full flex items-center justify-center p-0 sm:p-2 z-10 overflow-hidden">
        <div className="relative w-full h-full max-w-[1024px] max-h-[768px] sm:aspect-[4/3] bg-[#0a0f0d] sm:rounded-sm border-0 sm:border border-[#3b554b] shadow-[0_0_50px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col">
          {currentScene === 'TITLE' && (
            <TitleView
              onStartGame={() => setCurrentScene('PROLOGUE')}
              onOpenCharacter={() => setIsCharacterModalOpen(true)}
              onOpenStory={() => setCurrentScene('PROLOGUE')}
              onOpenGameplay={() => setIsGameplayModalOpen(true)}
              onOpenManual={() => setIsManualModalOpen(true)}
            />
          )}

          {currentScene === 'PROLOGUE' && (
            <StoryPrologueView
              onStartJourney={() => setCurrentScene('MAP')}
              onBackToTitle={() => setCurrentScene('TITLE')}
            />
          )}

          {currentScene === 'MAP' && (
            <MapView
              virtues={virtues}
              onSelectLevel={scene => setCurrentScene(scene)}
              onSelectFinalChapter={() => setCurrentScene('FINAL_CHAPTER')}
              onBackToTitle={() => setCurrentScene('TITLE')}
            />
          )}

          {currentScene === 'LEVEL1' && (
            <Level1View
              onCompleteLevel={() => handleLevelComplete('REN')}
              onBackToMap={() => setCurrentScene('MAP')}
            />
          )}

          {currentScene === 'LEVEL2' && (
            <Level2View
              onCompleteLevel={() => handleLevelComplete('LI')}
              onBackToMap={() => setCurrentScene('MAP')}
            />
          )}

          {currentScene === 'LEVEL3' && (
            <Level3View
              onCompleteLevel={() => handleLevelComplete('YI')}
              onBackToMap={() => setCurrentScene('MAP')}
            />
          )}

          {currentScene === 'LEVEL4' && (
            <Level4View
              onCompleteLevel={() => handleLevelComplete('ZHI')}
              onBackToMap={() => setCurrentScene('MAP')}
            />
          )}

          {currentScene === 'LEVEL5' && (
            <Level5View
              onCompleteLevel={() => handleLevelComplete('XIN')}
              onBackToMap={() => setCurrentScene('MAP')}
            />
          )}

          {currentScene === 'FINAL_CHAPTER' && (
            <FinalChapterView onBackToMap={() => setCurrentScene('MAP')} />
          )}
        </div>
      </main>

      {/* Classical Warring States Bronze Status Footer */}
      <footer className="h-7 sm:h-8 bg-[#0a0f0d]/95 border-t border-[#2b3e36] flex items-center px-3 sm:px-6 justify-between text-xs font-serif text-[#a8b8b0] z-20 select-none shadow-md">
        <div className="flex gap-2 sm:gap-5 items-center">
          {/* Replaced 剑魄心通 with clickable 返回首页 button */}
          <button
            id="footer-btn-back-home"
            onClick={() => {
              sound.playClick();
              setCurrentScene('TITLE');
            }}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#16221e] border border-[#3b554b] hover:border-[#dfba73] text-[#ffd885] hover:text-[#fff] transition-all cursor-pointer shadow-sm active:scale-95 text-xs font-serif"
            title="返回游戏主页面"
          >
            <span className="text-[11px]">⚔️</span>
            <span className="font-bold">返回首页</span>
          </button>

          <span className="flex items-center gap-1.5 text-xs">
            <span className="text-[#b83a2d]">◈</span> 五德点亮：
            <span className="font-bold text-[#ffd885] text-xs sm:text-sm">
              {(Object.values(virtues) as VirtueState[]).filter(v => v.unlocked).length}
            </span>
            <span className="text-[#4e6b5f]">/</span> 5 德圆融
          </span>
          <span className="hidden md:inline text-[#7bb39d] text-[11px]">天地铸炉 · 仁锋止戈</span>
        </div>
        <div className="tracking-widest text-[#ffd885] flex items-center gap-2 font-serif text-xs sm:text-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b83a2d] shadow-[0_0_8px_#b83a2d] animate-pulse" />
          <span>《五德融剑 · 刚柔舞韵》</span>
        </div>
      </footer>

      {/* Character Profile Modal */}
      <CharacterModal
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
      />

      {/* Story & Gameplay Intro Modal */}
      <GameplayIntroModal
        isOpen={isGameplayModalOpen}
        onClose={() => setIsGameplayModalOpen(false)}
      />

      {/* Story & Background Modal */}
      <StoryIntroModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
      />

      {/* Jianghu Sword Manual & Swordsman Realm Modal */}
      <JianghuManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        virtues={virtues}
      />
    </div>
  );
}
