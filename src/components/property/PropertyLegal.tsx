import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye } from 'lucide-react';

interface PropertyLegalProps {
  property: any;
}

const PropertyLegal = ({ property }: PropertyLegalProps) => {
  const documentIcons: Record<string, React.ReactNode> = {
    'Title Deed': <FileText className="h-5 w-5 text-blue-600" />,
    'NOCs & Approvals': <FileText className="h-5 w-5 text-green-600" />,
    'Valuation Report': <FileText className="h-5 w-5 text-purple-600" />,
    'Lease Agreement': <FileText className="h-5 w-5 text-orange-600" />
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Legal & Documents</h2>

      {/* Documents List */}
      <div className="grid md:grid-cols-2 gap-4">
        {property.documents.map((doc: any, idx: number) => (
          <Card key={idx} className="hover:shadow-lg transition-all duration-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {documentIcons[doc.name] || <FileText className="h-5 w-5 text-muted-foreground" />}
                <div>
                  <h3 className="font-medium text-foreground">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">{doc.size}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Eye className="h-5 w-5 text-primary cursor-pointer" />
                <Download className="h-5 w-5 text-primary cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance Info */}
      <Card>
        <CardHeader>
          <CardTitle>Verification & Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Legal Verification</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Title deed verified by independent legal counsel</li>
                <li>Property valuation by RICS-certified valuers</li>
                <li>Compliance check with local authorities</li>
                <li>Due diligence on property ownership history</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-3">Compliance Certificates</h4>
              <div className="flex flex-wrap gap-2">
                {['SEBI Verified', 'RICS Certified', 'Legal Cleared', 'Audit Complete'].map((badge, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{badge}</Badge>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                All documents are verified by the legal and compliance team.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyLegal;
