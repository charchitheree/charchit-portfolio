import { Grid3X3, Gamepad2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import charchitAvatar from "@/assets/charchit-avatar.gif";
import useSoundEffects from "@/hooks/useSoundEffects";

const Header = () => {
  const { playClick, playHover } = useSoundEffects();

  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 px-6 z-40">
      {/* Left side links */}
      <div className="flex items-center gap-5">
        <a
          href="https://github.com/charchitheree"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          onMouseEnter={playHover}
          className="font-ui text-base text-muted-foreground hover:text-neon-cyan transition-all duration-200 hover:drop-shadow-[0_0_8px_hsl(var(--neon-cyan))]"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/charchit-sharma-398165287/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          onMouseEnter={playHover}
          className="font-ui text-base text-muted-foreground hover:text-neon-blue transition-all duration-200 hover:drop-shadow-[0_0_8px_hsl(var(--neon-blue))]"
        >
          LinkedIn
        </a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Link
          to="/manga"
          onClick={playClick}
          onMouseEnter={playHover}
          className="flex items-center gap-2 px-4 py-2 bg-secondary/80 hover:bg-primary/20 rounded border border-border hover:border-primary transition-all duration-200 group"
        >
          <Gamepad2 className="w-4 h-4 text-neon-green group-hover:drop-shadow-[0_0_8px_hsl(var(--neon-green))]" />
          <span className="font-gaming text-[10px] text-foreground tracking-wider hidden sm:inline">MANGA</span>
        </Link>
        <a
          href="https://www.instagram.com/heyimcharchit/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          onMouseEnter={playHover}
          className="font-ui text-base text-muted-foreground hover:text-neon-pink transition-all duration-200 hover:drop-shadow-[0_0_8px_hsl(var(--neon-pink))]"
        >
          Instagram
        </a>
        <a
          href="mailto:charxhitsharma@gmail.com"
          onClick={playClick}
          onMouseEnter={playHover}
          className="font-ui text-base text-muted-foreground hover:text-neon-yellow transition-all duration-200 hover:drop-shadow-[0_0_8px_hsl(var(--neon-yellow))]"
        >
          Email
        </a>
        <button 
          onClick={playClick}
          onMouseEnter={playHover}
          className="p-2 hover:bg-secondary rounded-lg group transition-colors"
        >
          <Grid3X3 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
        <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-all duration-200 hover:shadow-neon">
          <img 
            src={charchitAvatar} 
            alt="Charchit" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
