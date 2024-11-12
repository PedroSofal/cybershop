import { css } from '@emotion/react';

const styles = css`
  padding: var(--ws-200) var(--ws-400);
  border-radius: var(--border-radius);
  font-weight: 600;
  background-color: var(--error-clr);
`;

function ErrMsg({ htmlRef, children }) {
  return(
    <p
      ref={htmlRef}
      css={children && styles}
      className={!children && 'offscreen'}
      aria-live="assertive"
    >
      {children}
    </p>
  );
}

export default ErrMsg;