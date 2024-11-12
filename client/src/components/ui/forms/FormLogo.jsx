import Logo from '@components/ui/Logo';
import { css } from '@emotion/react';

function FormLogo() {
  return (
    <Logo styles={css`width: 130px; margin-top: var(--ws-700);`} />
  );
}

export default FormLogo;