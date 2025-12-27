import { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Stars
    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    // Shooting stars / comets
    const comets: { x: number; y: number; speed: number; length: number; opacity: number; active: boolean }[] = [];
    
    const spawnComet = () => {
      if (comets.filter(c => c.active).length < 2 && Math.random() > 0.98) {
        comets.push({
          x: Math.random() * canvas.width,
          y: -20,
          speed: Math.random() * 8 + 4,
          length: Math.random() * 80 + 40,
          opacity: 1,
          active: true,
        });
      }
    };

    // Nebula clouds
    const nebulae: { x: number; y: number; radius: number; color: string }[] = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 200, color: 'rgba(66, 133, 244, 0.03)' },
      { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 250, color: 'rgba(234, 67, 53, 0.02)' },
      { x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 300, color: 'rgba(52, 168, 83, 0.02)' },
    ];

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'hsl(0, 0%, 7%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebulae
      nebulae.forEach(nebula => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Draw and update stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * (0.5 + Math.sin(Date.now() * 0.001 + star.x) * 0.5)})`;
        ctx.fill();

        // Slow drift
        star.y += star.speed * 0.1;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Spawn and draw comets
      spawnComet();
      comets.forEach((comet, index) => {
        if (!comet.active) return;

        const gradient = ctx.createLinearGradient(
          comet.x, comet.y - comet.length,
          comet.x + comet.length * 0.3, comet.y
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(comet.x - comet.length * 0.3, comet.y - comet.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Comet head glow
        const headGradient = ctx.createRadialGradient(
          comet.x, comet.y, 0,
          comet.x, comet.y, 10
        );
        headGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        headGradient.addColorStop(0.5, 'rgba(66, 133, 244, 0.5)');
        headGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = headGradient;
        ctx.fillRect(comet.x - 15, comet.y - 15, 30, 30);

        comet.x += comet.speed * 0.3;
        comet.y += comet.speed;

        if (comet.y > canvas.height + comet.length) {
          comets.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'hsl(0, 0%, 7%)' }}
    />
  );
};

export default SpaceBackground;
