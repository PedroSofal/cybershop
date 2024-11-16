// Hooks
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';

// Contexts
import ShippingContext from '@contexts/ShippingContext';
import CartContext from '@shopping-cart/contexts/CartContext';
import Button from '@buttons/Button';

// Components
import CartList from '@shopping-cart/components/CartList';
import DeliveryOptions from '@shopping-cart/components/DeliveryOptions';
import CartSummary from '@shopping-cart/components/CartSummary';
import CartActions from '@shopping-cart/components/CartActions';
import EmptyList from '@components/EmptyList';

function ShoppingCart() {
  const titleRef = useRef();
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);
  const { shippingInfo } = useContext(ShippingContext);
  const initiDeliveryMethod = shippingInfo.location ? 'standard-delivery' : 'pick-up';

  const [ deliveryMethod, setDeliveryMethod ] = useState(initiDeliveryMethod);

  useEffect(() => {
    if (cartItems.length) {
      titleRef.current?.focus();
    }
  }, []);

  if (!cartItems.length) {
    return (
      <EmptyList title="Você ainda não adicionou nenhum item ao carrinho">
        <Button main onClick={() => navigate('/categorias/vestuario-masculino')}>Ir às compras</Button>
      </EmptyList>
    )
  }
  
  return (
    <main className="flex-column gap-500-700">
      <h1 ref={titleRef} tabIndex={-1}>Meu carrinho</h1>
      <CartList editable />
      <DeliveryOptions
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
        shippingInfo={shippingInfo}
      />
      <hr className="hr-faded" />
      <CartSummary deliveryMethod={deliveryMethod} />
      <CartActions deliveryMethod={deliveryMethod} />
    </main>
  );
}

export default ShoppingCart;