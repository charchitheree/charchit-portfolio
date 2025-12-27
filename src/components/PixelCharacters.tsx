import React, { useEffect, useState } from 'react';

// Cute 8-bit pixel characters as SVG components
const PixelSlime = ({ color = "#00ff88" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 16 16" className="pixel-character">
    <rect x="4" y="8" width="8" height="6" fill={color} />
    <rect x="3" y="9" width="1" height="4" fill={color} />
    <rect x="12" y="9" width="1" height="4" fill={color} />
    <rect x="5" y="7" width="6" height="1" fill={color} />
    <rect x="2" y="13" width="2" height="2" fill={color} />
    <rect x="12" y="13" width="2" height="2" fill={color} />
    {/* Eyes */}
    <rect x="5" y="10" width="2" height="2" fill="#000" />
    <rect x="9" y="10" width="2" height="2" fill="#000" />
    <rect x="5" y="10" width="1" height="1" fill="#fff" />
    <rect x="9" y="10" width="1" height="1" fill="#fff" />
  </svg>
);

const PixelGhost = ({ color = "#ffffff" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 16 16" className="pixel-character">
    <rect x="4" y="3" width="8" height="10" fill={color} />
    <rect x="3" y="5" width="1" height="6" fill={color} />
    <rect x="12" y="5" width="1" height="6" fill={color} />
    <rect x="5" y="2" width="6" height="1" fill={color} />
    {/* Wavy bottom */}
    <rect x="4" y="13" width="2" height="2" fill={color} />
    <rect x="7" y="14" width="2" height="1" fill={color} />
    <rect x="10" y="13" width="2" height="2" fill={color} />
    {/* Eyes */}
    <rect x="5" y="6" width="2" height="3" fill="#000" />
    <rect x="9" y="6" width="2" height="3" fill="#000" />
  </svg>
);

const PixelStar = ({ color = "#ffff00" }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="pixel-character">
    <rect x="7" y="1" width="2" height="3" fill={color} />
    <rect x="7" y="12" width="2" height="3" fill={color} />
    <rect x="1" y="7" width="3" height="2" fill={color} />
    <rect x="12" y="7" width="3" height="2" fill={color} />
    <rect x="5" y="5" width="6" height="6" fill={color} />
    <rect x="4" y="6" width="1" height="4" fill={color} />
    <rect x="11" y="6" width="1" height="4" fill={color} />
    <rect x="3" y="4" width="2" height="2" fill={color} />
    <rect x="11" y="4" width="2" height="2" fill={color} />
    <rect x="3" y="10" width="2" height="2" fill={color} />
    <rect x="11" y="10" width="2" height="2" fill={color} />
    {/* Eye */}
    <rect x="6" y="7" width="1" height="1" fill="#000" />
    <rect x="9" y="7" width="1" height="1" fill="#000" />
    <rect x="7" y="9" width="2" height="1" fill="#000" />
  </svg>
);

const PixelHeart = ({ color = "#ff6b9d" }: { color?: string }) => (
  <svg width="24" height="24" viewBox="0 0 16 16" className="pixel-character">
    <rect x="2" y="4" width="4" height="4" fill={color} />
    <rect x="10" y="4" width="4" height="4" fill={color} />
    <rect x="1" y="5" width="1" height="2" fill={color} />
    <rect x="14" y="5" width="1" height="2" fill={color} />
    <rect x="4" y="3" width="2" height="1" fill={color} />
    <rect x="10" y="3" width="2" height="1" fill={color} />
    <rect x="6" y="5" width="4" height="3" fill={color} />
    <rect x="3" y="8" width="10" height="2" fill={color} />
    <rect x="4" y="10" width="8" height="1" fill={color} />
    <rect x="5" y="11" width="6" height="1" fill={color} />
    <rect x="6" y="12" width="4" height="1" fill={color} />
    <rect x="7" y="13" width="2" height="1" fill={color} />
  </svg>
);

const PixelMushroom = ({ color = "#ff4444" }: { color?: string }) => (
  <svg width="32" height="32" viewBox="0 0 16 16" className="pixel-character">
    {/* Cap */}
    <rect x="3" y="3" width="10" height="6" fill={color} />
    <rect x="2" y="5" width="1" height="3" fill={color} />
    <rect x="13" y="5" width="1" height="3" fill={color} />
    <rect x="4" y="2" width="8" height="1" fill={color} />
    {/* Spots */}
    <rect x="4" y="4" width="2" height="2" fill="#fff" />
    <rect x="8" y="3" width="2" height="2" fill="#fff" />
    <rect x="11" y="5" width="1" height="2" fill="#fff" />
    {/* Stem */}
    <rect x="5" y="9" width="6" height="5" fill="#ffe4c4" />
    {/* Face */}
    <rect x="6" y="10" width="1" height="1" fill="#000" />
    <rect x="9" y="10" width="1" height="1" fill="#000" />
    <rect x="7" y="12" width="2" height="1" fill="#000" />
  </svg>
);

const PixelCoin = ({ color = "#ffd700" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 16 16" className="pixel-character">
    <rect x="4" y="2" width="8" height="12" fill={color} />
    <rect x="3" y="4" width="1" height="8" fill={color} />
    <rect x="12" y="4" width="1" height="8" fill={color} />
    <rect x="5" y="1" width="6" height="1" fill={color} />
    <rect x="5" y="14" width="6" height="1" fill={color} />
    {/* C symbol */}
    <rect x="6" y="5" width="4" height="1" fill="#b8860b" />
    <rect x="5" y="6" width="1" height="4" fill="#b8860b" />
    <rect x="6" y="10" width="4" height="1" fill="#b8860b" />
    {/* Shine */}
    <rect x="4" y="3" width="1" height="2" fill="#fff" opacity="0.5" />
  </svg>
);

const PixelBird = ({ color = "#00bfff" }: { color?: string }) => (
  <svg width="28" height="28" viewBox="0 0 16 16" className="pixel-character">
    <rect x="4" y="5" width="8" height="6" fill={color} />
    <rect x="3" y="6" width="1" height="4" fill={color} />
    <rect x="12" y="7" width="3" height="3" fill={color} />
    {/* Wing */}
    <rect x="6" y="8" width="3" height="3" fill="#0099cc" />
    {/* Eye */}
    <rect x="10" y="6" width="2" height="2" fill="#fff" />
    <rect x="11" y="7" width="1" height="1" fill="#000" />
    {/* Beak */}
    <rect x="14" y="8" width="2" height="1" fill="#ffa500" />
    {/* Tail */}
    <rect x="2" y="7" width="2" height="2" fill={color} />
    <rect x="1" y="8" width="1" height="2" fill={color} />
  </svg>
);

interface Character {
  id: number;
  type: 'slime' | 'ghost' | 'star' | 'heart' | 'mushroom' | 'coin' | 'bird';
  color: string;
  x: number;
  y: number;
  direction: 'left' | 'right';
  speed: number;
  animation: string;
  size: number;
}

const characterColors = {
  slime: ['#00ff88', '#88ff00', '#00ffcc', '#ff88cc'],
  ghost: ['#ffffff', '#e0e0ff', '#ffe0f0', '#e0fff0'],
  star: ['#ffff00', '#ffd700', '#ff8800', '#ff00ff'],
  heart: ['#ff6b9d', '#ff4477', '#ff88aa', '#ff3366'],
  mushroom: ['#ff4444', '#44ff44', '#4444ff', '#ff8844'],
  coin: ['#ffd700', '#ffb700', '#ff9500'],
  bird: ['#00bfff', '#ff6b9d', '#88ff00', '#ff8800'],
};

const PixelCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    // Generate random characters
    const types: Character['type'][] = ['slime', 'ghost', 'star', 'heart', 'mushroom', 'coin', 'bird'];
    const animations = ['animate-walk-right', 'animate-walk-left', 'animate-float-pixel', 'animate-bounce-pixel'];
    
    const newCharacters: Character[] = [];
    const numCharacters = 8;

    for (let i = 0; i < numCharacters; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const colors = characterColors[type];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newCharacters.push({
        id: i,
        type,
        color,
        x: Math.random() * 100,
        y: 10 + Math.random() * 80,
        direction: Math.random() > 0.5 ? 'left' : 'right',
        speed: 15 + Math.random() * 20,
        animation: animations[Math.floor(Math.random() * animations.length)],
        size: 0.8 + Math.random() * 0.6,
      });
    }

    setCharacters(newCharacters);
  }, []);

  const renderCharacter = (char: Character) => {
    switch (char.type) {
      case 'slime': return <PixelSlime color={char.color} />;
      case 'ghost': return <PixelGhost color={char.color} />;
      case 'star': return <PixelStar color={char.color} />;
      case 'heart': return <PixelHeart color={char.color} />;
      case 'mushroom': return <PixelMushroom color={char.color} />;
      case 'coin': return <PixelCoin color={char.color} />;
      case 'bird': return <PixelBird color={char.color} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {characters.map((char) => (
        <div
          key={char.id}
          className={`absolute ${char.animation}`}
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            transform: `scale(${char.size})`,
            animationDuration: `${char.speed}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.7,
          }}
        >
          {renderCharacter(char)}
        </div>
      ))}
      
      {/* Floating sparkles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div className="w-2 h-2 bg-retro-yellow rotate-45" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
        </div>
      ))}
    </div>
  );
};

export default PixelCharacters;
