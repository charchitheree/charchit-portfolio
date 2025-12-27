import { Globe, Share2, Bookmark, Instagram, Linkedin, Twitter, Github, MapPin } from "lucide-react";
import charchitPortrait from "@/assets/charchit-portrait.png";
import charchitEvent from "@/assets/charchit-event.jpg";
import charchitAvatar from "@/assets/charchit-avatar.gif";

const KnowledgePanel = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/heyimcharchit", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/in/charchit", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/charchit", label: "Twitter" },
    { icon: Github, href: "https://github.com/charchit", label: "GitHub" },
  ];

  const tags = ["Data Science", "IIT Madras", "Travel", "Scholar"];

  const details = [
    { label: "Born", value: "2004 (Age 21 years)" },
    { label: "Education", value: "IIT Madras (2028), Harvard ALP (2025)" },
    { label: "Title", value: "BS Data Science Student" },
    { label: "Location", value: "India" },
  ];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-0.5">
        <div className="col-span-2 row-span-2 aspect-[4/3] relative overflow-hidden">
          <img
            src={charchitEvent}
            alt="Charchit at event"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square overflow-hidden">
          <img
            src={charchitPortrait}
            alt="Charchit portrait"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-square overflow-hidden bg-accent flex items-center justify-center">
          <img
            src={charchitAvatar}
            alt="Charchit avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-2xl font-normal text-card-foreground mb-1">Charchit Sharma</h2>
        <p className="text-sm text-muted-foreground mb-4">Student & Scholar</p>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-full bg-accent hover:bg-accent/80 transition-colors">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Website</span>
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
          Charchit Sharma is an undergraduate student specializing in Data Science. 
          He currently attends the Indian Institute of Technology, Madras and is an 
          ALP Scholar at Harvard.
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
