import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileText, TrendingUp, Shield, Calendar } from 'lucide-react';

const BRILLIA_UPDATES = [
  {
    id: 1,
    type: 'Returns',
    title: 'Q3 2025 Rental Payout Distributed',
    content: 'Successfully distributed ₹42.5L as quarterly rental income to all investors. Average yield achieved: 12% annualized.',
    author: 'BRILLIA Finance Team',
    avatar: 'BF',
    timestamp: '2 days ago',
    attachments: ['Q3_Payout_Report.pdf'],
  },
  {
    id: 2,
    type: 'Compliance',
    title: 'Annual Property Audit Completed',
    content: 'Independent audit by KPMG completed successfully. All financial records and compliance requirements verified.',
    author: 'Legal & Compliance',
    avatar: 'LC',
    timestamp: '1 week ago',
    attachments: ['Audit_Report_2025.pdf'],
  },
  {
    id: 3,
    type: 'Market Update',
    title: 'Ahmedabad Real Estate Market Analysis',
    content: 'Commercial real estate in Ahmedabad showed 12% appreciation this year. BRILLIA outperformed market average with 15% growth in valuation.',
    author: 'Market Research Team',
    avatar: 'MR',
    timestamp: '2 weeks ago',
    attachments: ['Market_Analysis_Report.pdf'],
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Returns': return <TrendingUp className="h-4 w-4 text-success" />;
    case 'Compliance': return <Shield className="h-4 w-4 text-primary" />;
    case 'Market Update': return <Calendar className="h-4 w-4 text-accent" />;
    default: return null;
  }
};

const PropertyUpdates = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">BRILLIA Updates</h2>

      <div className="space-y-4">
        {BRILLIA_UPDATES?.map((update) => (
          <Card key={update.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Avatar */}
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {update.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {getTypeIcon(update.type)}
                    <h3 className="font-semibold text-foreground">{update.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {update.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    By {update.author} • {update.timestamp}
                  </p>
                  <p className="text-foreground leading-relaxed">{update.content}</p>

                  {update.attachments?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {update.attachments.map((attachment, index) => (
                        <Badge key={index} variant="outline" className="text-xs flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {attachment}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PropertyUpdates;
