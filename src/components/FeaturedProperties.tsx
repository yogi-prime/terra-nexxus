import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, MapPin, Calendar, TrendingUp, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const properties = [
  // Fill your properties array
  {
    id: 1,
    name: "Phoenix Tower",
    location: "Bengaluru, Karnataka",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    type: "Commercial",
    minInvestment: 25000,
    targetRaise: 50000000,
    currentFunding: 44500000,
    projectedYield: 14.2,
    tenure: "3 years",
    investors: 847,
    status: "Open",
    highlights: ["Prime IT Hub Location", "Grade A Building", "Pre-leased to MNCs"]
  },
  {
    id: 2,
    name: "Green Valley Plots",
    location: "Pune, Maharashtra",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    type: "Land",
    minInvestment: 15000,
    targetRaise: 25000000,
    currentFunding: 19000000,
    projectedYield: 12.8,
    tenure: "5 years",
    investors: 523,
    status: "Open",
    highlights: ["Near Metro Station", "Approved Layout", "High Appreciation Zone"]
  },
  {
    id: 3,
    name: "Mall Complex",
    location: "Hyderabad, Telangana",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    type: "Retail",
    minInvestment: 50000,
    targetRaise: 75000000,
    currentFunding: 69000000,
    projectedYield: 15.1,
    tenure: "7 years",
    investors: 1234,
    status: "Closing Soon",
    highlights: ["Anchor Tenants Confirmed", "High Footfall Area", "Operational in 18 months"]
  },
  {
    id: 4,
    name: "Residential Tower",
    location: "Mumbai, Maharashtra",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    type: "Residential",
    minInvestment: 30000,
    targetRaise: 60000000,
    currentFunding: 50400000,
    projectedYield: 13.5,
    tenure: "6 years",
    investors: 967,
    status: "Open",
    highlights: ["Premium Location", "Luxury Amenities", "Ready to Move"]
  },
  {
    id: 5,
    name: "Warehouse Hub",
    location: "Chennai, Tamil Nadu",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
    type: "Warehouse",
    minInvestment: 20000,
    targetRaise: 35000000,
    currentFunding: 35000000,
    projectedYield: 11.9,
    tenure: "4 years",
    investors: 743,
    status: "Fully Funded",
    highlights: ["Logistics Hub", "Long-term Lease", "Steady Cash Flow"]
  }
];

export const FeaturedProperties = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <section className="py-20 bg-secondary/30 text-center">
        <p className="text-xl text-muted-foreground">Checking authentication...</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="py-20 bg-secondary/30 text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
        <p className="text-xl text-muted-foreground mb-6">
          Please login to view featured investment opportunities.
        </p>
        <Button onClick={() => (window.location.href = "/login")}>Login</Button>
      </section>
    );
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % Math.ceil(properties.length / 3));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(properties.length / 3)) % Math.ceil(properties.length / 3));

  const visibleProperties = properties.slice(currentSlide * 3, currentSlide * 3 + 3);

  return (
    <section id="properties" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Featured Properties</h2>
            <p className="text-xl text-muted-foreground">Handpicked investment opportunities across India</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover-glow hover-lift group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-card/95 backdrop-blur-sm">
                    {property.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={property.status === "Open" ? "secondary" : "outline"}
                    className={`bg-card/95 backdrop-blur-sm ${
                      property.status === "Closing Soon"
                        ? "bg-warning/10 text-warning border-warning/20"
                        : property.status === "Fully Funded"
                        ? "bg-success/10 text-success border-success/20"
                        : ""
                    }`}
                  >
                    {property.status}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{property.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Min Investment</p>
                    <p className="font-bold text-primary">₹{property.minInvestment.toLocaleString("en-IN")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Projected Yield</p>
                    <p className="font-bold text-success">{property.projectedYield}% p.a.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Funding Progress</span>
                    <span className="text-sm font-medium">
                      {Math.round((property.currentFunding / property.targetRaise) * 100)}%
                    </span>
                  </div>
                  <Progress value={(property.currentFunding / property.targetRaise) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹{(property.currentFunding / 10000000).toFixed(1)}Cr raised</span>
                    <span>₹{(property.targetRaise / 10000000).toFixed(1)}Cr target</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {property.investors} investors
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {property.tenure}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Highlights:</p>
                  <div className="flex flex-wrap gap-1">
                    {property.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="default"
                  className="w-full mt-4"
                  disabled={property.status === "Fully Funded"}
                >
                  {property.status === "Fully Funded" ? "Fully Funded" : "View Property"}
                  {property.status !== "Fully Funded" && <TrendingUp className="h-4 w-4 ml-2" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(properties.length / 3) }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-primary" : "bg-muted"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="accent" size="lg" onClick={() => navigate("/properties")}>
            View All Properties
            <TrendingUp className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
