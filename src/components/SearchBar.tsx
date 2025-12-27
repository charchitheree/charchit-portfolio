import { Search, Mic, Camera, X, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useSoundEffects from "@/hooks/useSoundEffects";

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
  const { playClick, playHover, playType } = useSoundEffects();

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(value.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
      setShowSuggestions(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowSuggestions(true);
    playType();
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    playClick();
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
    <div className="relative w-full max-w-[600px] mx-auto" ref={containerRef}>
      <div
        className={`flex items-center bg-card border-2 border-border rounded-xl px-5 py-3.5 transition-all duration-300 hover:border-primary/50 focus-within:border-primary focus-within:shadow-neon ${
          showSuggestions && filteredSuggestions.length > 0
            ? "rounded-b-none border-b"
            : ""
        }`}
      >
        <Search className="w-5 h-5 text-primary mr-4 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-ui text-lg"
        />
        {value && (
          <>
            <button
              onClick={() => { onChange(""); playClick(); }}
              onMouseEnter={playHover}
              className="p-1.5 hover:bg-secondary rounded-lg mr-2 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
            </button>
            <div className="w-px h-6 bg-border mr-3" />
          </>
        )}
        <div className="flex items-center gap-1">
          <button 
            onClick={playClick}
            onMouseEnter={playHover}
            className="p-2 hover:bg-secondary rounded-lg transition-colors group"
          >
            <Mic className="w-5 h-5 text-neon-green group-hover:drop-shadow-[0_0_8px_hsl(var(--neon-green))]" />
          </button>
          <button 
            onClick={playClick}
            onMouseEnter={playHover}
            className="p-2 hover:bg-secondary rounded-lg transition-colors group"
          >
            <Camera className="w-5 h-5 text-neon-yellow group-hover:drop-shadow-[0_0_8px_hsl(var(--neon-yellow))]" />
          </button>
          {onAIMode && (
            <button 
              onClick={() => { onAIMode(); playClick(); }}
              onMouseEnter={playHover}
              className="flex items-center gap-2 ml-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/50 hover:bg-accent/20 hover:border-accent transition-all group"
            >
              <Sparkles className="w-4 h-4 text-accent group-hover:drop-shadow-[0_0_8px_hsl(var(--accent))]" />
              <span className="font-gaming text-[10px] text-foreground tracking-wider">AI</span>
            </button>
          )}
        </div>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && value && (
        <div className="absolute w-full bg-card border-2 border-t-0 border-primary rounded-b-xl shadow-neon z-10 overflow-hidden">
          {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={playHover}
              className="flex items-center w-full px-5 py-3 hover:bg-primary/10 text-left transition-colors group"
            >
              <Search className="w-4 h-4 text-muted-foreground mr-4 group-hover:text-primary" />
              <span className="font-ui text-base text-foreground">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
