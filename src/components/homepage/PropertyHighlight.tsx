import { Play, MapPin, Calendar, Users, Wifi, Car, Trees, Shield, Star, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const PropertyHighlight = () => {
  const highlightProperty = {
    title: "One World Trade Center Mumbai",
    developer: "Lodha Group",
    location: "Lower Parel, Mumbai",
    price: "₹15 Cr onwards",
    type: "Ultra Luxury Apartments",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    video: true,
    rating: 4.9,
    completionDate: "Dec 2024",
    unitsAvailable: "12 units left",
    bhk: "3-4 BHK",
    area: "2,200-3,800 sq ft",
    highlights: ["World's Tallest Residential Tower", "Panoramic Sea & City Views", "Sky Decks & Observatory"],
    amenities: [
      { icon: Wifi, label: "High-Speed Internet" },
      { icon: Car, label: "Valet Parking" },
      { icon: Trees, label: "Sky Gardens" },
      { icon: Shield, label: "24/7 Security" }
    ],
    features: [
      "Premium Italian marble flooring",
      "Floor-to-ceiling windows",
      "Smart home automation",
      "Private elevator lobby",
      "Designer modular kitchen",
      "Premium bathroom fittings"
    ]
  };

  return (
    <section className="py-16  from-card via-card-premium to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent text-accent-foreground">
            Property Spotlight
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Flagship Project of the Month
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover Mumbai's most prestigious address
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image/Video Section */}
              <div className="relative group">
                <img
                  src={highlightProperty.image}
                  alt={highlightProperty.title}
                  className="w-full h-96 lg:h-full object-cover"
                />
                
                {/* Video Play Overlay */}
                {highlightProperty.video && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-6 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                      <Play className="h-12 w-12 text-white fill-white" />
                    </div>
                  </div>
                )}

                {/* Overlay Info */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 text-white font-semibold">
                    BUY
                  </Badge>
                </div>

                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 text-white p-3 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{highlightProperty.unitsAvailable}</span>
                      <Calendar className="h-4 w-4 ml-2" />
                      <span className="text-sm">Ready by {highlightProperty.completionDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{highlightProperty.rating}</span>
                  </div>
                  <Badge variant="outline">{highlightProperty.bhk}</Badge>
                  <div className="flex items-center gap-1 bg-success/20 text-success px-2 py-1 rounded-full text-xs">
                    <Shield className="h-3 w-3" />
                    Premium Verified
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {highlightProperty.title}
                </h3>
                
                <p className="text-lg text-primary font-semibold mb-4">
                  {highlightProperty.developer}
                </p>

                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="h-5 w-5" />
                  <span>{highlightProperty.location}</span>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">{highlightProperty.price}</span>
                  <p className="text-muted-foreground">{highlightProperty.area} • {highlightProperty.type}</p>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Key Highlights</h4>
                  <div className="space-y-2">
                    {highlightProperty.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Premium Amenities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {highlightProperty.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <amenity.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-3">Luxury Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {highlightProperty.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="flex-1">
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Developer
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    View Full Details
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};