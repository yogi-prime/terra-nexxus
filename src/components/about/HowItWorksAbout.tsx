import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Users, Key, Home, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: Search,
    title: "Discover Properties",
    description:
      "Browse our verified listings — from residential to commercial properties — and find the perfect opportunity.",
    color: "from-primary to-primary/70",
  },
  {
    icon: FileText,
    title: "Submit Requirement",
    description:
      "Provide your preferences and investment goals so we can match you with the right properties and services.",
    color: "from-accent to-accent/70",
  },
  {
    icon: Users,
    title: "Group Investment",
    description:
      "Join or create investment groups to maximize potential returns and share opportunities with like-minded investors.",
    color: "from-success to-success/70",
  },
  {
    icon: Key,
    title: "Lease or Mortgage",
    description:
      "Choose between flexible leasing options or mortgage financing to secure your property easily and securely.",
    color: "from-warning to-warning/70",
  },
  {
    icon: Home,
    title: "Purchase or Rent",
    description:
      "Finalize your purchase, resale, or rental seamlessly with our end-to-end support and guidance.",
    color: "from-secondary to-secondary/70",
  },
];

export const HowItWorksAbout = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-24">
      <div className="container mx-auto px-6 text-center">
        <Badge variant="secondary" className="mb-6 text-lg py-2 px-4">
          Step-by-Step Process
        </Badge>
        <h2 className="text-5xl font-extrabold mb-4 text-gray-900">
          How Terra Nexxus Works
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
          Our platform simplifies real estate — whether you’re investing, leasing, or buying.
          Follow these steps to achieve success effortlessly.
        </p>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-5 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="p-6 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 bg-white group relative"
              >
                {/* Step Number in top-right corner */}
                <span className="absolute top-4 right-4 text-xl font-bold text-gray-800 bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow">
                  {index + 1}
                </span>

                <div
                  className={`w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center bg-gradient-to-tr ${step.color} text-white text-2xl shadow-md group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-4 text-gray-900">
            Ready to Start Your Journey?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who have already started building their real estate portfolio with Terra Nexxus.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Button
              variant="hero"
              size="lg"
              className="text-lg px-10 py-4 flex items-center justify-center gap-2"
              onClick={() => navigate("/register")}
            >
              Start KYC Process
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-4"
              onClick={() => navigate("/properties")}
            >
              Browse Properties
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
