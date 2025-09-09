import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { X, Filter, RotateCcw } from "lucide-react";
import { Filters } from "@/pages/Properties";

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

export const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle, 
  isMobile = false 
}: FilterSidebarProps) => {
  const categories = [
    "Residential", 
    "Commercial", 
    "Farmhouse", 
    "Agri Land", 
    "Res Plots", 
    "Ind Plots"
  ];
  
  const statusOptions = ["Open", "Closing Soon", "Fully Funded", "Closed"];
  const riskBands = ["Low", "Medium", "High"];
  const tenureOptions = ["Short (< 24 months)", "Medium (24-48 months)", "Long (> 48 months)"];

  const states = [
    "Maharashtra", "Karnataka", "Haryana", "Delhi", "Tamil Nadu", 
    "Gujarat", "Rajasthan", "Uttar Pradesh", "West Bengal", "Telangana"
  ];

  const cities = {
    "Maharashtra": ["Mumbai", "Pune", "Nashik", "Aurangabad", "Nagpur"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
    "Haryana": ["Gurugram", "Faridabad", "Panipat", "Karnal"],
    "Delhi": ["New Delhi", "Central Delhi", "South Delhi", "West Delhi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "Uttar Pradesh": ["Noida", "Ghaziabad", "Lucknow", "Kanpur"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"]
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...filters.status, status]
      : filters.status.filter(s => s !== status);
    
    onFiltersChange({ ...filters, status: newStatus });
  };

  const handleRiskChange = (risk: string, checked: boolean) => {
    const newRisk = checked
      ? [...filters.riskBand, risk]
      : filters.riskBand.filter(r => r !== risk);
    
    onFiltersChange({ ...filters, riskBand: newRisk });
  };

  const resetFilters = () => {
    onFiltersChange({
      categories: [],
      location: { state: "", city: "" },
      ticketSizeRange: [10000, 10000000],
      yieldRange: [5, 25],
      tenure: [],
      riskBand: [],
      status: [],
    });
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  return (
    <div className="bg-card border border-accent/20 rounded-xl p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-accent" />
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Property Category</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
              />
              <label htmlFor={category} className="text-sm font-medium">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Location Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Location</h4>
        <div className="space-y-3">
          <Select
            value={filters.location.state}
            onValueChange={(value) => 
              onFiltersChange({ 
                ...filters, 
                location: { state: value, city: "" } 
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {filters.location.state && (
            <Select
              value={filters.location.city}
              onValueChange={(value) => 
                onFiltersChange({ 
                  ...filters, 
                  location: { ...filters.location, city: value } 
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities[filters.location.state as keyof typeof cities]?.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Ticket Size Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Min Investment Range</h4>
        <div className="px-2">
          <Slider
            value={filters.ticketSizeRange}
            onValueChange={(value) => 
              onFiltersChange({ ...filters, ticketSizeRange: value as [number, number] })
            }
            max={10000000}
            min={10000}
            step={10000}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatCurrency(filters.ticketSizeRange[0])}</span>
            <span>{formatCurrency(filters.ticketSizeRange[1])}</span>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Yield Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Expected Yield Range</h4>
        <div className="px-2">
          <Slider
            value={filters.yieldRange}
            onValueChange={(value) => 
              onFiltersChange({ ...filters, yieldRange: value as [number, number] })
            }
            max={25}
            min={5}
            step={0.5}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.yieldRange[0]}%</span>
            <span>{filters.yieldRange[1]}%</span>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Risk Band Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Risk Band</h4>
        <div className="space-y-3">
          {riskBands.map((risk) => (
            <div key={risk} className="flex items-center space-x-2">
              <Checkbox
                id={risk}
                checked={filters.riskBand.includes(risk)}
                onCheckedChange={(checked) => handleRiskChange(risk, !!checked)}
              />
              <label htmlFor={risk} className="text-sm font-medium">
                {risk}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Status Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Funding Status</h4>
        <div className="space-y-3">
          {statusOptions.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox
                id={status}
                checked={filters.status.includes(status)}
                onCheckedChange={(checked) => handleStatusChange(status, !!checked)}
              />
              <label htmlFor={status} className="text-sm font-medium">
                {status}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <Button className="w-full" variant="hero">
        Apply Filters
      </Button>
    </div>
  );
};