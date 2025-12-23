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
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl md:text-7xl",
  };

  const letters = name.split("");
  const colors = [
    "text-google-blue",
    "text-google-red",
    "text-google-yellow",
    "text-google-blue",
    "text-google-green",
    "text-google-red",
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
    }, 150);

    return () => clearInterval(timer);
  }, [animate, letters.length]);

  useEffect(() => {
    if (!animate) return;
    
    // Hide cursor after animation completes + a delay
    if (visibleLetters >= letters.length) {
      const cursorTimer = setTimeout(() => {
        setShowCursor(false);
      }, 2000);
      return () => clearTimeout(cursorTimer);
    }
  }, [animate, visibleLetters, letters.length]);

  return (
    <h1 className={`google-logo-text ${sizeClasses[size]} tracking-tight`}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className={`${colors[index % colors.length]} inline-block transition-all duration-300`}
          style={{
            opacity: index < visibleLetters ? 1 : 0,
            transform: index < visibleLetters ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.5)",
          }}
        >
          {letter}
        </span>
      ))}
      {showCursor && (
        <span 
          className="inline-block w-[3px] md:w-1 h-[0.8em] bg-google-blue ml-1 animate-pulse"
          style={{ verticalAlign: 'baseline' }}
        />
      )}
    </h1>
  );
};

export default GoogleLogo;
