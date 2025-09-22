import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plane, Train, GraduationCap, ShoppingBag, TrendingUp } from 'lucide-react';

interface PropertyLocationProps {
  property: any;
}

const PropertyLocation = ({ property }: PropertyLocationProps) => {
  const amenityIcons: Record<string, React.ReactNode> = {
    'SG Highway Metro': <Train className="h-4 w-4" />,
    'Cafes & Restaurants': <Plane className="h-4 w-4" />,
    'Shopping Centers': <ShoppingBag className="h-4 w-4" />,
    'Schools': <GraduationCap className="h-4 w-4" />
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Location & Infrastructure</h2>

      {/* Property Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Property Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{property.location}</p>
          <div className="mt-2 text-sm text-muted-foreground">
            Coordinates: {property.coordinates?.lat}, {property.coordinates?.lng}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Nearby Amenities & Connectivity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {property.nearbyAmenities?.map((amenity: any, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                <div className="p-2 bg-background rounded-full">
                  {amenityIcons[amenity.name] || <MapPin className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{amenity.name}</p>
                </div>
                <Badge variant="outline" className="text-xs">{amenity.distance}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Area Growth Potential (removed undefined arrays) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Area Growth Potential
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The area around SG Highway is rapidly developing with strong infrastructure and commercial growth potential.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyLocation;
