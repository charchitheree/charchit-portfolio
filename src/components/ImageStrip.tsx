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
  return (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground mb-3">Images for charchit sharma</p>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="flex-shrink-0 w-28 h-28 rounded-lg bg-accent flex items-center justify-center cursor-pointer hover:bg-accent/80 transition-colors">
          <span className="text-sm text-primary">View all</span>
        </div>
      </div>
    </div>
  );
};

export default ImageStrip;
