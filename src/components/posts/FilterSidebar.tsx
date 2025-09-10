import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Calendar, User, Tag } from "lucide-react";

interface FilterSidebarProps {
  filters: {
    type: string;
    category: string;
    sortBy: string;
    searchTerm: string;
    dateRange: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const FilterSidebar = ({ filters, onFiltersChange }: FilterSidebarProps) => {
  const contentTypes = [
    { id: "all", label: "All Content", count: 750 },
    { id: "blog", label: "Blog Posts", count: 320 },
    { id: "news", label: "Market News", count: 180 },
    { id: "case-study", label: "Case Studies", count: 65 },
    { id: "story", label: "Success Stories", count: 90 },
    { id: "video", label: "Videos", count: 85 },
    { id: "research", label: "Research", count: 10 },
  ];

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "agri-land", label: "Agricultural Land" },
    { id: "farmhouse", label: "Farmhouse" },
    { id: "plots", label: "Plots" },
    { id: "industrial", label: "Industrial" },
  ];

  const sortOptions = [
    { id: "latest", label: "Latest First" },
    { id: "trending", label: "Trending" },
    { id: "most-viewed", label: "Most Viewed" },
    { id: "editors-pick", label: "Editor's Pick" },
  ];

  const dateRanges = [
    { id: "all", label: "All Time" },
    { id: "7days", label: "Last 7 Days" },
    { id: "30days", label: "Last 30 Days" },
    { id: "90days", label: "Last 3 Months" },
  ];

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="sticky top-8 space-y-6">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" />
            Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, topics..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Content Type */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Content Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {contentTypes.map((type) => (
            <Button
              key={type.id}
              variant={filters.type === type.id ? "default" : "ghost"}
              className="w-full justify-between text-left"
              onClick={() => updateFilter("type", type.id)}
            >
              <span>{type.label}</span>
              <Badge variant="secondary" className="text-xs">
                {type.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filters.category === category.id ? "default" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => updateFilter("category", category.id)}
            >
              {category.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Sort By */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {sortOptions.map((option) => (
            <Button
              key={option.id}
              variant={filters.sortBy === option.id ? "default" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => updateFilter("sortBy", option.id)}
            >
              {option.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Date Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Date Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {dateRanges.map((range) => (
            <Button
              key={range.id}
              variant={filters.dateRange === range.id ? "default" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => updateFilter("dateRange", range.id)}
            >
              {range.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => onFiltersChange({
          type: "all",
          category: "all",
          sortBy: "latest",
          searchTerm: "",
          dateRange: "all"
        })}
      >
        Clear All Filters
      </Button>
    </div>
  );
};