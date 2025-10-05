// import { useEffect, useState } from "react";
// import { ArrowRight, MapPin, Calendar, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import heroBackground from "@/assets/featuredbg.jpeg";
// import { Badge } from "@/components/ui/badge";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// type BackendProperty = any;

// type Project = {
//   id: string;
//   project_name: string;
//   builder_name: string;
//   location: { city: string; locality?: string };
//   price: { min: number; max: number };
//   completionDate: string;
//   rating: number;
//   amenities: string[];
//   status: string;
//   offer?: string | null;
//   media: { main_image?: string | null };
// };

// const API_BASE = "https://app.terranexxus.com/api/v1";
// const FALLBACK_IMG = "https://via.placeholder.com/800x480?text=No+Image";

// function normalizeProject(p: BackendProperty): Project {
//   return {
//     id: String(p?.id ?? crypto.randomUUID()),
//     project_name: p?.project_name || p?.title || "Untitled Project",
//     builder_name: p?.builder_name || "Unknown Builder",
//     location: {
//       city: p?.location?.city || "",
//       locality: p?.location?.locality || "",
//     },
//     price: {
//       min: Number(p?.price?.min ?? p?.price_min ?? 0),
//       max: Number(p?.price?.max ?? p?.price_max ?? 0),
//     },
//     completionDate: p?.completionDate || p?.available_from || p?.handover_date || "TBD",
//     rating: Number(p?.rating ?? 0),
//     amenities: Array.isArray(p?.amenities) ? p.amenities : [],
//     status: p?.status || "Unknown",
//     offer: p?.offer ?? null,
//     media: { main_image: p?.media?.main_image || null },
//   };
// }

// export const FeaturedProjects = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await fetch(`${API_BASE}/properties?service=new&per_page=10`);
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         const payload = await res.json();

//         const list: BackendProperty[] =
//           (Array.isArray(payload) && payload) ||
//           (Array.isArray(payload?.data) && payload.data) ||
//           [];

//         const mapped = list.map(normalizeProject);
//         if (mounted) setProjects(mapped);
//       } catch (err) {
//         console.error("Error fetching properties:", err);
//         if (mounted) setError("Failed to load properties.");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

//   return (
//     <section className="relative py-16 bg-card-premium">
//       {/* Hero Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
//         style={{ backgroundImage: `url(${heroBackground})` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-card-premium/95 via-card-premium/85 to-transparent" />
//         <div className="absolute inset-0 gradient-hero opacity-20" />
//       </div>

//       <div className="container relative z-10 mx-auto px-4">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-card-premium-foreground mb-4">
//             New Launches
//           </h2>
//           <p className="text-lg text-muted-dark-foreground max-w-2xl mx-auto">
//             Discover premium projects from India's most trusted developers
//           </p>
//         </div>

//         {/* Loading / Error / No Data */}
//         {loading && <p className="text-center">Loading properties...</p>}
//         {error && <p className="text-center text-red-500">{error}</p>}
//         {!loading && projects.length === 0 && !error && (
//           <p className="text-center">No new launches available.</p>
//         )}

//         {/* Carousel */}
//         {!loading && projects.length > 0 && (
//           <Carousel className="w-full">
//             <CarouselContent className="-ml-2 md:-ml-4">
//               {projects.map((project) => (
//                 <CarouselItem
//                   key={project.id}
//                   className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
//                 >
//                   <Card className="group overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition-all duration-300">
//                     <div className="relative">
//                       <img
//                         src={project.media?.main_image || FALLBACK_IMG}
//                         alt={project.project_name}
//                         className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                         onError={(e) => {
//                           (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
//                         }}
//                       />

//                       <div className="absolute top-3 left-3 flex flex-col gap-2">
//                         <Badge
//                           className={`${
//                             project.status === "Ready to Move"
//                               ? "bg-success text-success-foreground"
//                               : project.status === "Launching Soon"
//                               ? "bg-accent text-accent-foreground"
//                               : "bg-primary text-primary-foreground"
//                           }`}
//                         >
//                           {project.status}
//                         </Badge>
//                         {project.offer && (
//                           <Badge variant="destructive" className="text-xs">
//                             {project.offer}
//                           </Badge>
//                         )}
//                       </div>

//                       <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
//                         <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                         {project.rating || 0}
//                       </div>
//                     </div>

//                     <CardContent className="p-5">
//                       <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
//                         {project.project_name}
//                       </h3>

//                       <p className="text-sm font-medium text-accent mb-2">
//                         by {project.builder_name}
//                       </p>

//                       <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
//                         <MapPin className="h-4 w-4" />
//                         <span>{project.location.locality || project.location.city || "—"}</span>
//                       </div>

