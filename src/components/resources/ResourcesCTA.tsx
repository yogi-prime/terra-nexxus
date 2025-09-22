import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  Video,
  FileText,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ResourcesCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-success">
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
                Complete Toolkit Ready
              </Badge>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Knowledge + Tools = 
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Smarter Investing
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              You now have access to calculators, guides, videos, and compliance tools. 
              Start making informed fractional real estate investment decisions today.
            </p>
          </div>

          {/* Resource Summary */}
          <div className="hidden-custom mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Calculator, label: "Interactive Calculators", count: "6 Tools", color: "text-white" },
                  { icon: BookOpen, label: "Knowledge Articles", count: "25+ Guides", color: "text-white" },
                  { icon: Video, label: "Tutorial Videos", count: "15 Videos", color: "text-white" },
                  { icon: FileText, label: "Legal Documents", count: "12 Resources", color: "text-white" }
                ].map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">
                      {item.count}
                    </div>
                    <div className="text-sm text-white/80">
                      {item.label}
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
              <Calculator className="mr-3 h-6 w-6" />
              Try Calculators
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl" 
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm text-xl px-12 py-6"
              onClick={() => navigate("/properties")}
            >
              <BookOpen className="mr-3 h-6 w-6" />
              Browse Properties
            </Button>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Calculator className="h-8 w-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">Plan Your Investments</h4>
              <p className="text-white/80 text-sm">Use our calculators to model returns, plan SIPs, and set investment goals</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <BookOpen className="h-8 w-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">Learn & Grow</h4>
              <p className="text-white/80 text-sm">Access expert guides, case studies, and market insights to make informed decisions</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="h-8 w-8 text-white mb-4 mx-auto" />
              <h4 className="text-lg font-semibold text-white mb-2">Stay Compliant</h4>
              <p className="text-white/80 text-sm">Understand legal frameworks, tax implications, and regulatory requirements</p>
            </div>
          </div>

          {/* Trust & Security */}
          <div className="text-center">
            <p className="text-white/70 text-lg mb-4">
              Backed by SEBI Compliance • Transparent Documentation • Expert Guidance
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
                15,000+ Investors Trust Us
              </Badge>
              <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
                ₹1,200+ Cr AUM
              </Badge>
              <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
                47+ Properties Funded
              </Badge>
              <Badge variant="outline" className="border-white/30 bg-white/10 text-white">
                12.5% Avg Returns
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