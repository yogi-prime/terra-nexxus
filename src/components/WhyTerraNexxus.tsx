import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wallet, 
  PieChart, 
  ArrowLeftRight, 
  Shield, 
  Coins, 
  TrendingUp,
  CheckCircle2,
  XCircle,
  Home,
  ChartBar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Wallet,
    title: "Low Entry Barrier",
    description: "Start with minimal investment",
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

const comparison = [
  { option: "Avg Annual Return", stocks: "7–10%", bonds: "2–5%", gold: "5–7%", realEstate: "8–12%" },
  { option: "Initial Investment", stocks: "Low–Medium", bonds: "Medium", gold: "Medium", realEstate: "Low" },
  { option: "Monthly Income", stocks: "❌", bonds: "❌", gold: "❌", realEstate: "✅ Earn Rent" },
  { option: "Market Volatility", stocks: "High", bonds: "Low", gold: "Medium", realEstate: "Low" },
  { option: "Inflation Protection", stocks: "Low", bonds: "Low", gold: "High", realEstate: "✅ Protects Against Inflation" },
  { option: "Capital Growth", stocks: "Medium", bonds: "Medium", gold: "Medium", realEstate: "High (Long-Term)" },
];

export const WhyTerraNexxus = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Part Ownership?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing real estate investing with technology, transparency, and trust
          </p>
        </div>

        {/* Features Grid */}
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

        {/* Comparison Grid */}
        <div className="mt-20 font-sans">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Investment Comparison</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compare traditional investment options and see why real estate stands out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Stocks */}
            <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-center text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <ChartBar className="w-5 h-5" /> Stocks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 divide-y divide-gray-200">
                  {comparison.map((row, i) => (
                    <li key={i} className="flex items-center justify-between text-base py-2">
                      <span>{row.option}</span>
                      {row.stocks === "❌" ? <XCircle className="h-5 w-5 text-red-500" /> : row.stocks === "✅" ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <span className="font-medium">{row.stocks}</span>}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Bonds */}
            <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-center text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <Coins className="w-5 h-5" /> Bonds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 divide-y divide-gray-200">
                  {comparison.map((row, i) => (
                    <li key={i} className="flex items-center justify-between text-base py-2">
                      <span>{row.option}</span>
                      {row.bonds === "❌" ? <XCircle className="h-5 w-5 text-red-500" /> : row.bonds === "✅" ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <span className="font-medium">{row.bonds}</span>}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Gold */}
            <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-center text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Gold
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 divide-y divide-gray-200">
                  {comparison.map((row, i) => (
                    <li key={i} className="flex items-center justify-between text-base py-2">
                      <span>{row.option}</span>
                      {row.gold === "❌" ? <XCircle className="h-5 w-5 text-red-500" /> : row.gold === "✅" ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <span className="font-medium">{row.gold}</span>}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Real Estate */}
            <Card className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all transform hover:-translate-y-2 border-2 border-primary bg-gradient-to-br from-primary/10 to-white">
              <CardHeader>
                <CardTitle className="text-center text-lg text-primary font-bold flex items-center justify-center gap-2">
                  <Home className="w-5 h-5 text-primary" /> Real Estate <Badge variant="secondary">Best Choice</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 divide-y divide-gray-200">
                  {comparison.map((row, i) => (
                    <li key={i} className="flex items-center justify-between text-base py-2">
                      <span>{row.option}</span>
                      {row.realEstate === "❌" ? <XCircle className="h-5 w-5 text-red-500" /> : row.realEstate === "✅" || row.realEstate.includes("✅") ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <span className="font-semibold text-primary">{row.realEstate}</span>}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Trust Indicators */}
        <div className="hidden-custom mt-16 bg-secondary/30 rounded-2xl p-8">
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
