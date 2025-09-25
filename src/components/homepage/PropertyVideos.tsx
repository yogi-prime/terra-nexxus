import { Play, Eye, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const PropertyVideos = () => {
  const propertyVideos = [
    {
      id: "video-1",
      title: "Lodha Park - Virtual Walkthrough",
      location: "Lower Parel, Mumbai",
      developer: "Lodha Group",
      thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      duration: "3:45",
      views: "12.5K",
      price: "₹2.85 Cr onwards",
      type: "Virtual Tour"
    },
    {
      id: "video-2", 
      title: "DLF Camellias - Luxury Villa Tour",
      location: "Gurgaon, Delhi NCR",
      developer: "DLF Limited",
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      duration: "5:12",
      views: "8.9K",
      price: "₹12 Cr onwards",
      type: "Property Tour"
    },
    {
      id: "video-3",
      title: "Prestige Shantiniketan - Amenities",
      location: "Whitefield, Bangalore",
      developer: "Prestige Group",
      thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      duration: "2:30",
      views: "15.2K",
      price: "₹1.2 Cr onwards",
      type: "Amenities Tour"
    },
    {
      id: "video-4",
      title: "Godrej Emerald - Sample Flat",
      location: "Thane West, Mumbai",
      developer: "Godrej Properties",
      thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      duration: "4:20",
      views: "6.7K",
      price: "₹1.1 Cr onwards",
      type: "Sample Flat"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Property Video Tours
          </h2>
          <p className="text-lg text-muted-foreground">
            Take virtual tours of premium properties from the comfort of your home
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {propertyVideos.map((video) => (
            <Card key={video.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>

                {/* Video Info Overlays */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-600 text-white">
                    <Play className="h-3 w-3 mr-1" />
                    {video.type}
                  </Badge>
                </div>

                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {video.duration}
                </div>

                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {video.views} views
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {video.title}
                </h3>
                
                <p className="text-sm text-primary font-medium mb-2">{video.developer}</p>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{video.location}</span>
                </div>

                <div className="mb-4">
                  <span className="text-lg font-bold text-foreground">{video.price}</span>
                </div>

                <Button size="sm" className="w-full" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Tour
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            View All Property Videos
          </Button>
        </div>
      </div>
    </section>
  );
};