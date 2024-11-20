import { css } from '@emotion/react';

const fieldsetStyles = css`
  display: contents;
`;

const relativeStyles = css`
  position: relative;
  margin-top: var(--ws-500);
`;

const legendStyles = css`
  position: absolute;
  top: calc(var(--ws-500) * -1);
  font-size: var(--fs-500);
  font-weight: 600;
`;

function Fieldset({ legend, children }) {
  return(
    <fieldset css={fieldsetStyles}>
      <div css={relativeStyles}>
        <legend css={legendStyles}>{legend}</legend>
      </div>
      {children}
    </fieldset>
  );
}

export default Fieldset;