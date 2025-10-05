// import React, { useEffect, useMemo, useState } from "react";
// import {
//   MapPin, TrendingUp, Building2, Target, Users, Search,
//   Grid3X3, List, SlidersHorizontal, X, ArrowRight, Bath, BedDouble, Ruler
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import API from "@/api/api";
// import {
//   ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell
// } from "recharts";
// import { useNavigate } from "react-router-dom";

// /* ----------------------------- constants ----------------------------- */
// // const API_BASE = "http://127.0.0.1:8000/api/v1";
// // ⬇️ central base derived from axios instance
// const API_ROOT = (API.defaults.baseURL || "").replace(/\/+$/, ''); // ".../api" ya ""
// const API_ORIGIN = API_ROOT ? API_ROOT.replace(/\/api$/, "") : window.location.origin;
// const API_V1 = API_ROOT ? `${API_ROOT}/v1` : `${API_ORIGIN}/api/v1`; // sirf logs/debug ke liye

// const brandGradient = "linear-gradient(90deg,#22c55e 0%,#84cc16 50%,#facc15 100%)";
// const PLACEHOLDER_IMG = "/images/placeholder/property.jpg";


// /* ----------------------------- debug & defaults ----------------------------- */
// const DEBUG = true; // flip to false to silence logs
// const DEFAULT_MIN_PRICE = 0;
// const DEFAULT_MAX_PRICE = 5_00_00_000;
// const DEFAULT_MIN_BED = 0;
// const DEFAULT_MAX_BED = 20;

// const log = (...args: any[]) => DEBUG && console.log('[Market]', ...args);
// const group = (label: string, fn: () => void) => {
//   if (!DEBUG) return fn();
//   console.groupCollapsed(label);
//   try { fn(); } finally { console.groupEnd(); }
// };

// /* ----------------------------- types ----------------------------- */
// type Service = "rent" | "lease" | "mortgage" | "resale" | "new" | string | null;

// type UiProperty = {
//   id: number | string;
//   title: string;
//   subtitle?: string;
//   service: Service;
//   propertyType?: string | null;
//   locationText: string;
//   city?: string | null;
//   state?: string | null;
//   locality?: string | null;
//   mainImage?: string | null;
//   gallery?: string[] | null;
//   priceActual?: number | null;
//   priceMin?: number | null;
//   priceMax?: number | null;
//   pricePerSqft?: number | null;
//   sizeText?: string | null;
//   bedrooms?: number | null;
//   bathrooms?: number | null;
//   furnishing?: string | null;
//   amenities?: string[] | null;
//   status?: string | null;
//   availableFrom?: string | null;
//   createdAt?: string;
// };

// type Filters = {
//   service: Service | ""; propertyType: string | ""; state: string | ""; city: string | "";
//   priceRange: [number, number]; minBedrooms: number; maxBedrooms: number;
//   hasLoan: boolean; hasNoc: boolean;
// };

// type FilterOptions = {
//   states: string[];
//   citiesByState: Record<string, string[]>;
//   propertyTypes: string[];          // normalized to array of names for the UI
//   bedrooms: number[];               // normalized
// };

// /* ----------------------------- utils ----------------------------- */
// const formatCurrency = (value?: number | null) => {
//   if (value == null) return "—";
//   if (value >= 1e7) return `₹${(value / 1e7).toFixed(1)} Cr`;
//   if (value >= 1e5) return `₹${(value / 1e5).toFixed(1)} L`;
//   return `₹${value.toLocaleString()}`;
// };

// /** Normalize resource/flat payload */
// function normalizeProperty(raw: any): UiProperty {
//   const isRes = !!raw?.location || !!raw?.price || !!raw?.media;
//   const id = raw?.id;

//   const city = isRes ? raw.location?.city : raw?.city;
//   const state = isRes ? raw.location?.state : raw?.state;
//   const locTxt = [city, state].filter(Boolean).join(", ") || raw?.locality || "—";

//   const title = raw?.title || raw?.project_name || "Untitled";
//   const subtitle = [raw?.project_name, raw?.builder_name].filter(Boolean).join(" • ") || raw?.builder_name || "";

//   const mediaMain = isRes ? raw.media?.main_image : (raw?.primary_image_url ?? raw?.main_image_path);
//   const gallery = isRes ? raw.media?.gallery : raw?.gallery_paths;

//   return {
//     id,
//     title,
//     subtitle,
//     service: raw?.service ?? null,
//     propertyType: isRes ? raw?.property_type ?? raw?.propertyType : raw?.property_type,
//     locationText: locTxt,
//     city, state,
//     locality: isRes ? raw.location?.locality : raw?.locality,

//     mainImage: mediaMain || null,
//     gallery: Array.isArray(gallery) ? gallery : null,

//     priceActual: isRes ? raw.price?.actual : raw?.price_actual,
//     priceMin: isRes ? raw.price?.min : raw?.price_min,
//     priceMax: isRes ? raw.price?.max : raw?.price_max,
//     pricePerSqft: isRes ? raw.price?.per_sqft : raw?.price_per_sqft,

//     sizeText: isRes ? raw.layout?.size_text : raw?.size_sqft_text,
//     bedrooms: isRes ? raw.layout?.bedrooms : raw?.bedrooms,
//     bathrooms: isRes ? raw.layout?.bathrooms : raw?.bathrooms,
//     furnishing: isRes ? raw.layout?.furnishing : raw?.furnishing,
//     amenities: (isRes ? raw?.amenities : raw?.amenities) ?? null,

//     status: raw?.status ?? null,
//     availableFrom: isRes ? raw?.available_from : raw?.available_from,

//     createdAt: raw?.created_at,
//   };
// }

// /** Safely extract array from properties response */
// function extractArray(data: any): any[] {
//   if (!data) return [];
//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data?.data)) return data.data;
//   if (Array.isArray(data?.properties)) return data.properties;
//   return [];
// }

