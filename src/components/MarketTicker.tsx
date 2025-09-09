import { TrendingUp, Users, Building, Percent } from "lucide-react";

const tickerData = [
  {
    label: "₹ Raised Today",
    value: "₹12.5 Cr",
    icon: TrendingUp,
    trend: "+18%"
  },
  {
    label: "Total Investors",
    value: "15,247",
    icon: Users,
    trend: "+256 today"
  },
  {
    label: "Active Properties",
    value: "42",
    icon: Building,
    trend: "8 new this week"
  },
  {
    label: "Avg Yield",
    value: "12.4%",
    icon: Percent,
    trend: "vs 8.2% FD"
  }
];

export const MarketTicker = () => {
  return (
    <div className="bg-card-premium text-card-premium-foreground border-b border-border-dark overflow-hidden">
      <div className="py-3">
        <div className="animate-ticker flex gap-12 whitespace-nowrap">
          {/* Repeat ticker items for seamless loop */}
          {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
            <div key={index} className="flex items-center gap-3 px-6">
              <item.icon className="h-5 w-5 text-accent" />
              <div className="flex items-center gap-2">
                <span className="font-semibold">{item.label}:</span>
                <span className="text-accent font-bold">{item.value}</span>
                <span className="text-success text-sm">({item.trend})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};