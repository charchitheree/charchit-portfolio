import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, Mic, Camera, Grid3X3, Code, Database, Trophy, Cpu, User } from "lucide-react";
import KnowledgePanel from "@/components/KnowledgePanel";
import PeopleAlsoAsk from "@/components/PeopleAlsoAsk";
import InstagramCard from "@/components/InstagramCard";
import ImageStrip from "@/components/ImageStrip";
import AboutSnippet from "@/components/AboutSnippet";
import SpaceBackground from "@/components/SpaceBackground";
import { filterPortfolioData, PortfolioItem } from "@/data/portfolioData";
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

const getResultIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('project') || lowerTitle.includes('github')) return Code;
  if (lowerTitle.includes('skill') || lowerTitle.includes('tech')) return Cpu;
  if (lowerTitle.includes('achievement') || lowerTitle.includes('award') || lowerTitle.includes('ambassador')) return Trophy;
  if (lowerTitle.includes('data') || lowerTitle.includes('database')) return Database;
  return User;
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Init audio on first interaction
    const handleInteraction = () => {
      AudioEngine.init();
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

  useEffect(() => {
    setSearchQuery(initialQuery);
    setLoading(true);
    
    const lowerQuery = initialQuery.toLowerCase();
    if ((lowerQuery.includes("wikipedia") || lowerQuery.includes("wiki")) && 
        (lowerQuery.includes("charchit") || lowerQuery === "wikipedia" || lowerQuery === "wiki")) {
      navigate("/wiki/charchit-sharma");
      return;
    }
    
    // Simulate loading
    setTimeout(() => {
      const filteredResults = filterPortfolioData(initialQuery);
      setResults(filteredResults);
      setLoading(false);
      AudioEngine.success();

      if (initialQuery && filteredResults.length === 0) {
        const timer = setTimeout(() => {
          window.open(
            `https://www.google.com/search?q=${encodeURIComponent(initialQuery)}`,
            "_blank"
          );
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, 1200);
  }, [initialQuery, navigate]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      AudioEngine.success();
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    AudioEngine.type();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Space Background */}
      <SpaceBackground />

      {/* Scanlines Overlay */}
      <div className="scanlines" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-card/80 border-b border-border/50 relative">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Logo */}
            <button 
              onClick={() => { AudioEngine.click(); navigate("/"); }}
              onMouseEnter={() => AudioEngine.hover()}
              className="font-pixel text-lg tracking-wide flex-shrink-0"
            >
              <span className="text-google-blue text-glow-blue">C</span>
              <span className="text-google-red text-glow-red">h</span>
              <span className="text-google-yellow text-glow-yellow">a</span>
              <span className="text-google-blue text-glow-blue">r</span>
              <span className="text-google-green text-glow-green">c</span>
              <span className="text-google-red text-glow-red">h</span>
              <span className="text-google-yellow text-glow-yellow">i</span>
              <span className="text-google-blue text-glow-blue">t</span>
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center bg-card border border-border rounded-full px-4 py-2.5 search-box">
                <Search className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleType}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent font-code text-foreground outline-none placeholder:text-muted-foreground"
                  placeholder="Search..."
                />
                <div className="flex items-center gap-1 border-l border-border pl-3 ml-2">
                  <button
                    onClick={() => AudioEngine.click()}
                    onMouseEnter={() => AudioEngine.hover()}
                    className="p-1.5 hover:bg-secondary rounded-full"
                  >
                    <Mic className="w-4 h-4 text-google-blue" />
                  </button>
                  <button
                    onClick={() => AudioEngine.click()}
                    onMouseEnter={() => AudioEngine.hover()}
                    className="p-1.5 hover:bg-secondary rounded-full"
                  >
                    <Camera className="w-4 h-4 text-google-yellow" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Icons */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => AudioEngine.click()}
                onMouseEnter={() => AudioEngine.hover()}
                className="p-2 hover:bg-secondary rounded-full"
              >
                <Grid3X3 className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-google-blue">
                <img src={charchitAvatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 lg:px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 min-w-max">
            {["Overview", "News", "Images", "Videos", "Maps"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => AudioEngine.click()}
                onMouseEnter={() => AudioEngine.hover()}
                className={`px-4 py-2.5 font-code text-sm transition-colors relative ${
                  i === 0 ? "text-google-blue" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
                {i === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-google-blue" />
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Loading State */}
      {loading && (
        <main className="flex-1 px-4 lg:px-6 py-8">
          <p className="font-pixel text-xs text-muted-foreground mb-6 animate-pulse">
            Fetching protocols...
          </p>
          <div className="space-y-6 max-w-2xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="result-card p-4" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="skeleton h-3 w-48 mb-2 rounded" />
                <div className="skeleton h-5 w-72 mb-2 rounded" />
                <div className="skeleton h-3 w-full rounded" />
              </div>
            ))}
          </div>
        </main>
      )}

      {/* No Results State */}
      {!loading && results.length === 0 && (
        <main className="flex-1 px-4 lg:px-6 py-12">
          <div className="max-w-xl mx-auto text-center result-card p-8">
            <p className="font-code text-lg text-foreground mb-2">
              No results found for "<span className="text-google-blue">{searchQuery}</span>"
            </p>
            <p className="font-code text-sm text-muted-foreground mb-6">
              Redirecting to search in 2 seconds...
            </p>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => AudioEngine.click()}
              onMouseEnter={() => AudioEngine.hover()}
              className="retro-btn inline-flex items-center gap-2"
            >
              Search Now →
            </a>
          </div>
        </main>
      )}

      {/* Results State */}
      {!loading && results.length > 0 && (
        <main className="flex-1 px-4 lg:px-6 py-4">
          {/* Stats Bar */}
          <p className="font-code text-xs text-muted-foreground mb-4">
            About {results.length.toLocaleString()} results (0.04 seconds)
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Results */}
            <div className="flex-1 lg:max-w-[60%] order-2 lg:order-1">
              <AboutSnippet />
              <div className="mb-4"><PeopleAlsoAsk /></div>
              <div className="mb-4"><InstagramCard /></div>
              <div className="mb-4"><ImageStrip /></div>

              {/* Result Cards */}
              <div className="space-y-4">
                {results.slice(0, 5).map((result, index) => {
                  const IconComponent = getResultIcon(result.title);
                  const isMangaLink = result.url === '/manga' || result.id === 'manga';
                  
                  const handleLinkClick = (e: React.MouseEvent) => {
                    AudioEngine.click();
                    if (isMangaLink) {
                      navigate('/manga');
                    } else {
                      e.preventDefault();
                      navigate('/dino');
                    }
                  };

                  return (
                    <div
                      key={result.id}
                      className="result-card p-4 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onMouseEnter={() => AudioEngine.hover()}
                    >
                      {/* URL Line */}
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center">
                          <IconComponent className="w-3 h-3 text-google-blue" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-code text-xs text-foreground">
                            {result.title.split(' - ')[0] || result.title.split('|')[0]}
                          </span>
                          <span className="font-code text-xs text-muted-foreground truncate max-w-[200px]">
                            {result.url}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <button
                        onClick={handleLinkClick}
                        className="block font-code text-lg text-google-blue hover:underline mb-1 text-left"
                      >
                        {result.title}
                      </button>

                      {/* Description */}
                      <p className="font-code text-sm text-muted-foreground leading-relaxed mb-3">
                        {result.description}
                      </p>

                      {/* Tags */}
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {result.tags.map((tag) => (
                            <span
                              key={tag}
                              className="pixel-badge text-google-green border-google-green/30 text-[10px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pagination (Decorative) */}
              <div className="flex items-center justify-center gap-1 mt-8 py-4">
                <span className="font-pixel text-lg text-google-blue">C</span>
                <span className="font-pixel text-lg text-google-red">h</span>
                <span className="font-pixel text-lg text-google-yellow">a</span>
                <span className="font-pixel text-lg text-google-blue">r</span>
                <span className="font-pixel text-lg text-google-green">c</span>
                <span className="font-pixel text-lg text-google-red">h</span>
                <span className="font-pixel text-lg text-google-yellow">i</span>
                <span className="font-pixel text-lg text-google-blue">t</span>
                <button
                  onClick={() => AudioEngine.click()}
                  onMouseEnter={() => AudioEngine.hover()}
                  className="ml-4 font-code text-sm text-google-blue hover:underline"
                >
                  Next {'>'}
                </button>
              </div>
            </div>

            {/* Right Column - Knowledge Panel */}
            <div className="lg:w-[40%] lg:max-w-md order-1 lg:order-2">
              <KnowledgePanel />
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto backdrop-blur-sm bg-card/30 relative z-10">
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <p className="font-code text-sm text-muted-foreground">Roorkee, Uttarakhand, India</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="font-code hover:text-foreground cursor-pointer transition-colors">Help</span>
            <span className="font-code hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="font-code hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
