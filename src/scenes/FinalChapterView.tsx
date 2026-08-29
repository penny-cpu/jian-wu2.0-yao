import React, { useState } from 'react';
import { sound } from '../audio';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface FinalChapterViewProps {
  onBackToMap: () => void;
}

type Stage = 'OPENING_VIDEO' | 'INTERACTIVE_NODES' | 'ENDING_VIDEO' | 'CONCLUSION';

interface MemoryNode {
  id: string;
  name: string;
  color: string;
  title: string;
  desc: string;
  imgKey: string;
}

export const FinalChapterView: React.FC<FinalChapterViewProps> = ({ onBackToMap }) => {
  const [stage, setStage] = useState<Stage>('OPENING_VIDEO');
  const [activatedNodes, setActivatedNodes] = useState<Record<string, boolean>>({
    REN: false,
    LI: false,
    YI: false,
    ZHI: false,
    XIN: false,
  });
  const [activeMemory, setActiveMemory] = useState<MemoryNode | null>(null);

  const nodes: MemoryNode[] = [
    {
      id: 'REN',
      name: '仁',
      color: '#00FF88',
      title: '【仁之回忆】· 恻隐之心',
      desc: '“残剑虽折，可劈柴生暖；剑由心生，锋芒当为救人而发。”',
      imgKey: 'memory_ren',
    },
    {
      id: 'LI',
      name: '礼',
      color: '#FF4500',
      title: '【礼之回忆】· 秩序与敬畏',
      desc: '“剑尖向内，收敛锋芒；以礼相待，守住心中的分寸与敬意。”',
      imgKey: 'memory_li',
    },
    {
      id: 'YI',
      name: '义',
      color: '#FFD700',
      title: '【义之回忆】· 抉择与担当',
      desc: '“见人间不平，仗义拔剑；玉珏共鸣，当为正道挺身而出。”',
      imgKey: 'memory_yi',
    },
    {
      id: 'ZHI',
      name: '智',
      color: '#00BFFF',
      title: '【智之回忆】· 洞察与破局',
      desc: '“五式剑理，刚柔互化；不逞匹夫之勇，以智驭剑化解万钧。”',
      imgKey: 'memory_zhi',
    },
    {
      id: 'XIN',
      name: '信',
      color: '#FFFFFF',
      title: '【信之回忆】· 承诺与初心',
      desc: '“千仞孤山，言出必践；挂剑长青，诺重千钧立于天地。”',
      imgKey: 'memory_xin',
    },
  ];

  const handleNodeClick = (node: MemoryNode) => {
    sound.playVirtueChime();
    setActiveMemory(node);
  };

  const handleCloseMemory = () => {
    if (!activeMemory) return;
    sound.playClick();
    const updated = { ...activatedNodes, [activeMemory.id]: true };
    setActivatedNodes(updated);
    setActiveMemory(null);

    // Check if all 5 are completed
    const allDone = Object.values(updated).every(v => v === true);
    if (allDone) {
      setTimeout(() => {
        setStage('ENDING_VIDEO');
      }, 700);
    }
  };

  const getStageBg = () => {
    return getPlaceholderImage('final_chapter_bg', '最终章 · 五德归一', '炉火重燃 · 剑心重生', '#FF4500');
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none bg-cover bg-center overflow-hidden bg-[#0c1411]"
      style={{ backgroundImage: `url(${getStageBg()})` }}
    >
      {/* Dark Overlay with Immersive Bronze Inscription Vignette */}
      <div className="absolute inset-0 bg-[#0a0f0d]/90 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(32,49,42,0.4)_0%,rgba(10,15,13,0.98)_100%)] pointer-events-none" />

      {/* Top Header */}
      {stage !== 'CONCLUSION' && (
        <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#16221e]/95 border border-[#3b554b] text-xs sm:text-sm font-serif text-[#ffd885] shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#d64d3e] shadow-[0_0_8px_#d64d3e] animate-pulse" />
            <span className="font-bold">铸剑终章 · 五德归一</span>
          </div>
          <div className="text-xs font-serif text-[#7bb39d] bg-[#111916]/95 px-3 py-1 rounded-sm border border-[#263730]">
            {stage === 'INTERACTIVE_NODES' &&
              `唤醒进度：${Object.values(activatedNodes).filter(Boolean).length} / 5`}
          </div>
        </div>
      )}

      {/* STAGE: OPENING VIDEO */}
      {stage === 'OPENING_VIDEO' && (
        <VideoModal
          videoSrc="assets/video/final_opening.mp4"
          title="最终章 · 铸剑终章"
          subtitle="炉火重燃 · 五德归一 · 剑心重铸"
          onComplete={() => setStage('INTERACTIVE_NODES')}
        />
      )}

      {/* STAGE: INTERACTIVE 5 NODES */}
      {stage === 'INTERACTIVE_NODES' && (
        <div className="relative z-10 my-auto w-full max-w-3xl flex flex-col items-center text-center">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-1 tracking-wider">
            【 铸 剑 终 章 · 五 德 归 一 】
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mb-8">
            点击对应五德光华，唤醒沉睡的剑道记忆，重燃不灭炉火
          </p>

          {/* 5 Nodes Grid / Circle layout */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8">
            {nodes.map(node => {
              const isDone = activatedNodes[node.id];
              return (
                <button
                  key={node.id}
                  id={`final-node-${node.id}`}
                  onClick={() => handleNodeClick(node)}
                  className={`group relative w-20 h-20 sm:w-24 sm:h-24 rounded-sm border transition-all duration-300 flex flex-col items-center justify-center cursor-pointer shadow-lg active:scale-95 ${
                    isDone
                      ? 'bg-[#16221e]/95 border-[#5cb87a] scale-95 opacity-90'
                      : 'bg-[#16221e]/95 border-[#dfba73] hover:border-[#fff] hover:scale-105 animate-pulse'
                  }`}
                  style={{
                    boxShadow: `0 0 ${isDone ? '15px' : '25px'} ${isDone ? 'rgba(92,184,122,0.35)' : 'rgba(223,186,115,0.25)'}`,
                  }}
                >
                  <span
                    className="text-3xl sm:text-4xl font-serif font-bold"
                    style={{ color: isDone ? '#5cb87a' : '#ffd885' }}
                  >
                    {node.name}
                  </span>
                  <span className="text-[10px] font-serif text-[#7bb39d] mt-1">
                    {isDone ? '已铭记' : '点击唤醒'}
                  </span>

                  {isDone && (
                    <div className="absolute -top-1.5 -right-1.5 bg-[#111916] rounded-full border border-[#5cb87a]">
                      <CheckCircle2 className="w-4 h-4 text-[#5cb87a]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <p className="text-xs font-serif text-[#ffd885]/90">
            ❖ 集齐五德之忆，炉火重燃，即可叩问终局剑心 ❖
          </p>
        </div>
      )}

      {/* POPUP MEMORY CARD */}
      {activeMemory && (
        <div className="fixed inset-0 z-50 bg-[#0a0f0d]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#16221e] border border-[#dfba73] rounded-sm p-6 sm:p-8 shadow-2xl text-center animate-fade-in">
            <h3
              className="text-xl sm:text-2xl font-serif font-bold mb-3 tracking-wide"
              style={{ color: '#ffd885' }}
            >
              {activeMemory.title}
            </h3>

            {/* Visual Image placeholder */}
            <div
              className="w-full h-44 sm:h-48 rounded-sm bg-[#111916] border border-[#2b3e36] flex flex-col items-center justify-center p-4 mb-4 overflow-hidden bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${getPlaceholderImage(
                  activeMemory.imgKey,
                  activeMemory.title,
                  activeMemory.desc,
                  activeMemory.color
                )})`,
              }}
            >
              <div className="absolute inset-0 bg-[#0a0f0d]/75 backdrop-blur-[1px]" />
              <span className="relative z-10 text-4xl mb-2">🗡️</span>
              <p className="relative z-10 text-sm font-serif text-[#f5efe3] italic max-w-sm leading-relaxed text-center">
                {activeMemory.desc}
              </p>
            </div>

            <button
              id="memory-btn-confirm"
              onClick={handleCloseMemory}
              className="px-8 py-3 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base transition-all shadow-lg cursor-pointer active:scale-95"
            >
              铭 记 于 心 ✦
            </button>
          </div>
        </div>
      )}

      {/* STAGE: ENDING VIDEO */}
      {stage === 'ENDING_VIDEO' && (
        <VideoModal
          videoSrc="assets/video/final_ending.mp4"
          title="最终章 · 剑心重生"
          subtitle="五德既成 · 炉火复燃 · 天地清明"
          onComplete={() => setStage('CONCLUSION')}
        />
      )}

      {/* STAGE: CONCLUSION - Wuxia Epilogue */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="铸剑终章 · 五德归一"
          badge="❖ 铸剑终章 · 剑心重生 ❖"
          badgeColor="#dfba73"
          title="五德圆融 · 刚柔舞韵"
          accentColor="#ffd885"
          bgImageKey="final_summary_bg"
          lines={[
            '“仁以持心，礼以循序，义以决断，智以破妄，信以立本。”',
            '五德既成，炉火复燃。',
            '昔日古战场之血色业障，化为今日护世之仁锋。',
            '刚柔交济，神韵内敛，剑心归于天地。',
            '“铸剑非为杀伐，而在天地清明。”',
          ]}
          buttonText="叩拜归隐 · 重返九州图 ✦"
          onComplete={() => {
            sound.playClick();
            onBackToMap();
          }}
        />
      )}
    </div>
  );
};
