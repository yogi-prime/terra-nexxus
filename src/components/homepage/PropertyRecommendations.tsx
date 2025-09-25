import { useState } from "react";
import { Heart, MapPin, Phone, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const PropertyRecommendations = () => {
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

  const properties = [
    {
      id: "1",
      title: "Luxurious 3BHK Apartment",
      developer: "Lodha Group",
      location: "Bandra West, Mumbai",
      price: "₹2.85 Cr",
      originalPrice: "₹3.2 Cr",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      bhk: "3 BHK",
      area: "1,200 sq ft",
      verified: true,
      rating: 4.5,
      offer: "11% OFF"
    },
    {
      id: "2",
      title: "Premium Villa with Garden",
      developer: "Prestige Group",
      location: "Whitefield, Bangalore",
      price: "₹1.95 Cr",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      bhk: "4 BHK",
      area: "2,800 sq ft",
      verified: true,
      rating: 4.8,
      offer: null
    },
    {
      id: "3",
      title: "Modern Office Space",
      developer: "DLF Limited",
      location: "Gurgaon Sector 49",
      price: "₹85 L",
      originalPrice: "₹95 L",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      bhk: "Commercial",
      area: "1,500 sq ft",
      verified: true,
      rating: 4.3,
      offer: "10% OFF"
    },
    {
      id: "4",
      title: "Cozy 2BHK Apartment",
      developer: "Godrej Properties",
      location: "Andheri East, Mumbai",
      price: "₹1.45 Cr",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      bhk: "2 BHK",
      area: "850 sq ft",
      verified: true,
      rating: 4.2,
      offer: null
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trending Properties for You
          </h2>
          <p className="text-lg text-muted-foreground">
            Handpicked properties based on your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <button
                  onClick={() => toggleLike(property.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      likedProperties.has(property.id) 
                        ? "fill-red-500 text-red-500" 
                        : "text-gray-600"
                    }`}
                  />
                </button>

                {property.offer && (
                  <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                    {property.offer}
                  </Badge>
                )}

                {property.verified && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-success/90 text-white px-2 py-1 rounded-full text-xs">
                    <Shield className="h-3 w-3" />
                    Verified
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{property.rating}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {property.bhk}
                  </Badge>
                </div>

                <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                  {property.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-2">{property.developer}</p>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">{property.price}</span>
                      {property.originalPrice && (
                        <span className="text-sm line-through text-muted-foreground">
                          {property.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{property.area}</p>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Owner
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};