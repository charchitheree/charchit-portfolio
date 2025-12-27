import { Grid3X3, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import charchitAvatar from "@/assets/charchit-avatar.gif";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 px-6 z-40">
      {/* Left side links */}
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/charchitheree"
          target="_blank"
          rel="noopener noreferrer"
          className="font-retro text-lg text-muted-foreground hover:text-retro-cyan transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/charchit-sharma-398165287/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-retro text-lg text-muted-foreground hover:text-retro-magenta transition-colors"
        >
          LinkedIn
        </a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <Link
          to="/manga"
          className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 hover:bg-secondary rounded-lg transition-all hover:scale-105 group"
        >
          <Gamepad2 className="w-4 h-4 text-retro-green group-hover:animate-wiggle" />
          <span className="font-pixel text-[8px] text-foreground hidden sm:inline">MANGA</span>
        </Link>
        <a
          href="https://www.instagram.com/heyimcharchit/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-retro text-lg text-muted-foreground hover:text-retro-pink transition-colors"
        >
          Instagram
        </a>
        <a
          href="mailto:charxhitsharma@gmail.com"
          className="font-retro text-lg text-muted-foreground hover:text-retro-yellow transition-colors"
        >
          Email
        </a>
        <button className="p-2 hover:bg-secondary rounded-full ml-2 group">
          <Grid3X3 className="w-5 h-5 text-muted-foreground group-hover:text-retro-cyan transition-colors" />
        </button>
        <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-border hover:border-retro-cyan transition-colors pixel-box p-0">
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
