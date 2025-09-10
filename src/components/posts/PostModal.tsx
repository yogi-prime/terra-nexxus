import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Eye, 
  Heart, 
  Clock, 
  Share2, 
  Bookmark, 
  User, 
  Calendar,
  Tag,
  Twitter,
  Linkedin,
  MessageCircle
} from "lucide-react";
import { Post } from "@/pages/Posts";

interface PostModalProps {
  post: Post;
  onClose: () => void;
}

export const PostModal = ({ post, onClose }: PostModalProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

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

  // Mock content - in real app this would come from API
  const mockContent = `
    <h2>Introduction</h2>
    <p>Real estate investment has traditionally been the domain of wealthy individuals and institutions. However, the emergence of fractional ownership is democratizing access to premium properties, allowing retail investors to participate in high-value real estate deals with smaller capital requirements.</p>
    
    <h3>Understanding Fractional Ownership</h3>
    <p>Fractional real estate ownership allows multiple investors to own shares in a single property. This model has gained significant traction in India, with the market growing at an impressive 40% CAGR over the past three years.</p>
    
    <blockquote>
      "Fractional ownership has opened doors for middle-class investors to access premium real estate that was previously out of reach."
    </blockquote>
    
    <h3>Key Benefits</h3>
    <ul>
      <li><strong>Lower Entry Barriers:</strong> Start investing with as little as ₹25,000</li>
      <li><strong>Diversification:</strong> Spread risk across multiple properties</li>
      <li><strong>Professional Management:</strong> Properties are managed by experts</li>
      <li><strong>Liquidity:</strong> Buy and sell shares through secondary marketplace</li>
    </ul>
    
    <h3>Market Growth Data</h3>
    <p>According to recent industry reports, the fractional ownership market in India has shown remarkable growth:</p>
    <ul>
      <li>2021: ₹500 Cr market size</li>
      <li>2022: ₹700 Cr market size (40% growth)</li>
      <li>2023: ₹980 Cr market size (40% growth)</li>
      <li>2024 (projected): ₹1,400 Cr market size</li>
    </ul>
    
    <h3>Conclusion</h3>
    <p>The future of real estate investment is fractional. As technology continues to evolve and regulatory frameworks become more robust, we can expect this trend to accelerate further.</p>
  `;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-background/95 backdrop-blur-sm border-b pb-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={getBadgeVariant(post.type)}>
                  {post.type.replace('-', ' ')}
                </Badge>
                {post.trending && (
                  <Badge variant="destructive" className="animate-pulse">
                    Trending
                  </Badge>
                )}
                {post.editorsPick && (
                  <Badge variant="outline">
                    Editor's Pick
                  </Badge>
                )}
              </div>
              
              <DialogTitle className="text-2xl font-bold leading-tight mb-3">
                {post.title}
              </DialogTitle>
              
              {/* Author & Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.thumbnail} alt={post.author} />
                    <AvatarFallback>
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.publishDate)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime} min read
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.views.toLocaleString()} views
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {post.likes} likes
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              24 comments
            </div>
          </div>
        </DialogHeader>
        
        {/* Featured Image */}
        <div className="relative mb-6">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        
        {/* Content */}
        <div className="prose prose-neutral max-w-none">
          <div dangerouslySetInnerHTML={{ __html: mockContent }} />
        </div>
        
        {/* Tags */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Share & Actions */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Share this article:
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};