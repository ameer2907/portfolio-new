import { useEffect, useState } from "react";
import { Bus } from "lucide-react";

/**
 * A continuous winding road that runs through the entire page like a top-down driving game.
 * The road curves left and right with scenery, lane markings, and an animated bus.
 */
const GameRoad = () => {
  const [scrollY, setScrollY] = useState(0);
  const [docHeight, setDocHeight] = useState(1);

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY);
      setDocHeight(document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const progress = docHeight > 0 ? scrollY / docHeight : 0;

  // Generate the winding road SVG path segments
  // Each segment represents a curve between sections
  const segmentHeight = 600;
  const segments = 8;
  const totalH = segmentHeight * segments;
  const roadWidth = 50;

  // Build a continuous S-curve path
  const buildPath = () => {
    const points: string[] = [];
    const centerX = 400;
    const amplitude = 200; // How far the road swings left/right
    points.push(`M ${centerX} 0`);

    for (let i = 0; i < segments; i++) {
      const y1 = i * segmentHeight + segmentHeight * 0.33;
      const y2 = i * segmentHeight + segmentHeight * 0.66;
      const yEnd = (i + 1) * segmentHeight;
      const dir = i % 2 === 0 ? 1 : -1;
      const cx1 = centerX + amplitude * dir;
      const cx2 = centerX - amplitude * dir;
      points.push(`C ${cx1} ${y1}, ${cx2} ${y2}, ${centerX} ${yEnd}`);
    }
    return points.join(" ");
  };

  const pathD = buildPath();

  return (
    <div
      className="absolute inset-x-0 top-0 pointer-events-none hidden md:block"
      style={{ height: `${totalH}px`, zIndex: 1 }}
    >
      <svg
        width="100%"
        height={totalH}
        viewBox={`0 0 800 ${totalH}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 opacity-100"
      >
        {/* Road surface */}
        <path
          d={pathD}
          stroke="hsl(var(--muted))"
          strokeWidth={roadWidth}
          fill="none"
          strokeLinecap="round"
          opacity="0.2"
        />
        {/* Road edges - left */}
        <path
          d={pathD}
          stroke="hsl(var(--border))"
          strokeWidth={roadWidth + 4}
          fill="none"
          strokeLinecap="round"
          opacity="0.08"
        />
        {/* Center lane dashes */}
        <path
          d={pathD}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="2"
          fill="none"
          strokeDasharray="16 12"
          opacity="0.2"
        />
        {/* Glow progress trail */}
        <path
          id="game-road-path"
          d={pathD}
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="20000"
          strokeDashoffset={20000 - progress * 20000}
          className="transition-all duration-300"
          style={{ filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))" }}
        />

        {/* Scenery - trees along the road */}
        {Array.from({ length: segments }).map((_, i) => {
          const baseY = i * segmentHeight + segmentHeight * 0.5;
          const side = i % 2 === 0 ? 1 : -1;
          const treeX = 400 + (250 + 40) * side;
          return (
            <g key={`scenery-${i}`}>
              {/* Trees */}
              <g transform={`translate(${treeX}, ${baseY})`}>
                <rect x="-2" y="0" width="4" height="20" rx="2" fill="hsl(var(--primary))" opacity="0.08" />
                <circle cx="0" cy="-8" r="12" fill="hsl(var(--primary))" opacity="0.05" />
                <circle cx="-8" cy="-2" r="8" fill="hsl(var(--primary))" opacity="0.04" />
                <circle cx="8" cy="-2" r="8" fill="hsl(var(--primary))" opacity="0.04" />
              </g>
              {/* Lamp */}
              <g transform={`translate(${400 - (250 + 60) * side}, ${baseY - 100})`}>
                <rect x="-1" y="0" width="2" height="25" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.12" />
                <circle cx="0" cy="-4" r="4" fill="hsl(var(--primary))" opacity="0.1" />
                <circle cx="0" cy="-4" r="10" fill="hsl(var(--primary))" opacity="0.03" />
              </g>
              {/* Small buildings on alternating sides */}
              {i % 3 === 0 && (
                <g transform={`translate(${400 + (280) * -side}, ${baseY + 80})`}>
                  <rect x="-12" y="-20" width="24" height="30" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.2" />
                  <polygon points="-16,-20 0,-32 16,-20" fill="hsl(var(--primary))" opacity="0.06" />
                  <rect x="-3" y="-5" width="6" height="10" fill="hsl(var(--primary))" opacity="0.08" rx="1" />
                </g>
              )}
              {/* Road signs */}
              {i % 2 === 1 && (
                <g transform={`translate(${400 + (220) * side}, ${baseY + 150})`}>
                  <rect x="-1" y="0" width="2" height="18" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.15" />
                  <rect x="-10" y="-10" width="20" height="12" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.4" />
                  <text x="0" y="-2" textAnchor="middle" fill="hsl(var(--primary))" fontSize="5" opacity="0.5">
                    {["←", "→", "⚠"][i % 3]}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Animated bus on the main road */}
      <GameBus progress={progress} />
    </div>
  );
};

/** Bus that follows the game road path */
const GameBus = ({ progress }: { progress: number }) => {
  const [pos, setPos] = useState({ x: 400, y: 0, angle: 90 });

  useEffect(() => {
    const path = document.getElementById("game-road-path") as unknown as SVGPathElement;
    if (!path) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(progress * len);
    const d = 3;
    const p1 = path.getPointAtLength(Math.max(0, progress * len - d));
    const p2 = path.getPointAtLength(Math.min(len, progress * len + d));
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    setPos({ x: pt.x, y: pt.y, angle });
  }, [progress]);

  // Convert SVG coords to page-relative percentages
  const leftPct = (pos.x / 800) * 100;

  return (
    <div
      className="absolute pointer-events-none transition-all duration-500 ease-out z-20"
      style={{
        left: `${leftPct}%`,
        top: pos.y,
        transform: `translate(-50%, -50%) rotate(${pos.angle - 90}deg)`,
      }}
    >
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_24px_hsl(var(--primary)/0.7)] animate-bus-bounce">
        <Bus className="w-5 h-5 text-primary-foreground" />
      </div>
      {/* Exhaust trail */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
        <div className="w-1 h-1 rounded-full bg-primary/30 animate-pulse" />
        <div className="w-0.5 h-0.5 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: "0.2s" }} />
      </div>
    </div>
  );
};

export default GameRoad;
