import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  PieChart, 
  BarChart3,
  Wallet
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const FeaturedCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState(0);

  // Future Value Calculator State
  const [fvAmount, setFvAmount] = useState(100000);
  const [fvYears, setFvYears] = useState(5);
  const [fvRate, setFvRate] = useState(12);

  // SIP Calculator State
  const [sipAmount, setSipAmount] = useState(10000);
  const [sipYears, setSipYears] = useState(10);
  const [sipRate, setSipRate] = useState(12);

  // Goal Calculator State
  const [goalTarget, setGoalTarget] = useState(1000000);
  const [goalYears, setGoalYears] = useState(8);
  const [goalRate, setGoalRate] = useState(12);

  const calculators = [
    {
      id: 0,
      title: "Future Value Calculator",
      description: "Calculate how your lumpsum investment will grow",
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      id: 1,
      title: "SIP / DCA Planner",
      description: "Plan your systematic investment journey",
      icon: Calculator,
      color: "text-accent"
    },
    {
      id: 2,
      title: "Goal Calculator",
      description: "Find out how much to invest for your target",
      icon: Target,
      color: "text-success"
    },
    {
      id: 3,
      title: "Diversification Score",
      description: "Analyze your portfolio diversification",
      icon: PieChart,
      color: "text-warning"
    },
    {
      id: 4,
      title: "IRR Scenario Tool",
      description: "Model different return scenarios",
      icon: BarChart3,
      color: "text-secondary"
    },
    {
      id: 5,
      title: "Affordability Helper",
      description: "Find properties that match your budget",
      icon: Wallet,
      color: "text-primary"
    }
  ];

  // Calculation functions
  const calculateFV = () => {
    const futureValue = fvAmount * Math.pow(1 + fvRate / 100, fvYears);
    return Math.round(futureValue);
  };

  const calculateSIP = () => {
    const monthlyRate = sipRate / 100 / 12;
    const months = sipYears * 12;
    const futureValue = sipAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    return Math.round(futureValue);
  };

  const calculateGoalSIP = () => {
    const monthlyRate = goalRate / 100 / 12;
    const months = goalYears * 12;
    const requiredSIP = goalTarget / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    return Math.round(requiredSIP);
  };

  const generateGrowthData = () => {
    const data = [];
    for (let year = 0; year <= fvYears; year++) {
      const value = fvAmount * Math.pow(1 + fvRate / 100, year);
      data.push({
        year: `Year ${year}`,
        value: Math.round(value)
      });
    }
    return data;
  };

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 0: // Future Value Calculator
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="fv-amount">Investment Amount (₹)</Label>
                <Input 
                  id="fv-amount"
                  type="number" 
                  value={fvAmount}
                  onChange={(e) => setFvAmount(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="fv-years">Years</Label>
                <Input 
                  id="fv-years"
                  type="number" 
                  value={fvYears}
                  onChange={(e) => setFvYears(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Expected Returns (%): {fvRate}%</Label>
                <Slider
                  value={[fvRate]}
                  onValueChange={(value) => setFvRate(value[0])}
                  max={25}
                  min={5}
                  step={0.5}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6">
              <div className="text-center mb-4">
                <h4 className="text-2xl font-bold text-primary">₹{calculateFV().toLocaleString()}</h4>
                <p className="text-sm text-muted-foreground">Future Value after {fvYears} years</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total Growth: ₹{(calculateFV() - fvAmount).toLocaleString()}
                </p>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={generateGrowthData()}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="year" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Value']} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 1: // SIP Calculator
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="sip-amount">Monthly SIP (₹)</Label>
                <Input 
                  id="sip-amount"
                  type="number" 
                  value={sipAmount}
                  onChange={(e) => setSipAmount(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="sip-years">Investment Period (Years)</Label>
                <Input 
                  id="sip-years"
                  type="number" 
                  value={sipYears}
                  onChange={(e) => setSipYears(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Expected Returns (%): {sipRate}%</Label>
                <Slider
                  value={[sipRate]}
                  onValueChange={(value) => setSipRate(value[0])}
                  max={25}
                  min={5}
                  step={0.5}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-accent/10 to-success/10 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <h4 className="text-xl font-bold text-accent">₹{(sipAmount * sipYears * 12).toLocaleString()}</h4>
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-success">₹{calculateSIP().toLocaleString()}</h4>
                  <p className="text-sm text-muted-foreground">Maturity Value</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary">₹{(calculateSIP() - (sipAmount * sipYears * 12)).toLocaleString()}</h4>
                  <p className="text-sm text-muted-foreground">Total Returns</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Goal Calculator
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="goal-target">Target Amount (₹)</Label>
                <Input 
                  id="goal-target"
                  type="number" 
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="goal-years">Time Period (Years)</Label>
                <Input 
                  id="goal-years"
                  type="number" 
                  value={goalYears}
                  onChange={(e) => setGoalYears(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Expected Returns (%): {goalRate}%</Label>
                <Slider
                  value={[goalRate]}
                  onValueChange={(value) => setGoalRate(value[0])}
                  max={25}
                  min={5}
                  step={0.5}
                  className="mt-2"
                />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-success/10 to-warning/10 rounded-xl p-6">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-success">₹{calculateGoalSIP().toLocaleString()}</h4>
                <p className="text-sm text-muted-foreground">Required Monthly SIP</p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Investment: </span>
                    <span className="font-semibold">₹{(calculateGoalSIP() * goalYears * 12).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected Returns: </span>
                    <span className="font-semibold">₹{(goalTarget - (calculateGoalSIP() * goalYears * 12)).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <Calculator className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h4 className="text-xl font-semibold mb-2">Calculator Coming Soon</h4>
            <p className="text-muted-foreground">This advanced calculator is under development.</p>
          </div>
        );
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Interactive Investment Calculators</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful financial tools to plan, analyze, and optimize your fractional real estate investments
          </p>
        </div>

        {/* Calculator Tabs */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {calculators.map((calc, index) => (
              <Button
                key={calc.id}
                variant={activeCalculator === calc.id ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-center gap-2 ${
                  activeCalculator === calc.id ? "" : "hover:bg-secondary/50"
                }`}
                onClick={() => setActiveCalculator(calc.id)}
              >
                <calc.icon className={`h-6 w-6 ${activeCalculator === calc.id ? "text-primary-foreground" : calc.color}`} />
                <div className="text-center">
                  <div className="font-semibold text-xs">{calc.title}</div>
                  <div className="text-xs opacity-75 line-clamp-2">{calc.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Active Calculator */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {(() => {
                const activeCalc = calculators.find(c => c.id === activeCalculator);
                if (activeCalc) {
                  const IconComponent = activeCalc.icon;
                  return <IconComponent className={`h-6 w-6 ${activeCalc.color}`} />;
                }
                return null;
              })()}
              {calculators[activeCalculator]?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderCalculator()}
          </CardContent>
        </Card>

        {/* Comparison with Traditional Investments */}
        <div className="mt-12 bg-secondary/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Compare with Traditional Investments</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Fixed Deposits", return: "6-7%", risk: "Low", liquidity: "Medium" },
              { name: "Mutual Funds", return: "10-12%", risk: "Medium", liquidity: "High" },
              { name: "Fractional Real Estate", return: "12-15%", risk: "Medium", liquidity: "Medium" }
            ].map((investment, index) => (
              <Card key={index} className={`text-center ${index === 2 ? 'border-2 border-primary' : ''}`}>
                <CardContent className="p-6">
                  {index === 2 && <div className="text-xs text-primary font-semibold mb-2">RECOMMENDED</div>}
                  <h4 className="font-bold mb-4">{investment.name}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Expected Return:</span>
                      <span className="font-semibold text-primary">{investment.return}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Level:</span>
                      <span className="font-semibold">{investment.risk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Liquidity:</span>
                      <span className="font-semibold">{investment.liquidity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};