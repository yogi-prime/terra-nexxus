import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  Building, 
  Heart,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const investorStories = [
  {
    name: "Ankit Sharma",
    age: 28,
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    investment: "₹2.5L",
    properties: 5,
    returns: "14.2%",
    journey: "Started with ₹25K in a Gurgaon office space. Now owns fractions across 5 properties including farmland and commercial spaces.",
    quote: "Terra Nexxus made real estate investing so simple. I'm earning more than FDs while building a diversified portfolio.",
    rating: 5
  },
  {
    name: "Priya Mehta", 
    age: 35,
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b297?w=100&h=100&fit=crop&crop=face",
    investment: "₹8L",
    properties: 12,
    returns: "12.8%",
    journey: "Working professional who wanted to invest in real estate. Built a ₹8L portfolio across residential and commercial properties.",
    quote: "The transparency and legal ownership gave me confidence. I've recommended Terra Nexxus to all my friends.",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    age: 42, 
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    investment: "₹15L",
    properties: 8,
    returns: "13.5%",
    journey: "Business owner looking to diversify beyond stocks. Invested in premium commercial and agricultural properties.",
    quote: "The monthly rental income is fantastic. Much better returns than traditional investments with real asset backing.",
    rating: 5
  }
];

const ownerStories = [
  {
    name: "Suresh Builders",
    project: "Phoenix Tower, Bengaluru",
    raised: "₹500 Cr",
    investors: 3200,
    story: "Raised full funding for their premium office complex through fractional ownership, enabling faster project completion.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop"
  },
  {
    name: "Green Farms Co.",
    project: "Organic Farmland, Nashik", 
    raised: "₹120 Cr",
    investors: 800,
    story: "Successfully funded agricultural land development, providing investors with both yield and sustainable farming exposure.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop"
  }
];

const communityStats = [
  { 
    location: "Mumbai", 
    investors: "4,200+", 
    avgInvestment: "₹65K",
    topCategory: "Residential"
  },
  { 
    location: "Bangalore", 
    investors: "3,800+", 
    avgInvestment: "₹58K", 
    topCategory: "Commercial"
  },
  { 
    location: "Delhi NCR", 
    investors: "3,500+", 
    avgInvestment: "₹72K",
    topCategory: "Commercial" 
  },
  { 
    location: "Pune", 
    investors: "1,900+", 
    avgInvestment: "₹45K",
    topCategory: "Residential"
  },
  { 
    location: "Hyderabad", 
    investors: "1,600+", 
    avgInvestment: "₹52K",
    topCategory: "Industrial"
  }
];

export const CommunityTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % investorStories.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + investorStories.length) % investorStories.length);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Community</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from real investors who are building wealth through fractional real estate investment
          </p>
        </div>

        {/* Investor Stories Carousel */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Investor Success Stories</h3>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Profile */}
                  <div className="text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row items-center gap-4 mb-6">
                      <img 
                        src={investorStories[currentTestimonial].image}
                        alt={investorStories[currentTestimonial].name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-xl font-bold">{investorStories[currentTestimonial].name}</h4>
                        <p className="text-muted-foreground">
                          {investorStories[currentTestimonial].age} years • {investorStories[currentTestimonial].location}
                        </p>
                        <div className="flex items-center justify-center lg:justify-start gap-1 mt-2">
                          {[...Array(investorStories[currentTestimonial].rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-secondary/30 rounded-lg">
                        <div className="text-lg font-bold text-primary">{investorStories[currentTestimonial].investment}</div>
                        <div className="text-xs text-muted-foreground">Total Investment</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/30 rounded-lg">
                        <div className="text-lg font-bold text-accent">{investorStories[currentTestimonial].properties}</div>
                        <div className="text-xs text-muted-foreground">Properties</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/30 rounded-lg">
                        <div className="text-lg font-bold text-success">{investorStories[currentTestimonial].returns}</div>
                        <div className="text-xs text-muted-foreground">Avg Return</div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Story */}
                  <div>
                    <Quote className="h-12 w-12 text-primary/30 mb-4" />
                    <blockquote className="text-lg italic mb-6 leading-relaxed">
                      "{investorStories[currentTestimonial].quote}"
                    </blockquote>
                    <p className="text-muted-foreground mb-6">
                      {investorStories[currentTestimonial].journey}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button 
                variant="outline" 
                size="icon"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                {investorStories.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-border'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Property Owner Success */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Building className="h-6 w-6 text-accent" />
            <h3 className="text-2xl font-bold">Property Owner Success</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ownerStories.map((story, index) => (
              <Card key={index} className="border-0 shadow-lg hover-glow overflow-hidden">
                <div className="relative">
                  <img 
                    src={story.image}
                    alt={story.project}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-success text-white">
                    Successfully Funded
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-2">{story.name}</h4>
                  <p className="text-primary font-semibold mb-4">{story.project}</p>
                  
                  <div className="hidden-custom grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-lg font-bold text-success">{story.raised}</div>
                      <div className="text-xs text-muted-foreground">Total Raised</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="text-lg font-bold text-accent">{story.investors}</div>
                      <div className="text-xs text-muted-foreground">Investors</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {story.story}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Interactive Community Map */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin className="h-6 w-6 text-success" />
            <h3 className="text-2xl font-bold">Investor Communities Across India</h3>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {communityStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-secondary/30 rounded-lg hover-glow">
                    <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h4 className="font-bold text-lg mb-2">{stat.location}</h4>
                    <div className="hidden-custom space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Investors:</span>
                        <span className="font-semibold text-primary">{stat.investors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Avg Investment:</span>
                        <span className="font-semibold text-accent">{stat.avgInvestment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Top Category:</span>
                        <span className="font-semibold text-success">{stat.topCategory}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community CTA */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8 text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Join Our Growing Community</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
              Be part of 15,000+ investors who are building wealth through fractional real estate. 
              Share your success story and connect with like-minded investors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Start Your Journey
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Join Community Forum
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};