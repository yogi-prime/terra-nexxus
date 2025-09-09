import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ExternalLink,
  Shield,
  Award,
  FileText
} from "lucide-react";

const companyLinks = [
  { name: "About Us", href: "#about" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Our Team", href: "#team" },
  { name: "Careers", href: "#careers" },
  { name: "Press", href: "#press" },
  { name: "Contact", href: "#contact" }
];

const investorLinks = [
  { name: "Browse Properties", href: "#properties" },
  { name: "Investment Calculator", href: "#calculator" },
  { name: "Portfolio Tracker", href: "#portfolio" },
  { name: "Secondary Market", href: "#marketplace" },
  { name: "Returns & Payouts", href: "#returns" },
  { name: "Tax Center", href: "#tax" }
];

const resourceLinks = [
  { name: "Blog", href: "#blog" },
  { name: "Video Guides", href: "#videos" },
  { name: "Market Reports", href: "#reports" },
  { name: "FAQs", href: "#faqs" },
  { name: "Webinars", href: "#webinars" },
  { name: "Help Center", href: "#help" }
];

const legalLinks = [
  { name: "Terms of Service", href: "#terms" },
  { name: "Privacy Policy", href: "#privacy" },
  { name: "Risk Disclosure", href: "#risk" },
  { name: "Refund Policy", href: "#refund" },
  { name: "Compliance", href: "#compliance" },
  { name: "Grievance", href: "#grievance" }
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#facebook" },
  { name: "Twitter", icon: Twitter, href: "#twitter" },
  { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
  { name: "Instagram", icon: Instagram, href: "#instagram" }
];

export const Footer = () => {
  return (
    <footer className="bg-card-premium text-card-premium-foreground">
      {/* Compliance Ribbon */}
      <div className="border-b border-border-dark">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-success" />
              <span>SEBI/AML Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-success" />
              <span>Escrow Accounts</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-success" />
              <span>Secure Ownership</span>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              RBI Regulated Banking Partners
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="gradient-primary w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">TN</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Terra Nexxus</h3>
                <p className="text-sm text-card-premium-foreground/70">Fractional Real Estate</p>
              </div>
            </div>
            
            <p className="text-card-premium-foreground/80 mb-6 leading-relaxed">
              India's leading fractional real estate investment platform. Start owning properties 
              with just ₹10,000 and build wealth through diversified real estate investments.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm">invest@terranexxus.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm">+91 80-4567-8900</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm">Bengaluru, Karnataka, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="outline" size="icon" className="border-border-dark hover:bg-accent hover:text-accent-foreground">
                  <social.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-card-premium-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Investors */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Investors</h4>
            <ul className="space-y-3">
              {investorLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-card-premium-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-card-premium-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-card-premium-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Risk Disclaimer */}
      <div className="border-t border-border-dark bg-card-premium/50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h5 className="font-semibold mb-3 text-warning">Risk Disclaimer</h5>
            <p className="text-sm text-card-premium-foreground/70 leading-relaxed mb-4">
              <strong>Real estate investments are subject to market risks.</strong> Past performance is not indicative of future results. 
              Property values can fluctuate and may result in loss of capital. Returns are not guaranteed and depend on various 
              market factors including location, demand, economic conditions, and property performance. Fractional ownership involves 
              specific risks including liquidity constraints and shared ownership complications.
            </p>
            <p className="text-xs text-card-premium-foreground/60">
              Please read all related documents carefully before investing. Investment decisions should be made based on independent 
              assessment and consultation with financial advisors. Terra Nexxus is an investment platform and does not guarantee returns.
              All investments are subject to regulatory and legal compliances under applicable laws.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border-dark">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-card-premium-foreground/70">
              © 2024 Terra Nexxus Private Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-card-premium-foreground/60">
              <span>CIN: U65929KA2022PTC123456</span>
              <span>•</span>
              <span>SEBI Reg: INH000001234</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};