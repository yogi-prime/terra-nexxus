import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "@/api/api";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  MapPin,
  Building2,
  ChevronRight,
  BadgeCheck,
  Share2,
  Heart,
  ArrowLeft,
  Phone,
  Mail,
  FileText,
  Play,
  Pause,
} from "lucide-react";

/* ----------------------------- helpers ----------------------------- */
const cn = (...s: (string | false | undefined)[]) => s.filter(Boolean).join(" ");
const NA = "N/A";
const currency = (n?: number | string) =>
  n === undefined || n === null || n === "" ? NA : `₹ ${Number(n).toLocaleString("en-IN")}`;
const area = (n?: number | string) => (n === undefined || n === null || n === "" ? NA : `${n} sq.ft`);
const pct = (n?: number | string) => (n === undefined || n === null || n === "" ? NA : `${n}%`);
const has = (v: any) => !(v === undefined || v === null || v === "");

/* ----------------------------- types ----------------------------- */
export type AdminProperty = {
  id: number;
  service: "rent" | "lease" | "mortgage" | "buy";
  property_type: string;

  title: string;
  description: string;

  // location
  country?: string;
  state?: string;
  city?: string;
  locality?: string;
  address_line?: string;
  pincode?: string;
  latitude?: string | number;
  longitude?: string | number;
  google_map_link?: string;

  // size/layout
  super_area_sqft?: number | string;
  carpet_area_sqft?: number | string;
  builtup_area_sqft?: number | string;
  plot_area_sqft?: number | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  balconies?: number | string;
  furnishing?: string;
  kitchen_type?: string;
  floor_no?: string;
  total_floors?: string;
  facing?: string;
  parking_open?: number | string;
  parking_covered?: number | string;

  // pricing/tenure
  price_min?: number | string;
  price_max?: number | string;
  price_actual?: number | string;
  price_per_sqft?: number | string;

  expected_rent?: number | string;
  security_deposit?: number | string;
  maintenance_monthly?: number | string;
  maintenance_type?: string;
  price_negotiable?: boolean;

  mortgage_amount?: number | string;
  interest_rate?: number | string;
  mortgage_tenure_months?: number | string;
  lease_duration_months?: number | string;

  // amenities & legal
  amenities?: string[];
  noc_available?: boolean;
  loan_available?: boolean;
  occupancy_certificate?: boolean;
  completion_certificate?: boolean;

  // media
  main_image_path?: string | null;
  gallery_paths?: string[] | null;
  document_paths?: string[] | null;
  video_url?: string;
  virtual_tour_url?: string;

  // contact/status
  listed_by?: string;
  owner_name?: string;
  owner_phone?: string;
  owner_email?: string;
  available_from?: string;
  status?: string;

  // project
  project_name?: string;
  builder_name?: string;
  rera_id?: string;

  // type-specific extras
  hotel_room_count?: number | string;
  hotel_star_rating?: string | number;
  dock_count?: number | string;
  eaves_height_ft?: number | string;
  floor_loading_ton?: number | string;
  soil_type?: string;
  irrigation?: string;
  frontage_ft?: number | string;
  depth_ft?: number | string;
  workstations?: number | string;
  cabins?: number | string;
  conference_rooms?: number | string;
  pantry?: boolean;
  washroom_inside?: boolean;

  // seo (if you later use)
  meta_title?: string;
  meta_description?: string;

  created_at?: string;
  updated_at?: string;
};

/* -------------------------- small building blocks -------------------------- */
function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-600 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}

function KeyRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
      <span className="text-slate-600 text-sm">{label}</span>
      <span className="text-slate-900 text-sm font-medium">{value ?? NA}</span>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700">
      {children}
    </span>
  );
}

