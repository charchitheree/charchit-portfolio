import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "@/components/GoogleLogo";
import SearchBar from "@/components/SearchBar";
import SearchButtons from "@/components/SearchButtons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { searchSuggestions, portfolioData } from "@/data/portfolioData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLucky = () => {
    const randomProject = portfolioData.filter((item) => item.category === "project");
    const random = randomProject[Math.floor(Math.random() * randomProject.length)];
    navigate(`/search?q=${encodeURIComponent(random.title)}`);
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        <div className="w-full max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <GoogleLogo name="Portfolio" />
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
