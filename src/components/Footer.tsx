import { Zap, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-secondary/90 backdrop-blur-md border-t border-border">
      <div className="border-b border-border px-6 py-3">
        <span className="font-ui text-base text-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          Roorkee, Uttarakhand, India
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between px-6 py-3">
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start mb-3 sm:mb-0">
          <a href="#about" className="font-ui text-base text-muted-foreground hover:text-neon-cyan transition-colors">About</a>
          <a href="#projects" className="font-ui text-base text-muted-foreground hover:text-neon-magenta transition-colors">Projects</a>
          <a href="#experience" className="font-ui text-base text-muted-foreground hover:text-neon-yellow transition-colors">Experience</a>
        </div>
        <div className="flex flex-wrap gap-6 justify-center sm:justify-end items-center">
          <span className="flex items-center gap-2 font-ui text-base">
            <Zap className="w-4 h-4 text-neon-green" />
            <span className="text-muted-foreground">Built with</span>
            <span className="text-neon-green font-semibold">Lovable</span>
            <Heart className="w-3 h-3 text-neon-pink" />
          </span>
          <a
            href="mailto:charxhitsharma@gmail.com"
            className="font-ui text-base text-muted-foreground hover:text-neon-orange transition-colors"
          >
            Contact
          </a>
          <a
            href="https://www.linkedin.com/in/charchit-sharma-398165287/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-ui text-base text-muted-foreground hover:text-neon-purple transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
      {/* Legal Disclaimer */}
      <div className="border-t border-border px-6 py-2.5 text-center">
        <p className="font-mono text-[10px] text-muted-foreground/60 tracking-wide">
          PERSONAL PORTFOLIO // EDUCATIONAL & CREATIVE PURPOSES // NOT AFFILIATED WITH GOOGLE LLC
        </p>
      </div>
    </footer>
  );
};

export default Footer;
