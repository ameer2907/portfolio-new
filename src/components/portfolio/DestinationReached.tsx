import { motion } from "framer-motion";
import { Bus, PartyPopper, Star, Trophy, Sparkles } from "lucide-react";

const DestinationReached = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  const confettiColors = [
    "hsl(190,100%,50%)", "hsl(280,80%,65%)", "hsl(38,92%,55%)",
    "hsl(350,89%,60%)", "hsl(160,84%,45%)", "hsl(199,89%,55%)",
  ];

  return (
    <motion.section
      className="relative py-24 px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Colorful celebration particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              width: 4 + Math.random() * 4,
              height: 4 + Math.random() * 4,
              backgroundColor: confettiColors[i % confettiColors.length],
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0, 1.5, 0],
              y: [0, -60, -120],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: "radial-gradient(circle, hsl(190,100%,50%), hsl(280,80%,65%), transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
          className="inline-flex items-center justify-center w-28 h-28 rounded-2xl glass-vibrant mb-8"
          style={{ boxShadow: "0 0 40px hsla(190,100%,50%,0.3), 0 0 80px hsla(280,80%,65%,0.15)" }}
        >
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Sparkles className="w-6 h-6 text-accent" />
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gradient">
            Destination Reached!
          </h2>
          <Sparkles className="w-6 h-6 text-accent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground text-lg leading-relaxed mb-8"
        >
          You've completed the entire journey through my portfolio. 
          Thank you for riding along! 🚌
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-2"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.4, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
            >
              <Star
                className="w-6 h-6 fill-current"
                style={{ color: confettiColors[i % confettiColors.length] }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DestinationReached;
