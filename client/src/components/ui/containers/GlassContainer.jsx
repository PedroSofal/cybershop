import { css } from '@emotion/react';

function Container({ styles, children }) {
  const glassStyles = css`
    border: 2px solid var(--bg-dp-24);
    border-radius: var(--border-radius);
    padding: var(--container-padding);
    background-image: linear-gradient(30deg, var(--overlay-gradient-1));
    background-color: var(--glass-dp-0) !important;
  `;

  return (
    <div className="elv" css={[glassStyles, styles].filter(Boolean)}>
      {children}
    </div>
  );
}

export default Container;