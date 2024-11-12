import { useContext, useCallback } from 'react';
import useFetchData from '@hooks/useFetchData';
import AuthContext from '@authentication/contexts/AuthContext';
import CircleIconContainer from '@containers/CircleIconContainer';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import { css } from '@emotion/react';

const DATA_URL = '/personal-data';

const containerStyles = css`
  background-color: var(--brand-clr-1);
`;

function ProfilePicture() {
  const { auth } = useContext(AuthContext);

  const { dataList, isLoading } = useFetchData(`${DATA_URL}?userId=${auth.id}`);

  const initialsFromUsername = useCallback((dataList) => {
    if (dataList.length) {
      const user = dataList[0];
      const firstNameInitial = user.firstName.slice(0, 1);
      const lastNameInitial = user.lastName.slice(0, 1);
      const nameInitials = firstNameInitial + lastNameInitial;
      const upperCaseInitials = nameInitials.toUpperCase();
      return upperCaseInitials;
    }
  }, []);

  const initials = initialsFromUsername(dataList);

  return (
    <CircleIconContainer ariaLabel="perfil do usuário" styles={containerStyles}>
      {(isLoading || !initials)
        ? <PersonIcon sx={{fontSize: 'inherit'}} />
        : <span aria-hidden="true">{initials}</span>
      }
    </CircleIconContainer>
  );
}

export default ProfilePicture;