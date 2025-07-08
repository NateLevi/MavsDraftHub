import { Drawer, Box, Typography, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useLocation } from 'react-router-dom';
import MavsLogo from './MavsLogo';
import { 
  drawerPaperStyles, 
  drawerHeaderStyles, 
  drawerFooterStyles,
  getMobileButtonStyles,
  COLORS 
} from '../../utils/Nav/navStyles';

function MobileDrawer({ open, onClose, routes }) {
  const location = useLocation();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: drawerPaperStyles }}
    >
      <Box sx={{ p: 0 }}>
        {/* Mobile Header */}
        <Box sx={drawerHeaderStyles}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <MavsLogo isMobile />
            <Typography variant="h6" sx={{ 
              fontWeight: '700', 
              color: COLORS.primary,
              fontFamily: '"Lato", sans-serif'
            }}>
              Navigation
            </Typography>
          </Box>
          <IconButton 
            onClick={onClose}
            sx={{ 
              color: COLORS.secondary,
              '&:hover': {
                backgroundColor: 'rgba(0, 40, 94, 0.04)',
                color: COLORS.primary
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Mobile Navigation Links */}
        <Box sx={{ p: 3 }}>
          {routes.map((route, index) => (
            <Box key={route.path}>
              <Button
                component={NavLink}
                to={route.path}
                onClick={onClose}
                sx={getMobileButtonStyles(location.pathname === route.path)}
              >
                {route.label}
              </Button>
              {index < routes.length - 1 && (
                <Divider sx={{ 
                  borderColor: COLORS.border, 
                  my: 2,
                  opacity: 0.6
                }} />
              )}
            </Box>
          ))}
          
          {/* Drawer Footer */}
          <Box sx={drawerFooterStyles}>
            <Typography variant="caption" sx={{ 
              color: COLORS.muted,
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.75rem'
            }}>
              NBA Draft Hub
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}

export default MobileDrawer; 