import React from 'react';
import PhysicalCard from './PhysicalCard';
import StraightenIcon from '@mui/icons-material/Straighten';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ScaleIcon from '@mui/icons-material/Scale';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import { Grid, Typography, Divider, Box } from '@mui/material';
import { useResponsive } from '../../../hooks/useResponsive';

const physicalSections = [
  {
    title: "Body Measurements",
    fields: [
      { label: "Height (No Shoes)", key: "heightNoShoes", unit: " in", icon: <StraightenIcon sx={{ color: '#00285E' }} /> },
      { label: "Height (With Shoes)", key: "heightShoes", unit: " in", icon: <StraightenIcon sx={{ color: '#00285E' }} /> },
      { label: "Weight", key: "weight", unit: " lbs", icon: <ScaleIcon sx={{ color: '#00285E' }} /> },
      { label: "Body Fat", key: "bodyFat", unit: "%", icon: <ScaleIcon sx={{ color: '#00285E' }} /> },
    ]
  },
  {
    title: "Length & Reach",
    fields: [
      { label: "Wingspan", key: "wingspan", unit: " in", icon: <StraightenIcon sx={{ color: '#00285E' }} /> },
      { label: "Standing Reach", key: "reach", unit: " in", icon: <StraightenIcon sx={{ color: '#00285E' }} /> },
      { label: "Hand Length", key: "handLength", unit: " in", icon: <StraightenIcon sx={{ color: '#00285E' }} /> },
      { label: "Hand Width", key: "handWidth", unit: " in", icon: <StraightenIcon sx={{ color: '#00285E' }} /> },
    ]
  },
  {
    title: "Athleticism & Performance",
    fields: [
      { label: "Max Vertical", key: "maxVertical", unit: " in", icon: <VerticalAlignTopIcon sx={{ color: '#00285E' }} /> },
      { label: "No Step Vertical", key: "noStepVertical", unit: " in", icon: <VerticalAlignTopIcon sx={{ color: '#00285E' }} /> },
      { label: "Agility", key: "agility", unit: " sec", icon: <DirectionsRunIcon sx={{ color: '#00285E' }} /> },
      { label: "Sprint", key: "sprint", unit: " sec", icon: <DirectionsRunIcon sx={{ color: '#00285E' }} /> },
      { label: "Shuttle (Left)", key: "shuttleLeft", unit: " sec", icon: <CompareArrowsIcon sx={{ color: '#00285E' }} /> },
      { label: "Shuttle (Right)", key: "shuttleRight", unit: " sec", icon: <CompareArrowsIcon sx={{ color: '#00285E' }} /> },
      { label: "Shuttle (Best)", key: "shuttleBest", unit: " sec", icon: <CompareArrowsIcon sx={{ color: '#00285E' }} /> },
    ]
  }
];

const PhysicalSection = ({ player }) => {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <Box>
      {physicalSections.map((section, sectionIndex) => (
        <Box key={section.title}>
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"}
            component="h3" 
            sx={{ 
              mb: isMobile ? 1.5 : 2, 
              fontWeight: 'bold', 
              color: '#2D3748',
              fontSize: isMobile ? '1rem' : isTablet ? '1.05rem' : '1.1rem',
              fontFamily: '"Lato", sans-serif'
            }}
          >
            {section.title}
          </Typography>
          <Grid container spacing={isMobile ? 1.5 : 2} sx={{ mb: isMobile ? 2 : 3 }}>
            {section.fields.map(({ label, key, unit, icon }) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={key}>
                <PhysicalCard
                  label={label}
                  value={player?.measurements?.[key]}
                  unit={unit}
                  icon={icon}
                />
              </Grid>
            ))}
          </Grid>
          {sectionIndex < physicalSections.length - 1 && (
            <Divider 
              sx={{ 
                my: isMobile ? 2 : 3, 
                borderColor: '#E2E8F0',
                '&::before, &::after': {
                  borderColor: '#E2E8F0',
                }
              }} 
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default PhysicalSection;
