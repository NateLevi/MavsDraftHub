import React, { useState } from 'react';
import { 
  Box, 
  ToggleButton, 
  ToggleButtonGroup, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { STATS_COLUMNS, STATS_CATEGORIES } from '../../../data/statsConfig';
import { processSeasonStats, processRecentGames } from '../../../utils/statsHelpers';
import { formatSeasonDisplay, formatStatValue } from '../../../utils/formatHelpers';
import TeamCell from './TeamCell';
import { useResponsive } from '../../../hooks/useResponsive';

// Styling constants
const CELL_STYLES = {
  header: (isMobile) => ({
    fontWeight: 'bold',
    fontSize: isMobile ? '0.75rem' : '0.875rem',
    py: isMobile ? 1 : 1.5,
    px: isMobile ? 1 : 2,
    whiteSpace: 'nowrap'
  }),
  body: (isMobile) => ({
    fontSize: isMobile ? '0.75rem' : '0.875rem',
    py: isMobile ? 0.75 : 1,
    px: isMobile ? 1 : 2,
    whiteSpace: 'nowrap'
  }),
  career: (isMobile) => ({
    fontWeight: 'bold',
    fontSize: isMobile ? '0.75rem' : '0.875rem',
    py: isMobile ? 1 : 1,
    px: isMobile ? 1 : 2,
    whiteSpace: 'nowrap'
  })
};

export default function StatsTable({ player }) {
  const { isMobile } = useResponsive();
  const [statCategory, setStatCategory] = useState('offensive');
  const [statType, setStatType] = useState('perGame');

  // Event handlers
  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setStatCategory(newCategory);
    }
  };

  const handleStatTypeChange = (event) => {
    setStatType(event.target.value);
  };

  // Process data
  const { combinedSeasonStats, careerAverages } = processSeasonStats(player?.seasonLogs);
  const recentGames = processRecentGames(player?.game_logs);
  
  const isRecentGames = statCategory === 'recent';
  const tableData = isRecentGames ? recentGames : combinedSeasonStats;
  const currentColumns = STATS_COLUMNS[statCategory];

  // Helper function to get cell value
  const getCellValue = (column, season) => {
    // Handle special columns first
    if (column.key === 'season') return formatSeasonDisplay(season.season);
    if (column.key === 'team') return season.team ? <TeamCell teamName={season.team} /> : null;
    if (column.key === 'league') return season.league;
    if (column.key === 'date') return season.date;
    if (column.key === 'opponent') return season.opponent;
    if (column.key === 'result') return season.result;

    const statValue = season[column.key];

    // For recent games, just format the value
    if (isRecentGames) {
      return formatStatValue(statValue);
    }

    // For season stats, handle totals vs per game
    if (statType === 'total') {
      // Percentages and games played always show as-is
      if (statValue?.toString().includes('%') || column.key === 'GP' || column.key === 'GS') {
        return formatStatValue(statValue);
      }
      
      // Show totals if available
      if (season.totals?.[column.key]) {
        const total = season.totals[column.key];
        return column.key === 'MP' ? total.toFixed(1) : Math.round(total).toString();
      }
    }

    return formatStatValue(statValue);
  };

  // No data available
  if ((!tableData || tableData.length === 0) && !careerAverages) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
        {isRecentGames ? 'No recent games available for this player.' : 'No season statistics available for this player.'}
      </Box>
    );
  }

  return (
    <Box>
      {/* Controls */}
      <Box sx={{ 
        mb: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'stretch' : 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 2 : 0
      }}>
        {/* Category Toggle Buttons */}
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center',
          overflowX: isMobile ? 'auto' : 'visible',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none'
        }}>
          <ToggleButtonGroup
            value={statCategory}
            exclusive
            onChange={handleCategoryChange}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                px: isMobile ? 1 : 2,
                py: isMobile ? 0.5 : 1,
                minWidth: isMobile ? 'auto' : '64px'
              }
            }}
          >
            {STATS_CATEGORIES.map(category => (
              <ToggleButton key={category.value} value={category.value}>
                {isMobile ? category.label.split(' ')[0] : category.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Per Game / Total Dropdown */}
        {!isRecentGames && (
          <FormControl 
            size="small" 
            sx={{ 
              minWidth: isMobile ? '100%' : 120,
              maxWidth: isMobile ? '100%' : 120
            }}
          >
            <InputLabel>Type</InputLabel>
            <Select
              value={statType}
              label="Type"
              onChange={handleStatTypeChange}
            >
              <MenuItem value="perGame">Per Game</MenuItem>
              <MenuItem value="total">Total</MenuItem>
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Stats Table */}
      <TableContainer component={Paper}>
        <Table size="medium">
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {currentColumns.map((column) => (
                <TableCell key={column.key} sx={CELL_STYLES.header(isMobile)}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {/* Data Rows */}
            {tableData.map((dataRow, index) => (
              <TableRow key={index}>
                {currentColumns.map((column) => (
                  <TableCell key={column.key} sx={CELL_STYLES.body(isMobile)}>
                    {getCellValue(column, dataRow)}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {/* Career Averages Row */}
            {!isRecentGames && careerAverages && (
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                {currentColumns.map((column) => (
                  <TableCell key={column.key} sx={CELL_STYLES.career(isMobile)}>
                    {getCellValue(column, careerAverages)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}