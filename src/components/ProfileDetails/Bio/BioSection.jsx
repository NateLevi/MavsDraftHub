import BioDetails from './BioDetails';
import { formatHeight, calculateAge } from '../../../utils/formatHelpers';

const BioSection = ({ player }) => (
  <BioDetails
    age={calculateAge(player?.birthDate)}
    height={`${formatHeight(player?.height)} ft`}
    weight={`${player?.weight} lbs`}
    team={` ${player?.currentTeam} (${player?.league}) `}
    nationality={player?.nationality}
  />
);

export default BioSection;