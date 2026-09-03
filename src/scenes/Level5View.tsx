import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../audio';
import { VideoModal } from '../components/VideoModal';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { AncientBlackLinePlaque } from '../components/AncientBlackLinePlaque';
import { WarringStatesVirtueToken } from '../components/WarringStatesVirtueToken';
import { BlackGoldTag, BlackGoldButton } from '../components/BlackGoldBorder';
import { ArrowLeft, ArrowRight, RotateCcw, MapPin, Sparkles, MousePointer, Award } from 'lucide-react';
import { LEVEL_VIDEO_CONFIGS } from '../config/videoConfig';

/* =========================================================================
 * 📜【第五关（信 · 孤山挂剑）背景底图独立配置位置】
 * ========================================================================= */
import level5ScrollComicBgImg from '../assets/images/level5_scroll_comic_bg_1788338618849.jpg';
import level5SunsetSwordBgImg from '../assets/images/level5_sunset_sword_bg_1788338631538.jpg';
import level5RewardTrustBgImg from '../assets/images/level5_reward_trust_bg_1788338643011.jpg';

export const LEVEL5_PRELUDE_BG_IMAGE = level5ScrollComicBgImg;
export const LEVEL5_EPILOGUE_BG_IMAGE = level5ScrollComicBgImg;
export const LEVEL5_PARKOUR_BG_IMAGE = level5SunsetSwordBgImg;
export const LEVEL5_REWARD_BG_IMAGE = level5RewardTrustBgImg;

interface Level5ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
}

type Stage = 'PRELUDE' | 'VIDEO1' | 'PARKOUR' | 'VIDEO2' | 'CONCLUSION' | 'REWARD';

interface RockObstacle {
  id: number;
  lane: number;
  y: number;
  variant: number;
  sizeScale: number;
  rotAngle: number;
  rotSpeed: number;
}

