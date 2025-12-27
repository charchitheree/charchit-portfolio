import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchHeader from "@/components/SearchHeader";
import KnowledgePanel from "@/components/KnowledgePanel";
import PeopleAlsoAsk from "@/components/PeopleAlsoAsk";
import InstagramCard from "@/components/InstagramCard";
import ImageStrip from "@/components/ImageStrip";
import AboutSnippet from "@/components/AboutSnippet";
import PixelCharacters from "@/components/PixelCharacters";
import { filterPortfolioData, PortfolioItem } from "@/data/portfolioData";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    setSearchQuery(initialQuery);
    
    const lowerQuery = initialQuery.toLowerCase();
    if ((lowerQuery.includes("wikipedia") || lowerQuery.includes("wiki")) && 
        (lowerQuery.includes("charchit") || lowerQuery === "wikipedia" || lowerQuery === "wiki")) {
      navigate("/wiki/charchit-sharma");
      return;
    }
    
    const filteredResults = filterPortfolioData(initialQuery);
    setResults(filteredResults);

    if (initialQuery && filteredResults.length === 0) {
      const timer = setTimeout(() => {
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(initialQuery)}`,
          "_blank"
        );
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [initialQuery, navigate]);

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <PixelCharacters />
      
      <SearchHeader
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {results.length === 0 ? (
        <main className="max-w-3xl mx-auto px-6 py-12 relative z-10">
          <div className="text-center neon-box rounded-xl p-8">
            <p className="text-lg text-foreground mb-2 font-ui">
              No results found for "<span className="text-primary">{searchQuery}</span>"
            </p>
            <p className="text-muted-foreground mb-6 font-ui">
              Redirecting to Google in 2 seconds...
            </p>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-ui font-semibold hover:shadow-neon"
            >
              Search on Google Now
            </a>
          </div>
        </main>
      ) : (
        <main className="px-4 lg:px-6 py-4 relative z-10">
          <p className="text-xs text-muted-foreground mb-4 font-mono">
            About {results.length.toLocaleString()} results (0.42 seconds)
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 lg:max-w-[60%] order-2 lg:order-1">
              <AboutSnippet />
              <div className="mb-6"><PeopleAlsoAsk /></div>
              <div className="mb-6"><InstagramCard /></div>
              <ImageStrip />

              <div className="space-y-6">
                {results.slice(0, 3).map((result) => (
                  <div key={result.id} className="group neon-box rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded bg-secondary flex items-center justify-center">
                        <span className="text-[10px] text-primary font-gaming">
                          {result.title.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground font-mono">
                        {result.url}
                      </span>
                    </div>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-primary hover:underline block mb-1 font-ui font-semibold"
                    >
                      {result.title}
                    </a>
                    <p className="text-sm text-muted-foreground line-clamp-2 font-ui">
                      {result.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-[40%] lg:max-w-md order-1 lg:order-2">
              <KnowledgePanel />
            </div>
          </div>
        </main>
      )}

      <footer className="border-t border-border mt-12 relative z-10">
        <div className="px-4 lg:px-6 py-4">
          <p className="text-sm text-muted-foreground font-ui">Roorkee, Uttarakhand, India</p>
        </div>
        <div className="border-t border-border px-4 lg:px-6 py-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground font-ui">
          <span className="hover:text-primary cursor-pointer transition-colors">Help</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Send feedback</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Terms</span>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
