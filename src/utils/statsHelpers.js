// Seperated file to process season stats for display
export const processSeasonStats = (seasonLogs) => {
  if (!seasonLogs || seasonLogs.length === 0) {
    return { combinedSeasonStats: [], careerAverages: null };
  }

  // Group season logs by season and team
  const seasonGroups = {};
  
  seasonLogs.forEach(log => {
    const key = `${log.Season}-${log.Team}`;
    if (!seasonGroups[key]) {
      seasonGroups[key] = [];
    }
    seasonGroups[key].push(log);
  });

  // Calculate combined stats for each season-team
  const combinedSeasons = [];
  
  Object.values(seasonGroups).forEach(logs => {
    const combined = combineSeasonLogs(logs);
    if (combined) {
      combinedSeasons.push(combined);
    }
  });

  // Sort by season (newest first)
  combinedSeasons.sort((a, b) => b.season - a.season);

  // Step 4: Calculate career averages
  const career = calculateCareerStats(combinedSeasons);

  return { 
    combinedSeasonStats: combinedSeasons, 
    careerAverages: career 
  };
};

// Combine multiple logs for the same season/team
function combineSeasonLogs(logs) {
  if (!logs || logs.length === 0) return null;

  // Get basic info from first log
  const firstLog = logs[0];
  const leagues = logs.map(log => log.League).join(', ');
  
  // Add up totals across all logs
  let totalGP = 0;
  let totalGS = 0;
  let totalMinutes = 0;
  let totalPoints = 0;
  let totalFGM = 0;
  let totalFGA = 0;
  let totalTwoPointM = 0;  // 2PM
  let totalTwoPointA = 0;  // 2PA
  let totalThreePM = 0;
  let totalThreePA = 0;
  let totalFTM = 0;
  let totalFTA = 0;
  let totalOffensiveReb = 0;  // ORB
  let totalDefensiveReb = 0;  // DRB
  let totalRebounds = 0;     // TRB
  let totalAssists = 0;
  let totalSteals = 0;
  let totalBlocks = 0;
  let totalTurnovers = 0;
  let totalFouls = 0;

  logs.forEach(log => {
    const gp = log.GP || 0;
    totalGP += gp;
    totalGS += log.GS || 0;
    
    // Multiply per-game stats by games played to get totals
    totalMinutes += (log.MP || 0) * gp;
    totalPoints += (log.PTS || 0) * gp;
    totalFGM += (log.FGM || 0) * gp;
    totalFGA += (log.FGA || 0) * gp;
    totalTwoPointM += (log.FG2M || 0) * gp;  
    totalTwoPointA += (log.FG2A || 0) * gp;  
    totalThreePM += (log['3PM'] || 0) * gp;
    totalThreePA += (log['3PA'] || 0) * gp;
    totalFTM += (log.FT || 0) * gp;
    totalFTA += (log.FTA || 0) * gp;
    totalOffensiveReb += (log.ORB || 0) * gp;  
    totalDefensiveReb += (log.DRB || 0) * gp;  
    totalRebounds += (log.TRB || 0) * gp;
    totalAssists += (log.AST || 0) * gp;
    totalSteals += (log.STL || 0) * gp;
    totalBlocks += (log.BLK || 0) * gp;
    totalTurnovers += (log.TOV || 0) * gp;
    totalFouls += (log.PF || 0) * gp;
  });

  if (totalGP === 0) return null;

  // Calculate per-game averages
  return {
    season: firstLog.Season,
    team: firstLog.Team,
    league: leagues,
    GP: totalGP,
    GS: totalGS,
    // Store both per-game averages and totals
    MP: (totalMinutes / totalGP).toFixed(1),
    PTS: (totalPoints / totalGP).toFixed(1),
    FGM: (totalFGM / totalGP).toFixed(1),
    FGA: (totalFGA / totalGP).toFixed(1),
    'FG%': totalFGA > 0 ? ((totalFGM / totalFGA) * 100).toFixed(1) : '0.0',
    '2PM': (totalTwoPointM / totalGP).toFixed(1),
    '2PA': (totalTwoPointA / totalGP).toFixed(1),
    '2P%': totalTwoPointA > 0 ? ((totalTwoPointM / totalTwoPointA) * 100).toFixed(1) : '0.0',
    '3PM': (totalThreePM / totalGP).toFixed(1),
    '3PA': (totalThreePA / totalGP).toFixed(1),
    '3P%': totalThreePA > 0 ? ((totalThreePM / totalThreePA) * 100).toFixed(1) : '0.0',
    FTM: (totalFTM / totalGP).toFixed(1),
    FTA: (totalFTA / totalGP).toFixed(1),
    'FT%': totalFTA > 0 ? ((totalFTM / totalFTA) * 100).toFixed(1) : '0.0',
    ORB: (totalOffensiveReb / totalGP).toFixed(1),
    DRB: (totalDefensiveReb / totalGP).toFixed(1),
    TRB: (totalRebounds / totalGP).toFixed(1),
    AST: (totalAssists / totalGP).toFixed(1),
    STL: (totalSteals / totalGP).toFixed(1),
    BLK: (totalBlocks / totalGP).toFixed(1),
    TOV: (totalTurnovers / totalGP).toFixed(1),
    PF: (totalFouls / totalGP).toFixed(1),
    'eFG%': totalFGA > 0 ? (((totalFGM + 0.5 * totalThreePM) / totalFGA) * 100).toFixed(1) : '0.0',
    // Store the actual totals for "Total" view
    totals: {
      MP: totalMinutes,
      PTS: totalPoints,
      FGM: totalFGM,
      FGA: totalFGA,
      '2PM': totalTwoPointM,
      '2PA': totalTwoPointA,
      '3PM': totalThreePM,
      '3PA': totalThreePA,
      FTM: totalFTM,
      FTA: totalFTA,
      ORB: totalOffensiveReb,
      DRB: totalDefensiveReb,
      TRB: totalRebounds,
      AST: totalAssists,
      STL: totalSteals,
      BLK: totalBlocks,
      TOV: totalTurnovers,
      PF: totalFouls
    }
  };
}

