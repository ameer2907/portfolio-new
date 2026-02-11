import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bus } from "lucide-react";

interface BusJourneyEngineProps {
  activeStopIndex: number;
  scrollProgress: number;
}

/**
 * Full-page winding SVG road with a Framer Motion animated bus.
 * The road curves left and right with scenery decorations.
 * The bus follows the path based on scroll progress with smooth spring physics.
 */
const BusJourneyEngine = ({ activeStopIndex, scrollProgress }: BusJourneyEngineProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [busPos, setBusPos] = useState({ x: 400, y: 50, angle: 90 });
  const [pathLength, setPathLength] = useState(0);

  // Spring-animated progress for smooth bus movement
  const rawProgress = useMotionValue(scrollProgress);
  const smoothProgress = useSpring(rawProgress, { stiffness: 60, damping: 20, mass: 0.5 });

  // Wheel rotation based on distance traveled
  const wheelRotation = useTransform(smoothProgress, [0, 100], [0, 3600]);

  const segmentHeight = 700;
  const segments = 9; // One more than stops for lead-in/out
  const totalH = segmentHeight * segments;
  const viewW = 800;

  // Build the winding S-curve path with dramatic turns
  const buildPath = useCallback(() => {
    const cx = viewW / 2;
    const amplitude = 220;
    const pts: string[] = [`M ${cx} 30`];

    for (let i = 0; i < segments; i++) {
      const y1 = i * segmentHeight + segmentHeight * 0.25;
      const y2 = i * segmentHeight + segmentHeight * 0.5;
      const y3 = i * segmentHeight + segmentHeight * 0.75;
      const yEnd = (i + 1) * segmentHeight;
      const dir = i % 2 === 0 ? 1 : -1;

      // Double curve per segment for more dramatic turns
      const cx1 = cx + amplitude * dir;
      const cx2 = cx - amplitude * dir * 0.6;
      const cx3 = cx + amplitude * dir * 0.3;

      pts.push(
        `C ${cx1} ${y1}, ${cx2} ${y2}, ${cx} ${(y2 + y3) / 2}`,
        `C ${cx3} ${y3}, ${cx - amplitude * dir * 0.8} ${yEnd - segmentHeight * 0.1}, ${cx} ${yEnd}`
      );
    }
    return pts.join(" ");
  }, [segments, segmentHeight]);

  const pathD = buildPath();

  // Update bus position based on spring-animated progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      const path = pathRef.current;
      if (!path) return;
      const len = path.getTotalLength();
      if (len !== pathLength) setPathLength(len);

      const clampedProgress = Math.max(0, Math.min(100, v));
      const dist = (clampedProgress / 100) * len;
      const pt = path.getPointAtLength(dist);
      const delta = 4;
      const p1 = path.getPointAtLength(Math.max(0, dist - delta));
      const p2 = path.getPointAtLength(Math.min(len, dist + delta));
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

      setBusPos({ x: pt.x, y: pt.y, angle });
    });

    return unsubscribe;
  }, [smoothProgress, pathLength]);

  // Sync raw progress
  useEffect(() => {
    rawProgress.set(scrollProgress);
  }, [scrollProgress, rawProgress]);

  // Stop positions on the path (8 stops evenly distributed)
  const stopPositions = Array.from({ length: 8 }, (_, i) => {
    const t = (i + 0.5) / 9; // Offset to center in segments
    return t;
  });

  // Get point on path at fraction t
  const getPointAt = (t: number) => {
    const path = pathRef.current;
    if (!path) return { x: viewW / 2, y: t * totalH };
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(t * len);
    return { x: pt.x, y: pt.y };
  };

  return (
    <div
      className="absolute inset-x-0 top-0 pointer-events-none hidden md:block"
      style={{ height: totalH, zIndex: 1 }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height={totalH}
        viewBox={`0 0 ${viewW} ${totalH}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
      >
        {/* Ground texture strips */}
        {Array.from({ length: segments }).map((_, i) => (
          <rect
            key={`ground-${i}`}
            x={i % 2 === 0 ? 0 : viewW / 2}
            y={i * segmentHeight}
            width={viewW / 2}
            height={segmentHeight}
            fill="hsl(var(--primary))"
            opacity="0.01"
          />
        ))}

        {/* Road shadow */}
        <path
          d={pathD}
          stroke="hsl(var(--background))"
          strokeWidth={68}
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Road surface */}
        <path
          d={pathD}
          stroke="hsl(var(--muted))"
          strokeWidth={56}
          fill="none"
          strokeLinecap="round"
          opacity="0.25"
        />

        {/* Road edge lines */}
        <path
          d={pathD}
          stroke="hsl(var(--border))"
          strokeWidth={60}
          fill="none"
          strokeLinecap="round"
          opacity="0.08"
        />

        {/* Lane markings - dashed center line */}
        <path
          d={pathD}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="18 14"
          opacity="0.25"
        />

        {/* Progress glow trail */}
        <path
          ref={pathRef}
          id="journey-road-path"
          d={pathD}
          stroke="hsl(var(--primary))"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={totalH * 3}
          strokeDashoffset={totalH * 3 - (scrollProgress / 100) * totalH * 3}
          className="transition-all duration-500"
          style={{ filter: "drop-shadow(0 0 10px hsl(var(--primary) / 0.6))" }}
        />

        {/* Outer glow */}
        <path
          d={pathD}
          stroke="hsl(var(--primary))"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={totalH * 3}
          strokeDashoffset={totalH * 3 - (scrollProgress / 100) * totalH * 3}
          opacity="0.06"
          style={{ filter: "blur(8px)" }}
        />

        {/* Bus stop markers on the road */}
        {stopPositions.map((t, i) => {
          const pos = getPointAt(t);
          const isActive = i === activeStopIndex;
          const isPassed = i <= activeStopIndex;
          const stopEmojis = ["🏁", "📚", "🛠️", "📜", "🚀", "💼", "🎯", "📬"];

          return (
            <g key={`stop-${i}`}>
              {/* Stop platform */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 18 : 12}
                fill={isPassed ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                opacity={isActive ? 0.3 : 0.15}
                className="transition-all duration-500"
              />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 10 : 6}
                fill={isPassed ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                opacity={isActive ? 0.8 : 0.4}
                className="transition-all duration-500"
              />
              {isActive && (
                <>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="22"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    opacity="0.4"
                    className="animate-ping"
                  />
                </>
              )}

              {/* Bus stop shelter - offset to the side */}
              {(() => {
                const side = i % 2 === 0 ? 1 : -1;
                const shelterX = pos.x + side * 55;
                return (
                  <g transform={`translate(${shelterX}, ${pos.y - 15})`}>
                    {/* Pole */}
                    <rect x="-1.5" y="-5" width="3" height="35" rx="1.5" fill="hsl(var(--muted-foreground))" opacity="0.2" />
                    {/* Sign */}
                    <rect x="-16" y="-18" width="32" height="16" rx="3" fill="hsl(var(--card))" stroke={isPassed ? "hsl(var(--primary))" : "hsl(var(--border))"} strokeWidth="1" opacity="0.7" />
                    <text x="0" y="-8" textAnchor="middle" fontSize="9" fill={isPassed ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} opacity="0.9">
                      {stopEmojis[i]}
                    </text>
                  </g>
                );
              })()}
            </g>
          );
        })}

        {/* Scenery decorations */}
        {Array.from({ length: segments }).map((_, i) => {
          const baseY = i * segmentHeight + segmentHeight * 0.5;
          const side = i % 2 === 0 ? 1 : -1;
          return (
            <g key={`scenery-${i}`}>
              {/* Trees cluster */}
              <g transform={`translate(${viewW / 2 + (280) * side}, ${baseY})`}>
                <rect x="-2" y="0" width="4" height="22" rx="2" fill="hsl(var(--primary))" opacity="0.06" />
                <circle cx="0" cy="-10" r="14" fill="hsl(var(--primary))" opacity="0.04" />
                <circle cx="-10" cy="-4" r="10" fill="hsl(var(--primary))" opacity="0.03" />
                <circle cx="10" cy="-4" r="10" fill="hsl(var(--primary))" opacity="0.03" />
              </g>
              {/* Additional tree */}
              <g transform={`translate(${viewW / 2 + (320) * side}, ${baseY + 60})`}>
                <rect x="-1.5" y="0" width="3" height="16" rx="1.5" fill="hsl(var(--primary))" opacity="0.05" />
                <circle cx="0" cy="-7" r="10" fill="hsl(var(--primary))" opacity="0.03" />
              </g>

              {/* Lamppost */}
              <g transform={`translate(${viewW / 2 - (300) * side}, ${baseY - 80})`}>
                <rect x="-1" y="0" width="2" height="28" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.1" />
                <circle cx="0" cy="-4" r="5" fill="hsl(var(--primary))" opacity="0.08" />
                <circle cx="0" cy="-4" r="12" fill="hsl(var(--primary))" opacity="0.02" />
              </g>

              {/* Buildings every 3rd segment */}
              {i % 3 === 1 && (
                <g transform={`translate(${viewW / 2 + (340) * -side}, ${baseY + 120})`}>
                  <rect x="-14" y="-22" width="28" height="34" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.15" />
                  <polygon points="-18,-22 0,-36 18,-22" fill="hsl(var(--primary))" opacity="0.04" />
                  <rect x="-4" y="-6" width="8" height="12" fill="hsl(var(--primary))" opacity="0.06" rx="1" />
                  <rect x="6" y="-16" width="4" height="4" fill="hsl(var(--primary))" opacity="0.08" rx="0.5" />
                  <rect x="-10" y="-16" width="4" height="4" fill="hsl(var(--primary))" opacity="0.08" rx="0.5" />
                </g>
              )}

              {/* Road signs */}
              {i % 2 === 0 && i > 0 && (
                <g transform={`translate(${viewW / 2 + (240) * side}, ${baseY + 180})`}>
                  <rect x="-1" y="0" width="2" height="20" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.12" />
                  <rect x="-12" y="-12" width="24" height="14" rx="2.5" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.35" />
                  <text x="0" y="-3" textAnchor="middle" fill="hsl(var(--primary))" fontSize="6" opacity="0.5">
                    {["⬅", "⚠", "➡", "⬆"][i % 4]}
                  </text>
                </g>
              )}

              {/* Speed bumps */}
              {i % 4 === 2 && (
                <g transform={`translate(${viewW / 2}, ${baseY + 250})`}>
                  <ellipse cx="0" cy="0" rx="20" ry="3" fill="hsl(var(--muted-foreground))" opacity="0.08" />
                  <ellipse cx="0" cy="6" rx="20" ry="3" fill="hsl(var(--muted-foreground))" opacity="0.06" />
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Animated Bus */}
      <motion.div
        className="absolute pointer-events-none z-30"
        animate={{
          left: `${(busPos.x / viewW) * 100}%`,
          top: busPos.y,
          rotate: busPos.angle - 90,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.6 }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {/* Bus glow aura */}
        <div className="absolute inset-0 w-14 h-14 -m-2 rounded-full bg-primary/20 blur-xl animate-pulse-glow" />

        {/* Bus body */}
        <motion.div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.7)] relative">
          <Bus className="w-5 h-5 text-primary-foreground" />

          {/* Wheel indicators */}
          <motion.div
            className="absolute -bottom-1 left-1 w-2 h-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/20"
            style={{ rotate: wheelRotation }}
          />
          <motion.div
            className="absolute -bottom-1 right-1 w-2 h-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/20"
            style={{ rotate: wheelRotation }}
          />
        </motion.div>

        {/* Headlight beams */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-8 bg-gradient-to-t from-primary/30 to-transparent rounded-full blur-sm opacity-60" />

        {/* Exhaust trail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary/30"
            animate={{ opacity: [0.3, 0.1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.div
            className="w-1 h-1 rounded-full bg-primary/20"
            animate={{ opacity: [0.2, 0.05, 0.2], scale: [1, 1.8, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default BusJourneyEngine;
