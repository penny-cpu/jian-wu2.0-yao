import React, { useState } from 'react';
import { sound } from '../audio';
import { AssetConfig } from '../types';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import level1ForgeBg from '../assets/images/level1_forge_bg_1788327737418.jpg';
import level1GrindBg from '../assets/images/level1_grind_bg_1788327752026.jpg';
import level1ChopBg from '../assets/images/level1_chop_bg_1788327763685.jpg';

/* =========================================================================
 * 🌾【第一关（仁 · 雪夜炊烟）开头页与通关小结共用背景底图配置位置】
 * 包含4个独立图片资产位置，其中【开头页】与【通关小结页】共用同一张底图：
 * 1. LEVEL1_PRELUDE_AND_EPILOGUE_BG : 开头页（前情/前言/视频）与通关小结页面背景底图（全屏铺满）
 * 2. LEVEL1_FORGE_STAGE_BG          : 试炼一（垫石锻剑）背景底图
 * 3. LEVEL1_GRIND_STAGE_BG          : 试炼二（寒石开刃）背景底图
 * 4. LEVEL1_CHOP_STAGE_BG           : 试炼三（挥剑劈柴）背景底图
 * ========================================================================= */
import level1EpilogueBgImg from '../assets/images/level1_epilogue_bg_1788278832759.jpg';

export const LEVEL1_PRELUDE_AND_EPILOGUE_BG = level1EpilogueBgImg; // 资产1：第一关开头页与通关小结页共用底图（铺满整个页面）
export const LEVEL1_EPILOGUE_BG_IMAGE = level1EpilogueBgImg;       // 兼容别名
export const LEVEL1_FORGE_STAGE_BG = level1ForgeBg;                 // 资产2：试炼一 · 垫石锻剑背景图
export const LEVEL1_GRIND_STAGE_BG = level1GrindBg;                 // 资产3：试炼二 · 寒石开刃背景图
export const LEVEL1_CHOP_STAGE_BG = level1ChopBg;                   // 资产4：试炼三 · 挥剑劈柴背景图

import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { InscriptionStageBox } from '../components/InscriptionStageBox';
import { BronzeSwordGraphic } from '../components/BronzeSwordGraphic';
import { WoodenStakeGraphic } from '../components/WoodenStakeGraphic';
import { BronzeCornerPlaque } from '../components/BronzeCornerPlaque';
import { AncientBlackLinePlaque } from '../components/AncientBlackLinePlaque';
import { BronzeFiligreeButton } from '../components/BronzeFiligreeButton';
import { BlackGoldTag, BlackGoldButton } from '../components/BlackGoldBorder';
import { Sparkles, Flame, Hammer, Swords, ArrowRight, CheckCircle2 } from 'lucide-react';


interface Level1ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
  levelAssets?: AssetConfig;
}

type Stage = 'PRELUDE' | 'VIDEO1' | 'FORGE' | 'GRIND' | 'CHOP' | 'INTERLUDE' | 'VIDEO2' | 'CONCLUSION' | 'REWARD';

