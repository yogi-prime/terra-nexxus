import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Lightbulb } from "lucide-react";

export const MissionVision = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Purpose & Vision</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every decision we make is guided by a purpose — to create sustainable real estate 
            opportunities that empower communities and deliver value to every investor and resident.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Mission & Vision */}
          <div className="space-y-8">
            {/* Purpose / Mission */}
            <Card className="border-0 bg-gradient-to-br from-accent/5 to-success/5 hover-glow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Purpose</h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Our purpose is to redefine how people experience real estate — not just as 
                  properties, but as life investments. We aim to simplify access to property 
                  ownership, group investment, and leasing opportunities through innovation, 
                  transparency, and collaboration.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5 hover-glow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Our vision is to become India's most trusted real estate ecosystem — a platform 
                  where individuals and groups can invest, lease, or own property seamlessly. 
                  We envision connected communities built on transparency, sustainability, and growth.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Infographic */}
          <div className="relative">
            <Card className="border-0 bg-secondary/30 p-8">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 gradient-primary rounded-full mx-auto flex items-center justify-center mb-6">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>

                <h4 className="text-xl font-semibold mb-6">The Terra Nexxus Difference</h4>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <span className="font-medium">Minimum Investment</span>
                    <span className="text-primary font-bold">Low Entry</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <span className="font-medium">Property Categories</span>
                    <span className="text-accent font-bold">6 Types</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <span className="font-medium">Legal Ownership</span>
                    <span className="text-success font-bold">SPV / LLP</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <span className="font-medium">Marketplace Exit</span>
                    <span className="text-warning font-bold">Available</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <p className="text-sm text-muted-foreground italic">
                    "From Grade-A towers to green farmlands, our investors build wealth across 
                    all categories of real estate with complete legal ownership and transparency."
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
