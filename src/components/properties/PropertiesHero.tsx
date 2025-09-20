// src/sections/PropertiesHero.tsx
import { TrendingUp, Building2, Users, Target } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export const PropertiesHero = () => {
  const stats = [
    { label: "Total Properties Live", value: "47", icon: Building2 },
    { label: "Avg Yield %", value: "11.8%", icon: TrendingUp },
    { label: "Total Target Raise", value: "₹1,250 Cr", icon: Target },
    { label: "Total Raised So Far", value: "₹892 Cr", icon: Users },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* BG + overlays = same recipe as Home */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* left-to-right green veil */}
        <div className="absolute inset-0 bg-gradient-to-r from-card-premium/95 via-card-premium/85 to-transparent" />
        {/* soft radial glows (reuse your util) */}
        <div className="absolute inset-0 gradient-hero opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-card-premium-foreground">Browse Properties.</span>{" "}
            <span className="gradient-data bg-clip-text text-transparent">
              Own Fraction by Fraction.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-card-premium-foreground/80 max-w-4xl mx-auto">
            Discover Residential, Commercial, Farmhouses, Agri Land, Plots & Industrial assets
            starting from <span className="text-accent font-semibold">₹10,000</span>.
          </p>
        </div>

        {/* Stats — same card treatment as Home */}
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

      {/* Floating accents (optional to mirror Home) */}
      <div className="pointer-events-none absolute top-1/4 right-10 animate-float">
        <div className="w-16 h-16 gradient-primary rounded-full opacity-20" />
      </div>
      <div
        className="pointer-events-none absolute bottom-1/4 left-10 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="w-12 h-12 gradient-accent rounded-full opacity-20" />
      </div>
    </section>
  );
};
