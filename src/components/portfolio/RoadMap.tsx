import { Bus } from "lucide-react";
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

// Pre-calculated positions on the winding path
const positions = [
  { x: 50, y: 15 },
  { x: 80, y: 80 },
  { x: 20, y: 150 },
  { x: 80, y: 220 },
  { x: 20, y: 290 },
  { x: 80, y: 360 },
  { x: 20, y: 430 },
  { x: 50, y: 500 },
];

const pathHeight = 520;
const pathD = `
  M 50 15
  C 50 35, 80 55, 80 80
  C 80 105, 20 120, 20 150
  C 20 175, 80 190, 80 220
  C 80 245, 20 260, 20 290
  C 20 315, 80 330, 80 360
  C 80 385, 20 400, 20 430
  C 20 455, 50 480, 50 500
`;

const RoadMap = () => {
  const { scrollProgress, activeSection } = useScrollSpy(stops.map((s) => s.id));

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      <div className="relative" style={{ width: 110, height: pathHeight }}>
        <svg
          id="road-svg"
          width="110"
          height={pathHeight}
          viewBox={`0 0 110 ${pathHeight}`}
          fill="none"
          className="absolute inset-0"
        >
          {/* Road surface */}
          <path d={pathD} stroke="hsl(var(--muted))" strokeWidth="14" strokeLinecap="round" fill="none" />
          {/* Road edges */}
          <path d={pathD} stroke="hsl(var(--border))" strokeWidth="16" strokeLinecap="round" fill="none" opacity="0.2" />
          {/* Center dashes */}
          <path d={pathD} stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 5" fill="none" opacity="0.3" />
          {/* Progress glow */}
          <path
            id="road-path"
            d={pathD}
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-700"
            strokeDasharray="1000"
            strokeDashoffset={1000 - (scrollProgress / 100) * 1000}
            style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))" }}
          />

          {/* Stop markers */}
          {stops.map((stop, i) => {
            const pos = positions[i];
            const progress = i / (stops.length - 1);
            const isActive = activeSection === stop.id;
            const isPassed = scrollProgress / 100 >= progress - 0.02;

            return (
              <g key={stop.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isActive ? 9 : 5}
                  fill={isPassed ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  stroke={isActive ? "hsl(var(--primary))" : "transparent"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                  style={isActive ? { filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.8))" } : {}}
                />
                {isActive && (
                  <circle cx={pos.x} cy={pos.y} r={3} fill="hsl(var(--primary-foreground))" />
                )}
              </g>
            );
          })}

          {/* Tiny scenery decorations */}
          <circle cx="5" cy="115" r="3" fill="hsl(var(--primary))" opacity="0.06" />
          <rect x="95" y="185" width="3" height="12" rx="1" fill="hsl(var(--primary))" opacity="0.08" />
          <circle cx="100" y="180" r="5" fill="hsl(var(--primary))" opacity="0.04" />
          <rect x="5" y="340" width="2" height="15" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.1" />
          <circle cx="6" cy="335" r="3" fill="hsl(var(--primary))" opacity="0.08" />
        </svg>

        {/* Labels */}
        {stops.map((stop, i) => {
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
                ...(isRight ? { right: 4 } : { left: -2 }),
              }}
            >
              <span className="mr-0.5">{stop.emoji}</span>
              {stop.label}
            </button>
          );
        })}

        {/* Bus */}
        <BusOnPath progress={scrollProgress} />
      </div>

      <div className="mt-3 flex flex-col items-center">
        <span className="text-xs text-primary font-heading font-bold">{Math.round(scrollProgress)}%</span>
        <span className="text-[9px] text-muted-foreground">journey</span>
      </div>
    </div>
  );
};

const BusOnPath = ({ progress }: { progress: number }) => {
  const getPosition = () => {
    const path = document.querySelector("#road-path") as SVGPathElement;
    if (!path) return { x: 50, y: 15, angle: 90 };
    const length = path.getTotalLength();
    const point = path.getPointAtLength((progress / 100) * length);
    const delta = 2;
    const p1 = path.getPointAtLength(Math.max(0, (progress / 100) * length - delta));
    const p2 = path.getPointAtLength(Math.min(length, (progress / 100) * length + delta));
    const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    return { x: point.x, y: point.y, angle };
  };

  const pos = getPosition();

  return (
    <div
      className="absolute pointer-events-none transition-all duration-700 ease-out"
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
