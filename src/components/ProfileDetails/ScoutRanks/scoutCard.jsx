import { Card, CardContent, Typography, Avatar, Chip, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';
import { useResponsive } from '../../../hooks/useResponsive';

const ScoutCard = ({ scout, rank, isHighOnPlayer, isLowOnPlayer }) => {
  const { isMobile } = useResponsive();
  const isRanked = rank !== null && rank !== undefined;

  const getRankChipColor = () => {
    if (isHighOnPlayer) return 'success';
    if (isLowOnPlayer) return 'error'; 
    return 'primary';
  };

  return (
    <Card 
      elevation={isRanked ? 2 : 1} 
      sx={{ 
        mb: isMobile ? 1.5 : 2,
        opacity: isRanked ? 1 : 0.6,
        bgcolor: isRanked ? 'background.paper' : 'grey.50',
        border: isRanked ? 'none' : '1px solid',
        borderColor: isRanked ? 'transparent' : 'grey.300',
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection={isMobile ? 'column' : 'row'} gap={isMobile ? 1 : 0}>
          <Box display="flex" alignItems="center" width={isMobile ? '100%' : 'auto'} justifyContent={isMobile ? 'center' : 'flex-start'}>
            <Avatar sx={{ 
              bgcolor: scout.color, 
              mr: isMobile ? 1 : 2,
              opacity: isRanked ? 1 : 0.7,
              width: isMobile ? 32 : 40,
              height: isMobile ? 32 : 40,
              fontSize: isMobile ? '0.875rem' : '1rem'
            }}>
              {scout.initial}
            </Avatar>
            <Typography 
              variant={isMobile ? "subtitle2" : "h6"}
              sx={{ 
                color: isRanked ? 'text.primary' : 'text.secondary',
                fontWeight: isRanked ? 'medium' : 'normal',
                fontSize: isMobile ? '0.9rem' : '1.25rem',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              {scout.displayName}
            </Typography>
          </Box>
          <Box sx={{ width: isMobile ? '100%' : 'auto', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end' }}>
            {isRanked ? (
              <Chip 
                icon={isHighOnPlayer ? <ArrowUpwardIcon sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }} /> : isLowOnPlayer ? <ArrowDownwardIcon sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }} /> : <RemoveIcon sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }} />}
                label={`Rank: #${rank}`} 
                color={getRankChipColor()}
                variant="filled"
                size={isMobile ? "small" : "medium"}
                sx={{
                  ml: isMobile ? 0 : 1,
                  fontSize: isMobile ? '0.75rem' : '0.875rem'
                }}
              />
            ) : (
              <Chip 
                icon={<RemoveIcon sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }} />}
                label="Not Ranked" 
                color="default"
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  opacity: 0.7,
                  bgcolor: 'grey.100',
                  color: 'text.secondary',
                  ml: isMobile ? 0 : 1,
                  fontSize: isMobile ? '0.75rem' : '0.875rem'
                }}
              />
            )}
          </Box>
        </Box>
        <Typography 
          variant="body2" 
          color={isRanked ? "text.secondary" : "text.disabled"} 
          sx={{ 
            mt: isMobile ? 1 : 1,
            fontStyle: isRanked ? 'normal' : 'italic',
            fontSize: isMobile ? '0.8rem' : '0.875rem',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          {isRanked ? scout.description : 'This scout has not evaluated this player yet.'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ScoutCard;