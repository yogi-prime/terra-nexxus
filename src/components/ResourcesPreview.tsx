import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Video, 
  Calendar, 
  ExternalLink, 
  TrendingUp,
  Play,
  Clock,
  User
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why Fractional Real Estate is Growing 40% CAGR in India",
    excerpt: "Understanding the massive shift in real estate investment patterns and why fractional ownership is the future.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
    category: "Market Insights",
    readTime: "8 min read",
    publishDate: "Dec 15, 2024",
    author: "Rohit Sharma"
  },
  {
    id: 2,
    title: "Residential vs Commercial: Which Gives Better Yields?",
    excerpt: "Comprehensive analysis of yield patterns, risk factors, and investment strategies for different property types.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop",
    category: "Investment Guide",
    readTime: "12 min read",
    publishDate: "Dec 12, 2024",
    author: "Priya Gupta"
  },
  {
    id: 3,
    title: "Tax Benefits of Fractional Real Estate Investment",
    excerpt: "Complete guide to tax implications, deductions, and strategies for maximizing your real estate investment returns.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop",
    category: "Tax Guide",
    readTime: "6 min read",
    publishDate: "Dec 10, 2024",
    author: "Amit Jain"
  }
];

const videos = [
  {
    id: 1,
    title: "How Terra Nexxus Works - Complete Guide",
    description: "Step-by-step walkthrough of the investment process from signup to returns",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop",
    duration: "12:34",
    views: "15.2K views",
    category: "Tutorial"
  },
  {
    id: 2,
    title: "Real Estate Market Outlook 2025",
    description: "Expert analysis of upcoming trends and investment opportunities",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=225&fit=crop",
    duration: "18:45",
    views: "8.7K views",
    category: "Market Analysis"
  },
  {
    id: 3,
    title: "Success Story: From ₹50K to ₹2L Portfolio",
    description: "Investor shares journey of building wealth through fractional real estate",
    thumbnail: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=225&fit=crop",
    duration: "9:21",
    views: "23.1K views",
    category: "Success Story"
  }
];

export const ResourcesPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Education & Resources</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master real estate investing with our comprehensive guides and expert insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Blog Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Latest Articles
              </h3>
              <Button variant="outline" size="sm">
                View All Posts
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="hover-glow hover-lift group overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-2/5 relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 sm:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge 
                        variant="outline" 
                        className="absolute top-3 left-3 bg-card/95 backdrop-blur-sm"
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <div className="sm:w-3/5 p-6">
                      <CardHeader className="p-0 mb-3">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.publishDate}
                          </div>
                        </div>
                        <Button variant="ghost-accent" size="sm" className="p-0 h-auto">
                          Read Article
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Video className="h-6 w-6 text-accent" />
                Video Guides
              </h3>
              <Button variant="outline" size="sm">
                View All Videos
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-6">
              {videos.map((video) => (
                <Card key={video.id} className="hover-glow hover-lift group overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-2/5 relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 sm:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="absolute top-3 left-3 bg-card/95 backdrop-blur-sm"
                      >
                        {video.category}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="absolute bottom-3 right-3 bg-black/80 text-white border-white/20"
                      >
                        {video.duration}
                      </Badge>
                    </div>
                    <div className="sm:w-3/5 p-6">
                      <CardHeader className="p-0 mb-3">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-accent transition-colors">
                          {video.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {video.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span>{video.views}</span>
                        </div>
                        <Button variant="ghost-accent" size="sm" className="p-0 h-auto">
                          <Play className="h-3 w-3 mr-1" />
                          Watch Video
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="gradient-hero text-white border-0 max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-xl mb-8 opacity-90">
                Get weekly insights on real estate trends, new property launches, and investment tips
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-foreground bg-white/90 backdrop-blur-sm border-0 focus:ring-2 focus:ring-accent"
                />
                <Button variant="accent" size="lg" className="whitespace-nowrap">
                  Subscribe
                  <TrendingUp className="h-4 w-4 ml-2" />
                </Button>
              </div>
              <p className="text-sm opacity-70 mt-3">
                Join an ever-growing network of investors • No spam, unsubscribe anytime
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};