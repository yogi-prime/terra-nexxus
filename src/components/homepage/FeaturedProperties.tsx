import { useState } from "react";
import { Heart, MapPin, Phone, Shield, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturedProperties = () => {
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());

  const toggleLike = (propertyId: string) => {
    const newLiked = new Set(likedProperties);
    if (newLiked.has(propertyId)) {
      newLiked.delete(propertyId);
    } else {
      newLiked.add(propertyId);
    }
    setLikedProperties(newLiked);
  };

  const featuredProperties = [
    {
      id: "featured-1",
      title: "Lodha World One - Ultra Luxury",
      developer: "Lodha Group",
      location: "Lower Parel, Mumbai",
      price: "₹8.5 Cr onwards",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      bhk: "3-4 BHK",
      area: "1,800-2,500 sq ft",
      rating: 4.9,
      serviceType: "BUY",
      highlights: ["World's Tallest Residential Tower", "Premium Amenities", "Sea View"],
      views: "2.1K views"
    },
    {
      id: "featured-2", 
      title: "DLF Camellias - Premium Villas",
      developer: "DLF Limited",
      location: "Golf Course Road, Gurgaon",
      price: "₹12 Cr onwards",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      bhk: "4-5 BHK",
      area: "4,000-6,000 sq ft",
      rating: 4.8,
      serviceType: "BUY",
      highlights: ["Private Garden", "Golf Course View", "Luxury Interiors"],
      views: "1.8K views"
    },
    {
      id: "featured-3",
      title: "Prestige Shantiniketan",
      developer: "Prestige Group",
      location: "Whitefield, Bangalore",
      price: "₹1.2 Cr onwards",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      bhk: "2-3 BHK",
      area: "1,100-1,600 sq ft",
      rating: 4.7,
      serviceType: "BUY",
      highlights: ["IT Hub Location", "Metro Connectivity", "World-class Amenities"],
      views: "3.2K views"
    }
  ];

  const getServiceBadgeColor = (serviceType: string) => {
    switch (serviceType) {
      case "BUY": return "bg-green-500 text-white";
      case "RENT": return "bg-blue-500 text-white";
      case "LEASE": return "bg-orange-500 text-white";
      case "MORTGAGE": return "bg-purple-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Premium Properties
          </h2>
          <p className="text-lg text-muted-foreground">
            Handpicked luxury properties from India's top developers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <button
                  onClick={() => toggleLike(property.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      likedProperties.has(property.id) 
                        ? "fill-red-500 text-red-500" 
                        : "text-gray-600"
                    }`}
                  />
                </button>

                <Badge className={`absolute top-4 left-4 ${getServiceBadgeColor(property.serviceType)} font-semibold`}>
                  {property.serviceType}
                </Badge>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{property.views}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {property.bhk}
                  </Badge>
                  <div className="flex items-center gap-1 bg-success/20 text-success px-2 py-1 rounded-full text-xs">
                    <Shield className="h-3 w-3" />
                    Premium Verified
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {property.title}
                </h3>
                
                <p className="text-sm text-primary font-medium mb-3">{property.developer}</p>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location}</span>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-foreground">{property.price}</span>
                  <p className="text-sm text-muted-foreground">{property.area}</p>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {property.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Explore All Premium Properties
          </Button>
        </div>
      </div>
    </section>
  );
};