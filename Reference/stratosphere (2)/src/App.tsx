/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EarlyWarning from './components/EarlyWarning';
import AllianceMap from './components/AllianceMap';
import ScenarioLab from './components/ScenarioLab';
import CountryDetail from './components/CountryDetail';
import { Country } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onSelectCountry={setSelectedCountry} />;
      case 'signals':
        return <EarlyWarning />;
      case 'alliances':
        return <AllianceMap />;
      case 'simulation':
        return <ScenarioLab />;
      case 'risk':
        return (
          <div className="p-8 flex flex-col items-center justify-center h-[80vh] text-zinc-500">
            <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <h2 className="text-xl font-bold text-white">Risk Engine Initializing</h2>
            <p className="text-sm mt-2">Aggregating multi-variable conflict probability models...</p>
          </div>
        );
      default:
        return <Dashboard onSelectCountry={setSelectedCountry} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-emerald-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setTab} />
      
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {selectedCountry && (
        <CountryDetail 
          country={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      )}
    </div>
  );

  function setTab(tab: string) {
    setActiveTab(tab);
  }
}
