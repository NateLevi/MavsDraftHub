import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper
} from '@mui/material';


const AddReport = ({ player, onReportAdded }) => {
  const [formData, setFormData] = useState({
    scout: '',
    report: '',
    reportId: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!formData.scout || !formData.report.trim()) {
      return;
    }

    const newReport = {
      scout: formData.scout,
      reportId: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      playerId: player?.playerId,
      report: formData.report.trim()
    };

    if (onReportAdded) {
      onReportAdded(newReport);
    }

    setFormData({
      scout: '',
      report: ''
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium' }}>
        Add New Report
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          name="scout"
          label="Scout Name"
          value={formData.scout}
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
          fullWidth
        />

        <TextField
          name="report"
          label="Report Notes"
          multiline
          rows={6}
          value={formData.report}
          onChange={handleInputChange}
          placeholder="Enter Scouting Report..."
          required
          fullWidth
        />

        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          disabled={!formData.scout || !formData.report.trim()}
          sx={{ alignSelf: 'flex-start', px: 4 }}
        >
          Submit Report
        </Button>
      </Box>
    </Paper>
  );
};

export default AddReport;