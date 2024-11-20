import { useNavigate } from 'react-router-dom';
import Logo from '@components/ui/Logo';
import Button from '@buttons/Button';
import ScreenContainer from '@containers/ScreenContainer';
import Ascii from '@components/ui/Ascii';
import { css } from '@emotion/react';

function Error404() {
  const navigate = useNavigate();

  return (
    <main className="fullscreen-centered ji-center gap-700 content-grid dp-0" aria-labelledby="pageTitle">
      <Logo styles={css`width: calc(var(--fs-900) * 8);`} />
      <ScreenContainer>
        <Ascii>
                    __| |_____________________________________________________________________| |__<br />
                    __   _____________________________________________________________________   __<br />
          &nbsp;&nbsp;| |                                                                     | |  <br />
          &nbsp;&nbsp;| |\\\\____________/\\\________/\\\\\\\________/\\\\\\\\\\__\\\\\\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\__________/\\\\\______/\\\/////\\\____/\\\///////\\\_\\\\\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\________/\\\/\\\_____/\\\____\//\\\__\///______/\\\__\\\\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\______/\\\/\/\\\____\/\\\_____\/\\\_________/\\\//___\\\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\\____/\\\/__\/\\\____\/\\\_____\/\\\________\////\\\__\\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\\\__/\\\\\\\\\\\\\\\\_\/\\\_____\/\\\___________\//\\\_\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\\\\_\///////////\\\//__\//\\\____/\\\___/\\\______/\\\__\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\\\\\___________\/\\\_____\///\\\\\\\/___\///\\\\\\\\\/___\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\\\\\\___________\///________\///////_______\/////////_____\\\\| |  <br />
                    __| |_____________________________________________________________________| |__<br />
                    __   _____________________________________________________________________   __<br />
          &nbsp;&nbsp;| |                                                                     | |  
        </Ascii>
      </ScreenContainer>
      <div className="flex-column ai-center gap-400 text-grid text-center">
        <h1 id="pageTitle">Acesso negado</h1>
        <p className="text-clr-2">
          A página que você tentou acessar possui conteúdo restrito.<br />
          Se você acha que isso é um engano, por favor verifique suas credenciais ou entre em contato conosco.
        </p>
      </div>
      <Button main onClick={() => navigate(-1)}>Voltar</Button>
    </main>
  );
}

export default Error404;