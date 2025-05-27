import { IconButton, Tooltip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const PlayerSidebarToggle = ({ onClick }) => {
  return (
    <Tooltip title="Player Navigator" placement="bottom">
      <IconButton 
        onClick={onClick}
        sx={{ 
          mr: 2,
          color: '#4A5568',
          '&:hover': {
            bgcolor: 'rgba(0, 40, 94, 0.04)',
            color: '#00285E'
          }
        }}
      >
        <PeopleIcon />
      </IconButton>
    </Tooltip>
  );
};

export default PlayerSidebarToggle; 