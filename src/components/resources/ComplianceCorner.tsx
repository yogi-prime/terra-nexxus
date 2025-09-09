import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Lock,
  Eye,
  Users,
  ExternalLink,
  Phone,
  Mail
} from "lucide-react";

const complianceFeatures = [
  {
    icon: Shield,
    title: "SEBI Compliance",
    description: "Registered under SEBI's Alternative Investment Fund guidelines",
    status: "Active",
    color: "text-success"
  },
  {
    icon: Lock,
    title: "Escrow Protection",
    description: "All investor funds secured in SEBI-compliant escrow accounts",
    status: "Protected",
    color: "text-primary"
  },
  {
    icon: FileText,
    title: "SPV/LLP Structure",
    description: "Legal ownership through Special Purpose Vehicles",
    status: "Implemented",
    color: "text-accent"
  },
  {
    icon: Eye,
    title: "KYC/AML Protocols",
    description: "Enhanced due diligence and transaction monitoring",
    status: "Compliant",
    color: "text-warning"
  },
  {
    icon: CheckCircle,
    title: "Regular Audits",
    description: "Quarterly compliance reviews by independent auditors",
    status: "Current",
    color: "text-secondary"
  }
];

const quickLinks = [
  {
    title: "Terms of Service",
    description: "Complete terms and conditions for using Terra Nexxus platform",
    url: "/legal/terms"
  },
  {
    title: "Privacy Policy", 
    description: "How we collect, use, and protect your personal information",
    url: "/legal/privacy"
  },
  {
    title: "Risk Disclosure",
    description: "Comprehensive risk factors and investment disclosures",
    url: "/legal/risk-disclosure"
  },
  {
    title: "Grievance Policy",
    description: "Process for raising and resolving investor complaints",
    url: "/legal/grievance"
  },
  {
    title: "Refund Policy",
    description: "Conditions and process for investment refunds",
    url: "/legal/refund"
  },
  {
    title: "SEBI Guidelines",
    description: "Regulatory framework governing our operations",
    url: "/legal/sebi-guidelines"
  }
];

const contactInfo = [
  {
    type: "Compliance Officer",
    name: "Priya Sharma",
    email: "compliance@terranexxus.com",
    phone: "+91 98765 43210"
  },
  {
    type: "Investor Grievance",
    name: "Support Team", 
    email: "grievance@terranexxus.com",
    phone: "1800-XXX-XXXX"
  },
  {
    type: "Legal Queries",
    name: "Legal Team",
    email: "legal@terranexxus.com", 
    phone: "+91 98765 43211"
  }
];

export const ComplianceCorner = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Compliance Corner</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparent compliance framework ensuring investor protection, regulatory adherence, and operational integrity
          </p>
        </div>

        {/* Compliance Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {complianceFeatures.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg text-center hover-glow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h4 className="font-bold mb-2">{feature.title}</h4>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {feature.description}
                </p>
                <Badge variant="outline" className={`text-xs ${feature.color}`}>
                  {feature.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links to Legal Documents */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Legal Documentation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Card key={index} className="border-0 shadow-lg hover-glow group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h4 className="font-bold mb-2 group-hover:text-primary transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {link.description}
                      </p>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        Read Document
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Compliance & Support Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h4 className="font-bold mb-2">{contact.type}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{contact.name}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-primary hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-primary hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Risk Disclaimer */}
        <Card className="border-2 border-warning/20 bg-warning/5 mb-8">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-warning flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-4 text-warning">Important Risk Disclosure</h3>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <strong>Investment Risks:</strong> All investments in real estate and real estate-related securities 
                    involve substantial risk and may result in partial or complete loss of investment. Past performance 
                    does not guarantee future results.
                  </p>
                  <p>
                    <strong>Market Risk:</strong> Real estate markets are subject to fluctuations in property values, 
                    rental income, interest rates, and economic conditions that may affect investment returns.
                  </p>
                  <p>
                    <strong>Liquidity Risk:</strong> Fractional real estate investments may have limited liquidity. 
                    The ability to sell shares on the secondary marketplace is subject to market conditions and buyer availability.
                  </p>
                  <p>
                    <strong>Regulatory Risk:</strong> Changes in regulations governing alternative investments, 
                    real estate, or taxation may impact investment structures and returns.
                  </p>
                  <p className="font-semibold text-foreground">
                    Investors should carefully read all offering documents, understand the risks involved, 
                    and consult with qualified financial advisors before making investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Questions About Compliance?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our compliance team is here to address your concerns about regulatory adherence, 
              investor protection, and platform security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                <Shield className="mr-2 h-5 w-5" />
                Contact Compliance
              </Button>
              <Button variant="outline" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                View All Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};