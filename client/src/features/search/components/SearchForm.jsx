// Hooks
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// Components
import SearchPreview from '@search/components/SearchPreview';
import SuspendedContent from '@suspended/SuspendedContent';

// Assets
import SearchIcon from '@mui/icons-material/Search';

// Styles
import { css } from '@emotion/react';

const formStyles = css`
  display: grid;
  grid-template-columns: 1fr auto;
`;

const inputStyles = css`
  padding: var(--ws-200) var(--ws-500);
  border: none;
  border-radius: 999px 0 0 999px;
  font-size: var(--input-fs);

  &::placeholder {
    color: var(--white-3);
  }
`;

const buttonStyles = css`
  padding: var(--ws-200) var(--ws-400);
  border-radius: 0 999px 999px 0;
  transition: var(--button-transition);
`;

const previewContainerStyles = css`
  width: 100%;
`;

function SearchForm() {
  const previewRef = useRef();
  const navigate = useNavigate();

  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searchFocus, setSearchFocus ] = useState(false);
  const [ isPreviewVisible, setIsPreviewVisible ] = useState(false);

  useEffect(() => {
    setIsPreviewVisible(searchTerm && searchFocus);
  }, [searchTerm, searchFocus]);

  useEffect(() => {
    if (isPreviewVisible) {
      previewRef.current.style.display = "unset";
    } else {
      previewRef.current.style.display = "none";
    }
  }, [isPreviewVisible]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    
    if (searchTerm) {
      setIsPreviewVisible(false);
      navigate(`/busca/${searchTerm}`);
    }
  }

  return (
    <div className="pos-relative">
      <form css={formStyles} role="search">
        <input
          id="searchInput"
          className="elv"
          css={inputStyles}
          type="text"
          placeholder="O que você procura?"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setTimeout(() => setSearchFocus(false), 100)}
          aria-haspopup="listbox"
        />
        <button
          className="elv elv--hover elv--active"
          css={buttonStyles}
          onClick={handleSearchSubmit}
          aria-label="efetuar pesquisa"
        >
          <SearchIcon />
        </button>
      </form>

      <SuspendedContent
        styles={previewContainerStyles}
        htmlRef={previewRef}
      >
        <SearchPreview searchTerm={searchTerm} />
      </SuspendedContent>
    </div>
  );
}

export default SearchForm;