import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, Users, Building, Target } from "lucide-react";

const timelineData = [
  {
    year: "2022",
    title: "Platform Launch",
    description: "Started with 2 premium properties",
    metrics: { raised: "₹50 Cr", investors: "500", properties: "2" }
  },
  {
    year: "2023", 
    title: "Rapid Expansion",
    description: "10x growth across all metrics", 
    metrics: { raised: "₹500 Cr", investors: "5,000", properties: "15" }
  },
  {
    year: "2024",
    title: "Market Leadership",
    description: "Became India's largest fractional platform",
    metrics: { raised: "₹1,200 Cr", investors: "15,000+", properties: "45+" }
  }
];

const aumGrowthData = [
  { month: 'Jan 23', aum: 100 },
  { month: 'Apr 23', aum: 200 },
  { month: 'Jul 23', aum: 350 },
  { month: 'Oct 23', aum: 500 },
  { month: 'Jan 24', aum: 700 },
  { month: 'Apr 24', aum: 900 },
  { month: 'Jul 24', aum: 1100 },
  { month: 'Oct 24', aum: 1200 }
];

const payoutData = [
  { year: '2022', payouts: 5 },
  { year: '2023', payouts: 45 },
  { year: '2024', payouts: 120 }
];

const categoryData = [
  { name: 'Residential', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Commercial', value: 30, color: 'hsl(var(--accent))' },
  { name: 'Agricultural', value: 15, color: 'hsl(var(--success))' },
  { name: 'Industrial', value: 10, color: 'hsl(var(--warning))' },
  { name: 'Retail', value: 6, color: 'hsl(var(--secondary))' },
  { name: 'Land Plots', value: 4, color: 'hsl(var(--muted))' }
];

export const GrowthImpact = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Growth & Impact</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From startup to market leader - tracking our journey of democratizing real estate investment
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Journey Timeline</h3>
          <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden md:flex justify-between items-center relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2"></div>
              {timelineData.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center max-w-xs">
                  <div className="w-4 h-4 bg-primary rounded-full mb-4 relative z-10 ring-4 ring-background"></div>
                  <Card className="border-0 shadow-lg hover-glow">
                    <CardHeader className="text-center pb-2">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{item.year}</CardTitle>
                      </div>
                      <h4 className="font-semibold">{item.title}</h4>
                    </CardHeader>
                    <CardContent className="pt-0 text-center">
                      <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Raised:</span>
                          <span className="font-semibold text-primary">{item.metrics.raised}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Investors:</span>
                          <span className="font-semibold text-accent">{item.metrics.investors}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Properties:</span>
                          <span className="font-semibold text-success">{item.metrics.properties}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden space-y-6">
              {timelineData.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    {index < timelineData.length - 1 && <div className="w-0.5 bg-border h-full mt-2"></div>}
                  </div>
                  <Card className="flex-1 border-0 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">{item.year} - {item.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-semibold text-primary">{item.metrics.raised}</div>
                          <div className="text-muted-foreground">Raised</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-accent">{item.metrics.investors}</div>
                          <div className="text-muted-foreground">Investors</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-success">{item.metrics.properties}</div>
                          <div className="text-muted-foreground">Properties</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AUM Growth Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                AUM Growth (₹ Cr)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={aumGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="aum" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Yearly Payouts */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-accent" />
                Yearly Payouts (₹ Cr)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={payoutData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="year" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="payouts" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-success" />
                Investor Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Key Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Average Min Ticket", value: "₹25,000", icon: Target },
            { label: "Average Yield", value: "12.5%", icon: TrendingUp },
            { label: "Total Investors", value: "15,000+", icon: Users },
            { label: "Cumulative Payouts", value: "₹170 Cr", icon: Building }
          ].map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg text-center hover-glow">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};