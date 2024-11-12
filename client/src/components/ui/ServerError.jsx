import { css } from '@emotion/react';

const errorStyles = css`
  background-color: var(--error-clr);
  padding: var(--ws-100) var(--ws-700);
  border-radius: var(--border-radius);
  text-align: center;
`;

function ServerError() {
  return (
    <div className="flex-column ai-center jc-center gap-600">
      <p css={errorStyles}>Erro de servidor. Por favor, recarrega a página ou tente novamente mais tarde.</p>
    </div>
  )
}

export default ServerError;