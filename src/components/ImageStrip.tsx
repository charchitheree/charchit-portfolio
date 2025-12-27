const images = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80",
    alt: "Mountain landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&q=80",
    alt: "Lake reflection",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=80",
    alt: "Forest path",
  },
  {
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=200&q=80",
    alt: "Nature scenery",
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
