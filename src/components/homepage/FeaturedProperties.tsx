// import { useState, useEffect } from "react";
// import { Heart, MapPin, Phone, Shield, Star, Eye } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";

// type ApiProperty = {
//   id: string;
//   title: string;
//   builder_name?: string;
//   media?: { main_image?: string };
//   service?: string; // "new" | "resale" | "rent" | ...
//   views?: number;
//   rating?: number;
//   layout?: { bedrooms?: number; size_text?: string };
//   location?: { locality?: string; city?: string };
//   price?: { actual?: number };
//   highlights?: string[];
//   extra?: { is_featured?: boolean };
// };

// const SERVICE_BADGE = (serviceType?: string) => {
//   switch ((serviceType || "").toLowerCase()) {
//     case "buy": return "bg-green-500 text-white";
//     case "rent": return "bg-blue-500 text-white";
//     case "lease": return "bg-orange-500 text-white";
//     case "mortgage": return "bg-purple-500 text-white";
//     case "new": return "bg-teal-500 text-white";
//     case "resale": return "bg-indigo-500 text-white";
//     default: return "bg-gray-500 text-white";
//   }
// };

// export const FeaturedProperties = () => {
//   const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());
//   const [properties, setProperties] = useState<ApiProperty[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const toggleLike = (propertyId: string) => {
//     setLikedProperties((prev) => {
//       const next = new Set(prev);
//       next.has(propertyId) ? next.delete(propertyId) : next.add(propertyId);
//       return next;
//     });
//   };

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const url = `https://app.terranexxus.com/api/v1/properties?per_page=10&sort=-created_at&status=active`;
//         const res = await fetch(url);
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const json = await res.json();

//         const list: ApiProperty[] = (json?.data ?? json?.properties ?? []);
//         const filtered = list.filter(
//           (p) => p?.extra?.is_featured || (p?.service || "").toLowerCase() === "new"
//         );

//         setProperties(filtered);
//       } catch (err: any) {
//         console.error("Error fetching properties:", err);
//         setError("Failed to load featured properties");
//         setProperties([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   if (loading) return <p className="text-center py-10">Loading properties...</p>;
//   if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
//   if (!properties.length) return <p className="text-center py-10">No featured properties available.</p>;

