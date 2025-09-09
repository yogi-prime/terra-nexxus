import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Property } from "@/pages/Properties";
import { TrendingUp, Target, Users, DollarSign } from "lucide-react";

interface PropertiesAnalyticsProps {
  properties: Property[];
}

export const PropertiesAnalytics = ({ properties }: PropertiesAnalyticsProps) => {
  // Calculate analytics data
  const totalTarget = properties.reduce((sum, p) => sum + p.targetRaise, 0);
  const totalRaised = properties.reduce((sum, p) => sum + p.raisedAmount, 0);
  const avgMinTicket = properties.reduce((sum, p) => sum + p.minInvest, 0) / properties.length;
  const avgYield = properties.reduce((sum, p) => sum + p.projectedYield, 0) / properties.length;
  const totalInvestors = Math.floor(totalRaised / avgMinTicket) * 2.3; // Estimated

  // Funding data for bar chart
  const fundingData = properties.slice(0, 6).map(property => ({
    name: property.title.split(' ').slice(0, 2).join(' '),
    target: property.targetRaise / 10000000, // Convert to Cr
    raised: property.raisedAmount / 10000000,
    percentage: (property.raisedAmount / property.targetRaise) * 100
  }));

  // Category distribution for pie chart
  const categoryData = properties.reduce((acc, property) => {
    const existing = acc.find(item => item.name === property.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: property.category, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  const kpiCards = [
    {
      title: "Avg Min Ticket",
      value: formatCurrency(avgMinTicket || 0),
      icon: DollarSign,
      change: "+12%"
    },
    {
      title: "Avg Yield",
      value: `${avgYield?.toFixed(1) || 0}%`,
      icon: TrendingUp,
      change: "+2.3%"
    },
    {
      title: "Total Investors",
      value: totalInvestors.toLocaleString(),
      icon: Users,
      change: "+18%"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      icon: Target,
      change: "+5.1%"
    }
  ];

  return (
    <div className="mb-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpiCards.map((kpi, index) => (
          <div
            key={index}
            className="bg-card-premium border border-accent/20 rounded-xl p-4 hover:border-accent/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <kpi.icon className="h-5 w-5 text-accent" />
              <span className="text-xs text-success font-medium">{kpi.change}</span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {kpi.value}
            </div>
            <p className="text-sm text-muted-foreground">{kpi.title}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Funding Progress Chart */}
        <div className="bg-card border border-accent/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Funding Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fundingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number, name: string) => [
                  `₹${value.toFixed(1)} Cr`,
                  name === 'target' ? 'Target' : 'Raised'
                ]}
              />
              <Bar dataKey="target" fill="hsl(var(--muted))" name="target" radius={[4, 4, 0, 0]} />
              <Bar dataKey="raised" fill="hsl(var(--primary))" name="raised" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-card border border-accent/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};