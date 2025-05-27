import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { searchInputStyles } from '../../utils/Sidebar/sidebarStyles';
import { SORT_OPTIONS, POSITION_OPTIONS } from '../../utils/Sidebar/sidebarHelpers';

function SidebarFilters({ 
  searchTerm, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  positionFilter, 
  onPositionChange 
}) {
  return (
    <>
      {/* Search Input */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={searchInputStyles}
      />

      {/* Sort Dropdown */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortBy}
          label="Sort by"
          onChange={(e) => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Position Filter */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Filter by position</InputLabel>
        <Select
          value={positionFilter}
          label="Filter by position"
          onChange={(e) => onPositionChange(e.target.value)}
        >
          {POSITION_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default SidebarFilters; 