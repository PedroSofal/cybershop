import { useContext, useEffect, useRef } from 'react';
import CheckoutContext from '@checkout/contexts/CheckoutContext';
import { css } from '@emotion/react';

const sectionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: min(25rem, 90vw);
  margin: 2rem auto;
  text-align: center;
  z-index: 0;

  --circle-size: 3.125rem;
  --line-thickness: 4px;
  --next-steps-clr: var(--bg-dp-1);
  --taken-steps-clr: var(--accent-dp-0);
  --taken-steps-glow: var(--accent-glow);
  --progress: 0%;
`;

const stepStyles = css`
  display: grid;
  place-items: center;
  gap: 5px;
  color: var(--text-clr-3);
  z-index: 1;
`;

const activeStyles = css`
  color: var(--text-clr);
  font-weight: 600;

  & > div {
    background-color: var(--taken-steps-clr);
    box-shadow: 0 0 40px 10px var(--taken-steps-glow);
  }
`;

const lineContainerStyles = css`
  position: absolute;
  height: var(--line-thickness);
  top: calc(var(--circle-size) / 2 - calc(var(--line-thickness) / 2));
  left: var(--circle-size);
  right: var(--circle-size);
  /* z-index: -1; */
  background-color: var(--next-steps-clr);
`;

const lineStyles = css`
  width: var(--progress);
  height: 100%;
  background-color: var(--taken-steps-clr);
  box-shadow: 0 0 40px 10px var(--taken-steps-glow);
`;

const numberStyles = css`
  display: grid;
  place-content: center;
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
  background-color: var(--next-steps-clr);
  color: var(--text-clr-1);
`;

function Progress() {
  const progressRef = useRef();
  const { progress, getOrderInfo } = useContext(CheckoutContext);
  const deliveryMethod = getOrderInfo('deliveryMethod');

  useEffect(() => {
    const progressInPercentage = ((progress - 1) / 2 * 100).toString().concat('%');
    progressRef.current.style.setProperty('--progress', progressInPercentage);
  }, [progress]);

  return (
    <section css={sectionStyle} ref={progressRef} aria-hidden="true">
      <div css={lineContainerStyles}>
        <div css={lineStyles}></div>
      </div>
      <div css={[stepStyles, progress >= 1 && activeStyles]}>
        <div css={numberStyles} className={progress >= 1 ? 'negative' : ''}>1</div>
        <p>{deliveryMethod === 'pick-up' ? 'Contato' : 'Entrega'}</p>
      </div>
      <div css={[stepStyles, progress >= 2 && activeStyles]}>
        <div css={numberStyles} className={progress >= 2 ? 'negative' : ''}>2</div>
        <p>Pagamento</p>
      </div>
      <div css={[stepStyles, progress >= 3 && activeStyles]}>
        <div css={numberStyles} className={progress >= 3 ? 'negative' : ''}>3</div>
        <p>Revisão</p>
      </div>
    </section>
  );
}

export default Progress;