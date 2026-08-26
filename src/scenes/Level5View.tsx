import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../audio';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { ArrowLeft, ArrowRight, RotateCcw, MapPin, Sparkles, MousePointer } from 'lucide-react';

interface Level5ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
}

type Stage = 'PRELUDE' | 'VIDEO1' | 'PARKOUR' | 'VIDEO2' | 'CONCLUSION' | 'REWARD';

interface RockObstacle {
  id: number;
  lane: number; // 0, 1, 2
  y: number; // percentage 0 to 100
  variant: number; // 0, 1, 2, 3
  sizeScale: number; // 0.85 to 1.3
  rotAngle: number;
  rotSpeed: number;
}

// 崎岖不规则落石组件 (4种形态不同、大小各异的山石)
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
          {/* Rock Dark Crag Gradient */}
          <linearGradient id={`rockGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a3f35" />
            <stop offset="35%" stopColor="#332a22" />
            <stop offset="70%" stopColor="#221b15" />
            <stop offset="100%" stopColor="#120e0b" />
          </linearGradient>

          {/* Highlights */}
          <linearGradient id={`rockHighlight-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7a6958" />
            <stop offset="100%" stopColor="#3d3228" />
          </linearGradient>
        </defs>

        {variant === 0 && (
          // 尖锐多棱巨石 (Angular Jagged Crag)
          <g>
            <polygon
              points="50,6 84,24 94,62 76,92 32,96 8,68 18,26"
              fill={`url(#rockGrad-${variant})`}
              stroke="#5c4d3f"
              strokeWidth="2.5"
            />
            {/* Facets & Fissures */}
            <polygon points="50,6 84,24 58,54 38,40" fill={`url(#rockHighlight-${variant})`} opacity="0.8" />
            <polygon points="58,54 84,24 94,62 68,76" fill="#1b140f" opacity="0.6" />
            <polygon points="38,40 58,54 68,76 32,96 24,66" fill="#241b14" />
            <polygon points="18,26 38,40 24,66 8,68" fill={`url(#rockHighlight-${variant})`} opacity="0.5" />
            {/* Cracks / Fissure lines */}
            <path d="M50,6 L58,54 L32,96 M38,40 L24,66" stroke="#120c08" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {variant === 1 && (
          // 嶙峋崩解断石 (Fragmented Ridge Rock)
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
            {/* Mountain Moss / Mineral Patina Accent */}
            <path d="M38,8 Q50,22 62,48 Q40,60 14,78" stroke="#7a8c6a" strokeWidth="1.8" fill="none" opacity="0.6" />
            <circle cx="68" cy="30" r="3" fill="#8f7a63" />
          </g>
        )}

        {variant === 2 && (
          // 倾斜巨壁碎岩 (Tilted Boulder Slab)
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
          // 双峰峥嵘奇石 (Dual-Spire Craggy Rock)
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

// 武将打扮小人组件 (战将甲胄、红缨束发、手挽古剑、矫健步态)
const WuxiaWarriorSprite: React.FC = () => {
  return (
    <div className="relative w-16 sm:w-20 h-24 sm:h-28 flex flex-col items-center select-none pointer-events-none drop-shadow-[0_10px_20px_rgba(255,216,133,0.35)]">
      <svg
        viewBox="0 0 100 130"
        className="w-full h-full"
      >
        <defs>
          {/* Armor Bronze/Iron Gradient */}
          <linearGradient id="warriorArmor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a3b2c" />
            <stop offset="50%" stopColor="#2e2318" />
            <stop offset="100%" stopColor="#19120c" />
          </linearGradient>
          {/* Robe Crimson Red Accent */}
          <linearGradient id="robeRed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b83828" />
            <stop offset="100%" stopColor="#6e1d13" />
          </linearGradient>
          {/* Bronze Trim */}
          <linearGradient id="bronzeTrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd885" />
            <stop offset="50%" stopColor="#c5a059" />
            <stop offset="100%" stopColor="#8c6a2e" />
          </linearGradient>
          {/* Sword Blade Glow */}
          <linearGradient id="swordBlade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#d9f0ea" />
            <stop offset="100%" stopColor="#7bb39d" />
          </linearGradient>
        </defs>

        {/* 1. Behind: Flowing Martial Cape (战袍披风) */}
        <path
          d="M32,45 Q15,85 10,118 Q35,110 50,115 Q65,110 90,118 Q85,85 68,45 Z"
          fill="url(#robeRed)"
          stroke="#420f09"
          strokeWidth="1.5"
        />

        {/* 2. Slung Sword on Back (背负古剑 / 剑柄出鞘) */}
        <g transform="translate(68, 25) rotate(28)">
          {/* Blade Scabbard */}
          <rect x="-4" y="0" width="8" height="75" rx="2" fill="#1f1812" stroke="#c5a059" strokeWidth="1.2" />
          {/* Guard */}
          <rect x="-8" y="-3" width="16" height="5" rx="1.5" fill="url(#bronzeTrim)" />
          {/* Hilt & Pommel */}
          <rect x="-3" y="-22" width="6" height="20" rx="1" fill="#8c2e1f" />
          <circle cx="0" cy="-24" r="4.5" fill="url(#bronzeTrim)" />
          {/* Red Sword Tassel (剑穗) */}
          <path d="M0,-24 Q-8,-32 -4,-40" stroke="#d64d3e" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* 3. Legs & Armored Greaves (武将胫甲战靴) */}
        {/* Left Leg */}
        <path d="M36,92 L32,118 L44,122 L46,92 Z" fill="#241b14" stroke="#120c08" strokeWidth="1.2" />
        <rect x="31" y="104" width="14" height="12" rx="2" fill="url(#warriorArmor)" stroke="#c5a059" strokeWidth="0.8" />
        {/* Right Leg */}
        <path d="M54,92 L54,122 L66,118 L64,92 Z" fill="#241b14" stroke="#120c08" strokeWidth="1.2" />
        <rect x="53" y="104" width="14" height="12" rx="2" fill="url(#warriorArmor)" stroke="#c5a059" strokeWidth="0.8" />

        {/* 4. Armored Torso / Cuirass (战将明光铜甲/护心镜) */}
        {/* Lower War Skirt (战裙) */}
        <path d="M30,72 L26,95 Q50,100 74,95 L70,72 Z" fill="url(#warriorArmor)" stroke="#c5a059" strokeWidth="1.5" />
        <path d="M40,74 L37,96 M50,74 L50,97 M60,74 L63,96" stroke="#c5a059" strokeWidth="1" strokeDasharray="3 2" />

        {/* Golden Belt & Buckle (兽面吞头腰带) */}
        <rect x="28" y="68" width="44" height="8" rx="2" fill="#8c2e1f" stroke="#c5a059" strokeWidth="1.2" />
        <circle cx="50" cy="72" r="5.5" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1" />

        {/* Chest Armor (胸甲与护心镜) */}
        <path d="M30,42 L70,42 L66,70 L34,70 Z" fill="url(#warriorArmor)" stroke="#120c08" strokeWidth="1.5" />
        {/* Bronze Round Heart Mirror (铜护心镜) */}
        <circle cx="50" cy="55" r="9.5" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1.2" />
        <circle cx="50" cy="55" r="5" fill="#ffd885" opacity="0.6" />

        {/* 5. Pauldrons & Arms (战国虎头护肩与护腕) */}
        {/* Left Shoulder Pauldron */}
        <ellipse cx="28" cy="46" rx="9" ry="7" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1.2" />
        {/* Left Arm */}
        <path d="M24,48 L18,72 L26,74 L30,52 Z" fill="url(#warriorArmor)" stroke="#120c08" strokeWidth="1" />
        {/* Left Bronze Bracer */}
        <rect x="17" y="62" width="10" height="10" rx="1.5" fill="url(#bronzeTrim)" />

        {/* Right Shoulder Pauldron */}
        <ellipse cx="72" cy="46" rx="9" ry="7" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1.2" />
        {/* Right Arm */}
        <path d="M76,48 L82,72 L74,74 L70,52 Z" fill="url(#warriorArmor)" stroke="#120c08" strokeWidth="1" />
        {/* Right Bronze Bracer */}
        <rect x="73" y="62" width="10" height="10" rx="1.5" fill="url(#bronzeTrim)" />

        {/* 6. Neck & Head (英武脸庞与束发战冠) */}
        <rect x="44" y="32" width="12" height="12" fill="#dfc3a3" />
        {/* Face */}
        <ellipse cx="50" cy="27" rx="13" ry="14" fill="#faebd7" stroke="#b89370" strokeWidth="1" />

        {/* Eyes & Eyebrows (英气十足) */}
        <path d="M42,24 L48,22" stroke="#1f140d" strokeWidth="2" strokeLinecap="round" />
        <path d="M52,22 L58,24" stroke="#1f140d" strokeWidth="2" strokeLinecap="round" />
        <circle cx="45" cy="27" r="2" fill="#1f140d" />
        <circle cx="55" cy="27" r="2" fill="#1f140d" />

        {/* 7. Warrior Helmet & Red Tassel (战将盔冠 / 束发红缨) */}
        {/* Helmet Base */}
        <path d="M36,22 Q50,8 64,22 L66,16 Q50,4 34,16 Z" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1.2" />
        <path d="M37,16 Q50,5 63,16 Z" fill="#2e2318" />
        {/* Helmet Top Knot */}
        <ellipse cx="50" cy="8" rx="5" ry="4" fill="url(#bronzeTrim)" stroke="#120c08" strokeWidth="1" />
        {/* Red Plumage Tassel (红缨烈烈) */}
        <path d="M50,6 Q45,-8 36,-6 Q42,-2 48,6" fill="#d64d3e" stroke="#8c1f14" strokeWidth="1" />
        <path d="M50,6 Q56,-9 64,-5 Q58,-1 52,6" fill="#d64d3e" stroke="#8c1f14" strokeWidth="1" />

        {/* Name Tag Badge Underneath Feet */}
        <g transform="translate(50, 126)">
          <rect x="-18" y="-4" width="36" height="10" rx="3" fill="#16221e" stroke="#dfba73" strokeWidth="0.8" />
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
  const [playerLane, setPlayerLane] = useState(1); // 0: Left, 1: Middle, 2: Right
  const [score, setScore] = useState(0);
  const targetScore = 100;
  const [isGameOver, setIsGameOver] = useState(false);
  const [rocks, setRocks] = useState<RockObstacle[]>([]);
  const nextRockId = useRef(1);
  const trackRef = useRef<HTMLDivElement>(null);

  // Keyboard controls
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
  }, [stage, isGameOver, playerLane]);

  // Parkour loop: Rock spawning & movement
  useEffect(() => {
    if (stage !== 'PARKOUR' || isGameOver) return;

    // Rock spawn timer: creates jagged rugged rocks with random sizes, angles & rotation speeds
    const spawnTimer = setInterval(() => {
      setRocks(prev => {
        if (prev.length >= 4) return prev;
        const newRock: RockObstacle = {
          id: nextRockId.current++,
          lane: Math.floor(Math.random() * 3),
          y: -15,
          variant: Math.floor(Math.random() * 4),
          sizeScale: 0.85 + Math.random() * 0.45,
          rotAngle: Math.floor(Math.random() * 360),
          rotSpeed: (Math.random() > 0.5 ? 1 : -1) * (1.2 + Math.random() * 2.5),
        };
        return [...prev, newRock];
      });
    }, 1100);

    // Rock move timer + collision check
    const moveTimer = setInterval(() => {
      setRocks(prev => {
        const nextRocks = prev
          .map(r => ({
            ...r,
            y: r.y + 3.2,
            rotAngle: r.rotAngle + r.rotSpeed,
          }))
          .filter(r => r.y < 115);

        // Check collision with warrior player
        nextRocks.forEach(rock => {
          if (rock.y > 64 && rock.y < 86 && rock.lane === playerLane) {
            handleTriggerGameOver();
          }
        });

        return nextRocks;
      });
    }, 50);

    // Score accumulation
    const scoreTimer = setInterval(() => {
      setScore(prev => {
        const nextVal = prev + 4;
        if (nextVal >= targetScore) {
          clearInterval(scoreTimer);
          sound.playVirtueChime();
          setTimeout(() => {
            setStage('VIDEO2');
          }, 800);
          return targetScore;
        }
        return nextVal;
      });
    }, 400);

    return () => {
      clearInterval(spawnTimer);
      clearInterval(moveTimer);
      clearInterval(scoreTimer);
    };
  }, [stage, isGameOver, playerLane]);

  const moveLeft = () => {
    if (playerLane > 0) {
      sound.playClick();
      setPlayerLane(prev => prev - 1);
    }
  };

  const moveRight = () => {
    if (playerLane < 2) {
      sound.playClick();
      setPlayerLane(prev => prev + 1);
    }
  };

  // Mouse hover / move interaction inside track area to drive the warrior smoothly
  const handleTrackPointerMove = (clientX: number) => {
    if (stage !== 'PARKOUR' || isGameOver || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;

    const relX = (clientX - rect.left) / rect.width;
    let targetLane = 1;
    if (relX < 0.333) {
      targetLane = 0;
    } else if (relX > 0.666) {
      targetLane = 2;
    } else {
      targetLane = 1;
    }

    if (targetLane !== playerLane) {
      sound.playClick();
      setPlayerLane(targetLane);
    }
  };

  const handleTriggerGameOver = () => {
    setIsGameOver(true);
    sound.playHammerStrike();
  };

  const handleRestartParkour = () => {
    sound.playClick();
    setIsGameOver(false);
    setScore(0);
    setRocks([]);
    setPlayerLane(1);
  };

  const getStageBg = () => {
    return getPlaceholderImage('level5_bg_run1', '第五关 仁 · 孤山挂剑', '履信守诺 · 登临孤山', '#FFFFFF');
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
            <span className="font-bold">第五关 信 · 孤山挂剑</span>
          </div>
          <div className="text-xs font-serif text-[#7bb39d] bg-[#111916]/95 px-3 py-1 rounded-sm border border-[#263730]">
            {stage === 'PARKOUR' && `登临进度：${score}% / 100%`}
          </div>
        </div>
      )}

      {/* STAGE: PRELUDE */}
      {stage === 'PRELUDE' && (
        <div className="relative z-10 my-auto w-full max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.95)] text-center backdrop-blur-md">
          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-3 tracking-widest font-bold">
            ❖ 试炼前情 · 孤山 ❖
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#f5efe3] mb-4 tracking-wider">
            孤山万仞 · 赴昔年之诺
          </h2>
          <div className="text-sm sm:text-base font-serif text-[#d6e0db] leading-relaxed space-y-3 text-left bg-[#111916] p-4 rounded-sm border border-[#2b3e36] mb-6">
            <p>孤山万仞，风雪凄迷。干将身披轻甲，背负长剑，徒步攀登千仞绝壁，赴当年与故友之约。</p>
            <p>前路山势险绝，落石滚滚。一诺既出，重逾千斤，纵历刀山火海亦不退缩半步。</p>
            <p className="text-[#ffd885] font-semibold font-serif">“言必信，行必果。持剑者，当以信立本。”</p>
          </div>
          <button
            id="lvl5-btn-start-video"
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
          videoSrc="assets/video/level5_start.mp4"
          title="第五关 信 · 孤山赴约"
          subtitle="孤山万仞 · 落石险途 · 履信守诺"
          onComplete={() => setStage('PARKOUR')}
        />
      )}

      {/* STAGE: PARKOUR MINIGAME */}
      {stage === 'PARKOUR' && (
        <div className="relative z-10 w-full h-[500px] max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm overflow-hidden shadow-2xl flex flex-col justify-between my-auto backdrop-blur-md">
          {/* Top Progress Bar & Mouse Interaction Guide */}
          <div className="p-3 bg-[#111916] border-b border-[#2b3e36] flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-sm mb-1.5">
              <div className="text-xs font-serif text-[#ffd885] font-bold tracking-wider">
                ❖ 信之试炼 · 履信守诺 ❖
              </div>
              <div className="flex items-center gap-1 text-[11px] font-serif text-[#7bb39d]">
                <MousePointer className="w-3 h-3 text-[#dfba73] animate-bounce" />
                <span>鼠标滑入框内亦可随动</span>
              </div>
            </div>
            <div className="w-full max-w-sm h-3 bg-[#0a0f0d] border border-[#3b554b] rounded-sm p-0.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3b554b] via-[#dfba73] to-[#ffd885] rounded-sm transition-all duration-200"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          {/* 3-Lane Track Area with Mouse Movement Support */}
          <div
            ref={trackRef}
            id="lvl5-parkour-track"
            onMouseMove={e => handleTrackPointerMove(e.clientX)}
            onTouchMove={e => {
              if (e.touches[0]) {
                handleTrackPointerMove(e.touches[0].clientX);
              }
            }}
            className="relative flex-1 w-full flex justify-around items-end pb-4 overflow-hidden bg-gradient-to-b from-[#0a0f0d] via-[#111916] to-[#090e0c] cursor-ew-resize"
          >
            {/* Lane Visual Backdrop & Dividers */}
            <div className="absolute inset-y-0 left-1/3 border-l border-dashed border-[#2b3e36]/70" />
            <div className="absolute inset-y-0 right-1/3 border-l border-dashed border-[#2b3e36]/70" />

            {/* Subtle Active Lane Highlighter */}
            <div
              style={{
                left: playerLane === 0 ? '0%' : playerLane === 1 ? '33.33%' : '66.66%',
              }}
              className="absolute inset-y-0 w-1/3 bg-[#dfba73]/[0.035] transition-all duration-200 pointer-events-none"
            />

            {/* Falling Rugged Mountain Rocks */}
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

            {/* Player Character: Martial Warrior Sprite (武将打扮小人) */}
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

          {/* Bottom Control Buttons (Removed Up/Down, Left/Right Only with Clean Layout) */}
          <div className="p-3.5 bg-[#111916] border-t border-[#2b3e36] flex items-center justify-center gap-4 sm:gap-6">
            <button
              id="lvl5-btn-left"
              onClick={moveLeft}
              className="px-6 sm:px-8 py-2.5 rounded-sm bg-gradient-to-r from-[#16221e] to-[#203029] border border-[#3b554b] text-[#ffd885] hover:border-[#dfba73] hover:text-white active:scale-95 text-xs sm:text-sm font-serif font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-[#ffd885]" />
              <span className="tracking-widest">左 闪</span>
            </button>

            <button
              id="lvl5-btn-right"
              onClick={moveRight}
              className="px-6 sm:px-8 py-2.5 rounded-sm bg-gradient-to-r from-[#203029] to-[#16221e] border border-[#3b554b] text-[#ffd885] hover:border-[#dfba73] hover:text-white active:scale-95 text-xs sm:text-sm font-serif font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md"
            >
              <span className="tracking-widest">右 避</span>
              <ArrowRight className="w-4 h-4 text-[#ffd885]" />
            </button>
          </div>

          {/* GAME OVER MODAL */}
          {isGameOver && (
            <div className="absolute inset-0 z-50 bg-[#0a0f0d]/92 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-[#16221e] border border-[#d64d3e] rounded-sm p-6 text-center shadow-2xl animate-fade-in">
                <h3 className="text-xl font-serif font-bold text-[#d64d3e] mb-3 tracking-wider">
                  【 山 石 滚 落 · 登 山 中 断 】
                </h3>
                <p className="text-sm font-serif text-[#d6e0db] leading-relaxed mb-6">
                  你被上方崩落的山石阻断，信守承诺不可半途而废，稍作调息再次登顶！
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    id="lvl5-btn-retry"
                    onClick={handleRestartParkour}
                    className="py-3 rounded-sm bg-[#1f2f29] border border-[#d64d3e] text-[#ffd885] hover:bg-[#2b3e36] font-serif font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>再试此关</span>
                  </button>

                  <button
                    id="lvl5-btn-back-map"
                    onClick={() => {
                      sound.playClick();
                      onBackToMap();
                    }}
                    className="py-3 rounded-sm bg-[#111916] border border-[#3b554b] text-[#d6e0db] hover:bg-[#1f2f29] font-serif font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>回九州图</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STAGE: VIDEO 2 */}
      {stage === 'VIDEO2' && (
        <VideoModal
          videoSrc="assets/video/level5_end.mp4"
          title="第五关 信 · 孤山挂剑"
          subtitle="万仞登顶 · 孤山挂剑 · 诺如金石"
          onComplete={() => setStage('CONCLUSION')}
        />
      )}

      {/* STAGE: CONCLUSION - Wuxia Epilogue */}
      {stage === 'CONCLUSION' && (
        <WuxiaEpilogue
          levelName="第五关 信 · 孤山挂剑"
          badge="❖ 通关小结 ❖"
          badgeColor="#dfba73"
          title="履信守诺 · 孤山挂剑"
          accentColor="#ffd885"
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
        <div className="relative z-10 my-auto w-full max-w-md bg-[#16221e]/95 border border-[#dfba73] rounded-sm p-8 shadow-[0_0_35px_rgba(223,186,115,0.3)] text-center backdrop-blur-md animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-sm bg-[#111916] border border-[#dfba73] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(223,186,115,0.4)]">
            <span className="text-4xl font-serif font-extrabold text-[#ffd885]">信</span>
          </div>

          <div className="inline-block px-3 py-1 rounded-sm bg-[#1f2f29] border border-[#dfba73] text-[#ffd885] text-xs font-serif mb-2 font-bold">
            ❖ 终折 · 五德齐聚 ❖
          </div>

          <h2 className="text-2xl font-serif font-bold text-[#f5efe3] mb-2 tracking-wider">
            恭喜少侠，获得五德之「信」！
          </h2>

          <p className="text-xs sm:text-sm font-serif text-[#a8b8b0] mb-6">
            “千金一诺，剑立乾坤。” 五德已然齐聚圆满！
          </p>

          <button
            id="lvl5-btn-return-map"
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
