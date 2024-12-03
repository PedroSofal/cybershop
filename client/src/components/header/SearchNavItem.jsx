import CircleIconContainer from '@containers/CircleIconContainer';
import SuspendedButton from '@components/ui/suspended/SuspendedButton';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';

function SearchNavItem() {
  const [ isSearchBarOpen, setIsSearchBarOpen ] = useState(false);

  useEffect(() => {
    if (isSearchBarOpen) {
      const searchInput = document.querySelector('#searchInput');
      header.classList.add('search-visible');
      setTimeout(() => {
        searchInput.focus();
      }, 200);
    } else {
      header.classList.remove('search-visible');
    }
  }, [isSearchBarOpen]);

  function handleClick() {
    const header = document.querySelector('#header');
    setIsSearchBarOpen(!header.classList.contains('search-visible'));
  }
  
  return (
    <SuspendedButton
      ariaLabel="alternar barra de pesquisa"
      ariaExpanded={isSearchBarOpen}
      ariaControls="searchInput"
      onClick={handleClick}
    >
      <CircleIconContainer><Search /></CircleIconContainer>
    </SuspendedButton>
  );
}

export default SearchNavItem;