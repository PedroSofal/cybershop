import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';

const itemStyles = css`
  position: relative;
  border-radius: 50%;
  cursor: pointer;

  .circle-icon-container {
    font-size: var(--fs-600);
  }

  .circle-icon-container svg {
    font-size: var(--fs-700);
  }
`;

function NavItem({ linkTo, children }) {
  const location = useLocation();
  const [ isActive, setIsActive ] = useState(false);

  useEffect(() => {
    setIsActive(location.pathname.startsWith(linkTo));
  }, [location.pathname, linkTo]);

  return (
    <li
      css={itemStyles}
      className={isActive ? 'elv-2' : ''}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(location.pathname.startsWith(linkTo))}
    >
      {children}
    </li>
  );
}

export default NavItem;