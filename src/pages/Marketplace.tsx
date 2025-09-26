import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "@/api/api";
import { MarketplaceHero } from "@/components/Marketplace/MarketplaceHero";
import { MarketplaceToolbar } from "@/components/Marketplace/MarketplaceToolbar";
import { MarketplaceGrid } from "@/components/Marketplace/MarketplaceGrid";

export default function Marketplace() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["marketplace-properties"],
    queryFn: async () => {
      const res = await API.get("/properties");
      console.log("API data:", res.data); // 👀 check shape
      return res.data;
    },
  });

  // 🔎 Simple client-side search
  const filtered = properties.filter((p: any) =>
    p.property_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔽 Robust sort logic
  const sorted = [...filtered].sort((a: any, b: any) => {
    const parseNum = (val: any) => {
      const num = parseInt(val, 10);
      return isNaN(num) ? 0 : num;
    };

    switch (sortBy) {
      case "price-low":
        return parseNum(a.price) - parseNum(b.price);

      case "price-high":
        return parseNum(b.price) - parseNum(a.price);

      case "sqft-high":
        return parseNum(b.property_sqft) - parseNum(a.property_sqft);

      case "sqft-low":
        return parseNum(a.property_sqft) - parseNum(b.property_sqft);

      case "possession":
        return String(a.possession || "").localeCompare(String(b.possession || ""));

      case "newest":
      default: {
        // Prefer created_at if available
        if (a.created_at && b.created_at) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }

        // Fallback to numeric IDs
        if (typeof a.id === "number" && typeof b.id === "number") {
          return b.id - a.id;
        }

        // Fallback to string compare
        return String(b.id).localeCompare(String(a.id));
      }
    }
  });

  return (
    <div>
      <MarketplaceHero />

      <MarketplaceToolbar
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onFilterToggle={() => console.log("Open filters")}
        resultsCount={sorted.length}
      />

      {isLoading ? (
        <p className="text-center py-10">Loading properties...</p>
      ) : (
        <MarketplaceGrid properties={sorted} viewMode={viewMode} />
      )}
    </div>
  );
}
