import { Link, useLocation } from 'react-router-dom';
import useHideOnScroll from '@hooks/useHideOnScroll';
import categories from '@data/categories';
import { css } from '@emotion/react';
import { useRef } from 'react';
import useOverflow from '@hooks/useOverflow';

const sectionStyles = (isHidden) => css`
  font-weight: 600;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  transform: ${isHidden ? 'translateY(-100%)' : 'translate(0)'};
  transition: transform var(--transition-1);
`;

const navStyles = (isOverflowing) => css`
  justify-content: ${isOverflowing ? 'start' : 'center'};
  margin-left: ${isOverflowing ? 'calc(var(--ws-400-500) * -1)' : 0};
`;

const linkStyles = (isActive) => css`
  display: block;
  padding: var(--ws-300) var(--ws-400-500);
  border-radius: var(--border-radius);
  background-color: ${isActive ? 'var(--brand-clr-1) !important' : 'unset'};
`;

function CategoryNav() {
  const navRef = useRef();
  const { pathname } = useLocation();
  const isHidden = useHideOnScroll();
  const isOverflowing = useOverflow(navRef);
  
  return (
    <section className="elv" css={() => sectionStyles(isHidden)}>
      <nav
        ref={navRef}
        className="content-grid"
        aria-label="exibir produtos por categoria"
      >
        <ul className="flex ai-center" css={() => navStyles(isOverflowing)}>
          {Object.entries(categories).map(([key, category]) => (
            <li key={key}>
              <Link
                css={() => linkStyles(category.path === pathname)}
                className={category.path === pathname ? 'elv-hover negative' : 'elv-hover'}
                to={category.path}>
                {category.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default CategoryNav;