'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface StatsDashboardProps {
  data: any[];
}

export function StatsDashboard({ data }: StatsDashboardProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/50 border border-dashed border-white/20 rounded-xl">
        Zatím nemáme dostatek dat pro graf.
      </div>
    );
  }

  // Transform data for the chart
  const chartData = data.map(item => ({
    name: new Date(item.date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short' }),
    'Google Kampaň': item.sources['google/1'] || 0,
    'Celkem': item.count
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
        <XAxis 
          dataKey="name" 
          stroke="rgba(255,255,255,0.5)" 
          tick={{ fill: 'rgba(255,255,255,0.5)' }}
          tickLine={false}
          axisLine={false}
          dy={10}
        />
        <YAxis 
          stroke="rgba(255,255,255,0.5)" 
          tick={{ fill: 'rgba(255,255,255,0.5)' }}
          tickLine={false}
          axisLine={false}
          dx={-10}
          allowDecimals={false}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(10, 17, 40, 0.9)', 
            borderColor: 'rgba(212, 175, 55, 0.3)',
            borderRadius: '12px',
            color: '#fff',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
          }}
          itemStyle={{ color: '#D4AF37' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Line 
          type="monotone" 
          dataKey="Google Kampaň" 
          stroke="#D4AF37" 
          strokeWidth={3}
          dot={{ r: 4, fill: '#D4AF37', strokeWidth: 0 }}
          activeDot={{ r: 6, fill: '#fff', stroke: '#D4AF37', strokeWidth: 2 }}
        />
        <Line 
          type="monotone" 
          dataKey="Celkem" 
          stroke="rgba(255,255,255,0.3)" 
          strokeWidth={2}
          dot={{ r: 3, fill: 'rgba(255,255,255,0.3)', strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
