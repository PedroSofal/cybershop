import { css } from '@emotion/react';

const signalStyles = (status) => css`
  --color: ${status === 'pago' ? 'var(--paid-clr)' : 'var(--pending-clr)'};
  width: min(8px, 1.4vw);
  height: min(8px, 1.4vw);
  border-radius: 50%;
  background-color: var(--color);
  box-shadow: 0 0 10px var(--color);
`;

function OrderStatus({ status }) {
  return (
    <div className="flex ai-center gap-100">
      <div css={() => signalStyles(status)}></div>
      <span
        css={css`text-transform: capitalize;`}
        aria-hidden="true"
      >{status}</span>
      <span
        className="offscreen"
        aria-label={`status do pedido: ${status}`}
      ></span>
    </div>    
  );
}

export default OrderStatus;