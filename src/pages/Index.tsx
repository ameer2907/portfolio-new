import Navbar from "@/components/portfolio/Navbar";
import RoadMap from "@/components/portfolio/RoadMap";
import HeroSection from "@/components/portfolio/HeroSection";
import EducationSection from "@/components/portfolio/EducationSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import CertificationsSection from "@/components/portfolio/CertificationsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import FutureVision from "@/components/portfolio/FutureVision";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import GameRoad from "@/components/portfolio/GameRoad";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Navbar />
      <RoadMap />

      {/* Continuous winding road background */}
      <GameRoad />

      <HeroSection />

      {/* Sections placed on alternating sides of the road */}
      <div className="relative z-10">
        <div className="md:flex md:justify-start">
          <div className="md:w-[55%] md:ml-[5%]">
            <EducationSection />
          </div>
        </div>

        <div className="md:flex md:justify-end">
          <div className="md:w-[55%] md:mr-[5%]">
            <SkillsSection />
          </div>
        </div>

        <div className="md:flex md:justify-start">
          <div className="md:w-[55%] md:ml-[5%]">
            <CertificationsSection />
          </div>
        </div>

        <div className="md:flex md:justify-end">
          <div className="md:w-[55%] md:mr-[5%]">
            <ProjectsSection />
          </div>
        </div>

        <div className="md:flex md:justify-start">
          <div className="md:w-[55%] md:ml-[5%]">
            <ExperienceSection />
          </div>
        </div>

        <div className="md:flex md:justify-end">
          <div className="md:w-[55%] md:mr-[5%]">
            <FutureVision />
          </div>
        </div>

        <div className="md:flex md:justify-start">
          <div className="md:w-[55%] md:ml-[5%]">
            <ContactSection />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