// /** Normalize filter payload into uniform shapes used by UI */
// function normalizeFiltersPayload(payload: any): FilterOptions {
//   // states
//   const states = Array.isArray(payload?.states) ? payload.states : [];

//   // cities
//   let citiesByState: Record<string, string[]> = {};
//   const cbs = payload?.cities_by_state;
//   if (cbs && typeof cbs === "object") {
//     Object.entries(cbs).forEach(([stateName, arr]) => {
//       citiesByState[stateName] = Array.isArray(arr) ? (arr as string[]) : [];
//     });
//   }

//   // property types -> normalize into array of names
//   let propertyTypes: string[] = [];
//   const pts = payload?.property_types;
//   if (Array.isArray(pts)) {
//     // could be ["Apartment", "Villa"] OR [{name,count}]
//     propertyTypes = pts.map((pt: any) =>
//       typeof pt === "string" ? pt : (pt?.name ?? "")
//     ).filter(Boolean);
//   } else if (pts && typeof pts === "object") {
//     propertyTypes = Object.keys(pts); // { Apartment: 120, Villa: 20 }
//   }

//   // bedrooms
//   const bedrooms = Array.isArray(payload?.bedrooms) && payload.bedrooms.length
//     ? payload.bedrooms
//     : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//   return { states, citiesByState, propertyTypes, bedrooms };
// }

// /* ----------------------------- page ----------------------------- */
// export default function Marketplace() {
//   const nav = useNavigate();

//   const [loading, setLoading] = useState(true);
//   const [items, setItems] = useState<UiProperty[]>([]);
//   const [error, setError] = useState<string>("");

//   const [opts, setOpts] = useState<FilterOptions>({
//     states: [], citiesByState: {}, propertyTypes: [], bedrooms: [],
//   });

//   // view & sort
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const [sortBy, setSortBy] = useState("newest");
//   const [search, setSearch] = useState("");

//   // filters mapped to DB fields
//   const [filters, setFilters] = useState<Filters>({
//     service: "",
//     propertyType: "",
//     state: "",
//     city: "",
//     priceRange: [DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE],
//     minBedrooms: DEFAULT_MIN_BED,
//     maxBedrooms: DEFAULT_MAX_BED,
//     hasLoan: false,
//     hasNoc: false,
//   });

//   const [filterOpen, setFilterOpen] = useState(false);
//   const openMobileFilter = () => setFilterOpen(true);

//   // Load filter options once (FETCH, no api.ts)
//   useEffect(() => {
//     (async () => {
//       try {
//         const url = `${API_V1}/properties/filters`;
//         group(`FETCH filters → ${url}`, () => { });

//         // ✅ axios instance (no qs needed here)
//         const { data: payload } = await API.get("v1/properties/filters");

//         group("Filters raw payload", () => log(payload));

//         const normalized = normalizeFiltersPayload(payload);
//         setOpts(normalized);
//         group("Filters normalized", () => log(normalized));
//       } catch (err) {
//         console.error("Failed to fetch filters:", err);
//         setOpts({
//           states: [],
//           citiesByState: {},
//           propertyTypes: [],
//           bedrooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//         });
//       }
//     })();
//   }, []);



//   /** Build server-side query params */
//   const mapSort = (val: string) => {
//     switch (val) {
//       case "price-low": return "price";
//       case "price-high": return "-price";
//       case "oldest": return "created_at";
//       case "newest":
//       default: return "-created_at";
//     }
//   };

//   /** Build server-side query params WITHOUT applying defaults */
//   const buildParams = () => {
//     const p = new URLSearchParams();

//     if (search) p.set("q", search);
//     if (filters.service) p.set("service", String(filters.service));
//     if (filters.propertyType) p.set("property_type", filters.propertyType);
//     if (filters.state) p.set("state", filters.state);
//     if (filters.city) p.set("city", filters.city);

//     // Only send price if user moved away from defaults
//     const [minP, maxP] = filters.priceRange;
//     if (minP !== DEFAULT_MIN_PRICE) p.set("price_min", String(minP));
//     if (maxP !== DEFAULT_MAX_PRICE) p.set("price_max", String(maxP));

//     // Only send bedrooms if changed from defaults
//     if (filters.minBedrooms !== DEFAULT_MIN_BED) p.set("min_bedrooms", String(filters.minBedrooms));
//     if (filters.maxBedrooms !== DEFAULT_MAX_BED) p.set("max_bedrooms", String(filters.maxBedrooms));

//     // Sorting & page size are okay to always send
//     const mapSort = (val: string) => {
//       switch (val) {
//         case "price-low": return "price";
//         case "price-high": return "-price";
//         case "oldest": return "created_at";
//         case "newest":
//         default: return "-created_at";
//       }
//     };
//     p.set("sort", mapSort(sortBy));
//     p.set("per_page", "24");

//     group('Query params (what we will send)', () => log(Object.fromEntries(p.entries())));
//     return p;
//   };


//   // Fetch data whenever filters/search/sort change (FETCH, no api.ts)
//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // ⚠️ pehle qs string bana rahe the; axios me directly object de sakte ho:
//         const paramsObj = Object.fromEntries(buildParams());

//         const url = `${API_V1}/properties`;
//         group(`FETCH properties → ${url}`, () => log(paramsObj));

//         // ✅ axios instance via api.ts (handles base + token)
//         const { data: payload } = await API.get("v1/properties", { params: paramsObj });

//         group("Properties raw payload", () => log(payload));

//         const arr = extractArray(payload);
//         const normalized = arr.map(normalizeProperty);

//         group(`Normalized items (${normalized.length})`, () =>
//           console.table(
//             normalized.map((p) => ({
//               id: p.id,
//               title: p.title,
//               service: p.service,
//               city: p.city,
//               state: p.state,
//               mainImage: p.mainImage || "(none)",
//               galleryCount: p.gallery?.length || 0,
//               priceActual: p.priceActual,
//             }))
//           )
//         );

