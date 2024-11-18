// import { useContext, useCallback } from 'react';
// import useFetchData from '@hooks/useFetchData';
// import AuthContext from '@authentication/contexts/AuthContext';
import CircleIconContainer from '@containers/CircleIconContainer';
import PersonIcon from '@mui/icons-material/PersonOutlined';

// const DATA_URL = '/users';

function ProfilePicture({ styles }) {
  // const { auth } = useContext(AuthContext);

  // const { dataList, isLoading } = useFetchData(`${DATA_URL}?userId=${auth.id}`);

  // const initialsFromUsername = useCallback((dataList) => {
  //   if (dataList.length) {
  //     const user = dataList[0];
  //     const firstLetters = user.username.slice(0, 2);
  //     return firstLetters;
  //   }
  // }, []);

  // const initials = initialsFromUsername(dataList);

  return (
    <CircleIconContainer ariaLabel="perfil do usuário" styles={styles}>
      {/* {(isLoading || !initials)
        ? <PersonIcon sx={{fontSize: 'inherit'}} />
        : <span className="negative text-clr-1" aria-hidden="true">{initials}</span>
      } */}
      <PersonIcon sx={{fontSize: 'inherit'}} />
    </CircleIconContainer>
  );
}

export default ProfilePicture;