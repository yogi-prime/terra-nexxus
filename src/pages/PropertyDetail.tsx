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
import RelatedProperties from '@/components/property/RelatedProperties';
import PropertyCTA from '@/components/property/PropertyCTA';

// Mock property data - in real app, this would come from API
const mockProperty = {
  id: '1',
  title: 'Premium Commercial Tower - Cyber City',
  location: 'Sector 24, Gurugram, Haryana',
  category: 'Commercial Tower',
  images: [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ],
  video: '/placeholder.svg',
  minInvestment: 50000,
  targetRaise: 50000000,
  raisedSoFar: 22000000,
  projectedYield: 12.5,
  tenure: '36 months',
  riskBand: 'Moderate',
  description: 'Premium Grade-A commercial tower in the heart of Cyber City with Fortune 500 tenants and 15-year lease agreements.',
  highlights: [
    'Grade-A tenant with AAA credit rating',
    'Prime Cyber City location',
    '15-year triple net lease',
    'Escrow protected investment'
  ],
  financials: {
    capRate: 9.2,
    rentPsf: 85,
    vacancy: 5,
    oAndM: 8,
    managementFee: 2,
    exitCapRate: 8.5
  },
  documents: [
    { name: 'Title Deed', type: 'pdf', size: '2.1 MB' },
    { name: 'NOCs & Approvals', type: 'pdf', size: '1.8 MB' },
    { name: 'Valuation Report', type: 'pdf', size: '3.2 MB' },
    { name: 'Lease Agreement', type: 'pdf', size: '1.5 MB' }
  ],
  coordinates: { lat: 28.4595, lng: 77.0266 },
  nearbyAmenities: [
    { name: 'IGI Airport', distance: '12 km' },
    { name: 'Cyber City Metro', distance: '500 m' },
    { name: 'Ambience Mall', distance: '2 km' },
    { name: 'Top Schools', distance: '3 km' }
  ]
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <PropertyHero property={mockProperty} />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <PropertyOverview property={mockProperty} />
              <PropertyFinancials property={mockProperty} />
              <PropertyLegal property={mockProperty} />
              <PropertyOwnership property={mockProperty} />
              <PropertyLocation property={mockProperty} />
              <PropertyFAQs />
              <PropertyUpdates />
              <RelatedProperties />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PropertySidebar property={mockProperty} />
            </div>
          </div>
        </div>
        
        <PropertyCTA property={mockProperty} />
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;