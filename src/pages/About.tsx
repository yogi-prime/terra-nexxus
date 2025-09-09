import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { MissionVision } from "@/components/about/MissionVision";
import { GrowthImpact } from "@/components/about/GrowthImpact";
import { ValueProposition } from "@/components/about/ValueProposition";
import { HowItWorksAbout } from "@/components/about/HowItWorksAbout";
import { Leadership } from "@/components/about/Leadership";
import { PressRecognition } from "@/components/about/PressRecognition";
import { CommunityTestimonials } from "@/components/about/CommunityTestimonials";
import { ComplianceSecurity } from "@/components/about/ComplianceSecurity";
import { ClosingCTA } from "@/components/about/ClosingCTA";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AboutHero />
        <MissionVision />
        <GrowthImpact />
        <ValueProposition />
        <HowItWorksAbout />
        <Leadership />
        <PressRecognition />
        <CommunityTestimonials />
        <ComplianceSecurity />
        <ClosingCTA />
      </main>
      <Footer />
    </div>
  );
};

export default About;