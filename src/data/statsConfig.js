// Configuration for stats table columns by category
export const STATS_COLUMNS = {
  offensive: [
    { key: 'season', label: 'Season', width: 80 },
    { key: 'team', label: 'Team', width: 120 },
    { key: 'GP', label: 'GP', width: 50 },
    { key: 'GS', label: 'GS', width: 50 },
    { key: 'MP', label: 'MIN', width: 60 },
    { key: 'PTS', label: 'PTS', width: 60 },
    { key: 'FGM', label: 'FGM', width: 60 },
    { key: 'FGA', label: 'FGA', width: 60 },
    { key: 'FG%', label: 'FG%', width: 60 },
    { key: '2PM', label: '2PM', width: 60 },
    { key: '2PA', label: '2PA', width: 60 },
    { key: '2P%', label: '2P%', width: 60 },
    { key: '3PM', label: '3PM', width: 60 },
    { key: '3PA', label: '3PA', width: 60 },
    { key: '3P%', label: '3P%', width: 60 },
    { key: 'FTM', label: 'FTM', width: 60 },
    { key: 'FTA', label: 'FTA', width: 60 },
    { key: 'FT%', label: 'FT%', width: 60 },
    { key: 'AST', label: 'AST', width: 60 },
    { key: 'ORB', label: 'ORB', width: 60 },
    { key: 'eFG%', label: 'eFG%', width: 60 }
  ],
  defensive: [
    { key: 'season', label: 'Season', width: 80 },
    { key: 'team', label: 'Team', width: 120 },
    { key: 'GP', label: 'GP', width: 50 },
    { key: 'MP', label: 'MIN', width: 60 },
    { key: 'DRB', label: 'DRB', width: 60 },
    { key: 'STL', label: 'STL', width: 60 },
    { key: 'BLK', label: 'BLK', width: 60 },
    { key: 'PF', label: 'PF', width: 60 }
  ],
  general: [
    { key: 'season', label: 'Season', width: 80 },
    { key: 'team', label: 'Team', width: 120 },
    { key: 'league', label: 'League(s)', width: 150 },
    { key: 'GP', label: 'GP', width: 50 },
    { key: 'GS', label: 'GS', width: 50 },
    { key: 'MP', label: 'MIN', width: 60 },
    { key: 'TRB', label: 'TRB', width: 60 },
    { key: 'TOV', label: 'TOV', width: 60 }
  ],
  recent: [
    { key: 'date', label: 'Date', width: 100 },
    { key: 'opponent', label: 'Opponent', width: 120 },
    { key: 'result', label: 'W/L', width: 50 },
    { key: 'MP', label: 'MIN', width: 60 },
    { key: 'PTS', label: 'PTS', width: 60 },
    { key: 'TRB', label: 'REB', width: 60 },
    { key: 'AST', label: 'AST', width: 60 },
    { key: 'FGM', label: 'FGM', width: 60 },
    { key: 'FGA', label: 'FGA', width: 60 },
    { key: 'FG%', label: 'FG%', width: 60 }
  ]
};

// Configuration for stats categories
export const STATS_CATEGORIES = [
  { value: 'offensive', label: 'Offensive' },
  { value: 'defensive', label: 'Defensive' },
  { value: 'general', label: 'General' },
  { value: 'recent', label: 'Recent Games' }
]; 