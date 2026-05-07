import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
  driftSpeed: number;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  mouseRepelRadius?: number;
  mouseRepelStrength?: number;
}

export default function ParticleField({
  className = '',
  particleCount = 80,
  connectionDistance = 120,
  mouseRepelRadius = 100,
  mouseRepelStrength = 0.5,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        const isGold = Math.random() > 0.4; // 60% gold, 40% white
        particlesRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.5 - 0.1, // Drift upward
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          color: isGold ? '184, 134, 11' : '255, 255, 255',
          driftSpeed: Math.random() * 0.3 + 0.1,
        });
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((particle) => {
        // Mouse repulsion
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRepelRadius && dist > 0) {
          const force = (mouseRepelRadius - dist) / mouseRepelRadius;
          particle.vx += (dx / dist) * force * mouseRepelStrength;
          particle.vy += (dy / dist) * force * mouseRepelStrength;
        }

        // Apply velocity with drift
        particle.x += particle.vx;
        particle.y += particle.vy + particle.driftSpeed;

        // Dampen velocity
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Wrap around edges
        if (particle.x < -10) particle.x = rect.width + 10;
        if (particle.x > rect.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = rect.height + 10;
        if (particle.y > rect.height + 10) particle.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.fill();

        // Subtle glow for larger particles
        if (particle.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.radius * 3
          );
          gradient.addColorStop(0, `rgba(${particle.color}, ${particle.opacity * 0.3})`);
          gradient.addColorStop(1, `rgba(${particle.color}, 0)`);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Draw connections (constellation effect)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(184, 134, 11, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, [particleCount, connectionDistance, mouseRepelRadius, mouseRepelStrength]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}
