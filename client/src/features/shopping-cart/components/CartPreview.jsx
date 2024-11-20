// Hooks
import { useContext } from 'react';

// Contexts
import CartContext from '@shopping-cart/contexts/CartContext';

// Components
import ProductListMin from '@showcase/components/ProductListMin';

function CartPreview() {
  const { cartItems } = useContext(CartContext);

  return (
    <ProductListMin
      emptyState={
        cartItems.length === 0
          ? <p>Seu carrinho está vazio</p>
          : null
      }
      products={cartItems}
      seeMoreText="Ver Carrinho"
      seeMoreLink="/meu-carrinho"
    />
  );
}

export default CartPreview;