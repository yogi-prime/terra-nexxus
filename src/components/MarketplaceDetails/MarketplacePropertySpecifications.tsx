import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Bath,
  Calendar,
  Layers,
  Ruler,
  CreditCard,
  Info,
} from "lucide-react";

interface MarketplacePropertySpecificationsProps {
  property: {
    price_ksqft?: string;
    possession?: string;
    bathroom?: string;
    project_size?: string;
    project_area?: string;
    emi_starts_price?: string;
  };
}

export const MarketplacePropertySpecifications = ({ property }: MarketplacePropertySpecificationsProps) => {
  const specs = [
    { label: "Price / Sqft", value: property.price_ksqft, icon: DollarSign },
    { label: "Bathrooms", value: property.bathroom, icon: Bath },
    { label: "Possession", value: property.possession, icon: Calendar },
    { label: "Project Size", value: property.project_size, icon: Layers },
    { label: "Project Area", value: property.project_area, icon: Ruler },
    { label: "EMI Starts From", value: property.emi_starts_price, icon: CreditCard },
  ].filter((s) => s.value);

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader className="border-b pb-3">
  <CardTitle className="text-lg font-semibold flex items-center gap-2">
    <Info className="w-5 h-5 text-primary" />
    Essential Information
  </CardTitle>
</CardHeader>
      <CardContent className="pt-6">
        {specs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specs.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg bg-muted/40 px-4 py-3 hover:bg-muted/60 transition"
                >
                  <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-sm font-medium">{s.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm italic text-muted-foreground">No specifications available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketplacePropertySpecifications;
