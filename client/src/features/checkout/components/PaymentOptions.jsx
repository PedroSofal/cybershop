// Hooks
import { useContext } from 'react';

// Contexts
import CheckoutContext from '@checkout/contexts/CheckoutContext';

// Components
import Radio from '@inputs/Radio';
import PaymentMethodImage from '@components/ui/PaymentMethodImage';

// Assets
import Pix from '@assets/pix.jpg';
import Boleto from '@assets/boleto.jpg';
import Cards from '@assets/cards.jpg';

// Styles
import { css } from '@emotion/react';

const radioContentStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & span {
    margin-left: var(--ws-400);
    padding: var(--ws-100) var(--ws-200);
    border-radius: var(--border-radius);
    font-size: var(--fs-300);
    background-color: var(--discount-clr);
  }
`;
function PaymentOptions() {
  const { getOrderInfo, setOrderInfo } = useContext(CheckoutContext);
  const paymentMethod = getOrderInfo('paymentMethod');

  function setPaymentMethod(value) {
    setOrderInfo('paymentMethod', value);
  }

  return (
    <form>
      <Radio
        name="payment"
        value="pix"
        setValue={setPaymentMethod}
        checked={paymentMethod === 'pix'}
        stackPosition="first"
        ariaLabel="pix com 5% de desconto"
        label={
          <div css={radioContentStyles}>
            <p>Pix<span>5% de desconto</span></p>
            <PaymentMethodImage src={Pix} alt="" />
          </div>
        }
      />
      <Radio
        name="payment"
        value="boleto"
        setValue={setPaymentMethod}
        checked={paymentMethod === 'boleto'}
        stackPosition="middle"
        ariaLabel="boleto"
        label={
          <div css={radioContentStyles}>
            <p>Boleto</p>
            <PaymentMethodImage src={Boleto} alt="" />
          </div>
        }
      />
      <Radio
        name="payment"
        value="card"
        setValue={setPaymentMethod}
        checked={paymentMethod === 'card'}
        stackPosition="last"
        ariaLabel="cartões de crédito: visa, master card, hipercard, american express e elo"
        label={
          <div css={radioContentStyles}>
            <p>Cartão de crédito</p>
            <PaymentMethodImage src={Cards} alt="" />
          </div>
        }
      />
    </form>
  );
}

export default PaymentOptions;