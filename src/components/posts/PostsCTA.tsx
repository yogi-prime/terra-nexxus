import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Mail, 
  Bell, 
  TrendingUp, 
  Users, 
  Video,
  Twitter,
  Linkedin,
  Youtube
} from "lucide-react";

export const PostsCTA = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      {/* Floating Elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <div className="w-24 h-24 rounded-full bg-primary/30 animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="w-32 h-32 rounded-lg bg-accent/30 animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Stay Informed</span>
          </div>
          
          {/* Main Headline */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Knowledge is Wealth.
            </span>
            <br />
            <span className="text-foreground">Stay Ahead with Terra Nexxus Insights.</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get the latest market insights, investment guides, and success stories delivered to your inbox. 
            Join 25,000+ smart investors who stay informed.
          </p>
          
          {/* Newsletter Signup */}
          <div className="bg-card border border-border/50 rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Weekly Insights Newsletter</h3>
              <Badge variant="secondary" className="text-xs">
                Free
              </Badge>
            </div>
            
            <p className="text-muted-foreground text-sm mb-6">
              Market trends • Investment guides • Case studies • Success stories
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Enter your email address"
                className="flex-1"
                type="email"
              />
              <Button size="lg" className="gap-2" variant="hero">
                <Bell className="w-4 h-4" />
                Subscribe Now
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3">
              No spam. Unsubscribe anytime. Read our{" "}
              <a href="#" className="text-primary hover:underline">privacy policy</a>.
            </p>
          </div>
          
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Follow us for daily insights</h3>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg" className="gap-2">
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Twitter className="w-5 h-5" />
                Twitter
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Youtube className="w-5 h-5" />
                YouTube
              </Button>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="hidden-custom grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-border/50">
            {[
              { icon: BookOpen, label: "Articles Published", value: "500+" },
              { icon: Video, label: "Video Guides", value: "200+" },
              { icon: Users, label: "Monthly Readers", value: "25K+" },
              { icon: TrendingUp, label: "Success Stories", value: "50+" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};