//         group("Image URLs by item", () => {
//           normalized.forEach((p) => {
//             log(`ID ${p.id} – main:`, p.mainImage);
//             if (p.gallery?.length) log(`ID ${p.id} – gallery:`, p.gallery);
//           });
//         });

//         if (alive) setItems(normalized);
//       } catch (e: any) {
//         let msg = "Something went wrong. Please adjust filters.";
//         const status = e?.response?.status;
//         if (status === 422) msg = "Invalid filters. Please adjust and try again.";
//         else if (e?.message) msg = e.message;

//         console.error("FETCH properties failed:", e);
//         if (alive) setError(msg);
//       } finally {
//         if (alive) setLoading(false);
//         group("Fetch complete snapshot", () => {
//           log("filters:", filters);
//           log("search:", search);
//           log("sortBy:", sortBy);
//         });
//       }
//     })();
//     return () => {
//       alive = false;
//     };
//   }, [
//     search,
//     filters.service,
//     filters.propertyType,
//     filters.state,
//     filters.city,
//     filters.priceRange[0],
//     filters.priceRange[1],
//     filters.minBedrooms,
//     filters.maxBedrooms,
//     sortBy,
//   ]);



//   /* ---------------- derived & client-side fallbacks ---------------- */
//   const filtered = useMemo(() => {
//     let list = items.slice();

//     if (filters.hasLoan) list = list.filter((p: any) => p?.loan_available ?? true);
//     if (filters.hasNoc) list = list.filter((p: any) => p?.noc_available ?? true);

//     // local search fallback
//     if (search.trim()) {
//       const q = search.toLowerCase();
//       list = list.filter(p =>
//         p.title.toLowerCase().includes(q) ||
//         (p.subtitle ?? "").toLowerCase().includes(q) ||
//         p.locationText.toLowerCase().includes(q) ||
//         (p.propertyType ?? "").toLowerCase().includes(q)
//       );
//     }

//     // frontend sort as a safety
//     switch (sortBy) {
//       case "price-low":
//         list.sort((a, b) => (a.priceActual ?? a.priceMin ?? 0) - (b.priceActual ?? b.priceMin ?? 0));
//         break;
//       case "price-high":
//         list.sort((a, b) => (b.priceActual ?? b.priceMin ?? 0) - (a.priceActual ?? a.priceMin ?? 0));
//         break;
//       case "oldest":
//         list.sort((a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime());
//         break;
//       case "newest":
//       default:
//         list.sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime());
//     }

//     return list;
//   }, [items, filters, search, sortBy]);

//   /* ---------------- analytics ---------------- */
//   const totalCount = filtered.length;
//   const avgPrice = totalCount
//     ? Math.round(filtered.reduce((s, p) => s + (p.priceActual ?? p.priceMin ?? p.priceMax ?? 0), 0) / totalCount)
//     : 0;

//   const priceBarData = filtered.slice(0, 8).map((p) => ({
//     name: String(p.title).slice(0, 10),
//     price: (p.priceActual ?? p.priceMin ?? 0) / 1e5, // Lakhs
//   }));

//   const categoriesMap: Record<string, number> = {};
//   filtered.forEach((p) => {
//     const key = (p.propertyType || "Other").trim();
//     categoriesMap[key] = (categoriesMap[key] || 0) + 1;
//   });
//   const categoriesData = Object.entries(categoriesMap).map(([name, value]) => ({ name, value }));
//   const PIE_COLORS = ["#22c55e", "#84cc16", "#facc15", "#10b981", "#65a30d", "#ca8a04", "#0ea5e9", "#6366f1"];

//   /* ---------------- watchlist ---------------- */
//   const [watchlist, setWatchlist] = useState<UiProperty[]>([]);
//   const toggleWatch = (p: UiProperty) => {
//     setWatchlist(prev => prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]);
//   };

//   const statusChip = (s?: string | null) => {
//     if (!s) return "bg-slate-300 text-slate-800";
//     const v = s.toLowerCase();
//     if (v.includes("draft")) return "bg-slate-300 text-slate-800";
//     if (v.includes("active") || v.includes("published")) return "bg-emerald-500 text-white";
//     if (v.includes("closed")) return "bg-rose-500 text-white";
//     return "bg-slate-300 text-slate-800";
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       {/* HERO */}
//       <section className="relative overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop)" }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#0b2019]/95 via-[#0b2019]/85 to-transparent" />
//         <div className="relative z-10 container mx-auto px-4 py-14 md:py-20">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//               <span className="text-white">Browse Properties.</span>{" "}
//               <span className="bg-clip-text text-transparent" style={{ backgroundImage: brandGradient }}>
//                 Real Data. Zero Guesswork.
//               </span>
//             </h1>
//             <p className="mt-3 text-white/80 max-w-3xl mx-auto">
//               Filter by city, service, type, price, and more — pulled live from your database.
//             </p>
//           </div>

//           <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { label: "Total Listings", value: String(totalCount || 0), icon: Building2 },
//               { label: "Avg Price", value: formatCurrency(avgPrice), icon: TrendingUp },
//               { label: "Cities Covered", value: String(new Set(filtered.map(p => p.city).filter(Boolean)).size), icon: Target },
//               { label: "States", value: String(new Set(filtered.map(p => p.state).filter(Boolean)).size), icon: Users },
//             ].map(({ label, value, icon: Icon }) => (
//               <div key={label} className="rounded-xl p-5 bg-white/5 backdrop-blur border border-white/15 text-white">
//                 <div className="flex justify-center mb-2"><Icon className="h-7 w-7 text-amber-300" /></div>
//                 <div className="text-2xl font-bold text-center">{value}</div>
//                 <p className="text-xs text-center opacity-80 mt-1">{label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <main className="container mx-auto px-4">
//         {/* TOOLBAR */}
//         <div className="-mt-10 relative z-20 bg-card border border-emerald-900/20 rounded-xl p-4 mb-6 shadow-lg">
//           <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
//             <div className="flex-1 flex items-center gap-4 w-full lg:w-auto">
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                 <Input placeholder="Search by title, city, type…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
//               </div>
//               <div className="text-sm text-muted-foreground whitespace-nowrap">
//                 {loading ? "Loading…" : `${filtered.length} results`}
//               </div>
//             </div>

