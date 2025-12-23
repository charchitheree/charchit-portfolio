const Footer = () => {
  const topLinks = ["About", "Projects", "Skills", "Contact"];
  const bottomLinks = ["GitHub", "LinkedIn", "Twitter", "Resume"];

  return (
    <footer className="absolute bottom-0 left-0 right-0 bg-secondary">
      <div className="border-b border-border px-6 py-3">
        <span className="text-muted-foreground text-sm">Available for hire</span>
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
          {bottomLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
