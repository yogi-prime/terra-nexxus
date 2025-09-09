import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResourcesHero } from "@/components/resources/ResourcesHero";
import { FeaturedCalculators } from "@/components/resources/FeaturedCalculators";
import { KnowledgeHub } from "@/components/resources/KnowledgeHub";
import { VideoLibrary } from "@/components/resources/VideoLibrary";
import { DownloadableResources } from "@/components/resources/DownloadableResources";
import { FAQMegaAccordion } from "@/components/resources/FAQMegaAccordion";
import { CommunityStories } from "@/components/resources/CommunityStories";
import { ComplianceCorner } from "@/components/resources/ComplianceCorner";
import { ResourcesCTA } from "@/components/resources/ResourcesCTA";

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ResourcesHero />
        <FeaturedCalculators />
        <KnowledgeHub />
        <VideoLibrary />
        <DownloadableResources />
        <FAQMegaAccordion />
        <CommunityStories />
        <ComplianceCorner />
        <ResourcesCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Resources;