import { calculateAge, formatHeight } from '../formatHelpers';
import { calculateConsensusRank } from '../scoutHelpers';

// Row data for the DataGrid
export const generateTableRows = (players, scouts) => {
  return players.map((player) => {
    const baseRow = {
      id: player.playerId,
      name: player.name,
      rank: calculateConsensusRank(player.rankings, scouts),
      age: calculateAge(player.birthDate),
      height: formatHeight(player.height),
      photoUrl: player.photoUrl,
      school: player.currentTeam,
      leagueType: player.leagueType,
      nationality: player.nationality,
      position: player.position,
    };

    // Dynamic scout rankings
    scouts.forEach(scout => {
      const fieldName = scout.key.toLowerCase().replace(/[^a-z0-9]/g, '');
      baseRow[fieldName] = player.rankings?.[scout.key];
    });

    return baseRow;
  });
};

//  Config options
export const getDataGridConfig = (isMobile, isTablet) => ({
  pageSize: isMobile ? 15 : 25,
  rowsPerPageOptions: isMobile ? [15, 30] : [25, 50, 100],
  autoHeight: isMobile || isTablet,
  disableColumnMenu: isMobile,
  disableColumnSelector: isMobile,
  disableDensitySelector: isMobile,
  hideFooterSelectedRowCount: true,
  rowHeight: isMobile ? 44 : isTablet ? 60 : 74,
  columnHeaderHeight: isMobile ? 44 : isTablet ? 48 : 64,
  disableColumnSeparator: isMobile,
  sortingOrder: ['asc', 'desc'],
  initialState: {
    sorting: {
      sortModel: [{ field: 'rank', sort: 'asc' }],
    },
  },
}); 