/**
 * Decorative road connector between sections with curves and scenery
 */
const RoadConnector = ({
  direction = "left",
  variant = "curve",
}: {
  direction?: "left" | "right";
  variant?: "curve" | "zigzag" | "straight";
}) => {
  const isLeft = direction === "left";

  if (variant === "straight") {
    return (
      <div className="relative h-24 flex justify-center">
        <div className="w-1 h-full bg-gradient-to-b from-primary/40 to-primary/10 rounded-full" />
        {/* Road dashes */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-px h-full border-l border-dashed border-primary/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-32 overflow-hidden hidden md:block">
      <svg
        width="100%"
        height="128"
        viewBox="0 0 800 128"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        {/* Road path */}
        <path
          d={
            isLeft
              ? "M 400 0 C 400 30, 250 40, 200 64 C 150 88, 400 98, 400 128"
              : "M 400 0 C 400 30, 550 40, 600 64 C 650 88, 400 98, 400 128"
          }
          stroke="hsl(var(--muted))"
          strokeWidth="24"
          fill="none"
          strokeLinecap="round"
          opacity="0.3"
        />
        {/* Center lane marking */}
        <path
          d={
            isLeft
              ? "M 400 0 C 400 30, 250 40, 200 64 C 150 88, 400 98, 400 128"
              : "M 400 0 C 400 30, 550 40, 600 64 C 650 88, 400 98, 400 128"
          }
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          fill="none"
          strokeDasharray="8 8"
          opacity="0.3"
        />
        {/* Glow trail */}
        <path
          d={
            isLeft
              ? "M 400 0 C 400 30, 250 40, 200 64 C 150 88, 400 98, 400 128"
              : "M 400 0 C 400 30, 550 40, 600 64 C 650 88, 400 98, 400 128"
          }
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          fill="none"
          opacity="0.15"
          style={{ filter: "blur(3px)" }}
        />
      </svg>

      {/* Scenery elements */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? "right-[15%]" : "left-[15%]"}`}
      >
        <div className="flex gap-3 items-end opacity-20">
          <div className="w-1 h-6 bg-primary/40 rounded-full" />
          <div className="w-1 h-10 bg-primary/30 rounded-full" />
          <div className="w-1 h-4 bg-primary/50 rounded-full" />
        </div>
      </div>
      <div
        className={`absolute top-1/3 ${isLeft ? "left-[20%]" : "right-[20%]"}`}
      >
        <div className="w-2 h-2 rounded-full bg-primary/10 animate-pulse" />
      </div>
    </div>
  );
};

export default RoadConnector;
