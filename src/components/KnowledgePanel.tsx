import { Globe, Share2, Bookmark, Instagram, Linkedin, Github, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import charchitPortrait from "@/assets/charchit-portrait.png";
import charchitEvent from "@/assets/charchit-event.jpg";
import charchitAvatar from "@/assets/charchit-avatar.gif";

const KnowledgePanel = () => {
  const navigate = useNavigate();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/heyimcharchit/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/charchit-sharma-398165287/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/charchitheree", label: "GitHub" },
  ];

  const tags = ["Roorkee", "IIT Madras", "Harvard ALP", "Builder", "Data Science"];

  const details = [
    { label: "Born", value: "November 8, 2004 (Age 21)" },
    { label: "Hometown", value: "Roorkee, Uttarakhand, India" },
    { label: "Education", value: "IIT Madras (BS Data Science, pursuing)" },
    { label: "Program", value: "Aspire Leadership Program 2025" },
  ];

  return (
    <div className="bg-card/95 backdrop-blur-md rounded-lg border border-border/50 overflow-hidden shadow-lg">
      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-secondary/30">
        <div className="col-span-2 row-span-2 aspect-[4/3] relative overflow-hidden rounded-md bg-muted">
          <img
            src={charchitEvent}
            alt="Charchit Sharma at a tech event in India"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square overflow-hidden rounded-md bg-muted">
          <img
            src={charchitPortrait}
            alt="Charchit Sharma portrait - IIT Madras student from Roorkee"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square overflow-hidden rounded-md bg-muted flex items-center justify-center">
          <img
            src={charchitAvatar}
            alt="Charchit Sharma animated avatar"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-2xl font-normal text-card-foreground mb-1">Charchit Sharma</h2>
        <p className="text-sm text-muted-foreground mb-1">Student, Developer & Aspiring Entrepreneur</p>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
          <MapPin className="w-3 h-3" /> Roorkee, Uttarakhand
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <button 
            onClick={() => navigate("/wiki/charchit-sharma")}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
          >
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Wikipedia</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-accent hover:bg-accent/80 transition-colors">
            <Share2 className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Share</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-accent hover:bg-accent/80 transition-colors">
            <Bookmark className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Save</span>
          </button>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          A 21-year-old builder from Roorkee with an insatiable hunger to learn. 
          Pursuing BS in Data Science at IIT Madras. Selected as a 2025 Aspire Leadership Program Scholar 
          (Harvard faculty-backed). He turns struggles into growth and dreams into reality.
        </p>

        {/* Details */}
        <div className="space-y-3 mb-4">
          {details.map((detail) => (
            <div key={detail.label} className="flex">
              <span className="text-sm text-muted-foreground w-24 flex-shrink-0">{detail.label}</span>
              <span className="text-sm text-card-foreground">{detail.value}</span>
            </div>
          ))}
        </div>

        {/* Social Profiles */}
        <div className="mb-4">
          <span className="text-sm text-muted-foreground block mb-2">Profiles</span>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
            <a
              href="https://x.com/heyimcharchit"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
              aria-label="X (Twitter)"
            >
              <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-accent text-muted-foreground hover:bg-accent/80 cursor-pointer transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgePanel;
