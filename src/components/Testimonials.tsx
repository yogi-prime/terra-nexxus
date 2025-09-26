import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star, Quote, TrendingUp, MapPin } from "lucide-react";
import InvestmentModal from "@/components/property/InvestmentModal";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    location: "Bengaluru",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b547?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    investment: "₹2.5 Lakhs",
    returns: "14.2% CAGR",
    quote: "Started with just ₹25K in Phoenix Tower. In 2 years, I've earned ₹35K in returns and my investment has grown to ₹32K. The monthly rental income is amazing!",
    properties: 3,
    joinedYear: "2022"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Marketing Manager",
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    investment: "₹5.2 Lakhs",
    returns: "12.8% CAGR",
    quote: "Real estate was always my dream but I never had lakhs to invest. Terra Nexxus made it possible to own properties across 4 cities with small amounts. Excellent platform!",
    properties: 7,
    joinedYear: "2023"
  },
  {
    id: 3,
    name: "Sneha Patel",
    role: "Doctor",
    location: "Ahmedabad",
    image: "https://images.unsplash.com/photo-1559386484-97dfc0e15539?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    investment: "₹1.8 Lakhs",
    returns: "13.1% CAGR",
    quote: "The transparency is incredible. I get monthly reports, legal documents, and can track my investments live. Much better than mutual funds for long-term wealth building.",
    properties: 4,
    joinedYear: "2023"
  },
  {
    id: 4,
    name: "Amit Singh",
    role: "Business Owner",
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    investment: "₹8.7 Lakhs",
    returns: "15.3% CAGR",
    quote: "Diversified my business profits into fractional real estate. The returns beat my expectations and I love the passive income aspect. Great for busy entrepreneurs.",
    properties: 12,
    joinedYear: "2022"
  },
  {
    id: 5,
    name: "Kavya Menon",
    role: "Consultant",
    location: "Kochi",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    investment: "₹3.1 Lakhs",
    returns: "11.9% CAGR",
    quote: "Started investing for my daughter's education fund. The systematic approach and professional management gives me confidence. Already planning to increase my investments.",
    properties: 5,
    joinedYear: "2023"
  }
];

const successStories = [
  {
    title: "Phoenix Tower Success",
    subtitle: "Bengaluru Commercial Project",
    description: "Raised ₹50 Crores in 3 months with 847+ investors",
    metrics: {
      funded: "100%",
      investors: "847",
      yield: "14.2%"
    },
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=200&fit=crop"
  },
  {
    title: "Green Valley Plots",
    subtitle: "Pune Land Development",
    description: "Premium plots near metro station, 76% funded",
    metrics: {
      funded: "76%",
      investors: "523",
      yield: "12.8%"
    },
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop"
  }
];

export const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // modal state for Start Investing button
  const [modalOpen, setModalOpen] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(50000); // default amount

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Investors Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from real investors building wealth through Terra Nexxus
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Investor Testimonials */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Investor Success Stories</h3>
            
            <Card className="hover-glow relative overflow-hidden">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="h-12 w-12 text-primary/20 absolute top-4 right-4" />
                
                {/* Testimonial Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={testimonials[currentTestimonial].image} />
                      <AvatarFallback>
                        {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-bold">{testimonials[currentTestimonial].name}</h4>
                      <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{testimonials[currentTestimonial].location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg text-foreground/90 mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>

                  {/* Metrics */}
                  <div className="hidden-custom grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{testimonials[currentTestimonial].investment}</div>
                      <div className="text-xs text-muted-foreground">Total Invested</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">{testimonials[currentTestimonial].returns}</div>
                      <div className="text-xs text-muted-foreground">Returns</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">{testimonials[currentTestimonial].properties}</div>
                      <div className="text-xs text-muted-foreground">Properties</div>
                    </div>
                  </div>

                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Investor since {testimonials[currentTestimonial].joinedYear}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" onClick={prevTestimonial}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={nextTestimonial}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Property Success Stories */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Property Success Stories</h3>
            
            <div className="space-y-6">
              {successStories.map((story, index) => (
                <Card key={index} className="hover-glow hover-lift overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-1/3">
                      <img 
                        src={story.image} 
                        alt={story.title}
                        className="w-full h-32 sm:h-full object-cover"
                      />
                    </div>
                    <div className="sm:w-2/3 p-6">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <CardDescription className="text-base font-medium">
                          {story.subtitle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-muted-foreground mb-4">{story.description}</p>
                        
                        <div className="hidden-custom grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-success">{story.metrics.funded}</div>
                            <div className="text-xs text-muted-foreground">Funded</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{story.metrics.investors}</div>
                            <div className="text-xs text-muted-foreground">Investors</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-accent">{story.metrics.yield}</div>
                            <div className="text-xs text-muted-foreground">Yield</div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <Card className="mt-6 gradient-primary text-white border-0">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-bold mb-2">Join thousands of Happy Investors</h4>
                <p className="text-white/90 mb-4">Start your real estate investment journey today</p>
                <Button
                  variant="premium"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => setModalOpen(true)} // open modal
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Start Investing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Investment Modal */}
      <InvestmentModal
        property={{ minInvestment: 5000000, title: "Real Estate Investment" }}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialAmount={String(investmentAmount)}
      />
    </section>
  );
};