import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSearchSection } from "@/components/homepage/HeroSearchSection";
import { QuickFilters } from "@/components/homepage/QuickFilters";
import { CoreServices } from "@/components/homepage/CoreServices";
import { MarketTicker } from "@/components/MarketTicker";
import { ServicePropertiesSection } from "@/components/homepage/ServicePropertiesSection";
import { FeaturedProperties } from "@/components/homepage/FeaturedProperties";
import { MarketingBanner } from "@/components/homepage/MarketingBanner";
import { PropertyVideos } from "@/components/homepage/PropertyVideos";
import { PropertyHighlight } from "@/components/homepage/PropertyHighlight";
import { PropertyRecommendations } from "@/components/homepage/PropertyRecommendations";
import { MarketplaceServices } from "@/components/homepage/MarketplaceServices";
import { FeaturedProjects } from "@/components/homepage/FeaturedProjects";
import { DevelopersSection } from "@/components/homepage/DevelopersSection";
import { ResourcesPreview } from "@/components/ResourcesPreview";
import { TrustSection } from "@/components/homepage/TrustSection";
import { AnalyticsSnapshot } from "@/components/homepage/AnalyticsSnapshot";
import  FloatingPromo  from "@/components/homepage/FloatingPromo";
import  EntryLeadModal from "@/components/homepage/EntryLeadModal";
// ✅ default import
import ChatbotLeadForm from "@/components/homepage/ChatbotLeadForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MarketTicker />
      <main className="relative">
        <HeroSearchSection />
        <QuickFilters />
        <CoreServices />
        <ServicePropertiesSection />
        <FeaturedProperties />
        <MarketingBanner />
        <PropertyVideos />
        <PropertyHighlight />
        <PropertyRecommendations />
        <MarketplaceServices />
<AnalyticsSnapshot />
        <FeaturedProjects />
        <DevelopersSection />
        <ResourcesPreview />
        <TrustSection />
      </main>
      <Footer />
       <FloatingPromo />
       {/* Lead Capture Modal (auto opens on page entry) */}
        <EntryLeadModal />
      {/* Chatbot Lead Form (Sticky) */}
      <ChatbotLeadForm />
    </div>
  );
};

export default Index;