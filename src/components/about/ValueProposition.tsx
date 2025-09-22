import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wallet, 
  PieChart, 
  ArrowLeftRight, 
  Shield, 
  Coins, 
  TrendingUp 
} from "lucide-react";

const propositions = [
  {
    icon: Wallet,
    title: "Accessibility",
    subtitle: "Start from Small amount",
    description: "No need for lakhs of rupees. Build your real estate portfolio gradually with small investments across premium properties.",
    color: "text-primary",
    bgColor: "from-primary/10 to-primary/5"
  },
  {
    icon: PieChart,
    title: "Diversification", 
    subtitle: "6 categories, 1 platform",
    description: "Spread risk across Residential, Commercial, Agricultural, Industrial, Retail, and Land investments in one place.",
    color: "text-accent",
    bgColor: "from-accent/10 to-accent/5"
  },
  {
    icon: ArrowLeftRight,
    title: "Liquidity",
    subtitle: "Marketplace exits",
    description: "Sell your fractional shares to other investors on our secondary marketplace anytime with transparent pricing.",
    color: "text-success", 
    bgColor: "from-success/10 to-success/5"
  },
  {
    icon: Shield,
    title: "Trust",
    subtitle: "SPV/LLP ownership, SEBI compliance",
    description: "You get actual ownership certificates backed by legal entity structures for each property with full regulatory compliance.",
    color: "text-warning",
    bgColor: "from-warning/10 to-warning/5"
  },
  {
    icon: Coins,
    title: "Future Ready",
    subtitle: "Tokenization with BACKR Coin",
    description: "Moving towards blockchain-based fractional ownership for enhanced liquidity, transparency, and global accessibility.",
    color: "text-secondary",
    bgColor: "from-secondary/10 to-secondary/5"
  }
];

export const ValueProposition = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why We Exist</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solving the biggest barriers to real estate investment in India with technology, transparency, and trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propositions.map((prop, index) => (
            <Card 
              key={index} 
              className="group border-0 shadow-lg hover-glow hover-lift transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${prop.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <CardHeader className="relative text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <prop.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{prop.title}</CardTitle>
                <p className="text-sm font-semibold text-primary">
                  {prop.subtitle}
                </p>
              </CardHeader>
              
              <CardContent className="relative text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {prop.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Value Demo */}
        <div className="mt-16 bg-secondary/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Traditional vs Terra Nexxus</h3>
            <p className="text-muted-foreground">See how we're changing real estate investment</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traditional Way */}
            <Card className="border-2 border-destructive/20 bg-destructive/5">
              <CardHeader className="text-center">
                <CardTitle className="text-destructive">Traditional Real Estate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <span className="text-sm">Minimum Investment</span>
                  <span className="font-bold text-destructive">₹50L - ₹5Cr+</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <span className="text-sm">Property Types</span>
                  <span className="font-bold text-destructive">Limited Choice</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <span className="text-sm">Liquidity</span>
                  <span className="font-bold text-destructive">Very Low</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <span className="text-sm">Diversification</span>
                  <span className="font-bold text-destructive">Difficult</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <span className="text-sm">Legal Complexity</span>
                  <span className="font-bold text-destructive">Very High</span>
                </div>
              </CardContent>
            </Card>

            {/* Terra Nexxus Way */}
            <Card className="border-2 border-success/20 bg-success/5">
              <CardHeader className="text-center">
                <CardTitle className="text-success">Terra Nexxus Way</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <span className="text-sm">Minimum Investment</span>
                  <span className="font-bold text-success">Entry-level</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <span className="text-sm">Property Types</span>
                  <span className="font-bold text-success">6 Categories</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <span className="text-sm">Liquidity</span>
                  <span className="font-bold text-success">Marketplace</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <span className="text-sm">Diversification</span>
                  <span className="font-bold text-success">Easy & Instant</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background/50 rounded">
                  <span className="text-sm">Legal Complexity</span>
                  <span className="font-bold text-success">Simplified</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h4 className="text-xl font-bold mb-2">The Result?</h4>
            <p className="text-lg text-muted-foreground">
              A growing community of investors has created diversified real estate portfolios with Terra Nexxus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};