import { useEffect, useRef } from 'react';

interface Ray {
  angle: number;
  width: number;
  length: number;
  opacity: number;
  speed: number;
}

interface LightRaysProps {
  active?: boolean;
  color?: string;
  rayCount?: number;
}

export default function LightRays({
  active = true,
  color = '#b8860b',
  rayCount = 12,
}: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const raysRef = useRef<Ray[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize rays with varied properties for organic feel
    raysRef.current = Array.from({ length: rayCount }, (_, i) => ({
      angle: (i / rayCount) * Math.PI * 2,
      width: 0.02 + Math.random() * 0.04, // 2% to 6% of circle
      length: 0.3 + Math.random() * 0.4,   // 30% to 70% of radius
      opacity: 0.03 + Math.random() * 0.07, // Very subtle
      speed: 0.0002 + Math.random() * 0.0005, // Slow drift
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (!active) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxRadius = Math.max(rect.width, rect.height) * 0.8;

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Update rotation
      rotationRef.current += 0.0003;

      raysRef.current.forEach((ray) => {
        // Slowly drift individual ray angles
        ray.angle += ray.speed;

        const baseAngle = ray.angle + rotationRef.current;
        const rayWidthRad = ray.width * Math.PI;

        // Create gradient for each ray (brightest at center, fading outward)
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          maxRadius * ray.length
        );

        // Parse hex color to RGB for gradient stops
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${ray.opacity * 1.5})`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${ray.opacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(baseAngle);

        // Draw ray as a tapered wedge
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(
          0,
          0,
          maxRadius * ray.length,
          -rayWidthRad / 2,
          rayWidthRad / 2
        );
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.globalCompositeOperation = 'screen';
        ctx.fill();

        ctx.restore();
      });

      // Add subtle glow at center
      const centerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        maxRadius * 0.15
      );

      const cr = parseInt(color.slice(1, 3), 16);
      const cg = parseInt(color.slice(3, 5), 16);
      const cb = parseInt(color.slice(5, 7), 16);

      centerGlow.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.08)`);
      centerGlow.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = centerGlow;
      ctx.globalCompositeOperation = 'screen';
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [active, color, rayCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
