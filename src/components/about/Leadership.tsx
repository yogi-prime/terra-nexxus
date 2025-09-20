import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Shield, 
  CheckCircle, 
  Linkedin,
  GraduationCap
} from "lucide-react";

const leadership = [
  {
    name: "Rajesh Sharma",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    bio: "15+ years in real estate & fintech. Ex-Goldman Sachs. Led ₹5000Cr+ transactions.",
    education: "IIM-A, CFA",
    linkedin: "#"
  },
  {
    name: "Priya Mehta",
    role: "Co-Founder & CTO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b297?w=200&h=200&fit=crop&crop=face",
    bio: "Tech leader with 12+ years. Ex-Flipkart, built scalable fintech platforms.",
    education: "IIT-B, Stanford MS",
    linkedin: "#"
  },
  {
    name: "Amit Gupta",
    role: "Co-Founder & COO", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Operations expert with real estate background. Ex-Brigade Group, CBRE.",
    education: "XLRI, Real Estate",
    linkedin: "#"
  }
];

const advisors = [
  { name: "Dr. Kiran Patel", role: "Legal Advisor", expertise: "SEBI Regulations" },
  { name: "Suresh Kumar", role: "Real Estate Advisor", expertise: "Property Valuation" },
  { name: "Meera Singh", role: "Finance Advisor", expertise: "Investment Banking" },
  { name: "Ravi Agarwal", role: "Compliance Advisor", expertise: "Risk Management" }
];

const certifications = [
  { name: "SEBI Compliant", icon: Shield, description: "Full regulatory compliance" },
  { name: "AML/KYC Certified", icon: CheckCircle, description: "Anti-money laundering protocols" },
  { name: "ISO 27001", icon: Award, description: "Information security management" },
  { name: "SOC 2 Type II", icon: Shield, description: "Data security & availability" }
];

export const Leadership = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Leadership & Governance</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the experienced team building India's most trusted fractional real estate platform
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Our Leadership</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="border-0 shadow-lg hover-glow hover-lift group overflow-hidden">
                <CardContent className="p-0">
                  {/* Profile Image */}
                  <div className="relative overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-xl font-bold text-white mb-1">{leader.name}</h4>
                      <Badge variant="secondary" className="mb-2">{leader.role}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {leader.bio}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">{leader.education}</span>
                      </div>
                      <a 
                        href={leader.linkedin}
                        className="w-8 h-8 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advisory Board */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Advisory Board</h3>
          <div className="bg-secondary/30 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advisors.map((advisor, index) => (
                <Card key={index} className="border-0 shadow-md text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold mb-1">{advisor.name}</h4>
                    <p className="text-sm text-primary mb-2">{advisor.role}</p>
                    <p className="text-xs text-muted-foreground">{advisor.expertise}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Governance & Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Governance & Compliance</h3>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Every decision is vetted by our compliance-first framework ensuring investor protection and regulatory adherence
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-0 shadow-lg text-center hover-glow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-success/70 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <cert.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">{cert.name}</h4>
                  <p className="text-xs text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Message */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-8 text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Built on Trust & Transparency</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our leadership team combines decades of experience in real estate, technology, and financial services. 
              Every investment, every process, and every decision is guided by our commitment to investor protection 
              and regulatory excellence.
            </p>
            <div className="hidden-custom mt-6 flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="text-sm px-4 py-2">15+ Years Experience</Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">₹5000+ Cr Transactions</Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">Zero Compliance Issues</Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">15,000+ Satisfied Investors</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};