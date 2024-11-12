import CircleIconContainer from '@containers/CircleIconContainer';
import { Search } from '@mui/icons-material';
import { css } from '@emotion/react';

const buttonStyles = css`
  font-size: inherit;
  background-color: transparent;
  cursor: pointer;
`;

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
    <button
      id="mobileSearchButton"
      css={buttonStyles}
      aria-label="pesquisar"
      onClick={handleClick}
    >
      <CircleIconContainer><Search /></CircleIconContainer>
    </button>
  );
}

export default SearchNavItem;