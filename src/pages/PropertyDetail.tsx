import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import PropertyHero from '@/components/property/PropertyHero';
import PropertySidebar from '@/components/property/PropertySidebar';
import PropertyOverview from '@/components/property/PropertyOverview';
import PropertyFinancials from '@/components/property/PropertyFinancials';
import PropertyLegal from '@/components/property/PropertyLegal';
import PropertyOwnership from '@/components/property/PropertyOwnership';
import PropertyLocation from '@/components/property/PropertyLocation';
import PropertyFAQs from '@/components/property/PropertyFAQs';
import PropertyUpdates from '@/components/property/PropertyUpdates';
import PropertyCTA from '@/components/property/PropertyCTA';

import img1 from "@/assets/1.jpg";
import img6 from "@/assets/6.jpg";
import img11 from "@/assets/11.jpg";

// BRILLIA property data
const brilliaProperty = {
  id: '1',
  title: 'BRILLIA - Pravish',
  location: 'SG Highway, Ahmedabad',
  category: 'Commercial',
  images: [img1, img6, img11], // PropertyHero uses this
  minInvestment: 5000000,
  targetRaise: 120000000,
  raisedSoFar: 75000000,
  projectedYield: 10,
  tenure: '36 months',
  riskBand: 'Medium',
  description:
    'BRILLIA is a premium commercial property located on SG Highway, Ahmedabad, offering modern office spaces, integrated retail, green areas, and ample parking.',
  highlights: [
    'Prime Location with excellent connectivity',
    'Ample Parking for employees and visitors',
    'Integrated Retail & Shopping Spaces',
    'Green Spaces & Gardens',
    'Designer Welcome Lounge',
    'Modern Office Spaces',
  ],
  financials: {
    capRate: 8.5,
    rentPsf: 80,
    vacancy: 5,
    oAndM: 7,
    managementFee: 2,
    exitCapRate: 8,
  },
  documents: [
    { name: 'Title Deed', type: 'pdf', size: '2.1 MB' },
    { name: 'NOCs & Approvals', type: 'pdf', size: '1.8 MB' },
    { name: 'Valuation Report', type: 'pdf', size: '3.2 MB' },
    { name: 'Lease Agreement', type: 'pdf', size: '1.5 MB' },
  ],
  coordinates: { lat: 23.0338, lng: 72.5850 },
  nearbyAmenities: [
    { name: 'SG Highway Metro', distance: '500 m' },
    { name: 'Cafes & Restaurants', distance: '200 m' },
    { name: 'Shopping Centers', distance: '1 km' },
    { name: 'Schools', distance: '2 km' },
  ],
};


const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Only BRILLIA exists
  if (id !== brilliaProperty.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Property not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <PropertyHero property={brilliaProperty} />

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <PropertyOverview property={brilliaProperty} />
              <PropertyFinancials property={brilliaProperty} />
              <PropertyLegal property={brilliaProperty} />
              <PropertyOwnership property={brilliaProperty} />
              <PropertyLocation property={brilliaProperty} />
              <PropertyFAQs />
              <PropertyUpdates />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PropertySidebar property={brilliaProperty} />
            </div>
          </div>
        </div>

        <PropertyCTA property={brilliaProperty} />
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
