import CircleIconContainer from '@containers/CircleIconContainer';
import GlassContainer from '@containers/GlassContainer';
import { css } from '@emotion/react';

const cardStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ws-300);
  height: 100%;
  padding: var(--ws-300);
  /* border: 0; */
  cursor: default;
  transition: transform var(--transition-2), background-color var(--transition-2), box-shadow var(--transition-2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--glass-shadow);
    background-color: var(--glass-dp-1) !important;
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
  background-color: var(--accent-dp-0);
  box-shadow: 0 6px 12px var(--glass-shadow);
  font-size: var(--fs-500);
  color: var(--text-clr-1);

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
        <li key={card.id}>
          <GlassContainer styles={cardStyles}>
            <div className="negative">
              <CircleIconContainer styles={iconContainerStyles}>
                {card.icon}
              </CircleIconContainer>
            </div>
            <p css={titleStyles}>{card.title}</p>
          </GlassContainer>
        </li>
      ))}
    </ul>
  );
}

export default Mosaic;