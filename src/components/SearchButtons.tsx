interface SearchButtonsProps {
  onSearch: () => void;
  onLucky: () => void;
}

const SearchButtons = ({ onSearch, onLucky }: SearchButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
      <button 
        onClick={onSearch} 
        className="px-4 py-2 text-sm rounded bg-secondary text-foreground hover:border hover:border-border hover:shadow-sm transition-all"
      >
        Charchit Search
      </button>
      <button 
        onClick={onLucky} 
        className="px-4 py-2 text-sm rounded bg-secondary text-foreground hover:border hover:border-border hover:shadow-sm transition-all"
      >
        I'm Feeling Lucky
      </button>
    </div>
  );
};

export default SearchButtons;
