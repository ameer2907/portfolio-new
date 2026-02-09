import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import JourneyProgress from "@/components/portfolio/JourneyProgress";
import EducationSection from "@/components/portfolio/EducationSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import CertificationsSection from "@/components/portfolio/CertificationsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import FutureVision from "@/components/portfolio/FutureVision";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <JourneyProgress />
      <HeroSection />
      <EducationSection />
      <SkillsSection />
      <CertificationsSection />
      <ProjectsSection />
      <ExperienceSection />
      <FutureVision />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
