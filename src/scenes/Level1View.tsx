import React, { useState } from 'react';
import { sound } from '../audio';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { Sparkles, Flame, Hammer, Swords, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Level1ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
}

type Stage = 'PRELUDE' | 'VIDEO1' | 'FORGE' | 'GRIND' | 'CHOP' | 'INTERLUDE' | 'VIDEO2' | 'CONCLUSION' | 'REWARD';

export const Level1View: React.FC<Level1ViewProps> = ({ onCompleteLevel, onBackToMap }) => {
  const [stage, setStage] = useState<Stage>('PRELUDE');
  const [forgeClicks, setForgeClicks] = useState(0);
  const [grindSwipes, setGrindSwipes] = useState(0);
  const [chopClicks, setChopClicks] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Background for current stage
  const getStageBg = () => {
    switch (stage) {
      case 'FORGE':
        return getPlaceholderImage('level1_bg_forge', '第一关：仁 · 锻剑试炼', '垫石锻身 · 锤直残剑', '#00FF88');
      case 'GRIND':
        return getPlaceholderImage('level1_bg_grind', '第一关：仁 · 开刃试炼', '寒石砺刃 · 青芒再现', '#00FFFF');
      case 'CHOP':
        return getPlaceholderImage('level1_bg_chop', '第一关：仁 · 劈柴试炼', '青锋斩木 · 寒屋生暖', '#FF6644');
      default:
        return getPlaceholderImage('level1_bg_forge', '第一关 仁 · 雪夜炊烟', '炉火未熄 · 且以锋芒生暖', '#00FF88');
    }
  };

  // 1. FORGE HANDLER
  const handleForgeClick = () => {
    if (animating || forgeClicks >= 3) return;
    sound.playHammerStrike();
    setAnimating(true);
    const nextCount = forgeClicks + 1;
    setForgeClicks(nextCount);

    setTimeout(() => {
      setAnimating(false);
      if (nextCount >= 3) {
        sound.playVirtueChime();
        setTimeout(() => setStage('GRIND'), 800);
      }
    }, 400);
  };

  // 2. GRIND HANDLER
  const handleGrindClick = () => {
    if (animating || grindSwipes >= 3) return;
    sound.playGrind();
    setAnimating(true);
    const nextCount = grindSwipes + 1;
    setGrindSwipes(nextCount);

    setTimeout(() => {
      setAnimating(false);
      if (nextCount >= 3) {
        sound.playVirtueChime();
        setTimeout(() => setStage('CHOP'), 800);
      }
    }, 400);
  };

  // 3. CHOP HANDLER
  const handleChopClick = () => {
    if (animating || chopClicks >= 3) return;
    sound.playChop();
    setAnimating(true);
    const nextCount = chopClicks + 1;
    setChopClicks(nextCount);

    setTimeout(() => {
      setAnimating(false);
      if (nextCount >= 3) {
        sound.playVirtueChime();
        setTimeout(() => setStage('INTERLUDE'), 800);
      }
    }, 400);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none bg-cover bg-center overflow-hidden bg-[#0c1411]"
      style={{ backgroundImage: `url(${getStageBg()})` }}
    >
      {/* Dark Overlay with Immersive Bronze Inscription Vignette */}
      <div className="absolute inset-0 bg-[#0a0f0d]/90 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(32,49,42,0.4)_0%,rgba(10,15,13,0.98)_100%)] pointer-events-none" />

      {/* Top Header Tag Styled as Inscribed Bronze Plaque */}
      {stage !== 'CONCLUSION' && (
        <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#16221e]/95 border border-[#3b554b] text-xs sm:text-sm font-serif text-[#ffd885] shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#5cb87a] shadow-[0_0_8px_#5cb87a] animate-pulse" />
            <span className="font-bold">第一关 仁 · 雪夜炊烟</span>
          </div>
          <div className="text-xs font-serif text-[#7bb39d] bg-[#111916]/95 px-3 py-1 rounded-sm border border-[#263730]">
            {stage === 'FORGE' && '试炼一：垫石锻剑'}
            {stage === 'GRIND' && '试炼二：寒石开刃'}
            {stage === 'CHOP' && '试炼三：挥剑劈柴'}
          </div>
        </div>
      )}

      {/* STAGE: PRELUDE (Story Background from PDF Page 2-3) */}
      {stage === 'PRELUDE' && (
        <div className="relative z-10 my-auto w-full max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.95)] text-center backdrop-blur-md">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-3 tracking-widest font-bold">
            ❖ 试炼前情 · 雪夜 ❖
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-4 tracking-wider">
            雪夜炊烟 · 残剑之救
          </h2>
          <div className="text-sm sm:text-base font-serif text-[#d6e0db] leading-relaxed space-y-3 text-left bg-[#111916] p-4 rounded-sm border border-[#2b3e36] mb-6">
            <p>隆冬，山雪封路。干将力竭于荒野，倒在一户山间农舍前，被屋中父女救下。</p>
            <p>醒来时，炉火将熄。病父卧榻，幼女守侧。柴薪已尽，风雪却未有停意。</p>
            <p>墙角，一柄旧剑弯折蒙尘。封炉多年，干将早已不愿再执剑。可望着将尽的火，他终究还是伸出了手。</p>
          </div>
          <button
            id="lvl1-btn-start-video"
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
          videoSrc="assets/video/level1_start.mp4"
          title="第一关 仁 · 启程前情"
          subtitle="山雪封路 · 农舍炉寒 · 残剑有温"
          onComplete={() => setStage('FORGE')}
        />
      )}

      {/* STAGE: 1 FORGE (锻剑) */}
      {stage === 'FORGE' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          {/* Prompt banner */}
          <div className="bg-[#16221e]/95 border border-[#3b554b] p-4 rounded-sm shadow-xl mb-6 w-full backdrop-blur-md">
            <div className="text-xs text-[#5cb87a] font-serif mb-1 font-bold">【 第一折：垫石锻身 】</div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wide">
              炉火未熄，且以锋芒生暖
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#a8b8b0]">
              请点击铁锤敲击残剑，将弯折剑身锤直（进度：{forgeClicks} / 3）
            </p>
          </div>

          {/* Interactive Forge Anvil & Sword Display */}
          <div className="relative w-72 h-44 sm:w-80 sm:h-52 bg-[#111916] border border-[#3b554b] rounded-sm flex flex-col items-center justify-center p-4 mb-6 shadow-[0_0_30px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Sword Graphic reacting to clicks */}
            <div
              className={`relative transition-all duration-300 ${
                animating ? 'scale-110 rotate-[-2deg]' : ''
              }`}
            >
              {/* Sword blade representation */}
              <div
                className={`w-48 sm:w-56 h-6 sm:h-7 rounded-sm border transition-all duration-500 shadow-md ${
                  forgeClicks === 0
                    ? 'bg-[#1e2e28] border-[#2b3e36] -rotate-6'
                    : forgeClicks === 1
                    ? 'bg-[#2b423a] border-[#3b554b] -rotate-3'
                    : forgeClicks === 2
                    ? 'bg-[#3b5c50] border-[#dfba73] -rotate-1'
                    : 'bg-gradient-to-r from-[#3b5c50] via-[#ffd885] to-[#f5efe3] border-white rotate-0 shadow-[0_0_15px_rgba(223,186,115,0.6)]'
                }`}
              />
              <div className="text-[11px] text-[#a8b8b0] font-serif mt-2">
                {forgeClicks === 0 && '『弯折残剑 · 蒙尘多年』'}
                {forgeClicks === 1 && '『一锤落下 · 剑体微直』'}
                {forgeClicks === 2 && '『二锤重铸 · 渐露锋姿』'}
                {forgeClicks >= 3 && '『三锤合度 · 剑身挺直！』'}
              </div>
            </div>

            {/* Spark animation */}
            {animating && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-4xl animate-ping">✨</span>
              </div>
            )}
          </div>

          {/* Strike Button */}
          <button
            id="lvl1-btn-forge"
            onClick={handleForgeClick}
            disabled={animating || forgeClicks >= 3}
            className="flex items-center gap-2 px-8 py-3.5 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white hover:scale-105 active:scale-95 transition-all text-base font-serif font-bold shadow-lg cursor-pointer"
          >
            <Hammer className="w-5 h-5 text-[#ffd885]" />
            <span>敲 击 锻 剑 ({forgeClicks}/3)</span>
          </button>
        </div>
      )}

      {/* STAGE: 2 GRIND (开刃) */}
      {stage === 'GRIND' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          {/* Prompt banner */}
          <div className="bg-[#16221e]/95 border border-[#3b554b] p-4 rounded-sm shadow-xl mb-6 w-full backdrop-blur-md">
            <div className="text-xs text-[#5cb87a] font-serif mb-1 font-bold">【 第二折：寒石砺刃 】</div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wide">
              一磨一砺，寒芒初现
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#a8b8b0]">
              请点击磨刀石摩擦剑刃 3 次，使其泛起青霜（进度：{grindSwipes} / 3）
            </p>
          </div>

          {/* Interactive Grinding Stone Display */}
          <div className="relative w-72 h-44 sm:w-80 sm:h-52 bg-[#111916] border border-[#3b554b] rounded-sm flex flex-col items-center justify-center p-4 mb-6 shadow-[0_0_30px_rgba(0,0,0,0.9)] overflow-hidden">
            <div
              className={`relative transition-all duration-300 ${
                animating ? 'translate-x-2' : ''
              }`}
            >
              <div
                className={`w-48 sm:w-56 h-6 sm:h-7 rounded-sm border transition-all duration-500 ${
                  grindSwipes === 0
                    ? 'bg-[#1e2e28] border-[#2b3e36]'
                    : grindSwipes === 1
                    ? 'bg-[#2b423a] border-[#3b554b]'
                    : grindSwipes === 2
                    ? 'bg-[#3b5c50] border-[#dfba73] shadow-[0_0_12px_rgba(223,186,115,0.4)]'
                    : 'bg-gradient-to-r from-[#5cb87a] via-[#ffd885] to-[#f5efe3] border-white shadow-[0_0_20px_rgba(223,186,115,0.6)]'
                }`}
              />
              <div className="text-[11px] text-[#a8b8b0] font-serif mt-2">
                {grindSwipes === 0 && '『寒石初砺 · 锈迹渐褪』'}
                {grindSwipes === 1 && '『青光微泛 · 剑刃展锐』'}
                {grindSwipes === 2 && '『两度砥砺 · 寒气逼人』'}
                {grindSwipes >= 3 && '『青锋如水 · 锋芒毕露！』'}
              </div>
            </div>

            {animating && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-4xl animate-pulse text-[#5cb87a]">❄️</span>
              </div>
            )}
          </div>

          {/* Grind Button */}
          <button
            id="lvl1-btn-grind"
            onClick={handleGrindClick}
            disabled={animating || grindSwipes >= 3}
            className="flex items-center gap-2 px-8 py-3.5 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white hover:scale-105 active:scale-95 transition-all text-base font-serif font-bold shadow-lg cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#ffd885]" />
            <span>磨 刀 开 刃 ({grindSwipes}/3)</span>
          </button>
        </div>
      )}

      {/* STAGE: 3 CHOP (劈柴) */}
      {stage === 'CHOP' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          {/* Prompt banner */}
          <div className="bg-[#16221e]/95 border border-[#3b554b] p-4 rounded-sm shadow-xl mb-6 w-full backdrop-blur-md">
            <div className="text-xs text-[#d64d3e] font-serif mb-1 font-bold">【 第三折：挥剑劈柴 】</div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wide">
              青锋映火，寒屋重温
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#a8b8b0]">
              请挥剑劈开冻木 3 次，为农舍燃起救命柴薪（进度：{chopClicks} / 3）
            </p>
          </div>

          {/* Interactive Wood Chopping Display */}
          <div className="relative w-72 h-44 sm:w-80 sm:h-52 bg-[#111916] border border-[#3b554b] rounded-sm flex flex-col items-center justify-center p-4 mb-6 shadow-[0_0_30px_rgba(0,0,0,0.9)] overflow-hidden">
            <div
              className={`relative transition-all duration-300 ${
                animating ? 'scale-90 rotate-6' : ''
              }`}
            >
              <div className="flex gap-2">
                <div
                  className={`w-20 h-16 rounded-sm border border-[#3b554b] flex items-center justify-center text-2xl transition-all duration-500 ${
                    chopClicks >= 1 ? 'translate-x-[-15px] rotate-[-12deg] opacity-80 bg-[#1e2e28]' : 'bg-[#16221e]'
                  }`}
                >
                  🪵
                </div>
                <div
                  className={`w-20 h-16 rounded-sm border border-[#3b554b] flex items-center justify-center text-2xl transition-all duration-500 ${
                    chopClicks >= 2 ? 'translate-x-[15px] rotate-[12deg] opacity-80 bg-[#1e2e28]' : 'bg-[#16221e]'
                  }`}
                >
                  🪵
                </div>
              </div>
              <div className="text-[11px] text-[#a8b8b0] font-serif mt-3 text-center">
                {chopClicks === 0 && '『冻木成堆 · 炉火将尽』'}
                {chopClicks === 1 && '『一剑劈下 · 木屑飞裂』'}
                {chopClicks === 2 && '『再挥青锋 · 柴薪备齐』'}
                {chopClicks >= 3 && '『火光燃起 · 满屋渐暖！』'}
              </div>
            </div>

            {animating && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-4xl animate-bounce text-[#d64d3e]">🔥</span>
              </div>
            )}
          </div>

          {/* Chop Button */}
          <button
            id="lvl1-btn-chop"
            onClick={handleChopClick}
            disabled={animating || chopClicks >= 3}
            className="flex items-center gap-2 px-8 py-3.5 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white hover:scale-105 active:scale-95 transition-all text-base font-serif font-bold shadow-lg cursor-pointer"
          >
            <Swords className="w-5 h-5 text-[#ffd885]" />
            <span>挥 剑 劈 柴 ({chopClicks}/3)</span>
          </button>
        </div>
      )}

      {/* STAGE: INTERLUDE TEXT (PDF Page 3) */}
      {stage === 'INTERLUDE' && (
        <div className="relative z-10 my-auto w-full max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-2xl text-center backdrop-blur-md">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] text-[#5cb87a] text-xs font-serif mb-3 border border-[#3b554b] font-bold">
            ❖ 悟剑沉思 ❖
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-4 tracking-wider">
            青锋映火 · 柴薪复燃
          </h2>
          <div className="text-sm sm:text-base font-serif text-[#d6e0db] leading-relaxed space-y-3 text-left bg-[#111916] p-4 rounded-sm border border-[#2b3e36] mb-6">
            <p>垫石锻身，寒石砺刃。</p>
            <p>一锤一磨之间，残剑渐直，锋芒再现。</p>
            <p>青锋映火。</p>
            <p>干将挥剑劈开冻木，柴薪重新燃起，寒屋渐暖。</p>
          </div>
          <button
            id="lvl1-btn-interlude-video"
            onClick={() => {
              sound.playClick();
              setStage('VIDEO2');
            }}
            className="px-8 py-3 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] hover:border-[#fff] text-[#ffd885] hover:text-white font-serif font-bold text-sm sm:text-base transition-all shadow-lg cursor-pointer active:scale-95"
          >
            观 赏 结 语 绘 卷 🎬
          </button>
        </div>
      )}

      {/* STAGE: VIDEO 2 */}
      {stage === 'VIDEO2' && (
        <VideoModal
          videoSrc="assets/video/level1_end.mp4"
          title="第一关 仁 · 终局感悟"
          subtitle="火光渐暖 · 剑有双刃 · 善恶在心"
          onComplete={() => setStage('CONCLUSION')}
        />
      )}

      {/* STAGE: CONCLUSION (PDF Page 3-4) - Wuxia Epilogue */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="第一关 仁 · 雪夜炊烟"
          badge="❖ 通关小结 ❖"
          badgeColor="#5cb87a"
          title="剑有锋芒 · 亦可生暖"
          accentColor="#5cb87a"
          lines={[
            '火光渐暖，干将轻抚剑身，久久无言。',
            '“剑有双刃，可伤人，亦可助人；”',
            '“锋芒从无善恶，善恶在于持剑之心。”',
            '这一夜，残剑重获青锋，救人于风雪；',
            '而干将心中封冻已久的一角，也随炉火悄然消融。',
            '他终于明白——剑有锋芒，亦可生暖。',
          ]}
          buttonText="领悟「仁」之剑德 ✦"
          onComplete={() => {
            sound.playVirtueChime();
            setStage('REWARD');
          }}
        />
      )}

      {/* STAGE: REWARD (PDF Page 4) */}
      {stage === 'REWARD' && (
        <div className="relative z-10 my-auto w-full max-w-md bg-[#16221e]/95 border border-[#5cb87a] rounded-sm p-8 shadow-[0_0_35px_rgba(92,184,122,0.3)] text-center backdrop-blur-md animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-sm bg-[#111916] border border-[#5cb87a] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(92,184,122,0.4)]">
            <span className="text-4xl font-serif font-extrabold text-[#5cb87a]">仁</span>
          </div>

          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#5cb87a] text-[#5cb87a] text-xs font-serif mb-2 font-bold">
            ❖ 终折 · 五德点亮 ❖
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wider">
            恭喜少侠，获得五德之「仁」！
          </h2>

          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mb-6">
            “以仁御锋，残剑生温。” 剑心碎片已补全一分！
          </p>

          <button
            id="lvl1-btn-return-map"
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
