// PlayerSidebar styling constants
export const SIDEBAR_COLORS = {
  primary: '#00285E',
  secondary: '#4A5568',
  background: '#FFFFFF',
  border: '#E2E8F0',
  text: '#2D3748',
  muted: '#6B7280',
  hover: '#F7FAFC',
  selected: 'rgba(0, 40, 94, 0.08)',
  selectedHover: 'rgba(0, 40, 94, 0.12)',
};

// Drawer styles
export const drawerStyles = {
  '& .MuiDrawer-paper': {
    width: 400,
    boxSizing: 'border-box',
    pt: 6,
    backgroundColor: SIDEBAR_COLORS.background,
    borderRight: `1px solid ${SIDEBAR_COLORS.border}`,
  },
};

// Header styles
export const headerStyles = {
  mb: 1,
  mt: -2,
  fontWeight: 'bold',
  color: SIDEBAR_COLORS.text,
  fontFamily: '"Oswald", sans-serif',
};

export const countStyles = {
  mb: 2,
  color: SIDEBAR_COLORS.secondary,
  fontFamily: '"Lato", sans-serif',
};

// Search input styles
export const searchInputStyles = {
  mb: 2,
  fontFamily: '"Lato", sans-serif',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: SIDEBAR_COLORS.border,
    },
    '&:hover fieldset': {
      borderColor: SIDEBAR_COLORS.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: SIDEBAR_COLORS.primary,
    },
  },
};

// List styles
export const listStyles = {
  maxHeight: 'calc(100vh - 360px)',
  overflow: 'auto',
};

// Player list item styles
export const getPlayerItemStyles = (isSelected) => ({
  borderRadius: 2,
  mb: 1,
  cursor: 'pointer',
  border: isSelected ? `2px solid ${SIDEBAR_COLORS.primary}` : '1px solid transparent',
  bgcolor: isSelected ? SIDEBAR_COLORS.selected : 'transparent',
  '&:hover': {
    bgcolor: isSelected ? SIDEBAR_COLORS.selectedHover : SIDEBAR_COLORS.hover,
  },
});

// Player name styles
export const playerNameStyles = {
  fontWeight: 'medium',
  color: SIDEBAR_COLORS.text,
  fontFamily: '"Lato", sans-serif',
};

// Player info styles
export const playerInfoStyles = {
  color: SIDEBAR_COLORS.secondary,
  fontFamily: '"Lato", sans-serif',
};

// Rank chip styles
export const getRankChipStyles = (isSelected) => ({
  minWidth: 35,
  backgroundColor: isSelected ? SIDEBAR_COLORS.primary : SIDEBAR_COLORS.hover,
  color: isSelected ? SIDEBAR_COLORS.background : SIDEBAR_COLORS.secondary,
  fontFamily: '"Lato", sans-serif',
  fontWeight: '600',
});

// Empty state styles
export const emptyStateStyles = {
  textAlign: 'center',
  py: 4,
};

export const emptyTextStyles = {
  color: SIDEBAR_COLORS.secondary,
  fontFamily: '"Lato", sans-serif',
}; 