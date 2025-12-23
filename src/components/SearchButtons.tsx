interface SearchButtonsProps {
  onSearch: () => void;
  onLucky: () => void;
}

const SearchButtons = ({ onSearch, onLucky }: SearchButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
      <button 
        onClick={onSearch} 
        className="google-btn hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--google-blue)/0.4)] active:scale-95 transition-all duration-200"
      >
        View Projects
      </button>
      <button 
        onClick={onLucky} 
        className="google-btn hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--google-green)/0.4)] active:scale-95 transition-all duration-200"
      >
        I'm Feeling Lucky
      </button>
    </div>
  );
};

export default SearchButtons;
