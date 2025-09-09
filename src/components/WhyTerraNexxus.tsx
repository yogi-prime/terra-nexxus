import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wallet, 
  PieChart, 
  ArrowLeftRight, 
  Shield, 
  Coins, 
  TrendingUp 
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Low Entry Barrier",
    description: "Start with just ₹10,000",
    details: "No need for lakhs of rupees. Build your real estate portfolio gradually with small investments.",
    color: "text-primary"
  },
  {
    icon: PieChart,
    title: "Smart Diversification",
    description: "6 property categories",
    details: "Spread risk across Residential, Commercial, Land, Warehouse, Retail, and Farmland investments.",
    color: "text-accent"
  },
  {
    icon: ArrowLeftRight,
    title: "Easy Liquidity",
    description: "Marketplace exits available",
    details: "Sell your fractional shares to other investors on our secondary marketplace anytime.",
    color: "text-success"
  },
  {
    icon: Shield,
    title: "Legal Ownership",
    description: "SPV/LLP based structure",
    details: "You get actual ownership certificates backed by legal entity structures for each property.",
    color: "text-warning"
  },
  {
    icon: Coins,
    title: "Regular Income",
    description: "Rental yields paid monthly",
    details: "Earn passive income from rental yields, distributed proportionally to your investment.",
    color: "text-primary"
  },
  {
    icon: TrendingUp,
    title: "Future Ready",
    description: "Tokenization roadmap",
    details: "Moving towards blockchain-based fractional ownership for enhanced liquidity and transparency.",
    color: "text-accent"
  }
];

export const WhyTerraNexxus = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Terra Nexxus?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing real estate investing with technology, transparency, and trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-glow hover-lift group border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className={`h-8 w-8 text-white`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="font-semibold text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-secondary/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Trusted by Thousands</h3>
            <p className="text-muted-foreground">Join India's fastest growing fractional real estate platform</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "SEBI Compliant", value: "100%", icon: Shield },
              { label: "Properties Vetted", value: "500+", icon: TrendingUp },
              { label: "Investor Satisfaction", value: "4.8/5", icon: Coins },
              { label: "Fund Security", value: "₹1000+ Cr", icon: Wallet }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};