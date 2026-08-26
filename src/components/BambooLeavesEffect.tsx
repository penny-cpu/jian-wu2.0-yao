import React, { useEffect, useRef } from 'react';

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  colorType: 'jade' | 'emerald' | 'golden' | 'amber';
}

interface SwordQiParticle {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  maxOpacity: number;
  width: number;
  color: string;
}

interface InkMistParticle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speedX: number;
  speedY: number;
}

export const BambooLeavesEffect: React.FC<{ className?: string }> = ({ className = '' }) => {
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

    // Color definitions
    const leafPalettes = {
      jade: ['#2e6945', '#428a5a', '#1e4830'],
      emerald: ['#3e8557', '#62a87c', '#245237'],
      golden: ['#b88a3b', '#d4a84d', '#855e21'],
      amber: ['#9c6d32', '#ba8947', '#6e491c'],
    };

    // Initialize Bamboo Leaves (竹叶)
    const leafCount = Math.min(32, Math.floor(width / 35));
    const leaves: Leaf[] = [];

    for (let i = 0; i < leafCount; i++) {
      const types: Leaf['colorType'][] = ['jade', 'emerald', 'golden', 'amber'];
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height - height * 0.2,
        size: 14 + Math.random() * 18,
        speedY: 0.6 + Math.random() * 1.2,
        speedX: -0.4 + Math.random() * 1.1,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.02 + Math.random() * 0.04,
        opacity: 0.45 + Math.random() * 0.45,
        colorType: types[Math.floor(Math.random() * types.length)],
      });
    }

    // Initialize Sword Qi Trails (剑气华光)
    const swordQiList: SwordQiParticle[] = [];
    const createSwordQi = () => {
      if (swordQiList.length < 4 && Math.random() < 0.04) {
        const colors = [
          'rgba(255, 230, 140, ', // Gold
          'rgba(180, 240, 220, ', // Cyan Jade
          'rgba(255, 255, 255, ', // Pure White
        ];
        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        swordQiList.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.8 + height * 0.1,
          length: 80 + Math.random() * 160,
          angle: -Math.PI / 4 + (Math.random() - 0.5) * 0.4, // slanting sword slash
          speed: 8 + Math.random() * 12,
          opacity: 0,
          maxOpacity: 0.35 + Math.random() * 0.35,
          width: 1.5 + Math.random() * 2,
          color: colorBase,
        });
      }
    };

    // Initialize Ink Mist (水墨烟岚)
    const mistParticles: InkMistParticle[] = [];
    for (let i = 0; i < 6; i++) {
      mistParticles.push({
        x: Math.random() * width,
        y: height * 0.5 + Math.random() * height * 0.5,
        radius: 120 + Math.random() * 180,
        opacity: 0.04 + Math.random() * 0.06,
        speedX: 0.15 + Math.random() * 0.25,
        speedY: (Math.random() - 0.5) * 0.1,
      });
    }

    // Render loop
    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Subtle Bamboo Silhouettes on background edges (竹影摇曳)
      drawBambooSilhouettes(ctx, width, height, frame);

      // 2. Draw Ink Mist Clouds (墨韵薄雾)
      mistParticles.forEach(m => {
        m.x += m.speedX;
        m.y += m.speedY;
        if (m.x - m.radius > width) m.x = -m.radius;

        const grad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius);
        grad.addColorStop(0, `rgba(32, 45, 38, ${m.opacity})`);
        grad.addColorStop(0.6, `rgba(20, 28, 24, ${m.opacity * 0.5})`);
        grad.addColorStop(1, 'rgba(10, 15, 12, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw & Update Sword Qi (剑气纵横)
      createSwordQi();
      for (let i = swordQiList.length - 1; i >= 0; i--) {
        const sq = swordQiList[i];
        sq.opacity += 0.03;
        if (sq.opacity >= sq.maxOpacity) {
          sq.opacity -= 0.06;
        }
        sq.x += Math.cos(sq.angle) * sq.speed;
        sq.y += Math.sin(sq.angle) * sq.speed;

        // Draw glowing slash
        const tailX = sq.x - Math.cos(sq.angle) * sq.length;
        const tailY = sq.y - Math.sin(sq.angle) * sq.length;

        const grad = ctx.createLinearGradient(tailX, tailY, sq.x, sq.y);
        grad.addColorStop(0, `${sq.color}0)`);
        grad.addColorStop(0.7, `${sq.color}${Math.max(0, sq.opacity)})`);
        grad.addColorStop(1, `${sq.color}${Math.min(1, sq.opacity * 1.5)})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = sq.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(sq.x, sq.y);
        ctx.stroke();

        // Tip spark
        ctx.fillStyle = `${sq.color}${Math.min(1, sq.opacity * 1.8)})`;
        ctx.beginPath();
        ctx.arc(sq.x, sq.y, sq.width * 1.8, 0, Math.PI * 2);
        ctx.fill();

        if (sq.opacity <= 0 || sq.x > width + 200 || sq.y > height + 200) {
          swordQiList.splice(i, 1);
        }
      }

      // 4. Draw & Update Bamboo Leaves (竹叶翩跹)
      leaves.forEach(leaf => {
        // Wind oscillation
        const wind = Math.sin(frame * 0.02 + leaf.y * 0.01) * 0.8;
        leaf.x += leaf.speedX + wind;
        leaf.y += leaf.speedY;
        leaf.rotation += leaf.rotSpeed;
        leaf.flip += leaf.flipSpeed;

        // Wrap around screen
        if (leaf.y > height + 40) {
          leaf.y = -30;
          leaf.x = Math.random() * (width + 100) - 50;
        }
        if (leaf.x < -40) leaf.x = width + 30;
        if (leaf.x > width + 40) leaf.x = -30;

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.scale(Math.cos(leaf.flip), 1);
        ctx.globalAlpha = leaf.opacity;

        // Draw realistic bamboo leaf blade (柳叶形细长竹叶)
        const palette = leafPalettes[leaf.colorType];
        const s = leaf.size;

        // Main leaf shape
        ctx.beginPath();
        ctx.moveTo(0, -s * 1.2);
        ctx.bezierCurveTo(s * 0.35, -s * 0.4, s * 0.3, s * 0.6, 0, s * 1.2);
        ctx.bezierCurveTo(-s * 0.3, s * 0.6, -s * 0.35, -s * 0.4, 0, -s * 1.2);
        ctx.closePath();

        // Leaf Gradient
        const leafGrad = ctx.createLinearGradient(0, -s * 1.2, 0, s * 1.2);
        leafGrad.addColorStop(0, palette[0]);
        leafGrad.addColorStop(0.5, palette[1]);
        leafGrad.addColorStop(1, palette[2]);
        ctx.fillStyle = leafGrad;
        ctx.fill();

        // Leaf midrib / vein (叶脉中脊)
        ctx.strokeStyle = 'rgba(255, 245, 200, 0.3)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -s * 1.1);
        ctx.lineTo(0, s * 1.1);
        ctx.stroke();

        ctx.restore();
      });

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

// Helper: draws elegant bamboo stalks & silhouettes in the background corners
function drawBambooSilhouettes(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  frame: number
) {
  ctx.save();
  ctx.fillStyle = 'rgba(18, 28, 22, 0.45)';
  ctx.strokeStyle = 'rgba(14, 22, 17, 0.55)';

  // Left Bamboo Grove
  const leftSway = Math.sin(frame * 0.015) * 6;
  drawBambooPole(ctx, 25 + leftSway, h, 14, h * 0.85);
  drawBambooPole(ctx, 70 + leftSway * 0.8, h, 18, h * 0.95);
  drawBambooPole(ctx, 120 + leftSway * 0.6, h, 12, h * 0.75);

  // Right Bamboo Grove
  const rightSway = Math.sin(frame * 0.015 + 1) * 6;
  drawBambooPole(ctx, w - 40 + rightSway, h, 16, h * 0.9);
  drawBambooPole(ctx, w - 90 + rightSway * 0.7, h, 13, h * 0.8);
  drawBambooPole(ctx, w - 140 + rightSway * 0.5, h, 10, h * 0.7);

  ctx.restore();
}

function drawBambooPole(
  ctx: CanvasRenderingContext2D,
  x: number,
  bottomY: number,
  width: number,
  height: number
) {
  const segments = 5;
  const segHeight = height / segments;

  for (let i = 0; i < segments; i++) {
    const y = bottomY - i * segHeight;
    const w = width * (1 - i * 0.05);

    // Pole segment
    ctx.fillRect(x - w / 2, y - segHeight + 4, w, segHeight - 8);

    // Bamboo Joint Ring (竹节)
    ctx.beginPath();
    ctx.ellipse(x, y - segHeight + 4, w * 0.7, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Occasional small branch / leaves
    if (i === 2 || i === 4) {
      const dir = (i + x) % 2 === 0 ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(x + (dir * w) / 2, y - segHeight + 4);
      ctx.quadraticCurveTo(
        x + dir * 40,
        y - segHeight - 15,
        x + dir * 65,
        y - segHeight - 10
      );
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}
