// Hooks
import { useEffect, useRef } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

// Components
import ScreenContainer from '@containers/ScreenContainer';
import SecButton from '@buttons/SecButton';
import Ascii from '@components/ui/Ascii';

// Assets
import { Email, GitHub, LinkedIn } from '@mui/icons-material';
import Behance from '@assets/Behance.jsx';

// Styles
import { css } from '@emotion/react';

const subtitleStyles = css`
  margin-top: var(--ws-200);
  margin-bottom: var(--ws-600);
  font-weight: 600;
  color: var(--white-2);
`;

function SaleCompleted() {
  const titleRef = useRef();
  const location = useLocation();
  const fromCheckout = location?.state?.from === '/checkout';

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  if (!fromCheckout) return <Navigate to="/meu-carrinho" replace />

  return (
    <main className="content-grid ji-center" >
      <div className="text-grid ji-center text-center" >
        <h1 ref={titleRef} tabIndex={-1}>Compra finalizada!</h1>
        <p css={subtitleStyles}>A simulação termina aqui.</p>
        <ScreenContainer>
          <Ascii>
                      __| |_________________________________________________________________________| |__<br />
                      __   _________________________________________________________________________   __<br />
            &nbsp;&nbsp;| |                                                                         | |  <br />
            &nbsp;&nbsp;| |\\\\__/\\\\\\\\\\\\\\\__/\\\\\\\\\\\__/\\\\____________/\\\\_\\\\\\\\\\\\| |  <br />
            &nbsp;&nbsp;| |\\\\\_\/\\\///////////__\/////\\\///__\/\\\\\\________/\\\\\\_\\\\\\\\\\\| |  <br />
            &nbsp;&nbsp;| |\\\\\\_\/\\\_________________\/\\\_____\/\\\//\\\____/\\\//\\\_\\\\\\\\\\| |  <br />
            &nbsp;&nbsp;| |\\\\\\\_\/\\\\\\\\\\\_________\/\\\_____\/\\\\///\\\/\\\/_\/\\\_\\\\\\\\\| |  <br />
            &nbsp;&nbsp;| |\\\\\\\\_\/\\\///////__________\/\\\_____\/\\\__\///\\\/___\/\\\_\\\\\\\\| |  <br />
            &nbsp;&nbsp;| |\\\\\\\\\_\/\\\_________________\/\\\_____\/\\\____\///_____\/\\\_\\\\\\\| |  <br />
            &nbsp;&nbsp;| |\\\\\\\\\\_\/\\\_________________\/\\\_____\/\\\_____________\/\\\_\\\\\\| |  <br />
            &nbsp;&nbsp;| |\\\\\\\\\\\_\/\\\______________/\\\\\\\\\\\_\/\\\_____________\/\\\_\\\\\| |  <br />
            &nbsp;&nbsp;| |\\\\\\\\\\\\_\///______________\///////////__\///______________\///__\\\\| |  <br />
                      __| |_________________________________________________________________________| |__<br />
                      __   _________________________________________________________________________   __<br />
            &nbsp;&nbsp;| |                                                                         | |  
          </Ascii>
        </ScreenContainer>
      </div>
      <div className="text-grid text-long" css={css`line-height: 2;`}>
        <p>Muito obrigado por explorar o Cybershop até aqui! Espero que a experiência tenha sido fácil e livre de bugs 🙏</p>
        <br />
        <p>Se ainda não o fez, você ainda pode conferir sua página de perfil clicando no ícone no canto superior direito da página, onde você pode gerenciar sua conta adicionando novos endereços, cartões, e visualizar seu histórico de pedidos.</p>
        <br />
        <p>Caso queira dar um feedback ou relatar algum bug, favor entrar em contato.</p>
      </div>
      <ContactLinks />
    </main>
  );

  function ContactLinks() {
    function handleEmailClick() {
      window.location.href='mailto:pedrosofal@gmail.com';
    }
    
    return (
      <section className="flex-column ai-center gap-400">
        <h2 className="offscreen">Links de contato</h2>
        <SecButton
          onClick={handleEmailClick}
          icon={<Email />}
          ariaLabel="enviar email para pedrosofal@gmail.com"
        >pedrosofal@gmail.com</SecButton>
        <div className="flex ai-center gap-200" css={css`& svg { font-size: var(--fs-800); }`}>
          <Link
            to="https://www.linkedin.com/in/pedrosofal/"
            aria-label="linkedin"
          ><LinkedIn /></Link>
          <Link
            to="https://www.github.com/PedroSofal/"
            aria-label="github"
          ><GitHub /></Link>
          <Link
            to="https://behance.net/pedrosofal"
            aria-label="behance"
          ><Behance /></Link>
        </div>
      </section>
    );
  }
}

export default SaleCompleted;