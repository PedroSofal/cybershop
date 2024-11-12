// Hooks
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import useFetchOrderById from '@hooks/useFetchOrderById';
import useGetEssentialOrderEntries from '@hooks/useGetEssentialOrderEntries';
import useCalcPriceFractions from '@hooks/useCalcPriceFractions';

// Components
import OrderSummary from '@components/OrderSummary';
import Loader from '@components/ui/Loader';
import OrderStatus from '@components/OrderStatus';
import ServerError from '@components/ui/ServerError';

// Styles
import { css } from '@emotion/react';

const orderIdStyles = css`
  font-size: var(--fs-400);
  font-weight: normal;
  color: var(--white-3);
`;

function OrderDetails() {
  const titleRef = useRef();
  const { id: orderId } = useParams();
  const { orderData, isLoading, error } = useFetchOrderById(orderId);

  const {
    personalEntries,
    addressEntries,
    cardEntries
  } = useGetEssentialOrderEntries(orderData);

  const { total } = useCalcPriceFractions(
    orderData.products || [],
    orderData.deliveryMethod || '',
    orderData.paymentMethod || '',
    orderData.promoCode || ''
  );

  useEffect(() => {
    if (!isLoading) {
      titleRef.current?.focus();
    }
  }, [isLoading]);

  if (isLoading) return <Loader />

  if (error?.status == 404) {
    return <Navigate to='/404' replace />
  } else if (error) {
    <ServerError />
  }

  return (
    <main className="text-grid">
      <div css={css`margin-bottom: var(--ws-700);`} className="flex ai-end jc-between gap-200">
        <div className="flex flex-wrap ai-end gap-200">
          <h1 tabIndex={-1} ref={titleRef}>Detalhes do pedido</h1>
          <p css={orderIdStyles}>(pedido #{orderId})</p>
        </div>
        <OrderStatus status={orderData.status} />
      </div>

      <OrderSummary
        paymentMethod={orderData.paymentMethod}
        deliveryMethod={orderData.deliveryMethod}
        personalEntries={personalEntries}
        addressEntries={addressEntries}
        cardEntries={cardEntries}
        status={orderData.status}
        total={total}
      />
    </main>
  );
}

export default OrderDetails;