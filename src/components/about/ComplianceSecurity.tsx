import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileText, 
  Lock, 
  CheckCircle, 
  Download,
  Eye,
  Building,
  CreditCard,
  Users,
  AlertTriangle
} from "lucide-react";

const complianceFeatures = [
  {
    icon: Shield,
    title: "SEBI Compliance",
    description: "Full adherence to Securities and Exchange Board regulations",
    details: "All investment structures comply with SEBI guidelines for alternative investment platforms.",
    status: "Certified",
    color: "text-success"
  },
  {
    icon: CreditCard,
    title: "Escrow Protection",
    description: "All investor funds held in secure escrow accounts",
    details: "Third-party escrow ensures your money is protected until investment completion.",
    status: "Active",
    color: "text-primary"
  },
  {
    icon: Building,
    title: "SPV/LLP Structure",
    description: "Legal ownership through Special Purpose Vehicles",
    details: "Each property investment backed by legal entity providing clear ownership rights.",
    status: "Implemented",
    color: "text-accent"
  },
  {
    icon: Eye,
    title: "AML/KYC Protocols",
    description: "Robust anti-money laundering and know-your-customer processes",
    details: "Enhanced due diligence and continuous monitoring of all transactions.",
    status: "Compliant",
    color: "text-warning"
  },
  {
    icon: Lock,
    title: "Data Security",
    description: "Bank-grade encryption and security measures",
    details: "ISO 27001 certified data protection with regular security audits.",
    status: "Secured",
    color: "text-secondary"
  },
  {
    icon: CheckCircle,
    title: "Audit Transparency",
    description: "Regular third-party audits and compliance reviews",
    details: "Quarterly audits by leading chartered accountancy firms ensure transparency.",
    status: "Verified",
    color: "text-success"
  }
];

const documents = [
  {
    title: "Risk Disclosure Document",
    description: "Comprehensive overview of investment risks and disclosures",
    size: "2.4 MB",
    type: "PDF",
    icon: AlertTriangle
  },
  {
    title: "Compliance Handbook",
    description: "Detailed guide to our regulatory compliance framework",
    size: "1.8 MB", 
    type: "PDF",
    icon: FileText
  },
  {
    title: "Terms & Conditions",
    description: "Complete terms of service and investment conditions",
    size: "980 KB",
    type: "PDF", 
    icon: FileText
  },
  {
    title: "Privacy Policy",
    description: "Data protection and privacy policy details",
    size: "650 KB",
    type: "PDF",
    icon: Lock
  },
  {
    title: "SEBI Compliance Certificate",
    description: "Official regulatory compliance certification",
    size: "420 KB",
    type: "PDF",
    icon: Shield
  },
  {
    title: "Audit Reports",
    description: "Latest third-party audit and compliance reports",
    size: "3.2 MB",
    type: "PDF",
    icon: CheckCircle
  }
];

const securityMetrics = [
  { label: "Security Incidents", value: "0", period: "Last 24 Months" },
  { label: "Compliance Score", value: "100%", period: "SEBI Rating" },
  { label: "Audit Success Rate", value: "100%", period: "All Audits" },
  { label: "Data Encryption", value: "256-bit", period: "AES Encryption" }
];

export const ComplianceSecurity = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Compliance & Security</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your investments are protected by robust compliance frameworks, legal structures, and bank-grade security measures
          </p>
        </div>

        {/* Compliance Features Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Our Compliance Framework</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover-glow group">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-success/20 to-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <Badge variant="outline" className={`text-xs ${feature.color}`}>
                      {feature.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0 text-center">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Metrics */}
        <div className="mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-success/5 to-primary/5">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 mx-auto mb-4 text-success" />
                <h3 className="text-2xl font-bold mb-2">Security Performance</h3>
                <p className="text-muted-foreground">Our commitment to investor protection through measurable security metrics</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {securityMetrics.map((metric, index) => (
                  <div key={index} className="text-center p-4 bg-background rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">{metric.value}</div>
                    <div className="text-sm font-medium mb-1">{metric.label}</div>
                    <div className="text-xs text-muted-foreground">{metric.period}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Downloads */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Important Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <Card key={index} className="border-0 shadow-lg hover-glow group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <doc.icon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-2 line-clamp-1">{doc.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {doc.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size}
                        </span>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Disclaimer Section */}
        <Card className="border-2 border-warning/20 bg-warning/5 mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-warning flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-4 text-warning">Important Risk Disclosure</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong>Investment Risks:</strong> All real estate investments carry inherent risks including market volatility, 
                    property value fluctuations, liquidity constraints, and economic factors that may affect returns.
                  </p>
                  <p>
                    <strong>Regulatory Compliance:</strong> While we maintain full SEBI compliance, regulatory changes may 
                    impact investment structures and processes. Investors should stay informed about policy updates.
                  </p>
                  <p>
                    <strong>Due Diligence:</strong> Investors are advised to carefully read all documents, understand the 
                    risks involved, and consult financial advisors before making investment decisions.
                  </p>
                  <p>
                    <strong>No Guaranteed Returns:</strong> Past performance does not guarantee future results. All yield 
                    projections are estimates based on market conditions and may vary.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Compliance Team */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8 text-center">
            <Users className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Compliance & Investor Support</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have questions about compliance, security, or need investor support? Our dedicated team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Contact Compliance Team
              </Button>
              <Button variant="outline" size="lg">
                Investor Support Portal
              </Button>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Email: compliance@terranexxus.com | Support: support@terranexxus.com</p>
              <p>Phone: 1800-XXX-XXXX (Toll Free) | WhatsApp: +91-XXXXX-XXXXX</p>
            </div>
          </CardContent>
        </Card>

        {/* Sticky Disclaimer */}
        <div className="fixed bottom-0 left-0 right-0 bg-warning/90 backdrop-blur-sm text-warning-foreground text-center py-2 px-4 z-50 text-sm">
          <p>
            <strong>Risk Warning:</strong> Investments in real estate are subject to market risks. 
            Read all documents carefully before investing.
            <button className="ml-2 underline hover:no-underline">
              Read Full Disclosure
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};