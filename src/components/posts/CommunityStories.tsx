import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, TrendingUp, Users, Star, ArrowRight } from "lucide-react";
import { Post } from "@/pages/Posts";

interface CommunityStoriesProps {
  onPostClick: (post: Post) => void;
}

export const CommunityStories = ({ onPostClick }: CommunityStoriesProps) => {
  const stories: Post[] = [
    {
      id: "story1",
      title: "From ₹50K to ₹72K: My Real Estate Journey",
      excerpt: "As a software engineer, I was looking for passive income. Fractional real estate changed everything for me.",
      type: "story",
      category: "residential",
      author: "Arjun Patel",
      publishDate: "2024-01-10",
      views: 8920,
      likes: 456,
      readTime: 6,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      tags: ["investor", "returns", "passive-income"],
    },
    {
      id: "story2",
      title: "How We Funded Our Commercial Tower",
      excerpt: "Raising ₹200 Cr seemed impossible until we discovered fractional ownership platform. Here's our story.",
      type: "story",
      category: "commercial",
      author: "Radhika Singh",
      publishDate: "2024-01-08",
      views: 6780,
      likes: 289,
      readTime: 8,
      thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      tags: ["property-owner", "funding", "commercial"],
    },
    {
      id: "story3",
      title: "Diversifying Beyond Stocks: My First Year",
      excerpt: "After 10 years in equity markets, I decided to try real estate. Best decision of my investment career.",
      type: "story",
      category: "farmhouse",
      author: "Vikram Sharma",
      publishDate: "2024-01-05",
      views: 5670,
      likes: 234,
      readTime: 7,
      thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      tags: ["diversification", "equity", "returns"],
    },
  ];

  const testimonials = [
    {
      name: "Priya Mehta",
      role: "Marketing Manager",
      location: "Mumbai",
      quote: "Started with ₹25K, now I have a portfolio worth ₹1.2L across 3 properties. The monthly payouts are amazing!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
      returns: "+48% in 2 years",
    },
    {
      name: "Karthik Reddy",
      role: "Startup Founder",
      location: "Bangalore",
      quote: "Real estate was always out of reach. Fractional ownership made it possible to invest in premium properties.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      returns: "+35% in 18 months",
    },
    {
      name: "Anjali Gupta",
      role: "Doctor",
      location: "Delhi",
      quote: "Love the transparency and regular updates. It feels like I actually own a piece of these beautiful properties.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      returns: "+42% in 3 years",
    },
  ];

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Community Stories</h2>
        <Badge variant="outline" className="text-xs">
          Real People, Real Returns
        </Badge>
      </div>
      
      {/* Featured Stories */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        {stories.map((story) => (
          <Card 
            key={story.id} 
            className="group cursor-pointer transition-all duration-300 hover:shadow-premium"
            onClick={() => onPostClick(story)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={story.thumbnail} alt={story.author} />
                  <AvatarFallback>
                    {story.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold">{story.author}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {story.category}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {story.readTime} min read
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                {story.title}
              </h3>
              
              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-primary/20" />
                <p className="text-muted-foreground text-sm italic pl-4">
                  "{story.excerpt}"
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  {story.views.toLocaleString()} views
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2 group-hover:gap-3 transition-all"
                >
                  Read Story
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Community Testimonials */}
      <div className="bg-muted/30 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold mb-2">What Our Community Says</h3>
          <p className="text-muted-foreground">Real testimonials from real investors</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                
                {/* Quote */}
                <p className="text-sm mb-4 italic">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
                
                {/* Returns Badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="default" className="bg-success text-success-foreground text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {testimonial.returns}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" className="gap-2">
            <Star className="w-4 h-4" />
            Share Your Story
          </Button>
        </div>
      </div>
    </section>
  );
};