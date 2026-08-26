import React, { useEffect, useRef } from 'react';

interface Leaf {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  vAngle: number;
  size: number;
  opacity: number;
  flip: number;
  vFlip: number;
  colorType: number; // 0: bamboo green-gold, 1: autumn rust, 2: ink black
}

interface InkMist {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  growthRate: number;
  vx: number;
  vy: number;
}

export const JianghuAtmosphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Dynamic Bamboo Leaves
    const leafCount = 28;
    const leaves: Leaf[] = [];

    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: 0.3 + Math.random() * 0.9,
        vy: 0.5 + Math.random() * 0.9,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.03,
        size: 11 + Math.random() * 10,
        opacity: 0.3 + Math.random() * 0.45,
        flip: Math.random() * Math.PI,
        vFlip: 0.015 + Math.random() * 0.03,
        colorType: Math.floor(Math.random() * 3),
      });
    }

    // Diffusion Ink Mist Wisps (氤氲墨气)
    const mistCount = 6;
    const mists: InkMist[] = [];

    const createMist = (x?: number, y?: number): InkMist => ({
      x: x ?? Math.random() * window.innerWidth,
      y: y ?? Math.random() * window.innerHeight,
      radius: 40 + Math.random() * 50,
      maxRadius: 160 + Math.random() * 120,
      opacity: 0.03 + Math.random() * 0.05,
      growthRate: 0.15 + Math.random() * 0.2,
      vx: (Math.random() - 0.5) * 0.3 + 0.1,
      vy: (Math.random() - 0.5) * 0.2,
    });

    for (let i = 0; i < mistCount; i++) {
      mists.push(createMist());
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Render Diffusion Ink Mist Wisps (氤氲墨气扩散)
      for (let i = 0; i < mists.length; i++) {
        const mist = mists[i];
        mist.radius += mist.growthRate;
        mist.x += mist.vx;
        mist.y += mist.vy;

        // Calculate fade based on expansion
        const lifeRatio = (mist.radius - 40) / (mist.maxRadius - 40);
        const currentOpacity = mist.opacity * (1 - lifeRatio);

        if (mist.radius >= mist.maxRadius || currentOpacity <= 0) {
          mists[i] = createMist();
          continue;
        }

        const grad = ctx.createRadialGradient(
          mist.x,
          mist.y,
          mist.radius * 0.1,
          mist.x,
          mist.y,
          mist.radius
        );
        grad.addColorStop(0, `rgba(20, 14, 10, ${currentOpacity * 1.5})`);
        grad.addColorStop(0.5, `rgba(45, 30, 20, ${currentOpacity * 0.8})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mist.x, mist.y, mist.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Falling & Drifting Bamboo Leaves (竹叶随风飘落)
      for (const leaf of leaves) {
        leaf.x += leaf.vx + Math.sin(leaf.angle) * 0.5;
        leaf.y += leaf.vy;
        leaf.angle += leaf.vAngle;
        leaf.flip += leaf.vFlip;

        // Wrap around screen boundaries
        if (leaf.y > canvas.height + 30) {
          leaf.y = -30;
          leaf.x = Math.random() * canvas.width;
        }
        if (leaf.x > canvas.width + 30) {
          leaf.x = -30;
        }

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);
        ctx.scale(Math.cos(leaf.flip), 1);

        // Bamboo Leaf shape (curved willow/bamboo silhouette in ink-gold)
        ctx.beginPath();
        ctx.moveTo(-leaf.size, 0);
        ctx.quadraticCurveTo(0, -leaf.size * 0.38, leaf.size, 0);
        ctx.quadraticCurveTo(0, leaf.size * 0.38, -leaf.size, 0);

        if (leaf.colorType === 0) {
          // Bamboo dark green-gold
          ctx.fillStyle = `rgba(74, 90, 68, ${leaf.opacity * 0.85})`;
        } else if (leaf.colorType === 1) {
          // Autumn gold-brown
          ctx.fillStyle = `rgba(148, 107, 60, ${leaf.opacity * 0.8})`;
        } else {
          // Ancient wuxia ink-wash black
          ctx.fillStyle = `rgba(28, 20, 15, ${leaf.opacity * 0.9})`;
        }
        ctx.fill();

        // Delicate central leaf vein
        ctx.beginPath();
        ctx.moveTo(-leaf.size * 0.85, 0);
        ctx.lineTo(leaf.size * 0.85, 0);
        ctx.strokeStyle = `rgba(212, 175, 55, ${leaf.opacity * 0.65})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();

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
      className="fixed inset-0 pointer-events-none z-0 opacity-75"
    />
  );
};
