import { useEffect, useState } from "react";
import { Heart, MapPin, Phone, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type BackendProperty = any;

interface Property {
  id: string;
  title: string;
  builder_name: string;
  location: { city: string; locality?: string };
  price: string;
  originalPrice?: string | null;
  bhk: string;
  area: string;
  verified: boolean;
  rating: number;
  offer?: string | null;
  image?: string;
}

const API_BASE = "https://app.terranexxus.com/api/v1";
const FALLBACK_IMG = "https://via.placeholder.com/640x400?text=No+Image";

function mapToProperty(p: BackendProperty): Property {
  const priceMin = Number(p?.price?.min ?? p?.price_min ?? 0);
  const priceMax = Number(p?.price?.max ?? p?.price_max ?? 0);
  const actual = p?.price?.actual ?? p?.price_actual ?? null;
  const bedrooms = p?.layout?.bedrooms ?? p?.bedrooms;

  const priceStr =
    priceMin && priceMax
      ? `₹${priceMin.toLocaleString()} - ₹${priceMax.toLocaleString()}`
      : priceMin
      ? `₹${priceMin.toLocaleString()}`
      : priceMax
      ? `₹${priceMax.toLocaleString()}`
      : "Price on request";

  return {
    id: String(p?.id ?? crypto.randomUUID()),
    title: p?.project_name || p?.title || "Untitled Project",
    builder_name: p?.builder_name || "Unknown Builder",
    location: {
      city: p?.location?.city || "",
      locality: p?.location?.locality || "",
    },
    price: priceStr,
    originalPrice: actual ? `₹${Number(actual).toLocaleString()}` : null,
    bhk: bedrooms ? `${bedrooms} BHK` : "Studio",
    area: p?.layout?.size_text || p?.size_sqft_text || "N/A",
    verified: !!(p?.legal?.noc_available ?? p?.noc_available ?? false),
    rating: Number(p?.rating ?? 0),
    offer: p?.offer ?? null,
    image: p?.media?.main_image || FALLBACK_IMG,
  };
}

export const PropertyRecommendations = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());
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
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/properties?service=new&per_page=12`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();

        const list: BackendProperty[] =
          (Array.isArray(payload) && payload) ||
          (Array.isArray(payload?.data) && payload.data) ||
          [];

        const mapped = list.map(mapToProperty);
        if (mounted) setProperties(mapped);
      } catch (err) {
        console.error("Error fetching properties:", err);
        if (mounted) setError("Failed to load properties.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <p className="text-center py-16">Loading properties...</p>;
  if (error) return <p className="text-center py-16 text-red-500">{error}</p>;

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
            <Card
              key={property.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={property.image || FALLBACK_IMG}
                  alt={property.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                  }}
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
                    <Shield className="h-3 w-3" /> Verified
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

                <p className="text-sm text-muted-foreground mb-2">
                  {property.builder_name}
                </p>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">
                    {property.location.locality || property.location.city || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">
                        {property.price}
                      </span>
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
