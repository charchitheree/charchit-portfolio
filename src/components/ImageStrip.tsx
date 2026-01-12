import { useState } from "react";
import charchitAvatar from "@/assets/charchit-avatar.gif";
import charchitBlackSuit from "@/assets/charchit-black-suit.jpg";
import charchitLeatherJacket1 from "@/assets/charchit-leather-jacket-1.jpg";
import charchitLeatherJacket2 from "@/assets/charchit-leather-jacket-2.jpg";
import charchitHoodie from "@/assets/charchit-hoodie.jpg";

const images = [
  {
    src: charchitBlackSuit,
    alt: "Charchit in black suit",
  },
  {
    src: charchitLeatherJacket1,
    alt: "Charchit in leather jacket",
  },
  {
    src: charchitLeatherJacket2,
    alt: "Charchit in leather jacket pose 2",
  },
  {
    src: charchitHoodie,
    alt: "Charchit in hoodie",
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
    <div className="bg-card/90 backdrop-blur-md border border-border/50 rounded-lg p-3 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <p className="text-sm text-foreground/80 font-medium">Images for charchit sharma</p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity bg-secondary border border-border/30"
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
        <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-secondary/50 border border-border/30 flex items-center justify-center cursor-pointer hover:bg-secondary transition-colors">
          <span className="text-xs text-google-blue font-medium">View all</span>
        </div>
      </div>
      <p className="text-xs text-foreground/50 mt-2 italic">
        💫 psst... camera shy user, some pics AI-enhanced ✨
      </p>
    </div>
  );
};

export default ImageStrip;
