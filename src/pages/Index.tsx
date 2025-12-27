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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 1200);

    return () => clearTimeout(loadingTimer);
  }, []);

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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center crt-scanlines">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-border animate-spin" 
               style={{ 
                 borderTopColor: 'hsl(var(--retro-cyan))', 
                 borderRightColor: 'hsl(var(--retro-magenta))',
                 borderBottomColor: 'hsl(var(--retro-yellow))',
                 borderLeftColor: 'hsl(var(--retro-green))',
               }} />
        </div>
        <p className="font-pixel text-xs text-muted-foreground mt-6 animate-pulse">LOADING...</p>
        <div className="mt-4 h-2 w-48 bg-secondary rounded-none overflow-hidden border-2 border-border">
          <div className="h-full bg-gradient-to-r from-retro-cyan via-retro-magenta to-retro-yellow animate-[loading_1.2s_ease-in-out]" 
               style={{ width: '100%' }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background relative flex flex-col transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {/* Pixel Characters Background */}
      <PixelCharacters />
      
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-32 relative z-10">
        <div className="w-full max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <GoogleLogo name="Charchit" animate />
            <p 
              className="font-retro text-xl text-muted-foreground mt-4 transition-all duration-500"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(10px)',
                transitionDelay: '1.4s'
              }}
            >
              <span className="text-retro-cyan">★</span> From Roorkee, Uttarakhand <span className="text-retro-magenta">★</span> IIT Madras <span className="text-retro-yellow">★</span> Harvard ALP Scholar <span className="text-retro-green">★</span>
            </p>
          </div>
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            onAIMode={() => setShowAIChat(true)}
            suggestions={searchSuggestions}
          />
          
          <SearchButtons onSearch={handleSearch} onLucky={handleLucky} />
          
          <p className="mt-8 font-retro text-lg text-muted-foreground">
            Search for projects, skills, or{" "}
            <button 
              onClick={() => setShowAIChat(true)}
              className="text-retro-purple hover:text-retro-pink transition-colors underline"
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
