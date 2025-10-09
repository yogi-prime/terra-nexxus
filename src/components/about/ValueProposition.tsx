import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, PieChart, ArrowLeftRight, Shield, Coins, TrendingUp } from "lucide-react";

const propositions = [
  {
    icon: Wallet,
    title: "Accessibility",
    subtitle: "Start from Small amount",
    description:
      "No need for lakhs of rupees. Build your real estate portfolio gradually with small investments across premium properties.",
    color: "text-primary",
    bgColor: "from-primary/10 to-primary/5",
  },
  {
    icon: PieChart,
    title: "Diversification",
    subtitle: "6 categories, 1 platform",
    description:
      "Spread risk across Residential, Commercial, Agricultural, Industrial, Retail, and Land investments in one place.",
    color: "text-primary",
    bgColor: "from-primary/10 to-primary/5",
  },
  {
    icon: ArrowLeftRight,
    title: "Liquidity",
    subtitle: "Marketplace exits",
    description:
      "Sell your fractional shares to other investors on our secondary marketplace anytime with transparent pricing.",
    color: "text-primary",
    bgColor: "from-primary/10 to-primary/5",
  },
  {
    icon: Shield,
    title: "Trust",
    subtitle: "SPV/LLP ownership, SEBI compliance",
    description:
      "You get actual ownership certificates backed by legal entity structures for each property with full regulatory compliance.",
    color: "text-primary",
    bgColor: "from-primary/10 to-primary/5",
  },
  {
    icon: Coins,
    title: "Future Ready",
    subtitle: "Tokenization with BACKR Coin",
    description:
      "Moving towards blockchain-based fractional ownership for enhanced liquidity, transparency, and global accessibility.",
    color: "text-primary",
    bgColor: "from-primary/10 to-primary/5",
  },
];

export const ValueProposition = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Value Proposition</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
  We simplify real estate investing, offering secure, transparent, and rewarding experiences for individuals and groups alike.
</p>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {propositions.map((prop, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg hover-glow hover-lift transition-all duration-300 overflow-hidden relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${prop.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <CardHeader className="relative text-center pb-4">
                <div
                  className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-tr ${prop.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <prop.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl mb-2">{prop.title}</CardTitle>
                <p className={`text-sm font-semibold ${prop.color}`}>{prop.subtitle}</p>
              </CardHeader>

              <CardContent className="relative text-center">
                <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mt-16 bg-secondary/30 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Traditional vs Terra Nexxus</h3>
            <p className="text-muted-foreground">See how we're changing real estate investment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Traditional Real Estate",
                color: "destructive",
                data: [
                  { label: "Minimum Investment", value: "₹50L - ₹5Cr+" },
                  { label: "Property Types", value: "Limited Choice" },
                  { label: "Liquidity", value: "Very Low" },
                  { label: "Diversification", value: "Difficult" },
                  { label: "Legal Complexity", value: "Very High" },
                ],
              },
              {
                title: "Terra Nexxus Way",
                color: "success",
                data: [
                  { label: "Minimum Investment", value: "Entry-level" },
                  { label: "Property Types", value: "6 Categories" },
                  { label: "Liquidity", value: "Marketplace" },
                  { label: "Diversification", value: "Easy & Instant" },
                  { label: "Legal Complexity", value: "Simplified" },
                ],
              },
            ].map((item, idx) => (
              <Card key={idx} className={`border-2 border-${item.color}/20 bg-${item.color}/5`}>
                <CardHeader className="text-center">
                  <CardTitle className={`text-${item.color}`}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {item.data.map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-background/50 rounded">
                      <span className="text-sm">{d.label}</span>
                      <span className={`font-bold text-${item.color}`}>{d.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Result Section */}
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
