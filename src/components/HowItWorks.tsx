import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  FileCheck, 
  Search, 
  Wallet, 
  Award, 
  ArrowLeftRight,
  ArrowRight,
  Clock
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account in 2 minutes",
    details: "Quick registration with email and mobile verification",
    time: "2 min"
  },
  {
    icon: FileCheck,
    title: "Complete KYC",
    description: "Submit PAN, Aadhaar & bank details",
    details: "Digital KYC process with instant approval for most cases",
    time: "5 min"
  },
  {
    icon: Search,
    title: "Browse Properties",
    description: "Explore vetted investment opportunities",
    details: "Detailed analysis, location insights, and risk assessment for each property",
    time: "15 min"
  },
  {
    icon: Wallet,
    title: "Invest Fractionally",
    description: "Start with just ₹10,000",
    details: "Choose your investment amount and secure your fractional ownership",
    time: "2 min"
  },
  {
    icon: Award,
    title: "Get Ownership Certificate",
    description: "Legal ownership documents issued",
    details: "Receive official ownership certificate backed by SPV/LLP structure",
    time: "24 hours"
  },
  {
    icon: ArrowLeftRight,
    title: "Earn & Exit Anytime",
    description: "Monthly income + marketplace liquidity",
    details: "Receive rental income monthly and sell your shares on secondary market",
    time: "Ongoing"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start your real estate investment journey in 6 simple steps
          </p>
        </div>

        {/* Desktop Stepper */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-20 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30"></div>
            
            <div className="grid grid-cols-6 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="hover-glow hover-lift group">
                    <CardHeader className="text-center pb-4">
                      <div className="mx-auto mb-4 w-16 h-16 gradient-primary rounded-full flex items-center justify-center relative z-10 bg-background group-hover:scale-110 transition-transform">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <Badge variant="outline" className="mb-2 bg-accent/10 text-accent border-accent/20">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.time}
                      </Badge>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="font-medium text-foreground mb-2">
                        {step.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {step.details}
                      </p>
                    </CardContent>
                  </Card>
                  
                 
                  
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Stepper */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-16 bg-gradient-to-b from-primary to-accent mx-auto mt-4 opacity-30"></div>
                )}
              </div>
              <Card className="flex-1 hover-glow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 text-xs">
                      {step.time}
                    </Badge>
                  </div>
                  <p className="font-medium text-foreground">
                    {step.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    {step.details}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-card-premium rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-card-premium-foreground mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-card-premium-foreground/80 mb-6">
              Join thousands of smart investors who are building wealth through fractional real estate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Start KYC Process
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="premium" size="lg">
                Browse Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};