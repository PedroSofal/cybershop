import { css } from '@emotion/react';

const buttonStyles = css`
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

function Button({
  main,
  id,
  type,
  htmlRef,
  onClick,
  disabled,
  icon,
  iconPos,
  ariaLabel,
  ariaLabelledBy,
  children
}) {
  const className = main
    ? 'elv elv-accent elv--hover elv--active negative'
    : 'elv elv--hover elv--active'
  ;
  
  return (
    <button
      id={id}
      className={className}
      css={[buttonStyles, icon && iconButtonStyles(children)].filter(Boolean)}
      type={type}
      ref={htmlRef}
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

export default Button;