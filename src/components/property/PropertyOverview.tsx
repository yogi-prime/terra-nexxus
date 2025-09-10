import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, Shield, MapPin } from 'lucide-react';

interface PropertyOverviewProps {
  property: any;
}

const PropertyOverview = ({ property }: PropertyOverviewProps) => {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Property Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Key Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {property.highlights.map((highlight: string, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span className="text-sm text-foreground">{highlight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hero Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-success/10 rounded-full">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {property.financials.capRate}%
            </p>
            <p className="text-sm text-muted-foreground">Cap Rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">Escrow</p>
            <p className="text-sm text-muted-foreground">Protected</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-accent/10 rounded-full">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">Prime</p>
            <p className="text-sm text-muted-foreground">Location</p>
          </CardContent>
        </Card>
      </div>

      {/* Investment Opportunity */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Opportunity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Market Opportunity</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cyber City represents one of India's premier business districts with consistent demand 
                from multinational corporations. The area has shown 12% annual growth in commercial 
                real estate values over the past 5 years.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Investment Thesis</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This Grade-A commercial property offers stable rental income from high-credit tenants 
                with long-term lease agreements, providing predictable cash flows and capital appreciation.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-4">
            <Badge variant="secondary">Fortune 500 Tenant</Badge>
            <Badge variant="secondary">15-Year Lease</Badge>
            <Badge variant="secondary">Triple Net</Badge>
            <Badge variant="secondary">Grade-A Building</Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyOverview;