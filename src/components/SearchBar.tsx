import { Search, Mic, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  suggestions?: string[];
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChange,
  onSearch,
  suggestions = [],
  placeholder = "Search my portfolio...",
}: SearchBarProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={inputRef}>
      <div
        className={`search-box flex items-center bg-background border border-border rounded-full px-4 py-3 ${
          showSuggestions && filteredSuggestions.length > 0
            ? "rounded-b-none border-b-0"
            : ""
        }`}
      >
        <Search className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="p-1 hover:bg-secondary rounded-full mr-2"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
        <div className="border-l border-border pl-3">
          <Mic className="w-5 h-5 text-google-blue cursor-pointer hover:opacity-80" />
        </div>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && value && (
        <div className="absolute w-full bg-background border border-t-0 border-border rounded-b-2xl shadow-lg z-10">
          {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center w-full px-4 py-2 hover:bg-secondary text-left"
            >
              <Search className="w-4 h-4 text-muted-foreground mr-3" />
              <span className="text-foreground">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
