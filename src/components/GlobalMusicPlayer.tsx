import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const GlobalMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, [volume]);

  // Handle first user interaction to enable autoplay
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
    
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked
        });
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
        className="fixed bottom-4 right-4 z-[100]"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <div className={`
          flex items-center gap-2 px-3 py-2 rounded-full
          bg-card/90 backdrop-blur-md border border-border shadow-lg
          transition-all duration-300
          ${showControls ? 'pr-4' : ''}
        `}>
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