//             <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
//               <Button variant="outline" size="sm" onClick={() => setFilterOpen(true)} className="lg:hidden">
//                 <SlidersHorizontal className="h-4 w-4 mr-2" />
//                 Filters
//               </Button>

//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger className="w-48"><SelectValue placeholder="Sort by" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="newest">Newest First</SelectItem>
//                   <SelectItem value="oldest">Oldest First</SelectItem>
//                   <SelectItem value="price-low">Price (Low→High)</SelectItem>
//                   <SelectItem value="price-high">Price (High→Low)</SelectItem>
//                 </SelectContent>
//               </Select>

//               <div className="flex items-center border border-emerald-900/20 rounded-lg p-1">
//                 <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("grid")} className="h-8 w-8 p-0">
//                   <Grid3X3 className="h-4 w-4" />
//                 </Button>
//                 <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="sm" onClick={() => setViewMode("list")} className="h-8 w-8 p-0">
//                   <List className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex gap-8">
//           {/* FILTER SIDEBAR */}
//           <div className="hidden lg:block w-80 flex-shrink-0">
//             <div className="bg-card border border-emerald-900/20 rounded-xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
//               <FilterPanel
//                 filters={filters}
//                 setFilters={setFilters}
//                 opts={opts}
//                 onClose={undefined}
//               />
//             </div>
//           </div>

//           {/* MAIN CONTENT */}
//           <div className="flex-1 min-w-0">
//             {/* Analytics */}
//             <section className="mb-8">
//               <div className="grid lg:grid-cols-2 gap-6">
//                 <Card className="border-emerald-900/20">
//                   <CardHeader><CardTitle>Top Prices (Lakhs)</CardTitle></CardHeader>
//                   <CardContent className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={priceBarData}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
//                         <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
//                         <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
//                         <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
//                           formatter={(v: number) => [`₹${(v as number).toFixed(1)} L`, "Price"]} />
//                         <Bar dataKey="price" fill="#22c55e" radius={[4, 4, 0, 0]} />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </CardContent>
//                 </Card>

//                 <Card className="border-emerald-900/20">
//                   <CardHeader><CardTitle>Type Distribution</CardTitle></CardHeader>
//                   <CardContent className="h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie data={categoriesData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value"
//                           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
//                           {categoriesData.map((entry, i) => (<Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />))}
//                         </Pie>
//                         <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </CardContent>
//                 </Card>
//               </div>
//             </section>

//             {/* GRID / LIST */}
//             <section>
//               <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
//                 {loading && Array.from({ length: 6 }).map((_, i) => (
//                   <Card key={i} className="border-emerald-900/20 overflow-hidden">
//                     <div className="h-48 bg-muted animate-pulse" />
//                     <CardHeader className="pb-3"><div className="h-5 w-2/3 bg-muted animate-pulse rounded" /></CardHeader>
//                     <CardContent><div className="h-4 w-1/2 bg-muted animate-pulse rounded" /></CardContent>
//                   </Card>
//                 ))}

//                 {!loading && filtered.map((p) => {
//                   const priceText = p.priceActual
//                     ? formatCurrency(p.priceActual)
//                     : (p.priceMin || p.priceMax)
//                       ? `${formatCurrency(p.priceMin || 0)} - ${formatCurrency(p.priceMax || 0)}`
//                       : "Price on request";
//                   return (
//                     <Card key={p.id} className="group hover:shadow-xl transition-all duration-300 border-emerald-900/20 hover:border-emerald-700/30 overflow-hidden">
//                       {/* image */}
//                       <div className="relative h-48 bg-muted overflow-hidden">
//                         <img
//                           src={
//                             p.mainImage
//                               ? (
//                                 /^https?:\/\//i.test(p.mainImage)
//                                   ? p.mainImage
//                                   : (() => {
//                                     const imgPath = (p.mainImage || "").replace(/^\/+/, ""); // remove leading slashes
//                                     const finalPath = imgPath.startsWith("storage/") ? imgPath : `storage/${imgPath}`;
//                                     return `${API_ORIGIN}/${finalPath}`;
//                                   })()
//                               )
//                               : PLACEHOLDER_IMG
//                           }
//                           alt={p.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                           onError={(e) => {
//                             console.warn("Image failed:", p.id, p.mainImage);
//                             (e.currentTarget as HTMLImageElement).onerror = null;
//                             (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG;
//                           }}
//                         />
//                         {p.status && <Badge className={`absolute top-3 right-3 ${statusChip(p.status)}`}>{p.status}</Badge>}
//                       </div>

//                       <CardHeader className="pb-2">
//                         <div className="flex items-start justify-between gap-3">
//                           <div className="min-w-0">
//                             <h3 className="text-lg font-semibold mb-1 truncate">{p.title}</h3>
//                             {p.subtitle && <div className="text-xs text-muted-foreground truncate">{p.subtitle}</div>}
//                             <div className="flex items-center text-muted-foreground">
//                               <MapPin className="h-4 w-4 mr-1" /><span className="text-sm truncate">{p.locationText}</span>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             {p.service && <Badge variant="outline" className="mb-1 capitalize">{p.service}</Badge>}
//                             {p.propertyType && <div className="text-xs text-muted-foreground">{p.propertyType}</div>}
//                           </div>
//                         </div>
//                       </CardHeader>

