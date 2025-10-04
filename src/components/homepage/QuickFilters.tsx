import React, { useEffect, useState } from "react";
import {
  Building2,
  Home,
  Factory,
  Users,
  Square,
  TreePine,
} from "lucide-react";

const DEFAULT_ICONS = [Building2, Home, Factory, Users, Square, TreePine];
const API_BASE = "https://app.terranexxus.com/api/v1";

function getIconFromString(str: string) {
  const index =
    Math.abs(
      (str || "")
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % DEFAULT_ICONS.length;
  return DEFAULT_ICONS[index];
}

type PT = { name: string; count: number };

export const QuickFilters = () => {
  const [propertyTypes, setPropertyTypes] = useState<PT[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/properties/filters`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        let list: PT[] = [];
        if (Array.isArray(data?.property_types)) {
          list = data.property_types.map((pt: any) => ({
            name: String(pt?.name ?? "").trim(),
            count: Number(pt?.count ?? 0),
          }));
        } else if (data?.property_types && typeof data.property_types === "object") {
          list = Object.entries(data.property_types).map(([name, count]) => ({
            name: String(name).trim(),
            count: Number(count ?? 0),
          }));
        }

        if (!list.length) setError("No property types found");
        if (mounted) setPropertyTypes(list);
      } catch (e) {
        console.error("Failed to load property types:", e);
        if (mounted) setError("Failed to load property types");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-card border border-border rounded-xl p-6" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Property Types
          </h2>
          <p className="text-lg text-muted-foreground">
            Find the perfect property that matches your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {propertyTypes.map((type) => {
            const IconComponent = getIconFromString(type.name);
            return (
              <button
                key={type.name}
                className="group bg-card border border-border rounded-xl p-6 text-center hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white border border-primary rounded-full group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {type.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {type.count.toLocaleString("en-IN")}+ listings
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
