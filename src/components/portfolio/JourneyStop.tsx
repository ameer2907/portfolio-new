import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Bus } from "lucide-react";

interface JourneyStopProps {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  stopNumber?: number;
  isActive?: boolean;
}

const JourneyStop = ({
  id,
  icon,
  title,
  subtitle,
  children,
  stopNumber,
  isActive = false,
}: JourneyStopProps) => {
  return (
    <section id={id} className="relative py-16 md:py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Bus stop sign */}
        <div className="flex flex-col items-center mb-10 relative">
          {stopNumber !== undefined && (
            <motion.div
              className="flex items-center gap-2 mb-3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="h-px w-8 bg-primary/20" />
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all duration-500 ${
                isActive 
                  ? "bg-primary/20 border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.3)]" 
                  : "bg-primary/10 border-primary/20"
              }`}>
                <Bus className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-heading font-bold text-primary tracking-wider">
                  STOP {stopNumber}
                </span>
              </div>
              <div className="h-px w-8 bg-primary/20" />
            </motion.div>
          )}

          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.3 }}
          >
            <div className={`w-16 h-16 rounded-2xl glass flex items-center justify-center text-3xl transition-all duration-500 hover:scale-110 ${
              isActive ? "glow shadow-[0_0_25px_hsl(var(--primary)/0.4)]" : "glow-sm"
            }`}>
              {icon}
            </div>
            <div className="w-0.5 h-6 bg-gradient-to-b from-primary/30 to-transparent mx-auto" />
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl font-heading font-bold text-gradient text-center mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="text-muted-foreground mt-2 text-center max-w-md text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default JourneyStop;
