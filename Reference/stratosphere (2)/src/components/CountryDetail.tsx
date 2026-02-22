import React, { useState, useEffect } from 'react';
import { 
  X, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Cpu, 
  ArrowUpRight,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { Country } from '../types';
import { getAnalystSummary } from '../services/gemini';
import Markdown from 'react-markdown';

interface CountryDetailProps {
  country: Country;
  onClose: () => void;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country, onClose }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      const text = await getAnalystSummary(country.name, country.metrics);
      setSummary(text || "Error loading summary.");
      setLoading(false);
    };
    fetchSummary();
  }, [country]);

  const radarData = [
    { subject: 'Economy', A: (country.metrics.gdp / 30000) * 100, fullMark: 100 },
    { subject: 'Military', A: country.deterrence, fullMark: 100 },
    { subject: 'Tech', A: country.metrics.techInnovation, fullMark: 100 },
    { subject: 'Energy', A: (country.metrics.energyIndependence / 150) * 100, fullMark: 100 },
    { subject: 'Stability', A: country.stability, fullMark: 100 },
    { subject: 'Resilience', A: country.resilience, fullMark: 100 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#141414] border border-[#2a2a2a] w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#2a2a2a] flex justify-between items-center bg-[#1a1a1a]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
              <Globe className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{country.name}</h2>
              <div className="flex gap-3 mt-1">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">ISO: {country.isoCode}</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Region: {country.region}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Radar */}
          <div className="space-y-8">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-6">Capability Profile</h3>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#2a2a2a" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10 }} />
                    <Radar
                      name={country.name}
                      dataKey="A"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] uppercase text-zinc-500">Deterrence</span>
                </div>
                <span className="text-xl font-mono text-white">{country.deterrence.toFixed(1)}</span>
              </div>
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-[10px] uppercase text-zinc-500">Resilience</span>
                </div>
                <span className="text-xl font-mono text-white">{country.resilience.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Middle Column: Analyst Summary */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 relative min-h-[300px]">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Strategic Analyst Briefing</h3>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-emerald-500 font-mono">LIVE AI INSIGHTS</span>
                </div>
              </div>

              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                  <span className="text-xs font-mono">Synthesizing intelligence...</span>
                </div>
              ) : (
                <div className="prose prose-invert prose-sm max-w-none">
                  <Markdown>{summary || ""}</Markdown>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Economic Indicators</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">GDP (Nominal)</span>
                    <span className="text-sm font-mono text-white">${(country.metrics.gdp / 1000).toFixed(1)}T</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">Military Spending</span>
                    <span className="text-sm font-mono text-white">${country.metrics.militarySpending}B</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">Innovation Index</span>
                    <span className="text-sm font-mono text-white">{country.metrics.techInnovation}/100</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Alliance Network</h3>
                <div className="flex flex-wrap gap-2">
                  {country.alliances.map(alliance => (
                    <span key={alliance} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded">
                      {alliance}
                    </span>
                  ))}
                  {country.alliances.length === 0 && (
                    <span className="text-xs text-zinc-600 italic">No formal alliances detected.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#1a1a1a] border-t border-[#2a2a2a] flex justify-between items-center">
          <span className="text-[10px] text-zinc-600 font-mono">DATA SOURCE: STRATOSPHERE AGGREGATED INTELLIGENCE</span>
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors">
            Export Intelligence Report <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
