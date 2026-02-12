import { Bus, ChevronDown, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-[0.08]"
          style={{ background: "radial-gradient(circle, hsl(190,100%,50%), transparent)" }}
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          initial={{ top: "15%", left: "15%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.06]"
          style={{ background: "radial-gradient(circle, hsl(280,80%,65%), transparent)" }}
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          initial={{ bottom: "20%", right: "10%" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-[0.05]"
          style={{ background: "radial-gradient(circle, hsl(38,92%,50%), transparent)" }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          initial={{ top: "50%", left: "60%" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Bus Depot Sign */}
        <motion.div
          className="mb-6 inline-flex flex-col items-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-heading uppercase tracking-[0.2em] mb-4">
            <MapPin className="w-3 h-3 text-primary" />
            Bus Depot — Starting Point
          </div>
          <motion.div
            className="w-24 h-24 rounded-2xl glass-vibrant glow-multi relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-[hsl(210,100%,55%)] flex items-center justify-center">
                <Bus className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            {/* Exhaust */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 0.3, 0.6].map((d, i) => (
                <motion.div
                  key={i}
                  className="rounded-full bg-primary/15"
                  style={{ width: 4 - i, height: 4 - i }}
                  animate={{ opacity: [0.2, 0.05, 0.2], y: [0, -4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: d }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <p className="text-primary font-heading font-medium tracking-[0.2em] uppercase text-sm">
            Welcome Aboard
          </p>
          <Sparkles className="w-4 h-4 text-accent" />
        </motion.div>

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
          className="text-lg text-gradient-warm font-semibold italic mb-6"
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
            className="group relative px-10 py-4 font-heading font-semibold rounded-xl text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-[hsl(210,100%,55%)] to-accent rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-[hsl(210,100%,55%)] to-accent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            <span className="relative flex items-center gap-2">
              Start the Journey
              <span className="text-lg group-hover:translate-x-1 transition-transform">🚌</span>
            </span>
          </button>
          <a
            href="/resume.pdf"
            download
            className="px-8 py-3.5 border border-primary/30 text-primary font-heading font-medium rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
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
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-primary to-accent"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
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
