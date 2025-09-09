import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, BookOpen, Video, FileText } from "lucide-react";

export const ResourcesHero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-16 h-16 bg-primary rounded-lg rotate-12"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-accent rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-success rounded-lg -rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-10 h-10 bg-warning rounded-full"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            Complete Investor Toolkit
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Resources & Tools to Make
            <br />
            Smarter Real Estate Investments
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            From interactive calculators to expert guides, from video tutorials to compliance tools – 
            everything you need to master fractional real estate investing in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              <Calculator className="mr-2 h-5 w-5" />
              Explore Tools
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              <BookOpen className="mr-2 h-5 w-5" />
              Read Guides
            </Button>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Calculator, label: "Calculators", count: "6 Tools" },
              { icon: BookOpen, label: "Guides", count: "25+ Articles" },
              { icon: Video, label: "Videos", count: "15 Tutorials" },
              { icon: FileText, label: "Downloads", count: "12 Resources" }
            ].map((item, index) => (
              <div key={index} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border hover-glow">
                <item.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="font-semibold text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};