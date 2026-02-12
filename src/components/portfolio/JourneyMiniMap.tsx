import { motion } from "framer-motion";
import { Bus, MapPin } from "lucide-react";

const stops = [
  { id: "hero", label: "Depot", emoji: "🏁", color: "hsl(190,100%,50%)" },
  { id: "education", label: "Education", emoji: "📚", color: "hsl(160,84%,45%)" },
  { id: "skills", label: "Skills", emoji: "🛠️", color: "hsl(38,92%,55%)" },
  { id: "certifications", label: "Certs", emoji: "📜", color: "hsl(280,80%,65%)" },
  { id: "projects", label: "Projects", emoji: "🚀", color: "hsl(350,89%,60%)" },
  { id: "experience", label: "Experience", emoji: "💼", color: "hsl(199,89%,55%)" },
  { id: "future", label: "Destination", emoji: "🎯", color: "hsl(38,92%,50%)" },
  { id: "contact", label: "Contact", emoji: "📬", color: "hsl(190,100%,50%)" },
];

const positions = [
  { x: 55, y: 20 },
  { x: 85, y: 75 },
  { x: 20, y: 135 },
  { x: 85, y: 195 },
  { x: 20, y: 255 },
  { x: 85, y: 315 },
  { x: 20, y: 375 },
  { x: 55, y: 435 },
];

const pathHeight = 460;
const pathD = `
  M 55 20
  C 55 40, 85 55, 85 75
  C 85 95, 20 110, 20 135
  C 20 155, 85 170, 85 195
  C 85 215, 20 230, 20 255
  C 20 275, 85 290, 85 315
  C 85 335, 20 350, 20 375
  C 20 400, 55 415, 55 435
`;

interface JourneyMiniMapProps {
  scrollProgress: number;
  activeSection: string;
}

const JourneyMiniMap = ({ scrollProgress, activeSection }: JourneyMiniMapProps) => {
  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      <div className="glass-vibrant rounded-2xl p-2 pb-3" style={{ width: 130 }}>
        <div className="relative" style={{ width: 115, height: pathHeight }}>
          <svg width="115" height={pathHeight} viewBox={`0 0 115 ${pathHeight}`} fill="none" className="absolute inset-0">
            {/* Road */}
            <path d={pathD} stroke="hsl(var(--border))" strokeWidth="16" strokeLinecap="round" fill="none" opacity="0.12" />
            <path d={pathD} stroke="hsl(var(--muted))" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.5" />
            <path d={pathD} stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="5 5" fill="none" opacity="0.2" />

            {/* Progress trail - gradient */}
            <path
              id="minimap-path"
              d={pathD}
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="1200"
              strokeDashoffset={1200 - (scrollProgress / 100) * 1200}
              className="transition-all duration-700"
              style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.6))" }}
            />

            {/* Stop markers */}
            {stops.map((stop, i) => {
              const pos = positions[i];
              const isActive = activeSection === stop.id;
              const progress = i / (stops.length - 1);
              const isPassed = scrollProgress / 100 >= progress - 0.02;

              return (
                <g key={stop.id}>
                  {isActive && (
                    <motion.circle
                      cx={pos.x} cy={pos.y} r={14}
                      fill={stop.color} opacity={0.15}
                      animate={{ r: [14, 19, 14], opacity: [0.15, 0.06, 0.15] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <circle
                    cx={pos.x} cy={pos.y}
                    r={isActive ? 8 : 5}
                    fill={isPassed ? stop.color : "hsl(var(--muted))"}
                    stroke={isActive ? stop.color : "transparent"}
                    strokeWidth="2"
                    className="transition-all duration-300"
                    style={isActive ? { filter: `drop-shadow(0 0 8px ${stop.color})` } : {}}
                  />
                  {isActive && <circle cx={pos.x} cy={pos.y} r={3} fill="hsl(var(--background))" />}
                </g>
              );
            })}
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
                  isActive ? "font-semibold scale-110" : "text-muted-foreground"
                }`}
                style={{
                  top: pos.y - 6,
                  color: isActive ? stop.color : undefined,
                  ...(isRight ? { right: 2 } : { left: -2 }),
                }}
              >
                <span className="mr-0.5">{stop.emoji}</span>
                {stop.label}
              </button>
            );
          })}

          <MiniMapBus progress={scrollProgress} />
        </div>

        {/* Progress counter */}
        <motion.div
          className="mt-2 flex flex-col items-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary" />
            <span className="text-sm text-primary font-heading font-bold">{Math.round(scrollProgress)}%</span>
          </div>
          <span className="text-[9px] text-muted-foreground">journey progress</span>
        </motion.div>
      </div>
    </div>
  );
};

const MiniMapBus = ({ progress }: { progress: number }) => {
  const getPosition = () => {
    const path = document.querySelector("#minimap-path") as SVGPathElement;
    if (!path) return { x: 55, y: 20, angle: 90 };
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
    <motion.div
      className="absolute pointer-events-none"
      animate={{ left: pos.x - 12, top: pos.y - 12, rotate: pos.angle - 90 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-[hsl(210,100%,55%)] flex items-center justify-center shadow-[0_0_14px_hsl(var(--primary)/0.6)]">
        <Bus className="w-3 h-3 text-primary-foreground" />
      </div>
    </motion.div>
  );
};

export default JourneyMiniMap;
