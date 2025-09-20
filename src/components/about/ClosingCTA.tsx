import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Sparkles,
  Building,
  Target
} from "lucide-react";

const liveStats = [
  { label: "Active Investors", value: "15,247", icon: Users },
  { label: "Properties Funded", value: "47", icon: Building },
  { label: "Total AUM", value: "₹1,247 Cr", icon: Target },
  { label: "Avg Returns", value: "12.5%", icon: TrendingUp }
];

export const ClosingCTA = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-white/50 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 right-40 w-5 h-5 bg-white/40 rounded-full animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-8 w-8 text-white/80" />
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Join the Movement
              </Badge>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Join 15,000+ Investors
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Building Wealth
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Start your fractional real estate journey today. Own premium properties across 
              6 categories with investments starting from just ₹10,000.
            </p>
          </div>

          {/* Live Stats Ticker */}
          <div className="hidden-custom mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {liveStats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              size="xl" 
              className="bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 text-xl px-12 py-6"
            >
              Start KYC Process
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl" 
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-xl px-12 py-6"
            >
              Browse Properties
            </Button>
          </div>

          {/* Features Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <TrendingUp className="h-8 w-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">Start Small</h4>
              <p className="text-white/80 text-sm">Begin with just ₹10,000 and build your portfolio gradually</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Building className="h-8 w-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">Diversify Easy</h4>
              <p className="text-white/80 text-sm">6 property categories, 1 platform, complete diversification</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="h-8 w-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">Exit Anytime</h4>
              <p className="text-white/80 text-sm">Sell your shares on our marketplace whenever you want</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <p className="text-white/70 text-lg mb-4">
              Trusted by investors • SEBI Compliant • ₹0 Security Incidents
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
                SEBI Registered
              </Badge>
              <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
                Escrow Protected
              </Badge>
              <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
                Legal Ownership
              </Badge>
              <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
                Bank Grade Security
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};