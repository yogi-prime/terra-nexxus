import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, Eye, Video, Filter } from "lucide-react";
import { Post } from "@/pages/Posts";
import { useState } from "react";

interface VideoHubProps {
  onPostClick: (post: Post) => void;
}

export const VideoHub = ({ onPostClick }: VideoHubProps) => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const videos: Post[] = [
    {
      id: "v1",
      title: "What is Fractional Real Estate? Complete Guide",
      excerpt: "Everything you need to know about fractional ownership in real estate, explained in simple terms.",
      type: "video",
      category: "residential",
      author: "Education Team",
      publishDate: "2024-01-12",
      views: 15420,
      likes: 456,
      readTime: 8, // duration in minutes
      thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      tags: ["explainer", "basics", "fractional"],
    },
    {
      id: "v2",
      title: "Property Walkthrough: Mumbai Commercial Tower",
      excerpt: "Take a virtual tour of our premium Grade-A commercial property in Mumbai's Bandra-Kurla Complex.",
      type: "video",
      category: "commercial",
      author: "Property Team",
      publishDate: "2024-01-10",
      views: 9780,
      likes: 287,
      readTime: 12,
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      tags: ["walkthrough", "mumbai", "commercial"],
    },
    {
      id: "v3",
      title: "Investor Story: From ₹1L to ₹1.4L in 18 Months",
      excerpt: "Meet Priya, who shares her journey of growing wealth through smart fractional real estate investments.",
      type: "video",
      category: "farmhouse",
      author: "Priya Sharma",
      publishDate: "2024-01-08",
      views: 12340,
      likes: 523,
      readTime: 6,
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      tags: ["testimonial", "success", "story"],
    },
    {
      id: "v4",
      title: "How SPV Structure Protects Your Investment",
      excerpt: "Legal expert explains how Special Purpose Vehicles ensure transparency and security in fractional ownership.",
      type: "video",
      category: "commercial",
      author: "Legal Team",
      publishDate: "2024-01-05",
      views: 6890,
      likes: 198,
      readTime: 10,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      tags: ["legal", "spv", "security"],
    },
    {
      id: "v5",
      title: "Market Analysis: Real Estate Trends 2024",
      excerpt: "Expert insights on emerging trends, growth markets, and investment opportunities in Indian real estate.",
      type: "video",
      category: "residential",
      author: "Research Team",
      publishDate: "2024-01-03",
      views: 8560,
      likes: 234,
      readTime: 15,
      thumbnail: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=600&h=400&fit=crop",
      tags: ["market", "analysis", "trends"],
    },
    {
      id: "v6",
      title: "IRR Calculation Made Simple",
      excerpt: "Step-by-step tutorial on calculating Internal Rate of Return for real estate investments.",
      type: "video",
      category: "residential",
      author: "Finance Team",
      publishDate: "2024-01-01",
      views: 5670,
      likes: 167,
      readTime: 7,
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      tags: ["tutorial", "irr", "finance"],
    },
  ];

  const categories = [
    { id: "all", label: "All Videos", count: videos.length },
    { id: "explainer", label: "Explainers", count: 2 },
    { id: "walkthrough", label: "Property Tours", count: 1 },
    { id: "testimonial", label: "Success Stories", count: 1 },
    { id: "tutorial", label: "Tutorials", count: 2 },
  ];

  const formatDuration = (minutes: number) => {
    return `${minutes}:00`;
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Video className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Video Library</h2>
          <Badge variant="outline" className="text-xs">
            85 Videos
          </Badge>
        </div>
        
        {/* Category Filters */}
        <div className="hidden md:flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(category.id)}
              className="text-xs"
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card 
            key={video.id} 
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden"
            onClick={() => onPostClick(video)}
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
              
              {/* Duration Badge */}
              <div className="absolute bottom-3 right-3">
                <Badge variant="secondary" className="bg-black/70 text-white border-none text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDuration(video.readTime)}
                </Badge>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <Badge variant="default" className="text-xs">
                  Video
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {video.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {video.excerpt}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {video.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {video.views.toLocaleString()}
                  </div>
                  <span>{video.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(video.readTime)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Browse All Videos
        </Button>
      </div>
    </section>
  );
};