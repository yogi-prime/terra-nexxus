import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Shield, Clock } from 'lucide-react';

interface PropertyCTAProps {
  property: any;
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
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Invest Today from Just ₹50,000
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of investors building wealth through fractional real estate. 
              Start your property investment journey with Terra Nexxus.
            </p>
          </div>

          {/* Dynamic Stats */}
          <div className="grid md:grid-cols-4 gap-6 py-6">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-success/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {formatCurrency(property.raisedSoFar)}
              </p>
              <p className="text-sm text-muted-foreground">Raised So Far</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {investorCount.toLocaleString()}+
              </p>
              <p className="text-sm text-muted-foreground">Investors</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {property.projectedYield}%
              </p>
              <p className="text-sm text-muted-foreground">Projected Yield</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-warning/10 rounded-full">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {fundingProgress.toFixed(0)}%
              </p>
              <p className="text-sm text-muted-foreground">Funded</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-3 py-4">
            <Badge variant="outline" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              SEBI Compliant
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              15,000+ Investors
            </Badge>
            <Badge variant="outline" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              ₹1000Cr+ AUM
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              2+ Years Track Record
            </Badge>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="min-w-48">
              Start KYC Process
            </Button>
            <Button variant="outline" size="lg" className="min-w-48">
              Invest Now
            </Button>
          </div>

          {/* Legal Disclaimer */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              * Investments are subject to market risks. Past performance is not indicative of future results. 
              Please read all documents carefully before investing. Terra Nexxus is committed to investor protection 
              and regulatory compliance. For grievances, contact our investor relations team.
            </p>
          </div>

          {/* Urgency Element */}
          {fundingProgress > 80 && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm font-medium text-warning mb-1">
                🔥 Limited Spots Remaining
              </p>
              <p className="text-xs text-muted-foreground">
                Only {(100 - fundingProgress).toFixed(0)}% funding left. Secure your investment today.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PropertyCTA;