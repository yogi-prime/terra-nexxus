import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Square,
  DollarSign,
  Home,
  Bath,
  Calendar,
  Building,
  Layers,
  Ruler,
  CreditCard,
  CheckCircle,
  FileDown,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const MarketplacePropertySidebar = () => {
  return (
    <Card className="rounded-xl border">
      <CardHeader>
        <CardTitle>Interested?</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="w-full">Contact Seller</Button>
      </CardContent>
    </Card>
  );
};
export default MarketplacePropertySidebar;
