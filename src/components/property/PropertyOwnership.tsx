import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, FileText, CheckCircle } from 'lucide-react';

interface PropertyOwnershipProps {
  property: any;
}

const PropertyOwnership = ({ property }: PropertyOwnershipProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Ownership & Structure</h2>

      {/* SPV Structure Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Flow Diagram */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-muted/20 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium text-foreground">Investors</p>
                <p className="text-sm text-muted-foreground">You & Others</p>
              </div>
              
              <div className="text-primary text-2xl">→</div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <Shield className="h-8 w-8 text-accent" />
                </div>
                <p className="font-medium text-foreground">Terra Nexxus</p>
                <p className="text-sm text-muted-foreground">Platform</p>
              </div>
              
              <div className="text-primary text-2xl">→</div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <FileText className="h-8 w-8 text-success" />
                </div>
                <p className="font-medium text-foreground">Property SPV</p>
                <p className="text-sm text-muted-foreground">Legal Entity</p>
              </div>
              
              <div className="text-primary text-2xl">→</div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <CheckCircle className="h-8 w-8 text-warning" />
                </div>
                <p className="font-medium text-foreground">Property Owner</p>
                <p className="text-sm text-muted-foreground">Asset</p>
              </div>
            </div>
            
            {/* Structure Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">How It Works</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Terra Nexxus creates a Special Purpose Vehicle (SPV) for each property
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Your investment gives you shares in the SPV
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    SPV holds legal ownership of the property
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                    Rental income distributed proportionally to shareholders
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Legal Protection</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Your ownership is legally documented
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Escrow account protects your investment
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Independent trustee manages SPV
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    Annual audits ensure transparency
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Share Certificate */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Share Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="border-2 border-dashed border-border p-6 rounded-lg bg-muted/20">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground">Share Certificate</h3>
                <p className="text-sm text-muted-foreground">Property SPV - {property.title}</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Certificate No.</span>
                  <span className="font-medium">SPV-001-XXXX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shareholder Name</span>
                  <span className="font-medium">[Your Name]</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">No. of Shares</span>
                  <span className="font-medium">XXX Shares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Face Value</span>
                  <span className="font-medium">₹10 per share</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ownership %</span>
                  <span className="font-medium">X.XXX%</span>
                </div>
              </div>
            </div>
            
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-6xl font-bold text-muted-foreground/10 rotate-45">
                SAMPLE
              </div>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Actual certificate will be issued post-investment and will include digital signatures and official seals.
          </p>
        </CardContent>
      </Card>

      {/* Compliance Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance & Regulatory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-foreground">SEBI Compliant</p>
              <p className="text-xs text-muted-foreground">Investment guidelines followed</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <FileText className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="font-medium text-foreground">Escrow Protected</p>
              <p className="text-xs text-muted-foreground">Funds held safely</p>
            </div>
            
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <CheckCircle className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="font-medium text-foreground">KYC/AML Verified</p>
              <p className="text-xs text-muted-foreground">Anti-money laundering checks</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            <Badge variant="outline">Companies Act 2013</Badge>
            <Badge variant="outline">FEMA Compliant</Badge>
            <Badge variant="outline">Income Tax Act</Badge>
            <Badge variant="outline">RERA Registered</Badge>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyOwnership;