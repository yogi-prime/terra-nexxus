// pages/MarketplacePropertyDetails.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import API from "@/api/api"; // axios instance
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import MarketplacePropertyOverview from "@/components/MarketplaceDetails/MarketplacePropertyOverview";
import MarketplacePropertySpecifications from "@/components/MarketplaceDetails/MarketplacePropertySpecifications";
import MarketplacePropertyAmenities from "@/components/MarketplaceDetails/MarketplacePropertyAmenities";
import MarketplacePropertyGallery from "@/components/MarketplaceDetails/MarketplacePropertyGallery";
import MarketplacePropertyLocation from "@/components/MarketplaceDetails/MarketplacePropertyLocation";
import MarketplacePropertySidebar from "@/components/MarketplaceDetails/MarketplacePropertySidebar";

const MarketplacePropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // ✅ fetch property by ID
  const { data: property, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await API.get(`/properties/${id}`); // your backend endpoint
      return res.data;
    },
    enabled: !!id, // only fetch if id exists
  });

  if (isLoading) return <p>Loading property...</p>;
  if (error) return <p>Failed to load property</p>;
  if (!property) return <p>No property found</p>;

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* ✅ First Row: Header (left) + About & Amenities (right) */}
          <div className="lg:col-span-5 space-y-8">
            <MarketplacePropertyOverview property={property} />
          </div>

        {/* ✅ Second Row: Overview (left) + Specifications (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-7 space-y-8">
            <MarketplacePropertyAmenities property={property} />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <MarketplacePropertySpecifications property={property} />
            
          </div>
        </div>

        {/* ✅ Third Row: Gallery + Location (left) + Sidebar (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-7 space-y-8">
            <MarketplacePropertyGallery property={property} />
          </div>
          <div className="lg:col-span-5">
  <div className="sticky top-20 space-y-6">
    <MarketplacePropertySidebar />
    <MarketplacePropertyLocation property={property} />
  </div>
</div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default MarketplacePropertyDetails;
