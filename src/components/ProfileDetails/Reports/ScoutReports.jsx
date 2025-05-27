import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Divider,
  Chip
} from '@mui/material';
import { usePlayers } from '../../../contexts/playersContextDef';
import { getScoutColor, getScoutInitial } from '../../../utils/scoutHelpers';
import AddReport from './AddReport';

const ScoutReports = ({ player }) => {
  const { scoutingReports, addScoutingReport } = usePlayers();

  // Filter reports for the current player
  const playerReports = scoutingReports.filter(
    report => report.playerId === player?.playerId
  );

  const handleReportAdded = (newReport) => {
    addScoutingReport(newReport);
  };

  return (
    <Box>
      <AddReport player={player} onReportAdded={handleReportAdded} />
      
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium' }}>
        Scouting Reports ({playerReports.length})
      </Typography>

      {playerReports.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No scouting reports available for this player yet.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {playerReports.map((report) => (
            <Card key={report.reportId} elevation={1} sx={{ border: '1px solid', borderColor: 'grey.200' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: getScoutColor(), 
                      width: 40, 
                      height: 40, 
                      mr: 2,
                      fontSize: '1.1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {getScoutInitial(report.scout)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                      {report.scout}
                    </Typography>
                    <Chip 
                      label="Scout Report" 
                      size="small" 
                      variant="outlined"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {report.report}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ScoutReports;