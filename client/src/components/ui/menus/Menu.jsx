import { css } from '@emotion/react';

const menuStyles = css`
  border-radius: var(--border-radius);
  overflow: hidden;
  padding-block: calc(max(var(--ws-300), 1rem) / 2);
`;

const menuItemStyles = (isActive) => css`
  font-size: var(--fs-400);
  padding: var(--input-padding);
  border-bottom: 2px solid ${isActive ? 'var(--purple-1-highlight)' : 'transparent'};
  box-shadow: none !important;
  cursor: pointer;
  transition: background-color var(--transition-1);
`;

function Menu({ list }) {
  function handleKeyUp(e, action) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }

  return (
    <ul className="elv" css={menuStyles} role="menu">
      {list.map((item, index) => (
        <li
          key={index}
          className={item.active ? 'elv' : 'elv-hover'}
          css={() => menuItemStyles(item.active)}
          onClick={item.action}
          onKeyUp={e => handleKeyUp(e, item.action)}
          tabIndex={0}
          role="menuitem"
          aria-label={item.text}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export default Menu;