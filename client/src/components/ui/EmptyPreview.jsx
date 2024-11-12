import { css } from '@emotion/react';

const emptyStyles = css`
  padding-block: 1.4rem;
  text-align: center;
`;

function EmptyPreview({ children }) {
  return (
    <div css={emptyStyles}>
      {children}
    </div>
  );
}

export default EmptyPreview;