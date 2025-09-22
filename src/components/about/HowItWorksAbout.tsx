import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Shield, 
  Search, 
  Coins, 
  FileText, 
  TrendingUp,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account",
    details: "Quick registration with email and mobile number verification. Join Thousands of investors already on the platform.",
    time: "2 mins",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Complete KYC",
    description: "Verify identity",
    details: "Upload PAN, Aadhaar and complete video KYC. SEBI compliant process ensures regulatory compliance.",
    time: "10 mins",
    color: "text-accent"
  },
  {
    icon: Search,
    title: "Browse Properties",
    description: "Discover opportunities",
    details: "Explore 45+ curated properties across 6 categories. Filter by yield, location, ticket size and risk profile.",
    time: "5 mins",
    color: "text-success"
  },
  {
    icon: Coins,
    title: "Invest Fractionally",
    description: "Make your investment",
    details: "Starting investment in any property. Secure payment through escrow accounts and bank transfers.",
    time: "3 mins",
    color: "text-warning"
  },
  {
    icon: FileText,
    title: "Get Ownership Certificate",
    description: "Legal documentation",
    details: "Receive SPV/LLP share certificate confirming your fractional ownership. Legal and transparent ownership structure.",
    time: "1-2 days",
    color: "text-secondary"
  },
  {
    icon: TrendingUp,
    title: "Earn & Exit",
    description: "Generate returns",
    details: "Receive monthly rental yields and capital appreciation. Exit anytime through our secondary marketplace.",
    time: "Ongoing",
    color: "text-primary"
  }
];

export const HowItWorksAbout = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Step-by-Step Process</Badge>
          <h2 className="text-4xl font-bold mb-4">How Terra Nexxus Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your complete investor journey from sign-up to earning returns - simplified, secure, and transparent
          </p>
        </div>

        {/* Desktop Horizontal Flow */}
        <div className="hidden lg:block mb-16">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-success"></div>
            
            <div className="grid grid-cols-6 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="border-0 shadow-lg hover-glow hover-lift group">
                    <CardContent className="p-6 text-center">
                      {/* Step Number & Icon */}
                      <div className="relative mb-4">
                        <div className="w-16 h-16 gradient-primary rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                          <step.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>

                      {/* Time Badge */}
                      <Badge variant="outline" className="mb-3 text-xs">
                        {step.time}
                      </Badge>

                      {/* Content */}
                      <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.details}</p>
                    </CardContent>
                  </Card>
                  
                
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Vertical Flow */}
        <div className="lg:hidden space-y-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              {/* Left Side - Icon & Connector */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center relative">
                  <step.icon className="h-6 w-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 bg-gradient-to-b from-primary to-accent h-16 mt-2"></div>
                )}
              </div>

              {/* Right Side - Content */}
              <Card className="flex-1 border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <Badge variant="outline" className="text-xs">{step.time}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                  <p className="text-xs text-muted-foreground">{step.details}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Success Statistics */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5 mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
              <h3 className="text-2xl font-bold mb-2">Proven Success</h3>
              <p className="text-muted-foreground">What our investors have achieved</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Average Investment", value: "₹45,000" },
                { label: "Average Portfolio Size", value: "8 Properties" },
                { label: "Average Annual Return", value: "12.5%" },
                { label: "Successful Exits", value: "2,500+" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join Thousands of investors who have already started building their real estate portfolio with Terra Nexxus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-8" onClick={() => navigate("/register")}>
              Start KYC Process
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" onClick={() => navigate("/properties")}>
              Browse Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};