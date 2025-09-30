import React, { useEffect, useMemo, useState } from "react";
import {
  MapPin, TrendingUp, Building2, Target, Users, Search,
  Grid3X3, List, SlidersHorizontal, Shield, BookmarkPlus,
  BookmarkCheck, X, ArrowRight, Bath, BedDouble, Ruler
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell
} from "recharts";
import API from "@/api/api";
import { useNavigate } from "react-router-dom";

/* ----------------------------- types ----------------------------- */
type Service = "rent"|"lease"|"mortgage"|"resale"|"new"|string|null;

type UiProperty = {
  id: number|string;
  title: string;
  subtitle?: string;
  service: Service;
  propertyType?: string|null;
  locationText: string;
  city?: string|null;
  state?: string|null;
  locality?: string|null;
  mainImage?: string|null;
  gallery?: string[]|null;
  priceActual?: number|null;
  priceMin?: number|null;
  priceMax?: number|null;
  pricePerSqft?: number|null;
  sizeText?: string|null;
  bedrooms?: number|null;
  bathrooms?: number|null;
  furnishing?: string|null;
  amenities?: string[]|null;
  status?: string|null;
  availableFrom?: string|null;
  createdAt?: string;
};

type Filters = {
  service: Service|"";
  propertyType: string|"";
  state: string|"";
  city: string|"";
  priceRange: [number, number];
  minBedrooms: number;
  maxBedrooms: number;
  hasLoan: boolean;
  hasNoc: boolean;
};

type FilterOptions = {
  states: string[];
  citiesByState: Record<string,string[]>;
};

/* ----------------------------- utils ----------------------------- */
const formatCurrency = (value?: number|null) => {
  if (value == null) return "—";
  if (value >= 1e7) return `₹${(value / 1e7).toFixed(1)} Cr`;
  if (value >= 1e5) return `₹${(value / 1e5).toFixed(1)} L`;
  return `₹${value.toLocaleString()}`;
};
const brandGradient = "linear-gradient(90deg,#22c55e 0%,#84cc16 50%,#facc15 100%)";
const PLACEHOLDER_IMG = "/images/placeholder/property.jpg";

/** Normalize resource/flat payload */
function normalizeProperty(raw: any): UiProperty {
  const isRes = !!raw?.location || !!raw?.price || !!raw?.media;
  const id = raw?.id;

  const city   = isRes ? raw.location?.city : raw?.city;
  const state  = isRes ? raw.location?.state : raw?.state;
  const locTxt = [city, state].filter(Boolean).join(", ") || raw?.locality || "—";

  const title = raw?.title || raw?.project_name || "Untitled";
  const subtitle = [raw?.project_name, raw?.builder_name].filter(Boolean).join(" • ") || raw?.builder_name || "";

  const mediaMain = isRes ? raw.media?.main_image : (raw?.primary_image_url ?? raw?.main_image_path);
  const gallery   = isRes ? raw.media?.gallery : raw?.gallery_paths;

  return {
    id,
    title,
    subtitle,
    service: raw?.service ?? null,
    propertyType: isRes ? raw?.property_type ?? raw?.propertyType : raw?.property_type,
    locationText: locTxt,
    city, state,
    locality: isRes ? raw.location?.locality : raw?.locality,

    mainImage: mediaMain || null,
    gallery: Array.isArray(gallery) ? gallery : null,

    priceActual: isRes ? raw.price?.actual : raw?.price_actual,
    priceMin: isRes ? raw.price?.min : raw?.price_min,
    priceMax: isRes ? raw.price?.max : raw?.price_max,
    pricePerSqft: isRes ? raw.price?.per_sqft : raw?.price_per_sqft,

    sizeText: isRes ? raw.layout?.size_text : raw?.size_sqft_text,
    bedrooms: isRes ? raw.layout?.bedrooms : raw?.bedrooms,
    bathrooms: isRes ? raw.layout?.bathrooms : raw?.bathrooms,
    furnishing: isRes ? raw.layout?.furnishing : raw?.furnishing,
    amenities: (isRes ? raw?.amenities : raw?.amenities) ?? null,

    status: raw?.status ?? null,
    availableFrom: isRes ? raw?.available_from : raw?.available_from,

    createdAt: raw?.created_at,
  };
}

