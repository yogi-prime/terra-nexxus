import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import terraLogo from "../assets/terra_logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import API from "@/api/api"; // your axios instance

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
  { name: "Marketplace", href: "/marketplace" },
];

const quickLinks = [
  { name: "Calculator", href: "#calculator", icon: Calculator },
  { name: "FAQs", href: "#faqs", icon: MessageSquare },
  { name: "Blog", href: "#blog", icon: BookOpen },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ⬅️ get user + logout from context

  const handleLogout = async () => {
    try {
      await API.post("/logout"); // invalidate Sanctum token
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logout(); // clear context + localStorage
      navigate("/login");
    }
  };

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
              <Link to="/">
                <img
                  src={terraLogo}
                  alt="Terra Nexxus Logo"
                  className="w-auto h-10 object-contain cursor-pointer"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Desktop Auth Area */}
<div className="hidden md:flex items-center gap-4">
  {!user ? (
    <>
      <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
        Login
      </Button>
      <Button variant="hero" size="sm" onClick={() => navigate("/register")}>
        Start KYC
        <Badge
          variant="secondary"
          className="ml-2 bg-accent/100 text-accent-foreground"
        >
          Fast Track
        </Badge>
      </Button>
    </>
  ) : (
    <>
      {/* 👇 Greeting */}
      {/* <span className="text-sm text-muted-foreground">
        Hi, <span className="font-medium text-foreground">{user.name || user.email}</span>
      </span> */}

      {/* Logout button */}
      <Button variant="destructive" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </>
  )}
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
        <div
          className={cn(
            "md:hidden border-t border-border transition-all duration-300 overflow-hidden",
            isMenuOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href);
                  setIsMenuOpen(false);
                }}
                className="block text-foreground hover:text-primary transition-colors font-medium w-full text-left"
              >
                {item.name}
              </button>
            ))}

            <div className="pt-4 border-t border-border space-y-2">
  {!user ? (
    <>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          navigate("/login");
          setIsMenuOpen(false);
        }}
      >
        Login
      </Button>
      <Button
        variant="hero"
        className="w-full"
        onClick={() => {
          navigate("/register");
          setIsMenuOpen(false);
        }}
      >
        Start KYC
      </Button>
    </>
  ) : (
    <>
      {/* 👇 Greeting */}
      {/* <p className="text-sm text-muted-foreground mb-2">
        Hi, <span className="font-medium text-foreground">{user.name || user.email}</span>
      </p> */}

      <Button
        variant="destructive"
        className="w-full"
        onClick={() => {
          handleLogout();
          setIsMenuOpen(false);
        }}
      >
        Logout
      </Button>
    </>
  )}
</div>
          </div>
        </div>
      </header>
    </>
  );
};