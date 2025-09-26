import React from "react";
import { MapPin, Home, Square, Building, Info, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketplacePropertyOverviewProps {
  property: {
    property_name: string;
    address: string;
    cover_image?: string;
    price?: string;
    property_type?: string;
    configurations?: string;
    property_sqft?: string;
    property_status?: string;
    about_property?: string | null;
  };
}

const MarketplacePropertyOverview = ({ property }: MarketplacePropertyOverviewProps) => {
  const quickInfo = [
    { label: "Configurations", value: property.configurations, icon: Home },
    { label: "Carpet Area", value: property.property_sqft, icon: Square },
    { label: "Status", value: property.property_status, icon: Building },
    { label: "Price", value: property.price, icon: DollarSign },
  ].filter((i) => i.value);

  const aboutText = property.about_property?.trim();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Left: Image only */}
      <div className="relative w-full h-72 md:h-[500px] rounded-2xl overflow-hidden group shadow">
        {property.cover_image && (
          <img
            src={property.cover_image}
            alt={property.property_name}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      {/* Right: Details */}
      <div className="space-y-8">
        {/* Property Details */}
        <div>
          {property.property_type && (
            <Badge
              variant="secondary"
              className="capitalize mb-3 bg-primary/10 text-primary border border-primary/20"
            >
              {property.property_type}
            </Badge>
          )}
          <h1 className="text-2xl md:text-3xl font-semibold">
            {property.property_name}
          </h1>
          <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            {property.address}
          </p>
        </div>

        {/* Quick Info Section inside Card */}
{quickInfo.length > 0 && (
  <Card className="rounded-2xl border shadow-sm">
    <CardContent className="pt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {quickInfo.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-4 rounded-xl border bg-white shadow-sm px-5 py-4 
                         hover:shadow-md hover:border-primary/40 transition-all duration-200"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-base font-semibold text-foreground">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </CardContent>
  </Card>
)}

        {/* About Section */}
        <Card className="rounded-2xl border shadow-sm">
          <CardHeader className="border-b pb-3">
  <CardTitle className="text-lg font-semibold flex items-center gap-2">
    <Home className="w-5 h-5 text-primary" />
    Property Overview
  </CardTitle>
</CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {aboutText || "No description available."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketplacePropertyOverview;
