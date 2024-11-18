// Hooks
import useHideOnScroll from '@hooks/useHideOnScroll';

// Components
import Sticky from '@components/ui/Sticky';
import Logo from '@components/ui/Logo';
import NavItem from '@components/header/NavItem';
import ProfileNavItem from '@components/header/ProfileNavItem';
import ThemeToggle from '@components/header/ThemeToggle';

// Styles
import { css } from '@emotion/react';

const headerContainerStyles = (isHidden) => css`
  position: relative;
  padding-block: var(--ws-200);
  z-index: 1;
  transform: ${isHidden ? 'translateY(-100%)' : 'translate(0)'};
  transition: transform var(--transition-1);
`;

function HeaderMin() {
  const isHidden = useHideOnScroll();

  return (
    <Sticky>
      <div className="content-grid elv-header negative" css={() => headerContainerStyles(isHidden)}>
        <header className="flex jc-between ai-center">
          <Logo styles={css`width: calc(var(--fs-900) * 5);`} />
          <div className="flex jc-end gap-200-400">
            <NavItem>
              <ThemeToggle />
            </NavItem>
            <NavItem linkTo="/perfil">
              <ProfileNavItem />
            </NavItem>
          </div>
        </header>
      </div>
    </Sticky>
  );
}

export default HeaderMin;