/* ---------------------------- Gallery (sexy) ---------------------------- */
function Gallery({ images, height = 520 }: { images: string[]; height?: number }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const progRef = useRef<HTMLDivElement>(null);
  const SHOT = 3000;

  // autoplay
  useEffect(() => {
    if (!playing || images.length <= 1) return;
    const t = setInterval(() => setActive((n) => (n + 1) % images.length), SHOT);
    return () => clearInterval(t);
  }, [playing, images.length]);

  // progress reset
  useEffect(() => {
    if (!progRef.current) return;
    const el = progRef.current;
    el.style.transition = "none";
    el.style.width = "0%";
    requestAnimationFrame(() => {
      el.style.transition = `width ${SHOT}ms linear`;
      el.style.width = playing ? "100%" : "0%";
    });
  }, [active, playing]);

  if (!images?.length) return <div className="h-96 w-full rounded-2xl bg-slate-100 grid place-items-center">No image</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      {/* Main image */}
      <div
        className="relative flex-1 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center"
        style={{ height }}
      >
        <img src={images[active]} alt={`slide-${active}`} className="w-full h-full object-cover" />

        {/* bottom strip */}
        <div
          className="absolute bottom-0 left-0 w-full flex items-center pr-12" // pr-12 = margin for play/pause
          style={{ height: Math.round(height * 0.1), background: "rgba(255,255,255,0.3)" }}
        >
          {/* progress track */}
          <div className="relative mx-3 w-full h-2 rounded-full overflow-hidden bg-white/50 border border-white/60">
            <div
              ref={progRef}
              className="h-full w-0 rounded-full"
              style={{
                background: "linear-gradient(90deg,#22c55e 0%,#84cc16 50%,#facc15 100%)",
              }}
            />
          </div>

          {/* play/pause */}
          <button
            onClick={() => setPlaying((p) => !p)}
            className="absolute right-3 bottom-2 p-2 rounded-full backdrop-blur bg-white/70 hover:bg-white shadow"
          >
            {playing ? <Pause className="w-4 h-4 text-slate-800" /> : <Play className="w-4 h-4 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Right thumbnails (equal width, cover, centered) */}
<div className="lg:w-28 lg:h-[520px] overflow-y-auto custom-scroll pr-1">
  {images.map((src, i) => (
    <button
      key={i}
      onClick={() => setActive(i)}
      className="relative block w-full aspect-square rounded-xl overflow-hidden border-2 border-slate-200 mb-2"
      // border-2 is constant -> size never shifts
    >
      {/* absolute img fills and centers */}
      <img
        src={src}
        alt={`thumb-${i}`}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Active highlight as overlay ring (no layout shift) */}
      {active === i && (
        <span className="pointer-events-none absolute inset-0 rounded-[14px] ring-2 ring-green-500" />
      )}
    </button>
  ))}
</div>

<style>{`
  /* thin, gradient scrollbar */
  .custom-scroll{
    scrollbar-gutter: stable; /* avoids width jump when scrollbar appears (supported modern Chromium) */
  }
  .custom-scroll::-webkit-scrollbar{
    width:2px;
  }
  .custom-scroll::-webkit-scrollbar-track{
    background: transparent;
  }
  .custom-scroll::-webkit-scrollbar-thumb{
    background: linear-gradient(180deg,#22c55e,#84cc16,#facc15);
    border-radius:9999px;
  }
`}</style>

    </div>
  );
}


