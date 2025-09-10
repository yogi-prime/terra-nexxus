import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, FileText, Video, BarChart3, Award } from "lucide-react";

export const AnalyticsInsights = () => {
  const contentStats = [
    { type: "Blogs", count: 320, percentage: 42.7, color: "hsl(var(--primary))" },
    { type: "News", count: 180, percentage: 24.0, color: "hsl(var(--accent))" },
    { type: "Case Studies", count: 65, percentage: 8.7, color: "hsl(var(--success))" },
    { type: "Stories", count: 90, percentage: 12.0, color: "hsl(var(--warning))" },
    { type: "Videos", count: 85, percentage: 11.3, color: "hsl(var(--destructive))" },
    { type: "Research", count: 10, percentage: 1.3, color: "hsl(var(--muted))" },
  ];

  const topPosts = [
    { title: "Why Fractional Real Estate is Growing 40% CAGR", views: 15420, category: "Blog" },
    { title: "Commercial vs Residential: ROI Comparison", views: 12890, category: "Research" },
    { title: "Success Story: ₹50K to ₹72K in 3 Years", views: 11560, category: "Story" },
    { title: "Property Walkthrough: Mumbai Tower", views: 9780, category: "Video" },
    { title: "Understanding SPV Structure", views: 8990, category: "Blog" },
  ];

  const monthlyGrowth = [
    { month: "Jul", views: 45000 },
    { month: "Aug", views: 52000 },
    { month: "Sep", views: 61000 },
    { month: "Oct", views: 68000 },
    { month: "Nov", views: 78000 },
    { month: "Dec", views: 89000 },
  ];

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Content Analytics</h2>
        <Badge variant="outline" className="text-xs">
          Live Data
        </Badge>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Content Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Content Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentStats.map((stat) => (
                <div key={stat.type} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{stat.type}</span>
                    <span className="text-muted-foreground">{stat.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${stat.percentage}%`,
                        backgroundColor: stat.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Top Performing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 mb-1">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Monthly Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">89K</div>
                <div className="text-sm text-muted-foreground">Total Views This Month</div>
                <div className="flex items-center justify-center gap-1 text-sm text-success mt-1">
                  <TrendingUp className="w-3 h-3" />
                  +14.1% from last month
                </div>
              </div>
              
              <div className="space-y-3">
                {monthlyGrowth.map((data) => (
                  <div key={data.month} className="flex items-center gap-3">
                    <div className="w-8 text-xs text-muted-foreground font-medium">
                      {data.month}
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{
                          width: `${(data.views / 100000) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground min-w-12 text-right">
                      {(data.views / 1000).toFixed(0)}K
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};