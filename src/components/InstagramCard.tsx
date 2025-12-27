import { MoreVertical } from "lucide-react";

const InstagramCard = () => {
  return (
    <div className="group bg-card/90 backdrop-blur-md border border-border/50 rounded-lg p-4 shadow-lg">
      {/* URL breadcrumb */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">IG</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-foreground/60">instagram.com</span>
          <span className="text-foreground/40 mx-1">›</span>
          <span className="text-foreground/60">heyimcharchit</span>
        </div>
        <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-4 h-4 text-foreground/50" />
        </button>
      </div>

      {/* Title */}
      <a 
        href="https://www.instagram.com/heyimcharchit/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg text-google-blue hover:underline block mb-2 font-medium"
      >
        Charchit Sharma (@heyimcharchit) • Instagram
      </a>

      {/* Description */}
      <p className="text-sm text-foreground/70 leading-relaxed">
        <span className="text-google-green font-medium">8,607 Followers</span> · From Roorkee, Uttarakhand · 
        IIT Madras BS Data Science · ALP Scholar 2025 · 
        Bio: "Just a bhondu."
      </p>
    </div>
  );
};

export default InstagramCard;
