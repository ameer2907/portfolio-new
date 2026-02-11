import { motion } from "framer-motion";
import { Bus, PartyPopper, Star } from "lucide-react";

const DestinationReached = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <motion.section
      className="relative py-20 px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Celebration particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
              y: [0, -40, -80],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/40 mb-8"
        >
          <Bus className="w-12 h-12 text-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <PartyPopper className="w-6 h-6 text-primary" />
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gradient">
            Destination Reached!
          </h2>
          <PartyPopper className="w-6 h-6 text-primary" />
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
          className="flex items-center justify-center gap-1"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              <Star className="w-5 h-5 text-primary fill-primary" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DestinationReached;
