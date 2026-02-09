import useScrollReveal from "@/hooks/useScrollReveal";
import { Target } from "lucide-react";

const FutureVision = () => {
  const ref = useScrollReveal();

  return (
    <section id="future" className="relative py-24 px-4 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
      </div>

      <div ref={ref} className="section-fade relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass animate-pulse-glow mb-8">
          <Target className="w-10 h-10 text-primary" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gradient mb-6">
          🎯 Final Destination
        </h2>

        <p className="text-xl sm:text-2xl text-foreground font-heading font-medium leading-relaxed mb-4">
          "My Goal: To become an AI Engineer building real-world intelligent systems 
          for smart cities and sustainability."
        </p>

        <p className="text-muted-foreground leading-relaxed">
          Every stop on this journey has shaped my skills and vision. 
          The road ahead is filled with possibilities, and I'm ready to build the future.
        </p>

        <div className="mt-10 flex items-center justify-center gap-2 text-primary">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.3s" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.6s" }} />
          <span className="text-sm font-heading ml-2">Journey continues...</span>
        </div>
      </div>
    </section>
  );
};

export default FutureVision;
