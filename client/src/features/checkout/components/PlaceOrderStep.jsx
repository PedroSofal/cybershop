// Hooks
import { useContext, useEffect, useRef } from 'react';
import useCalcPriceFractions from '@hooks/useCalcPriceFractions';
import useGetEssentialOrderEntries from '@hooks/useGetEssentialOrderEntries';

// Contexts
import CheckoutContext from '@checkout/contexts/CheckoutContext';

// Components
import FormFooter from '@forms/FormFooter';
import PayButton from '@checkout/components/PayButton';
import BackButton from '@checkout/components/BackButton';
import OrderSummary from '@components/OrderSummary';

function PlaceOrderStep() {
  const titleRef = useRef();
  const { getAllOrderInfos } = useContext(CheckoutContext);
  const orderInfos = getAllOrderInfos();
  
  const {
    personalEntries,
    addressEntries,
    cardEntries
  } = useGetEssentialOrderEntries(orderInfos);

  const { total } = useCalcPriceFractions(
    orderInfos.products,
    orderInfos.deliveryMethod,
    orderInfos.paymentMethod,
    orderInfos.promoCode
  );

  useEffect(() => {
    titleRef.current?.focus();
  }, []);
  
  return(
    <>
    <h1 className="page-title" ref={titleRef} tabIndex={-1}>Revise seus dados</h1>

    <div className="flex-column gap-600">
      <OrderSummary
        paymentMethod={orderInfos.paymentMethod}
        deliveryMethod={orderInfos.deliveryMethod}
        personalEntries={personalEntries}
        addressEntries={addressEntries}
        cardEntries={cardEntries}
        total={total}
      />

      <FormFooter>
        <BackButton />
        <PayButton />
      </FormFooter>
    </div>
    </>
  );
}

export default PlaceOrderStep;