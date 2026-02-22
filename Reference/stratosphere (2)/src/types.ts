export interface Country {
  id: string;
  name: string;
  isoCode: string;
  region: string;
  npi: number; // National Power Index
  stability: number;
  resilience: number;
  deterrence: number;
  metrics: {
    gdp: number;
    militarySpending: number;
    population: number;
    energyIndependence: number;
    techInnovation: number;
  };
  trends: {
    npi: number[];
    stability: number[];
  };
  alliances: string[];
}

export interface Signal {
  id: string;
  type: 'military' | 'economic' | 'political' | 'tech';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  countryId: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  impacts: {
    countryId: string;
    metric: keyof Country['metrics'] | 'npi' | 'stability';
    change: number;
  }[];
}
