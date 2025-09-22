import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, MapPin } from 'lucide-react';

interface PropertyOverviewProps {
  property: any;
}

const PropertyOverview = ({ property }: PropertyOverviewProps) => {
  return (
    <section className="space-y-8">
      {/* Property Description */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Property Overview</h2>
        <p className="text-muted-foreground leading-relaxed">{property.description}</p>
      </div>

      {/* Key Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {property.highlights?.map((highlight: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span className="text-sm text-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Property Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="rounded-xl border border-border">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{property.projectedYield}%</p>
            <p className="text-sm text-muted-foreground">Projected Yield</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl border border-border">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-accent/10">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{property.location}</p>
            <p className="text-sm text-muted-foreground">Location</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PropertyOverview;
