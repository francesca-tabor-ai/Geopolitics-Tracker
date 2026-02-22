import React, { useState } from 'react';
import { 
  FlaskConical, 
  Play, 
  History, 
  Info, 
  Loader2,
  AlertTriangle,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { simulateScenario } from '../services/gemini';
import { countries } from '../data/mockData';

const ScenarioLab: React.FC = () => {
  const [scenario, setScenario] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulate = async () => {
    if (!scenario.trim()) return;
    setLoading(true);
    const data = await simulateScenario(scenario, countries);
    setResult(data);
    setLoading(false);
  };

  const presets = [
    "Global semiconductor embargo on China",
    "Sudden collapse of the Eurozone",
    "Rapid military escalation in the Arctic",
    "Discovery of massive rare earth deposits in Africa"
  ];

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white tracking-tight">Scenario Simulation Lab</h2>
        <p className="text-zinc-500 mt-1">Probabilistic modeling of geopolitical shocks and second-order effects.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Define Scenario</h3>
            </div>
            <textarea
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              placeholder="Describe a geopolitical event (e.g., 'Sanctions on Russian energy exports double...')"
              className="w-full h-40 bg-[#141414] border border-[#2a2a2a] rounded-lg p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
            />
            <button
              onClick={handleSimulate}
              disabled={loading || !scenario.trim()}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  Execute Simulation
                </>
              )}
            </button>
          </div>

          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">Presets</h3>
            <div className="space-y-2">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setScenario(p)}
                  className="w-full text-left p-3 rounded-lg border border-transparent hover:border-[#2a2a2a] hover:bg-zinc-800/30 text-xs text-zinc-400 hover:text-zinc-200 transition-all flex items-center justify-between group"
                >
                  {p}
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="h-full min-h-[400px] bg-[#1a1a1a] border border-dashed border-[#2a2a2a] rounded-xl flex flex-col items-center justify-center text-zinc-600 p-12 text-center">
              <History className="w-12 h-12 mb-4 opacity-20" />
              <h4 className="text-lg font-medium text-zinc-400">No Active Simulation</h4>
              <p className="text-sm max-w-xs mt-2">Enter a scenario or select a preset to begin probabilistic modeling.</p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[400px] bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex flex-col items-center justify-center p-12 text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                <FlaskConical className="w-8 h-8 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">Calculating Probabilities</h4>
                <p className="text-sm text-zinc-500 mt-2">Gemini is processing second-order geopolitical effects...</p>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Info className="w-5 h-5 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Simulation Output</h3>
                  </div>
                  <div className="bg-zinc-900 border border-[#2a2a2a] px-4 py-2 rounded-lg">
                    <span className="text-[10px] uppercase text-zinc-500 block mb-1">Confidence</span>
                    <span className="text-lg font-mono text-emerald-500">{(result.probability * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="prose prose-invert prose-sm max-w-none mb-8">
                  <p className="text-zinc-300 leading-relaxed text-base">
                    {result.narrative}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.impacts?.map((impact: any, idx: number) => (
                    <div key={idx} className="bg-[#141414] border border-[#2a2a2a] p-4 rounded-lg flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-zinc-500 block">{impact.countryId}</span>
                        <span className="text-sm font-semibold text-white uppercase">{impact.metric}</span>
                      </div>
                      <div className={`flex items-center gap-1 font-mono text-lg ${impact.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {impact.change >= 0 ? '+' : ''}{impact.change}
                        {impact.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioLab;
