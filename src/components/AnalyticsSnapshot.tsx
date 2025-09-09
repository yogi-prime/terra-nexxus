import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building2, Users, DollarSign } from "lucide-react";

const mockData = {
  fundingData: [
    { month: 'Jan', amount: 45 },
    { month: 'Feb', amount: 52 },
    { month: 'Mar', amount: 61 },
    { month: 'Apr', amount: 73 },
    { month: 'May', amount: 89 },
    { month: 'Jun', amount: 108 },
    { month: 'Jul', amount: 124 },
    { month: 'Aug', amount: 142 },
    { month: 'Sep', amount: 165 },
    { month: 'Oct', amount: 189 },
    { month: 'Nov', amount: 218 },
    { month: 'Dec', amount: 247 }
  ],
  categoryData: [
    { name: 'Residential', value: 45, color: 'var(--primary)' },
    { name: 'Commercial', value: 30, color: 'var(--accent)' },
    { name: 'Land', value: 15, color: 'var(--success)' },
    { name: 'Warehouse', value: 10, color: 'var(--warning)' }
  ],
  topProperties: [
    { name: 'Phoenix Tower, Bengaluru', funded: 89, yield: 14.2, tenure: '3 years' },
    { name: 'Green Valley Plots, Pune', funded: 76, yield: 12.8, tenure: '5 years' },
    { name: 'Mall Complex, Hyderabad', funded: 92, yield: 15.1, tenure: '7 years' },
    { name: 'IT Park, Chennai', funded: 67, yield: 11.9, tenure: '4 years' },
    { name: 'Residential Tower, Mumbai', funded: 84, yield: 13.5, tenure: '6 years' }
  ]
};

export const AnalyticsSnapshot = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Market Intelligence</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time data and analytics driving smart investment decisions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Funding Growth Chart */}
          <Card className="lg:col-span-2 hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Funding Raised (Last 12 Months)
              </CardTitle>
              <CardDescription>
                Total: ₹247 Cr raised • +89% YoY growth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                {mockData.fundingData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full gradient-primary rounded-t-md transition-all hover:opacity-80"
                      style={{ height: `${(data.amount / 247) * 200}px` }}
                    />
                    <span className="text-xs text-muted-foreground">{data.month}</span>
                    <span className="text-xs font-semibold">₹{data.amount}Cr</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent" />
                Investment Split
              </CardTitle>
              <CardDescription>By property category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.categoryData.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm text-muted-foreground">{category.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${category.value}%`,
                          backgroundColor: category.color.includes('var') ? `hsl(${category.color.replace('var(--', '').replace(')', '')})` : category.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Properties Leaderboard */}
        <Card className="mt-8 hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-success" />
              Top Performing Properties
            </CardTitle>
            <CardDescription>Ranked by funding progress and projected yields</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Property</th>
                    <th className="text-center py-3 px-4 font-semibold">Funding Progress</th>
                    <th className="text-center py-3 px-4 font-semibold">Projected Yield</th>
                    <th className="text-center py-3 px-4 font-semibold">Tenure</th>
                    <th className="text-center py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.topProperties.map((property, index) => (
                    <tr key={property.name} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            #{index + 1}
                          </Badge>
                          <span className="font-medium">{property.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-primary">{property.funded}%</div>
                          <div className="w-20 bg-muted rounded-full h-2 mx-auto">
                            <div 
                              className="h-2 bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${property.funded}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-lg font-bold text-success">{property.yield}%</span>
                        <div className="text-xs text-muted-foreground">p.a.</div>
                      </td>
                      <td className="text-center py-4 px-4 text-muted-foreground">
                        {property.tenure}
                      </td>
                      <td className="text-center py-4 px-4">
                        <Badge 
                          variant={property.funded > 85 ? "outline" : "secondary"}
                          className={property.funded > 85 ? "bg-success/10 text-success border-success/20" : ""}
                        >
                          {property.funded > 85 ? "Closing Soon" : "Open"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};