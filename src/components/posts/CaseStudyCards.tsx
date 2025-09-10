import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, Building, Home, TreePine } from "lucide-react";
import { Post } from "@/pages/Posts";

interface CaseStudyCardsProps {
  onPostClick: (post: Post) => void;
}

export const CaseStudyCards = ({ onPostClick }: CaseStudyCardsProps) => {
  const caseStudies: Post[] = [
    {
      id: "cs1",
      title: "Mumbai Commercial Tower: 28% IRR Achievement",
      excerpt: "How strategic location and Grade-A tenant mix delivered exceptional returns to 450+ fractional investors.",
      type: "case-study",
      category: "commercial",
      author: "Investment Team",
      publishDate: "2024-01-10",
      views: 8920,
      likes: 234,
      readTime: 10,
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      tags: ["mumbai", "commercial", "irr", "returns"],
    },
    {
      id: "cs2",
      title: "Bangalore Residential: Steady 12% Rental Yield",
      excerpt: "A premium residential project that has consistently delivered monthly payouts for 2+ years.",
      type: "case-study",
      category: "residential",
      author: "Property Team",
      publishDate: "2024-01-08",
      views: 6780,
      likes: 189,
      readTime: 8,
      thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      tags: ["bangalore", "residential", "rental", "yield"],
    },
    {
      id: "cs3",
      title: "Gurgaon Farmhouse: 25% Capital Appreciation",
      excerpt: "Premium farmhouse project that attracted high-net-worth individuals and delivered strong capital gains.",
      type: "case-study",
      category: "farmhouse",
      author: "Growth Team",
      publishDate: "2024-01-05",
      views: 5450,
      likes: 167,
      readTime: 12,
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      tags: ["gurgaon", "farmhouse", "appreciation", "hnw"],
    },
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case "commercial": return Building;
      case "residential": return Home;
      case "farmhouse": return TreePine;
      default: return Building;
    }
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Success Case Studies</h2>
        <Badge variant="outline" className="text-xs">
          Real Results
        </Badge>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {caseStudies.map((study) => {
          const Icon = getIcon(study.category);
          
          return (
            <Card 
              key={study.id} 
              className="group cursor-pointer transition-all duration-300 hover:shadow-premium hover:-translate-y-2"
              onClick={() => onPostClick(study)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={study.thumbnail}
                  alt={study.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Category Icon */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                
                {/* Success Badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="default" className="bg-success text-success-foreground">
                    Success Story
                  </Badge>
                </div>
                
                {/* Results */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <div className="text-white text-sm font-medium mb-1">Key Achievement</div>
                    <div className="text-white/90 text-xs">
                      {study.title.includes("28%") && "28% IRR Delivered"}
                      {study.title.includes("12%") && "12% Annual Rental Yield"}
                      {study.title.includes("25%") && "25% Capital Appreciation"}
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {study.category}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {study.readTime} min read
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {study.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {study.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    {study.views.toLocaleString()} views
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-2 group-hover:gap-3 transition-all p-2"
                  >
                    Read Case Study
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          View All Case Studies
        </Button>
      </div>
    </section>
  );
};