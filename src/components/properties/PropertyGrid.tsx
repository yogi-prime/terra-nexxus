import { PropertyCard } from "./PropertyCard";
import { Property } from "@/pages/Properties";
import { Building2 } from "lucide-react";

interface PropertyGridProps {
  properties: Property[];
  viewMode: "grid" | "list";
  onAddToCompare: (property: Property) => void;
  compareList: Property[];
}

export const PropertyGrid = ({ 
  properties, 
  viewMode, 
  onAddToCompare, 
  compareList 
}: PropertyGridProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-16">
        <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No properties found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === "grid" 
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
        : "grid-cols-1"
    }`}>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          viewMode={viewMode}
          onAddToCompare={onAddToCompare}
          isInCompare={compareList.some(p => p.id === property.id)}
        />
      ))}
    </div>
  );
};