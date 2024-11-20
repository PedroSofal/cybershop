import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ProfileSideMenu from '@user-profile/components/ProfileSideMenu';
import { Menu as MenuIcon } from '@mui/icons-material';
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
    grid-template-columns: auto;

    .desktop-hidden {
      display: unset;
    }
  }
`;

const openMenuButtonStyles = css`
  margin-bottom: 1rem;
  border: none;
  background-color: transparent;
  cursor: pointer;

  > * {
    font-size: var(--fs-900) !important;
  }
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

function ProfilePage() {
  const openMenuButtonRef = useRef();
  const sideBarRef = useRef();
  const overlayRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();

  const [ isMobileMenuVisible, setIsMobileMenuVisible ] = useState(false);
  const [ isUsingMobile, setIsUsingMobile ] = useState(false);

  useEffect(() => {
    if (location.pathname === '/perfil' || location.pathname === '/perfil/') {
      // document.querySelector('#sidebarNav').firstChild.focus();
      navigate('/perfil/informacoes-pessoais');
    }
  }, [location.pathname]);

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

  return (
    <div css={gridStyles}>
      <ProfileSideMenu
        htmlRole={isUsingMobile ? 'dialog' : 'complementary'}
        sideBarRef={sideBarRef}
        overlayRef={overlayRef}
        closeMenu={closeMenu}
      />
      <div className="desktop-hidden" ref={overlayRef} css={overlayStyles}></div>
      <main css={css`container: profileMain / inline-size;`} className="flex-column ac-start">
        <button
          type="button"
          className="desktop-hidden"
          ref={openMenuButtonRef}
          css={openMenuButtonStyles}
          onClick={handleOpenMenuClick}
          aria-haspopup="dialog"
          aria-expanded={isMobileMenuVisible || !isUsingMobile}
          aria-controls="profileMenu"
          aria-label="Abrir menu do perfil"
        >
          <MenuIcon />
        </button>
        <div className="h-100 w-100">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;