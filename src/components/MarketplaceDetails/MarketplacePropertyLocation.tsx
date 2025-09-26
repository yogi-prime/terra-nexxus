// MarketplacePropertyLocation.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface MarketplacePropertyLocationProps {
  property: {
    google_map?: string | null;
    map_link?: string | null;
  };
}

export const MarketplacePropertyLocation = ({ property }: MarketplacePropertyLocationProps) => {
  // Helper: ensure correct embed link
  const getEmbedUrl = (url: string) => {
    if (url.includes("/embed?")) {
      // already an embed link
      return url;
    }
    // fallback (open in new tab) if wrong format
    return `https://www.google.com/maps?q=${encodeURIComponent(url)}&output=embed`;
  };

  return (
    <Card className="rounded-2xl border shadow-sm bg-white">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Location
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
  {property.google_map ? (
    <div className="rounded-xl overflow-hidden shadow-sm border">
      <iframe
        src={property.google_map}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  ) : (
    <p className="text-sm text-muted-foreground">Location not available.</p>
  )}

  {property.map_link && (
    <a
      href={property.map_link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
    >
      <MapPin className="w-4 h-4" />
      View on Google Maps
    </a>
  )}
</CardContent>

    </Card>
  );
};

export default MarketplacePropertyLocation;
