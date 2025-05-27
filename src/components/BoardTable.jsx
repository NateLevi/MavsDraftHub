import { DataGrid } from '@mui/x-data-grid';
import { usePlayers } from '../contexts/playersContextDef';
import { useResponsive } from '../hooks/useResponsive';
import { 
  createScoutRankCell,
  createPlayerNameCell,
  createTeamCell,
  createNationalityCell,
  generateScoutColumns,
  generateBaseColumns
} from '../utils/BoardTable/columnHelpers';
import { generateTableRows, getDataGridConfig } from '../utils/BoardTable/dataHelpers';
import { getDataGridStyles } from '../utils/BoardTable/tableStyles';

export default function BoardTable() {
  const { players, scouts } = usePlayers();
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Cell renderers with responsive values
  const renderScoutRankCell = createScoutRankCell(isMobile, isTablet);
  const renderPlayerNameCell = createPlayerNameCell(isMobile, isTablet);
  const renderTeamCell = createTeamCell(isMobile, isTablet, isDesktop);
  const renderNationalityCell = createNationalityCell();

  // Columns
  const baseColumns = generateBaseColumns(
    isMobile, 
    isTablet, 
    isDesktop, 
    renderScoutRankCell, 
    renderPlayerNameCell, 
    renderTeamCell, 
    renderNationalityCell
  );
  
  const scoutColumns = generateScoutColumns(scouts, isMobile, isTablet, renderScoutRankCell);
  const columns = [...baseColumns, ...scoutColumns];

  // Row data
  const rows = generateTableRows(players, scouts);

  // DataGrid configs
  const dataGridConfig = getDataGridConfig(isMobile, isTablet);

  // Handle row click
  const handleRowClick = (params) => {
    console.log('Selected player:', params.row);
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid 
        rows={rows} 
        columns={columns}
        onRowClick={handleRowClick}
        sx={getDataGridStyles(isMobile)}
        {...dataGridConfig}
      />
    </div>
  );
}
