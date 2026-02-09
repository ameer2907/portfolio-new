import Navbar from "@/components/portfolio/Navbar";
import RoadMap from "@/components/portfolio/RoadMap";
import HeroSection from "@/components/portfolio/HeroSection";
import RoadConnector from "@/components/portfolio/RoadConnector";
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
      <RoadMap />
      <HeroSection />
      <RoadConnector direction="left" />
      <EducationSection />
      <RoadConnector direction="right" />
      <SkillsSection />
      <RoadConnector direction="left" />
      <CertificationsSection />
      <RoadConnector direction="right" />
      <ProjectsSection />
      <RoadConnector direction="left" />
      <ExperienceSection />
      <RoadConnector direction="right" />
      <FutureVision />
      <RoadConnector direction="left" />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
