import { useState } from "react";
import { MapPin, Phone, Shield, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Property {
  id: string;
  title: string;
  developer: string;
  location: string;
  price: string;
  image: string;
  bhk: string;
  area: string;
  rating: number;
  serviceType: "BUY" | "RENT" | "LEASE" | "MORTGAGE";
}

export const ServicePropertiesSection = () => {
  const [activeService, setActiveService] = useState<"BUY" | "RENT" | "LEASE" | "MORTGAGE">("BUY");

  const properties: Property[] = [
    {
      id: "buy-1",
      title: "Luxurious 3BHK Apartment",
      developer: "Lodha Group",
      location: "Bandra West, Mumbai",
      price: "₹2.85 Cr",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      bhk: "3 BHK",
      area: "1,200 sq ft",
      rating: 4.5,
      serviceType: "BUY"
    },
    {
      id: "buy-2",
      title: "Premium Villa with Garden",
      developer: "Prestige Group", 
      location: "Whitefield, Bangalore",
      price: "₹1.95 Cr",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      bhk: "4 BHK",
      area: "2,800 sq ft",
      rating: 4.8,
      serviceType: "BUY"
    },
    {
      id: "rent-1",
      title: "Modern 2BHK Apartment",
      developer: "Godrej Properties",
      location: "Powai, Mumbai",
      price: "₹45,000/month",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      bhk: "2 BHK",
      area: "950 sq ft",
      rating: 4.3,
      serviceType: "RENT"
    },
    {
      id: "rent-2",
      title: "Fully Furnished Studio",
      developer: "Brigade Group",
      location: "Koramangala, Bangalore",
      price: "₹28,000/month",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      bhk: "1 BHK",
      area: "650 sq ft",
      rating: 4.1,
      serviceType: "RENT"
    },
    {
      id: "lease-1",
      title: "Premium Office Space",
      developer: "DLF Limited",
      location: "Cyber City, Gurgaon",
      price: "₹180/sq ft/month",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      bhk: "Commercial",
      area: "2,500 sq ft",
      rating: 4.6,
      serviceType: "LEASE"
    },
    {
      id: "lease-2",
      title: "Warehouse Space",
      developer: "Embassy Group",
      location: "Hosur Road, Bangalore",
      price: "₹45/sq ft/month",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      bhk: "Industrial",
      area: "10,000 sq ft",
      rating: 4.4,
      serviceType: "LEASE"
    },
    {
      id: "mortgage-1",
      title: "Ready-to-Move Villa",
      developer: "Sobha Limited",
      location: "Sarjapur Road, Bangalore",
      price: "₹1.2 Cr (8.5% EMI)",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      bhk: "3 BHK",
      area: "1,850 sq ft",
      rating: 4.7,
      serviceType: "MORTGAGE"
    },
    {
      id: "mortgage-2",
      title: "Affordable 2BHK Flat",
      developer: "Mahindra Lifespaces",
      location: "Kandivali West, Mumbai",
      price: "₹85 L (7.9% EMI)",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      bhk: "2 BHK",
      area: "720 sq ft",
      rating: 4.2,
      serviceType: "MORTGAGE"
    }
  ];

  const services = [
    { key: "BUY" as const, label: "Buy Properties", color: "bg-green-500" },
    { key: "RENT" as const, label: "Rent Properties", color: "bg-blue-500" },
    { key: "LEASE" as const, label: "Lease Properties", color: "bg-orange-500" },
    { key: "MORTGAGE" as const, label: "Mortgage Properties", color: "bg-purple-500" }
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

  const filteredProperties = properties.filter(p => p.serviceType === activeService);

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Properties by Service Type
          </h2>
          <p className="text-lg text-muted-foreground">
            Find exactly what you're looking for
          </p>
        </div>

        {/* Service Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service) => (
            <button
              key={service.key}
              onClick={() => setActiveService(service.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeService === service.key
                  ? `${service.color} text-white shadow-lg scale-105`
                  : "bg-card text-foreground hover:bg-accent"
              }`}
            >
              {service.label}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                <Badge className={`absolute top-3 left-3 ${getServiceBadgeColor(property.serviceType)} font-semibold`}>
                  {property.serviceType}
                </Badge>

                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs">
                  <Shield className="h-3 w-3" />
                  Verified
                </div>
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
                    <span className="text-lg font-bold text-foreground">{property.price}</span>
                    <p className="text-xs text-muted-foreground">{property.area}</p>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All {activeService.toLowerCase()} Properties
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};