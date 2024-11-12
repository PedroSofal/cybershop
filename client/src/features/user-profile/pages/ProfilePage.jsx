import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ProfileSideMenu from '@user-profile/components/ProfileSideMenu';
import { css } from '@emotion/react';
import mq from '@utils/getMediaQueries';

const gridStyles = css`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--ws-500-800);

  .desktop-hidden {
    display: none;
  }

  ${mq('tablet')} {
    display: block;

    .desktop-hidden {
      display: unset;
    }
  }
`;

function ProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/perfil' || location.pathname === '/perfil/') {
      // document.querySelector('#sidebarNav').firstChild.focus();
      navigate('/perfil/informacoes-pessoais');
    }
  }, [location.pathname]);

  return (
    <div css={gridStyles}>
      <ProfileSideMenu />
      <main css={css`container: profileMain / inline-size;`}>
        <Outlet />
      </main>
    </div>
  );
}

export default ProfilePage;