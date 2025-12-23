import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GoogleLogo from "@/components/GoogleLogo";
import SearchBar from "@/components/SearchBar";
import SearchResult from "@/components/SearchResult";
import {
  filterPortfolioData,
  searchSuggestions,
  PortfolioItem,
} from "@/data/portfolioData";
import { Grid3X3, Settings, User } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    setSearchQuery(initialQuery);
    setResults(filterPortfolioData(initialQuery));
  }, [initialQuery]);

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="flex items-center gap-6 px-6 py-4">
          <button onClick={handleLogoClick} className="flex-shrink-0">
            <GoogleLogo name="Charchit" size="sm" />
          </button>
          
          <div className="flex-1 max-w-xl">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              suggestions={searchSuggestions}
              placeholder="Search portfolio..."
            />
          </div>
          
          <div className="hidden sm:flex items-center gap-4">
            <button className="p-2 hover:bg-secondary rounded-full">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full">
              <Grid3X3 className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-8 h-8 bg-google-blue rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-6 px-6 text-sm">
          <button className="pb-3 border-b-2 border-google-blue text-google-blue">
            All
          </button>
          <button className="pb-3 text-muted-foreground hover:text-foreground">
            Experience
          </button>
          <button className="pb-3 text-muted-foreground hover:text-foreground">
            Education
          </button>
          <button className="pb-3 text-muted-foreground hover:text-foreground">
            Skills
          </button>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-3xl mx-auto px-6 py-6">
        <p className="text-muted-foreground text-sm mb-6">
          About {results.length} results (0.42 seconds)
        </p>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground mb-2">
              No results found for "{searchQuery}"
            </p>
            <p className="text-muted-foreground">
              Try searching for "projects", "skills", or "about"
            </p>
          </div>
        ) : (
          <div>
            {results.map((result, index) => (
              <SearchResult
                key={result.id}
                title={result.title}
                url={result.url}
                description={result.description}
                tags={result.tags}
                delay={index * 100}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="px-6 py-4 text-sm text-muted-foreground">
          <p>Charchit Sharma • BS Data Science @ IIT Madras</p>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
