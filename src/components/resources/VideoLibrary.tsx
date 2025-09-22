import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Video,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const videos = [
  {
    id: 1,
    title: "What is Fractional Real Estate?",
    description: "Complete beginner's guide to understanding fractional real estate investment and how it works in India.",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=225&fit=crop",
    duration: "8:45",
    views: "12.5K",
    likes: "892",
    category: "Beginner",
    featured: true
  },
  {
    id: 2,
    title: "How Terra Nexxus Ensures Legal Compliance",
    description: "Deep dive into our SEBI compliance framework, SPV structures, and investor protection measures.",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=225&fit=crop",
    duration: "12:30",
    views: "8.7K",
    likes: "654",
    category: "Legal",
    featured: true
  },
  {
    id: 3,
    title: "Understanding SPV/LLP Structures",
    description: "Legal expert explains how Special Purpose Vehicles and Limited Liability Partnerships work for property ownership.",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
    duration: "15:20",
    views: "6.3K",
    likes: "423",
    category: "Legal",
    featured: false
  },
  {
    id: 4,
    title: "Investor Success Story: Ankit's Journey",
    description: "Real investor shares how he built a ₹5L portfolio across 8 properties starting with just ₹25,000.",
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=225&fit=crop",
    duration: "10:15",
    views: "15.2K",
    likes: "1.1K",
    category: "Success Stories",
    featured: true
  },
  {
    id: 5,
    title: "Commercial Property Walkthrough: IT Park Bangalore",
    description: "Detailed tour of a Grade-A IT park in Bangalore that raised ₹300 Cr through fractional investment.",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=225&fit=crop",
    duration: "18:45",
    views: "9.8K",
    likes: "672",
    category: "Property Tours",
    featured: false
  },
  {
    id: 6,
    title: "Agricultural Land Investment: Complete Guide",
    description: "Everything you need to know about investing in farmland and agricultural real estate in India.",
    thumbnail: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=225&fit=crop",
    duration: "14:35",
    views: "7.9K",
    likes: "589",
    category: "Education",
    featured: false
  },
  {
    id: 7,
    title: "Tax Implications of Fractional Ownership",
    description: "CA explains taxation, TDS, capital gains, and compliance requirements for fractional real estate investors.",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop",
    duration: "20:10",
    views: "11.4K",
    likes: "834",
    category: "Education",
    featured: false
  },
  {
    id: 8,
    title: "How to Evaluate Property Investment Opportunities",
    description: "Expert tips on analyzing location, yields, market trends, and risk factors before investing.",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=225&fit=crop",
    duration: "16:55",
    views: "13.7K",
    likes: "967",
    category: "Education",
    featured: false
  }
];

const categories = ["All", "Beginner", "Legal", "Success Stories", "Property Tours", "Education"];

export const VideoLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredVideos = videos.filter(video => video.featured);
  const filteredVideos = selectedCategory === "All" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredVideos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredVideos.length) % featuredVideos.length);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Beginner": return "bg-success/10 text-success";
      case "Legal": return "bg-primary/10 text-primary";
      case "Success Stories": return "bg-accent/10 text-accent";
      case "Property Tours": return "bg-warning/10 text-warning";
      case "Education": return "bg-secondary/10 text-secondary";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Video Library</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Visual learning made simple - from beginner tutorials to expert insights and property walkthroughs
          </p>
        </div>

        {/* Featured Video Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            Featured Videos
          </h3>
          
          <div className="relative">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Video Thumbnail */}
                <div className="relative group">
                  <img 
                    src={featuredVideos[currentSlide]?.thumbnail}
                    alt={featuredVideos[currentSlide]?.title}
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50"
                    >
                      <Play className="h-8 w-8 text-white mr-2 fill-current" />
                      <span className="text-white font-semibold">Watch Now</span>
                    </Button>
                  </div>
                  <Badge className={`absolute top-4 left-4 ${getCategoryColor(featuredVideos[currentSlide]?.category || '')}`}>
                    {featuredVideos[currentSlide]?.category}
                  </Badge>
                </div>

                {/* Video Details */}
                <CardContent className="p-8 flex flex-col justify-center">
                  <h4 className="text-2xl font-bold mb-4">
                    {featuredVideos[currentSlide]?.title}
                  </h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredVideos[currentSlide]?.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {featuredVideos[currentSlide]?.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {featuredVideos[currentSlide]?.views} views
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {featuredVideos[currentSlide]?.likes}
                    </div>
                  </div>

                  <Button variant="hero" size="lg" className="w-fit">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Video
                  </Button>
                </CardContent>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                size="icon"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                {featuredVideos.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-primary' : 'bg-border'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Video className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="border-0 shadow-lg hover-glow hover-lift group overflow-hidden">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <Button 
                    size="sm" 
                    className="bg-white/0 group-hover:bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/0 group-hover:border-white/50 transition-all duration-300"
                  >
                    <Play className="h-5 w-5 text-white fill-current" />
                  </Button>
                </div>
                <Badge className={`absolute top-3 left-3 text-xs ${getCategoryColor(video.category)}`}>
                  {video.category}
                </Badge>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              
              <CardContent className="p-4">
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {video.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {video.likes}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* YouTube Channel CTA */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-500/10 to-red-600/10">
            <CardContent className="p-8 text-center">
              <Video className="h-16 w-16 mx-auto mb-6 text-red-500" />
              <h3 className="text-2xl font-bold mb-4">Subscribe to Our YouTube Channel</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get notified about new tutorials, property walkthroughs, and expert interviews. 
                Join thousands of subscribers learning about fractional real estate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" className="bg-red-500 hover:bg-red-600">
                  <Play className="mr-2 h-5 w-5" />
                  Subscribe on YouTube
                </Button>
                <Button variant="outline" size="lg">
                  View All Videos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};