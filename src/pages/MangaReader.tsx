import React, { useState, useEffect } from 'react';
import { Download, Wifi, Battery, ChevronLeft, ChevronRight } from 'lucide-react';

const TOTAL_PAGES = 23;

const MangaReader = () => {
  const [screen, setScreen] = useState<'START' | 'CHAPTERS' | 'READER'>('START');
  const [downloadedChapters, setDownloadedChapters] = useState<number[]>([]);
  const [isDownloading, setIsDownloading] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fake Battery Drain Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => (prev > 10 ? prev - 1 : 100));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen === 'READER') {
        if (e.key === 'ArrowLeft' || e.key === 'a') {
          setCurrentPage(p => Math.max(1, p - 1));
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
          setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1));
        } else if (e.key === 'Escape' || e.key === 'b') {
          setScreen('CHAPTERS');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen]);

  const handleDownload = (chapterId: number) => {
    if (downloadedChapters.includes(chapterId)) return;
    setIsDownloading(chapterId);
    setTimeout(() => {
      setDownloadedChapters(prev => [...prev, chapterId]);
      setIsDownloading(null);
    }, 1500);
  };

  const openChapter = () => {
    setCurrentPage(1);
    setImageLoaded(false);
    setScreen('READER');
  };

  const chapters = [
    { id: 1, title: "My Story", subtitle: "The Beginning", pages: "1-23" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex items-center justify-center p-4 overflow-hidden">
      
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
      `}</style>

      {/* THE CONSOLE DEVICE BODY */}
      <div className="relative bg-gradient-to-b from-[#3d3d5c] to-[#2d2d44] rounded-[40px] p-6 console-shadow max-w-md w-full">
        
        {/* Top Decorative Strip */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-[#1d1d2c] rounded-b-lg" />

        {/* Header with Power LED and Title */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
            <span className="font-pixel text-[6px] text-gray-400">POWER</span>
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
                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
            {screen === 'START' && (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <div className="float mb-6">
                  <div className="font-pixel text-2xl text-[#9bbc0f] text-shadow-retro leading-relaxed">
                    <span className="text-[#8bac0f]">CHARCHIT</span>
                    <br />
                    <span className="text-lg">MANGA</span>
                  </div>
                </div>
                <p className="font-pixel text-[8px] text-[#306230] mb-8 leading-relaxed max-w-[200px]">
                  Welcome to the Archives. Press START to begin your journey.
                </p>
                <button 
                  onClick={() => setScreen('CHAPTERS')}
                  className="font-pixel text-xs bg-[#9bbc0f] text-[#0f380f] px-8 py-3 border-b-4 border-[#306230] active:border-b-0 active:translate-y-1 transition-all hover:bg-[#8bac0f] rounded"
                >
                  ▶ START
                </button>
              </div>
            )}

            {/* CHAPTERS SCREEN */}
            {screen === 'CHAPTERS' && (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-pixel text-[10px] text-[#9bbc0f]">SELECT CHAPTER</h2>
                  <button 
                    onClick={() => setScreen('START')} 
                    className="font-pixel text-[8px] text-[#306230] hover:text-[#9bbc0f]"
                  >
                    ← BACK
                  </button>
                </div>

                <div className="space-y-3 overflow-y-auto flex-1">
                  {chapters.map((chapter) => (
                    <div 
                      key={chapter.id}
                      className="bg-[#306230]/30 border-2 border-[#306230] p-3 rounded"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-16 bg-[#0f380f] border border-[#9bbc0f] flex items-center justify-center rounded overflow-hidden">
                          <img 
                            src="/manga/pages/page_1.jpg" 
                            alt="Cover" 
                            className="w-full h-full object-cover opacity-80"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-pixel text-[10px] text-[#9bbc0f] mb-1">{chapter.title}</h3>
                          <p className="font-pixel text-[7px] text-[#306230]">{chapter.subtitle}</p>
                          <p className="font-pixel text-[6px] text-[#306230] mt-1">Pages: {chapter.pages}</p>
                        </div>
                      </div>

                      {downloadedChapters.includes(chapter.id) ? (
                        <button 
                          onClick={openChapter}
                          className="w-full font-pixel text-[8px] bg-[#9bbc0f] text-[#0f380f] px-4 py-2 border-b-2 border-[#306230] active:border-b-0 active:translate-y-0.5 transition-all hover:bg-[#8bac0f] rounded"
                        >
                          ▶ READ NOW
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleDownload(chapter.id)}
                          disabled={isDownloading === chapter.id}
                          className="w-full flex items-center justify-center gap-2 font-pixel text-[8px] bg-[#0f380f] text-[#9bbc0f] px-4 py-2 border-2 border-[#9bbc0f] hover:bg-[#9bbc0f] hover:text-[#0f380f] transition-colors rounded disabled:opacity-50"
                        >
                          {isDownloading === chapter.id ? (
                            <span className="blink">DOWNLOADING...</span>
                          ) : (
                            <>
                              <Download className="w-3 h-3" />
                              DOWNLOAD
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* READER SCREEN */}
            {screen === 'READER' && (
              <div className="flex-1 flex flex-col">
                {/* Page Display */}
                <div className="relative flex-1 bg-[#0a2a0a] rounded border-2 border-[#306230] overflow-hidden min-h-[300px]">
                  {/* Page Number Badge */}
                  <div className="absolute top-2 left-2 z-10 font-pixel text-[8px] bg-[#0f380f]/90 text-[#9bbc0f] px-2 py-1 rounded border border-[#306230]">
                    P.{currentPage}/{TOTAL_PAGES}
                  </div>

                  {/* Loading State */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-pixel text-[10px] text-[#306230] blink">LOADING...</span>
                    </div>
                  )}

                  {/* Manga Page */}
                  <img 
                    src={`/manga/pages/page_${currentPage}.jpg`}
                    alt={`Page ${currentPage}`}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                  />

                  {/* Navigation Arrows */}
                  <button 
                    onClick={() => {
                      if (currentPage > 1) {
                        setImageLoaded(false);
                        setCurrentPage(p => p - 1);
                      }
                    }}
                    disabled={currentPage === 1}
                    className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-16 flex items-center justify-center bg-[#0f380f]/80 text-[#9bbc0f] hover:bg-[#9bbc0f] hover:text-[#0f380f] transition-colors rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => {
                      if (currentPage < TOTAL_PAGES) {
                        setImageLoaded(false);
                        setCurrentPage(p => p + 1);
                      }
                    }}
                    disabled={currentPage === TOTAL_PAGES}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-16 flex items-center justify-center bg-[#0f380f]/80 text-[#9bbc0f] hover:bg-[#9bbc0f] hover:text-[#0f380f] transition-colors rounded disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Bottom Controls */}
                <div className="flex items-center justify-between mt-3 px-1">
                  <button 
                    onClick={() => setScreen('CHAPTERS')} 
                    className="font-pixel text-[7px] text-[#306230] hover:text-[#9bbc0f]"
                  >
                    ← CHAPTERS
                  </button>
                  <span className="font-pixel text-[6px] text-[#306230]">
                    USE ← → OR A/D KEYS
                  </span>
                </div>
              </div>
            )}

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
            <button 
              onClick={() => {
                if (screen === 'READER' && currentPage > 1) {
                  setImageLoaded(false);
                  setCurrentPage(p => p - 1);
                }
              }}
              className="absolute top-8 left-0 w-7 h-7 hover:bg-white/10 active:bg-black/30 rounded transition-colors"
              title="Previous Page"
            />
            <button 
              onClick={() => {
                if (screen === 'READER' && currentPage < TOTAL_PAGES) {
                  setImageLoaded(false);
                  setCurrentPage(p => p + 1);
                }
              }}
              className="absolute top-8 right-0 w-7 h-7 hover:bg-white/10 active:bg-black/30 rounded transition-colors"
              title="Next Page"
            />
          </div>

          {/* A/B Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <button 
                onClick={() => {
                  if (screen === 'READER') setScreen('CHAPTERS');
                  else if (screen === 'CHAPTERS') setScreen('START');
                }}
                className="w-12 h-12 rounded-full bg-gradient-to-b from-red-700 to-red-900 border-b-4 border-red-950 active:border-b-0 active:translate-y-1 shadow-lg hover:from-red-600 hover:to-red-800 transition-all flex items-center justify-center font-pixel text-xs text-red-200"
              >
                B
              </button>
              <span className="font-pixel text-[6px] text-gray-500">BACK</span>
            </div>
            <div className="flex flex-col items-center gap-1 -mt-8">
              <button 
                onClick={() => {
                  if (screen === 'START') setScreen('CHAPTERS');
                  else if (screen === 'CHAPTERS') {
                    if (downloadedChapters.length > 0) openChapter();
                  } else if (screen === 'READER' && currentPage < TOTAL_PAGES) {
                    setImageLoaded(false);
                    setCurrentPage(p => p + 1);
                  }
                }}
                className="w-12 h-12 rounded-full bg-gradient-to-b from-red-700 to-red-900 border-b-4 border-red-950 active:border-b-0 active:translate-y-1 shadow-lg hover:from-red-600 hover:to-red-800 transition-all flex items-center justify-center font-pixel text-xs text-red-200"
              >
                A
              </button>
              <span className="font-pixel text-[6px] text-gray-500">SELECT</span>
            </div>
          </div>

        </div>

        {/* Bottom Speaker Grills */}
        <div className="flex justify-center gap-1 mt-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-1 h-8 bg-[#1d1d2c] rounded-full" />
          ))}
        </div>

        {/* Bottom Label */}
        <div className="text-center mt-4">
          <span className="font-pixel text-[6px] text-gray-500">© 2024 CHARCHIT INDUSTRIES</span>
        </div>

      </div>
    </div>
  );
};

export default MangaReader;
