import CircleIconContainer from '@containers/CircleIconContainer';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import { useContext } from 'react';
import AuthContext from '@authentication/contexts/AuthContext';

function ProfilePicture({ styles }) {
  const { username } = useContext(AuthContext);
  const initials = username?.slice(0, 2);

  return (
    <CircleIconContainer ariaLabel="perfil do usuário" styles={styles}>
      {!initials
        ? <PersonIcon sx={{ fontSize: 'inherit' }} />
        : <span className="negative text-clr-1" aria-hidden="true">{initials}</span>
      }
    </CircleIconContainer>
  );
}

export default ProfilePicture;