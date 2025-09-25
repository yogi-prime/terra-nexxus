import { Gift, Percent, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const MarketingBanner = () => {
  const banners = [
    {
      id: 1,
      title: "Festival Special Offer",
      subtitle: "Zero Brokerage this Diwali!",
      description: "Book any property and save up to ₹2 Lakhs in brokerage fees",
      cta: "Claim Offer Now",
      icon: Gift,
      gradient: "from-orange-500 via-red-500 to-pink-500",
      badge: "Limited Time",
      validTill: "Valid till 31st Oct"
    },
    {
      id: 2,
      title: "Home Loan Cashback",
      subtitle: "Get up to ₹50,000 Cashback",
      description: "Special cashback offer on home loans with our partner banks",
      cta: "Apply Now",
      icon: Percent,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      badge: "Best Rates",
      validTill: "Interest rates starting 8.5%"
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient}`}></div>
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              
              <div className="relative z-10 p-8 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                      <banner.icon className="h-6 w-6" />
                    </div>
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {banner.badge}
                    </Badge>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {banner.title}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-semibold mb-3 opacity-90">
                    {banner.subtitle}
                  </h4>
                  <p className="text-white/90 leading-relaxed">
                    {banner.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Calendar className="h-4 w-4" />
                    <span>{banner.validTill}</span>
                  </div>
                  
                  <Button 
                    className="bg-white text-gray-900 hover:bg-white/90"
                    size="lg"
                  >
                    {banner.cta}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};