export const Level1View: React.FC<Level1ViewProps> = ({ onCompleteLevel, onBackToMap, levelAssets }) => {
  const [stage, setStage] = useState<Stage>('PRELUDE');
  const [forgeClicks, setForgeClicks] = useState(0);
  const [grindSwipes, setGrindSwipes] = useState(0);
  const [chopClicks, setChopClicks] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Background for current stage
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
      case 'INTERLUDE':
      case 'VIDEO2':
      case 'CONCLUSION':
      case 'REWARD':
        return LEVEL1_PRELUDE_AND_EPILOGUE_BG;
      case 'FORGE':
        return LEVEL1_FORGE_STAGE_BG;
      case 'GRIND':
        return LEVEL1_GRIND_STAGE_BG;
      case 'CHOP':
        return LEVEL1_CHOP_STAGE_BG;
      default:
        return LEVEL1_PRELUDE_AND_EPILOGUE_BG;
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
      className={`relative w-full h-full flex flex-col items-center justify-between select-none bg-cover bg-center overflow-hidden bg-[#0c1411] ${
        stage === 'CONCLUSION' ? 'p-0' : 'p-4 sm:p-6'
      }`}
      style={{ backgroundImage: `url(${getStageBg()})` }}
    >
      {/* Dark Overlay with Immersive Bronze Inscription Vignette (通关小结时全屏通透由 WuxiaEpilogue 独立管理) */}
      {stage !== 'CONCLUSION' && (
        <>
          <div className="absolute inset-0 bg-[#0a0f0d]/55 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,32,26,0.2)_0%,rgba(10,15,13,0.85)_100%)] pointer-events-none" />
        </>
      )}

      {/* Top Header Tag Styled as Inscribed Bronze Plaque (Top/bottom black-gold lines, no side borders) */}
      {stage !== 'CONCLUSION' && (
        <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
          <BlackGoldTag className="px-3.5 py-1.5 text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-full bg-[#5cb87a] shadow-[0_0_8px_#5cb87a] animate-pulse" />
            <span className="font-bold">第一关 仁 · 雪夜炊烟</span>
          </BlackGoldTag>
          <BlackGoldTag className="text-xs text-[#7bb39d] font-bold">
            {stage === 'FORGE' && '试炼一：垫石锻剑'}
            {stage === 'GRIND' && '试炼二：寒石开刃'}
            {stage === 'CHOP' && '试炼三：挥剑劈柴'}
            {stage === 'PRELUDE' && '试炼前情 · 雪夜'}
            {stage === 'INTERLUDE' && '剑道初悟'}
          </BlackGoldTag>
        </div>
      )}


      {/* STAGE: PRELUDE (Story Background from PDF Page 2-3) */}
      {stage === 'PRELUDE' && (
        <BronzeCornerPlaque className="relative z-10 my-auto w-full max-w-xl bg-[#16221e]/95 p-6 sm:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.95)] animate-fade-in flex flex-col justify-between">
          <div className="text-center mb-4">
            <div className="inline-block px-3 py-0.5 rounded-sm bg-[#111916] border border-[#3b554b] text-[#5cb87a] text-xs font-serif font-bold tracking-widest mb-1.5 shadow-sm">
              ❖ 第一关 仁 · 试炼前情 ❖
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest">
              雪夜炊烟 · 残剑之救
            </h3>
          </div>

          <div className="w-full h-36 sm:h-44 rounded-sm border border-[#3b554b] bg-[#16221e] mb-4 overflow-hidden relative group shadow-md">
            <img
              src={
                levelAssets?.stageImages?.['PRELUDE'] ||
                levelAssets?.backgroundImage ||
                LEVEL1_PRELUDE_AND_EPILOGUE_BG
              }
              alt="第一关前情绘卷"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1411]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="text-xs sm:text-sm md:text-base font-serif text-[#d6e0db] leading-relaxed space-y-2 text-center mb-6 px-1">
            <p>隆冬山雪封路，干将力竭荒野，幸得山间农家父女悉心搭救。</p>
            <p>醒时炉火将熄、病父卧榻，柴薪已尽而严寒风雪未有停意。</p>
            <p className="text-[#ffd885] font-semibold">墙角旧剑弯折蒙尘，望着将熄微火，他终决意再执剑铸暖救人。</p>
          </div>

          <div className="text-center">
            <BronzeFiligreeButton
              id="lvl1-btn-start-video"
              onClick={() => {
                sound.playClick();
                setStage('VIDEO1');
              }}
              variant="gold"
              size="md"
              rightOrnament={<ArrowRight className="w-4 h-4 text-[#dfba73]" />}
            >
              <span>观赏前情绘卷</span>
            </BronzeFiligreeButton>
          </div>
        </BronzeCornerPlaque>
      )}

      {/* STAGE: VIDEO 1 */}
      {stage === 'VIDEO1' && (
        <VideoModal
          videoSrc={levelAssets?.introVideo || 'assets/video/level1_start.mp4'}
          title="第一关 仁 · 启程前情"
          subtitle="山雪封路 · 农舍炉寒 · 残剑有温"
          onComplete={() => setStage('FORGE')}
        />
      )}

      {/* STAGE: 1 FORGE (锻剑) */}
      {stage === 'FORGE' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          {/* Prompt Banner */}
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              炉火未熄，且以锋芒生暖
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#7bb39d] tracking-wider">
              请点击铁锤敲击残剑，将弯折剑身锤直（进度：{forgeClicks} / 3）
            </p>
          </div>

          {/* Frameless Inscription Stage Box */}
          <InscriptionStageBox
            accentColor="#dfba73"
            glow={animating}
            widthClass="w-80 sm:w-96"
            heightClass="h-48 sm:h-56"
          >
            {/* Bronze Sword Graphic reacting dynamically to forge strikes */}
            <div className="relative transition-all duration-300 flex flex-col items-center justify-center">
              <BronzeSwordGraphic
                mode="forge"
                clicks={forgeClicks}
                animating={animating}
                size="md"
              />

              <div className="text-xs text-[#ffd885] font-serif mt-3 px-3.5 py-1 rounded-full bg-[#0a120f]/90 border border-[#dfba73]/40 shadow-md">
                {forgeClicks === 0 && '『弯折残剑 · 蒙尘多年』'}
                {forgeClicks === 1 && '『一锤落下 · 剑热微红 · 剑体稍直』'}
                {forgeClicks === 2 && '『二锤重铸 · 炽热通红 · 渐露锋姿』'}
                {forgeClicks >= 3 && '『三锤合度 · 赤金通透 · 剑身挺直！』'}
              </div>
            </div>

            {/* Spark animation */}
            {animating && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-5xl animate-ping">⚡</span>
              </div>
            )}
          </InscriptionStageBox>

          {/* Action Button */}
          <div className="mt-4">
            <BronzeFiligreeButton
              id="lvl1-btn-forge"
              onClick={handleForgeClick}
              disabled={animating || forgeClicks >= 3}
              variant="gold"
              size="lg"
              leftOrnament={<Hammer className="w-4 h-4 text-[#dfba73]" />}
            >
              <span>敲击锻剑 ({forgeClicks}/3)</span>
            </BronzeFiligreeButton>
          </div>
        </div>
      )}

      {/* STAGE: 2 GRIND (开刃) */}
      {stage === 'GRIND' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          {/* Prompt Banner */}
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              一磨一砺，寒芒初现
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#7bb39d] tracking-wider">
              请点击磨刀石摩擦剑刃 3 次，使其泛起青霜青芒（进度：{grindSwipes} / 3）
            </p>
          </div>

          {/* Frameless Inscription Stage Box */}
          <InscriptionStageBox
            accentColor="#00ffff"
            glow={animating}
            widthClass="w-80 sm:w-96"
            heightClass="h-48 sm:h-56"
          >
            <div className="relative transition-all duration-300 flex flex-col items-center justify-center">
              <BronzeSwordGraphic
                mode="grind"
                clicks={grindSwipes}
                animating={animating}
                size="md"
              />

              <div className="text-xs text-[#a5f3fc] font-serif mt-3 px-3.5 py-1 rounded-full bg-[#0a120f]/90 border border-[#00ffff]/40 shadow-md">
                {grindSwipes === 0 && '『寒石初砺 · 青铜暗沉』'}
                {grindSwipes === 1 && '『一磨破锈 · 剑锋微泛青芒』'}
                {grindSwipes === 2 && '『两度砥砺 · 寒气逼人 · 青霜流转』'}
                {grindSwipes >= 3 && '『三磨大成 · 青锋如水 · 碧芒冲霄！』'}
              </div>
            </div>

            {animating && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-5xl animate-pulse text-[#00ffff]">❄️</span>
              </div>
            )}
          </InscriptionStageBox>

          {/* Action Button */}
          <div className="mt-4">
            <BronzeFiligreeButton
              id="lvl1-btn-grind"
              onClick={handleGrindClick}
              disabled={animating || grindSwipes >= 3}
              variant="cyan"
              size="lg"
              leftOrnament={<Sparkles className="w-4 h-4 text-[#a5f3fc]" />}
            >
              <span>磨刀开刃 ({grindSwipes}/3)</span>
            </BronzeFiligreeButton>
          </div>
        </div>
      )}

      {/* STAGE: 3 CHOP (劈柴) */}
      {stage === 'CHOP' && (
        <div className="relative z-10 my-auto w-full max-w-xl flex flex-col items-center text-center">
          {/* Prompt Banner */}
          <div className="mb-4">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              青锋映火，寒屋重温
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#7bb39d] tracking-wider">
              请挥剑劈开冻木 3 次，为农舍燃起救命柴薪（进度：{chopClicks} / 3）
            </p>
          </div>

          {/* Frameless Inscription Stage Box */}
          <InscriptionStageBox
            accentColor="#d64d3e"
            glow={animating}
            widthClass="w-80 sm:w-96"
            heightClass="h-56 sm:h-64"
          >
            <div className="relative transition-all duration-300 flex flex-col items-center justify-center gap-2">
              {/* Floating Cyan Sword poised or in strike */}
              <div className={`transition-transform duration-300 ${animating ? 'scale-105 translate-y-1' : ''}`}>
                <BronzeSwordGraphic
                  mode="chop"
                  clicks={chopClicks}
                  animating={animating}
                  size="sm"
                />
              </div>

              {/* Two Realistic Wooden Stakes */}
              <div className="flex items-center justify-center gap-6 sm:gap-10 mt-1">
                <WoodenStakeGraphic
                  index={0}
                  chopClicks={chopClicks}
                  animating={animating}
                />
                <WoodenStakeGraphic
                  index={1}
                  chopClicks={chopClicks}
                  animating={animating}
                />
              </div>

              <div className="text-xs text-[#ffd885] font-serif px-3.5 py-1 rounded-full bg-[#0a120f]/90 border border-[#dfba73]/40 shadow-md mt-1">
                {chopClicks === 0 && '『冻木成堆 · 炉火将尽 · 青锋蓄势』'}
                {chopClicks === 1 && '『一剑劈下 · 左木应声劈裂 · 露出干燥木理』'}
                {chopClicks === 2 && '『再挥青锋 · 双木尽裂为柴 · 渐现炭红微光』'}
                {chopClicks >= 3 && '『火光燃起 · 满木熊熊生暖 · 寒室春回！』'}
              </div>
            </div>

            {animating && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-5xl animate-bounce text-[#d64d3e]">🔥</span>
              </div>
            )}
          </InscriptionStageBox>

          {/* Action Button */}
          <div className="mt-4">
            <BronzeFiligreeButton
              id="lvl1-btn-chop"
              onClick={handleChopClick}
              disabled={animating || chopClicks >= 3}
              variant="red"
              size="lg"
              leftOrnament={<Swords className="w-4 h-4 text-[#e65a4b]" />}
            >
              <span>持剑劈柴 ({chopClicks}/3)</span>
            </BronzeFiligreeButton>
          </div>
        </div>
      )}

      {/* STAGE: INTERLUDE TEXT (PDF Page 3) */}
      {stage === 'INTERLUDE' && (
        <BronzeCornerPlaque className="relative z-10 my-auto w-full max-w-lg bg-[#16221e]/95 p-6 sm:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.95)] animate-fade-in text-center flex flex-col justify-between">
          <div className="inline-block px-3 py-0.5 rounded-sm bg-[#111916] border border-[#3b554b] text-[#5cb87a] text-xs font-serif font-bold tracking-widest mb-3 mx-auto shadow-sm">
            ❖ 悟剑沉思 ❖
          </div>
          <div className="text-sm sm:text-base font-serif text-[#d6e0db] leading-relaxed space-y-3 text-left mb-6">
            <p>垫石锻身，寒石砺刃。</p>
            <p>一锤一磨之间，残剑渐直，锋芒再现。</p>
            <p className="font-bold text-[#ffd885]">青锋映火。</p>
            <p>干将挥剑劈开冻木，柴薪重新燃起，寒屋渐暖。</p>
          </div>
          <div>
            <BronzeFiligreeButton
              id="lvl1-btn-interlude-video"
              onClick={() => {
                sound.playClick();
                setStage('VIDEO2');
              }}
              variant="gold"
              size="md"
              rightOrnament={<ArrowRight className="w-4 h-4 text-[#dfba73]" />}
            >
              <span>观赏结语绘卷</span>
            </BronzeFiligreeButton>
          </div>
        </BronzeCornerPlaque>
      )}

      {/* STAGE: VIDEO 2 */}
      {stage === 'VIDEO2' && (
        <VideoModal
          videoSrc={levelAssets?.outroVideo || 'assets/video/level1_end.mp4'}
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
          bgImageUrl={levelAssets?.summaryImage || LEVEL1_EPILOGUE_BG_IMAGE}
          maskOpacity={0.60}
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
        <AncientBlackLinePlaque className="relative z-10 my-auto w-full max-w-md bg-[#16221e]/98 p-8 rounded-none text-center shadow-[0_20px_50px_rgba(0,0,0,0.95)] animate-fade-in flex flex-col items-center">
          <BlackGoldTag className="text-[#5cb87a] text-xs font-serif font-bold tracking-widest mb-3">
            ❖ 终折 · 五德点亮 ❖
          </BlackGoldTag>
          <div className="w-20 h-20 mx-auto rounded-none bg-gradient-to-br from-[#1b3327] to-[#0a1711] border-2 border-black flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(92,184,122,0.4)]">
            <span className="text-4xl font-serif font-black text-[#5cb87a]">仁</span>
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-widest">
            恭获五德之「仁」
          </h3>
          <p className="text-xs sm:text-sm font-serif text-[#7bb39d] mb-6">
            “以仁御锋，残剑生温。” 剑心碎片已补全一分！
          </p>

          <BlackGoldButton
            id="lvl1-btn-return-map"
            onClick={() => {
              sound.playClick();
              onCompleteLevel();
            }}
            variant="gold"
            size="lg"
          >
            <span>重 返 九 州 图</span>
          </BlackGoldButton>
        </AncientBlackLinePlaque>
      )}
    </div>
  );
};
