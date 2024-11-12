import { css } from '@emotion/react';

const mainButtonStyles = css`
  padding: var(--input-padding);
  border-radius: var(--border-radius);
  font-size: var(--input-fs);
  background-color: var(--purple-1) !important;
  transition: var(--input-transition);

  &:hover:not([disabled]) {
    background-color: var(--purple-1-highlight) !important;
  }

  &:active:not([disabled]) {
    background-color: var(--purple-1-shade) !important;
  }
`;

const IconButtonStyles = css`
  display: flex;
  align-items: end;
  gap: var(--ws-100);

  & span {
    display: inline-flex;
  }
`;

function MainButton({
  id,
  type,
  onClick,
  disabled,
  icon,
  iconPos,
  ariaLabel,
  ariaLabelledBy,
  children
}) {
  return (
    <button
      id={id}
      className="elv elv--hover elv--active"
      css={[mainButtonStyles, icon && IconButtonStyles].filter(Boolean)}
      type={type}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onClick={onClick}
      disabled={disabled}
    >
      {!icon
        ? children
        : (iconPos === 'right'
          ? (
              <>
              <span className="btn-text">{children}</span>
              <span className="btn-icon" aria-hidden="true">{icon}</span>
              </>
            )
          : (
              <>
              <span className="btn-icon" aria-hidden="true">{icon}</span>
              <span className="btn-text">{children}</span>
              </>
            )
        )
      }
    </button>
  );
}

export default MainButton;