import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";

import { Header } from "@/components/Header";
import { PropertiesHero } from "@/components/properties/PropertiesHero";
import { FilterSidebar } from "@/components/properties/FilterSidebar";
import { PropertiesToolbar } from "@/components/properties/PropertiesToolbar";
import { PropertiesAnalytics } from "@/components/properties/PropertiesAnalytics";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { CompareDrawer } from "@/components/properties/CompareDrawer";
import { PropertiesCTA } from "@/components/properties/PropertiesCTA";
import { Footer } from "@/components/Footer";
import { TrendingUp } from "lucide-react";
import img1 from "@/assets/1.jpg";

export interface Property {
  id: string;
  title: string;
  location: string;
  category:
    | "Residential"
    | "Commercial"
    | "Farmhouse"
    | "Agri Land"
    | "Res Plots"
    | "Ind Plots";
  minInvest: number;
  targetRaise: number;
  raisedAmount: number;
  projectedYield: number;
  tenure: number;
  riskBand: "Low" | "Medium" | "High";
  status: "Open" | "Closing Soon" | "Fully Funded" | "Closed";
  highlights: string[];
  image: string;
}

export interface Filters {
  categories: string[];
  location: { state: string; city: string };
  ticketSizeRange: [number, number];
  yieldRange: [number, number];
  tenure: string[];
  riskBand: string[];
  status: string[];
}

const Properties = () => {
  const { user, loading, isAuthenticated } = useAuth();

  // Show loading while auth resolves
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  // Show login prompt if user not logged in
  if (!isAuthenticated) {
  return (
    <div className="min-h-screen bg-secondary/100 flex flex-col">
      <Header />

      <section className="relative flex-1 flex flex-col justify-center items-center text-center px-6 to-accent overflow-hidden">
        
        {/* Decorative floating circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-white animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full border border-white animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4 drop-shadow-lg">
            Explore Premium Properties
          </h1>
          <p className="text-lg md:text-xl text-gray/90 mb-8 leading-relaxed drop-shadow-sm">
            Discover handpicked investment opportunities across India. Sign in to access detailed property listings, funding progress, projected yields, and more.
          </p>

          <Button
  size="lg"
  className="relative bg-gradient-to-r from-primary to-accent text-white font-semibold px-10 py-4 rounded-xl 
             shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
  onClick={() => (window.location.href = "/login")}
>
  <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></span>
  <span className="relative z-10">Login to Explore</span>
  <TrendingUp className="w-5 h-5" />
</Button>
          {/* Property type cards with floating animation */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Residential", subtitle: "Apartments & Villas" },
              { title: "Commercial", subtitle: "Offices & Retail" },
              { title: "Farmhouse", subtitle: "Weekend Getaways" },
            ].map((item, idx) => (
              <div
                key={item.title}
                className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all animate-float`}
                style={{ animationDelay: `${idx * 0.5}s` }}
              >
                <p className="font-bold text-primary text-lg mb-1">{item.title}</p>
                <p className="text-gray/80 text-sm">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

  // Filters state
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    location: { state: "", city: "" },
    ticketSizeRange: [10000, 10000000],
    yieldRange: [5, 25],
    tenure: [],
    riskBand: [],
    status: [],
  });

  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock properties
  const property: Property = {
    id: "1",
    title: "BRILLIA",
    location: "SG Highway, Ahmedabad",
    category: "Commercial",
    minInvest: 5000000,
    targetRaise: 120000000,
    raisedAmount: 75000000,
    projectedYield: 10,
    tenure: 36,
    riskBand: "Medium",
    status: "Open",
    highlights: [
      "Prime Location with excellent connectivity",
      "Ample Parking for employees and visitors",
      "Integrated Retail & Shopping Spaces",
      "Green Spaces & Gardens",
      "Designer Welcome Lounge",
      "Modern Office Spaces"
    ],
    image: img1,
  };

  const filteredProperties = [property]; // Only BRILLIA

  // Compare functions
  const addToCompare = (property: Property) => {
    if (compareList.length < 3 && !compareList.find((p) => p.id === property.id)) {
      setCompareList([...compareList, property]);
    }
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList(compareList.filter((p) => p.id !== propertyId));
  };

  // Filter properties
  // const filteredProperties = mockProperties.filter((property) => {
  //   if (
  //     searchQuery &&
  //     !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
  //     !property.location.toLowerCase().includes(searchQuery.toLowerCase())
  //   ) return false;

  //   if (filters.categories.length > 0 && !filters.categories.includes(property.category)) return false;
  //   if (property.minInvest < filters.ticketSizeRange[0] || property.minInvest > filters.ticketSizeRange[1])
  //     return false;
  //   if (property.projectedYield < filters.yieldRange[0] || property.projectedYield > filters.yieldRange[1])
  //     return false;
  //   if (filters.status.length > 0 && !filters.status.includes(property.status)) return false;
  //   if (filters.riskBand.length > 0 && !filters.riskBand.includes(property.riskBand)) return false;

  //   return true;
  // });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <PropertiesHero />

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <PropertiesToolbar
                sortBy={sortBy}
                onSortChange={setSortBy}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
                resultsCount={filteredProperties.length}
              />

              <PropertiesAnalytics properties={filteredProperties} />

              <PropertyGrid
                properties={filteredProperties}
                viewMode={viewMode}
                onAddToCompare={addToCompare}
                compareList={compareList}
              />

              <PropertiesCTA />
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        {isFilterOpen && (
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsFilterOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-80 bg-background"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(false)}
                isMobile
              />
            </div>
          </div>
        )}
      </main>

      <CompareDrawer
        properties={compareList}
        onRemove={removeFromCompare}
        onClear={() => setCompareList([])}
      />

      <Footer />
    </div>
  );
};

export default Properties;