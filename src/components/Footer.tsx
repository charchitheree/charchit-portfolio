import { Gamepad2, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t-2 border-border">
      <div className="border-b border-border px-6 py-3">
        <span className="font-retro text-lg text-muted-foreground flex items-center gap-2">
          <span className="text-retro-green">▶</span>
          Roorkee, Uttarakhand, India
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between px-6 py-3">
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start mb-3 sm:mb-0">
          <a href="#about" className="font-retro text-lg text-muted-foreground hover:text-retro-cyan transition-colors">About</a>
          <a href="#projects" className="font-retro text-lg text-muted-foreground hover:text-retro-magenta transition-colors">Projects</a>
          <a href="#experience" className="font-retro text-lg text-muted-foreground hover:text-retro-yellow transition-colors">Experience</a>
        </div>
        <div className="flex flex-wrap gap-6 justify-center sm:justify-end items-center">
          <span className="flex items-center gap-2 font-retro text-lg text-muted-foreground">
            <Gamepad2 className="w-4 h-4 text-retro-green animate-bounce-pixel" />
            <span className="text-retro-green">Built with Lovable</span>
            <Heart className="w-3 h-3 text-retro-pink" />
          </span>
          <a
            href="mailto:charxhitsharma@gmail.com"
            className="font-retro text-lg text-muted-foreground hover:text-retro-orange transition-colors"
          >
            Contact
          </a>
          <a
            href="https://www.linkedin.com/in/charchit-sharma-398165287/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-retro text-lg text-muted-foreground hover:text-retro-purple transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
      {/* Legal Disclaimer */}
      <div className="border-t border-border px-6 py-3 text-center">
        <p className="font-pixel text-[6px] text-muted-foreground/70 leading-relaxed">
          ★ PERSONAL PORTFOLIO - FOR EDUCATIONAL & CREATIVE PURPOSES ★ 
          NOT AFFILIATED WITH GOOGLE LLC ★ ALL SEARCHES LEAD TO CHARCHIT SHARMA ★
        </p>
      </div>
    </footer>
  );
};

export default Footer;
