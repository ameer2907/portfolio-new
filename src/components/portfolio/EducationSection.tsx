import { GraduationCap, Calendar, Award } from "lucide-react";
import JourneyStop from "./JourneyStop";

const EducationSection = () => {
  return (
    <JourneyStop
      id="education"
      icon="📚"
      title="Education"
      subtitle="The foundation of the journey"
      stopNumber={1}
    >
      <div className="max-w-2xl mx-auto">
        <div className="glass-hover rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-heading font-semibold text-foreground">
                B.Tech – CSE (Data Science & AI)
              </h3>
              <p className="text-primary font-medium mt-1">
                Dr. M.G.R Educational and Research Institute
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  2022 – Present
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  CGPA: 7.43
                </span>
              </div>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                Pursuing a comprehensive curriculum covering Data Structures, AI/ML, 
                DBMS, Business Intelligence, and modern software development practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </JourneyStop>
  );
};

export default EducationSection;
