import CircleIconContainer from '@containers/CircleIconContainer';
import SuspendedButton from '@components/ui/suspended/SuspendedButton';
import { Search } from '@mui/icons-material';

function SearchNavItem() {
  function handleClick() {
    const searchInput = document.querySelector('#searchInput');
    const header = document.querySelector('#header');

    if (!header.classList.contains('search-visible')) {
      header.classList.add('search-visible');
      setTimeout(() => {
        searchInput.focus();
      }, 200);
    } else {
      header.classList.remove('search-visible');
    }
  }
  
  return (
    <SuspendedButton
      ariaLabel="pesquisar"
      onClick={handleClick}
    >
      <CircleIconContainer><Search /></CircleIconContainer>
    </SuspendedButton>
  );
}

export default SearchNavItem;