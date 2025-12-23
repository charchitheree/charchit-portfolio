import { Grid3X3, User } from "lucide-react";

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 flex justify-end items-center p-4 gap-4">
      <a
        href="#about"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        About
      </a>
      <a
        href="#projects"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Projects
      </a>
      <button className="p-2 hover:bg-secondary rounded-full">
        <Grid3X3 className="w-5 h-5 text-muted-foreground" />
      </button>
      <button className="w-8 h-8 bg-google-blue rounded-full flex items-center justify-center">
        <User className="w-5 h-5 text-primary-foreground" />
      </button>
    </header>
  );
};

export default Header;
