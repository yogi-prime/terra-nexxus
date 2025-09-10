import { Button } from "@/components/ui/button";
import { Search, BookOpen, Video, TrendingUp } from "lucide-react";

export const PostsHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-background to-muted/30 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-light animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-accent to-accent-light animate-pulse delay-1000" />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 mb-6">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Knowledge Marketplace</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            The World of Information
          </span>
          <br />
          <span className="text-foreground">for Smarter Investing</span>
        </h1>
        
        {/* Subline */}
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Blogs, Stories, News, Case Studies, and Videos – all in one hub. 
          Discover insights, learn from experts, and stay ahead of the real estate market.
        </p>
        
        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="gap-2" variant="hero">
            <BookOpen className="w-5 h-5" />
            Start Reading
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Video className="w-5 h-5" />
            Explore Videos
          </Button>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: "Articles", value: "500+", icon: BookOpen },
            { label: "Videos", value: "200+", icon: Video },
            { label: "Case Studies", value: "50+", icon: TrendingUp },
            { label: "Monthly Readers", value: "25K+", icon: Search },
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
    </section>
  );
};