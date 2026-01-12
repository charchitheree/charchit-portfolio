import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Grid, ArrowLeft } from "lucide-react";
import charchitBlackSuit from "@/assets/charchit-black-suit.jpg";
import charchitLeatherJacket1 from "@/assets/charchit-leather-jacket-1.jpg";
import charchitLeatherJacket2 from "@/assets/charchit-leather-jacket-2.jpg";
import charchitHoodie from "@/assets/charchit-hoodie.jpg";
import charchitAvatar from "@/assets/charchit-avatar.gif";

const images = [
  {
    src: charchitBlackSuit,
    alt: "Charchit Sharma in formal black suit",
    caption: "The Builder - Formal Look 2025",
  },
  {
    src: charchitLeatherJacket1,
    alt: "Charchit Sharma in leather jacket with red embroidery",
    caption: "Street Style - Leather Jacket Look",
  },
  {
    src: charchitLeatherJacket2,
    alt: "Charchit Sharma leather jacket pose 2",
    caption: "Street Fashion Portrait",
  },
  {
    src: charchitHoodie,
    alt: "Charchit Sharma in college hoodie",
    caption: "Campus Life - Casual Vibes",
  },
  {
    src: charchitAvatar,
    alt: "Charchit Sharma animated avatar",
    caption: "Digital Avatar - 8-bit Style",
  },
];

const PhotoGallery = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = (index: number) => {
    setSelectedIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setSelectedIndex(null);
  };

  const goToPrevious = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  }, [selectedIndex]);

  const goToNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      
      if (e.key === "Escape") closeFullscreen();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, goToPrevious, goToNext]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="h-6 w-px bg-border/50" />
            <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Grid className="w-5 h-5 text-google-blue" />
              Photo Gallery
            </h1>
          </div>
          <p className="text-sm text-foreground/60">{images.length} photos</p>
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => openFullscreen(index)}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer bg-secondary/30 border border-border/30 hover:border-google-blue/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-google-blue/10"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-sm font-medium">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <p className="text-foreground/50 text-sm italic">
            💫 Click any photo to view in fullscreen • Use arrow keys to navigate
          </p>
        </div>
      </main>

      {/* Fullscreen Modal */}
      {isFullscreen && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* Close Button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center relative px-16">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Image */}
            <div className="max-w-4xl max-h-[70vh] flex flex-col items-center">
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
              />
              <p className="mt-4 text-white text-lg font-medium">
                {images[selectedIndex].caption}
              </p>
              <p className="text-white/50 text-sm mt-1">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="py-4 px-8 bg-black/50 backdrop-blur-md">
            <div className="flex justify-center gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === selectedIndex
                      ? "border-google-blue scale-110 shadow-lg shadow-google-blue/30"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
