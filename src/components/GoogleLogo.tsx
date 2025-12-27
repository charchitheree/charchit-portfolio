import { useEffect, useState } from "react";

interface GoogleLogoProps {
  name?: string;
  size?: "sm" | "md" | "lg";
  subtitle?: string;
  animate?: boolean;
}

const GoogleLogo = ({ name = "Portfolio", size = "lg", animate = false }: GoogleLogoProps) => {
  const [visibleLetters, setVisibleLetters] = useState(animate ? 0 : name.length);
  const [showCursor, setShowCursor] = useState(animate);

  const sizeClasses = {
    sm: "text-xl md:text-2xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-6xl",
  };

  const letters = name.split("");
  const colors = [
    "text-retro-cyan",
    "text-retro-magenta",
    "text-retro-yellow",
    "text-retro-cyan",
    "text-retro-green",
    "text-retro-magenta",
    "text-retro-orange",
    "text-retro-pink",
  ];

  useEffect(() => {
    if (!animate) return;
    
    const timer = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev >= letters.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [animate, letters.length]);

  useEffect(() => {
    if (!animate) return;
    
    if (visibleLetters >= letters.length) {
      const cursorTimer = setTimeout(() => {
        setShowCursor(false);
      }, 2000);
      return () => clearTimeout(cursorTimer);
    }
  }, [animate, visibleLetters, letters.length]);

  return (
    <div className="relative">
      {/* Pixel glow effect behind text */}
      <div className="absolute inset-0 blur-xl opacity-30 pointer-events-none">
        <h1 className={`font-pixel ${sizeClasses[size]} rainbow-text`}>
          {name}
        </h1>
      </div>
      
      <h1 className={`font-pixel ${sizeClasses[size]} tracking-tight relative`}>
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`${colors[index % colors.length]} inline-block transition-all duration-300 hover:animate-bounce-pixel`}
            style={{
              opacity: index < visibleLetters ? 1 : 0,
              transform: index < visibleLetters ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.5)",
              textShadow: index < visibleLetters ? '3px 3px 0 hsl(var(--pixel-shadow)), 0 0 20px currentColor' : 'none',
              transitionDelay: animate ? `${index * 50}ms` : '0ms',
            }}
          >
            {letter}
          </span>
        ))}
        {showCursor && (
          <span 
            className="inline-block w-[4px] md:w-[6px] h-[0.8em] bg-retro-cyan ml-1 animate-pulse"
            style={{ 
              verticalAlign: 'baseline',
              boxShadow: '0 0 10px hsl(var(--retro-cyan))',
            }}
          />
        )}
      </h1>
    </div>
  );
};

export default GoogleLogo;
