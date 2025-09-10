import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Lock, Eye } from 'lucide-react';

interface PropertyLegalProps {
  property: any;
}

const PropertyLegal = ({ property }: PropertyLegalProps) => {
  const [isKYCCompleted] = useState(false); // In real app, get from user state

  const documentIcons: { [key: string]: React.ReactNode } = {
    'Title Deed': <FileText className="h-5 w-5 text-blue-600" />,
    'NOCs & Approvals': <FileText className="h-5 w-5 text-green-600" />,
    'Valuation Report': <FileText className="h-5 w-5 text-purple-600" />,
    'Lease Agreement': <FileText className="h-5 w-5 text-orange-600" />
  };

  const handleDocumentAction = (docName: string) => {
    if (isKYCCompleted) {
      // Download document
      console.log(`Downloading ${docName}`);
    } else {
      // Redirect to KYC
      console.log('Redirecting to KYC');
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Legal & Documents</h2>

      {/* KYC Status Alert */}
      {!isKYCCompleted && (
        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-warning" />
              <div>
                <p className="font-medium text-warning">Complete KYC to Access Documents</p>
                <p className="text-sm text-muted-foreground">
                  Legal documents are available after KYC verification for investor protection.
                </p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                Complete KYC
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {property.documents.map((doc: any, index: number) => (
          <Card key={index} className={`transition-all duration-200 ${!isKYCCompleted ? 'opacity-75' : 'hover:shadow-md'}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {documentIcons[doc.name] || <FileText className="h-5 w-5 text-muted-foreground" />}
                  <div>
                    <h3 className="font-medium text-foreground">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">{doc.size}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {isKYCCompleted ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDocumentAction(doc.name)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDocumentAction(doc.name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDocumentAction(doc.name)}
                      className="text-muted-foreground"
                    >
                      <Lock className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              {!isKYCCompleted && (
                <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground text-center">
                  Preview locked - Complete KYC to access
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Document Verification Info */}
      <Card>
        <CardHeader>
          <CardTitle>Document Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Legal Verification Process</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Title deed verification by independent legal counsel
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Property valuation by RICS-certified valuers
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Compliance check with local authorities
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Due diligence on property ownership history
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3">Compliance Certificates</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">SEBI Verified</Badge>
                <Badge variant="outline" className="text-xs">RICS Certified</Badge>
                <Badge variant="outline" className="text-xs">Legal Cleared</Badge>
                <Badge variant="outline" className="text-xs">Audit Complete</Badge>
              </div>
              
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  All documents have been verified by our legal and compliance team. 
                  For any queries, contact our grievance cell.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyLegal;