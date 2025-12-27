import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, GripVertical } from 'lucide-react';

const GlobalMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 }); // bottom-right
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, [volume]);

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = window.innerWidth - e.clientX - dragOffset.x;
      const newY = window.innerHeight - e.clientY - dragOffset.y;
      
      // Keep within bounds
      const maxX = window.innerWidth - (playerRef.current?.offsetWidth || 100);
      const maxY = window.innerHeight - (playerRef.current?.offsetHeight || 50);
      
      setPosition({
        x: Math.max(8, Math.min(newX, maxX)),
        y: Math.max(8, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!playerRef.current) return;
    const rect = playerRef.current.getBoundingClientRect();
    setDragOffset({
      x: window.innerWidth - e.clientX - position.x,
      y: window.innerHeight - e.clientY - position.y
    });
    setIsDragging(true);
    e.preventDefault();
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/background.mp3" preload="auto" />
      
      <div 
        ref={playerRef}
        className={`fixed z-[100] select-none ${isDragging ? 'cursor-grabbing' : ''}`}
        style={{ right: position.x, bottom: position.y }}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => !isDragging && setShowControls(false)}
      >
        <div className={`
          flex items-center gap-2 px-3 py-2 rounded-full
          bg-card/90 backdrop-blur-md border border-border shadow-lg
          transition-all duration-300
          ${showControls ? 'pr-4' : ''}
        `}>
          {/* Drag handle */}
          <div 
            onMouseDown={handleDragStart}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-secondary rounded"
            title="Drag to move"
          >
            <GripVertical className="w-3 h-3 text-muted-foreground" />
          </div>

          <button
            onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
            title={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-google-blue" />
            ) : (
              <Play className="w-4 h-4 text-google-blue ml-0.5" />
            )}
          </button>
          
          {showControls && (
            <>
              <button
                onClick={() => setVolume(volume === 0 ? 0.3 : 0)}
                className="w-6 h-6 flex items-center justify-center"
              >
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-border rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-3
                  [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-google-blue"
              />
            </>
          )}
          
          {!showControls && !isPlaying && (
            <span className="font-pixel text-[8px] text-muted-foreground animate-pulse">♪</span>
          )}
        </div>
      </div>
    </>
  );
};

export default GlobalMusicPlayer;