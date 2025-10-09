import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, CheckCircle, Linkedin, GraduationCap, Award } from "lucide-react";

export const Leadership = () => {
  const leaders = [
    {
      name: "Kisu Sharma",
      role: "Founder & CEO",
      img: "/images/team/kisu.jpg",
      bio: "Visionary leader with 10+ years in real estate and group investment strategies.",
      education: "IIM-A, CFA",
      linkedin: "#"
    },
    {
      name: "Anaya Singh",
      role: "COO",
      img: "/images/team/anaya.jpg",
      bio: "Expert in operational excellence and client success management.",
      education: "XLRI",
      linkedin: "#"
    },
    {
      name: "Rohan Verma",
      role: "Head of Investments",
      img: "/images/team/rohan.jpg",
      bio: "Specialist in property investment analysis and portfolio growth.",
      education: "IIT-B, CFA",
      linkedin: "#"
    },
    {
      name: "Priya Mehta",
      role: "Marketing Director",
      img: "/images/team/priya.jpg",
      bio: "Driving brand awareness and strategic growth through innovative marketing.",
      education: "Stanford MS",
      linkedin: "#"
    },
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

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Leadership & Governance
        </h2>
        <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
          Meet the people who make our vision a reality. Our leadership team combines expertise, innovation, and dedication to ensure your success in real estate.
        </p>

        {/* Leadership Team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {leaders.map((leader, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition p-6">
              <CardContent className="text-center">
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-slate-800">{leader.name}</h3>
                <p className="text-indigo-600 font-medium mb-2">{leader.role}</p>
                <p className="text-slate-600 text-sm mb-4">{leader.bio}</p>
                <div className="flex items-center justify-center gap-3 text-sm mb-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{leader.education}</span>
                </div>
                <a
                  href={leader.linkedin}
                  className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advisory Board */}
        <h3 className="text-2xl font-bold text-center mb-8">Advisory Board</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {advisors.map((advisor, index) => (
            <Card key={index} className="border-0 shadow-md text-center p-6">
              <CardContent>
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

        {/* Certifications */}
        <h3 className="text-2xl font-bold text-center mb-8">Governance & Compliance</h3>
        <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
          Every decision is vetted by our compliance-first framework ensuring investor protection and regulatory adherence.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <Card key={index} className="border-0 shadow-md text-center p-6 hover:shadow-lg">
              <CardContent>
                <div className="w-12 h-12 bg-gradient-to-br from-success to-success/70 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <cert.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">{cert.name}</h4>
                <p className="text-xs text-muted-foreground">{cert.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Message */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h3 className="text-2xl font-bold mb-4">Built on Trust & Transparency</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
            Our leadership team combines decades of experience in real estate, technology, and financial services. 
            Every investment, every process, and every decision is guided by our commitment to investor protection 
            and regulatory excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-sm px-4 py-2">10+ Years Experience</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">₹5000+ Cr Transactions</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">Zero Compliance Issues</Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">15,000+ Satisfied Investors</Badge>
          </div>
        </Card>
      </div>
    </section>
  );
};
