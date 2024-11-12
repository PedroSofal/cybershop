// Components
import CategoryNav from '@components/CategoryNav';
import SearchForm from '@search/components/SearchForm';
import Logo from '@components/ui/Logo';
import Sticky from '@components/ui/Sticky';
import HeaderNav from '@components/header/HeaderNav';

// Styles
import { css } from '@emotion/react';
import mq from '@utils/getMediaQueries';

const headerContainerStyles = css`
  position: relative;
  z-index: 1;
`;

const headerStyles = css`
  display: grid;
  grid-template-columns: calc(var(--fs-900) * 5) 1fr auto;
  grid-template-areas: 'logo search nav';
  justify-content: space-between;
  align-items: center;
  column-gap: var(--ws-600);
  row-gap: var(--ws-400);
  padding-block: var(--ws-400);

  #mobileSearchButton {
    display: none;
  }

  ${mq('tablet')} {
    grid-template-columns: calc(var(--fs-900) * 5) 1fr;

    &.search-visible {
      grid-template-areas: 'logo nav' 'search search';
    }

    #searchSection {
      display: none;
    }

    #mobileSearchButton,
    &.search-visible #searchSection {
      display: block;
    }
  }
`;

function Header() {
  return (
    <Sticky>
      <div className="content-grid elv-2" css={headerContainerStyles}>
        <header id="header" css={headerStyles}>
            <section css={css`grid-area: logo;`}>
              <Logo />
            </section>
            <section css={css`grid-area: search;`} id="searchSection">
              <SearchForm />
            </section>
            <section css={css`grid-area: nav;`} id="navSection">
              <HeaderNav />
            </section>
        </header>
      </div>
      <CategoryNav />
    </Sticky>
  );
}

export default Header;