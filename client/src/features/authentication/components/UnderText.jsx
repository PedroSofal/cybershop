import { css } from '@emotion/react';

const styles = css`
  color: var(--text-clr-3);

  & span {
    color: var(--text-clr-1);
    text-decoration: underline;
  }
`;

function UnderText({ children }) {
  return (
    <p css={styles}>{children}</p>
  );
}

export default UnderText;