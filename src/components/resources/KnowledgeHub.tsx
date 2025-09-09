import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  User, 
  TrendingUp, 
  Filter,
  ExternalLink
} from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Why Fractional Real Estate is Growing 40% CAGR in India",
    excerpt: "Deep dive into the explosive growth of fractional real estate investment and what's driving the trend across Indian metros.",
    category: "Beginner",
    readTime: "8 min",
    author: "Rajesh Sharma",
    date: "Dec 15, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Residential vs Commercial: Which Gives Better Yield?",
    excerpt: "Comprehensive analysis of yield patterns, risk factors, and market trends across residential and commercial real estate segments.",
    category: "Advanced",
    readTime: "12 min",
    author: "Priya Mehta",
    date: "Dec 10, 2024",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    featured: true
  },
  {
    id: 3,
    title: "Taxation on Fractional Ownership in India: Complete Guide",
    excerpt: "Everything you need to know about tax implications, TDS, capital gains, and compliance requirements for fractional real estate.",
    category: "Legal",
    readTime: "15 min",
    author: "CA Amit Gupta",
    date: "Dec 5, 2024",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Investor Story: How ₹50K Became ₹72K in 3 Years",
    excerpt: "Real investor journey from first investment to building a diversified portfolio across 6 different property categories.",
    category: "Case Studies",
    readTime: "6 min",
    author: "Ankit Kumar",
    date: "Nov 28, 2024",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
    featured: false
  },
  {
    id: 5,
    title: "SPV vs LLP: Legal Structures Explained Simply",
    excerpt: "Understanding the legal framework behind fractional ownership - from Special Purpose Vehicles to Limited Liability Partnerships.",
    category: "Legal",
    readTime: "10 min",
    author: "Advocate Meera Singh",
    date: "Nov 20, 2024",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
    featured: false
  },
  {
    id: 6,
    title: "Building a ₹10L Real Estate Portfolio: Step-by-Step Guide",
    excerpt: "Practical roadmap to systematically build a diversified real estate portfolio starting with just ₹10,000 investments.",
    category: "Advanced",
    readTime: "18 min",
    author: "Suresh Patel",
    date: "Nov 15, 2024",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
    featured: false
  },
  {
    id: 7,
    title: "Understanding SEBI Guidelines for Alternative Investments",
    excerpt: "Breakdown of regulatory framework governing fractional real estate platforms and investor protection measures.",
    category: "Legal",
    readTime: "14 min",
    author: "Dr. Kiran Patel",
    date: "Nov 8, 2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    featured: false
  },
  {
    id: 8,
    title: "Farmland Investment: The Hidden Goldmine",
    excerpt: "Why agricultural real estate is becoming the preferred choice for smart investors seeking stable returns and portfolio diversification.",
    category: "Beginner",
    readTime: "9 min",
    author: "Rahul Joshi",
    date: "Oct 30, 2024",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
    featured: false
  }
];

const categories = ["All", "Beginner", "Advanced", "Legal", "Case Studies"];

export const KnowledgeHub = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Beginner": return "bg-success/10 text-success";
      case "Advanced": return "bg-warning/10 text-warning";
      case "Legal": return "bg-primary/10 text-primary";
      case "Case Studies": return "bg-accent/10 text-accent";
      default: return "bg-secondary/10 text-secondary";
    }
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Knowledge Hub</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert insights, guides, and case studies to master fractional real estate investing
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Featured Articles
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="border-0 shadow-lg hover-glow hover-lift group overflow-hidden">
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className={`absolute top-4 left-4 ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                    </div>
                    <span>{article.date}</span>
                  </div>
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    Read Article
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
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

        {/* All Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="border-0 shadow-lg hover-glow hover-lift group overflow-hidden">
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-3 left-3 text-xs ${getCategoryColor(article.category)}`}>
                  {article.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h4 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </div>
                  <span>{article.date}</span>
                </div>
                <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-sm">
                  Read More
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Stay Updated with Market Insights</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get weekly market analysis, investment tips, and exclusive guides delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
                />
                <Button variant="hero" className="px-6 py-3">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                No spam. Unsubscribe anytime. Read our Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};