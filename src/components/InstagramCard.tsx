import { MoreVertical } from "lucide-react";

const InstagramCard = () => {
  return (
    <div className="group">
      {/* URL breadcrumb */}
      <div className="flex items-center gap-2 mb-1">
        <img 
          src="https://www.instagram.com/favicon.ico" 
          alt="Instagram" 
          className="w-4 h-4 rounded-sm"
        />
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
        href="https://www.instagram.com/heyimcharchit"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl text-primary hover:underline block mb-1"
      >
        Charchit Sharma (@heyimcharchit) • Instagram photos and videos
      </a>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        <span className="text-card-foreground">8,607 Followers</span> · Student at IIT Madras · Harvard ALP Scholar · 
        Bio: "Just a bhondu." Follow for travel, tech, and life updates.
      </p>
    </div>
  );
};

export default InstagramCard;
