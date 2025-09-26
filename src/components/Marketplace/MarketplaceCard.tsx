// sections/MarketplaceCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Eye } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export interface MarketplaceProperty {
  id: string;
  property_type: "list" | "sell" | "buy" | "mortgage";
  property_name: string;
  address: string;
  price: string;
  price_ksqft: string;
  property_sqft: string;
  possession: string;
  configurations: string;
  bathroom: string;
  property_status: string;
  project_size: string;
  project_area: string;
  about_property: string;
  project_specifications: string[];
  project_amenities: string[];
  nearby_facilitys: string[];
  emi_starts_price: string;
  cover_image: string;
  images: string[];
  video?: string;
  download_brochure?: string;
  map_link?: string;
  google_map?: string;
}

interface Props {
  property: MarketplaceProperty;   // ✅ required
  viewMode: "grid" | "list";
}

export const MarketplaceCard = ({ property, viewMode }: Props) => {
  const navigate = useNavigate();

  return (
    <Card className="group border hover:shadow-md transition">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.cover_image} 
          alt={property.property_name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-white">
          {property.property_status}
        </Badge>
      </div>

      {/* Header */}
      <CardHeader>
        <h3 className="font-semibold text-lg mb-1">{property.property_name}</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {property.address}
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-semibold">{property.price}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Area</p>
            <p className="font-semibold">{property.property_sqft} sqft</p>
          </div>
          <div>
            <p className="text-muted-foreground">Configuration</p>
            <p className="font-semibold">{property.configurations}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Possession</p>
            <p className="font-semibold">{property.possession}</p>
          </div>
        </div>

        {/* Button */}
        <Button 
  variant="hero" 
  size="sm"
  onClick={() => navigate(`/marketplace/property/${property.id}`)} // ✅ match App.tsx route
>
  <Eye className="h-4 w-4 mr-2" /> View Details
</Button>

      </CardContent>
    </Card>
  );
};
