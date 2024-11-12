import { css } from '@emotion/react';

const containerStyles = css`
  display: none;
  position: absolute;
  margin-top: var(--ws-200);
  border-radius: var(--border-radius);
  font-size: var(--fs-400);
  z-index: 1;
`;

function SuspendedContent({ htmlRef, styles, children }) {
  return (
    <div
      ref={htmlRef}
      className="elv-2"
      css={[containerStyles, styles].filter(Boolean)}
    >
      {children}
    </div>
  );
}

export default SuspendedContent;