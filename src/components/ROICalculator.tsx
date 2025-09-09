import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, PiggyBank, Banknote } from "lucide-react";

export const ROICalculator = () => {
  const [amount, setAmount] = useState(50000);
  const [years, setYears] = useState(5);
  const [cagr, setCagr] = useState(12.4);
  const [futureValue, setFutureValue] = useState(0);

  useEffect(() => {
    const fv = amount * Math.pow(1 + cagr / 100, years);
    setFutureValue(fv);
  }, [amount, years, cagr]);

  const fdReturns = amount * Math.pow(1 + 6.5 / 100, years);
  const mfReturns = amount * Math.pow(1 + 10 / 100, years);

  const growthData = Array.from({ length: years + 1 }, (_, i) => ({
    year: i,
    value: amount * Math.pow(1 + cagr / 100, i)
  }));

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Future Value Calculator</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how your investment grows with Terra Nexxus compared to traditional options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Calculator Input */}
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Investment Calculator
              </CardTitle>
              <CardDescription>
                Enter your investment details to see projected returns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="amount" className="text-sm font-medium">
                    Investment Amount (₹)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-1"
                    min="10000"
                    step="10000"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum: ₹10,000
                  </p>
                </div>

                <div>
                  <Label htmlFor="years" className="text-sm font-medium">
                    Investment Period (Years)
                  </Label>
                  <Input
                    id="years"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="mt-1"
                    min="1"
                    max="20"
                  />
                </div>

                <div>
                  <Label htmlFor="cagr" className="text-sm font-medium">
                    Expected CAGR (%)
                  </Label>
                  <Input
                    id="cagr"
                    type="number"
                    value={cagr}
                    onChange={(e) => setCagr(Number(e.target.value))}
                    className="mt-1"
                    min="5"
                    max="25"
                    step="0.1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Platform average: 12.4%
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="bg-primary-light rounded-lg p-4 space-y-3">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Future Value</p>
                  <p className="text-3xl font-bold text-primary">
                    ₹{futureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-success">
                    +₹{(futureValue - amount).toLocaleString('en-IN', { maximumFractionDigits: 0 })} gains
                  </p>
                </div>
              </div>

              <Button variant="hero" className="w-full">
                Start Investing Now
              </Button>
            </CardContent>
          </Card>

          {/* Comparison & Growth Chart */}
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Growth Projection
              </CardTitle>
              <CardDescription>
                Your investment growth over {years} years
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Growth Chart */}
              <div className="h-48 flex items-end justify-between gap-1 px-2">
                {growthData.map((data, index) => (
                  <div key={data.year} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full gradient-primary rounded-t-sm transition-all hover:opacity-80 cursor-pointer group relative"
                      style={{ height: `${(data.value / futureValue) * 160}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card-premium text-card-premium-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ₹{data.value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Y{data.year}</span>
                  </div>
                ))}
              </div>

              {/* Comparison */}
              <div className="space-y-3">
                <h4 className="font-semibold">Compare with alternatives:</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2">
                      <PiggyBank className="h-4 w-4 text-primary" />
                      <span className="font-medium">Terra Nexxus</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">
                        ₹{futureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                        {cagr}% CAGR
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Fixed Deposit</span>
                    </div>
                    <div className="text-right">
                      <div className="text-muted-foreground">
                        ₹{fdReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        6.5% CAGR
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Mutual Funds</span>
                    </div>
                    <div className="text-right">
                      <div className="text-muted-foreground">
                        ₹{mfReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        10% CAGR
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-3 border-t border-border">
                  <p className="text-sm text-success font-medium">
                    ₹{(futureValue - fdReturns).toLocaleString('en-IN', { maximumFractionDigits: 0 })} more than FD
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};