import React, { useEffect, useRef } from 'react';

interface BloodRain {
  x: number;
  y: number;
  len: number;
  speedY: number;
  speedX: number;
  opacity: number;
  width: number;
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
  size: number;
}

interface ClashFlash {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  maxOpacity: number;
  color: string;
}

interface ShadowSoldier {
  x: number;
  y: number;
  scale: number;
  alpha: number;
  facing: 1 | -1;
  weaponType: 'ge' | 'ji' | 'sword' | 'banner';
  armAngle: number;
  bobOffset: number;
  speed: number;
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

    // 1. Blood Rain Streaks (血雨腥风微茫斜落)
    const bloodRainCount = 55;
    const bloodRains: BloodRain[] = [];
    for (let i = 0; i < bloodRainCount; i++) {
      bloodRains.push({
        x: Math.random() * (width + 400) - 200,
        y: Math.random() * height,
        len: 18 + Math.random() * 32,
        speedY: 6 + Math.random() * 8,
        speedX: -2.5 - Math.random() * 2.5,
        opacity: 0.12 + Math.random() * 0.28,
        width: 0.8 + Math.random() * 1.2,
      });
    }

    // 2. Battle Embers & Ash (战场烽烟残烬与星火)
    const emberCount = 40;
    const embers: Ember[] = [];
    for (let i = 0; i < emberCount; i++) {
      const isRed = Math.random() > 0.4;
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1.2 + Math.random() * 2.8,
        speedX: -0.8 - Math.random() * 1.6,
        speedY: -0.3 - Math.random() * 1.2,
        opacity: 0.25 + Math.random() * 0.65,
        pulse: Math.random() * Math.PI * 2,
        color: isRed ? 'rgba(214, 65, 50,' : 'rgba(223, 186, 115,',
      });
    }

    // 3. Shadow Army in Midground (影影绰绰的军阵剪影)
    const armySoldiers: ShadowSoldier[] = [];
    const soldierCount = 14;
    for (let i = 0; i < soldierCount; i++) {
      const isLeft = i < 7;
      const xPos = isLeft
        ? width * (0.04 + (i * 0.05))
        : width * (0.64 + ((i - 7) * 0.05));
      armySoldiers.push({
        x: xPos,
        y: height * (0.75 + Math.random() * 0.06),
        scale: 0.45 + Math.random() * 0.15,
        alpha: 0.18 + Math.random() * 0.18,
        facing: isLeft ? 1 : -1,
        weaponType: i % 4 === 0 ? 'banner' : i % 3 === 0 ? 'ge' : 'ji',
        armAngle: -0.2 - Math.random() * 0.3,
        bobOffset: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.1,
      });
    }

    // 4. Sparks & Blade Glints (刀兵交锋激溅的火星与冷芒)
    let sparks: BladeSpark[] = [];
    let flashes: ClashFlash[] = [];
    let tick = 0;

    // Draw Ancient Warring States Halberd / Ge (戈/戟)
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
      context.fillStyle = `rgba(12, 18, 15, ${alpha})`;
      context.strokeStyle = `rgba(12, 18, 15, ${alpha})`;

      // Long Shaft (木柲)
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo(0, 90);
      context.lineTo(0, -70);
      context.stroke();

      // Spear tip (矛头刺刃)
      context.beginPath();
      context.moveTo(-4, -70);
      context.lineTo(0, -105);
      context.lineTo(4, -70);
      context.closePath();
      context.fill();

      // Transverse blade (戈援)
      context.beginPath();
      context.moveTo(0, -60);
      context.quadraticCurveTo(18, -66, 34, -58);
      context.quadraticCurveTo(38, -54, 32, -50);
      context.quadraticCurveTo(16, -53, 0, -50);
      context.closePath();
      context.fill();

      // Downward Barb (戈胡)
      context.beginPath();
      context.moveTo(0, -50);
      context.lineTo(10, -36);
      context.lineTo(0, -38);
      context.closePath();
      context.fill();

      context.restore();
    };

    // Draw Warring States Warrior Silhouette (战国披甲武士剪影)
    const drawWarrior = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      facing: 1 | -1,
      pose: 'attack' | 'defend' | 'stand' | 'clash',
      scale: number,
      alpha: number,
      armAngle: number
    ) => {
      context.save();
      context.translate(x, y);
      context.scale(scale * facing, scale);

      context.fillStyle = `rgba(10, 16, 13, ${alpha})`;
      context.strokeStyle = `rgba(10, 16, 13, ${alpha})`;

      // Helmet & Crest (胄与胄缨)
      context.beginPath();
      context.arc(0, -66, 9.5, 0, Math.PI * 2);
      context.fill();

      // Helmet plume fluttering in wind
      context.beginPath();
      context.moveTo(-2, -75);
      context.lineTo(2, -75);
      context.lineTo(7, -84);
      context.lineTo(0, -80);
      context.closePath();
      context.fill();

      // Body Armor (札甲/铜甲)
      context.beginPath();
      context.moveTo(-12, -56);
      context.lineTo(14, -56);
      context.lineTo(16, -20);
      context.lineTo(-14, -20);
      context.closePath();
      context.fill();

      // Skirt armor (甲裙)
      context.beginPath();
      context.moveTo(-14, -20);
      context.lineTo(16, -20);
      context.lineTo(19, 6);
      context.lineTo(-16, 6);
      context.closePath();
      context.fill();

      // Legs based on stance
      context.lineWidth = 6;
      if (pose === 'attack' || pose === 'clash') {
        // Lunging battle stance
        context.beginPath();
        context.moveTo(6, 0);
        context.lineTo(18, 22);
        context.lineTo(26, 46);
        context.stroke();

        context.beginPath();
        context.moveTo(-8, 0);
        context.lineTo(-22, 24);
        context.lineTo(-34, 46);
        context.stroke();
      } else {
        // Defensive / standing guard stance
        context.beginPath();
        context.moveTo(6, 0);
        context.lineTo(10, 24);
        context.lineTo(15, 46);
        context.stroke();

        context.beginPath();
        context.moveTo(-8, 0);
        context.lineTo(-14, 24);
        context.lineTo(-18, 46);
        context.stroke();
      }

      // Arm holding Bronze Sword / Spear
      context.lineWidth = 5;
      context.beginPath();
      context.moveTo(4, -48);
      const handX = 16 + Math.cos(armAngle) * 24;
      const handY = -42 + Math.sin(armAngle) * 24;
      context.lineTo(12, -42);
      context.lineTo(handX, handY);
      context.stroke();

      // Bronze Sword (八面青铜长剑)
      context.save();
      context.translate(handX, handY);
      context.rotate(armAngle);
      context.fillStyle = `rgba(16, 24, 20, ${alpha * 1.15})`;
      context.beginPath();
      context.moveTo(0, -3.5);
      context.lineTo(52, -2.5);
      context.lineTo(64, 0); // Point
      context.lineTo(52, 2.5);
      context.lineTo(0, 3.5);
      context.lineTo(-12, 0); // Hilt
      context.closePath();
      context.fill();
      context.restore();

      context.restore();
    };

    // Draw Battle Banner (猎猎残旗)
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

      context.strokeStyle = `rgba(12, 18, 15, ${alpha})`;
      context.lineWidth = 3.5;
      context.beginPath();
      context.moveTo(0, 80);
      context.lineTo(0, -115);
      context.stroke();

      // Spear Top
      context.fillStyle = `rgba(12, 18, 15, ${alpha})`;
      context.beginPath();
      context.moveTo(-3, -115);
      context.lineTo(0, -130);
      context.lineTo(3, -115);
      context.closePath();
      context.fill();

      // Flag Cloth
      context.fillStyle = `rgba(32, 18, 18, ${alpha * 0.9})`;
      context.beginPath();
      context.moveTo(0, -110);
      const wave1 = Math.sin(wave) * 10;
      const wave2 = Math.cos(wave * 1.3) * 12;
      context.quadraticCurveTo(28 + wave1, -105, 60 + wave2, -98);
      context.lineTo(50 + wave2, -50);
      context.lineTo(65 + wave1, -40);
      context.lineTo(38 + wave1, -25);
      context.lineTo(58 + wave2, -10);
      context.quadraticCurveTo(22 + wave1, -30, 0, -45);
      context.closePath();
      context.fill();

      context.restore();
    };

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // --- 1. Background Ambience: Smoky Sky Gradient & Battle Dusk ---
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#060a08');
      bgGrad.addColorStop(0.35, '#0c120f');
      bgGrad.addColorStop(0.7, '#151010'); // Hint of blood & ember dusk
      bgGrad.addColorStop(1, '#050807');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // --- 2. Swirling Smoldering Fog Waves (血雾腥风弥漫层) ---
      const fogTime = tick * 0.007;
      for (let f = 0; f < 3; f++) {
        ctx.save();
        const fogAlpha = 0.05 + f * 0.035;
        ctx.fillStyle =
          f % 2 === 0 ? `rgba(68, 18, 16, ${fogAlpha})` : `rgba(18, 36, 28, ${fogAlpha})`;
        ctx.beginPath();
        const baseH = height * (0.64 + f * 0.11);
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseH);
        for (let px = 0; px <= width; px += 35) {
          const py =
            baseH +
            Math.sin(px * 0.004 + fogTime * (f + 1) + f) * 24 +
            Math.cos(px * 0.008 - fogTime) * 14;
          ctx.lineTo(px, py);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // --- 3. Distant Battlefield Mountain Ridge (远山荒丘与长城烽燧残垣) ---
      ctx.save();
      ctx.fillStyle = '#080d0b';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, height * 0.77);
      ctx.quadraticCurveTo(width * 0.28, height * 0.7, width * 0.52, height * 0.76);
      ctx.quadraticCurveTo(width * 0.8, height * 0.81, width, height * 0.73);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // --- 4. Shadow Soldiers Array (影影绰绰的远方战国军阵) ---
      armySoldiers.forEach((soldier, idx) => {
        soldier.bobOffset += 0.02;
        const bobY = Math.sin(soldier.bobOffset) * 2.5;
        const breatheAlpha = soldier.alpha * (0.85 + Math.sin(soldier.bobOffset * 0.7) * 0.15);

        if (soldier.weaponType === 'banner') {
          drawBanner(ctx, soldier.x, soldier.y + bobY, soldier.scale * 1.2, breatheAlpha, tick * 0.035 + idx);
        } else {
          drawWarrior(
            ctx,
            soldier.x,
            soldier.y + bobY,
            soldier.facing,
            'stand',
            soldier.scale,
            breatheAlpha,
            soldier.armAngle + Math.sin(soldier.bobOffset) * 0.05
          );
          if (soldier.weaponType === 'ge') {
            drawHalberd(
              ctx,
              soldier.x + soldier.facing * 8,
              soldier.y + bobY - 14,
              soldier.facing * -0.22,
              soldier.scale * 0.85,
              breatheAlpha * 1.1
            );
          }
        }
      });

      // --- 5. Broken Halberds & Weapons stuck in Ground (折戟沉沙) ---
      drawHalberd(ctx, width * 0.06, height * 0.83, -0.68, 0.75, 0.45);
      drawHalberd(ctx, width * 0.28, height * 0.89, 0.82, 0.65, 0.35);
      drawHalberd(ctx, width * 0.72, height * 0.87, -0.42, 0.68, 0.38);
      drawHalberd(ctx, width * 0.93, height * 0.85, 0.58, 0.78, 0.48);

      // --- 6. Foreground Clashing Warriors (刀兵相见 · 影影绰绰双雄刀光交锋剪影) ---
      const duelX = width * 0.48;
      const duelY = height * 0.83;
      const clashCycle = Math.sin(tick * 0.04);
      const isClashing = clashCycle > 0.82;

      const warriorL_x = duelX - 60 - (isClashing ? 10 : clashCycle * 14);
      const warriorR_x = duelX + 60 + (isClashing ? 10 : clashCycle * 14);

      const armAngleL = isClashing ? -0.12 : -0.45 + clashCycle * 0.32;
      const armAngleR = isClashing ? -0.12 : -0.45 + clashCycle * 0.32;

      // Draw Duelists
      drawWarrior(ctx, warriorL_x, duelY, 1, isClashing ? 'clash' : 'attack', 0.92, 0.6, armAngleL);
      drawWarrior(ctx, warriorR_x, duelY, -1, isClashing ? 'clash' : 'defend', 0.88, 0.55, armAngleR);

      // Blade clash spark emission
      if (isClashing && Math.random() < 0.4) {
        const cx = duelX;
        const cy = duelY - 52 + (Math.random() - 0.5) * 16;
        flashes.push({
          x: cx,
          y: cy,
          radius: 20 + Math.random() * 25,
          opacity: 0.85,
          maxOpacity: 0.85,
          color: Math.random() > 0.5 ? '255, 230, 180' : '220, 70, 50',
        });

        // Sparks flying out
        for (let i = 0; i < 9; i++) {
          const ang = Math.random() * Math.PI * 2;
          const spd = 2.5 + Math.random() * 5;
          sparks.push({
            x: cx,
            y: cy,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd - 1.2,
            life: 1,
            maxLife: 16 + Math.random() * 16,
            color: Math.random() > 0.45 ? '#ffd885' : '#e64a38',
            size: 1.2 + Math.random() * 1.5,
          });
        }
      }

      // --- 7. Render Clash Flashes & Sparks ---
      flashes.forEach(f => {
        ctx.save();
        const radGrad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);
        radGrad.addColorStop(0, `rgba(${f.color}, ${f.opacity})`);
        radGrad.addColorStop(0.45, `rgba(214, 65, 50, ${f.opacity * 0.6})`);
        radGrad.addColorStop(1, 'rgba(214, 65, 50, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        f.opacity -= 0.07;
      });
      flashes = flashes.filter(f => f.opacity > 0);

      sparks.forEach(sp => {
        ctx.save();
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = Math.max(0, sp.life / sp.maxLife);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.16;
        sp.life--;
      });
      sparks = sparks.filter(sp => sp.life > 0);

      // --- 8. Blood Rain Streaks (血雨风沙) ---
      ctx.save();
      bloodRains.forEach(br => {
        ctx.strokeStyle = `rgba(195, 45, 35, ${br.opacity})`;
        ctx.lineWidth = br.width;
        ctx.beginPath();
        ctx.moveTo(br.x, br.y);
        ctx.lineTo(br.x + br.speedX * 2.6, br.y + br.len);
        ctx.stroke();

        br.x += br.speedX;
        br.y += br.speedY;

        if (br.y > height) {
          br.y = -25;
          br.x = Math.random() * (width + 400) - 150;
        }
        if (br.x < -60) {
          br.x = width + 60;
        }
      });
      ctx.restore();

      // --- 9. Battle Embers & Ash Particles (战场飞灰与炽烬) ---
      embers.forEach(em => {
        em.pulse += 0.045;
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

      // --- 10. Occasional Sudden Sword Cold Gleam ---
      if (tick % 150 === 0) {
        const gx = width * 0.15 + Math.random() * width * 0.7;
        const gy = height * 0.45 + Math.random() * height * 0.3;
        flashes.push({
          x: gx,
          y: gy,
          radius: 38,
          opacity: 0.65,
          maxOpacity: 0.65,
          color: '255, 255, 255',
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
