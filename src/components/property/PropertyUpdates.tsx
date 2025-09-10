import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Bookmark, MessageCircle, Calendar, Image, FileText, TrendingUp, Shield } from 'lucide-react';

const PropertyUpdates = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const filters = ['All', 'Compliance', 'Construction', 'Returns', 'Market Update'];
  
  const updates = [
    {
      id: 1,
      type: 'Returns',
      title: 'Q3 2024 Rental Payout Distributed',
      content: 'Successfully distributed ₹42.5L as quarterly rental income to all investors. Average yield achieved: 12.8% (annualized).',
      author: 'Terra Nexxus Finance Team',
      avatar: 'TN',
      timestamp: '2 days ago',
      likes: 45,
      comments: 12,
      attachments: ['Q3_Payout_Report.pdf'],
      category: 'Returns'
    },
    {
      id: 2,
      type: 'Compliance',
      title: 'Annual Property Audit Completed',
      content: 'Independent audit by KPMG completed successfully. All financial records and compliance requirements verified. Property valuation increased by 8.5% from last year.',
      author: 'Legal & Compliance',
      avatar: 'LC',
      timestamp: '1 week ago',
      likes: 28,
      comments: 6,
      attachments: ['Audit_Report_2024.pdf', 'Valuation_Certificate.pdf'],
      category: 'Compliance'
    },
    {
      id: 3,
      type: 'Market Update',
      title: 'Cyber City Real Estate Market Analysis',
      content: 'Commercial real estate in Cyber City showed 15% appreciation this year. Our property outperformed market average with 18% growth in valuation.',
      author: 'Market Research Team',
      avatar: 'MR',
      timestamp: '2 weeks ago',
      likes: 67,
      comments: 24,
      attachments: ['Market_Analysis_Report.pdf'],
      category: 'Market Update'
    },
    {
      id: 4,
      type: 'Construction',
      title: 'Building Renovation Project Update',
      content: 'Phase 1 of lobby renovation completed ahead of schedule. New modern interiors enhance property appeal. Expected to increase rental rates by 5-8%.',
      author: 'Property Management',
      avatar: 'PM',
      timestamp: '3 weeks ago',
      likes: 34,
      comments: 8,
      attachments: ['renovation_photos.jpg'],
      category: 'Construction'
    },
    {
      id: 5,
      type: 'Compliance',
      title: 'SEBI Guidelines Compliance Update',
      content: 'All investor documentation updated as per latest SEBI guidelines for fractional ownership. No action required from investors.',
      author: 'Regulatory Affairs',
      avatar: 'RA',
      timestamp: '1 month ago',
      likes: 22,
      comments: 4,
      attachments: ['SEBI_Compliance_Certificate.pdf'],
      category: 'Compliance'
    }
  ];

  const filteredUpdates = selectedFilter === 'All' 
    ? updates 
    : updates.filter(update => update.category === selectedFilter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Returns':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'Compliance':
        return <Shield className="h-4 w-4 text-primary" />;
      case 'Construction':
        return <Image className="h-4 w-4 text-warning" />;
      case 'Market Update':
        return <MessageCircle className="h-4 w-4 text-accent" />;
      default:
        return <Calendar className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Returns':
        return 'text-success';
      case 'Compliance':
        return 'text-primary';
      case 'Construction':
        return 'text-warning';
      case 'Market Update':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Updates & Community Feed</h2>
        <Badge variant="outline" className="text-xs">
          {filteredUpdates.length} updates
        </Badge>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter)}
            className="text-xs"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Updates Timeline */}
      <div className="space-y-4">
        {filteredUpdates.map((update) => (
          <Card key={update.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Avatar */}
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {update.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getTypeIcon(update.type)}
                        <h3 className="font-semibold text-foreground">{update.title}</h3>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getTypeColor(update.type)}`}
                        >
                          {update.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        By {update.author} • {update.timestamp}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-foreground leading-relaxed">
                    {update.content}
                  </p>

                  {/* Attachments */}
                  {update.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {update.attachments.map((attachment, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {attachment}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Heart className="h-4 w-4" />
                      <span>{update.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{update.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      <Bookmark className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscription Notice */}
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-6 text-center">
          <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Stay Updated
          </h3>
          <p className="text-muted-foreground mb-4">
            Subscribe to property updates to receive notifications about important announcements, 
            payouts, and market insights directly to your email.
          </p>
          <Button variant="outline" size="sm">
            Manage Notifications
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyUpdates;