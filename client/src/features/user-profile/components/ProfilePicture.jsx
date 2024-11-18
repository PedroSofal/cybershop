import useFetchData from '@hooks/useFetchData';
import CircleIconContainer from '@containers/CircleIconContainer';
import PersonIcon from '@mui/icons-material/PersonOutlined';

function ProfilePicture({ styles }) {
  const { dataList: username, isLoading } = useFetchData('/username');
  const initials = username ? username.slice(0, 2) : null;

  return (
    <CircleIconContainer ariaLabel="perfil do usuário" styles={styles}>
      {(isLoading || !initials)
        ? <PersonIcon sx={{ fontSize: 'inherit' }} />
        : <span className="negative text-clr-1" aria-hidden="true">{initials}</span>
      }
    </CircleIconContainer>
  );
}

export default ProfilePicture;