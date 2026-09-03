import React, { useState } from 'react';
import { sound } from '../audio';
import { AssetConfig } from '../types';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { LEVEL_VIDEO_CONFIGS } from '../config/videoConfig';

/* =========================================================================
 * ⚔️【第三关（义 · 烈风之断）开头页与通关小结共用背景底图配置位置】
 * ========================================================================= */
import level3RescueGirlBgImg from '../assets/images/level3_rescue_girl_bg_1788329167324.jpg';
import level3SwordGuardBgImg from '../assets/images/level3_sword_guard_cavity_1788329180078.jpg';

export const LEVEL3_PRELUDE_AND_EPILOGUE_BG = level3RescueGirlBgImg;
export const LEVEL3_EPILOGUE_BG_IMAGE = level3RescueGirlBgImg;
export const LEVEL3_STREET_RAIN_BG = level3RescueGirlBgImg;
export const LEVEL3_SWORD_GUARD_BG = level3SwordGuardBgImg;

import { WuxiaDialogueBox, DialogueLine } from '../components/WuxiaDialogueBox';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { InscriptionStageBox } from '../components/InscriptionStageBox';
import { SlashStanceGraphic } from '../components/SlashStanceGraphic';
import { ThrustStanceGraphic } from '../components/ThrustStanceGraphic';
import { SwordGuardSocketGraphic } from '../components/SwordGuardSocketGraphic';
import { SwordJadePendantGraphic } from '../components/SwordJadePendantGraphic';
import { AncientBlackLinePlaque } from '../components/AncientBlackLinePlaque';
import { WarringStatesVirtueToken } from '../components/WarringStatesVirtueToken';
import { BlackGoldTag, BlackGoldButton } from '../components/BlackGoldBorder';
import { Flame, Swords, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';


interface Level3ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
  levelAssets?: AssetConfig;
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

export const Level3View: React.FC<Level3ViewProps> = ({ onCompleteLevel, onBackToMap, levelAssets }) => {
  const [stage, setStage] = useState<Stage>('PRELUDE');
  const [dialogueStep, setDialogueStep] = useState(0);

  // Slash & Thrust states
  const [hasSlashed, setHasSlashed] = useState(false);
  const [hasThrust, setHasThrust] = useState(false);

  // Jade drag & socket state
  const [isJadeInserted, setIsJadeInserted] = useState(false);

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
    if (levelAssets?.stageImages?.[stage]) {
      return levelAssets.stageImages[stage];
    }
    if (levelAssets?.backgroundImage) {
      return levelAssets.backgroundImage;
    }
    return LEVEL3_PRELUDE_AND_EPILOGUE_BG;
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none bg-cover bg-center overflow-hidden bg-[#0c1411]"
      style={{ backgroundImage: `url(${getStageBg()})` }}
    >
      <div className="absolute inset-0 bg-[#0a0f0d]/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,32,26,0.15)_0%,rgba(10,15,13,0.75)_100%)] pointer-events-none" />

      {/* Top Header Tag (Top/bottom black-gold lines, no side borders) */}
      {stage !== 'CONCLUSION' && stage !== 'DIALOGUE_YULANG' && (
        <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
          <BlackGoldTag className="px-3.5 py-1.5 text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-none bg-[#e06c53] border border-black inline-block" />
            <span className="font-bold">第三关 义 · 烈风之断</span>
          </BlackGoldTag>
          <BlackGoldTag className="text-xs text-[#7bb39d] font-bold">
            {stage === 'SLASH_THRUST' && '试炼一：剑招研习'}
            {stage === 'JADE_SOCKET' && '试炼二：玉魂嵌合'}
            {stage === 'BURST_CHARGE' && '试炼三：浩然正气'}
          </BlackGoldTag>
        </div>
      )}

      {/* STAGE: PRELUDE (Top/bottom black-gold line plaque) */}
      {stage === 'PRELUDE' && (
        <AncientBlackLinePlaque className="relative z-10 my-auto w-full max-w-xl bg-[#16221e]/98 p-6 sm:p-8 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.98)] animate-fade-in flex flex-col justify-between">
          <div className="text-center mb-4">
            <div className="inline-block px-3 py-0.5 rounded-none bg-[#111916] border border-black text-[#ffd885] text-xs font-serif font-bold tracking-widest mb-1.5 shadow-sm">
              ❖ 第三关 义 · 试炼前情 ❖
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest">
              吴市雨巷 · 见危挺身
            </h3>
          </div>

          <div className="w-full h-36 sm:h-44 rounded-none border border-black bg-[#16221e] mb-4 overflow-hidden relative group shadow-md">
            <img
              src={
                levelAssets?.stageImages?.['PRELUDE'] ||
                levelAssets?.backgroundImage ||
                LEVEL3_PRELUDE_AND_EPILOGUE_BG
              }
              alt="第三关前情绘卷"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1411]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="text-xs sm:text-sm md:text-base font-serif text-[#d6e0db] leading-relaxed space-y-2 text-center mb-6 px-1">
            <p>江南细雨如织，吴都街巷繁华之中，几名凶煞恶徒正围逼一名弱小少女。</p>
            <p className="text-[#ffd885] font-semibold">“剑由心生，见人间不平，当挺身而出！”</p>
            <p>干将按剑于前，仗义出手驱散恶徒，救下了这位佩戴奇异玉佩的少女玉琅。</p>
          </div>

          <div className="text-center flex justify-center">
            <BlackGoldButton
              id="lvl3-btn-start"
              variant="gold"
              size="lg"
              onClick={() => {
                sound.playClick();
                setStage('DIALOGUE_YULANG');
              }}
            >
              <span>前 往 问 询</span>
            </BlackGoldButton>
          </div>
        </AncientBlackLinePlaque>
      )}


      {/* STAGE: DIALOGUE WITH YULANG */}
      {stage === 'DIALOGUE_YULANG' && (
        <div className="relative z-20 w-full h-full flex items-end justify-center pb-4 sm:pb-6">
          <WuxiaDialogueBox
            dialogues={yulangDialogues}
            currentLine={yulangDialogues[dialogueStep]}
            currentIndex={dialogueStep}
            totalLines={yulangDialogues.length}
            onNext={handleNextDialogue}
            onSkip={() => setStage('VIDEO1')}
          />
        </div>
      )}

      {/* STAGE: VIDEO 1 */}
      {stage === 'VIDEO1' && (
        <VideoModal
          videoSrc={levelAssets?.introVideo || LEVEL_VIDEO_CONFIGS.LEVEL3.introVideo}
          title={LEVEL_VIDEO_CONFIGS.LEVEL3.introTitle}
          subtitle={LEVEL_VIDEO_CONFIGS.LEVEL3.introSubtitle}
          onComplete={() => setStage('SLASH_THRUST')}
        />
      )}

      {/* STAGE: 1 SLASH & THRUST */}
      {stage === 'SLASH_THRUST' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              以义驭锋 · 研习剑招
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#ffd885] tracking-wider">
              领会【劈】与【刺】之剑势，招式纯熟方显仗义之威
            </p>
          </div>

          <AncientBlackLinePlaque className="w-80 sm:w-[480px] p-6 bg-[#16221e]/98 rounded-none border-2 border-black flex flex-col items-center justify-between">
            <div className="flex items-center justify-center gap-6 sm:gap-10 py-4">
              <button
                id="lvl3-btn-slash"
                onClick={handleSlash}
                className={`w-32 h-36 sm:w-36 sm:h-40 rounded-none border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-lg ${
                  hasSlashed
                    ? 'bg-[#1e382b] border-black text-[#5cb87a]'
                    : 'bg-[#16221e] border-black text-[#dfba73] hover:text-white'
                }`}
              >
                <SlashStanceGraphic active={hasSlashed} />
                <span className="font-serif font-bold text-sm sm:text-base mt-1">
                  {hasSlashed ? '✓ 劈势已成' : '领会【劈】势'}
                </span>
              </button>

              <button
                id="lvl3-btn-thrust"
                onClick={handleThrust}
                className={`w-32 h-36 sm:w-36 sm:h-40 rounded-none border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-lg ${
                  hasThrust
                    ? 'bg-[#1e382b] border-black text-[#5cb87a]'
                    : 'bg-[#16221e] border-black text-[#dfba73] hover:text-white'
                }`}
              >
                <ThrustStanceGraphic active={hasThrust} />
                <span className="font-serif font-bold text-sm sm:text-base mt-1">
                  {hasThrust ? '✓ 刺势已明' : '领会【刺】势'}
                </span>
              </button>
            </div>

            <div className="text-xs text-[#ffd885] font-serif px-3 py-1 rounded-none bg-[#0a120f] border border-black shadow-sm">
              两式兼备后即可进入玉魂嵌合
            </div>
          </AncientBlackLinePlaque>
        </div>
      )}

      {/* STAGE: 2 JADE SOCKET */}
      {stage === 'JADE_SOCKET' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          <div className="mb-2">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              玉魂归位 · 神兵合璧
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#ffd885] tracking-wider">
              点击左下角【剑形玉珏】，将其精准嵌入古剑剑格凹槽之中
            </p>
          </div>

          <AncientBlackLinePlaque className="w-80 sm:w-[480px] h-72 sm:h-80 p-0 bg-[#0c1411] rounded-none border-2 border-black overflow-hidden flex flex-col items-center justify-center">
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center overflow-hidden"
              style={{ backgroundImage: `url(${LEVEL3_SWORD_GUARD_BG})` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <SwordGuardSocketGraphic
                  isInserted={isJadeInserted}
                  onClick={handleInsertJade}
                />
              </div>

              <div className="absolute bottom-2 left-3 sm:left-6 z-30">
                <SwordJadePendantGraphic
                  isInserted={isJadeInserted}
                  onClick={handleInsertJade}
                />
              </div>

              <div className="absolute top-2.5 right-3.5 z-20 px-3 py-1 rounded-none bg-[#111a16]/95 border border-black text-[#ffd885] text-[11px] font-serif tracking-wider shadow-md">
                {isJadeInserted ? '✓ 玉珏已入剑格 · 正气长存' : '👈 点击左下玉珏完成嵌合'}
              </div>
            </div>
          </AncientBlackLinePlaque>

          <p className="text-xs font-serif text-[#ffd885] mt-2 drop-shadow-md">
            {isJadeInserted
              ? '“咔” —— 剑形玉珏与剑格严丝合缝，剑身泛起青翠龙纹光晕！'
              : '点击左下方【剑形玉珏】触发神兵共鸣'}
          </p>
        </div>
      )}

      {/* STAGE: 3 BURST CHARGE */}
      {stage === 'BURST_CHARGE' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              浩然正气 · 全力一击
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#ffd885] tracking-wider">
              持续快速点击下方充能按钮，充满玉魂释放进度！
            </p>
          </div>

          <AncientBlackLinePlaque className="w-80 sm:w-[480px] p-6 bg-[#16221e]/98 rounded-none border-2 border-black flex flex-col items-center justify-between">
            <div className="relative w-28 h-28 mx-auto mb-3 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border border-black transition-all"
                style={{
                  boxShadow: `0 0 ${20 + (chargeProgress / maxCharge) * 40}px rgba(223,186,115,${0.3 + (chargeProgress / maxCharge) * 0.7})`,
                  transform: `scale(${1 + (chargeProgress / maxCharge) * 0.2})`,
                }}
              />
              <div className="w-20 h-20 rounded-full bg-[#111916] border border-black flex flex-col items-center justify-center shadow-inner">
                <Zap className="w-7 h-7 text-[#ffd885] animate-bounce" />
                <span className="text-xs font-serif text-[#ffd885] font-bold mt-0.5">
                  {Math.round((chargeProgress / maxCharge) * 100)}%
                </span>
              </div>
            </div>

            <div className="w-full max-w-xs mx-auto h-4 bg-[#111916] border border-black rounded-none p-0.5 mb-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2b3e36] via-[#dfba73] to-[#f5efe3] rounded-none transition-all duration-75 shadow-[0_0_10px_#dfba73]"
                style={{ width: `${(chargeProgress / maxCharge) * 100}%` }}
              />
            </div>

            <button
              id="lvl3-btn-burst-tap"
              onClick={handleTapBurst}
              disabled={chargeProgress >= maxCharge}
              className="group relative inline-flex items-center justify-center px-10 py-3 rounded-none bg-gradient-to-r from-[#1c2a23] via-[#2f473c] to-[#1c2a23] border-2 border-black hover:border-[#dfba73] text-[#ffd885] hover:text-white font-serif font-bold text-base sm:text-lg tracking-widest shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{chargeProgress >= maxCharge ? '💥 玉魂爆发！浩然一击！' : '⚡ 快速连点释放浩然正气 ⚡'}</span>
            </button>
          </AncientBlackLinePlaque>
        </div>
      )}

      {/* STAGE: VIDEO 2 */}
      {stage === 'VIDEO2' && (
        <VideoModal
          videoSrc={levelAssets?.outroVideo || LEVEL_VIDEO_CONFIGS.LEVEL3.outroVideo}
          title={LEVEL_VIDEO_CONFIGS.LEVEL3.outroTitle}
          subtitle={LEVEL_VIDEO_CONFIGS.LEVEL3.outroSubtitle}
          onComplete={() => setStage('CONCLUSION')}
        />
      )}

      {/* STAGE: CONCLUSION */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="第三关 义 · 烈风之断"
          badge="❖ 通关小结 ❖"
          badgeColor="#dfba73"
          title="当为则为 · 仗义卫道"
          accentColor="#ffd885"
          bgImageUrl={levelAssets?.summaryImage || LEVEL3_EPILOGUE_BG_IMAGE}
          maskOpacity={0.50}
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
        <AncientBlackLinePlaque className="relative z-10 my-auto w-full max-w-md bg-[#16221e]/98 p-8 rounded-none text-center shadow-[0_20px_50px_rgba(0,0,0,0.98)] animate-fade-in flex flex-col items-center">
          <div className="inline-block px-3 py-0.5 rounded-none bg-[#111916] border border-black text-[#ffd885] text-xs font-serif font-bold tracking-widest mb-3 shadow-sm">
            ❖ 终折 · 五德点亮 ❖
          </div>

          <div className="mb-4">
            <WarringStatesVirtueToken
              virtueId="YI"
              character="义"
              name="义"
              isUnlocked={true}
              variant="medallion"
            />
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-widest">
            恭获五德之「义」
          </h3>
          <p className="text-xs sm:text-sm font-serif text-[#ffd885] mb-6">
            “当为则为，拔剑卫道。” 剑心碎片已再补一分！
          </p>

          <BlackGoldButton
            id="lvl3-btn-return-map"
            variant="gold"
            size="lg"
            onClick={() => {
              sound.playClick();
              onCompleteLevel();
            }}
          >
            <span>重 返 九 州 图</span>
          </BlackGoldButton>

        </AncientBlackLinePlaque>
      )}
    </div>
  );
};
