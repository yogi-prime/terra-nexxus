import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building2, Users, IndianRupee, Home, HandCoins, Landmark, KeyRound } from "lucide-react";

type ServiceKey = "buy" | "rent" | "lease" | "mortgage" | "resale" | "new";

type SnapshotData = {
  totals: {
    liveListings: number;
    valueCr: number;
    cities: number;
    developers: number;
    byService: Record<ServiceKey, number>;
  };
  trendMonthly: { month: string; listings: number }[];
  categorySplit: { name: string; value: number; color?: string }[];
  topListings: Array<{
    name: string;
    city: string;
    service: ServiceKey;
    funded?: number;
    priceCr?: number;
    tag?: "Closing Soon" | "Hot" | "New" | "Open";
  }>;
};

const serviceMeta: Record<ServiceKey, { label: string; Icon: any; className: string }> = {
  buy: { label: "Buy", Icon: Home, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rent: { label: "Rent", Icon: KeyRound, className: "bg-sky-50 text-sky-700 border-sky-200" },
  lease: { label: "Lease", Icon: Landmark, className: "bg-amber-50 text-amber-700 border-amber-200" },
  mortgage: { label: "Mortgage", Icon: HandCoins, className: "bg-violet-50 text-violet-700 border-violet-200" },
  resale: { label: "Resale", Icon: Home, className: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  new: { label: "New Sale", Icon: Home, className: "bg-pink-50 text-pink-700 border-pink-200" },
};

const nfmt = (n: number) => n.toLocaleString("en-IN");
const pct = (n: number) => `${Math.round(n)}%`;

// Use the same host you’ve been testing locally
const ORIGIN = "http://127.0.0.1:8000";
const CANDIDATE_PATHS = [
  "/api/v1/analytics-snapshot",
  "/api/analytics-snapshot",
  "/api/v1/analytics/snapshot",
  "/api/analytics/snapshot",
];

// Try multiple endpoints until one returns 200
async function fetchSnapshot(): Promise<SnapshotData | null> {
  for (const path of CANDIDATE_PATHS) {
    try {
      const res = await fetch(`${ORIGIN}${path}`);
      if (!res.ok) {
        // continue trying other candidates
        continue;
      }
      const json = await res.json();

      // normalize possible shapes
      const data: SnapshotData = {
        totals: {
          liveListings: json?.totals?.liveListings ?? 0,
          valueCr: json?.totals?.valueCr ?? 0,
          cities: json?.totals?.cities ?? 0,
          developers: json?.totals?.developers ?? 0,
          byService: json?.totals?.byService ?? { buy:0,rent:0,lease:0,mortgage:0,resale:0,new:0 },
        },
        trendMonthly: Array.isArray(json?.trendMonthly) ? json.trendMonthly : [],
        categorySplit: Array.isArray(json?.categorySplit) ? json.categorySplit : [],
        topListings: Array.isArray(json?.topListings) ? json.topListings : [],
      };

      console.info("[AnalyticsSnapshot] Using endpoint:", path);
      return data;
    } catch {
      // swallow and try next
    }
  }
  return null;
}

export const AnalyticsSnapshot = () => {
  const [totals, setTotals] = useState<Record<ServiceKey, number>>({
    buy: 0, rent: 0, lease: 0, mortgage: 0, resale: 0, new: 0
  });
  const [liveListings, setLiveListings] = useState(0);
  const [valueCr, setValueCr] = useState(0);
  const [cities, setCities] = useState(0);
  const [developers, setDevelopers] = useState(0);

  const [trendMonthly, setTrendMonthly] = useState<{ month: string; listings: number }[]>([]);
  const [categorySplit, setCategorySplit] = useState<{ name: string; value: number; color?: string }[]>([]);
  const [topListings, setTopListings] = useState<SnapshotData["topListings"]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchSnapshot();
      if (!mounted) return;

      if (data) {
        setTotals(data.totals?.byService || { buy: 0, rent: 0, lease: 0, mortgage: 0, resale: 0, new: 0 });
        setLiveListings(data.totals?.liveListings ?? 0);
        setValueCr(data.totals?.valueCr ?? 0);
        setCities(data.totals?.cities ?? 0);
        setDevelopers(data.totals?.developers ?? 0);
        setTrendMonthly(data.trendMonthly ?? []);
        setCategorySplit(data.categorySplit ?? []);
        setTopListings(data.topListings ?? []);
      } else {
        console.error("Failed to fetch totals, using fallback values (all endpoints 404/failed)");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const maxTrend = Math.max(...trendMonthly.map(d => d.listings), 1);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Marketplace Analytics — Terranexxus Live</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time snapshot of listings, services, and project momentum across India
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          <Card className="hover-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Live Listings</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-2xl font-bold">{nfmt(liveListings)}</div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Marketplace Value</CardTitle>
              <CardDescription>₹ Cr (active)</CardDescription>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-2xl font-bold">₹{nfmt(valueCr)}</div>
              <IndianRupee className="h-5 w-5 text-primary" />
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cities</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-2xl font-bold">{cities}</div>
              <Building2 className="h-5 w-5 text-accent" />
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Developers</CardTitle>
            </CardHeader>
            <CardContent className="flex items-end justify-between">
              <div className="text-2xl font-bold">{nfmt(developers)}</div>
              <Users className="h-5 w-5 text-success" />
            </CardContent>
          </Card>

          {/* Service Cards */}
          {(["buy","rent","lease","mortgage","resale","new"] as ServiceKey[]).map(s => {
            const meta = serviceMeta[s];
            return (
              <Card key={s} className="hover-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{meta.label}</CardTitle>
                  <CardDescription>Active</CardDescription>
                </CardHeader>
                <CardContent className="flex items-end justify-between">
                  <div className="text-2xl font-bold">{nfmt(totals[s] || 0)}</div>
                  <meta.Icon className="h-5 w-5" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Service Badges */}
        <div className="flex flex-wrap gap-3 mb-10">
          {(["buy","rent","lease","mortgage","resale","new"] as ServiceKey[]).map(s => {
            const meta = serviceMeta[s];
            const count = totals[s] || 0;
            const share = (count / Math.max(1, liveListings)) * 100;
            return (
              <Badge key={s} variant="outline" className={`border ${meta.className} px-3 py-1.5 text-sm`}>
                <meta.Icon className="h-4 w-4 mr-1.5" />
                {meta.label}: <span className="font-semibold ml-1">{nfmt(count)}</span>
                <span className="ml-1 text-xs opacity-70">({pct(share)})</span>
              </Badge>
            );
          })}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trend */}
          <Card className="lg:col-span-2 hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Monthly Active Listings
              </CardTitle>
              <CardDescription>Growth across the last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                {trendMonthly.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md gradient-primary transition-all hover:opacity-80"
                      style={{ height: `${(d.listings / maxTrend) * 200}px` }}
                    />
                    <span className="text-xs text-muted-foreground">{d.month}</span>
                    <span className="hidden-custom text-xs font-semibold">{nfmt(d.listings)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category split */}
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent" />
                Property Mix
              </CardTitle>
              <CardDescription>Share by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categorySplit.map((c) => (
                  <div key={c.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{c.name}</span>
                      <span className="text-sm text-muted-foreground">{c.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${c.value}%`, background: c.color || "hsl(var(--primary))" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="mt-8 hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Top Momentum Listings
            </CardTitle>
            <CardDescription>Projects gaining the most traction right now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Listing</th>
                    <th className="text-center py-3 px-4 font-semibold">Service</th>
                    <th className="text-center py-3 px-4 font-semibold">Ticket</th>
                    <th className="text-center py-3 px-4 font-semibold">Campaign</th>
                    <th className="text-center py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topListings.map((p, i) => {
                    const meta = serviceMeta[p.service];
                    return (
                      <tr key={`${p.name}-${i}`} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">#{i + 1}</Badge>
                            <div>
                              <div className="font-medium">{p.name}</div>
                              <div className="text-xs text-muted-foreground">{p.city}</div>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-4 px-4">
                          <Badge variant="outline" className={`border ${meta.className}`}>
                            <meta.Icon className="h-4 w-4 mr-1" /> {meta.label}
                          </Badge>
                        </td>
                        <td className="text-center py-4 px-4">
                          {p.priceCr ? <span className="text-lg font-bold text-foreground">₹{p.priceCr} Cr</span> : <span className="text-muted-foreground">—</span>}
                        </td>
                        <td className="text-center py-4 px-4">
                          {typeof p.funded === "number" ? (
                            <div className="space-y-1">
                              <div className="text-sm font-semibold text-success">{p.funded}%</div>
                              <div className="w-24 bg-muted rounded-full h-2 mx-auto">
                                <div className="h-2 bg-success rounded-full" style={{ width: `${p.funded}%` }} />
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          <Badge
                            variant={p.tag === "Closing Soon" ? "outline" : "secondary"}
                            className={
                              p.tag === "Closing Soon"
                                ? "bg-success/10 text-success border-success/20"
                                : p.tag === "Hot"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : p.tag === "New"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : ""
                            }
                          >
                            {p.tag || "Open"}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
