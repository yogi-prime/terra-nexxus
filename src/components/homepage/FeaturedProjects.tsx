import { ArrowRight, MapPin, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroBackground from "@/assets/featuredbg.jpeg";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const FeaturedProjects = () => {
  const projects = [
    {
      id: "1",
      name: "Lodha World Towers",
      developer: "Lodha Group",
      location: "Lower Parel, Mumbai",
      priceRange: "₹3.5 - 8.2 Cr",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&h=300&fit=crop",
      completionDate: "Dec 2025",
      rating: 4.8,
      amenities: ["Swimming Pool", "Gym", "Club House"],
      status: "Under Construction",
      offer: "Book Now & Save ₹15L"
    },
    {
      id: "2",
      name: "Prestige Lakeside Habitat",
      developer: "Prestige Group",
      location: "Varthur, Bangalore",
      priceRange: "₹85L - 2.1 Cr",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&h=300&fit=crop",
      completionDate: "Mar 2026",
      rating: 4.6,
      amenities: ["Lake View", "Jogging Track", "Kids Play Area"],
      status: "Launching Soon",
      offer: "Early Bird Discount"
    },
    {
      id: "3",
      name: "DLF Cyber Hub Extension",
      developer: "DLF Limited",
      location: "Gurgaon, Delhi NCR",
      priceRange: "₹1.2 - 4.5 Cr",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
      completionDate: "Aug 2024",
      rating: 4.7,
      amenities: ["Metro Connectivity", "Food Court", "Shopping Mall"],
      status: "Ready to Move",
      offer: "Zero Registration"
    },
    {
      id: "4",
      name: "Godrej Emerald",
      developer: "Godrej Properties",
      location: "Thane West, Mumbai",
      priceRange: "₹1.1 - 2.8 Cr",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop",
      completionDate: "Jan 2025",
      rating: 4.5,
      amenities: ["Green Spaces", "Senior Citizen Area", "Yoga Deck"],
      status: "80% Sold Out",
      offer: "Limited Units Left"
    }
  ];

  return (
    <section className=" relative py-16 bg-card-premium">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-card-premium/95 via-card-premium/85 to-transparent" />
        <div className="absolute inset-0 gradient-hero opacity-20" />
      </div>
      <div className="container z-50 relative mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-card-premium-foreground mb-4">
            Featured Projects & New Launches
          </h2>
          <p className="text-lg text-muted-dark-foreground max-w-2xl mx-auto">
            Discover premium projects from India's most trusted developers
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {projects.map((project) => (
              <CarouselItem key={project.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="group overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <Badge className={`${
                        project.status === 'Ready to Move' ? 'bg-success text-success-foreground' :
                        project.status === 'Launching Soon' ? 'bg-accent text-accent-foreground' :
                        'bg-primary text-primary-foreground'
                      }`}>
                        {project.status}
                      </Badge>
                      {project.offer && (
                        <Badge variant="destructive" className="text-xs">
                          {project.offer}
                        </Badge>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {project.rating}
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    
                    <p className="text-sm font-medium text-accent mb-2">
                      by {project.developer}
                    </p>
                    
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-lg font-bold text-foreground">{project.priceRange}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{project.completionDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.amenities.slice(0, 2).map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {project.amenities.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.amenities.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="text-card-premium-black border-card-premium-foreground hover:bg-card-premium-foreground hover:text-card-premium">
            Explore All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};