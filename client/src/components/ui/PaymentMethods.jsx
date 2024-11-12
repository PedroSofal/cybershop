import Pix from '@assets/pix.jpg';
import Boleto from '@assets/boleto.jpg';
import Cards from '@assets/cards.jpg';
import formatPriceToBRL from '@utils/formatPriceToBRL';
import PaymentMethodImage from '@components/ui/PaymentMethodImage'
import { css } from '@emotion/react';

const itemClassName = 'flex ai-center jc-between';

const oldPriceStyles = css`
  text-decoration: line-through;
  font-size: var(--fs-200);
`;

function PaymentMethods({ priceNumber }) {
  return (
    <ul className="flex-column gap-200" aria-label="formas de pagamento aceitas">
      <li className={itemClassName}>
        <PaymentMethodImage src={Cards} alt="cartões de crédito: visa, master card, hipercard, american express e elo" />
        <p aria-hidden="true">{formatPriceToBRL(priceNumber, true)}</p>
      </li>
      <li className={itemClassName}>
        <PaymentMethodImage src={Boleto} alt="boleto bancário" />
        <p aria-hidden="true">{formatPriceToBRL(priceNumber, true)}</p>
      </li>
      <li className={itemClassName}>
        <PaymentMethodImage src={Pix} alt="pix com 5% de desconto" />
        <p aria-hidden="true">
          <span css={oldPriceStyles}>{formatPriceToBRL(priceNumber, true)}</span>
          {` ${formatPriceToBRL(priceNumber * 0.95, true)}`}
        </p>
      </li>
    </ul>
  );
}

export default PaymentMethods;