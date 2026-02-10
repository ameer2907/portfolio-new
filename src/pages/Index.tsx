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
      <RoadConnector direction="left" variant="curve" distance="2 km" />
      <EducationSection />
      <RoadConnector direction="right" variant="hill" label="uphill ahead" distance="4 km" />
      <SkillsSection />
      <RoadConnector direction="left" variant="hairpin" distance="7 km" />
      <CertificationsSection />
      <RoadConnector direction="right" variant="zigzag" label="winding road" distance="11 km" />
      <ProjectsSection />
      <RoadConnector direction="left" variant="bridge" distance="14 km" />
      <ExperienceSection />
      <RoadConnector direction="right" variant="curve" distance="17 km" />
      <FutureVision />
      <RoadConnector direction="left" variant="hill" label="final approach" distance="20 km" />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
