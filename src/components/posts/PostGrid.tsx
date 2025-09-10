import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, Clock, Share2, Bookmark, User } from "lucide-react";
import { Post } from "@/pages/Posts";
import { useState } from "react";

interface PostGridProps {
  filters: {
    type: string;
    category: string;
    sortBy: string;
    searchTerm: string;
    dateRange: string;
  };
  onPostClick: (post: Post) => void;
}

export const PostGrid = ({ filters, onPostClick }: PostGridProps) => {
  const [loadMore, setLoadMore] = useState(false);
  
  // Mock data - in real app, this would come from API with filters applied
  const allPosts: Post[] = [
    {
      id: "4",
      title: "Understanding SPV Structure in Fractional Real Estate",
      excerpt: "A detailed guide on how Special Purpose Vehicles work in fractional ownership and what investors need to know.",
      type: "blog",
      category: "commercial",
      author: "Legal Team",
      publishDate: "2024-01-12",
      views: 3420,
      likes: 89,
      readTime: 10,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop",
      tags: ["spv", "legal", "structure"],
    },
    {
      id: "5",
      title: "Farmhouse Investment: 25% Returns in Gurgaon",
      excerpt: "Case study of how a premium farmhouse project delivered exceptional returns to fractional investors.",
      type: "case-study",
      category: "farmhouse",
      author: "Investment Team",
      publishDate: "2024-01-11",
      views: 5670,
      likes: 134,
      readTime: 7,
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=300&fit=crop",
      tags: ["farmhouse", "returns", "gurgaon"],
    },
    {
      id: "6",
      title: "Market News: Real Estate Prices Rise 12% in Q4",
      excerpt: "Latest market data shows significant growth in real estate prices across major Indian cities.",
      type: "news",
      category: "residential",
      author: "Market Research",
      publishDate: "2024-01-10",
      views: 2890,
      likes: 67,
      readTime: 4,
      thumbnail: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=600&h=300&fit=crop",
      tags: ["market", "prices", "growth"],
    },
    {
      id: "7",
      title: "How to Calculate IRR for Real Estate Investments",
      excerpt: "Learn the formula and practical examples of calculating Internal Rate of Return for property investments.",
      type: "blog",
      category: "residential",
      author: "Finance Team",
      publishDate: "2024-01-09",
      views: 4120,
      likes: 98,
      readTime: 8,
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop",
      tags: ["irr", "calculation", "finance"],
    },
    {
      id: "8",
      title: "Video: Property Walkthrough - Mumbai Office Tower",
      excerpt: "Take a virtual tour of our latest commercial property offering in Mumbai's business district.",
      type: "video",
      category: "commercial",
      author: "Property Team",
      publishDate: "2024-01-08",
      views: 6780,
      likes: 189,
      readTime: 15,
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=300&fit=crop",
      tags: ["video", "mumbai", "commercial"],
    },
    {
      id: "9",
      title: "Tax Benefits of Fractional Real Estate Investment",
      excerpt: "Comprehensive guide to tax implications and benefits when investing in fractional real estate properties.",
      type: "blog",
      category: "residential",
      author: "Tax Advisory",
      publishDate: "2024-01-07",
      views: 3890,
      likes: 112,
      readTime: 12,
      thumbnail: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=600&h=300&fit=crop",
      tags: ["tax", "benefits", "investment"],
    },
  ];

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "blog": return "default";
      case "news": return "secondary";
      case "case-study": return "outline";
      case "story": return "outline";
      case "video": return "outline";
      case "research": return "secondary";
      default: return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest Articles</h2>
        <div className="text-sm text-muted-foreground">
          Showing {allPosts.length} of 750 articles
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPosts.map((post) => (
          <Card 
            key={post.id} 
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            onClick={() => onPostClick(post)}
          >
            <div className="relative overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <Badge variant={getBadgeVariant(post.type)} className="text-xs">
                  {post.type.replace('-', ' ')}
                </Badge>
              </div>
              
              {/* Quick Actions */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-1">
                  <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                    <Share2 className="w-3 h-3" />
                  </Button>
                  <Button size="icon" variant="secondary" className="h-8 w-8 bg-white/90 hover:bg-white">
                    <Bookmark className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Author & Metadata */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
                <div>{formatDate(post.publishDate)}</div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min read
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Load More */}
      <div className="text-center mt-8">
        <Button 
          variant="outline" 
          size="lg"
          onClick={() => setLoadMore(!loadMore)}
          className="min-w-40"
        >
          Load More Articles
        </Button>
      </div>
    </section>
  );
};