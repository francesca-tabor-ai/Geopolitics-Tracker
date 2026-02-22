import React from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Network, 
  Zap, 
  FlaskConical, 
  Settings,
  Globe,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'National Power', icon: LayoutDashboard },
    { id: 'risk', label: 'Risk Engine', icon: ShieldAlert },
    { id: 'alliances', label: 'Alliance Mapping', icon: Network },
    { id: 'signals', label: 'Early Warning', icon: Zap },
    { id: 'simulation', label: 'Scenario Lab', icon: FlaskConical },
  ];

  return (
    <div className="w-64 bg-[#141414] border-r border-[#2a2a2a] flex flex-col h-screen sticky top-0">
      <div className="p-6 border-bottom border-[#2a2a2a]">
        <div className="flex items-center gap-3 mb-1">
          <Globe className="w-6 h-6 text-emerald-500" />
          <h1 className="text-xl font-bold tracking-tighter text-white">STRATOSPHERE</h1>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-mono">
          Geopolitical OS v1.0.4
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-emerald-500/10 text-emerald-400' 
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#2a2a2a]">
        <button className="flex items-center gap-3 px-4 py-2 text-zinc-500 hover:text-zinc-300 transition-colors w-full">
          <Settings className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wider">System Config</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
