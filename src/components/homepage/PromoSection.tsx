import { Sparkles, Clock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const PromoSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-accent to-primary rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <Badge className="bg-white/20 text-white border-white/30">
                <Sparkles className="h-4 w-4 mr-1" />
                Limited Time Offer
              </Badge>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mega Property Festival 2024
            </h2>
            
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Zero brokerage on all properties + Get up to ₹50,000 cashback on home loans
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Ends in 5 days</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Gift className="h-5 w-5" />
                <span className="font-medium">Limited properties</span>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 rounded-full"
            >
              Explore Festival Offers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};