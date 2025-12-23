const Footer = () => {
  const topLinks = ["About", "Experience", "Skills", "Contact"];

  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-secondary">
      <div className="border-b border-border px-6 py-3">
        <span className="text-muted-foreground text-sm">Roorkee, Uttarakhand, India</span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between px-6 py-3 text-sm">
        <div className="flex flex-wrap gap-6 justify-center sm:justify-start mb-3 sm:mb-0">
          {topLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 justify-center sm:justify-end">
          <a
            href="mailto:charxhitsharma@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/charchit-sharma-398165287"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
