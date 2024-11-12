import { css } from '@emotion/react';

const radioStyles = (borderRadius) => css`
  display: flex;
  justify-content: center;
  gap: var(--ws-100);
  padding: var(--ws-400) var(--ws-400-600);
  border-radius: ${borderRadius || 'none'};
  cursor: pointer;
  transition: var(--input-transition);

  & * {
    cursor: pointer;
  }

  & span {
    width: 100%;
  }
`;

function Radio({
  label,
  name,
  value,
  setValue,
  customOnChange,
  checked,
  ariaControls,
  ariaLabel,
  stackPosition
}) {
  const handleChange = (e) => {
    if (customOnChange) {
      customOnChange(e);
    } else {
      setValue(e.target.value);
    }
  }

  let borderRadius;
  if (stackPosition === 'first') {
    borderRadius = 'var(--border-radius) var(--border-radius) 0 0';
  } else if (stackPosition === 'last') {
    borderRadius = '0 0 var(--border-radius) var(--border-radius)';
  } else if (stackPosition === 'middle') {
    borderRadius = '0';
  } else {
    borderRadius = 'var(--border-radius)';
  }

  return (
    <label
      className="elv elv--hover elv--active elv--focus"
      css={() => radioStyles(borderRadius)}
      htmlFor={value}
    >
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        aria-label={ariaLabel || label}
        aria-controls={ariaControls}
      />
      <span aria-hidden="true">{label}</span>
    </label>
  );
}

export default Radio;