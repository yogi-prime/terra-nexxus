// sections/MarketplaceGrid.tsx
import { MarketplaceCard, MarketplaceProperty } from "./MarketplaceCard"; // ✅ import type
import { Building2 } from "lucide-react";

interface Props {
  properties: MarketplaceProperty[];
  viewMode: "grid" | "list";
}

export const MarketplaceGrid = ({ properties, viewMode }: Props) => {
  if (!properties.length) {
    return (
      <div className="text-center py-16">
        <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold">No properties found</h3>
        <p className="text-muted-foreground">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1"
      }`}
    >
      {properties.map((p) => (
        <MarketplaceCard key={p.id} property={p} viewMode={viewMode} />
      ))}
    </div>
  );
};
