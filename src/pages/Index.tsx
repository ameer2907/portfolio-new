import { useState, useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import JourneyMiniMap from "@/components/portfolio/JourneyMiniMap";
import BusJourneyEngine from "@/components/portfolio/BusJourneyEngine";
import HeroSection from "@/components/portfolio/HeroSection";
import EducationSection from "@/components/portfolio/EducationSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import CertificationsSection from "@/components/portfolio/CertificationsSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import FutureVision from "@/components/portfolio/FutureVision";
import ContactSection from "@/components/portfolio/ContactSection";
import DestinationReached from "@/components/portfolio/DestinationReached";
import Footer from "@/components/portfolio/Footer";
import useScrollSpy from "@/hooks/useScrollSpy";

const sectionIds = ["hero", "education", "skills", "certifications", "projects", "experience", "future", "contact"];

const Index = () => {
  const { scrollProgress, activeSection } = useScrollSpy(sectionIds);
  const activeIndex = sectionIds.indexOf(activeSection);
  const [destinationReached, setDestinationReached] = useState(false);

  useEffect(() => {
    if (scrollProgress > 95) {
      setDestinationReached(true);
    }
  }, [scrollProgress]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Navbar />
      <JourneyMiniMap scrollProgress={scrollProgress} activeSection={activeSection} />

      {/* Continuous winding road background */}
      <BusJourneyEngine activeStopIndex={activeIndex} scrollProgress={scrollProgress} />

      <HeroSection />

      {/* Sections placed on alternating sides of the road */}
      <div className="relative z-10">
        <div className="md:flex md:justify-start">
          <div className="md:w-[55%] md:ml-[5%]">
            <EducationSection isActive={activeSection === "education"} />
          </div>
        </div>

        <div className="md:flex md:justify-end">
          <div className="md:w-[55%] md:mr-[5%]">
            <SkillsSection isActive={activeSection === "skills"} />
          </div>
        </div>

        <div className="md:flex md:justify-start">
          <div className="md:w-[55%] md:ml-[5%]">
            <CertificationsSection isActive={activeSection === "certifications"} />
          </div>
        </div>

        <div className="md:flex md:justify-end">
          <div className="md:w-[55%] md:mr-[5%]">
            <ProjectsSection isActive={activeSection === "projects"} />
          </div>
        </div>

        <div className="md:flex md:justify-start">
          <div className="md:w-[55%] md:ml-[5%]">
            <ExperienceSection isActive={activeSection === "experience"} />
          </div>
        </div>

        <div className="md:flex md:justify-end">
          <div className="md:w-[55%] md:mr-[5%]">
            <FutureVision isActive={activeSection === "future"} />
          </div>
        </div>

        <div className="md:flex md:justify-start">
          <div className="md:w-[55%] md:ml-[5%]">
            <ContactSection isActive={activeSection === "contact"} />
          </div>
        </div>
      </div>

      <DestinationReached isVisible={destinationReached} />
      <Footer />
    </div>
  );
};

export default Index;
