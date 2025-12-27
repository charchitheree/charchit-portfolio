import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchHeader from "@/components/SearchHeader";
import KnowledgePanel from "@/components/KnowledgePanel";
import PeopleAlsoAsk from "@/components/PeopleAlsoAsk";
import InstagramCard from "@/components/InstagramCard";
import ImageStrip from "@/components/ImageStrip";
import AboutSnippet from "@/components/AboutSnippet";
import { filterPortfolioData, PortfolioItem } from "@/data/portfolioData";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    setSearchQuery(initialQuery);
    
    // Check if user is searching for Wikipedia
    const lowerQuery = initialQuery.toLowerCase();
    if ((lowerQuery.includes("wikipedia") || lowerQuery.includes("wiki")) && 
        (lowerQuery.includes("charchit") || lowerQuery === "wikipedia" || lowerQuery === "wiki")) {
      navigate("/wiki/charchit-sharma");
      return;
    }
    
    const filteredResults = filterPortfolioData(initialQuery);
    setResults(filteredResults);

    // If no results and query exists, redirect to Google after 2 seconds
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
    <div className="min-h-screen bg-background">
      <SearchHeader
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {results.length === 0 ? (
        <main className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center">
            <p className="text-lg text-card-foreground mb-2">
              No results found for "{searchQuery}"
            </p>
            <p className="text-muted-foreground mb-6">
              Redirecting to Google in 2 seconds...
            </p>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Search on Google Now
            </a>
          </div>
        </main>
      ) : (
        <main className="px-4 lg:px-6 py-4">
          <p className="text-xs text-muted-foreground mb-4">
            About {results.length.toLocaleString()} results (0.42 seconds)
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Search Results */}
            <div className="flex-1 lg:max-w-[60%] order-2 lg:order-1">
              {/* About Snippet */}
              <AboutSnippet />

              {/* People Also Ask */}
              <div className="mb-6">
                <PeopleAlsoAsk />
              </div>

              {/* Instagram Card */}
              <div className="mb-6">
                <InstagramCard />
              </div>

              {/* Image Strip */}
              <ImageStrip />

              {/* Additional Results */}
              <div className="space-y-6">
                {results.slice(0, 3).map((result) => (
                  <div key={result.id} className="group">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-4 rounded-sm bg-accent flex items-center justify-center">
                        <span className="text-[10px] text-muted-foreground">
                          {result.title.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {result.url}
                      </span>
                    </div>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-primary hover:underline block mb-1"
                    >
                      {result.title}
                    </a>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {result.description}
                    </p>
                  </div>
                ))}
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
      <footer className="border-t border-border mt-12">
        <div className="px-4 lg:px-6 py-4">
          <p className="text-sm text-muted-foreground">Roorkee, Uttarakhand, India</p>
        </div>
        <div className="border-t border-border px-4 lg:px-6 py-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span>Help</span>
          <span>Send feedback</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </footer>
    </div>
  );
};

export default SearchResults;
