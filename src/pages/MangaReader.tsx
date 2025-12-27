import React, { useState, useEffect, useRef } from 'react';
import { Download, Wifi, Battery, ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause, Headphones, Music, Info } from 'lucide-react';
const TOTAL_PAGES = 23;

// Custom page timings for auto-mode (in seconds) - analyzed based on content density & readability
const PAGE_TIMINGS = [3.5,
// Page 1 - Cover/Title, minimal text
5.0,
// Page 2 - Introduction panel, moderate text
6.5,
// Page 3 - Story setup, more dialogue
5.5,
// Page 4 - Action sequence, visual focus
7.0,
// Page 5 - Heavy dialogue, emotional scene
4.5,
// Page 6 - Transition panel, light content
6.0,
// Page 7 - Character development
5.0,
// Page 8 - Action beats, visual storytelling
7.5,
// Page 9 - Climactic dialogue, dense text
5.5,
// Page 10 - Reaction panels
6.0,
// Page 11 - Plot progression
4.5,
// Page 12 - Quick action sequence
6.5,
// Page 13 - Emotional reveal
5.0,
// Page 14 - Visual montage
7.0,
// Page 15 - Important exposition
5.5,
// Page 16 - Character interaction
6.0,
// Page 17 - Building tension
5.0,
// Page 18 - Action climax
7.5,
// Page 19 - Resolution dialogue
5.5,
// Page 20 - Aftermath scenes
6.0,
// Page 21 - Reflection moment
5.0,
// Page 22 - Closing scenes
8.5 // Page 23 - Final page, ending & credits - longer for impact
];
const MangaReader = () => {
  const [screen, setScreen] = useState<'START' | 'CHAPTERS' | 'READER'>('START');
  const [downloadedChapters, setDownloadedChapters] = useState<number[]>([]);
  const [isDownloading, setIsDownloading] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Music & Mode states
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [autoProgress, setAutoProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/manga/manga-soundtrack.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Auto mode page progression
  useEffect(() => {
    if (isAutoMode && isPlaying && screen === 'READER' && imageLoaded) {
      const pageDuration = PAGE_TIMINGS[currentPage - 1] * 1000;

      // Progress bar animation
      setAutoProgress(0);
      const progressInterval = 50; // Update every 50ms
      let elapsed = 0;
      progressTimerRef.current = setInterval(() => {
        elapsed += progressInterval;
        setAutoProgress(elapsed / pageDuration * 100);
      }, progressInterval);

      // Page advance timer
      autoTimerRef.current = setTimeout(() => {
        if (currentPage < TOTAL_PAGES) {
          setImageLoaded(false);
          setCurrentPage(p => p + 1);
        } else {
          // End of manga
          setIsAutoMode(false);
          setIsPlaying(false);
          if (audioRef.current) audioRef.current.pause();
        }
      }, pageDuration);
      return () => {
        if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      };
    }
  }, [isAutoMode, isPlaying, currentPage, screen, imageLoaded]);

  // Fake Battery Drain Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => prev > 10 ? prev - 1 : 100);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen === 'READER') {
        if (e.key === 'ArrowLeft' || e.key === 'a') {
          if (!isAutoMode) {
            setCurrentPage(p => Math.max(1, p - 1));
          }
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
          if (!isAutoMode) {
            setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1));
          }
        } else if (e.key === 'Escape' || e.key === 'b') {
          handleExitReader();
        } else if (e.key === ' ') {
          e.preventDefault();
          togglePlayPause();
        } else if (e.key === 'm') {
          setIsMuted(m => !m);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, isAutoMode]);
  const handleDownload = (chapterId: number) => {
    if (downloadedChapters.includes(chapterId)) return;
    setIsDownloading(chapterId);
    setTimeout(() => {
      setDownloadedChapters(prev => [...prev, chapterId]);
      setIsDownloading(null);
    }, 1500);
  };
  const openChapter = (autoMode: boolean) => {
    setCurrentPage(1);
    setImageLoaded(false);
    setIsAutoMode(autoMode);
    setScreen('READER');

    // Start music
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };
  const handleExitReader = () => {
    setScreen('CHAPTERS');
    setIsAutoMode(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
  };
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }
  };
  const chapters = [{
    id: 1,
    title: "My Story",
    subtitle: "The Beginning",
    pages: "1-23"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex items-center justify-center p-4 overflow-hidden">
      
      {/* Disclaimer Banner */}
      {showDisclaimer && screen === 'READER' && <div className="fixed top-4 left-4 right-4 md:right-auto md:max-w-md z-50 bg-gradient-to-r from-[#9bbc0f]/90 to-[#8bac0f]/90 text-[#0f380f] p-3 rounded-lg shadow-lg backdrop-blur-sm animate-fade-in">
          <div className="flex items-start gap-2">
            <Headphones className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-pixel text-[8px] leading-relaxed mb-2">
                🎧 For BEST EXPERIENCE, listen with HEADPHONES!
              </p>
              <p className="font-pixel text-[6px] leading-relaxed opacity-80">
                This song was created by Charchit using Suno AI. 
                <br />
                Want to create music like this? Check out <a href="https://suno.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#306230]">suno.ai</a> (Not Sponsored)
                <br />
                <span className="opacity-70">Also, thanks to Lovable AI for making this possible! ❤️</span>
              </p>
            </div>
            <button onClick={() => setShowDisclaimer(false)} className="text-[#0f380f] hover:text-[#306230] font-pixel text-xs">
              ✕
            </button>
          </div>
        </div>}

      {/* Import Pixel Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .font-pixel {
          font-family: 'Press Start 2P', cursive;
        }
        
        .console-shadow {
          box-shadow: 
            20px 20px 60px #0d0d17, 
            -20px -20px 60px #272745,
            inset 0 2px 4px rgba(255,255,255,0.1);
        }

        .screen-scanline {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.15) 50%,
            rgba(0,0,0,0.15)
          );
          background-size: 100% 4px;
          pointer-events: none;
        }

        .screen-glow {
          box-shadow: 
            0 0 20px rgba(155, 188, 15, 0.3),
            inset 0 0 60px rgba(155, 188, 15, 0.1);
        }

        .text-shadow-retro {
          text-shadow: 2px 2px 0px #000;
        }

        .pixel-border {
          border: 4px solid #2d2d44;
          box-shadow: 
            inset 2px 2px 0 #3d3d5c,
            inset -2px -2px 0 #1d1d2c;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .blink {
          animation: blink 1s infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(155, 188, 15, 0.5); }
          50% { box-shadow: 0 0 20px rgba(155, 188, 15, 0.8); }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes music-wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }

        .music-bar {
          animation: music-wave 0.5s ease-in-out infinite;
        }

        .music-bar:nth-child(2) { animation-delay: 0.1s; }
        .music-bar:nth-child(3) { animation-delay: 0.2s; }
        .music-bar:nth-child(4) { animation-delay: 0.15s; }
      `}</style>

      {/* THE CONSOLE DEVICE BODY */}
      <div className="relative bg-gradient-to-b from-[#3d3d5c] to-[#2d2d44] rounded-[40px] p-6 console-shadow max-w-md w-full">
        
        {/* Top Decorative Strip */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-[#1d1d2c] rounded-b-lg" />

        {/* Header with Power LED and Title */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 shadow-[0_0_8px_rgba(0,255,0,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]'}`} />
            <span className="font-pixel text-[6px] text-gray-400">{isPlaying ? 'PLAYING' : 'POWER'}</span>
          </div>
          <div className="font-pixel text-[8px] text-gray-500 tracking-wider">
            CHARCHIT-READER 2024
          </div>
        </div>

        {/* THE SCREEN */}
        <div className="relative bg-[#0f380f] rounded-lg p-3 pixel-border screen-glow overflow-hidden">
          
          {/* Screen Overlay Effects */}
          <div className="absolute inset-0 screen-scanline z-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#9bbc0f]/10 to-transparent z-10 pointer-events-none" />

          {/* Status Bar */}
          <div className="relative z-30 flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-1">
              <Wifi className="w-3 h-3 text-[#9bbc0f]" />
              <span className="font-pixel text-[6px] text-[#9bbc0f]">ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-[6px] text-[#9bbc0f]">
                {new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
              </span>
              <div className="flex items-center gap-1">
                <Battery className="w-3 h-3 text-[#9bbc0f]" />
                <span className="font-pixel text-[6px] text-[#9bbc0f]">{batteryLevel}%</span>
              </div>
            </div>
          </div>

          {/* SCREEN CONTENT */}
          <div className="relative z-30 min-h-[380px] flex flex-col">
            
            {/* START SCREEN */}
            {screen === 'START' && <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <div className="float mb-6">
                  <div className="font-pixel text-2xl text-[#9bbc0f] text-shadow-retro leading-relaxed">
                    <span className="text-[#8bac0f]">CHARCHIT</span>
                    <br />
                    <span className="text-lg">MANGA</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Music className="w-4 h-4 text-[#9bbc0f]" />
                  <span className="font-pixel text-[7px] text-[#9bbc0f]">WITH ORIGINAL SOUNDTRACK</span>
                </div>
                <p className="font-pixel text-[8px] text-[#306230] mb-8 leading-relaxed max-w-[200px]">
                  Experience the story with synced music. Choose AUTO for immersive reading.
                </p>
                <button onClick={() => setScreen('CHAPTERS')} className="font-pixel text-xs bg-[#9bbc0f] text-[#0f380f] px-8 py-3 border-b-4 border-[#306230] active:border-b-0 active:translate-y-1 transition-all hover:bg-[#8bac0f] rounded">
                  ▶ START
                </button>
              </div>}

            {/* CHAPTERS SCREEN */}
            {screen === 'CHAPTERS' && <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-pixel text-[10px] text-[#9bbc0f]">SELECT CHAPTER</h2>
                  <button onClick={() => setScreen('START')} className="font-pixel text-[8px] text-[#306230] hover:text-[#9bbc0f]">
                    ← BACK
                  </button>
                </div>

                <div className="space-y-3 overflow-y-auto flex-1">
                  {chapters.map(chapter => <div key={chapter.id} className="bg-[#306230]/30 border-2 border-[#306230] p-3 rounded">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-16 bg-[#0f380f] border border-[#9bbc0f] flex items-center justify-center rounded overflow-hidden">
                          <img src="/manga/pages/page_1.jpg" alt="Cover" className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-pixel text-[10px] text-[#9bbc0f] mb-1">{chapter.title}</h3>
                          <p className="font-pixel text-[7px] text-[#306230]">{chapter.subtitle}</p>
                          <p className="font-pixel text-[6px] text-[#306230] mt-1">Pages: {chapter.pages}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <Music className="w-3 h-3 text-[#9bbc0f]" />
                            <span className="font-pixel text-[5px] text-[#9bbc0f]">WITH MUSIC</span>
                          </div>
                        </div>
                      </div>

                      {downloadedChapters.includes(chapter.id) ? <div className="space-y-2">
                          <button onClick={() => openChapter(true)} className="w-full font-pixel text-[8px] bg-[#9bbc0f] text-[#0f380f] px-4 py-2 border-b-2 border-[#306230] active:border-b-0 active:translate-y-0.5 transition-all hover:bg-[#8bac0f] rounded pulse-glow flex items-center justify-center gap-2">
                            <Play className="w-3 h-3" />
                            AUTO MODE (SYNCED)
                          </button>
                          <button onClick={() => openChapter(false)} className="w-full font-pixel text-[7px] bg-[#0f380f] text-[#9bbc0f] px-4 py-2 border border-[#9bbc0f] hover:bg-[#9bbc0f] hover:text-[#0f380f] transition-colors rounded">
                            MANUAL MODE
                          </button>
                        </div> : <button onClick={() => handleDownload(chapter.id)} disabled={isDownloading === chapter.id} className="w-full flex items-center justify-center gap-2 font-pixel text-[8px] bg-[#0f380f] text-[#9bbc0f] px-4 py-2 border-2 border-[#9bbc0f] hover:bg-[#9bbc0f] hover:text-[#0f380f] transition-colors rounded disabled:opacity-50">
                          {isDownloading === chapter.id ? <span className="blink">DOWNLOADING...</span> : <>
                              <Download className="w-3 h-3" />
                              DOWNLOAD
                            </>}
                        </button>}
                    </div>)}
                </div>
              </div>}

            {/* READER SCREEN */}
            {screen === 'READER' && <div className="flex-1 flex flex-col">
                {/* Mode Indicator */}
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-pixel text-[7px] px-2 py-1 rounded ${isAutoMode ? 'bg-[#9bbc0f] text-[#0f380f]' : 'bg-[#306230] text-[#9bbc0f]'}`}>
                      {isAutoMode ? 'AUTO' : 'MANUAL'}
                    </span>
                    {isAutoMode && <button onClick={() => setIsAutoMode(false)} className="font-pixel text-[6px] text-[#9bbc0f] hover:underline">
                        SWITCH TO MANUAL
                      </button>}
                  </div>
                  <button onClick={() => setShowDisclaimer(true)} className="text-[#9bbc0f] hover:text-[#8bac0f]">
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Auto Mode Progress Bar */}
                {isAutoMode && isPlaying && <div className="mb-2 px-1">
                    <div className="h-1 bg-[#306230] rounded-full overflow-hidden">
                      <div className="h-full bg-[#9bbc0f] transition-all duration-50 ease-linear" style={{
                  width: `${autoProgress}%`
                }} />
                    </div>
                  </div>}

                {/* Page Display */}
                <div className="relative flex-1 bg-[#0a2a0a] rounded border-2 border-[#306230] overflow-hidden min-h-[260px]">
                  {/* Page Number Badge */}
                  <div className="absolute top-2 left-2 z-10 font-pixel text-[8px] bg-[#0f380f]/90 text-[#9bbc0f] px-2 py-1 rounded border border-[#306230]">
                    P.{currentPage}/{TOTAL_PAGES}
                  </div>

                  {/* Loading State */}
                  {!imageLoaded && <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-pixel text-[10px] text-[#306230] blink">LOADING...</span>
                    </div>}

                  {/* Manga Page */}
                  <img src={`/manga/pages/page_${currentPage}.jpg`} alt={`Page ${currentPage}`} className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setImageLoaded(true)} />

                  {/* Navigation Arrows (only in manual mode) */}
                  {!isAutoMode && <>
                      <button onClick={() => {
                  if (currentPage > 1) {
                    setImageLoaded(false);
                    setCurrentPage(p => p - 1);
                  }
                }} disabled={currentPage === 1} className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-16 flex items-center justify-center bg-[#0f380f]/80 text-[#9bbc0f] hover:bg-[#9bbc0f] hover:text-[#0f380f] transition-colors rounded disabled:opacity-30 disabled:cursor-not-allowed">
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button onClick={() => {
                  if (currentPage < TOTAL_PAGES) {
                    setImageLoaded(false);
                    setCurrentPage(p => p + 1);
                  }
                }} disabled={currentPage === TOTAL_PAGES} className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-16 flex items-center justify-center bg-[#0f380f]/80 text-[#9bbc0f] hover:bg-[#9bbc0f] hover:text-[#0f380f] transition-colors rounded disabled:opacity-30 disabled:cursor-not-allowed">
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>}
                </div>

                {/* Music Player Controls */}
                <div className="mt-3 bg-[#306230]/30 rounded border border-[#306230] p-2">
                  <div className="flex items-center justify-between gap-2">
                    {/* Music Visualizer */}
                    <div className="flex items-end gap-0.5 h-4">
                      {isPlaying && <>
                          <div className="w-1 bg-[#9bbc0f] music-bar" style={{
                      height: '60%'
                    }} />
                          <div className="w-1 bg-[#9bbc0f] music-bar" style={{
                      height: '100%'
                    }} />
                          <div className="w-1 bg-[#9bbc0f] music-bar" style={{
                      height: '40%'
                    }} />
                          <div className="w-1 bg-[#9bbc0f] music-bar" style={{
                      height: '80%'
                    }} />
                        </>}
                    </div>

                    {/* Play/Pause */}
                    <button onClick={togglePlayPause} className="w-8 h-8 flex items-center justify-center bg-[#9bbc0f] text-[#0f380f] rounded-full hover:bg-[#8bac0f] transition-colors">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2 flex-1 max-w-[120px]">
                      <button onClick={() => setIsMuted(m => !m)} className="text-[#9bbc0f] hover:text-[#8bac0f]">
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input type="range" min="0" max="1" step="0.1" value={isMuted ? 0 : volume} onChange={e => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }} className="flex-1 h-1 bg-[#306230] rounded-lg appearance-none cursor-pointer accent-[#9bbc0f]" />
                    </div>

                    {/* Track Name */}
                    <div className="hidden sm:block">
                      <span className="font-pixel text-[5px] text-[#9bbc0f] opacity-70">
                        ♪ ORIGINAL TRACK
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between mt-2 px-1">
                  <button onClick={handleExitReader} className="font-pixel text-[7px] text-[#306230] hover:text-[#9bbc0f]">
                    ← EXIT
                  </button>
                  <span className="font-pixel text-[5px] text-[#306230]">
                    {isAutoMode ? 'AUTO SYNC ENABLED' : 'USE ← → TO NAVIGATE'}
                  </span>
                </div>
              </div>}

          </div>
        </div>

        {/* CONSOLE CONTROLS */}
        <div className="flex items-center justify-between mt-6 px-4">
          
          {/* D-Pad */}
          <div className="relative w-24 h-24">
            {/* Horizontal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-7 bg-[#1d1d2c] rounded-sm" />
            {/* Vertical */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-20 bg-[#1d1d2c] rounded-sm" />
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#2d2d44] rounded-full" />
            
            {/* Clickable D-Pad Zones */}
            <button onClick={() => {
            if (screen === 'READER' && currentPage > 1 && !isAutoMode) {
              setImageLoaded(false);
              setCurrentPage(p => p - 1);
            }
          }} disabled={isAutoMode} className="absolute top-8 left-0 w-7 h-7 hover:bg-white/10 active:bg-black/30 rounded transition-colors disabled:opacity-50" title="Previous Page" />
            <button onClick={() => {
            if (screen === 'READER' && currentPage < TOTAL_PAGES && !isAutoMode) {
              setImageLoaded(false);
              setCurrentPage(p => p + 1);
            }
          }} disabled={isAutoMode} className="absolute top-8 right-0 w-7 h-7 hover:bg-white/10 active:bg-black/30 rounded transition-colors disabled:opacity-50" title="Next Page" />
          </div>

          {/* A/B Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <button onClick={() => {
              if (screen === 'READER') handleExitReader();else if (screen === 'CHAPTERS') setScreen('START');
            }} className="w-12 h-12 rounded-full bg-gradient-to-b from-red-700 to-red-900 border-b-4 border-red-950 active:border-b-0 active:translate-y-1 shadow-lg hover:from-red-600 hover:to-red-800 transition-all flex items-center justify-center font-pixel text-xs text-red-200">
                B
              </button>
              <span className="font-pixel text-[6px] text-gray-500">BACK</span>
            </div>
            <div className="flex flex-col items-center gap-1 -mt-8">
              <button onClick={() => {
              if (screen === 'START') setScreen('CHAPTERS');else if (screen === 'CHAPTERS') {
                if (downloadedChapters.length > 0) openChapter(true);
              } else if (screen === 'READER') {
                togglePlayPause();
              }
            }} className="w-12 h-12 rounded-full bg-gradient-to-b from-red-700 to-red-900 border-b-4 border-red-950 active:border-b-0 active:translate-y-1 shadow-lg hover:from-red-600 hover:to-red-800 transition-all flex items-center justify-center font-pixel text-xs text-red-200">
                A
              </button>
              <span className="font-pixel text-[6px] text-gray-500">{screen === 'READER' ? 'PLAY' : 'SELECT'}</span>
            </div>
          </div>

        </div>

        {/* Bottom Speaker Grills */}
        <div className="flex justify-center gap-1 mt-6">
          {[...Array(8)].map((_, i) => <div key={i} className="w-1 h-8 bg-[#1d1d2c] rounded-full" />)}
        </div>

        {/* Bottom Label */}
        <div className="text-center mt-4">
          <span className="font-pixel text-[6px] text-gray-500">© 2025 CHARCHIT INDUSTRIES</span>
        </div>

      </div>
    </div>;
};
export default MangaReader;