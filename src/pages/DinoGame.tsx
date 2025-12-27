import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 200;
const GROUND_Y = 160;
const GRAVITY = 0.8;
const JUMP_FORCE = -14;
const GAME_SPEED_INITIAL = 6;
const GAME_SPEED_INCREMENT = 0.001;

interface Dino {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityY: number;
  isJumping: boolean;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'cactus' | 'bird';
}

const DinoGame = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameOver'>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('dinoHighScore');
    return saved ? parseInt(saved) : 0;
  });

  const dinoRef = useRef<Dino>({
    x: 50,
    y: GROUND_Y - 44,
    width: 44,
    height: 44,
    velocityY: 0,
    isJumping: false
  });

  const obstaclesRef = useRef<Obstacle[]>([]);
  const gameSpeedRef = useRef(GAME_SPEED_INITIAL);
  const frameCountRef = useRef(0);
  const animationRef = useRef<number>();

  const drawPixelDino = (ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) => {
    ctx.fillStyle = '#535353';
    const pixel = 4;
    
    // Body
    ctx.fillRect(x + pixel * 2, y + pixel * 2, pixel * 6, pixel * 6);
    // Head
    ctx.fillRect(x + pixel * 4, y, pixel * 6, pixel * 4);
    // Eye
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + pixel * 8, y + pixel, pixel, pixel);
    ctx.fillStyle = '#535353';
    // Tail
    ctx.fillRect(x, y + pixel * 4, pixel * 3, pixel * 2);
    // Legs (animated)
    if (frame % 2 === 0) {
      ctx.fillRect(x + pixel * 3, y + pixel * 8, pixel * 2, pixel * 3);
      ctx.fillRect(x + pixel * 6, y + pixel * 8, pixel * 2, pixel * 3);
    } else {
      ctx.fillRect(x + pixel * 4, y + pixel * 8, pixel * 2, pixel * 3);
      ctx.fillRect(x + pixel * 5, y + pixel * 8, pixel * 2, pixel * 3);
    }
    // Arms
    ctx.fillRect(x + pixel * 6, y + pixel * 4, pixel * 3, pixel);
  };

  const drawCactus = (ctx: CanvasRenderingContext2D, x: number, y: number, height: number) => {
    ctx.fillStyle = '#535353';
    const pixel = 4;
    const segments = Math.floor(height / (pixel * 4));
    
    // Main stem
    ctx.fillRect(x + pixel * 2, y, pixel * 2, height);
    // Arms
    if (segments > 2) {
      ctx.fillRect(x, y + pixel * 4, pixel * 2, pixel * 2);
      ctx.fillRect(x, y + pixel * 2, pixel * 2, pixel * 2);
      ctx.fillRect(x + pixel * 4, y + pixel * 6, pixel * 2, pixel * 2);
      ctx.fillRect(x + pixel * 4, y + pixel * 8, pixel * 2, pixel * 2);
    }
  };

  const drawBird = (ctx: CanvasRenderingContext2D, x: number, y: number, frame: number) => {
    ctx.fillStyle = '#535353';
    const pixel = 4;
    
    // Body
    ctx.fillRect(x + pixel, y + pixel * 2, pixel * 4, pixel * 2);
    // Head
    ctx.fillRect(x + pixel * 4, y + pixel, pixel * 2, pixel * 2);
    // Beak
    ctx.fillRect(x + pixel * 6, y + pixel * 2, pixel, pixel);
    // Wings (animated)
    if (frame % 10 < 5) {
      ctx.fillRect(x + pixel * 2, y, pixel * 2, pixel * 2);
    } else {
      ctx.fillRect(x + pixel * 2, y + pixel * 3, pixel * 2, pixel * 2);
    }
    // Tail
    ctx.fillRect(x, y + pixel * 2, pixel, pixel * 2);
  };

  const checkCollision = (dino: Dino, obstacle: Obstacle): boolean => {
    const padding = 8;
    return (
      dino.x + padding < obstacle.x + obstacle.width &&
      dino.x + dino.width - padding > obstacle.x &&
      dino.y + padding < obstacle.y + obstacle.height &&
      dino.y + dino.height - padding > obstacle.y
    );
  };

  const jump = useCallback(() => {
    if (gameState === 'start') {
      setGameState('playing');
      return;
    }
    
    if (gameState === 'gameOver') {
      // Reset game
      dinoRef.current = {
        x: 50,
        y: GROUND_Y - 44,
        width: 44,
        height: 44,
        velocityY: 0,
        isJumping: false
      };
      obstaclesRef.current = [];
      gameSpeedRef.current = GAME_SPEED_INITIAL;
      frameCountRef.current = 0;
      setScore(0);
      setGameState('playing');
      return;
    }

    if (!dinoRef.current.isJumping) {
      dinoRef.current.velocityY = JUMP_FORCE;
      dinoRef.current.isJumping = true;
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      frameCountRef.current++;
      const dino = dinoRef.current;
      
      // Clear canvas
      ctx.fillStyle = '#f7f7f7';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Draw ground line
      ctx.strokeStyle = '#535353';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
      ctx.stroke();
      
      // Ground texture
      for (let i = 0; i < CANVAS_WIDTH; i += 20) {
        const offset = (frameCountRef.current * gameSpeedRef.current) % 20;
        ctx.fillStyle = '#c4c4c4';
        ctx.fillRect(i - offset, GROUND_Y + 5, 2, 2);
      }

      // Update dino physics
      dino.velocityY += GRAVITY;
      dino.y += dino.velocityY;
      
      if (dino.y >= GROUND_Y - dino.height) {
        dino.y = GROUND_Y - dino.height;
        dino.velocityY = 0;
        dino.isJumping = false;
      }

      // Spawn obstacles
      if (frameCountRef.current % Math.floor(100 - gameSpeedRef.current * 5) === 0) {
        const isBird = Math.random() > 0.7 && score > 100;
        obstaclesRef.current.push({
          x: CANVAS_WIDTH,
          y: isBird ? GROUND_Y - 60 - Math.random() * 30 : GROUND_Y - 40 - Math.random() * 20,
          width: isBird ? 28 : 24,
          height: isBird ? 28 : 40 + Math.random() * 20,
          type: isBird ? 'bird' : 'cactus'
        });
      }

      // Update and draw obstacles
      obstaclesRef.current = obstaclesRef.current.filter(obs => {
        obs.x -= gameSpeedRef.current;
        
        if (obs.type === 'cactus') {
          drawCactus(ctx, obs.x, obs.y, obs.height);
        } else {
          drawBird(ctx, obs.x, obs.y, frameCountRef.current);
        }

        // Check collision
        if (checkCollision(dino, obs)) {
          setGameState('gameOver');
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('dinoHighScore', score.toString());
          }
        }

        return obs.x > -50;
      });

      // Draw dino
      drawPixelDino(ctx, dino.x, dino.y, frameCountRef.current);

      // Update score
      if (frameCountRef.current % 5 === 0) {
        setScore(s => s + 1);
      }

      // Increase speed
      gameSpeedRef.current += GAME_SPEED_INCREMENT;

      // Draw score
      ctx.fillStyle = '#535353';
      ctx.font = '16px "Press Start 2P", monospace';
      ctx.fillText(`HI ${highScore.toString().padStart(5, '0')}  ${score.toString().padStart(5, '0')}`, CANVAS_WIDTH - 250, 30);

      if (gameState === 'playing') {
        animationRef.current = requestAnimationFrame(gameLoop);
      }
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState, highScore, score]);

  // Draw initial/game over screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (gameState === 'start' || gameState === 'gameOver') {
      ctx.fillStyle = '#f7f7f7';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Draw ground
      ctx.strokeStyle = '#535353';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
      ctx.stroke();

      // Draw dino
      drawPixelDino(ctx, 50, GROUND_Y - 44, 0);

      ctx.fillStyle = '#535353';
      ctx.font = '16px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      
      if (gameState === 'gameOver') {
        ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, 80);
        ctx.font = '12px "Press Start 2P", monospace';
        ctx.fillText(`Score: ${score}`, CANVAS_WIDTH / 2, 110);
      }
      
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText('Press SPACE or tap to play', CANVAS_WIDTH / 2, GROUND_Y + 30);
      ctx.textAlign = 'left';
    }
  }, [gameState, score]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b border-border bg-card/80 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <h1 className="font-pixel text-lg text-foreground">Dino Run</h1>
        <div className="ml-auto flex items-center gap-4">
          <span className="font-pixel text-xs text-google-green">HI: {highScore}</span>
          <button
            onClick={() => {
              setGameState('start');
              setScore(0);
              dinoRef.current = {
                x: 50,
                y: GROUND_Y - 44,
                width: 44,
                height: 44,
                velocityY: 0,
                isJumping: false
              };
              obstaclesRef.current = [];
              gameSpeedRef.current = GAME_SPEED_INITIAL;
            }}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Game Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-card rounded-lg border border-border p-4 shadow-lg">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={jump}
            onTouchStart={(e) => { e.preventDefault(); jump(); }}
            className="cursor-pointer rounded max-w-full"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        
        <p className="font-code text-sm text-muted-foreground mt-6 text-center">
          Press <span className="px-2 py-1 bg-secondary rounded font-pixel text-xs">SPACE</span> or tap to jump
        </p>
        
        <p className="font-pixel text-xs text-muted-foreground/60 mt-4 text-center max-w-md">
          Inspired by Chrome's no-internet dinosaur game 🦕
        </p>
      </main>
    </div>
  );
};

export default DinoGame;