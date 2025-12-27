import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, BookOpen, Maximize2, Minimize2 } from "lucide-react";

const TOTAL_PAGES = 23;

const MangaReader = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= TOTAL_PAGES) {
      setIsLoading(true);
      setCurrentPage(page);
    }
  }, []);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevPage();
      } else if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          navigate(-1);
        }
      } else if (e.key === "f" || e.key === "F") {
        setIsFullscreen(!isFullscreen);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage, navigate, isFullscreen]);

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    handleMouseMove();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#0a0a0a] flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent py-4 px-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
            <span className="hidden sm:inline">Close</span>
          </button>
          
          <div className="flex items-center gap-3">
            <BookOpen className="text-orange-400" size={24} />
            <h1 className="text-white font-bold text-lg sm:text-xl tracking-wide">
              The Boy Who Stayed Quiet
            </h1>
          </div>

          <button 
            onClick={toggleFullscreen}
            className="text-white/80 hover:text-white transition-colors"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </header>

      {/* Main Reader Area */}
      <main className="flex-1 flex items-center justify-center relative pt-16 pb-24">
        {/* Left click zone for prev page */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-10 group"
          onClick={prevPage}
        >
          {currentPage > 1 && (
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <ChevronLeft className="text-white" size={32} />
            </div>
          )}
        </div>

        {/* Right click zone for next page */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-10 group"
          onClick={nextPage}
        >
          {currentPage < TOTAL_PAGES && (
            <div className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
              <ChevronRight className="text-white" size={32} />
            </div>
          )}
        </div>

        {/* Page Container */}
        <div className="relative max-w-4xl w-full mx-4 sm:mx-8">
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-orange-400/30 border-t-orange-400 rounded-full animate-spin" />
                <span className="text-white/60 text-sm">Loading page {currentPage}...</span>
              </div>
            </div>
          )}

          {/* Manga Page */}
          <div className="relative shadow-2xl rounded-lg overflow-hidden bg-[#1a1a1a]">
            {/* Page curl effect */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none z-10" />
            
            <img
              src={`/manga/pages/page_${currentPage}.jpg`}
              alt={`Page ${currentPage}`}
              className="w-full h-auto max-h-[80vh] object-contain"
              onLoad={() => setIsLoading(false)}
              draggable={false}
            />

            {/* Page shadow */}
            <div className="absolute inset-0 shadow-inner pointer-events-none" 
              style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)' }} 
            />
          </div>

          {/* Chapter info for specific pages */}
          {currentPage === 1 && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
              Chapter 1: The Beginning
            </div>
          )}
          {currentPage === 10 && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
              Chapter 2: The Mountain
            </div>
          )}
          {currentPage === 17 && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
              Chapter 3: Victory
            </div>
          )}
        </div>
      </main>

      {/* Bottom Controls */}
      <footer 
        className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/90 to-transparent py-6 px-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Page indicator */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-white font-medium">
              {currentPage} / {TOTAL_PAGES}
            </span>
          </div>

          {/* Progress bar */}
          <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300"
              style={{ width: `${(currentPage / TOTAL_PAGES) * 100}%` }}
            />
            
            {/* Clickable progress bar */}
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = x / rect.width;
                const page = Math.max(1, Math.min(TOTAL_PAGES, Math.ceil(percentage * TOTAL_PAGES)));
                goToPage(page);
              }}
            />
          </div>

          {/* Page thumbnails - mini navigation */}
          <div className="flex justify-center gap-1 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                  page === currentPage 
                    ? 'bg-orange-500 text-white scale-110' 
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Keyboard hints */}
          <div className="flex justify-center gap-6 mt-4 text-white/40 text-xs">
            <span>← → Navigate</span>
            <span>F Fullscreen</span>
            <span>ESC Close</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MangaReader;
