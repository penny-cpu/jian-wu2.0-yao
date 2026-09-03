import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../audio';
import { AssetConfig } from '../types';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { LEVEL_VIDEO_CONFIGS } from '../config/videoConfig';

/* =========================================================================
 * 🌲【第二关（礼 · 剑问圣人）各交互阶段背景底图配置位置】
 * ========================================================================= */
import level2ParryStandoffImg from '../assets/images/level2_parry_standoff_1788327775188.jpg';
import level2DialogueConfuciusImg from '../assets/images/level2_dialogue_confucius_1788327793672.jpg';
import level2ReceiveCeremonyImg from '../assets/images/level2_receive_ceremony_1788327806522.jpg';

export const LEVEL2_STAGE_PARRY_BG = level2ParryStandoffImg;
export const LEVEL2_STAGE_DIALOGUE_BG = level2DialogueConfuciusImg;
export const LEVEL2_STAGE_RECEIVE_BG = level2ReceiveCeremonyImg;
export const LEVEL2_CYPRESS_WILDERNESS_BG = level2ParryStandoffImg;
export const LEVEL2_EPILOGUE_BG_IMAGE = level2ParryStandoffImg;

import { WuxiaDialogueBox, DialogueLine } from '../components/WuxiaDialogueBox';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { InscriptionStageBox } from '../components/InscriptionStageBox';
import { ParrySwordGraphic } from '../components/ParrySwordGraphic';
import { UnsheatheSwordEffect } from '../components/UnsheatheSwordEffect';
import { AncientBlackLinePlaque } from '../components/AncientBlackLinePlaque';
import { WarringStatesVirtueToken } from '../components/WarringStatesVirtueToken';
import { BlackGoldTag, BlackGoldButton } from '../components/BlackGoldBorder';
import { Shield, Sparkles, Hand, ArrowRight, CheckCircle2, Swords } from 'lucide-react';


interface Level2ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
  levelAssets?: AssetConfig;
}

type Stage =
  | 'PRELUDE'
  | 'VIDEO1'
  | 'PARRY'
  | 'DIALOGUE'
  | 'RECEIVE_HANDS'
  | 'SALUTE_SLIDER'
  | 'VIDEO2'
  | 'CONCLUSION'
  | 'REWARD';

interface FallingSword {
  id: number;
  x: number;
  y: number;
  speed: number;
}

