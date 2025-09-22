import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, Shield } from 'lucide-react';
import InvestmentModal from '@/components/property/InvestmentModal';

interface PropertySidebarProps {
  property: {
    minInvestment: number;
    projectedYield: number;
    raisedSoFar: number;
    targetRaise: number;
    title?: string;
    riskBand?: string;
  };
}

const PropertySidebar = ({ property }: PropertySidebarProps) => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const fundingProgress = Math.floor((property.raisedSoFar / property.targetRaise) * 100);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const calculateOwnership = () => {
    if (!investmentAmount) return 0;
    return ((parseFloat(investmentAmount) / property.targetRaise) * 100).toFixed(2);
  };

  const calculateMonthlyPayout = () => {
    if (!investmentAmount) return 0;
    const totalReturn = parseFloat(investmentAmount) * (property.projectedYield / 100) * 3; // 3 years
    return Math.round(totalReturn / (3 * 12)); // Monthly payout
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
            <p className="text-3xl font-bold text-foreground mb-1">{fundingProgress}%</p>
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
              <span className="text-muted-foreground">Minimum Investment</span>
              <span className="font-medium">{formatCurrency(property.minInvestment)}</span>
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
              placeholder={formatCurrency(property.minInvestment)}
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          {investmentAmount && parseFloat(investmentAmount) < property.minInvestment && (
            <p className="text-sm text-destructive">
              Minimum investment is {formatCurrency(property.minInvestment)}
            </p>
          )}

          {/* Calculated Results */}
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
                  ₹{((parseFloat(investmentAmount) || 0) * (1 + (property.projectedYield / 100) * 3)).toFixed(0)}
                </span>
              </div>
            </div>
          )}

          {/* Invest Now Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={() => setModalOpen(true)}
            disabled={!investmentAmount || parseFloat(investmentAmount) < property.minInvestment} // optional: disable if invalid
          >
            Invest Now
          </Button>

          {/* Investment Modal */}
          <InvestmentModal
            property={property}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            initialAmount={investmentAmount} // ✅ Pass the calculator value
          />
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
