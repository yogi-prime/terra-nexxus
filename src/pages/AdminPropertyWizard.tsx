// src/pages/AdminPropertyWizardVertical.tsx
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import API from "@/api/api";

import {
  Building2,
  Home,
  Factory,
  Warehouse,
  MapPin,
  Ruler,
  IndianRupee,
  ShieldCheck,
  Images,
  Settings2,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Info,
} from "lucide-react";

/* ---------------------------------- UI ---------------------------------- */
function Toast({
  open,
  title,
  subtitle,
  onClose,
}: {
  open: boolean;
  title?: string;
  subtitle?: string;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed right-4 bottom-4 z-[60]">
      <div className="rounded-xl bg-slate-900 text-white shadow-lg px-4 py-3 max-w-sm">
        <div className="font-medium">{title}</div>
        {subtitle && <div className="text-sm text-slate-300 mt-0.5">{subtitle}</div>}
        <button onClick={onClose} className="mt-2 text-xs underline">
          Dismiss
        </button>
      </div>
    </div>
  );
}

function ErrorBanner({ list }: { list: string[] }) {
  if (!list?.length) return null;
  return (
    <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 p-3">
      <div className="font-medium">Please fix the following:</div>
      <ul className="mt-1 list-disc pl-5 text-sm">
        {list.slice(0, 6).map((m, i) => (
          <li key={i}>{m}</li>
        ))}
        {list.length > 6 && <li>…and {list.length - 6} more</li>}
      </ul>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  required,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-rose-600"> *</span>}
        </label>
        {error && <span className="text-xs text-rose-600">{error}</span>}
      </div>
      <div className={error ? "rounded-xl ring-1 ring-rose-300 p-0.5" : ""}>
        {children}
      </div>
    </div>
  );
}
function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
}: {
  value: any;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type={type}
      value={value ?? ""}
      min={min as any}
      max={max as any}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 focus:shadow-sm"
    />
  );
}
function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: any;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-300 focus:shadow-sm"
    />
  );
}
function Select({
  value,
  onChange,
  children,
}: {
  value: any;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-slate-300 focus:shadow-sm"
    >
      <option value="">Select...</option>
      {children}
    </select>
  );
}
function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="rounded-xl bg-slate-900 p-2 text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-600 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ------------------------------ Constants ------------------------------ */
const SERVICE_OPTIONS = [
  { value: "rent", label: "Rent" },
  { value: "lease", label: "Lease" },
  { value: "mortgage", label: "Mortgage" },
  { value: "resale", label: "Resale" },
  { value: "new", label: "New Sale" },
];

const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment/Flat", icon: Home },
  { value: "independent_house", label: "Independent House/Villa", icon: Home },
  { value: "studio", label: "Studio", icon: Home },
  { value: "residential_plot", label: "Residential Plot", icon: Building2 },
  { value: "commercial_plot", label: "Commercial Plot", icon: Building2 },
  { value: "office", label: "Office / Co-working", icon: Building2 },
  { value: "retail_shop", label: "Retail / Showroom", icon: Building2 },
  { value: "warehouse", label: "Warehouse / Godown", icon: Warehouse },
  { value: "industrial_shed", label: "Industrial Shed / Factory", icon: Factory },
  { value: "land_agricultural", label: "Agricultural Land / Farm", icon: Factory },
  { value: "hotel", label: "Hotel / Guest House", icon: Building2 },
  { value: "hospital", label: "Hospital / Clinic", icon: Building2 },
  { value: "school", label: "School / College", icon: Building2 },
  { value: "others", label: "Others", icon: Settings2 },
];

const AMENITIES_ALL = [
  "Power Backup",
  "Lift",
  "24x7 Security",
  "CCTV",
  "Fire Safety",
  "Intercom",
  "Gas Pipeline",
  "Wi-Fi",
  "Wheelchair Accessible",
  "Gated Community",
  "Club House",
  "Gym",
  "Swimming Pool",
  "Kids' Play Area",
  "Park/Garden",
  "Indoor Games",
  "Jogging Track",
  "Temple",
];

const initialState: any = {
  service: "",
  property_type: "",

  title: "",
  project_name: "",
  builder_name: "",
  rera_id: "",
  description: "",

  country: "India",
  state: "",
  city: "",
  locality: "",
  address_line: "",
  pincode: "",
  latitude: "",
  longitude: "",
  google_map_link: "",

  // NEW: single size text (old granular sizes removed)
  size_sqft_text: "",

  bedrooms: "",
  bathrooms: "",
  balconies: "",
  furnishing: "",
  kitchen_type: "",
  floor_no: "",
  total_floors: "",
  facing: "",
  parking_open: "",
  parking_covered: "",

  // Project meta
  tower_count: "",
  total_units: "",

  price_min: "",
  price_max: "",
  price_actual: "",
  price_per_sqft: "",
  expected_rent: "",
  security_deposit: "",
  maintenance_monthly: "",
  maintenance_type: "",
  price_negotiable: false,
  mortgage_amount: "",
  interest_rate: "",
  mortgage_tenure_months: "",
  lease_duration_months: "",

  amenities: [],

  noc_available: false,
  loan_available: false,
  occupancy_certificate: false,
  completion_certificate: false,
  documents: [],

  main_image: null,
  gallery: [],
  video_url: "",
  virtual_tour_url: "",

  // NEW media
  brochure: null,
  site_plan: null,
  flat_plans: [],

  nearby: [],       // <--- ADD THIS
  extra_json: {},   // <--- for future proof extras

  meta_title: "",
  meta_description: "",

  owner_name: "",
  owner_phone: "",
  owner_email: "",
  listed_by: "",
  available_from: "",
  status: "draft",

  hotel_room_count: "",
  hotel_star_rating: "",
  dock_count: "",
  eaves_height_ft: "",
  floor_loading_ton: "",
  soil_type: "",
  irrigation: "",
  frontage_ft: "",
  depth_ft: "",
  workstations: "",
  cabins: "",
  conference_rooms: "",
  pantry: false,
  washroom_inside: false,
};

