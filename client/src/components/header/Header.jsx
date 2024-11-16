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
  --logo-width: calc(var(--fs-900) * 5);
  
  display: grid;
  grid-template-columns: var(--logo-width) 1fr auto;
  grid-template-areas: 'logo search nav';
  justify-content: space-between;
  align-items: center;
  column-gap: var(--ws-600);
  row-gap: var(--ws-400);
  padding-block: var(--ws-400);

  #navSection > nav > ul > li:first-of-type {
    margin-right: calc(var(--ws-300) * -1);
    display: none;
  }

  ${mq('tablet')} {
    grid-template-columns: var(--logo-width) 1fr;
    grid-template-areas: 'logo nav';

    &.search-visible {
      grid-template-areas: 'logo nav' 'search search';
    }

    #searchSection {
      display: none;
    }

    #navSection > nav > ul > li:first-of-type,
    &.search-visible #searchSection {
      display: block;
    }
  }
`;

function Header() {
  return (
    <Sticky>
      <div className="content-grid elv-header negative" css={headerContainerStyles}>
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