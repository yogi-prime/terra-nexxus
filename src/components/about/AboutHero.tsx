import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, HandCoins, Home, RotateCw, Key } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { useNavigate } from "react-router-dom";

export const AboutHero = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Group Investment",
      desc: "Collaborate with others to invest in high-value real estate projects and share long-term growth.",
    },
    {
      icon: Key,
      title: "Lease",
      desc: "Flexible leasing options for residential, commercial, and industrial properties.",
    },
    {
      icon: HandCoins,
      title: "Mortgage",
      desc: "Secure financing solutions that make property ownership accessible to everyone.",
    },
    {
      icon: Home,
      title: "Sale & Resale",
      desc: "Buy or resell properties with complete transparency and expert assistance at every step.",
    },
    {
      icon: Building2,
      title: "Rent",
      desc: "Find or list rental spaces quickly with our verified and secure platform.",
    },
    {
      icon: RotateCw,
      title: "End-to-End Support",
      desc: "From paperwork to possession — we guide you throughout the entire real estate process.",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={heroBackground}
          alt="Real Estate Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16 text-center">
        <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
          Complete Real Estate Ecosystem
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Real Estate That Builds Futures
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          We provide a complete real estate ecosystem — from group investments to property leasing, 
          mortgages, sales, resales, and rentals. Helping individuals and groups grow together through 
          strategic opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            variant="hero"
            size="lg"
            className="text-lg px-8 py-4"
            onClick={() => navigate("/register")}
          >
            Start KYC Process
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4"
            onClick={() => navigate("/properties")}
          >
            Browse Properties
          </Button>
        </div>

        {/* Real Estate Feature Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 
                         hover:bg-white/20 transition-all duration-300"
            >
              <f.icon className="w-10 h-10 text-[#F4C84A] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">{f.title}</h3>
              <p className="text-white/70 text-sm">{f.desc}</p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};
