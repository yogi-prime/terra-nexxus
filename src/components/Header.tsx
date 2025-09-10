import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Globe,
  Calculator,
  BookOpen,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Resources", href: "/resources" },
  { name: "Posts", href: "/posts" },
];

const quickLinks = [
  { name: "Calculator", href: "#calculator", icon: Calculator },
  { name: "FAQs", href: "#faqs", icon: MessageSquare },
  { name: "Blog", href: "#blog", icon: BookOpen },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Quick Links Ribbon */}
      <div className="bg-card-premium border-b border-border-dark">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-muted-dark-foreground hover:text-accent transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <select className="bg-transparent text-sm border-none outline-none">
                <option>English</option>
                <option>हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="gradient-primary w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">TN</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Terra Nexxus</h1>
                <p className="text-xs text-muted-foreground">Fractional Real Estate</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" size="sm">
                Login
              </Button>
              <Button variant="hero" size="sm">
                Start KYC
                <Badge variant="secondary" className="ml-2 bg-accent/20 text-accent-foreground">
                  Fast Track
                </Badge>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden border-t border-border transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-96" : "max-h-0"
        )}>
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-border space-y-2">
              <Button variant="outline" className="w-full">
                Login
              </Button>
              <Button variant="hero" className="w-full">
                Start KYC
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};