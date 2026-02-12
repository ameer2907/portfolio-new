import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bus } from "lucide-react";

interface BusJourneyEngineProps {
  activeStopIndex: number;
  scrollProgress: number;
}

const BusJourneyEngine = ({ activeStopIndex, scrollProgress }: BusJourneyEngineProps) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [busPos, setBusPos] = useState({ x: 400, y: 50, angle: 90 });
  const [pathLength, setPathLength] = useState(0);

  const rawProgress = useMotionValue(scrollProgress);
  const smoothProgress = useSpring(rawProgress, { stiffness: 60, damping: 20, mass: 0.5 });
  const wheelRotation = useTransform(smoothProgress, [0, 100], [0, 3600]);

  const segmentHeight = 700;
  const segments = 9;
  const totalH = segmentHeight * segments;
  const viewW = 800;

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

  useEffect(() => {
    rawProgress.set(scrollProgress);
  }, [scrollProgress, rawProgress]);

  const stopPositions = Array.from({ length: 8 }, (_, i) => (i + 0.5) / 9);
  const stopColors = [
    "hsl(190,100%,50%)", "hsl(160,84%,45%)", "hsl(38,92%,55%)",
    "hsl(280,80%,65%)", "hsl(350,89%,60%)", "hsl(199,89%,55%)",
    "hsl(38,92%,50%)", "hsl(190,100%,50%)",
  ];
  const stopEmojis = ["🏁", "📚", "🛠️", "📜", "🚀", "💼", "🎯", "📬"];

  const getPointAt = (t: number) => {
    const path = pathRef.current;
    if (!path) return { x: viewW / 2, y: t * totalH };
    return path.getPointAtLength(t * path.getTotalLength());
  };

  return (
    <div
      className="absolute inset-x-0 top-0 pointer-events-none hidden md:block"
      style={{ height: totalH, zIndex: 1 }}
    >
      <svg
        width="100%"
        height={totalH}
        viewBox={`0 0 ${viewW} ${totalH}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
      >
        <defs>
          <linearGradient id="roadGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(190,100%,50%)" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(280,80%,65%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(190,100%,50%)" stopOpacity="0.6" />
          </linearGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="stopGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(190,100%,50%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(190,100%,50%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Road shadow */}
        <path d={pathD} stroke="hsl(var(--background))" strokeWidth={72} fill="none" strokeLinecap="round" opacity="0.6" />
        {/* Road surface */}
        <path d={pathD} stroke="hsl(var(--muted))" strokeWidth={58} fill="none" strokeLinecap="round" opacity="0.3" />
        {/* Road edge glow */}
        <path d={pathD} stroke="hsl(var(--primary))" strokeWidth={62} fill="none" strokeLinecap="round" opacity="0.03" style={{ filter: "blur(8px)" }} />
        {/* Lane markings */}
        <path d={pathD} stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none" strokeDasharray="20 16" opacity="0.2" />

        {/* Progress trail - colorful */}
        <path
          ref={pathRef}
          id="journey-road-path"
          d={pathD}
          stroke="url(#roadGlow)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={totalH * 3}
          strokeDashoffset={totalH * 3 - (scrollProgress / 100) * totalH * 3}
          className="transition-all duration-500"
          filter="url(#neonGlow)"
        />
        {/* Outer glow */}
        <path
          d={pathD}
          stroke="hsl(var(--primary))"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={totalH * 3}
          strokeDashoffset={totalH * 3 - (scrollProgress / 100) * totalH * 3}
          opacity="0.04"
          style={{ filter: "blur(12px)" }}
        />

        {/* Stop markers */}
        {stopPositions.map((t, i) => {
          const pos = getPointAt(t);
          const isActive = i === activeStopIndex;
          const isPassed = i <= activeStopIndex;
          const color = stopColors[i];
          const side = i % 2 === 0 ? 1 : -1;
          const shelterX = pos.x + side * 60;

          return (
            <g key={`stop-${i}`}>
              {/* Glow ring */}
              {isActive && (
                <circle cx={pos.x} cy={pos.y} r="30" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
                  <animate attributeName="r" values="20;35;20" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={pos.x} cy={pos.y} r={isActive ? 14 : 8} fill={isPassed ? color : "hsl(var(--muted))"} opacity={isActive ? 0.25 : 0.12} />
              <circle cx={pos.x} cy={pos.y} r={isActive ? 8 : 5} fill={isPassed ? color : "hsl(var(--muted))"} opacity={isActive ? 0.9 : 0.4} />
              {isActive && <circle cx={pos.x} cy={pos.y} r={3} fill="hsl(var(--background))" />}

              {/* Bus shelter sign */}
              <g transform={`translate(${shelterX}, ${pos.y - 18})`}>
                <rect x="-1.5" y="-5" width="3" height="38" rx="1.5" fill="hsl(var(--muted-foreground))" opacity="0.15" />
                <rect x="-18" y="-20" width="36" height="18" rx="4" fill="hsl(var(--card))" stroke={isPassed ? color : "hsl(var(--border))"} strokeWidth="1" opacity="0.8" />
                <text x="0" y="-9" textAnchor="middle" fontSize="10" fill={isPassed ? color : "hsl(var(--muted-foreground))"}>
                  {stopEmojis[i]}
                </text>
              </g>
            </g>
          );
        })}

        {/* Colorful scenery */}
        {Array.from({ length: segments }).map((_, i) => {
          const baseY = i * segmentHeight + segmentHeight * 0.5;
          const side = i % 2 === 0 ? 1 : -1;
          const treeColors = ["hsl(160,84%,35%)", "hsl(140,70%,30%)", "hsl(120,60%,25%)"];
          const treeColor = treeColors[i % 3];

          return (
            <g key={`scenery-${i}`}>
              {/* Trees */}
              <g transform={`translate(${viewW / 2 + 280 * side}, ${baseY})`}>
                <rect x="-2.5" y="0" width="5" height="24" rx="2.5" fill="hsl(30,50%,25%)" opacity="0.15" />
                <circle cx="0" cy="-12" r="16" fill={treeColor} opacity="0.08" />
                <circle cx="-11" cy="-5" r="11" fill={treeColor} opacity="0.06" />
                <circle cx="11" cy="-5" r="11" fill={treeColor} opacity="0.06" />
              </g>
              <g transform={`translate(${viewW / 2 + 330 * side}, ${baseY + 80})`}>
                <rect x="-2" y="0" width="4" height="18" rx="2" fill="hsl(30,50%,25%)" opacity="0.12" />
                <circle cx="0" cy="-8" r="12" fill={treeColor} opacity="0.06" />
              </g>

              {/* Lampposts with colored light */}
              <g transform={`translate(${viewW / 2 - 300 * side}, ${baseY - 80})`}>
                <rect x="-1" y="0" width="2" height="30" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.12" />
                <circle cx="0" cy="-5" r="4" fill={stopColors[i % 8]} opacity="0.15" />
                <circle cx="0" cy="-5" r="14" fill={stopColors[i % 8]} opacity="0.03" />
              </g>

              {/* Buildings */}
              {i % 3 === 1 && (
                <g transform={`translate(${viewW / 2 + 350 * -side}, ${baseY + 130})`}>
                  <rect x="-16" y="-26" width="32" height="40" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.2" />
                  <polygon points="-20,-26 0,-42 20,-26" fill={stopColors[(i + 2) % 8]} opacity="0.05" />
                  <rect x="-5" y="-8" width="10" height="14" fill={stopColors[i % 8]} opacity="0.08" rx="1.5" />
                  <rect x="7" y="-20" width="5" height="5" fill={stopColors[(i + 1) % 8]} opacity="0.1" rx="1" />
                  <rect x="-12" y="-20" width="5" height="5" fill={stopColors[(i + 1) % 8]} opacity="0.1" rx="1" />
                </g>
              )}

              {/* Road signs */}
              {i % 2 === 0 && i > 0 && (
                <g transform={`translate(${viewW / 2 + 240 * side}, ${baseY + 200})`}>
                  <rect x="-1" y="0" width="2" height="22" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.12" />
                  <rect x="-14" y="-14" width="28" height="16" rx="3" fill="hsl(var(--card))" stroke={stopColors[i % 8]} strokeWidth="0.8" opacity="0.4" />
                  <text x="0" y="-4" textAnchor="middle" fill={stopColors[i % 8]} fontSize="7" opacity="0.6">
                    {["⬅", "⚠", "➡", "⬆"][i % 4]}
                  </text>
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
        style={{ translateX: "-50%", translateY: "-50%" }}
      >
        {/* Multi-color glow aura */}
        <div className="absolute inset-0 w-16 h-16 -m-3 rounded-full blur-xl animate-pulse-glow" 
          style={{ background: "radial-gradient(circle, hsla(190,100%,50%,0.3), hsla(280,80%,65%,0.1), transparent)" }} 
        />

        {/* Bus body */}
        <motion.div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[hsl(210,100%,55%)] flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.6),0_0_60px_hsl(var(--primary)/0.2)] relative">
          <Bus className="w-6 h-6 text-primary-foreground" />

          {/* Wheels */}
          <motion.div
            className="absolute -bottom-1.5 left-1 w-2.5 h-2.5 rounded-full border-2 border-foreground/30 bg-background/40"
            style={{ rotate: wheelRotation }}
          />
          <motion.div
            className="absolute -bottom-1.5 right-1 w-2.5 h-2.5 rounded-full border-2 border-foreground/30 bg-background/40"
            style={{ rotate: wheelRotation }}
          />

          {/* Window shine */}
          <div className="absolute top-1 right-1 w-3 h-2 rounded-sm bg-white/10" />
        </motion.div>

        {/* Headlight beams */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-10 bg-gradient-to-t from-primary/40 via-primary/15 to-transparent rounded-full blur-sm opacity-70" />

        {/* Exhaust particles */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-primary/25"
              style={{ width: 3 - i * 0.5, height: 3 - i * 0.5 }}
              animate={{ opacity: [0.3, 0.05, 0.3], scale: [1, 2, 1], y: [0, -5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BusJourneyEngine;
