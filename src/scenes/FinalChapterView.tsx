import React, { useState } from 'react';
import { sound } from '../audio';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { AncientBlackLinePlaque } from '../components/AncientBlackLinePlaque';
import { BronzeFiligreeButton } from '../components/BronzeFiligreeButton';
import { BlackGoldTag, BlackGoldButton } from '../components/BlackGoldBorder';
import { WarringStatesVirtueToken } from '../components/WarringStatesVirtueToken';

import { VirtueId } from '../types';

/* =========================================================================
 * 🎬【最终章（铸剑终章·五德归一）主交互页面与通关小结专属背景底图配置（参考图1，遮罩55%）】
 * 在代码中写成两个路径变量，均引用干将天地铸炉图（图1），遮罩 55%：
 * 1. FINAL_CHAPTER_MAIN_BG     : 最终章「铸剑终章·五德归一」交互页面底图路径
 * 2. FINAL_CHAPTER_EPILOGUE_BG : 最终章通关小结页面底图路径
 * ========================================================================= */
import finalForgeBg from '../assets/images/final_forge_furnace_bg_1788341192410.jpg';

export const FINAL_CHAPTER_MAIN_BG = finalForgeBg;     // 路径1：最终章主交互页面底图路径（参考图1）
export const FINAL_CHAPTER_EPILOGUE_BG = finalForgeBg; // 路径2：最终章通关小结底图路径（参考图1）

/* =========================================================================
 * 📜【最终章（五德归一）五德之忆弹窗专属背景底图配置位置】
 * ========================================================================= */
import finalMemoryRenBg from '../assets/images/final_memory_ren_bg_1788339387392.jpg';
import finalMemoryLiBg from '../assets/images/final_memory_li_bg_1788339402054.jpg';
import finalMemoryYiBg from '../assets/images/final_memory_yi_bg_1788339420900.jpg';
import finalMemoryZhiBg from '../assets/images/final_memory_zhi_bg_1788339434170.jpg';
import finalMemoryXinBg from '../assets/images/final_memory_xin_bg_1788339446534.jpg';

export const FINAL_MEMORY_REN_BG = finalMemoryRenBg; // 仁
export const FINAL_MEMORY_LI_BG = finalMemoryLiBg;   // 礼
export const FINAL_MEMORY_YI_BG = finalMemoryYiBg;   // 义
export const FINAL_MEMORY_ZHI_BG = finalMemoryZhiBg; // 智
export const FINAL_MEMORY_XIN_BG = finalMemoryXinBg; // 信

interface FinalChapterViewProps {
  onBackToMap: () => void;
}

type Stage = 'OPENING_VIDEO' | 'INTERACTIVE_NODES' | 'ENDING_VIDEO' | 'CONCLUSION';

