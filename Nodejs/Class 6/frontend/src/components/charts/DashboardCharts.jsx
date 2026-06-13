import React from 'react';
import { chartSalesData, chartPurchasesData } from '../../data/mockData';

export const SalesLineChart = () => {
  const data = chartSalesData;
  const maxVal = Math.max(...data.map(d => d.amount));
  
  // Calculate SVG dimensions
  const width = 500;
  const height = 200;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Generate coordinates
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = height - padding - (d.amount / maxVal) * chartHeight;
    return { x, y, ...d };
  });

  // SVG Path description generator
  const pathD = points.reduce((acc, p, i) => {
    return acc + `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }, '');

  // Fill area path description
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Monthly Sales Trend</h3>
          <p className="text-xs text-slate-500">Sales performance over the last 6 months</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg">
          +48.3% vs Q1
        </span>
      </div>

      <div className="w-full relative h-[200px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          <defs>
            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding + ratio * chartHeight;
            const labelValue = Math.round(maxVal * (1 - ratio));
            return (
              <g key={idx}>
                <line 
                  x1={padding} 
                  y1={y} 
                  x2={width - padding} 
                  y2={y} 
                  stroke="#f1f5f9" 
                  strokeWidth="1.5" 
                />
                <text 
                  x={padding - 8} 
                  y={y + 4} 
                  textAnchor="end" 
                  fill="#94a3b8" 
                  fontSize="10" 
                  fontWeight="500"
                >
                  ${labelValue >= 1000 ? `${(labelValue / 1000).toFixed(1)}k` : labelValue}
                </text>
              </g>
            );
          })}

          {/* Area under the line */}
          <path d={areaD} fill="url(#salesGrad)" />

          {/* Sparkline path */}
          <path 
            d={pathD} 
            fill="none" 
            stroke="#4f46e5" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx} className="group cursor-pointer">
              <circle 
                cx={p.x} 
                cy={p.y} 
                r="4.5" 
                fill="#ffffff" 
                stroke="#4f46e5" 
                strokeWidth="2.5" 
                className="transition-transform duration-150 hover:scale-150"
              />
              {/* Tooltip trigger space */}
              <circle cx={p.x} cy={p.y} r="15" fill="transparent" />
              <title>{p.month}: ${p.amount.toLocaleString()}</title>
            </g>
          ))}

          {/* X-Axis labels */}
          {points.map((p, idx) => (
            <text 
              key={idx} 
              x={p.x} 
              y={height - padding + 18} 
              textAnchor="middle" 
              fill="#64748b" 
              fontSize="10.5" 
              fontWeight="600"
            >
              {p.month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export const PurchasesBarChart = () => {
  const data = chartPurchasesData;
  const maxVal = Math.max(...data.map(d => d.amount));

  const width = 500;
  const height = 200;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const barWidth = 32;
  const step = chartWidth / (data.length - 1);

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Monthly Purchases Trend</h3>
          <p className="text-xs text-slate-500">Purchasing expenses over the last 6 months</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg">
          Budget Match
        </span>
      </div>

      <div className="w-full relative h-[200px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding + ratio * chartHeight;
            const labelValue = Math.round(maxVal * (1 - ratio));
            return (
              <g key={idx}>
                <line 
                  x1={padding} 
                  y1={y} 
                  x2={width - padding} 
                  y2={y} 
                  stroke="#f1f5f9" 
                  strokeWidth="1.5" 
                />
                <text 
                  x={padding - 8} 
                  y={y + 4} 
                  textAnchor="end" 
                  fill="#94a3b8" 
                  fontSize="10" 
                  fontWeight="500"
                >
                  ${labelValue >= 1000 ? `${(labelValue / 1000).toFixed(1)}k` : labelValue}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((d, i) => {
            const x = padding + i * step - barWidth / 2;
            const barHeight = (d.amount / maxVal) * chartHeight;
            const y = height - padding - barHeight;
            return (
              <g key={i} className="group cursor-pointer">
                {/* Background block for hover effect */}
                <rect 
                  x={x - 4} 
                  y={padding} 
                  width={barWidth + 8} 
                  height={chartHeight} 
                  fill="transparent" 
                  className="hover:fill-slate-50/40"
                />
                <rect 
                  x={x} 
                  y={y} 
                  width={barWidth} 
                  height={Math.max(barHeight, 4)} 
                  rx="4" 
                  fill="#a78bfa" 
                  className="transition-colors duration-150 fill-violet-400 group-hover:fill-violet-500"
                />
                <title>{d.month}: ${d.amount.toLocaleString()}</title>
              </g>
            );
          })}

          {/* X-Axis labels */}
          {data.map((d, i) => {
            const x = padding + i * step;
            return (
              <text 
                key={i} 
                x={x} 
                y={height - padding + 18} 
                textAnchor="middle" 
                fill="#64748b" 
                fontSize="10.5" 
                fontWeight="600"
              >
                {d.month}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
