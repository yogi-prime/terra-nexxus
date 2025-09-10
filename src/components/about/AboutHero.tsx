import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Building, Target } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export const AboutHero = () => {
  const stats = [
    { icon: Target, label: "Total Raised", value: "₹1,200+ Cr", color: "text-primary" },
    { icon: Users, label: "Investors Onboarded", value: "15,000+", color: "text-accent" },
    { icon: Building, label: "Properties Funded", value: "45+", color: "text-success" },
    { icon: TrendingUp, label: "Average Yield", value: "12.5%", color: "text-warning" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Real Estate Portfolio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            India's First All-Category Fractional Real Estate Platform
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Own Any Property.
            <br />
            Starting Small. Growing Big.
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            India's most diversified fractional real estate platform enabling investors to own premium properties across residential, commercial, agricultural, and industrial categories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              Start KYC Process
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Browse Properties
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Ticker */}
{/* Stats Ticker (Hero-style glass band) */}
<div className="relative overflow-hidden">
  {/* Deep teal gradient base */}
  <div className="absolute inset-0 bg-[linear-gradient(135deg,#0F2520_0%,#143229_60%,rgba(31,122,90,0.22)_100%)]" />

  {/* Soft glows like hero */}
  <div className="pointer-events-none absolute inset-0 opacity-25
                  bg-[radial-gradient(600px_220px_at_20%_-10%,#F4C84A33,transparent),
                      radial-gradient(520px_200px_at_85%_110%,#43B88333,transparent)]" />

  {/* Hairlines for premium feel */}
  <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
  <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

  <div className="relative container mx-auto px-4 py-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { icon: Target,  label: "Total Raised",         value: "₹1,200+ Cr" },
        { icon: Users,   label: "Investors Onboarded",  value: "15,000+"    },
        { icon: Building,label: "Properties Funded",    value: "45+"        },
        { icon: TrendingUp, label: "Average Yield",     value: "12.5%"      },
      ].map((stat, i) => (
        <div key={i} className="text-center group">
          {/* Icon pill */}
          <div className="mx-auto mb-2 inline-flex items-center justify-center 
                          h-9 w-9 rounded-xl
                          bg-[linear-gradient(135deg,rgba(31,122,90,.22),rgba(244,200,74,.22))]
                          text-[#F4C84A] group-hover:scale-105 transition-transform">
            <stat.icon className="h-5 w-5" />
          </div>

          {/* Value with gold gradient like hero */}
          <div className="text-2xl md:text-3xl font-bold
                          bg-clip-text text-transparent
                          bg-[linear-gradient(90deg,#FFE08C,#F4C84A)]">
            {stat.value}
          </div>

          {/* Label in soft foreground */}
          <div className="text-sm text-white/70">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</div>

    </section>
  );
};