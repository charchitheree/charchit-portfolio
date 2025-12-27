import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mic, Camera, Grid3X3, MessageCircle } from "lucide-react";
import GeminiChat from "@/components/GeminiChat";
import SpaceBackground from "@/components/SpaceBackground";
import ThemeToggle from "@/components/ThemeToggle";
import { searchSuggestions } from "@/data/portfolioData";
import charchitAvatar from "@/assets/charchit-avatar.gif";

// Sound Engine
const AudioEngine = {
  ctx: null as AudioContext | null,
  init: () => {
    if (!AudioEngine.ctx) {
      AudioEngine.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (AudioEngine.ctx.state === 'suspended') {
      AudioEngine.ctx.resume();
    }
  },
  playTone: (freq: number, type: OscillatorType, duration: number, vol = 0.1) => {
    if (!AudioEngine.ctx) AudioEngine.init();
    const ctx = AudioEngine.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  },
  hover: () => AudioEngine.playTone(800, 'square', 0.05, 0.05),
  click: () => AudioEngine.playTone(400, 'sawtooth', 0.1, 0.08),
  type: () => AudioEngine.playTone(200 + Math.random() * 50, 'triangle', 0.03, 0.04),
  success: () => {
    AudioEngine.playTone(440, 'square', 0.1, 0.08);
    setTimeout(() => AudioEngine.playTone(880, 'square', 0.2, 0.08), 100);
  }
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Init audio on first interaction
    const handleInteraction = () => {
      AudioEngine.init();
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      AudioEngine.success();
      setTimeout(() => {
        setShowContent(true);
        inputRef.current?.focus();
      }, 100);
    }, 1200);

    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      AudioEngine.success();
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLucky = () => {
    AudioEngine.success();
    navigate("/dino");
  };

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
    AudioEngine.type();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  const filteredSuggestions = searchSuggestions.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="scanlines" />
        <div className="text-center">
          <p className="font-pixel text-xs text-google-blue mb-4 animate-pulse">
            INITIALIZING SYSTEM...
          </p>
          <div className="flex gap-1 justify-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-16 h-2 skeleton rounded"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {/* Space Background */}
      <SpaceBackground />

      {/* Scanlines Overlay */}
      <div className="scanlines" />

      {/* Header */}
      <header className="flex justify-end items-center p-3 px-6 gap-4 backdrop-blur-sm bg-card/50 border-b border-border/30 relative z-10">
        <button
          onClick={() => { AudioEngine.click(); navigate('/dino'); }}
          onMouseEnter={() => AudioEngine.hover()}
          className="font-code text-sm text-foreground/80 hover:text-foreground transition-colors"
        >
          GitHub
        </button>
        <button
          onClick={() => { AudioEngine.click(); navigate('/dino'); }}
          onMouseEnter={() => AudioEngine.hover()}
          className="font-code text-sm text-foreground/80 hover:text-foreground transition-colors"
        >
          Instagram
        </button>
        <button
          onClick={() => { AudioEngine.click(); navigate('/voices'); }}
          onMouseEnter={() => AudioEngine.hover()}
          className="flex items-center gap-2 px-3 py-1.5 retro-btn rounded"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="font-pixel text-[8px] hidden sm:inline">VOICES</span>
        </button>
        <ThemeToggle />
        <button
          onClick={() => AudioEngine.click()}
          onMouseEnter={() => AudioEngine.hover()}
          className="p-2 hover:bg-secondary rounded-full"
        >
          <Grid3X3 className="w-5 h-5 text-foreground/70" />
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
          <img src={charchitAvatar} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        <div className="w-full max-w-xl mx-auto text-center">
          
          {/* Logo */}
          <div className="mb-8 relative">
            <h1 className="font-pixel text-5xl md:text-6xl lg:text-7xl tracking-wide">
              <span className="text-google-blue text-glow-blue">C</span>
              <span className="text-google-red text-glow-red">h</span>
              <span className="text-google-yellow text-glow-yellow">a</span>
              <span className="text-google-blue text-glow-blue">r</span>
              <span className="text-google-green text-glow-green">c</span>
              <span className="text-google-red text-glow-red">h</span>
              <span className="text-google-yellow text-glow-yellow">i</span>
              <span className="text-google-blue text-glow-blue">t</span>
            </h1>
            <div className="absolute -top-2 -right-4 md:right-8 lg:right-12">
              <span className="font-pixel text-[8px] text-google-green bg-card/80 backdrop-blur-sm px-2 py-1 border border-google-green/30">
                DEV_MODE
              </span>
            </div>
          </div>

          {/* Tagline Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <span className="pixel-badge text-google-blue border-google-blue/40 bg-google-blue/10">
              <span className="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse" />
              Roorkee
            </span>
            <span className="pixel-badge text-google-green border-google-green/40 bg-google-green/10">
              <span className="w-1.5 h-1.5 rounded-full bg-google-green animate-pulse" />
              IIT Madras
            </span>
            <span className="pixel-badge text-google-blue border-google-blue/40 bg-google-blue/10">
              <span className="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse" />
              Harvard ALP
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="flex items-center bg-card border border-border rounded-full px-4 py-3 search-box">
              <Search className="w-5 h-5 text-foreground/70 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleType}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={handleKeyDown}
                placeholder="Search my portfolio..."
                className="flex-1 bg-transparent outline-none font-code text-foreground placeholder:text-foreground/50"
              />
              <div className="flex items-center gap-1 border-l border-border pl-3 ml-2">
                <button
                  onClick={() => AudioEngine.click()}
                  onMouseEnter={() => AudioEngine.hover()}
                  className="p-2 hover:bg-secondary rounded-full"
                >
                  <Mic className="w-5 h-5 text-google-blue" />
                </button>
                <button
                  onClick={() => AudioEngine.click()}
                  onMouseEnter={() => AudioEngine.hover()}
                  className="p-2 hover:bg-secondary rounded-full"
                >
                  <Camera className="w-5 h-5 text-google-yellow" />
                </button>
              </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                {filteredSuggestions.slice(0, 5).map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      AudioEngine.click();
                      handleSearch();
                    }}
                    onMouseEnter={() => AudioEngine.hover()}
                    className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-secondary text-left font-code text-sm"
                  >
                    <Search className="w-4 h-4 text-foreground/70" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => { AudioEngine.click(); handleSearch(); }}
              onMouseEnter={() => AudioEngine.hover()}
              className="retro-btn rounded hover:border-google-blue relative overflow-hidden group"
            >
              Charchit Search
              <span className="absolute inset-0 bg-google-blue/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
            <button
              onClick={() => { AudioEngine.click(); handleLucky(); }}
              onMouseEnter={() => AudioEngine.hover()}
              className="retro-btn rounded hover:border-google-green relative overflow-hidden group"
            >
              I'm Feeling Lucky
              <span className="absolute inset-0 bg-google-green/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </div>

          {/* AI Mode Link */}
          <p className="font-code text-sm text-google-yellow">
            Search for projects, skills, or{" "}
            <button
              onClick={() => { AudioEngine.click(); setShowAIChat(true); }}
              onMouseEnter={() => AudioEngine.hover()}
              className="text-google-blue hover:underline font-medium"
            >
              ask AI about Charchit
            </button>
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto backdrop-blur-sm bg-card/30 relative z-10">
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <p className="font-code text-sm text-foreground/70">Roorkee, Uttarakhand, India</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/70">
            <span className="font-code hover:text-foreground cursor-pointer transition-colors">Help</span>
            <span className="font-code hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="font-code hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
        <div className="px-6 py-2 border-t border-border/30 flex flex-wrap items-center justify-between gap-2">
          <p className="font-code text-xs text-foreground/60">
            This is a personal portfolio styled as a search engine. Not affiliated with Google.
          </p>
          <p className="font-code text-xs text-google-green/80">
            🎵 Tap on play button for best music experience — suggested by Charchit
          </p>
        </div>
      </footer>

      <GeminiChat isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
    </div>
  );
};

export default Index;
