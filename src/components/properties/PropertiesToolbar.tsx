import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react";

interface PropertiesToolbarProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onFilterToggle: () => void;
  resultsCount: number;
}

export const PropertiesToolbar = ({
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onFilterToggle,
  resultsCount,
}: PropertiesToolbarProps) => {
  return (
    <div className="bg-card border border-accent/20 rounded-xl p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Left Side - Search and Results Count */}
        <div className="flex-1 flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by property name, city, owner..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            {resultsCount} properties found
          </div>
        </div>

        {/* Right Side - Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onFilterToggle}
            className="lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="yield-high">Highest Yield</SelectItem>
              <SelectItem value="yield-low">Lowest Yield</SelectItem>
              <SelectItem value="funded-high">Most Funded</SelectItem>
              <SelectItem value="closing-soon">Closing Soon</SelectItem>
              <SelectItem value="min-invest-low">Min Investment (Low to High)</SelectItem>
              <SelectItem value="min-invest-high">Min Investment (High to Low)</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-accent/20 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};