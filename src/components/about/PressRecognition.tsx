import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Newspaper, 
  Award, 
  ExternalLink, 
  Calendar,
  Quote
} from "lucide-react";

const pressLogos = [
  { name: "Economic Times", logo: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=200&h=100&fit=crop" },
  { name: "Mint", logo: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=200&h=100&fit=crop" },
  { name: "Business Standard", logo: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=200&h=100&fit=crop" },
  { name: "MoneyControl", logo: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=200&h=100&fit=crop" },
  { name: "Forbes India", logo: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=200&h=100&fit=crop" },
  { name: "YourStory", logo: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=200&h=100&fit=crop" }
];

const featuredArticles = [
  {
    title: "Fractional investing will reshape India's real estate market",
    publication: "Economic Times",
    date: "Dec 15, 2024",
    excerpt: "Terra Nexxus is leading the charge in democratizing real estate investment, making premium properties accessible to retail investors.",
    link: "#",
    category: "Market Analysis"
  },
  {
    title: "How Terra Nexxus raised ₹1000 Cr in 2 years",
    publication: "Mint",
    date: "Nov 28, 2024", 
    excerpt: "The fintech startup's innovative fractional ownership model has attracted over 15,000 investors across India.",
    link: "#",
    category: "Funding News"
  },
  {
    title: "The future of proptech in India",
    publication: "Business Standard",
    date: "Oct 10, 2024",
    excerpt: "Industry experts believe fractional real estate platforms like Terra Nexxus will drive the next wave of property investment.",
    link: "#",
    category: "Industry Report"
  }
];

const awards = [
  {
    title: "Best Fintech Innovation",
    organization: "FICCI Digital Awards",
    year: "2024",
    description: "Recognition for democratizing real estate investment"
  },
  {
    title: "Startup of the Year",
    organization: "PropertyTech Summit",
    year: "2024", 
    description: "Leading innovation in property technology"
  },
  {
    title: "Excellence in Compliance",
    organization: "SEBI Recognition",
    year: "2023",
    description: "Outstanding regulatory compliance framework"
  },
  {
    title: "Investor Choice Award",
    organization: "Wealth Management Forum",
    year: "2023",
    description: "Most trusted fractional investment platform"
  }
];

const testimonialQuotes = [
  {
    quote: "Fractional investing will reshape India's real estate market, and Terra Nexxus is at the forefront of this revolution.",
    source: "Economic Times Editorial",
    date: "December 2024"
  },
  {
    quote: "Terra Nexxus has successfully bridged the gap between retail investors and premium real estate opportunities.",
    source: "Mint Analysis",
    date: "November 2024"
  }
];

export const PressRecognition = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Press & Recognition</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Recognized by leading media and industry experts for innovation in fractional real estate investment
          </p>
        </div>

        {/* Media Logos */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-center mb-8 text-muted-foreground">Featured In</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {pressLogos.map((media, index) => (
              <Card key={index} className="border-0 shadow-md hover-glow group">
                <CardContent className="p-4 flex items-center justify-center h-20">
                  <img 
                    src={media.logo} 
                    alt={media.name}
                    className="max-h-8 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Newspaper className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">Featured Articles</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <Card key={index} className="border-0 shadow-lg hover-glow hover-lift group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">{article.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {article.date}
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  
                  <p className="text-sm text-primary font-medium mb-3">{article.publication}</p>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <Button variant="ghost" size="sm" className="p-0 h-auto font-medium">
                    Read Full Article
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Award className="h-6 w-6 text-accent" />
            <h3 className="text-2xl font-bold">Awards & Recognition</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <Card key={index} className="border-0 shadow-lg text-center hover-glow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-warning rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold mb-2">{award.title}</h4>
                  <p className="text-sm text-primary mb-1">{award.organization}</p>
                  <p className="text-xs text-muted-foreground font-semibold mb-3">{award.year}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {award.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonial Quotes from Press */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Media Says</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonialQuotes.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="p-8 text-center">
                  <Quote className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
                  <blockquote className="text-lg italic mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-sm">
                    <p className="font-semibold text-primary">{testimonial.source}</p>
                    <p className="text-muted-foreground">{testimonial.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Media Kit CTA */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-8 text-center">
            <Newspaper className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Media Inquiries</h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              For press releases, interviews, and media kit including high-resolution images, 
              company information, and leadership profiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Download Media Kit
              </Button>
              <Button variant="outline" size="lg">
                Contact Press Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};