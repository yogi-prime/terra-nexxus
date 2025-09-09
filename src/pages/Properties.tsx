import { useState } from "react";
import { Header } from "@/components/Header";
import { PropertiesHero } from "@/components/properties/PropertiesHero";
import { FilterSidebar } from "@/components/properties/FilterSidebar";
import { PropertiesToolbar } from "@/components/properties/PropertiesToolbar";
import { PropertiesAnalytics } from "@/components/properties/PropertiesAnalytics";
import { PropertyGrid } from "@/components/properties/PropertyGrid";
import { CompareDrawer } from "@/components/properties/CompareDrawer";
import { PropertiesCTA } from "@/components/properties/PropertiesCTA";
import { Footer } from "@/components/Footer";

export interface Property {
  id: string;
  title: string;
  location: string;
  category: "Residential" | "Commercial" | "Farmhouse" | "Agri Land" | "Res Plots" | "Ind Plots";
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

  const mockProperties: Property[] = [
    {
      id: "1",
      title: "Phoenix One Bengaluru West",
      location: "Bengaluru, Karnataka",
      category: "Commercial",
      minInvest: 25000,
      targetRaise: 50000000,
      raisedAmount: 42500000,
      projectedYield: 12.5,
      tenure: 36,
      riskBand: "Medium",
      status: "Open",
      highlights: ["Grade-A Office", "Tech Park Location", "Anchor Tenant"],
      image: "/api/placeholder/400/300"
    },
    {
      id: "2", 
      title: "Green Valley Farmhouse",
      location: "Lonavala, Maharashtra",
      category: "Farmhouse",
      minInvest: 10000,
      targetRaise: 15000000,
      raisedAmount: 15000000,
      projectedYield: 8.5,
      tenure: 24,
      riskBand: "Low",
      status: "Fully Funded",
      highlights: ["Nature Resort", "Weekend Getaway", "Rental Income"],
      image: "/api/placeholder/400/300"
    },
    {
      id: "3",
      title: "Sector 18 Residential Plot",
      location: "Gurugram, Haryana", 
      category: "Res Plots",
      minInvest: 50000,
      targetRaise: 75000000,
      raisedAmount: 67500000,
      projectedYield: 15.2,
      tenure: 48,
      riskBand: "High",
      status: "Closing Soon",
      highlights: ["Prime Location", "Metro Connectivity", "High Appreciation"],
      image: "/api/placeholder/400/300"
    },
    {
      id: "4",
      title: "Warehouse Complex Pune",
      location: "Pune, Maharashtra",
      category: "Ind Plots", 
      minInvest: 100000,
      targetRaise: 120000000,
      raisedAmount: 96000000,
      projectedYield: 14.8,
      tenure: 60,
      riskBand: "Medium",
      status: "Open",
      highlights: ["Logistics Hub", "E-commerce Ready", "Long Lease"],
      image: "/api/placeholder/400/300"
    },
    {
      id: "5",
      title: "Luxury Apartments Hyderabad",
      location: "Hyderabad, Telangana",
      category: "Residential",
      minInvest: 20000,
      targetRaise: 80000000,
      raisedAmount: 32000000,
      projectedYield: 10.5,
      tenure: 36,
      riskBand: "Low",
      status: "Open", 
      highlights: ["Gated Community", "Premium Amenities", "IT Corridor"],
      image: "/api/placeholder/400/300"
    },
    {
      id: "6",
      title: "Organic Farm Land",
      location: "Nashik, Maharashtra",
      category: "Agri Land",
      minInvest: 15000,
      targetRaise: 25000000,
      raisedAmount: 18750000,
      projectedYield: 9.2,
      tenure: 30,
      riskBand: "Medium",
      status: "Open",
      highlights: ["Certified Organic", "Water Access", "Grape Cultivation"],
      image: "/api/placeholder/400/300"
    }
  ];

  const addToCompare = (property: Property) => {
    if (compareList.length < 3 && !compareList.find(p => p.id === property.id)) {
      setCompareList([...compareList, property]);
    }
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList(compareList.filter(p => p.id !== propertyId));
  };

  const filteredProperties = mockProperties.filter(property => {
    // Apply search filter
    if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply category filter
    if (filters.categories.length > 0 && !filters.categories.includes(property.category)) {
      return false;
    }

    // Apply ticket size filter
    if (property.minInvest < filters.ticketSizeRange[0] || property.minInvest > filters.ticketSizeRange[1]) {
      return false;
    }

    // Apply yield filter
    if (property.projectedYield < filters.yieldRange[0] || property.projectedYield > filters.yieldRange[1]) {
      return false;
    }

    // Apply status filter
    if (filters.status.length > 0 && !filters.status.includes(property.status)) {
      return false;
    }

    // Apply risk band filter
    if (filters.riskBand.length > 0 && !filters.riskBand.includes(property.riskBand)) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
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
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsFilterOpen(false)}>
            <div className="absolute right-0 top-0 h-full w-80 bg-background" onClick={e => e.stopPropagation()}>
              <FilterSidebar 
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(false)}
                isMobile={true}
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