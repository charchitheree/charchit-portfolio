import { Search, Mic, Camera, Settings, Grid3X3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

const SearchHeader = ({ query, onQueryChange, onSearch }: SearchHeaderProps) => {
  const navigate = useNavigate();

  const tabs = [
    { name: "Overview", active: true },
    { name: "News", active: false },
    { name: "Images", active: false },
    { name: "Videos", active: false },
    { name: "Maps", active: false },
    { name: "More", active: false },
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Logo */}
          <button 
            onClick={() => navigate("/")}
            className="text-2xl font-bold flex-shrink-0"
          >
            <span className="text-google-blue">C</span>
            <span className="text-google-red">h</span>
            <span className="text-google-yellow">a</span>
            <span className="text-google-blue">r</span>
            <span className="text-google-green">c</span>
            <span className="text-google-red">h</span>
            <span className="text-google-yellow">i</span>
            <span className="text-google-blue">t</span>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center bg-secondary rounded-full border border-border hover:border-muted-foreground/50 focus-within:border-primary px-4 py-2.5 gap-3">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-card-foreground text-base outline-none placeholder:text-muted-foreground"
                placeholder="Search..."
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="p-1.5 hover:bg-accent rounded-full transition-colors">
                  <Mic className="w-5 h-5 text-primary" />
                </button>
                <button className="p-1.5 hover:bg-accent rounded-full transition-colors">
                  <Camera className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <Grid3X3 className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
              C
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 lg:px-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`px-4 py-2.5 text-sm transition-colors relative ${
                tab.active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-card-foreground"
              }`}
            >
              {tab.name}
              {tab.active && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
