// sections/MarketplaceHero.tsx
import { Building2, IndianRupee, Layers, Home } from "lucide-react";
import heroBackground from "@/assets/bg-hero.jpeg"; // change image if needed

export const MarketplaceHero = () => {
  const stats = [
    { label: "Projects Listed", value: "152", icon: Building2 },
    { label: "Avg Price / sqft", value: "₹7,850", icon: IndianRupee },
    { label: "Total Area", value: "2.4 Cr sqft", icon: Layers },
    { label: "Property Types", value: "Residential, Commercial & More", icon: Home },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-card-premium/95 via-card-premium/85 to-transparent" />
        <div className="absolute inset-0 gradient-hero opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-card-premium-foreground">Explore Properties.</span>{" "}
            <span className="gradient-data bg-clip-text text-transparent">
              Invest Smartly.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-card-premium-foreground/80 max-w-3xl mx-auto">
            Discover apartments, villas, plots & commercial spaces with verified details, 
            pricing and easy EMI options.
          </p>
        </div>

        {/* Stats */}
        <div className="hidden-custom grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ label, value, icon: Icon }, i) => (
            <div
              key={i}
              className="bg-card-premium/60 backdrop-blur-sm border border-border-dark/50 rounded-xl p-5 hover-glow transition-all"
            >
              <div className="flex justify-center mb-3">
                <Icon className="h-8 w-8 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-accent text-center mb-1">
                {value}
              </div>
              <p className="text-sm text-card-premium-foreground/70 text-center">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
