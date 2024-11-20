// Hooks
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

// Contexts
import CheckoutContext from '@checkout/contexts/CheckoutContext';

// Components
import Progress from '@checkout/components/Progress';
import SideCheckoutSummary from '@checkout/components/SideCheckoutSummary';
import DeliveryStep from '@checkout/components/setps/DeliveryStep';
import PaymentStep from '@checkout/components/setps/PaymentStep';
import PlaceOrderStep from '@checkout/components/setps/PlaceOrderStep';
import Loader from '@components/ui/Loader';

// Styles
import { css } from '@emotion/react';
import mq from '@utils/getMediaQueries';

const gridStyles = css`
  display: grid;
  grid-template-columns: 72% 1fr;
  column-gap: var(--ws-400-600);
  row-gap: var(--ws-700);

  ${mq('tablet')} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { progress, setOrderInfo } = useContext(CheckoutContext);
  const [ isLoading, setIsLoading ] = useState(true);
  
  useEffect(() => {
    if (location.state) {
      setOrderInfo('created', location.state.created);
      setOrderInfo('products', location.state.products);
      setOrderInfo('deliveryMethod', location.state.deliveryMethod);
      setOrderInfo('userId', location.state.userId);
      setIsLoading(false);
    } else {
      navigate('/meu-carrinho');
    }
  }, []);

  let mainComponent;
  if (progress === 1) {
    mainComponent = <DeliveryStep />
  } else if (progress === 2) {
    mainComponent = <PaymentStep />
  } else if (progress === 3) {
    mainComponent = <PlaceOrderStep />
  }

  return (
    isLoading
      ? <Loader />
      : (
        <>
          <Progress progress={progress} />

          <div css={gridStyles}>
            <main>
              {mainComponent}
            </main>
            <SideCheckoutSummary />
          </div>
        </>
      )
  );
}

export default Checkout;