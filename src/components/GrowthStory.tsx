import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  TrendingUp, 
  Users, 
  Building, 
  DollarSign, 
  Target,
  Award,
  Zap
} from "lucide-react";

const timeline = [
  {
    year: "2022",
    title: "Platform Launch",
    description: "Terra Nexxus goes live with first 5 properties",
    metrics: {
      aum: "₹50 Cr",
      investors: "500",
      properties: "5"
    },
    icon: Zap,
    color: "text-primary"
  },
  {
    year: "2023",
    title: "Rapid Expansion",
    description: "Scale across major Indian cities",
    metrics: {
      aum: "₹500 Cr",
      investors: "5,000",
      properties: "25"
    },
    icon: TrendingUp,
    color: "text-accent"
  },
  {
    year: "2024",
    title: "Market Leadership",
    description: "Become India's largest fractional real estate platform",
    metrics: {
      aum: "₹1,247 Cr",
      investors: "15,247",
      properties: "42"
    },
    icon: Award,
    color: "text-success"
  },
  {
    year: "2025",
    title: "Future Vision",
    description: "Tokenization & global expansion roadmap",
    metrics: {
      aum: "₹5,000 Cr",
      investors: "50,000",
      properties: "100+"
    },
    icon: Target,
    color: "text-warning"
  }
];

const impactStats = [
  {
    icon: DollarSign,
    label: "Total AUM",
    value: "₹1,247 Crores",
    growth: "+148% YoY",
    description: "Assets under management"
  },
  {
    icon: Users,
    label: "Investors Onboarded",
    value: "15,247",
    growth: "+456 this month",
    description: "Active investor community"
  },
  {
    icon: TrendingUp,
    label: "Payouts Distributed",
    value: "₹89.5 Crores",
    growth: "Monthly avg: ₹12.3Cr",
    description: "Total returns to investors"
  },
  {
    icon: Building,
    label: "Average Ticket Size",
    value: "₹2.4 Lakhs",
    growth: "Range: ₹10K - ₹50L",
    description: "Per investor commitment"
  }
];

export const GrowthStory = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Growth Story</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From startup to India's leading fractional real estate platform
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full gradient-primary opacity-30 hidden lg:block"></div>
          
          <div className="space-y-12 lg:space-y-20">
            {timeline.map((milestone, index) => (
              <div key={milestone.year} className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Content Card */}
                <div className="lg:w-5/12">
                  <Card className="hover-glow hover-lift">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-12 h-12 gradient-primary rounded-full flex items-center justify-center`}>
                          <milestone.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {milestone.year}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl">{milestone.title}</CardTitle>
                      <CardDescription className="text-base">
                        {milestone.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{milestone.metrics.aum}</div>
                          <div className="text-xs text-muted-foreground">AUM</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-accent">{milestone.metrics.investors}</div>
                          <div className="text-xs text-muted-foreground">Investors</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-success">{milestone.metrics.properties}</div>
                          <div className="text-xs text-muted-foreground">Properties</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="lg:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-card-premium rounded-2xl p-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-card-premium-foreground mb-4">Our Impact</h3>
            <p className="text-card-premium-foreground/80 max-w-2xl mx-auto">
              Real numbers that showcase the trust investors place in Terra Nexxus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-card-premium-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-success mb-2">{stat.growth}</div>
                <div className="text-xs text-card-premium-foreground/60">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <div className="text-center mt-16">
          <Card className="max-w-4xl mx-auto gradient-hero text-white border-0">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">Vision 2030</h3>
              <p className="text-xl mb-6 opacity-90">
                "To democratize real estate investing and make property ownership accessible to every Indian, 
                starting with just ₹1000."
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-4 py-2">
                  100+ Cities
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-4 py-2">
                  1 Million Investors
                </Badge>
                <Badge variant="outline" className="bg-white/10 text-white border-white/20 px-4 py-2">
                  ₹1 Lakh Crore AUM
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};