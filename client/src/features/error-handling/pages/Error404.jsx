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
                    __| |_______________________________________________________________________| |__<br />
                    __   _______________________________________________________________________   __<br />
          &nbsp;&nbsp;| |                                                                       | |  <br />
          &nbsp;&nbsp;| |\\\\____________/\\\________/\\\\\\\_______________/\\\____\\\\\\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\__________/\\\\\______/\\\/////\\\___________/\\\\\____\\\\\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\________/\\\/\\\_____/\\\____\//\\\________/\\\/\\\____\\\\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\______/\\\/\/\\\____\/\\\_____\/\\\______/\\\/\/\\\____\\\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\\____/\\\/__\/\\\____\/\\\_____\/\\\____/\\\/__\/\\\____\\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\\\__/\\\\\\\\\\\\\\\\_\/\\\_____\/\\\__/\\\\\\\\\\\\\\\\_\\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\\\\_\///////////\\\//__\//\\\____/\\\__\///////////\\\//__\\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\\\\\___________\/\\\_____\///\\\\\\\/_____________\/\\\____\\\\\| |  <br />
          &nbsp;&nbsp;| |\\\\\\\\\\\\___________\///________\///////_______________\///_____\\\\| |  <br />
                    __| |_______________________________________________________________________| |__<br />
                    __   _______________________________________________________________________   __<br />
          &nbsp;&nbsp;| |                                                                       | |  
        </Ascii>
      </ScreenContainer>
      <div className="flex-column ai-center gap-400 text-grid text-center">
        <h1 id="pageTitle">Página não encontrada</h1>
        <p className="text-clr-2">
          A página que você procura não existe ou foi temporariamente removida.<br />
          Verifique erros ortográficos ou tente novamente mais tarde.
        </p>
      </div>
      <Button main onClick={() => navigate(-1)}>Voltar</Button>
    </main>
  );
}

export default Error404;