//                       <CardContent className="pt-0 space-y-3">
//                         <div className="grid grid-cols-3 gap-3 text-sm">
//                           <div>
//                             <p className="text-muted-foreground">Price</p>
//                             <p className="font-semibold">{priceText}</p>
//                           </div>
//                           <div>
//                             <p className="text-muted-foreground">Size</p>
//                             <p className="font-semibold flex items-center gap-1">
//                               <Ruler className="h-3 w-3" />
//                               {p.sizeText || "—"}
//                             </p>
//                           </div>
//                           <div className="flex items-center gap-3 col-span-3 sm:col-span-1">
//                             <div className="flex items-center gap-1">
//                               <BedDouble className="h-4 w-4 text-muted-foreground" />
//                               <span className="text-sm">{p.bedrooms ?? "—"}</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                               <Bath className="h-4 w-4 text-muted-foreground" />
//                               <span className="text-sm">{p.bathrooms ?? "—"}</span>
//                             </div>
//                           </div>
//                         </div>

//                         {!!p.amenities?.length && (
//                           <div className="flex flex-wrap gap-1">
//                             {p.amenities.slice(0, 4).map((h, i) => (
//                               <Badge key={`${p.id}-amenity-${i}`} variant="secondary" className="text-xs">{String(h)}</Badge>
//                             ))}
//                           </div>
//                         )}

//                         <div className="flex justify-between items-center">
//                           <div className="text-xs text-muted-foreground">
//                             {p.pricePerSqft ? `₹${p.pricePerSqft.toLocaleString()}/sqft` : ""}
//                           </div>
//                           <Button variant="hero" size="sm" onClick={() => nav(`/property-show/${p.id}`)}>
//                             Explore <ArrowRight className="h-4 w-4 ml-2" />
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   );
//                 })}

//                 {!loading && !filtered.length && !error && (
//                   <div className="text-center text-muted-foreground py-10">No properties found with current filters.</div>
//                 )}
//                 {!loading && error && (
//                   <div className="text-center py-10">
//                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
//                       <span>⚠</span>
//                       <span>{error}</span>
//                     </div>
//                     <div className="mt-3 text-sm text-muted-foreground">
//                       Try resetting filters or lowering constraints.
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </section>

//             {/* CTA */}
//             <section className="mt-12 mb-8">
//               <div className="rounded-2xl p-8 text-center relative overflow-hidden" style={{ backgroundImage: brandGradient }}>
//                 <div className="absolute inset-0 opacity-10">
//                   <div className="absolute top-6 left-6"><Building2 className="h-16 w-16" /></div>
//                   <div className="absolute bottom-6 right-6"><Building2 className="h-20 w-20" /></div>
//                 </div>
//                 <div className="relative z-10">
//                   <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Find your next property</h2>
//                   <p className="text-white/90 mb-6 max-w-2xl mx-auto">Powerful search & filters backed by your live database.</p>
//                   <div className="flex gap-3 justify-center">
//                     <Button variant="secondary" size="lg" className="bg-white text-emerald-700 hover:bg-white/90">Begin KYC</Button>
//                     <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">Browse All Categories</Button>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>

//         {/* MOBILE FILTER SHEET */}
//         {filterOpen && (
//           <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setFilterOpen(false)}>
//             <div className="absolute right-0 top-0 h-full w-80 bg-background" onClick={(e) => e.stopPropagation()}>
//               <div className="h-full overflow-y-auto p-6">
//                 <FilterPanel
//                   filters={filters}
//                   setFilters={setFilters}
//                   opts={opts}
//                   onClose={() => setFilterOpen(false)}
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }

// /* ----------------------------- Filter Panel ----------------------------- */
// function FilterPanel({
//   filters, setFilters, opts, onClose,
// }: {
//   filters: Filters;
//   setFilters: React.Dispatch<React.SetStateAction<Filters>>;
//   opts: FilterOptions;
//   onClose?: () => void;
// }) {
//   const toggle = (b: boolean) => (b ? true : false);

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-2">
//           <SlidersHorizontal className="h-5 w-5 text-emerald-500" />
//           <h3 className="text-lg font-semibold">Filters</h3>
//         </div>
//         {onClose && <Button variant="ghost" size="sm" onClick={onClose}><X className="h-4 w-4" /></Button>}
//       </div>

//       {/* Service */}
//       <div className="mb-6">
//         <h4 className="font-medium mb-3">Service</h4>
//         <Select
//           value={filters.service || "any"}
//           onValueChange={(v) => setFilters(f => ({ ...f, service: v === "any" ? "" : (v as Service) }))}
//         >
//           <SelectTrigger><SelectValue placeholder="Select Service" /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="any">Any</SelectItem>
//             {["rent", "lease", "mortgage", "resale", "new"].map((svc) => (
//               <SelectItem key={`svc-${svc}`} value={svc}>{svc.charAt(0).toUpperCase() + svc.slice(1)}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Property Type */}
//       <div className="mb-6">
//         <h4 className="font-medium mb-3">Property Type</h4>
//         <Select
//           value={filters.propertyType || "any"}
//           onValueChange={(v) => setFilters(f => ({ ...f, propertyType: v === "any" ? "" : v }))}
//           disabled={!opts.propertyTypes || opts.propertyTypes.length === 0}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select Property Type" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="any">Any</SelectItem>
//             {opts.propertyTypes.map((name, index) => (
//               <SelectItem key={`ptype-${index}`} value={name}>{name}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <Separator className="my-6" />

//       {/* Location */}
//       <div className="mb-6">
//         <h4 className="font-medium mb-3">Location</h4>

//         {/* State */}
//         <Select
//           value={filters.state || "any"}
//           onValueChange={(v) => setFilters(f => ({ ...f, state: v === "any" ? "" : v, city: "" }))}
//           disabled={!opts.states || opts.states.length === 0}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select State" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="any">Any</SelectItem>
//             {opts.states.map((state, idx) => (
//               <SelectItem key={`state-${idx}`} value={state}>{state}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

