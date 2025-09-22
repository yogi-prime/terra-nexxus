import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Users } from 'lucide-react';

interface PropertyOwnershipProps {
  property: any;
}

const PropertyOwnership = ({ property }: PropertyOwnershipProps) => {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold text-foreground">Ownership & Structure</h2>

      {/* SPV Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-muted/20 rounded-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium text-foreground">Investors</p>
              <p className="text-sm text-muted-foreground">You & Others</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Shield className="h-8 w-8 text-success" />
              </div>
              <p className="font-medium text-foreground">Property SPV</p>
              <p className="text-sm text-muted-foreground">Legal Ownership</p>
            </div>
          </div>

          {/* How it Works */}
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">How It Works</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Investment goes into a Special Purpose Vehicle (SPV)',
                  'SPV holds legal ownership of the property',
                  'Investors receive proportional shares',
                  'Rental income distributed to shareholders'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Legal Protection</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  'Ownership legally documented in SPV',
                  'Funds held in escrow for security',
                  'Independent trustee ensures compliance',
                  'Annual audits for transparency'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Regulatory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {['SEBI Compliant', 'Escrow Protected', 'KYC/AML Verified'].map((badge, i) => (
              <div key={i} className="text-center p-4 bg-muted/50 rounded-xl">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground">{badge}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {['Companies Act 2013', 'FEMA Compliant', 'Income Tax Act', 'RERA Registered'].map((b, i) => (
              <Badge key={i} variant="outline">{b}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyOwnership;
