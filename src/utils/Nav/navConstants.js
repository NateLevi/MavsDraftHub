// Navigation routes configuration for the navbar
export const NAV_ROUTES = [
  { label: 'Draft Board', path: '/' },
  { label: 'Compare', path: '/compare' },
];

// Helper functions to check if the current path is a player profile page or compare page
export const isPlayerProfilePage = (pathname) => pathname.startsWith('/players/');
export const isComparePage = (pathname) => pathname === '/compare';
export const shouldShowPlayerSidebar = (pathname) => 
  isPlayerProfilePage(pathname) || isComparePage(pathname); 