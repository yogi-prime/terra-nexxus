import { useEffect, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroBg from "@/assets/indexbg.png";

interface Location {
  country?: string;
  state?: string;
  city?: string;
  locality?: string;
  address?: string;
  pincode?: string;
  lat?: number;
  lng?: number;
  map?: string;
}

interface Price {
  min?: number;
  max?: number;
  actual?: number;
  per_sqft?: number;
  negotiable?: boolean;
  expected_rent?: number;
  security_deposit?: number;
  maintenance_monthly?: number;
  maintenance_type?: string;
  mortgage_amount?: number;
  interest_rate?: number;
  mortgage_tenure_months?: number;
  lease_duration_months?: number;
}

interface Property {
  id: string | number;
  title: string;
  location: Location | string;
  price: Price | string | number;
  image?: string;
}

// -------- Helpers --------
const extractProperties = (data: any): Property[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.properties)) return data.properties;
  if (Array.isArray(data.data)) return data.data;
  if (typeof data === "object") return [data];
  return [];
};

const renderLocation = (loc: Location | string) => {
  if (!loc) return "Unknown location";
  if (typeof loc === "string") return loc;
  return [loc.locality, loc.city, loc.state].filter(Boolean).join(", ");
};

const renderPrice = (price: Price | string | number) => {
  if (!price) return "N/A";
  if (typeof price === "string" || typeof price === "number") return `₹${price}`;
  if (typeof price === "object") {
    if ("actual" in price && price.actual != null) return `₹${price.actual}`;
    if ("min" in price && "max" in price && price.min != null && price.max != null)
      return `₹${price.min} - ₹${price.max}`;
  }
  return "N/A";
};

const fallbackImage = "https://via.placeholder.com/400x300?text=No+Image";

export const HeroSearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(true);

  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(false);

  const API_BASE = "https://app.terranexxus.com/api/v1";

  // Fetch cities
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingCities(true);
      try {
        const res = await fetch(`${API_BASE}/properties/filters`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const raw = data?.cities_by_state;
        const cityList = Array.isArray(raw)
          ? (raw as string[])
          : (Object.values(raw || {}).flat().filter(Boolean) as string[]);
        if (mounted) setCities(cityList);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
        if (mounted)
          setCities([
            "Bandra West",
            "Gurgaon Sector 49",
            "Whitefield",
            "Koramangala",
            "Andheri East",
            "Powai",
          ]);
      } finally {
        if (mounted) setLoadingCities(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch properties
  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (selectedCity) params.set("city", selectedCity);
    if (searchQuery) params.set("q", searchQuery);

    setLoadingProperties(true);
    try {
      const url =
        params.toString().length > 0
          ? `${API_BASE}/properties?${params.toString()}`
          : `${API_BASE}/properties`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const propertyArray = extractProperties(json);
      setProperties(propertyArray);
    } catch (err: any) {
      console.error("Failed to fetch properties:", err?.message || err);
      setProperties([]);
    } finally {
      setLoadingProperties(false);
    }
  };

  return (
    <section
      className="relative isolate pt-20 pb-32 overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Terranexxus hero search"
    >
      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0E1A1A]/90 via-[#0E1A1A]/65 to-[#DFF3E4]/20 dark:from-black/85 dark:via-black/60 dark:to-emerald-900/20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,transparent_0%,transparent_50%,rgba(0,0,0,0.35)_100%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            Find Your Perfect Property
            <span className="block bg-gradient-to-r from-emerald-400 to-lime-300 bg-clip-text text-transparent">
              with Terranexxus
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            Buy, Rent, Lease, or Mortgage—All in One Marketplace
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl border border-white/10 bg-white/90 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* City Select */}
              <div className="flex-1">
                <Select
                  value={selectedCity}
                  onValueChange={setSelectedCity}
                  disabled={loadingCities || cities.length === 0}
                >
                  <SelectTrigger className="h-14 bg-white border-white/30">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-slate-500" />
                      <SelectValue
                        placeholder={
                          loadingCities ? "Loading cities..." : "Select City"
                        }
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* General Search */}
              <div className="flex-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  placeholder="Search by property name, type, price, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 bg-white border-white/30 text-base"
                />
              </div>

              {/* Search Button */}
              <Button
                size="lg"
                className="h-14 px-8 shadow-lg shadow-emerald-500/25
                           bg-gradient-to-r from-emerald-500 to-lime-400
                           hover:from-emerald-600 hover:to-lime-500 text-white"
                onClick={handleSearch}
              >
                <Search className="h-5 w-5 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>
        </div>

        {/* Popular Localities */}
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold text-white mb-4">
            Popular Localities
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.slice(0, 6).map((locality) => (
              <button
                key={locality}
                className="px-4 py-2 rounded-full text-sm font-medium
                           bg-white/15 text-white border border-white/20
                           hover:bg-white/25 transition-colors"
                onClick={() => {
                  setSearchQuery(locality);
                  handleSearch();
                }}
              >
                {locality}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        <div className="max-w-6xl mx-auto">
          {loadingProperties ? (
            <p className="text-white text-center">Loading properties...</p>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={(property as any).image || fallbackImage}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <h4 className="font-semibold">{property.title}</h4>
                  <p className="text-sm text-gray-600">{renderLocation(property.location)}</p>
                  <p className="font-bold text-emerald-600">{renderPrice(property.price)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-center">No properties found.</p>
          )}
        </div>
      </div>
    </section>
  );
};
