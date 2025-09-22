import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Shield, Clock } from 'lucide-react';

interface PropertyCTAProps {
  property: {
    raisedSoFar: number;
    minInvestment: number;
    projectedYield: number;
    targetRaise: number;
  };
}

const PropertyCTA = ({ property }: PropertyCTAProps) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const fundingProgress = (property.raisedSoFar / property.targetRaise) * 100;
  const investorCount = Math.floor(property.raisedSoFar / property.minInvestment * 1.2);

  return (
    <section className="bg-gradient-to-r from-primary/10 via-background to-accent/10 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Invest Today from small amount
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of investors building wealth through fractional real estate. 
              Start your property investment journey with Terra Nexxus.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-success/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(property.raisedSoFar)}</p>
              <p className="text-sm text-muted-foreground">Raised So Far</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{investorCount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Investors</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{property.projectedYield}%</p>
              <p className="text-sm text-muted-foreground">Projected Yield</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-warning/10 rounded-full">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{fundingProgress.toFixed(0)}%</p>
              <p className="text-sm text-muted-foreground">Funded</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 py-4">
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Shield className="h-3 w-3" /> SEBI Compliant
            </Badge>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Users className="h-3 w-3" /> Verified Investors
            </Badge>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Robust Returns
            </Badge>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" /> 2+ Years Track Record
            </Badge>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="min-w-48">
              Start KYC Process
            </Button>
            <Button variant="outline" size="lg" className="min-w-48">
              Invest Now
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              * Investments are subject to market risks. Past performance is not indicative of future results.
              Please read all documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyCTA;