const steps = [
  { key: "classification", title: "Classification", icon: Settings2 },
  { key: "basic", title: "Basic Details", icon: Home },
  { key: "location", title: "Location", icon: MapPin },
  { key: "size", title: "Size & Layout", icon: Ruler },
  { key: "pricing", title: "Pricing & Tenure", icon: IndianRupee },
  { key: "amenities", title: "Amenities", icon: CheckCircle2 },
  { key: "legal", title: "Legal & Docs", icon: ShieldCheck },
  { key: "media", title: "Media", icon: Images },
  { key: "nearby", title: "Nearby", icon: MapPin },   // <-- NEW STEP
  { key: "seo", title: "SEO", icon: Info },
  { key: "contact", title: "Contact", icon: Building2 },
  { key: "review", title: "Review & Submit", icon: CheckCircle2 },
];

/* --------------------------------- Page --------------------------------- */
export default function AdminPropertyWizardVertical() {
  const [data, setData] = useState<any>(() => {
    const draft = localStorage.getItem("admin_prop_draft");
    if (!draft) return initialState;
    const saved = JSON.parse(draft);
    return { ...initialState, ...saved, main_image: null, gallery: [], documents: [], brochure: null, site_plan: null, flat_plans: [] };
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string[]>>({});
  const [toast, setToast] = useState<{ open: boolean; title?: string; subtitle?: string }>({
    open: false,
  });

  const fe = (name: string) => errors?.[name] || serverErrors?.[name]?.[0] || "";

  useEffect(() => {
    const { main_image, gallery, documents, brochure, site_plan, flat_plans, ...rest } = data;
    localStorage.setItem("admin_prop_draft", JSON.stringify(rest));
  }, [data, stepIndex]);

  const current = steps[stepIndex];
  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const prev = () => setStepIndex((i) => Math.max(i - 1, 0));
  const onChange = (name: string, value: any) => setData((d: any) => ({ ...d, [name]: value }));

  const toggleAmenity = (key: string) =>
    setData((d: any) => {
      const exists = d.amenities.includes(key);
      return { ...d, amenities: exists ? d.amenities.filter((a: string) => a !== key) : [...d.amenities, key] };
    });

  const handleFiles = (name: string, files: FileList | null, limit = 8) => {
    const arr = Array.from(files || []);
    setData((d: any) => ({ ...d, [name]: arr.slice(0, limit) }));
  };

  const validateStep = () => {
    const e: any = {};
    if (current.key === "classification") {
      if (!data.service) e.service = "Select service";
      if (!data.property_type) e.property_type = "Select property type";
    }
    if (current.key === "basic") {
      if (!data.title) e.title = "Title required";
      if (!data.description) e.description = "Add a short description";
    }
    if (current.key === "location") {
      if (!data.city) e.city = "City required";
      if (!data.address_line) e.address_line = "Address required";
    }
    if (current.key === "pricing") {
      const isSale = data.service === "resale" || data.service === "new";
      if (data.service === "rent" && !data.price_actual && !data.expected_rent)
        e.price_actual = "Rent required";
      if (isSale && !data.price_min && !data.price_actual)
        e.price_min = "Min price or Actual required";
      if (data.service === "lease" && !data.price_min && !data.price_actual)
        e.price_min = "Min price or Actual required";
      if (data.service === "mortgage" && !data.mortgage_amount)
        e.mortgage_amount = "Mortgage amount required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (validateStep()) next();
  };

  const resetDraft = () => {
    localStorage.removeItem("admin_prop_draft");
    setData(initialState);
    setStepIndex(0);
    setServerErrors({});
    setErrors({});
  };


  // Smart appender for FormData (skip empty, cast booleans)
const appendSmart = (form: FormData, key: string, val: any) => {
  if (val === undefined || val === null) return;

  const numericKeys = new Set([
    "bedrooms","bathrooms","balconies","parking_open","parking_covered",
    "price_min","price_max","price_actual","price_per_sqft","expected_rent",
    "security_deposit","maintenance_monthly","mortgage_amount","interest_rate",
    "mortgage_tenure_months","lease_duration_months","tower_count","total_units",
    "hotel_room_count","dock_count","eaves_height_ft","floor_loading_ton",
    "frontage_ft","depth_ft","workstations","cabins","conference_rooms",
  ]);
  const booleanKeys = new Set([
    "price_negotiable","noc_available","loan_available","occupancy_certificate",
    "completion_certificate","pantry","washroom_inside",
  ]);

  if (numericKeys.has(key)) {
    if (val === "" || Number.isNaN(Number(val))) return;
    form.append(key, String(val));
    return;
  }
  if (booleanKeys.has(key)) {
    form.append(key, val ? "1" : "0");
    return;
  }

  // files
  if (key === "main_image") { if (val) form.append("main_image", val as File); return; }
  if (key === "brochure")   { if (val) form.append("brochure",   val as File); return; }
  if (key === "site_plan")  { if (val) form.append("site_plan",  val as File); return; }

  // file arrays
  if (key === "gallery" && Array.isArray(val))  { val.forEach((f: File, i: number) => f && form.append(`gallery[${i}]`, f)); return; }
  if (key === "documents" && Array.isArray(val)){ val.forEach((f: File, i: number) => f && form.append(`documents[${i}]`, f)); return; }
  if (key === "flat_plans" && Array.isArray(val)){ val.forEach((f: File, i: number) => f && form.append(`flat_plans[${i}]`, f)); return; }

 // 1) amenities: array of strings -> amenities[0], amenities[1]...
if (key === "amenities" && Array.isArray(val)) {
  if (val.length) val.forEach((a: string, i: number) => form.append(`amenities[${i}]`, a));
  return;
}

// 2) nearby: array of objects -> nearby[0][title], nearby[0][description], nearby[0][distance]...
if (key === "nearby" && Array.isArray(val)) {
  val.forEach((item: any, i: number) => {
    if (item?.title !== undefined)       form.append(`nearby[${i}][title]`, String(item.title));
    if (item?.description !== undefined) form.append(`nearby[${i}][description]`, String(item.description));
    if (item?.distance !== undefined && item.distance !== "")
      form.append(`nearby[${i}][distance]`, String(item.distance));
    // agar aage "type" add karna ho:
    if (item?.type !== undefined)        form.append(`nearby[${i}][type]`, String(item.type));
  });
  return;
}

// 3) extra_json: object -> extra_json[key]=value (flat)
if (key === "extra_json" && typeof val === "object" && val) {
  Object.entries(val).forEach(([k, v]: any) => {
    if (v !== undefined && v !== null && String(v).trim() !== "")
      form.append(`extra_json[${k}]`, String(v));
  });
  return;
}
  if (typeof val === "string" && val.trim() === "") return;
  form.append(key, val as any);
};


  const submitForm = async () => {
    setServerErrors({});

    const form = new FormData();
    const payload = { ...data };
    if (payload.service === "rent" && payload.expected_rent && !payload.price_actual) {
      payload.price_actual = payload.expected_rent;
    }
    Object.entries(payload).forEach(([k, v]) => appendSmart(form, k, v));

    try {
      setSubmitting(true);
      const res = await API.post("/admin-properties", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setToast({ open: true, title: "Property saved", subtitle: `ID: ${res.data?.id}` });
      localStorage.removeItem("admin_prop_draft");
      setData(initialState);
      setStepIndex(0);
      setErrors({});
      setServerErrors({});
    } catch (err: any) {
      const status = err?.response?.status;
      const body = err?.response?.data;

      if (status === 422 && body?.errors) {
        setServerErrors(body.errors);
        const firstKey = Object.keys(body.errors)[0];
        const stepForField: Record<string, number> = {
  service: 0,
  property_type: 0,
  title: 1,
  description: 1,
  city: 2,
  address_line: 2,

  // size/meta
  size_sqft_text: 3,
  bedrooms: 3,
  bathrooms: 3,
  balconies: 3,
  parking_open: 3,
  parking_covered: 3,
  tower_count: 3,
  total_units: 3,

  // pricing
  price_min: 4,
  price_max: 4,
  price_actual: 4,
  expected_rent: 4,
  mortgage_amount: 4,
  interest_rate: 4,
  mortgage_tenure_months: 4,
  lease_duration_months: 4,

  // legal/media docs
  documents: 6,
  brochure: 6,
  site_plan: 6,
  flat_plans: 6,

  // media images
  main_image: 7,
  gallery: 7,

  // nearby
  nearby: 8,

  // seo
  meta_title: 9,
  meta_description: 9,

  // contact
  owner_email: 10,
  owner_phone: 10,
  owner_name: 10,
  listed_by: 10,
  available_from: 10,
  status: 10,
};

        if (firstKey in stepForField) setStepIndex(stepForField[firstKey]);

        setToast({
          open: true,
          title: "Please correct the highlighted fields",
          subtitle: `${Object.values(body.errors).flat().length} issues`,
        });
      } else {
        setToast({
          open: true,
          title: "Submit failed",
          subtitle: body?.message || `HTTP ${status || "ERR"}`,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isResidential = ["apartment", "independent_house", "studio"].includes(data.property_type);
  const isCommercial = [
    "office",
    "retail_shop",
    "warehouse",
    "industrial_shed",
    "factory",
    "hotel",
    "hospital",
    "school",
  ].includes(data.property_type);
  const isLand = ["residential_plot", "commercial_plot", "land_agricultural"].includes(
    data.property_type
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Header />

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-fuchsia-500 to-cyan-500" />
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Create Property</h1>
            <p className="text-slate-600 mt-1">
              Fill details step by step. All extra fields are optional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-0 border-t border-slate-100">
            <aside className="bg-slate-50/60 border-r border-slate-100 p-4 md:p-6 sticky top-0 self-start">
              <nav className="space-y-2">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  const active = i === stepIndex;
                  const done = i < stepIndex;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setStepIndex(i)}
                      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                        active
                          ? "bg-emerald-600 text-white shadow"
                          : done
                          ? "bg-white border border-emerald-200 text-emerald-700"
                          : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          active
                            ? "bg-white text-emerald-700"
                            : done
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium">{s.title}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="p-6 md:p-8">
              {/* Global server error banner */}
              <ErrorBanner list={Object.values(serverErrors).flat().filter(Boolean)} />

              <AnimatePresence mode="wait">
  <motion.div
    key={current.key}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.25 }}
  >
    {current.key === "classification" && (
      <Classification data={data} onChange={onChange} fe={fe} />
    )}
    {current.key === "basic" && (
      <BasicDetails data={data} onChange={onChange} fe={fe} />
    )}
    {current.key === "location" && (
      <Location data={data} onChange={onChange} fe={fe} />
    )}
    {current.key === "size" && (
      <SizeLayout
        data={data}
        onChange={onChange}
        isResidential={isResidential}
        isCommercial={isCommercial}
        isLand={isLand}
        fe={fe}
      />
    )}
    {current.key === "pricing" && (
      <PricingTenure data={data} onChange={onChange} fe={fe} />
    )}
    {current.key === "amenities" && (
      <Amenities data={data} toggleAmenity={toggleAmenity} />
    )}
    {current.key === "legal" && (
      <LegalDocs data={data} onChange={onChange} onFiles={handleFiles} />
    )}
    {current.key === "media" && (
      <MediaSection data={data} onChange={onChange} onFiles={handleFiles} />
    )}

    {/* 🔥 NEW: Nearby step */}
    {current.key === "nearby" && (
      <NearbySection data={data} onChange={onChange} />
    )}

    {current.key === "seo" && <SEOSection data={data} onChange={onChange} />}
    {current.key === "contact" && (
      <ContactSection data={data} onChange={onChange} />
    )}
    {current.key === "review" && <ReviewSubmit data={data} />}
  </motion.div>
</AnimatePresence>


              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    disabled={stepIndex === 0}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  <button
                    onClick={resetDraft}
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-rose-700 hover:bg-rose-100"
                  >
                    Reset Draft
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  {stepIndex < steps.length - 1 ? (
                    <button
                      onClick={goNext}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-white shadow hover:opacity-95"
                    >
                      Next <ChevronRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submitForm}
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 px-5 py-2 text-white shadow hover:opacity-95 disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>Submit Property</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Toast
        open={toast.open}
        title={toast.title}
        subtitle={toast.subtitle}
        onClose={() => setToast({ open: false })}
      />

      <Footer />
    </div>
  );
}

/* -------------------------------- Steps -------------------------------- */
function Classification({ data, onChange, fe }: any) {
  return (
    <div>
      <SectionTitle
        icon={Settings2}
        title="Choose Service & Property Type"
        subtitle="This will tailor the next steps to your needs."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Service" error={fe("service")} required>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {SERVICE_OPTIONS.map((o) => (
              <button
                key={o.value}
                onClick={() => onChange("service", o.value)}
                className={`rounded-xl border px-3 py-2 text-sm ${
                  data.service === o.value
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Property Type" error={fe("property_type")} required>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {PROPERTY_TYPES.map((t) => {
              const Icon = t.icon || Building2;
              const active = data.property_type === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => onChange("property_type", t.value)}
                  className={`group flex items-center gap-2 rounded-xl border px-3 py-2 text-left ${
                    active
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{t.label}</span>
                </button>
              );
            })}
          </div>
        </Field>
      </div>
    </div>
  );
}

function BasicDetails({ data, onChange, fe }: any) {
  return (
    <div>
      <SectionTitle icon={Home} title="Basic Details" subtitle="Title, project & a short description." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Listing Title" error={fe("title")} required>
          <TextInput value={data.title} onChange={(v) => onChange("title", v)} placeholder="e.g., 3BHK Apartment in Sector 62" />
        </Field>
        <Field label="RERA ID">
          <TextInput value={data.rera_id} onChange={(v) => onChange("rera_id", v)} placeholder="Optional" />
        </Field>
        <Field label="Project Name">
          <TextInput value={data.project_name} onChange={(v) => onChange("project_name", v)} placeholder="Optional" />
        </Field>
        <Field label="Builder Name">
          <TextInput value={data.builder_name} onChange={(v) => onChange("builder_name", v)} placeholder="Optional" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Short Description" error={fe("description")} required>
            <Textarea value={data.description} onChange={(v) => onChange("description", v)} placeholder="Key highlights, nearby landmarks, connectivity, etc." rows={5} />
          </Field>
        </div>
      </div>
    </div>
  );
}

function Location({ data, onChange, fe }: any) {
  return (
    <div>
      <SectionTitle icon={MapPin} title="Location" subtitle="City, address & map link. Lat/Long optional." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Country">
          <TextInput value={data.country} onChange={(v) => onChange("country", v)} placeholder="India" />
        </Field>
        <Field label="State">
          <TextInput value={data.state} onChange={(v) => onChange("state", v)} placeholder="Uttar Pradesh" />
        </Field>
        <Field label="City" error={fe("city")} required>
          <TextInput value={data.city} onChange={(v) => onChange("city", v)} placeholder="Noida" />
        </Field>
        <Field label="Locality / Area">
          <TextInput value={data.locality} onChange={(v) => onChange("locality", v)} placeholder="Sector 62" />
        </Field>
        <Field label="Address Line" error={fe("address_line")} required>
          <TextInput value={data.address_line} onChange={(v) => onChange("address_line", v)} placeholder="House/Building, Street, Sector" />
        </Field>
        <Field label="Pincode">
          <TextInput value={data.pincode} onChange={(v) => onChange("pincode", v)} placeholder="201301" />
        </Field>
        <Field label="Google Map Link">
          <TextInput value={data.google_map_link} onChange={(v) => onChange("google_map_link", v)} placeholder="https://maps.google.com/..." />
        </Field>
        <div className="grid grid-cols-2 gap-6">
          <Field label="Latitude">
            <TextInput value={data.latitude} onChange={(v) => onChange("latitude", v)} placeholder="28.6271" />
          </Field>
          <Field label="Longitude">
            <TextInput value={data.longitude} onChange={(v) => onChange("longitude", v)} placeholder="77.3649" />
          </Field>
        </div>
      </div>
    </div>
  );
}

function SizeLayout({ data, onChange, isResidential, isLand, fe }: any) {
  const isWarehouse = ["warehouse", "industrial_shed", "factory"].includes(data.property_type);
  const isHotel = data.property_type === "hotel";
  const isAgri = data.property_type === "land_agricultural";
  const isOffice = data.property_type === "office";

  return (
    <div>
      <SectionTitle icon={Ruler} title="Size & Layout" subtitle="Areas, floors & configuration (auto-adapts)." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* NEW size text instead of granular size fields */}
        <Field label="Size (text)" error={fe("size_sqft_text")}>
          <TextInput value={data.size_sqft_text} onChange={(v) => onChange("size_sqft_text", v)} placeholder="e.g., 1350–1750 sqft / 2–3 BHK" />
        </Field>

        {isLand && (
          <>
            <Field label="Frontage (ft)">
              <TextInput type="number" min={0} value={data.frontage_ft} onChange={(v) => onChange("frontage_ft", v)} placeholder="e.g., 120" />
            </Field>
            <Field label="Depth (ft)">
              <TextInput type="number" min={0} value={data.depth_ft} onChange={(v) => onChange("depth_ft", v)} placeholder="e.g., 300" />
            </Field>
          </>
        )}

        {isResidential && (
          <>
            <Field label="Bedrooms">
              <TextInput type="number" min={0} max={20} value={data.bedrooms} onChange={(v) => onChange("bedrooms", v)} placeholder="e.g., 3" />
            </Field>
            <Field label="Bathrooms">
              <TextInput type="number" min={0} max={20} value={data.bathrooms} onChange={(v) => onChange("bathrooms", v)} placeholder="e.g., 3" />
            </Field>
            <Field label="Balconies">
              <TextInput type="number" min={0} max={20} value={data.balconies} onChange={(v) => onChange("balconies", v)} placeholder="e.g., 2" />
            </Field>
            <Field label="Furnishing">
              <Select value={data.furnishing} onChange={(v) => onChange("furnishing", v)}>
                <option value="unfurnished">Unfurnished</option>
                <option value="semi_furnished">Semi Furnished</option>
                <option value="fully_furnished">Fully Furnished</option>
              </Select>
            </Field>
            <Field label="Kitchen Type">
              <Select value={data.kitchen_type} onChange={(v) => onChange("kitchen_type", v)}>
                <option value="closed">Closed</option>
                <option value="open">Open</option>
                <option value="island">Island</option>
              </Select>
            </Field>
          </>
        )}

        <Field label="Floor No.">
          <TextInput value={data.floor_no} onChange={(v) => onChange("floor_no", v)} placeholder="e.g., 7" />
        </Field>
        <Field label="Total Floors">
          <TextInput value={data.total_floors} onChange={(v) => onChange("total_floors", v)} placeholder="e.g., 20" />
        </Field>
        <Field label="Facing">
          <Select value={data.facing} onChange={(v) => onChange("facing", v)}>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="north_east">North-East</option>
            <option value="north_west">North-West</option>
            <option value="south_east">South-East</option>
            <option value="south_west">South-West</option>
          </Select>
        </Field>
        <Field label="Open Parking (count)" error={fe("parking_open")}>
          <TextInput type="number" min={0} value={data.parking_open} onChange={(v) => onChange("parking_open", v)} placeholder="e.g., 1" />
        </Field>
        <Field label="Covered Parking (count)" error={fe("parking_covered")}>
          <TextInput type="number" min={0} value={data.parking_covered} onChange={(v) => onChange("parking_covered", v)} placeholder="e.g., 1" />
        </Field>
      </div>

      {/* Project meta */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Project Meta</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field label="Tower Count">
            <TextInput type="number" min={0} value={data.tower_count} onChange={(v) => onChange("tower_count", v)} placeholder="e.g., 12" />
          </Field>
          <Field label="Total Units">
            <TextInput type="number" min={0} value={data.total_units} onChange={(v) => onChange("total_units", v)} placeholder="e.g., 480" />
          </Field>
        </div>
      </div>

      {/* Category-specific extras */}
      {isWarehouse && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Warehouse / Industrial</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Dock Count">
              <TextInput value={data.dock_count} onChange={(v) => onChange("dock_count", v)} placeholder="e.g., 6" />
            </Field>
            <Field label="Eaves Height (ft)">
              <TextInput value={data.eaves_height_ft} onChange={(v) => onChange("eaves_height_ft", v)} placeholder="e.g., 28" />
            </Field>
            <Field label="Floor Loading (ton)">
              <TextInput value={data.floor_loading_ton} onChange={(v) => onChange("floor_loading_ton", v)} placeholder="e.g., 5" />
            </Field>
          </div>
        </div>
      )}
      {isHotel && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Hotel / Guest House</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Room Count">
              <TextInput value={data.hotel_room_count} onChange={(v) => onChange("hotel_room_count", v)} placeholder="e.g., 42" />
            </Field>
            <Field label="Star Rating">
              <TextInput value={data.hotel_star_rating} onChange={(v) => onChange("hotel_star_rating", v)} placeholder="e.g., 3" />
            </Field>
          </div>
        </div>
      )}
      {isAgri && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Agricultural Land</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Soil Type">
              <TextInput value={data.soil_type} onChange={(v) => onChange("soil_type", v)} placeholder="e.g., Alluvial" />
            </Field>
            <Field label="Irrigation">
              <TextInput value={data.irrigation} onChange={(v) => onChange("irrigation", v)} placeholder="e.g., Canal / Borewell" />
            </Field>
          </div>
        </div>
      )}
      {isOffice && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-800 mb-3">Office Specific</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Workstations">
              <TextInput value={data.workstations} onChange={(v) => onChange("workstations", v)} placeholder="e.g., 60" />
            </Field>
            <Field label="Cabins">
              <TextInput value={data.cabins} onChange={(v) => onChange("cabins", v)} placeholder="e.g., 4" />
            </Field>
            <Field label="Conference Rooms">
              <TextInput value={data.conference_rooms} onChange={(v) => onChange("conference_rooms", v)} placeholder="e.g., 2" />
            </Field>
            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={data.pantry}
                  onChange={(e) => onChange("pantry", e.target.checked)}
                />
                Pantry
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={data.washroom_inside}
                  onChange={(e) => onChange("washroom_inside", e.target.checked)}
                />
                Washroom Inside
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PricingTenure({ data, onChange, fe }: any) {
  const isSale = data.service === "resale" || data.service === "new";
  const isRent = data.service === "rent";
  const isMortgage = data.service === "mortgage";
  const isLease = data.service === "lease";

  return (
    <div>
      <SectionTitle icon={IndianRupee} title="Pricing & Tenure" subtitle="Min/Max/Actual pricing; fields adapt to service." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isSale && (
          <>
            <Field label="Min Price (₹)" required error={fe("price_min")}>
              <TextInput type="number" min={0} value={data.price_min} onChange={(v) => onChange("price_min", v)} placeholder="e.g., 11000000" />
            </Field>
            <Field label="Max Price (₹)">
              <TextInput type="number" min={0} value={data.price_max} onChange={(v) => onChange("price_max", v)} placeholder="e.g., 13000000" />
            </Field>
            <Field label="Actual Price (₹)" required>
              <TextInput type="number" min={0} value={data.price_actual} onChange={(v) => onChange("price_actual", v)} placeholder="Optional if unknown" />
            </Field>
            <Field label="Price / sq.ft (₹)">
              <TextInput type="number" min={0} value={data.price_per_sqft} onChange={(v) => onChange("price_per_sqft", v)} placeholder="e.g., 7600" />
            </Field>
            <div className="md:col-span-3 flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={data.price_negotiable} onChange={(e) => onChange("price_negotiable", e.target.checked)} />
                Price Negotiable
              </label>
            </div>
          </>
        )}

        {isRent && (
          <>
            <Field label="Rent (Actual) per month (₹)" required error={fe("price_actual")}>
              <TextInput
                type="number"
                min={0}
                value={data.price_actual || data.expected_rent}
                onChange={(v) => {
                  onChange("price_actual", v);
                  onChange("expected_rent", v);
                }}
                placeholder="e.g., 35000"
              />
            </Field>
            <Field label="Security Deposit (₹)">
              <TextInput type="number" min={0} value={data.security_deposit} onChange={(v) => onChange("security_deposit", v)} placeholder="e.g., 70000" />
            </Field>
            <Field label="Maintenance (₹)">
              <TextInput type="number" min={0} value={data.maintenance_monthly} onChange={(v) => onChange("maintenance_monthly", v)} placeholder="e.g., 2500" />
            </Field>
            <Field label="Maintenance Type">
              <Select value={data.maintenance_type} onChange={(v) => onChange("maintenance_type", v)}>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="one_time">One-time</option>
              </Select>
            </Field>
            <div className="md:col-span-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={data.price_negotiable}
                  onChange={(e) => onChange("price_negotiable", e.target.checked)}
                />
                Rent Negotiable
              </label>
            </div>
          </>
        )}

        {isMortgage && (
          <>
            <Field label="Mortgage Amount (₹)" required error={fe("mortgage_amount")}>
              <TextInput type="number" min={0} value={data.mortgage_amount} onChange={(v) => onChange("mortgage_amount", v)} placeholder="e.g., 8000000" />
            </Field>
            <Field label="Interest Rate (%)" required error={fe("interest_rate")}>
              <TextInput type="number" min={0} max={100} value={data.interest_rate} onChange={(v) => onChange("interest_rate", v)} placeholder="e.g., 8.5" />
            </Field>
            <Field label="Mortgage Tenure (months)" required error={fe("mortgage_tenure_months")}>
              <TextInput type="number" min={0} value={data.mortgage_tenure_months} onChange={(v) => onChange("mortgage_tenure_months", v)} placeholder="e.g., 180" />
            </Field>
          </>
        )}

        {isLease && (
          <>
            <Field label="Min Price (₹)" required error={fe("price_min")}>
              <TextInput type="number" min={0} value={data.price_min} onChange={(v) => onChange("price_min", v)} placeholder="e.g., 900000" />
            </Field>
            <Field label="Max Price (₹)">
              <TextInput type="number" min={0} value={data.price_max} onChange={(v) => onChange("price_max", v)} placeholder="e.g., 1500000" />
            </Field>
            <Field label="Actual Price (₹)" required>
              <TextInput type="number" min={0} value={data.price_actual} onChange={(v) => onChange("price_actual", v)} placeholder="If fixed" />
            </Field>
            <Field label="Lease Duration (months)" required error={fe("lease_duration_months")}>
              <TextInput type="number" min={1} value={data.lease_duration_months} onChange={(v) => onChange("lease_duration_months", v)} placeholder="e.g., 36" />
            </Field>
          </>
        )}
      </div>
    </div>
  );
}

function Amenities({ data, toggleAmenity }: any) {
  return (
    <div>
      <SectionTitle icon={CheckCircle2} title="Amenities & Features" subtitle="Select what applies (single list, no duplicates)." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {AMENITIES_ALL.map((a) => (
          <button
            key={a}
            onClick={() => toggleAmenity(a)}
            className={`rounded-full border px-4 py-2 text-sm ${
              data.amenities.includes(a)
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
}

function LegalDocs({ data, onChange, onFiles }: any) {
  return (
    <div>
      <SectionTitle icon={ShieldCheck} title="Legal & Documents" subtitle="Mark availability and upload files (PDF/JPG)." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={data.noc_available} onChange={(e) => onChange("noc_available", e.target.checked)} /> NOC Available
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={data.loan_available} onChange={(e) => onChange("loan_available", e.target.checked)} /> Loan Available
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={data.occupancy_certificate} onChange={(e) => onChange("occupancy_certificate", e.target.checked)} /> Occupancy Certificate
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={data.completion_certificate} onChange={(e) => onChange("completion_certificate", e.target.checked)} /> Completion Certificate
        </label>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Upload Documents (multiple)">
          <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => onFiles("documents", e.target.files, 12)} />
          {!!data.documents?.length && (
            <p className="mt-2 text-xs text-slate-600">{data.documents.length} file(s) selected</p>
          )}
        </Field>

        {/* NEW media docs */}
        <Field label="Brochure (PDF/JPG/PNG)">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => onChange("brochure", e.target.files?.[0] || null)} />
        </Field>
        <Field label="Site Plan (PDF/JPG/PNG)">
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => onChange("site_plan", e.target.files?.[0] || null)} />
        </Field>
        <Field label="Flat Plans (multiple)">
          <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => onFiles("flat_plans", e.target.files, 12)} />
          {!!data.flat_plans?.length && (
            <p className="mt-2 text-xs text-slate-600">{data.flat_plans.length} file(s) selected</p>
          )}
        </Field>
      </div>
    </div>
  );
}

function MediaSection({ data, onChange, onFiles }: any) {
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    const v = data.main_image as any;
    if (v instanceof File || v instanceof Blob) {
      const url = URL.createObjectURL(v);
      setMainPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (typeof v === "string" && v.startsWith("http")) {
      setMainPreview(v);
      return;
    }
    setMainPreview(null);
  }, [data.main_image]);

  useEffect(() => {
    const files = Array.isArray(data.gallery) ? data.gallery : [];
    const urls = files
      .map((f: any) =>
        f instanceof File || f instanceof Blob ? URL.createObjectURL(f) : typeof f === "string" ? f : ""
      )
      .filter(Boolean) as string[];
    setGalleryPreviews(urls);
    return () => {
      files.forEach((f: any) => {
        if (f instanceof File || f instanceof Blob) {
          try {
            URL.revokeObjectURL(f as any);
          } catch {}
        }
      });
    };
  }, [data.gallery]);

  const removeMain = () => onChange("main_image", null);
  const removeFromGallery = (idx: number) => {
    const next = [...(data.gallery || [])];
    next.splice(idx, 1);
    onChange("gallery", next);
  };

  return (
    <div>
      <SectionTitle icon={Images} title="Media" subtitle="Preview & remove images before submit." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Main Image (cover)">
          <input type="file" accept="image/*" onChange={(e) => onChange("main_image", e.target.files?.[0] || null)} />
          {mainPreview && (
            <div className="relative mt-3">
              <img src={mainPreview} alt="Main" className="h-40 w-full rounded-xl object-cover border" />
              <button
                type="button"
                onClick={removeMain}
                className="absolute top-2 right-2 rounded-full bg-rose-600/90 text-white px-2 py-1 text-xs"
              >
                Remove
              </button>
            </div>
          )}
        </Field>

        <Field label="Gallery Images (max 8)">
          <input type="file" multiple accept="image/*" onChange={(e) => onFiles("gallery", e.target.files, 8)} />
          {!!galleryPreviews.length && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {galleryPreviews.map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} alt={`g${i}`} className="h-28 w-full rounded-lg object-cover border" />
                  <button
                    type="button"
                    onClick={() => removeFromGallery(i)}
                    className="absolute top-1 right-1 rounded-full bg-rose-600/90 text-white px-1.5 py-0.5 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </Field>

        <Field label="Video URL (optional)">
          <TextInput value={data.video_url} onChange={(v) => onChange("video_url", v)} placeholder="https://..." />
        </Field>
        <Field label="Virtual Tour URL (optional)">
          <TextInput value={data.virtual_tour_url} onChange={(v) => onChange("virtual_tour_url", v)} placeholder="https://..." />
        </Field>
      </div>
    </div>
  );
}
function NearbySection({ data, onChange }: any) {
  const addNearby = () => {
    const next = [...(data.nearby || []), { title: "", description: "", distance: "" }];
    onChange("nearby", next);
  };

  const updateNearby = (i: number, key: string, value: string) => {
    const next = [...data.nearby];
    next[i][key] = value;
    onChange("nearby", next);
  };

  const removeNearby = (i: number) => {
    const next = [...data.nearby];
    next.splice(i, 1);
    onChange("nearby", next);
  };

  return (
    <div>
      <SectionTitle
        icon={MapPin}
        title="Nearby Places"
        subtitle="Add important nearby locations like schools, metro, hospitals etc."
      />
      <div className="space-y-6">
        {(data.nearby || []).map((n: any, i: number) => (
          <div key={i} className="rounded-xl border border-slate-200 p-4 bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Title">
                <TextInput
                  value={n.title}
                  onChange={(v) => updateNearby(i, "title", v)}
                  placeholder="e.g., City Metro Station"
                />
              </Field>
              <Field label="Description">
                <TextInput
                  value={n.description}
                  onChange={(v) => updateNearby(i, "description", v)}
                  placeholder="e.g., Walking distance from property"
                />
              </Field>
              <Field label="Distance (km)">
                <TextInput
                  type="number"
                  value={n.distance}
                  onChange={(v) => updateNearby(i, "distance", v)}
                  placeholder="e.g., 2.5"
                />
              </Field>
            </div>
            <button
              onClick={() => removeNearby(i)}
              className="mt-2 text-xs text-rose-600 underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addNearby}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          + Add Nearby Place
        </button>
      </div>
    </div>
  );
}

function SEOSection({ data, onChange }: any) {
  return (
    <div>
      <SectionTitle icon={Info} title="SEO & Visibility" subtitle="Meta title & description help in discovery." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Meta Title">
          <TextInput value={data.meta_title} onChange={(v) => onChange("meta_title", v)} placeholder="Short succinct title" />
        </Field>
        <div className="md:col-span-2">
          <Field label="Meta Description">
            <Textarea rows={4} value={data.meta_description} onChange={(v) => onChange("meta_description", v)} placeholder="One or two sentence summary." />
          </Field>
        </div>
      </div>
    </div>
  );
}

function ContactSection({ data, onChange }: any) {
  return (
    <div>
      <SectionTitle icon={Building2} title="Owner / Contact" subtitle="Who should we connect for this listing?" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Field label="Listed By">
          <Select value={data.listed_by} onChange={(v) => onChange("listed_by", v)}>
            <option value="owner">Owner</option>
            <option value="broker">Broker</option>
            <option value="builder">Builder</option>
            <option value="manager">Manager</option>
            <option value="company">Company</option>
          </Select>
        </Field>
        <Field label="Contact Name">
          <TextInput value={data.owner_name} onChange={(v) => onChange("owner_name", v)} placeholder="Full name" />
        </Field>
        <Field label="Phone">
          <TextInput value={data.owner_phone} onChange={(v) => onChange("owner_phone", v)} placeholder="10-digit mobile" />
        </Field>
        <Field label="Email">
          <TextInput type="email" value={data.owner_email} onChange={(v) => onChange("owner_email", v)} placeholder="name@example.com" />
        </Field>
        <Field label="Available From">
          <TextInput type="date" value={data.available_from} onChange={(v) => onChange("available_from", v)} />
        </Field>
        <Field label="Status">
          <Select value={data.status} onChange={(v) => onChange("status", v)}>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        </Field>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <span className="w-48 text-slate-500">{label}</span>
      <div className="flex-1 text-slate-800">{children || <span className="text-slate-400">—</span>}</div>
    </div>
  );
}
function ReviewSubmit({ data }: any) {
  return (
    <div>
      <SectionTitle icon={CheckCircle2} title="Review & Submit" subtitle="Quick summary of your inputs." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-4">Basics</h3>
          <div className="space-y-2">
            <Row label="Service">{data.service}</Row>
            <Row label="Type">{data.property_type}</Row>
            <Row label="Title">{data.title}</Row>
            <Row label="RERA ID">{data.rera_id}</Row>
            <Row label="Project">{data.project_name}</Row>
            <Row label="Builder">{data.builder_name}</Row>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-4">Location</h3>
          <div className="space-y-2">
            <Row label="City">{data.city}</Row>
            <Row label="Locality">{data.locality}</Row>
            <Row label="Address">{data.address_line}</Row>
            <Row label="Pincode">{data.pincode}</Row>
            <Row label="Map Link">{data.google_map_link}</Row>
            <Row label="Lat/Lng">
              {data.latitude}, {data.longitude}
            </Row>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-4">Size & Layout</h3>
          <div className="space-y-2">
            <Row label="Size">{data.size_sqft_text}</Row>
            <Row label="Bedrooms">{data.bedrooms}</Row>
            <Row label="Bathrooms">{data.bathrooms}</Row>
            <Row label="Balconies">{data.balconies}</Row>
            <Row label="Facing">{data.facing}</Row>
            <Row label="Parking (O/C)">
              {data.parking_open}/{data.parking_covered}
            </Row>
            <Row label="Tower Count">{data.tower_count}</Row>
            <Row label="Total Units">{data.total_units}</Row>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-4">Pricing</h3>
          <div className="space-y-2">
            <Row label="Min">₹ {data.price_min}</Row>
            <Row label="Max">₹ {data.price_max}</Row>
            <Row label="Actual">₹ {data.price_actual}</Row>
            <Row label="Price / sqft">₹ {data.price_per_sqft}</Row>
            <Row label="Rent">₹ {data.expected_rent}</Row>
            <Row label="Maintenance">
              ₹ {data.maintenance_monthly} ({data.maintenance_type})
            </Row>
            <Row label="Mortgage">
              ₹ {data.mortgage_amount} @ {data.interest_rate}% / {data.mortgage_tenure_months} mo
            </Row>
            <Row label="Lease Duration">{data.lease_duration_months} mo</Row>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-4">Amenities</h3>
          <div className="text-sm text-slate-800">
            {data.amenities?.length ? data.amenities.join(", ") : "—"}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-5">
          <h3 className="font-semibold mb-4">Contact & SEO</h3>
          <div className="space-y-2">
            <Row label="Listed By">{data.listed_by}</Row>
            <Row label="Contact">
              {data.owner_name} ({data.owner_phone})
            </Row>
            <Row label="Email">{data.owner_email}</Row>
            <Row label="Available From">{data.available_from}</Row>
            <Row label="Status">{data.status}</Row>
            <Row label="Meta Title">{data.meta_title}</Row>
          </div>
        </div>
<div className="rounded-xl border border-slate-200 p-5">
  <h3 className="font-semibold mb-4">Nearby</h3>
  {data.nearby?.length ? (
    <ul className="space-y-2 text-sm">
      {data.nearby.map((n: any, i: number) => (
        <li key={i} className="border-b pb-1">
          <strong>{n.title}</strong>
          {n.distance ? ` — ${n.distance} km` : ""} 
          {n.description ? ` — ${n.description}` : ""}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-slate-400 text-sm">No nearby places added</p>
  )}
</div>


      </div>
    </div>
  );
}
