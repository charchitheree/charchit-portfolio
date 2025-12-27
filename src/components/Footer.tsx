import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-secondary">
      <div className="border-b border-border px-6 py-3">
        <span className="text-muted-foreground text-sm">Roorkee, Uttarakhand, India</span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between px-6 py-3 text-sm">
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start mb-3 sm:mb-0">
          <a href="#about" className="text-muted-foreground hover:underline transition-colors">About</a>
          <a href="#projects" className="text-muted-foreground hover:underline transition-colors">Projects</a>
          <a href="#experience" className="text-muted-foreground hover:underline transition-colors">Experience</a>
        </div>
        <div className="flex flex-wrap gap-6 justify-center sm:justify-end items-center">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="text-green-600">Built with Lovable</span>
          </span>
          <a
            href="mailto:charxhitsharma@gmail.com"
            className="text-muted-foreground hover:underline transition-colors"
          >
            Contact
          </a>
          <a
            href="https://www.linkedin.com/in/charchit-sharma-398165287/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:underline transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
      {/* Legal Disclaimer */}
      <div className="border-t border-border px-6 py-3 text-center">
        <p className="text-xs text-muted-foreground/70">
          This is a personal portfolio created for educational & creative purposes. 
          It is not affiliated with, endorsed by, or connected to Google LLC. 
          All search results lead to information about Charchit Sharma.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
