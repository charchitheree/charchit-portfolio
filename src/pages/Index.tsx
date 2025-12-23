import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "@/components/GoogleLogo";
import SearchBar from "@/components/SearchBar";
import SearchButtons from "@/components/SearchButtons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { searchSuggestions, portfolioData } from "@/data/portfolioData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 1200);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLucky = () => {
    const randomProject = portfolioData.filter((item) => item.category === "project");
    const random = randomProject[Math.floor(Math.random() * randomProject.length)];
    navigate(`/search?q=${encodeURIComponent(random.title)}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-muted animate-spin border-t-google-blue border-r-google-red border-b-google-yellow border-l-google-green" />
        </div>
        <div className="mt-6 h-1 w-48 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-google-blue via-google-red to-google-yellow animate-[loading_1.2s_ease-in-out]" 
               style={{ width: '100%' }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background relative flex flex-col transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        <div className="w-full max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <GoogleLogo name="Charchit" animate />
            <p 
              className="text-muted-foreground text-sm mt-2 transition-all duration-500"
              style={{
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(10px)',
                transitionDelay: '1.4s'
              }}
            >
              Data Science Student • Campus Ambassador
            </p>
          </div>
          
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            suggestions={searchSuggestions}
          />
          
          <SearchButtons onSearch={handleSearch} onLucky={handleLucky} />
          
          <p className="mt-8 text-muted-foreground text-sm">
            Search for projects, skills, or anything about me
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
