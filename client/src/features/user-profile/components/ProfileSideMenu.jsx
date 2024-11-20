import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ProfilePicture from '@user-profile/components/ProfilePicture';
import Menu from '@menus/Menu';
import { Close } from '@mui/icons-material';
import { css } from '@emotion/react';
import mq from '@utils/getMediaQueries';

const asideStyles = (topOffset) => css`
  position: sticky;
  top: ${topOffset}px;
  height: fit-content;

  ${mq('tablet')} {
    position: fixed;
    top: 0;
    left: -17rem;
    width: 17rem;
    height: 100%;
    padding-block: var(--ws-700);
    z-index: 2;
    background-color: var(--bg-dp-16);
    transition: left var(--transition-1);

    &.visible {
      left: 0rem;
    }

    & nav * {
      background-color: var(--bg-dp-16);
      box-shadow: none !important;
    }

    & > nav {
      width: 100%;
    }

    & > nav > ul {
      border-radius: 0;
      padding-block: 0;
    }

    & > nav > ul > li {
      padding: var(--ws-500) var(--ws-600);
    }
  }
`;

const closeMenuButtonStyles = css`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background-color: transparent;
`;

function ProfileSideMenu({ htmlRole, sideBarRef, closeMenu }) {
  const closeMenuButtonRef = useRef();
  
  const navigate = useNavigate();
  const location = useLocation();

  const [ topOffset, setTopOffset ] = useState(0);

  useEffect(() => {
    if (sideBarRef.current) {
      const offset = sideBarRef.current.getBoundingClientRect().top + window.scrollY;
      setTopOffset(offset);
    }
  }, []);

  function handleKeyUp(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  }

  function handleCloseMenuClick() {
    if (sideBarRef.current) {
      closeMenu();
    }
  }

  return (
    <>
    <aside
      id="profileMenu"
      ref={sideBarRef}
      className="flex-column ai-center gap-600"
      css={() => asideStyles(topOffset)}
      role={htmlRole}
      onKeyUp={handleKeyUp}
    >
      <button
        className="desktop-hidden"
        ref={closeMenuButtonRef}
        css={closeMenuButtonStyles}
        onClick={handleCloseMenuClick}
        aria-label="fechar"
      >
        <Close />
      </button>
      <div css={css`font-size: 6rem;`}>
        <ProfilePicture styles={css`background-color: var(--accent-dp-0);`} />
      </div>
      <nav className="elv border-radius" aria-label="opções do usuário" id="sidebarNav">
        <Menu list={[
          { text: 'Informações pessoais', action: () => navigate('/perfil/informacoes-pessoais'), active: location.pathname.startsWith('/perfil/informacoes-pessoais') },
          { text: 'Meus endereços', action: () => navigate('/perfil/enderecos'), active: location.pathname.startsWith('/perfil/enderecos') },
          { text: 'Meus cartões', action: () => navigate('/perfil/cartoes'), active: location.pathname.startsWith('/perfil/cartoes') },
          { text: 'Meus pedidos', action: () => navigate('/perfil/pedidos'), active: location.pathname.startsWith('/perfil/pedidos') },
          { text: 'Configurações da conta', action: () => navigate('/perfil/configuracoes'), active: location.pathname.startsWith('/perfil/configuracoes') },
        ]} />
      </nav>
    </aside>
    </>
  );
}

export default ProfileSideMenu;