import { css } from '@emotion/react';

const standardContainerStyles = css`
  padding: var(--container-padding);
  border-radius: var(--border-radius);
`;

function StandardContainer({ children }) {
  return (
    <div className="elv" css={standardContainerStyles}>
      {children}
    </div>
  );
}

export default StandardContainer;