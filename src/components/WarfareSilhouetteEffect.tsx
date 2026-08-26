import React, { useEffect, useRef } from 'react';

interface BloodRain {
  x: number;
  y: number;
  len: number;
  speedY: number;
  speedX: number;
  opacity: number;
}

interface Ember {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
  color: string;
}

interface BladeSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface ClashFlash {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxOpacity: number;
}

export const WarfareSilhouetteEffect: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 1. Blood Rain streaks (血雨疾风)
    const bloodRainCount = 45;
    const bloodRains: BloodRain[] = [];
    for (let i = 0; i < bloodRainCount; i++) {
      bloodRains.push({
        x: Math.random() * (width + 300) - 150,
        y: Math.random() * height,
        len: 15 + Math.random() * 25,
        speedY: 7 + Math.random() * 9,
        speedX: -2.5 - Math.random() * 2,
        opacity: 0.12 + Math.random() * 0.22,
      });
    }

    // 2. Battle Embers & Ash (战场烽烟残烬)
    const emberCount = 35;
    const embers: Ember[] = [];
    for (let i = 0; i < emberCount; i++) {
      const isRed = Math.random() > 0.45;
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.5,
        speedX: -0.6 - Math.random() * 1.4,
        speedY: -0.4 - Math.random() * 1.2,
        opacity: 0.2 + Math.random() * 0.6,
        pulse: Math.random() * Math.PI * 2,
        color: isRed ? 'rgba(214, 77, 62,' : 'rgba(223, 186, 115,',
      });
    }

    // 3. Sparks & Blade Glints (刀兵交击火星)
    let sparks: BladeSpark[] = [];
    let flashes: ClashFlash[] = [];

    // Timing helper
    let tick = 0;

    // Draw Warring States Halberd / Ge (戈/戟)
    const drawHalberd = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      angle: number,
      scale: number,
      alpha: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.scale(scale, scale);
      context.fillStyle = `rgba(15, 22, 19, ${alpha})`;
      context.strokeStyle = `rgba(15, 22, 19, ${alpha})`;

      // Long pole (木柄/柲)
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(0, 80);
      context.lineTo(0, -60);
      context.stroke();

      // Spear tip (矛头/刺)
      context.beginPath();
      context.moveTo(-4, -60);
      context.lineTo(0, -95);
      context.lineTo(4, -60);
      context.closePath();
      context.fill();

      // Transverse blade (戈援/横刃)
      context.beginPath();
      context.moveTo(0, -50);
      context.quadraticCurveTo(15, -55, 30, -48);
      context.quadraticCurveTo(34, -45, 30, -42);
      context.quadraticCurveTo(15, -45, 0, -42);
      context.closePath();
      context.fill();

      // Lower tooth (戈胡与内)
      context.beginPath();
      context.moveTo(0, -42);
      context.lineTo(8, -30);
      context.lineTo(0, -32);
      context.closePath();
      context.fill();

      context.restore();
    };

    // Draw Warring States Warrior Silhouette (战国披甲武士剪影)
    const drawWarrior = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      facing: 1 | -1, // 1 right, -1 left
      pose: 'attack' | 'defend' | 'stand',
      scale: number,
      alpha: number,
      armAngle: number
    ) => {
      context.save();
      context.translate(x, y);
      context.scale(scale * facing, scale);

      context.fillStyle = `rgba(12, 18, 15, ${alpha})`;
      context.strokeStyle = `rgba(12, 18, 15, ${alpha})`;

      // Head with helmet/crest (胄/盔)
      context.beginPath();
      context.arc(0, -65, 9, 0, Math.PI * 2);
      context.fill();
      // Helmet tassel / fin (胄缨)
      context.beginPath();
      context.moveTo(-2, -74);
      context.lineTo(2, -74);
      context.lineTo(6, -82);
      context.lineTo(0, -78);
      context.closePath();
      context.fill();

      // Torso / Bronze armor plates (身甲/扎甲)
      context.beginPath();
      context.moveTo(-11, -55);
      context.lineTo(13, -55);
      context.lineTo(15, -20);
      context.lineTo(-13, -20);
      context.closePath();
      context.fill();

      // Skirt armor (甲裙)
      context.beginPath();
      context.moveTo(-13, -20);
      context.lineTo(15, -20);
      context.lineTo(18, 5);
      context.lineTo(-15, 5);
      context.closePath();
      context.fill();

      // Legs in stance (弓步/跨步)
      if (pose === 'attack') {
        // Front leg bent
        context.lineWidth = 6;
        context.beginPath();
        context.moveTo(6, 0);
        context.lineTo(16, 20);
        context.lineTo(24, 45);
        context.stroke();

        // Back leg stretched
        context.beginPath();
        context.moveTo(-8, 0);
        context.lineTo(-20, 22);
        context.lineTo(-32, 45);
        context.stroke();
      } else {
        // Defend / standard stance
        context.lineWidth = 6;
        context.beginPath();
        context.moveTo(6, 0);
        context.lineTo(10, 22);
        context.lineTo(14, 45);
        context.stroke();

        context.beginPath();
        context.moveTo(-8, 0);
        context.lineTo(-14, 22);
        context.lineTo(-18, 45);
        context.stroke();
      }

      // Arm holding Bronze Sword / Ji
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(4, -48);
      const handX = 18 + Math.cos(armAngle) * 22;
      const handY = -42 + Math.sin(armAngle) * 22;
      context.lineTo(12, -42);
      context.lineTo(handX, handY);
      context.stroke();

      // Bronze Sword (八面青铜剑)
      context.save();
      context.translate(handX, handY);
      context.rotate(armAngle);
      context.fillStyle = `rgba(18, 26, 22, ${alpha * 1.2})`;
      context.beginPath();
      context.moveTo(0, -3);
      context.lineTo(48, -2);
      context.lineTo(58, 0); // blade tip
      context.lineTo(48, 2);
      context.lineTo(0, 3);
      context.lineTo(-10, 0); // hilt
      context.closePath();
      context.fill();
      context.restore();

      context.restore();
    };

    // Draw Tattered Battle Banner (残破战国旌旗)
    const drawBanner = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      scale: number,
      alpha: number,
      wave: number
    ) => {
      context.save();
      context.translate(x, y);
      context.scale(scale, scale);

      // Flagpole
      context.strokeStyle = `rgba(14, 20, 17, ${alpha})`;
      context.lineWidth = 3.5;
      context.beginPath();
      context.moveTo(0, 80);
      context.lineTo(0, -110);
      context.stroke();

      // Bronze spear top ornament (旗顶铜戈)
      context.fillStyle = `rgba(14, 20, 17, ${alpha})`;
      context.beginPath();
      context.moveTo(-3, -110);
      context.lineTo(0, -125);
      context.lineTo(3, -110);
      context.closePath();
      context.fill();

      // Banner cloth fluttering with swallow tails (燕尾旗)
      context.fillStyle = `rgba(28, 18, 18, ${alpha * 0.85})`;
      context.beginPath();
      context.moveTo(0, -105);
      const wave1 = Math.sin(wave) * 8;
      const wave2 = Math.cos(wave * 1.2) * 10;
      context.quadraticCurveTo(25 + wave1, -100, 55 + wave2, -95);
      context.lineTo(45 + wave2, -50);
      context.lineTo(60 + wave1, -40); // swallowtail upper
      context.lineTo(35 + wave1, -25);
      context.lineTo(55 + wave2, -10); // swallowtail lower
      context.quadraticCurveTo(20 + wave1, -30, 0, -45);
      context.closePath();
      context.fill();

      // Inscribed Ancient Seal character hint on banner
      context.strokeStyle = `rgba(180, 50, 40, ${alpha * 0.4})`;
      context.lineWidth = 2;
      context.strokeRect(10 + wave1 * 0.5, -85, 20, 25);

      context.restore();
    };

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // --- Background Ambience: Smoky Sky Gradient & Battle Dusk ---
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#090e0c');
      bgGrad.addColorStop(0.45, '#121413');
      bgGrad.addColorStop(0.75, '#181211'); // hint of blood ember dusk
      bgGrad.addColorStop(1, '#080c0a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // --- Smoldering Fog Waves (血雾腥风弥漫) ---
      const fogTime = tick * 0.008;
      for (let f = 0; f < 3; f++) {
        ctx.save();
        const fogAlpha = 0.06 + f * 0.03;
        ctx.fillStyle = f % 2 === 0 ? `rgba(60, 18, 16, ${fogAlpha})` : `rgba(18, 32, 26, ${fogAlpha})`;
        ctx.beginPath();
        const baseH = height * (0.62 + f * 0.12);
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseH);
        for (let px = 0; px <= width; px += 40) {
          const py =
            baseH +
            Math.sin(px * 0.005 + fogTime * (f + 1) + f) * 22 +
            Math.cos(px * 0.01 - fogTime) * 12;
          ctx.lineTo(px, py);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // --- Distant Battlefield Ridge (远山荒丘残垣) ---
      ctx.save();
      ctx.fillStyle = '#0a100d';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.78);
      ctx.quadraticCurveTo(width * 0.25, height * 0.72, width * 0.5, height * 0.77);
      ctx.quadraticCurveTo(width * 0.78, height * 0.82, width, height * 0.74);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // --- 1. Distant Marching Spearmen / Row of Soldiers (远方列阵戈矛剪影 · 影影绰绰) ---
      const soldierBaseY = height * 0.76;
      const waveSoldier = Math.sin(tick * 0.02) * 3;

      // Group Left: Spearmen marching into battle
      for (let s = 0; s < 5; s++) {
        const sx = width * 0.08 + s * 34 + Math.sin(tick * 0.01 + s) * 4;
        const sy = soldierBaseY - s * 2 + waveSoldier * 0.5;
        const alpha = 0.25 + Math.sin(tick * 0.03 + s * 0.8) * 0.1; // flickering shadowy silhouette
        drawWarrior(ctx, sx, sy, 1, 'stand', 0.55, alpha, -0.4 + Math.sin(tick * 0.02 + s) * 0.1);
        drawHalberd(ctx, sx + 8, sy - 15, -0.25, 0.45, alpha * 1.1);
      }

      // Group Right: Halberdiers in formation
      for (let s = 0; s < 4; s++) {
        const sx = width * 0.84 - s * 32 + Math.cos(tick * 0.01 + s) * 4;
        const sy = soldierBaseY + 6 - s * 2;
        const alpha = 0.22 + Math.cos(tick * 0.025 + s) * 0.08;
        drawWarrior(ctx, sx, sy, -1, 'stand', 0.52, alpha, -0.3);
        drawHalberd(ctx, sx - 8, sy - 14, 0.2, 0.42, alpha * 1.1);
      }

      // --- 2. Broken Halberds & Spears stuck in battlefield ground (折戟沉沙) ---
      drawHalberd(ctx, width * 0.05, height * 0.82, -0.65, 0.7, 0.4);
      drawHalberd(ctx, width * 0.32, height * 0.88, 0.85, 0.6, 0.3);
      drawHalberd(ctx, width * 0.68, height * 0.86, -0.45, 0.65, 0.35);
      drawHalberd(ctx, width * 0.94, height * 0.84, 0.55, 0.75, 0.45);

      // --- 3. Battle Banners (旌旗残卷猎猎随风) ---
      drawBanner(ctx, width * 0.18, height * 0.75, 0.75, 0.45, tick * 0.04);
      drawBanner(ctx, width * 0.82, height * 0.78, 0.7, 0.4, tick * 0.035 + 2);

      // --- 4. Main Foreground Clashing Warriors (刀兵相见 · 影影绰绰对决剪影) ---
      // Left Warrior lunging / thrusting
      const duelX = width * 0.44;
      const duelY = height * 0.82;
      const clashCycle = Math.sin(tick * 0.045);
      const isClashing = clashCycle > 0.85;

      const warriorL_x = duelX - 55 - (isClashing ? 8 : clashCycle * 12);
      const warriorR_x = duelX + 55 + (isClashing ? 8 : clashCycle * 12);

      const armAngleL = isClashing ? -0.15 : -0.45 + clashCycle * 0.3;
      const armAngleR = isClashing ? -0.15 : -0.45 + clashCycle * 0.3;

      // Draw Left Heroic Silhouette
      drawWarrior(ctx, warriorL_x, duelY, 1, 'attack', 0.88, 0.55, armAngleL);

      // Draw Right Rival Silhouette
      drawWarrior(ctx, warriorR_x, duelY, -1, 'defend', 0.85, 0.5, armAngleR);

      // Trigger blade clash sparks when weapons strike
      if (isClashing && Math.random() < 0.35) {
        const cx = duelX;
        const cy = duelY - 50 + (Math.random() - 0.5) * 15;
        flashes.push({
          x: cx,
          y: cy,
          radius: 18 + Math.random() * 20,
          opacity: 0.8,
          maxOpacity: 0.8,
        });

        // Spawn gold/crimson clash sparks
        for (let i = 0; i < 7; i++) {
          const ang = Math.random() * Math.PI * 2;
          const spd = 2 + Math.random() * 4.5;
          sparks.push({
            x: cx,
            y: cy,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd - 1,
            life: 1,
            maxLife: 15 + Math.random() * 15,
            color: Math.random() > 0.4 ? '#ffd885' : '#d64d3e',
          });
        }
      }

      // --- 5. Render Clash Flash & Sparks ---
      flashes.forEach(f => {
        ctx.save();
        const radGrad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        radGrad.addColorStop(0, `rgba(255, 240, 200, ${f.opacity})`);
        radGrad.addColorStop(0.4, `rgba(214, 77, 62, ${f.opacity * 0.7})`);
        radGrad.addColorStop(1, 'rgba(214, 77, 62, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        f.opacity -= 0.08;
      });
      flashes = flashes.filter(f => f.opacity > 0);

      sparks.forEach(sp => {
        ctx.save();
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = Math.max(0, sp.life / sp.maxLife);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.15; // gravity
        sp.life--;
      });
      sparks = sparks.filter(sp => sp.life > 0);

      // --- 6. Blood Rain streaks (血雨腥风微茫) ---
      ctx.save();
      ctx.lineWidth = 1.2;
      bloodRains.forEach(br => {
        ctx.strokeStyle = `rgba(180, 40, 32, ${br.opacity})`;
        ctx.beginPath();
        ctx.moveTo(br.x, br.y);
        ctx.lineTo(br.x + br.speedX * 2.5, br.y + br.len);
        ctx.stroke();

        br.x += br.speedX;
        br.y += br.speedY;

        if (br.y > height) {
          br.y = -20;
          br.x = Math.random() * (width + 300) - 100;
        }
        if (br.x < -50) {
          br.x = width + 50;
        }
      });
      ctx.restore();

      // --- 7. Battle Embers & Ash Particles (战场飞灰与炽烬) ---
      embers.forEach(em => {
        em.pulse += 0.05;
        const currentAlpha = em.opacity * (0.6 + Math.sin(em.pulse) * 0.4);
        ctx.fillStyle = `${em.color} ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(em.x, em.y, em.size, 0, Math.PI * 2);
        ctx.fill();

        em.x += em.speedX;
        em.y += em.speedY;

        if (em.y < -10 || em.x < -10) {
          em.y = height + Math.random() * 20;
          em.x = Math.random() * width + 50;
        }
      });

      // --- 8. Occasional Distant Sudden Sword Glint (长剑冷芒骤现) ---
      if (tick % 160 === 0) {
        const gx = width * 0.2 + Math.random() * width * 0.6;
        const gy = height * 0.5 + Math.random() * height * 0.25;
        flashes.push({
          x: gx,
          y: gy,
          radius: 35,
          opacity: 0.6,
          maxOpacity: 0.6,
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};
