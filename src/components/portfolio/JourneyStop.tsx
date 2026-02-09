import { ReactNode } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

interface JourneyStopProps {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const JourneyStop = ({ id, icon, title, subtitle, children }: JourneyStopProps) => {
  const ref = useScrollReveal();

  return (
    <section id={id} className="relative py-20 px-4">
      {/* Road connector line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-20 road-line hidden md:block" />

      <div ref={ref} className="section-fade max-w-6xl mx-auto">
        {/* Stop marker */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-14 h-14 rounded-2xl glass glow-sm flex items-center justify-center text-2xl mb-4">
            {icon}
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gradient text-center">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground mt-2 text-center">{subtitle}</p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
};

export default JourneyStop;
