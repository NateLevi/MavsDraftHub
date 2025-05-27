import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import StraightenIcon from '@mui/icons-material/Straighten';
import { useResponsive } from '../../../hooks/useResponsive';

const PhysicalCard = ({ label, value, icon, unit }) => {
  const { isMobile } = useResponsive();
  const displayValue = value !== null && typeof value !== 'undefined' ? `${value}${unit || ''}` : "N/A";
  const IconComponent = icon || <StraightenIcon fontSize="medium" sx={{ color: '#00285E'}} />;

  return (
    <Card sx={{
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #E2E8F0',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderColor: '#00285E',
      }
    }}>
      <CardContent sx={{
        display: 'flex',
        alignItems: 'center',
        p: isMobile ? 1.5 : 2,
        flexGrow: 1,
        justifyContent: 'flex-start',
        flexDirection: isMobile ? 'column' : 'row',
        textAlign: isMobile ? 'center' : 'left'
      }}>
        <Avatar sx={{
          bgcolor: '#F7FAFC',
          width: isMobile ? 40 : 50,
          height: isMobile ? 40 : 50,
          mr: isMobile ? 0 : 2,
          mb: isMobile ? 1 : 0,
          border: '1px solid #E2E8F0',
        }}>
          {React.cloneElement(IconComponent, { 
            sx: { 
              color: '#00285E', 
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              ...IconComponent.props.sx 
            } 
          })}
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ 
            lineHeight: 1.2, 
            fontWeight: 500,
            color: '#4A5568',
            fontFamily: '"Lato", sans-serif',
            fontSize: isMobile ? '0.75rem' : '0.875rem'
          }}>
            {label}
          </Typography>
          <Typography variant={isMobile ? "body1" : "h6"} component="div" sx={{ 
            fontWeight: 'bold', 
            lineHeight: 1.3, 
            mt: 0.5,
            color: '#2D3748',
            fontFamily: '"Lato", sans-serif',
            fontSize: isMobile ? '0.9rem' : '1.25rem'
          }}>
            {displayValue}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PhysicalCard;