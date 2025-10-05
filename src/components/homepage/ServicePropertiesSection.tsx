// import { useState, useEffect } from "react";
// import { MapPin, Phone, Shield, Star, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";

// interface Property {
//   id: string;
//   title: string;
//   developer: string;
//   location: string;
//   price: string;
//   image: string;
//   bhk: string;
//   area: string;
//   rating: number;
//   serviceType: string;
// }

// interface Service {
//   key: string;
//   label: string;
//   color: string;
// }

// export const ServicePropertiesSection = () => {
//   const [activeService, setActiveService] = useState<string>("");
//   const [services, setServices] = useState<Service[]>([]);
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Map backend service key to friendly label
//   const SERVICE_LABEL_MAP: Record<string, string> = {
//     new: "Buy Properties",
//     resale: "Resale Properties",
//     rent: "Rent Properties",
//     lease: "Lease Properties",
//     mortgage: "Mortgage Properties",
//   };

//   // Map service to badge color
//   const SERVICE_COLOR_MAP: Record<string, string> = {
//     new: "bg-green-500",
//     resale: "bg-teal-500",
//     rent: "bg-blue-500",
//     lease: "bg-orange-500",
//     mortgage: "bg-purple-500",
//   };

//   // --- Fetch available services from backend ---
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setError(null);
//         const res = await fetch("https://app.terranexxus.com/api/v1/properties/filters");
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const data = await res.json();

//         if (!data.services || data.services.length === 0) {
//           setError("No services available");
//           return;
//         }

//         const mappedServices: Service[] = data.services.map((svc: string) => ({
//           key: svc,
//           label: SERVICE_LABEL_MAP[svc] ?? svc.charAt(0).toUpperCase() + svc.slice(1),
//           color: SERVICE_COLOR_MAP[svc] ?? "bg-gray-500",
//         }));

//         setServices(mappedServices);
//         setActiveService(mappedServices[0].key); // select first service by default
//       } catch (err) {
//         console.error("Failed to fetch services:", err);
//         setError("Failed to load services");
//       }
//     };

//     fetchServices();
//   }, []);

//   // --- Fetch properties for the active service ---
//   useEffect(() => {
//     if (!activeService) return;

//     const fetchProperties = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await fetch(`https://app.terranexxus.com/api/v1/properties?service=${activeService}`);
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const json = await res.json();

//         const formatted: Property[] = (json.data || []).map((p: any) => ({
//           id: p.id,
//           title: p.title,
//           developer: p.builder_name,
//           location: `${p.location.city}, ${p.location.state}`,
//           price: p.price?.actual ?? "N/A",
//           image: p.media?.main_image ?? "https://via.placeholder.com/400x300",
//           bhk: p.layout?.bedrooms ? `${p.layout.bedrooms} BHK` : "N/A",
//           area: p.layout?.size_text ?? "N/A",
//           rating: p.rating ?? 0,
//           serviceType: activeService,
//         }));

//         setProperties(formatted);
//       } catch (err) {
//         console.error("Failed to fetch properties:", err);
//         setError("Failed to load properties");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, [activeService]);

//   const getServiceBadgeColor = (serviceType: string) =>
//     (SERVICE_COLOR_MAP[serviceType] ?? "bg-gray-500") + " text-white";

//   return (
//     <section className="py-16 bg-secondary/30">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//             Properties by Service Type
//           </h2>
//           <p className="text-lg text-muted-foreground">Find exactly what you're looking for</p>
//         </div>

//         {/* Service Tabs */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {services.map((service) => (
//             <button
//               key={service.key}
//               onClick={() => setActiveService(service.key)}
//               className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
//                 activeService === service.key
//                   ? `${service.color} text-white shadow-lg scale-105`
//                   : "bg-card text-foreground hover:bg-accent"
//               }`}
//             >
//               {service.label}
//             </button>
//           ))}
//         </div>

//         {/* Error or Loading */}
//         {error && <p className="text-center text-red-500 mb-6">{error}</p>}
//         {loading && <p className="text-center mb-6">Loading properties...</p>}

//         {/* Properties Grid */}
// {!loading && !error && (
//   <>
//     {properties.length === 0 ? (
//       <p className="text-center text-gray-500 mb-6">
//         No properties available for this service.
//       </p>
//     ) : (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//         {properties.map((property) => (
//           <Card
//             key={property.id}
//             className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
//           >
//             <div className="relative">
//               <img
//                 src={property.image}
//                 alt={property.title}
//                 className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//               <Badge
//                 className={`absolute top-3 left-3 ${getServiceBadgeColor(property.serviceType)} font-semibold`}
//               >
//                 {property.serviceType.toUpperCase()}
//               </Badge>
//               <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs">
//                 <Shield className="h-3 w-3" /> Verified
//               </div>
//             </div>

