// Seperated from PlayersContext.jsx to help fast refresh

import { createContext, useContext } from 'react';

export const PlayersContext = createContext(null);

export function usePlayers() {
  const context = useContext(PlayersContext);
  if (context === undefined) {
    throw new Error('usePlayers must be used within a PlayersProvider');
  }
  return context;
} 