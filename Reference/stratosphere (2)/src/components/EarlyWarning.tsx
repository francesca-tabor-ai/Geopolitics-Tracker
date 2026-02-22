import React from 'react';
import { Zap, ShieldAlert, AlertCircle, Clock, MapPin } from 'lucide-react';
import { signals, countries } from '../data/mockData';

const EarlyWarning: React.FC = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      case 'high': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'medium': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Early Warning System</h2>
          <p className="text-zinc-500 mt-1">Real-time signal detection and crisis probability monitoring.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest rounded border border-emerald-500/20 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            System Active
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Signal Feed */}
        <div className="lg:col-span-3 space-y-4">
          {signals.map((signal) => {
            const country = countries.find(c => c.id === signal.countryId);
            return (
              <div key={signal.id} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#3a3a3a] transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${getSeverityColor(signal.severity)}`}>
                      {signal.severity}
                    </div>
                    <span className="text-zinc-500 text-xs font-mono uppercase">{signal.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-600 text-xs font-mono">
                    <Clock className="w-3 h-3" />
                    {new Date(signal.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">{signal.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{signal.description}</p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-[#2a2a2a]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    <span className="text-xs text-zinc-300">{country?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3 text-zinc-500" />
                    <span className="text-xs text-zinc-300">Risk Delta: +1.2%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-6">Regional Stress</h3>
            <div className="space-y-6">
              {[
                { region: 'East Asia', score: 82, trend: 'up' },
                { region: 'Eastern Europe', score: 94, trend: 'up' },
                { region: 'Middle East', score: 76, trend: 'down' },
                { region: 'South Asia', score: 45, trend: 'stable' },
              ].map((r) => (
                <div key={r.region} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">{r.region}</span>
                    <span className={`font-mono ${r.score > 80 ? 'text-rose-500' : 'text-emerald-500'}`}>{r.score}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${r.score > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-500">Critical Monitor</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              System detecting abnormal troop movements in Sector 7-G. Satellite verification requested.
            </p>
            <button className="w-full mt-4 py-2 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-widest rounded hover:bg-rose-600 transition-colors">
              View Detailed Intel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyWarning;
