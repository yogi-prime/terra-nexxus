import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PropertyFinancialsProps {
  property: any;
}

const PropertyFinancials = ({ property }: PropertyFinancialsProps) => {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground">Financials</h2>

      {/* Key Financial Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Rent per sq ft</span>
                <span className="font-medium text-foreground">₹{property.financials.rentPsf}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Vacancy Rate</span>
                <span className="font-medium text-foreground">{property.financials.vacancy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">O&M Expenses</span>
                <span className="font-medium text-foreground">{property.financials.oAndM}%</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Management Fee</span>
                <span className="font-medium text-foreground">{property.financials.managementFee}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Exit Cap Rate</span>
                <span className="font-medium text-foreground">{property.financials.exitCapRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Current Cap Rate</span>
                <span className="font-medium text-foreground">{property.financials.capRate}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optional: Funding Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Funding Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm mb-2">
            <span>Raised So Far</span>
            <span>₹{property.raisedSoFar.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Target Raise</span>
            <span>₹{property.targetRaise.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Investors</span>
            <span>{Math.floor(property.raisedSoFar / property.minInvestment * 1.2).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyFinancials;
