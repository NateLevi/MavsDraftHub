import { Box, Typography, Grid } from '@mui/material';
import ScoutCard from './scoutCard';
import { usePlayers } from '../../../contexts/playersContextDef';
import { calculateConsensusRank } from '../../../utils/scoutHelpers';
import { useResponsive } from '../../../hooks/useResponsive';

const ScoutRankings = ({ player }) => {
  const { scouts } = usePlayers();
  const { isMobile } = useResponsive();
  const rankings = player?.rankings;
  
  if (!rankings) {
    return (
      <Box>
        <Typography variant="body1" color="text.secondary">
          No scout rankings available for this player.
        </Typography>
      </Box>
    );
  }

  // Calculate consensus rank
  const consensusRank = calculateConsensusRank(rankings, scouts);
  
  // Calculate overall average rank
  const validRanks = scouts
    .map(scout => rankings[scout.key])
    .filter(rank => rank !== null && rank !== undefined && typeof rank === 'number');
    
  //Get rank status and exclude the current scout

  const getHighLowStatus = (individualScoutRank, currentScoutKey) => {
    if (individualScoutRank === null || individualScoutRank === undefined || typeof individualScoutRank !== 'number') {
      return { isHigh: false, isLow: false };
    }
    const otherScoutsRanks = scouts
      .filter(s => s.key !== currentScoutKey) // Exclude the current scout
      .map(s => rankings[s.key])
      .filter(r => r !== null && r !== undefined && typeof r === 'number'); // Filter for valid numerical ranks

    if (otherScoutsRanks.length === 0) {
      return { isHigh: false, isLow: false };
    }

    const otherScoutsAvgRank = otherScoutsRanks.reduce((a, b) => a + b, 0) / otherScoutsRanks.length;

    const deviation = individualScoutRank - otherScoutsAvgRank;

    // if scout rank is lower than other scouts average, they are high
    const isHigh = deviation < -2;
    // if scout rank is higher than other scouts average, they are low
    const isLow = deviation > 2;

    return { isHigh, isLow };
  };

  return (
    <Box>
      {/* Consensus Ranking */}
      {consensusRank && (
        <Box sx={{ 
          mb: isMobile ? 2 : 3, 
          p: isMobile ? 1.5 : 2, 
          bgcolor: 'grey.50', 
          borderRadius: 2 
        }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
            mb: 1,
            fontSize: isMobile ? '1rem' : '1.25rem'
          }}>
            Consensus Ranking
          </Typography>
          <Typography variant={isMobile ? "h5" : "h4"} color="primary" sx={{ 
            fontWeight: 'bold', 
            color: '#00285E',
            fontSize: isMobile ? '1.5rem' : '2.125rem'
          }}>
            #{consensusRank}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{
            fontSize: isMobile ? '0.8rem' : '0.875rem'
          }}>
            Based on {validRanks.length} scout ranking{validRanks.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
      )}

      {/* Individual Scout Rankings */}
      <Typography variant={isMobile ? "subtitle1" : "h6"} sx={{ 
        mb: isMobile ? 1.5 : 2,
        fontSize: isMobile ? '1rem' : '1.25rem'
      }}>
        Individual Scout Rankings
      </Typography>
      
      <Grid container spacing={isMobile ? 1.5 : 2} justifyContent={isMobile ? "center" : "flex-start"}>
        {scouts.map((scout) => {
          const rank = rankings[scout.key];
          const { isHigh, isLow } = getHighLowStatus(rank, scout.key);
          
          return (
            <Grid item xs={isMobile ? 10 : 12} md={6} key={scout.name}>
              <ScoutCard
                scout={scout}
                rank={rank}
                isHighOnPlayer={isHigh}
                isLowOnPlayer={isLow}
              />
            </Grid>
          );
        })}
      </Grid>

      {/* Missing Rankings Notice */}
      {validRanks.length < scouts.length && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'warning.50', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Note: {scouts.length - validRanks.length} scout{scouts.length - validRanks.length !== 1 ? 's have' : ' has'} not ranked this player yet.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ScoutRankings;
