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
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    description: "Start with minimal investment",
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
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start your real estate investment journey in 6 simple steps
          </p>
        </div>

        {/* Pyramid Layout */}
        <div className="hidden lg:block relative">
          {/* Connecting Lines */}
          {/* <svg className="absolute inset-0 z-0 w-full h-full">
            <line x1="50%" y1="80" x2="33%" y2="180" className="stroke-primary/30 stroke-2" />
            <line x1="50%" y1="80" x2="66%" y2="180" className="stroke-primary/30 stroke-2" />
            <line x1="33%" y1="180" x2="25%" y2="300" className="stroke-primary/30 stroke-2" />
            <line x1="33%" y1="180" x2="41%" y2="300" className="stroke-primary/30 stroke-2" />
            <line x1="66%" y1="180" x2="58%" y2="300" className="stroke-primary/30 stroke-2" />
            <line x1="66%" y1="180" x2="75%" y2="300" className="stroke-primary/30 stroke-2" />
          </svg> */}

          <div className="grid grid-rows-[auto_auto_auto] justify-items-center gap-16 relative z-10">
            {/* Row 1 */}
            <motion.div
              className="w-64"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <StepCard step={steps[0]} index={0} />
            </motion.div>

            {/* Row 2 */}
            <div className="flex gap-16">
              {steps.slice(1, 3).map((step, i) => (
                <motion.div
                  key={i + 1}
                  className="w-64"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <StepCard step={step} index={i + 1} />
                </motion.div>
              ))}
            </div>

            {/* Row 3 */}
            <div className="flex gap-16">
              {steps.slice(3, 6).map((step, i) => (
                <motion.div
                  key={i + 3}
                  className="w-64"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                  <StepCard step={step} index={i + 3} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Stepper */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <StepCard step={step} index={index} mobile />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-card-premium rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-card-premium-foreground mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-card-premium-foreground/80 mb-6">
              Join thousands of smart investors who are building wealth through fractional real estate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="flex items-center justify-center gap-2" onClick={() => navigate("/register")}>
                Start KYC Process
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="premium" size="lg" onClick={() => navigate("/terrashare-properties")}>
                Browse Properties
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// StepCard Component
const StepCard = ({ step, index, mobile = false }) => (
  <Card className={`group hover-glow hover-lift flex flex-col h-full rounded-3xl shadow-lg transition-transform duration-300 ${mobile ? "flex-row gap-4 p-4" : "p-6"}`}>
    <CardHeader className={`text-center pb-4 relative z-10 ${mobile ? "w-20 flex-shrink-0" : ""}`}>
      {/* Step Number */}
      <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-accent/10 border-2 border-accent text-accent flex items-center justify-center font-bold z-20 ${mobile ? "left-0 transform-none -translate-x-0 top-0" : ""}`}>
        {index + 1}
      </div>

      <div className="mx-auto mb-4 w-16 h-16 gradient-primary rounded-full flex items-center justify-center relative z-10 bg-background group-hover:scale-110 transition-transform">
        <step.icon className="h-8 w-8 text-white" />
      </div>
      <Badge variant="outline" className="mb-2 bg-accent/10 text-accent border-accent/20 flex items-center justify-center gap-1 z-10">
        <Clock className="h-3 w-3" />
        {step.time}
      </Badge>
      <CardTitle className="text-lg">{step.title}</CardTitle>
    </CardHeader>
    <CardContent className={`text-center flex-1 ${mobile ? "pt-0" : ""}`}>
      <p className="font-medium text-foreground mb-2">{step.description}</p>
      <p className="text-sm text-muted-foreground">{step.details}</p>
    </CardContent>
  </Card>
);
