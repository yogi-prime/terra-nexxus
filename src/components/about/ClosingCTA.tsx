import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Sparkles,
  Building,
  Target,
  Home,
  Key,
  DollarSign,
  Repeat
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const liveStats = [
  { label: "Active Investors", value: "15,247", icon: Users },
  { label: "Properties Funded", value: "47", icon: Building },
  { label: "Total AUM", value: "₹1,247 Cr", icon: Target },
  { label: "Avg Returns", value: "12.5%", icon: TrendingUp }
];

const features = [
  {
    icon: Home,
    title: "Lease & Rent",
    description: "List, lease, or rent properties seamlessly with verified tenants."
  },
  {
    icon: Key,
    title: "Mortgage Options",
    description: "Flexible mortgage solutions for investors and property owners."
  },
  {
    icon: DollarSign,
    title: "Buy & Sell",
    description: "Efficient property sale, resale, and investment transfers."
  },
  {
    icon: Repeat,
    title: "Group Investment",
    description: "Pool investments with like-minded investors and diversify risk."
  }
];

export const ClosingCTA = () => {
  const navigate = useNavigate();

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
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-8 w-8 text-white/80" />
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Join the Movement
            </Badge>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Grow Your Wealth in Real Estate
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Lease, Invest, Buy & More
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Explore all real estate opportunities — lease, mortgage, buy, resale, rent, or group investment. 
            Start building your diversified portfolio today.
          </p>
        </div>

        {/* Live Stats */}
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
            onClick={() => navigate("/register")}
          >
            Start Your Journey
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          
          <Button 
            variant="outline" 
            size="xl" 
            className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-xl px-12 py-6"
            onClick={() => navigate("/properties")}
          >
            Browse Properties
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center hover:scale-105 transition-transform">
              <feature.icon className="h-8 w-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-white/70 text-lg mb-4">
            Trusted by thousands of investors • SEBI Compliant • Zero Security Incidents
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

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
