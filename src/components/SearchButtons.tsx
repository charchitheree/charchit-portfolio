import useSoundEffects from "@/hooks/useSoundEffects";

interface SearchButtonsProps {
  onSearch: () => void;
  onLucky: () => void;
}

const SearchButtons = ({ onSearch, onLucky }: SearchButtonsProps) => {
  const { playClick, playHover, playSuccess } = useSoundEffects();

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <button 
        onClick={() => { onSearch(); playClick(); }}
        onMouseEnter={playHover}
        className="px-6 py-2.5 font-ui font-semibold text-sm rounded-lg bg-secondary text-foreground border border-border hover:border-primary hover:bg-primary/10 transition-all duration-200 hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
      >
        Charchit Search
      </button>
      <button 
        onClick={() => { onLucky(); playSuccess(); }}
        onMouseEnter={playHover}
        className="px-6 py-2.5 font-ui font-semibold text-sm rounded-lg bg-secondary text-foreground border border-border hover:border-accent hover:bg-accent/10 transition-all duration-200 hover:shadow-[0_0_15px_hsl(var(--accent)/0.3)]"
      >
        I'm Feeling Lucky
      </button>
    </div>
  );
};

export default SearchButtons;
