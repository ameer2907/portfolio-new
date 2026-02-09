import JourneyStop from "./JourneyStop";
import { Briefcase, BookOpen } from "lucide-react";

const ExperienceSection = () => {
  return (
    <JourneyStop
      id="experience"
      icon="💼"
      title="Experience"
      subtitle="Learning and growing professionally"
      direction="left"
      stopNumber={5}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Internship */}
        <div className="glass-hover rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground text-lg">ML Intern</h3>
              <p className="text-primary font-medium text-sm">Thirumoolar IT Solutions</p>
              <p className="text-xs text-muted-foreground mt-1">March 2025 – April 2025</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Applied machine learning techniques on real-world datasets
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Performed data preprocessing and feature engineering
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Gained hands-on experience with ML pipelines
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Journey */}
        <div className="glass-hover rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground text-lg">Learning Journey</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Continuously expanding knowledge through online courses, self-learning, 
                hackathon participation, and building practice projects in AI/ML, data science, 
                and web development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </JourneyStop>
  );
};

export default ExperienceSection;
