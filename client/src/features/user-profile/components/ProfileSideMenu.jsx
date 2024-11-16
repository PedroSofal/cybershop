import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ProfilePicture from '@user-profile/components/ProfilePicture';
import Menu from '@menus/Menu';
import { Menu as MenuIcon, Close } from '@mui/icons-material';
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

const openMenuButtonStyles = css`
  margin-bottom: 1rem;
  z-index: 2;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const closeMenuButtonStyles = css`
  position: absolute;
  right: 1rem;
  top: 1rem;
  background-color: transparent;
`;

const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-1);
  z-index: 1;

  &.visible {
    opacity: 1;
    visibility: visible;
  }
`;

function AccountSideMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const sideBarRef = useRef();
  const openMenuButtonRef = useRef();
  const closeMenuButtonRef = useRef();
  const overlayRef = useRef();

  const [ topOffset, setTopOffset ] = useState(0);
  const [ isUsingMobile, setIsUsingMobile ] = useState(false);
  const [ isMobileMenuVisible, setIsMobileMenuVisible ] = useState(false);

  useEffect(() => {
    if (sideBarRef.current) {
      const offset = sideBarRef.current.getBoundingClientRect().top + window.scrollY;
      setTopOffset(offset);
    }
  }, []);

  useEffect(() => {
    if (sideBarRef.current) {
      setIsMobileMenuVisible(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuVisible) {
      sideBarRef.current.classList.add('visible');
      overlayRef.current.classList.add('visible');
    } else {
      sideBarRef.current.classList.remove('visible');
      overlayRef.current.classList.remove('visible');
    }
  }, [isMobileMenuVisible]);

  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsUsingMobile(true);
      } else {
        setIsUsingMobile(false);
      }
    }

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const inert = !isMobileMenuVisible && isUsingMobile;
    
    if (inert) {
      sideBarRef.current.setAttribute('inert', 'true');
    } else {
      sideBarRef.current.removeAttribute('inert');
    }
  }, [isMobileMenuVisible, isUsingMobile]);

  function closeMenu() {
    setIsMobileMenuVisible((prevVisible) => {
      if (prevVisible) {
        openMenuButtonRef.current.focus();
      }
      return false;
    });
  }  

  function handleWindowClick(e) {
    if (e.target.closest('aside') !== sideBarRef.current
    && e.target.closest('button') !== openMenuButtonRef.current) {
      closeMenu();
    }
  }

  function handleOpenMenuClick() {
    if (sideBarRef.current) {
      setIsMobileMenuVisible(true);
      setTimeout(() => {
        sideBarRef.current.querySelector('nav li').focus();
      }, 200);
    }
  }

  function handleCloseMenuClick() {
    if (sideBarRef.current) {
      closeMenu();
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  }

  return (
    <>
    <button
      className="desktop-hidden"
      ref={openMenuButtonRef}
      css={openMenuButtonStyles}
      onClick={handleOpenMenuClick}
      aria-haspopup="dialog"
      aria-expanded={isMobileMenuVisible || !isUsingMobile}
      aria-controls="profileMenu"
    >
      <MenuIcon />
    </button>
    <aside
      id="profileMenu"
      ref={sideBarRef}
      className="flex-column ai-center gap-600"
      css={() => asideStyles(topOffset)}
      role={isUsingMobile ? 'dialog' : 'complementary'}
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
    <div className="desktop-hidden" ref={overlayRef} css={overlayStyles}></div>
    </>
  );
}

export default AccountSideMenu;