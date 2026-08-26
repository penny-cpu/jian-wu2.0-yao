import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../audio';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { WuxiaDialogueBox, DialogueLine } from '../components/WuxiaDialogueBox';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { Shield, Sparkles, Hand, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Level2ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
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
  x: number; // percentage
  y: number; // percentage
  speed: number;
}

export const Level2View: React.FC<Level2ViewProps> = ({ onCompleteLevel, onBackToMap }) => {
  const [stage, setStage] = useState<Stage>('PRELUDE');
  const [parryCount, setParryCount] = useState(0);
  const targetParry = 8;
  const [fallingSwords, setFallingSwords] = useState<FallingSword[]>([]);
  const nextSwordId = useRef(1);

  // Dialogue steps
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // Hands state
  const [leftHand, setLeftHand] = useState(false);
  const [rightHand, setRightHand] = useState(false);

  // Slider state
  const [sliderValue, setSliderValue] = useState(20); // 0 to 100
  const [sliderSuccess, setSliderSuccess] = useState(false);

  // Parry game loop
  useEffect(() => {
    if (stage !== 'PARRY') return;

    const spawnInterval = setInterval(() => {
      setFallingSwords(prev => {
        if (prev.length >= 4) return prev;
        const newSword: FallingSword = {
          id: nextSwordId.current++,
          x: 15 + Math.random() * 70, // 15% - 85%
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

  // Dialogue data (from PDF Page 5 & Fig 2 RPG Dialogue format)
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
    switch (stage) {
      case 'PARRY':
        return getPlaceholderImage('level2_bg_parry', '第二关：礼 · 格挡试炼', '剑锋忽至 · 凝神格挡', '#FF4500');
      case 'DIALOGUE':
        return getPlaceholderImage('level2_bg_dialogue', '第二关：礼 · 剑问圣人', '忠以为质 · 仁以为卫', '#FFD700');
      case 'RECEIVE_HANDS':
        return getPlaceholderImage('level2_bg_receive', '第二关：礼 · 双手接剑', '收锋守礼 · 敬意归心', '#E6D5AC');
      case 'SALUTE_SLIDER':
        return getPlaceholderImage('level2_bg_salute', '第二关：礼 · 行剑礼校准', '剑尖归心 · 守住分寸', '#FF4500');
      default:
        return getPlaceholderImage('level2_bg_parry', '第二关 礼 · 剑问圣人', '收锋守礼 · 君子之道', '#FF4500');
    }
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none bg-cover bg-center overflow-hidden bg-[#0c1411]"
      style={{ backgroundImage: `url(${getStageBg()})` }}
    >
      {/* Dark Overlay with Immersive Bronze Inscription Vignette */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 backdrop-blur-[2px] ${
          stage === 'DIALOGUE' ? 'bg-[#0a0f0d]/40' : 'bg-[#0a0f0d]/90'
        }`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(32,49,42,0.4)_0%,rgba(10,15,13,0.98)_100%)] pointer-events-none" />

      {/* Top Header Tag */}
      {stage !== 'CONCLUSION' && stage !== 'DIALOGUE' && (
        <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#16221e]/95 border border-[#3b554b] text-xs sm:text-sm font-serif text-[#ffd885] shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#d64d3e] shadow-[0_0_8px_#d64d3e] animate-pulse" />
            <span className="font-bold">第二关 礼 · 剑问圣人</span>
          </div>
          <div className="text-xs font-serif text-[#7bb39d] bg-[#111916]/95 px-3 py-1 rounded-sm border border-[#263730]">
            {stage === 'PARRY' && `试炼一：凝神格挡 (${parryCount}/${targetParry})`}
            {stage === 'DIALOGUE' && '试炼二：圣门问答'}
            {stage === 'RECEIVE_HANDS' && '试炼三：双手接剑'}
            {stage === 'SALUTE_SLIDER' && '试炼三：剑尖归心'}
          </div>
        </div>
      )}

      {/* STAGE: PRELUDE (PDF Page 4) */}
      {stage === 'PRELUDE' && (
        <div className="relative z-10 my-auto w-full max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.95)] text-center backdrop-blur-md">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-3 tracking-widest font-bold">
            ❖ 试炼前情 · 古柏 ❖
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-4 tracking-wider">
            古柏荒野 · 圣人弟子拔剑相问
          </h2>
          <div className="text-sm sm:text-base font-serif text-[#d6e0db] leading-relaxed space-y-3 text-left bg-[#111916] p-4 rounded-sm border border-[#2b3e36] mb-6">
            <p>古柏参天，荒野寂寂。干将行至林间，忽遇一名佩剑武者拦住去路——正是孔门弟子，子路。</p>
            <p className="text-[#ffd885] font-semibold font-serif">见干将身负长剑，子路拔剑相问：“古之君子，固以剑自卫乎？”</p>
            <p>话音未落，剑锋已至。干将仓促格挡，步步退让。一场关于“剑”与“礼”的问答，就此展开。</p>
          </div>
          <button
            id="lvl2-btn-start-video"
            onClick={() => {
              sound.playClick();
              setStage('VIDEO1');
            }}
            className="px-8 py-3 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base transition-all shadow-lg cursor-pointer active:scale-95"
          >
            观 赏 前 情 绘 卷 🎬
          </button>
        </div>
      )}

      {/* STAGE: VIDEO 1 */}
      {stage === 'VIDEO1' && (
        <VideoModal
          videoSrc="assets/video/level2_start.mp4"
          title="第二关 礼 · 剑问圣人"
          subtitle="古柏参天 · 子路拔剑 · 剑与礼问"
          onComplete={() => setStage('PARRY')}
        />
      )}

      {/* STAGE: PARRY MINIGAME (PDF Page 4) */}
      {stage === 'PARRY' && (
        <div className="relative z-10 w-full h-[460px] max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm overflow-hidden shadow-2xl flex flex-col justify-between my-auto backdrop-blur-md">
          {/* Top Instruction */}
          <div className="p-3 bg-[#111916] border-b border-[#2b3e36] text-center">
            <h3 className="text-base font-serif font-bold text-[#f5efe3] tracking-wide">
              剑锋忽至，凝神格挡
            </h3>
            <p className="text-xs font-serif text-[#a8b8b0] mt-0.5">
              点击屏幕上方落下的小剑，成功格挡 8 次即可化解攻势（当前：{parryCount} / {targetParry}）
            </p>
          </div>

          {/* Falling Swords Area */}
          <div className="relative flex-1 w-full overflow-hidden">
            {fallingSwords.map(sword => (
              <button
                key={sword.id}
                id={`sword-parry-${sword.id}`}
                onClick={() => handleParrySword(sword.id)}
                style={{
                  left: `${sword.x}%`,
                  top: `${sword.y}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer hover:scale-125 transition-transform group"
              >
                {/* Ancient Bronze/Steel Sword silhouette */}
                <div className="relative flex flex-col items-center">
                  {/* Pommel / Hilt (Top) */}
                  <div className="w-2 h-4 bg-[#3b554b] rounded-t-sm" />
                  {/* Guard */}
                  <div className="w-8 h-1.5 bg-[#dfba73] rounded-sm shadow-md" />
                  {/* Blade pointing downwards */}
                  <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[34px] border-t-[#d64d3e] shadow-[0_0_12px_#d64d3e]" />
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Defense Area Info */}
          <div className="p-2.5 bg-[#111916] border-t border-[#2b3e36] flex justify-between items-center px-6">
            <div className="text-xs font-serif text-[#ffd885] flex items-center gap-1.5 font-bold">
              <Shield className="w-4 h-4 text-[#d64d3e]" />
              <span>凝神沉气 · 格挡守御</span>
            </div>
            <div className="text-xs font-serif text-[#ffd885] font-bold">
              化解进度：{Math.round((parryCount / targetParry) * 100)}%
            </div>
          </div>
        </div>
      )}

      {/* STAGE: DIALOGUE (Fig 3 RPG Character + Speech Box Style) */}
      {stage === 'DIALOGUE' && (
        <div className="absolute inset-0 z-20 flex flex-col justify-between">
          <WuxiaDialogueBox
            dialogues={dialogues}
            currentIndex={dialogueIndex}
            onNext={handleNextDialogue}
            onSkip={() => {
              sound.playClick();
              setStage('RECEIVE_HANDS');
            }}
            headerTag="第二关 礼 · 剑问圣人"
          />
        </div>
      )}

      {/* STAGE: RECEIVE HANDS (PDF Page 5) */}
      {stage === 'RECEIVE_HANDS' && (
        <div className="relative z-10 my-auto w-full max-w-xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-2xl text-center backdrop-blur-md">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#d64d3e] text-[#d64d3e] text-xs font-serif mb-2 font-bold">
            ❖ 试炼第二折 · 接剑礼 ❖
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wider">
            收锋守礼 · 敬意归心
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mb-8 leading-relaxed">
            子路托剑赠予：“愿先生持此剑，践君子之仁，守君子之道。”
            <br />
            请分别点击左手与右手，帮助干将完成双手端肃接剑礼。
          </p>

          {/* Hand Buttons */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
            <button
              id="lvl2-btn-left-hand"
              onClick={handleLeftHand}
              className={`p-5 rounded-sm border transition-all flex flex-col items-center gap-2 cursor-pointer ${
                leftHand
                  ? 'bg-[#1f2f29] border-[#5cb87a] text-[#5cb87a] shadow-[0_0_15px_rgba(92,184,122,0.4)]'
                  : 'bg-[#111916] border-[#2b3e36] text-[#d6e0db] hover:border-[#3b554b]'
              }`}
            >
              <Hand className="w-8 h-8 rotate-[-20deg]" />
              <span className="font-serif font-bold text-base">
                {leftHand ? '✓ 左手端出' : '伸出左手 🖐️'}
              </span>
            </button>

            <button
              id="lvl2-btn-right-hand"
              onClick={handleRightHand}
              className={`p-5 rounded-sm border transition-all flex flex-col items-center gap-2 cursor-pointer ${
                rightHand
                  ? 'bg-[#1f2f29] border-[#5cb87a] text-[#5cb87a] shadow-[0_0_15px_rgba(92,184,122,0.4)]'
                  : 'bg-[#111916] border-[#2b3e36] text-[#d6e0db] hover:border-[#3b554b]'
              }`}
            >
              <Hand className="w-8 h-8 rotate-[20deg]" />
              <span className="font-serif font-bold text-base">
                {rightHand ? '✓ 右手端出' : '伸出右手 🖐️'}
              </span>
            </button>
          </div>

          <p className="text-xs font-serif text-[#7bb39d]">
            双手齐备方显敬肃，双手点击后即可进入剑尖归心校准
          </p>
        </div>
      )}

      {/* STAGE: SALUTE SLIDER (PDF Page 5) */}
      {stage === 'SALUTE_SLIDER' && (
        <div className="relative z-10 my-auto w-full max-w-xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-2xl text-center backdrop-blur-md">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-2 font-bold">
            ❖ 试炼第三折 · 行剑礼校准 ❖
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wider">
            剑尖归心 · 敛锋守度
          </h2>
          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mb-8">
            拖动金色剑柄滑块，使剑尖缓缓向内归心，完成行剑礼校准
          </p>

          {/* Visual Sword Angle Illustration */}
          <div className="relative w-full h-36 bg-[#111916] border border-[#3b554b] rounded-sm mb-6 flex items-center justify-center overflow-hidden">
            {/* Sword model that rotates based on slider */}
            <div
              className="transition-transform duration-100 flex items-center"
              style={{
                transform: `rotate(${-(sliderValue - 50) * 0.9}deg)`,
              }}
            >
              <div className="w-12 h-3 bg-[#2b3e36] rounded-l" />
              <div className="w-3 h-8 bg-[#dfba73]" />
              <div className="w-36 h-4 bg-gradient-to-r from-[#dfba73] to-[#f5efe3] shadow-[0_0_15px_rgba(223,186,115,0.5)]" />
              <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[16px] border-l-[#f5efe3]" />
            </div>

            {/* Target Alignment Indicator */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xs font-serif text-[#ffd885] flex items-center gap-1 border border-[#3b554b] px-2 py-1 rounded bg-[#16221e]">
              <span>【 归心正位 】</span>
            </div>
          </div>

          {/* Slider */}
          <div className="px-4 mb-4">
            <input
              id="lvl2-salute-slider"
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full h-3 bg-[#111916] border border-[#3b554b] rounded-sm appearance-none cursor-pointer accent-[#dfba73]"
            />
            <div className="flex justify-between text-xs font-serif text-[#7bb39d] mt-2">
              <span>锋芒向外 (偏斜)</span>
              <span className={sliderSuccess ? 'text-[#5cb87a] font-bold' : 'text-[#ffd885]'}>
                {sliderSuccess ? '✓ 剑尖归心校准圆满！' : '目标正位：85% ~ 95%'}
              </span>
              <span>剑尖向内 (正位)</span>
            </div>
          </div>
        </div>
      )}

      {/* STAGE: VIDEO 2 */}
      {stage === 'VIDEO2' && (
        <VideoModal
          videoSrc="assets/video/level2_end.mp4"
          title="第二关 礼 · 行剑致礼"
          subtitle="收锋敬意 · 剑尖向内 · 守住分寸"
          onComplete={() => setStage('CONCLUSION')}
        />
      )}

      {/* STAGE: CONCLUSION (PDF Page 5-6) - Wuxia Epilogue */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="第二关 礼 · 剑问圣人"
          badge="❖ 通关小结 ❖"
          badgeColor="#d64d3e"
          title="剑有锋芒 · 亦须知礼"
          accentColor="#ffd885"
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

      {/* STAGE: REWARD (PDF Page 6) */}
      {stage === 'REWARD' && (
        <div className="relative z-10 my-auto w-full max-w-md bg-[#16221e]/95 border border-[#d64d3e] rounded-sm p-8 shadow-[0_0_35px_rgba(214,77,62,0.3)] text-center backdrop-blur-md animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-sm bg-[#111916] border border-[#d64d3e] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(214,77,62,0.4)]">
            <span className="text-4xl font-serif font-extrabold text-[#d64d3e]">礼</span>
          </div>

          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#d64d3e] text-[#d64d3e] text-xs font-serif mb-2 font-bold">
            ❖ 终折 · 五德点亮 ❖
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wider">
            恭喜少侠，获得五德之「礼」！
          </h2>

          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mb-6">
            “以礼持身，收放自如。” 剑心碎片已再补一分！
          </p>

          <button
            id="lvl2-btn-return-map"
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
