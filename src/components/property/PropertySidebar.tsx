import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Shield, Users } from 'lucide-react';

interface PropertySidebarProps {
  property: any;
}

const PropertySidebar = ({ property }: PropertySidebarProps) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  
  const fundingProgress = (property.raisedSoFar / property.targetRaise) * 100;
  const investorCount = Math.floor(property.raisedSoFar / property.minInvestment * 1.2);
  
  const calculateOwnership = () => {
    const amount = parseFloat(investmentAmount) || 0;
    return ((amount / property.targetRaise) * 100).toFixed(4);
  };
  
  const calculateMonthlyPayout = () => {
    const amount = parseFloat(investmentAmount) || 0;
    const ownership = amount / property.targetRaise;
    const annualYield = amount * (property.projectedYield / 100);
    return (annualYield / 12).toFixed(0);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6 sticky top-24">
      {/* Funding Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Funding Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground mb-1">
              {fundingProgress.toFixed(1)}%
            </p>
            <p className="text-sm text-muted-foreground">Complete</p>
          </div>
          
          <Progress value={fundingProgress} className="h-3" />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Raised</span>
              <span className="font-medium">{formatCurrency(property.raisedSoFar)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target</span>
              <span className="font-medium">{formatCurrency(property.targetRaise)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Investors</span>
              <span className="font-medium flex items-center gap-1">
                <Users className="h-3 w-3" />
                {investorCount.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Investment Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Investment Amount (₹)
            </label>
            <Input
              type="number"
              placeholder="50,000"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="text-lg"
            />
          </div>
          
          {investmentAmount && parseFloat(investmentAmount) >= property.minInvestment && (
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ownership %</span>
                <span className="text-sm font-medium">{calculateOwnership()}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Est. Monthly Payout</span>
                <span className="text-sm font-medium text-success">₹{calculateMonthlyPayout()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Return (3Y)</span>
                <span className="text-sm font-medium text-success">
                  ₹{((parseFloat(investmentAmount) || 0) * (1 + property.projectedYield/100 * 3)).toFixed(0)}
                </span>
              </div>
            </div>
          )}
          
          {investmentAmount && parseFloat(investmentAmount) < property.minInvestment && (
            <p className="text-sm text-destructive">
              Minimum investment is {formatCurrency(property.minInvestment)}
            </p>
          )}
          
          <Button className="w-full" size="lg">
            Invest Now
          </Button>
        </CardContent>
      </Card>

      {/* Yield Projection */}
      <Card>
        <CardHeader>
          <CardTitle>Yield Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Year 1</span>
              <span className="text-sm font-medium text-success">8.5%</span>
            </div>
            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Year 3</span>
              <span className="text-sm font-medium text-success">12.5%</span>
            </div>
            <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Year 5</span>
              <span className="text-sm font-medium text-success">15.2%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Disclaimer */}
      <Card className="border-warning/50 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <Shield className="h-5 w-5" />
            Risk Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Investments are subject to market risks. Past performance is not indicative of future results. 
            Please read all documents carefully before investing.
          </p>
          <Badge variant="outline" className="mt-2 text-xs">
            SEBI Compliant
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertySidebar;