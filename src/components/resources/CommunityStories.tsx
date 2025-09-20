import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Building, 
  Quote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  ExternalLink
} from "lucide-react";

const investorStories = [
  {
    id: 1,
    name: "Priya Mehta",
    age: 32,
    location: "Mumbai",
    profession: "Software Engineer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b297?w=100&h=100&fit=crop&crop=face",
    story: "Started with ₹50,000 in a Bangalore office complex. Today, she owns fractional shares in 6 different properties across residential and commercial segments.",
    initialInvestment: "₹50,000",
    currentPortfolio: "₹3.2L",
    returns: "28%",
    timeFrame: "2.5 years",
    quote: "Terra Nexxus made real estate investing so accessible. I'm earning better returns than my FDs while building real wealth.",
    propertyTypes: ["Commercial", "Residential", "Agricultural"],
    featured: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    age: 45,
    location: "Delhi",
    profession: "Business Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    story: "Diversified his investment portfolio by adding real estate through Terra Nexxus. Now owns shares in premium properties across 4 cities.",
    initialInvestment: "₹2L",
    currentPortfolio: "₹8.5L",
    returns: "32%",
    timeFrame: "3 years",
    quote: "The legal structure and transparency gave me confidence. Much better than dealing with property brokers.",
    propertyTypes: ["Commercial", "Industrial", "Land Plots"],
    featured: true
  },
  {
    id: 3,
    name: "Ankit Sharma", 
    age: 28,
    location: "Bangalore",
    profession: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    story: "Young professional who started small and gradually built a diversified real estate portfolio spanning multiple asset classes.",
    initialInvestment: "₹25,000",
    currentPortfolio: "₹1.8L",
    returns: "22%",
    timeFrame: "2 years",
    quote: "Perfect for millennials like me who want real estate exposure without huge capital requirements.",
    propertyTypes: ["Residential", "Agricultural", "Retail"],
    featured: false
  }
];

const ownerStories = [
  {
    id: 1,
    ownerName: "Suresh Builders",
    projectName: "Phoenix IT Park, Bangalore",
    projectImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    amountRaised: "₹500 Cr",
    investors: 3200,
    completionTime: "18 months",
    story: "Successfully raised complete funding for their premium IT park through fractional ownership, enabling faster project completion and delivery.",
    ownerQuote: "Terra Nexxus helped us access retail investors directly, reducing our funding costs and timeline significantly.",
    category: "Commercial"
  },
  {
    id: 2,
    ownerName: "Green Farms Co-op",
    projectName: "Organic Farmland, Nashik",
    projectImage: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
    amountRaised: "₹120 Cr",
    investors: 800,
    completionTime: "12 months",
    story: "Funded large-scale organic farming project connecting urban investors with sustainable agriculture opportunities.",
    ownerQuote: "The platform enabled us to reach environmentally conscious investors who value sustainable farming practices.",
    category: "Agricultural"
  }
];

const communityStats = [
  { 
    metric: "Total Investors",
    value: "15,247",
    growth: "+34%",
    icon: Users
  },
  {
    metric: "Successful Exits",
    value: "2,847",
    growth: "+67%", 
    icon: TrendingUp
  },
  {
    metric: "Properties Funded",
    value: "47",
    growth: "+28%",
    icon: Building
  },
  {
    metric: "Avg. Portfolio Size",
    value: "₹4.2L",
    growth: "+45%",
    icon: TrendingUp
  }
];

