import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Property } from "@/pages/Properties";
import { 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Shield, 
  Plus,
  Check,
  Eye
} from "lucide-react";

interface PropertyCardProps {
  property: Property;
  viewMode: "grid" | "list";
  onAddToCompare: (property: Property) => void;
  isInCompare: boolean;
}

export const PropertyCard = ({ 
  property, 
  viewMode, 
  onAddToCompare, 
  isInCompare 
}: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const fundingPercentage = (property.raisedAmount / property.targetRaise) * 100;
  
  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-success text-success-foreground";
      case "Closing Soon": return "bg-warning text-warning-foreground";
      case "Fully Funded": return "bg-primary text-primary-foreground";
      case "Closed": return "bg-muted text-muted-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-success";
      case "Medium": return "text-warning";
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 border-accent/20 hover:border-accent/40">
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Image */}
            <div className="relative w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
              <img
                src={property.image}
                alt={property.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              <Badge className={`absolute top-2 right-2 ${getStatusColor(property.status)}`}>
                {property.status}
              </Badge>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                    <Badge variant="outline" className="ml-2">
                      {property.category}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAddToCompare(property)}
                  disabled={isInCompare}
                  className="ml-4"
                >
                  {isInCompare ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Added
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      Compare
                    </>
                  )}
                </Button>
              </div>

              {/* KPIs Row */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Min Invest</p>
                  <p className="font-semibold">{formatCurrency(property.minInvest)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target Raise</p>
                  <p className="font-semibold">{formatCurrency(property.targetRaise)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projected Yield</p>
                  <p className="font-semibold text-success">{property.projectedYield}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tenure</p>
                  <p className="font-semibold">{property.tenure} months</p>
                </div>
              </div>

              {/* Progress and Highlights */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Funding Progress</span>
                  <span className="text-sm font-medium">{fundingPercentage.toFixed(1)}%</span>
                </div>
                <Progress value={fundingPercentage} className="mb-3" />
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Shield className={`h-4 w-4 mr-1 ${getRiskColor(property.riskBand)}`} />
                    <span className={getRiskColor(property.riskBand)}>{property.riskBand} Risk</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{property.tenure}M</span>
                  </div>
                </div>
                <Button variant="hero" className="ml-4">
                  <Eye className="h-4 w-4 mr-2" />
                  View Property
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-premium transition-all duration-300 border-accent/20 hover:border-accent/40 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={property.image}
          alt={property.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <Badge className={`absolute top-3 right-3 ${getStatusColor(property.status)}`}>
          {property.status}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddToCompare(property)}
          disabled={isInCompare}
          className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
        >
          {isInCompare ? (
            <Check className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>

      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
            <Badge variant="outline">{property.category}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div>
            <p className="text-muted-foreground">Min Invest</p>
            <p className="font-semibold">{formatCurrency(property.minInvest)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Target Raise</p>
            <p className="font-semibold">{formatCurrency(property.targetRaise)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Projected Yield</p>
            <p className="font-semibold text-success flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {property.projectedYield}%
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Tenure</p>
            <p className="font-semibold">{property.tenure} months</p>
          </div>
        </div>

        {/* Funding Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Funding Progress</span>
            <span className="text-sm font-medium">{fundingPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={fundingPercentage} />
          <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
            <span>{formatCurrency(property.raisedAmount)} raised</span>
            <span>{formatCurrency(property.targetRaise)} target</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {property.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <Shield className={`h-4 w-4 mr-1 ${getRiskColor(property.riskBand)}`} />
            <span className={getRiskColor(property.riskBand)}>{property.riskBand} Risk</span>
          </div>
          <Button variant="hero" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Property
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};