//         {/* City */}
//         <Select
//           value={filters.city || "any"}
//           onValueChange={(v) => setFilters(f => ({ ...f, city: v === "any" ? "" : v }))}
//           disabled={!filters.state || !(opts.citiesByState[filters.state]?.length)}
//         >
//           <SelectTrigger className="mt-3">
//             <SelectValue placeholder="Select City" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="any">Any</SelectItem>
//             {(opts.citiesByState[filters.state] || []).map((city, idx) => (
//               <SelectItem key={`city-${idx}`} value={city}>{city}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <Separator className="my-6" />

//       {/* Price */}
//       <div className="mb-6">
//         <h4 className="font-medium mb-3">Price Range</h4>
//         <div className="px-2">
//           <Slider
//             value={filters.priceRange}
//             onValueChange={(v) => setFilters(f => ({ ...f, priceRange: v as [number, number] }))}
//             max={5_00_00_000} min={0} step={50_000} className="mb-3"
//           />
//           <div className="flex justify-between text-sm text-muted-foreground">
//             <span>{formatCurrency(filters.priceRange[0])}</span>
//             <span>{formatCurrency(filters.priceRange[1])}</span>
//           </div>
//         </div>
//       </div>

//       <Separator className="my-6" />

//       {/* Bedrooms */}
//       <div className="mb-6">
//         <h4 className="font-medium mb-3">Bedrooms</h4>
//         <Select
//           value={filters.minBedrooms === 0 ? "any" : String(filters.minBedrooms)}
//           onValueChange={(v) => setFilters(f => ({ ...f, minBedrooms: v === "any" ? 0 : Number(v) }))}
//           disabled={opts.bedrooms.length === 0}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select Bedrooms" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="any">Any</SelectItem>
//             {opts.bedrooms.map((b) => (
//               <SelectItem key={`bed-${b}`} value={String(b)}>{b}</SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <Separator className="my-6" />

//       {/* Legal */}
//       <div className="mb-6">
//         <h4 className="font-medium mb-3">Legal</h4>
//         <div className="space-y-3">
//           <div className="flex items-center space-x-2">
//             <Checkbox
//               checked={filters.hasLoan}
//               onCheckedChange={(c) => setFilters(f => ({ ...f, hasLoan: !!c }))}
//             />
//             <span className="text-sm">Loan Available</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Checkbox
//               checked={filters.hasNoc}
//               onCheckedChange={(c) => setFilters(f => ({ ...f, hasNoc: !!c }))}
//             />
//             <span className="text-sm">NOC Available</span>
//           </div>
//         </div>
//       </div>

//       <Button className="w-full" variant="hero" onClick={onClose}>Apply Filters</Button>
//     </div>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import {
  MapPin, TrendingUp, Building2, Target, Users, Search,
  Grid3X3, List, SlidersHorizontal, X, ArrowRight, Bath, BedDouble, Ruler
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
import API from "@/api/api";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell
} from "recharts";
import { useNavigate, useSearchParams } from "react-router-dom";

/* ----------------------------- constants ----------------------------- */
// ⬇️ central base derived from axios instance
const API_ROOT = (API.defaults.baseURL || "").replace(/\/+$/, ''); // ".../api" ya ""
const API_ORIGIN = API_ROOT ? API_ROOT.replace(/\/api$/, "") : window.location.origin;
const API_V1 = API_ROOT ? `${API_ROOT}/v1` : `${API_ORIGIN}/api/v1`; // sirf logs/debug ke liye

const brandGradient = "linear-gradient(90deg,#22c55e 0%,#84cc16 50%,#facc15 100%)";
const PLACEHOLDER_IMG = "/images/placeholder/property.jpg";

/* ----------------------------- debug & defaults ----------------------------- */
const DEBUG = true; // flip to false to silence logs
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 5_00_00_000;
const DEFAULT_MIN_BED = 0;
const DEFAULT_MAX_BED = 20;

const log = (...args: any[]) => DEBUG && console.log('[Market]', ...args);
const group = (label: string, fn: () => void) => {
  if (!DEBUG) return fn();
  console.groupCollapsed(label);
  try { fn(); } finally { console.groupEnd(); }
};

/* ----------------------------- types ----------------------------- */
type Service = "rent" | "lease" | "mortgage" | "resale" | "new" | string | null;

type UiProperty = {
  id: number | string;
  title: string;
  subtitle?: string;
  service: Service;
  propertyType?: string | null;
  locationText: string;
  city?: string | null;
  state?: string | null;
  locality?: string | null;
  mainImage?: string | null;
  gallery?: string[] | null;
  priceActual?: number | null;
  priceMin?: number | null;
  priceMax?: number | null;
  pricePerSqft?: number | null;
  sizeText?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  furnishing?: string | null;
  amenities?: string[] | null;
  status?: string | null;
  availableFrom?: string | null;
  createdAt?: string;
};

type Filters = {
  service: Service | ""; propertyType: string | ""; state: string | ""; city: string | "";
  priceRange: [number, number]; minBedrooms: number; maxBedrooms: number;
  hasLoan: boolean; hasNoc: boolean;
};

type FilterOptions = {
  states: string[];
  citiesByState: Record<string, string[]>;
  propertyTypes: string[];
  bedrooms: number[];
};

/* ----------------------------- utils ----------------------------- */
const formatCurrency = (value?: number | null) => {
  if (value == null) return "—";
  if (value >= 1e7) return `₹${(value / 1e7).toFixed(1)} Cr`;
  if (value >= 1e5) return `₹${(value / 1e5).toFixed(1)} L`;
  return `₹${value.toLocaleString()}`;
};

