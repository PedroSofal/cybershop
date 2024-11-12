import { css } from '@emotion/react';

const secButtonStyles = css`
  padding: var(--input-padding);
  border-radius: var(--border-radius);
  font-size: var(--input-fs);
  transition: var(--input-transition);
`;

const iconButtonStyles = (children) => css`
  display: flex;
  align-items: center;
  gap: ${children ? 'var(--ws-100)' : 0};
  padding: var(--ws-300);

  .btn-icon {
    display: inline-flex;
  }

  .btn-text {
    align-self: end;
  }
`;

function SecButton({ id, type, htmlRef, onClick, disabled, icon, ariaLabel, children }) {
  return (
    <button
      id={id}
      className="elv elv--hover elv--active"
      css={[secButtonStyles, icon && (() => iconButtonStyles(children))].filter(Boolean)}
      type={type}
      ref={htmlRef}
      aria-label={ariaLabel}  
      onClick={onClick}
      disabled={disabled}
    >
      <span className="btn-icon" aria-hidden="true">{icon}</span>
      <span className="btn-text">{children}</span>
    </button>
  );
}

export default SecButton;