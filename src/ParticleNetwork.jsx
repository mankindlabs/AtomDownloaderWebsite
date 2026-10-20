import React, { useEffect, useRef } from 'react';

export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, frame = 0, last = 0, particles = [];
    const draw = (time = 0) => {
      const step = Math.min((time - last) / 16.67 || 1, 2);
      last = time;
      context.clearRect(0, 0, width, height);
      particles.forEach((point, index) => {
        if (!motion.matches) {
          point.x += point.vx * step;
          point.y += point.vy * step;
          if (point.x < -10) point.x = width + 10;
          if (point.x > width + 10) point.x = -10;
          if (point.y < -10) point.y = height + 10;
          if (point.y > height + 10) point.y = -10;
        }
        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const distance = Math.hypot(point.x - other.x, point.y - other.y);
          if (distance < 145) {
            context.strokeStyle = `rgba(72, 128, 232, ${(1 - distance / 145) * 0.23})`;
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
        context.fillStyle = 'rgba(75, 136, 245, 0.4)';
        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        context.fill();
      });
      if (!motion.matches && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (!document.hidden) draw();
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = width < 700 ? 38 : Math.min(110, Math.round(width * height / 12000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34, vy: (Math.random() - 0.5) * 0.34,
        radius: 0.8 + Math.random() * 1.3,
      }));
      restart();
    };
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', restart);
    motion.addEventListener('change', restart);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', restart);
      motion.removeEventListener('change', restart);
    };
  }, []);
  return <canvas className="particle-network" ref={canvasRef} aria-hidden="true" />;
}
