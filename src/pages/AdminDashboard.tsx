import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Home,
  Users,
  Building2,
  BarChart3,
} from "lucide-react";
import API from "@/api/api"; // axios instance with baseURL+token

const AdminDashboard = () => {
  const navigate = useNavigate();

  // ✅ Fetch logged-in user
  // ✅ Fetch logged-in user
const { data: user, isLoading, isError } = useQuery({
  queryKey: ["me"],
  queryFn: async () => {
    const res = await API.get("/me");
    return res.data.user; // 👈 FIXED
  },
});


  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError || !user || user.role !== "admin") {
    return <div className="p-6 text-red-500">Unauthorized</div>;
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Welcome back, {user.name} 👋
          </p>
        </div>

        {/* Add Property button (only for admin) */}
        <Button
          onClick={() => navigate("/admin/add-property")}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Property
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <Home className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total Properties</p>
              <p className="text-xl font-bold">120</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <Users className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Investors</p>
              <p className="text-xl font-bold">45</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <Building2 className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-sm text-muted-foreground">Dealers</p>
              <p className="text-xl font-bold">10</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card
            className="cursor-pointer hover:shadow-md transition"
            onClick={() => navigate("/admin/properties")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Home className="w-6 h-6 mb-2 text-blue-500" />
              <p className="font-medium">Manage Properties</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition"
            onClick={() => navigate("/admin/investors")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users className="w-6 h-6 mb-2 text-green-500" />
              <p className="font-medium">View Investors</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition"
            onClick={() => navigate("/admin/reports")}
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <BarChart3 className="w-6 h-6 mb-2 text-purple-500" />
              <p className="font-medium">Reports & Analytics</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
