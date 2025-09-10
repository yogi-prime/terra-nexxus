import { Button } from "@/components/ui/button";
import { ArrowRight, UserCheck, Building2 } from "lucide-react";

export const PropertiesCTA = () => {
  return (
    <div className="mt-12 mb-8">
      <div className="gradient-primary rounded-2xl p-8 text-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4">
            <Building2 className="h-16 w-16" />
          </div>
          <div className="absolute bottom-4 right-4">
            <Building2 className="h-20 w-20" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Building2 className="h-32 w-32" />
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Investing in Properties from ₹10,000 Today
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are building wealth through fractional real estate ownership. 
            Start small, grow big, diversify smart.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              <UserCheck className="h-5 w-5 mr-2" />
              Start KYC Process
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-primary  hover:bg-white/10 hover:border-white/50"
            >
              <Building2 className="h-5 w-5 mr-2" />
              Browse All Categories
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>SEBI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Escrow Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>SPV/LLP Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>15,000+ Investors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};