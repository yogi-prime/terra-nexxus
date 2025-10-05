import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Building2,
  Award,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

/* ----------------------------------------
   Component
----------------------------------------- */
export const DevelopersSection: React.FC = () => {
  const [filter, setFilter] = useState<
    "All" | "Residential" | "Commercial" | "Mixed" | "Sustainable"
  >("All");

  const developers = [
    {
      id: "1",
      name: "Lodha Group",
      logo:
        "lodha_logo.png",
      banner:
        "lodha.jpg",
      established: "1980",
      totalProjects: "200+",
      activeProjects: 8,
      domain: "Residential",
      specialization: "Luxury Residential",
      rating: 4.8,
      projects: [
        {
          name: "Lodha Altamount",
          location: "Altamount Road, Mumbai",
          price: "₹15+ Cr",
          thumb:
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=300&h=200&fit=crop",
          type: "BUY" as const,
        },
        {
          name: "Lodha Park",
          location: "Lower Parel, Mumbai",
          price: "₹2.5+ Cr",
          thumb:
            "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=300&h=200&fit=crop",
          type: "MORTGAGE" as const,
        },
      ],
    },
    {
      id: "2",
      name: "Prestige Group",
      logo:
        "prestige_logo.jpg",
      banner:
        "Prestige.jpg",
      established: "1986",
      totalProjects: "150+",
      activeProjects: 12,
      domain: "Mixed",
      specialization: "Mixed Development",
      rating: 4.6,
      projects: [
        {
          name: "Prestige Shantiniketan",
          location: "Whitefield, Bangalore",
          price: "₹1.2+ Cr",
          thumb:
            "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=300&h=200&fit=crop",
          type: "RENT" as const,
        },
        {
          name: "Prestige Lakeside",
          location: "Varthur, Bangalore",
          price: "₹85L+",
          thumb:
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=300&h=200&fit=crop",
          type: "BUY" as const,
        },
      ],
    },
    {
      id: "3",
      name: "DLF Limited",
      logo:
        "dlf_logo.jpg",
      banner:
        "DLF.avif",
      established: "1946",
      totalProjects: "300+",
      activeProjects: 15,
      domain: "Commercial",
      specialization: "Commercial & Residential",
      rating: 4.7,
      projects: [
        {
          name: "DLF Cyber City",
          location: "Gurgaon, Delhi NCR",
          price: "₹1.8+ Cr",
          thumb:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?w=300&h=200&fit=crop",
          type: "LEASE" as const,
        },
        {
          name: "DLF Capital Greens",
          location: "Moti Nagar, Delhi",
          price: "₹2.2+ Cr",
          thumb:
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=300&h=200&fit=crop",
          type: "BUY" as const,
        },
      ],
    },
    {
      id: "4",
      name: "Godrej Properties",
      logo:
        "GPL_Logo.jpg",
      banner:
        "Godrej .webp",
      established: "1897",
      totalProjects: "180+",
      activeProjects: 10,
      domain: "Sustainable",
      specialization: "Sustainable Living",
      rating: 4.5,
      projects: [
        {
          name: "Godrej Emerald",
          location: "Thane West, Mumbai",
          price: "₹1.1+ Cr",
          thumb:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?w=300&h=200&fit=crop",
          type: "BUY" as const,
        },
        {
          name: "Godrej Garden City",
          location: "Jagatpur, Ahmedabad",
          price: "₹65L+",
          thumb:
            "https://gplwebsitecdnblob.blob.core.windows.net/godrej-cdn/Images/Godrej%20Bengaluru%20Dsktop%20Size%204ff02bec-c216-440e-b17e-a14e3fb2130f.webp",
          type: "RENT" as const,
        },
      ],
    },
  ];

  const tabs: typeof filter[] = ["All", "Residential", "Commercial", "Mixed", "Sustainable"];

  const filtered = useMemo(
    () => (filter === "All" ? developers : developers.filter((d) => d.domain === filter)),
    [filter]
  );

  /* ---------- Slider logic (no external library) ---------- */
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);

  const getSPV = () => {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w >= 1024) return 3; // lg: 3 cards
    if (w >= 768) return 2; // md: 2 cards
    return 1; // sm: 1 card
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
    const track = trackRef.current;
    if (!track) return;
    const percent = (100 / spv) * clamped;
    track.style.transform = `translateX(-${percent}%)`;
  };

  const prev = () => goTo(page - 1);
  const next = () => goTo(page + 1);

  return (
    <section
      className="
        relative py-20
     
      "
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-emerald-500 text-white">Premium Network</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Trusted Developers & Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Work with India&apos;s most reputed builders. Explore their flagship projects with clear badges for Buy, Rent, Lease & Mortgage.
          </p>
        </div>

        {/* Spotlight Banner */}
        <div className="relative overflow-hidden rounded-2xl mb-12 shadow-2xl">
          <img
            src={developers[0].banner}
            alt={`${developers[0].name} banner`}
            className="w-full h-[260px] md:h-[320px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute left-6 md:left-10 top-6 text-white">
            <div className="flex items-center gap-3">
              <img
                src={developers[0].logo}
                className="w-12 h-12 rounded-full border-2 border-white/40"
                alt={`${developers[0].name} logo`}
              />
              <div>
                <p className="text-sm opacity-80">Developer Spotlight</p>
                <h3 className="text-2xl font-semibold">{developers[0].name}</h3>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm opacity-90">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Since {developers[0].established}
              </span>
              <span className="inline-flex items-center gap-1">
                <Building2 className="h-4 w-4" /> {developers[0].totalProjects} Projects
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" /> {developers[0].rating}
              </span>
            </div>
          </div>
          <div className="absolute right-6 bottom-6">
            <Button className="bg-white text-foreground hover:bg-white/90">
              View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => {
                setFilter(t);
                setPage(0);
                goTo(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition
                ${
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
        <div className="relative">
          {/* nav buttons */}
          <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={prev}
              disabled={page === 0}
              className="p-2 rounded-full bg-white shadow disabled:opacity-40 hover:scale-105 transition"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
          <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={next}
              disabled={page === totalPages}
              className="p-2 rounded-full bg-white shadow disabled:opacity-40 hover:scale-105 transition"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6 transition-transform duration-500 ease-out will-change-transform"
              style={{ width: `${(100 / spv) * filtered.length}%` }}
            >
              {filtered.map((developer) => (
                <div
                  key={developer.id}
                  className="shrink-0"
                  style={{ width: `${100 / filtered.length}%` }}
                >
                  <Card
                    className="
                      overflow-hidden
                      border-0 shadow-xl hover:shadow-2xl transition-all
                      bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70
                    "
                  >
                    <CardContent className="p-0">
                      {/* header panel */}
                      <div className="relative">
                        <img src={developer.banner} className="h-40 w-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute left-5 bottom-4 right-5 flex items-center">
                          <img
                            src={developer.logo}
                            className="w-12 h-12 rounded-full border-2 border-white/70"
                            alt={`${developer.name} logo`}
                          />
                          <div className="text-white ml-3">
                            <h3 className="text-lg font-semibold">{developer.name}</h3>
                            <div className="flex items-center gap-3 text-xs opacity-90">
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> Since {developer.established}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Building2 className="h-3 w-3" /> {developer.totalProjects} Projects
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-400" /> {developer.rating}
                              </span>
                            </div>
                          </div>
                          <Badge className="ml-auto bg-emerald-500/90 text-white">
                            {developer.activeProjects} Live
                          </Badge>
                        </div>
                      </div>

                      {/* projects mini grid */}
                      <div className="p-5">
                        <p className="text-sm font-medium text-emerald-700 mb-3">
                          {developer.specialization}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          {developer.projects.map((p, i) => (
                            <div
                              key={i}
                              className="group rounded-xl border border-emerald-100 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition"
                            >
                              <div className="relative">
                                <img src={p.thumb} className="h-24 w-full object-cover" alt="" />
                                <div className="absolute left-2 top-2">
                                  <ServiceBadge type={p.type} />
                                </div>
                              </div>
                              <div className="p-3">
                                <h4 className="text-sm font-semibold line-clamp-1">{p.name}</h4>
                                <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" /> {p.location}
                                </div>
                                <div className="mt-2 text-sm font-semibold text-emerald-600">
                                  {p.price}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <Button variant="outline" className="w-full mt-4">
                          View All Projects by {developer.name}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* dots */}
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
        <div className="mt-14 flex flex-col items-center gap-6">
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
        </div>
      </div>

      {/* marquee keyframes */}
      <style jsx>{`
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
      `}</style>
    </section>
  );
};
