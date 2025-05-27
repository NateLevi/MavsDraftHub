import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import { calculateConsensusRank } from '../../utils/scoutHelpers';
import { usePlayers } from '../../contexts/playersContextDef';
import { teamData, defaultTeamBranding } from '../../data/teams/teamData';
import { calculateAge, formatHeight, getCountryCode } from '../../utils/formatHelpers';

const PlayerHero = ({ player }) => {
  const [teamBranding, setTeamBranding] = useState(defaultTeamBranding);
  const { scouts } = usePlayers();

  // Calculate player data
  const playerRank = player?.rankings ? calculateConsensusRank(player.rankings, scouts) : null;
  const age = calculateAge(player?.birthDate);
  const height = formatHeight(player?.height);
  const weight = player?.weight;
  const countryCode = getCountryCode(player?.nationality);
  const playerName = `${player?.firstName || ''} ${player?.lastName || ''}`.trim() || 'Player';

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
  };

  // Set team branding based on player's current team
  useEffect(() => {
    if (!player?.currentTeam) {
      setTeamBranding({ ...defaultTeamBranding, name: 'N/A' });
      return;
    }

    const teamInfo = teamData[player.currentTeam];
    if (teamInfo) {
      setTeamBranding({
        name: player.currentTeam,
        logoUrl: teamInfo.logoUrl || defaultTeamBranding.logoUrl,
        primaryColor: teamInfo.primaryColor || defaultTeamBranding.primaryColor,
        secondaryColor: teamInfo.secondaryColor || defaultTeamBranding.secondaryColor,
        textColor: teamInfo.textColor || defaultTeamBranding.textColor,
      });
    } else {
      setTeamBranding({ ...defaultTeamBranding, name: player.currentTeam });
    }
  }, [player]);

  // Loading state
  if (!player) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <Typography variant="h6">Loading player information...</Typography>
      </div>
    );
  }

  // Background gradient style
  const backgroundStyle = {
    background: `linear-gradient(to top, ${teamBranding.primaryColor} 0%, ${teamBranding.secondaryColor} 100%)`,
  };

  return (
    <div 
      className="relative w-full min-h-[400px] rounded-lg shadow-lg overflow-hidden"
      style={backgroundStyle}
    >
      {/* Team logo watermark */}
      {teamBranding.logoUrl && (
        <img
          src={teamBranding.logoUrl}
          alt={`${teamBranding.name} logo`}
          className="absolute inset-0 w-full h-full max-h-[180px] md:max-h-[260px] m-auto object-contain opacity-10 pointer-events-none"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 p-6 md:p-8 h-full items-end">
        
        {/* Player image */}
        <motion.div
          className="flex justify-center md:justify-start"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <img
            src={player.photoUrl || 'https://cdn.nba.com/headshots/nba/latest/1040x760/1641780.png'}
            alt={`${playerName} headshot`}
            className="h-64 md:h-80 object-contain rounded-2xl"
            onError={(e) => { 
              e.target.src = 'https://placehold.co/300x400/CCCCCC/666666?text=No+Image'; 
            }}
          />
        </motion.div>

        {/* Player info */}
        <motion.div
          className="md:col-span-3 text-center md:text-left"
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
        >
          {/* Player rank */}
          {playerRank && (
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Oswald", sans-serif',
                fontWeight: 'bold',
                color: teamBranding.textColor,
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                mb: 1
              }}
            >
              #{playerRank}
            </Typography>
          )}

          {/* Player name */}
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontFamily: '"Oswald", sans-serif',
              fontWeight: 'bold',
              color: teamBranding.textColor,
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3
            }}
          >
            {playerName}
          </Typography>

          {/* Bio info card */}
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              p: 2,
              mb: 3,
              maxWidth: { xs: '100%', md: '500px' }
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-center">
              {age && (
                <div>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                    AGE
                  </Typography>
                  <Typography variant="h6" sx={{ color: teamBranding.textColor, fontWeight: 'bold' }}>
                    {age}
                  </Typography>
                </div>
              )}
              
              {height && (
                <div>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                    HEIGHT
                  </Typography>
                  <Typography variant="h6" sx={{ color: teamBranding.textColor, fontWeight: 'bold' }}>
                    {height}
                  </Typography>
                </div>
              )}
              
              {weight && (
                <div>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                    WEIGHT
                  </Typography>
                  <Typography variant="h6" sx={{ color: teamBranding.textColor, fontWeight: 'bold' }}>
                    {weight} lbs
                  </Typography>
                </div>
              )}

              {player.position && (
                <div>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                    POSITION
                  </Typography>
                  <Typography variant="h6" sx={{ color: teamBranding.textColor, fontWeight: 'bold' }}>
                    {player.position}
                  </Typography>
                </div>
              )}

              {countryCode && (
                <div>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                    FROM
                  </Typography>
                  <div className="flex items-center justify-center gap-1">
                    <ReactCountryFlag 
                      countryCode={countryCode}
                      svg
                      style={{ width: '1.2em', height: '1.2em' }}
                    />
                    <Typography variant="h6" sx={{ color: teamBranding.textColor, fontWeight: 'bold' }}>
                      {player.nationality}
                    </Typography>
                  </div>
                </div>
              )}

              {(teamBranding.name !== 'N/A' || player.league) && (
                <div className="md:col-span-3">
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                    SCHOOL
                  </Typography>
                  <Typography variant="h6" sx={{ color: teamBranding.textColor, fontWeight: 'bold' }}>
                    {teamBranding.name !== 'N/A' ? teamBranding.name : 'N/A'} {player.league && `(${player.league})`}
                  </Typography>
                </div>
              )}
            </div>
          </Box>
        </motion.div>
      </div>
    </div>
  );
};

export default PlayerHero;
