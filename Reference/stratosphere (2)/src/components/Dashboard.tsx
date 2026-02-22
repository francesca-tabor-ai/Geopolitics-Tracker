import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Shield, 
  Globe2,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { countries } from '../data/mockData';
import { Country } from '../types';

interface DashboardProps {
  onSelectCountry: (country: Country) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectCountry }) => {
  const sortedCountries = [...countries].sort((a, b) => b.npi - a.npi);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">National Power Index</h2>
          <p className="text-zinc-500 mt-1">Global distribution of strategic capability and influence.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-2 rounded-md">
            <span className="text-[10px] uppercase text-zinc-500 block mb-1">Global Stability</span>
            <span className="text-xl font-mono text-emerald-500">74.2 <span className="text-xs text-zinc-600">(-0.4)</span></span>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] px-4 py-2 rounded-md">
            <span className="text-[10px] uppercase text-zinc-500 block mb-1">Conflict Risk</span>
            <span className="text-xl font-mono text-amber-500">MODERATE</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Ranking Table */}
        <div className="lg:col-span-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#2a2a2a] flex justify-between items-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Power Rankings</h3>
            <BarChart3 className="w-4 h-4 text-zinc-600" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase text-zinc-500 border-b border-[#2a2a2a]">
                  <th className="px-6 py-4 font-medium">Rank</th>
                  <th className="px-6 py-4 font-medium">Country</th>
                  <th className="px-6 py-4 font-medium">NPI Score</th>
                  <th className="px-6 py-4 font-medium">Stability</th>
                  <th className="px-6 py-4 font-medium">Resilience</th>
                  <th className="px-6 py-4 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {sortedCountries.map((country, index) => {
                  const trend = country.trends.npi[country.trends.npi.length - 1] - country.trends.npi[country.trends.npi.length - 2];
                  return (
                    <tr 
                      key={country.id} 
                      onClick={() => onSelectCountry(country)}
                      className="hover:bg-emerald-500/5 cursor-pointer transition-colors group"
                    >
                      <td className="px-6 py-4 font-mono text-zinc-500">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{country.name}</span>
                          <span className="text-[10px] text-zinc-600 font-mono">{country.isoCode}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-white">{country.npi.toFixed(1)}</span>
                          <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500" 
                              style={{ width: `${country.npi}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium ${country.stability > 80 ? 'text-emerald-500' : country.stability > 60 ? 'text-amber-500' : 'text-rose-500'}`}>
                          {country.stability.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-400">{country.resilience.toFixed(1)}</td>
                      <td className="px-6 py-4">
                        {trend >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-rose-500" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Overview Stats */}
        <div className="space-y-6">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Power Distribution</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sortedCountries.map(c => ({ name: c.isoCode, npi: c.npi }))}>
                  <defs>
                    <linearGradient id="colorNpi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141414', border: '1px solid #2a2a2a' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="npi" stroke="#10b981" fillOpacity={1} fill="url(#colorNpi)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-zinc-900/50 rounded-lg">
                <span className="text-[10px] text-zinc-500 block uppercase">Unipolarity Index</span>
                <span className="text-lg font-mono text-white">0.42</span>
              </div>
              <div className="text-center p-3 bg-zinc-900/50 rounded-lg">
                <span className="text-[10px] text-zinc-500 block uppercase">Bloc Rivalry</span>
                <span className="text-lg font-mono text-rose-500">HIGH</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Strategic Alerts</h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="mt-1 p-1 bg-rose-500/20 rounded">
                  <Shield className="w-3 h-3 text-rose-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-200">Eurasian Instability</p>
                  <p className="text-[10px] text-zinc-500">Stability score for RU dropped 4.2pts this quarter.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="mt-1 p-1 bg-emerald-500/20 rounded">
                  <Activity className="w-3 h-3 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-200">Tech Convergence</p>
                  <p className="text-[10px] text-zinc-500">CN innovation metrics approaching parity with US.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
