interface SearchButtonsProps {
  onSearch: () => void;
  onLucky: () => void;
}

const SearchButtons = ({ onSearch, onLucky }: SearchButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
      <button onClick={onSearch} className="google-btn">
        View Projects
      </button>
      <button onClick={onLucky} className="google-btn">
        I'm Feeling Lucky
      </button>
    </div>
  );
};

export default SearchButtons;
