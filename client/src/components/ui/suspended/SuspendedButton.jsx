import { css } from '@emotion/react';

const suspendedButtonStyles = css`
  font-size: inherit;
  background-color: transparent;
  cursor: pointer;
`;

function SuspendedButton({
  htmlRef,
  onClick,
  onMouseUp,
  ariaLabel,
  ariaHasPopup,
  ariaExpanded,
  ariaControls,
  children
}) {
  return (
    <button
      ref={htmlRef}
      css={suspendedButtonStyles}
      onClick={onClick}
      onMouseUp={onMouseUp}
      aria-label={ariaLabel}
      aria-haspopup={ariaHasPopup}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      {children}
    </button>
  );
}

export default SuspendedButton;