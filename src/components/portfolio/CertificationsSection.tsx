import JourneyStop from "./JourneyStop";
import { Award } from "lucide-react";

const certifications = [
  { title: "Google Gen AI Studio", issuer: "Google" },
  { title: "IBM Data Science", issuer: "IBM" },
  { title: "IBM Data Analytics", issuer: "IBM" },
  { title: "Deloitte Technology Simulation", issuer: "Deloitte" },
  { title: "ThingBator ML", issuer: "ThingBator" },
  { title: "Python for Data Analysis", issuer: "Online Course" },
  { title: "Power BI", issuer: "Microsoft" },
  { title: "Microsoft Azure Fundamentals", issuer: "Microsoft" },
  { title: "NASSCOM Cybersecurity", issuer: "NASSCOM" },
  { title: "NPTEL HCI", issuer: "NPTEL" },
];

const CertificationsSection = () => {
  return (
    <JourneyStop
      id="certifications"
      icon="📜"
      title="Certifications"
      subtitle="Validated knowledge and expertise"
      direction="left"
      stopNumber={3}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert, i) => (
          <div
            key={i}
            className="glass-hover rounded-xl p-5 group cursor-default"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-medium text-sm text-foreground leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </JourneyStop>
  );
};

export default CertificationsSection;
