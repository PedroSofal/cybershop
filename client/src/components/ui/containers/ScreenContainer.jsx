import { css } from '@emotion/react';

const screenStyles = css`
  padding: var(--container-padding);
  border-radius: var(--border-radius);
  border: 2px solid var(--brand-clr-1);
  background-image: radial-gradient(var(--overlay-gradient-2));
  background-color: var(--purple-3);
  box-shadow: 15px 15px 30px var(--purple-3-shadow);
  cursor: default;
`;

function ScreenContainer({ children }) {
  return (
    <div css={screenStyles}>{children}</div>
  );
}

export default ScreenContainer;