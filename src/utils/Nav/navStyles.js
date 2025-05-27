// Navigation styling constants and utilities
export const COLORS = {
  primary: '#00285E',
  secondary: '#4A5568',
  background: '#FFFFFF',
  border: '#E2E8F0',
  accent: '#F8FAFC',
  text: '#2D3748',
  muted: '#6B7280',
};

export const TRANSITIONS = {
  fast: 'all 0.2s ease-in-out',
  medium: 'all 0.3s ease-in-out',
};

// AppBar styles
export const appBarStyles = {
  backgroundColor: COLORS.background,
  borderBottom: `1px solid ${COLORS.border}`,
  backdropFilter: 'blur(10px)',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
};

// Toolbar styles
export const toolbarStyles = {
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '72px',
  px: { xs: 2, md: 4 },
};

// Logo styles
export const logoStyles = {
  height: '40px',
  width: 'auto',
  objectFit: 'contain',
  cursor: 'pointer',
};

export const mobileLogoStyles = {
  ...logoStyles,
  height: '32px',
};

// Desktop button styling function
export const getDesktopButtonStyles = (isActive) => ({
  textTransform: 'none',
  fontSize: '0.95rem',
  fontWeight: isActive ? '700' : '600',
  fontFamily: '"Lato", sans-serif',
  color: isActive ? COLORS.primary : COLORS.secondary,
  backgroundColor: isActive ? 'rgba(0, 40, 94, 0.08)' : 'transparent',
  borderRadius: '8px',
  px: 3,
  py: 1,
  mx: 0.5,
  minHeight: '40px',
  border: isActive ? '1px solid rgba(0, 40, 94, 0.2)' : '1px solid transparent',
  '&:hover': {
    backgroundColor: isActive ? 'rgba(0, 40, 94, 0.12)' : 'rgba(0, 40, 94, 0.04)',
    color: COLORS.primary,
    transform: 'translateY(-1px)',
    transition: TRANSITIONS.fast,
  },
  transition: TRANSITIONS.fast,
});

// Mobile button styling function
export const getMobileButtonStyles = (isActive) => ({
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: isActive ? '700' : '600',
  fontFamily: '"Lato", sans-serif',
  color: isActive ? COLORS.primary : COLORS.secondary,
  backgroundColor: isActive ? 'rgba(0, 40, 94, 0.08)' : 'transparent',
  borderRadius: '12px',
  px: 3,
  py: 2.5,
  mb: 0,
  width: '100%',
  justifyContent: 'flex-start',
  border: isActive ? '1px solid rgba(0, 40, 94, 0.15)' : '1px solid transparent',
  boxShadow: isActive ? '0 2px 8px rgba(0, 40, 94, 0.1)' : 'none',
  '&:hover': {
    backgroundColor: isActive ? 'rgba(0, 40, 94, 0.12)' : 'rgba(0, 40, 94, 0.04)',
    color: COLORS.primary,
    transform: 'translateX(4px)',
    boxShadow: '0 4px 12px rgba(0, 40, 94, 0.15)',
    transition: TRANSITIONS.medium,
  },
  transition: TRANSITIONS.medium,
});

// Drawer styles
export const drawerPaperStyles = {
  width: '320px',
  backgroundColor: COLORS.background,
  color: COLORS.text,
  borderLeft: `1px solid ${COLORS.border}`,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
};

export const drawerHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: 3,
  borderBottom: `1px solid ${COLORS.border}`,
  backgroundColor: COLORS.accent,
};

export const drawerFooterStyles = {
  mt: 4,
  pt: 3,
  borderTop: `1px solid ${COLORS.border}`,
  textAlign: 'center',
}; 