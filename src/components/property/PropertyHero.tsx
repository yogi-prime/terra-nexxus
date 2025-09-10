import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyHeroProps {
  property: any;
}

const PropertyHero = ({ property }: PropertyHeroProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const fundingProgress = (property.raisedSoFar / property.targetRaise) * 100;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <section className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="relative">
            <div className="aspect-video bg-muted rounded-xl overflow-hidden">
              <img 
                src={property.images[currentImage]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              
              {/* Play Video Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-4 right-4 bg-background/80 hover:bg-background h-12 w-12"
              >
                <Play className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="flex gap-2 mt-4">
              {property.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                    currentImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Property Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {property.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {property.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {property.location}
              </p>
            </div>
            
            {/* KPI Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">Min Investment</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(property.minInvestment)}
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">Projected Yield</p>
                <p className="text-2xl font-bold text-success">
                  {property.projectedYield}%
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">Target Raise</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(property.targetRaise)}
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground">Risk Band</p>
                <p className={`text-2xl font-bold ${
                  property.riskBand === 'Low' ? 'text-success' :
                  property.riskBand === 'Moderate' ? 'text-warning' : 'text-destructive'
                }`}>
                  {property.riskBand}
                </p>
              </div>
            </div>
            
            {/* Funding Progress */}
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-muted-foreground">Funding Progress</p>
                <p className="text-sm font-bold text-foreground">{fundingProgress.toFixed(1)}%</p>
              </div>
              <Progress value={fundingProgress} className="mb-4" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Raised: {formatCurrency(property.raisedSoFar)}
                </span>
                <span className="text-muted-foreground">
                  Target: {formatCurrency(property.targetRaise)}
                </span>
              </div>
            </div>
            
            {/* CTA */}
            <Button size="lg" className="w-full">
              Invest Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHero;