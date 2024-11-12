import logo from '@assets/logo.svg';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const logoStyles = css`
  display: grid;
  place-content: center;
  cursor: pointer;
`;

function Logo({ styles }) {
  const navigate = useNavigate();

  return (
    <img
      css={[logoStyles, styles].filter(Boolean)}
      onClick={() => navigate('/')}
      src={logo}
      alt="Logo Cybershop - clique para voltar à página inicial"
    />
  );
}

export default Logo;