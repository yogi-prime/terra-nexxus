import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import InvestmentModal from '@/components/property/InvestmentModal';

interface PropertyHeroProps {
  property: any;
}

const PropertyHero = ({ property }: PropertyHeroProps) => {
  const [modalOpen, setModalOpen] = useState(false); // ✅ Added state

  const fundingProgress = (property.raisedSoFar / property.targetRaise) * 100;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <section className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8">

        {/* Property Image */}
        <div className="rounded-xl overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-full object-cover rounded-xl" 
          />
        </div>

        {/* Property Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">{property.category}</Badge>
            <h1 className="text-3xl font-bold text-foreground mb-2">{property.title}</h1>
            <p className="text-lg text-muted-foreground">{property.location}</p>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <p className="text-sm text-muted-foreground">Min Investment</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(property.minInvestment)}</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <p className="text-sm text-muted-foreground">Projected Yield</p>
              <p className="text-2xl font-bold text-success">{property.projectedYield}%</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <p className="text-sm text-muted-foreground">Target Raise</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(property.targetRaise)}</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <p className="text-sm text-muted-foreground">Risk Band</p>
              <p className={`text-2xl font-bold ${
                property.riskBand === 'Low' ? 'text-success' :
                property.riskBand === 'Medium' ? 'text-warning' : 'text-destructive'
              }`}>{property.riskBand}</p>
            </div>
          </div>

          {/* Funding Progress */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-muted-foreground">Funding Progress</p>
              <p className="text-sm font-bold text-foreground">{fundingProgress.toFixed(1)}%</p>
            </div>
            <Progress value={fundingProgress} className="mb-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Raised: {formatCurrency(property.raisedSoFar)}</span>
              <span>Target: {formatCurrency(property.targetRaise)}</span>
            </div>
          </div>

          {/* CTA */}
          <Button size="lg" className="w-full" onClick={() => setModalOpen(true)}>
            Invest Now
          </Button>

          {/* Investment Modal */}
          <InvestmentModal
            property={property}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>

      </div>
    </section>
  );
};

export default PropertyHero;
