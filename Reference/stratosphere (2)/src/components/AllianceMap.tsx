import React from 'react';
import { Network, Globe, Users, Shield, Link2 } from 'lucide-react';
import { countries } from '../data/mockData';

const AllianceMap: React.FC = () => {
  const alliances = [
    { id: 'nato', name: 'NATO', members: ['USA', 'DEU', 'FRA', 'GBR', 'CAN'], color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
    { id: 'brics', name: 'BRICS+', members: ['CHN', 'RUS', 'IND', 'BRA', 'ZAF'], color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
    { id: 'quad', name: 'QUAD', members: ['USA', 'IND', 'JPN', 'AUS'], color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
    { id: 'sco', name: 'SCO', members: ['CHN', 'RUS', 'IND', 'PAK', 'KAZ'], color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight">Alliance & Influence Mapping</h2>
        <p className="text-zinc-500 mt-1">Visualizing global treaty networks and strategic cooperation blocs.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Alliance List */}
        <div className="space-y-6">
          {alliances.map((alliance) => (
            <div key={alliance.id} className={`bg-[#1a1a1a] border ${alliance.border} rounded-xl p-6`}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${alliance.bg} rounded-lg`}>
                    <Shield className={`w-5 h-5 ${alliance.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{alliance.name}</h3>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Defense & Economic Bloc</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900 border border-[#2a2a2a] px-3 py-1 rounded-full">
                  <Users className="w-3 h-3 text-zinc-500" />
                  <span className="text-xs text-zinc-300">{alliance.members.length} Members</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {alliance.members.map(m => (
                  <span key={m} className="px-3 py-1 bg-zinc-800/50 border border-[#2a2a2a] text-zinc-400 text-[10px] font-mono rounded">
                    {m}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#2a2a2a]">
                <div className="flex gap-4">
                  <div className="text-center">
                    <span className="text-[10px] text-zinc-500 block uppercase">Cohesion</span>
                    <span className="text-sm font-mono text-white">84%</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-zinc-500 block uppercase">GDP Share</span>
                    <span className="text-sm font-mono text-white">32.1%</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                  View Network Graph <Link2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Influence Visualization Placeholder */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          
          <Globe className="w-32 h-32 text-emerald-500/20 mb-8" />
          
          <div className="text-center relative z-10">
            <h4 className="text-xl font-bold text-white mb-2">Network Analysis Engine</h4>
            <p className="text-sm text-zinc-500 max-w-sm mx-auto mb-8">
              STRATOSPHERE analyzes UN voting patterns, trade flows, and military cooperation to map informal influence networks.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-zinc-900/50 border border-[#2a2a2a] rounded-lg">
                <span className="text-[10px] text-emerald-500 block uppercase font-bold mb-1">Rising Bloc</span>
                <span className="text-sm text-white">Global South / BRICS+</span>
              </div>
              <div className="p-4 bg-zinc-900/50 border border-[#2a2a2a] rounded-lg">
                <span className="text-[10px] text-amber-500 block uppercase font-bold mb-1">Fracture Point</span>
                <span className="text-sm text-white">Transatlantic Trade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllianceMap;
