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
    sm: "text-2xl md:text-3xl",
    md: "text-4xl md:text-5xl",
    lg: "text-5xl md:text-7xl",
  };

  const letters = name.split("");
  const colors = [
    "text-neon-cyan",
    "text-neon-magenta",
    "text-neon-yellow",
    "text-neon-cyan",
    "text-neon-green",
    "text-neon-magenta",
    "text-neon-orange",
    "text-neon-pink",
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
    }, 100);

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
      <h1 className={`font-gaming ${sizeClasses[size]} tracking-wider relative`}>
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`${colors[index % colors.length]} inline-block transition-all duration-300 hover:scale-110`}
            style={{
              opacity: index < visibleLetters ? 1 : 0,
              transform: index < visibleLetters ? "translateY(0)" : "translateY(-30px)",
              textShadow: index < visibleLetters 
                ? '0 0 10px currentColor, 0 0 30px currentColor, 0 2px 0 hsl(var(--pixel-shadow))' 
                : 'none',
              transitionDelay: animate ? `${index * 40}ms` : '0ms',
            }}
          >
            {letter}
          </span>
        ))}
        {showCursor && (
          <span 
            className="inline-block w-[4px] md:w-[6px] h-[0.75em] bg-neon-cyan ml-2 animate-pulse"
            style={{ 
              verticalAlign: 'middle',
              boxShadow: '0 0 10px hsl(var(--neon-cyan)), 0 0 20px hsl(var(--neon-cyan))',
            }}
          />
        )}
      </h1>
      
      {/* Subtle underline accent */}
      <div 
        className="h-0.5 mt-2 mx-auto transition-all duration-1000"
        style={{
          width: visibleLetters >= letters.length ? '100%' : '0%',
          background: 'linear-gradient(90deg, hsl(var(--neon-cyan)), hsl(var(--neon-magenta)), hsl(var(--neon-yellow)))',
          boxShadow: '0 0 10px hsl(var(--neon-cyan)), 0 0 20px hsl(var(--neon-magenta))',
          opacity: 0.8,
        }}
      />
    </div>
  );
};

export default GoogleLogo;