//                       <div className="flex items-center justify-between mb-4">
//                         <div>
//                           <div className="text-lg font-bold text-foreground">
//                             ₹{project.price.min.toLocaleString()} - ₹{project.price.max.toLocaleString()}
//                           </div>
//                           <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                             <Calendar className="h-3 w-3" />
//                             <span>{project.completionDate}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {!!project.amenities.length && (
//                         <div className="mb-4">
//                           <div className="flex flex-wrap gap-1">
//                             {project.amenities.slice(0, 2).map((amenity, index) => (
//                               <Badge key={index} variant="outline" className="text-xs">
//                                 {amenity}
//                               </Badge>
//                             ))}
//                             {project.amenities.length > 2 && (
//                               <Badge variant="outline" className="text-xs">
//                                 +{project.amenities.length - 2} more
//                               </Badge>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
//                         View Details
//                         <ArrowRight className="h-4 w-4 ml-2" />
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>
//             <CarouselPrevious className="hidden md:flex" />
//             <CarouselNext className="hidden md:flex" />
//           </Carousel>
//         )}

//         {/* Explore All */}
//         <div className="text-center mt-12">
//           <Button
//             variant="outline"
//             size="lg"
//             className="text-card-premium-black border-card-premium-foreground hover:bg-card-premium-foreground hover:text-card-premium"
//           >
//             Explore All Projects
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroBackground from "@/assets/featuredbg.jpeg";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom"; // ✅

type BackendProperty = any;

type Project = {
  id: string;
  project_name: string;
  builder_name: string;
  location: { city: string; locality?: string };
  price: { min: number; max: number };
  completionDate: string;
  rating: number;
  amenities: string[];
  status: string;
  offer?: string | null;
  media: { main_image?: string | null };
};

const API_BASE = "https://app.terranexxus.com/api/v1";
const FALLBACK_IMG = "https://via.placeholder.com/800x480?text=No+Image";

function normalizeProject(p: BackendProperty): Project {
  return {
    id: String(p?.id ?? crypto.randomUUID()),
    project_name: p?.project_name || p?.title || "Untitled Project",
    builder_name: p?.builder_name || "Unknown Builder",
    location: {
      city: p?.location?.city || "",
      locality: p?.location?.locality || "",
    },
    price: {
      min: Number(p?.price?.min ?? p?.price_min ?? 0),
      max: Number(p?.price?.max ?? p?.price_max ?? 0),
    },
    completionDate: p?.completionDate || p?.available_from || p?.handover_date || "TBD",
    rating: Number(p?.rating ?? 0),
    amenities: Array.isArray(p?.amenities) ? p.amenities : [],
    status: p?.status || "Unknown",
    offer: p?.offer ?? null,
    media: { main_image: p?.media?.main_image || null },
  };
}

export const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/properties?service=new&per_page=10`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();

        const list: BackendProperty[] =
          (Array.isArray(payload) && payload) ||
          (Array.isArray(payload?.data) && payload.data) ||
          [];

        const mapped = list.map(normalizeProject);
        if (mounted) setProjects(mapped);
      } catch (err) {
        console.error("Error fetching properties:", err);
        if (mounted) setError("Failed to load properties.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative py-16 bg-card-premium">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-card-premium/95 via-card-premium/85 to-transparent" />
        <div className="absolute inset-0 gradient-hero opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-card-premium-foreground mb-4">
            New Launches
          </h2>
          <p className="text-lg text-muted-dark-foreground max-w-2xl mx-auto">
            Discover premium projects from India's most trusted developers
          </p>
        </div>

        {/* Loading / Error / No Data */}
        {loading && <p className="text-center">Loading properties...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && projects.length === 0 && !error && (
          <p className="text-center">No new launches available.</p>
        )}

        {/* Carousel */}
        {!loading && projects.length > 0 && (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="group overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={project.media?.main_image || FALLBACK_IMG}
                        alt={project.project_name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                        }}
                      />

                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge
                          className={`${
                            project.status === "Ready to Move"
                              ? "bg-success text-success-foreground"
                              : project.status === "Launching Soon"
                              ? "bg-accent text-accent-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
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
                        {project.rating || 0}
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {project.project_name}
                      </h3>

                      <p className="text-sm font-medium text-accent mb-2">
                        by {project.builder_name}
                      </p>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location.locality || project.location.city || "—"}</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-lg font-bold text-foreground">
                            ₹{project.price.min.toLocaleString()} - ₹{project.price.max.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{project.completionDate}</span>
                          </div>
                        </div>
                      </div>

                      {!!project.amenities.length && (
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
                      )}

                      {/* ✅ View Details -> /property-show/:id */}
                      <Button
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={() => navigate(`/property-show/${project.id}`)}
                      >
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
        )}

        {/* Explore All */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="text-card-premium-black border-card-premium-foreground hover:bg-card-premium-foreground hover:text-card-premium"
            onClick={() => navigate("/marketplace")} // ✅
          >
            Explore All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};
