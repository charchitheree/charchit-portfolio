import { useState } from "react";
import charchitPortrait from "@/assets/charchit-portrait.png";
import charchitEvent from "@/assets/charchit-event.jpg";
import charchitAvatar from "@/assets/charchit-avatar.gif";

const images = [
  {
    src: charchitPortrait,
    alt: "Charchit portrait",
  },
  {
    src: charchitEvent,
    alt: "Charchit at event",
  },
  {
    src: charchitAvatar,
    alt: "Charchit avatar",
  },
];

const ImageStrip = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <p className="text-sm text-muted-foreground">Images for charchit sharma</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity bg-secondary"
          >
            {!loadedImages.has(index) && (
              <div className="w-full h-full skeleton animate-pulse" />
            )}
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              onLoad={() => handleImageLoad(index)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        ))}
        <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-accent flex items-center justify-center cursor-pointer hover:bg-accent/80 transition-colors">
          <span className="text-xs text-primary">View all</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground/60 mt-1 italic">
        💫 psst... camera shy user, some pics AI-enhanced ✨
      </p>
    </div>
  );
};

export default ImageStrip;
