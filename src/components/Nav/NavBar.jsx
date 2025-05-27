import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import PlayerSidebarToggle from '../PlayerSidebar/PlayerSidebarToggle';
import MavsLogo from './MavsLogo';
import MobileDrawer from './MobileDrawer';
import { useResponsive } from '../../hooks/useResponsive';
import { 
  appBarStyles, 
  toolbarStyles, 
  getDesktopButtonStyles,
  COLORS 
} from '../../utils/Nav/navStyles';
import { NAV_ROUTES, shouldShowPlayerSidebar } from '../../utils/Nav/navConstants';

function NavBar({ onPlayerSidebarToggle }) {
  const location = useLocation();
  const { isMobile, isTablet } = useResponsive();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  
  const isMobileOrTablet = isMobile || isTablet;
  const showPlayerSidebar = shouldShowPlayerSidebar(location.pathname);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const leftRoutes = NAV_ROUTES.filter(route => route.path === '/');
  const rightRoutes = NAV_ROUTES.filter(route => route.path === '/compare');

  return (
    <AppBar position="sticky" elevation={0} sx={appBarStyles}>
      <Toolbar sx={toolbarStyles}>
        {/* Left Side - Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          {/* Player Sidebar Toggle */}
          {showPlayerSidebar && onPlayerSidebarToggle && (
            <PlayerSidebarToggle onClick={onPlayerSidebarToggle} />
          )}
          
          {/* Desktop Navigation - Left Side (Draft Board) */}
          {!isMobileOrTablet && (
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
              {leftRoutes.map((route) => (
                <Button
                  key={route.path}
                  component={NavLink}
                  to={route.path}
                  sx={getDesktopButtonStyles(location.pathname === route.path)}
                >
                  {route.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>

        {/* Centered Logo */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}>
          <MavsLogo />
        </Box>

        {/* Right Side */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1, gap: 1 }}>
          {/* Desktop Navigation - Right Side (Compare) */}
          {!isMobileOrTablet && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {rightRoutes.map((route) => (
                <Button
                  key={route.path}
                  component={NavLink}
                  to={route.path}
                  sx={getDesktopButtonStyles(location.pathname === route.path)}
                >
                  {route.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobileOrTablet && (
            <IconButton 
              onClick={handleDrawerToggle} 
              sx={{ 
                color: COLORS.secondary,
                '&:hover': {
                  backgroundColor: 'rgba(0, 40, 94, 0.04)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      {isMobileOrTablet && (
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          routes={NAV_ROUTES}
        />
      )}
    </AppBar>
  );
}

export default NavBar;
