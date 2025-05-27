import { useState } from 'react';
import { PlayersContext } from './playersContextDef';
import { getPlayers } from '../utils/mergePlayers.js';
import { getScoutConfig } from '../utils/scoutHelpers.js';
import data from '../data/players/intern_project_data.json';

// Provider component
export function PlayersProvider({ children }) {
  const [players] = useState(() => getPlayers());
  const [scouts] = useState(() => getScoutConfig(players));
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [scoutingReports, setScoutingReports] = useState(() => data.scoutingReports || []);

  const addScoutingReport = (newReport) => {
    setScoutingReports(prev => [...prev, newReport]);
  };

  return (
    <PlayersContext.Provider value={{ 
      players, 
      scouts, 
      selectedPlayer, 
      setSelectedPlayer,
      scoutingReports,
      addScoutingReport
    }}>
      {children}
    </PlayersContext.Provider>
  );
} 