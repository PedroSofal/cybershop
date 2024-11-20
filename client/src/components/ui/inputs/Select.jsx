import { memo } from 'react';
import Label from "@components/ui/form/Label";
import { css } from '@emotion/react';

const style = css`
  width: 100%;
  padding: var(--input-padding);
  border: var(--input-border);
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: var(--input-fs);
  color: var(--text-clr-1);
  cursor: pointer;

  &:disabled {
    color: var(--text-clr-3);
  }
`;

const Select = memo(function Component({
  id,
  label,
  value,
  onChange,
  required,
  disabled,
  children
}) {
  return (
    <div className="flex-column gap-050">
      <Label id={id} label={label} required={required} />
      <select
        className="elv elv--hover elv--active"
        id= {id}
        name={id}
        css={style}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        {children}
      </select>
    </div>
  );
});

export default Select;