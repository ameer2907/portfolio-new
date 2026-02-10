import { ReactNode } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { Bus } from "lucide-react";

interface JourneyStopProps {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  direction?: "left" | "right" | "center";
  stopNumber?: number;
}

const JourneyStop = ({
  id,
  icon,
  title,
  subtitle,
  children,
  direction = "center",
  stopNumber,
}: JourneyStopProps) => {
  const ref = useScrollReveal();

  return (
    <section id={id} className="relative py-16 md:py-24 px-4">
      {/* Road lane running through the section */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px border-l border-dashed border-primary/10 hidden md:block" />

      <div
        ref={ref}
        className={`section-fade max-w-6xl mx-auto ${
          direction === "left"
            ? "md:mr-[10%] md:ml-auto"
            : direction === "right"
            ? "md:ml-[10%] md:mr-auto"
            : ""
        }`}
      >
        {/* Bus stop sign */}
        <div className="flex flex-col items-center mb-10 relative">
          {/* Stop number plate */}
          {stopNumber !== undefined && (
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-primary/20" />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Bus className="w-3 h-3 text-primary" />
                <span className="text-[10px] font-heading font-bold text-primary tracking-wider">
                  STOP {stopNumber}
                </span>
              </div>
              <div className="h-px w-8 bg-primary/20" />
            </div>
          )}

          {/* Icon sign post */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl glass glow-sm flex items-center justify-center text-3xl transition-transform hover:scale-110 duration-300">
              {icon}
            </div>
            {/* Post connecting to ground */}
            <div className="w-0.5 h-6 bg-gradient-to-b from-primary/30 to-transparent mx-auto" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gradient text-center mt-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground mt-2 text-center max-w-md text-sm">{subtitle}</p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
};

export default JourneyStop;
