import { useNavigate } from 'react-router-dom';
import Logo from '@components/ui/Logo';
import Button from '@buttons/Button';
import { css } from '@emotion/react';

function Error404() {
  const navigate = useNavigate();

  return (
    <main className="fullscreen-centered ji-center gap-700 content-grid dp-0" aria-labelledby="pageTitle">
      <Logo styles={css`width: calc(var(--fs-900) * 5);`} />
      <div className="flex-column ai-center gap-400 text-grid text-center">
        <h1 id="pageTitle">Ops! Algo deu errado.</h1>
        <p className="text-clr-2">
          Desculpe pelo incoveniente. Estamos trabalhando para reparar o erro.<br />
        </p>
      </div>
      <Button main onClick={() => navigate(-1)}>Voltar</Button>
    </main>
  );
}

export default Error404;