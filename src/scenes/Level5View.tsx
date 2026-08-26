import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../audio';
import { VideoModal } from '../components/VideoModal';
import { getPlaceholderImage } from '../assets/placeholderGenerator';
import { WuxiaEpilogue } from '../components/WuxiaEpilogue';
import { Sparkles, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RotateCcw, MapPin, CheckCircle2 } from 'lucide-react';

interface Level5ViewProps {
  onCompleteLevel: () => void;
  onBackToMap: () => void;
}

type Stage = 'PRELUDE' | 'VIDEO1' | 'PARKOUR' | 'VIDEO2' | 'CONCLUSION' | 'REWARD';

interface RockObstacle {
  id: number;
  lane: number; // 0, 1, 2
  y: number; // percentage 0 to 100
}

export const Level5View: React.FC<Level5ViewProps> = ({ onCompleteLevel, onBackToMap }) => {
  const [stage, setStage] = useState<Stage>('PRELUDE');
  const [playerLane, setPlayerLane] = useState(1); // 0: Left, 1: Middle, 2: Right
  const [isJumping, setIsJumping] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [score, setScore] = useState(0);
  const targetScore = 100;
  const [isGameOver, setIsGameOver] = useState(false);
  const [rocks, setRocks] = useState<RockObstacle[]>([]);
  const nextRockId = useRef(1);

  // Keyboard controls
  useEffect(() => {
    if (stage !== 'PARKOUR' || isGameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        moveLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        moveRight();
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        jump();
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        slide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, isGameOver, playerLane, isJumping, isSliding]);

  // Parkour loop: Rock spawning & movement
  useEffect(() => {
    if (stage !== 'PARKOUR' || isGameOver) return;

    // Rock spawn timer
    const spawnTimer = setInterval(() => {
      setRocks(prev => {
        if (prev.length >= 4) return prev;
        const newRock: RockObstacle = {
          id: nextRockId.current++,
          lane: Math.floor(Math.random() * 3),
          y: -10,
        };
        return [...prev, newRock];
      });
    }, 1100);

    // Rock move timer + collision check
    const moveTimer = setInterval(() => {
      setRocks(prev => {
        const nextRocks = prev
          .map(r => ({ ...r, y: r.y + 3.2 }))
          .filter(r => r.y < 110);

        // Check collision with player
        nextRocks.forEach(rock => {
          if (rock.y > 65 && rock.y < 85 && rock.lane === playerLane) {
            // Collision occurred unless jumping over or sliding if applicable
            if (!isJumping) {
              handleTriggerGameOver();
            }
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
  }, [stage, isGameOver, playerLane, isJumping, isSliding]);

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

  const jump = () => {
    if (isJumping || isSliding) return;
    sound.playClick();
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 450);
  };

  const slide = () => {
    if (isSliding || isJumping) return;
    sound.playClick();
    setIsSliding(true);
    setTimeout(() => {
      setIsSliding(false);
    }, 400);
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
    setIsJumping(false);
    setIsSliding(false);
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
            <p>孤山万仞，风雪凄迷。干将背负佩剑，徒步攀登千仞绝壁，赴当年与故友之约。</p>
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
        <div className="relative z-10 w-full h-[480px] max-w-2xl bg-[#16221e]/95 border border-[#3b554b] rounded-sm overflow-hidden shadow-2xl flex flex-col justify-between my-auto backdrop-blur-md">
          {/* Top Progress Bar */}
          <div className="p-3 bg-[#111916] border-b border-[#2b3e36] flex flex-col items-center">
            <div className="text-xs font-serif text-[#ffd885] mb-1.5 font-bold tracking-wider">
              ❖ 信 之 试 炼 · 履 信 守 诺 ❖
            </div>
            <div className="w-full max-w-sm h-3 bg-[#0a0f0d] border border-[#3b554b] rounded-sm p-0.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3b554b] via-[#dfba73] to-[#ffd885] rounded-sm transition-all duration-200"
                style={{ width: `${score}%` }}
              />
            </div>
          </div>

          {/* 3-Lane Track Area */}
          <div className="relative flex-1 w-full flex justify-around items-end pb-8 overflow-hidden bg-gradient-to-b from-[#0a0f0d] via-[#111916] to-[#0a0f0d]">
            {/* Lane Dividers */}
            <div className="absolute inset-y-0 left-1/3 border-l border-dashed border-[#2b3e36]" />
            <div className="absolute inset-y-0 right-1/3 border-l border-dashed border-[#2b3e36]" />

            {/* Falling Rocks */}
            {rocks.map(rock => {
              const laneX = rock.lane === 0 ? '16.6%' : rock.lane === 1 ? '50%' : '83.3%';
              return (
                <div
                  key={rock.id}
                  style={{
                    left: laneX,
                    top: `${rock.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#1f2f29] border border-[#dfba73] flex items-center justify-center text-xl shadow-lg animate-spin" style={{ animationDuration: '3s' }}>
                    🪨
                  </div>
                </div>
              );
            })}

            {/* Player Character */}
            <div
              style={{
                left: playerLane === 0 ? '16.6%' : playerLane === 1 ? '50%' : '83.3%',
                bottom: isJumping ? '85px' : '20px',
                transform: `translateX(-50%) ${isSliding ? 'scaleY(0.55)' : 'scaleY(1)'}`,
              }}
              className="absolute transition-all duration-150 flex flex-col items-center pointer-events-none z-20"
            >
              <div className="w-10 h-16 rounded-sm bg-gradient-to-b from-[#263c33] to-[#121c18] border border-[#ffd885] shadow-[0_0_20px_rgba(255,216,133,0.4)] flex flex-col items-center justify-center text-[#ffd885] font-serif font-bold text-xs">
                <span>干</span>
                <span>将</span>
              </div>
            </div>
          </div>

          {/* Bottom Control Buttons */}
          <div className="p-3 bg-[#111916] border-t border-[#2b3e36] flex justify-center gap-2 sm:gap-4">
            <button
              id="lvl5-btn-left"
              onClick={moveLeft}
              className="px-3 sm:px-4 py-2 rounded-sm bg-[#16221e] border border-[#3b554b] text-[#d6e0db] hover:border-[#dfba73] hover:text-[#ffd885] active:scale-95 text-xs sm:text-sm font-serif flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>左闪</span>
            </button>

            <button
              id="lvl5-btn-right"
              onClick={moveRight}
              className="px-3 sm:px-4 py-2 rounded-sm bg-[#16221e] border border-[#3b554b] text-[#d6e0db] hover:border-[#dfba73] hover:text-[#ffd885] active:scale-95 text-xs sm:text-sm font-serif flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>右避</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="lvl5-btn-jump"
              onClick={jump}
              className="px-3 sm:px-4 py-2 rounded-sm bg-[#16221e] border border-[#3b554b] text-[#d6e0db] hover:border-[#dfba73] hover:text-[#ffd885] active:scale-95 text-xs sm:text-sm font-serif flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              <span>上跃</span>
            </button>

            <button
              id="lvl5-btn-slide"
              onClick={slide}
              className="px-3 sm:px-4 py-2 rounded-sm bg-[#16221e] border border-[#3b554b] text-[#d6e0db] hover:border-[#dfba73] hover:text-[#ffd885] active:scale-95 text-xs sm:text-sm font-serif flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ArrowDown className="w-4 h-4" />
              <span>俯滑</span>
            </button>
          </div>

          {/* GAME OVER MODAL (Native Responsive Dialog matching user fix requirement) */}
          {isGameOver && (
            <div className="absolute inset-0 z-50 bg-[#0a0f0d]/90 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-[#16221e] border border-[#d64d3e] rounded-sm p-6 text-center shadow-2xl animate-fade-in">
                <h3 className="text-xl font-serif font-bold text-[#d64d3e] mb-3 tracking-wider">
                  【 山 石 砸 中 · 登 山 中 断 】
                </h3>
                <p className="text-sm font-serif text-[#d6e0db] leading-relaxed mb-6">
                  你被上方滚落的山石阻断，登山试炼暂歇。
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
