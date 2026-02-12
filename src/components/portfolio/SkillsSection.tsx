import JourneyStop from "./JourneyStop";
import { Code, Globe, Brain, GitBranch, Users } from "lucide-react";

const skillCategories = [
  {
    title: "Programming",
    icon: <Code className="w-5 h-5" />,
    skills: ["Python", "Java", "SQL"],
  },
  {
    title: "Web Development",
    icon: <Globe className="w-5 h-5" />,
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Data & AI",
    icon: <Brain className="w-5 h-5" />,
    skills: ["Data Structures", "DBMS", "AI/ML", "Business Intelligence"],
  },
  {
    title: "Tools",
    icon: <GitBranch className="w-5 h-5" />,
    skills: ["Git", "GitHub"],
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-5 h-5" />,
    skills: ["Collaboration", "Time Management", "Creativity", "Adaptability"],
  },
];

const SkillsSection = ({ isActive }: { isActive?: boolean }) => {
  return (
    <JourneyStop
      id="skills"
      icon="🛠️"
      title="Technical Skills"
      subtitle="Tools and technologies in my toolkit"
      stopNumber={2}
      isActive={isActive}
      accentColor="hsl(38,92%,55%)"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat) => (
          <div key={cat.title} className="glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {cat.icon}
              </div>
              <h3 className="font-heading font-semibold text-foreground">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:glow-sm transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </JourneyStop>
  );
};

export default SkillsSection;
