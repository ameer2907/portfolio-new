import { motion } from "framer-motion";
import { Target } from "lucide-react";
import JourneyStop from "./JourneyStop";

const FutureVision = ({ isActive }: { isActive?: boolean }) => {
  return (
    <JourneyStop
      id="future"
      icon="🎯"
      title="Final Destination"
      subtitle="Where this journey is headed"
      stopNumber={6}
      isActive={isActive}
    >
      <div className="relative max-w-3xl mx-auto text-center">
        {/* Glow background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        </div>

        <div className="relative z-10">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass animate-pulse-glow mb-8"
            whileInView={{ scale: [0.8, 1.1, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Target className="w-10 h-10 text-primary" />
          </motion.div>

          <p className="text-xl sm:text-2xl text-foreground font-heading font-medium leading-relaxed mb-4">
            "My Goal: To become an AI Engineer building real-world intelligent systems
            for smart cities and sustainability."
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Every stop on this journey has shaped my skills and vision.
            The road ahead is filled with possibilities, and I'm ready to build the future.
          </p>

          <div className="mt-10 flex items-center justify-center gap-2 text-primary">
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
            <span className="text-sm font-heading ml-2">Journey continues...</span>
          </div>
        </div>
      </div>
    </JourneyStop>
  );
};

export default FutureVision;
