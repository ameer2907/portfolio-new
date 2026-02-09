import { Bus } from "lucide-react";
import useScrollSpy from "@/hooks/useScrollSpy";

const stops = [
  { id: "hero", label: "Start" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certs" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "future", label: "Destination" },
  { id: "contact", label: "Contact" },
];

const JourneyProgress = () => {
  const { scrollProgress } = useScrollSpy(stops.map((s) => s.id));

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center">
      {/* Road */}
      <div className="relative w-1 h-64 bg-muted rounded-full overflow-visible">
        {/* Progress fill */}
        <div
          className="absolute top-0 left-0 w-full bg-primary rounded-full transition-all duration-300"
          style={{ height: `${scrollProgress}%` }}
        />
        {/* Bus */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          style={{ top: `${scrollProgress}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center glow-sm">
            <Bus className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>
      <span className="mt-3 text-xs text-muted-foreground font-heading">
        {Math.round(scrollProgress)}%
      </span>
    </div>
  );
};

export default JourneyProgress;
