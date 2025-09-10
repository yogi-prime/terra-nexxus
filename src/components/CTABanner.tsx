import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, TrendingUp, ArrowRight, Users, DollarSign, Clock } from "lucide-react";

export const CTABanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show banner after scrolling 50% of the page
      if (scrolled > windowHeight * 0.5) {
        setIsVisible(true);
      }
      
      // Make it sticky after scrolling 80% of the page
      if (scrolled > windowHeight * 0.8) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Static Banner */}
      <section className="py-20 bg-gradient-to-r from-card-premium via-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-white animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full border border-white animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headlines */}
            <div className="mb-8">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20 mb-4">
                <Users className="h-3 w-3 mr-1" />
                15,000+ Investors Trust Us
              </Badge>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Start with just <span className="text-accent">₹10,000</span> today
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Join India's fastest growing fractional real estate platform. 
                <br className="hidden md:block" />
                Build wealth through property ownership, starting small.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <DollarSign className="h-10 w-10 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Low Entry</h3>
                <p className="text-white/80 text-sm">Start investing with just ₹10,000 minimum</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <TrendingUp className="h-10 w-10 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">High Returns</h3>
                <p className="text-white/80 text-sm">Average 12.4% annual returns vs 6% FD</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Clock className="h-10 w-10 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Quick Start</h3>
                <p className="text-white/80 text-sm">Get started in under 10 minutes</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                variant="accent" 
                size="xl" 
                className="group text-lg px-8 py-4 h-auto shadow-2xl hover:shadow-accent/20"
              >
                Start KYC Process
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="text-lg px-8 py-4 h-auto border-white/30 text-black hover:bg-white/10 hover:text-white"
              >
                Browse Properties
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                SEBI Compliant
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Escrow Protected
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Legal Ownership
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Expert Vetted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Banner */}
      {isSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
          <div className="bg-card-premium border-t border-border-dark shadow-premium">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="gradient-primary w-10 h-10 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">TN</span>
                  </div>
                  <div>
                    <p className="font-bold text-card-premium-foreground">Start with ₹10,000 today</p>
                    <p className="text-sm text-card-premium-foreground/70">Join 15,000+ smart investors</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="hero" size="sm" className="hidden sm:flex">
                    Start KYC
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button variant="hero" size="sm" className="sm:hidden">
                    Start KYC
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-card-premium-foreground/70 hover:text-card-premium-foreground"
                    onClick={() => setIsVisible(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};