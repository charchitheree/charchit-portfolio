import React, { useEffect, useState } from 'react';

// Sleek geometric data particles for mature gaming aesthetic
const DataParticle = ({ delay = 0, duration = 15 }: { delay?: number; duration?: number }) => {
  const colors = [
    'hsl(185, 100%, 55%)', // cyan
    'hsl(320, 100%, 60%)', // magenta
    'hsl(140, 100%, 50%)', // green
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = 2 + Math.random() * 3;
  const y = Math.random() * 100;
  
  return (
    <div
      className="absolute animate-data-stream opacity-60"
      style={{
        top: `${y}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <div 
        className="rounded-full"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          boxShadow: `0 0 ${size * 2}px ${color}`,
        }} 
      />
    </div>
  );
};

// Floating hexagon shapes
const HexShape = ({ x, y, size, color, delay }: { x: number; y: number; size: number; color: string; delay: number }) => (
  <div
    className="absolute animate-float-smooth opacity-20"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${5 + Math.random() * 5}s`,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100">
      <polygon
        points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  </div>
);

// Grid overlay effect
const GridOverlay = () => (
  <div 
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: `
        linear-gradient(hsl(185, 100%, 55%) 1px, transparent 1px),
        linear-gradient(90deg, hsl(185, 100%, 55%) 1px, transparent 1px)
      `,
      backgroundSize: '60px 60px',
    }}
  />
);

// Circuit line
const CircuitLine = ({ startY, color }: { startY: number; color: string }) => (
  <div className="absolute left-0 right-0 overflow-hidden opacity-10" style={{ top: `${startY}%` }}>
    <div 
      className="h-px"
      style={{ 
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }} 
    />
  </div>
);

const PixelCharacters = () => {
  const [shapes, setShapes] = useState<Array<{ x: number; y: number; size: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = [
      'hsl(185, 100%, 55%)',
      'hsl(320, 100%, 60%)',
      'hsl(55, 100%, 55%)',
    ];
    
    const newShapes = Array.from({ length: 6 }, (_, i) => ({
      x: 5 + Math.random() * 90,
      y: 10 + Math.random() * 80,
      size: 30 + Math.random() * 50,
      color: colors[i % colors.length],
      delay: Math.random() * 5,
    }));
    
    setShapes(newShapes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Grid overlay */}
      <GridOverlay />
      
      {/* Floating hexagons */}
      {shapes.map((shape, i) => (
        <HexShape key={i} {...shape} />
      ))}
      
      {/* Data particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <DataParticle key={`particle-${i}`} delay={i * 1.5} duration={12 + Math.random() * 8} />
      ))}
      
      {/* Circuit lines */}
      {[15, 35, 55, 75, 90].map((y, i) => (
        <CircuitLine 
          key={`circuit-${i}`} 
          startY={y} 
          color={['hsl(185, 100%, 55%)', 'hsl(320, 100%, 60%)', 'hsl(140, 100%, 50%)'][i % 3]} 
        />
      ))}
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
        <div className="absolute top-4 left-0 w-24 h-px bg-neon-cyan" />
        <div className="absolute top-0 left-4 w-px h-24 bg-neon-cyan" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className="absolute top-4 right-0 w-24 h-px bg-neon-magenta" />
        <div className="absolute top-0 right-4 w-px h-24 bg-neon-magenta" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
        <div className="absolute bottom-4 left-0 w-24 h-px bg-neon-green" />
        <div className="absolute bottom-0 left-4 w-px h-24 bg-neon-green" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
        <div className="absolute bottom-4 right-0 w-24 h-px bg-neon-yellow" />
        <div className="absolute bottom-0 right-4 w-px h-24 bg-neon-yellow" />
      </div>
    </div>
  );
};

export default PixelCharacters;
