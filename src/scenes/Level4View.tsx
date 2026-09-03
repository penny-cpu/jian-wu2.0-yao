import React, { useState } from 'react';
import { sound } from '../audio';
import { AssetConfig } from '../types';
import { VideoModal } from '../components/VideoModal';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { StanceVideoPlayer, StanceVideoConfig } from '../components/StanceVideoPlayer';
import { AncientBlackLinePlaque } from '../components/AncientBlackLinePlaque';
import { WarringStatesVirtueToken } from '../components/WarringStatesVirtueToken';
import { BlackGoldTag, BlackGoldButton } from '../components/BlackGoldBorder';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, BookOpen, Film } from 'lucide-react';

import { LEVEL_VIDEO_CONFIGS } from '../config/videoConfig';

/* =========================================================================
 * 📜【第四关（智 · 空谷之兽）试炼前情与通关小结共用背景底图配置位置】
 * ========================================================================= */
import level4BeastSlainBgImg from '../assets/images/level4_beast_slain_bg_1788330470232.jpg';

export const LEVEL4_PRELUDE_BG_IMAGE = level4BeastSlainBgImg;
export const LEVEL4_EPILOGUE_BG_IMAGE = level4BeastSlainBgImg;

/* =========================================================================
 * ⚔️【第四关（智 · 试炼二见招拆招）5大选择题独立匹配背景底图配置位置】
 * ========================================================================= */
import level4Step1BushesBgImg from '../assets/images/level4_step1_bushes_bg_1788330486858.jpg';
import level4Step2PounceBgImg from '../assets/images/level4_step2_pounce_bg_1788330504626.jpg';
import level4Step3SweepBgImg from '../assets/images/level4_step3_sweep_1788337591757.jpg';
import level4Step4JawBgImg from '../assets/images/level4_step4_jaw_1788337614257.jpg';
import level4Step5CloudBgImg from '../assets/images/level4_step5_cloud_1788337633315.jpg';

export const LEVEL4_STEP1_BG = level4Step1BushesBgImg;
export const LEVEL4_STEP2_BG = level4Step2PounceBgImg;
export const LEVEL4_STEP3_BG = level4Step3SweepBgImg;
export const LEVEL4_STEP4_BG = level4Step4JawBgImg;
export const LEVEL4_STEP5_BG = level4Step5CloudBgImg;

export const LEVEL4_VIDEO_1_ASSET = 'assets/video/level4_stance_1_guajian.mp4';

export const LEVEL4_STANCE_VIDEOS: StanceVideoConfig[] = [
  {
    id: 'guajian',
    name: '第 1 式：挂剑',
    pinyin: 'Guà Jiàn',
    videoUrl: LEVEL4_VIDEO_1_ASSET,
    durationSeconds: 6,
    actionDesc: '【动作演示视频 · 实长 6 秒】：反手走弧，剑身自下而上如钩挑挂，从容拨开枝叶与障碍阻拦。',
    formula: '反手走弧，从容拨开枝叶与障碍',
    icon: '🍃',
    accentColor: '#5cb87a',
  },
  {
    id: 'baiwan',
    name: '第 2 式：掰腕剑',
    pinyin: 'Bāi Wàn Jiàn',
    videoUrl: 'assets/video/level4_stance_2_baiwanjian.mp4',
    durationSeconds: 8,
    actionDesc: '【动作演示视频 · 实长 8 秒】：手腕急骤横转，剑脊偏斜卡位，顺势借力偏转滑开敌方正面猛烈重击。',
    formula: '横剑偏转，借力滑开巨兽猛烈扑击',
    icon: '🛡️',
    accentColor: '#dfba73',
  },
  {
    id: 'cijian',
    name: '第 3 式：刺剑',
    pinyin: 'Cì Jiàn',
    videoUrl: 'assets/video/level4_stance_3_cijian.mp4',
    durationSeconds: 5,
    actionDesc: '【动作演示视频 · 实长 5 秒】：沉肩坠肘，剑身化作惊鸿闪电直线穿透，连贯突刺牵制消耗敌方体力。',
    formula: '沉肩坠肘，直线突进牵制消耗体力',
    icon: '🗡️',
    accentColor: '#7bf0b5',
  },
  {
    id: 'wanhua',
    name: '第 4 式：里外腕花',
    pinyin: 'Lǐ Wài Wàn Huā',
    videoUrl: 'assets/video/level4_stance_4_liwaiwanhua.mp4',
    durationSeconds: 9,
    actionDesc: '【动作演示视频 · 实长 9 秒】：手腕连绵运转化出双重「∞」字形螺旋剑芒，虚实交织惑乱敌方心神节奏。',
    formula: '手腕急转，虚实交错惑乱敌方心神',
    icon: '🌀',
    accentColor: '#5cb8b2',
  },
  {
    id: 'yunjian',
    name: '第 5 式：云剑',
    pinyin: 'Yún Jiàn',
    videoUrl: 'assets/video/level4_stance_5_yunjian.mp4',
    durationSeconds: 7,
    actionDesc: '【动作演示视频 · 实长 7 秒】：剑身在头顶身侧行云流水般平圆回环，周身护体后顺势迂回精准攻其薄弱。',
    formula: '行云流水，周身护体迂回寻破绽',
    icon: '☁️',
    accentColor: '#ffd885',
  },
];

