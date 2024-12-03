import ProfileNavItem from '@components/header/ProfileNavItem';
import CartNavItem from '@components/header/CartNavItem';
import SearchNavItem from '@components/header/SearchNavItem';
import ThemeToggle from '@components/header/ThemeToggle';
import NavItem from '@components/header/NavItem';

function HeaderNav() {
  return (
    <div className="flex jc-end gap-200-400">
      <ul className="display-contents">
        <NavItem id="toggleSearchBarButton">
          <SearchNavItem />
        </NavItem>
        <NavItem>
          <ThemeToggle />
        </NavItem>
      </ul>
      <nav className="display-contents">
        <ul className="display-contents">
          <NavItem linkTo="/perfil">
            <ProfileNavItem />
          </NavItem>
          <NavItem linkTo="/meu-carrinho">
            <CartNavItem />
          </NavItem>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderNav;