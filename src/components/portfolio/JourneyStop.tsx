import { ReactNode } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";

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

  const alignClass =
    direction === "left"
      ? "md:mr-auto md:pr-8"
      : direction === "right"
      ? "md:ml-auto md:pl-8"
      : "";

  return (
    <section id={id} className="relative py-16 md:py-20 px-4">
      <div ref={ref} className={`section-fade max-w-6xl mx-auto ${alignClass}`}>
        {/* Stop marker with road sign styling */}
        <div className="flex flex-col items-center mb-10 relative">
          {/* Stop number badge */}
          {stopNumber !== undefined && (
            <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-[10px] font-heading font-bold text-primary">
                {stopNumber}
              </span>
            </div>
          )}

          {/* Sign post */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl glass glow-sm flex items-center justify-center text-3xl mb-1 group-hover:scale-110 transition-transform">
              {icon}
            </div>
            {/* Post */}
            <div className="w-0.5 h-4 bg-primary/30 mx-auto" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gradient text-center mt-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground mt-2 text-center max-w-md">{subtitle}</p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
};

export default JourneyStop;
