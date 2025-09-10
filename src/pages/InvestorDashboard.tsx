import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, TrendingUp, PieChart, FileText } from "lucide-react";

const InvestorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Investor Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome to Terra Nexxus</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">Demo User</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Overview */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">Portfolio Value</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">₹0</div>
              <div className="text-sm text-muted-foreground">Complete KYC to start investing</div>
            </div>
          </Card>

          {/* Investment Analytics */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="h-6 w-6 text-primary" />
              <h3 className="font-semibold">Total Investments</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">0</div>
              <div className="text-sm text-muted-foreground">Properties in portfolio</div>
            </div>
          </Card>

          {/* KYC Status */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-warning" />
              <h3 className="font-semibold">KYC Status</h3>
            </div>
            <div className="space-y-3">
              <div className="text-sm text-warning">Pending Verification</div>
              <Button size="sm" variant="outline" className="w-full">
                Complete KYC
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => navigate("/properties")}
            >
              <TrendingUp className="h-6 w-6" />
              Browse Properties
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => navigate("/resources")}
            >
              <FileText className="h-6 w-6" />
              Learning Resources
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
              onClick={() => navigate("/posts")}
            >
              <PieChart className="h-6 w-6" />
              Market Insights
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2"
            >
              <User className="h-6 w-6" />
              Profile Settings
            </Button>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 p-6 bg-accent/20 rounded-lg border border-accent/30">
          <h3 className="font-semibold mb-2">Demo Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            This is a placeholder investor dashboard. In a real application, this would show:
            portfolio performance, investment history, document management, and personalized recommendations.
          </p>
          <div className="flex gap-3 mt-4">
            <Button 
              variant="premium" 
              size="sm"
              onClick={() => navigate("/properties")}
            >
              Explore Properties
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate("/")}
            >
              Back to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;