// Calculate career stats by combining all seasons
function calculateCareerStats(seasons) {
  if (!seasons || seasons.length === 0) return null;

  let careerGP = 0;
  let careerGS = 0;
  let careerTotals = {
    MP: 0, PTS: 0, FGM: 0, FGA: 0, '2PM': 0, '2PA': 0, '3PM': 0, '3PA': 0,
    FTM: 0, FTA: 0, ORB: 0, DRB: 0, TRB: 0, AST: 0, STL: 0, BLK: 0, TOV: 0, PF: 0
  };

  // Add up totals from each season
  seasons.forEach(season => {
    careerGP += season.GP;
    careerGS += season.GS;
    
    // Use the stored totals from each season
    Object.keys(careerTotals).forEach(stat => {
      careerTotals[stat] += season.totals[stat] || 0;
    });
  });

  if (careerGP === 0) return null;

  // Calculate career averages
  return {
    season: 'Career Avg',
    team: '',
    league: '',
    GP: careerGP,
    GS: careerGS,
    MP: (careerTotals.MP / careerGP).toFixed(1),
    PTS: (careerTotals.PTS / careerGP).toFixed(1),
    FGM: (careerTotals.FGM / careerGP).toFixed(1),
    FGA: (careerTotals.FGA / careerGP).toFixed(1),
    'FG%': careerTotals.FGA > 0 ? ((careerTotals.FGM / careerTotals.FGA) * 100).toFixed(1) : '0.0',
    '2PM': (careerTotals['2PM'] / careerGP).toFixed(1),
    '2PA': (careerTotals['2PA'] / careerGP).toFixed(1),
    '2P%': careerTotals['2PA'] > 0 ? ((careerTotals['2PM'] / careerTotals['2PA']) * 100).toFixed(1) : '0.0',
    '3PM': (careerTotals['3PM'] / careerGP).toFixed(1),
    '3PA': (careerTotals['3PA'] / careerGP).toFixed(1),
    '3P%': careerTotals['3PA'] > 0 ? ((careerTotals['3PM'] / careerTotals['3PA']) * 100).toFixed(1) : '0.0',
    FTM: (careerTotals.FTM / careerGP).toFixed(1),
    FTA: (careerTotals.FTA / careerGP).toFixed(1),
    'FT%': careerTotals.FTA > 0 ? ((careerTotals.FTM / careerTotals.FTA) * 100).toFixed(1) : '0.0',
    ORB: (careerTotals.ORB / careerGP).toFixed(1),
    DRB: (careerTotals.DRB / careerGP).toFixed(1),
    TRB: (careerTotals.TRB / careerGP).toFixed(1),
    AST: (careerTotals.AST / careerGP).toFixed(1),
    STL: (careerTotals.STL / careerGP).toFixed(1),
    BLK: (careerTotals.BLK / careerGP).toFixed(1),
    TOV: (careerTotals.TOV / careerGP).toFixed(1),
    PF: (careerTotals.PF / careerGP).toFixed(1),
    'eFG%': careerTotals.FGA > 0 ? (((careerTotals.FGM + 0.5 * careerTotals['3PM']) / careerTotals.FGA) * 100).toFixed(1) : '0.0',
    totals: careerTotals
  };
}

// Process recent games from game_logs
export const processRecentGames = (gameLogs) => {
  if (!gameLogs || gameLogs.length === 0) {
    return [];
  }

  // Sort games by date (most recent first) and take last 10
  const recentGames = gameLogs
    .sort((a, b) => {
      // Make sure we're comparing dates correctly
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB; // Most recent first
    })
    .slice(0, 10)
    .map(game => {
      // Calculate W/L result
      let result = 'N/A';
      if (game.homeTeamPts && game.visitorTeamPts) {
        if (game.isHome === 1) {
          // Player's team is home
          result = game.homeTeamPts > game.visitorTeamPts ? 'W' : 'L';
        } else {
          // Player's team is visitor  
          result = game.visitorTeamPts > game.homeTeamPts ? 'W' : 'L';
        }
      }

      return {
        date: formatGameDate(game.date),
        opponent: game.opponent || 'N/A',
        result: result,
        MP: convertTimeToMinutes(game.timePlayed),
        PTS: game.pts || 0,
        TRB: game.reb || 0,
        AST: game.ast || 0,
        FGM: game.fgm || 0,
        FGA: game.fga || 0,
        'FG%': game['fg%'] ? game['fg%'].toFixed(1) : '0.0'
      };
    });

  return recentGames;
};

// Simple date formatter for games
function formatGameDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    // Format as "Feb 15" or "Mar 13"
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  } catch {
    return dateString;
  }
}

// Convert time format "15:15" to minutes as decimal
function convertTimeToMinutes(timeString) {
  if (!timeString) return '0.0';
  try {
    const [minutes, seconds] = timeString.split(':');
    const totalMinutes = parseInt(minutes) + (parseInt(seconds) / 60);
    return totalMinutes.toFixed(1);
  } catch {
    return timeString;
  }
}

