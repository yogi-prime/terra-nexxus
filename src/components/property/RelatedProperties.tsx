import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const BRILLIA_PROPERTY = {
  id: '1',
  title: 'BRILLIA - Pravish',
  location: 'Ahmedabad, Gujarat',
  category: 'Residential',
  image: '/brillia-cover.jpg', // actual BRILLIA image
  minInvestment: 100000,
  projectedYield: 12,
  fundingProgress: 75,
  raisedSoFar: 37500000,
  targetRaise: 50000000,
  riskBand: 'Moderate',
  tenure: '5 years'
};

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${amount.toLocaleString()}`;
};

const getCategoryColor = (category: string) => {
  if (category === 'Residential') return 'bg-green-500/10 text-green-600';
  return 'bg-muted text-muted-foreground';
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'Low': return 'text-success';
    case 'Moderate': return 'text-warning';
    case 'High': return 'text-destructive';
    default: return 'text-muted-foreground';
  }
};

const BRILLIAPropertyCard = () => {
  const property = BRILLIA_PROPERTY;

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-0">
        {/* Image */}
        <div className="aspect-video rounded-t-lg overflow-hidden">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <Badge className={`mb-2 ${getCategoryColor(property.category)}`}>
            {property.category}
          </Badge>
          <h3 className="font-semibold text-foreground">{property.title}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3" />
            {property.location}
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Min Investment</p>
              <p className="font-medium text-foreground">
                {formatCurrency(property.minInvestment)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Projected Yield</p>
              <p className="font-medium text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {property.projectedYield}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Risk Level</p>
              <p className={`font-medium ${getRiskColor(property.riskBand)}`}>
                {property.riskBand}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Tenure</p>
              <p className="font-medium text-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {property.tenure}
              </p>
            </div>
          </div>

          {/* Funding Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Funding Progress</span>
              <span className="text-sm font-medium text-foreground">
                {property.fundingProgress}%
              </span>
            </div>
            <Progress value={property.fundingProgress} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Raised: {formatCurrency(property.raisedSoFar)}</span>
              <span>Target: {formatCurrency(property.targetRaise)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Link to={`/property/${property.id}`} className="flex-1">
              <Button variant="outline" className="w-full" size="sm">
                View Details
              </Button>
            </Link>
            <Button className="flex-1" size="sm">
              Invest Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BRILLIAPropertyCard;