const RuggedMountainRock: React.FC<{
  variant: number;
  sizeScale: number;
  rotAngle: number;
}> = ({ variant, sizeScale, rotAngle }) => {
  const baseSize = 48 * sizeScale;

  return (
    <div
      style={{
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        transform: `rotate(${rotAngle}deg)`,
      }}
      className="relative drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] flex items-center justify-center transition-transform"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]"
      >
        <defs>
          <linearGradient id={`rockGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a3f35" />
            <stop offset="35%" stopColor="#332a22" />
            <stop offset="70%" stopColor="#221b15" />
            <stop offset="100%" stopColor="#120e0b" />
          </linearGradient>

          <linearGradient id={`rockHighlight-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7a6958" />
            <stop offset="100%" stopColor="#3d3228" />
          </linearGradient>
        </defs>

        {variant === 0 && (
          <g>
            <polygon
              points="50,6 84,24 94,62 76,92 32,96 8,68 18,26"
              fill={`url(#rockGrad-${variant})`}
              stroke="#5c4d3f"
              strokeWidth="2.5"
            />
            <polygon points="50,6 84,24 58,54 38,40" fill={`url(#rockHighlight-${variant})`} opacity="0.8" />
            <polygon points="58,54 84,24 94,62 68,76" fill="#1b140f" opacity="0.6" />
            <polygon points="38,40 58,54 68,76 32,96 24,66" fill="#241b14" />
            <polygon points="18,26 38,40 24,66 8,68" fill={`url(#rockHighlight-${variant})`} opacity="0.5" />
            <path d="M50,6 L58,54 L32,96 M38,40 L24,66" stroke="#120c08" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {variant === 1 && (
          <g>
            <polygon
              points="38,8 74,12 92,42 86,84 46,94 14,78 6,40"
              fill={`url(#rockGrad-${variant})`}
              stroke="#6b5744"
              strokeWidth="2.5"
            />
            <polygon points="38,8 74,12 62,48 26,42" fill={`url(#rockHighlight-${variant})`} opacity="0.9" />
            <polygon points="62,48 74,12 92,42 86,84 54,68" fill="#18110b" opacity="0.75" />
            <polygon points="26,42 62,48 54,68 46,94 14,78" fill="#2a2018" />
            <path d="M38,8 Q50,22 62,48 Q40,60 14,78" stroke="#7a8c6a" strokeWidth="1.8" fill="none" opacity="0.6" />
            <circle cx="68" cy="30" r="3" fill="#8f7a63" />
          </g>
        )}

        {variant === 2 && (
          <g>
            <polygon
              points="60,4 92,30 96,74 66,96 22,88 4,52 20,16"
              fill={`url(#rockGrad-${variant})`}
              stroke="#594636"
              strokeWidth="2.5"
            />
            <polygon points="60,4 92,30 52,56 20,16" fill={`url(#rockHighlight-${variant})`} opacity="0.85" />
            <polygon points="52,56 92,30 96,74 66,96" fill="#140e0a" opacity="0.8" />
            <polygon points="20,16 52,56 66,96 22,88 4,52" fill="#261d15" />
            <path d="M60,4 L52,56 L66,96 M52,56 L4,52" stroke="#0f0a07" strokeWidth="2.5" />
          </g>
        )}

        {variant === 3 && (
          <g>
            <polygon
              points="28,6 48,26 78,8 94,48 80,94 36,92 8,62"
              fill={`url(#rockGrad-${variant})`}
              stroke="#634f3d"
              strokeWidth="2.5"
            />
            <polygon points="28,6 48,26 36,60 8,62" fill={`url(#rockHighlight-${variant})`} opacity="0.9" />
            <polygon points="48,26 78,8 94,48 64,62 36,60" fill={`url(#rockHighlight-${variant})`} opacity="0.6" />
            <polygon points="94,48 80,94 36,92 64,62" fill="#17100b" opacity="0.85" />
            <path d="M48,26 L36,60 L36,92 M48,26 L64,62 L80,94" stroke="#120c08" strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  );
};

const WuxiaWarriorSprite: React.FC = () => {
  return (
    <div className="relative w-16 sm:w-20 h-24 sm:h-28 flex flex-col items-center select-none pointer-events-none drop-shadow-[0_10px_20px_rgba(255,216,133,0.35)]">
      <svg
        viewBox="0 0 100 130"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="warriorArmor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a3b2c" />
            <stop offset="50%" stopColor="#2e2318" />
            <stop offset="100%" stopColor="#19120c" />
          </linearGradient>
          <linearGradient id="robeRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b83828" />
            <stop offset="100%" stopColor="#6e1d13" />
          </linearGradient>
          <linearGradient id="bronzeTrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd885" />
            <stop offset="50%" stopColor="#c5a059" />
            <stop offset="100%" stopColor="#8c6a2e" />
          </linearGradient>
        </defs>

        <path
          d="M32,45 Q15,85 10,118 Q35,110 50,115 Q65,110 90,118 Q85,85 68,45 Z"
          fill="url(#robeRed)"
          stroke="#420f09"
          strokeWidth="1.5"
        />

        <g transform="translate(68, 25) rotate(28)">
          <rect x="-4" y="0" width="8" height="75" rx="2" fill="#1f1812" stroke="#c5a059" strokeWidth="1.2" />
          <rect x="-8" y="-3" width="16" height="5" rx="1.5" fill="url(#bronzeTrim)" />
          <rect x="-3" y="-22" width="6" height="20" rx="1" fill="#8c2e1f" />
          <circle cx="0" cy="-24" r="4.5" fill="url(#bronzeTrim)" />
          <path d="M0,-24 Q-8,-32 -4,-40" stroke="#d64d3e" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        <path d="M36,92 L32,118 L44,122 L46,92 Z" fill="#241b14" stroke="#120c08" strokeWidth="1.2" />
        <rect x="31" y="104" width="14" height="12" rx="2" fill="url(#warriorArmor)" stroke="#c5a059" strokeWidth="0.8" />
        <path d="M54,92 L54,122 L66,118 L64,92 Z" fill="#241b14" stroke="#120c08" strokeWidth="1.2" />
        <rect x="53" y="104" width="14" height="12" rx="2" fill="url(#warriorArmor)" stroke="#c5a059" strokeWidth="0.8" />

        <path d="M30,72 L26,95 Q50,100 74,95 L70,72 Z" fill="url(#warriorArmor)" stroke="#c5a059" strokeWidth="1.5" />
        <path d="M40,74 L37,96 M50,74 L50,97 M60,74 L63,96" stroke="#c5a059" strokeWidth="1" strokeDasharray="3 2" />

        <rect x="28" y="68" width="44" height="8" rx="2" fill="#8c2e1f" stroke="#c5a059" strokeWidth="1.2" />
        <circle cx="50" cy="72" r="5.5" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1" />

        <path d="M30,42 L70,42 L66,70 L34,70 Z" fill="url(#warriorArmor)" stroke="#120c08" strokeWidth="1.5" />
        <circle cx="50" cy="55" r="9.5" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1.2" />
        <circle cx="50" cy="55" r="5" fill="#ffd885" opacity="0.6" />

        <ellipse cx="28" cy="46" rx="9" ry="7" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1.2" />
        <path d="M24,48 L18,72 L26,74 L30,52 Z" fill="url(#warriorArmor)" stroke="#120c08" strokeWidth="1" />
        <rect x="17" y="62" width="10" height="10" rx="1.5" fill="url(#bronzeTrim)" />

        <ellipse cx="72" cy="46" rx="9" ry="7" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1.2" />
        <path d="M76,48 L82,72 L74,74 L70,52 Z" fill="url(#warriorArmor)" stroke="#120c08" strokeWidth="1" />
        <rect x="73" y="62" width="10" height="10" rx="1.5" fill="url(#bronzeTrim)" />

        <rect x="44" y="32" width="12" height="12" fill="#dfc3a3" />
        <ellipse cx="50" cy="27" rx="13" ry="14" fill="#faebd7" stroke="#b89370" strokeWidth="1" />

        <path d="M42,24 L48,22" stroke="#1f140d" strokeWidth="2" strokeLinecap="round" />
        <path d="M52,22 L58,24" stroke="#1f140d" strokeWidth="2" strokeLinecap="round" />
        <circle cx="45" cy="27" r="2" fill="#1f140d" />
        <circle cx="55" cy="27" r="2" fill="#1f140d" />

        <path d="M36,22 Q50,8 64,22 L66,16 Q50,4 34,16 Z" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1.2" />
        <path d="M37,16 Q50,5 63,16 Z" fill="#2e2318" />
        <ellipse cx="50" cy="8" rx="5" ry="4" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1" />
        <path d="M50,6 Q45,-8 36,-6 Q42,-2 48,6" fill="#d64d3e" stroke="#8c1f14" strokeWidth="1" />
        <path d="M50,6 Q56,-9 64,-5 Q58,-1 52,6" fill="#d64d3e" stroke="#8c1f14" strokeWidth="1" />

        <g transform="translate(50, 126)">
          <rect x="-18" y="-4" width="36" height="10" rx="0" fill="#16221e" stroke="#000" strokeWidth="1" />
          <text x="0" y="4" fill="#ffd885" fontSize="7" fontWeight="bold" fontFamily="serif" textAnchor="middle">
            干将
          </text>
        </g>
      </svg>
    </div>
  );
};

export const Level5View: React.FC<Level5ViewProps> = ({ onCompleteLevel, onBackToMap }) => {
  const [stage, setStage] = useState<Stage>('PRELUDE');
  const [playerLane, setPlayerLane] = useState(1);
  const [score, setScore] = useState(0);
  const targetScore = 100;
  const [isGameOver, setIsGameOver] = useState(false);
  const [rocks, setRocks] = useState<RockObstacle[]>([]);
  const nextRockId = useRef(1);
  const trackRef = useRef<HTMLDivElement>(null);

  const moveLeft = () => {
    if (playerLane > 0) {
      sound.playClick();
      setPlayerLane(playerLane - 1);
    }
  };

  const moveRight = () => {
    if (playerLane < 2) {
      sound.playClick();
      setPlayerLane(playerLane + 1);
    }
  };

  const handleTrackPointerMove = (clientX: number) => {
    if (stage !== 'PARKOUR' || isGameOver || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const width = rect.width;
    const third = width / 3;

    let targetLane = 1;
    if (relativeX < third) {
      targetLane = 0;
    } else if (relativeX > third * 2) {
      targetLane = 2;
    }

    if (targetLane !== playerLane) {
      sound.playClick();
      setPlayerLane(targetLane);
    }
  };

  useEffect(() => {
    if (stage !== 'PARKOUR' || isGameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        moveLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        moveRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, playerLane, isGameOver]);

  useEffect(() => {
    if (stage !== 'PARKOUR' || isGameOver) return;

    const spawnInterval = setInterval(() => {
      setRocks(prev => {
        if (prev.length >= 6) return prev;
        const randomLane = Math.floor(Math.random() * 3);
        const randomVariant = Math.floor(Math.random() * 4);
        const randomScale = 0.9 + Math.random() * 0.4;
        const randomRotSpeed = (Math.random() - 0.5) * 8;

        const newRock: RockObstacle = {
          id: nextRockId.current++,
          lane: randomLane,
          y: -15,
          variant: randomVariant,
          sizeScale: randomScale,
          rotAngle: Math.random() * 360,
          rotSpeed: randomRotSpeed,
        };
        return [...prev, newRock];
      });
    }, 1100);

    const moveInterval = setInterval(() => {
      setRocks(prev => {
        const updated = prev.map(r => ({
          ...r,
          y: r.y + 2.2,
          rotAngle: r.rotAngle + r.rotSpeed,
        }));

        for (const r of updated) {
          if (r.y >= 75 && r.y <= 92 && r.lane === playerLane) {
            sound.playSwordClash();
            setIsGameOver(true);
            return [];
          }
        }

        return updated.filter(r => r.y <= 110);
      });
    }, 40);

    const scoreInterval = setInterval(() => {
      setScore(prev => {
        const nextVal = prev + 1;
        if (nextVal >= targetScore) {
          clearInterval(scoreInterval);
          sound.playVirtueChime();
          setTimeout(() => {
            setStage('VIDEO2');
          }, 800);
          return targetScore;
        }
        return nextVal;
      });
    }, 200);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
      clearInterval(scoreInterval);
    };
  }, [stage, playerLane, isGameOver]);

  const handleRestartParkour = () => {
    sound.playClick();
    setIsGameOver(false);
    setScore(0);
    setRocks([]);
    setPlayerLane(1);
  };

  const getStageBg = () => {
    switch (stage) {
      case 'PRELUDE':
      case 'VIDEO1':
        return LEVEL5_PRELUDE_BG_IMAGE;
      case 'PARKOUR':
        return LEVEL5_PARKOUR_BG_IMAGE;
      case 'CONCLUSION':
        return LEVEL5_EPILOGUE_BG_IMAGE;
      case 'REWARD':
        return LEVEL5_REWARD_BG_IMAGE;
      default:
        return LEVEL5_PRELUDE_BG_IMAGE;
    }
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none bg-cover bg-center overflow-hidden bg-[#0c1411] transition-all duration-700 ${
        stage === 'PARKOUR' ? 'cursor-ew-resize' : ''
      }`}
      style={{ backgroundImage: `url(${getStageBg()})` }}
    >
      {stage !== 'CONCLUSION' && (
        <>
          <div
            className={`absolute inset-0 transition-colors duration-500 backdrop-blur-[0.5px] ${
              stage === 'PARKOUR'
                ? 'bg-[#0a0f0d]/55'
                : 'bg-[#0a0f0d]/60'
            }`}
          />
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
              stage === 'PARKOUR'
                ? 'bg-[radial-gradient(circle_at_center,rgba(20,32,26,0.15)_0%,rgba(10,15,13,0.75)_100%)]'
                : 'bg-[radial-gradient(circle_at_center,rgba(20,32,26,0.25)_0%,rgba(10,15,13,0.85)_100%)]'
            }`}
          />
        </>
      )}

      {/* Top Header Tag (Top/bottom black-gold lines, no side borders) */}
      {stage !== 'CONCLUSION' && (
        <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
          <BlackGoldTag className="px-3.5 py-1.5 text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-none bg-[#a06ad4] border border-black inline-block" />
            <span className="font-bold">第五关 信 · 孤山挂剑</span>
          </BlackGoldTag>
          <BlackGoldTag className="text-xs text-[#7bb39d] font-bold">
            {stage === 'PARKOUR' && `登临进度：${score}% / 100%`}
            {stage === 'REWARD' && `❖ 五德之信 · 功德圆满 ❖`}
          </BlackGoldTag>
        </div>
      )}


      {/* STAGE: PRELUDE */}
      {stage === 'PRELUDE' && (
        <AncientBlackLinePlaque className="relative z-10 my-auto w-full max-w-xl bg-[#16221e]/98 p-6 sm:p-8 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.98)] animate-fade-in flex flex-col justify-between">
          <div className="text-center mb-4">
            <div className="inline-block px-3 py-0.5 rounded-none bg-[#111916] border border-black text-[#ffd885] text-xs font-serif font-bold tracking-widest mb-1.5 shadow-sm">
              ❖ 第五关 信 · 试炼前情 ❖
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest">
              孤山万仞 · 赴昔年之诺
            </h3>
          </div>

          <div className="w-full h-36 sm:h-44 rounded-none border-2 border-black bg-[#16221e] mb-4 overflow-hidden relative group shadow-md">
            <img
              src={LEVEL5_PRELUDE_BG_IMAGE}
              alt="第五关试炼前情绘卷"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1411]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="text-xs sm:text-sm md:text-base font-serif text-[#d6e0db] leading-relaxed space-y-2 text-center mb-6 px-1">
            <p>孤山万仞风雪凄迷，干将背负长剑攀登绝壁，毅然赴故友昔年之约。</p>
            <p>险峰滚石横飞阻路，然一诺既出重逾千斤，纵历万险亦不退缩半步。</p>
            <p className="text-[#ffd885] font-semibold">“言必信，行必果。剑立天地浩气长存，当以千金一诺立本。”</p>
          </div>

          <div className="text-center flex justify-center">
            <BlackGoldButton
              id="lvl5-btn-start-video"
              variant="gold"
              size="lg"
              onClick={() => {
                sound.playClick();
                setStage('VIDEO1');
              }}
            >
              <span>观 赏 试 炼 绘 卷</span>
            </BlackGoldButton>
          </div>

        </AncientBlackLinePlaque>
      )}

      {/* STAGE: VIDEO 1 */}
      {stage === 'VIDEO1' && (
        <VideoModal
          videoSrc={LEVEL_VIDEO_CONFIGS.LEVEL5.introVideo}
          title={LEVEL_VIDEO_CONFIGS.LEVEL5.introTitle}
          subtitle={LEVEL_VIDEO_CONFIGS.LEVEL5.introSubtitle}
          onComplete={() => setStage('PARKOUR')}
        />
      )}

      {/* STAGE: PARKOUR MINIGAME */}
      {stage === 'PARKOUR' && (
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center my-auto">
          <div className="mb-4 text-center">
            <div className="inline-block px-3 py-0.5 rounded-none bg-[#111916] border border-black text-[#ffd885] text-xs font-serif font-bold tracking-widest mb-1.5 shadow-sm">
              ❖ 信之试炼 · 登临进度 {score}% ❖
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] tracking-widest mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              履信守诺 · 绝壁疾行
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#ffd885] tracking-wider">
              利用下方按键或鼠标左右滑动，敏锐避开上方崩落之山石
            </p>
          </div>

          <AncientBlackLinePlaque className="w-full max-w-2xl h-[460px] sm:h-[480px] p-0 bg-[#0c1411] rounded-none border-2 border-black overflow-hidden flex flex-col justify-between">
            <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
              <div className="p-2.5 bg-[#111916]/95 border-b border-black flex items-center justify-between z-20">
                <div className="text-xs font-serif text-[#ffd885] font-bold tracking-wider">
                  ❖ 登顶进度 ❖
                </div>
                <div className="w-48 sm:w-64 h-2.5 bg-[#0a0f0d] border border-black rounded-none p-0.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#3b554b] via-[#dfba73] to-[#ffd885] rounded-none transition-all duration-200"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <div className="text-xs font-serif text-[#7bb39d] font-bold">
                  {score}%
                </div>
              </div>

              <div
                ref={trackRef}
                id="lvl5-parkour-track"
                onMouseMove={e => handleTrackPointerMove(e.clientX)}
                onTouchMove={e => {
                  if (e.touches[0]) {
                    handleTrackPointerMove(e.touches[0].clientX);
                  }
                }}
                className="relative flex-1 w-full flex justify-around items-end pb-3 overflow-hidden bg-gradient-to-b from-[#0a0f0d]/80 via-[#111916]/70 to-[#090e0c]/90 cursor-ew-resize"
              >
                <div className="absolute inset-y-0 left-1/3 border-l border-dashed border-black/80" />
                <div className="absolute inset-y-0 right-1/3 border-l border-dashed border-black/80" />

                <div
                  style={{
                    left: playerLane === 0 ? '0%' : playerLane === 1 ? '33.33%' : '66.66%',
                  }}
                  className="absolute inset-y-0 w-1/3 bg-[#dfba73]/[0.05] transition-all duration-200 pointer-events-none"
                />

                {rocks.map(rock => {
                  const laneX = rock.lane === 0 ? '16.6%' : rock.lane === 1 ? '50%' : '83.3%';
                  return (
                    <div
                      key={rock.id}
                      style={{
                        left: laneX,
                        top: `${rock.y}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10"
                    >
                      <RuggedMountainRock
                        variant={rock.variant}
                        sizeScale={rock.sizeScale}
                        rotAngle={rock.rotAngle}
                      />
                    </div>
                  );
                })}

                <div
                  style={{
                    left: playerLane === 0 ? '16.6%' : playerLane === 1 ? '50%' : '83.3%',
                    bottom: '12px',
                  }}
                  className="absolute -translate-x-1/2 transition-all duration-200 flex flex-col items-center pointer-events-none z-20"
                >
                  <WuxiaWarriorSprite />
                </div>
              </div>

              <div className="p-3 bg-[#111916]/95 border-t border-black flex items-center justify-center gap-4 sm:gap-6 z-20">
                <button
                  id="lvl5-btn-left"
                  onClick={moveLeft}
                  className="px-6 py-2 rounded-none bg-[#1c2a23] border border-black hover:border-[#dfba73] text-[#ffd885] hover:text-white font-serif font-bold text-sm tracking-wider cursor-pointer shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>左 闪</span>
                </button>

                <button
                  id="lvl5-btn-right"
                  onClick={moveRight}
                  className="px-6 py-2 rounded-none bg-[#1c2a23] border border-black hover:border-[#dfba73] text-[#ffd885] hover:text-white font-serif font-bold text-sm tracking-wider cursor-pointer shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>右 避</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* GAME OVER MODAL (4-side clean black line) */}
              {isGameOver && (
                <div className="absolute inset-0 z-50 bg-[#0a0f0d]/92 backdrop-blur-sm flex items-center justify-center p-4">
                  <AncientBlackLinePlaque className="w-full max-w-md bg-[#16221e]/98 p-6 text-center shadow-2xl animate-fade-in">
                    <h3 className="text-xl font-serif font-bold text-[#ffd885] mb-3 tracking-wider">
                      【 山 石 滚 落 · 登 山 中 断 】
                    </h3>
                    <p className="text-sm font-serif text-[#d6e0db] leading-relaxed mb-6">
                      你被上方崩落的山石阻断，信守承诺不可半途而废，稍作调息再次登顶！
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <BlackGoldButton
                        id="lvl5-btn-retry"
                        variant="crimson"
                        size="md"
                        onClick={handleRestartParkour}
                      >
                        再试此关
                      </BlackGoldButton>

                      <BlackGoldButton
                        id="lvl5-btn-back-map"
                        variant="dark"
                        size="md"
                        onClick={() => {
                          sound.playClick();
                          onBackToMap();
                        }}
                      >
                        回九州图
                      </BlackGoldButton>
                    </div>

                  </AncientBlackLinePlaque>
                </div>
              )}
            </div>
          </AncientBlackLinePlaque>
        </div>
      )}

      {/* STAGE: VIDEO 2 */}
      {stage === 'VIDEO2' && (
        <VideoModal
          videoSrc={LEVEL_VIDEO_CONFIGS.LEVEL5.outroVideo}
          title={LEVEL_VIDEO_CONFIGS.LEVEL5.outroTitle}
          subtitle={LEVEL_VIDEO_CONFIGS.LEVEL5.outroSubtitle}
          onComplete={() => setStage('CONCLUSION')}
        />
      )}

      {/* STAGE: CONCLUSION */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="第五关 信 · 孤山挂剑"
          badge="❖ 通关小结 ❖"
          badgeColor="#dfba73"
          title="履信守诺 · 孤山挂剑"
          accentColor="#ffd885"
          bgImageUrl={LEVEL5_EPILOGUE_BG_IMAGE}
          maskOpacity={0.60}
          lines={[
            '绝顶风息，长剑悬于古树枝头，静对苍穹。',
            '“剑立天地间，一诺重千钧。”',
            '“行有所止，诺有所履，方不负持剑之初衷。”',
            '干将抚剑作别，心中再无滞碍，五德圆融通达。',
            '挂剑长青，此心昭昭，天地同鉴。',
            '他终于明白——剑有锋芒，当立于信诚。',
          ]}
          buttonText="领悟「信」之剑德 ✦"
          onComplete={() => {
            sound.playVirtueChime();
            setStage('REWARD');
          }}
        />
      )}

      {/* STAGE: REWARD */}
      {stage === 'REWARD' && (
        <AncientBlackLinePlaque className="relative z-10 my-auto w-full max-w-lg bg-[#16221e]/98 p-8 sm:p-10 rounded-none text-center shadow-[0_25px_60px_rgba(0,0,0,0.98)] animate-fade-in flex flex-col items-center">
          <div className="inline-block px-4 py-1 rounded-none bg-[#111916] border border-black text-[#ffd885] text-xs font-serif font-bold tracking-widest mb-4 shadow-sm">
            ❖ 终折 · 五德点亮 · 功德圆满 ❖
          </div>

          <p className="text-sm sm:text-base font-serif text-[#ffd885] tracking-widest mb-2">
            恭 喜 玩 家 获 得
          </p>

          <div className="mb-4">
            <WarringStatesVirtueToken
              virtueId="XIN"
              character="信"
              name="信"
              isUnlocked={true}
              variant="medallion"
            />
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f5efe3] mb-2 tracking-widest drop-shadow-md">
            五德之「信」
          </h3>

          <p className="text-xs sm:text-sm font-serif text-[#d6e0db] leading-relaxed mb-6 max-w-sm">
            “千金一诺，剑立乾坤。孤山挂剑，天地同心。” 五德已然齐聚圆满，干将之剑锋芒内敛，浩气长存！
          </p>

          <BlackGoldButton
            id="lvl5-btn-return-map"
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
