import { Grid3X3 } from "lucide-react";
import charchitAvatar from "@/assets/charchit-avatar.gif";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 px-6">
      {/* Left side links */}
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/charchitheree"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:underline transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/charchit-sharma-398165287/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:underline transition-colors"
        >
          LinkedIn
        </a>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <a
          href="https://www.instagram.com/heyimcharchit/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:underline transition-colors"
        >
          Instagram
        </a>
        <a
          href="mailto:charxhitsharma@gmail.com"
          className="text-sm text-muted-foreground hover:underline transition-colors"
        >
          Email
        </a>
        <button className="p-2 hover:bg-secondary rounded-full ml-2">
          <Grid3X3 className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden">
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
