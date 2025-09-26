import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, MapPin, ListChecks } from "lucide-react";

interface MarketplacePropertyAmenitiesProps {
  property: {
    project_amenities?: string[] | string;
    nearby_facilitys?: string[] | string;
    project_specifications?: string | null;
  };
}

const MarketplacePropertyAmenities = ({ property }: MarketplacePropertyAmenitiesProps) => {
  const amenities = Array.isArray(property.project_amenities)
    ? property.project_amenities
    : property.project_amenities
    ? property.project_amenities.split(",").map((a: string) => a.trim())
    : [];

  const facilities = Array.isArray(property.nearby_facilitys)
    ? property.nearby_facilitys
    : property.nearby_facilitys
    ? property.nearby_facilitys.split(",").map((f: string) => f.trim())
    : [];

  const specificationsText = property.project_specifications?.trim();

  return (
    <div className="space-y-8">
      {/* Specifications Section */}
      <Card className="rounded-2xl border shadow-sm">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" />
            Specifications
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {specificationsText || "No specifications available."}
          </p>
        </CardContent>
      </Card>

      {/* Amenities & Facilities in 1 Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Amenities Section */}
        <Card className="rounded-2xl border shadow-sm h-full">
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              Amenities
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {amenities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenities.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 hover:bg-muted/60 transition"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{a}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-muted-foreground">No amenities listed.</p>
            )}
          </CardContent>
        </Card>

        {/* Facilities Section */}
        <Card className="rounded-2xl border shadow-sm h-full">
          <CardHeader className="border-b pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              Nearby Facilities
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {facilities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {facilities.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2 hover:bg-muted/60 transition"
                  >
                    <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-muted-foreground">No facilities listed.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketplacePropertyAmenities;
