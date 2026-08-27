import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../audio';
import { Compass, ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryPrologueViewProps {
  onStartJourney: () => void;
  onBackToTitle?: () => void;
}

// 刀剑来回穿梭反光与剑影动画特效 (Background Shuttle Swords, Blade Reflections & Light Shimmers)
const ShuttlingSwordShadowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic Shuttling Swords (在背景中极速/悠然来回穿梭的古剑、倒影与反光)
    interface FlyingSword {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      angle: number;
      scale: number;
      alpha: number;
      glintPhase: number;
      trail: { x: number; y: number; alpha: number }[];
      bladeType: 'bronze' | 'shadow' | 'radiance';
    }

    // Sweeping Blade Light Reflections across the scene (大片刀光剑影镜面反光)
    interface LightSweep {
      x: number;
      y: number;
      angle: number;
      length: number;
      width: number;
      speed: number;
      progress: number;
      alpha: number;
    }

    const swords: FlyingSword[] = [];
    const sweeps: LightSweep[] = [];
    let tick = 0;

    const spawnSword = (direction?: 'left-to-right' | 'right-to-left') => {
      const fromLeft = direction ? direction === 'left-to-right' : Math.random() > 0.5;
      const angle = fromLeft
        ? (Math.random() * 0.4 - 0.2) // roughly moving rightwards
        : Math.PI + (Math.random() * 0.4 - 0.2); // roughly moving leftwards

      const speed = 7 + Math.random() * 9;
      const startX = fromLeft ? -100 : width + 100;
      const startY = height * 0.15 + Math.random() * (height * 0.7);

      const typeRoll = Math.random();
      const bladeType: 'bronze' | 'shadow' | 'radiance' =
        typeRoll > 0.6 ? 'bronze' : typeRoll > 0.3 ? 'radiance' : 'shadow';

      swords.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * 0.45,
        length: 70 + Math.random() * 60,
        angle: angle,
        scale: 0.7 + Math.random() * 0.6,
        alpha: 0.4 + Math.random() * 0.45,
        glintPhase: Math.random() * Math.PI * 2,
        trail: [],
        bladeType,
      });
    };

    const spawnSweep = () => {
      const startX = Math.random() * width;
      const startY = Math.random() * (height * 0.8);
      const angle = (Math.random() * 0.5 - 0.25) * Math.PI + (Math.random() > 0.5 ? 0.35 : -0.35);

      sweeps.push({
        x: startX,
        y: startY,
        angle,
        length: 220 + Math.random() * 320,
        width: 2 + Math.random() * 4,
        speed: 0.035 + Math.random() * 0.03,
        progress: 0,
        alpha: 0.5 + Math.random() * 0.35,
      });
    };

    // Initialize 2 ambient swords
    spawnSword('left-to-right');
    spawnSword('right-to-left');

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Periodically spawn shuttling swords and blade sweeps
      if (tick % 65 === 0) {
        if (swords.length < 5) {
          spawnSword();
        }
      }
      if (tick % 45 === 0 && Math.random() < 0.6) {
        if (sweeps.length < 4) {
          spawnSweep();
        }
      }

      // --- 1. Render Blade Glint Sweeps (刀光穿梭反光) ---
      for (let i = sweeps.length - 1; i >= 0; i--) {
        const sw = sweeps[i];
        sw.progress += sw.speed;

        if (sw.progress >= 1.3) {
          sweeps.splice(i, 1);
          continue;
        }

        ctx.save();
        const headProg = Math.min(1, sw.progress);
        const tailProg = Math.max(0, sw.progress - 0.35);

        const x1 = sw.x + Math.cos(sw.angle) * (sw.length * tailProg);
        const y1 = sw.y + Math.sin(sw.angle) * (sw.length * tailProg);
        const x2 = sw.x + Math.cos(sw.angle) * (sw.length * headProg);
        const y2 = sw.y + Math.sin(sw.angle) * (sw.length * headProg);

        const currentAlpha = Math.max(0, 1 - (sw.progress - 0.2) / 1.1) * sw.alpha;

        // Outer soft glow
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(223, 186, 115, ${currentAlpha * 0.35})`;
        ctx.lineWidth = sw.width * 4;
        ctx.stroke();

        // Inner razor sharp reflection
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.85})`;
        ctx.lineWidth = sw.width;
        ctx.stroke();

        ctx.restore();
      }

      // --- 2. Render Flying / Shuttling Swords (剑影穿梭与金铜刀光) ---
      for (let i = swords.length - 1; i >= 0; i--) {
        const sw = swords[i];
        sw.x += sw.vx;
        sw.y += sw.vy;
        sw.glintPhase += 0.08;

        // Update sword trail
        sw.trail.push({ x: sw.x, y: sw.y, alpha: sw.alpha });
        if (sw.trail.length > 10) sw.trail.shift();

        // Remove out-of-bounds swords
        if (sw.x < -200 || sw.x > width + 200 || sw.y < -100 || sw.y > height + 100) {
          swords.splice(i, 1);
          continue;
        }

        ctx.save();

        // Render Sword Afterimage Trail (流光剑影残影)
        for (let t = 0; t < sw.trail.length - 1; t++) {
          const t1 = sw.trail[t];
          const t2 = sw.trail[t + 1];
          const trailAlpha = (t / sw.trail.length) * sw.alpha * 0.45;

          ctx.beginPath();
          ctx.moveTo(t1.x, t1.y);
          ctx.lineTo(t2.x, t2.y);
          ctx.strokeStyle =
            sw.bladeType === 'bronze'
              ? `rgba(223, 186, 115, ${trailAlpha})`
              : sw.bladeType === 'radiance'
              ? `rgba(180, 230, 215, ${trailAlpha})`
              : `rgba(40, 60, 52, ${trailAlpha * 0.8})`;
          ctx.lineWidth = 3 * sw.scale;
          ctx.stroke();
        }

        // Draw Shuttling Ancient Sword Body
        ctx.translate(sw.x, sw.y);
        ctx.rotate(sw.angle);
        ctx.scale(sw.scale, sw.scale);

        // Reflection Glow along the Blade
        const glintShimmer = Math.abs(Math.sin(sw.glintPhase));
        const swordLen = sw.length;

        // Sword Blade Body
        ctx.beginPath();
        ctx.moveTo(-swordLen * 0.4, 0); // Pommel
        ctx.lineTo(-swordLen * 0.25, -2);
        ctx.lineTo(swordLen * 0.45, -3.5);
        ctx.lineTo(swordLen * 0.6, 0); // Blade Point
        ctx.lineTo(swordLen * 0.45, 3.5);
        ctx.lineTo(-swordLen * 0.25, 2);
        ctx.closePath();

        if (sw.bladeType === 'bronze') {
          ctx.fillStyle = `rgba(215, 175, 95, ${sw.alpha * 0.75})`;
          ctx.strokeStyle = `rgba(255, 235, 180, ${sw.alpha * 0.9})`;
        } else if (sw.bladeType === 'radiance') {
          ctx.fillStyle = `rgba(210, 245, 235, ${sw.alpha * 0.85})`;
          ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * 0.95})`;
        } else {
          // Shadow Silhouette Sword (影剑)
          ctx.fillStyle = `rgba(25, 38, 32, ${sw.alpha * 0.9})`;
          ctx.strokeStyle = `rgba(80, 115, 100, ${sw.alpha * 0.6})`;
        }

        ctx.lineWidth = 1.2;
        ctx.fill();
        ctx.stroke();

        // Sword Spine Highlight Ridge (八面剑脊反光线)
        ctx.beginPath();
        ctx.moveTo(-swordLen * 0.25, 0);
        ctx.lineTo(swordLen * 0.58, 0);
        ctx.strokeStyle = `rgba(255, 255, 255, ${sw.alpha * (0.4 + glintShimmer * 0.6)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Crossguard (剑格)
        ctx.fillStyle = `rgba(180, 140, 70, ${sw.alpha * 0.9})`;
        ctx.fillRect(-swordLen * 0.26, -6, 4, 12);

        // Blade Point Spark Reflection
        if (glintShimmer > 0.8) {
          ctx.beginPath();
          ctx.arc(swordLen * 0.55, 0, 3 + glintShimmer * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${sw.alpha * glintShimmer})`;
          ctx.fill();
        }

        ctx.restore();
      }

      // --- 3. Ambient Drifting Golden Sword Qi Sparks (空中散落的剑气流光微粒) ---
      if (tick % 8 === 0) {
        ctx.save();
        const px = Math.random() * width;
        const py = Math.random() * height;
        const pr = 1 + Math.random() * 2;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(223, 186, 115, 0.45)' : 'rgba(200, 240, 225, 0.35)';
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-screen"
    />
  );
};

export const StoryPrologueView: React.FC<StoryPrologueViewProps> = ({
  onStartJourney,
  onBackToTitle,
}) => {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [revealedLines, setRevealedLines] = useState<number>(1);

  // Total lines on page 1 = 5, page 2 = 5 (deleted redundant first line on page 2)
  const maxLines = 5;

  // Slow-reading line-by-line reveal effect (一行行慢慢出现，有慢读之感)
  useEffect(() => {
    setRevealedLines(1);
    const interval = setInterval(() => {
      setRevealedLines((prev) => {
        if (prev < maxLines) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [currentPage, maxLines]);

  const handleNextPage = () => {
    sound.playClick();
    setCurrentPage(2);
  };

  const handlePrevPage = () => {
    sound.playClick();
    setCurrentPage(1);
  };

  // Click on background canvas to immediately show all lines on the current page
  const handleFastForward = () => {
    if (revealedLines < maxLines) {
      setRevealedLines(maxLines);
    }
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between items-center p-4 sm:p-6 md:p-8 select-none overflow-y-auto overflow-x-hidden bg-[#070c0a] cursor-pointer"
      onClick={handleFastForward}
      title={revealedLines < maxLines ? "点击可立即显示本页全文" : ""}
    >
      {/* 1. Background Atmosphere: 无文字框纯净空间 + 剑影穿梭反光动画 + 战国金石墨韵背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep Ink & Bronze Gradient Canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08100d] via-[#0e1714] to-[#060b09]" />

        {/* Ambient Dark Green Inscription Fog & Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,38,32,0.45)_0%,rgba(6,11,9,0.94)_85%)]" />

        {/* Dynamic Shuttling Swords, Blade Reflections & Light Shimmers Effect (刀剑来回穿梭反光的影子动画) */}
        <ShuttlingSwordShadowEffect />

        {/* Subtle Carved Bronze Outer Frame Accent */}
        <div className="absolute inset-3 sm:inset-5 border border-[#2b3e36]/40 rounded-sm pointer-events-none" />
        <div className="absolute inset-3.5 sm:inset-5.5 border border-[#dfba73]/10 rounded-sm pointer-events-none" />
      </div>

      {/* 2. Top Navigation Bar */}
      <div className="relative z-30 w-full max-w-4xl flex items-center justify-between px-2 sm:px-4 py-1">
        {onBackToTitle ? (
          <button
            id="prologue-btn-back-home"
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onBackToTitle();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#111a16]/90 border border-[#3b554b] text-xs font-serif text-[#ffd885] hover:border-[#dfba73] hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-[#ffd885]" />
            <span>返回首页</span>
          </button>
        ) : (
          <div className="text-xs font-serif text-[#7bb39d] tracking-widest flex items-center gap-1.5">
            <span>「春秋」</span>
            <span className="text-[#ffd885]">干将问剑</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="text-xs font-serif text-[#ffd885] bg-[#111a16]/85 px-3 py-1 border border-[#3b554b] rounded-sm tracking-widest shadow-sm">
            第 {currentPage} / 2 页 ｜ {currentPage === 1 ? '剑 心 破 碎' : '启 程 问 剑'}
          </div>
        </div>
      </div>

      {/* 3. Main Center Content: 无框纯净排版 (直接融入画卷，排版与字体保持典雅端庄) */}
      <div className="relative z-20 w-full max-w-3xl my-auto flex flex-col items-center justify-center py-4 px-3 sm:px-8">
        {/* Title Section (大号加粗 故 事 简 介 + 菱形云纹) */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#f5efe3] tracking-[0.35em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            故 事 简 介
          </h1>

          {/* Classical Flourish Ornament Under Title */}
          <div className="flex items-center justify-center gap-2.5 mt-2.5 text-[#dfba73] opacity-85">
            <div className="w-14 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#dfba73]" />
            <span className="text-xs sm:text-sm text-[#ffd885]">❖</span>
            <div className="w-14 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#dfba73]" />
          </div>

          {/* Subtitle Tag (小标题: 剑心破碎 / 启程问剑) */}
          <div className="mt-3 text-center">
            <span className="inline-block px-4 py-1 rounded-sm bg-[#16241e]/90 border border-[#dfba73]/40 text-[#ffd885] text-xs sm:text-sm font-serif font-bold tracking-widest shadow-md">
              ◆ {currentPage === 1 ? '剑 心 破 碎' : '启 程 问 剑'} ◆
            </span>
          </div>
        </div>

        {/* Narrative Content Area */}
        <div className="w-full min-h-[260px] sm:min-h-[290px] flex flex-col justify-center text-left">
          {/* PAGE 1: 剑心破碎 (一行行慢慢出现，有慢读之感) */}
          {currentPage === 1 && (
            <div className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg font-serif text-[#e4ede7] leading-relaxed tracking-wide animate-fade-in drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {/* Line 1 */}
              <p
                className={`transition-all duration-1000 ease-out transform ${
                  revealedLines >= 1
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                半生炉火，千锤百炼。
              </p>

              {/* Line 2 */}
              <p
                className={`transition-all duration-1000 ease-out transform ${
                  revealedLines >= 2
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                干将曾以为，剑越锋利，便越接近铸剑的极致。
              </p>

              {/* Line 3 */}
              <p
                className={`transition-all duration-1000 ease-out transform ${
                  revealedLines >= 3
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                直到亲眼看见自己所铸之 剑染上鲜血，他第一次开始怀疑：
              </p>

              {/* Line 4: Core question */}
              <p
                className={`font-serif font-bold text-base sm:text-lg md:text-xl text-[#ffd885] py-1 tracking-wider transition-all duration-1000 ease-out transform drop-shadow-[0_0_10px_rgba(255,216,133,0.3)] ${
                  revealedLines >= 4
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                “我铸了一辈子的剑，到底是在守护人，还是在杀人？”
              </p>

              {/* Line 5: Conclusion */}
              <p
                className={`font-bold text-[#d6e0db] text-sm sm:text-base md:text-lg transition-all duration-1000 ease-out transform ${
                  revealedLines >= 5
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                自此，炉火熄灭，剑心破碎。
              </p>
            </div>
          )}

          {/* PAGE 2: 启程问剑 (已删除“自此，炉火熄灭，剑心破碎。”开头，慢读逐行优雅呈现) */}
          {currentPage === 2 && (
            <div className="space-y-4 sm:space-y-4.5 md:space-y-5 text-sm sm:text-base md:text-lg font-serif text-[#e4ede7] leading-relaxed tracking-wide animate-fade-in drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {/* Line 1 (Now starts directly with journey) */}
              <p
                className={`transition-all duration-1000 ease-out transform ${
                  revealedLines >= 1
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                许久之后，干将重新背起长剑，踏上问剑之旅。
              </p>

              {/* Line 2 */}
              <p
                className={`transition-all duration-1000 ease-out transform ${
                  revealedLines >= 2
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                前路之上，五段因 剑而起的故事正等待着他——
              </p>

              {/* Line 3: 5 Virtues Chapter Tag Capsule */}
              <div
                className={`py-1 transition-all duration-1000 ease-out transform ${
                  revealedLines >= 3
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                <span className="font-bold text-[#ffd885] tracking-wider bg-[#16231e]/90 border border-[#dfba73]/40 px-3.5 py-1.5 rounded-[3px] inline-block shadow-md">
                  雪夜炊烟 · 剑问圣人 · 烈风之断 · 空谷之兽 · 孤山挂剑
                </span>
              </div>

              {/* Line 4 */}
              <p
                className={`transition-all duration-1000 ease-out transform ${
                  revealedLines >= 4
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                五段相遇，五次抉择。<br />
                他要寻找的，不是一柄更锋利的剑，<br />
                而是一个答案——
              </p>

              {/* Line 5: Grand Final Question */}
              <p
                className={`text-lg sm:text-xl md:text-2xl font-bold text-[#ffd885] tracking-widest pt-1.5 transition-all duration-1000 ease-out transform drop-shadow-[0_0_15px_rgba(255,216,133,0.35)] ${
                  revealedLines >= 5
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                人，究竟为何持剑？
              </p>
            </div>
          )}
        </div>

        {/* Page Flip Indicator */}
        <div className="flex items-center justify-between w-full max-w-xs pt-4 mt-4 border-t border-[#3b554b]/40 text-xs font-serif text-[#7bb39d]">
          <div className="text-[11px] opacity-75">
            {revealedLines < maxLines ? '❖ 慢读品悟中（点击屏幕快速展开）' : '❖ 阅毕'}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                currentPage === 1 ? 'bg-[#ffd885] shadow-[0_0_6px_#ffd885]' : 'bg-[#2b3e36]'
              }`}
            />
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                currentPage === 2 ? 'bg-[#ffd885] shadow-[0_0_6px_#ffd885]' : 'bg-[#2b3e36]'
              }`}
            />
          </div>
        </div>
      </div>

      {/* 4. Bottom Action Bar: Navigation & Journey Buttons */}
      <div className="relative z-30 w-full max-w-4xl flex items-center justify-between px-3 sm:px-6 py-2 border-t border-[#2b3e36]/70">
        {/* Left Side: Prev Button / Status */}
        {currentPage === 2 ? (
          <button
            id="prologue-btn-prev-page"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPage();
            }}
            className="flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-sm bg-[#16221e]/90 border border-[#3b554b] text-xs sm:text-sm font-serif text-[#ffd885] hover:border-[#dfba73] hover:text-white transition-all cursor-pointer shadow-md active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-[#ffd885]" />
            <span>上一页 · 剑心破碎</span>
          </button>
        ) : (
          <div className="text-xs font-serif text-[#7bb39d] tracking-widest hidden sm:flex items-center gap-1.5">
            <span className="text-[#ffd885]">❖</span>
            <span>半生炉火 · 剑心初叩</span>
          </div>
        )}

        {/* Right Side: Next Button or Start Journey */}
        {currentPage === 1 ? (
          <button
            id="prologue-btn-next-page"
            onClick={(e) => {
              e.stopPropagation();
              handleNextPage();
            }}
            className="group inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-sm bg-gradient-to-r from-[#1b2b25] via-[#2a4037] to-[#1b2b25] border border-[#dfba73] text-[#ffd885] hover:text-white font-serif font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(223,186,115,0.3)] hover:border-[#fff] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>翻阅下卷 · 启程问剑</span>
            <ChevronRight className="w-4 h-4 text-[#ffd885] group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            id="prologue-btn-start"
            onClick={(e) => {
              e.stopPropagation();
              sound.playVirtueChime();
              onStartJourney();
            }}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-10 py-2.5 sm:py-3 rounded-sm bg-gradient-to-r from-[#1c2923] via-[#2d4238] to-[#1c2923] border-2 border-[#c5a059] text-[#ffd885] hover:text-white font-serif font-bold text-xs sm:text-base transition-all shadow-[0_0_25px_rgba(197,160,89,0.35)] hover:shadow-[0_0_35px_rgba(197,160,89,0.6)] hover:border-[#fff] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="tracking-widest">领悟剑道 · 启程问剑</span>
            <Compass className="w-4 h-4 text-[#ffd885] group-hover:rotate-45 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};
