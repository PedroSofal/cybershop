import CircleIconContainer from '@containers/CircleIconContainer';
import { css } from '@emotion/react';

const cardStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ws-300);
  padding: var(--ws-300);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 8px var(--purple-2-shadow);
  background-image: linear-gradient(30deg, var(--overlay-gradient-1));
  background-color: var(--purple-2);
  cursor: default;
  transition: transform var(--transition-2), background-color var(--transition-2), box-shadow var(--transition-2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--purple-2-shadow);
    background-color: var(--purple-2-highlight);
  }
  
  & p {
    line-height: 1.5;
  }

  & > * {
    transition: transform var(--transition-2);
  }

  &:hover > * {
    transform: translateY(-8px);
  }
`;

const iconContainerStyles = css`
  background-color: var(--brand-clr-1);
  box-shadow: 0 6px 12px var(--purple-1-shadow);
  font-size: var(--fs-500);

& svg {
  font-size: var(--fs-500);
}
`;

const titleStyles = css`
  font-size: var(--fs-300);
  font-weight: 400;
  text-align: center;
`;

function Mosaic({ list, ariaLabel }) {
  return (
    <ul
      className="grid jc-center gap-200"
      css={css`grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));`}
      aria-label={ariaLabel}
    >
      {list.map(card => (
        <li key={card.id} css={cardStyles}>
          <CircleIconContainer styles={iconContainerStyles}>
            {card.icon}
          </CircleIconContainer>
          <p css={titleStyles}>{card.title}</p>
        </li>
      ))}
    </ul>
  );
}

export default Mosaic;