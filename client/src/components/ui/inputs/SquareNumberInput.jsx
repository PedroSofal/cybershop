import { css } from '@emotion/react';

const styles = css`
  width: clamp(2.8125rem, 2.5299rem + 1.413vw, 3.625rem);
  border: 2px solid var(--text-clr-3);
  border-radius: var(--border-radius);
  font-size: var(--input-fs);
  text-align: center;
  background-color: transparent;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

function SquareNumberInput({ value, onChange, ariaLabel, htmlRef }) {
  return (
    <input
      css={styles}
      type="number"
      value={value}
      aria-label={ariaLabel}
      aria-live="polite"
      onChange={onChange}
      ref={htmlRef}
      max={99}
    />
  );
}

export default SquareNumberInput;