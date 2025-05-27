import data from '../data/players/intern_project_data.json';

export function getPlayers() {
  const byId = {};

  // Merge bio
  data.bio.forEach(bio => {
    byId[bio.playerId] = { ...bio };
  });

  // Merge rankings
  data.scoutRankings.forEach(rank => {
    const player = byId[rank.playerId];
    if (player) {
      player.rankings = rank;
    }
  });

  // Merge measurements
  data.measurements.forEach(measure => {
    const player = byId[measure.playerId];
    if (player) {
      player.measurements = measure;
    }
  });

  // Merge game logs
  data.game_logs.forEach(log => {
    const player = byId[log.playerId];
    if (player) {
      if (!player.game_logs) {
        player.game_logs = [];
      }
      player.game_logs.push(log);
    }
  });

  // Merge season logs
  data.seasonLogs.forEach(log => {
    const player = byId[log.playerId];
    if (player) {
      if (!player.seasonLogs) {
        player.seasonLogs = [];
      }
      player.seasonLogs.push(log);
    }
  });

  // Merge scouting reports
  data.scoutingReports.forEach(report => {
    const player = byId[report.playerId];
    if (player) {
      if (!player.scoutingReports) {
        player.scoutingReports = [];
      }
      player.scoutingReports.push(report);
    }
  });

  // Return as an array
  return Object.values(byId);
}
