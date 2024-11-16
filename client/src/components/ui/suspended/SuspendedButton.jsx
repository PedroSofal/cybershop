import { css } from '@emotion/react';

const buttonStyles = css`
  font-size: inherit;
  background-color: transparent;
  cursor: pointer;
`;

function SuspendedButton({
  id,
  htmlRef,
  onClick,
  onMouseUp,
  ariaLabel,
  ariaHasPopup,
  ariaExpanded,
  children
}) {
  return (
    <button
      id={id}
      ref={htmlRef}
      css={buttonStyles}
      onClick={onClick}
      onMouseUp={onMouseUp}
      aria-label={ariaLabel}
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
    >
      {children}
    </button>
  );
}

export default SuspendedButton;