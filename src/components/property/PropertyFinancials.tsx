import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PropertyFinancialsProps {
  property: any;
}

const PropertyFinancials = ({ property }: PropertyFinancialsProps) => {
  const [rentGrowth, setRentGrowth] = useState([3]);
  const [vacancy, setVacancy] = useState([property.financials.vacancy]);
  const [oAndM, setOAndM] = useState([property.financials.oAndM]);
  const [exitCapRate, setExitCapRate] = useState([property.financials.exitCapRate]);

  // Mock waterfall data
  const waterfallData = [
    { name: 'Gross Rent', value: 4200, color: '#10b981' },
    { name: 'Vacancy', value: -210, color: '#ef4444' },
    { name: 'O&M Costs', value: -320, color: '#f59e0b' },
    { name: 'Management Fee', value: -84, color: '#8b5cf6' },
    { name: 'Net Distributable', value: 3586, color: '#06b6d4' }
  ];

  // IRR scenarios based on slider values
  const calculateIRR = (scenario: 'bear' | 'base' | 'bull') => {
    const multipliers = { bear: 0.8, base: 1.0, bull: 1.2 };
    const baseIRR = 12.5;
    return baseIRR * multipliers[scenario];
  };

  const irrorData = [
    { scenario: 'Bear Case', irr: calculateIRR('bear').toFixed(1) },
    { scenario: 'Base Case', irr: calculateIRR('base').toFixed(1) },
    { scenario: 'Bull Case', irr: calculateIRR('bull').toFixed(1) }
  ];

  // Yield breakdown for pie chart
  const yieldData = [
    { name: 'Rental Yield', value: 65, color: '#10b981' },
    { name: 'Capital Appreciation', value: 30, color: '#3b82f6' },
    { name: 'Management Fees', value: 5, color: '#ef4444' }
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Financials & Analytics</h2>

      {/* Assumptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Key Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Rent per sq ft</span>
                <span className="font-medium">₹{property.financials.rentPsf}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Vacancy Rate</span>
                <span className="font-medium">{property.financials.vacancy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">O&M Expenses</span>
                <span className="font-medium">{property.financials.oAndM}%</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Management Fee</span>
                <span className="font-medium">{property.financials.managementFee}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Exit Cap Rate</span>
                <span className="font-medium">{property.financials.exitCapRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current Cap Rate</span>
                <span className="font-medium">{property.financials.capRate}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PnL Waterfall Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Annual Cash Flow Waterfall (₹ per sq ft)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={waterfallData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => [`₹${value}`, 'Amount']}
                  labelStyle={{ color: 'var(--foreground)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--background)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value">
                  {waterfallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* IRR Scenario Tool */}
      <Card>
        <CardHeader>
          <CardTitle>IRR Scenario Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Rent Growth Rate: {rentGrowth[0]}%
                </label>
                <Slider
                  value={rentGrowth}
                  onValueChange={setRentGrowth}
                  max={8}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Vacancy Rate: {vacancy[0]}%
                </label>
                <Slider
                  value={vacancy}
                  onValueChange={setVacancy}
                  max={15}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  O&M Expenses: {oAndM[0]}%
                </label>
                <Slider
                  value={oAndM}
                  onValueChange={setOAndM}
                  max={15}
                  min={5}
                  step={0.5}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Exit Cap Rate: {exitCapRate[0]}%
                </label>
                <Slider
                  value={exitCapRate}
                  onValueChange={setExitCapRate}
                  max={12}
                  min={6}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* IRR Results */}
          <div className="grid grid-cols-3 gap-4">
            {irrorData.map((item, index) => (
              <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">{item.scenario}</p>
                <p className="text-2xl font-bold text-foreground">{item.irr}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Yield Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Yield Composition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={yieldData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {yieldData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Share']}
                  labelStyle={{ color: 'var(--foreground)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--background)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PropertyFinancials;