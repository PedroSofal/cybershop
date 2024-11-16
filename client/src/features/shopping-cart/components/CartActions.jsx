// Hooks
import { useContext, useRef } from "react";

// Contexts
import CartContext from '@shopping-cart/contexts/CartContext';

// Components
import Button from '@buttons/Button';
import ConfirmationModal from '@components/ConfirmationModal';

// Assets
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, RemoveShoppingCart } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

// Utilities
import { createPortal } from "react-dom";

// Styles
import { css } from '@emotion/react';
import mq from "@utils/getMediaQueries";

const actionsStyles = css`
  display: flex;
  justify-content: space-between;
  gap: var(--ws-200);

  & > div {
    display: flex;
    gap: var(--ws-200);
  }

  ${mq('tablet')} {
    flex-direction: column;

    & > div {
      display: contents;
    }
  }
`;

function CartActions({ deliveryMethod }) {
  const dialogRef = useRef();
  const navigate = useNavigate();

  const { cartItems, clearCart } = useContext(CartContext);

  function handleCheckoutClick() {
    const date = new Date().toISOString();
    
    navigate('/checkout', {
      state: {
        created: date,
        products: [ ...cartItems ],
        deliveryMethod: deliveryMethod
      }
    });
  }
  
  return (
    <>
    <section aria-labelledby="cartActions">
      <h2 id="cartActions" className="offscreen">Ações do Carrinho</h2>
      <div css={actionsStyles}>
        <Button
          onClick={() => dialogRef.current.showModal()}
          icon={<RemoveShoppingCart />}
        >Limpar carrinho</Button>
        <div>
          <Button
            onClick={() => navigate('/categorias/vestuario-masculino')}
            icon={<KeyboardDoubleArrowLeft />}
          >Continuar comprando</Button>
          <Button
            main
            onClick={handleCheckoutClick}
            icon={<KeyboardDoubleArrowRight />}
            iconPos="right"
          >Finalizar compra</Button>
        </div>
      </div>
    </section>

    {createPortal(
      <ConfirmationModal
        modalId="clearCartModal"
        htmlRef={dialogRef}
        title='Limpar carrinho?'
        description='Todos os itens serão removidos do carrinho'
        mainAction='Limpar'
        onConfirmation={clearCart}
      />,
      document.body
    )}
    </>
  );
}

export default CartActions;