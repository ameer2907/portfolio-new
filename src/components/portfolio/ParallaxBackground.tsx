import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 4,
    color: ["hsl(190,100%,70%)", "hsl(280,80%,75%)", "hsl(38,92%,70%)", "hsl(210,100%,70%)", "hsl(350,89%,70%)"][Math.floor(Math.random() * 5)],
  }));

  const clouds = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    y: 15 + i * 15,
    speed: 0.02 + Math.random() * 0.03,
    opacity: 0.03 + Math.random() * 0.04,
    width: 200 + Math.random() * 300,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,47%,6%)] via-[hsl(222,47%,8%)] to-[hsl(222,47%,10%)]" />
      
      {/* Colorful nebula blobs */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.04] blur-[120px]"
        style={{
          background: "radial-gradient(circle, hsl(190,100%,50%), transparent 70%)",
          top: `${10 - scrollY * 0.02}%`,
          left: "10%",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(280,80%,65%), transparent 70%)",
          top: `${40 - scrollY * 0.015}%`,
          right: "5%",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(38,92%,50%), transparent 70%)",
          bottom: `${20 - scrollY * 0.01}%`,
          left: "30%",
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            transform: `translateY(${-scrollY * (0.01 + star.size * 0.005)}px)`,
          }}
          animate={{
            opacity: [0.15, 0.8, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Drifting clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="absolute animate-drift"
          style={{
            top: `${cloud.y}%`,
            opacity: cloud.opacity,
            animationDuration: `${80 + cloud.id * 20}s`,
            animationDelay: `${-cloud.id * 12}s`,
            transform: `translateY(${-scrollY * cloud.speed}px)`,
          }}
        >
          <div
            className="rounded-full bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-2xl"
            style={{ width: cloud.width, height: cloud.width * 0.3 }}
          />
        </div>
      ))}
    </div>
  );
};

export default ParallaxBackground;
