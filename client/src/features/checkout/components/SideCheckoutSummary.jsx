// Hooks
import { useContext, useRef } from 'react';
import useCalcPriceFractions from '@hooks/useCalcPriceFractions';

// Contexts
import CheckoutContext from '@checkout/contexts/CheckoutContext';

// Components
import LinkButton from '@buttons/LinkButton';
import PayButton from '@checkout/components/PayButton';
import CartList from '@shopping-cart/components/CartList';
import Button from '@buttons/Button';

// Utilities
import formatPriceToBRL from '@utils/formatPriceToBRL';

// Styles
import { css } from '@emotion/react';
import mq from '@utils/getMediaQueries';

const stickyStyles = css`
  position: sticky;
  top: 5rem;
  height: fit-content;

  ${mq('tablet')} {
    position: static;
  }
`;

const detailButtonStyles = css`
  font-size: var(--fs-300);
  color: var(--link-clr);
  text-decoration: underline !important;
`;

const discountStyles = css`
  font-size: var(--fs-200);
  margin-left: 1ch;
  color: var(--white-3);
`;

const fractionStyles = css`
  font-weight: 600;
`;

const totalStyles = css`
  padding-block: var(--ws-200);
  border-radius: var(--border-radius);
  text-align: center;

  & span {
    font-weight: 600;
    font-size: var(--fs-500);
  }
`;

function SideCheckoutSummary() {
  const dialogRef = useRef();

  const { progress, getOrderInfo } = useContext(CheckoutContext);

  const products = getOrderInfo('products');
  const deliveryMethod = getOrderInfo('deliveryMethod');
  const paymentMethod = getOrderInfo('paymentMethod');
  const promoCode = getOrderInfo('promoCode');

  const {
    totalQuantity,
    subtotal,
    discount,
    freight,
    pixDiscount,
    total
  } = useCalcPriceFractions(
    products,
    deliveryMethod,
    paymentMethod,
    promoCode
  );

  return (
    <>
    <aside className="flex-column gap-400" css={stickyStyles}>
      <h2>Resumo da compra</h2>
      <div className="flex jc-between">
        <p>{`${totalQuantity} ${totalQuantity > 1 ? 'itens' : 'item'} no carrinho`}</p>
        <LinkButton
          onClick={() => dialogRef.current.showModal()}
          ariaLabel="abrir lista de produtos no carrinho"
          styles={detailButtonStyles}
        >Detalhes</LinkButton>
      </div>
      <hr />
      <div className="flex-column gap-100">
        <div className="flex jc-between">
          <p>Subtotal</p>
          <p css={fractionStyles}>{formatPriceToBRL(subtotal, true)}</p>
        </div>
        <div className="flex jc-between">
          <p>Desconto
            {promoCode && 
              <span css={discountStyles}>
                {`${promoCode.code} ${promoCode.rate * 100}%`}
              </span>
            }
          </p>
          <p css={fractionStyles}>- {formatPriceToBRL(discount)}</p>
        </div>
        <div className="flex jc-between">
          <p>Frete</p>
          <p css={fractionStyles}>{formatPriceToBRL(freight)}</p>
        </div>
        {pixDiscount &&
          <div className="flex jc-between">
            <p>Desconto PIX</p>
            <p css={fractionStyles}>- {formatPriceToBRL(pixDiscount)}</p>
          </div>
        }
      </div>
      <hr />
      <p className="elv" id="totalPrice" css={totalStyles}>Total: <span>{formatPriceToBRL(total)}</span></p>
      {progress === 3 && <PayButton />}
    </aside>

    <OrderProductsModal htmlRef={dialogRef} />
    </>
  );
}

function OrderProductsModal({ htmlRef }) {
  return (
    <dialog ref={htmlRef}>
      <div className="flex-column gap-400">
        <h1>Produtos no carrinho</h1>
        <CartList />
        <div className="flex jc-end">
          <Button main onClick={() => htmlRef.current.close()}>Fechar</Button>
        </div>
      </div>
    </dialog>
  );
}

export default SideCheckoutSummary;