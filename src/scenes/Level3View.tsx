import React, { useState } from 'react';
import { sound } from '../audio';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { WuxiaDialogueBox, DialogueLine } from '../components/WuxiaDialogueBox';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { Flame, Swords, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface Level3ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
}

type Stage =
  | 'PRELUDE'
  | 'DIALOGUE_YULANG'
  | 'VIDEO1'
  | 'SLASH_THRUST'
  | 'JADE_SOCKET'
  | 'BURST_CHARGE'
  | 'VIDEO2'
  | 'CONCLUSION'
  | 'REWARD';

export const Level3View: React.FC<Level3ViewProps> = ({ onCompleteLevel, onBackToMap }) => {
  const [stage, setStage] = useState<Stage>('PRELUDE');
  const [dialogueStep, setDialogueStep] = useState(0);

  // Slash & Thrust states
  const [hasSlashed, setHasSlashed] = useState(false);
  const [hasThrust, setHasThrust] = useState(false);

  // Jade drag & socket state
  const [isJadeInserted, setIsJadeInserted] = useState(false);
  const [isDraggingJade, setIsDraggingJade] = useState(false);

  // Burst charge tapping
  const [chargeProgress, setChargeProgress] = useState(0);
  const maxCharge = 25;

  const yulangDialogues: DialogueLine[] = [
    {
      speaker: '干将',
      nameTag: '干将',
      speakerSide: 'right',
      avatarType: 'ganjiang',
      text: '“小姑娘，你是谁？”',
    },
    {
      speaker: '玉琅',
      nameTag: '玉琅',
      speakerSide: 'left',
      avatarType: 'yulang',
      text: '“我叫玉琅。”',
    },
    {
      speaker: '干将',
      nameTag: '干将',
      speakerSide: 'right',
      avatarType: 'ganjiang',
      text: '“那些恶徒为何在街市欺负你？”',
    },
    {
      speaker: '玉琅',
      nameTag: '玉琅',
      speakerSide: 'left',
      avatarType: 'yulang',
      text: '“我叫玉琅，家族三代雕玉。他们趁我父亲不在，想要抢夺我脖子上的玉珏！”',
    },
  ];

  const handleNextDialogue = () => {
    sound.playClick();
    if (dialogueStep < yulangDialogues.length - 1) {
      setDialogueStep(dialogueStep + 1);
    } else {
      setStage('VIDEO1');
    }
  };

  const handleSlash = () => {
    if (hasSlashed) return;
    sound.playSwordSlash();
    setHasSlashed(true);
    if (hasThrust) {
      sound.playVirtueChime();
      setTimeout(() => setStage('JADE_SOCKET'), 900);
    }
  };

  const handleThrust = () => {
    if (hasThrust) return;
    sound.playParry();
    setHasThrust(true);
    if (hasSlashed) {
      sound.playVirtueChime();
      setTimeout(() => setStage('JADE_SOCKET'), 900);
    }
  };

  const handleInsertJade = () => {
    if (isJadeInserted) return;
    sound.playVirtueChime();
    setIsJadeInserted(true);
    setTimeout(() => {
      setStage('BURST_CHARGE');
    }, 1200);
  };

  const handleTapBurst = () => {
    if (chargeProgress >= maxCharge) return;
    const nextVal = chargeProgress + 1;
    setChargeProgress(nextVal);
    sound.playEnergyPulse(nextVal / maxCharge);

    if (nextVal >= maxCharge) {
      sound.playVirtueChime();
      setTimeout(() => {
        setStage('VIDEO2');
      }, 1000);
    }
  };

  const getStageBg = () => {
    switch (stage) {
      case 'SLASH_THRUST':
        return getPlaceholderImage('level3_bg_combat', '第三关：义 · 仗剑退敌', '劈刺并进 · 为不平而出', '#FFD700');
      case 'JADE_SOCKET':
        return getPlaceholderImage('level3_bg_jade', '第三关：义 · 玉魂嵌合', '剑形玉珏 · 剑格激活', '#00FFFF');
      case 'BURST_CHARGE':
        return getPlaceholderImage('level3_bg_release', '第三关：义 · 玉魂爆发', '浩然正气 · 全力一击', '#FFD700');
      default:
        return getPlaceholderImage('level3_bg_combat', '第三关 义 · 烈风之断', '当为则为 · 仗剑卫道', '#FFD700');
    }
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none bg-cover bg-center overflow-hidden bg-[#0c1411]"
      style={{ backgroundImage: `url(${getStageBg()})` }}
    >
      {/* Dark Overlay with Immersive Bronze Inscription Vignette */}
      <div className="absolute inset-0 bg-[#0a0f0d]/90 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(32,49,42,0.4)_0%,rgba(10,15,13,0.98)_100%)] pointer-events-none" />

      {/* Top Header Tag */}
      {stage !== 'CONCLUSION' && stage !== 'DIALOGUE_YULANG' && (
        <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#16221e]/95 border border-[#3b554b] text-xs sm:text-sm font-serif text-[#ffd885] shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#d64d3e] shadow-[0_0_8px_#d64d3e] animate-pulse" />
            <span className="font-bold">第三关 义 · 烈风之断</span>
          </div>
          <div className="text-xs font-serif text-[#7bb39d] bg-[#111916]/95 px-3 py-1 rounded-sm border border-[#263730]">
            {stage === 'SLASH_THRUST' && '试炼一：剑招退敌 (劈/刺)'}
            {stage === 'JADE_SOCKET' && '试炼二：玉魂嵌合'}
            {stage === 'BURST_CHARGE' && `试炼三：浩然聚气 (${chargeProgress}/${maxCharge})`}
          </div>
        </div>
      )}

      {/* STAGE: PRELUDE (PDF Page 6) */}
      {stage === 'PRELUDE' && (
        <div className="relative z-10 my-auto w-full max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.95)] text-center backdrop-blur-md">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-3 tracking-widest font-bold">
            ❖ 试炼前情 · 街市 ❖
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-4 tracking-wider">
            市镇仗义 · 护佑少女玉琅
          </h2>
          <div className="text-sm sm:text-base font-serif text-[#d6e0db] leading-relaxed space-y-3 text-left bg-[#111916] p-4 rounded-sm border border-[#2b3e36] mb-6">
            <p>干将负新剑而行，忽见数名恶霸围住少女玉琅，强夺她胸前玉珏。</p>
            <p>他疾步上前，横身挡在少女身前，手已按上剑柄。这一生，他只习过最基础的“劈”与“刺”，也从未真正向活人出剑。</p>
            <p className="text-[#ffd885] font-semibold font-serif">可望见玉琅眼中的惊惶与无助，干将没有退。这一剑，他决定为不平而出。</p>
          </div>
          <button
            id="lvl3-btn-start-dialogue"
            onClick={() => {
              sound.playClick();
              setStage('DIALOGUE_YULANG');
            }}
            className="px-8 py-3 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base transition-all shadow-lg cursor-pointer active:scale-95"
          >
            与 少女玉琅 对 话 💬
          </button>
        </div>
      )}

      {/* STAGE: DIALOGUE WITH YULANG (Matching Fig 3: RPG Visual Novel Bust Dialogue UI) */}
      {stage === 'DIALOGUE_YULANG' && (
        <div className="absolute inset-0 z-20 flex flex-col justify-between">
          <WuxiaDialogueBox
            dialogues={yulangDialogues}
            currentIndex={dialogueStep}
            onNext={handleNextDialogue}
            onSkip={() => {
              sound.playClick();
              setStage('VIDEO1');
            }}
            headerTag="第三关 义 · 烈风之断"
          />
        </div>
      )}

      {/* STAGE: VIDEO 1 */}
      {stage === 'VIDEO1' && (
        <VideoModal
          videoSrc="assets/video/level3_start.mp4"
          title="第三关 义 · 烈风之断"
          subtitle="当为则为 · 仗剑而出 · 卫护弱小"
          onComplete={() => setStage('SLASH_THRUST')}
        />
      )}

      {/* STAGE: 1 SLASH & THRUST (劈与刺) */}
      {stage === 'SLASH_THRUST' && (
        <div className="relative z-10 my-auto w-full max-w-2xl flex flex-col items-center text-center">
          <div className="bg-[#16221e]/95 border border-[#3b554b] p-4 rounded-sm shadow-xl mb-4 w-full backdrop-blur-md">
            <div className="text-xs text-[#ffd885] font-serif mb-1 font-bold">❖ 试炼第一折 · 当为则为 ❖</div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f5efe3] mb-1">
              分别点击【劈】与【刺】，调出剑招图示，击退恶霸
            </h3>
            <p className="text-xs font-serif text-[#a8b8b0]">
              （图示已按古籍剑谱放大1.5倍端正呈现）
            </p>
          </div>

          {/* Action Buttons Top Bar */}
          <div className="flex gap-4 mb-4">
            <button
              id="lvl3-btn-slash"
              onClick={handleSlash}
              className={`px-8 py-2.5 rounded-sm border font-serif font-bold text-base transition-all cursor-pointer ${
                hasSlashed
                  ? 'bg-[#1f2f29] border-[#5cb87a] text-[#5cb87a] shadow-[0_0_12px_rgba(92,184,122,0.4)]'
                  : 'bg-[#111916] border-[#d64d3e] text-[#d64d3e] hover:bg-[#1f2f29] hover:text-white'
              }`}
            >
              {hasSlashed ? '✓ 劈 式 已 施 展' : '【 劈 】 斩断恶势'}
            </button>

            <button
              id="lvl3-btn-thrust"
              onClick={handleThrust}
              className={`px-8 py-2.5 rounded-sm border font-serif font-bold text-base transition-all cursor-pointer ${
                hasThrust
                  ? 'bg-[#1f2f29] border-[#5cb87a] text-[#5cb87a] shadow-[0_0_12px_rgba(92,184,122,0.4)]'
                  : 'bg-[#111916] border-[#dfba73] text-[#ffd885] hover:bg-[#1f2f29] hover:text-white'
              }`}
            >
              {hasThrust ? '✓ 刺 式 已 施 展' : '【 刺 】 直指退敌'}
            </button>
          </div>

          {/* Visual Canvas Showing 1.5x Stance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Slash Stance Display */}
            <div
              className={`h-48 sm:h-56 rounded-sm border flex flex-col items-center justify-center p-4 transition-all duration-500 overflow-hidden ${
                hasSlashed
                  ? 'bg-[#16221e] border-[#d64d3e] shadow-[0_0_20px_rgba(214,77,62,0.3)]'
                  : 'bg-[#111916] border-[#2b3e36] opacity-40'
              }`}
            >
              <div className="text-4xl mb-2">⚔️</div>
              <div className="text-lg font-serif font-bold text-[#d64d3e]">劈式 · 刚劲下斩</div>
              <div className="text-xs font-serif text-[#d6e0db] mt-1 text-center">
                “势如惊雷，力沉万钧，破除不义之阻”
              </div>
            </div>

            {/* Thrust Stance Display */}
            <div
              className={`h-48 sm:h-56 rounded-sm border flex flex-col items-center justify-center p-4 transition-all duration-500 overflow-hidden ${
                hasThrust
                  ? 'bg-[#16221e] border-[#dfba73] shadow-[0_0_20px_rgba(223,186,115,0.3)]'
                  : 'bg-[#111916] border-[#2b3e36] opacity-40'
              }`}
            >
              <div className="text-4xl mb-2">🗡️</div>
              <div className="text-lg font-serif font-bold text-[#ffd885]">刺式 · 疾若电闪</div>
              <div className="text-xs font-serif text-[#d6e0db] mt-1 text-center">
                “精准直击，分寸必争，逼退群凶”
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE: 2 JADE SOCKET (玉魂嵌合) */}
      {stage === 'JADE_SOCKET' && (
        <div className="relative z-10 my-auto w-full max-w-xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-2xl text-center backdrop-blur-md">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-2 font-bold">
            ❖ 试炼第二折 · 玉魂嵌合 ❖
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wider">
            玉珏归槽 · 剑格共鸣
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mb-6">
            玉琅奉上护身玉珏：请点击“剑形玉珏”，将其嵌入剑格微光凹槽处！
          </p>

          {/* Interactive Socket Area */}
          <div className="relative w-full h-52 bg-[#111916] border border-[#3b554b] rounded-sm flex items-center justify-between px-8 sm:px-12 mb-6 overflow-hidden">
            {/* Left: Draggable / Clickable Jade Item */}
            <div className="flex flex-col items-center">
              <button
                id="lvl3-btn-jade-source"
                onClick={handleInsertJade}
                disabled={isJadeInserted}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-sm border flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                  isJadeInserted
                    ? 'opacity-30 border-[#2b3e36] scale-90'
                    : 'bg-[#1f2f29] border-[#5cb87a] shadow-[0_0_20px_rgba(92,184,122,0.4)] animate-bounce hover:scale-105'
                }`}
              >
                <span className="text-3xl sm:text-4xl">💠</span>
                <span className="text-[10px] sm:text-xs font-serif text-[#5cb87a] mt-1 font-bold">剑形玉珏</span>
              </button>
            </div>

            {/* Middle Connecting Arrow */}
            <div className="text-xl text-[#ffd885] animate-pulse">➔ ➔</div>

            {/* Right: Target Socket */}
            <div className="flex flex-col items-center">
              <button
                id="lvl3-btn-jade-target"
                onClick={handleInsertJade}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-sm border flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                  isJadeInserted
                    ? 'bg-[#1f2f29] border-[#5cb87a] shadow-[0_0_25px_rgba(92,184,122,0.5)]'
                    : 'bg-[#111916] border-[#dfba73] border-dashed shadow-[0_0_15px_rgba(223,186,115,0.3)] animate-pulse'
                }`}
              >
                {isJadeInserted ? (
                  <>
                    <span className="text-3xl text-[#5cb87a]">✨</span>
                    <span className="text-[10px] font-serif text-[#5cb87a] mt-1 font-bold">已嵌合激活</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl text-[#7bb39d]">🕳️</span>
                    <span className="text-[10px] font-serif text-[#ffd885] mt-1">剑格凹槽</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-xs font-serif text-[#ffd885]">
            {isJadeInserted ? '“咔” —— 玉珏已成功激活！正气注入剑身！' : '点击玉珏将其嵌入剑格凹槽'}
          </p>
        </div>
      )}

      {/* STAGE: 3 BURST CHARGE (释放玉魂之力) */}
      {stage === 'BURST_CHARGE' && (
        <div className="relative z-10 my-auto w-full max-w-xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-2xl text-center backdrop-blur-md">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-2 font-bold">
            ❖ 试炼第三折 · 释放玉魂之力 ❖
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wider">
            浩然正气 · 全力一击
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mb-6">
            持续快速点击下方充能按钮，充满玉魂释放进度！
          </p>

          {/* Energy Core Visual with Pulse */}
          <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
            {/* Outer pulsating ring whose intensity increases with progress */}
            <div
              className="absolute inset-0 rounded-full border border-[#dfba73] transition-all"
              style={{
                boxShadow: `0 0 ${20 + (chargeProgress / maxCharge) * 40}px rgba(223,186,115,${0.3 + (chargeProgress / maxCharge) * 0.7})`,
                transform: `scale(${1 + (chargeProgress / maxCharge) * 0.2})`,
              }}
            />
            <div className="w-24 h-24 rounded-full bg-[#111916] border border-[#dfba73] flex flex-col items-center justify-center shadow-inner">
              <Zap className="w-8 h-8 text-[#ffd885] animate-bounce" />
              <span className="text-xs font-serif text-[#ffd885] font-bold mt-0.5">
                {Math.round((chargeProgress / maxCharge) * 100)}%
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-5 bg-[#111916] border border-[#2b3e36] rounded-sm p-0.5 mb-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2b3e36] via-[#dfba73] to-[#f5efe3] rounded-sm transition-all duration-75 shadow-[0_0_10px_#dfba73]"
              style={{ width: `${(chargeProgress / maxCharge) * 100}%` }}
            />
          </div>

          {/* Tap Button */}
          <button
            id="lvl3-btn-burst-tap"
            onClick={handleTapBurst}
            disabled={chargeProgress >= maxCharge}
            className="w-full py-4 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white hover:scale-105 active:scale-95 transition-all text-lg font-serif font-bold shadow-[0_0_20px_rgba(223,186,115,0.35)] cursor-pointer"
          >
            {chargeProgress >= maxCharge ? '💥 玉魂爆发！浩然一击！' : '⚡ 快速连点释放浩然正气 ⚡'}
          </button>
        </div>
      )}

      {/* STAGE: VIDEO 2 */}
      {stage === 'VIDEO2' && (
        <VideoModal
          videoSrc="assets/video/level3_end.mp4"
          title="第三关 义 · 浩然正气"
          subtitle="仗义执言 · 拔剑卫道 · 善念长存"
          onComplete={() => setStage('CONCLUSION')}
        />
      )}

      {/* STAGE: CONCLUSION - Wuxia Epilogue */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="第三关 义 · 烈风之断"
          badge="❖ 通关小结 ❖"
          badgeColor="#dfba73"
          title="当为则为 · 仗义卫道"
          accentColor="#ffd885"
          bgImageKey="level3_bg_summary"
          lines={[
            '恶霸散退，玉琅安然无恙。',
            '“剑不向无辜之人，但见人间不平，当仗义而出。”',
            '“为守护而锋，方为君子之义。”',
            '干将望着手中重生的青锋，胸中浩然之气勃发。',
            '以正义之心拔剑，天下宵小尽折服。',
            '他终于明白——剑有锋芒，当为义而鸣。',
          ]}
          buttonText="领悟「义」之剑德 ✦"
          onComplete={() => {
            sound.playVirtueChime();
            setStage('REWARD');
          }}
        />
      )}

      {/* STAGE: REWARD */}
      {stage === 'REWARD' && (
        <div className="relative z-10 my-auto w-full max-w-md bg-[#16221e]/95 border border-[#dfba73] rounded-sm p-8 shadow-[0_0_35px_rgba(223,186,115,0.3)] text-center backdrop-blur-md animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-sm bg-[#111916] border border-[#dfba73] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(223,186,115,0.4)]">
            <span className="text-4xl font-serif font-extrabold text-[#ffd885]">义</span>
          </div>

          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-2 font-bold">
            ❖ 终折 · 五德点亮 ❖
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wider">
            恭喜少侠，获得五德之「义」！
          </h2>

          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mb-6">
            “当为则为，拔剑卫道。” 剑心碎片已再补一分！
          </p>

          <button
            id="lvl3-btn-return-map"
            onClick={() => {
              sound.playClick();
              onCompleteLevel();
            }}
            className="w-full py-3.5 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white font-serif font-bold text-base transition-all shadow-lg cursor-pointer active:scale-95"
          >
            重 返 九 州 图 🗺️
          </button>
        </div>
      )}
    </div>
  );
};
