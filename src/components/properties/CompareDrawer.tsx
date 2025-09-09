import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/pages/Properties";
import { X, BarChart3, TrendingUp, Calendar, Shield } from "lucide-react";

interface CompareDrawerProps {
  properties: Property[];
  onRemove: (propertyId: string) => void;
  onClear: () => void;
}

export const CompareDrawer = ({ properties, onRemove, onClear }: CompareDrawerProps) => {
  if (properties.length === 0) return null;

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-success";
      case "Medium": return "text-warning"; 
      case "High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-accent/20 shadow-xl animate-slide-in-right">
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold">
              Compare Properties ({properties.length}/3)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClear}>
              Clear All
            </Button>
            <Button variant="hero" size="sm">
              Compare in Detail
            </Button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
          {properties.map((property) => (
            <Card key={property.id} className="relative border-accent/20">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(property.id)}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-3 w-3" />
              </Button>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-sm mb-1 pr-8">{property.title}</h4>
                  <p className="text-xs text-muted-foreground">{property.location}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {property.category}
                  </Badge>
                </div>

                {/* Key Metrics */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yield:</span>
                    <span className="font-semibold text-success flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {property.projectedYield}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min Invest:</span>
                    <span className="font-semibold">{formatCurrency(property.minInvest)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tenure:</span>
                    <span className="font-semibold flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {property.tenure}M
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk:</span>
                    <span className={`font-semibold flex items-center ${getRiskColor(property.riskBand)}`}>
                      <Shield className="h-3 w-3 mr-1" />
                      {property.riskBand}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Progress:</span>
                    <span className="font-semibold">
                      {((property.raisedAmount / property.targetRaise) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty slots */}
          {Array.from({ length: 3 - properties.length }).map((_, index) => (
            <Card key={`empty-${index}`} className="border-dashed border-accent/30">
              <CardContent className="p-4 flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Add property to compare</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};