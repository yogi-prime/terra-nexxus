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
      <div className="relative bg-card-premium/50 backdrop-blur-sm border-y border-border-dark">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className={`h-6 w-6 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};