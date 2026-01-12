import { Globe, Share2, Bookmark, Instagram, Linkedin, Github, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import charchitBlackSuit from "@/assets/charchit-black-suit.jpg";
import charchitLeatherJacket1 from "@/assets/charchit-leather-jacket-1.jpg";
import charchitAvatar from "@/assets/charchit-avatar.gif";

const KnowledgePanel = () => {
  const navigate = useNavigate();
  const socialLinks = [{
    icon: Instagram,
    href: "https://www.instagram.com/heyimcharchit/",
    label: "Instagram"
  }, {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/charchit-sharma-398165287/",
    label: "LinkedIn"
  }, {
    icon: Github,
    href: "https://github.com/charchitheree",
    label: "GitHub"
  }];
  const tags = ["Roorkee", "IIT Madras", "Harvard ALP", "Builder", "Data Science"];
  const details = [{
    label: "Born",
    value: "November 8, 2004 (Age 21)"
  }, {
    label: "Hometown",
    value: "Roorkee, Uttarakhand, India"
  }, {
    label: "Education",
    value: "IIT Madras (BS Data Science, pursuing)"
  }, {
    label: "Program",
    value: "Aspire Leadership Program 2025"
  }];
  return <div className="bg-card/95 backdrop-blur-md rounded-lg border border-border/60 overflow-hidden shadow-lg">
      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-secondary/30">
        <div className="col-span-2 row-span-2 aspect-[4/3] relative overflow-hidden rounded-md">
          <img src={charchitBlackSuit} alt="Charchit Sharma in black suit" loading="eager" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square overflow-hidden rounded-md">
          <img src={charchitLeatherJacket1} alt="Charchit Sharma in leather jacket" loading="eager" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-square overflow-hidden rounded-md flex items-center justify-center">
          <img src={charchitAvatar} alt="Charchit Sharma animated avatar" loading="eager" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-2xl font-normal text-foreground mb-1">Charchit Sharma</h2>
        <p className="text-sm text-foreground/80 mb-1">Student, Developer & Aspiring Entrepreneur</p>
        <p className="text-xs text-google-blue flex items-center gap-1 mb-4">
          <MapPin className="w-3 h-3" /> Roorkee, Uttarakhand
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <button onClick={() => navigate("/wiki/charchit-sharma")} className="flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-colors bg-google-blue/20 hover:bg-google-blue/30 border border-google-blue/30">
            <Globe className="w-5 h-5 text-google-blue" />
            <span className="text-xs text-foreground/80">Wikipedia</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-colors bg-google-green/20 hover:bg-google-green/30 border border-google-green/30">
            <Share2 className="w-5 h-5 text-google-green" />
            <span className="text-xs text-foreground/80">Share</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-colors bg-google-yellow/20 hover:bg-google-yellow/30 border border-google-yellow/30">
            <Bookmark className="w-5 h-5 text-google-yellow" />
            <span className="text-xs text-foreground/80">Save</span>
          </button>
        </div>

        {/* Bio */}
        <p className="text-sm text-foreground/85 leading-relaxed mb-4">
          A 21-year-old builder from Roorkee with an insatiable hunger to learn. 
          Pursuing BS in Data Science at IIT Madras. Selected as a 2025 Aspire Leadership Program Scholar 
          (Harvard faculty-backed). He turns struggles into growth and dreams into reality.
        </p>

        {/* Details */}
        <div className="space-y-3 mb-4">
          {details.map(detail => <div key={detail.label} className="flex">
              <span className="text-sm text-google-blue w-24 flex-shrink-0">{detail.label}</span>
              <span className="text-sm text-foreground">{detail.value}</span>
            </div>)}
        </div>

        {/* Social Profiles */}
        <div className="mb-4">
          <span className="text-sm text-google-green block mb-2">Profiles</span>
          <div className="flex gap-3">
            {socialLinks.map(social => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-9 h-9 rounded-full flex items-center justify-center transition-colors bg-secondary/80 hover:bg-google-blue/30 border border-border/50">
                <social.icon className="w-4 h-4 text-foreground/80" />
              </a>)}
            <a href="https://x.com/heyimcharchit" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors bg-secondary/80 hover:bg-google-blue/30 border border-border/50">
              <svg className="w-4 h-4 text-foreground/80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => <span key={tag} className="px-3 py-1 text-xs rounded-full text-google-yellow cursor-pointer transition-colors bg-google-yellow/15 border border-google-yellow/30 hover:bg-google-yellow/25">
              {tag}
            </span>)}
        </div>
      </div>
    </div>;
};
export default KnowledgePanel;