function normalizeProperty(raw: any): UiProperty {
  const isRes = !!raw?.location || !!raw?.price || !!raw?.media;
  const id = raw?.id;

  const city = isRes ? raw.location?.city : raw?.city;
  const state = isRes ? raw.location?.state : raw?.state;
  const locTxt = [city, state].filter(Boolean).join(", ") || raw?.locality || "—";

  const title = raw?.title || raw?.project_name || "Untitled";
  const subtitle = [raw?.project_name, raw?.builder_name].filter(Boolean).join(" • ") || raw?.builder_name || "";

  const mediaMain = isRes ? raw.media?.main_image : (raw?.primary_image_url ?? raw?.main_image_path);
  const gallery = isRes ? raw.media?.gallery : raw?.gallery_paths;

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

function extractArray(data: any): any[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.properties)) return data.properties;
  return [];
}

function normalizeFiltersPayload(payload: any): FilterOptions {
  const states = Array.isArray(payload?.states) ? payload.states : [];
  let citiesByState: Record<string, string[]> = {};
  const cbs = payload?.cities_by_state;
  if (cbs && typeof cbs === "object") {
    Object.entries(cbs).forEach(([stateName, arr]) => {
      citiesByState[stateName] = Array.isArray(arr) ? (arr as string[]) : [];
    });
  }
  let propertyTypes: string[] = [];
  const pts = payload?.property_types;
  if (Array.isArray(pts)) {
    propertyTypes = pts.map((pt: any) => (typeof pt === "string" ? pt : (pt?.name ?? ""))).filter(Boolean);
  } else if (pts && typeof pts === "object") {
    propertyTypes = Object.keys(pts);
  }
  const bedrooms = Array.isArray(payload?.bedrooms) && payload.bedrooms.length
    ? payload.bedrooms
    : [1,2,3,4,5,6,7,8,9,10];

  return { states, citiesByState, propertyTypes, bedrooms };
}

