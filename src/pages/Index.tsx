import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "@/components/GoogleLogo";
import SearchBar from "@/components/SearchBar";
import SearchButtons from "@/components/SearchButtons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GeminiChat from "@/components/GeminiChat";
import PixelCharacters from "@/components/PixelCharacters";
import { searchSuggestions } from "@/data/portfolioData";
import useSoundEffects from "@/hooks/useSoundEffects";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const navigate = useNavigate();
  const { playPowerUp } = useSoundEffects();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      playPowerUp();
      setTimeout(() => setShowContent(true), 100);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, [playPowerUp]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLucky = () => {
    navigate("/wiki/charchit-sharma");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background grid */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(185, 100%, 55%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(185, 100%, 55%) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="relative flex flex-col items-center">
          {/* Loading spinner */}
          <div className="relative w-16 h-16">
            <div 
              className="absolute inset-0 rounded-lg border-2 border-t-neon-cyan border-r-neon-magenta border-b-neon-yellow border-l-neon-green animate-spin"
            />
            <div 
              className="absolute inset-2 rounded border border-primary/30 animate-spin"
              style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
            />
          </div>
          
          <p className="font-gaming text-xs text-muted-foreground mt-6 tracking-widest animate-pulse">
            INITIALIZING
          </p>
          
          {/* Progress bar */}
          <div className="mt-4 h-1 w-48 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-yellow"
              style={{ 
                width: '100%',
                animation: 'loading 1.5s ease-in-out',
              }} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background relative flex flex-col transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Effects */}
      <PixelCharacters />
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-32 relative z-10">
        <div className="w-full max-w-2xl mx-auto text-center">
          <div className="mb-10">
            <GoogleLogo name="Charchit" animate />
            <div 
              className="flex items-center justify-center gap-2 flex-wrap mt-5 transition-all duration-500"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(10px)',
                transitionDelay: '1.4s'
              }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-ui">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                Roorkee
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-magenta/10 border border-neon-magenta/30 text-neon-magenta text-sm font-ui">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-magenta animate-pulse" />
                IIT Madras
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-yellow/10 border border-neon-yellow/30 text-neon-yellow text-sm font-ui">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-yellow animate-pulse" />
                Harvard ALP
              </span>
            </div>
          </div>
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            onAIMode={() => setShowAIChat(true)}
            suggestions={searchSuggestions}
          />
          
          <SearchButtons onSearch={handleSearch} onLucky={handleLucky} />
          
          <p className="mt-10 font-ui text-base text-muted-foreground">
            Search for projects, skills, or{" "}
            <button 
              onClick={() => setShowAIChat(true)}
              className="text-accent hover:text-accent/80 transition-colors underline underline-offset-4"
            >
              ask AI about Charchit
            </button>
          </p>
        </div>
      </main>
      
      <Footer />
      
      <GeminiChat isOpen={showAIChat} onClose={() => setShowAIChat(false)} />
    </div>
  );
};

export default Index;
