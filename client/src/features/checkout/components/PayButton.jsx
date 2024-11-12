// Hooks
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// Contexts
import AuthContext from '@authentication/contexts/AuthContext';
import CheckoutContext from '@checkout/contexts/CheckoutContext';
import CartContext from '@shopping-cart/contexts/CartContext';

// Components
import MainButton from '@buttons/MainButton';

// API
import axios from '@services/axios';

const ORDERS_URL = '/orders';

function PayButton({ disabled }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { getAllOrderInfos } = useContext(CheckoutContext);
  const { clearCart } = useContext(CartContext);
  const orderInfos = getAllOrderInfos();
  
  let status;
  let buttonText;
  if (orderInfos.paymentMethod === 'card') {
    buttonText = 'Pagar';
    status = 'pago';
  } else if (orderInfos.paymentMethod === 'pix') {
    buttonText = 'Gerar QR Code';
    status = 'pendente';
  } else if (orderInfos.paymentMethod === 'boleto') {
    buttonText = 'Gerar boleto';
    status = 'pendente';
  }

  async function placeOrder(e) {
    e.preventDefault();

    try {
      const orderPatched = await axios.post(
        ORDERS_URL,
        { ...orderInfos, status: status, userId: auth.id }
      );
      if (orderPatched) {
        clearCart();
        navigate('/obrigado', { state: { from: '/checkout' } });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainButton
      disabled={disabled}
      onClick={placeOrder}
      ariaLabelledBy="buttonText totalPrice"
    >
      <span id="buttonText">{buttonText}</span>
    </MainButton>
  );
}

export default PayButton;