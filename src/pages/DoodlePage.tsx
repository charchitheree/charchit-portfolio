import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Paintbrush, Eraser, Trash2, Download, ArrowLeft, 
  Circle, Square, Star, Heart, Sparkles
} from "lucide-react";
import SpaceBackground from "@/components/SpaceBackground";

const COLORS = [
  "#4285f4", "#ea4335", "#fbbc05", "#34a853", // Google colors
  "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", // Pastel
  "#ffeaa7", "#dfe6e9", "#fd79a8", "#a29bfe", // More pastel
  "#ffffff", "#000000"
];

const BRUSH_SIZES = [4, 8, 16, 24];

const STAMPS = [
  { icon: Star, name: "star" },
  { icon: Heart, name: "heart" },
  { icon: Circle, name: "circle" },
  { icon: Square, name: "square" },
  { icon: Sparkles, name: "sparkle" },
];

const DoodlePage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#4285f4");
  const [brushSize, setBrushSize] = useState(8);
  const [tool, setTool] = useState<"brush" | "eraser" | "stamp">("brush");
  const [selectedStamp, setSelectedStamp] = useState<string>("star");
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas size
    const updateSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPos(e);
    
    if (tool === "stamp") {
      drawStamp(pos.x, pos.y);
      return;
    }
    
    setIsDrawing(true);
    lastPos.current = pos;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPos.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    
    const pos = getPos(e);
    
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === "eraser" ? "#1a1a2e" : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    
    lastPos.current = pos;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const drawStamp = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(x, y);
    
    const size = brushSize * 2;
    
    switch (selectedStamp) {
      case "star":
        drawStar(ctx, 0, 0, 5, size, size / 2);
        break;
      case "heart":
        drawHeart(ctx, 0, 0, size);
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "square":
        ctx.fillRect(-size / 2, -size / 2, size, size);
        break;
      case "sparkle":
        drawSparkle(ctx, 0, 0, size);
        break;
    }
    
    ctx.restore();
  };

  const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  };

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.75, x, y + size);
    ctx.bezierCurveTo(x, y + size * 0.75, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
    ctx.fill();
  };

  const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 2);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 8, 0);
      ctx.lineTo(0, size / 2);
      ctx.lineTo(-size / 8, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement("a");
    link.download = "charchit-doodle.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <SpaceBackground />
      <div className="scanlines" />

      {/* Header */}
      <header className="flex items-center justify-between p-4 backdrop-blur-md bg-card/60 border-b border-border/50 relative z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 font-pixel text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        
        <h1 className="font-pixel text-sm">
          <span className="text-google-blue">D</span>
          <span className="text-google-red">o</span>
          <span className="text-google-yellow">o</span>
          <span className="text-google-green">d</span>
          <span className="text-google-blue">l</span>
          <span className="text-google-red">e</span>
        </h1>
        
        <div className="flex gap-2">
          <button
            onClick={clearCanvas}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            title="Clear"
          >
            <Trash2 className="w-4 h-4 text-google-red" />
          </button>
          <button
            onClick={downloadCanvas}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4 text-google-green" />
          </button>
        </div>
      </header>

      {/* Canvas Area */}
      <main className="flex-1 relative">
        <div className="absolute inset-0 p-4">
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-lg cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      </main>

      {/* Toolbar */}
      <footer className="backdrop-blur-md bg-card/60 border-t border-border/50 p-4 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Tools */}
          <div className="flex gap-1 p-1 bg-secondary rounded-lg">
            <button
              onClick={() => setTool("brush")}
              className={`p-2 rounded transition-colors ${tool === "brush" ? "bg-google-blue text-white" : "hover:bg-card"}`}
            >
              <Paintbrush className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTool("eraser")}
              className={`p-2 rounded transition-colors ${tool === "eraser" ? "bg-google-blue text-white" : "hover:bg-card"}`}
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>

          {/* Stamps */}
          <div className="flex gap-1 p-1 bg-secondary rounded-lg">
            {STAMPS.map((stamp) => (
              <button
                key={stamp.name}
                onClick={() => { setTool("stamp"); setSelectedStamp(stamp.name); }}
                className={`p-2 rounded transition-colors ${tool === "stamp" && selectedStamp === stamp.name ? "bg-google-yellow text-black" : "hover:bg-card"}`}
              >
                <stamp.icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          {/* Colors */}
          <div className="flex gap-1 flex-wrap max-w-[200px]">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? "border-white scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Brush Size */}
          <div className="flex gap-1 p-1 bg-secondary rounded-lg">
            {BRUSH_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setBrushSize(size)}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${brushSize === size ? "bg-google-green text-white" : "hover:bg-card"}`}
              >
                <div
                  className="rounded-full bg-current"
                  style={{ width: size / 2, height: size / 2 }}
                />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DoodlePage;