//             <CardContent className="p-4">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="flex items-center gap-1">
//                   <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                   <span className="text-sm font-medium">{property.rating}</span>
//                 </div>
//                 <Badge variant="outline" className="text-xs">
//                   {property.bhk}
//                 </Badge>
//               </div>

//               <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{property.title}</h3>
//               <p className="text-sm text-muted-foreground mb-2">{property.developer}</p>
//               <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
//                 <MapPin className="h-4 w-4" />
//                 <span className="truncate">{property.location}</span>
//               </div>

//               <div className="flex items-center justify-between mb-3">
//                 <div>
//                   <span className="text-lg font-bold text-foreground">{property.price}</span>
//                   <p className="text-xs text-muted-foreground">{property.area}</p>
//                 </div>
//               </div>

//               <Button size="sm" className="w-full">
//                 <Phone className="h-4 w-4 mr-2" /> Contact Now
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     )}
//   </>
// )}

//         <div className="text-center">
//           <Button variant="outline" size="lg" className="px-8">
//             View All {activeService.toLowerCase()} Properties
//             <ArrowRight className="h-4 w-4 ml-2" />
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };
import { useState, useEffect } from "react";
import { MapPin, Eye, Shield, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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
  serviceType: string;
}

interface Service {
  key: string;
  label: string;
  color: string;
}

export const ServicePropertiesSection = () => {
  const [activeService, setActiveService] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Label map
  const SERVICE_LABEL_MAP: Record<string, string> = {
    new: "Buy Properties",
    resale: "Resale Properties",
    rent: "Rent Properties",
    lease: "Lease Properties",
    mortgage: "Mortgage Properties",
  };

  // Color map
  const SERVICE_COLOR_MAP: Record<string, string> = {
    new: "bg-green-500",
    resale: "bg-teal-500",
    rent: "bg-blue-500",
    lease: "bg-orange-500",
    mortgage: "bg-purple-500",
  };

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setError(null);
        const res = await fetch("https://app.terranexxus.com/api/v1/properties/filters");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        if (!data.services || data.services.length === 0) {
          setError("No services available");
          return;
        }

        const mappedServices: Service[] = data.services.map((svc: string) => ({
          key: svc,
          label: SERVICE_LABEL_MAP[svc] ?? svc.charAt(0).toUpperCase() + svc.slice(1),
          color: SERVICE_COLOR_MAP[svc] ?? "bg-gray-500",
        }));

        setServices(mappedServices);
        setActiveService(mappedServices[0].key);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Failed to load services");
      }
    };

    fetchServices();
  }, []);

  // Fetch properties for active service
  useEffect(() => {
    if (!activeService) return;

    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://app.terranexxus.com/api/v1/properties?service=${activeService}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();

        const formatted: Property[] = (json.data || []).map((p: any) => ({
          id: p.id,
          title: p.title,
          developer: p.builder_name,
          location: `${p.location.city}, ${p.location.state}`,
          price: p.price?.actual ?? "N/A",
          image: p.media?.main_image ?? "https://via.placeholder.com/400x300",
          bhk: p.layout?.bedrooms ? `${p.layout.bedrooms} BHK` : "N/A",
          area: p.layout?.size_text ?? "N/A",
          rating: p.rating ?? 5,
          serviceType: activeService,
        }));

        setProperties(formatted.slice(0, 4)); // 👈 Limit to 4
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [activeService]);

  const getServiceBadgeColor = (serviceType: string) =>
    (SERVICE_COLOR_MAP[serviceType] ?? "bg-gray-500") + " text-white";

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

        {/* Service Tabs */}
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

        {/* Error / Loading */}
        {error && <p className="text-center text-red-500 mb-6">{error}</p>}
        {loading && <p className="text-center mb-6">Loading properties...</p>}

        {/* Property Grid */}
        {!loading && !error && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {properties.map((property) => (
              <Card
                key={property.id}
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge
                    className={`absolute top-3 left-3 ${getServiceBadgeColor(property.serviceType)} font-semibold`}
                  >
                    {property.serviceType.toUpperCase()}
                  </Badge>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs">
                    <Shield className="h-3 w-3" /> Verified
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
                  <p className="text-sm text-muted-foreground mb-2">
                    {property.developer}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold text-foreground">
                        {property.price}
                      </span>
                      <p className="text-xs text-muted-foreground">{property.area}</p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => navigate(`/property-show/${property.id}`)} // 👈 go to details
                  >
                    <Eye className="h-4 w-4 mr-2" /> View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="px-8"
            onClick={() => navigate("/marketplace")} // 👈 open marketplace page
          >
            View All {activeService.toLowerCase()} Properties
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
