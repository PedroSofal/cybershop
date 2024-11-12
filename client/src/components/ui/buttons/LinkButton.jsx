import { css } from '@emotion/react';

const linkButtonStyles = css`
  font-size: var(--fs-400);
  background-color: transparent;

  &:hover {
    text-decoration: underline;
  }
`;

function LinkButton({ htmlRef, styles, onClick, disabled, ariaLabel, children }) {
  return(
    <button
      css={[linkButtonStyles, styles].filter(Boolean)}
      ref={htmlRef}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default LinkButton;