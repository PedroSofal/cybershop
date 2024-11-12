import { css } from '@emotion/react';

const stickyStyles = css`
  position: sticky;
  top: 0;
  z-index: 1;
`;

function Sticky({ children }) {
  return (
    <div css={stickyStyles}>{children}</div>
  );
}

export default Sticky;