export const CommunityStories = () => {
  const [currentInvestorStory, setCurrentInvestorStory] = useState(0);
  const [showAllStories, setShowAllStories] = useState(false);

  const featuredStories = investorStories.filter(story => story.featured);
  const displayedStories = showAllStories ? investorStories : featuredStories;

  const nextStory = () => {
    setCurrentInvestorStory((prev) => (prev + 1) % featuredStories.length);
  };

  const prevStory = () => {
    setCurrentInvestorStory((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Community & Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real investors, real returns, real stories. Discover how our community is building wealth through fractional real estate
          </p>
        </div>

        {/* Community Stats */}
        <div className="hidden-custom grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {communityStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg text-center hover-glow">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-2">{stat.metric}</div>
                <Badge variant="outline" className="text-xs text-success">
                  {stat.growth} this year
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Investor Success Stories */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Investor Success Stories</h3>
          </div>

          {/* Featured Story Carousel */}
          <div className="relative max-w-5xl mx-auto mb-8">
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left: Story Content */}
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <img 
                        src={featuredStories[currentInvestorStory]?.image}
                        alt={featuredStories[currentInvestorStory]?.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-xl font-bold">{featuredStories[currentInvestorStory]?.name}</h4>
                        <p className="text-muted-foreground text-sm">
                          {featuredStories[currentInvestorStory]?.profession} • {featuredStories[currentInvestorStory]?.location}
                        </p>
                      </div>
                    </div>

                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                    <blockquote className="text-lg italic mb-6 leading-relaxed">
                      "{featuredStories[currentInvestorStory]?.quote}"
                    </blockquote>

                    <p className="text-muted-foreground mb-6">
                      {featuredStories[currentInvestorStory]?.story}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {featuredStories[currentInvestorStory]?.propertyTypes.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Right: Stats */}
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 lg:p-12">
                    <h5 className="font-bold mb-6">Investment Journey</h5>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Initial Investment</span>
                        <span className="font-bold text-primary">{featuredStories[currentInvestorStory]?.initialInvestment}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Portfolio</span>
                        <span className="font-bold text-accent">{featuredStories[currentInvestorStory]?.currentPortfolio}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Returns</span>
                        <span className="font-bold text-success">{featuredStories[currentInvestorStory]?.returns}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Time Frame</span>
                        <span className="font-bold">{featuredStories[currentInvestorStory]?.timeFrame}</span>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>Investing from {featuredStories[currentInvestorStory]?.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Member since {new Date().getFullYear() - 3}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" onClick={prevStory}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                {featuredStories.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentInvestorStory ? 'bg-primary' : 'bg-border'
                    }`}
                    onClick={() => setCurrentInvestorStory(index)}
                  />
                ))}
              </div>
              
              <Button variant="outline" size="icon" onClick={nextStory}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Property Owner Success Stories */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Building className="h-6 w-6 text-accent" />
            <h3 className="text-2xl font-bold">Property Owner Success Stories</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ownerStories.map((story) => (
              <Card key={story.id} className="border-0 shadow-lg hover-glow overflow-hidden">
                <div className="relative">
                  <img 
                    src={story.projectImage}
                    alt={story.projectName}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-success text-white">
                    Successfully Funded
                  </Badge>
                  <Badge variant="outline" className="absolute top-4 right-4 bg-background">
                    {story.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-2">{story.ownerName}</h4>
                  <p className="text-primary font-semibold mb-4">{story.projectName}</p>
                  
                  <div className="hidden-custom grid grid-cols-3 gap-3 mb-4 text-center">
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      <div className="text-lg font-bold text-success">{story.amountRaised}</div>
                      <div className="text-xs text-muted-foreground">Raised</div>
                    </div>
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      <div className="text-lg font-bold text-accent">{story.investors}</div>
                      <div className="text-xs text-muted-foreground">Investors</div>
                    </div>
                    <div className="p-3 bg-secondary/30 rounded-lg">
                      <div className="text-lg font-bold text-warning">{story.completionTime}</div>
                      <div className="text-xs text-muted-foreground">Timeline</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{story.story}</p>
                  
                  <blockquote className="text-sm italic text-primary border-l-2 border-primary pl-3">
                    "{story.ownerQuote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Join Community CTA */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8 text-center">
            <Users className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Share Your Success Story</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our growing community of successful investors. Share your journey 
              and inspire others to start their fractional real estate investment story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
              <Button variant="outline" size="lg">
                <ExternalLink className="mr-2 h-5 w-5" />
                Share Your Story
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};