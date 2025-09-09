import { TrendingUp, Building2, Users, Target } from "lucide-react";

export const PropertiesHero = () => {
  const stats = [
    { label: "Total Properties Live", value: "47", icon: Building2 },
    { label: "Avg Yield %", value: "11.8%", icon: TrendingUp },
    { label: "Total Target Raise", value: "₹1,250 Cr", icon: Target },
    { label: "Total Raised So Far", value: "₹892 Cr", icon: Users },
  ];

  return (
    <section className="bg-gradient-to-br from-card via-card-premium to-card py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Browse Properties.{" "}
            <span className="gradient-text">Own Fraction by Fraction.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
            Discover Residential, Commercial, Farmhouses, Agri Land, Plots & Industrial assets 
            starting from ₹10,000.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card-premium border border-accent/20 rounded-xl p-6 text-center hover:border-accent/40 transition-all duration-300 hover:shadow-premium"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="h-8 w-8 text-accent" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};