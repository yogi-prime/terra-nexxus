import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MarketTicker } from "@/components/MarketTicker";
import { AnalyticsSnapshot } from "@/components/AnalyticsSnapshot";
import { ROICalculator } from "@/components/ROICalculator";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { WhyTerraNexxus } from "@/components/WhyTerraNexxus";
import { HowItWorks } from "@/components/HowItWorks";
import { GrowthStory } from "@/components/GrowthStory";
import { Testimonials } from "@/components/Testimonials";
import { ResourcesPreview } from "@/components/ResourcesPreview";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";

const TerraShare = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MarketTicker />
      <main className="relative">
        <HeroSection />
        {/* <AnalyticsSnapshot /> */}
        <ROICalculator />
        <FeaturedProperties />
        <WhyTerraNexxus />
        <HowItWorks />
        <GrowthStory />
        <Testimonials />
        <ResourcesPreview />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default TerraShare;