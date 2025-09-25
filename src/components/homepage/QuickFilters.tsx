import { Building2, Home, Factory, TreePine, Square, Users } from "lucide-react";

export const QuickFilters = () => {
  const propertyTypes = [
    { name: "Apartments", icon: Building2, count: "2,450+" },
    { name: "Villas", icon: Home, count: "890+" },
    { name: "Commercial", icon: Factory, count: "1,200+" },
    { name: "Plots", icon: Square, count: "3,100+" },
    { name: "Co-living", icon: Users, count: "450+" },
    { name: "Farmhouses", icon: TreePine, count: "280+" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Property Types
          </h2>
          <p className="text-lg text-muted-foreground">
            Find the perfect property that matches your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {propertyTypes.map((type) => (
            <button
              key={type.name}
              className="group bg-card border border-border rounded-xl p-6 text-center hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                  <type.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{type.name}</h3>
              <p className="text-sm text-muted-foreground">{type.count} listings</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};