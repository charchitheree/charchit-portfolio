import { MoreVertical } from "lucide-react";

const InstagramCard = () => {
  return (
    <div className="group">
      {/* URL breadcrumb */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">IG</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-muted-foreground">instagram.com</span>
          <span className="text-muted-foreground mx-1">›</span>
          <span className="text-muted-foreground">heyimcharchit</span>
        </div>
        <button className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Title */}
      <a 
        href="https://www.instagram.com/heyimcharchit/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl text-primary hover:underline block mb-1"
      >
        Charchit Sharma (@heyimcharchit) • Instagram photos and videos
      </a>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        <span className="text-card-foreground">8,607 Followers</span> · From Roorkee, Uttarakhand · 
        IIT Madras BS Data Science · ALP Scholar 2025 · 
        Bio: "Just a bhondu." Follow for tech, travel, and life updates.
      </p>
    </div>
  );
};

export default InstagramCard;
