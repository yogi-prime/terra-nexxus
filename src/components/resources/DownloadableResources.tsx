import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Shield, 
  AlertTriangle, 
  BookOpen, 
  CheckCircle,
  Eye
} from "lucide-react";

const resources = [
  {
    id: 1,
    title: "Risk Disclosure Statement",
    description: "Comprehensive overview of investment risks, market factors, and regulatory disclosures as per SEBI guidelines.",
    icon: AlertTriangle,
    type: "PDF",
    size: "2.4 MB",
    downloads: "5.2K",
    category: "Legal",
    color: "text-warning"
  },
  {
    id: 2,
    title: "SEBI Compliance Guide",
    description: "Complete regulatory framework and compliance requirements for fractional real estate investments in India.",
    icon: Shield,
    type: "PDF", 
    size: "1.8 MB",
    downloads: "3.7K",
    category: "Legal",
    color: "text-primary"
  },
  {
    id: 3,
    title: "KYC Checklist & Requirements",
    description: "Step-by-step checklist for KYC completion including required documents and verification process.",
    icon: CheckCircle,
    type: "PDF",
    size: "980 KB", 
    downloads: "8.9K",
    category: "Process",
    color: "text-success"
  },
  {
    id: 4,
    title: "Sample SPV Share Certificate",
    description: "Example of legal ownership certificate that investors receive upon successful investment completion.",
    icon: FileText,
    type: "PDF",
    size: "650 KB",
    downloads: "12.1K",
    category: "Legal",
    color: "text-accent"
  },
  {
    id: 5,
    title: "Investor Onboarding Handbook",
    description: "Complete guide covering registration, investment process, payout schedules, and platform features.",
    icon: BookOpen,
    type: "PDF",
    size: "3.2 MB",
    downloads: "15.6K",
    category: "Guide",
    color: "text-secondary"
  },
  {
    id: 6,
    title: "Tax Guidelines for Fractional Ownership",
    description: "Detailed taxation information including TDS, capital gains, and compliance requirements for investors.",
    icon: FileText,
    type: "PDF",
    size: "1.5 MB",
    downloads: "4.8K",
    category: "Tax",
    color: "text-warning"
  },
  {
    id: 7,
    title: "Property Valuation Methodology",
    description: "How we evaluate and price properties for fractional investment including due diligence process.",
    icon: Eye,
    type: "PDF",
    size: "2.1 MB",
    downloads: "6.3K",
    category: "Process",
    color: "text-primary"
  },
  {
    id: 8,
    title: "Exit Strategy & Marketplace Guide",
    description: "Complete guide to selling fractional shares on secondary marketplace and exit procedures.",
    icon: FileText,
    type: "PDF",
    size: "1.3 MB",
    downloads: "9.2K",
    category: "Process",
    color: "text-accent"
  }
];

const categories = ["All", "Legal", "Process", "Guide", "Tax"];

export const DownloadableResources = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Legal": return "bg-primary/10 text-primary";
      case "Process": return "bg-success/10 text-success";
      case "Guide": return "bg-accent/10 text-accent";
      case "Tax": return "bg-warning/10 text-warning";
      default: return "bg-secondary/10 text-secondary";
    }
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Downloadable Resources</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Essential documents, guides, and compliance materials to support your investment journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 text-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {resources.map((resource) => (
            <Card key={resource.id} className="border-0 shadow-lg hover-glow hover-lift group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20`}>
                    <resource.icon className={`h-6 w-6 ${resource.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Badge className={`text-xs mb-2 ${getCategoryColor(resource.category)}`}>
                      {resource.category}
                    </Badge>
                    <h4 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>{resource.type} • {resource.size}</span>
                  <span>{resource.downloads} downloads</span>
                </div>

                <Button variant="outline" size="sm" className="w-full text-xs">
                  <Download className="mr-2 h-3 w-3" />
                  Download {resource.type}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bulk Download Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-8 text-center">
            <Download className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Download Complete Resource Pack</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get all essential documents in one convenient ZIP file. Perfect for new investors 
              who want comprehensive information about fractional real estate investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Download All (15.2 MB)
              </Button>
              <Button variant="outline" size="lg">
                Email Me the Resources
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              All documents are regularly updated to reflect current regulations and processes.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};