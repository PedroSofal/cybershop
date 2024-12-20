import { css, keyframes } from '@emotion/react';

const loaderAnimation = keyframes`
  0%   {background-position: 0     0, 10px 10px, 20px 20px}
  33%  {background-position: -30px 0, 10px 10px, 20px 20px}
  66%  {background-position: -30px 0,-20px 10px, 20px 20px}
  100% {background-position: -30px 0,-20px 10px,-10px 20px}
`;

const loaderStyles = css`
  width: 60px;
  aspect-ratio: 1;
  --g: conic-gradient(from -90deg at 10px 10px, var(--brand-clr-1) 90deg,#0000 0);
  background: var(--g), var(--g), var(--g);
  background-size: 50% 50%;
  animation: ${loaderAnimation} 1s infinite;
`;

function Loader() {
  return(
    <div className="flex-column ai-center jc-center gap-600">
      <div css={loaderStyles}></div>
      <p>Carregando...</p>
    </div>
  );
}

export default Loader;