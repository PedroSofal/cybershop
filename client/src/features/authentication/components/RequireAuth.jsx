import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '@authentication/contexts/AuthContext';
import { css, keyframes } from '@emotion/react';

const loaderAnimation = keyframes`
  0%   {background-position:0     0, 10px 10px, 20px 20px}
  33%  {background-position:10px  10px}
  66%  {background-position:0    20px,10px 10px,20px 0   }
  100% {background-position:0     0, 10px 10px, 20px 20px}
`;

const loaderStyles = css`
  display: flex;
  align-items: flex-start;
  width: 60px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    aspect-ratio: 1;
    --g: conic-gradient(from -90deg at 10px 10px, var(--brand-clr-1) 90deg,#0000 0);
    background: var(--g), var(--g), var(--g);
    filter: drop-shadow(30px 30px 0 var(--brand-clr-1));
    animation: ${loaderAnimation} 1s infinite;
  }

  &::after {
    transform: scaleX(-1);
  }
`;

function RequireAuth() {
  const { token, isAuthLoading } = useContext(AuthContext);
  const location = useLocation();
  const state = { ...location.state, from: location.pathname }
  
  if (isAuthLoading) {
    return (
      <div className="flex-column ai-center jc-center gap-800" css={css`height: 100vh;`}>
        <div css={loaderStyles}></div>
        <p>Autenticando...</p>
      </div>
    )
  }

  return (
    token ? <Outlet /> : <Navigate to="/login" state={state} replace />
  );
}

export default RequireAuth;