interface Level4ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
  levelAssets?: AssetConfig;
}

type Stage = 'PRELUDE' | 'VIDEO1' | 'SECRET_BOOK' | 'BATTLE_STEPS' | 'VIDEO2' | 'CONCLUSION' | 'REWARD';

export const Level4View: React.FC<Level4ViewProps> = ({ onCompleteLevel, onBackToMap, levelAssets }) => {
  const [stage, setStage] = useState<Stage>('PRELUDE');
  const [bookPageIndex, setBookPageIndex] = useState(0);
  const [battleStep, setBattleStep] = useState(1);
  const [stepFeedback, setStepFeedback] = useState<'correct' | 'wrong' | null>(null);

  const battleQuestions = [
    {
      step: 1,
      title: '第一步：看清',
      bgImage: LEVEL4_STEP1_BG,
      question: '枝叶遮蔽视线，神兽潜伏在后，呼吸声沉重隐蔽。干将判断如何应对？',
      optA: { text: '挂剑（反手走弧拨开枝叶看清虚实）', isCorrect: true },
      optB: { text: '点剑（硬挑树枝反弹抽中手背）', isCorrect: false },
    },
    {
      step: 2,
      title: '第二步：护己',
      bgImage: LEVEL4_STEP2_BG,
      question: '神兽自高岩猛扑砸下，巨爪撕风，千钧一发。干将判断如何应对？',
      optA: { text: '劈剑（正面硬抗被巨力震飞）', isCorrect: false },
      optB: { text: '掰腕剑（横剑借力滑开巨兽爪击）', isCorrect: true },
    },
    {
      step: 3,
      title: '第三步：试探',
      bgImage: LEVEL4_STEP3_BG,
      question: '神兽落地转身，铁尾如鞭扫起狂风乱石。干将判断如何应对？',
      optA: { text: '刺剑（直线突进，试探弱点并牵制消耗体力）', isCorrect: true },
      optB: { text: '挑剑（盲目向上挑击，腹部大开）', isCorrect: false },
    },
    {
      step: 4,
      title: '第四步：惑敌',
      bgImage: LEVEL4_STEP4_BG,
      question: '神兽被牵制，怒吼连连，张开血盆大口狂咬。干将判断如何应对？',
      optA: { text: '砍剑（动作过大被神兽侧身避开）', isCorrect: false },
      optB: { text: '里外腕花（手腕急转，虚实交错惑乱敌心）', isCorrect: true },
    },
    {
      step: 5,
      title: '第五步：降伏',
      bgImage: LEVEL4_STEP5_BG,
      question: '神兽眼花力竭，脚步踉跄，露出最后破绽。干将判断如何应对？',
      optA: { text: '云剑（行云流水护身周旋，收势制胜伏兽）', isCorrect: true },
      optB: { text: '截剑（强行阻拦被反扑压制）', isCorrect: false },
    },
  ];

  const currentQ = battleQuestions[battleStep - 1] || battleQuestions[0];

  const handleChoice = (isCorrect: boolean) => {
    if (isCorrect) {
      sound.playVirtueChime();
      setStepFeedback('correct');
      setTimeout(() => {
        setStepFeedback(null);
        if (battleStep < 5) {
          setBattleStep(battleStep + 1);
        } else {
          setStage('VIDEO2');
        }
      }, 1000);
    } else {
      sound.playSwordClash();
      setStepFeedback('wrong');
      setTimeout(() => {
        setStepFeedback(null);
      }, 1200);
    }
  };

  const getStageBg = () => {
    if (stage === 'BATTLE_STEPS') {
      return currentQ.bgImage;
    }
    return LEVEL4_PRELUDE_BG_IMAGE;
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none bg-cover bg-center overflow-hidden bg-[#0c1411]"
      style={{ backgroundImage: `url(${getStageBg()})` }}
    >
      <div className="absolute inset-0 bg-[#0a0f0d]/55 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,32,26,0.15)_0%,rgba(10,15,13,0.75)_100%)] pointer-events-none" />

      {/* Top Header Tag (Top/bottom black-gold lines, no side borders) */}
      {stage !== 'CONCLUSION' && (
        <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
          <BlackGoldTag className="px-3.5 py-1.5 text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-none bg-[#4e9dc7] border border-black inline-block" />
            <span className="font-bold">第四关 智 · 空谷之兽</span>
          </BlackGoldTag>
          <BlackGoldTag className="text-xs text-[#7bb39d] font-bold">
            {stage === 'SECRET_BOOK' && `试炼一：剑谱秘要 (${bookPageIndex + 1}/5)`}
            {stage === 'BATTLE_STEPS' && `试炼二：见招拆招 (${battleStep}/5)`}
          </BlackGoldTag>
        </div>
      )}

      {/* STAGE: PRELUDE */}
      {stage === 'PRELUDE' && (
        <AncientBlackLinePlaque className="relative z-10 my-auto w-full max-w-xl bg-[#16221e]/98 p-6 sm:p-8 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.98)] animate-fade-in flex flex-col justify-between">
          <div className="text-center mb-4">
            <div className="inline-block px-3 py-0.5 rounded-none bg-[#111916] border border-black text-[#ffd885] text-xs font-serif font-bold tracking-widest mb-1.5 shadow-sm">
              ❖ 第四关 智 · 试炼前情 ❖
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest">
              青崖幽谷 · 智伏灵兽
            </h3>
          </div>

          <div className="w-full h-36 sm:h-44 rounded-none border border-black bg-[#16221e] mb-4 overflow-hidden relative group shadow-md">
            <img
              src={LEVEL4_PRELUDE_BG_IMAGE}
              alt="第四关前情绘卷"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1411]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="text-xs sm:text-sm md:text-base font-serif text-[#d6e0db] leading-relaxed space-y-2 text-center mb-6 px-1">
            <p>青崖之深，空谷回音。守墓灵兽啸动山林，力大无穷，绝非匹夫之勇可敌。</p>
            <p className="text-[#ffd885] font-semibold">“剑法之精，在乎一心；以智驭力，刚柔破妄。”</p>
            <p>干将研读先贤五式剑谱，洞察灵兽招式破绽，以智斗局降伏凶兽。</p>
          </div>

          <div className="text-center flex justify-center">
            <BlackGoldButton
              id="lvl4-btn-start"
              variant="gold"
              size="lg"
              onClick={() => {
                sound.playClick();
                setStage('VIDEO1');
              }}
            >
              <span>研 习 剑 谱</span>
            </BlackGoldButton>
          </div>
        </AncientBlackLinePlaque>
      )}


      {/* STAGE: VIDEO 1 */}
      {stage === 'VIDEO1' && (
        <VideoModal
          videoSrc={levelAssets?.introVideo || LEVEL_VIDEO_CONFIGS.LEVEL4.introVideo}
          title={LEVEL_VIDEO_CONFIGS.LEVEL4.introTitle}
          subtitle={LEVEL_VIDEO_CONFIGS.LEVEL4.introSubtitle}
          onComplete={() => setStage('SECRET_BOOK')}
        />
      )}

      {/* STAGE: SECRET BOOK (5招式秘籍) */}
      {stage === 'SECRET_BOOK' && (
        <div className="relative z-10 my-auto w-full max-w-2xl flex flex-col items-center animate-fade-in">
          <AncientBlackLinePlaque className="w-full bg-[#16221e]/98 p-5 sm:p-6 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.98)] mb-3">
            <div className="flex items-center justify-between border-b border-black pb-2 mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#ffd885]" />
                <span className="font-serif font-bold text-[#f5efe3] text-sm sm:text-base tracking-wider">
                  先贤五式剑谱秘要
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {LEVEL4_STANCE_VIDEOS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      sound.playClick();
                      setBookPageIndex(i);
                    }}
                    className={`w-5 h-5 rounded-none border text-[10px] font-mono cursor-pointer transition-all ${
                      bookPageIndex === i
                        ? 'bg-[#1f382b] border-black text-[#ffd885] font-bold shadow-sm'
                        : 'bg-[#121c17] border-black text-[#7bb39d]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Stance Display */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-[#ffd885] tracking-widest flex items-center gap-2">
                    <span>{LEVEL4_STANCE_VIDEOS[bookPageIndex].icon}</span>
                    <span>{LEVEL4_STANCE_VIDEOS[bookPageIndex].name}</span>
                  </h4>
                  <p className="text-xs font-serif text-[#7bb39d] mt-0.5">
                    {LEVEL4_STANCE_VIDEOS[bookPageIndex].pinyin} · 剑理精要
                  </p>
                </div>
                <div className="px-3 py-1 rounded-none bg-[#111916] border border-black text-xs font-serif text-[#5cb8b2]">
                  {LEVEL4_STANCE_VIDEOS[bookPageIndex].formula}
                </div>
              </div>

              {/* Video Player */}
              <div className="w-full rounded-none border-2 border-black overflow-hidden bg-black">
                <StanceVideoPlayer
                  stance={LEVEL4_STANCE_VIDEOS[bookPageIndex]}
                  config={LEVEL4_STANCE_VIDEOS[bookPageIndex]}
                  autoPlay={true}
                />
              </div>


              <p className="text-xs sm:text-sm font-serif text-[#d6e0db] leading-relaxed bg-[#111a16] p-2.5 rounded-none border border-black">
                {LEVEL4_STANCE_VIDEOS[bookPageIndex].actionDesc}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-black">
              <button
                id="lvl4-btn-prev-page"
                onClick={() => {
                  sound.playClick();
                  setBookPageIndex(Math.max(0, bookPageIndex - 1));
                }}
                disabled={bookPageIndex === 0}
                className="flex items-center gap-1 px-3 py-1 rounded-none border border-black bg-[#16221e] text-xs font-serif text-[#ffd885] disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>上一式</span>
              </button>

              <span className="text-xs font-mono text-[#7bb39d]">
                第 {bookPageIndex + 1} 式 / 共 5 式
              </span>

              <button
                id="lvl4-btn-next-page"
                onClick={() => {
                  sound.playClick();
                  setBookPageIndex(Math.min(4, bookPageIndex + 1));
                }}
                disabled={bookPageIndex === 4}
                className="flex items-center gap-1 px-3 py-1 rounded-none border border-black bg-[#16221e] text-xs font-serif text-[#ffd885] disabled:opacity-40 cursor-pointer"
              >
                <span>下一式</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </AncientBlackLinePlaque>

          <button
            id="lvl4-btn-start-battle"
            onClick={() => {
              sound.playHammerStrike();
              setStage('BATTLE_STEPS');
            }}
            className="w-full py-3 rounded-none bg-gradient-to-r from-[#1c2a23] via-[#2f473c] to-[#1c2a23] border-2 border-black text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base tracking-widest transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <span>合上秘籍 · 开始与镇墓兽对抗 ⚔️</span>
          </button>
        </div>
      )}

      {/* STAGE: BATTLE 5 STEPS */}
      {stage === 'BATTLE_STEPS' && (
        <div className="relative z-10 my-auto w-full max-w-2xl flex flex-col items-center animate-fade-in">
          <div className="mb-4 text-center">
            <div className="inline-block px-3 py-0.5 rounded-none bg-[#111916] border border-black text-[#5cb8b2] text-xs font-serif font-bold tracking-widest mb-1.5 shadow-sm">
              ❖ 试炼二：智斗破局 (第 {battleStep} 步 / 共 5 步) ❖
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {currentQ.title}
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#ffd885] tracking-wider max-w-lg leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          <AncientBlackLinePlaque className="w-full max-w-2xl p-4 bg-[#16221e]/98 rounded-none border-2 border-black flex flex-col gap-3">
            <button
              id="lvl4-btn-opt-a"
              onClick={() => handleChoice(Boolean(currentQ?.optA?.isCorrect))}
              disabled={stepFeedback !== null}
              className="w-full p-3.5 rounded-none bg-[#141e1a]/95 border border-black hover:bg-[#1b2b25] text-left transition-all text-sm sm:text-base font-serif text-[#f5efe3] cursor-pointer shadow-sm flex items-center gap-3 group"
            >
              <span className="px-2 py-0.5 rounded-none bg-[#1f2f29] border border-black text-[#ffd885] font-bold text-xs">
                【甲】
              </span>
              <span>{currentQ?.optA?.text || ''}</span>
            </button>

            <button
              id="lvl4-btn-opt-b"
              onClick={() => handleChoice(Boolean(currentQ?.optB?.isCorrect))}
              disabled={stepFeedback !== null}
              className="w-full p-3.5 rounded-none bg-[#141e1a]/95 border border-black hover:bg-[#1b2b25] text-left transition-all text-sm sm:text-base font-serif text-[#f5efe3] cursor-pointer shadow-sm flex items-center gap-3 group"
            >
              <span className="px-2 py-0.5 rounded-none bg-[#1f2f29] border border-black text-[#ffd885] font-bold text-xs">
                【乙】
              </span>
              <span>{currentQ?.optB?.text || ''}</span>
            </button>

            {stepFeedback === 'correct' && (
              <BlackGoldTag className="p-2.5 text-center text-[#7bf0b5] font-serif font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
                <CheckCircle2 className="w-5 h-5 text-[#7bf0b5]" />
                <span>【 应对正确 · 剑理精妙 】</span>
              </BlackGoldTag>
            )}

            {stepFeedback === 'wrong' && (
              <BlackGoldTag className="p-2.5 text-center text-[#ff8a7a] font-serif font-bold text-sm flex items-center justify-center gap-2 animate-shake">
                <XCircle className="w-5 h-5 text-[#ff8a7a]" />
                <span>【 选择失误 · 招式破绽被识破，请重试 】</span>
              </BlackGoldTag>
            )}

          </AncientBlackLinePlaque>
        </div>
      )}

      {/* STAGE: VIDEO 2 */}
      {stage === 'VIDEO2' && (
        <VideoModal
          videoSrc={levelAssets?.outroVideo || LEVEL_VIDEO_CONFIGS.LEVEL4.outroVideo}
          title={LEVEL_VIDEO_CONFIGS.LEVEL4.outroTitle}
          subtitle={LEVEL_VIDEO_CONFIGS.LEVEL4.outroSubtitle}
          onComplete={() => setStage('CONCLUSION')}
        />
      )}

      {/* STAGE: CONCLUSION */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="第四关 智 · 空谷之兽"
          badge="❖ 通关小结 ❖"
          badgeColor="#dfba73"
          title="以智破妄 · 洞察天地"
          accentColor="#ffd885"
          bgImageUrl={LEVEL4_EPILOGUE_BG_IMAGE}
          maskOpacity={0.60}
          lines={[
            '神兽退伏，空谷云开。',
            '“剑法非仅力与势之争，更在静观应变、因势利导。”',
            '“心明则剑清，智足则锋不钝。”',
            '干将收剑入鞘，领悟刚柔互化、智以驭锋之至理。',
            '破招不乱，化劲无形，洞悉万象之先机。',
            '他终于明白——剑有锋芒，当以智为纲。',
          ]}
          buttonText="领悟「智」之剑德 ✦"
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
              virtueId="ZHI"
              character="智"
              name="智"
              isUnlocked={true}
              variant="medallion"
            />
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-widest">
            恭获五德之「智」
          </h3>
          <p className="text-xs sm:text-sm font-serif text-[#ffd885] mb-6">
            “洞察万象，智破千钧。” 剑心碎片已再补一分！
          </p>

          <BlackGoldButton
            id="lvl4-btn-return-map"
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