//   return (
//     <section className="py-16 bg-background">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//             Featured Premium Properties
//           </h2>
//           <p className="text-lg text-muted-foreground">
//             Handpicked luxury properties from India&apos;s top developers
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {properties.map((property) => (
//             <Card key={property.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
//               <div className="relative overflow-hidden">
//                 <img
//                   src={property.media?.main_image || ""}
//                   alt={property.title}
//                   className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//                 <button
//                   onClick={() => toggleLike(property.id)}
//                   className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
//                 >
//                   <Heart
//                     className={`h-5 w-5 ${
//                       likedProperties.has(property.id)
//                         ? "fill-red-500 text-red-500"
//                         : "text-gray-600"
//                     }`}
//                   />
//                 </button>

//                 <Badge className={`absolute top-4 left-4 ${SERVICE_BADGE(property.service)} font-semibold`}>
//                   {(property.service || "").toUpperCase()}
//                 </Badge>

//                 <div className="absolute bottom-4 left-4 right-4">
//                   <div className="flex items-center gap-2 text-white mb-2">
//                     <Eye className="h-4 w-4" />
//                     <span className="text-sm">{property.views ?? 0}</span>
//                   </div>
//                 </div>
//               </div>

//               <CardContent className="p-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="flex items-center gap-1">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-sm font-medium">{property.rating ?? 0}</span>
//                   </div>
//                   <Badge variant="outline" className="text-xs">
//                     {property.layout?.bedrooms ? `${property.layout.bedrooms} BHK` : "N/A"}
//                   </Badge>
//                   <div className="flex items-center gap-1 bg-success/20 text-success px-2 py-1 rounded-full text-xs">
//                     <Shield className="h-3 w-3" />
//                     Premium Verified
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-bold text-foreground mb-2">{property.title}</h3>
//                 <p className="text-sm text-primary font-medium mb-3">{property.builder_name || "—"}</p>

//                 <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
//                   <MapPin className="h-4 w-4" />
//                   <span>
//                     {property.location?.locality || "—"},{" "}
//                     {property.location?.city || "—"}
//                   </span>
//                 </div>

//                 <div className="mb-4">
//                   <span className="text-2xl font-bold text-foreground">
//                     {property.price?.actual
//                       ? `₹${Number(property.price.actual).toLocaleString("en-IN")}`
//                       : "Price on request"}
//                   </span>
//                   <p className="text-sm text-muted-foreground">{property.layout?.size_text || ""}</p>
//                 </div>

//                 {!!property.highlights?.length && (
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {property.highlights.map((h, i) => (
//                       <Badge key={i} variant="outline" className="text-xs">
//                         {h}
//                       </Badge>
//                     ))}
//                   </div>
//                 )}

//                 <div className="flex gap-2">
//                   <Button size="sm" className="flex-1">
//                     <Phone className="h-4 w-4 mr-2" />
//                     Contact
//                   </Button>
//                   <Button size="sm" variant="outline" className="flex-1">
//                     View Details
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Button variant="outline" size="lg" className="px-8">
//             Explore All Premium Properties
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };
// import { useState, useEffect } from "react";
// import { Heart, MapPin, Phone, Shield, Star, Eye } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";

// type ApiProperty = {
//   id: string;
//   title: string;
//   builder_name?: string;
//   media?: { main_image?: string };
//   service?: string;
//   views?: number;
//   rating?: number;
//   layout?: { bedrooms?: number; size_text?: string };
//   location?: { locality?: string; city?: string };
//   price?: { actual?: number };
//   highlights?: string[];
//   extra?: { is_featured?: boolean };
// };

// const SERVICE_BADGE = (serviceType?: string) => {
//   switch ((serviceType || "").toLowerCase()) {
//     case "buy": return "bg-green-500 text-white";
//     case "rent": return "bg-blue-500 text-white";
//     case "lease": return "bg-orange-500 text-white";
//     case "mortgage": return "bg-purple-500 text-white";
//     case "new": return "bg-teal-500 text-white";
//     case "resale": return "bg-indigo-500 text-white";
//     default: return "bg-gray-500 text-white";
//   }
// };

// const FALLBACK_IMG = "https://via.placeholder.com/800x500?text=Property";

// export const FeaturedProperties = () => {
//   const nav = useNavigate();

//   const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());
//   const [properties, setProperties] = useState<ApiProperty[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const toggleLike = (propertyId: string) => {
//     setLikedProperties((prev) => {
//       const next = new Set(prev);
//       next.has(propertyId) ? next.delete(propertyId) : next.add(propertyId);
//       return next;
//     });
//   };

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const url = `https://app.terranexxus.com/api/v1/properties?per_page=10&sort=-created_at&status=active`;
//         const res = await fetch(url);
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const json = await res.json();

//         const list: ApiProperty[] = (json?.data ?? json?.properties ?? []);
//         const filtered = list.filter(
//           (p) => p?.extra?.is_featured || (p?.service || "").toLowerCase() === "new"
//         );

//         setProperties(filtered);
//       } catch (err: any) {
//         console.error("Error fetching properties:", err);
//         setError("Failed to load featured properties");
//         setProperties([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const gotoDetails = (id: string) => nav(`/property-show/${id}`);
//   const gotoMarketplace = () => nav("/marketplace");

//   if (loading) return <p className="text-center py-10">Loading properties...</p>;
//   if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
//   if (!properties.length) return <p className="text-center py-10">No featured properties available.</p>;

//   return (
//     <section className="py-16 bg-background">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//             Featured Premium Properties
//           </h2>
//           <p className="text-lg text-muted-foreground">
//             Handpicked luxury properties from India&apos;s top developers
//           </p>
//         </div>

//         {/* Show only 3 cards */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {properties.slice(0, 3).map((property) => (
//             <Card
//               key={property.id}
//               className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500"
//             >
//               {/* Click on image area to open details */}
//               <div
//                 className="relative overflow-hidden cursor-pointer"
//                 onClick={() => gotoDetails(property.id)}
//               >
//                 <img
//                   src={property.media?.main_image || FALLBACK_IMG}
//                   alt={property.title}
//                   className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
//                   onError={(e) => {
//                     (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleLike(property.id);
//                   }}
//                   className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
//                 >
//                   <Heart
//                     className={`h-5 w-5 ${
//                       likedProperties.has(property.id)
//                         ? "fill-red-500 text-red-500"
//                         : "text-gray-600"
//                     }`}
//                   />
//                 </button>

//                 <Badge className={`absolute top-4 left-4 ${SERVICE_BADGE(property.service)} font-semibold`}>
//                   {(property.service || "").toUpperCase()}
//                 </Badge>

//                 <div className="absolute bottom-4 left-4 right-4">
//                   <div className="flex items-center gap-2 text-white mb-2">
//                     <Eye className="h-4 w-4" />
//                     <span className="text-sm">{property.views ?? 0}</span>
//                   </div>
//                 </div>
//               </div>

//               <CardContent className="p-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div className="flex items-center gap-1">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="text-sm font-medium">{property.rating ?? 0}</span>
//                   </div>
//                   <Badge variant="outline" className="text-xs">
//                     {property.layout?.bedrooms ? `${property.layout.bedrooms} BHK` : "N/A"}
//                   </Badge>
//                   <div className="flex items-center gap-1 bg-success/20 text-success px-2 py-1 rounded-full text-xs">
//                     <Shield className="h-3 w-3" />
//                     Premium Verified
//                   </div>
//                 </div>

//                 <h3 className="text-xl font-bold text-foreground mb-2">{property.title}</h3>
//                 <p className="text-sm text-primary font-medium mb-3">{property.builder_name || "—"}</p>

//                 <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
//                   <MapPin className="h-4 w-4" />
//                   <span>
//                     {property.location?.locality || "—"},{" "}
//                     {property.location?.city || "—"}
//                   </span>
//                 </div>

//                 <div className="mb-4">
//                   <span className="text-2xl font-bold text-foreground">
//                     {property.price?.actual
//                       ? `₹${Number(property.price.actual).toLocaleString("en-IN")}`
//                       : "Price on request"}
//                   </span>
//                   <p className="text-sm text-muted-foreground">{property.layout?.size_text || ""}</p>
//                 </div>

//                 {!!property.highlights?.length && (
//                   <div className="flex flex-wrap gap-2 mb-4">
//                     {property.highlights.map((h, i) => (
//                       <Badge key={i} variant="outline" className="text-xs">
//                         {h}
//                       </Badge>
//                     ))}
//                   </div>
//                 )}

//                 <div className="flex gap-2">
//                   <Button size="sm" className="flex-1">
//                     <Phone className="h-4 w-4 mr-2" />
//                     Contact
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="flex-1"
//                     onClick={() => gotoDetails(property.id)}
//                   >
//                     View Details
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <Button variant="outline" size="lg" className="px-8" onClick={gotoMarketplace}>
//             Explore All Premium Properties
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };
import { useState, useEffect } from "react";
import { Heart, MapPin, Phone, Shield, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type ApiProperty = {
  id: string;
  title: string;
  builder_name?: string;
  media?: { main_image?: string };
  service?: string;
  views?: number;
  rating?: number;
  layout?: { bedrooms?: number; size_text?: string };
  location?: { locality?: string; city?: string };
  price?: { actual?: number; min?: number; max?: number };
  highlights?: string[];
  extra?: { is_featured?: boolean };
};

const SERVICE_BADGE = (serviceType?: string) => {
  switch ((serviceType || "").toLowerCase()) {
    case "buy": return "bg-green-500 text-white";
    case "rent": return "bg-blue-500 text-white";
    case "lease": return "bg-orange-500 text-white";
    case "mortgage": return "bg-purple-500 text-white";
    case "new": return "bg-teal-500 text-white";
    case "resale": return "bg-indigo-500 text-white";
    default: return "bg-gray-500 text-white";
  }
};

const FALLBACK_IMG = "https://via.placeholder.com/800x500?text=Property";

/* INR compact formatter: 99,999 -> ₹99,999 ; 1,50,000 -> ₹1.5 L ; 1,20,00,000 -> ₹1.2 Cr */
function formatINRCompact(n?: number): string {
  if (!n || !isFinite(n) || n <= 0) return "₹—";
  if (n >= 1e7) {
    const v = n / 1e7;
    return `₹${v % 1 === 0 ? v.toFixed(0) : v.toFixed(2)} Cr`;
  }
  if (n >= 1e5) {
    const v = n / 1e5;
    return `₹${v % 1 === 0 ? v.toFixed(0) : v.toFixed(2)} L`;
  }
  return `₹${n.toLocaleString("en-IN")}`;
}

export const FeaturedProperties = () => {
  const nav = useNavigate();

  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());
  const [properties, setProperties] = useState<ApiProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleLike = (propertyId: string) => {
    setLikedProperties((prev) => {
      const next = new Set(prev);
      next.has(propertyId) ? next.delete(propertyId) : next.add(propertyId);
      return next;
    });
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `https://app.terranexxus.com/api/v1/properties?per_page=10&sort=-created_at&status=active`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const list: ApiProperty[] = (json?.data ?? json?.properties ?? []);
        const filtered = list.filter(
          (p) => p?.extra?.is_featured || (p?.service || "").toLowerCase() === "new"
        );

        setProperties(filtered);
      } catch (err: any) {
        console.error("Error fetching properties:", err);
        setError("Failed to load featured properties");
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const gotoDetails = (id: string) => nav(`/property-show/${id}`);
  const gotoMarketplace = () => nav("/marketplace");

  if (loading) return <p className="text-center py-10">Loading properties...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!properties.length) return <p className="text-center py-10">No featured properties available.</p>;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Premium Properties
          </h2>
          <p className="text-lg text-muted-foreground">
            Handpicked luxury properties from India&apos;s top developers
          </p>
        </div>

        {/* Show only 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {properties.slice(0, 3).map((property) => (
            <Card
              key={property.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Clickable image -> details */}
              <div
                className="relative overflow-hidden cursor-pointer"
                onClick={() => gotoDetails(property.id)}
              >
                <img
                  src={property.media?.main_image || FALLBACK_IMG}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(property.id);
                  }}
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

                <Badge className={`absolute top-4 left-4 ${SERVICE_BADGE(property.service)} font-semibold`}>
                  {(property.service || "").toUpperCase()}
                </Badge>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{property.views ?? 0}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{property.rating ?? 5}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {property.layout?.bedrooms ? `${property.layout.bedrooms} BHK` : "N/A"}
                  </Badge>
                  <div className="flex items-center gap-1 bg-success/20 text-success px-2 py-1 rounded-full text-xs">
                    <Shield className="h-3 w-3" />
                    Premium Verified
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{property.title}</h3>
                <p className="text-sm text-primary font-medium mb-3">{property.builder_name || "—"}</p>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {property.location?.locality || "—"},{" "}
                    {property.location?.city || "—"}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    {property.price?.actual
                      ? formatINRCompact(Number(property.price.actual))
                      : (property.price?.min || property.price?.max)
                      ? `${formatINRCompact(Number(property.price?.min))} - ${formatINRCompact(Number(property.price?.max))}`
                      : "Price on request"}
                  </span>
                  <p className="text-sm text-muted-foreground">{property.layout?.size_text || ""}</p>
                </div>

                {!!property.highlights?.length && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.highlights.map((h, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {h}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => gotoDetails(property.id)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8" onClick={gotoMarketplace}>
            Explore All Premium Properties
          </Button>
        </div>
      </div>
    </section>
  );
};
