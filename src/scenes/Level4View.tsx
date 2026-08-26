import React, { useState } from 'react';
import { sound } from '../audio';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { Compass, BookOpen, ChevronLeft, ChevronRight, Swords, CheckCircle2, XCircle } from 'lucide-react';

interface Level4ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
}

type Stage = 'PRELUDE' | 'VIDEO1' | 'SECRET_BOOK' | 'BATTLE_STEPS' | 'VIDEO2' | 'CONCLUSION' | 'REWARD';

export const Level4View: React.FC<Level4ViewProps> = ({ onCompleteLevel, onBackToMap }) => {
  const [stage, setStage] = useState<Stage>('PRELUDE');
  const [bookPageIndex, setBookPageIndex] = useState(0);
  const [battleStep, setBattleStep] = useState(1);
  const [stepFeedback, setStepFeedback] = useState<'correct' | 'wrong' | null>(null);

  const techniques = [
    { name: '第 1 式：挂剑', desc: '【剑理秘要】：反手走弧，从容拨开枝叶与障碍', icon: '🍃' },
    { name: '第 2 式：掰腕剑', desc: '【剑理秘要】：横剑偏转，化解正面猛烈冲击', icon: '🛡️' },
    { name: '第 3 式：刺剑', desc: '【剑理秘要】：剑光直刺，牵制对手消耗敌方体力', icon: '🗡️' },
    { name: '第 4 式：里外腕花', desc: '【剑理秘要】：手腕急转，虚虚实实打乱敌方节奏', icon: '🌀' },
    { name: '第 5 式：云剑', desc: '【剑理秘要】：剑身云绕护身，迂回寻找破绽突击', icon: '☁️' },
  ];

  const battleQuestions = [
    {
      step: 1,
      title: '第一步：看清',
      question: '枝叶遮蔽视线，神兽潜伏在后，干将判断如何应对？',
      optA: { text: '挂剑（反手走弧拨开枝叶）', isCorrect: true },
      optB: { text: '点剑（硬挑树枝反弹抽中手背）', isCorrect: false },
    },
    {
      step: 2,
      title: '第二步：护己',
      question: '神兽正面猛扑砸下，千钧一发，干将判断如何应对？',
      optA: { text: '崩剑（挺身硬扛被撞飞）', isCorrect: false },
      optB: { text: '掰腕剑（横剑偏转滑开冲击）', isCorrect: true },
    },
    {
      step: 3,
      title: '第三步：周旋',
      question: '神兽低伏绕圈等待空档，伺机再扑，干将判断如何应对？',
      optA: { text: '刺剑（直线突进牵制消耗）', isCorrect: true },
      optB: { text: '盘剑（只顾防守被看穿路数）', isCorrect: false },
    },
    {
      step: 4,
      title: '第四步：扰乱',
      question: '神兽狂躁连续猛扑，招招凶险，干将判断如何应对？',
      optA: { text: '撩剑（轻点前爪被本能闪避）', isCorrect: false },
      optB: { text: '里外腕花（手腕急转虚虚实实乱闪）', isCorrect: true },
    },
    {
      step: 5,
      title: '第五步：收势',
      question: '神兽眩晕力竭，腹部透出剑光，干将判断如何应对？',
      optA: { text: '云剑迂回（虚晃一招迂回刺入腹部）', isCorrect: true },
      optB: { text: '抹剑（横向平抹被鳞甲滑开）', isCorrect: false },
    },
  ];

  const currentQ = battleQuestions[battleStep - 1];

  const handleChoice = (isCorrect: boolean) => {
    if (stepFeedback !== null) return;

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
      }, 1100);
    } else {
      sound.playClick();
      setStepFeedback('wrong');
      setTimeout(() => {
        setStepFeedback(null);
      }, 1300);
    }
  };

  const getStageBg = () => {
    switch (stage) {
      case 'SECRET_BOOK':
        return getPlaceholderImage('level4_bg_secret', '第四关：智 · 舞林秘籍', '五式剑理 · 智破千钧', '#00BFFF');
      case 'BATTLE_STEPS':
        return getPlaceholderImage(`level4_bg_step${battleStep <= 2 ? '12' : battleStep <= 4 ? '34' : '5'}`, `第四关：智 · 智斗神兽 (第${battleStep}步)`, '洞察破局 · 剑招克敌', '#00BFFF');
      default:
        return getPlaceholderImage('level4_bg_secret', '第四关 智 · 空谷之兽', '智以破妄 · 洞察破局', '#00BFFF');
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
      {stage !== 'CONCLUSION' && (
        <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#16221e]/95 border border-[#3b554b] text-xs sm:text-sm font-serif text-[#ffd885] shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#d64d3e] shadow-[0_0_8px_#d64d3e] animate-pulse" />
            <span className="font-bold">第四关 智 · 空谷之兽</span>
          </div>
          <div className="text-xs font-serif text-[#7bb39d] bg-[#111916]/95 px-3 py-1 rounded-sm border border-[#263730]">
            {stage === 'SECRET_BOOK' && '试炼一：研读秘籍'}
            {stage === 'BATTLE_STEPS' && `试炼二：智斗破局 (${battleStep}/5)`}
          </div>
        </div>
      )}

      {/* STAGE: PRELUDE */}
      {stage === 'PRELUDE' && (
        <div className="relative z-10 my-auto w-full max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.95)] text-center backdrop-blur-md">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-3 tracking-widest font-bold">
            ❖ 试炼前情 · 空谷 ❖
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-4 tracking-wider">
            空谷幽壑 · 智斗镇墓神兽
          </h2>
          <div className="text-sm sm:text-base font-serif text-[#d6e0db] leading-relaxed space-y-3 text-left bg-[#111916] p-4 rounded-sm border border-[#2b3e36] mb-6">
            <p>深谷幽壑，雾霭沉沉。干将行至空谷深处，忽逢上古异兽阻道，威猛无匹。</p>
            <p>神兽鳞甲坚硬，蛮力撼山。若一味逞强硬拼，必难脱险。唯有静心凝神，观其破绽，以剑理智慧周旋化解。</p>
            <p className="text-[#ffd885] font-semibold font-serif">“刚者易折，柔者常存。以智御剑，方能破局。”</p>
          </div>
          <button
            id="lvl4-btn-start-video"
            onClick={() => {
              sound.playClick();
              setStage('VIDEO1');
            }}
            className="px-8 py-3 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base transition-all shadow-lg cursor-pointer active:scale-95"
          >
            观 赏 试 炼 绘 卷 🎬
          </button>
        </div>
      )}

      {/* STAGE: VIDEO 1 */}
      {stage === 'VIDEO1' && (
        <VideoModal
          videoSrc="assets/video/level4_start.mp4"
          title="第四关 智 · 空谷之兽"
          subtitle="空谷幽兽 · 蛮力撼山 · 智以破妄"
          onComplete={() => setStage('SECRET_BOOK')}
        />
      )}

      {/* STAGE: SECRET BOOK (PDF Page 7 & user code) */}
      {stage === 'SECRET_BOOK' && (
        <div className="relative z-10 my-auto w-full max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col items-center">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[#ffd885]" />
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f5efe3] tracking-wider">
              【 剑 谱 秘 要 · 招 式 研 读 】
            </h3>
          </div>

          {/* Book Page Card */}
          <div className="relative w-full bg-[#111916] border border-[#3b554b] rounded-sm p-6 mb-6 flex flex-col items-center justify-between min-h-[220px]">
            {/* Tech Title */}
            <div className="text-2xl mb-2">{techniques[bookPageIndex].icon}</div>
            <h4 className="text-xl font-serif font-bold text-[#ffd885] mb-2 tracking-wide">
              {techniques[bookPageIndex].name}
            </h4>
            <p className="text-sm sm:text-base font-serif text-[#d6e0db] text-center max-w-md leading-relaxed">
              {techniques[bookPageIndex].desc}
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center gap-6 mt-4">
              <button
                id="lvl4-book-prev"
                onClick={() => {
                  sound.playClick();
                  setBookPageIndex((bookPageIndex - 1 + techniques.length) % techniques.length);
                }}
                className="p-2 rounded-sm bg-[#1f2f29] border border-[#3b554b] text-[#ffd885] hover:border-[#dfba73] cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="text-xs font-serif text-[#7bb39d]">
                第 {bookPageIndex + 1} / {techniques.length} 势
              </span>

              <button
                id="lvl4-book-next"
                onClick={() => {
                  sound.playClick();
                  setBookPageIndex((bookPageIndex + 1) % techniques.length);
                }}
                className="p-2 rounded-sm bg-[#1f2f29] border border-[#3b554b] text-[#ffd885] hover:border-[#dfba73] cursor-pointer transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Close Book & Start Battle Button */}
          <button
            id="lvl4-btn-start-battle"
            onClick={() => {
              sound.playHammerStrike();
              setStage('BATTLE_STEPS');
            }}
            className="px-8 py-3 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base transition-all shadow-[0_0_20px_rgba(223,186,115,0.3)] cursor-pointer active:scale-95"
          >
            合上秘籍 · 开始与镇墓兽对抗 ⚔️
          </button>
        </div>
      )}

      {/* STAGE: BATTLE 5 STEPS */}
      {stage === 'BATTLE_STEPS' && (
        <div className="relative z-10 my-auto w-full max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Header Step Counter */}
          <div className="flex items-center justify-between border-b border-[#2b3e36] pb-2 mb-4">
            <span className="text-sm font-serif font-bold text-[#ffd885]">
              {currentQ.title}（第 {battleStep} 步 / 共 5 步）
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(stepNum => (
                <div
                  key={stepNum}
                  className={`w-3 h-3 rounded-full ${
                    stepNum < battleStep
                      ? 'bg-[#5cb87a]'
                      : stepNum === battleStep
                      ? 'bg-[#ffd885] animate-pulse shadow-[0_0_8px_#ffd885]'
                      : 'bg-[#2b3e36]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-[#111916] p-5 rounded-sm border border-[#2b3e36] mb-6 text-center">
            <p className="text-base sm:text-lg font-serif text-[#f5efe3] font-medium leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Option Buttons */}
          <div className="grid grid-cols-1 gap-3.5 mb-4">
            <button
              id="lvl4-btn-opt-a"
              onClick={() => handleChoice(currentQ.optA.isCorrect)}
              disabled={stepFeedback !== null}
              className="w-full p-4 rounded-sm bg-[#111916] border border-[#3b554b] hover:border-[#dfba73] hover:bg-[#1f2f29] text-left transition-all text-sm sm:text-base font-serif text-[#d6e0db] cursor-pointer"
            >
              <strong className="text-[#ffd885] mr-2 font-serif">【甲】</strong>
              {currentQ.optA.text}
            </button>

            <button
              id="lvl4-btn-opt-b"
              onClick={() => handleChoice(currentQ.optB.isCorrect)}
              disabled={stepFeedback !== null}
              className="w-full p-4 rounded-sm bg-[#111916] border border-[#3b554b] hover:border-[#dfba73] hover:bg-[#1f2f29] text-left transition-all text-sm sm:text-base font-serif text-[#d6e0db] cursor-pointer"
            >
              <strong className="text-[#ffd885] mr-2 font-serif">【乙】</strong>
              {currentQ.optB.text}
            </button>
          </div>

          {/* Feedback Overlay */}
          {stepFeedback === 'correct' && (
            <div className="p-3 rounded-sm bg-[#16291e] border border-[#5cb87a] text-center text-[#5cb87a] font-serif font-bold text-sm flex items-center justify-center gap-2 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-[#5cb87a]" />
              <span>【 应对正确 · 剑理精妙 】</span>
            </div>
          )}

          {stepFeedback === 'wrong' && (
            <div className="p-3 rounded-sm bg-[#2b1716] border border-[#d64d3e] text-center text-[#d64d3e] font-serif font-bold text-sm flex items-center justify-center gap-2 animate-shake">
              <XCircle className="w-5 h-5 text-[#d64d3e]" />
              <span>【 选择失误 · 招式破绽被识破，请重试 】</span>
            </div>
          )}
        </div>
      )}

      {/* STAGE: VIDEO 2 */}
      {stage === 'VIDEO2' && (
        <VideoModal
          videoSrc="assets/video/level4_end.mp4"
          title="第四关 智 · 破局归心"
          subtitle="以智驭力 · 洞察破妄 · 灵兽伏首"
          onComplete={() => setStage('CONCLUSION')}
        />
      )}

      {/* STAGE: CONCLUSION - Wuxia Epilogue */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="第四关 智 · 空谷之兽"
          badge="❖ 通关小结 ❖"
          badgeColor="#dfba73"
          title="以智破妄 · 洞察天地"
          accentColor="#ffd885"
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
        <div className="relative z-10 my-auto w-full max-w-md bg-[#16221e]/95 border border-[#dfba73] rounded-sm p-8 shadow-[0_0_35px_rgba(223,186,115,0.3)] text-center backdrop-blur-md animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-sm bg-[#111916] border border-[#dfba73] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(223,186,115,0.4)]">
            <span className="text-4xl font-serif font-extrabold text-[#ffd885]">智</span>
          </div>

          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-2 font-bold">
            ❖ 终折 · 五德点亮 ❖
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wider">
            恭喜少侠，获得五德之「智」！
          </h2>

          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mb-6">
            “洞察万象，智破千钧。” 剑心碎片已再补一分！
          </p>

          <button
            id="lvl4-btn-return-map"
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
