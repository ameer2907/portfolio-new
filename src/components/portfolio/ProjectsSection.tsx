import JourneyStop from "./JourneyStop";
import { ExternalLink, Github, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "AI-Driven Predictive Waste Management",
    description: "IoT-based smart waste management system using AI/ML to predict waste levels and optimize collection routes for smart cities.",
    tech: ["Python", "IoT", "AI/ML", "Data Analysis"],
    status: "In Progress",
    github: "#",
  },
  {
    title: "Advanced Traffic Management System",
    description: "Intelligent traffic management solution using computer vision and ML algorithms to optimize traffic flow in urban areas.",
    tech: ["Python", "ML", "Computer Vision"],
    github: "#",
  },
  {
    title: "E-Commerce Website",
    description: "Full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment integration.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "#",
  },
  {
    title: "Portfolio Website",
    description: "Interactive personal portfolio with scroll-driven storytelling, modern UI/UX, and responsive design.",
    tech: ["React", "Tailwind CSS", "TypeScript"],
    github: "#",
    live: "#",
  },
];

const ProjectsSection = () => {
  return (
    <JourneyStop id="projects" icon="🚀" title="Projects" subtitle="Ideas brought to life">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <div key={i} className="glass-hover rounded-2xl p-6 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-heading font-semibold text-foreground text-lg leading-snug pr-2">
                {project.title}
              </h3>
              {project.status && (
                <span className="shrink-0 flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                  <Loader className="w-3 h-3 animate-spin" />
                  {project.status}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs bg-secondary/60 border-white/5">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a href={project.github} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              {project.live && (
                <a href={project.live} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </JourneyStop>
  );
};

export default ProjectsSection;
