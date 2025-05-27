import { calculateAge, formatHeight } from './formatHelpers';


// Helper functions for player comparison
export const getLatestSeasonStats = (player) => {
    if (!player?.seasonLogs || player.seasonLogs.length === 0) return null;
    
    // Sort by season and get the most recent
    const sortedSeasons = player.seasonLogs.sort((a, b) => b.Season - a.Season);
    return sortedSeasons[0];
  };
  
  export const formatStatValue = (value, statType) => {
    if (value === null || value === undefined) return 'N/A';
    if (statType === 'Height' && typeof value === 'number') return `${value} in`;
    if (statType === 'Weight' && typeof value === 'number') return `${value} lbs`;
    if (statType === 'Age' && typeof value === 'number') return `${value} yrs`;
    if (statType.includes('%') && typeof value === 'number') return `${value.toFixed(1)}%`;
    if (typeof value === 'number') return value.toFixed(1);
    return value;
  };
  
  export const getComparisonCellColor = (valueA, valueB, higherIsBetter = true) => {
    if (!valueA || !valueB || valueA === valueB) return '#F7FAFC'; // Gray for equal/missing
    
    const aIsBetter = higherIsBetter ? valueA > valueB : valueA < valueB;
    return aIsBetter ? '#DCFCE7' : '#FEE2E2'; // Darker green or darker red
  };
  
  export const createStatsComparisonData = (playerA, playerB, playerAStats, playerBStats) => {
    return [
      // Physical
      { category: 'Physical', stat: 'Age', keyA: calculateAge(playerA?.birthDate), keyB: calculateAge(playerB?.birthDate), higherIsBetter: false },
      { category: 'Physical', stat: 'Height', keyA: `${formatHeight(playerA?.height)}`, keyB: `${formatHeight(playerB?.height)}`, higherIsBetter: true },
      { category: 'Physical', stat: 'Weight', keyA: playerA?.measurements?.weight, keyB: playerB?.measurements?.weight, higherIsBetter: true },
      
      // Scoring
      { category: 'Scoring', stat: 'Points', keyA: playerAStats?.PTS, keyB: playerBStats?.PTS, higherIsBetter: true },
      { category: 'Scoring', stat: 'FG%', keyA: playerAStats?.['FG%'], keyB: playerBStats?.['FG%'], higherIsBetter: true },
      { category: 'Scoring', stat: '3P%', keyA: playerAStats?.['3P%'], keyB: playerBStats?.['3P%'], higherIsBetter: true },
      { category: 'Scoring', stat: 'FT%', keyA: playerAStats?.['FTP'], keyB: playerBStats?.['FTP'], higherIsBetter: true },
      
      // Rebounding
      { category: 'Rebounding', stat: 'Rebounds', keyA: playerAStats?.TRB, keyB: playerBStats?.TRB, higherIsBetter: true },
      { category: 'Rebounding', stat: 'Off. Reb', keyA: playerAStats?.ORB, keyB: playerBStats?.ORB, higherIsBetter: true },
      { category: 'Rebounding', stat: 'Def. Reb', keyA: playerAStats?.DRB, keyB: playerBStats?.DRB, higherIsBetter: true },
      
      // Playmaking
      { category: 'Playmaking', stat: 'Assists', keyA: playerAStats?.AST, keyB: playerBStats?.AST, higherIsBetter: true },
      { category: 'Playmaking', stat: 'Turnovers', keyA: playerAStats?.TOV, keyB: playerBStats?.TOV, higherIsBetter: false },
      
      // Defense
      { category: 'Defense', stat: 'Steals', keyA: playerAStats?.STL, keyB: playerBStats?.STL, higherIsBetter: true },
      { category: 'Defense', stat: 'Blocks', keyA: playerAStats?.BLK, keyB: playerBStats?.BLK, higherIsBetter: true },
    ];
  }; 