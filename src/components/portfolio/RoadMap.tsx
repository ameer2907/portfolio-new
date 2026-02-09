import { Bus, MapPin, Flag } from "lucide-react";
import useScrollSpy from "@/hooks/useScrollSpy";

const stops = [
  { id: "hero", label: "Depot", emoji: "🏁" },
  { id: "education", label: "Education", emoji: "📚" },
  { id: "skills", label: "Skills", emoji: "🛠️" },
  { id: "certifications", label: "Certs", emoji: "📜" },
  { id: "projects", label: "Projects", emoji: "🚀" },
  { id: "experience", label: "Experience", emoji: "💼" },
  { id: "future", label: "Destination", emoji: "🎯" },
  { id: "contact", label: "Contact", emoji: "📬" },
];

const RoadMap = () => {
  const { scrollProgress, activeSection } = useScrollSpy(stops.map((s) => s.id));

  // SVG winding path coordinates for a curvy road
  // Path goes top to bottom with S-curves
  const pathHeight = 520;
  const pathD = `
    M 40 10
    C 40 40, 70 60, 70 80
    C 70 100, 30 120, 30 140
    C 30 160, 70 180, 70 200
    C 70 220, 30 240, 30 260
    C 30 280, 70 300, 70 320
    C 70 340, 30 360, 30 380
    C 30 400, 70 420, 70 440
    C 70 460, 40 490, 40 510
  `;

  // Calculate stop positions along the path (evenly distributed)
  const stopPositions = stops.map((_, i) => ({
    t: i / (stops.length - 1),
  }));

  // Get point on path at a given percentage
  const getPointOnPath = (progress: number) => {
    const svg = document.getElementById("road-svg");
    if (!svg) return { x: 40, y: 10 };
    const path = svg.querySelector("path#road-path") as SVGPathElement;
    if (!path) return { x: 40, y: 10 };
    const length = path.getTotalLength();
    const point = path.getPointAtLength(length * Math.min(1, Math.max(0, progress)));
    return { x: point.x, y: point.y };
  };

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      <div className="relative" style={{ width: 100, height: pathHeight }}>
        <svg
          id="road-svg"
          width="100"
          height={pathHeight}
          viewBox={`0 0 100 ${pathHeight}`}
          fill="none"
          className="absolute inset-0"
        >
          {/* Road background (dashed center line) */}
          <path
            d={pathD}
            stroke="hsl(var(--muted))"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          {/* Road edge lines */}
          <path
            d={pathD}
            stroke="hsl(var(--border))"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
          {/* Center dashes */}
          <path
            d={pathD}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="6 6"
            fill="none"
            opacity="0.4"
          />
          {/* Progress glow trail */}
          <path
            id="road-path"
            d={pathD}
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-500"
            strokeDasharray="1000"
            strokeDashoffset={1000 - (scrollProgress / 100) * 1000}
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))" }}
          />

          {/* Stop markers */}
          {stops.map((stop, i) => {
            const progress = i / (stops.length - 1);
            // Pre-calculated approximate positions on the S-curve path
            const positions = [
              { x: 40, y: 10 },
              { x: 70, y: 80 },
              { x: 30, y: 140 },
              { x: 70, y: 200 },
              { x: 30, y: 260 },
              { x: 70, y: 320 },
              { x: 30, y: 380 },
              { x: 70, y: 440 },
            ];
            const pos = positions[i];
            const isActive = activeSection === stop.id;
            const isPassed = scrollProgress / 100 >= progress - 0.02;

            return (
              <g key={stop.id}>
                {/* Stop circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 8 : 6}
                  fill={isPassed ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  stroke={isActive ? "hsl(var(--primary))" : "transparent"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                  style={isActive ? { filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.8))" } : {}}
                />
                {/* Inner dot for active */}
                {isActive && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={3}
                    fill="hsl(var(--primary-foreground))"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Labels on alternating sides */}
        {stops.map((stop, i) => {
          const positions = [
            { x: 40, y: 10 },
            { x: 70, y: 80 },
            { x: 30, y: 140 },
            { x: 70, y: 200 },
            { x: 30, y: 260 },
            { x: 70, y: 320 },
            { x: 30, y: 380 },
            { x: 70, y: 440 },
          ];
          const pos = positions[i];
          const isRight = pos.x > 50;
          const isActive = activeSection === stop.id;

          return (
            <button
              key={stop.id}
              onClick={() => document.getElementById(stop.id)?.scrollIntoView({ behavior: "smooth" })}
              className={`absolute text-[10px] font-heading whitespace-nowrap transition-all duration-300 hover:text-primary ${
                isActive ? "text-primary font-semibold scale-110" : "text-muted-foreground"
              }`}
              style={{
                top: pos.y - 6,
                ...(isRight ? { right: 4 } : { left: -4 }),
              }}
            >
              <span className="mr-0.5">{stop.emoji}</span>
              {stop.label}
            </button>
          );
        })}

        {/* Animated Bus on the path */}
        <BusOnPath progress={scrollProgress} pathD={pathD} pathHeight={pathHeight} />
      </div>

      {/* Journey percentage */}
      <div className="mt-3 flex flex-col items-center">
        <span className="text-xs text-primary font-heading font-bold">
          {Math.round(scrollProgress)}%
        </span>
        <span className="text-[9px] text-muted-foreground">journey</span>
      </div>
    </div>
  );
};

// Bus component that moves along the SVG path
const BusOnPath = ({
  progress,
  pathD,
  pathHeight,
}: {
  progress: number;
  pathD: string;
  pathHeight: number;
}) => {
  // We need to compute position on mount and on progress change
  // Using a ref approach for the SVG path
  const getPosition = () => {
    const path = document.querySelector("#road-path") as SVGPathElement;
    if (!path) {
      // Fallback linear interpolation
      return { x: 40, y: 10 + (progress / 100) * (pathHeight - 20), angle: 0 };
    }
    const length = path.getTotalLength();
    const point = path.getPointAtLength((progress / 100) * length);

    // Get angle from nearby points
    const delta = 2;
    const p1 = path.getPointAtLength(Math.max(0, (progress / 100) * length - delta));
    const p2 = path.getPointAtLength(Math.min(length, (progress / 100) * length + delta));
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

    return { x: point.x, y: point.y, angle };
  };

  const pos = getPosition();

  return (
    <div
      className="absolute pointer-events-none transition-all duration-500 ease-out"
      style={{
        left: pos.x - 14,
        top: pos.y - 14,
        transform: `rotate(${pos.angle - 90}deg)`,
      }}
    >
      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-[0_0_16px_hsl(var(--primary)/0.6)]">
        <Bus className="w-3.5 h-3.5 text-primary-foreground" />
      </div>
    </div>
  );
};

export default RoadMap;
