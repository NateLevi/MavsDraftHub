// Created this file to extract the scout keys from the players data to honor seperation of concerns
export function getScoutConfig(players) {
  if (!players || players.length === 0) return [];

  // Get rank keys from the first player that has rankings
  const playerWithRankings = players.find(player => player.rankings);
  if (!playerWithRankings) return [];

  const scoutKeys = Object.keys(playerWithRankings.rankings)
    .filter(key => key.includes('Rank') && key !== 'playerId');

  return scoutKeys.map(key => {
    const scoutName = key.replace(' Rank', '');
    return {
      key,
      name: scoutName,
      displayName: scoutName,
      description: `${scoutName} draft rankings and analysis`,
      color: getScoutColor(),
      initial: getScoutInitial(scoutName)
    };
  });
}


export function getScoutColor() {

  return '#00285E';
}

// Get the first letter of the scout name
export function getScoutInitial(scoutName) {
  return scoutName.charAt(0).toUpperCase();
}

// Calculate consensus rank from available scout rankings
export function calculateConsensusRank(rankings, scoutConfigs) {
  if (!rankings || !scoutConfigs) return null;

  const validRanks = scoutConfigs
    .map(scout => rankings[scout.key])
    .filter(rank => typeof rank === 'number' && !isNaN(rank) && rank !== null);

  if (validRanks.length === 0) return null;

  const sum = validRanks.reduce((acc, curr) => acc + curr, 0);
  const average = sum / validRanks.length;
  return parseFloat(average.toFixed(1));
}
