import ProfileNavItem from '@components/header/ProfileNavItem';
import CartNavItem from '@components/header/CartNavItem';
import SearchNavItem from '@components/header/SearchNavItem';
import NavItem from '@components/header/NavItem';

function HeaderNav() {
  return (
    <nav>
      <ul className="flex jc-end gap-200-400">
        <NavItem>
          <SearchNavItem />
        </NavItem>
        <NavItem linkTo="/perfil">
          <ProfileNavItem />
        </NavItem>
        <NavItem linkTo="/meu-carrinho">
          <CartNavItem />
        </NavItem>
      </ul>
    </nav>
  );
}

export default HeaderNav;