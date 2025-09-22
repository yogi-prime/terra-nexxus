import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Shield, TrendingUp } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-card-premium/95 via-card-premium/85 to-transparent" />
        <div className="absolute inset-0 gradient-hero opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="hidden-custom flex items-center gap-2 mb-6">
            <Badge variant="outline" className="bg-primary-light/20 text-primary border-primary/30">
              <Shield className="h-3 w-3 mr-1" />
              SEBI Compliant Platform
            </Badge>
            <Badge variant="outline" className="bg-accent-light/20 text-accent border-accent/30">
              <TrendingUp className="h-3 w-3 mr-1" />
              ₹1000+ Cr AUM
            </Badge>
          </div>

          {/* Main Headlines */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-card-premium-foreground">Own Any Property.</span>
            <br />
            <span className="gradient-data bg-clip-text text-transparent">Starting Small.</span>
            <br />
            <span className="text-accent">Growing Big.</span>
          </h1>

          <p className="text-xl md:text-2xl text-card-premium-foreground/80 mb-8 max-w-3xl leading-relaxed">
  Take your first step with a <span className="text-accent font-bold">minimal investment</span> and diversify across 
  <span className="text-primary font-semibold"> Residential, Commercial, Land & beyond</span> – 
  be part of an <span className="text-accent font-bold">ever-growing investor community</span>.
</p>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="hero" size="xl" className="group" onClick={() => navigate("/Properties")}>
              Browse Properties
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="premium" size="xl" className="group" onClick={() => navigate("/register")}>
              <Play className="h-5 w-5 mr-2" />
              Start KYC Process
            </Button>
          </div>

          {/* Live Stats */}
          <div className="hidden-custom grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { label: "AUM", value: "₹1,247 Cr", change: "+23%" },
              { label: "Investors", value: "15,247", change: "+456 this month" },
              { label: "Properties", value: "42 Live", change: "8 new this week" },
              { label: "Avg Returns", value: "12.4% p.a.", change: "vs 6% FD" }
            ].map((stat, index) => (
              <div key={index} className="bg-card-premium/60 backdrop-blur-sm border border-border-dark/50 rounded-xl p-4 hover-glow">
                <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-card-premium-foreground/70 mb-1">{stat.label}</div>
                <div className="text-xs text-success">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 animate-float">
        <div className="w-16 h-16 gradient-primary rounded-full opacity-20"></div>
      </div>
      <div className="absolute bottom-1/4 left-10 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 gradient-accent rounded-full opacity-20"></div>
      </div>
    </section>
  );
};