interface MemoryNode {
  id: VirtueId;
  name: string;
  color: string;
  title: string;
  desc: string;
  bgImage: string;
  themeWord: string;
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
      color: '#5cb87a',
      title: '【仁之回忆】· 恻隐之心',
      desc: '“残剑虽折，可劈柴生暖；剑由心生，锋芒当为救人而发。”',
      bgImage: FINAL_MEMORY_REN_BG,
      themeWord: '救难生暖 · 仁者爱人',
    },
    {
      id: 'LI',
      name: '礼',
      color: '#dfba73',
      title: '【礼之回忆】· 秩序与敬畏',
      desc: '“剑尖向内，收敛锋芒；以礼相待，守住心中的分寸与敬意。”',
      bgImage: FINAL_MEMORY_LI_BG,
      themeWord: '剑尖向内 · 崇礼克己',
    },
    {
      id: 'YI',
      name: '义',
      color: '#e06c53',
      title: '【义之回忆】· 抉择与担当',
      desc: '“见人间不平，仗义拔剑；玉珏共鸣，当为正道挺身而出。”',
      bgImage: FINAL_MEMORY_YI_BG,
      themeWord: '见义挺身 · 浩气长存',
    },
    {
      id: 'ZHI',
      name: '智',
      color: '#4e9dc7',
      title: '【智之回忆】· 洞察与破局',
      desc: '“五式剑理，刚柔互化；不逞匹夫之勇，以智驭剑化解万钧。”',
      bgImage: FINAL_MEMORY_ZHI_BG,
      themeWord: '以智驭剑 · 刚柔破局',
    },
    {
      id: 'XIN',
      name: '信',
      color: '#ffd885',
      title: '【信之回忆】· 承诺与初心',
      desc: '“千仞孤山，言出必践；挂剑长青，诺重千钧立于天地。”',
      bgImage: FINAL_MEMORY_XIN_BG,
      themeWord: '千金一诺 · 孤山挂剑',
    },
  ];

  // 5个按钮按圆环顺时针布局参数 (仁: 顶部 -90°，礼: 右上 -18°，义: 右下 54°，智: 左下 126°，信: 左上 198°)
  const ringAngles = [-90, -18, 54, 126, 198];
  const radiusPercent = 38;

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

  const completedCount = Object.values(activatedNodes).filter(Boolean).length;

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none bg-cover bg-center overflow-hidden bg-[#0c1411]"
      style={{ backgroundImage: `url(${FINAL_CHAPTER_MAIN_BG})` }}
    >
      {/* 55% 遮罩层 (参考图1，遮罩 55%) */}
      <div className="absolute inset-0 bg-[#0a0f0d]/55 backdrop-blur-[0.5px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,32,26,0.15)_0%,rgba(10,15,13,0.75)_100%)] pointer-events-none" />

      {/* STAGE: OPENING VIDEO */}
      {stage === 'OPENING_VIDEO' && (
        <VideoModal
          videoSrc="assets/video/final_opening.mp4"
          title="最终章 · 铸剑终章"
          subtitle="炉火重燃 · 五德归一 · 剑心重铸"
          onComplete={() => setStage('INTERACTIVE_NODES')}
        />
      )}

      {/* STAGE: INTERACTIVE 5 NODES (战国古朴青铜金石令牌圆环排列) */}
      {stage === 'INTERACTIVE_NODES' && (
        <div className="relative z-10 my-auto w-full max-w-2xl flex flex-col items-center animate-fade-in">
          {/* Prompt Banner (4-side clean black line border) */}
          <div className="mb-2 text-center">
            <div className="inline-block px-3 py-0.5 rounded-none bg-[#111916]/95 border border-black text-[#ffd885] text-xs font-serif font-bold tracking-widest mb-1 shadow-sm">
              ❖ 五德归一 · 唤醒进度 {completedCount} / 5 ❖
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              铸 剑 终 章 · 五 德 归 一
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#ffd885] tracking-wider font-medium">
              点击对应战国五德青铜令牌，唤醒沉睡的剑道记忆，重燃天地不灭之炉火
            </p>
          </div>

          {/* Circular Ring Inscription Stage Area */}
          <div className="relative w-full max-w-[400px] sm:max-w-[440px] aspect-square flex items-center justify-center p-2">
            {/* Ambient Circular Guideline Rings */}
            <div className="absolute inset-4 rounded-full border border-dashed border-[#dfba73]/30 pointer-events-none animate-spin-slow" />
            <div className="absolute inset-10 rounded-full border border-black/80 pointer-events-none" />
            <div className="absolute inset-16 rounded-full bg-radial from-[#1e2f27]/40 via-[#101b16]/70 to-transparent pointer-events-none" />

            {/* Central Info Card (4-side clean black framed circle) */}
            <div className="relative z-10 w-44 sm:w-48 h-44 sm:h-48 rounded-full bg-[#111c17]/95 border-2 border-black p-3 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(0,0,0,0.95)]">
              <div className="absolute inset-1 rounded-full border border-[#dfba73]/30 pointer-events-none" />
              
              <div className="text-[11px] sm:text-xs font-serif text-[#dfba73] font-bold tracking-widest mb-1">
                ❖ 集齐五德之忆 ❖
              </div>
              <div className="w-8 h-8 rounded-full bg-[#182a22] border border-black flex items-center justify-center my-0.5 text-base shadow-sm">
                🗡️
              </div>
              <p className="text-[11px] sm:text-xs font-serif text-[#ffd885] font-semibold leading-tight my-0.5">
                炉火重燃 · 剑心重生
              </p>
              <div className="text-[10px] font-mono text-[#7bb39d] mt-1 px-2.5 py-0.5 rounded-none bg-[#0a120e] border border-black font-bold">
                唤醒进度：{completedCount} / 5
              </div>
            </div>

            {/* 5 Clockwise Warring States Virtue Artifact Medallions (参考图1磨刀开刃设计) */}
            {nodes.map((node, index) => {
              const isDone = activatedNodes[node.id];
              const angleDeg = ringAngles[index];
              const angleRad = (angleDeg * Math.PI) / 180;
              const leftPercent = 50 + radiusPercent * Math.cos(angleRad);
              const topPercent = 50 + radiusPercent * Math.sin(angleRad);

              return (
                <div
                  key={node.id}
                  style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="z-20"
                >
                  <WarringStatesVirtueToken
                    virtueId={node.id}
                    character={node.name}
                    isUnlocked={isDone}
                    variant="medallion"
                    onClick={() => handleNodeClick(node)}
                  />
                  {isDone && (
                    <div className="absolute -top-1 -right-1 z-30 bg-[#111916] rounded-full border border-black p-0.5 shadow-md">
                      <CheckCircle2 className="w-4 h-4 text-[#5cb87a]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* POPUP MEMORY CARD (四边黑线勾勒弹窗框) */}
      {activeMemory && (
        <div className="fixed inset-0 z-50 bg-[#0a0f0d]/92 backdrop-blur-md flex items-center justify-center p-4">
          <AncientBlackLinePlaque className="relative w-full max-w-lg bg-[#16221e]/98 p-6 sm:p-7 rounded-none shadow-[0_20px_60px_rgba(0,0,0,0.98)] animate-fade-in flex flex-col items-center text-center">
            {/* Memory Header Tag */}
            <div className="inline-block px-3 py-0.5 rounded-none bg-[#111916] border border-black text-[#ffd885] text-xs font-serif font-bold tracking-widest mb-1.5 shadow-sm">
              ❖ 五德之忆 · 剑道铭刻 ❖
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-3 flex items-center gap-1.5">
              <span className="text-2xl font-black" style={{ color: activeMemory.color }}>{activeMemory.name}</span>
              <span>{activeMemory.title}</span>
            </h3>

            {/* Virtue Specific Illustration Frame */}
            <div className="w-full h-44 sm:h-52 rounded-none border-2 border-black overflow-hidden relative shadow-lg group my-1">
              <img
                src={activeMemory.bgImage}
                alt={activeMemory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1411]/95 via-[#0c1411]/50 to-transparent flex flex-col justify-end p-3 sm:p-4 text-center">
                <div className="text-xs font-serif text-[#7bf0b5] font-bold tracking-wider mb-1">
                  【{activeMemory.themeWord}】
                </div>
                <p className="text-xs sm:text-sm font-serif text-[#ffd885] leading-relaxed font-semibold drop-shadow-md">
                  {activeMemory.desc}
                </p>
              </div>
            </div>

            <div className="text-center pt-4 w-full flex justify-center">
              <BlackGoldButton
                id="memory-btn-confirm"
                variant="gold"
                size="lg"
                onClick={handleCloseMemory}
              >
                <span>铭 记 于 心</span>
              </BlackGoldButton>
            </div>

          </AncientBlackLinePlaque>
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

      {/* STAGE: CONCLUSION - Wuxia Epilogue (去文字弹窗框，保留底部按键，55%遮罩) */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="铸剑终章 · 五德归一"
          badge="❖ 铸剑终章 · 剑心重生 ❖"
          badgeColor="#dfba73"
          title="五德圆融 · 刚柔舞韵"
          accentColor="#ffd885"
          bgImageUrl={FINAL_CHAPTER_EPILOGUE_BG}
          maskOpacity={0.55}
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
