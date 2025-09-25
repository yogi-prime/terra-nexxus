import { Users, Building2, Shield, Award, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const TrustSection = () => {
  const stats = [
    {
      icon: Users,
      number: "2,00,000+",
      label: "Happy Customers",
      description: "Satisfied property buyers and renters"
    },
    {
      icon: Building2,
      number: "50,000+",
      label: "Verified Listings",
      description: "Properties verified by our experts"
    },
    {
      icon: Shield,
      number: "500+",
      label: "Trusted Developers",
      description: "Handpicked reliable developers"
    },
    {
      icon: TrendingUp,
      number: "₹5,000 Cr+",
      label: "Properties Sold",
      description: "Total transaction value facilitated"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "Found my dream 3BHK in Bandra through Terranexxus. Zero brokerage and complete transparency!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Raj Patel", 
      location: "Ahmedabad",
      text: "Sold my commercial property in just 2 weeks. The platform connects you with serious buyers.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Anita Singh",
      location: "Bangalore", 
      text: "Home loan process was smooth and I got the best interest rate. Highly recommend!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const certifications = [
    "ISO 27001 Certified",
    "RERA Approved", 
    "RBI Guidelines Compliant",
    "Real Estate Council Partner"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Millions Across India
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join India's largest and most trusted real estate marketplace
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-full">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">
            What Our Customers Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex mt-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Certified & Regulated Platform
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-foreground">{cert}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Your data is encrypted and secure with us</span>
          </div>
        </div>
      </div>
    </section>
  );
};