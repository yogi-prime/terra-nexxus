import { Home, Key, Building2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const CoreServices = () => {
  const services = [
    {
      icon: Home,
      title: "Buy Property",
      description: "Find your dream home from verified listings across India",
      cta: "Explore Buy",
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Key,
      title: "Rent Property",
      description: "Discover rental properties with flexible terms and zero hassle",
      cta: "Explore Rent", 
      gradient: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Building2,
      title: "Lease Property",
      description: "Commercial and industrial spaces for long-term partnerships",
      cta: "Explore Lease",
      gradient: "from-orange-500 to-amber-600", 
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      icon: CreditCard,
      title: "Mortgage Solutions",
      description: "Get the best home loan rates with instant approvals",
      cta: "Explore Mortgage",
      gradient: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your complete real estate solution for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-3"
            >
              <div className={`absolute inset-0 ${service.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <CardContent className="p-8 text-center relative z-10">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:border-primary group-hover:text-primary"
                >
                  {service.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};