import { css } from '@emotion/react';

const labelStyles = css`
  font-size: var(--fs-300);
  color: var(--white-2);

  span {
    font-size: var(--fs-200);
    color: var(--white-3);
  }
`;

function Label({ id, label, required }) {
  return(
    <label
      css={labelStyles}
      htmlFor={id}
    >
      {label}{required && <span> (obrigatório)</span>}
    </label>
  );
}

export default Label;