/* ----------------------------- page ----------------------------- */
export default function Marketplace() {
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<UiProperty[]>([]);
  const [error, setError] = useState<string>("");

  const [opts, setOpts] = useState<FilterOptions>({ states: [], citiesByState: {} });

  // view & sort
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");

  // filters mapped to DB fields
  const [filters, setFilters] = useState<Filters>({
    service: "",
    propertyType: "",
    state: "",
    city: "",
    priceRange: [0, 5_00_00_000],
    minBedrooms: 0,
    maxBedrooms: 20,
    hasLoan: false,
    hasNoc: false,
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const openMobileFilter = () => setFilterOpen(true);

  // Load filter options once
  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/v1/properties/filters");
        setOpts({
          states: res.data?.states ?? [],
          citiesByState: res.data?.cities_by_state ?? {},
        });
      } catch {
        // silent; filters will still work as free text if API fails
      }
    })();
  }, []);

  /** Build server-side query params */
  const buildParams = () => {
    const p: Record<string, any> = {
      q: search || undefined,
      service: filters.service || undefined,
      property_type: filters.propertyType || undefined,
      state: filters.state || undefined,
      city: filters.city || undefined,
      price_min: filters.priceRange[0] || undefined,
      price_max: filters.priceRange[1] || undefined,
      min_bedrooms: filters.minBedrooms || undefined,
      max_bedrooms: Math.max(filters.maxBedrooms, filters.minBedrooms) || undefined,
      sort: mapSort(sortBy),
      per_page: 24,
    };
    return p;
  };

  const mapSort = (val: string) => {
    switch (val) {
      case "price-low": return "price";
      case "price-high": return "-price";
      case "oldest": return "created_at";
      case "newest":
      default: return "-created_at";
    }
  };

  // Fetch data whenever filters/search/sort change
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get("/v1/properties", { params: buildParams() });
        const payload = res.data;
        const arr = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
        const normalized = arr.map(normalizeProperty);
        if (alive) setItems(normalized);
      } catch (e: any) {
        let msg = "Something went wrong. Please adjust filters.";
        if (e?.response?.status === 422) {
          const errs = e.response?.data?.errors;
          if (errs) {
            const firstField = Object.keys(errs)[0];
            if (firstField && Array.isArray(errs[firstField]) && errs[firstField][0]) {
              msg = errs[firstField][0];
            }
          } else {
            msg = "Invalid filters. Please adjust and try again.";
          }
        } else if (e?.message) {
          msg = e.message;
        }
        if (alive) setError(msg);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [
    search, filters.service, filters.propertyType, filters.state, filters.city,
    filters.priceRange[0], filters.priceRange[1], filters.minBedrooms, filters.maxBedrooms, sortBy
  ]);

  /* ---------------- derived & client-side fallbacks ---------------- */
  const filtered = useMemo(() => {
    let list = items.slice();

    if (filters.hasLoan) list = list.filter((p: any) => p?.loan_available ?? true);
    if (filters.hasNoc)  list = list.filter((p: any) => p?.noc_available ?? true);

    // local search fallback
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.subtitle ?? "").toLowerCase().includes(q) ||
        p.locationText.toLowerCase().includes(q) ||
        (p.propertyType ?? "").toLowerCase().includes(q)
      );
    }

    // frontend sort as a safety
    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => (a.priceActual ?? a.priceMin ?? 0) - (b.priceActual ?? b.priceMin ?? 0));
        break;
      case "price-high":
        list.sort((a, b) => (b.priceActual ?? b.priceMin ?? 0) - (a.priceActual ?? a.priceMin ?? 0));
        break;
      case "oldest":
        list.sort((a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime());
        break;
      case "newest":
      default:
        list.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
    }

    return list;
  }, [items, filters, search, sortBy]);

  /* ---------------- analytics ---------------- */
  const totalCount = filtered.length;
  const avgPrice = totalCount
    ? Math.round(filtered.reduce((s, p) => s + (p.priceActual ?? p.priceMin ?? p.priceMax ?? 0), 0) / totalCount)
    : 0;

  const priceBarData = filtered.slice(0, 8).map((p) => ({
    name: String(p.title).slice(0, 10),
    price: (p.priceActual ?? p.priceMin ?? 0) / 1e5, // Lakhs
  }));

  const categoriesMap: Record<string, number> = {};
  filtered.forEach((p) => {
    const key = (p.propertyType || "Other").trim();
    categoriesMap[key] = (categoriesMap[key] || 0) + 1;
  });
  const categoriesData = Object.entries(categoriesMap).map(([name, value]) => ({ name, value }));
  const PIE_COLORS = ["#22c55e", "#84cc16", "#facc15", "#10b981", "#65a30d", "#ca8a04", "#0ea5e9", "#6366f1"];

  /* ---------------- watchlist ---------------- */
  const [watchlist, setWatchlist] = useState<UiProperty[]>([]);
  const toggleWatch = (p: UiProperty) => {
    setWatchlist(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
  };

  const statusChip = (s?: string|null) => {
    if (!s) return "bg-slate-300 text-slate-800";
    const v = s.toLowerCase();
    if (v.includes("draft")) return "bg-slate-300 text-slate-800";
    if (v.includes("active") || v.includes("published")) return "bg-emerald-500 text-white";
    if (v.includes("closed")) return "bg-rose-500 text-white";
    return "bg-slate-300 text-slate-800";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2019]/95 via-[#0b2019]/85 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 py-14 md:py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-white">Browse Properties.</span>{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: brandGradient }}>
                Real Data. Zero Guesswork.
              </span>
            </h1>
            <p className="mt-3 text-white/80 max-w-3xl mx-auto">
              Filter by city, service, type, price, and more — pulled live from your database.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Listings", value: String(totalCount || 0), icon: Building2 },
              { label: "Avg Price", value: formatCurrency(avgPrice), icon: TrendingUp },
              { label: "Cities Covered", value: String(new Set(filtered.map(p => p.city).filter(Boolean)).size), icon: Target },
              { label: "States", value: String(new Set(filtered.map(p => p.state).filter(Boolean)).size), icon: Users },
            ].map(({ label, value, icon: Icon }, i) => (
              <div key={i} className="rounded-xl p-5 bg-white/5 backdrop-blur border border-white/15 text-white">
                <div className="flex justify-center mb-2"><Icon className="h-7 w-7 text-amber-300" /></div>
                <div className="text-2xl font-bold text-center">{value}</div>
                <p className="text-xs text-center opacity-80 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4">
        {/* TOOLBAR */}
        <div className="-mt-10 relative z-20 bg-card border border-emerald-900/20 rounded-xl p-4 mb-6 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search by title, city, type…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                {loading ? "Loading…" : `${filtered.length} results`}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <Button variant="outline" size="sm" onClick={openMobileFilter} className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price (Low→High)</SelectItem>
                  <SelectItem value="price-high">Price (High→Low)</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border border-emerald-900/20 rounded-lg p-1">
                <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="h-8 w-8 p-0">
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 w-8 p-0">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* FILTER SIDEBAR */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-card border border-emerald-900/20 rounded-xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <FilterPanel filters={filters} setFilters={setFilters} opts={opts} />
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            {/* Analytics */}
            <section className="mb-8">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-emerald-900/20">
                  <CardHeader><CardTitle>Top Prices (Lakhs)</CardTitle></CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={priceBarData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                                 formatter={(v: number) => [`₹${(v as number).toFixed(1)} L`, "Price"]} />
                        <Bar dataKey="price" fill="#22c55e" radius={[4,4,0,0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-emerald-900/20">
                  <CardHeader><CardTitle>Type Distribution</CardTitle></CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categoriesData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value"
                             label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                          {categoriesData.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* GRID / LIST */}
            <section>
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {loading && Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="border-emerald-900/20 overflow-hidden">
                    <div className="h-48 bg-muted animate-pulse" />
                    <CardHeader className="pb-3"><div className="h-5 w-2/3 bg-muted animate-pulse rounded" /></CardHeader>
                    <CardContent><div className="h-4 w-1/2 bg-muted animate-pulse rounded" /></CardContent>
                  </Card>
                ))}

                {!loading && filtered.map((p) => {
                  const inWatch = !!watchlist.find((x) => x.id === p.id);
                  const priceText = p.priceActual
                    ? formatCurrency(p.priceActual)
                    : (p.priceMin || p.priceMax)
                      ? `${formatCurrency(p.priceMin || 0)} - ${formatCurrency(p.priceMax || 0)}`
                      : "Price on request";
                  return (
                    <Card key={p.id} className="group hover:shadow-xl transition-all duration-300 border-emerald-900/20 hover:border-emerald-700/30 overflow-hidden">
                      {/* image */}
                      <div className="relative h-48 bg-muted overflow-hidden">
                        <img
                          src={p.mainImage || PLACEHOLDER_IMG}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                        />
                        {p.status && <Badge className={`absolute top-3 right-3 ${statusChip(p.status)}`}>{p.status}</Badge>}
                        <Button variant="outline" size="sm" onClick={() => toggleWatch(p)} className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
                          {inWatch ? <BookmarkCheck className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
                        </Button>
                      </div>

                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-lg font-semibold mb-1 truncate">{p.title}</h3>
                            {p.subtitle && <div className="text-xs text-muted-foreground truncate">{p.subtitle}</div>}
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" /><span className="text-sm truncate">{p.locationText}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            {p.service && <Badge variant="outline" className="mb-1 capitalize">{p.service}</Badge>}
                            {p.propertyType && <div className="text-xs text-muted-foreground">{p.propertyType}</div>}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0 space-y-3">
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-semibold">{priceText}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Size</p>
                            <p className="font-semibold flex items-center gap-1">
                              <Ruler className="h-3 w-3" />
                              {p.sizeText || "—"}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 col-span-3 sm:col-span-1">
                            <div className="flex items-center gap-1">
                              <BedDouble className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{p.bedrooms ?? "—"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bath className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{p.bathrooms ?? "—"}</span>
                            </div>
                          </div>
                        </div>

                        {!!p.amenities?.length && (
                          <div className="flex flex-wrap gap-1">
                            {p.amenities.slice(0, 4).map((h, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{String(h)}</Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="text-xs text-muted-foreground">
                            {p.pricePerSqft ? `₹${p.pricePerSqft.toLocaleString()}/sqft` : ""}
                          </div>
                          <Button variant="hero" size="sm" onClick={() => nav(`/property-show/${p.id}`)}>
                            Explore <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {!loading && !filtered.length && !error && (
                  <div className="text-center text-muted-foreground py-10">No properties found with current filters.</div>
                )}
                {!loading && error && (
                  <div className="text-center py-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                      <span>⚠</span>
                      <span>{error}</span>
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      Try resetting filters or lowering constraints.
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* CTA */}
            <section className="mt-12 mb-8">
              <div className="rounded-2xl p-8 text-center relative overflow-hidden" style={{ backgroundImage: brandGradient }}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-6 left-6"><Building2 className="h-16 w-16"/></div>
                  <div className="absolute bottom-6 right-6"><Building2 className="h-20 w-20"/></div>
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Find your next property</h2>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">Powerful search & filters backed by your live database.</p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="secondary" size="lg" className="bg-white text-emerald-700 hover:bg-white/90">Begin KYC</Button>
                    <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">Browse All Categories</Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* MOBILE FILTER SHEET */}
        {filterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setFilterOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-80 bg-background" onClick={(e) => e.stopPropagation()}>
              <div className="h-full overflow-y-auto p-6">
                <FilterPanel filters={filters} setFilters={setFilters} opts={opts} onClose={() => setFilterOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* WATCHLIST DOCK */}
        {watchlist.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-emerald-900/20 shadow-xl">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Watchlist ({watchlist.length})</div>
                <Button variant="ghost" size="sm" onClick={() => setWatchlist([])}>Clear</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-56 overflow-y-auto">
                {watchlist.map((p) => (
                  <Card key={p.id} className="relative border-emerald-900/20">
                    <Button variant="ghost" size="sm" onClick={() => setWatchlist(prev => prev.filter(x => x.id !== p.id))}
                            className="absolute top-1 right-1 h-6 w-6 p-0 hover:bg-rose-600 hover:text-white">
                      <X className="h-3 w-3" />
                    </Button>
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <img src={p.mainImage || PLACEHOLDER_IMG} className="w-16 h-16 rounded object-cover"
                             onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }} />
                        <div className="min-w-0">
                          <div className="font-medium text-sm truncate">{p.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{p.locationText}</div>
                          <div className="text-xs mt-1">
                            {formatCurrency(p.priceActual ?? p.priceMin ?? p.priceMax ?? 0)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ----------------------------- Filter Panel ----------------------------- */
function FilterPanel({
  filters, setFilters, opts, onClose,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  opts: FilterOptions;
  onClose?: () => void;
}) {
  const toggle = (b: boolean) => b ? true : false;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-emerald-500" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        {onClose && <Button variant="ghost" size="sm" onClick={onClose}><X className="h-4 w-4" /></Button>}
      </div>

      {/* Service */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Service</h4>
        <Select
          value={filters.service || "any"}
          onValueChange={(v) => setFilters(f => ({ ...f, service: v === "any" ? "" : (v as Service) }))}
        >
          <SelectTrigger><SelectValue placeholder="Select Service" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
            <SelectItem value="lease">Lease</SelectItem>
            <SelectItem value="mortgage">Mortgage</SelectItem>
            <SelectItem value="resale">Resale</SelectItem>
            <SelectItem value="new">New</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Property Type</h4>
        <Input placeholder="e.g. Apartment, Office, Plot…" value={filters.propertyType}
               onChange={(e) => setFilters(f => ({ ...f, propertyType: e.target.value }))} />
      </div>

      <Separator className="my-6" />

      {/* Location (dependent) */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Location</h4>

        {/* State */}
        <Select
          value={filters.state || "any"}
          onValueChange={(v) => setFilters(f => ({ ...f, state: v === "any" ? "" : v, city: "" }))}
        >
          <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {opts.states.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>

        {/* City */}
        <Select
          value={filters.city || "any"}
          onValueChange={(v) => setFilters(f => ({ ...f, city: v === "any" ? "" : v }))}
          disabled={!filters.state}
        >
          <SelectTrigger className="mt-3"><SelectValue placeholder="Select City" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {(opts.citiesByState[filters.state] || []).map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-6" />

      {/* Price */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider value={filters.priceRange}
                  onValueChange={(v) => setFilters(f => ({ ...f, priceRange: v as [number, number] }))}
                  max={5_00_00_000} min={0} step={50_000} className="mb-3" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatCurrency(filters.priceRange[0])}</span>
            <span>{formatCurrency(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Bedrooms */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Bedrooms</h4>
        <div className="grid grid-cols-2 gap-3">
          <Input type="number" min={0} value={filters.minBedrooms}
                 onChange={(e) => setFilters(f => ({ ...f, minBedrooms: Math.max(0, Number(e.target.value)) }))} placeholder="Min" />
          <Input type="number" min={0} value={filters.maxBedrooms}
                 onChange={(e) => setFilters(f => ({ ...f, maxBedrooms: Math.max(0, Number(e.target.value)) }))} placeholder="Max" />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Legal (client-only) */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Legal</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox checked={filters.hasLoan} onCheckedChange={(c) => setFilters(f => ({ ...f, hasLoan: toggle(!!c) }))} />
            <span className="text-sm">Loan Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox checked={filters.hasNoc} onCheckedChange={(c) => setFilters(f => ({ ...f, hasNoc: toggle(!!c) }))} />
            <span className="text-sm">NOC Available</span>
          </div>
        </div>
      </div>

      <Button className="w-full" variant="hero" onClick={onClose}>Apply Filters</Button>
    </div>
  );
}
