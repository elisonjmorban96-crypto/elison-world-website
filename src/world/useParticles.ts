import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export const useParticles = (canvasRef: React.RefObject<HTMLCanvasElement | null>, isActive: boolean) => {
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const createParticle = useCallback((x: number, y: number, color: string = '#D4A853'): Particle => {
    return {
      x,
      y,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: -Math.random() * 2 - 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      color,
      life: 0,
      maxLife: Math.random() * 60 + 30,
    };
  }, []);

  const spawnParticles = useCallback((x: number, y: number, count: number = 8, color?: string) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(createParticle(x, y, color));
    }
  }, [createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Ambient particles
    for (let i = 0; i < 20; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -Math.random() * 0.5 - 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? '#D4A853' : '#E86A33',
        life: 0,
        maxLife: Infinity,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;

        if (p.maxLife !== Infinity && p.life > p.maxLife) {
          return false;
        }

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const fade = p.maxLife === Infinity ? 1 : 1 - (p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * fade;
        ctx.fill();
        ctx.globalAlpha = 1;

        return true;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef, isActive, createParticle]);

  return { spawnParticles };
};
