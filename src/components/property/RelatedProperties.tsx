import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const RelatedProperties = () => {
  const relatedProperties = [
    {
      id: '2',
      title: 'Luxury Farmhouse - Manesar',
      location: 'Sector 5, Manesar, Haryana',
      category: 'Agricultural',
      image: '/placeholder.svg',
      minInvestment: 75000,
      projectedYield: 15.2,
      fundingProgress: 67,
      raisedSoFar: 16750000,
      targetRaise: 25000000,
      riskBand: 'Moderate',
      tenure: '5 years'
    },
    {
      id: '3',
      title: 'Premium Office Complex - Noida',
      location: 'Sector 62, Noida, UP',
      category: 'Commercial',
      image: '/placeholder.svg',
      minInvestment: 100000,
      projectedYield: 11.8,
      fundingProgress: 89,
      raisedSoFar: 44500000,
      targetRaise: 50000000,
      riskBand: 'Low',
      tenure: '7 years'
    },
    {
      id: '4',
      title: 'Residential Towers - Dwarka',
      location: 'Sector 24, Dwarka, Delhi',
      category: 'Residential',
      image: '/placeholder.svg',
      minInvestment: 50000,
      projectedYield: 9.5,
      fundingProgress: 23,
      raisedSoFar: 6900000,
      targetRaise: 30000000,
      riskBand: 'Low',
      tenure: '4 years'
    },
    {
      id: '5',
      title: 'Industrial Warehouse - Bhiwadi',
      location: 'Industrial Area, Bhiwadi, Rajasthan',
      category: 'Industrial',
      image: '/placeholder.svg',
      minInvestment: 80000,
      projectedYield: 13.7,
      fundingProgress: 45,
      raisedSoFar: 9000000,
      targetRaise: 20000000,
      riskBand: 'Moderate',
      tenure: '6 years'
    }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Commercial':
        return 'bg-blue-500/10 text-blue-600';
      case 'Residential':
        return 'bg-green-500/10 text-green-600';
      case 'Agricultural':
        return 'bg-yellow-500/10 text-yellow-600';
      case 'Industrial':
        return 'bg-purple-500/10 text-purple-600';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-success';
      case 'Moderate':
        return 'text-warning';
      case 'High':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">You May Also Like</h2>
        <Link to="/properties">
          <Button variant="outline" size="sm">
            View All Properties
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {relatedProperties.map((property) => (
          <Card key={property.id} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              {/* Image */}
              <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Header */}
                <div>
                  <Badge className={`mb-2 ${getCategoryColor(property.category)}`}>
                    {property.category}
                  </Badge>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </p>
                </div>

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
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Discover More Investment Opportunities
          </h3>
          <p className="text-muted-foreground mb-4">
            Explore our diverse portfolio of properties across residential, commercial, 
            agricultural, and industrial categories.
          </p>
          <Link to="/properties">
            <Button size="lg">
              Browse All Properties
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
};

export default RelatedProperties;