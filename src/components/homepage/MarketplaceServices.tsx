import { CreditCard, Home, Shield, Percent, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const MarketplaceServices = () => {
  const services = [
    {
      icon: Percent,
      title: "Home Loans",
      description: "Lowest interest rates starting from 8.5% with instant approval",
      badge: "Upto ₹50K Cashback",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Clock,
      title: "Rent Now, Pay Later",
      description: "Move in immediately, pay rent in flexible EMIs",
      badge: "Zero Security Deposit",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Home,
      title: "Zero Brokerage",
      description: "Direct owner properties with no hidden charges",
      badge: "Save Lakhs",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Shield,
      title: "Property Protection",
      description: "100% verified properties with legal safeguard guarantee",
      badge: "Fraud Protection",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Terranexxus?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of real estate with our comprehensive marketplace services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-3"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <CardContent className="p-6 text-center relative z-10">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full bg-gradient-to-br ${service.color} shadow-lg`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${service.color} text-white`}>
                    {service.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
            <p className="text-sm text-muted-foreground">Properties Listed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">2L+</div>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-sm text-muted-foreground">Trusted Developers</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">15+</div>
            <p className="text-sm text-muted-foreground">Cities Covered</p>
          </div>
        </div>
      </div>
    </section>
  );
};