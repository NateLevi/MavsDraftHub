import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import NavBar from '../components/Nav/NavBar';
import CompareDropdown from '../components/ComparePlayer/CompareDropdown';
import CompareCard from '../components/ComparePlayer/CompareCard';
import PlayerSidebar from '../components/PlayerSidebar/PlayerSidebar';

const ComparePlayers = () => {
  const [playerA, setPlayerA] = useState(null);
  const [playerB, setPlayerB] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePlayerAChange = (player) => {
    setPlayerA(player);
  };

  const handlePlayerBChange = (player) => {
    setPlayerB(player);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div style={{ backgroundColor: '#F7FAFC', minHeight: '100vh' }}>
      <NavBar onPlayerSidebarToggle={handleSidebarToggle} />
      
      <PlayerSidebar 
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        currentPlayerId={null}
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              mb: 1,
              fontWeight: 'bold',
              color: '#2D3748',
              fontFamily: '"Oswald", sans-serif'
            }}
          >
            Compare Players
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#4A5568',
              fontFamily: '"Lato", sans-serif'
            }}
          >
            Select two players to compare their stats, measurements, and scouting reports
          </Typography>
        </Box>

        {/* Player Selection Section */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
          mb: 4,
          flexWrap: { xs: 'wrap', md: 'nowrap' }
        }}>
            {/* Player A Dropdown */}
            <Box sx={{ flex: 1, maxWidth: 400 }}>
              <CompareDropdown
                selectedPlayer={playerA}
                onPlayerChange={handlePlayerAChange}
                label="Player A"
                excludePlayerId={playerB?.playerId}
              />
            </Box>

            {/* VS Divider */}
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#00285E',
                fontWeight: 'bold',
                fontFamily: '"Oswald", sans-serif',
                textAlign: 'center',
                minWidth: 75
              }}
            >
              VS
            </Typography>

            {/* Player B Dropdown */}
            <Box sx={{ flex: 1, maxWidth: 400 }}>
              <CompareDropdown
                selectedPlayer={playerB}
                onPlayerChange={handlePlayerBChange}
                label="Player B"
                excludePlayerId={playerA?.playerId}
              />
            </Box>
          </Box>

        {/* Show comparison when both players selected */}
        {playerA && playerB && (
          <CompareCard playerA={playerA} playerB={playerB} />
        )}

        {/* Show prompt when only one player selected */}
        {(playerA || playerB) && !(playerA && playerB) && (
          <Box sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            p: 4,
            minHeight: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#4A5568',
                fontFamily: '"Lato", sans-serif',
                textAlign: 'center'
              }}
            >
              {!playerA ? `Select Player A to compare with ${playerB.name}` : `Select Player B to compare with ${playerA.name}`}
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default ComparePlayers;