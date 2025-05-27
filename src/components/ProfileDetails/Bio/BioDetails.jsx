import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const BioDetails = ({ height, weight, team, nationality, age}) => {
  return (
    <Box>
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h6">Age:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="right">{age || "N/A"}</Typography>
        </Grid>
      </Grid>
      {/* Height */}
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h6">Height:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="right">{height || "N/A"}</Typography>
        </Grid>
      </Grid>

      {/* Weight */}
      <Grid container sx={{ py: 2, bgcolor: '#f8fafc' }}>
        <Grid item xs={6}>
          <Typography variant="h6">Weight: </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="right">{weight || "N/A"}</Typography>
        </Grid>
      </Grid>

      {/* Team */}
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={6}>
          <Typography variant="h6">Team/School: </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="right">{team || "N/A"}</Typography>
        </Grid>
      </Grid>
      <Grid container sx={{ py: 2, bgcolor: '#f8fafc' }}>
        <Grid item xs={6}>
          <Typography variant="h6">Nationality: </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="right">{nationality || "N/A"}</Typography>
        </Grid>

      </Grid>

    </Box>
  );
};

export default BioDetails;