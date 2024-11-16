import { css } from '@emotion/react';

const screenStyles = css`
  padding: var(--container-padding);
  border-radius: var(--border-radius);
  border: 2px solid var(--accent-dp-0);
  background-image: radial-gradient(var(--overlay-gradient-2));
  background-color: var(--screen-dp-0);
  box-shadow: 15px 15px 30px var(--screen-shadow);
  cursor: default;
`;

function ScreenContainer({ children }) {
  return (
    <div className="negative" css={screenStyles}>{children}</div>
  );
}

export default ScreenContainer;