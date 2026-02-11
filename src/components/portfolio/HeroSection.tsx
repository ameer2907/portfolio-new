import { Bus, ChevronDown, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/3 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Bus Depot Sign */}
        <motion.div
          className="mb-6 inline-flex flex-col items-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-heading uppercase tracking-widest mb-3">
            <MapPin className="w-3 h-3 text-primary" />
            Bus Depot — Starting Point
          </div>
          <motion.div
            className="w-20 h-20 rounded-2xl glass glow relative"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <Bus className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary/20"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.div
                className="w-1 h-1 rounded-full bg-primary/10"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-primary font-heading font-medium tracking-widest uppercase text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome Aboard
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold mb-4 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          K. Ameer{" "}
          <span className="text-gradient">Malik Bahad</span>
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-muted-foreground font-heading mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          B.Tech CSE – Data Science & AI
        </motion.p>

        <motion.p
          className="text-lg text-primary/80 font-medium italic mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          "Turning Ideas into Interfaces"
        </motion.p>

        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          An aspiring AI Engineer with a passion for building intelligent systems.
          Skilled in Python, Java, AI/ML, and data analysis — ready to create real-world
          solutions for smart cities and sustainability.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={() => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-lg glow hover:shadow-[0_0_30px_hsla(190,100%,50%,0.5)] transition-all duration-300 group"
          >
            Start the Journey
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">🚌</span>
          </button>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3 border border-primary/30 text-primary font-heading font-medium rounded-lg hover:bg-primary/10 transition-all duration-300"
          >
            Download Resume
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-5 h-9 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-2 rounded-full bg-primary"
              animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
