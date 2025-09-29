import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import CustomerRequirement from "./pages/CustomerRequirement";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Posts from "./pages/Posts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TerraShare from "./pages/TerraShare";
import PropertyShow from "./pages/PropertyShow";
import InvestorDashboard from "./pages/InvestorDashboard";
import AdminPropertyWizard from "./pages/AdminPropertyWizard";
import NotFound from "./pages/NotFound";
import AddProperty from "./pages/AddProperty";
import MarketPlace from "./pages/Marketplace";
import MarketplacePropertyDetails from "./pages/MarketplacePropertyDetails";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/property-show/:id" element={<PropertyShow />} />
          <Route path="/admin-property" element={<AdminPropertyWizard />} />
          <Route path="/customer-requirement" element={<CustomerRequirement />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-property" element={<AddProperty />} />
          <Route path="/terrashare" element={<TerraShare />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/investor/:id" element={<InvestorDashboard />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/marketplace/property/:id" element={<MarketplacePropertyDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
