/**
 * Dramatic road connectors between journey stops with curves, hills, and scenery
 */

const sceneryItems = {
  trees: (x: number, flip?: boolean) => (
    <g transform={`translate(${x}, 0)${flip ? ' scale(-1,1)' : ''}`}>
      <rect x="-2" y="40" width="4" height="20" fill="hsl(var(--primary))" opacity="0.15" rx="1" />
      <circle cx="0" cy="32" r="10" fill="hsl(var(--primary))" opacity="0.08" />
      <circle cx="-6" cy="36" r="7" fill="hsl(var(--primary))" opacity="0.06" />
      <circle cx="6" cy="36" r="7" fill="hsl(var(--primary))" opacity="0.06" />
    </g>
  ),
  lamppost: (x: number) => (
    <g transform={`translate(${x}, 0)`}>
      <rect x="-1" y="20" width="2" height="40" fill="hsl(var(--muted-foreground))" opacity="0.2" rx="1" />
      <circle cx="0" cy="18" r="4" fill="hsl(var(--primary))" opacity="0.15" />
      <circle cx="0" cy="18" r="8" fill="hsl(var(--primary))" opacity="0.05" />
    </g>
  ),
  sign: (x: number, text: string) => (
    <g transform={`translate(${x}, 0)`}>
      <rect x="-1" y="30" width="2" height="30" fill="hsl(var(--muted-foreground))" opacity="0.2" rx="1" />
      <rect x="-18" y="20" width="36" height="14" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.6" />
      <text x="0" y="30" textAnchor="middle" fill="hsl(var(--primary))" fontSize="6" fontFamily="sans-serif" opacity="0.7">{text}</text>
    </g>
  ),
  house: (x: number) => (
    <g transform={`translate(${x}, 0)`}>
      <rect x="-10" y="35" width="20" height="25" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
      <polygon points="-14,35 0,22 14,35" fill="hsl(var(--primary))" opacity="0.1" />
      <rect x="-3" y="45" width="6" height="10" fill="hsl(var(--primary))" opacity="0.1" rx="1" />
      <rect x="4" y="38" width="4" height="4" fill="hsl(var(--primary))" opacity="0.15" rx="0.5" />
    </g>
  ),
};

const RoadConnector = ({
  direction = "left",
  variant = "curve",
  label,
  distance,
}: {
  direction?: "left" | "right";
  variant?: "curve" | "hill" | "hairpin" | "bridge" | "zigzag";
  label?: string;
  distance?: string;
}) => {
  const isLeft = direction === "left";

  const paths: Record<string, { road: string; height: number }> = {
    curve: {
      road: isLeft
        ? "M 400 0 C 400 40, 180 50, 150 80 C 120 110, 300 130, 400 160"
        : "M 400 0 C 400 40, 620 50, 650 80 C 680 110, 500 130, 400 160",
      height: 160,
    },
    hill: {
      road: isLeft
        ? "M 400 0 C 400 20, 350 30, 300 60 C 250 90, 200 50, 200 80 C 200 110, 350 130, 400 160"
        : "M 400 0 C 400 20, 450 30, 500 60 C 550 90, 600 50, 600 80 C 600 110, 450 130, 400 160",
      height: 160,
    },
    hairpin: {
      road: isLeft
        ? "M 400 0 C 400 30, 150 20, 120 70 C 90 120, 250 110, 350 130 C 450 150, 500 170, 400 200"
        : "M 400 0 C 400 30, 650 20, 680 70 C 710 120, 550 110, 450 130 C 350 150, 300 170, 400 200",
      height: 200,
    },
    bridge: {
      road: "M 400 0 C 400 30, 400 40, 400 60 L 400 80 C 400 100, 400 120, 400 140",
      height: 140,
    },
    zigzag: {
      road: isLeft
        ? "M 400 0 C 400 25, 250 30, 200 55 C 150 80, 350 85, 500 100 C 650 115, 450 140, 400 180"
        : "M 400 0 C 400 25, 550 30, 600 55 C 650 80, 450 85, 300 100 C 150 115, 350 140, 400 180",
      height: 180,
    },
  };

  const { road, height } = paths[variant] || paths.curve;

  return (
    <div className="relative overflow-hidden hidden md:block" style={{ height }}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 800 ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        {/* Road surface */}
        <path d={road} stroke="hsl(var(--muted))" strokeWidth="32" fill="none" strokeLinecap="round" opacity="0.25" />
        {/* Road edges */}
        <path d={road} stroke="hsl(var(--border))" strokeWidth="34" fill="none" strokeLinecap="round" opacity="0.1" />
        {/* Center lane */}
        <path d={road} stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" strokeDasharray="10 8" opacity="0.25" />
        {/* Glow trail */}
        <path d={road} stroke="hsl(var(--primary))" strokeWidth="3" fill="none" opacity="0.12" style={{ filter: "blur(4px)" }} />

        {/* Bridge pillars */}
        {variant === "bridge" && (
          <>
            <rect x="385" y="50" width="4" height="40" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.15" />
            <rect x="411" y="50" width="4" height="40" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.15" />
            <path d="M 380 55 Q 400 45 420 55" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" opacity="0.2" />
          </>
        )}

        {/* Scenery */}
        <g transform={`translate(0, ${height * 0.15})`}>
          {isLeft ? (
            <>
              {sceneryItems.trees(620)}
              {sceneryItems.lamppost(550)}
              {sceneryItems.trees(700, true)}
              {variant === "hairpin" && sceneryItems.house(680)}
              {variant === "zigzag" && sceneryItems.sign(150, "SLOW")}
            </>
          ) : (
            <>
              {sceneryItems.trees(180)}
              {sceneryItems.lamppost(250)}
              {sceneryItems.trees(100, true)}
              {variant === "hairpin" && sceneryItems.house(120)}
              {variant === "zigzag" && sceneryItems.sign(650, "CURVE")}
            </>
          )}
        </g>
      </svg>

      {/* Distance marker */}
      {distance && (
        <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? "right-[10%]" : "left-[10%]"}`}>
          <div className="glass rounded-lg px-3 py-1.5 text-[10px] font-heading text-primary/70 border border-primary/10">
            {distance}
          </div>
        </div>
      )}

      {/* Road label */}
      {label && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <span className="text-[9px] text-muted-foreground/50 font-heading tracking-wider uppercase">{label}</span>
        </div>
      )}

      {/* Animated particles along the road */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute w-1 h-1 rounded-full bg-primary/30 animate-pulse ${isLeft ? "left-[30%] top-[40%]" : "right-[30%] top-[40%]"}`} />
        <div className={`absolute w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse ${isLeft ? "left-[45%] top-[70%]" : "right-[45%] top-[70%]"}`} style={{ animationDelay: "0.5s" }} />
      </div>
    </div>
  );
};

export default RoadConnector;
