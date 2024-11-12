import { css } from '@emotion/react';

const asciiStyles = css`
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  font-size: clamp(0.4375rem, 0.2418rem + 0.9783vw, 1rem);
  letter-spacing: -0.05rem;
  line-height: 1.2;
`;

function Ascii({ children }) {
  return (
    <pre css={asciiStyles} aria-hidden="true">
      {children}
    </pre>
  );
}

export default Ascii;