/* ----------------------------- page ----------------------------- */
export default function Marketplace() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<UiProperty[]>([]);
  const [error, setError] = useState<string>("");

  const [opts, setOpts] = useState<FilterOptions>({
    states: [], citiesByState: {}, propertyTypes: [], bedrooms: [],
  });

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
    priceRange: [DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE],
    minBedrooms: DEFAULT_MIN_BED,
    maxBedrooms: DEFAULT_MAX_BED,
    hasLoan: false,
    hasNoc: false,
  });

  const [filterOpen, setFilterOpen] = useState(false);

  // Load filter options once
  useEffect(() => {
    (async () => {
      try {
        const url = `${API_V1}/properties/filters`;
        group(`FETCH filters → ${url}`, () => {});
        const { data: payload } = await API.get("v1/properties/filters");
        group("Filters raw payload", () => log(payload));
        const normalized = normalizeFiltersPayload(payload);
        setOpts(normalized);
        group("Filters normalized", () => log(normalized));
      } catch (err) {
        console.error("Failed to fetch filters:", err);
        setOpts({
          states: [],
          citiesByState: {},
          propertyTypes: [],
          bedrooms: [1,2,3,4,5,6,7,8,9,10],
        });
      }
    })();
  }, []);

  /** URL → initial filters & search (runs once on mount) */
  useEffect(() => {
    const cityFromUrl = searchParams.get("city") || "";
    const qFromUrl = searchParams.get("q") || "";

    if (cityFromUrl || qFromUrl) {
      setFilters((f) => ({ ...f, city: cityFromUrl }));
      setSearch(qFromUrl);

      // Optional smart: if q contains "Xbhk" set bedroom range to X
      const m = qFromUrl.toLowerCase().match(/(\d+)\s*bhk/);
      if (m) {
        const bhk = Math.max(0, Math.min(20, Number(m[1])));
        setFilters((f) => ({ ...f, minBedrooms: bhk, maxBedrooms: bhk }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Keep URL in sync when city/search change */
  useEffect(() => {
    const p = new URLSearchParams();
    if (filters.city) p.set("city", filters.city);
    if (search.trim()) p.set("q", search.trim());
    setSearchParams(p, { replace: true });
  }, [filters.city, search, setSearchParams]);

  /** Build server-side query params WITHOUT applying defaults */
  const buildParams = () => {
    const p = new URLSearchParams();

    if (search) p.set("q", search);
    if (filters.service) p.set("service", String(filters.service));
    if (filters.propertyType) p.set("property_type", filters.propertyType);
    if (filters.state) p.set("state", filters.state);
    if (filters.city) p.set("city", filters.city);

    const [minP, maxP] = filters.priceRange;
    if (minP !== DEFAULT_MIN_PRICE) p.set("price_min", String(minP));
    if (maxP !== DEFAULT_MAX_PRICE) p.set("price_max", String(maxP));

    if (filters.minBedrooms !== DEFAULT_MIN_BED) p.set("min_bedrooms", String(filters.minBedrooms));
    if (filters.maxBedrooms !== DEFAULT_MAX_BED) p.set("max_bedrooms", String(filters.maxBedrooms));

    const mapSort = (val: string) => {
      switch (val) {
        case "price-low": return "price";
        case "price-high": return "-price";
        case "oldest": return "created_at";
        case "newest":
        default: return "-created_at";
      }
    };
    p.set("sort", mapSort(sortBy));
    p.set("per_page", "24");

    group('Query params (what we will send)', () => log(Object.fromEntries(p.entries())));
    return p;
  };

  // Fetch data whenever filters/search/sort change
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError("");

        const paramsObj = Object.fromEntries(buildParams());
        const url = `${API_V1}/properties`;
        group(`FETCH properties → ${url}`, () => log(paramsObj));

        const { data: payload } = await API.get("v1/properties", { params: paramsObj });

        group("Properties raw payload", () => log(payload));

        const arr = extractArray(payload);
        const normalized = arr.map(normalizeProperty);

        group(`Normalized items (${normalized.length})`, () =>
          console.table(
            normalized.map((p) => ({
              id: p.id,
              title: p.title,
              service: p.service,
              city: p.city,
              state: p.state,
              mainImage: p.mainImage || "(none)",
              galleryCount: p.gallery?.length || 0,
              priceActual: p.priceActual,
            }))
          )
        );

        if (alive) setItems(normalized);
      } catch (e: any) {
        let msg = "Something went wrong. Please adjust filters.";
        const status = e?.response?.status;
        if (status === 422) msg = "Invalid filters. Please adjust and try again.";
        else if (e?.message) msg = e.message;
        console.error("FETCH properties failed:", e);
        if (alive) setError(msg);
      } finally {
        if (alive) setLoading(false);
        group("Fetch complete snapshot", () => {
          log("filters:", filters);
          log("search:", search);
          log("sortBy:", sortBy);
        });
      }
    })();
    return () => { alive = false; };
  }, [
    search,
    filters.service,
    filters.propertyType,
    filters.state,
    filters.city,
    filters.priceRange[0],
    filters.priceRange[1],
    filters.minBedrooms,
    filters.maxBedrooms,
    sortBy,
  ]);

  /* ---------------- derived & client-side fallbacks ---------------- */
  const filtered = useMemo(() => {
    let list = items.slice();

    if (filters.hasLoan) list = list.filter((p: any) => p?.loan_available ?? true);
    if (filters.hasNoc) list = list.filter((p: any) => p?.noc_available ?? true);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.subtitle ?? "").toLowerCase().includes(q) ||
        p.locationText.toLowerCase().includes(q) ||
        (p.propertyType ?? "").toLowerCase().includes(q)
      );
    }

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

  const statusChip = (s?: string | null) => {
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
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl p-5 bg-white/5 backdrop-blur border border-white/15 text-white">
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
                <Input
                  placeholder="Search by title, city, type…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="text-sm text-muted-foreground whitespace-nowrap">
                {loading ? "Loading…" : `${filtered.length} results`}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <Button variant="outline" size="sm" onClick={() => setFilterOpen(true)} className="lg:hidden">
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
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                opts={opts}
                onClose={undefined}
              />
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
                        <Bar dataKey="price" fill="#22c55e" radius={[4, 4, 0, 0]} />
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
                          {categoriesData.map((entry, i) => (<Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />))}
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
                          src={
                            p.mainImage
                              ? (
                                /^https?:\/\//i.test(p.mainImage)
                                  ? p.mainImage
                                  : (() => {
                                    const imgPath = (p.mainImage || "").replace(/^\/+/, "");
                                    const finalPath = imgPath.startsWith("storage/") ? imgPath : `storage/${imgPath}`;
                                    return `${API_ORIGIN}/${finalPath}`;
                                  })()
                              )
                              : PLACEHOLDER_IMG
                          }
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            console.warn("Image failed:", p.id, p.mainImage);
                            (e.currentTarget as HTMLImageElement).onerror = null;
                            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG;
                          }}
                        />
                        {p.status && <Badge className={`absolute top-3 right-3 ${statusChip(p.status)}`}>{p.status}</Badge>}
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
                              <Badge key={`${p.id}-amenity-${i}`} variant="secondary" className="text-xs">{String(h)}</Badge>
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
                  <div className="absolute top-6 left-6"><Building2 className="h-16 w-16" /></div>
                  <div className="absolute bottom-6 right-6"><Building2 className="h-20 w-20" /></div>
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
                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  opts={opts}
                  onClose={() => setFilterOpen(false)}
                />
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
            {["rent","lease","mortgage","resale","new"].map((svc) => (
              <SelectItem key={`svc-${svc}`} value={svc}>{svc.charAt(0).toUpperCase() + svc.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Property Type</h4>
        <Select
          value={filters.propertyType || "any"}
          onValueChange={(v) => setFilters(f => ({ ...f, propertyType: v === "any" ? "" : v }))}
          disabled={!opts.propertyTypes || opts.propertyTypes.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {opts.propertyTypes.map((name, i) => (
              <SelectItem key={`ptype-${i}`} value={name}>{name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-6" />

      {/* Location */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Location</h4>

        {/* State */}
        <Select
          value={filters.state || "any"}
          onValueChange={(v) => setFilters(f => ({ ...f, state: v === "any" ? "" : v, city: "" }))}
          disabled={!opts.states || opts.states.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {opts.states.map((state, idx) => (
              <SelectItem key={`state-${idx}`} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City */}
        <Select
          value={filters.city || "any"}
          onValueChange={(v) => setFilters(f => ({ ...f, city: v === "any" ? "" : v }))}
          disabled={!filters.state || !(opts.citiesByState[filters.state]?.length)}
        >
          <SelectTrigger className="mt-3">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {(opts.citiesByState[filters.state] || []).map((city, idx) => (
              <SelectItem key={`city-${idx}`} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-6" />

      {/* Price */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(v) => setFilters(f => ({ ...f, priceRange: v as [number, number] }))}
            max={5_00_00_000} min={0} step={50_000} className="mb-3"
          />
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
        <Select
          value={filters.minBedrooms === 0 ? "any" : String(filters.minBedrooms)}
          onValueChange={(v) => setFilters(f => ({ ...f, minBedrooms: v === "any" ? 0 : Number(v) }))}
          disabled={opts.bedrooms.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Bedrooms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {opts.bedrooms.map((b) => (
              <SelectItem key={`bed-${b}`} value={String(b)}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-6" />

      {/* Legal */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Legal</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={filters.hasLoan}
              onCheckedChange={(c) => setFilters(f => ({ ...f, hasLoan: !!c }))}
            />
            <span className="text-sm">Loan Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={filters.hasNoc}
              onCheckedChange={(c) => setFilters(f => ({ ...f, hasNoc: !!c }))}
            />
            <span className="text-sm">NOC Available</span>
          </div>
        </div>
      </div>

      <Button className="w-full" variant="hero" onClick={onClose}>Apply Filters</Button>
    </div>
  );
}
