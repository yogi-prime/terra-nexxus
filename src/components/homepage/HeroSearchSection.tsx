import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ✅ import your background image
import heroBg from "@/assets/indexbg.png"; // adjust path if needed

export const HeroSearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const cities = ["Mumbai", "Delhi", "Bangalore", "Ahmedabad", "Pune", "Chennai", "Hyderabad", "Kolkata"];

  return (
    <section
      className="relative isolate pt-20 pb-32 overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
      aria-label="Terranexxus hero search"
    >
      {/* brand gradient overlay (like your previous hero) */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-br
          from-[#0E1A1A]/90 via-[#0E1A1A]/65 to-[#DFF3E4]/20
          dark:from-black/85 dark:via-black/60 dark:to-emerald-900/20
        "
      />
      {/* subtle vignette for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_40%,transparent_0%,transparent_50%,rgba(0,0,0,0.35)_100%)]" />

      {/* decorative soft dots (kept from your version, toned down) */}
      <div className="absolute inset-0 opacity-15">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"/>
      </div>

      <div className="container mx-auto px-4 relative z-10">
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
              <div className="flex-1">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="h-14 bg-white border-white/30">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-slate-500" />
                      <SelectValue placeholder="Select City" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <Input
                    placeholder="Search by locality, builder, or project..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 pl-12 bg-white border-white/30 text-base"
                  />
                </div>
              </div>

              <Button
                size="lg"
                className="h-14 px-8 shadow-lg shadow-emerald-500/25
                           bg-gradient-to-r from-emerald-500 to-lime-400
                           hover:from-emerald-600 hover:to-lime-500 text-white"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>
        </div>

        {/* Popular Localities */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-4">Popular Localities</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Bandra West", "Gurgaon Sector 49", "Whitefield", "Koramangala", "Andheri East", "Powai"].map((locality) => (
              <button
                key={locality}
                className="px-4 py-2 rounded-full text-sm font-medium
                           bg-white/15 text-white border border-white/20
                           hover:bg-white/25 transition-colors"
              >
                {locality}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