export const Level2View: React.FC<Level2ViewProps> = ({ onCompleteLevel, onBackToMap, levelAssets }) => {
  const [stage, setStage] = useState<Stage>('PRELUDE');
  const [parryCount, setParryCount] = useState(0);
  const targetParry = 8;
  const [fallingSwords, setFallingSwords] = useState<FallingSword[]>([]);
  const nextSwordId = useRef(1);
  const [showUnsheatheEffect, setShowUnsheatheEffect] = useState(false);

  // Dialogue steps
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // Hands state
  const [leftHand, setLeftHand] = useState(false);
  const [rightHand, setRightHand] = useState(false);

  // Slider state
  const [sliderValue, setSliderValue] = useState(20);
  const [sliderSuccess, setSliderSuccess] = useState(false);

  useEffect(() => {
    if (stage === 'PARRY') {
      setShowUnsheatheEffect(true);
      sound.playVirtueChime();
    }
  }, [stage]);

  // Parry game loop
  useEffect(() => {
    if (stage !== 'PARRY') return;

    const spawnInterval = setInterval(() => {
      setFallingSwords(prev => {
        if (prev.length >= 4) return prev;
        const newSword: FallingSword = {
          id: nextSwordId.current++,
          x: 15 + Math.random() * 70,
          y: -10,
          speed: 0.8 + Math.random() * 0.5,
        };
        return [...prev, newSword];
      });
    }, 900);

    const moveInterval = setInterval(() => {
      setFallingSwords(prev =>
        prev
          .map(s => ({ ...s, y: s.y + s.speed }))
          .filter(s => s.y < 105)
      );
    }, 40);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [stage]);

  const handleParrySword = (id: number) => {
    sound.playParry();
    setFallingSwords(prev => prev.filter(s => s.id !== id));
    const nextCount = parryCount + 1;
    setParryCount(nextCount);

    if (nextCount >= targetParry) {
      sound.playVirtueChime();
      setTimeout(() => {
        setStage('DIALOGUE');
      }, 700);
    }
  };

  const dialogues: DialogueLine[] = [
    {
      speaker: '旁白',
      nameTag: '古柏旁白',
      speakerSide: 'narrator',
      tagColor: '#5c4532',
      text: '剑势方歇，林间忽然传来一道温厚平静的声音：“由，住手。” 子路闻声收剑。古柏之下，一位长者缓步走出。来者，正是孔子。',
    },
    {
      speaker: '孔子',
      nameTag: '孔子',
      speakerSide: 'right',
      tagColor: '#8c2b18',
      text: '“忠以为质，仁以为卫，何持剑乎？”',
    },
    {
      speaker: '子路',
      nameTag: '子路',
      speakerSide: 'right',
      tagColor: '#204d6b',
      text: '“师父所言极是。若以忠诚立身，以仁爱自守，又何必持剑防身？方才多有冒犯。先生既明持剑之心，此剑，便赠予先生。”',
    },
    {
      speaker: '子路',
      nameTag: '子路',
      speakerSide: 'right',
      tagColor: '#204d6b',
      text: '“愿先生持此剑，践君子之仁，守君子之道。”',
    },
    {
      speaker: '干将',
      nameTag: '干将',
      speakerSide: 'left',
      tagColor: '#9c4d18',
      text: '“承君之意。” 干将肃然正身，依礼接剑。',
    },
  ];

  const handleNextDialogue = () => {
    sound.playClick();
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setStage('RECEIVE_HANDS');
    }
  };

  const checkBothHands = (left: boolean, right: boolean) => {
    if (left && right) {
      sound.playVirtueChime();
      setTimeout(() => {
        setStage('SALUTE_SLIDER');
      }, 600);
    }
  };

  const handleLeftHand = () => {
    if (leftHand) return;
    sound.playClick();
    setLeftHand(true);
    checkBothHands(true, rightHand);
  };

  const handleRightHand = () => {
    if (rightHand) return;
    sound.playClick();
    setRightHand(true);
    checkBothHands(leftHand, true);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderValue(val);
    if (val >= 80 && val <= 95 && !sliderSuccess) {
      setSliderSuccess(true);
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
    switch (stage) {
      case 'PRELUDE':
      case 'VIDEO1':
      case 'PARRY':
        return LEVEL2_STAGE_PARRY_BG;
      case 'DIALOGUE':
        return LEVEL2_STAGE_DIALOGUE_BG;
      case 'RECEIVE_HANDS':
      case 'SALUTE_SLIDER':
        return LEVEL2_STAGE_RECEIVE_BG;
      case 'CONCLUSION':
      case 'REWARD':
      default:
        return LEVEL2_STAGE_PARRY_BG;
    }
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none bg-cover bg-center overflow-hidden bg-[#0c1411]"
      style={{ backgroundImage: `url(${getStageBg()})` }}
    >
      <div className="absolute inset-0 bg-[#0a0f0d]/25 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,32,26,0.1)_0%,rgba(10,15,13,0.55)_100%)] pointer-events-none" />

      {/* 拔剑相向剑气出鞘震撼动画特效 */}
      {showUnsheatheEffect && (
        <UnsheatheSwordEffect
          active={showUnsheatheEffect}
          onAnimationEnd={() => setShowUnsheatheEffect(false)}
        />
      )}

      {/* Top Header Tag (Top/bottom black-gold lines, no side borders) */}
      {stage !== 'CONCLUSION' && stage !== 'DIALOGUE' && (
        <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
          <BlackGoldTag className="px-3.5 py-1.5 text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-none bg-[#dfba73] border border-black inline-block" />
            <span className="font-bold">第二关 礼 · 剑问圣人</span>
          </BlackGoldTag>
          <BlackGoldTag className="text-xs text-[#7bb39d] font-bold">
            {stage === 'PARRY' && `试炼一：凝神格挡 (${parryCount}/${targetParry})`}
            {stage === 'DIALOGUE' && '试炼二：圣门问答'}
            {stage === 'RECEIVE_HANDS' && '试炼三：双手接剑'}
            {stage === 'SALUTE_SLIDER' && '试炼三：剑尖归心'}
          </BlackGoldTag>
        </div>
      )}


      {/* STAGE: PRELUDE (4-side clean black line frame) */}
      {stage === 'PRELUDE' && (
        <AncientBlackLinePlaque className="relative z-10 my-auto w-full max-w-xl bg-[#16221e]/98 p-6 sm:p-8 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.98)] animate-fade-in flex flex-col justify-between">
          <div className="text-center mb-4">
            <div className="inline-block px-3 py-0.5 rounded-none bg-[#111916] border border-black text-[#ffd885] text-xs font-serif font-bold tracking-widest mb-1.5 shadow-sm">
              ❖ 第二关 礼 · 试炼前情 ❖
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest">
              古柏荒野 · 拔剑相问
            </h3>
          </div>

          <div className="w-full h-36 sm:h-44 rounded-none border-2 border-black bg-[#16221e] mb-4 overflow-hidden relative group shadow-md">
            <img
              src={
                levelAssets?.stageImages?.['PRELUDE'] ||
                levelAssets?.backgroundImage ||
                getPlaceholderImage('level2_bg_parry', '第二关：礼 · 剑问圣人', '古柏荒野 · 圣人论道', '#d64d3e')
              }
              alt="第二关前情绘卷"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1411]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="text-xs sm:text-sm md:text-base font-serif text-[#d6e0db] leading-relaxed space-y-2 text-center mb-6 px-1">
            <p>古柏参天荒野寂寂，干将行至林间，忽遇孔门弟子子路佩剑拦道。</p>
            <p className="text-[#ffd885] font-semibold">子路拔剑端正相问：“古之君子，固以剑自卫乎？”</p>
            <p>剑锋突至，干将仓促格挡退让，一场剑与礼的叩问由此展开。</p>
          </div>

          <div className="text-center flex justify-center">
            <BlackGoldButton
              id="lvl2-btn-start"
              variant="gold"
              size="lg"
              onClick={() => {
                sound.playClick();
                setStage('VIDEO1');
              }}
            >
              <span>开 始 试 炼</span>
            </BlackGoldButton>
          </div>

        </AncientBlackLinePlaque>
      )}

      {/* STAGE: VIDEO 1 */}
      {stage === 'VIDEO1' && (
        <VideoModal
          videoSrc={levelAssets?.introVideo || LEVEL_VIDEO_CONFIGS.LEVEL2.introVideo}
          title={LEVEL_VIDEO_CONFIGS.LEVEL2.introTitle}
          subtitle={LEVEL_VIDEO_CONFIGS.LEVEL2.introSubtitle}
          onComplete={() => setStage('PARRY')}
        />
      )}

      {/* STAGE: PARRY SWORDS */}
      {stage === 'PARRY' && (
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">
          <div className="text-center mt-2 bg-[#111916]/90 px-5 py-2 rounded-none border border-black shadow-md backdrop-blur-sm">
            <p className="text-xs sm:text-sm font-serif text-[#ffd885] font-semibold">
              点击劈落而下的剑影，以守代攻完成格挡（{parryCount} / {targetParry}）
            </p>
          </div>

          <div className="relative w-full max-w-2xl h-[420px] sm:h-[480px] overflow-hidden my-auto">
            {fallingSwords.map(s => (
              <div
                key={s.id}
                style={{
                  position: 'absolute',
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => handleParrySword(s.id)}
                className="cursor-pointer group select-none"
              >
                <ParrySwordGraphic />
              </div>
            ))}
          </div>

          <div className="w-full max-w-md bg-[#16221e]/90 p-2 rounded-none border border-black mb-2">
            <div className="flex justify-between text-xs font-serif text-[#f5efe3] mb-1">
              <span>格挡进度</span>
              <span className="text-[#ffd885] font-bold">{parryCount} / {targetParry}</span>
            </div>
            <div className="w-full h-2 bg-[#0c1411] rounded-none overflow-hidden border border-black">
              <div
                className="h-full bg-gradient-to-r from-[#2b5947] to-[#dfba73] transition-all duration-300"
                style={{ width: `${(parryCount / targetParry) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* STAGE: DIALOGUE */}
      {stage === 'DIALOGUE' && (
        <div className="relative z-20 w-full h-full flex items-end justify-center pb-4 sm:pb-6">
          <WuxiaDialogueBox
            dialogues={dialogues}
            currentLine={dialogues[dialogueIndex]}
            currentIndex={dialogueIndex}
            totalLines={dialogues.length}
            onNext={handleNextDialogue}
            onSkip={() => setStage('RECEIVE_HANDS')}
          />
        </div>
      )}

      {/* STAGE: RECEIVE HANDS */}
      {stage === 'RECEIVE_HANDS' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              双手持敬 · 依礼接剑
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#ffd885] tracking-wider">
              以双手承接赠剑，表示对赠剑者与剑道之崇敬
            </p>
          </div>

          <AncientBlackLinePlaque className="w-80 sm:w-[480px] p-6 bg-[#16221e]/98 rounded-none border-2 border-black flex flex-col items-center justify-between">
            <div className="flex flex-col items-center gap-6 py-4">
              <div className="flex items-center justify-center gap-6 sm:gap-10">
                <button
                  id="lvl2-btn-left-hand"
                  onClick={handleLeftHand}
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-none border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-lg ${
                    leftHand
                      ? 'bg-[#1e382b] border-black text-[#5cb87a]'
                      : 'bg-[#16221e] border-black text-[#dfba73] hover:text-white'
                  }`}
                >
                  <Hand className="w-8 h-8 -rotate-[20deg]" />
                  <span className="font-serif font-bold text-sm sm:text-base">
                    {leftHand ? '✓ 左手端出' : '伸出左手 🖐️'}
                  </span>
                </button>

                <button
                  id="lvl2-btn-right-hand"
                  onClick={handleRightHand}
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-none border-2 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-lg ${
                    rightHand
                      ? 'bg-[#1e382b] border-black text-[#5cb87a]'
                      : 'bg-[#16221e] border-black text-[#dfba73] hover:text-white'
                  }`}
                >
                  <Hand className="w-8 h-8 rotate-[20deg]" />
                  <span className="font-serif font-bold text-sm sm:text-base">
                    {rightHand ? '✓ 右手端出' : '伸出右手 🖐️'}
                  </span>
                </button>
              </div>

              <div className="text-xs text-[#ffd885] font-serif px-3 py-1 rounded-none bg-[#0a120f] border border-black shadow-sm">
                双手齐备方显敬肃，双手点击后即可进入剑尖归心校准
              </div>
            </div>
          </AncientBlackLinePlaque>
        </div>
      )}

      {/* STAGE: SALUTE SLIDER */}
      {stage === 'SALUTE_SLIDER' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              剑尖归心 · 敛锋守度
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#ffd885] tracking-wider">
              拖动金色剑柄滑块，使剑尖缓缓向内归心，完成行剑礼校准
            </p>
          </div>

          <AncientBlackLinePlaque className="w-80 sm:w-[480px] p-6 bg-[#16221e]/98 rounded-none border-2 border-black flex flex-col items-center justify-between">
            <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
              <div
                className="transition-transform duration-100 flex items-center"
                style={{
                  transform: `rotate(${-(sliderValue - 50) * 0.9}deg)`,
                }}
              >
                <div className="w-12 h-3 bg-[#2b3e36] rounded-none border border-black" />
                <div className="w-3 h-8 bg-[#dfba73] border border-black" />
                <div className="w-36 h-4 bg-gradient-to-r from-[#dfba73] to-[#f5efe3] shadow-[0_0_15px_rgba(223,186,115,0.5)] border-y border-black" />
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[16px] border-l-[#f5efe3]" />
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-serif text-[#ffd885] flex items-center gap-1 border border-black px-2.5 py-1 rounded-none bg-[#16221e]/95">
                <span>【 归心正位 】</span>
              </div>
            </div>

            <div className="w-full px-4 mt-2">
              <input
                id="lvl2-salute-slider"
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-3 bg-[#111916] border border-black appearance-none cursor-pointer accent-[#dfba73]"
              />
              <div className="flex justify-between text-xs font-serif text-[#7bb39d] mt-2">
                <span>锋芒向外 (偏斜)</span>
                <span className={sliderSuccess ? 'text-[#5cb87a] font-bold' : 'text-[#ffd885]'}>
                  {sliderSuccess ? '✓ 剑尖归心校准圆满！' : '目标正位：85% ~ 95%'}
                </span>
                <span>剑尖向内 (正位)</span>
              </div>
            </div>
          </AncientBlackLinePlaque>
        </div>
      )}

      {/* STAGE: VIDEO 2 */}
      {stage === 'VIDEO2' && (
        <VideoModal
          videoSrc={levelAssets?.outroVideo || LEVEL_VIDEO_CONFIGS.LEVEL2.outroVideo}
          title={LEVEL_VIDEO_CONFIGS.LEVEL2.outroTitle}
          subtitle={LEVEL_VIDEO_CONFIGS.LEVEL2.outroSubtitle}
          onComplete={() => setStage('CONCLUSION')}
        />
      )}

      {/* STAGE: CONCLUSION */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="第二关 礼 · 剑问圣人"
          badge="❖ 通关小结 ❖"
          badgeColor="#d64d3e"
          title="剑有锋芒 · 亦须知礼"
          accentColor="#ffd885"
          bgImageUrl={levelAssets?.summaryImage || LEVEL2_STAGE_PARRY_BG}
          maskOpacity={0.25}
          lines={[
            '林风渐息，干将双手接过长剑，垂锋而立。',
            '“从前，他只知剑有锋芒，却未曾想过，”',
            '“真正的持剑之道，不只在于出剑，也在于收剑；”',
            '“不只在于刚强，也在于敬畏与谦让。”',
            '这一日，他以礼接剑，以礼持剑。',
            '剑尖向内，收起的是锋芒，守住的是心中的分寸。',
            '他终于明白——剑有锋芒，亦须知礼。',
          ]}
          buttonText="领悟「礼」之剑德 ✦"
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
              virtueId="LI"
              character="礼"
              name="礼"
              isUnlocked={true}
              variant="medallion"
            />
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-widest">
            恭获五德之「礼」
          </h3>
          <p className="text-xs sm:text-sm font-serif text-[#ffd885] mb-6">
            “以礼持身，收放自如。” 剑心碎片已再补一分！
          </p>

          <BlackGoldButton
            id="lvl2-btn-return-map"
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
