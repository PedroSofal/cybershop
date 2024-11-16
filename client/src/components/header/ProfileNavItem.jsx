import { useContext } from 'react';
import AuthContext from '@authentication/contexts/AuthContext';
import ProfilePicture from '@user-profile/components/ProfilePicture';
import CircleIconContainer from '@containers/CircleIconContainer';
import UserPreview from '@user-profile/components/UserPreview';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import SuspendedOnHover from '@components/ui/suspended/SuspendedOnHover';

import { css } from '@emotion/react';

function ProfileNavItem() {
  const { auth } = useContext(AuthContext);

  return (
    <SuspendedOnHover
      button={auth?.id
        ? <ProfilePicture styles={css`border: 1px solid var(--text-clr-1);`} />
        : <CircleIconContainer ariaLabel="perfil do usuário"><PersonIcon /></CircleIconContainer>
      }
      content={<UserPreview />}
      contentRole="menu"
      linkTo="/perfil"
      contentStyles={css`
        right: 0;
        min-width: 10rem;
      `}
    />
  );
}

export default ProfileNavItem;