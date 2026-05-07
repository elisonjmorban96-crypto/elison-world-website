import { useEffect, useRef } from 'react';

export default function CinematicOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    // Film grain
    const drawGrain = () => {
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;     // R
        data[i + 1] = noise; // G
        data[i + 2] = noise; // B
        data[i + 3] = 12;    // A (very subtle)
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    // Vignette
    const drawVignette = () => {
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, width * 0.3,
        width / 2, height / 2, width * 0.8
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.4)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    // Scan lines
    const drawScanLines = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.03)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 2);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrain();
      drawVignette();
      drawScanLines();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[100]"
      style={{ mixBlendMode: 'overlay' }}
    />
  );
}
