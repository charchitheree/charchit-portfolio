import { Search, Mic, Camera, X, Sparkles, Gamepad2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onAIMode?: () => void;
  suggestions?: string[];
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChange,
  onSearch,
  onAIMode,
  suggestions = [],
  placeholder = "Search my portfolio...",
}: SearchBarProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(value.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    onSearch();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-[584px] mx-auto" ref={containerRef}>
      <div
        className={`flex items-center bg-card border-4 border-border rounded-lg px-5 py-3 transition-all duration-200 hover:border-primary hover:shadow-retro-glow ${
          showSuggestions && filteredSuggestions.length > 0
            ? "rounded-b-none border-b-2"
            : ""
        }`}
        style={{
          boxShadow: '4px 4px 0 hsl(var(--pixel-shadow))',
        }}
      >
        <Search className="w-5 h-5 text-retro-cyan mr-4 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-retro text-xl"
        />
        {value && (
          <>
            <button
              onClick={() => onChange("")}
              className="p-1 hover:bg-secondary rounded-lg mr-2 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground hover:text-retro-magenta" />
            </button>
            <div className="w-px h-6 bg-border mr-3" />
          </>
        )}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors group">
            <Mic className="w-5 h-5 text-retro-green group-hover:animate-bounce-pixel" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors group">
            <Camera className="w-5 h-5 text-retro-yellow group-hover:animate-wiggle" />
          </button>
          {onAIMode && (
            <button 
              onClick={onAIMode}
              className="flex items-center gap-2 ml-2 px-4 py-2 rounded-lg border-2 border-retro-purple bg-secondary/50 hover:bg-retro-purple/20 transition-all group"
              style={{
                boxShadow: '2px 2px 0 hsl(var(--pixel-shadow))',
              }}
            >
              <Sparkles className="w-4 h-4 text-retro-purple group-hover:animate-sparkle" />
              <span className="font-pixel text-[8px] text-foreground">AI</span>
            </button>
          )}
        </div>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && value && (
        <div 
          className="absolute w-full bg-card border-4 border-t-0 border-border rounded-b-lg shadow-lg z-10"
          style={{
            boxShadow: '4px 4px 0 hsl(var(--pixel-shadow))',
          }}
        >
          {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center w-full px-5 py-3 hover:bg-secondary text-left transition-colors group"
            >
              <Gamepad2 className="w-4 h-4 text-muted-foreground mr-4 group-hover:text-retro-cyan" />
              <span className="font-retro text-lg text-foreground">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
