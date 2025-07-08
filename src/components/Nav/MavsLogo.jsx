import { useNavigate } from 'react-router-dom';
import { logoStyles, mobileLogoStyles } from '../../utils/Nav/navStyles';

function MavsLogo({ isMobile = false }) {
  const navigate = useNavigate();

  return (
    <img 
      src="/nbalogo.png" 
      alt="Dallas Mavericks" 
      onClick={() => navigate('/')}
      style={isMobile ? mobileLogoStyles : logoStyles}
    />
  );
}

export default MavsLogo; 