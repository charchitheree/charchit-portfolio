import { Search, Mic, Camera, X, Sparkles } from "lucide-react";
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
        className={`flex items-center bg-background border border-border rounded-full px-5 py-3 hover:shadow-md focus-within:shadow-md transition-shadow ${
          showSuggestions && filteredSuggestions.length > 0
            ? "rounded-b-none border-b-0"
            : ""
        }`}
      >
        <Search className="w-5 h-5 text-muted-foreground mr-4 flex-shrink-0" />
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
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-base"
        />
        {value && (
          <>
            <button
              onClick={() => onChange("")}
              className="p-1 hover:bg-secondary rounded-full mr-2"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="w-px h-6 bg-border mr-3" />
          </>
        )}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-secondary rounded-full">
            <Mic className="w-5 h-5 text-google-blue" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-full">
            <Camera className="w-5 h-5 text-google-blue" />
          </button>
          {onAIMode && (
            <button 
              onClick={onAIMode}
              className="flex items-center gap-2 ml-2 px-4 py-2 rounded-full border border-border hover:bg-secondary transition-colors"
            >
              <Sparkles className="w-4 h-4 text-google-blue" />
              <span className="text-sm text-foreground">AI Mode</span>
            </button>
          )}
        </div>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && value && (
        <div className="absolute w-full bg-background border border-t-0 border-border rounded-b-3xl shadow-lg z-10">
          {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center w-full px-5 py-3 hover:bg-secondary text-left"
            >
              <Search className="w-4 h-4 text-muted-foreground mr-4" />
              <span className="text-foreground">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
