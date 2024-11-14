import { useState, memo } from 'react';
import useUserInputState from '@hooks/useUserInputState';
import Label from "@forms/Label";
import { css } from '@emotion/react';

const fieldStyles = css`
  width: 100%;
  
  & input {
    width: 100%;
    padding: var(--input-padding);
    border: none;
    border-radius: var(--border-radius);
    font-size: var(--input-fs);
  }

  input::placeholder {
    color: var(--white-3);
  }

  & .instructions {
    position: absolute;
    top: 64px;
    padding: var(--ws-300);
    border-radius: var(--border-radius);
    font-size: var(--fs-200);
    box-shadow: var(--shadow-1);
    z-index: 1;
  }

  & .instructions::before {
    content: '';
    display: block;
    position: absolute;
    width: 14px;
    height: 14px;
    top: -7px;
    rotate: 45deg;
  }
`;

const errorStyles = css`
  & input {
    outline: var(--input-error-outline);
  }

  & .instructions,
  & .instructions::before {
    background-color: var(--error-clr);
  }
`;

const TextInput = memo(function Component({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  isValid = true,
  required,
  minLength,
  maxLength,
  pattern,
  inputMode,
  autoComplete,
  ariaDescribedBy,
  description,
  finished = () => false,
}) {
  const [ focus, setFocus ] = useState(false);

  const userInputState = useUserInputState({
    validInput: isValid,
    finishedInput: (value && !focus) || finished(),
  });

  const alertInvalid = userInputState === 'finished-invalid';

  return (
    <div
      className="flex-column gap-050"
      css={[fieldStyles, alertInvalid && errorStyles]}
    >
      <Label id={id} label={label} required={required} />
      <div css={css`position: relative;`}>
        <input
          className="elv elv--hover elv--focus"
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          inputmode={inputMode}
          autoComplete={autoComplete}
          aria-invalid={alertInvalid}
          aria-describedby={alertInvalid ? ariaDescribedBy : null}
        />
        {ariaDescribedBy && description && (
          <p
            id={ariaDescribedBy}
            className={alertInvalid ? 'instructions' : 'offscreen'}
            aria-hidden={!alertInvalid}
            aria-live="assertive"
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
});

export default TextInput;