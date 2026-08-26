import React, { useEffect, useRef } from 'react';
import { sound } from '../audio';

interface Point {
  x: number;
  y: number;
  time: number;
  age: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const SwordSlashCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastSoundTime = useRef(0);
  const isMouseDown = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const addPoint = (x: number, y: number) => {
      const now = performance.now();
      const points = pointsRef.current;
      
      if (points.length > 0) {
        const last = points[points.length - 1];
        const dist = Math.hypot(x - last.x, y - last.y);
        const dt = now - last.time;
        const speed = dt > 0 ? dist / dt : 0;

        // Trigger sparkling starlight twinkle chime on mouse movement
        if (speed > 1.8 && now - lastSoundTime.current > 320) {
          lastSoundTime.current = now;
          sound.playStarTwinkle();

          // Spawn starlight spark particles on mouse glide
          for (let i = 0; i < 4; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 2 + 1;
            particlesRef.current.push({
              x: x + (Math.random() - 0.5) * 10,
              y: y + (Math.random() - 0.5) * 10,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              size: Math.random() * 3 + 1,
              alpha: 0.9,
              color: Math.random() > 0.4 ? '#ffd885' : '#eaf8f2',
            });
          }
        }
      }

      points.push({ x, y, time: now, age: 0 });
    };

    const handleMouseMove = (e: MouseEvent) => {
      addPoint(e.clientX, e.clientY);
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown.current = true;
      addPoint(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        addPoint(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const particles = particlesRef.current;

      // Update and draw sword slash trail
      if (points.length > 1) {
        for (let i = 0; i < points.length; i++) {
          points[i].age += 0.05;
        }

        // Filter out expired points
        pointsRef.current = points.filter(p => p.age < 1.0);

        if (pointsRef.current.length > 1) {
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          for (let i = 1; i < pointsRef.current.length; i++) {
            const p0 = pointsRef.current[i - 1];
            const p1 = pointsRef.current[i];
            const life = 1 - (p0.age + p1.age) / 2;

            if (life > 0) {
              // Outer golden/amber sword glow
              ctx.beginPath();
              ctx.moveTo(p0.x, p0.y);
              ctx.lineTo(p1.x, p1.y);
              ctx.strokeStyle = `rgba(212, 175, 55, ${life * 0.4})`;
              ctx.lineWidth = Math.max(1, life * 6);
              ctx.stroke();

              // Inner white/pale sharp blade edge
              ctx.beginPath();
              ctx.moveTo(p0.x, p0.y);
              ctx.lineTo(p1.x, p1.y);
              ctx.strokeStyle = `rgba(255, 248, 220, ${life * 0.7})`;
              ctx.lineWidth = Math.max(0.5, life * 2);
              ctx.stroke();
            }
          }
          ctx.restore();
        }
      }

      // Update and draw sword spark particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.save();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
