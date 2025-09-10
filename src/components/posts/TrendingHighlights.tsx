import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, Clock, Heart } from "lucide-react";
import { Post } from "@/pages/Posts";

interface TrendingHighlightsProps {
  onPostClick: (post: Post) => void;
}

export const TrendingHighlights = ({ onPostClick }: TrendingHighlightsProps) => {
  const trendingPosts: Post[] = [
    {
      id: "1",
      title: "Why Fractional Real Estate is Growing 40% CAGR in India",
      excerpt: "Deep dive into the explosive growth of fractional ownership and what's driving this revolution in real estate investing.",
      type: "blog",
      category: "residential",
      author: "Priya Sharma",
      publishDate: "2024-01-15",
      views: 12340,
      likes: 234,
      readTime: 8,
      thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
      tags: ["fractional", "growth", "india", "cagr"],
      trending: true,
      featured: true,
    },
    {
      id: "2",
      title: "Commercial vs Residential: Which Gives Better Yield?",
      excerpt: "A comprehensive analysis comparing rental yields, capital appreciation, and risk factors between commercial and residential properties.",
      type: "research",
      category: "commercial",
      author: "Rajesh Kumar",
      publishDate: "2024-01-14",
      views: 8950,
      likes: 156,
      readTime: 12,
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
      tags: ["commercial", "residential", "yield", "comparison"],
      trending: true,
    },
    {
      id: "3",
      title: "Success Story: From ₹50K to ₹72K in 3 Years",
      excerpt: "Meet Arjun, a software engineer who turned his savings into a profitable real estate portfolio through fractional investing.",
      type: "story",
      category: "farmhouse",
      author: "Arjun Patel",
      publishDate: "2024-01-13",
      views: 15670,
      likes: 412,
      readTime: 6,
      thumbnail: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=400&fit=crop",
      tags: ["success-story", "returns", "farmhouse"],
      trending: true,
      editorsPick: true,
    },
  ];

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "blog": return "default";
      case "research": return "secondary";
      case "story": return "destructive";
      case "video": return "outline";
      default: return "default";
    }
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Trending This Week</h2>
        <Badge variant="secondary" className="animate-pulse">
          Hot 🔥
        </Badge>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {trendingPosts.map((post, index) => (
          <Card 
            key={post.id} 
            className={`group cursor-pointer transition-all duration-300 hover:shadow-premium ${
              index === 0 ? 'md:col-span-2 md:row-span-2' : ''
            }`}
            onClick={() => onPostClick(post)}
          >
            <div className="relative overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  index === 0 ? 'h-64' : 'h-48'
                }`}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant={getBadgeVariant(post.type)} className="text-xs">
                  {post.type.replace('-', ' ')}
                </Badge>
                {post.trending && (
                  <Badge variant="destructive" className="text-xs animate-pulse">
                    Trending
                  </Badge>
                )}
                {post.editorsPick && (
                  <Badge variant="outline" className="text-xs bg-white/20 text-white border-white/30">
                    Editor's Pick
                  </Badge>
                )}
              </div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className={`font-bold mb-2 group-hover:text-primary transition-colors ${
                  index === 0 ? 'text-xl' : 'text-lg'
                }`}>
                  {post.title}
                </h3>
                <p className="text-white/90 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-white/80">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min read
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};