import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plane, Train, GraduationCap, ShoppingBag, TrendingUp } from 'lucide-react';

interface PropertyLocationProps {
  property: any;
}

const PropertyLocation = ({ property }: PropertyLocationProps) => {
  const amenityIcons: { [key: string]: React.ReactNode } = {
    'IGI Airport': <Plane className="h-4 w-4" />,
    'Cyber City Metro': <Train className="h-4 w-4" />,
    'Top Schools': <GraduationCap className="h-4 w-4" />,
    'Ambience Mall': <ShoppingBag className="h-4 w-4" />
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Location & Infrastructure</h2>

      {/* Interactive Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Property Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Map placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
            <div className="relative z-10 text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="font-medium text-foreground">Interactive Map</p>
              <p className="text-sm text-muted-foreground">{property.location}</p>
            </div>
            
            {/* Property pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-destructive rounded-full border-2 border-background animate-pulse"></div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Coordinates: {property.coordinates.lat}, {property.coordinates.lng}
            </p>
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
            {property.nearbyAmenities.map((amenity: any, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="p-2 bg-background rounded-full">
                  {amenityIcons[amenity.name] || <MapPin className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{amenity.name}</p>
                  <p className="text-sm text-muted-foreground">{amenity.distance}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {amenity.distance}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Area Growth Potential */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-success" />
            Area Growth Potential
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Economic Indicators</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Property Price CAGR</span>
                  <Badge variant="outline" className="text-success">+12% p.a.</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rental Yield Growth</span>
                  <Badge variant="outline" className="text-success">+8% p.a.</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                  <Badge variant="outline" className="text-success">95%+</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Infrastructure Score</span>
                  <Badge variant="outline" className="text-success">A+</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-3">Development Projects</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  Metro Line extension to Cyber City (2024)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  New IT parks in adjacent sectors
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  Upgraded road infrastructure
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  Premium retail and hospitality projects
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <p className="text-sm text-success font-medium mb-1">Growth Projection</p>
            <p className="text-sm text-muted-foreground">
              This area is projected to grow at 12% CAGR over the next 5 years, driven by 
              infrastructure development and increasing corporate presence in Cyber City.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Location Advantages */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Location Advantages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Plane className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-foreground">Airport Proximity</p>
              <p className="text-xs text-muted-foreground">12 km to IGI Airport</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Train className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="font-medium text-foreground">Metro Connectivity</p>
              <p className="text-xs text-muted-foreground">Direct metro access</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="font-medium text-foreground">Business Hub</p>
              <p className="text-xs text-muted-foreground">Fortune 500 companies</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyLocation;