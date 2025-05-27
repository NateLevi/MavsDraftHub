import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import { getCountryCode } from '../formatHelpers';
import {
  getScoutRankStyles,
  getPlayerCellStyles,
  getPlayerImageStyles,
  getPlayerLinkStyles,
  getTeamCellStyles,
  getLeagueTypeStyles,
  getNationalityStyles,
  getFlagStyles,
  getNationalityTextStyles,
} from './tableStyles';

// Default player photo fallback
const DEFAULT_PHOTO = 'https://cdn.nba.com/headshots/nba/latest/1040x760/1641780.png';

// Scout rank cell renderer
export const createScoutRankCell = (isMobile, isTablet) => (params) => {
  const hasValue = params.value != null;
  
  if (!hasValue) {
    return (
      <Tooltip title="Scout hasn't graded" placement="top">
        <span style={getScoutRankStyles(isMobile, isTablet, false)}>
          NR
        </span>
      </Tooltip>
    );
  }
  
  return (
    <span style={getScoutRankStyles(isMobile, isTablet, true)}>
      {params.value}
    </span>
  );
};

// Player name cell 
export const createPlayerNameCell = (isMobile, isTablet) => (params) => (
  <div style={getPlayerCellStyles(isMobile, isTablet)}>
    <img 
      src={params.row.photoUrl || DEFAULT_PHOTO} 
      alt={params.value} 
      style={getPlayerImageStyles(isMobile, isTablet)}
    />
    <Link 
      to={`/players/${params.row.id}`} 
      style={getPlayerLinkStyles(isMobile, isTablet)}
      title={params.value}
    >
      {params.value}
    </Link>
  </div>
);

// Team cell
export const createTeamCell = (isMobile, isTablet, isDesktop) => (params) => {
  const styles = getTeamCellStyles(isMobile, isTablet, isDesktop);
  
  if (isDesktop) {
    return (
      <div style={styles}>
        <span>{params.row.school}</span>
        {params.row.leagueType && (
          <span style={getLeagueTypeStyles()}>
            ({params.row.leagueType})
          </span>
        )}
      </div>
    );
  }
  
  return (
    <span style={styles} title={params.row.school}>
      {params.row.school}
    </span>
  );
};

// Nationality cell
export const createNationalityCell = () => (params) => {
  const countryCode = getCountryCode(params.value);
  
  if (countryCode) {
    return (
      <div style={getNationalityStyles()}>
        <ReactCountryFlag 
          countryCode={countryCode} 
          svg 
          style={getFlagStyles()}
          title={params.value} 
        />
        <span style={getNationalityTextStyles()}>
          {params.value.length > 12 
            ? `${params.value.substring(0, 12)}...` 
            : params.value
          }
        </span>
      </div>
    );
  }
  
  return (
    <span style={getNationalityTextStyles()}>
      {params.value || 'N/A'}
    </span>
  );
};

// Scout columns
export const generateScoutColumns = (scouts, isMobile, isTablet, renderScoutRankCell) => {
  return scouts.map((scout, index) => ({
    field: scout.key.toLowerCase().replace(/[^a-z0-9]/g, ''),
    headerName: isMobile 
      ? scout.name.split(' ')[0].substring(0, 4) // Very short names on mobile
      : isTablet 
        ? scout.name.split(' ')[0] // First name only on tablet
        : scout.name, // Full name on desktop
    width: isMobile ? 70 : isTablet ? 75 : 75,
    renderCell: renderScoutRankCell,
    hide: isMobile && index >= 3, // Show first 3 scouts on mobile
    headerAlign: 'center',
    align: 'center',
  }));
};

// Base columns
export const generateBaseColumns = (isMobile, isTablet, isDesktop, renderScoutRankCell, renderPlayerNameCell, renderTeamCell, renderNationalityCell) => {
  const columns = [];
  
  // Rank column
  columns.push({
    field: 'rank',
    headerName: isMobile ? '#' : isTablet ? '#' : 'Rank',
    width: isMobile ? 65 : isTablet ? 80 : 120,
    renderCell: renderScoutRankCell,
    headerAlign: 'center',
    align: 'center',
  });
  
  // Player name column
  columns.push({
    field: 'name',
    headerName: 'Player',
    flex: isMobile ? 3 : isTablet ? 2 : 1,
    minWidth: isMobile ? 160 : isTablet ? 200 : 300,
    renderCell: renderPlayerNameCell,
  });
  
  // Age and Height columns (not on mobile)
  if (!isMobile) {
    columns.push({
      field: 'age',
      headerName: 'Age',
      width: isTablet ? 60 : 80,
      headerAlign: 'center',
      align: 'center',
    });
    
    columns.push({
      field: 'height',
      headerName: 'Height',
      width: isTablet ? 80 : 100,
      headerAlign: 'center',
      align: 'center',
    });
  }
  
  // Position column
  columns.push({
    field: 'position',
    headerName: 'Pos',
    width: isMobile ? 45 : isTablet ? 80 : 100,
    headerAlign: 'center',
    align: 'center',
  });
  
  // Team column
  columns.push({
    field: 'school',
    headerName: isDesktop ? 'Team / League' : 'Team',
    flex: isDesktop ? 1 : 1,
    minWidth: isDesktop ? 240 : isMobile ? 80 : 100,
    renderCell: renderTeamCell,
  });
  
  // Nationality column (desktop only)
  if (isDesktop) {
    columns.push({
      field: 'nationality',
      headerName: 'Nationality',
      width: 180,
      renderCell: renderNationalityCell,
    });
  }
  
  return columns;
}; 