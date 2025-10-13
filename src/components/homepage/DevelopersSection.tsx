import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  Calendar,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import API from "@/api/api";

/* ----------------------------------------
   Helper: unified service badge
----------------------------------------- */
const ServiceBadge = ({ type }: { type: "BUY" | "RENT" | "LEASE" | "MORTGAGE" }) => {
  const styles: Record<string, string> = {
    BUY: "bg-emerald-500 text-white",
    RENT: "bg-blue-500 text-white",
    LEASE: "bg-amber-500 text-white",
    MORTGAGE: "bg-purple-600 text-white",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide shadow ${styles[type]}`}
    >
      {type}
    </span>
  );
};

export const DevelopersSection: React.FC = () => {
  const [filter, setFilter] = useState<"All" | "Residential" | "Commercial" | "Mixed" | "Sustainable">("All");
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Derive BASE_URL from Axios instance
  const BASE_URL = API.defaults.baseURL.replace("/api", "");

  // Fetch developers
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const { data } = await API.get("/developers");
        if (data.ok) setDevelopers(data.data);
      } catch (err: any) {
        console.error("Failed to fetch developers", err.response?.status, err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  const tabs: typeof filter[] = ["All", "Residential", "Commercial", "Mixed", "Sustainable"];

  const filtered = useMemo(
    () =>
      filter === "All"
        ? developers
        : developers.filter((d) => d.domain === filter || (d.categories && d.categories.includes(filter))),
    [developers, filter]
  );

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const getSPV = () => {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  };
  const [spv, setSpv] = useState(getSPV());
  useEffect(() => {
    const onResize = () => setSpv(getSPV());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const totalPages = Math.max(0, Math.ceil(filtered.length / spv) - 1);
  const goTo = (p: number) => {
    const clamped = Math.max(0, Math.min(totalPages, p));
    setPage(clamped);
    if (!trackRef.current) return;
    const percent = (100 / spv) * clamped;
    trackRef.current.style.transform = `translateX(-${percent}%)`;
  };
  const prev = () => goTo(page - 1);
  const next = () => goTo(page + 1);

  if (loading) return <p className="text-center py-20">Loading developers...</p>;
  if (!developers.length) return <p className="text-center py-20">No developers found.</p>;

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-emerald-500 text-white">Premium Network</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Trusted Developers & Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Work with India&apos;s most reputed builders. Explore their flagship projects.
          </p>
        </div>

        {/* Spotlight */}
        {developers[0] && (
          <div className="relative overflow-hidden rounded-2xl mb-12 shadow-2xl">
            {/* Developer Banner */}
            <img
              src={developers[0].banner_image ? `${BASE_URL}/storage/${developers[0].banner_image}` : "/placeholder.png"}
              className="w-full h-[260px] md:h-[320px] object-cover"
              alt={`${developers[0].name} banner`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute left-6 md:left-10 top-6 text-white flex items-center gap-3">
              {/* Developer Logo */}
              <img
                src={developers[0].logo ? `${BASE_URL}/storage/${developers[0].logo}` : "/placeholder.png"}
                className="w-12 h-12 rounded-full border-2 border-white/40"
                alt={`${developers[0].name} logo`}
              />
              <div>
                <p className="text-sm opacity-80">Developer Spotlight</p>
                <h3 className="text-2xl font-semibold">{developers[0].name}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => { setFilter(t); setPage(0); goTo(0); }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                filter === t
                  ? "bg-gradient-to-r from-emerald-500 to-lime-400 text-white border-transparent shadow-md"
                  : "bg-white/70 border-emerald-200 text-emerald-700 hover:bg-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          {/* Left Arrow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <button
              onClick={prev}
              disabled={page === 0}
              className="p-2 rounded-full bg-white shadow disabled:opacity-40 hover:scale-105 transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          {/* Right Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
            <button
              onClick={next}
              disabled={page === totalPages}
              className="p-2 rounded-full bg-white shadow disabled:opacity-40 hover:scale-105 transition"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Slider Track */}
          <div ref={trackRef} className="flex gap-6 transition-transform duration-500 ease-out will-change-transform" style={{ width: `${(100 / spv) * filtered.length}%` }}>
            {filtered.map((developer) => (
              <div key={developer.id} className="shrink-0" style={{ width: `${100 / filtered.length}%` }}>
                <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
                  <CardContent className="p-0">
                    {/* Banner + Logo */}
                    <div className="relative">
                      <img
                        src={developer.banner_image ? `${BASE_URL}/storage/${developer.banner_image}` : "/placeholder.png"}
                        className="h-40 w-full object-cover"
                        alt={`${developer.name} banner`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute left-5 bottom-4 right-5 flex items-center">
                        <img
                          src={developer.logo ? `${BASE_URL}/storage/${developer.logo}` : "/placeholder.png"}
                          className="w-12 h-12 rounded-full border-2 border-white/70"
                          alt={`${developer.name} logo`}
                        />
                        <div className="text-white ml-3">
                          <h3 className="text-lg font-semibold">{developer.name}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Properties */}
                    {developer.properties?.length > 0 && (
                      <div className="p-5 grid grid-cols-2 gap-4">
                        {developer.properties.map((property: any, i: number) => (
                          <div key={i} className="group rounded-xl border border-emerald-100 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition">
                            <img
                              src={property.main_image_path ? `${BASE_URL}/storage/${property.main_image_path}` : "/placeholder.png"}
                              className="h-24 w-full object-cover"
                              alt={property.title}
                            />
                            <div className="p-3">
                              <ServiceBadge type={property.service} />
                              <h4 className="text-sm font-semibold line-clamp-1">{property.title}</h4>
                              <div className="mt-1 text-xs flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {property.locality}
                              </div>
                              <div className="mt-2 text-sm font-semibold text-emerald-600">{property.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <Button variant="outline" className="w-full mt-4">
                      View All Projects by {developer.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: totalPages + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === page ? "bg-emerald-500" : "bg-emerald-200 hover:bg-emerald-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust strip + infinite marquee */}
        {/* <div className="mt-14 flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 text-white shadow">
            <Award className="h-4 w-4" />
            <span className="text-sm font-medium">500+ Verified Developers & Growing</span>
          </div>

          <div className="w-full overflow-hidden">
            <div className="relative">
              <div className="flex items-center gap-10 whitespace-nowrap will-change-transform animate-marquee">
                {[...Array(3)].flatMap((_, k) =>
                  developers.map((d, i) => (
                    <img
                      key={`${k}-${d.id}-${i}`}
                      src={d.logo}
                      className="h-10 w-10 rounded-full object-cover grayscale hover:grayscale-0 transition"
                      alt={`${d.name} logo`}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style> */}
    </section>
  );
};