/* ---------------------------- Page ---------------------------- */
export default function PropertyShow() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<AdminProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");
  const [similar, setSimilar] = useState<AdminProperty[]>([]);

  // similar fetch when main loaded
  useEffect(() => {
    if (!data?.id) return;
    (async () => {
      try {
        const res = await API.get(`/admin-properties/${data.id}/similar`, { params: { limit: 6 } });
        const list: AdminProperty[] = res?.data?.data || [];
        setSimilar(list);
      } catch {
        setSimilar([]);
      }
    })();
  }, [data?.id]);

  // load property
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await API.get(`/admin-properties/${id}`);
        const payload: AdminProperty | undefined = res?.data?.data;
        if (!mounted) return;
        if (!payload) {
          navigate("/404", { replace: true });
          return;
        }
        setData(payload);
      } catch (e: any) {
        if (!mounted) return;
        const status = e?.response?.status;
        if (status === 404) {
          navigate("/404", { replace: true });
          return;
        }
        setErr(e?.response?.data?.message || "Failed to load property.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id, navigate]);

  const priceBlock = useMemo(() => {
    if (!data) return null;
    const s = data.service;
    if (s === "rent") {
      return [
        { k: "Rent (per month)", v: currency(data.price_actual || data.expected_rent) },
        { k: "Security Deposit", v: currency(data.security_deposit) },
        {
          k: "Maintenance",
          v:
            data.maintenance_monthly || data.maintenance_type
              ? `${currency(data.maintenance_monthly)} ${data.maintenance_type ? `(${data.maintenance_type})` : ""}`
              : NA,
        },
        { k: "Negotiable", v: data.price_negotiable ? "Yes" : "No" },
      ];
    }
    if (s === "buy") {
      return [
        { k: "Min Price", v: currency(data.price_min) },
        { k: "Max Price", v: currency(data.price_max) },
        { k: "Actual Price", v: currency(data.price_actual) },
        { k: "Price / sq.ft", v: currency(data.price_per_sqft) },
        { k: "Negotiable", v: data.price_negotiable ? "Yes" : "No" },
      ];
    }
    if (s === "mortgage") {
      return [
        { k: "Mortgage Amount", v: currency(data.mortgage_amount) },
        { k: "Interest Rate", v: pct(data.interest_rate) },
        { k: "Tenure", v: data.mortgage_tenure_months ? `${data.mortgage_tenure_months} months` : NA },
      ];
    }
    // lease
    return [
      { k: "Min Price", v: currency(data.price_min) },
      { k: "Max Price", v: currency(data.price_max) },
      { k: "Actual Price", v: currency(data.price_actual) },
      { k: "Lease Duration", v: data.lease_duration_months ? `${data.lease_duration_months} months` : NA },
    ];
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="animate-pulse text-slate-700">Loading property…</div>
      </div>
    );
  }
  if (err) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-rose-600">{err}</div>
      </div>
    );
  }
  if (!data) return null;

  const images: string[] = [
    ...(data.main_image_path ? [data.main_image_path] : []),
    ...(data.gallery_paths || []),
  ];

  /* ---------------------------- UI ---------------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header />

      {/* HERO + breadcrumb */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/properties" className="hover:underline">Properties</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-700">{data.city || NA}</span>
          </div>

          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{data.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {data.locality ? `${data.locality}, ` : ""}{data.city || NA}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {data.property_type?.replaceAll("_", " ") || NA}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                    data.service === "rent" && "bg-emerald-50 text-emerald-700 border border-emerald-200",
                    data.service === "buy" && "bg-indigo-50 text-indigo-700 border border-indigo-200",
                    data.service === "lease" && "bg-amber-50 text-amber-700 border border-amber-200",
                    data.service === "mortgage" && "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200"
                  )}
                >
                  <BadgeCheck className="h-3.5 w-3.5" />
                  {data.service?.toUpperCase?.() || NA}
                </span>
                {data.rera_id && (
                  <span className="rounded-full bg-slate-100 text-slate-700 px-2 py-0.5 text-xs">
                    RERA: {data.rera_id}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:bg-slate-50">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:bg-slate-50">
                <Heart className="h-4 w-4" />
              </button>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery + Content */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        {/* GALLERY (upgraded) */}
        <Gallery images={images} height={520} />

        {/* body */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* pricing by service */}
            <Card title="Pricing & Terms" subtitle="Auto-adjusts by service type.">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {priceBlock?.map((row) => (
                  <KeyRow key={row.k} label={row.k} value={row.v} />
                ))}
              </div>
              {data.service === "mortgage" && (
                <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm text-slate-600">
                  * Indicative values. Final terms subject to lender verification.
                </div>
              )}
            </Card>

            <Card
              title="About this Property"
              subtitle={data.project_name ? `${data.project_name} • ${data.builder_name || ""}` : undefined}
            >
              <p className="text-slate-700 leading-relaxed">{data.description || NA}</p>
            </Card>

            {/* Property Facts (show what's provided) */}
            <Card title="Property Facts">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <KeyRow label="Furnishing" value={data.furnishing || NA} />
                <KeyRow label="Kitchen Type" value={data.kitchen_type || NA} />
                <KeyRow label="Facing" value={data.facing || NA} />
                <KeyRow label="Floor / Total Floors" value={
                  has(data.floor_no) || has(data.total_floors) ? `${data.floor_no || "-"} / ${data.total_floors || "-"}` : NA
                } />
                <KeyRow label="Parking (Open)" value={has(data.parking_open) ? String(data.parking_open) : NA} />
                <KeyRow label="Parking (Covered)" value={has(data.parking_covered) ? String(data.parking_covered) : NA} />
                <KeyRow label="Available From" value={data.available_from || NA} />
                <KeyRow label="Pincode" value={data.pincode || NA} />
              </div>
            </Card>

            {/* size & layout */}
            <Card title="Size & Layout">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <Fact label="Super Area" value={area(data.super_area_sqft)} />
                <Fact label="Carpet Area" value={area(data.carpet_area_sqft)} />
                <Fact label="Built-up Area" value={area(data.builtup_area_sqft)} />
                {has(data.plot_area_sqft) && <Fact label="Plot Area" value={area(data.plot_area_sqft)} />}
                <Fact label="Bedrooms" value={String(data.bedrooms ?? NA)} />
                <Fact label="Bathrooms" value={String(data.bathrooms ?? NA)} />
                <Fact label="Balconies" value={String(data.balconies ?? NA)} />
              </div>
            </Card>

            {/* Type-specific extras */}
            {(has(data.hotel_room_count) ||
              has(data.hotel_star_rating) ||
              has(data.dock_count) ||
              has(data.eaves_height_ft) ||
              has(data.floor_loading_ton) ||
              has(data.soil_type) ||
              has(data.irrigation) ||
              has(data.frontage_ft) ||
              has(data.depth_ft) ||
              has(data.workstations) ||
              has(data.cabins) ||
              has(data.conference_rooms) ||
              has(data.pantry) ||
              has(data.washroom_inside)) && (
              <Card title="Type-Specific Extras">
                <div className="flex flex-wrap gap-2">
                  {has(data.hotel_room_count) && <Chip>Hotel Rooms: {data.hotel_room_count}</Chip>}
                  {has(data.hotel_star_rating) && <Chip>Hotel Rating: {data.hotel_star_rating}</Chip>}
                  {has(data.dock_count) && <Chip>Docks: {data.dock_count}</Chip>}
                  {has(data.eaves_height_ft) && <Chip>Eaves Height: {data.eaves_height_ft} ft</Chip>}
                  {has(data.floor_loading_ton) && <Chip>Floor Loading: {data.floor_loading_ton} ton</Chip>}
                  {has(data.soil_type) && <Chip>Soil: {data.soil_type}</Chip>}
                  {has(data.irrigation) && <Chip>Irrigation: {data.irrigation}</Chip>}
                  {has(data.frontage_ft) && <Chip>Frontage: {data.frontage_ft} ft</Chip>}
                  {has(data.depth_ft) && <Chip>Depth: {data.depth_ft} ft</Chip>}
                  {has(data.workstations) && <Chip>Workstations: {data.workstations}</Chip>}
                  {has(data.cabins) && <Chip>Cabins: {data.cabins}</Chip>}
                  {has(data.conference_rooms) && <Chip>Conf. Rooms: {data.conference_rooms}</Chip>}
                  {has(data.pantry) && <Chip>Pantry: {data.pantry ? "Yes" : "No"}</Chip>}
                  {has(data.washroom_inside) && <Chip>Washroom Inside: {data.washroom_inside ? "Yes" : "No"}</Chip>}
                </div>
              </Card>
            )}

            {/* amenities */}
            <Card title="Amenities">
              <div className="flex flex-wrap gap-2">
                {data.amenities?.length ? (
                  data.amenities.map((a, i) => <Chip key={i}>{a}</Chip>)
                ) : (
                  <span className="text-slate-500 text-sm">{NA}</span>
                )}
              </div>
            </Card>

            {/* legal & docs */}
            <Card title="Legal & Compliance">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-700">
                <Bool item="NOC" yes={!!data.noc_available} />
                <Bool item="Occupancy Certificate" yes={!!data.occupancy_certificate} />
                <Bool item="Completion Certificate" yes={!!data.completion_certificate} />
                <Bool item="Loan Available" yes={!!data.loan_available} />
              </ul>

              {!!data.document_paths?.length && (
                <div className="mt-4">
                  <div className="text-sm font-medium text-slate-900 mb-2">Documents</div>
                  <div className="flex flex-wrap gap-2">
                    {data.document_paths!.map((d, i) => (
                      <a
                        key={i}
                        href={d}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <FileText className="h-4 w-4" />
                        Doc {i + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* map/video/tour */}
            {(data.google_map_link || data.video_url || data.virtual_tour_url) && (
              <Card title="Location & Media">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.google_map_link && (
                    <iframe
                      className="w-full h-72 rounded-xl border"
                      src={data.google_map_link.replace("view?", "embed?")}
                      loading="lazy"
                    />
                  )}
                  {(data.video_url || data.virtual_tour_url) && (
                    <a
                      href={data.video_url || data.virtual_tour_url!}
                      target="_blank"
                      rel="noreferrer"
                      className="group grid place-items-center rounded-xl border border-slate-200 bg-slate-50 h-72 hover:bg-slate-100"
                    >
                      <Play className="h-10 w-10 text-slate-600 group-hover:scale-105 transition" />
                      <div className="mt-2 text-sm text-slate-700">Open Video / Virtual Tour</div>
                    </a>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* right column */}
          <div className="space-y-6">
            <Card title="Contact">
              <div className="text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <KeyRow label="Listed By" value={data.listed_by || NA} />
                  <KeyRow label="Status" value={data.status || NA} />
                </div>
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="font-medium text-slate-900">{data.owner_name || NA}</div>
                  <div className="mt-1 flex items-center gap-2 text-slate-700">
                    <Phone className="h-4 w-4" /> {data.owner_phone || NA}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-slate-700">
                    <Mail className="h-4 w-4" /> {data.owner_email || NA}
                  </div>
                </div>
              </div>
            </Card>

            {similar.length > 0 && (
              <Card title="Similar Properties">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {similar.map((p) => (
                    <Link
                      key={p.id}
                      to={`/property-show/${p.id}`}
                      className="rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition"
                    >
                      <div className="h-28 bg-slate-100">
                        {(p.main_image_path || p.gallery_paths?.[0]) ? (
                          <img
                            src={p.main_image_path || p.gallery_paths![0]}
                            alt={p.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full grid place-items-center text-xs text-slate-500">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="font-medium text-slate-900 text-sm truncate">{p.title}</div>
                        <div className="text-xs text-slate-600 mt-1">{p.city || NA}</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {p.property_type?.replaceAll("_", " ") || NA}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------------------------- bullets/helpers ---------------------------- */
function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm font-medium text-slate-900 mt-0.5">{value ?? NA}</div>
    </div>
  );
}

function Bool({ item, yes }: { item: string; yes: boolean }) {
  return (
    <li className="inline-flex items-center gap-2">
      <span
        className={cn(
          "inline-block h-2 w-2 rounded-full",
          yes ? "bg-emerald-500" : "bg-slate-300"
        )}
      />
      {item} {yes ? "Available" : "Not available"}
    </li>
  );
}
